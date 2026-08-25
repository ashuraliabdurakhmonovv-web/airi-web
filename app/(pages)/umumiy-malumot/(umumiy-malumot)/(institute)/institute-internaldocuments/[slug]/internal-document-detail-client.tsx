/** @format */
"use client";

import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { useLocale } from "@/i18n";
import type { InternalDocument } from "@/common/internal-docs/docs";

export function InternalDocumentDetailClient({
  document,
}: {
  document: InternalDocument;
}) {
  const { t } = useLocale();
  const documentUrl = encodeURI(document.fileUrl);
  const documentTitles = t.internalDocsPage.documents as Record<string, string>;
  const documentTitle = documentTitles[document.slug] ?? document.slug;

  return (
    <section className="min-h-[calc(100vh-24rem)] bg-gray-50 px-4 py-10 text-gray-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/umumiy-malumot/institute-internaldocuments"
          className="airi-link mb-8 inline-flex items-center gap-2 text-sm font-medium">
          <ArrowLeft className="h-4 w-4" />
          {t.internalDocsPage.backToDocuments}
        </Link>

        <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-7">
          <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#604eff]/20 bg-[#604eff]/5 px-3 py-1 text-sm font-medium text-[#604eff]">
            <FileText className="h-4 w-4" />
            {t.internalDocsPage.documentBadge}
          </p>

          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="max-w-4xl text-2xl font-bold leading-tight sm:text-3xl">
                {documentTitle}
              </h1>
              <p className="mt-3 max-w-3xl text-base leading-7 text-gray-600">
                {t.internalDocsPage.detailDescription}
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <iframe
            src={documentUrl}
            title={`${documentTitle} PDF`}
            className="h-[72vh] min-h-[520px] w-full"
          />
        </div>
      </div>
    </section>
  );
}
