/** @format */

import type { Metadata } from "next";
import { pageMetadataFor } from "@/config/seo";
import en from "@/i18n/dictionaries/en";
import { vacancyBase } from "@/common/vacancies/data";
import BreadcrumbJsonLd from "@/app/_components/seo/breadcrumb-jsonld";
import JobPostingJsonLd from "@/app/_components/seo/job-posting-jsonld";
import UzVacanciesPage from "@/app/(pages)/umumiy-malumot/(umumiy-malumot)/(ochiq-malumotlar)/opendata-vacancies/page";

const PATH = "/umumiy-malumot/opendata-vacancies";
const LOCALE = "en";

export const metadata: Metadata = pageMetadataFor(PATH, LOCALE);

/** Lavozim nomi ma'lumotda emas, lug'atda — indeks bo'yicha juftlanadi. */
const vacancies = vacancyBase.map((vacancy, index) => ({
  ...vacancy,
  title: en.vacanciesPage.vacancies[index]?.title ?? "",
}));

export default function Page() {
  return (
    <>
      <JobPostingJsonLd vacancies={vacancies} path={`/${LOCALE}${PATH}`} locale={LOCALE} />
      <BreadcrumbJsonLd path={PATH} locale={LOCALE} />
      <UzVacanciesPage />
    </>
  );
}
