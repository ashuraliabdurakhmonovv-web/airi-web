/** @format */
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  FileCheck2,
  Handshake,
  Layers3,
} from "lucide-react";
import { useLocale } from "@/i18n";
import { partnerLogos } from "../../components/partners-data";
import LogosDigital from "@/public/institute_logos/projects design.png";
import LogosDigital1 from "@/public/institute_logos/projects design1.png";
import LogosDigital2 from "@/public/institute_logos/projects design3.png";
import LogosDigital3 from "@/public/institute_logos/projects design4.png";
import Aboutinstitute from "@/public/aboutinstitute.png";

export default function AboutInstitute() {
  const { t } = useLocale();

  const tasks = [
    {
      title: t.aboutPage.strategyTitle,
      text: t.aboutPage.task1,
      image: LogosDigital,
      accent: "border-cyan-200 bg-cyan-50/70 text-cyan-700",
      line: "from-cyan-400 to-[#604eff]",
      chip: t.aboutPage.strategyChip,
    },
    {
      title: t.aboutPage.aiTitle,
      text: t.aboutPage.task2,
      image: LogosDigital1,
      accent: "border-violet-200 bg-violet-50/70 text-violet-700",
      line: "from-[#604eff] to-fuchsia-400",
      chip: t.aboutPage.aiChip,
    },
    {
      title: t.aboutPage.researchTitle,
      text: t.aboutPage.task3,
      image: LogosDigital2,
      accent: "border-emerald-200 bg-emerald-50/70 text-emerald-700",
      line: "from-emerald-400 to-cyan-400",
      chip: t.aboutPage.researchChip,
    },
    {
      title: t.aboutPage.cooperationTitle,
      text: t.aboutPage.task4,
      image: LogosDigital3,
      accent: "border-amber-200 bg-amber-50/70 text-amber-700",
      line: "from-amber-300 to-[#604eff]",
      chip: t.aboutPage.cooperationChip,
    },
  ];
  const documents = [
    {
      date: "17.02.2021",
      label: "PQ-4996",
      text: t.aboutPage.document1,
      image:
        "https://server.airi.uz/public_media/img/7128e299-2449-4dc3-b2b1-20c66fd3341e.webp",
    },
    {
      date: "31.07.2021",
      label: t.aboutPage.document2Label,
      text: t.aboutPage.document2,
      image:
        "https://server.airi.uz/public_media/img/7128e299-2449-4dc3-b2b1-20c66fd3341e.webp",
    },
    {
      date: "25.03.2022",
      label: t.aboutPage.document3Label,
      text: t.aboutPage.document3,
      image:
        "https://server.airi.uz/public_media/img/04db4d8f-b2db-4653-ab55-ba85a1561b77.webp",
    },
  ];

  return (
    <main>
      <section className=" py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="group relative min-h-120 overflow-hidden rounded-4xl  sm:min-h-125 lg:min-h-135">
            <Image
              src={Aboutinstitute}
              alt={t.aboutPage.heroImageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

            <div className="relative z-10 flex min-h-[430px] max-w-4xl flex-col justify-end px-6 pb-8 sm:min-h-[500px] sm:px-10 sm:pb-12 lg:min-h-[540px] lg:px-12 lg:pb-14">
              <h1 className="max-w-4xl text-3xl font-heading font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
                {t.aboutPage.heroTitle}
              </h1>

              <p className="mt-5 max-w-2xl text-base font-regular leading-7 text-white/85 sm:text-lg">
                {t.aboutPage.heroDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="main-tasks"
        className="relative overflow-hidden  px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="absolute left-[-120px] top-20 h-72 w-72 rounded-full bg-[#604eff]/10 blur-3xl" />
        <div className="absolute bottom-10 right-[-120px] h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl border-t-2 border-gray-200 pt-10">
          <div className="mb-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <span className="text-sm font-bold uppercase tracking-wider text-[#604eff]">
                {t.aboutPage.directionsEyebrow}
              </span>

              <h2 className="airi-gradient-text airi-section-title mt-2">
                {t.aboutPage.mainTasks}
              </h2>
            </div>

            <p className="max-w-3xl text-base font-medium leading-8 text-gray-600 lg:justify-self-end">
              {t.aboutPage.mainTasksDescription}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {tasks.map((task, index) => (
              <article
                key={task.title}
                className="group relative min-h-[320px] overflow-hidden rounded-[28px] border border-gray-200 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-2 hover:border-[#604eff]/35 hover:shadow-[0_24px_80px_rgba(96,78,255,0.16)]">
                <div
                  className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${task.line}`}
                />

                <div className="absolute right-5 top-5 text-6xl font-black leading-none text-gray-100 transition duration-300 group-hover:text-[#604eff]/10">
                  0{index + 1}
                </div>

                <div className="relative z-10">
                  <div className="mb-7 flex items-center justify-between">
                    <div
                      className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border ${task.accent} shadow-sm transition duration-300 group-hover:scale-105`}>
                      <Image
                        src={task.image}
                        alt={task.title}
                        className="h-11 w-11 object-contain transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>

                    <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-extrabold text-gray-600 transition duration-300 group-hover:border-[#604eff]/20 group-hover:bg-[#604eff]/10 group-hover:text-[#604eff]">
                      {task.chip}
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold leading-tight text-gray-950">
                    {task.title}
                  </h3>

                  <p className="mt-4 text-[15px] font-medium leading-7 text-gray-600">
                    {task.text}
                  </p>

                  <div className="mt-7 flex items-center gap-2 text-sm font-extrabold text-[#604eff] opacity-0 transition duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                    {t.common.details}
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-[#604eff]/5 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className=" py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-sm font-bold uppercase tracking-wider text-[#604eff]">
                {t.aboutPage.legalBasis}
              </span>
              <h2 className="airi-gradient-text airi-section-title mt-2">
                {t.aboutPage.organizationalDocs}
              </h2>
            </div>
            <p className="max-w-3xl text-base font-medium leading-8 text-gray-600 lg:justify-self-end">
              {t.aboutPage.organizationalDocsDescription}
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {documents.map((document) => (
              <article
                key={document.label}
                className="relative overflow-hidden rounded-2xl border border-gray-200 bg-[#fbfcff] p-6">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div className="rounded-2xl border border-[#604eff]/15 bg-white p-4">
                    <Image
                      src={document.image}
                      alt={document.label}
                      width={76}
                      height={76}
                      className="h-16 w-16 object-contain"
                    />
                  </div>
                  <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                    <BadgeCheck className="mr-1.5 h-3.5 w-3.5" />
                    {t.aboutPage.approved}
                  </span>
                </div>

                <div className="mb-4 flex items-center gap-3 text-sm font-semibold text-gray-500">
                  <CalendarDays className="h-4 w-4 text-[#604eff]" />
                  {document.date}
                </div>
                <h3 className="text-2xl font-extrabold text-gray-950">
                  {document.label}
                </h3>
                <p className="mt-4 text-base leading-7 text-gray-600">
                  {document.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="partners"
        className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-[#604eff]">
              {t.aboutPage.ecosystem}
            </span>
            <h2 className="airi-gradient-text airi-section-title mt-2">
              {t.generalLanding.partnersTitle}
            </h2>
          </div>
          <p className="max-w-3xl text-base font-medium leading-8 text-gray-600 lg:justify-self-end">
            {t.generalLanding.partnersDescription}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {partnerLogos.map((partner) => {
            const partnerName =
              t.generalLanding.partnerLogoNames[partner.nameKey];

            return (
              <Link
                key={partner.nameKey}
                href={partner.href}
                target="_blank"
                rel="noreferrer"
                className="airi-ring group flex h-28 items-center justify-center rounded-2xl border bg-white px-5 transition duration-300 hover:-translate-y-1 hover:border-[#604eff] hover:shadow-lg hover:shadow-[#604eff]/10 sm:h-32 sm:px-6"
                title={partnerName}
                aria-label={partnerName}>
                <Image
                  src={partner.logo}
                  alt={partnerName}
                  className="max-h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105 sm:max-h-20"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                />
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
