"use client";

import { Brain, GraduationCap, Handshake, Lightbulb } from "lucide-react";
import { useLocale } from "@/i18n";

const activities = [
  {
    icon: Brain,
    key: "aiResearch",
  },
  {
    icon: Lightbulb,
    key: "innovation",
  },
  {
    icon: GraduationCap,
    key: "education",
  },
  {
    icon: Handshake,
    key: "collaboration",
  },
] as const;

export default function Activities() {
  const { t } = useLocale();

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-0">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="airi-gradient-text airi-section-title font-semibold">
            {t.generalLanding.activitiesTitle}
          </h2>
          <p className="airi-section-copy mt-3">
            {t.generalLanding.activitiesDescription}
          </p>
        </div>
      </div>

      <div className="bg-[#080c14] grid gap-4 p-4 text-white shadow-xl shadow-[#604eff]/20 sm:p-5 lg:h-120 lg:grid-cols-4 lg:p-6">
        {activities.map((activity, index) => {
          const Icon = activity.icon;

          return (
            <article
              key={activity.key}
              className="flex h-full flex-col px-3 py-4 transition-colors hover:bg-white/10 sm:px-4 lg:py-5">
              <div className="mb-4 flex items-center gap-2 rounded-full bg-white/15 p-1 pr-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/30 text-sm font-bold text-white">
                  {index + 1}
                </span>

                <div className="flex min-w-0 items-center gap-2">
                  <Icon className="h-4 w-4 shrink-0 text-white/90" />
                  <h3 className="truncate text-[17px] font-bold leading-tight">
                    {t.generalLanding.activities[activity.key].title}
                  </h3>
                </div>
              </div>

              <p className="text-[14px] font-medium leading-[1.5] text-white/90">
                {t.generalLanding.activities[activity.key].description}
              </p>

              <ul className="mt-5 space-y-3 text-[13px] font-medium leading-snug text-white/90">
                {t.generalLanding.activities[activity.key].details.map((detail) => (
                  <li key={detail} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/70" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}
