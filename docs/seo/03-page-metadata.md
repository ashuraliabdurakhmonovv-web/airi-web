# Task 3 — Page-level Metadata

**Date:** 2026-08-12
**Depends on:** [01-seo-audit.md](./01-seo-audit.md)
**Fixes:** H1, H2, H3, H4, H5, M1 from the audit, plus the C1 follow-up (per-page canonicals).

---

## Result

| Metric | Before | After |
|---|---:|---:|
| Unique `<title>` | 119 / 219 | **201 / 219** |
| Unique `meta description` | 155 / 219 | **211 / 219** |
| Pages with `canonical` | 110 | **214** |
| Pages canonicalised to the homepage | 109 | **1** (the homepage) |
| Pages with `og:image` | 114 | **219** |
| Pages with exactly one `<h1>` | 7 | **218** |
| Titles still in English | 26 | **0** |

The 5 pages without a canonical are `/404`, `/_not-found` and the three deliberately
noindexed pages — correct in all five cases.

The 18 remaining duplicate titles are **not** a metadata defect:
- 6 × the root default title — the homepage, `/404` and `/_not-found` (expected).
- 16 × duplicated headlines inside the news dataset itself (audit finding M6), e.g. 11 articles
  literally titled `Dissertatsiya himoyasi bo'lib o'tadi`. This is editorial data, not code.

---

## Approach

### One helper instead of 45 hand-written metadata objects

`config/seo.ts` now exports `pageMetadata({ title, description, path, image? })`, which returns a
complete `Metadata` object: title, description, canonical, Open Graph and Twitter card.

Two subtleties are encoded in it, both discovered the hard way:

**1. Child `openGraph` replaces, it does not merge.** The audit's H4 (105 pages with no `og:image`)
was caused by section layouts redefining `openGraph` without `images`. Because the helper always
emits the full Open Graph block including an image, that failure mode cannot recur.

**2. A plain-string `title` in a layout kills the template for its children.** Setting
`title: "Professor-o'qituvchilar"` on `institute-teachers/layout.tsx` removed the root's
`%s | AIRI` template for `institute-teachers/[slug]`, so detail pages rendered as
`Mirzayev Nomaz` with no brand. The helper therefore emits `title: { absolute: "… | AIRI" }` and
appends the brand itself — predictable at any depth, no template inheritance to reason about.

### Where metadata lives

| Page type | Mechanism |
|---|---|
| Server page | `export const metadata = pageMetadata({...})` in `page.tsx` |
| **Client page** (`"use client"`) | new sibling `layout.tsx` — client components cannot export `metadata` |
| Dynamic `[slug]` | `generateMetadata()` reading the item's real data |

30 new `layout.tsx` files were created for client pages. Each is four lines of metadata plus a
pass-through `return children`, so it adds no DOM and no runtime cost.

### Section layouts no longer set metadata

`ilmiy-tadqiqot/layout.tsx`, `umumiy-malumot/(umumiy-malumot)/layout.tsx` and
`ishlab-chiqarish/(ishlab-chiqarish)/layout.tsx` had their `title`/`description`/`keywords`/
`openGraph` blocks removed and replaced with a comment explaining why they must not come back.
These three blocks were the single cause of 63 duplicate titles and 64 English descriptions.

`keywords` was dropped entirely rather than translated — Google has ignored the tag since 2009.

### Detail pages now use real data

Two routes returned a constant for every item:

| Route | Was | Now |
|---|---|---|
| `research-internationalrelationships/[slug]` | 18 × `International Cooperation Document — AIRI` | partner name from `uz.internationalPage.relationshipNames` |
| `institute-internaldocuments/[slug]` | 8 × `Internal Document — AIRI` | document name from `uz.internalDocsPage.documents` |

Both name sets live in the Uzbek dictionary rather than in the data files, keyed by slug and by
array index respectively; the metadata functions read them directly.

### Heading structure

The audit recorded "219/219 pages have an `<h1>`" as a positive. **That was wrong**, and this task
corrects it. The `<h1>` being counted was the loading screen's institute name, baked into every
exported page. 212 pages actually had *two* `<h1>` elements — the loader's and the page's own.

