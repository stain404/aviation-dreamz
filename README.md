# Aviation Dreamz

Landing page for Aviation Dreamz — a premier institute for airline careers, established
1996, led by proprietor Fowzia Shaikh, with over 5,000 students placed with domestic and
international airlines.

A single static page. No build step, no dependencies.

## Files

| File | What it is |
|---|---|
| `index.html` | The whole site — markup, CSS and JS in one file |
| `ad.jpeg` | The logo. Header mark, footer mark and favicon. The brand palette is sampled from it |
| `DESIGN.md` | Why the design is the way it is, and what not to undo |
| `serve.js` | Local dev server, Node only. Not needed in production |
| `comps.html` | Six early design directions, kept as a record. Not part of the site |

## Running it locally

```
node serve.js
```

Then open <http://localhost:3000>. Any static server works; the page is just
`index.html` plus `ad.jpeg` in the same directory.

## Deploying

Only `index.html` and `ad.jpeg` need to ship. Either:

- **GitHub Pages** — Settings → Pages → deploy from `main`, root. The page is at the
  repository root, so it works with no changes.
- **Netlify / Cloudflare Pages / Vercel** — drag the folder or connect this repo. No
  build command, no output directory.

The page loads Barlow Condensed and IBM Plex from Google Fonts, so it needs internet
for the intended typography; without it, the type falls back to system faces.

## Before this goes in front of customers

Two gaps, both marked in the source:

1. **Course length and price.** The page claims neither. The FAQ says `REPLACE THIS`.
2. **The free 45-minute assessment** is the page's primary call to action and has not
   been confirmed as a real offer. If it isn't one, every CTA needs to change.

Also still placeholder: airline names in the results row, the testimonial, the address,
phone, WhatsApp, email, Fowzia Shaikh's photo, and the form endpoint. The full list is
in a comment at the top of `index.html`.

**The contact form does not send anything yet.** It validates and shows a confirmation,
but `submitForm()` has no endpoint wired. On Netlify, Netlify Forms is the shortest
path; otherwise Formspree or your own handler.
