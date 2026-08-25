# Task 1 — AIRI SEO Audit & Route Inventory

**Site:** https://airi.uz
**Repo:** `/Users/airi/Application/Airi`
**Date:** 2026-08-11
**Scope:** Audit and inventory. Three targeted code changes were made — see §13.

Everything in §1–§10 is a **confirmed finding**, verified either by reading source files or by
inspecting the generated static export in `out/`. Warnings that were investigated and found *not* to
be defects are in §11, assumptions and unknowns in §12, and recommendations in §14. Nothing else in
this document is speculation.

---

## 1. Executive summary

1. **CRITICAL — every non-news page canonicalised to the homepage.** The root layout declared a
   static `alternates: { canonical: "/" }`, which App Router **inherits** rather than resolving per
   route. 109 of 219 generated pages emitted `<link rel="canonical" href="https://airi.uz/">`. This
   instructs Google to drop them from the index in favour of the homepage. **Fixed in this task.**
2. **HIGH — 63 pages share two titles.** 38 pages are titled `AIRI | AIRI` and 25 are titled
   `AIRI — Ilmiy Tadqiqot | AIRI`, because section layouts set a plain-string `title` that overrides
   the root `default` for their whole subtree.
3. **HIGH — 64 Uzbek pages serve an English `meta description`,** inherited from the three section
   layouts.
4. **HIGH — 105 pages have `og:title` but no `og:image`.** Section layouts redefine `openGraph`
   without `images`, which *replaces* (not merges with) the root's `/og-image.jpg`. Links to those
   pages render with no preview picture on Telegram, LinkedIn, etc.
5. **MEDIUM — 26 detail pages share hardcoded titles** from `generateMetadata` that ignores the item:
   18 × `International Cooperation Document — AIRI`, 8 × `Internal Document — AIRI`.
6. **HIGH — the news index page links to none of its 110 articles.** `/umumiy-malumot/news/` fetches
   its list client-side, so the exported HTML contains only skeletons. 100 of the 110 articles have no
   internal link path anywhere on the site; only the sitemap and 10 homepage cards reach them.
7. **`robots.txt` and `sitemap.xml` are already implemented and correct.** Task 4 of the roadmap is
   effectively complete and should be de-scoped to a `lastmod` refinement.
8. **Content is otherwise crawlable.** 219/219 generated pages contain rendered body text, despite
   21 of 51 source pages being client components. Client-side rendering is *not* a general indexing
   risk here — §9.1 is the single exception.
   > **Correction (2026-08-12):** this bullet originally claimed `<h1>` coverage was 219/219 and
   > that heading structure was therefore healthy. That was wrong. The `<h1>` being counted was the
   > loading screen's institute name, present on every exported page; 212 pages actually carried
   > **two** `<h1>` elements. See §9.3. Fixed in Task 3.
9. **The `next dev` hydration warning is caused by a browser extension, not by this code** (§11.1).

---

## 2. Architecture and build pipeline

| Item | Value | Source |
|---|---|---|
| Next.js / React | `16.2.4` / `19.2.5` | `package.json` |
| Router | **App Router**, no `pages/` directory | `app/` |
| Output mode | `output: "export"` — fully static | `next.config.ts` |
| URL form | `trailingSlash: true` → all URLs end in `/` | `next.config.ts` |
| Images | `images.unoptimized: true`, 6 remote patterns whitelisted | `next.config.ts` |
| `basePath` / `assetPrefix` | none | `next.config.ts` |
| Build command | `next build && node scripts/generate-sitemap.mjs` | `package.json` |
| Deployment | static export → Apache shared hosting (`public/.htaccess` ships with the export) | `public/.htaccess` |
| i18n | uz / ru / en, **client-side only** | `i18n/config.ts`, `i18n/locale-provider.tsx` |
| Middleware | none (and would be inert under `output: "export"`) | — |

**Counts**

| Metric | Value |
|---|---|
| `page.tsx` source files | 51 |
| — server components | 30 |
| — client components (`"use client"`) | 21 |
| Dynamic `[slug]` routes | 10 (all have `generateStaticParams`) |
| Generated `index.html` in `out/` | 219 |
| — of which news | 111 (1 list + 110 articles) |
| URLs in `out/sitemap.xml` | 214 |

219 − 214 = 5: `/404`, `/_not-found`, and the three deliberately excluded paths (§5).

---

## 3. Route inventory

