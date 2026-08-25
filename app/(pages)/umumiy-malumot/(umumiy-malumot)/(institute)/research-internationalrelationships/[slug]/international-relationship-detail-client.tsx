/** @format */
"use client";

import Link from "next/link";
import { ArrowLeft, Download, FileText } from "lucide-react";
import { useLocale } from "@/i18n";
import {
  relationships,
  type Relationship,
} from "@/common/relationships-data/relationships";

export function InternationalRelationshipDetailClient({
  relationship,
}: {
  relationship: Relationship;
}) {
  const { t } = useLocale();
  const relationshipIndex = relationships.findIndex(
    (item) => item.slug === relationship.slug,
  );
  const relationshipName =
    t.internationalPage.relationshipNames[relationshipIndex] ??
    relationship.slug;
  const documentUrl = relationship.document
    ? encodeURI(relationship.document)
    : null;

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-10 text-gray-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/umumiy-malumot/research-internationalrelationships"
          className="airi-link mb-8 inline-flex items-center gap-2 text-sm font-medium">
          <ArrowLeft className="h-4 w-4" />
          {t.internationalPage.backToRelationships}
        </Link>

        <div className="mb-8 grid gap-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:grid-cols-[220px_1fr] md:items-center md:p-7">
          <div className="airi-ring flex h-36 items-center justify-center rounded-2xl border bg-white p-6">
            <img
              src={relationship.logo}
              alt={`${relationshipName} ${t.internationalPage.logoAltSuffix}`}
              className="max-h-24 w-auto object-contain"
            />
          </div>

          <div>
            <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#604eff]/20 bg-[#604eff]/5 px-3 py-1 text-sm font-medium text-[#604eff]">
              <FileText className="h-4 w-4" />
              {t.internationalPage.documentBadge}
            </p>
            <h1 className="text-2xl font-bold leading-tight sm:text-3xl">
              {relationshipName}
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-gray-600">
              {t.internationalPage.detailDescription}
            </p>

            {documentUrl && (
              <a
                href={documentUrl}
                download
                className="airi-button mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-3 font-medium">
                <Download className="h-4 w-4" />
                {t.internationalPage.downloadPdf}
              </a>
            )}
          </div>
        </div>

        {documentUrl ? (
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <iframe
              src={documentUrl}
              title={`${relationshipName} PDF`}
              className="h-[72vh] min-h-[520px] w-full"
            />
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center shadow-sm">
            <FileText className="mx-auto mb-4 h-10 w-10 text-gray-400" />
            <h2 className="text-xl font-semibold">
              {t.internationalPage.missingDocumentTitle}
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-gray-600">
              {t.internationalPage.missingDocumentDescription}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
