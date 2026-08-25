import fs from "node:fs";
import path from "node:path";

const projectRoot = path.resolve(import.meta.dirname, "..");
const exportRoot = path.resolve(projectRoot, "..", "airi_news_export");
const sourcePath = path.join(exportRoot, "airi_news.json");
const dataRoot = path.join(projectRoot, "src", "data", "news");
const publicImagesRoot = path.join(projectRoot, "public", "news", "images");

const rows = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
const boilerplate = /^(404|topilmadi|sizga qanday yordam bera olamiz\?|oyqiz bilan suhbat|so['’]rov|suhbat bo['’]sh|svg vector icons|asl matn|bu tarjimaga baho bering|fikr-mulohazangizdan google tarjimani yaxshilashda foydalaniladi)$/i;
// The export contains 426 article photographs plus repeated site chrome icons.
// Keep only the photographs as news media; the existing AIRI image is the fallback.
const imageExtensions = /\.jpe?g$/i;

function cleanText(value = "") {
  return String(value)
    .replace(/\r/g, "")
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function stripPageBoilerplateText(value = "") {
  const text = cleanText(value);
  const marker = /(?:^|\n)(?:sizga qanday yordam bera olamiz\?|oyqiz bilan suhbat|so['’]rov|suhbat bo['’]sh|asl matn|bu tarjimaga baho bering)(?:\n|$)|\s*svg vector icons\s*:/i;
  const match = marker.exec(text);
  return (match ? text.slice(0, match.index) : text).trim();
}

function meaningfulLines(row) {
  return stripPageBoilerplateText(row.content_text)
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !boilerplate.test(line));
}

function titleFor(row) {
  const supplied = cleanText(row.title);
  if (supplied && !boilerplate.test(supplied)) return supplied;
  const lines = meaningfulLines(row);
  if (lines[0] === "#HIMOYA") {
    return "Dissertatsiya himoyasi bo‘lib o‘tadi";
  }
  return (lines[0] || "AIRI yangiliklari").replace(/^[-–—•]+\s*/, "").slice(0, 180);
}