Route groups in parentheses — `(pages)`, `(umumiy-malumot)`, `(institute)`, `(ochiq-malumotlar)`,
`(umumiy-malumotlar)`, `(01-ilmiy-kengash)`, `(02-tadqiqotlar)`, `(03-doktorantura)`,
`(04-yangiliklar-va-elonlar)`, `(ishlab-chiqarish)` — do **not** appear in URLs.

Legend: **C** = client component (cannot export `metadata`) · **S** = server component ·
`meta` = own `export const metadata` · `genMeta` = own `generateMetadata` ·
`layout` = metadata supplied by a sibling `layout.tsx` · `—` = inherits section/root only.

### Root (1)

| URL | Source | Type | Metadata |
|---|---|---|---|
| `/` | `app/page.tsx` | S | layout (root) |

### `/umumiy-malumot` — 26 routes

Base: `app/(pages)/umumiy-malumot/(umumiy-malumot)/`

| URL | Source (relative) | Type | Metadata |
|---|---|---|---|
| `/umumiy-malumot` | `page.tsx` | S | layout (section) |
| `/umumiy-malumot/history` | `(institute)/history/page.tsx` | C | — |
| `/umumiy-malumot/institute-abouttheinstitute` | `(institute)/institute-abouttheinstitute/page.tsx` | C | — |
| `/umumiy-malumot/institute-eventcalendar` | `(institute)/institute-eventcalendar/page.tsx` | C | — |
| `/umumiy-malumot/institute-instituteteam` | `(institute)/institute-instituteteam/page.tsx` | C | — |
| `/umumiy-malumot/institute-structureofinstitute` | `(institute)/institute-structureofinstitute/page.tsx` | C | — |
| `/umumiy-malumot/institute-internaldocuments` | `(institute)/institute-internaldocuments/page.tsx` | C | — |
| `/umumiy-malumot/institute-internaldocuments/[slug]` | `.../[slug]/page.tsx` | S | genMeta |
| `/umumiy-malumot/research-internationalrelationships` | `(institute)/research-internationalrelationships/page.tsx` | C | — |
| `/umumiy-malumot/research-internationalrelationships/[slug]` | `.../[slug]/page.tsx` | S | genMeta |
| `/umumiy-malumot/opendata-managementreceptiondays` | `(ochiq-malumotlar)/opendata-managementreceptiondays/page.tsx` | C | — |
| `/umumiy-malumot/opendata-requisitesoftheinstitute` | `(ochiq-malumotlar)/opendata-requisitesoftheinstitute/page.tsx` | C | — |
| `/umumiy-malumot/opendata-requisitesoftheinstitute/certificate` | `.../certificate/page.tsx` | C | — |
| `/umumiy-malumot/opendata-vacancies` | `(ochiq-malumotlar)/opendata-vacancies/page.tsx` | C | — |
| `/umumiy-malumot/faq` | `(umumiy-malumotlar)/faq/page.tsx` | S | meta |
| `/umumiy-malumot/generalinformation-statesymbols` | `(umumiy-malumotlar)/generalinformation-statesymbols/page.tsx` | C | — |
| `/umumiy-malumot/institute-graduates` | `(umumiy-malumotlar)/institute-graduates/page.tsx` | S | — |
| `/umumiy-malumot/institute-graduates/[slug]` | `.../[slug]/page.tsx` | S | — |
| `/umumiy-malumot/institute-talentedyouth` | `(umumiy-malumotlar)/institute-talentedyouth/page.tsx` | C | — |
| `/umumiy-malumot/institute-talentedyouth/[slug]` | `.../[slug]/page.tsx` | C | — |
| `/umumiy-malumot/institute-teachers` | `(umumiy-malumotlar)/institute-teachers/page.tsx` | C | — |
| `/umumiy-malumot/institute-teachers/[slug]` | `.../[slug]/page.tsx` | C | — |
| `/umumiy-malumot/news` | `news/page.tsx` | C | — |
| `/umumiy-malumot/news/[slug]` | `news/[slug]/page.tsx` | S | layout ✅ |
| `/umumiy-malumot/partners` | `partners/page.tsx` | C | — |
| `/umumiy-malumot/partners/[slug]` | `partners/[slug]/page.tsx` | S | — |

### `/ilmiy-tadqiqot` — 18 routes

Base: `app/(pages)/ilmiy-tadqiqot/`

