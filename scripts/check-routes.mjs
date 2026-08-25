/** @format */

/**
 * Sahifa registri va haqiqiy build natijasi mos kelishini tekshiradi.
 *
 * Eng muhim tekshiruv — TIL: `/ru/**` sahifalari haqiqatan ruscha matn bilan
 * chiqqanmi. Agar `initialDictionary` ulanishi jimgina buzilsa, build baribir
 * muvaffaqiyatli tugaydi va biz o'zbekcha matnli ruscha URL'larni — ya'ni
 * duplicate content'ni — chiqarib yuborardik. Bu hech narsa chiqarmaslikdan
 * yomonroq, shuning uchun bunday holatda build TO'XTAYDI.
 *
 * Ishga tushirish: `node scripts/check-routes.mjs` (build zanjirida avtomatik)
 */

import fs from "node:fs";
import path from "node:path";

const projectRoot = path.resolve(import.meta.dirname, "..");
const outDir = path.join(projectRoot, "out");
const SITE_URL = "https://airi.uz";

const pages = JSON.parse(fs.readFileSync(path.join(projectRoot, "config", "pages.json"), "utf8"));

if (!fs.existsSync(outDir)) {
  console.error("[check-routes] `out/` topilmadi — avval `npm run build`");
  process.exit(1);
}

let failures = 0;
const fail = (message) => {
  console.error(`✗ ${message}`);
  failures += 1;
};

/** Sahifa HTML'ini o'qiydi (teglar va scriptlarsiz matn ham qaytariladi). */
function readPage(routePath) {
  const clean = routePath.replace(/^\/+|\/+$/g, "");
  const file = path.join(outDir, clean, "index.html");
  if (!fs.existsSync(file)) return null;
  const html = fs.readFileSync(file, "utf8");
  const text = html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ");
  return { html, text };
}

function localePathFor(routePath, locale) {
  if (locale === "uz") return routePath;
  return routePath === "/" ? `/${locale}` : `/${locale}${routePath}`;
}

/** Til bo'yicha "bu matn haqiqatan shu tilda" tekshiruvi. */
const LANGUAGE_PROOF = {
  // Kirill harflar — ruscha sahifada ko'p bo'lishi shart.
  ru: (text) => (text.match(/[Ѐ-ӿ]/g) || []).length,
  // Inglizchada o'zbekchaga xos belgilar (`oʻ`, `gʻ`, `ʼ`) bo'lmasligi kerak.
  en: (text) => {
    const uzbekOnly = (text.match(/[ʻʼ‘’]/g) || []).length;
    const latin = (text.match(/[A-Za-z]/g) || []).length;
    return uzbekOnly > 40 ? 0 : latin;
  },
};

const MIN_PROOF = 200;

for (const [routePath, entry] of Object.entries(pages)) {
  for (const locale of entry.locales) {
    const localized = localePathFor(routePath, locale);
    const page = readPage(localized);

    if (!page) {
      fail(`${localized}/ — registrda "${locale}" bor, lekin out/ da sahifa yo'q`);
      continue;
    }

    // 1. `<html lang>` marshrut tiliga mos bo'lishi shart.
    const lang = (page.html.match(/<html\s+lang="([a-z-]+)"/) || [])[1];
    if (lang !== locale) {
      fail(`${localized}/ — <html lang="${lang}">, kutilgan "${locale}"`);
    }

    // 2. Canonical o'ziga ishora qilsin, boshqa til variantiga emas.
    const expectedCanonical = `${SITE_URL}${localized === "/" ? "/" : `${localized}/`}`;
    const canonical = (page.html.match(/rel="canonical"\s+href="([^"]+)"/) || [])[1];
    if (canonical !== expectedCanonical) {
      fail(`${localized}/ — canonical "${canonical}", kutilgan "${expectedCanonical}"`);
    }

    // 3. hreflang to'plami to'liq va o'zaro bo'lsin.
    const hreflangs = [...page.html.matchAll(/hrefLang="([a-z-]+)"/gi)].map((m) => m[1]);
    const expected = entry.locales.length > 1 ? [...entry.locales, "x-default"] : [];
    if (hreflangs.length !== expected.length) {
      fail(`${localized}/ — ${hreflangs.length} ta hreflang, kutilgan ${expected.length}`);
    }

    // 4. ENG MUHIMI: matn haqiqatan shu tilda chiqqanmi.
    const proof = LANGUAGE_PROOF[locale];
    if (proof) {
      const score = proof(page.text);
      if (score < MIN_PROOF) {
        fail(
          `${localized}/ — "${locale}" tilidagi matn topilmadi (ko'rsatkich ${score} < ${MIN_PROOF}). ` +
            "Lug'at ulanishi buzilgan: bu sahifa duplicate content bo'lib chiqadi.",
        );
      }
    }
  }
}

const total = Object.values(pages).reduce((sum, entry) => sum + entry.locales.length, 0);

if (failures) {
  console.error(`\n[check-routes] ${failures} ta muammo (${total} ta sahifa-til juftligi tekshirildi)`);
  process.exit(1);
}
console.log(`[check-routes] ${total} ta sahifa-til juftligi — hammasi o'tdi`);
