/** @format */

import { Suspense } from "react";
import type { Metadata } from "next";
import { pageMetadataFor } from "@/config/seo";
import BreadcrumbJsonLd from "@/app/_components/seo/breadcrumb-jsonld";
import NewsPageClient from "@/app/(pages)/umumiy-malumot/(umumiy-malumot)/news/news-page-client";
import NewsStaticList from "@/app/(pages)/umumiy-malumot/(umumiy-malumot)/news/news-static-list";

const PATH = "/umumiy-malumot/news";
const LOCALE = "ru";

export const metadata: Metadata = pageMetadataFor(PATH, LOCALE);

/**
 * Yangiliklar ro'yxatining ruscha varianti.
 *
 * O'zbekchadagi kabi: interaktiv qism `useSearchParams()` ga tayanadi va
 * prerender qilinmaydi, shuning uchun `<Suspense>` fallback'i server'da
 * chizilgan ro'yxat bo'ladi — robot aynan shuni ko'radi.
 *
 * Maqolalarning O'ZI hozircha faqat o'zbekcha URL'larda mavjud, shuning
 * uchun ro'yxatdagi havolalar prefikssiz qoladi (`news-static-list.tsx`
 * dagi izohga qarang).
 */
export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd path={PATH} locale={LOCALE} />
      <Suspense fallback={<NewsStaticList locale={LOCALE} />}>
        <NewsPageClient />
      </Suspense>
    </>
  );
}
