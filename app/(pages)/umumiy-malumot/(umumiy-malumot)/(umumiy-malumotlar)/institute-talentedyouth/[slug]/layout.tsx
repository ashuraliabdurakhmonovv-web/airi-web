/** @format */

import type { Metadata } from "next";
import { talentBase } from "@/common/institute-talented-youth/data";
import { pageMetadata } from "@/config/seo";
import BreadcrumbJsonLd from "@/app/_components/seo/breadcrumb-jsonld";
import PersonJsonLd from "@/app/_components/seo/person-jsonld";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return talentBase.map((talent) => ({
    slug: talent.slug,
  }));
}

// Sahifaning o'zi "use client" bo'lgani uchun metadata shu layoutda beriladi.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const talent = talentBase.find((item) => item.slug === slug);
  if (!talent) return {};

  return pageMetadata({
    title: talent.name,
    description: `${talent.name} — AIRI instituti iqtidorli yosh tadqiqotchisi. Ilmiy izlanishlari, yutuqlari va loyihalari haqida ma'lumot.`,
    path: `/umumiy-malumot/institute-talentedyouth/${slug}`,
  });
}

export default async function Layout({ children, params }: Props & { children: React.ReactNode }) {
  const { slug } = await params;
  const talent = talentBase.find((item) => item.slug === slug);
  const path = `/umumiy-malumot/institute-talentedyouth/${slug}`;

  return (
    <>
      {talent ? (
        <>
          <PersonJsonLd
            name={talent.name}
            path={path}
            image={talent.imageUrl}
            jobTitle="Yosh tadqiqotchi"
          />
          <BreadcrumbJsonLd
            path="/umumiy-malumot/institute-talentedyouth"
            leaf={{ name: talent.name, path }}
          />
        </>
      ) : null}
      {children}
    </>
  );
}
