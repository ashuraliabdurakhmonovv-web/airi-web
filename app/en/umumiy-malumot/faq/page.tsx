/** @format */

import type { Metadata } from "next";
import { pageMetadataFor } from "@/config/seo";
import en from "@/i18n/dictionaries/en";
import BreadcrumbJsonLd from "@/app/_components/seo/breadcrumb-jsonld";
import FaqPageJsonLd from "@/app/_components/seo/faq-page-jsonld";
import FaqPageContent from "@/app/(pages)/umumiy-malumot/(umumiy-malumot)/(umumiy-malumotlar)/faq/faq-page-content";

const PATH = "/umumiy-malumot/faq";
const LOCALE = "en";

export const metadata: Metadata = pageMetadataFor(PATH, LOCALE);

/**
 * O'zbekcha `faq/page.tsx` ni qayta eksport qilmaymiz: u o'zbekcha
 * savol-javoblarni strukturali ma'lumotga yozadi. Bu yerda `FaqPageContent`
 * to'g'ridan-to'g'ri olinadi va markup ruscha lug'atdan quriladi — sahifada
 * ko'rinadigan matn bilan bir xil bo'lishi Google talabi.
 */
export default function Page() {
  return (
    <>
      <FaqPageJsonLd items={en.faqPage.items} path={`/${LOCALE}${PATH}`} />
      <BreadcrumbJsonLd path={PATH} locale={LOCALE} />
      <FaqPageContent />
    </>
  );
}
