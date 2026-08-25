/** @format */

"use client";

import { phdItems } from "@/common/doktorantura/data";
import { ArrowUpRight, FileText, GraduationCap } from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/i18n";
import { getResearchContent } from "@/i18n/research-content";

function DoctorateAmbient() {
  return (
    <div className="pointer-events-none absolute inset-0 z-1 overflow-hidden">
      <div
        className="absolute inset-0 opacity-55"
        style={{
          backgroundImage:
            "linear-gradient(rgba(36,107,254,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(36,107,254,0.07) 1px, transparent 1px)",
          backgroundSize: "38px 38px",
        }}
      />
      <div className="absolute -left-32 top-24 h-120 w-150 rounded-full bg-blue-400/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-120 w-150 rounded-full bg-cyan-300/12 blur-3xl" />
    </div>
  );
}

export function DoctorateSection() {
  const { locale } = useLocale();
  const copy = getResearchContent(locale).doctorate;

  return (
    <section
      id="doktorantura"
      className="relative scroll-mt-24 overflow-hidden bg-[#f7faff] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <DoctorateAmbient />

      <div className="relative z-20 mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
          <div>
            <div className="mb-6 inline-flex max-w-full items-center gap-3 rounded-full border border-blue-100 bg-white/86 px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-blue-700 shadow-sm backdrop-blur-xl sm:text-xs">
              <GraduationCap className="h-4 w-4" />
              <span>{copy.eyebrow}</span>
            </div>

            <h2 className="font-display max-w-4xl text-[clamp(2.3rem,5vw,4.35rem)] font-black leading-[1.02] tracking-tight text-slate-950">
              {copy.title}
            </h2>

            <p className="mt-7 max-w-2xl text-base font-light leading-8 text-slate-600 sm:text-lg">
              {copy.description}
            </p>

            <Link
              href="/ilmiy-tadqiqot/research-doctorate"
              className="group mt-9 inline-flex items-center rounded-lg bg-slate-950 px-6 py-4 text-sm font-black text-white transition duration-300 hover:-translate-y-0.5 hover:bg-blue-700">
              {copy.link}
              <ArrowUpRight className="ml-2 h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="overflow-hidden rounded-lg border border-blue-100 bg-white/88 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.07)] backdrop-blur-xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
              <FileText className="h-7 w-7" />
            </div>

            <p className="font-display mt-6 text-5xl font-black leading-none text-slate-950">
              {phdItems.length}
            </p>
            <p className="mt-3 text-sm font-black uppercase tracking-wide text-slate-500">
              {copy.countLabel}
            </p>

            <ul className="mt-6 space-y-3 border-t border-blue-100 pt-6">
              {phdItems.map((item) => (
                <li key={item.number} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                  <p className="text-sm font-semibold leading-6 text-slate-600">
                    {item.title.split(copy.specialtyMarker)[0]}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