| URL | Source (relative) | Type | Metadata |
|---|---|---|---|
| `/ilmiy-tadqiqot` | `page.tsx` | S | layout (section) |
| `/ilmiy-tadqiqot/degree-awarding-council` | `(01-ilmiy-kengash)/degree-awarding-council/page.tsx` | S | — |
| `/ilmiy-tadqiqot/research-scientificboard` | `(01-ilmiy-kengash)/research-scientificboard/page.tsx` | S | — |
| `/ilmiy-tadqiqot/scientific-council-decisions` | `(01-ilmiy-kengash)/scientific-council-decisions/page.tsx` | S | — |
| `/ilmiy-tadqiqot/seminar-board` | `(01-ilmiy-kengash)/seminar-board/page.tsx` | S | — |
| `/ilmiy-tadqiqot/research-conferences` | `(02-tadqiqotlar)/research-conferences/page.tsx` | C | — |
| `/ilmiy-tadqiqot/research-laboratories` | `(02-tadqiqotlar)/research-laboratories/page.tsx` | C | — |
| `/ilmiy-tadqiqot/research-laboratories/[slug]` | `.../[slug]/page.tsx` | S | — |
| `/ilmiy-tadqiqot/research-projects` | `(02-tadqiqotlar)/research-projects/page.tsx` | S | meta — **noindex** |
| `/ilmiy-tadqiqot/scientific-articles` | `(02-tadqiqotlar)/scientific-articles/page.tsx` | S | meta — **noindex** |
| `/ilmiy-tadqiqot/scientific-journals` | `(02-tadqiqotlar)/scientific-journals/page.tsx` | S | meta — **noindex** |
| `/ilmiy-tadqiqot/research-doctorate` | `(03-doktorantura)/research-doctorate/page.tsx` | C | — |
| `/ilmiy-tadqiqot/announcements` | `(04-…)/announcements/page.tsx` | S | — |
| `/ilmiy-tadqiqot/dissertation-defense-announcements` | `(04-…)/dissertation-defense-announcements/page.tsx` | S | — |
| `/ilmiy-tadqiqot/past-seminars` | `(04-…)/past-seminars/page.tsx` | S | — |
| `/ilmiy-tadqiqot/scientific-tasks` | `(04-…)/scientific-tasks/page.tsx` | S | — |
| `/ilmiy-tadqiqot/seminars` | `(04-…)/seminars/page.tsx` | S | — |
| `/ilmiy-tadqiqot/upcoming-seminars` | `(04-…)/upcoming-seminars/page.tsx` | S | — |

### `/ishlab-chiqarish` — 5 routes

Base: `app/(pages)/ishlab-chiqarish/(ishlab-chiqarish)/`

| URL | Source (relative) | Type | Metadata |
|---|---|---|---|
| `/ishlab-chiqarish` | `page.tsx` | S | layout (section) |
| `/ishlab-chiqarish/projects` | `projects/page.tsx` | S | meta |
| `/ishlab-chiqarish/projects/[slug]` | `projects/[slug]/page.tsx` | S | genMeta ✅ |
| `/ishlab-chiqarish/team` | `team/page.tsx` | S | meta |
| `/ishlab-chiqarish/team/[slug]` | `team/[slug]/page.tsx` | S | genMeta ✅ |

### `/boglanish` — 1 route

| URL | Source | Type | Metadata |
|---|---|---|---|
| `/boglanish` | `app/(pages)/boglanish/page.tsx` | S | meta |

### Dynamic routes (10) — all pre-rendered

| Route | `generateStaticParams` location |
|---|---|
| `/umumiy-malumot/news/[slug]` | `page.tsx:5` (from `getAllStaticNews()`) |
| `/umumiy-malumot/institute-internaldocuments/[slug]` | `page.tsx:29` |
| `/umumiy-malumot/research-internationalrelationships/[slug]` | `page.tsx:29` |
| `/umumiy-malumot/institute-graduates/[slug]` | `page.tsx:10` |
| `/umumiy-malumot/institute-teachers/[slug]` | `layout.tsx:3` (page is client) |
| `/umumiy-malumot/institute-talentedyouth/[slug]` | `layout.tsx:3` (page is client) |
| `/umumiy-malumot/partners/[slug]` | `page.tsx:20` |
| `/ilmiy-tadqiqot/research-laboratories/[slug]` | `page.tsx:629` |
| `/ishlab-chiqarish/projects/[slug]` | `page.tsx:44` |
| `/ishlab-chiqarish/team/[slug]` | `page.tsx:20` |

