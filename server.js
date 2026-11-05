// Radio Havokk - static server + ICY Now Playing metadata endpoint
// Run with: node server.js
// Note: ICY metadata is available only when a station's stream server publishes it.
// HLS stations and stations without ICY metadata will report that song info is unavailable.

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const ROOT = __dirname;
const PORT = Number(process.env.PORT || 3000);
const cache = new Map();
const CACHE_MS = 45000;
const MAX_ACTIVE = 4;
let active = 0;
const queue = [];

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml'
};

function sendJson(res, status, payload) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'Access-Control-Allow-Origin': '*'
  });
  res.end(JSON.stringify(payload));
}

function runQueued(task) {
  return new Promise((resolve, reject) => {
    queue.push({ task, resolve, reject });
    pumpQueue();
  });
}

function pumpQueue() {
  while (active < MAX_ACTIVE && queue.length) {
    const job = queue.shift();
    active++;
    Promise.resolve().then(job.task).then(job.resolve, job.reject).finally(() => {
      active--;
      pumpQueue();
    });
  }
}

function readIcyTitle(streamUrl) {
  return new Promise((resolve) => {
    let settled = false;
    let req;
    let metadataInterval = 0;
    let metadataBytesRemaining = 0;
    let metadataParts = [];
    let inMetadata = false;
    let awaitingMetadataLength = false;
    let audioBytesToMetadata = 0;
    const timeout = setTimeout(() => finish({ title: '', message: 'No song metadata received' }), 10000);

    function finish(result) {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      if (req) req.destroy();
      resolve(result);
    }

    try {
      const parsed = new URL(streamUrl);
      if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
        return finish({ title: '', message: 'Unsupported stream URL' });
      }
      const transport = parsed.protocol === 'https:' ? https : http;
      req = transport.get(parsed, {
        headers: {
          'Icy-MetaData': '1',
          'User-Agent': 'RadioHavokk/2.1 (+now-playing metadata)',
          'Accept': '*/*'
        },
        timeout: 9000
      }, (response) => {
        const rawInterval = response.headers['icy-metaint'];
        metadataInterval = Number(rawInterval || 0);
        if (!metadataInterval) {
          response.destroy();
          return finish({ title: '', message: 'Station does not provide track metadata' });
        }

        response.on('data', (chunk) => {
          if (settled) return;
          let offset = 0;
          while (offset < chunk.length && !settled) {
            if (inMetadata) {
              const take = Math.min(metadataBytesRemaining, chunk.length - offset);
              metadataParts.push(chunk.subarray(offset, offset + take));
              metadataBytesRemaining -= take;
              offset += take;
              if (metadataBytesRemaining === 0) {
                const metadata = Buffer.concat(metadataParts).toString('utf8').replace(/\0+$/g, '');
                const match = metadata.match(/StreamTitle\s*=\s*'((?:\\'|[^'])*)'/i);
                const title = match ? match[1].replace(/\\'/g, "'").trim() : '';
                finish(title
                  ? { title, message: '' }
                  : { title: '', message: 'Station metadata has no song title' });
              }
            } else if (awaitingMetadataLength) {
              metadataBytesRemaining = chunk[offset] * 16;
              offset += 1;
              awaitingMetadataLength = false;
              metadataParts = [];
              if (metadataBytesRemaining > 0) {
                inMetadata = true;
              } else {
                audioBytesToMetadata = 0;
              }
            } else {
              const remainingAudio = metadataInterval - audioBytesToMetadata;
              const take = Math.min(remainingAudio, chunk.length - offset);
              audioBytesToMetadata += take;
              offset += take;
              if (audioBytesToMetadata >= metadataInterval) {
                awaitingMetadataLength = true;
              }
            }
          }
        });
        response.on('error', () => finish({ title: '', message: 'Could not read station metadata' }));
        response.on('end', () => finish({ title: '', message: 'Stream ended before metadata arrived' }));
      });
      req.on('timeout', () => finish({ title: '', message: 'Metadata request timed out' }));
      req.on('error', () => finish({ title: '', message: 'Station metadata unavailable' }));
    } catch (error) {
      finish({ title: '', message: 'Invalid station URL' });
    }
  });
}

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  if (requestUrl.pathname === '/api/now-playing') {
    const streamUrl = requestUrl.searchParams.get('url') || '';
    if (!streamUrl || streamUrl.length > 2048) {
      return sendJson(res, 400, { title: '', message: 'Missing or invalid stream URL' });
    }
    let parsed;
    try { parsed = new URL(streamUrl); } catch { return sendJson(res, 400, { title: '', message: 'Invalid stream URL' }); }
    if (!['http:', 'https:'].includes(parsed.protocol) || parsed.username || parsed.password) {
      return sendJson(res, 400, { title: '', message: 'Unsupported stream URL' });
    }
    const cached = cache.get(streamUrl);
    if (cached && Date.now() - cached.at < CACHE_MS) {
      return sendJson(res, 200, cached.value);
    }
    try {
      const result = await runQueued(() => readIcyTitle(streamUrl));
      cache.set(streamUrl, { value: result, at: Date.now() });
      return sendJson(res, 200, result);
    } catch {
      return sendJson(res, 502, { title: '', message: 'Metadata service error' });
    }
  }

  let pathname = decodeURIComponent(requestUrl.pathname);
  if (pathname === '/') pathname = '/index.html';
  const filePath = path.resolve(ROOT, `.${pathname}`);
  if (!filePath.startsWith(ROOT + path.sep) && filePath !== path.join(ROOT, 'index.html')) {
    res.writeHead(403); return res.end('Forbidden');
  }
  fs.readFile(filePath, (error, data) => {
    if (error) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': mimeTypes[path.extname(filePath)] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Radio Havokk running at http://localhost:${PORT}`);
});
