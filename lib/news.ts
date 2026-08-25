import type { LocalizedText, News } from "@/types/api";
import type { StaticNewsIndexItem } from "@/lib/news/static-news-repository";

export const NEWS_CATEGORIES = [
  "Barchasi",
  "Forumlar",
  "Hamkorlik",
  "Sun’iy intellekt",
  "Tadqiqotlar",
  "Innovatsiyalar",
  "Institut hayoti",
] as const;

const CATEGORY_QUERIES: Record<string, string> = {
  Barchasi: "",
  Forumlar: "forumlar",
  Hamkorlik: "hamkorlik",
  "Sun’iy intellekt": "suniy-intellekt",
  Tadqiqotlar: "tadqiqotlar",
  Innovatsiyalar: "innovatsiyalar",
  "Institut hayoti": "institut-hayoti",
};

export function categoryToQuery(category: string) {
  return CATEGORY_QUERIES[category] || "";
}

export function queryToCategory(query?: string | null) {
  return Object.keys(CATEGORY_QUERIES).find((key) => CATEGORY_QUERIES[key] === query) || "Barchasi";
}

export function localizedText(value: LocalizedText | undefined, locale: string) {
  if (!value) return "";
  if (typeof value === "string") {
    try {
      return localizedText(JSON.parse(value) as LocalizedText, locale);
    } catch {
      return value;
    }
  }
  const record = value as unknown as Record<string, string>;
  return record[locale] || record.uz || record.ru || record.en || "";
}

export function formatUzbekDate(value?: string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const months = ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr"];
  return `${date.getUTCDate()}-${months[date.getUTCMonth()]}, ${date.getUTCFullYear()}-yil`;
}

export function getAssetUrl(value?: string | null) {
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  const normalized = value.replace(/\\/g, "/");
  if (normalized.startsWith("/")) return normalized;
  if (normalized.startsWith("news/images/")) return `/${normalized}`;
  if (normalized.startsWith("images/")) return `/news/${normalized}`;
  return `/${normalized}`;
}

type NewsImageCandidate = News | StaticNewsIndexItem | Record<string, unknown>;

const NEWS_IMAGE_FALLBACK = "/logo.png";

function normalizeImagePath(value: unknown) {
  if (typeof value !== "string" || !value.trim()) return "";
  const normalized = value.trim().replace(/\\/g, "/");
  if (/^https?:\/\//i.test(normalized)) return normalized;
  const imagesIndex = normalized.indexOf("images/");
  if (imagesIndex >= 0) return `/news/${normalized.slice(imagesIndex)}`;
  return getAssetUrl(normalized);
}

function firstImage(value: unknown) {
  if (typeof value === "string") {
    const normalized = normalizeImagePath(value);
    return normalized === "/aboutinstitute.png" ? "" : normalized;
  }
  if (value && typeof value === "object") {
    const item = value as Record<string, unknown>;
    const normalized = normalizeImagePath(item.url || item.src || item.path || item.local_path || item.image || item.img);
    return normalized === "/aboutinstitute.png" ? "" : normalized;
  }
  return "";
}

export function resolveNewsImage(news: NewsImageCandidate) {
  const item = news as Record<string, unknown>;
  const direct = [item.thumbnail, item.cover, item.mainImage, item.image, item.img, item.coverImage]
    .map(firstImage)
    .find(Boolean);
  if (direct) return direct;

  const downloaded = Array.isArray(item.downloaded_images) ? item.downloaded_images : [];
  const downloadedImage = downloaded.map(firstImage).find(Boolean);
  if (downloadedImage) return downloadedImage;

  const images = Array.isArray(item.images) ? item.images : [];
  const galleryImage = images.map(firstImage).find(Boolean);
  if (galleryImage) return galleryImage;

  const html = typeof item.content_html === "string" ? item.content_html : typeof item.contentHtml === "string" ? item.contentHtml : "";
  const htmlImage = html.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1];
  return normalizeImagePath(htmlImage) || NEWS_IMAGE_FALLBACK;
}

export function newsImage(news: NewsImageCandidate) {
  return resolveNewsImage(news);
}

export function newsHref(news: News | StaticNewsIndexItem) {
  return `/umumiy-malumot/news/${encodeURIComponent(news.slug)}`;
}

export function rewriteArticleAssetUrls(html: string) {
  return html.replace(/(src=["'])(\/assets\/[^"']+)/gi, (_match, prefix, value) => `${prefix}${getAssetUrl(value)}`);
}
