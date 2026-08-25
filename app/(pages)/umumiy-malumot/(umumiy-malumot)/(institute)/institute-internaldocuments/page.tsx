/** @format */
"use client";

import Link from "next/link";
import { Download, Eye, FileText } from "lucide-react";
import { internalDocuments } from "@/common/internal-docs/docs";
import { useLocale } from "@/i18n";

export default function InternalDocuments() {
  const { t } = useLocale();
  const documentTitles = t.internalDocsPage.documents as Record<string, string>;
  return (
    <section className="mx-auto min-h-[calc(100vh-30rem)] max-w-7xl px-4 py-12">
      <h1 className="text-2xl md:text-3xl font-bold text-center pb-3 md:pb-6 uppercase airi-gradient-text airi-section-title">
        {t.internalDocsPage.title}
      </h1>

      <p className="airi-section-copy mx-auto max-w-2xl text-center text-slate-600">
        {t.internalDocsPage.description}
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {internalDocuments.map((doc) => (
          <article
            key={doc.viewUrl}
            className="airi-ring group relative overflow-hidden rounded-2xl border bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-[#604eff] hover:shadow-lg hover:shadow-[#604eff]/10">
            <div className="absolute inset-0 bg-linear-to-br from-white via-white to-[#f8faff]" />
            <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#604eff]/0 blur-2xl transition duration-500 group-hover:bg-[#604eff]/10" />

            <div className="relative flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-[#604eff]/12 to-[#08e8ea]/12 text-[#604eff]">
                <FileText className="h-6 w-6" />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-base font-bold leading-7 text-gray-950 md:text-lg">
                  {documentTitles[doc.slug] ?? doc.slug}
                </h3>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={doc.viewUrl}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#604eff]/15 bg-white text-gray-500 transition duration-300 hover:border-[#604eff]/35 hover:bg-[#f7f8ff] hover:text-[#604eff]"
                  aria-label={t.common.view}>
                  <Eye className="h-5 w-5" />
                </Link>

                <Link
                  href={doc.downloadUrl}
                  download
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#604eff]/15 bg-white text-gray-500 transition duration-300 hover:border-[#604eff]/35 hover:bg-[#f7f8ff] hover:text-[#604eff]"
                  aria-label={t.common.download}>
                  <Download className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
