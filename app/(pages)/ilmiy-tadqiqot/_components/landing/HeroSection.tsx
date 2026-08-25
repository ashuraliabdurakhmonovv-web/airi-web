/** @format */
"use client";

import {
  BookOpenText,
  FileText,
  FlaskConical,
  MapPin,
  Sparkles,
  UsersRound,
} from "lucide-react";
import Image from "next/image";
import CountUp from "@/app/_components/react-bits/count-up";
import HeroImage from "@/public/Laboratoriya/Hero.png";
import { useLocale } from "@/i18n";
import { getResearchContent } from "@/i18n/research-content";

function HeroAmbient() {
  return (
    <div className="pointer-events-none absolute inset-0 z-1 overflow-hidden">
      <div
        className="absolute inset-0 opacity-65"
        style={{
          backgroundImage:
            "linear-gradient(rgba(36,107,254,0.085) 1px, transparent 1px), linear-gradient(90deg, rgba(36,107,254,0.085) 1px, transparent 1px)",
          backgroundSize: "38px 38px",
        }}
      />

      <div className="absolute -left-40 top-24 h-105 w-105 rounded-full bg-blue-400/10 blur-3xl" />
      <div className="absolute right-0 top-0 h-155 w-155 rounded-full bg-cyan-300/14 blur-3xl" />
      <div className="absolute bottom-0 left-1/2 h-90 w-155 -translate-x-1/2 rounded-full bg-indigo-300/8 blur-3xl" />
    </div>
  );
}

