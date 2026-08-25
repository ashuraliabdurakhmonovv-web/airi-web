# Task 4 — sitemap.xml refinement

**Date:** 2026-08-12
**Fixes:** audit finding M4. **Surfaces:** new finding M9.
**File changed:** `scripts/generate-sitemap.mjs` (only)

---

## What was wrong

The sitemap itself was structurally correct — 214 URLs, correct trailing slashes, exclusions
applied. One field was actively harmful:

```xml
<lastmod>2026-08-12</lastmod>   <!-- on all 214 URLs, every build -->
```

`lastmod` was read from the `index.html` **file mtime**. `next build` rewrites every file on every
run, so every URL claimed "modified today" on every deploy. All 214 entries carried a single
identical value.

This is worse than having no `lastmod`: Google states it ignores the field for sites where it is
found to be inconsistent with reality. A sitemap that cries wolf on 214 URLs teaches the crawler to
stop reading the signal at all.

`<priority>` was derived from URL depth (`0.9 − (depth−1) × 0.1`). That number expressed nothing
about the site — it said `/boglanish/` matters more than a researcher's profile purely because it
sits one segment higher. Google has not used `<priority>` for years.

## What changed

**`lastmod` is now emitted only when a real date is known.** For news articles that date comes from
`publishedAt` in `src/data/news/news-index.json`. Every other route omits the field entirely — a
sitemap without `lastmod` is valid, and silence is more useful than a wrong date.

**`<priority>` removed.** Nothing consumed it and it encoded no real information.

**`<changefreq>` kept.** It costs nothing, its values are plausible (`daily` for the homepage,
`weekly` for news, `monthly` otherwise), and Yandex — which matters for a `.uz` audience — still
reads it as a hint.

Before / after for a static page:

```xml
<!-- before -->                          <!-- after -->
<url>                                    <url>
  <loc>https://airi.uz/boglanish/</loc>    <loc>https://airi.uz/boglanish/</loc>
  <lastmod>2026-08-12</lastmod>            <changefreq>monthly</changefreq>
  <changefreq>monthly</changefreq>       </url>
  <priority>0.9</priority>
</url>
```

And for a news article with a real date:

```xml
<url>
  <loc>https://airi.uz/umumiy-malumot/news/mustaqil-izlanuvchilik-phd-va-dsc-uchun-hujjatlar-qabuli/</loc>
  <lastmod>2026-07-27</lastmod>
  <changefreq>weekly</changefreq>
</url>
```

## New finding — M9: 108 of 110 news articles have no date

Only **2** of the 110 articles produced a `lastmod`, because only 2 have a `publishedAt` value.

This is **not** a bug in the import pipeline — the field is empty in the source data too:

| File | Articles | With `publishedAt` |
|---|---:|---:|
| `src/data/news/news-articles.json` | 110 | 2 |
| `src/data/news/news-index.json` | 110 | 2 |
| `src/data/news/airi-news.json` | 12 | 0 |

`displayDate` is empty for the same 108 articles, so the date is missing on the article pages
themselves as well, not only in the sitemap.

Consequences beyond the sitemap:
- Google cannot tell how fresh any of these articles are — a real ranking factor for news content.
- No `article:published_time` can be emitted for Open Graph.
- Readers see no date on 108 of 110 articles.

This cannot be fixed in code — the dates have to come from whoever holds the original publication
records. Inventing plausible dates would be worse than leaving the field empty. Recommended as an
editorial task: backfill `publishedAt` in `news-articles.json`, after which this sitemap script and
the article pages pick the dates up with no further change.

## Verification

```bash
npm run build
grep -c '<url>' out/sitemap.xml        # 214 — unchanged
grep -c '<lastmod>' out/sitemap.xml    # 2  — only the articles that really have a date
grep -c '<priority>' out/sitemap.xml   # 0
python3 -c "import xml.etree.ElementTree as ET; print(len(ET.parse('out/sitemap.xml').getroot()))"
# 214 — well-formed XML
```

`robots.txt`, the excluded paths and the URL set are all unchanged.
