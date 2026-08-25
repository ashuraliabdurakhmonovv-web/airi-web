/** @format */

import { SITE_URL, canonicalUrl, type SeoLocale } from "@/config/seo";
import { localizedText, newsImage } from "@/lib/news";
import type { StaticNewsArticle } from "@/lib/news/static-news-repository";
import JsonLd from "./json-ld";

/**
 * Yangilik sahifasi uchun NewsArticle schema.org markup'i.
 *
 * `publisher` institutni qayta inline qilmaydi, `@id` orqali
 * `organization-jsonld.tsx` dagi obyektga ishora qiladi — shunda Google
 * ikkita alohida tashkilot emas, bitta ob'ekt ko'radi.
 *
 * DIQQAT: 110 ta maqoladan faqat 2 tasida `publishedAt` bor. `datePublished`
 * Google uchun tavsiya etilgan maydon, shuning uchun sanasi yo'q maqolalar
 * uni umuman bermaydi — soxta sana yozishdan ko'ra bermagan yaxshi.
 */
export default function NewsArticleJsonLd({
  article,
  locale = "uz",
}: {
  article: StaticNewsArticle;
  locale?: SeoLocale;
}) {
  const url = canonicalUrl(`/umumiy-malumot/news/${article.slug}`);
  const headline = localizedText(article.title, locale);
  const image = newsImage(article);

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "@id": `${url}#article`,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        headline,
        description: localizedText(article.description, locale),
        inLanguage: locale,
        image: image.startsWith("http") ? image : `${SITE_URL}${image}`,
        articleSection: article.category || undefined,
        ...(article.publishedAt ? { datePublished: article.publishedAt } : {}),
        ...(article.publishedAt ? { dateModified: article.publishedAt } : {}),
        author: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
      }}
    />
  );
}
