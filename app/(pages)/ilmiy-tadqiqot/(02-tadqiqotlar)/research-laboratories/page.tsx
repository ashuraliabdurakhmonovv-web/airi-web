/** @format */
"use client";

import { laboratories, type Laboratory } from "@/common/lab/data";
import { useLocale } from "@/i18n";
import { getResearchContent } from "@/i18n/research-content";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  Cpu,
  Fingerprint,
  FlaskConical,
  MessageSquareText,
  Microscope,
  Network,
  ScanSearch,
  UsersRound,
  Wifi,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function LabIcon({
  icon,
  className,
}: {
  icon: Laboratory["icon"];
  className?: string;
}) {
  switch (icon) {
    case "fingerprint":
      return <Fingerprint className={className} />;
    case "scan":
      return <ScanSearch className={className} />;
    case "messages":
      return <MessageSquareText className={className} />;
    case "brain":
      return <BrainCircuit className={className} />;
    case "code":
      return <Cpu className={className} />;
    case "network":
      return <Network className={className} />;
    case "cpu":
      return <Cpu className={className} />;
    case "wifi":
      return <Wifi className={className} />;
    default:
      return <FlaskConical className={className} />;
  }
}

const Laboratories = () => {
  const { t, locale } = useLocale();
  const copy = getResearchContent(locale);

  return (
    <main className="min-h-screen bg-[#f7faff] text-slate-950">
      <section className="relative overflow-hidden px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="pointer-events-none absolute inset-0 z-1">
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

        <div className="relative z-20 mx-auto max-w-7xl">
          <Link
            href="/ilmiy-tadqiqot"
            className="mb-8 inline-flex items-center gap-2 rounded-lg border border-blue-100 bg-white/86 px-4 py-2 text-sm font-black text-blue-700 shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white">
            <ArrowLeft className="h-4 w-4" />
            {copy.pages.back}
          </Link>

          <header className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
            <div>
              <div className="mb-6 inline-flex max-w-full items-center gap-3 rounded-full border border-blue-100 bg-white/86 px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-blue-700 shadow-sm backdrop-blur-xl sm:text-xs">
                <Microscope className="h-4 w-4" />
                <span>{copy.laboratories.eyebrow}</span>
              </div>

              <h1 className="font-display max-w-5xl text-[clamp(2.5rem,6vw,5rem)] font-black leading-[1.02] tracking-tight text-slate-950">
                {t.laboratoriesPage.title}
              </h1>

              <p className="mt-7 max-w-3xl text-justify text-base font-light leading-8 text-slate-600 sm:text-lg">
                {t.laboratoriesPage.description}
              </p>
            </div>

            <div className="grid grid-cols-3 overflow-hidden rounded-lg border border-blue-100 bg-white/88 shadow-[0_18px_55px_rgba(15,23,42,0.07)] backdrop-blur-xl">
              {[
                {
                  value: laboratories.length,
                  label: copy.laboratories.stats[0],
                  icon: FlaskConical,
                },
                { value: "AI", label: copy.laboratories.stats[1], icon: BrainCircuit },
                { value: "PhD", label: copy.laboratories.stats[2], icon: UsersRound },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className={[
                    "p-5 text-center",
                    index !== 2 ? "border-r border-blue-100" : "",
                  ].join(" ")}>
                  <stat.icon className="mx-auto mb-3 h-5 w-5 text-blue-700" />
                  <p className="font-display text-4xl font-black leading-none text-slate-950">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[10px] font-black uppercase leading-4 tracking-[0.12em] text-slate-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </header>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-4">
          {laboratories.map((lab, index) => (
            <LaboratoryCard key={lab.id} lab={lab} index={index} copy={copy.laboratories} />
          ))}
        </div>
      </section>
    </main>
  );
};

function LaboratoryCard({ lab, index, copy }: { lab: Laboratory; index: number; copy: ReturnType<typeof getResearchContent>["laboratories"] }) {
  const localizedLab = copy.items[index];
  return (
    <article className="group relative flex min-h-[445px] flex-col overflow-hidden rounded-lg border border-blue-100 bg-white/88 shadow-[0_18px_55px_rgba(15,23,42,0.07)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-[0_26px_80px_rgba(37,99,235,0.16)]">
      <div className="relative h-[232px] overflow-hidden bg-slate-950">
        <Image
          src={lab.coverImage}
          alt={localizedLab.alt}
          fill
          priority={index < 2}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/35 to-transparent" />
        <div className="absolute left-4 top-4 rounded-lg border border-white/20 bg-white/10 px-3 py-1 font-display text-xs font-black text-white backdrop-blur-md">
          {String(index + 1).padStart(2, "0")}
        </div>
        <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-lg border border-cyan-200/30 bg-cyan-300/15 px-3 py-1 text-xs font-black text-cyan-100 backdrop-blur-md">
          <BadgeCheck className="h-3.5 w-3.5" />
          {copy.status}
        </div>
      </div>

      <div className="flex grow flex-col p-6">
        <h2 className="line-clamp-2 text-xl font-black leading-snug text-slate-950 transition group-hover:text-blue-700">
          {localizedLab.name}
        </h2>
        <p className="mt-4 line-clamp-4 grow text-sm font-medium leading-7 text-slate-600">
          {localizedLab.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {lab.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-black text-blue-700">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 border-t border-blue-100 pt-4">
          {[
            { value: lab.metrics.projects, label: copy.metrics[0] },
            { value: lab.metrics.publications, label: copy.metrics[1] },
            { value: lab.metrics.supervisors, label: copy.metrics[2] },
          ].map((metric) => (
            <div key={metric.label} className="rounded-lg bg-[#f7faff] p-2">
              <p className="font-display text-lg font-black text-slate-950">
                {metric.value}
              </p>
              <p className="text-[10px] font-bold text-slate-500">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        <Link
          href={lab.href}
          className="relative z-10 mt-5 inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-slate-950">
          {copy.details}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

export default Laboratories;
