# Cavalier Static Site

Static website foundation for Cavalier.

## URL Rules

- Existing valuable pages keep the exact old no-trailing-slash paths.
- Existing Wix blog posts are organized internally in `content/old-blog`, but publish publicly as `/post/[slug]`.
- New study material, daily practice and defence news pages use clean no-trailing-slash paths.
- `/blog` and `/new-page` are intentionally not recreated.

## Build

```sh
node scripts/build.mjs
node scripts/check-urls.mjs
```

The static site is generated into `dist/`.

GitHub Pages builds are treated as preview builds and include `noindex` protection. The final Cloudflare production build should run with:

```sh
CAVALIER_ENV=production node scripts/build.mjs
```

For GitHub project-page previews, use:

```sh
CAVALIER_ENV=preview CAVALIER_BASE_PATH=/cavalier-site node scripts/build.mjs
```

## Data Files

- `data/nda-topics.json`
- `data/cds-topics.json`
- `data/practice-nda.json`
- `data/practice-cds.json`
- `data/practice-ssb.json`
- `data/defence-news.json`

Updating these files and running the build repopulates the relevant hub pages.
