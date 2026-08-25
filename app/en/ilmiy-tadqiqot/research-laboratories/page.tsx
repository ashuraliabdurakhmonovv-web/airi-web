/** @format */

import type { Metadata } from "next";
import { pageMetadataFor } from "@/config/seo";
import BreadcrumbJsonLd from "@/app/_components/seo/breadcrumb-jsonld";
import UzResearchLaboratoriesPage from "@/app/(pages)/ilmiy-tadqiqot/(02-tadqiqotlar)/research-laboratories/page";

const PATH = "/ilmiy-tadqiqot/research-laboratories";
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
      <UzResearchLaboratoriesPage />
    </>
  );
}
