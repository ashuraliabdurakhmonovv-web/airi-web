/** @format */

import type { Metadata } from "next";
import { localizedText, newsImage } from "@/lib/news";
import { getStaticNewsBySlug } from "@/lib/news/static-news-repository";
import { pageMetadata } from "@/config/seo";
import NewsArticleJsonLd from "@/app/_components/seo/news-article-jsonld";
import BreadcrumbJsonLd from "@/app/_components/seo/breadcrumb-jsonld";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

/**
 * `newsImage()` rasm topolmasa `/logo.png` qaytaradi. Logotip 1200×630 emas,
 * shuning uchun uni OG rasmi sifatida e'lon qilish yolg'on o'lcham beradi —
 * bunday holda `pageMetadata` ning standart `og-image.jpg` siga tushamiz.
 */
function ogImageFor(article: NonNullable<ReturnType<typeof getStaticNewsBySlug>>) {
  const image = newsImage(article);
  return !image || image === "/logo.png" ? undefined : image;
}

export async function generateMetadata({ params }: Omit<LayoutProps, "children">): Promise<Metadata> {
  const { slug } = await params;
  const article = getStaticNewsBySlug(slug);

  // Slug topilmasa `page.tsx` `notFound()` chaqiradi — bu yerda faqat
  // indekslanmaydigan zaxira metadata beramiz.
  if (!article) {
    return pageMetadata({
      title: "Yangilik topilmadi",
      description: "So'ralgan yangilik mavjud emas yoki manzili o'zgargan.",
      path: `/umumiy-malumot/news/${slug}`,
      noindex: true,
    });
  }

  // Nega `pageMetadata()`: u canonical'ni `canonicalUrl()` orqali yasaydi
  // (`trailingSlash: true` bilan mos — avval bu yerda oxirgi `/` yo'q edi va
  // 111 ta canonical o'zi 301 qiladigan manzilga ishora qilardi) hamda OG va
  // Twitter to'plamini TO'LIQ qayta beradi. Avval `twitter` bloki yo'q edi,
  // natijada har bir maqola `news/layout.tsx` dan meros qolgan
  // `twitter:title = "Yangiliklar"` ni ko'rsatardi.
  return pageMetadata({
    title: localizedText(article.title, "uz"),
    description: localizedText(article.description, "uz"),
    path: `/umumiy-malumot/news/${article.slug}`,
    image: ogImageFor(article),
    type: "article",
    publishedTime: article.publishedAt || undefined,
    modifiedTime: article.publishedAt || undefined,
  });
}

export default async function Layout({ children, params }: LayoutProps) {
  const { slug } = await params;
  const article = getStaticNewsBySlug(slug);

  return (
    <>
      {article ? (
        <>
          <NewsArticleJsonLd article={article} />
          {/*
            Maqolaning registrda o'z yozuvi yo'q — `crumbChain` yuqoriga
            ko'tarilib `/umumiy-malumot/news` gacha boradi, oxirgi bo'g'inni
            esa `leaf` bilan qo'lda beramiz.
          */}
          <BreadcrumbJsonLd
            path="/umumiy-malumot/news"
            leaf={{
              name: localizedText(article.title, "uz"),
              path: `/umumiy-malumot/news/${article.slug}`,
            }}
          />
        </>
      ) : null}
      {children}
    </>
  );
}
