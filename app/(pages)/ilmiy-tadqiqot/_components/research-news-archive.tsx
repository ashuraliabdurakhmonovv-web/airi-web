/** @format */

"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  GraduationCap,
  Newspaper,
  Presentation,
  Sparkles,
} from "lucide-react";
import { NewsImage } from "@/components/news/news-image";
import { useLocale } from "@/i18n";
import { localizedText, newsHref, newsImage } from "@/lib/news";
import type {
  ResearchNewsItem,
  ResearchNewsKind,
} from "@/lib/news/research-news";

type ArchiveFilter = "all" | ResearchNewsKind;

const UI = {
  uz: {
    back: "Ilmiy tadqiqot sahifasiga qaytish",
    eyebrow: "Ilmiy yangiliklar arxivi",
    title: "Himoyalar va o'tkazilgan seminarlar",
    description:
      "Yangiliklar bo'limida chop etilgan dissertatsiya himoyasi e'lonlari hamda ilmiy seminarlar avtomatik saralab, bir joyda jamlandi.",
    autoUpdate: "Yangi mos xabar chop etilishi bilan ushbu ro'yxat ham avtomatik yangilanadi.",
    seminarsEyebrow: "Seminarlar arxivi",
    seminarsTitle: "Ilmiy seminarlar",
    seminarsDescription:
      "Institutda o'tkazilgan seminarlar, treninglar va ilmiy muhokamalar haqidagi yangiliklar avtomatik saralab, bir joyda jamlandi.",
    seminarsAutoUpdate: "Yangi seminar xabari chop etilishi bilan sahifa avtomatik yangilanadi.",
    seminarsSection: "O'tkazilgan seminarlar",
    defensesEyebrow: "Himoya e'lonlari",
    defensesTitle: "Dissertatsiya himoyasi e'lonlari",
    defensesDescription:
      "PhD va DSc dissertatsiya himoyalarining sanasi, talabgori, mavzusi va ilmiy kengashga oid xabarlari yangiliklardan avtomatik saralandi.",
    defensesAutoUpdate: "Yangi dissertatsiya himoyasi e'lon qilinganda ro'yxat avtomatik yangilanadi.",
    defensesSection: "Himoya e'lonlari",
    defenseMaterials: "himoya e'loni",
    academicDegree: "ilmiy daraja",
    phdDegree: "falsafa doktori",
    dscDegree: "fanlar doktori",
    seminarMaterials: "seminar xabari",
    newsSource: "yangiliklar",
    automatic: "yangilanish",
    all: "Barchasi",
    defense: "Himoyalar",
    seminar: "Seminarlar",
    defenseCard: "Dissertatsiya himoyasi",
    seminarCard: "Seminar",
    results: "ta material",
    readMore: "Batafsil o'qish",
    allNews: "Barcha yangiliklarni ko'rish",
    empty: "Bu bo'limda hozircha material topilmadi.",
    dateInArticle: "Tadbir sanasi maqolada",
  },
  ru: {
    back: "Вернуться к разделу исследований",
    eyebrow: "Архив научных новостей",
    title: "Защиты диссертаций и прошедшие семинары",
    description:
      "Объявления о защите диссертаций и материалы научных семинаров автоматически отобраны из раздела новостей и собраны в одном месте.",
    autoUpdate: "Список автоматически обновляется при публикации подходящей новости.",
    seminarsEyebrow: "Архив семинаров",
    seminarsTitle: "Научные семинары",
    seminarsDescription:
      "Новости о проведённых в институте семинарах, тренингах и научных обсуждениях автоматически отобраны и собраны в одном месте.",
    seminarsAutoUpdate: "Страница автоматически обновляется при публикации новости о новом семинаре.",
    seminarsSection: "Проведённые семинары",
    defensesEyebrow: "Объявления о защите",
    defensesTitle: "Объявления о защите диссертаций",
    defensesDescription:
      "Новости о датах защиты диссертаций PhD и DSc, соискателях, темах и диссертационном совете отобраны автоматически.",
    defensesAutoUpdate: "Список автоматически обновляется при публикации нового объявления о защите.",
    defensesSection: "Объявления о защите",
    defenseMaterials: "объявлений",
    academicDegree: "учёная степень",
    phdDegree: "доктор философии",
    dscDegree: "доктор наук",
    seminarMaterials: "материалов",
    newsSource: "новости",
    automatic: "обновление",
    all: "Все",
    defense: "Защиты",
    seminar: "Семинары",
    defenseCard: "Защита диссертации",
    seminarCard: "Семинар",
    results: " материалов",
    readMore: "Подробнее",
    allNews: "Смотреть все новости",
    empty: "В этом разделе пока нет материалов.",
    dateInArticle: "Дата указана в статье",
  },
  en: {
    back: "Back to research",
    eyebrow: "Research news archive",
    title: "Dissertation defenses and completed seminars",
    description:
      "Dissertation defense announcements and research seminar stories are automatically selected from the news section and collected here.",
    autoUpdate: "This list updates automatically whenever a matching story is published.",
    seminarsEyebrow: "Seminar archive",
    seminarsTitle: "Research seminars",
    seminarsDescription:
      "Stories about seminars, training sessions, and research discussions held at the institute are automatically selected and collected here.",
    seminarsAutoUpdate: "The page updates automatically whenever a new seminar story is published.",
    seminarsSection: "Completed seminars",
    defensesEyebrow: "Defense announcements",
    defensesTitle: "Dissertation defense announcements",
    defensesDescription:
      "News about PhD and DSc defense dates, candidates, topics, and the degree-awarding council is selected automatically.",
    defensesAutoUpdate: "The list updates automatically when a new dissertation defense is announced.",
    defensesSection: "Defense announcements",
    defenseMaterials: "announcements",
    academicDegree: "academic degree",
    phdDegree: "Doctor of Philosophy",
    dscDegree: "Doctor of Science",
    seminarMaterials: "seminar stories",
    newsSource: "news source",
    automatic: "updates",
    all: "All",
    defense: "Defenses",
    seminar: "Seminars",
    defenseCard: "Dissertation defense",
    seminarCard: "Seminar",
    results: " items",
    readMore: "Read more",
    allNews: "View all news",
    empty: "No materials have been found in this section yet.",
    dateInArticle: "Event date in article",
  },
} as const;

