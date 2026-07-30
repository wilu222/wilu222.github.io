# Blog Prototype

This is a simple static prototype for a future GitHub Pages blog. It includes a homepage/archive, one sample article page, an about page, shared CSS, and a placeholder article image.

## Test locally

From this folder:

```bash
cd web
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Files

- `web/index.html` - homepage/archive layout
- `web/article.html` - Medium/Substack-style article layout
- `web/about.html` - filler about page
- `web/styles.css` - shared neobrutalist editorial styling
- `web/assets/article-header.svg` - placeholder article image

For GitHub Pages, the simplest later path is to serve the `web/` folder contents from the repository root or configure Pages to publish from the chosen static directory.

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

| Tool | Best host | Notes |
|------|-----------|-------|
| **Eleventy** | Vercel, GitHub Pages | Node-based; good fit if using Vercel |
| **Jekyll** | GitHub Pages | Native Pages support; Ruby-based |
| **Next.js** | Vercel | Overkill for a static essay blog unless you want app features |

Eleventy or Jekyll give you: one layout template, Markdown posts, auto-generated index, optional RSS. Next.js solves templating too, but adds significant complexity for little gain at this scale.