Required by `output: "export"` — a missing one would fail the build, so this is structurally safe.

### Special files

| File | Present |
|---|---|
| `app/not-found.tsx` | ✅ |
| `app/(pages)/umumiy-malumot/(umumiy-malumot)/not-found.tsx` | ✅ |
| `app/loading.tsx` | ✅ |
| `app/robots.ts` | ✅ |
| `error.tsx` / `global-error.tsx` / `template.tsx` | ❌ none anywhere |
| `app/sitemap.ts` | ❌ — intentional, replaced by `scripts/generate-sitemap.mjs` |
| `middleware.ts` | ❌ — would be inert under static export |

---

## 4. Metadata audit

### 4.1 The inheritance chain

`app/layout.tsx` defines a complete root metadata object: `metadataBase`, `title.default` +
`title.template: "%s | AIRI"`, `description`, 10 `keywords`, `authors`/`creator`/`publisher`,
`openGraph` (with `/og-image.jpg`, 1200×630), `twitter` (`summary_large_image`), and `robots`
(`index, follow` + `googleBot` directives).

Three **section layouts** then override parts of it for their entire subtree:

| Layout | `title` set | `description` language | `openGraph.images` |
|---|---|---|---|
| `app/(pages)/umumiy-malumot/(umumiy-malumot)/layout.tsx` | `"AIRI"` | English | ❌ dropped |
| `app/(pages)/ilmiy-tadqiqot/layout.tsx` | `"AIRI — Ilmiy Tadqiqot"` | English | ❌ dropped |
| `app/(pages)/ishlab-chiqarish/(ishlab-chiqarish)/layout.tsx` | `"AIRI — Artificial Intelligence Research Institute of Uzbekistan"` | English | ❌ dropped |

Two consequences, both confirmed in the build:

- Because a plain-string `title` in a child layout **replaces** the parent's `title.default` but the
  parent's `template` still applies, inner pages render `AIRI | AIRI`.
- Because a child `openGraph` object **replaces** rather than merges, the root's `og:image` is lost
  for every page beneath those layouts.

### 4.2 Title duplication (measured across all 219 generated pages)

| Count | `<title>` | Cause |
|---|---|---|
| 38 | `AIRI \| AIRI` | `umumiy-malumot` section layout |
| 25 | `AIRI — Ilmiy Tadqiqot \| AIRI` | `ilmiy-tadqiqot` section layout |
| 18 | `International Cooperation Document — AIRI` | `research-internationalrelationships/[slug]` `generateMetadata` returns a constant, not the document title |
| 11 | `Dissertatsiya himoyasi bo'lib o'tadi` | duplicate titles in the news dataset itself |
| 8 | `Internal Document — AIRI` | `institute-internaldocuments/[slug]` — same constant-title bug |
| 3 | root default title | `/`, `/404`, `/_not-found` (expected) |
| 3 | `Hamkorlik aloqalari kengaymoqda` | duplicate news titles |
| 2 | `Xalqaro hamkorlik aloqalari kengaymoqda` | duplicate news titles |

**100 of 219 pages (46%) do not have a unique title.**

### 4.3 Description duplication

| Count | Description (truncated) | Cause |
|---|---|---|
| 38 | `AIRI — Research Institute for the Development of Digital Tec…` | `umumiy-malumot` layout — **English** |
| 26 | `AIRI is a national research institute advancing artificial i…` | `ilmiy-tadqiqot` layout — **English** |
| 18 | `View an international cooperation document of AIRI.` | constant in `generateMetadata` |
| 8 | `View an internal document of AIRI.` | constant in `generateMetadata` |

64 Uzbek-language pages serve an English meta description.

### 4.4 Open Graph / Twitter coverage

| Metric | Pages |
|---|---|
| Total generated pages | 219 |
| With `og:title` | 219 ✅ |
| With `twitter:card` | 219 ✅ |
| **With `og:image`** | **114** |
| **Without `og:image`** | **105** ❌ |

`og:image` values in use: 110 news-specific images + 13 × `/logo.png` + 4 × `/og-image.jpg`.
The 105 pages with no image are all of `/ilmiy-tadqiqot/*` and most of `/umumiy-malumot/*`.

### 4.5 Missing root-level metadata

- No `icons` key — the favicon relies solely on the `app/favicon.ico` file convention. No
  `apple-touch-icon`, no multi-size set.
