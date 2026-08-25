/** @format */
"use client";

import { useLocale } from "@/i18n";
import {
  ArrowDownRight,
  BadgeCheck,
  CalendarDays,
  Flag,
  Music2,
  Shield,
  Sparkles,
  Star,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { FC } from "react";

type SymbolCard = {
  title: string;
  label: string;
  date: string;
  description: string;
  href: string;
  icon: LucideIcon;
  tone: string;
  iconStyle: string;
};

const flagColorClasses = [
  "bg-[#1e90d6]",
  "bg-white",
  "bg-[#1fb35b]",
  "bg-[#d9232e]",
];

const StateSymbols: FC = () => {
  const { t } = useLocale();
  const {
    anthemFacts,
    anthemVerses,
    emblemColors,
    emblemParagraphs,
    flagParagraphs,
  } = t.stateSymbolsPage;

  const symbolCards: SymbolCard[] = [
    {
      title: t.stateSymbolsPage.emblemTitle,
      label: t.stateSymbolsPage.emblemLabel,
      date: t.stateSymbolsPage.emblemDate,
      description: t.stateSymbolsPage.emblemCardDescription,
      href: "#emblem",
      icon: Shield,
      tone: "from-[#604eff] via-[#08e8ea] to-emerald-400",
      iconStyle: "bg-[#604eff]/10 text-[#604eff]",
    },
    {
      title: t.stateSymbolsPage.flagTitle,
      label: t.stateSymbolsPage.flagLabel,
      date: t.stateSymbolsPage.flagDate,
      description: t.stateSymbolsPage.flagCardDescription,
      href: "#flag",
      icon: Flag,
      tone: "from-[#1e90d6] via-white to-[#1fb35b]",
      iconStyle: "bg-[#08e8ea]/15 text-[#087f83]",
    },
    {
      title: t.stateSymbolsPage.anthemTitle,
      label: t.stateSymbolsPage.anthemLabel,
      date: t.stateSymbolsPage.anthemDate,
      description: t.stateSymbolsPage.anthemCardDescription,
      href: "#anthem",
      icon: Music2,
      tone: "from-[#f6c744] via-[#604eff] to-[#08e8ea]",
      iconStyle: "bg-[#f6c744]/20 text-[#9a6a00]",
    },
  ];

  return (
    <main className="bg-linear-to-b from-white via-[#fbfcff] to-white">
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-16 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.64fr_0.36fr] lg:items-center">
          <div>
            <h1 className="airi-section-title airi-gradient-text mt-5 max-w-4xl uppercase">
              {t.stateSymbolsPage.title}
            </h1>
            <p className="airi-section-copy mt-5 max-w-3xl text-slate-600">
              {t.stateSymbolsPage.description}
            </p>
          </div>

          <div className="rounded-lg border border-[#604eff]/15 bg-white p-5 shadow-[0_16px_50px_rgba(96,78,255,0.09)]">
            <div className="flex items-center gap-3">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-white">
                <Sparkles className="h-6 w-6" />
              </span>
              <div>
                <p className="font-accent text-sm font-bold uppercase text-slate-500">
                  {t.stateSymbolsPage.symbols}
                </p>
                <p className="font-heading text-3xl font-extrabold text-slate-950">
                  {t.stateSymbolsPage.mainSymbolsCount}
                </p>
              </div>
            </div>
            <div className="mt-5 overflow-hidden rounded-lg border border-slate-200 bg-white">
              <span className="block h-4 bg-[#1e90d6]" />
              <span className="block h-4 border-y border-[#d9232e] bg-white" />
              <span className="block h-4 bg-[#1fb35b]" />
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2 text-center font-accent text-xs font-extrabold uppercase text-slate-500">
              <span>{t.stateSymbolsPage.emblemLabel}</span>
              <span>{t.stateSymbolsPage.flagLabel}</span>
              <span>{t.stateSymbolsPage.anthemLabel}</span>
            </div>
          </div>
        </div>

        <nav
          className="mt-8 grid gap-4 md:grid-cols-3"
          aria-label={t.stateSymbolsPage.navigationAria}>
          {symbolCards.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.href}
                href={item.href}
                className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white p-5 shadow-[0_16px_50px_rgba(15,23,42,0.07)] transition duration-300 hover:-translate-y-1 hover:border-[#604eff]/30 hover:shadow-[0_24px_70px_rgba(96,78,255,0.14)]">
                <span
                  className={`absolute inset-x-0 top-0 h-1.5 bg-linear-to-r ${item.tone}`}
                />
                <div className="flex items-start justify-between gap-4">
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${item.iconStyle}`}>
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold uppercase text-slate-500">
                    {item.label}
                  </span>
                </div>
                <h2 className="mt-5 font-heading text-xl font-extrabold leading-snug text-slate-950">
                  {item.title}
                </h2>
                <p className="mt-3 min-h-16 text-sm font-medium leading-6 text-slate-600">
                  {item.description}
                </p>
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                  <span className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <CalendarDays className="h-4 w-4 text-[#604eff]" />
                    {item.date}
                  </span>
                  <ArrowDownRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:text-[#604eff]" />
                </div>
              </a>
            );
          })}
        </nav>
      </section>

      <section id="emblem">
        <div className="mx-auto grid max-w-7xl gap-8 border-t border-slate-200 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-[0.42fr_0.58fr] lg:px-8">
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_16px_50px_rgba(15,23,42,0.07)]">
              <div className="aspect-square overflow-hidden rounded-lg bg-slate-50 p-6 ring-1 ring-slate-100">
                <Image
                  src="https://buxdu.uz/media/article/images/gerb.png"
                  alt={t.stateSymbolsPage.emblemImageAlt}
                  width={640}
                  height={640}
                  className="h-full w-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="mt-5 flex items-center gap-3 rounded-lg border border-[#604eff]/15 bg-[#604eff]/5 p-4">
                <BadgeCheck className="h-5 w-5 text-[#604eff]" />
                <p className="text-sm font-bold text-slate-700">
                  {t.stateSymbolsPage.emblemApproved}
                </p>
              </div>
            </div>
          </div>

          <article>
            <SectionHeading
              eyebrow={t.stateSymbolsPage.emblemLabel}
              icon={Shield}
              title={t.stateSymbolsPage.emblemTitle}
            />
            <div className="mt-6 space-y-5 text-base font-medium leading-8 text-slate-600">
              {emblemParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {emblemColors.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                  <Star className="mt-1 h-4 w-4 shrink-0 fill-[#f6c744] text-[#c99700]" />
                  <span className="text-sm font-semibold leading-6 text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section id="flag">
        <div className="mx-auto grid max-w-7xl gap-8 border-t border-slate-200 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-[0.58fr_0.42fr] lg:px-8">
          <article>
            <SectionHeading
              eyebrow={t.stateSymbolsPage.flagLabel}
              icon={Flag}
              title={t.stateSymbolsPage.flagTitle}
            />
            <div className="mt-6 space-y-5 text-base font-medium leading-8 text-slate-600">
              {flagParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <p className="font-accent text-sm font-bold uppercase text-slate-500">
                {t.stateSymbolsPage.flagColorsTitle}
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-4">
                {t.stateSymbolsPage.flagColors.map((color, index) => (
                  <div
                    key={color}
                    className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <span
                      className={`block h-8 rounded-lg border border-slate-200 ${flagColorClasses[index]}`}
                    />
                    <span className="mt-2 block text-sm font-bold text-slate-700">
                      {color}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <div className="lg:order-last">
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_16px_50px_rgba(15,23,42,0.07)]">
              <div className="bg-white p-4">
                <Image
                  src="https://www.samdu.uz/upload/cover-images/61312fa1aa6ce-61312fa1aa6d0-61312fa1aa6d1-61312fa1aa6d2.jpg"
                  alt={t.stateSymbolsPage.flagImageAlt}
                  width={1200}
                  height={750}
                  className="aspect-[16/10] w-full rounded-lg object-contain"
                  loading="lazy"
                />
              </div>
              <div className="grid grid-cols-[1fr_auto_1fr] items-center border-t border-slate-100">
                <span className="h-2 bg-[#1e90d6]" />
                <span className="h-2 w-10 bg-[#d9232e]" />
                <span className="h-2 bg-[#1fb35b]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="anthem">
        <div className="mx-auto max-w-7xl border-t border-slate-200 px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr]">
            <div>
              <SectionHeading
                eyebrow={t.stateSymbolsPage.anthemLabel}
                icon={Music2}
                title={t.stateSymbolsPage.anthemTitle}
              />

              <div className="mt-6 space-y-5 text-base font-medium leading-8 text-slate-600">
                {anthemFacts.map((fact) => (
                  <p key={fact}>{fact}</p>
                ))}
              </div>

              <div className="mt-8 rounded-lg bg-[#080c14] p-6 text-white shadow-[0_18px_50px_rgb(8_12_20/.18)]">
                <p className="font-accent text-sm font-bold uppercase text-[#08e8ea]">
                  {t.stateSymbolsPage.authors}
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-white/60">
                      {t.stateSymbolsPage.music}
                    </p>
                    <p className="mt-1 font-heading text-lg font-extrabold">
                      {t.stateSymbolsPage.musicAuthor}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-white/60">
                      {t.stateSymbolsPage.words}
                    </p>
                    <p className="mt-1 font-heading text-lg font-extrabold">
                      {t.stateSymbolsPage.wordsAuthor}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Uzbek_Anthem_Music_Sheet.InstrumentalSimple.svg/1280px-Uzbek_Anthem_Music_Sheet.InstrumentalSimple.svg.png"
                  alt={t.stateSymbolsPage.anthemSheetAlt}
                  width={1280}
                  height={960}
                  className="aspect-[4/3] w-full object-contain"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="rounded-lg border border-[#604eff]/15 bg-white p-5 shadow-[0_16px_50px_rgba(96,78,255,0.09)] md:p-7">
              <div className="mb-6 flex items-center gap-3 border-b border-slate-200 pb-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#604eff]/10 text-[#604eff]">
                  <Music2 className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-accent text-sm font-bold uppercase text-slate-500">
                    {t.stateSymbolsPage.text}
                  </p>
                  <h2 className="font-heading text-xl font-extrabold text-slate-950">
                    {t.stateSymbolsPage.anthemTitle}
                  </h2>
                </div>
              </div>

              <div className="space-y-6 text-center text-base font-semibold leading-8 text-slate-800 md:text-lg md:leading-9">
                <AnthemVerse lines={anthemVerses[0]} />
                <ChorusLabel label={t.stateSymbolsPage.chorus} />
                <AnthemVerse lines={anthemVerses[1]} />
                <AnthemVerse lines={anthemVerses[2]} />
                <ChorusLabel label={t.stateSymbolsPage.chorus} />
                <AnthemVerse lines={anthemVerses[3]} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

function SectionHeading({
  eyebrow,
  icon: Icon,
  title,
}: {
  eyebrow: string;
  icon: LucideIcon;
  title: string;
}) {
  return (
    <div>
      <span className="inline-flex items-center gap-2 rounded-lg bg-[#604eff]/10 px-3 py-1.5 font-accent text-xs font-extrabold uppercase text-[#604eff]">
        <Icon className="h-4 w-4" />
        {eyebrow}
      </span>
      <h2 className="mt-4 font-heading text-3xl font-extrabold leading-tight text-slate-950 md:text-4xl">
        {title}
      </h2>
      <div className="airi-gradient mt-5 h-1 w-24 rounded-full" />
    </div>
  );
}

function ChorusLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px flex-1 bg-[#604eff]/20" />
      <span className="rounded-lg bg-[#604eff]/10 px-4 py-2 font-accent text-sm font-extrabold uppercase text-[#604eff]">
        {label}
      </span>
      <span className="h-px flex-1 bg-[#604eff]/20" />
    </div>
  );
}

function AnthemVerse({ lines }: { lines: readonly string[] }) {
  return (
    <p>
      {lines.map((line) => (
        <span key={line}>
          {line}
          <br />
        </span>
      ))}
    </p>
  );
}

export default StateSymbols;
