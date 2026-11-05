# Radio Havokk – Vercel Now Playing fix

This package contains the same website files plus the missing Vercel serverless API at `api/now-playing.js`.

## Deploy to the existing GitHub/Vercel project

1. Extract this ZIP.
2. Copy the **contents** of this folder into the GitHub repository root (the same folder where `index.html`, `script.js`, and `package.json` live).
3. Add the new `api` folder with `api/now-playing.js`. Do not put `api` inside another nested folder.
4. Commit and push to the connected GitHub branch. Vercel should redeploy automatically.
5. Test `https://YOUR-DOMAIN/api/now-playing?url=ENCODED_STREAM_URL`. A JSON response means the function is running.

The endpoint only accepts hosts already used by the stations in `radioDatabase`, to avoid turning the function into an unrestricted URL proxy. It requests ICY metadata only and does not play audio in the browser.

## Important limitation

A song title can only be displayed when that station's stream actually publishes ICY `StreamTitle` metadata. HLS `.m3u8` stations and stations that do not publish metadata will continue to show an unavailable message.