- No `manifest`.
- No `verification` (needed for Google Search Console meta-tag verification in Task 16).

---

## 5. `robots.txt` — verified working ✅

`app/robots.ts` (with `export const dynamic = "force-static"`) generates `out/robots.txt`:

```ts
rules:  [{ userAgent: "*", allow: "/",
           disallow: ["/_next/", "/404", ...SEO_EXCLUDED_PATHS] }]
sitemap: `${SITE_URL}/sitemap.xml`
host:    SITE_URL
```

`SEO_EXCLUDED_PATHS` comes from `config/seo-excluded-paths.json`:

```json
["/ilmiy-tadqiqot/research-projects",
 "/ilmiy-tadqiqot/scientific-articles",
 "/ilmiy-tadqiqot/scientific-journals"]
```

The emitted file contains correct `Sitemap:` and `Host:` lines. **No dangerous rules** — no
site-wide `Disallow: /`. The excluded entries lack trailing slashes while real URLs have them, but
robots.txt uses prefix matching, so `/ilmiy-tadqiqot/research-projects/` is still covered.

The three excluded pages *additionally* carry `<meta name="robots" content="noindex, nofollow">` via
their own `export const metadata` — confirmed in `out/ilmiy-tadqiqot/research-projects/index.html`.
This is belt-and-braces and correct for pages whose content is not ready.

---

## 6. `sitemap.xml` — verified working ✅

Generated by `scripts/generate-sitemap.mjs`, chained into `npm run build` (not a `postbuild` hook).

- Walks `out/` recursively; any directory containing `index.html` becomes a route.
- Skips `_next`, `_not-found`, `/404`.
- Reads `config/seo-excluded-paths.json` directly from disk and filters
  `route === p || route.startsWith(p + "/")`.
- Emits `${SITE_URL}${route}/` — trailing slashes match `trailingSlash: true`. ✅
- `changefreq`: `daily` for `/`, `weekly` for routes containing `news`/`yangilik`/`elon`, else
  `monthly`. `priority`: `1.0` for root, else `max(0.5, 0.9 − (depth−1) × 0.1)`.

**Result: 214 `<url>` entries, 0 hits for the three excluded paths.** Exclusion works end to end.

**One caveat:** `lastmod` is derived from the `index.html` **file mtime**, which is regenerated on
every build. Every URL therefore claims it was modified today, on every deploy — the signal carries
no information. For news, `news-index.json` already holds real publication dates that could be used
instead.

---

## 7. Canonical and URL consistency

### 7.1 The inherited-canonical defect (CRITICAL — fixed in §12)

`app/layout.tsx` declared:

```ts
alternates: { canonical: "/" }
```

Next.js App Router **inherits** metadata down the tree; a literal `"/"` is not re-resolved relative
to each route. Measured across the build output before the fix:

```
109 × rel="canonical" href="https://airi.uz/"
110 × correct per-article canonical
```

The only pages that escaped were the 110 news articles, because
`app/(pages)/umumiy-malumot/(umumiy-malumot)/news/[slug]/layout.tsx` constructs its own absolute URL
(line 17).

### 7.2 Three separate sources of truth for the site URL

| Location | Form |
|---|---|
| `config/seo.ts` | `export const SITE_URL = "https://airi.uz"` |
| `scripts/generate-sitemap.mjs:17` | `const SITE_URL = "https://airi.uz"` — **re-declared**, not imported |
| `news/[slug]/layout.tsx` | `process.env.NEXT_PUBLIC_SITE_URL \|\| "https://airi.uz"` |

A domain change today requires three coordinated edits, and the third can diverge silently via an env
var the other two do not read.

### 7.3 `public/.htaccess` — no canonicalisation

Present: `DirectoryIndex`, `Options -Indexes`, extensionless-URL rewrites to `index.html`, a legacy
`/$1.html` fallback, a catch-all to `/404.html`, `ErrorDocument 404`, cache headers (1y immutable for
JS/CSS/fonts, 30d images, `must-revalidate` for HTML, 1h for `sitemap.xml`/`robots.txt`), and
`mod_deflate` compression.

Absent:

- **No HTTP → HTTPS redirect.**
- **No `www` → apex (or apex → `www`) redirect.**
- **No trailing-slash 301.** The rewrite serves `/path` and `/path/` from the same `index.html` with
  a `200` — two reachable URLs, identical content, and (before the fix) both canonicalising to `/`.

---

