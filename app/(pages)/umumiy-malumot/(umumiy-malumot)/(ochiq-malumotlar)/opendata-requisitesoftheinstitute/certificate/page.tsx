/** @format */
"use client";

import { Button } from "@/components/ui/button";
import { useLocale } from "@/i18n";
import { ArrowLeft, BadgeCheck, FileText, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function InstituteCertificatePage() {
  const { t } = useLocale();

  return (
    <main className="bg-linear-to-b from-white via-[#fbfcff] to-white px-4 py-12 sm:px-6 md:py-16 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Button
          asChild
          variant="outline"
          className="mb-8 rounded-lg border-[#604eff]/20 bg-white font-bold text-[#604eff] shadow-sm hover:border-[#604eff]/40 hover:bg-[#604eff]/5">
          <Link href="/umumiy-malumot/opendata-requisitesoftheinstitute">
            <ArrowLeft className="h-4 w-4" />
            {t.requisitesPage.backToRequisites}
          </Link>
        </Button>

        <header className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-lg border border-[#604eff]/15 bg-white px-4 py-2 font-accent text-xs font-extrabold uppercase text-[#604eff] shadow-sm">
            <Sparkles className="h-4 w-4 text-[#08e8ea]" />
            {t.requisitesPage.officialDocument}
          </span>

          <h1 className="airi-section-title airi-gradient-text mx-auto mt-5 max-w-4xl uppercase">
            {t.requisitesPage.certificateTitle}
          </h1>

          <p className="airi-section-copy mx-auto mt-4 max-w-3xl text-slate-600">
            {t.requisitesPage.certificateDescription}
          </p>
        </header>

        <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <div className="h-1.5 bg-linear-to-r from-[#604eff] via-[#08e8ea] to-emerald-400" />
          <div className="border-b border-slate-200 bg-linear-to-r from-[#f8faff] via-white to-[#f8faff] px-6 py-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#604eff]/10 text-[#604eff]">
                  <FileText className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-accent text-xs font-extrabold uppercase text-[#604eff]">
                    {t.requisitesPage.certificateLabel}
                  </p>
                  <h2 className="font-heading text-xl font-extrabold text-slate-950">
                    {t.requisitesPage.certificateInstituteName}
                  </h2>
                </div>
              </div>

              <span className="inline-flex w-fit items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">
                <BadgeCheck className="h-4 w-4" />
                {t.requisitesPage.internalPage}
              </span>
            </div>
          </div>

          <div className="bg-slate-50 p-3 sm:p-5">
            <div className="relative mx-auto aspect-[4/3] max-w-5xl overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-slate-200">
              <Image
                src="/guvohnoma.jpg"
                alt={t.requisitesPage.certificateAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 960px"
                className="object-contain"
              />
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
