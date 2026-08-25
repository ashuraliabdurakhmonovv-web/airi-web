/** @format */

"use client";

import Link from "next/link";
import {
  Archive,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ClipboardList,
  FileCheck2,
  Megaphone,
  Sparkles,
} from "lucide-react";
import { NewsImage } from "@/components/news/news-image";
import { useLocale } from "@/i18n";
import { localizedText, newsHref, newsImage } from "@/lib/news";
import type { ResearchNewsItem } from "@/lib/news/research-news";

const UI = {
  uz: {
    back: "Ilmiy tadqiqot sahifasiga qaytish",
    eyebrow: "Rasmiy ilmiy e'lonlar",
    title: "E'lonlar",
    description:
      "Qabul, imtihon, grant, tanlov, hujjat topshirish va ro'yxatdan o'tishga oid, foydalanuvchidan amal talab qiladigan xabarlar shu yerda jamlanadi.",
    current: "Amaldagi e'lonlar",
    archive: "E'lonlar arxivi",
    currentShort: "Amaldagi",
    archiveShort: "Arxiv",
    total: "Jami",
    material: "ta e'lon",
    automatic: "Yangi mos e'lon yangiliklarda chop etilishi bilan bu sahifaga avtomatik qo'shiladi.",
    whatGoesHere: "Bu bo'limda nimalar beriladi?",
    types: ["Qabul va imtihonlar", "Grant va tanlovlar", "Hujjat topshirish va ro'yxatdan o'tish"],
    readMore: "E'lonni ko'rish",
    allNews: "Barcha yangiliklarni ko'rish",
    dateInArticle: "Muhim sanalar e'lon ichida",
    emptyCurrent: "Hozircha amaldagi e'lon yo'q.",
    emptyArchive: "E'lonlar arxivi hozircha bo'sh.",
  },
  ru: {
    back: "Вернуться к разделу исследований",
    eyebrow: "Официальные научные объявления",
    title: "Объявления",
    description:
      "Здесь собраны сообщения о приёме, экзаменах, грантах, конкурсах, подаче документов и регистрации, требующие действий от пользователя.",
    current: "Актуальные объявления",
    archive: "Архив объявлений",
    currentShort: "Актуально",
    archiveShort: "Архив",
    total: "Всего",
    material: " объявления",
    automatic: "Новая подходящая публикация автоматически появится на этой странице.",
    whatGoesHere: "Что публикуется в этом разделе?",
    types: ["Приём и экзамены", "Гранты и конкурсы", "Подача документов и регистрация"],
    readMore: "Открыть объявление",
    allNews: "Смотреть все новости",
    dateInArticle: "Важные даты указаны в объявлении",
    emptyCurrent: "Актуальных объявлений пока нет.",
    emptyArchive: "Архив объявлений пока пуст.",
  },
  en: {
    back: "Back to research",
    eyebrow: "Official research announcements",
    title: "Announcements",
    description:
      "Actionable notices about admissions, examinations, grants, competitions, document submission, and registration are collected here.",
    current: "Current announcements",
    archive: "Announcement archive",
    currentShort: "Current",
    archiveShort: "Archive",
    total: "Total",
    material: " announcements",
    automatic: "New matching news posts are added to this page automatically.",
    whatGoesHere: "What is published here?",
    types: ["Admissions and exams", "Grants and competitions", "Documents and registration"],
    readMore: "View announcement",
    allNews: "View all news",
    dateInArticle: "Important dates in announcement",
    emptyCurrent: "There are no current announcements yet.",
    emptyArchive: "The announcement archive is empty.",
  },
} as const;

function isArchived(item: ResearchNewsItem, locale: string, currentYear: number) {
  const text = `${localizedText(item.title, locale)} ${localizedText(item.description, locale)}`;
  const years = text.match(/\b20\d{2}\b/g)?.map(Number) || [];
  return years.length > 0 && Math.max(...years) < currentYear;
}

function announcementDate(item: ResearchNewsItem, description: string) {
  if (item.displayDate) return item.displayDate;
  return description.match(/\b\d{1,2}\.\d{1,2}\.20\d{2}(?:-yil)?\b/u)?.[0] || "";
}

