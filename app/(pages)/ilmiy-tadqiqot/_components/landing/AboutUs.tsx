/** @format */

"use client";

import Image from "next/image";
import AboutImage from "@/public/Laboratoriya/aboutus.png";
import AboutImageDark from "@/public/research-about-dark.png";
import { useLocale } from "@/i18n";
import { getResearchContent } from "@/i18n/research-content";

function AboutAmbient() {
  return (
    <div className="pointer-events-none absolute inset-0 z-1 overflow-hidden">
      <div
        className="absolute inset-0 opacity-55"
        style={{
          backgroundImage:
            "linear-gradient(rgba(36,107,254,0.075) 1px, transparent 1px), linear-gradient(90deg, rgba(36,107,254,0.075) 1px, transparent 1px)",
          backgroundSize: "38px 38px",
        }}
      />
      <div className="absolute left-0 top-14 h-120 w-150 rounded-full bg-blue-400/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-105 w-135 rounded-full bg-cyan-300/12 blur-3xl" />
    </div>
  );
}

export function AboutUs() {
  const { locale } = useLocale();
  const copy = getResearchContent(locale).about;

  return (
    <section
      id="haqida"
      className="relative flex min-h-screen scroll-mt-24 items-center overflow-hidden bg-[#f7faff]">
      <AboutAmbient />

      <div className="absolute bottom-0 left-0 top-0 z-[3] w-full lg:w-[55%]">
        <Image
          src={AboutImage}
          alt={copy.imageAlt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 64vw"
          className="theme-image-light object-cover object-[48%_center] brightness-[1.02] contrast-[1.08] saturate-[1.12]"
        />
        <Image
          src={AboutImageDark}
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="theme-image-dark object-cover object-center"
        />
        <div className="hero-reading-overlay absolute inset-0 bg-[#f7faff]/84 lg:hidden" />
        <div className="about-left-overlay absolute bottom-0 left-0 top-0 hidden w-20 bg-linear-to-r from-[#f7faff]/38 to-transparent lg:block" />
        <div className="about-right-overlay absolute bottom-0 right-0 top-0 hidden w-72 bg-linear-to-l from-[#f7faff] via-[#f7faff]/74 to-transparent lg:block" />
        <div className="about-bottom-overlay absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-[#f7faff] to-transparent" />
      </div>

      <div className="container relative z-20 mx-auto w-full px-4 py-16 sm:px-6 lg:px-10">
        <div className="ml-auto max-w-2xl lg:w-[43%]">
          <div className="mb-6 inline-flex max-w-full items-center gap-3 rounded-full border border-blue-100 bg-white/86 px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-blue-700 shadow-sm backdrop-blur-xl sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[#246BFE]" />
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#604eff]">
              {copy.eyebrow}
            </p>
          </div>
          <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] font-black leading-[1.02] tracking-tight text-slate-950">
            {copy.title}
          </h2>
          <p className="mt-7 text-justify text-base font-light leading-8 text-slate-600 sm:text-lg">
            {copy.description}
          </p>
        </div>
      </div>
    </section>
  );
}
