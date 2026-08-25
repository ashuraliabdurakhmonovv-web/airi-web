"use client";

import Image from "next/image";
import { Award, CalendarDays, GraduationCap } from "lucide-react";
import Logos from "@/public/airi-logo_uz.png";
import DomlaImg from "../../image/Domla.png";
import DomlaBuild from "../../image/domlabuild.png";
import { useLocale } from "@/i18n";

const highlights = [
  {
    icon: GraduationCap,
    key: "degree",
  },
  {
    icon: CalendarDays,
    key: "experience",
  },
  {
    icon: Award,
    key: "role",
  },
] as const;

export default function ProfessorHighlight() {
  const { t } = useLocale();

  return (
    <section className="px-4 py-14 sm:px-6 lg:flex lg:min-h-screen lg:items-center lg:px-0">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mx-auto mb-8 flex max-w-3xl flex-col items-center justify-center gap-4 text-center">
          <h2 className="airi-gradient-text airi-section-title font-semibold">
            {t.generalLanding.professorTitle}
          </h2>
          <p className="airi-section-copy mt-1 text-neutral-600">
            {t.generalLanding.professorDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-5 lg:min-h-140 lg:grid-cols-[0.95fr_1.05fr_1.1fr]">
          <div className="grid gap-4 lg:grid-rows-[1fr_124px]">
            <div className="relative min-h-72 overflow-hidden bg-gray-100 shadow-sm lg:min-h-0">
              <Image
                src={DomlaBuild}
                alt={t.generalLanding.professorBuildingAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
                priority
              />
            </div>

            <div className="airi-ring flex min-h-28 flex-col justify-center items-start border bg-white px-5">
              <Image
                src={Logos}
                alt={t.hero.instituteFullName}
                className="mb-2 h-12 w-auto object-contain"
              />

              <p className="text-base font-medium leading-tight sm:text-[17px]">
                {t.generalLanding.professorSince}
              </p>
            </div>
          </div>

          <div className="relative min-h-105 overflow-hidden bg-gray-100 shadow-sm lg:min-h-0">
            <Image
              src={DomlaImg}
              alt={t.generalLanding.professorImageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover object-center"
              priority
            />
          </div>

          <div className="grid gap-4 lg:grid-rows-[1fr_124px]">
            <article className="airi-ring flex border bg-white px-5 py-6 sm:px-6 lg:items-center">
              <div>
                <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  {highlights.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.key}
                        className="bg-[#f5f7ff] px-3 py-3 text-center">
                        <Icon className="mx-auto mb-2 h-5 w-5 text-[#604eff]" />
                        <p className="text-[12px] font-semibold uppercase leading-tight text-neutral-500">
                          {t.generalLanding.professorHighlights[item.key].label}
                        </p>
                        <p className="mt-1 text-[14px] font-bold leading-tight text-neutral-950">
                          {t.generalLanding.professorHighlights[item.key].value}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <p className="text-[15px] font-medium leading-[1.65] text-neutral-950 sm:text-base text-justify">
                  {t.generalLanding.professorBio}
                </p>
              </div>
            </article>

            <div className="airi-gradient flex min-h-28 flex-col justify-center px-5 text-white shadow-sm sm:px-6">
              <h3 className="text-[22px] font-bold leading-tight sm:text-[24px]">
                {t.generalLanding.professorName}
              </h3>

              <p className="mt-2 text-[15px] leading-tight text-white/85">
                {t.generalLanding.professorPosition}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
