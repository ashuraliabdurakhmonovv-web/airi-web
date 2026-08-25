/**
 * Build'dan keyin eski (migratsiyadan oldingi) URL'lar uchun 301 qoidalarini yozadi.
 *
 * Ikkita chiqish fayli:
 *   1. `out/.htaccess`                 — `legacy-news` bloki to'ldiriladi
 *   2. `deploy/old.airi.uz/.htaccess`  — eski domenlar uchun tayyor fayl
 *
 * Eski sayt yangiliklari `https://airi.uz/news/<uuid>-<inglizcha-slug>` shaklida
 * indekslangan. Yangi saytda ular `/umumiy-malumot/news/<slug>/` da. Moslik
 * `src/data/news/news-articles.json` dagi `legacyId` / `sourceUrl` maydonlarida.
 *
 * Nega build vaqtida: Apache `.htaccess` ichida `Include` direktivasini
 * qo'llab-quvvatlamaydi — qoidalar bitta faylga inline yozilishi shart.
 * 100+ qatorni qo'lda saqlash o'rniga generatsiya qilamiz.
 *
 * @format
 */

import fs from "node:fs";
import path from "node:path";

const projectRoot = path.resolve(import.meta.dirname, "..");
const htaccessPath = path.join(projectRoot, "out", ".htaccess");
const articlesPath = path.join(projectRoot, "src", "data", "news", "news-articles.json");
const SITE_URL = "https://airi.uz";

const NEWS_BEGIN = "  # BEGIN legacy-news";
const NEWS_END = "  # END legacy-news";
const MAP_BEGIN = "  # BEGIN legacy-map";
const MAP_END = "  # END legacy-map";

if (!fs.existsSync(htaccessPath)) {
  console.error("[legacy] `out/.htaccess` topilmadi — avval `next build` ishga tushirilsin.");
  process.exit(1);
}

// ── 1. Yangilik redirectlarini yasaymiz ───────────────────────────────────

const articles = JSON.parse(fs.readFileSync(articlesPath, "utf8"));
const UUID_RE = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

/** Maqolaning eski UUID'sini `legacyId` yoki `sourceUrl` dan oladi. */
function legacyUuidOf(article) {
  const source = article.legacyId ?? article.sourceUrl ?? "";
  const match = String(source).match(UUID_RE);
  return match ? match[0].toLowerCase() : null;
}

const seen = new Set();
const newsRules = [];
let skipped = 0;

for (const article of articles) {
  const uuid = legacyUuidOf(article);
  if (!uuid || !article.slug) {
    skipped += 1;
    continue;
  }
  // Bir UUID ikki marta uchrasa birinchisi yutadi — Apache ham shunday ishlaydi.
  if (seen.has(uuid)) continue;
  seen.add(uuid);

  // Slug dumi vaqt o'tib o'zgargan bo'lishi mumkin — faqat UUID bo'yicha
  // moslashtiramiz, qolgan qismini ixtiyoriy qoldiramiz.
  newsRules.push(
    `  RewriteRule ^(?:(?:uz|ru|en)/)?news/${uuid}(?:-[^/]*)?/?$ ` +
      `/umumiy-malumot/news/${article.slug}/ [R=301,L]`
  );
}

const newsBlock = [
  NEWS_BEGIN,
  `  # ${newsRules.length} ta eski yangilik URL'i — generate-legacy-redirects.mjs yozgan.`,
  "  # Qo'lda tahrirlamang: keyingi build ustidan yozib yuboradi.",
  ...newsRules,
  NEWS_END,
].join("\n");

// ── 2. `out/.htaccess` ichiga joylaymiz ───────────────────────────────────

const original = fs.readFileSync(htaccessPath, "utf8");
const newsBegin = original.indexOf(NEWS_BEGIN);
const newsEnd = original.indexOf(NEWS_END);

if (newsBegin === -1 || newsEnd === -1) {
  console.error(
    "[legacy] `.htaccess` ichida BEGIN/END legacy-news markerlari topilmadi — " +
      "`public/.htaccess` o'zgartirilgan bo'lsa, markerlarni qaytaring."
  );
  process.exit(1);
}

const updated =
  original.slice(0, newsBegin) + newsBlock + original.slice(newsEnd + NEWS_END.length);

fs.writeFileSync(htaccessPath, updated, "utf8");
console.log(
  `[legacy] ${newsRules.length} ta yangilik redirecti yozildi -> out/.htaccess` +
    (skipped ? ` (${skipped} ta maqolada eski UUID yo'q — o'tkazildi)` : "")
);

// ── 3. `old.airi.uz` uchun alohida .htaccess ──────────────────────────────
// Aynan shu moslikni eski domenlarda ham ishlatamiz, faqat manzillar absolyut.

const mapBegin = updated.indexOf(MAP_BEGIN);
const mapEnd = updated.indexOf(MAP_END);

if (mapBegin === -1 || mapEnd === -1) {
  console.error("[legacy] `legacy-map` markerlari topilmadi — old.airi.uz fayli yozilmadi.");
  process.exit(1);
}

const mapRules = updated
  .slice(mapBegin + MAP_BEGIN.length, mapEnd)
  .split("\n")
  .filter((line) => /^\s*RewriteRule/.test(line))
  // 410 (`[G]`) qoidalari eski domenga O'TKAZILMAYDI: bu yerda Googlebot
  // 301'ni o'qishi va reyting vaznini yangi saytga olib o'tishi kerak.
  // 410 esa uni "abadiy yo'q" deb indeksdan tashlaydi — vazn yo'qoladi.
  .filter((line) => !/\[[^\]]*\bG\b[^\]]*\]\s*$/.test(line))
  // Nisbiy manzilni (`/umumiy-malumot/...`) absolyutga aylantiramiz.
  .map((line) => line.replace(/(\s)(\/\S*)(\s+\[R=301)/, `$1${SITE_URL}$2$3`));

const oldHtaccess = `# old.airi.uz / old2.airi.uz — eski domenlar uchun .htaccess
#
# AVTOMATIK GENERATSIYA QILINGAN: scripts/generate-legacy-redirects.mjs
# Qo'lda tahrirlamang — moslikni \`web-airi/public/.htaccess\` dagi
# \`legacy-map\` bloki ichida o'zgartiring va qayta build qiling.
#
# Ishlatish: shu faylni eski domen(lar)ning public_html papkasiga \`.htaccess\`
# nomi bilan yuklang. O'sha papkada boshqa hech narsa kerak emas.
#
# MUHIM: bu domenda 410 (\`[G]\`) ISHLATMANG va \`robots.txt\` bilan
# indeksatsiyani TAQIQLAMANG. Googlebot 301'ni o'qiy olishi shart — aks holda
# u eski manzillarni indeksdan olib tashlamaydi va eski sahifalarning reyting
# vazni yangi saytga o'tmaydi.

Options -Indexes

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # HTTPS majburiy — 301 zanjiri qisqa bo'lsin
  RewriteCond %{HTTPS} !=on
  RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L,NE]

  # Eski manzil -> yangi saytdagi MOS sahifa (bitta sakrashda)
${mapRules.join("\n")}

  # Qolgan hamma narsa -> yangi saytning bosh sahifasi
  RewriteRule ^ ${SITE_URL}/ [R=301,L]
</IfModule>
`;

const oldDir = path.join(projectRoot, "deploy", "old.airi.uz");
fs.mkdirSync(oldDir, { recursive: true });
fs.writeFileSync(path.join(oldDir, ".htaccess"), oldHtaccess, "utf8");
console.log(`[legacy] ${mapRules.length} ta qoida yozildi -> deploy/old.airi.uz/.htaccess`);
