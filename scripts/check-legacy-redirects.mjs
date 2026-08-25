/** @format */

/**
 * `out/.htaccess` dagi legacy qoidalarini Apache'siz tekshiradi.
 *
 * Qoidalarni faylning o'zidan o'qiydi va Apache'ning `mod_rewrite` mantig'ini
 * taqlid qiladi: qoidalar tartib bo'yicha sinaladi, birinchi mos kelgani
 * `[L]` bilan to'xtaydi. Shundan keyin natija ikki tomonlama tekshiriladi:
 *
 *   1. Kutilgan manzilga borganmi (`EXPECTATIONS`);
 *   2. Manzil `out/` da HAQIQATDAN mavjudmi — 301 qilib, keyin 404 berish
 *      oddiy 404'dan yaxshiroq emas.
 *
 * Ishga tushirish: `node scripts/check-legacy-redirects.mjs`
 */

import fs from "node:fs";
import path from "node:path";

const projectRoot = path.resolve(import.meta.dirname, "..");
const htaccessPath = path.join(projectRoot, "out", ".htaccess");
const outDir = path.join(projectRoot, "out");

/**
 * Search Console (oxirgi 3 oy) bo'yicha haqiqiy eski manzillar.
 * `null` — 410 kutilyapti (qoida mos keladi, lekin redirect emas).
 */
