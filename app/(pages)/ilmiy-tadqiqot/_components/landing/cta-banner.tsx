/** @format */

"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import BannerImage from "@/public/Laboratoriya/banner.png";
import { useLocale } from "@/i18n";
import { getResearchContent } from "@/i18n/research-content";

export function CtaBanner() {
  const { locale } = useLocale();
  const copy = getResearchContent(locale).cta;

  return (
    <section className="bg-[#f7faff] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <div className="relative mx-auto grid min-h-[380px] max-w-7xl overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-[0_26px_80px_rgba(15,23,42,0.10)] md:min-h-[360px] lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <Image
          src={BannerImage}
          alt={copy.imageAlt}
          fill
          priority={false}
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover object-center brightness-[1.02] contrast-[1.04] saturate-[1.05]"
        />

        {/* White reading layer */}
        <div className="absolute inset-0 bg-linear-to-r from-[#f6f9ff] via-[#f6f9ff]/92 to-[#f6f9ff]/30 lg:from-[#f6f9ff]/95 lg:via-[#f6f9ff]/78 lg:to-transparent" />

        {/* Bottom softness */}
        <div className="absolute inset-0 bg-linear-to-t from-white/55 via-transparent to-white/10" />

        {/* Subtle blue atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_18%,rgba(37,99,235,0.16),transparent_30%)]" />

        {/* Grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              "linear-gradient(rgba(37,99,235,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.08) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />

        <div className="relative z-10 max-w-3xl p-6 sm:p-8 md:p-10 lg:p-12">
          <p className="inline-flex rounded-full border border-blue-100 bg-white/78 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-blue-700 shadow-sm backdrop-blur-xl">
            {copy.eyebrow}
          </p>

          <h2 className="mt-5 max-w-3xl text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            {copy.title}
          </h2>

          <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-slate-600 sm:text-lg">
            {copy.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/boglanish"
              className="inline-flex w-fit items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-600/20 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-700">
              {copy.action}
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>

            <span className="text-sm font-semibold text-slate-500">
              {copy.note}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
