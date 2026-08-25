/** @format */

"use client";

import {
  ChevronDown,
  HelpCircle,
  MessageCircleQuestion,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { SectionHeader } from "./section-header";
import { useLocale } from "@/i18n";
import { getResearchContent, type ResearchContent } from "@/i18n/research-content";

function FaqAmbient() {
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

      <div className="absolute -left-32 top-16 h-120 w-150 rounded-full bg-blue-400/10 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-120 w-150 rounded-full bg-cyan-300/12 blur-3xl" />
      <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 blur-3xl" />
    </div>
  );
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { locale } = useLocale();
  const copy = getResearchContent(locale).faq;

  return (
    <section
      id="faq"
      className="relative scroll-mt-24 overflow-hidden bg-[#f7faff] px-4 py-16 sm:px-6 md:py-24 lg:px-8"
    >
      <FaqAmbient />

      <div className="relative z-20 mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="FAQ"
          title={copy.title}
          description={copy.description}
          align="center"
        />

        <div className="mx-auto mt-12 flex max-w-4xl flex-col gap-4">
          {copy.items.map((item, index) => (
            <FaqItem
              key={item.question}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            />
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-2xl border border-blue-100 bg-white/80 p-5 shadow-[0_18px_55px_rgba(15,23,42,0.06)] backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                <MessageCircleQuestion className="h-6 w-6" />
              </div>

              <div>
                <h3 className="text-base font-black text-slate-950 sm:text-lg">
                  {copy.missingQuestion}
                </h3>

                <p className="mt-1 text-sm font-medium leading-6 text-slate-600">
                  {copy.contactNote}
                </p>
              </div>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-blue-700">
              <Sparkles className="h-4 w-4" />
              {copy.support}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: ResearchContent["faq"]["items"][number];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <article
      className={[
        "group relative overflow-hidden rounded-2xl border backdrop-blur-xl transition duration-300",
        isOpen
          ? "border-blue-200 bg-white shadow-[0_26px_80px_rgba(37,99,235,0.14)]"
          : "border-blue-100 bg-white/82 shadow-[0_18px_55px_rgba(15,23,42,0.06)] hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white",
      ].join(" ")}
    >
      <div
        className={[
          "absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-blue-600 to-cyan-400 transition duration-300",
          isOpen ? "opacity-100" : "opacity-70",
        ].join(" ")}
      />

      <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-linear-to-br from-blue-600 to-cyan-400 opacity-10 blur-2xl transition duration-300 group-hover:opacity-20" />

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="relative z-10 flex w-full items-start gap-4 p-5 text-left sm:p-6"
      >
        <div
          className={[
            "flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl transition duration-300 sm:h-14 sm:w-14",
            isOpen
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
              : "bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white",
          ].join(" ")}
        >
          <HelpCircle className="h-6 w-6 sm:h-7 sm:w-7" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="font-display text-xs font-black text-blue-600/60">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="mt-1 text-lg font-black leading-snug text-slate-950 sm:text-xl">
                {item.question}
              </h3>
            </div>

            <div
              className={[
                "mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-white text-blue-700 shadow-sm transition duration-300",
                isOpen ? "rotate-180" : "rotate-0",
              ].join(" ")}
            >
              <ChevronDown className="h-5 w-5" />
            </div>
          </div>

          <div
            className={[
              "grid transition-all duration-300 ease-out",
              isOpen
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0",
            ].join(" ")}
          >
            <div className="overflow-hidden">
              <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-slate-600 sm:text-base sm:leading-8">
                {item.answer}
              </p>
            </div>
          </div>
        </div>
      </button>
    </article>
  );
}
