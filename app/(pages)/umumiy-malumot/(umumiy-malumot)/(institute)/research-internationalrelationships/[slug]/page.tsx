/** @format */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getRelationshipBySlug,
  relationships,
} from "@/common/relationships-data/relationships";
import { pageMetadata } from "@/config/seo";
import uz from "@/i18n/dictionaries/uz";
import { InternationalRelationshipDetailClient } from "./international-relationship-detail-client";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!getRelationshipBySlug(slug)) return {};

  // `relationshipNames` — `relationships` bilan bir xil tartibdagi massiv, shuning
  // uchun indeks bo'yicha moslanadi (avval 18 sahifa bir xil sarlavhali edi).
  const index = relationships.findIndex((item) => item.slug === slug);
  const name = uz.internationalPage.relationshipNames[index] ?? slug;

  return pageMetadata({
    title: `${name} bilan hamkorlik`,
    description: `AIRI instituti va ${name} o'rtasidagi xalqaro hamkorlik: kelishuv hujjati, yo'nalishlari va natijalari.`,
    path: `/umumiy-malumot/research-internationalrelationships/${slug}`,
  });
}

export function generateStaticParams() {
  return relationships.map((relationship) => ({
    slug: relationship.slug,
  }));
}

export default async function InternationalRelationshipDetailPage({
  params,
}: Props) {
  const { slug } = await params;
  const relationship = getRelationshipBySlug(slug);

  if (!relationship) return notFound();

  return <InternationalRelationshipDetailClient relationship={relationship} />;
}
