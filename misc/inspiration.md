
design

https://githubnext.com/

https://wattenberger.com/

https://www.ycombinator.com/jobs

https://yeezy.com/

https://year0001.com/

content 

https://danluu.com/


typography

**YC (ycombinator.com/jobs)**
- Serif: Source Serif 4 (Google Fonts) — headlines, often italic
- Sans: Outfit — UI and body
- Editorial, modern startup feel

**Yeezy (yeezy.com)**
- **Current site (DevTools):** custom stack on `html, body`:
  ```css
  font-family: 'YZY Plex Mono', 'IBM Plex Mono Fallback', monospace;
  font-variant-numeric: normal;
  font-feature-settings: 'zero' 0;
  ```
- `YZY Plex Mono` — renamed @font-face alias for self-hosted IBM Plex Mono (`/fonts/ibm/IBMPlexMono-Medium.ttf`)
- `IBM Plex Mono Fallback` — likely a metric-matched fallback font to reduce layout shift while loading
- `font-feature-settings: 'zero' 0` — slashed zero disabled (plain `0` not `Ø`)
- **Legacy Yeezy Supply:** VCR OSD Mono (bitmap, self-hosted on Shopify) — older era, pixelated look


**YEAR0001**
- DIN Regular