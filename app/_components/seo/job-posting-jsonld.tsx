/** @format */

import { SITE_URL, canonicalUrl, type SeoLocale } from "@/config/seo";
import JsonLd from "./json-ld";

type JobPostingInput = {
  id: number;
  title: string;
  salary: number;
  requirements?: string[];
  /** ISO sana. Google uchun MAJBURIY maydon — usiz e'lon markup'i yaroqsiz. */
  datePosted?: string;
  validThrough?: string;
};

/**
 * Bo'sh ish o'rinlari uchun JobPosting schema.org markup'i.
 * To'g'ri markup bilan vakansiyalar Google Jobs blokiga tushadi.
 *
 * DIQQAT — hozircha ma'lumot yetishmaydi: Google `datePosted` ni MAJBURIY
 * deb belgilaydi, `common/vacancies/data.ts` da esa sana maydoni yo'q
 * (faqat `id`, `category`, `salary`). Sanasi yo'q e'lon ataylab
 * o'tkazib yuboriladi — yaroqsiz markup chiqarish, uni umuman chiqarmaslikdan
 * yomonroq: Search Console xato beradi va butun sahifaga ishonch tushadi.
 *
 * Sana qo'shilgan zahoti markup o'zi ishlay boshlaydi, komponentga tegish
 * shart emas.
 */
export default function JobPostingJsonLd({
  vacancies,
  path,
  locale = "uz",
}: {
  vacancies: readonly JobPostingInput[];
  path: string;
  locale?: SeoLocale;
}) {
  const publishable = vacancies.filter((vacancy) => Boolean(vacancy.datePosted));

  if (process.env.NODE_ENV !== "production" && publishable.length < vacancies.length) {
    console.warn(
      `[seo:JobPosting] ${vacancies.length - publishable.length} ta vakansiyada ` +
        "`datePosted` yo'q — ular strukturali ma'lumotga qo'shilmadi. " +
        "Sanani `common/vacancies/data.ts` ga qo'shing.",
    );
  }

  if (!publishable.length) return null;

  const url = canonicalUrl(path);

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": publishable.map((vacancy) => ({
          "@type": "JobPosting",
          "@id": `${url}#vacancy-${vacancy.id}`,
          title: vacancy.title,
          description: vacancy.requirements?.length
            ? vacancy.requirements.join(" ")
            : vacancy.title,
          datePosted: vacancy.datePosted,
          ...(vacancy.validThrough ? { validThrough: vacancy.validThrough } : {}),
          employmentType: "FULL_TIME",
          inLanguage: locale,
          hiringOrganization: { "@id": `${SITE_URL}/#organization` },
          jobLocation: {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Mirzo Ulug'bek tumani, Bo'z-2, 17A",
              addressLocality: "Toshkent",
              postalCode: "100125",
              addressCountry: "UZ",
            },
          },
          baseSalary: {
            "@type": "MonetaryAmount",
            currency: "UZS",
            value: {
              "@type": "QuantitativeValue",
              value: vacancy.salary,
              unitText: "MONTH",
            },
          },
        })),
      }}
    />
  );
}