const EXPECTATIONS = [
  // ── Yassi bo'lim manzillari ──
  ["institute-abouttheinstitute", "/umumiy-malumot/institute-abouttheinstitute/"],
  ["institute-instituteteam", "/umumiy-malumot/institute-instituteteam/"],
  ["institute-teachers", "/umumiy-malumot/institute-teachers/"],
  ["institute-graduates", "/umumiy-malumot/institute-graduates/"],
  ["institute-talentedyouth", "/umumiy-malumot/institute-talentedyouth/"],
  ["institute-structureofinstitute", "/umumiy-malumot/institute-structureofinstitute/"],
  ["institute-eventcalendar", "/umumiy-malumot/institute-eventcalendar/"],
  ["institute-degreeawardingscientificcouncil", "/ilmiy-tadqiqot/degree-awarding-council/"],
  ["research-internationalrelationships", "/umumiy-malumot/research-internationalrelationships/"],
  ["research-doctorate", "/ilmiy-tadqiqot/research-doctorate/"],
  ["research-conferences", "/ilmiy-tadqiqot/research-conferences/"],
  ["research-laboratories", "/ilmiy-tadqiqot/research-laboratories/"],
  ["research-scientificboard", "/ilmiy-tadqiqot/research-scientificboard/"],
  ["generalinformation-statesymbols", "/umumiy-malumot/generalinformation-statesymbols/"],
  ["generalinformation-trainingcourse", "/ilmiy-tadqiqot/research-doctorate/"],
  ["opendata-managementreceptiondays", "/umumiy-malumot/opendata-managementreceptiondays/"],
  ["opendata-requisitesoftheinstitute", "/umumiy-malumot/opendata-requisitesoftheinstitute/"],
  ["opendata-vacancies", "/umumiy-malumot/opendata-vacancies/"],
  ["scientificresearch", "/ilmiy-tadqiqot/"],

  // ── Shaxs sahifalari ──
  ["teachersshavkatfozilov", "/umumiy-malumot/institute-teachers/fozilov-shavkat/"],
  ["teachersmirzayevnomoz", "/umumiy-malumot/institute-teachers/mirzayev-nomaz/"],
  ["teachersravshannormakhammad", "/umumiy-malumot/institute-teachers/ravshanov-normaxmad/"],
  ["ilxomismailov", "/umumiy-malumot/institute-graduates/ilxom-ismailov/"],
  ["qodirbekmaxarov", "/umumiy-malumot/institute-graduates/qodirbek-maxarov/"],
  ["masudjoneshmurodov", "/umumiy-malumot/institute-graduates/masudjon-eshmurodov/"],
  ["gulstanartikbayeva", "/umumiy-malumot/institute-graduates/gulstan-artikbayeva/"],
  ["talentedyouthboronovnazim", "/umumiy-malumot/institute-talentedyouth/boronov-nazim/"],
  ["talentedyouthsshakhzodbekyetmishbayev", "/umumiy-malumot/institute-talentedyouth/yetmishboyev-shaxzod/"],
  ["talentedyouthotabekusmanovd8fddeaf-020e-4526-bf63-8ca99ec826ed", "/umumiy-malumot/institute-talentedyouth/usmonov-otabek/"],
  ["rustamyusupov", "/ilmiy-tadqiqot/research-scientificboard/"],
  ["aminovsabur", "/ilmiy-tadqiqot/research-scientificboard/"],
  ["elbekqosimov", "/umumiy-malumot/institute-instituteteam/"],
  ["xabibaabdiyeva", "/umumiy-malumot/institute-instituteteam/"],
  ["kamolaablazova", "/umumiy-malumot/institute-instituteteam/"],
  ["davronshokirov", "/umumiy-malumot/institute-instituteteam/"],
  ["boburallaberdiyev", "/umumiy-malumot/institute-instituteteam/"],
  ["sardorjumaniyozov", "/umumiy-malumot/institute-instituteteam/"],
  ["nozirtoxtamurodov", "/umumiy-malumot/institute-instituteteam/"],

  // ── Yakka sahifalar ──
  ["rekvizit", "/umumiy-malumot/opendata-requisitesoftheinstitute/"],
  ["guvohnoma", "/umumiy-malumot/opendata-requisitesoftheinstitute/"],
  ["maqola2", "/ilmiy-tadqiqot/"],
  ["tadqiqotmaqolasi", "/ilmiy-tadqiqot/"],
  ["digitaltechnologiesandartificialintelligencetodayandthefuture", "/ilmiy-tadqiqot/research-conferences/"],
  ["050111", "/ilmiy-tadqiqot/research-doctorate/"],
  ["05.01.02", "/ilmiy-tadqiqot/research-doctorate/"],
  ["pdf-viewer/f195951c-d989-4788-a1f4-a08fca560d1f", "/umumiy-malumot/institute-internaldocuments/"],

  // ── 410 Gone ──
  ["not-found", null],

  // ── Eski old.airi.uz uslubi (avvaldan bor edi — regressiya nazorati) ──
  ["uz/institute/", "/umumiy-malumot/institute-abouttheinstitute/"],
  ["symbols", "/umumiy-malumot/generalinformation-statesymbols/"],
  ["uz/doctorate/", "/ilmiy-tadqiqot/research-doctorate/"],
  ["uz/", "/"],

  // ── Eski ruscha manzillar -> YANGI ruscha sahifalar ──
  ["ru/institute/", "/ru/umumiy-malumot/institute-abouttheinstitute/"],
  ["ru/team", "/ru/umumiy-malumot/institute-instituteteam/"],
  ["ru/teachers", "/ru/umumiy-malumot/institute-teachers/"],
  ["ru/laboratories/", "/ru/ilmiy-tadqiqot/research-laboratories/"],
  ["ru/doctorate", "/ru/ilmiy-tadqiqot/research-doctorate/"],
  ["ru/kontakty", "/ru/boglanish/"],
  ["ru/vakansii", "/ru/umumiy-malumot/opendata-vacancies/"],
  ["ru/news/1234", "/ru/umumiy-malumot/news/"],
  // Noma'lum til prefiksli manzil O'SHA TIL bosh sahifasiga (o'zbekchaga EMAS)
  ["ru/allaqanday-yoq-sahifa", "/ru/"],
  ["en/some-missing-page", "/en/"],

  // ── Eski inglizcha manzillar ──
  ["en/institute/", "/en/umumiy-malumot/institute-abouttheinstitute/"],
  ["en/doctorate", "/en/ilmiy-tadqiqot/research-doctorate/"],
  ["en/contacts", "/en/boglanish/"],
];

/** Bu manzillar to'g'ridan-to'g'ri xizmat qilinishi kerak (redirect emas). */
const MUST_BE_SERVED = [
  "ru/",
  "en/",
  "en/umumiy-malumot/faq/",
  "ru/umumiy-malumot/faq/",
  "ru/ilmiy-tadqiqot/research-laboratories/",
  "umumiy-malumot/faq/",
];

/** Bu manzillar HECH QANDAY legacy qoidaga tushmasligi kerak. */
const MUST_NOT_MATCH = [
  "umumiy-malumot/institute-abouttheinstitute/",
  "ilmiy-tadqiqot/research-laboratories/",
  "ishlab-chiqarish/projects/",
  "boglanish/",
  "sitemap.xml",
  "robots.txt",
];

// ── Qoidalarni `.htaccess` dan o'qiymiz ──────────────────────────────────

if (!fs.existsSync(htaccessPath)) {
  console.error("[check-legacy] `out/.htaccess` topilmadi — avval `npm run build`");
  process.exit(1);
}

const source = fs.readFileSync(htaccessPath, "utf8");
const mapBegin = source.indexOf("  # BEGIN legacy-map");
const mapEnd = source.indexOf("  # END legacy-map");