## 8. Multilingual architecture

`next-intl@4.8.3` is installed, but the implementation is **entirely client-side**:

- `i18n/config.ts` declares `locales = ["uz", "ru", "en"]`, `defaultLocale = "uz"`.
- `i18n/locale-provider.tsx` is `"use client"` and persists the choice in `localStorage`.
- Dictionaries live in `i18n/dictionaries/{uz,ru,en}.ts`; ~54 files consume `useLocale`.
- News titles and descriptions in `news-index.json` are `{uz, ru, en}` objects.

**SEO consequences:**

- There is exactly **one URL per page** for all three languages. No `/uz`, `/ru`, `/en` prefixes.
- `hreflang` is **impossible** in the current architecture — there is no distinct URL to point at.
- Google will only ever index the server-rendered default (uz). The ru and en translations are
  invisible to search, however good they are.
- The root `openGraph.locale` is hardcoded `uz_UZ`, consistent with that reality.

Making Task 10 (Multilingual SEO) possible requires URL-based locale routing first. Under
`output: "export"` that means generating a static tree per locale — a structural change, not a
metadata change.

---

## 9. Static build output verification

Ran the project's own `npm run build` and inspected `out/`.

| Check | Result |
|---|---|
| Pages containing `<h1>` | **219 / 219** ✅ |
| Body text present in static HTML | ✅ — client pages render fully at build time |
| Navigation links present as real `<a href>` | ✅ |
| `<title>` present | 219 / 219 (but 100 non-unique — §4.2) |
| `meta description` present | 219 / 219 (but heavily duplicated — §4.3) |
| `og:image` present | 114 / 219 ❌ |

**Important positive finding:** although 21 of 51 source pages are client components, the static
export pre-renders them, so no indexable content depends on client-side JavaScript. This removes what
would otherwise be the largest risk for a site of this shape.

### 9.1 Exception — the news list page renders no links at build time

The one place where the positive finding above does **not** hold:

| Page | Links to `/umumiy-malumot/news/<slug>/` in static HTML |
|---|---|
| `out/index.html` (homepage) | 10 ✅ |
| **`out/umumiy-malumot/news/index.html` (news index)** | **0** ❌ |

`app/(pages)/umumiy-malumot/(umumiy-malumot)/news/page.tsx` fetches its list through the client-side
`useNews()` hook, so the exported HTML contains only loading skeletons. The page that exists
specifically to link to all 110 articles links to none of them.

Crawlers can still reach every article via `sitemap.xml`, and 10 via the homepage, but the other
100 have **no internal link path at all** — no anchor text, no crawl depth signal, no PageRank flow.
The same pattern affects the category filter and pagination, which are `router.replace()` query-string
updates rather than crawlable URLs.

### 9.2 LCP images (Core Web Vitals)

Next.js dev logs flagged `/news/images/06_08_2026_14_56/1.jpg` as the Largest Contentful Paint element
without `priority`. Audit of all seven `<NewsImage>` call sites:

| Call site | Role | `priority` before | Correct? |
|---|---|---|---|
| `app/_components/news/news.tsx:135` | homepage carousel | `index < 3` | ✅ |
| `.../news/page.tsx:160` | news list cards | `index < 2` | ✅ |
| `.../news/page.tsx:227` | 80 px sidebar thumbs | none | ✅ (below fold, tiny) |
| `.../Landing/News.tsx:57` | 460 px landing carousel | **none** | ❌ **fixed** |
| `.../Landing/NewsSuccess.tsx:65` | full-bleed hero slider (`sizes="100vw"`, up to 140 units tall) | **none** | ❌ **fixed** — strongest LCP candidate on `/umumiy-malumot` |
| `.../news/[slug]/news-detail-client.tsx:80` | article gallery | none | ✅ (below fold) |
| `.../news/[slug]/news-detail-client.tsx:100` | related-news thumbs | none | ✅ (below fold) |

Note: news detail pages compute `newsImage(article)` at line 37 but only use it to de-duplicate the
gallery — no cover image is rendered above the article body. That is a content/design decision, not a
defect, but it means the `og:image` for an article is never visible on the article itself.

---

### 9.3 Heading structure — correction to §9

The `<h1>` count in §9 was measured with a naive "does the page contain `<h1>`" grep, which produced
a false positive. Measuring *how many* `<h1>` elements each page has tells a different story:

| `<h1>` per page | Pages |
|---|---:|
| 1 | 7 |
| **2** | **212** |

