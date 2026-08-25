/** @format */
"use client";

import { Button } from "@/components/ui/button";
import {
  Dissertation,
  GraduateDetailContent,
  allDissertationBase,
  getDissertationBaseBySlug,
} from "@/common/graduates/data";
import {
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  BookOpenText,
  CalendarDays,
  CheckCircle2,
  FileText,
  GraduationCap,
  Lightbulb,
  Rocket,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useLocale } from "@/i18n";

type GraduateDetailProps = {
  slug: string;
  backHref: string;
};

const GraduateDetail = ({ slug, backHref }: GraduateDetailProps) => {
  const { t } = useLocale();
  const dissBase = getDissertationBaseBySlug(slug);

  if (!dissBase) return notFound();

  const getLocalizedDissertation = (
    baseItem: (typeof allDissertationBase)[number],
  ): Dissertation => {
    const index = allDissertationBase.findIndex(
      (item) => item.slug === baseItem.slug,
    );
    const localized = t.graduatesPage.items[index];

    return {
      ...baseItem,
      ...localized,
    };
  };
  const diss = getLocalizedDissertation(dissBase);
  const detailTemplate = t.graduatesPage.detailTemplate;
  const detail: GraduateDetailContent = {
    profile: [
      `${diss.fullName} — ${diss.bio}`,
      `${detailTemplate.topicPrefix}: ${diss.title}. ${detailTemplate.topicDescription}`,
      detailTemplate.detailPurpose,
    ],
    interview: [
      {
        question: detailTemplate.importanceQuestion,
        answer: [
          `${diss.description} ${detailTemplate.importanceAnswer}`,
          detailTemplate.practicalValue,
        ],
      },
      {
        question: detailTemplate.approachQuestion,
        answer: [
          detailTemplate.approachAnswer,
          detailTemplate.approachStrength,
        ],
        points: detailTemplate.points,
      },
    ],
    implementation: detailTemplate.implementation,
    futurePlans: detailTemplate.futurePlans,
  };
  const related = allDissertationBase
    .filter((item) => item.slug !== diss.slug)
    .slice(0, 2)
    .map(getLocalizedDissertation);

  return (
    <section className="bg-linear-to-b from-white via-[#fbfcff] to-white px-4 py-12 sm:px-6 md:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <Button
          asChild
          variant="outline"
          className="mb-8 rounded-lg border-[#604eff]/20 bg-white font-bold text-[#604eff] shadow-sm hover:border-[#604eff]/40 hover:bg-[#604eff]/5">
          <Link href={backHref}>
            <ArrowLeft className="h-4 w-4" />
            {t.graduatesPage.backToList}
          </Link>
        </Button>

        <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <header className="grid lg:grid-cols-[410px_1fr]">
            <div className="relative overflow-hidden border-b border-slate-200 bg-linear-to-br from-[#f8f9ff] via-white to-[#eefcff] p-5 sm:p-7 lg:border-b-0 lg:border-r">
              <div className="mb-5 inline-flex items-center gap-2 rounded-lg border border-[#604eff]/15 bg-white/90 px-3 py-2 font-accent text-xs font-extrabold uppercase text-[#604eff] shadow-sm backdrop-blur">
                <GraduationCap className="h-4 w-4 text-[#08e8ea]" />
                {t.graduatesPage.graduateProfile}
              </div>

              <div className="relative overflow-hidden rounded-lg bg-white p-4 shadow-[0_18px_60px_rgba(15,23,42,0.12)] ring-1 ring-slate-200">
                <div className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-[#604eff] via-[#08e8ea] to-emerald-400" />
                <Image
                  src={diss.imageUrl}
                  alt={diss.fullName}
                  width={560}
                  height={700}
                  className="max-h-[500px] w-full rounded-lg object-contain"
                  priority
                />
              </div>
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-lg border border-[#604eff]/15 bg-[#604eff]/10 px-4 py-2 text-sm font-bold text-[#604eff]">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  <time>{diss.date}</time>
                </span>

                <span className="inline-flex items-center rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">
                  <BadgeCheck className="mr-2 h-4 w-4" />
                  {t.graduatesPage.defended}
                </span>
              </div>

              <span className="mb-3 inline-flex items-center font-accent text-sm font-extrabold uppercase text-[#604eff]">
                <UserRound className="mr-2 h-4 w-4" />
                {t.graduatesPage.dissertationAuthor}
              </span>

              <h1 className="font-heading text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl lg:text-5xl">
                {diss.fullName}
              </h1>

              <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-slate-600">
                {detail.profile[0]}
              </p>

              <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50/80 p-5">
                <div className="mb-3 flex items-center gap-2 font-accent text-xs font-extrabold uppercase text-[#604eff]">
                  <BookOpenText className="h-4 w-4" />
                  {t.graduatesPage.researchTopic}
                </div>
                <p className="text-lg font-bold leading-8 text-slate-950">
                  {diss.title}
                </p>
              </div>
            </div>
          </header>
        </article>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          <main className="space-y-8">
            <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#604eff]/10 text-[#604eff]">
                  <UserRound className="h-5 w-5" />
                </span>
                <h2 className="font-heading text-2xl font-extrabold text-slate-950">
                  {t.graduatesPage.fullAuthorInfo}
                </h2>
              </div>

              <div className="space-y-5 text-base font-medium leading-8 text-slate-600">
                {detail.profile.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section className="space-y-5">
              {detail.interview.map((block, index) => (
                <div
                  key={block.question}
                  className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                  <div className="mb-5 flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#604eff]/10 font-heading text-sm font-extrabold text-[#604eff]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-heading text-2xl font-extrabold leading-tight text-slate-950">
                      {block.question}
                    </h2>
                  </div>

                  <div className="space-y-5 text-base font-medium leading-8 text-slate-600">
                    {block.answer.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  {block.points ? (
                    <div className="mt-6 grid gap-3">
                      {block.points.map((point) => (
                        <div
                          key={point}
                          className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-semibold leading-6 text-slate-700">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#604eff]" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <Lightbulb className="h-5 w-5" />
                </span>
                <h2 className="font-heading text-2xl font-extrabold text-slate-950">
                  {t.graduatesPage.implementation}
                </h2>
              </div>

              <div className="space-y-5 text-base font-medium leading-8 text-slate-600">
                {detail.implementation.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-slate-200 bg-[#080c14] p-6 text-white shadow-[0_24px_80px_rgba(15,23,42,0.12)] sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/10 text-[#08e8ea]">
                  <Rocket className="h-5 w-5" />
                </span>
                <h2 className="font-heading text-2xl font-extrabold">
                  {t.graduatesPage.futurePlans}
                </h2>
              </div>

              <div className="space-y-5 text-base font-medium leading-8 text-white/72">
                {detail.futurePlans.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          </main>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:h-fit">
            <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2 font-accent text-xs font-extrabold uppercase text-[#604eff]">
                <FileText className="h-4 w-4" />
                {t.graduatesPage.quickNavigation}
              </div>
              <div className="space-y-3 text-sm font-semibold leading-6 text-slate-600">
                <p>{t.graduatesPage.author}: {diss.fullName}</p>
                <p>{t.graduatesPage.date}: {diss.date}</p>
                <p>{t.graduatesPage.status}: {t.graduatesPage.defended}</p>
              </div>
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="mb-4 font-heading text-lg font-extrabold text-slate-950">
                {t.graduatesPage.otherGraduates}
              </h2>
              <div className="space-y-3">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`${backHref}/${item.slug}`}
                    className="group block rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:border-[#604eff]/30 hover:bg-white hover:shadow-sm">
                    <span className="text-xs font-bold text-slate-500">
                      {item.date}
                    </span>
                    <h3 className="mt-2 font-heading text-base font-extrabold leading-6 text-slate-950 transition group-hover:text-[#604eff]">
                      {item.fullName}
                    </h3>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-[#604eff]">
                      {t.common.view}
                      <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default GraduateDetail;
