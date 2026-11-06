// Vercel Serverless Function for Radio Havokk Now Playing metadata.
// This endpoint reads ICY metadata only; it never starts the browser audio player.
const http = require('http');
const https = require('https');

const ALLOWED_HOSTS = new Set([
  "14833.live.streamtheworld.com",
  "15053.live.streamtheworld.com",
  "a10.asurahosting.com",
  "a4.asurahosting.com",
  "a6.asurahosting.com",
  "a7.asurahosting.com",
  "admn-radio-cdn-lb.starzplayarabia.com",
  "air.pc.cdn.bitgravity.com",
  "airhlspush.pc.cdn.bitgravity.com",
  "bhs.edge.mystreaming.net",
  "bollyvibes.radioca.st",
  "c28.radioboss.fm",
  "carol.epichosts.co.uk",
  "centova87.shoutcastservices.com",
  "d1cvqgmbcpg5yn.cloudfront.net",
  "d1tmej9eu7kw5c.cloudfront.net",
  "d3hrxqn1tritdh.cloudfront.net",
  "dgnlfn5aus0c6.cloudfront.net",
  "drive.uber.radio",
  "dz1aqwz3bmbil.cloudfront.net",
  "eu8.fastcast4u.com",
  "ice10.securenetsystems.net",
  "ice6.securenetsystems.net",
  "ice66.securenetsystems.net",
  "ice8.securenetsystems.net",
  "icecast.bkwsu.eu",
  "icecast1.sere.plus",
  "listen-lycaradio.sharp-stream.com",
  "listen.openstream.co",
  "play.radioking.io",
  "playerservices.streamtheworld.com",
  "radio.wavespb.com",
  "rangeelaradio.radioca.st",
  "s3.radio.co",
  "s3.voscast.com",
  "s5.voscast.com",
  "server.mixify.in",
  "shripadradio.radioca.st",
  "silverstream.radioca.st",
  "sp14.instainternet.com",
  "stream-141.zeno.fm",
  "stream-175.surfernetwork.com",
  "stream-179.surfernetwork.com",
  "stream-18.zeno.fm",
  "stream-19.zeno.fm",
  "stream-284.surfernetwork.com",
  "stream-289.surfernetwork.com",
  "stream.madhurawaz.com",
  "stream.radiojar.com",
  "stream.rcs.revma.com",
  "stream.tamilfmradios.com",
  "stream.zeno.fm",
  "stream.zenolive.com",
  "streamasiacdn.atc-labs.com",
  "streamasiahlscdn.atc-labs.com",
  "streaming.live365.com",
  "streaming.webhostnepal.com",
  "streams.radio.co",
  "strm112.1.fm",
  "us9.maindigitalstream.com"
]);
const CACHE_MS = 45_000;
const cache = new Map();

function send(res, status, body) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=45, stale-while-revalidate=15');
  return res.status(status).json(body);
}

function readIcyTitle(streamUrl) {
  return new Promise((resolve) => {
    let settled = false;
    let req;
    let metaInterval = 0;
    let audioBytes = 0;
    let waitingForLength = false;
    let inMetadata = false;
    let metadataRemaining = 0;
    let metadataParts = [];
    let totalRead = 0;
    const maxRead = 2 * 1024 * 1024;
    const timeout = setTimeout(() => finish({ title: '', message: 'Metadata request timed out' }), 9000);

    function finish(value) {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      if (req) req.destroy();
      resolve(value);
    }

    try {
      const parsed = new URL(streamUrl);
      const transport = parsed.protocol === 'https:' ? https : http;
      req = transport.get(parsed, {
        headers: { 'Icy-MetaData': '1', 'User-Agent': 'RadioHavokk/2.2', 'Accept': '*/*' },
        timeout: 8500
      }, (response) => {
        if (response.statusCode >= 300 && response.statusCode < 400) {
          response.destroy();
          return finish({ title: '', message: 'Station redirected; metadata endpoint not supported for this stream' });
        }
        metaInterval = Number(response.headers['icy-metaint'] || 0);
        if (!metaInterval) {
          response.destroy();
          return finish({ title: '', message: 'Station does not provide track metadata' });
        }

        response.on('data', (chunk) => {
          if (settled) return;
          totalRead += chunk.length;
          if (totalRead > maxRead) return finish({ title: '', message: 'No song metadata found in stream' });
          let offset = 0;
          while (offset < chunk.length && !settled) {
            if (inMetadata) {
              const take = Math.min(metadataRemaining, chunk.length - offset);
              metadataParts.push(chunk.subarray(offset, offset + take));
              metadataRemaining -= take;
              offset += take;
              if (metadataRemaining === 0) {
                const metadata = Buffer.concat(metadataParts).toString('utf8').replace(/\0+$/g, '');
                const match = metadata.match(/StreamTitle\s*=\s*'((?:\\'|[^'])*)'/i);
                const title = match ? match[1].replace(/\\'/g, "'").trim() : '';
                return finish(title ? { title, message: '' } : { title: '', message: 'Station metadata has no song title' });
              }
            } else if (waitingForLength) {
              metadataRemaining = chunk[offset] * 16;
              offset += 1;
              waitingForLength = false;
              metadataParts = [];
              if (metadataRemaining > 0) inMetadata = true;
              else audioBytes = 0;
            } else {
              const take = Math.min(metaInterval - audioBytes, chunk.length - offset);
              audioBytes += take;
              offset += take;
              if (audioBytes >= metaInterval) waitingForLength = true;
            }
          }
        });
        response.on('error', () => finish({ title: '', message: 'Could not read station metadata' }));
        response.on('end', () => finish({ title: '', message: 'Stream ended before metadata arrived' }));
      });
      req.on('timeout', () => finish({ title: '', message: 'Metadata request timed out' }));
      req.on('error', () => finish({ title: '', message: 'Station metadata unavailable' }));
    } catch (_) {
      finish({ title: '', message: 'Invalid station URL' });
    }
  });
}

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') return send(res, 405, { title: '', message: 'Method not allowed' });
  const streamUrl = typeof req.query.url === 'string' ? req.query.url : '';
  if (!streamUrl || streamUrl.length > 2048) return send(res, 400, { title: '', message: 'Missing or invalid stream URL' });

  let parsed;
  try { parsed = new URL(streamUrl); } catch (_) { return send(res, 400, { title: '', message: 'Invalid station URL' }); }
  if (!['http:', 'https:'].includes(parsed.protocol) || parsed.username || parsed.password || !ALLOWED_HOSTS.has(parsed.hostname.toLowerCase())) {
    return send(res, 403, { title: '', message: 'Station host is not allowed' });
  }

  const cached = cache.get(streamUrl);
  if (cached && Date.now() - cached.at < CACHE_MS) return send(res, 200, cached.value);
  const value = await readIcyTitle(streamUrl);
  cache.set(streamUrl, { value, at: Date.now() });
  return send(res, 200, value);
};

module.exports.config = { maxDuration: 15 };
 
