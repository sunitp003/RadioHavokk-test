# Radio Havokk – Now Playing feature

## Run locally

1. Install Node.js 18 or newer.
2. Open a terminal in this folder.
3. Run `node server.js`.
4. Open `http://localhost:3000`.

The station cards request metadata only when they are visible on screen. The app does **not** start the audio player. Requests are cached for 45 seconds and limited to four concurrent metadata checks.

## Important limitations

- Actual song titles are shown only when the station's stream server sends ICY `StreamTitle` metadata.
- HLS (`.m3u8`) stations and stations that do not publish track metadata may show `Station does not provide track metadata` / `Song info unavailable`. This is a limitation of the station's feed, not the UI.
- The backend reads a small amount of stream data to reach the metadata block. It does not forward or play audio to the browser, but it does make a background request to the station.
- For production deployment, add an allowlist of trusted station hosts to `/api/now-playing` before exposing the endpoint publicly.
