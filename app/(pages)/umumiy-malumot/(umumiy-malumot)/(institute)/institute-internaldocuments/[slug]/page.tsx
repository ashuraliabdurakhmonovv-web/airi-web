/** @format */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getInternalDocumentBySlug,
  internalDocuments,
} from "@/common/internal-docs/docs";
import { pageMetadata } from "@/config/seo";
import uz from "@/i18n/dictionaries/uz";
import { InternalDocumentDetailClient } from "./internal-document-detail-client";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!getInternalDocumentBySlug(slug)) return {};

  // Hujjat nomlari o'zbekcha lug'atda slug bo'yicha saqlanadi — shu bilan har bir
  // hujjat o'z sarlavhasini oladi (avval hammasi "Internal Document — AIRI" edi).
  const documentTitles: Record<string, string> = uz.internalDocsPage.documents;
  const title = documentTitles[slug] ?? "Ichki hujjat";

  return pageMetadata({
    title,
    description: `${title} — AIRI instituti ichki hujjati. Hujjatni sayt orqali ko'rish va yuklab olish mumkin.`,
    path: `/umumiy-malumot/institute-internaldocuments/${slug}`,
  });
}

export function generateStaticParams() {
  return internalDocuments.map((document) => ({
    slug: document.slug,
  }));
}

export default async function InternalDocumentDetailPage({ params }: Props) {
  const { slug } = await params;
  const document = getInternalDocumentBySlug(slug);

  if (!document) return notFound();

  return <InternalDocumentDetailClient document={document} />;
}