The first `<h1>` on almost every page is identical:

```
RAQAMLI TEXNOLOGIYALAR VA SUNʼIY INTELLEKTNI RIVOJLANTIRISH ILMIY-TADQIQOT INSTITUTI
```

It comes from the loading screen (`app/loading.tsx:23` and
`app/_components/loading/loading.tsx:177`), whose markup is written into the static export as the
Suspense fallback. The page's own heading is the *second* `<h1>`.

Five pages had no heading of their own at all — their only `<h1>` was the loader's:
`institute-eventcalendar`, `institute-internaldocuments`, `institute-structureofinstitute`,
`/umumiy-malumot/news`, `research-internationalrelationships`.

This raises Task 6 (Semantic HTML & Headings) from "low priority" to a real finding — recorded as
**H7** below. Fixed in [Task 3](./03-page-metadata.md).

## 10. Findings by severity

### Critical

| # | Finding | Evidence | Status |
|---|---|---|---|
| C1 | Root `alternates.canonical: "/"` inherited by every route; 109 pages canonicalised to the homepage | `app/layout.tsx`; 109 identical canonicals in `out/` | **Fixed** (§12) |

### High

| # | Finding | Evidence |
|---|---|---|
| H1 | 38 pages titled `AIRI \| AIRI` | `app/(pages)/umumiy-malumot/(umumiy-malumot)/layout.tsx` |
| H2 | 25 pages titled `AIRI — Ilmiy Tadqiqot \| AIRI` | `app/(pages)/ilmiy-tadqiqot/layout.tsx` |
| H3 | 64 Uzbek pages serve an English `meta description` | the three section layouts |
| H4 | 105 pages have no `og:image` — child `openGraph` replaces the root's | the three section layouts |
| H5 | 21 client pages cannot export `metadata` and have no sibling layout to carry it | see §3, Type = C |
| H6 | The news index page emits **0** crawlable links to its 110 articles; 100 articles have no internal link path anywhere on the site | §9.1 |
| H7 | 212 pages carry **two** `<h1>` elements — the loading screen's institute name plus the page's own; 5 pages have no heading of their own at all | §9.3 — **fixed in Task 3** |

### Medium

| # | Finding | Evidence |
|---|---|---|
| M1 | 18 + 8 detail pages share a constant title/description from `generateMetadata` | `research-internationalrelationships/[slug]`, `institute-internaldocuments/[slug]` |
| M2 | `SITE_URL` defined in three places, one of them an env var the others ignore | §7.2 |
| M3 | `.htaccess` has no HTTPS, `www`, or trailing-slash 301s → duplicate reachable URLs | `public/.htaccess` |
| M4 | `sitemap.xml` `lastmod` = file mtime, meaningless after every build | `scripts/generate-sitemap.mjs` — **fixed 2026-08-12**, see [04-sitemap-lastmod.md](./04-sitemap-lastmod.md) |
| M5 | No `icons`, `manifest`, or `verification` in root metadata | `app/layout.tsx` |
| M6 | 16 news articles share 3 titles (dataset-level duplication) | `src/data/news/news-index.json` |
| M7 | Two above-the-fold news images lacked `priority`, hurting LCP | §9.2 — **fixed** |
| M8 | News category filter and pagination use `router.replace()` query params, so filtered/paginated views are not crawlable URLs | `.../news/page.tsx` |
| M9 | **108 of 110 news articles have no publication date at all** (`publishedAt` empty in the source data, not a mapping bug) — no `lastmod`, no visible date, no `article:published_time` | `src/data/news/news-articles.json` |

### Low

| # | Finding |
|---|---|
| L1 | No `error.tsx` / `global-error.tsx` anywhere |
| L2 | `keywords` are set at root and in all three section layouts; Google ignores the tag |
| L3 | Large build artifacts committed at repo root (`out.zip`, a 345 MB `.tar.gz`) |

---

## 11. Investigated and dismissed — not defects

### 11.1 The hydration mismatch warning in `next dev`

The dev server reports:

```
A tree hydrated but some attributes of the server rendered HTML didn't match the client properties.
-   bis_skin_checked="1"
```

**This is not a bug in this codebase.** `bis_skin_checked` is an attribute injected into the DOM by
the **Bitdefender TrafficLight browser extension** before React hydrates; React sees an attribute the
server never rendered and reports a mismatch. React's own message lists this case explicitly
("It can also happen if the client has a browser extension installed which messes with the HTML").
The accompanying stack frames point at `chrome-extension://fmkadmapgofadopljbjfkapdkoienihi`, which
is React DevTools — also an extension, not application code.

