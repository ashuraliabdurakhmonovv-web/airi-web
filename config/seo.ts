/** @format */

import type { Metadata } from "next";
import excludedPaths from "./seo-excluded-paths.json";
import { PAGES, localePath, normalizePath, pageEntry } from "./pages";

/** Saytning production manzili. Canonical, OG va sitemap shu yerdan oladi. */
export const SITE_URL = "https://airi.uz";

/**
 * Indeksatsiyadan va sitemapdan chiqarib tashlanadigan yo'llar.
 * Kontenti hali tayyor bo'lmagan sahifalar shu yerga qo'shiladi — kontent
 * chiqqach, `config/seo-excluded-paths.json` dan olib tashlansa yetarli.
 * Shu bitta ro'yxatdan `app/robots.ts` ham, sitemap generatori ham foydalanadi.
 */
export const SEO_EXCLUDED_PATHS: string[] = excludedPaths;

/** Brend nomi — title shabloni va OG `siteName` uchun. */
export const SITE_NAME = "AIRI";

/** Sahifa o'z rasmini bermasa ishlatiladigan ijtimoiy tarmoq rasmi (1200×630). */
export const DEFAULT_OG_IMAGE = "/og-image.jpg";

/**
 * Yo'ldan to'liq canonical URL yasaydi.
 * `next.config.ts` da `trailingSlash: true` bo'lgani uchun oxirida `/` qoladi.
 */
export function canonicalUrl(path: string): string {
  if (!path || path === "/") return `${SITE_URL}/`;
  const clean = `/${path.replace(/^\/+|\/+$/g, "")}`;
  return `${SITE_URL}${clean}/`;
}

type PageMetadataInput = {
  /** Sahifa sarlavhasi — root layoutdagi `%s | AIRI` shabloniga tushadi. */
  title: string;
  /** 120–160 belgi atrofida, o'zbekcha, sahifaning haqiqiy mazmuni. */
  description: string;
  /** Sayt ildizidan boshlangan yo'l, masalan `/ilmiy-tadqiqot/seminars`. */
  path: string;
  /** Sahifaga xos OG rasmi (yangilik, loyiha va h.k.). */
  image?: string;
  /** Yangilik/maqola sahifalari uchun `"article"`. Sukut bo'yicha `"website"`. */
  type?: "website" | "article";
  /** ISO sana — faqat `type: "article"` da OG'ga tushadi. */
  publishedTime?: string;
  /** ISO sana — faqat `type: "article"` da OG'ga tushadi. */
  modifiedTime?: string;
  /** Sahifa indekslanmasin (topilmagan yangilik, tayyor bo'lmagan bo'lim). */
  noindex?: boolean;
  /** Sahifa tili. OG `locale` va `alternateLocale` shundan yasaladi. */
  locale?: SeoLocale;
  /** hreflang to'plami. `config/pages.ts` dagi `hreflangFor()` beradi. */
  languages?: Record<string, string>;
};

/** Metadata darajasida qo'llab-quvvatlanadigan tillar. */
export type SeoLocale = "uz" | "ru" | "en";

/** Open Graph `locale` kodlari — OG BCP-47 emas, underscore'li shaklni kutadi. */
const OG_LOCALE: Record<SeoLocale, string> = {
  uz: "uz_UZ",
  ru: "ru_RU",
  en: "en_US",
};

/**
 * Sahifa metadata'sini bir joydan yasaydi: title, description, canonical,
 * Open Graph va Twitter kartasi.
 *
 * Nega kerak: bo'lim (section) layoutlarida `openGraph` obyektini qayta
 * e'lon qilish root layoutdagisini BUTUNLAY almashtiradi — natijada `og:image`
 * yo'qoladi. Shu helper har bir sahifada to'liq to'plamni qayta beradi,
 * shuning uchun bunday yo'qotish bo'lmaydi.
 */
export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  type = "website",
  publishedTime,
  modifiedTime,
  noindex = false,
  locale = "uz",
  languages,
}: PageMetadataInput): Metadata {
  const url = canonicalUrl(path);

  return {
    // `absolute` — ataylab: oddiy matnli `title` layoutda berilsa, u o'sha
    // bo'lim ostidagi sahifalar uchun root shablonini (`%s | AIRI`) o'chiradi
    // va detal sahifalar brendsiz qolardi. Brendni shu yerda o'zimiz qo'shamiz.
    title: { absolute: `${title} | ${SITE_NAME}` },
    description,
    alternates: {
      canonical: url,
      // Faqat tarjimasi HAQIQATDAN mavjud sahifalarda beriladi. Mavjud
      // bo'lmagan URL'ni hreflang'da e'lon qilish umuman bermaslikdan yomon.
      ...(languages ? { languages } : {}),
    },
    openGraph: {
      type,
      locale: OG_LOCALE[locale],
      siteName: SITE_NAME,
      url,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/**
 * Sahifaning til muqobillari (`hreflang`).
 *
 * Faqat tarjimasi HAQIQATDAN mavjud sahifalar uchun qaytariladi: registrda
 * `locales` bitta tildan iborat bo'lsa, `undefined`. Mavjud bo'lmagan URL'ni
 * muqobil sifatida e'lon qilish Google tomonidan yaroqsiz deb tashlanadi va
 * butun klasterga zarar beradi.
 *
 * `x-default` o'zbekcha (ildiz) variantga ishora qiladi — asosiy bozor
 * O'zbekiston, va aynan o'sha URL'lar allaqachon indekslangan.
 */
export function hreflangFor(path: string): Record<string, string> | undefined {
  const entry = PAGES[normalizePath(path)];
  if (!entry || entry.locales.length < 2) return undefined;

  const languages: Record<string, string> = {};
  for (const locale of entry.locales) {
    languages[locale] = canonicalUrl(localePath(path, locale));
  }
  languages["x-default"] = canonicalUrl(path);
  return languages;
}

/**
 * Registrga tayangan metadata — sahifa faylida sarlavha/tavsif takrorlanmaydi.
 *
 * `pageMetadata()` ustidagi yupqa qatlam: uning imzosi o'zgarmagan, shuning
 * uchun registrga hali ko'chirilmagan sahifalar avvalgidek ishlayveradi.
 */
export function pageMetadataFor(path: string, locale: SeoLocale = "uz"): Metadata {
  const entry = pageEntry(path);
  const meta = entry.meta?.[locale] ?? entry.meta?.uz;

  if (!meta) {
    throw new Error(`[seo] "${path}" uchun "${locale}" va "uz" matnlari yo'q`);
  }

  return pageMetadata({
    title: meta.title,
    description: meta.description,
    path: localePath(path, locale),
    image: entry.image,
    locale,
    languages: hreflangFor(path),
    noindex: entry.noindex,
  });
}
