/** @format */

import GraduateDetail from "@/app/(pages)/umumiy-malumot/(umumiy-malumot)/(umumiy-malumotlar)/institute-graduates/graduate-detail";
import type { Metadata } from "next";
import { allDissertationBase } from "@/common/graduates/data";
import { pageMetadata } from "@/config/seo";
import BreadcrumbJsonLd from "@/app/_components/seo/breadcrumb-jsonld";
import PersonJsonLd from "@/app/_components/seo/person-jsonld";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const graduate = allDissertationBase.find((item) => item.slug === slug);
  if (!graduate) return {};

  return pageMetadata({
    title: graduate.fullName,
    description: `${graduate.fullName} — AIRI instituti doktoranturasi bitiruvchisi. Dissertatsiya ishi, ilmiy yo'nalishi va yutuqlari haqida ma'lumot.`,
    path: `/umumiy-malumot/institute-graduates/${slug}`,
  });
}

export function generateStaticParams() {
  return allDissertationBase.map((diss) => ({ slug: diss.slug }));
}

export default async function GraduateDetailPage({ params }: Props) {
  const { slug } = await params;
  const graduate = allDissertationBase.find((item) => item.slug === slug);
  const path = `/umumiy-malumot/institute-graduates/${slug}`;

  return (
    <>
      {graduate ? (
        <>
          {/* Bitiruvchi — `worksFor` emas, `alumniOf`. */}
          <PersonJsonLd
            name={graduate.fullName}
            path={path}
            image={graduate.imageUrl}
            jobTitle="Doktorantura bitiruvchisi"
            alumni
          />
          <BreadcrumbJsonLd
            path="/umumiy-malumot/institute-graduates"
            leaf={{ name: graduate.fullName, path }}
          />
        </>
      ) : null}
      <GraduateDetail slug={slug} backHref="/umumiy-malumot/institute-graduates" />
    </>
  );
}
