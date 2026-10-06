# DoHow! prototype

A self-contained, responsive front-end prototype inspired by the universal, structured "how-to" knowledge idea in Sebastian Rey's B.L.U.E. System video.

## Run

Just open `index.html` in a browser.

Or, from this folder:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Included interactions

- Search overlay with keyboard shortcut (`Ctrl/Cmd + K`)
- Search-driven guide lookup
- Domain filtering
- Guide detail modal
- Light/dark theme toggle
- Responsive knowledge-map visualization
- Animated card reveals
- Self-taught learning path: *Make animated educational videos with Canvas Commons* (formerly Motion Canvas) — 9 phases with goals, practice tasks, code samples, completion checks, and saved progress (`track.js`)

The site uses no build system or framework, so it is easy to prototype from and later migrate into React, Astro, Eleventy, Next.js, etc.
