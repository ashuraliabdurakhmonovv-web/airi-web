/** @format */

import type { Metadata } from "next";
import { pageMetadataFor } from "@/config/seo";
import uz from "@/i18n/dictionaries/uz";
import BreadcrumbJsonLd from "@/app/_components/seo/breadcrumb-jsonld";
import FaqPageJsonLd from "@/app/_components/seo/faq-page-jsonld";
import FaqPageContent from "./faq-page-content";

const PATH = "/umumiy-malumot/faq";

// Sarlavha, tavsif va til muqobillari `config/pages.json` dan keladi.
export const metadata: Metadata = pageMetadataFor(PATH, "uz");

export default function UmumiyFaqPage() {
  return (
    <>
      {/*
        Savol-javoblar `FaqPageContent` chizadigan ro'yxat bilan AYNAN bir
        manbadan (`t.faqPage.items`) olinadi. Google talabi: markup'dagi matn
        sahifada foydalanuvchiga ham ko'rinib turishi shart.
      */}
      <FaqPageJsonLd items={uz.faqPage.items} path={PATH} />
      <BreadcrumbJsonLd path={PATH} />
      <FaqPageContent />
    </>
  );
}
