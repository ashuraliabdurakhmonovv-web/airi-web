/**
 * Build'dan keyin `out/` papkasini skanerlab `out/sitemap.xml` yasaydi.
 *
 * Nega `app/sitemap.ts` emas: sahifalar ro'yxati bir nechta joyda (nav-items,
 * generateStaticParams'lar, statik ma'lumot fayllari) tarqoq. Build natijasini
 * skanerlash esa aynan chiqqan sahifalarni beradi — yangi route qo'shilganda
 * hech narsa qo'lda yangilanmaydi.
 *
 * @format
 */

import fs from "node:fs";
import path from "node:path";

const projectRoot = path.resolve(import.meta.dirname, "..");
const outDir = path.join(projectRoot, "out");
const SITE_URL = "https://airi.uz";

const excludedPaths = JSON.parse(
  fs.readFileSync(path.join(projectRoot, "config", "seo-excluded-paths.json"), "utf8")
);

/**
 * Sahifa registri — `changefreq`, `noindex` va til muqobillari uchun.
 * `.ts` emas `.json` o'qiladi: bu script oddiy Node ESM.
 */
const pages = JSON.parse(
  fs.readFileSync(path.join(projectRoot, "config", "pages.json"), "utf8")
);

/** `/ru/umumiy-malumot/faq` -> `/umumiy-malumot/faq` (registr kaliti). */
function registryKeyFor(route) {
  return route.replace(/^\/(?:ru|en)(?=\/|$)/, "") || "/";
}

function localePathFor(routePath, locale) {
  if (locale === "uz") return routePath;
  return routePath === "/" ? `/${locale}` : `/${locale}${routePath}`;
}

function locFor(routePath) {
  return routePath === "/" ? `${SITE_URL}/` : `${SITE_URL}${routePath}/`;
}

/**
 * `xhtml:link` muqobillari — sitemap darajasidagi hreflang.
 *
 * Sahifa `<head>` idagi hreflang bilan bir xil to'plam ataylab takrorlanadi:
 * Google ikkala kanalni ham o'qiydi va sahifa biror sababga ko'ra crawl
 * qilinmasa, sitemap yagona manba bo'lib qoladi. Muqobillar HAR BIR
 * `<url>` blokida to'liq takrorlanishi shart — annotatsiya o'zaro
 * bo'lmasa, Google uni tashlab yuboradi.
 */
function alternatesFor(route) {
  const entry = pages[registryKeyFor(route)];
  if (!entry || entry.locales.length < 2) return [];

  const key = registryKeyFor(route);
  const links = entry.locales.map(
    (locale) =>
      `    <xhtml:link rel="alternate" hreflang="${locale}" href="${locFor(localePathFor(key, locale))}"/>`
  );
  links.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${locFor(key)}"/>`);
  return links;
}

// Foydalanuvchiga ko'rinmaydigan yoki indeksatsiyaga yaramaydigan yo'llar
const skippedDirs = new Set(["_next", "_not-found"]);
const skippedRoutes = new Set(["/404", "/_not-found"]);

if (!fs.existsSync(outDir)) {
  console.error("[sitemap] `out/` topilmadi — avval `next build` ishga tushirilsin.");
  process.exit(1);
}

/** `out/` ichidagi har bir `index.html` — bitta sahifa. */
function collectRoutes(dir, prefix = "") {
  const routes = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory() || skippedDirs.has(entry.name)) continue;
    const childDir = path.join(dir, entry.name);
    const route = `${prefix}/${entry.name}`;
    const indexFile = path.join(childDir, "index.html");
    if (fs.existsSync(indexFile)) {
      routes.push({ route });
    }
    routes.push(...collectRoutes(childDir, route));
  }
  return routes;
}

function isExcluded(route) {
  if (skippedRoutes.has(route)) return true;
  // Til prefiksi olib tashlanadi, aks holda `/ru/...` noindex ro'yxatidan o'tib ketardi.
  const key = registryKeyFor(route);
  if (pages[key]?.noindex) return true;
  return excludedPaths.some((p) => key === p || key.startsWith(`${p}/`));
}

/**
 * `lastmod` faqat HAQIQIY sana ma'lum bo'lganda yoziladi.
 *
 * Avval u `index.html` fayl mtime'idan olinardi — build har safar faylni qayta
 * yozgani uchun 214 ta URL ham "bugun o'zgardi" deb turardi. Google lastmod'ni
 * ishonchsiz deb topsa, uni butunlay e'tiborsiz qoldiradi. Yolg'on sanadan
 * ko'ra sanani umuman bermaslik afzal.
 *
 * Yangiliklar uchun `news-index.json` dagi `publishedAt` — haqiqiy sana.
 */
const newsDates = new Map();
try {
  const newsIndex = JSON.parse(
    fs.readFileSync(
      path.join(projectRoot, "src", "data", "news", "news-index.json"),
      "utf8"
    )
  );
  for (const item of newsIndex) {
    if (item?.slug && item?.publishedAt) {
      newsDates.set(item.slug, item.publishedAt.slice(0, 10));
    }
  }
} catch {
  // Yangiliklar fayli topilmasa sitemap baribir yasalaveradi — lastmodsiz.
}

function lastModFor(route) {
  const match = route.match(/^\/umumiy-malumot\/news\/(.+)$/);
  return match ? newsDates.get(match[1]) : undefined;
}

function changeFreqFor(route) {
  const fromRegistry = pages[registryKeyFor(route)]?.changefreq;
  if (fromRegistry) return fromRegistry;
  if (route === "/") return "daily";
  if (route.includes("/news") || route.includes("yangilik") || route.includes("elon")) {
    return "weekly";
  }
  return "monthly";
}

const rootIndex = path.join(outDir, "index.html");
const routes = [
  ...(fs.existsSync(rootIndex)
    ? [{ route: "/" }]
    : []),
  ...collectRoutes(outDir),
]
  .filter(({ route }) => !isExcluded(route))
  .sort((a, b) => a.route.localeCompare(b.route));

const body = routes
  .map(({ route }) => {
    // trailingSlash: true bilan mos bo'lishi uchun canonical URL ham `/` bilan tugaydi
    const lastMod = lastModFor(route);
    return [
      "  <url>",
      `    <loc>${locFor(route)}</loc>`,
      ...(lastMod ? [`    <lastmod>${lastMod}</lastmod>`] : []),
      `    <changefreq>${changeFreqFor(route)}</changefreq>`,
      ...alternatesFor(route),
      "  </url>",
    ].join("\n");
  })
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${body}
</urlset>
`;

fs.writeFileSync(path.join(outDir, "sitemap.xml"), xml, "utf8");
console.log(`[sitemap] ${routes.length} ta sahifa yozildi -> out/sitemap.xml`);
