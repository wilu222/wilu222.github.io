# Publishing to GitHub Pages

In the GitHub repo → **Settings → Pages → Build and deployment → Source**: "Deploy from a branch" → Branch `main`, folder `/docs` → **Save**.

GitHub Pages only serves from the repo root or a `/docs` folder on a branch (no arbitrary folder without a custom Actions workflow), which is why the site lives in `docs/` here. Once saved, the site publishes at `https://wilu222.github.io/` within a couple of minutes.

## Publishing options

Manual HTML is fine for a low-volume blog. The main cost is duplicated header/nav and hand-updating the index for each new post.

### Shared header

Plain HTML/CSS cannot include a shared header automatically. Options:

| Approach | Build step? | Notes |
|----------|-------------|-------|
| Copy-paste header in every file | No | Simplest; edit each page when nav changes |
| `partials/header.html` + manual paste | No | One source file to copy from |
| Tiny build script or SSG | Yes | Header defined once, stitched at build time |
| JS `fetch` injection | No | Avoid — flash of missing nav, worse SEO |

### When to add tooling

| Stage | Approach |
|-------|----------|
| Now | Plain HTML + CSS (current setup) |
| Nav changes get annoying | Shared header snippet, still manual paste |
| Index updates get annoying | Markdown + lightweight SSG |

### Static site generators

Eleventy (Node) or Jekyll (Ruby, native GitHub Pages) add one layout, Markdown posts, and an auto-generated index. Next.js is overkill for a static essay blog.
