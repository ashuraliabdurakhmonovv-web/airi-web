/** @format */

import type { Metadata } from "next";
import { pageMetadataFor } from "@/config/seo";
import uz from "@/i18n/dictionaries/uz";
import { vacancyBase } from "@/common/vacancies/data";
import BreadcrumbJsonLd from "@/app/_components/seo/breadcrumb-jsonld";
import JobPostingJsonLd from "@/app/_components/seo/job-posting-jsonld";

const PATH = "/umumiy-malumot/opendata-vacancies";

// Sarlavha, tavsif va til muqobillari `config/pages.json` dan keladi.
export const metadata: Metadata = pageMetadataFor(PATH, "uz");

/**
 * Lavozim nomi ma'lumotda emas, lug'atda — sahifaning o'zi ham
 * `vacancyBase[i]` ni `t.vacanciesPage.vacancies[i]` bilan indeks bo'yicha
 * birlashtiradi. Shu bog'lanishni bu yerda takrorlaymiz.
 */
const vacancies = vacancyBase.map((vacancy, index) => ({
  ...vacancy,
  title: uz.vacanciesPage.vacancies[index]?.title ?? "",
}));

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JobPostingJsonLd vacancies={vacancies} path={PATH} />
      <BreadcrumbJsonLd path={PATH} />
      {children}
    </>
  );
}
