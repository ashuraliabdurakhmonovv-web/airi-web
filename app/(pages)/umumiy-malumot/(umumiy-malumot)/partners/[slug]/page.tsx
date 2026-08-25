/** @format */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { partners } from "@/common/data/partners-data";
import { pageMetadata } from "@/config/seo";
import uz from "@/i18n/dictionaries/uz";
import PartnerDetailClient from "./partner-detail-client";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  // Nom va tavsif `partnerBase` da emas, o'zbekcha lug'atdagi parallel massivda —
  // shuning uchun indeks bo'yicha moslanadi.
  const index = partners.findIndex((p) => p.slug === slug);
  if (index === -1) return {};

  const partner = uz.partnersPage.legacyPartners[index];
  if (!partner) return {};

  return pageMetadata({
    title: `${partner.name} — hamkorlik`,
    description: partner.description,
    path: `/umumiy-malumot/partners/${slug}`,
  });
}

export default async function PartnerDetailPage({ params }: Props) {
  const { slug } = await params;

  const partner = partners.find((p) => p.slug === slug);
  if (!partner) return notFound();

  return <PartnerDetailClient slug={slug} />;
}

export function generateStaticParams() {
  return partners.map((p) => ({
    slug: p.slug,
  }));
}
