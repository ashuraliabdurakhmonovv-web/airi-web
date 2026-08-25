/** @format */

"use client";

import { GraduationCap, Handshake, Microscope } from "lucide-react";
import { SectionHeader } from "./section-header";
import type { CardItem } from "./types";
import { useLocale } from "@/i18n";
import { getResearchContent } from "@/i18n/research-content";

const audienceVisuals: (Pick<CardItem, "icon"> & {
  number: string;
  tone: string;
  iconTone: string;
})[] = [
  {
    number: "01",
    icon: GraduationCap,
    tone: "from-blue-600 to-cyan-500",
    iconTone: "bg-blue-50 text-blue-700",
  },
  {
    number: "02",
    icon: Microscope,
    tone: "from-slate-950 to-blue-900",
    iconTone: "bg-slate-100 text-slate-950",
  },
  {
    number: "03",
    icon: Handshake,
    tone: "from-[#604eff] to-blue-600",
    iconTone: "bg-violet-50 text-[#604eff]",
  },
];

export function AudienceSection() {
  const { locale } = useLocale();
  const copy = getResearchContent(locale).audience;
  const audiences = audienceVisuals.map((item, index) => ({
    ...item,
    ...copy.items[index],
  }));

  return (
    <section
      id="kimlar-uchun"
      className="relative scroll-mt-24 overflow-hidden bg-[#f7faff] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div
        className="pointer-events-none absolute inset-0 opacity-55"
        style={{
          backgroundImage:
            "linear-gradient(rgba(36,107,254,0.065) 1px, transparent 1px), linear-gradient(90deg, rgba(36,107,254,0.065) 1px, transparent 1px)",
          backgroundSize: "38px 38px",
        }}
      />
      <div className="pointer-events-none absolute -left-24 top-20 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-cyan-300/12 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeader
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
          align="center"
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {audiences.map((item) => (
            <AudienceCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AudienceCard({ item }: { item: CardItem & { number: string; tone: string; iconTone: string } }) {
  const Icon = item.icon;

  return (
    <article className="group relative min-h-[330px] overflow-hidden rounded-lg border border-blue-100 bg-white/86 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.07)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-[0_26px_80px_rgba(37,99,235,0.16)]">
      <div
        className={[
          "absolute inset-x-0 top-0 h-1.5 bg-linear-to-r",
          item.tone,
        ].join(" ")}
      />
      <div
        className={[
          "pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-linear-to-br opacity-10 blur-2xl transition duration-300 group-hover:opacity-20",
          item.tone,
        ].join(" ")}
      />

      <div className="flex items-start justify-between gap-5">
        <span
          className={[
            "flex h-14 w-14 items-center justify-center rounded-lg transition duration-300 group-hover:scale-105",
            item.iconTone,
          ].join(" ")}>
          <Icon className="h-7 w-7" />
        </span>
        <span className="font-display text-5xl font-black leading-none text-slate-700 transition duration-300 group-hover:text-blue-900">
          {item.number}
        </span>
      </div>

      <div className="mt-12">
        <h3 className="text-2xl font-black leading-snug text-slate-950">
          {item.title}
        </h3>
        <p className="mt-4 text-base font-medium leading-8 text-slate-600">
          {item.description}
        </p>
      </div>

      <div className="absolute bottom-6 left-6 right-6 h-px overflow-hidden bg-slate-200">
        <span
          className={[
            "block h-full w-0 bg-linear-to-r transition-all duration-500 group-hover:w-full",
            item.tone,
          ].join(" ")}
        />
      </div>
    </article>
  );
}
