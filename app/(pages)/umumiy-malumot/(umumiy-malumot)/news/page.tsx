/** @format */

import { Suspense } from "react";
import NewsPageClient from "./news-page-client";
import NewsStaticList from "./news-static-list";

/**
 * Yangiliklar ro'yxati.
 *
 * Interaktiv qism (`NewsPageClient`) `useSearchParams()` ga tayanadi va shu
 * sabab `output: "export"` da prerender qilinmaydi. Uni `<Suspense>` ichiga
 * olamiz, fallback esa server'da chizilgan haqiqiy ro'yxat — shunda statik
 * HTML bo'sh qolmaydi va Google 9 ta yangilikni hamda ularga havolalarni
 * ko'radi. Hidratsiyadan keyin interaktiv variant o'z o'rnini egallaydi.
 */
export default function NewsPage() {
  return (
    <Suspense fallback={<NewsStaticList />}>
      <NewsPageClient />
    </Suspense>
  );
}