function slugify(value) {
  return cleanText(value)
    .toLocaleLowerCase("uz")
    .replace(/[’ʻʼ`‘']/g, "")
    .replace(/[^a-z0-9\s-]/gi, " ")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 120)
    .replace(/-+$/, "");
}

function validSlug(value) {
  return typeof value === "string" && /^[a-z0-9][a-z0-9-]*$/i.test(value.trim()) && value.trim() !== "[slug]";
}

function categoryFor(row, title) {
  const text = `${title}\n${row.content_text || ""}`.toLocaleLowerCase("uz");
  if (/forum|konferens|anjuman|seminar/.test(text)) return "Forumlar";
  if (/hamkor|delegats|tashrif|aloqa|uchrashuv/.test(text)) return "Hamkorlik";
  if (/sun['’]?iy intellekt|algoritm|mashinaviy|neyron/.test(text)) return "Sun’iy intellekt";
  if (/tadqiqot|ilmiy|dissertats|maqola|laborator/.test(text)) return "Tadqiqotlar";
  if (/innovats|texnolog|raqamli/.test(text)) return "Innovatsiyalar";
  return "Institut hayoti";
}

function dateValue(row) {
  const value = cleanText(row.published_at || row.date_text);
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function stripUnsafeHtml(html, imageMap) {
  let value = String(html || "");
  const boilerplateMarker = /<h1\b[^>]*>\s*Sizga qanday yordam bera olamiz\?\s*<\/h1>|<div\b[^>]*class=["'][^"']*\bhidden\b[^"']*["'][^>]*>|Svg Vector Icons\s*:/i;
  const boilerplateMatch = boilerplateMarker.exec(value);
  if (boilerplateMatch) value = value.slice(0, boilerplateMatch.index);
  value = value.replace(/<\/?(?:script|style|noscript|iframe|form|button|input|textarea|select|option|svg|canvas)[^>]*>/gi, "");
  value = value.replace(/<img\b([^>]*)>/gi, (_match, attrs) => {
    const srcMatch = attrs.match(/\bsrc\s*=\s*["']([^"']+)["']/i);
    const local = srcMatch ? imageMap.get(srcMatch[1]) : null;
    return local ? `<img src="${local}" alt="" loading="lazy" />` : "";
  });
  value = value.replace(/\s+on[a-z-]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "");
  value = value.replace(/\s+(?:class|id|style|data-[a-z-]+)\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "");
  value = value.replace(/\s+(href|src)\s*=\s*["']([^"']+)["']/gi, (_match, name, url) => {
    if (name.toLowerCase() === "src") return ` src="${url.startsWith("/") ? url : ""}"`;
    return /^(?:https?:|mailto:|#)/i.test(url) ? ` href="${url}"` : "";
  });
  return value.replace(/<\/?(?:body|html|head|div|span|main|section|article|a)[^>]*>/gi, (tag) => {
    const name = tag.match(/^<\/?([a-z]+)/i)?.[1]?.toLowerCase();
    if (["a"].includes(name)) return tag.startsWith("</") ? "</a>" : tag;
    return "";
  }).trim();
}

function imagesFor(row) {
  return (row.downloaded_images || [])
    .map((item) => ({ item, source: path.join(exportRoot, item.local_path || "") }))
    .filter(({ item, source }) => imageExtensions.test(item.local_path || "") && fs.existsSync(source));
}

fs.rmSync(path.join(projectRoot, "public", "news", "images"), { recursive: true, force: true });
fs.mkdirSync(dataRoot, { recursive: true });
fs.mkdirSync(publicImagesRoot, { recursive: true });

const seen = new Set();
const index = [];
const articles = [];
let copiedImages = 0;
let articlesWithoutImages = 0;
let duplicateRows = 0;

for (const [sourceOrder, row] of rows.entries()) {
  if (!row?.id || row.slug === "not-found" || /(^|\n)404(\n|$)/.test(row.content_text || "")) continue;
  const title = titleFor(row);
  let slug = validSlug(row.slug) ? row.slug.trim().replace(/-+$/, "") : slugify(`${row.id}-${title}`);
  if (!slug || slug.includes("/") || slug === "[slug]") slug = slugify(`${row.id}-${title}`);
  if (seen.has(slug)) {
    duplicateRows += 1;
    slug = `${slug}-${row.id.slice(0, 8)}`;
  }
  if (!slug || seen.has(slug)) continue;
  seen.add(slug);

  const imageMap = new Map();
  const articleImages = [];
  for (const { item, source } of imagesFor(row)) {
    const fileName = path.basename(item.local_path);
    const targetDir = path.join(publicImagesRoot, row.id);
    fs.mkdirSync(targetDir, { recursive: true });
    fs.copyFileSync(source, path.join(targetDir, fileName));
    const publicPath = `/news/images/${row.id}/${fileName}`;
    imageMap.set(item.source_url, publicPath);
    articleImages.push(publicPath);
    copiedImages += 1;
  }
  if (!articleImages.length) articlesWithoutImages += 1;

  const text = meaningfulLines(row).filter((line) => line !== title).join(" ");
  const description = text.slice(0, 280).trim();
  const publishedAt = dateValue(row);
  const category = categoryFor(row, title);
  const safeHtml = stripUnsafeHtml(row.content_html, imageMap);
  const common = {
    id: row.id,
    slug,
    title,
    description,
    category,
    publishedAt,
    displayDate: publishedAt ? new Intl.DateTimeFormat("uz-UZ", { day: "numeric", month: "long", year: "numeric" }).format(new Date(publishedAt)) : "",
    coverImage: articleImages[0] || "/logo.png",
    language: row.language || "uz",
    isFeatured: sourceOrder < 6,
    sourceOrder,
  };
  index.push(common);
  articles.push({
    ...common,
    content: stripPageBoilerplateText(row.content_text),
    contentHtml: safeHtml,
    images: articleImages,
    sourceUrl: row.canonical_url || row.url || "",
    legacyId: row.id,
  });
}

const byDate = (a, b) => (b.publishedAt ? Date.parse(b.publishedAt) : 0) - (a.publishedAt ? Date.parse(a.publishedAt) : 0) || a.sourceOrder - b.sourceOrder;
index.sort(byDate);
articles.sort(byDate);
fs.writeFileSync(path.join(dataRoot, "news-index.json"), `${JSON.stringify(index, null, 2)}\n`);
fs.writeFileSync(path.join(dataRoot, "news-articles.json"), `${JSON.stringify(articles, null, 2)}\n`);
console.log(JSON.stringify({ sourceRows: rows.length, articles: articles.length, uniqueSlugs: seen.size, copiedImages, articlesWithoutImages, realDates: articles.filter((item) => item.publishedAt).length, duplicateRows }, null, 2));