export function ResearchAnnouncements({
  items,
  currentYear,
}: {
  items: ResearchNewsItem[];
  currentYear: number;
}) {
  const { locale } = useLocale();
  const language = locale === "ru" || locale === "en" ? locale : "uz";
  const t = UI[language];
  const currentItems = items.filter((item) => !isArchived(item, language, currentYear));
  const archivedItems = items.filter((item) => isArchived(item, language, currentYear));

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
                <Megaphone className="mr-2 h-4 w-4" />
                {t.eyebrow}
              </span>
              <h1 className="mt-5 text-4xl font-black leading-tight sm:text-5xl lg:text-7xl">{t.title}</h1>
              <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-slate-600">{t.description}</p>
            </header>

            <div className="grid grid-cols-3 gap-3">
              <AnnouncementStat icon={Megaphone} value={items.length} label={t.total} />
              <AnnouncementStat icon={FileCheck2} value={currentItems.length} label={t.currentShort} />
              <AnnouncementStat icon={Archive} value={archivedItems.length} label={t.archiveShort} />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-5 lg:grid-cols-[1fr_1.2fr]">
            <div className="flex items-start gap-3 bg-cyan-50 p-5 text-sm font-semibold leading-6 text-cyan-950">
              <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-cyan-600" />
              <p>{t.automatic}</p>
            </div>
            <div className="border border-slate-200 bg-white p-5">
              <h2 className="flex items-center gap-2 text-sm font-black text-slate-950">
                <ClipboardList className="h-5 w-5 text-[#604eff]" />
                {t.whatGoesHere}
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {t.types.map((type) => (
                  <span key={type} className="border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-600">
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <AnnouncementSection
            title={t.current}
            empty={t.emptyCurrent}
            items={currentItems}
            archived={false}
            language={language}
            labels={t}
          />

          {archivedItems.length ? (
            <div className="mt-14 border-t border-slate-200 pt-12">
              <AnnouncementSection
                title={t.archive}
                empty={t.emptyArchive}
                items={archivedItems}
                archived
                language={language}
                labels={t}
              />
            </div>
          ) : null}

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

function AnnouncementSection({
  title,
  empty,
  items,
  archived,
  language,
  labels,
}: {
  title: string;
  empty: string;
  items: ResearchNewsItem[];
  archived: boolean;
  language: "uz" | "ru" | "en";
  labels: (typeof UI)["uz"] | (typeof UI)["ru"] | (typeof UI)["en"];
}) {
  return (
    <section>
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2 className="text-2xl font-black sm:text-3xl">{title}</h2>
        <p className="font-mono text-sm font-bold text-slate-400">{items.length}{labels.material}</p>
      </div>

      {items.length ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => {
            const itemTitle = localizedText(item.title, language);
            const description = localizedText(item.description, language);
            const date = announcementDate(item, description);
            return (
              <article key={item.id} className="group flex min-h-full flex-col overflow-hidden border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-[#604eff]/35 hover:shadow-xl">
                <Link href={newsHref(item)} className="relative block aspect-[16/9] overflow-hidden bg-slate-100">
                  <NewsImage
                    src={newsImage(item)}
                    alt={itemTitle}
                    priority={!archived && index < 2}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                  <span className={`absolute left-4 top-4 inline-flex items-center gap-2 px-3 py-2 text-xs font-black uppercase tracking-wide text-white shadow-lg ${archived ? "bg-slate-700" : "bg-[#604eff]"}`}>
                    {archived ? <Archive className="h-4 w-4" /> : <Megaphone className="h-4 w-4" />}
                    {archived ? labels.archiveShort : labels.currentShort}
                  </span>
                </Link>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="mb-3 flex items-center gap-2 text-xs font-bold text-slate-500">
                    <CalendarDays className="h-4 w-4 text-cyan-600" />
                    <span>{date || labels.dateInArticle}</span>
                  </div>
                  <h3 className="line-clamp-3 text-xl font-black leading-snug transition group-hover:text-[#604eff]">
                    <Link href={newsHref(item)}>{itemTitle}</Link>
                  </h3>
                  {description ? <p className="mt-3 line-clamp-4 text-sm font-medium leading-6 text-slate-600">{description}</p> : null}
                  <Link href={newsHref(item)} className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-black text-[#604eff]">
                    {labels.readMore}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="border border-dashed border-slate-300 bg-slate-50 p-10 text-center font-semibold text-slate-500">{empty}</div>
      )}
    </section>
  );
}

function AnnouncementStat({ icon: Icon, value, label }: { icon: typeof Megaphone; value: number; label: string }) {
  return (
    <div className="border border-slate-200 bg-white p-4 text-center shadow-sm sm:p-5">
      <Icon className="mx-auto mb-3 h-5 w-5 text-cyan-600" />
      <p className="font-mono text-2xl font-black text-[#604eff] sm:text-3xl">{value}</p>
      <p className="mt-2 text-[10px] font-extrabold uppercase text-slate-500 sm:text-xs">{label}</p>
    </div>
  );
}
