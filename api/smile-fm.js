// Vercel Serverless Function: HTTPS/CORS proxy for Smile FM 90.8.
// Deliberately fixed to the station's confirmed HTTP stream (not an open proxy).
const http = require('http');

const UPSTREAM_URL = 'http://198.245.61.103:8113/stream?type=http&nocache=2';
const UPSTREAM = new URL(UPSTREAM_URL);

function applyCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Range');
  res.setHeader('Access-Control-Expose-Headers', 'Accept-Ranges, Content-Length, Content-Range, Content-Type');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
}

module.exports = function handler(req, res) {
  applyCors(res);

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD, OPTIONS');
    res.statusCode = 405;
    return res.end('Method not allowed');
  }

  const headers = {
    'User-Agent': 'RadioHavokk/2.2 (+https://radiohavokk.vercel.app)',
    'Accept': '*/*'
  };

  const range = req.headers.range;
  if (typeof range === 'string' && /^bytes=\\d*-\\d*(,\\d*-\\d*)*$/.test(range)) {
    headers.Range = range;
  }

  const upstreamReq = http.get(UPSTREAM, { headers }, (upstreamRes) => {
    if (upstreamRes.statusCode >= 300 && upstreamRes.statusCode < 400) {
      upstreamRes.destroy();
      if (!res.headersSent) {
        res.statusCode = 502;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end('Smile FM provider redirected the stream; proxy cannot follow it safely.');
      } else {
        res.destroy();
      }
      return;
    }

    res.statusCode = upstreamRes.statusCode || 502;
    const forwardHeaders = [
      'content-type',
      'content-length',
      'content-range',
      'accept-ranges',
      'icy-br',
      'icy-name',
      'icy-description',
      'icy-genre',
      'icy-metaint'
    ];

    for (const name of forwardHeaders) {
      const value = upstreamRes.headers[name];
      if (value !== undefined) res.setHeader(name, value);
    }

    if (req.method === 'HEAD') {
      upstreamRes.destroy();
      return res.end();
    }

    upstreamRes.on('error', () => {
      if (!res.destroyed) res.destroy();
    });
    upstreamRes.pipe(res);
  });

  upstreamReq.setTimeout(15000, () => {
    upstreamReq.destroy(new Error('Smile FM upstream timed out'));
  });

  upstreamReq.on('error', (error) => {
    if (res.headersSent) return res.destroy();
    res.statusCode = 502;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Unable to connect to Smile FM stream: ' + error.message);
  });

  res.on('close', () => {
    if (!res.writableEnded) upstreamReq.destroy();
  });
};

module.exports.config = { maxDuration: 60 };
