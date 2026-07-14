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