function ResearchHoverPanel() {
  const { locale } = useLocale();
  const copy = getResearchContent(locale).hero;
  const researchHighlights = [
    { value: "40+", label: copy.stats[2].label, detail: copy.stats[2].detail, icon: UsersRound },
    { value: "120+", label: copy.map.article, detail: copy.map.publicationDetail, icon: FileText },
    { value: "6+", label: copy.stats[1].label, detail: copy.stats[1].detail, icon: FlaskConical },
  ];
  const researchMapPoints = [
    { key: "overview", value: "AI", label: copy.map.overviewLabel, detail: copy.map.overviewDetail, icon: BookOpenText, x: "60%", y: "45%", panelClassName: "left-5 top-8 w-[430px]", panelTone: "light" },
    { key: "researchers", value: "40+", label: copy.map.researchers, detail: copy.stats[2].detail, icon: UsersRound, x: "46%", y: "46%", panelClassName: "right-5 top-7 w-64", panelTone: "light" },
    { key: "publications", value: "120+", label: copy.map.publications, detail: copy.map.publicationDetail, icon: FileText, x: "80%", y: "30%", panelClassName: "right-5 top-7 w-[15.5rem]", panelTone: "dark" },
    { key: "labs", value: "6+", label: copy.map.laboratories, detail: copy.map.laboratoryDetail, icon: FlaskConical, x: "61%", y: "90%", panelClassName: "left-5 bottom-7 w-64", panelTone: "light", chart: [32, 46, 38, 54, 44] },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 z-30 hidden lg:block">
      <div className="pointer-events-auto absolute right-0 top-0 h-full w-[70%]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_34%,rgba(14,165,233,0.16),transparent_24%),radial-gradient(circle_at_34%_74%,rgba(37,99,235,0.12),transparent_18%)]" />

        {researchMapPoints.map((point) => {
          const Icon = point.icon;
          const isOverview = point.key === "overview";
          const isDark = point.panelTone === "dark";

          return (
            <div
              key={point.key}
              className="group absolute z-50 h-[104px] w-[104px] -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{ left: point.x, top: point.y }}>
              <div className="absolute inset-0 rounded-full" />

              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                <span className="absolute h-20 w-20 rounded-full border border-cyan-200/80 bg-cyan-300/10 shadow-[0_0_32px_rgba(14,165,233,0.24)] transition-all duration-300 group-hover:scale-125 group-hover:border-blue-300/90 group-hover:bg-blue-500/10" />
                <span className="absolute h-12 w-12 rounded-full border border-white/70 bg-blue-500/10 shadow-[0_0_18px_rgba(37,99,235,0.22)] transition-all duration-300 group-hover:scale-110" />
                <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue-700 shadow-[0_12px_28px_rgba(15,23,42,0.16)] ring-4 ring-blue-500/14 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:ring-blue-200/60">
                  <MapPin className="h-5 w-5" />
                </span>
              </div>

              <div className="absolute left-1/2 top-[calc(50%+26px)] min-w-28 -translate-x-1/2 rounded-full border border-white/70 bg-white/88 px-3 py-1.5 text-center shadow-[0_10px_25px_rgba(15,23,42,0.12)] backdrop-blur-xl transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-blue-600 group-hover:text-white">
                <p className="font-display text-xl font-black leading-none text-blue-600 transition-colors duration-300 group-hover:text-white">
                  {point.value}
                </p>
                <p className="mt-1 text-[9px] font-black uppercase leading-3 tracking-[0.12em] text-slate-600 transition-colors duration-300 group-hover:text-white/78">
                  {point.label}
                </p>
              </div>

              <div
                className={[
                  "absolute translate-y-5 scale-95 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100",
                  point.panelClassName,
                ].join(" ")}>
                {isOverview ? (
                  <div className="rounded-[26px] border border-blue-100 bg-white p-5 shadow-[0_22px_65px_rgba(15,23,42,0.14)]">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-700">
                          {copy.indicators}
                        </p>
                        <p className="mt-2 text-sm font-semibold leading-5 text-slate-500">
                          {copy.indicatorsDescription}
                        </p>
                      </div>

                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/25">
                        <BookOpenText className="h-5 w-5" />
                      </span>
                    </div>

                    <div className="mt-5 space-y-3">
                      {researchHighlights.map((item, index) => {
                        const HighlightIcon = item.icon;

                        return (
                          <div
                            key={item.label}
                            className="grid grid-cols-[48px_1fr_auto] items-center gap-3 rounded-[18px] border border-blue-100 bg-[#f8fbff] p-3 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:border-blue-300 hover:bg-white hover:shadow-[0_16px_38px_rgba(37,99,235,0.16)]">
                            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                              <HighlightIcon className="h-5 w-5" />
                            </span>

                            <div>
                              <p className="text-sm font-black leading-5 text-slate-950">
                                {item.label}
                              </p>
                              <p className="mt-1 text-[10px] font-black uppercase tracking-[0.1em] text-slate-500">
                                {item.detail}
                              </p>
                            </div>

                            <span
                              className={[
                                "font-display text-4xl font-black leading-none",
                                index === 0
                                  ? "text-blue-600"
                                  : "text-slate-950",
                              ].join(" ")}>
                              {item.value}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div
                    className={[
                      "rounded-[22px] p-4 shadow-[0_18px_48px_rgba(37,99,235,0.18)]",
                      isDark
                        ? "border border-slate-700/40 bg-slate-950 text-white shadow-[0_18px_48px_rgba(15,23,42,0.28)]"
                        : "border border-blue-100 bg-white text-slate-950",
                    ].join(" ")}>
                    <div className="flex items-center gap-4">
                      <span
                        className={[
                          "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl",
                          isDark
                            ? "bg-white/10 text-cyan-200"
                            : "bg-blue-50 text-blue-700",
                        ].join(" ")}>
                        <Icon className="h-5 w-5" />
                      </span>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-black leading-4">
                          {point.label}
                        </p>
                        <p
                          className={[
                            "mt-1 text-[10px] font-black uppercase tracking-[0.1em]",
                            isDark ? "text-white/70" : "text-slate-500",
                          ].join(" ")}>
                          {point.detail}
                        </p>
                      </div>

                      <p
                        className={[
                          "font-display text-3xl font-black leading-none",
                          isDark ? "text-white" : "text-blue-600",
                        ].join(" ")}>
                        {point.value}
                      </p>
                    </div>

                    {point.chart ? (
                      <div className="mt-4 flex h-12 items-end gap-1.5">
                        {point.chart.map((height) => (
                          <span
                            key={height}
                            className="flex-1 rounded-t-md bg-linear-to-t from-blue-600 to-cyan-300"
                            style={{ height: `${height}px` }}
                          />
                        ))}
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const HeroSections = () => {
  const { locale } = useLocale();
  const copy = getResearchContent(locale).hero;

  return (
    <section
      data-research-hero
      className="relative -mt-20 flex min-h-svh items-center overflow-hidden bg-[#f7faff] pt-[84px]">
      <HeroAmbient />

      {/* Right visual */}
      <div className="absolute bottom-0 right-0 top-0 z-[3] w-full lg:w-[70%]">
        <Image
          src={HeroImage}
          alt={copy.imageAlt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 70vw"
          className="object-cover object-[58%_center] brightness-[0.99] contrast-[1.12] saturate-[1.16]"
        />

        <div className="absolute inset-0 bg-[#f7faff]/86 lg:hidden" />

        <div className="absolute bottom-0 left-0 top-0 hidden w-36 bg-linear-to-r from-[#f7faff] via-[#f7faff]/50 to-transparent lg:block" />

        <div className="absolute inset-y-0 right-0 hidden w-14 bg-linear-to-l from-[#f7faff]/18 to-transparent lg:block" />
      </div>

      <ResearchHoverPanel />

      {/* Content */}
      <div className="container relative z-20 mx-auto w-full px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-175 text-center lg:mx-0 lg:text-left">
          <div className="mb-5 inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-blue-100 bg-white/86 px-4 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-blue-700 shadow-sm backdrop-blur-xl sm:text-xs sm:tracking-[0.16em]">
            <Sparkles className="h-4 w-4" />
            <span>{copy.badge}</span>
          </div>
          <h1 className="font-display text-[clamp(2.25rem,7vw,4.75rem)] font-black leading-[0.96] tracking-tight text-slate-950">
            <span className="block bg-linear-to-r from-[#246BFE] via-[#0ea5e9] to-[#06b6d4] bg-clip-text text-transparent sm:inline">
              {copy.titleAccent}
            </span>{" "}
            {copy.title}
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-justify text-sm font-light leading-6 text-slate-600 sm:mt-6 sm:text-base sm:leading-8 md:text-lg lg:mx-0">
            {copy.description}
          </p>

          <div className="mt-7 grid max-w-2xl border border-slate-200 bg-white/80 shadow-[0_16px_44px_rgba(15,23,42,0.07)] backdrop-blur-xl sm:mt-9 sm:grid-cols-3">
            {[
              ["4+", copy.stats[0].label],
              ["6+", copy.stats[1].label],
              ["40+", copy.stats[2].label],
            ].map(([value, label], index) => {
              const numericValue = parseInt(value, 10);
              const suffix = value.replace(/\d+/g, "");

              return (
                <div
                  key={label}
                  className={[
                    "relative border-b border-slate-200 px-4 py-4 text-left last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0",
                    index === 0
                      ? "bg-blue-600 text-white"
                      : index === 2
                        ? "bg-slate-950 text-white"
                        : "bg-white/72 text-slate-950",
                  ].join(" ")}>
                  <span className="block font-display text-4xl font-black leading-none">
                    <CountUp
                      to={numericValue}
                      duration={1.5}
                      className="inline-block"
                      once={false}
                    />
                    {suffix}
                  </span>
                  <span className="mt-3 block text-[11px] font-black uppercase leading-4 tracking-[0.12em] opacity-80">
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