if (mapBegin === -1 || mapEnd === -1) {
  console.error("[check-legacy] legacy-map markerlari topilmadi");
  process.exit(1);
}

const rules = source
  .slice(mapBegin, mapEnd)
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line.startsWith("RewriteRule"))
  .map((line) => {
    // `RewriteRule <pattern> <target> [flags]`
    const match = line.match(/^RewriteRule\s+(\S+)\s+(\S+)\s+\[([^\]]+)\]$/);
    if (!match) return null;
    const [, pattern, target, flags] = match;
    return { pattern, target, flags, regex: new RegExp(pattern), gone: /\bG\b/.test(flags) };
  })
  .filter(Boolean);

/**
 * `.htaccess` dagi 2-qoida: mavjud fayl yoki papkaga tegilmaydi.
 * Legacy bloki undan KEYIN turadi, shuning uchun haqiqiy sahifalar
 * qoidalarga umuman yetib bormaydi. `/ru/**` paydo bo'lgach bu muhim.
 */
function servedDirectly(url) {
  const clean = url.replace(/^\/+|\/+$/g, "");
  if (!clean) return true;
  const target = path.join(outDir, clean);
  return fs.existsSync(target);
}

/** Apache mantig'i: birinchi mos kelgan `[L]` qoida g'olib. */
function resolve(url) {
  if (servedDirectly(url)) return { served: true };

  for (const rule of rules) {
    const match = url.match(rule.regex);
    if (!match) continue;
    if (rule.gone) return { gone: true, pattern: rule.pattern };
    // `$1` kabi backreference'larni almashtiramiz
    const target = rule.target.replace(/\$(\d)/g, (_, n) => match[Number(n)] ?? "");
    return { target, pattern: rule.pattern };
  }
  return null;
}

/** Manzil `out/` da haqiqatan mavjudmi? */
function targetExists(target) {
  if (target === "/") return fs.existsSync(path.join(outDir, "index.html"));
  const clean = target.replace(/^\/+|\/+$/g, "");
  return fs.existsSync(path.join(outDir, clean, "index.html"));
}

// ── Tekshirish ───────────────────────────────────────────────────────────

let failures = 0;

for (const url of MUST_BE_SERVED) {
  const result = resolve(url);
  if (!result?.served) {
    console.error(`✗ /${url} to'g'ridan-to'g'ri berilishi kerak edi, natija: ${result?.target ?? "404"}`);
    failures += 1;
  }
}

for (const [url, expected] of EXPECTATIONS) {
  const result = resolve(url);

  if (expected === null) {
    if (!result?.gone) {
      console.error(`✗ /${url} -> 410 kutilgan edi, natija: ${result?.target ?? "mos qoida yo'q"}`);
      failures += 1;
    }
    continue;
  }

  if (!result) {
    console.error(`✗ /${url} -> hech qanday qoidaga tushmadi (kutilgan: ${expected})`);
    failures += 1;
    continue;
  }
  if (result.served) {
    console.error(`✗ /${url} to'g'ridan-to'g'ri berildi, redirect kutilgan edi: ${expected}`);
    failures += 1;
    continue;
  }
  if (result.gone) {
    console.error(`✗ /${url} -> 410 berdi, kutilgan: ${expected}`);
    failures += 1;
    continue;
  }
  if (result.target !== expected) {
    console.error(`✗ /${url} -> ${result.target}\n    kutilgan: ${expected}\n    qoida: ${result.pattern}`);
    failures += 1;
    continue;
  }
  if (!targetExists(result.target)) {
    console.error(`✗ /${url} -> ${result.target} — bu manzil out/ da MAVJUD EMAS (301 keyin 404)`);
    failures += 1;
  }
}

for (const url of MUST_NOT_MATCH) {
  const result = resolve(url);
  // `served` — 2-qoida bo'yicha to'g'ridan-to'g'ri berilgan, bu KUTILGAN natija.
  if (result && !result.served) {
    console.error(`✗ /${url} legacy qoidaga tushdi (${result.pattern}) — tushmasligi kerak edi`);
    failures += 1;
  }
}

const total = EXPECTATIONS.length + MUST_NOT_MATCH.length + MUST_BE_SERVED.length;
if (failures) {
  console.error(`\n[check-legacy] ${failures}/${total} tekshiruv muvaffaqiyatsiz`);
  process.exit(1);
}
console.log(`[check-legacy] ${rules.length} ta qoida, ${total} ta tekshiruv — hammasi o'tdi`);
