/** @format */

import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/config/seo";
import { PAGES, type RouteLocale } from "@/config/pages";

/**
 * Root layout metadata'si — til bo'yicha.
 *
 * Bu obyekt avval `app/layout.tsx` ichida edi. U yerdan ko'chirildi, chunki
 * endi uchta root layout bor (uz / ru / en) va ularning har biri bir xil
 * asosga ega bo'lishi, faqat til qismi farq qilishi kerak.
 *
 * DIQQAT: bu yerga `alternates.canonical` QO'YMANG. App Router'da u meros
 * bo'lib o'tadi va o'z canonical'ini bermagan barcha sahifalar bosh sahifani
 * ko'rsatib qoladi.
 *
 * Sarlavha va tavsif `config/pages.json` dagi `/` yozuvidan olinadi, shunda
 * uch tildagi matn bitta joyda turadi.
 */

const OG_LOCALE: Record<RouteLocale, string> = {
  uz: "uz_UZ",
  ru: "ru_RU",
  en: "en_US",
};

const KEYWORDS: Record<RouteLocale, string[]> = {
  uz: [
    "AIRI",
    "airi.uz",
    "sunʼiy intellekt",
    "raqamli texnologiyalar",
    "ilmiy-tadqiqot instituti",
    "AI research Uzbekistan",
    "artificial intelligence Uzbekistan",
    "digital technologies Uzbekistan",
    "raqamli transformatsiya",
    "amaliy AI yechimlar",
  ],
  ru: [
    "AIRI",
    "airi.uz",
    "НИИ искусственного интеллекта",
    "институт искусственного интеллекта",
    "институт ИИ Узбекистан",
    "НИИ развития цифровых технологий",
    "искусственный интеллект Узбекистан",
    "цифровые технологии Узбекистан",
    "докторантура искусственный интеллект",
    "научные исследования ИИ",
  ],
  en: [
    "AIRI",
    "airi.uz",
    "AI research institute Uzbekistan",
    "artificial intelligence Uzbekistan",
    "digital technologies Uzbekistan",
    "AI research institute Tashkent",
    "machine learning research Uzbekistan",
    "PhD artificial intelligence Uzbekistan",
    "applied AI solutions",
    "research institute Tashkent",
  ],
};

/**
 * Ijtimoiy tarmoq tavsiflari ataylab `description` dan farq qiladi — bu
 * ko'chirishdan OLDIN ham shunday edi va bosh sahifa saytning eng ko'p klik
 * oladigan sahifasi, shuning uchun matnni o'zgartirmaymiz.
 */
const SOCIAL: Record<RouteLocale, { og: string; twitter: string }> = {
  uz: {
    og: "Ilmiy izlanishlar — oqilona yechimlar asosi. Raqamli texnologiyalar, sunʼiy intellekt va amaliy tadqiqotlar instituti portali.",
    twitter: "Raqamli texnologiyalar, sunʼiy intellekt va amaliy AI yechimlar portali.",
  },
  ru: {
    og: "Научный поиск — основа обоснованных решений. Портал института цифровых технологий, искусственного интеллекта и прикладных исследований.",
    twitter: "Портал цифровых технологий, искусственного интеллекта и прикладных ИИ-решений.",
  },
  en: {
    og: "Research is the basis of sound decisions. The portal of the institute for digital technologies, artificial intelligence and applied research.",
    twitter: "A portal for digital technologies, artificial intelligence and applied AI solutions.",
  },
};

export function rootMetadata(locale: RouteLocale): Metadata {
  const home = PAGES["/"];
  const meta = home?.meta?.[locale] ?? home?.meta?.uz;

  if (!meta) {
    throw new Error("[seo] config/pages.json dagi \"/\" yozuvida meta yo'q");
  }

  const alternateLocale = (Object.keys(OG_LOCALE) as RouteLocale[])
    .filter((item) => item !== locale)
    .map((item) => OG_LOCALE[item]);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: meta.title,
      template: `%s | ${SITE_NAME}`,
    },
    description: meta.description,
    keywords: KEYWORDS[locale],
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    openGraph: {
      type: "website",
      locale: OG_LOCALE[locale],
      alternateLocale,
      url: locale === "uz" ? SITE_URL : `${SITE_URL}/${locale}/`,
      siteName: SITE_NAME,
      title: meta.title,
      description: SOCIAL[locale].og,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: "AIRI — Raqamli texnologiyalar va sunʼiy intellekt instituti",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: SOCIAL[locale].twitter,
      images: [DEFAULT_OG_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}
