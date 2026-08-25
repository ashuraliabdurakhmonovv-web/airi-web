/** @format */

import type { Metadata } from "next";
import { pageMetadataFor } from "@/config/seo";
import BreadcrumbJsonLd from "@/app/_components/seo/breadcrumb-jsonld";
import UzInstituteStructureofinstitutePage from "@/app/(pages)/umumiy-malumot/(umumiy-malumot)/(institute)/institute-structureofinstitute/page";

const PATH = "/umumiy-malumot/institute-structureofinstitute";
const LOCALE = "ru";

// Sarlavha, tavsif va hreflang to'plami `config/pages.json` dan.
export const metadata: Metadata = pageMetadataFor(PATH, LOCALE);

/**
 * O'zbekcha sahifa komponenti qayta ishlatiladi — JSX takrorlanmaydi.
 * Til `app/ru/layout.tsx` dagi provider'dan keladi, shuning uchun
 * bu sahifa statik HTML'ga ruscha matn bilan chiqadi.
 */
export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd path={PATH} locale={LOCALE} />
      <UzInstituteStructureofinstitutePage />
    </>
  );
}
