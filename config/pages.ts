/** @format */

import rawPages from "./pages.json";
import type { SeoLocale } from "./seo";

/**
 * Sahifa registri — marshrut haqidagi barcha SEO ma'lumoti bitta joyda.
 *
 * Shundan oziqlanadi:
 *   1. `pageMetadataFor()` — title, description, canonical, OG, Twitter
 *   2. `hreflangFor()`     — `<link rel="alternate" hreflang="...">`
 *   3. `scripts/generate-sitemap.mjs` — changefreq, noindex, til muqobillari
 *   4. `<BreadcrumbJsonLd>` — `parent` zanjiri orqali
 *
 * Ma'lumot ataylab `.json` da: `scripts/*.mjs` oddiy Node ESM va `.ts`
 * import qila olmaydi. Xuddi shu yondashuv `seo-excluded-paths.json` da ham.
 *
 * Yangi sahifa qo'shganda: `pages.json` ga bitta yozuv qo'shiladi va
 * sahifaning `layout.tsx` ida `pageMetadataFor(PATH, "uz")` chaqiriladi —
 * sitemap, breadcrumb va hreflang o'zi to'g'rilanadi.
 */

export type RouteLocale = SeoLocale;

export type PageEntry = {
  /** Breadcrumb zanjiri uchun ota sahifa yo'li. Bosh sahifada bo'lmaydi. */
  parent?: string;
  /**
   * Qaysi tillarda bu sahifa HAQIQATDAN mavjud.
   *
   * `translated: boolean` emas, ataylab ro'yxat: RU daraxti EN dan oldin
   * chiqadi va o'sha oraliqda uz/ru sahifalar hali qurilmagan `/en/...` ni
   * hreflang'da e'lon qilmasligi kerak — mavjud bo'lmagan muqobilni
   * ko'rsatish umuman ko'rsatmaslikdan yomonroq.
   */
  locales: RouteLocale[];
  /**
   * Sarlavha va tavsif. Faqat breadcrumb zanjirida qatnashadigan oraliq
   * sahifalarda tushirib qoldirilishi mumkin — ular hali `pageMetadataFor()`
   * ga o'tkazilmagan va o'z metadata'sini o'zi beradi.
   */
  meta?: Partial<Record<RouteLocale, { title: string; description: string }>>;
  /** Breadcrumb'da ko'rinadigan qisqa nom. Berilmasa `meta.title` olinadi. */
  crumb?: Partial<Record<RouteLocale, string>>;
  changefreq?: "daily" | "weekly" | "monthly" | "yearly";
  noindex?: boolean;
  /** Sahifaga xos OG rasmi. */
  image?: string;
};

export const PAGES = rawPages as unknown as Record<string, PageEntry>;

/**
 * Registrdagi yozuvni qaytaradi, topilmasa XATO tashlaydi.
 *
 * Bu ataylab: barcha chaqiruvchilar server yoki build vaqtida ishlaydi,
 * shuning uchun xato sahifa ko'rinishini emas, BUILD'ni to'xtatadi — ya'ni
 * ro'yxatga qo'shilmagan sahifa jimgina noto'g'ri metadata bilan chiqib
 * ketmaydi.
 */
export function pageEntry(path: string): PageEntry {
  const entry = PAGES[normalizePath(path)];
  if (!entry) {
    throw new Error(`[pages] "${path}" uchun yozuv config/pages.json da yo'q`);
  }
  return entry;
}

/** Oxirgi `/` ni olib tashlaydi (registr kalitlari slashsiz saqlanadi). */
export function normalizePath(path: string): string {
  if (!path || path === "/") return "/";
  return `/${path.replace(/^\/+|\/+$/g, "")}`;
}

/**
 * Yo'lni til bo'yicha manzilga aylantiradi.
 * O'zbekcha ildizda qoladi (`/umumiy-malumot/faq`), ru/en prefiks oladi.
 */
export function localePath(path: string, locale: RouteLocale): string {
  const clean = normalizePath(path);
  if (locale === "uz") return clean;
  return clean === "/" ? `/${locale}` : `/${locale}${clean}`;
}

/**
 * Breadcrumb zanjiri: ildizdan boshlab, sahifaning o'zi bilan tugaydi.
 *
 * Registrda aniq mos kelmagan yo'l uchun (masalan `/umumiy-malumot/news/<slug>`)
 * yuqoriga qarab eng yaqin mavjud kalitgacha ko'tariladi.
 */
export function crumbChain(path: string): string[] {
  const chain: string[] = [];
  const seen = new Set<string>();

  let current: string | undefined = nearestKnown(normalizePath(path));
  while (current && PAGES[current] && !seen.has(current)) {
    seen.add(current);
    chain.unshift(current);
    current = PAGES[current].parent;
  }

  if (chain[0] !== "/") chain.unshift("/");
  return chain;
}

/** Yo'l registrda bo'lmasa, segmentlarni qisqartirib eng yaqin ota'ni topadi. */
function nearestKnown(path: string): string {
  let candidate = path;
  while (candidate !== "/" && !PAGES[candidate]) {
    const cut = candidate.lastIndexOf("/");
    candidate = cut <= 0 ? "/" : candidate.slice(0, cut);
  }
  return candidate;
}

/** Breadcrumb yorlig'i: `crumb` bo'lsa u, bo'lmasa sarlavha. */
export function crumbLabel(path: string, locale: RouteLocale): string {
  const entry = PAGES[normalizePath(path)];
  if (!entry) return path;
  return (
    entry.crumb?.[locale] ??
    entry.crumb?.uz ??
    entry.meta?.[locale]?.title ??
    entry.meta?.uz?.title ??
    path
  );
}
