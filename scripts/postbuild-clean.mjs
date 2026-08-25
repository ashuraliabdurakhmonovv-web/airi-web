/** @format */

/**
 * Build'dan keyin statik eksportdan "yumshoq 404" papkalarini olib tashlaydi.
 *
 * Muammo: Next `output: "export"` rejimida 404 sahifasini uch nusxada yozadi —
 * `out/404.html`, `out/404/index.html` va `out/_not-found/index.html`. Uchalasi
 * bayt-bayt bir xil. `public/.htaccess` dagi 2-qoida mavjud papkalarni
 * o'zgarishsiz o'tkazib yuboradi, shuning uchun Apache
 * `https://airi.uz/404/` va `https://airi.uz/_not-found/` manzillariga
 * 404 emas, **200 OK** qaytaradi. Google buni "soft 404" deb belgilaydi va
 * bunday URL indeksga tushib qolishi mumkin.
 *
 * `out/404.html` — TEGILMAYDI: `ErrorDocument 404 /404.html` aynan shunga
 * ishora qiladi. Papkalar esa hech qayerdan havola qilinmaydi.
 */

import fs from "node:fs";
import path from "node:path";

// `process.cwd()` emas — boshqa build scriptlari bilan bir xil bo'lsin va
// qaysi papkadan chaqirilganidan qat'i nazar ishlasin.
const projectRoot = path.resolve(import.meta.dirname, "..");
const outDir = path.join(projectRoot, "out");

if (!fs.existsSync(outDir)) {
  console.error("[postbuild] `out/` topilmadi — avval `next build` ishga tushirilsin");
  process.exit(1);
}

const SOFT_404_DIRS = ["404", "_not-found"];
const removed = [];

for (const dir of SOFT_404_DIRS) {
  const target = path.join(outDir, dir);
  if (fs.existsSync(target)) {
    fs.rmSync(target, { recursive: true, force: true });
    removed.push(`${dir}/`);
  }
}

// `ErrorDocument` uchun zarur fayl joyida ekanini tekshiramiz — u yo'qolsa
// Apache o'zining zavod 404 sahifasini ko'rsatadi.
const errorDocument = path.join(outDir, "404.html");
if (!fs.existsSync(errorDocument)) {
  console.error("[postbuild] XATO: `out/404.html` yo'q, `ErrorDocument 404` ishlamaydi");
  process.exit(1);
}

console.log(
  removed.length
    ? `[postbuild] soft-404 papkalari o'chirildi: ${removed.join(", ")} (404.html saqlandi)`
    : "[postbuild] soft-404 papkalari topilmadi (404.html saqlandi)",
);
