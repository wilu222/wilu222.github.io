# Blog Prototype

This is a simple static prototype for a future GitHub Pages blog. It includes a homepage/archive, one sample article page, an about page, shared CSS, and a placeholder article image.

## Test locally

From this folder:

```bash
cd docs
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Files

- `docs/index.html` - homepage/archive layout
- `docs/article.html` - Medium/Substack-style article layout
- `docs/about.html` - filler about page
- `docs/styles.css` - shared neobrutalist editorial styling
- `docs/assets/article-header.svg` - placeholder article image

`misc/` holds private notes/drafts and is gitignored — it stays local only.

See [publishing.md](publishing.md) for GitHub Pages setup and later tooling options.