function eventDate(description: string) {
  const match = description.match(
    /(?:\d{4}-yil\s+\d{1,2}-[a-zʻ’'`-]+\s+kuni|joriy yilning\s+\d{1,2}-[a-zʻ’'`-]+\s+kuni)/iu,
  );
  return match?.[0] || "";
}

export function ResearchNewsArchive({
  items,
  variant = "combined",
}: {
  items: ResearchNewsItem[];
  variant?: "combined" | "seminars" | "defenses";
}) {
  const { locale } = useLocale();
  const language = locale === "ru" || locale === "en" ? locale : "uz";
  const t = UI[language];
  const [activeFilter, setActiveFilter] = useState<ArchiveFilter>("all");
  const seminarsOnly = variant === "seminars";
  const defensesOnly = variant === "defenses";
  const specializedKind = seminarsOnly ? "seminar" : defensesOnly ? "defense" : null;
  const archiveItems = specializedKind
    ? items.filter((item) => item.researchKind === specializedKind)
    : items.filter((item) => item.researchKind !== "announcement");
  const defenseCount = archiveItems.filter((item) => item.researchKind === "defense").length;
  const seminarCount = archiveItems.filter((item) => item.researchKind === "seminar").length;
  const visibleItems =
    specializedKind || activeFilter === "all"
      ? archiveItems
      : archiveItems.filter((item) => item.researchKind === activeFilter);
  const pageEyebrow = seminarsOnly
    ? t.seminarsEyebrow
    : defensesOnly
      ? t.defensesEyebrow
      : t.eyebrow;
  const pageTitle = seminarsOnly
    ? t.seminarsTitle
    : defensesOnly
      ? t.defensesTitle
      : t.title;
  const pageDescription = seminarsOnly
    ? t.seminarsDescription
    : defensesOnly
      ? t.defensesDescription
      : t.description;
  const updateNotice = seminarsOnly
    ? t.seminarsAutoUpdate
    : defensesOnly
      ? t.defensesAutoUpdate
      : t.autoUpdate;

  const filters: Array<{
    value: ArchiveFilter;
    label: string;
    count: number;
  }> = [
    { value: "all", label: t.all, count: archiveItems.length },
    { value: "defense", label: t.defense, count: defenseCount },
    { value: "seminar", label: t.seminar, count: seminarCount },
  ];

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section className="relative overflow-hidden border-b border-slate-200 bg-[#f7f9fc] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(96,78,255,0.07)_1px,transparent_1px),linear-gradient(180deg,rgba(8,232,234,0.08)_1px,transparent_1px)] bg-[size:64px_64px]" />

        <div className="relative mx-auto max-w-7xl">
          <Link
            href="/ilmiy-tadqiqot"
            className="mb-8 inline-flex items-center gap-2 border border-[#604eff]/20 bg-white px-4 py-2 text-sm font-extrabold text-[#604eff] transition hover:-translate-y-0.5 hover:border-[#604eff]/45"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.back}
          </Link>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
            <header>
              <span className="inline-flex items-center border border-[#604eff]/15 bg-white px-4 py-2 text-xs font-black uppercase tracking-wide text-[#604eff] shadow-sm">
                <Newspaper className="mr-2 h-4 w-4" />
                {pageEyebrow}
              </span>
              <h1 className="mt-5 max-w-4xl text-3xl font-black leading-tight sm:text-4xl lg:text-6xl">
                {pageTitle}
              </h1>
              <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-slate-600">
                {pageDescription}
              </p>
            </header>

            <div className={seminarsOnly ? "ml-auto w-full max-w-[220px]" : "grid grid-cols-3 gap-3"}>
              {seminarsOnly ? (
                <ArchiveStat icon={Presentation} value={seminarCount} label={t.seminarMaterials} />
              ) : defensesOnly ? (
                <>
                  <ArchiveStat icon={GraduationCap} value={defenseCount} label={t.defenseMaterials} />
                  <ArchiveStat icon={Newspaper} value="PhD" label={t.phdDegree} />
                  <ArchiveStat icon={Newspaper} value="DSc" label={t.dscDegree} />
                </>
              ) : (
                <>
                  <ArchiveStat icon={Newspaper} value={archiveItems.length} label={t.all} />
                  <ArchiveStat icon={GraduationCap} value={defenseCount} label={t.defense} />
                  <ArchiveStat icon={Presentation} value={seminarCount} label={t.seminar} />
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-5 border-b border-slate-200 pb-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              {specializedKind ? (
                <h2 className="text-2xl font-black text-slate-950 sm:text-3xl">
                  {seminarsOnly ? t.seminarsSection : t.defensesSection}
                </h2>
              ) : (
                <div className="flex flex-wrap gap-2" role="group" aria-label={pageEyebrow}>
                  {filters.map((filter) => {
                    const active = filter.value === activeFilter;
                    return (
                      <button
                        key={filter.value}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setActiveFilter(filter.value)}
                        className={`inline-flex items-center gap-2 border px-4 py-2.5 text-sm font-extrabold transition ${
                          active
                            ? "border-[#604eff] bg-[#604eff] text-white"
                            : "border-slate-200 bg-white text-slate-700 hover:border-[#604eff]/50 hover:text-[#604eff]"
                        }`}
                      >
                        {filter.label}
                        <span className={`font-mono text-xs ${active ? "text-cyan-100" : "text-slate-400"}`}>
                          {filter.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
              <p className="mt-3 text-sm font-semibold text-slate-500">
                {visibleItems.length}{t.results}
              </p>
            </div>

            <div className="flex max-w-md items-start gap-3 bg-cyan-50 px-4 py-3 text-sm font-semibold leading-6 text-cyan-900">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600" />
              <p>{updateNotice}</p>
            </div>
          </div>

          {visibleItems.length ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {visibleItems.map((item, index) => {
                const title = localizedText(item.title, language);
                const description = localizedText(item.description, language);
                const date = item.displayDate || eventDate(description);
                const isDefense = item.researchKind === "defense";

                return (
                  <article
                    key={item.id}
                    className="group flex min-h-full flex-col overflow-hidden border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#604eff]/35 hover:shadow-xl"
                  >
                    <Link href={newsHref(item)} className="relative block aspect-[16/9] overflow-hidden bg-slate-100">
                      <NewsImage
                        src={newsImage(item)}
                        alt={title}
                        priority={index < 3}
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                      />
                      {!specializedKind ? (
                        <span
                          className={`absolute left-4 top-4 inline-flex items-center gap-2 px-3 py-2 text-xs font-black uppercase tracking-wide text-white shadow-lg ${
                            isDefense ? "bg-[#604eff]" : "bg-cyan-600"
                          }`}
                        >
                          {isDefense ? <GraduationCap className="h-4 w-4" /> : <Presentation className="h-4 w-4" />}
                          {isDefense ? t.defenseCard : t.seminarCard}
                        </span>
                      ) : null}
                    </Link>

                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <div className="mb-3 flex items-center gap-2 text-xs font-bold text-slate-500">
                        <CalendarDays className="h-4 w-4 text-cyan-600" />
                        <span>{date || t.dateInArticle}</span>
                      </div>
                      <h2 className="line-clamp-2 text-xl font-black leading-snug transition group-hover:text-[#604eff]">
                        <Link href={newsHref(item)}>{title}</Link>
                      </h2>
                      {description ? (
                        <p className="mt-3 line-clamp-4 text-sm font-medium leading-6 text-slate-600">
                          {description}
                        </p>
                      ) : null}
                      <Link
                        href={newsHref(item)}
                        className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-black text-[#604eff]"
                      >
                        {t.readMore}
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="border border-dashed border-slate-300 bg-slate-50 p-10 text-center font-semibold text-slate-500">
              {t.empty}
            </div>
          )}

          <div className="mt-10 text-center">
            <Link
              href="/umumiy-malumot/news"
              className="inline-flex items-center justify-center bg-slate-950 px-5 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#604eff]"
            >
              {t.allNews}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function ArchiveStat({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof Newspaper;
  value: number | string;
  label: string;
}) {
  const isTextValue = typeof value === "string";

  return (
    <div className="min-w-0 border border-slate-200 bg-white p-4 text-center shadow-sm sm:p-5">
      <Icon className="mx-auto mb-3 h-5 w-5 text-cyan-600" />
      <p
        className={`font-mono font-black text-[#604eff] ${
          isTextValue ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl"
        }`}
      >
        {value}
      </p>
      <p className="mt-2 text-[10px] font-extrabold uppercase text-slate-500 sm:text-xs">{label}</p>
    </div>
  );
}
