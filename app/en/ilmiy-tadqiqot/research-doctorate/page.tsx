/** @format */

import type { Metadata } from "next";
import { pageMetadataFor } from "@/config/seo";
import BreadcrumbJsonLd from "@/app/_components/seo/breadcrumb-jsonld";
import UzResearchDoctoratePage from "@/app/(pages)/ilmiy-tadqiqot/(03-doktorantura)/research-doctorate/page";

const PATH = "/ilmiy-tadqiqot/research-doctorate";
const LOCALE = "en";

// Sarlavha, tavsif va hreflang to'plami `config/pages.json` dan.
export const metadata: Metadata = pageMetadataFor(PATH, LOCALE);

/**
 * O'zbekcha sahifa komponenti qayta ishlatiladi — JSX takrorlanmaydi.
 * Til `app/en/layout.tsx` dagi provider'dan keladi, shuning uchun
 * bu sahifa statik HTML'ga inglizcha matn bilan chiqadi.
 */
export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd path={PATH} locale={LOCALE} />
      <UzResearchDoctoratePage />
    </>
  );
}
