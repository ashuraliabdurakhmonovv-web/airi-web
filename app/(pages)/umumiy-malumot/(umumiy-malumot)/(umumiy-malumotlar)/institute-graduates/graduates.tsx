/** @format */
"use client";

import { Button } from "@/components/ui/button";
import {
  Dissertation,
  graduateYearSectionBase,
} from "@/common/graduates/data";
import { useLocale } from "@/i18n";
import {
  ArrowUpRight,
  BookOpenText,
  CalendarDays,
  GraduationCap,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

type YearSection = {
  year: string;
  items: Dissertation[];
};

const Graduates: FC = () => {
  const { t } = useLocale();
  const pathname = usePathname();
  const basePath = pathname.replace(/\/$/, "");
  const allItems = graduateYearSectionBase.flatMap(({ items }) => items);
  const getLocalizedDissertation = (
    baseItem: (typeof allItems)[number],
  ): Dissertation => {
    const index = allItems.findIndex((item) => item.slug === baseItem.slug);
    const localized = t.graduatesPage.items[index];

    return {
      ...baseItem,
      ...localized,
    };
  };
  const graduateYearSections = graduateYearSectionBase.map((section) => ({
    year: section.year,
    items: section.items.map(getLocalizedDissertation),
  }));

  const renderCard = (diss: Dissertation) => (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_16px_50px_rgba(15,23,42,0.07)] transition duration-300 hover:-translate-y-1 hover:border-[#604eff]/35 hover:shadow-[0_24px_70px_rgba(96,78,255,0.14)]">
      <div className="h-1.5 bg-linear-to-r from-[#604eff] via-[#08e8ea] to-emerald-400" />

      <div className="p-3 pb-0">
        <div className="relative flex  items-center justify-center overflow-hidden rounded-lg bg-linear-to-br from-[#f8f9ff] via-white to-[#eefcff] p-4">
          <div className="relative h-full w-full overflow-hidden rounded-lg bg-white p-3 shadow-sm ring-1 ring-slate-200/70">
            <Image
              src={diss.imageUrl}
              alt={diss.fullName}
              width={420}
              height={520}
              className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.04]"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <div className="flex grow flex-col p-5">
        <div className="mb-4 flex items-start gap-3">
          <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#604eff]/10 text-[#604eff]">
            <UserRound className="h-5 w-5" />
          </div>

          <h3 className="font-heading text-[20px] font-extrabold leading-7 text-slate-950">
            {diss.fullName}
          </h3>
        </div>

        <p className="line-clamp-3 text-[15px] font-medium leading-6 text-slate-600">
          {diss.bio}
        </p>

        <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50/80 p-4">
          <div className="mb-2 flex items-center gap-2 font-accent text-xs font-extrabold uppercase text-[#604eff]">
            <BookOpenText className="h-4 w-4" />
            {t.graduatesPage.researchTopic}
          </div>

          <p className="line-clamp-4 text-sm font-semibold leading-6 text-slate-800">
            {diss.title}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-500">
            <CalendarDays className="h-4 w-4 text-[#604eff]" />
            <time>{diss.date}</time>
          </div>

          <Button
            asChild
            size="sm"
            className="rounded-lg bg-[#604eff] font-bold text-white shadow-lg shadow-[#604eff]/20 hover:bg-[#4f3ff0]">
            <Link href={`${basePath}/${diss.slug}`}>
              {t.common.details}
              <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );

  const renderYearSection = ({ year, items }: YearSection) => (
    <div key={year} className="mb-14 last:mb-0">
      <div className="mb-7 flex flex-col gap-3 border-b border-slate-200 pb-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-lg bg-[#604eff]/10 px-3 py-1.5 font-accent text-xs font-extrabold uppercase text-[#604eff]">
            <GraduationCap className="h-4 w-4" />
            {t.graduatesPage.defenses}
          </div>
          <h2 className="mt-3 font-heading text-2xl font-extrabold text-slate-950 md:text-3xl">
            {year} {t.graduatesPage.year}
          </h2>
        </div>

        <p className="max-w-xl text-sm font-medium leading-6 text-slate-500">
          {t.graduatesPage.yearDescription}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((diss) => (
          <div key={`${year}-${diss.slug}`}>{renderCard(diss)}</div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="bg-linear-to-b from-white via-[#fbfcff] to-white px-4 py-14 sm:px-6 md:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="airi-section-title airi-gradient-text mx-auto mt-5 max-w-4xl uppercase">
            {t.graduatesPage.title}
          </h1>

          <p className="airi-section-copy mx-auto mt-5 max-w-3xl text-slate-600">
            {t.graduatesPage.description}
          </p>
        </div>

        {graduateYearSections.map(renderYearSection)}
      </div>
    </section>
  );
};

export default Graduates;
