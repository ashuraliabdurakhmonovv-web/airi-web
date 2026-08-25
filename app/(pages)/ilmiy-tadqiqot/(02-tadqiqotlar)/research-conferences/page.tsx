/** @format */
"use client";

import { conferences } from "@/common/conferences/data";
import { useLocale } from "@/i18n";
import { getResearchContent } from "@/i18n/research-content";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  CalendarIcon,
  MapPin,
  Megaphone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Conferences = () => {
  const { t, locale } = useLocale();
  const copy = getResearchContent(locale).pages;

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section className="relative overflow-hidden bg-slate-950 px-4 py-10 text-white sm:px-6 sm:py-14 lg:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(96,78,255,0.28)_1px,transparent_1px),linear-gradient(180deg,rgba(8,232,234,0.16)_1px,transparent_1px)] bg-[size:72px_72px]" />

        <div className="relative mx-auto max-w-7xl">
          <Link
            href="/ilmiy-tadqiqot"
            className="mb-8 inline-flex items-center gap-2 border border-white/15 bg-white/10 px-4 py-2 text-sm font-extrabold text-cyan-100 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/15"
          >
            <ArrowLeft className="h-4 w-4" />
            {copy.back}
          </Link>

          <header className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <span className="inline-flex items-center border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-100 backdrop-blur">
                <CalendarDays className="mr-2 h-4 w-4" />
                {copy.conferences.eyebrow}
              </span>

              <h1 className="mt-5 max-w-4xl text-3xl font-black leading-tight text-white sm:text-4xl lg:text-6xl">
                {t.conferencesPage.title}
              </h1>

              <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-slate-300">
                {t.conferencesPage.subtitle}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                {
                  value: conferences.length,
                  label: copy.conferences.stats[0],
                  icon: CalendarIcon,
                },
                { value: "AI", label: copy.conferences.stats[1], icon: Megaphone },
                { value: "R&D", label: copy.conferences.stats[2], icon: MapPin },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="border border-white/15 bg-white/10 p-5 text-center backdrop-blur"
                >
                  <stat.icon className="mx-auto mb-3 h-5 w-5 text-cyan-200" />
                  <p className="font-mono text-3xl font-black text-cyan-100">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs font-extrabold uppercase tracking-wide text-slate-300">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </header>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {conferences.map((conf, index) => (
              <article
                key={conf.title}
                className="group flex h-full flex-col overflow-hidden border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#604eff]/35 hover:shadow-[0_22px_70px_rgba(96,78,255,0.12)]"
              >
                <div className="relative h-64 overflow-hidden bg-slate-950">
                  <Image
                    src={conf.imageSrc}
                    alt={copy.conferences.items[index].imageAlt}
                    fill
                    priority={index < 2}
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  <div className="absolute left-4 top-4 border border-white/20 bg-white/10 px-3 py-1 font-mono text-xs font-black text-white backdrop-blur">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <span className="absolute bottom-4 left-4 bg-[#604eff] px-3 py-1 text-xs font-black uppercase tracking-wide text-white">
                    {conf.isUpcoming
                      ? t.conferencesPage.upcoming
                      : copy.conferences.archived}
                  </span>
                </div>

                <div className="flex grow flex-col p-6">
                  <h2 className="text-xl font-black leading-snug text-slate-950">
                    {copy.conferences.items[index].title}
                  </h2>

                  <div className="mt-5 grid gap-3 border-t border-slate-100 pt-5">
                    <time
                      dateTime={conf.datetime}
                      className="flex items-center gap-3 text-sm font-bold text-slate-600"
                    >
                      <CalendarIcon className="h-5 w-5 text-[#604eff]" />
                      {copy.conferences.items[index].date}
                    </time>

                    <div className="flex items-center gap-3 text-sm font-bold text-slate-600">
                      <MapPin className="h-5 w-5 text-cyan-600" />
                      {copy.conferences.items[index].location}
                    </div>
                  </div>

                  <div className="mt-auto pt-6">
                    {conf.link && conf.link !== "#" ? (
                      <Link
                        href={conf.link}
                        className="inline-flex w-full items-center justify-center bg-slate-950 px-5 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#604eff]"
                      >
                        {t.common.details}
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Link>
                    ) : (
                      <span className="inline-flex w-full items-center justify-center border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-extrabold text-slate-500">
                        {t.conferencesPage.infoSoon}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/umumiy-malumot/institute-eventcalendar"
              className="inline-flex items-center border border-[#604eff]/20 bg-white px-5 py-3 text-sm font-extrabold text-[#604eff] transition hover:-translate-y-0.5 hover:border-[#604eff]/45"
            >
              {t.conferencesPage.allConferences}
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Conferences;