The reported diff contains **only** that attribute — no mismatched text, dates, or markup — so there
is no `Date.now()`/`Math.random()`/locale-formatting problem behind it.

**Verification:** reload the page in an incognito window with extensions disabled; the warning
disappears. It never occurs in production (`output: "export"`), since these warnings are dev-only.

**No action taken, and none should be.** Attempting to silence it with `suppressHydrationWarning` on
layout elements would mask genuine hydration bugs later.

## 12. Assumptions and unknowns

These were **not** verified and must not be treated as findings:

- Whether `airi.uz` currently serves `www.airi.uz`, and whether HTTPS is enforced at the host or CDN
  level rather than in `.htaccess`. Requires a live HTTP check.
- Whether the site is verified in Google Search Console, and what is currently indexed
  (`site:airi.uz`). Task 16/17.
- Whether the 3 duplicate-title news items (M6) are genuinely distinct events or accidental
  duplicates in the dataset. Requires editorial review.
- Image `alt` quality was **not** audited page by page — reserved for Task 7.
- Broken/orphan internal links were **not** crawled — reserved for Task 13.
- Core Web Vitals were **not** measured — reserved for Task 27.

---

## 13. Changes made in this task

Three files changed. Everything else — section layouts, titles, descriptions, `.htaccess`,
`robots.ts`, the sitemap generator — was left exactly as it was.

**1. `app/layout.tsx` — the critical canonical fix (C1)**

The `alternates: { canonical: "/" }` block was removed and replaced with a comment explaining why it
must not come back. With it gone, pages that do not declare their own canonical emit none, and Google
self-canonicalises by URL — the correct default. The homepage's own canonical, and per-page
canonicals for the rest of the site, are restored deliberately in Task 5.

Verified after rebuild: **0 duplicate canonicals** (was 109); the 110 correct per-article news
canonicals are untouched.

**2. `.../components/Landing/News.tsx` — LCP (M7)**

The `items.map((item) =>` callback now takes `index`, and the 460 px carousel image receives
`priority={index < 3}`, matching the pattern already used in `app/_components/news/news.tsx`.

**3. `.../components/Landing/NewsSuccess.tsx` — LCP (M7)**

The full-bleed hero slider image receives `priority={currentIndex === 0}` — eager for the first
slide, which is what paints on load, and lazy for subsequent slides so Next.js does not warn about
too many priority images.

---

## 14. Recommendations — next-task mapping

Only tasks with evidence in this audit are listed.

| Task | Status after this audit | Justified by |
|---|---|---|
| **2 — Global Metadata Foundation** | Needed, small | M2 (consolidate `SITE_URL`), M5 (`icons`, `manifest`, `verification`) |
| **3 — Page-level Metadata** | **Done** — see [03-page-metadata.md](./03-page-metadata.md) | H1, H2, H3, H5, M1 — 100 pages need unique Uzbek titles/descriptions; 21 client pages need sibling `layout.tsx` files (pattern already used by `institute-teachers/[slug]/layout.tsx`) |
| **4 — robots + sitemap** | **De-scope — already done** | §5, §6 verified working. Only M4 (`lastmod`) remains |
| **5 — Canonical & Duplicate URLs** | Needed | C1 follow-up (add per-page canonicals) + M3 (`.htaccess` 301s) |
| **6 — Semantic HTML & Headings** | Needed (revised up) | §9.3 — H7: duplicate `<h1>` on 212 pages. Largely handled in Task 3 |
| **7 — Image SEO** | Not yet assessed | Deferred; see §11 |
| **8 — Dynamic Page SEO** | Needed | M1 — 10 dynamic routes, only 3 return item-specific metadata |
| **9 — Open Graph** | **Done in Task 3** | H4 resolved — `og:image` now 219/219 |
| **10 — Multilingual SEO** | **Blocked** | §8 — requires URL-based locale routing before `hreflang` is meaningful |
| **16 — Search Console** | Ready after Tasks 3 and 5 | M5 (`verification` key) |

**Suggested order:** 3 → 5 → 9 → 2 → 8, then re-audit before Task 16.
Rationale: Tasks 3 and 5 remove the duplicate-content signals that would otherwise distort everything
Search Console reports in Task 16/17.
