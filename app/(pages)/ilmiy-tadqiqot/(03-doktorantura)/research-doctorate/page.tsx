/** @format */
"use client";

import { phdItems } from "@/common/doktorantura/data";
import { useLocale } from "@/i18n";
import { getResearchContent } from "@/i18n/research-content";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpenCheck,
  Download,
  EyeIcon,
  FileCheck2,
  FileText,
  GraduationCap,
  ListChecks,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

const PhDPrograms = () => {
  const { t, locale } = useLocale();
  const copy = getResearchContent(locale);

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section className="relative overflow-hidden bg-[#f7f9fc] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(96,78,255,0.07)_1px,transparent_1px),linear-gradient(180deg,rgba(8,232,234,0.08)_1px,transparent_1px)] bg-[size:64px_64px]" />

        <div className="relative mx-auto max-w-7xl">
          <Link
            href="/ilmiy-tadqiqot"
            className="mb-8 inline-flex items-center gap-2 border border-[#604eff]/20 bg-white px-4 py-2 text-sm font-extrabold text-[#604eff] transition hover:-translate-y-0.5 hover:border-[#604eff]/45"
          >
            <ArrowLeft className="h-4 w-4" />
            {copy.pages.back}
          </Link>

          <header className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <span className="inline-flex items-center border border-[#604eff]/15 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#604eff] shadow-sm">
                <GraduationCap className="mr-2 h-4 w-4" />
                {copy.doctorate.eyebrow}
              </span>

              <h1 className="mt-5 max-w-4xl text-3xl font-black leading-tight text-slate-950 sm:text-4xl lg:text-6xl">
                {t.doctoratePage.title}
              </h1>

              <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-slate-600">
                {t.doctoratePage.subtitle}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { value: phdItems.length, label: copy.pages.doctorate.stats[0], icon: FileText },
                { value: "PDF", label: copy.pages.doctorate.stats[1], icon: FileCheck2 },
                { value: "PhD", label: copy.pages.doctorate.stats[2], icon: BookOpenCheck },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="border border-slate-200 bg-white p-5 text-center shadow-sm"
                >
                  <stat.icon className="mx-auto mb-3 h-5 w-5 text-cyan-600" />
                  <p className="font-mono text-3xl font-black text-[#604eff]">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs font-extrabold uppercase tracking-wide text-slate-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </header>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <aside className="border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_24px_80px_rgba(15,23,42,0.14)]">
            <div className="flex h-12 w-12 items-center justify-center bg-white text-slate-950">
              <ListChecks className="h-6 w-6" />
            </div>

            <h2 className="mt-6 text-2xl font-black leading-tight">
              {copy.pages.doctorate.preparation}
            </h2>

            <div className="mt-6 grid gap-4">
              {copy.pages.doctorate.steps.map((item, index) => (
                <div key={item} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-white/15 bg-white/10 font-mono text-xs font-black text-cyan-200">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm font-semibold leading-7 text-slate-300">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-white/10 pt-5">
              <div className="flex gap-3">
                <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-emerald-300" />
                <p className="text-sm font-medium leading-7 text-slate-300">
                  {copy.pages.doctorate.note}
                </p>
              </div>
            </div>
          </aside>

          <ul className="grid gap-5 md:grid-cols-2">
            {phdItems.map((item, index) => (
              <li
                key={item.number}
                className="group flex min-h-64 flex-col justify-between border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#604eff]/35 hover:shadow-[0_22px_70px_rgba(96,78,255,0.12)]"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center bg-[#604eff] font-mono text-sm font-black text-white">
                      {String(item.number).padStart(2, "0")}
                    </span>

                    <span className="inline-flex items-center border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-black uppercase tracking-wide text-emerald-700">
                      <FileCheck2 className="mr-1.5 h-3.5 w-3.5" />
                      PDF
                    </span>
                  </div>

                  <p className="mt-6 text-lg font-extrabold leading-snug text-slate-950 md:text-xl">
                    {copy.pages.doctorate.items[index]}
                  </p>
                </div>

                <div className="mt-6 grid gap-3 border-t border-slate-100 pt-5 sm:grid-cols-2">
                  <a
                    href={item.viewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center border border-[#604eff]/20 bg-white px-4 py-3 text-sm font-extrabold text-[#604eff] transition hover:-translate-y-0.5 hover:border-[#604eff]/45"
                    aria-label={t.doctoratePage.viewPdf}
                  >
                    <EyeIcon className="mr-2 h-4 w-4" />
                    {t.common.view}
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </a>

                  <a
                    href={item.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-slate-950 px-4 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#604eff]"
                    aria-label={t.doctoratePage.downloadPdf}
                    download
                  >
                    <Download className="mr-2 h-4 w-4" />
                    {t.common.download}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-center text-sm font-semibold leading-7 text-slate-500">
          {t.doctoratePage.footer}
        </p>
      </section>
      
    </main>
  );
};

export default PhDPrograms;