- `app/loading.tsx` and `app/_components/loading/loading.tsx`: `<h1>` → `<p>`. A loading indicator is
  not a page heading.
- Four pages whose only real heading was an `<h2>` had it promoted to `<h1>`:
  `institute-eventcalendar`, `institute-internaldocuments`, `institute-structureofinstitute`,
  `research-internationalrelationships`.

Result: 218 of 219 pages now have exactly one `<h1>`, and it is the page's own topic.

### Title strategy

Titles were written toward queries where AIRI can realistically rank — the institute's own name and
long-tail Uzbek research queries — not toward head terms like "sun'iy intellekt", where the
competition is Wikipedia and national news portals. Examples:

```
Doktorantura — sun'iy intellekt yo'nalishi bo'yicha PhD va DSc | AIRI
Ilmiy darajalar beruvchi ilmiy kengash (PhD, DSc) | AIRI
Tabiiy tilni qayta ishlash laboratoriyasi | AIRI
Dissertatsiya himoyasi e'lonlari | AIRI
```

Every title describes what the page actually contains; none is keyword-stuffed.

---

## Known gap — the news list page (audit H6)

`/umumiy-malumot/news/` is still the one page with **no `<h1>` and no article links** in its static
HTML, and it is the only page in that state.

**Root cause, now confirmed:** the page calls `useSearchParams()` at the top level. Under
`output: "export"` that forces the whole page out of static prerendering, so Next.js writes the
`loading.tsx` fallback into `out/umumiy-malumot/news/index.html` instead of the page. The category
filter and pagination compound it — they are `router.replace()` query-string updates, not URLs.

Consequence: 100 of the 110 news articles have no internal link path anywhere on the site. They are
reachable only through `sitemap.xml` and the 10 cards on the homepage.

**This was deliberately left for its own task** — the fix is structural, not a metadata change:
split the page into a statically rendered shell (heading, intro, a server-rendered list of article
links) and a client island that owns the search/filter state behind `<Suspense>`.

---

## Files changed

| Group | Count | Notes |
|---|---:|---|
| New `layout.tsx` for client pages | 30 | metadata only, pass-through render |
| `config/seo.ts` | 1 | `pageMetadata()`, `canonicalUrl()`, `SITE_NAME`, `DEFAULT_OG_IMAGE` |
| Section layouts cleaned | 3 | metadata blocks removed |
| Server pages given metadata | 8 | incl. homepage canonical in `app/page.tsx` |
| Dynamic routes given `generateMetadata` | 9 | labs, graduates, partners, teachers, youth, docs, relations, projects, team |
| Loading components | 2 | `<h1>` → `<p>` |
| Pages with `<h2>` promoted to `<h1>` | 4 | see above |

---

## Verification

```bash
npx tsc --noEmit     # clean
npm run build        # succeeds, 214 sitemap URLs

grep -rho '<title>[^<]*</title>' out --include=index.html | sort -u | wc -l   # 201
grep -rl 'rel="canonical"' out --include=index.html | wc -l                   # 214
grep -rl 'property="og:image"' out --include=index.html | wc -l               # 219
grep -c '<url>' out/sitemap.xml                                               # 214
grep -c noindex out/ilmiy-tadqiqot/scientific-articles/index.html             # still noindexed
```

No regressions: `robots.txt` unchanged, sitemap count unchanged, the three noindexed pages still
noindexed, and the 110 news canonicals still correct.

---

## Next

| Task | Why |
|---|---|
| **News list page (H6)** | Highest remaining SEO value — 100 orphaned articles |
| **Task 5 — Canonical & URL cleanup** | `.htaccess` needs HTTPS, `www` and trailing-slash 301s |
| **Task 2 — Global metadata** | `icons`, `manifest`, Search Console `verification`; consolidate the three `SITE_URL` declarations |
| Task 8 | Largely done — news `[slug]` already had it, the rest landed here |
| Task 9 | Done — `og:image` now 219/219 |
