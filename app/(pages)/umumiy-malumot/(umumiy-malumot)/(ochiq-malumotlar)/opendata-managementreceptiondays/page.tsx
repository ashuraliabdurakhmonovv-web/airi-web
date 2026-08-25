/** @format */
"use client";

import { leaderBase, type Leader } from "@/common/recetions-days/data";
import { FC } from "react";
import { useLocale } from "@/i18n";
import { CalendarDays, Mail, Phone } from "lucide-react";
import Image from "next/image";

const LeadershipReceptionDays: FC = () => {
  const { t } = useLocale();
  const leaders: Leader[] = leaderBase.map((leader, index) => ({
    ...leader,
    ...t.receptionDaysPage.leaders[index],
  }));

  return (
    <section className="bg-[#f8fafc] py-12 md:py-16">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center md:mb-12">
          <h1 className="airi-section-title airi-gradient-text mx-auto max-w-4xl text-[30px] uppercase md:text-[38px]">
            {t.receptionDaysPage.title}
          </h1>

          <p className="airi-section-copy mx-auto mt-4 max-w-[700px] text-[15px] text-slate-600 md:text-base">
            {t.receptionDaysPage.description}
          </p>
        </div>

        <div className="grid items-stretch gap-6 min-[700px]:grid-cols-2 xl:grid-cols-3">
          {leaders.map((leader) => (
            <article
              key={leader.email}
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_10px_24px_rgba(15,23,42,0.08)]">
              <div className="h-1 bg-blue-600" />

              <div className="flex grow flex-col p-3">
                <div className="relative aspect-[4/4.6] overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                  <Image
                    src={leader.imageUrl}
                    alt={`${leader.name}, ${leader.position}`}
                    fill
                    sizes="(max-width: 699px) 100vw, (max-width: 1279px) 50vw, 33vw"
                    className="object-cover object-top transition duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>

                <div className="flex grow flex-col px-2 pb-2 pt-5">
                  <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                    {t.receptionDaysPage.management}
                  </div>

                  <div>
                    <h3 className="font-heading text-[19px] font-semibold leading-7 text-slate-950">
                      {leader.name}
                    </h3>

                    <p className="mt-1 text-sm font-semibold leading-5 text-blue-700">
                      {leader.position}
                    </p>
                  </div>

                  <p className="mt-4 min-h-[72px] text-[14px] leading-6 text-slate-600">
                    {leader.description}
                  </p>

                  <div className="mt-5 rounded-lg border border-slate-200 bg-[#f8fafc] p-3.5">
                    <div className="flex items-center gap-3">
                      <CalendarDays className="h-5 w-5 shrink-0 text-blue-600" />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{t.receptionDaysPage.receptionDay}</p>
                        <p className="mt-0.5 text-sm font-semibold text-slate-900">
                          {leader.receptionDay} <span className="font-normal text-slate-400">·</span> {leader.receptionTime}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 grid gap-2">
                      <a
                        href={`tel:${leader.phone.replace(/\s/g, "")}`}
                        className="flex min-h-11 items-center gap-3 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 transition hover:border-blue-200 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                        <Phone className="h-4 w-4 shrink-0 text-blue-600" />
                        <span>{leader.phone}</span>
                      </a>

                      <a
                        href={`mailto:${leader.email}`}
                        className="flex min-h-11 min-w-0 items-center gap-3 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 transition hover:border-blue-200 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                        <Mail className="h-4 w-4 shrink-0 text-blue-600" />
                        <span className="min-w-0 break-all">{leader.email}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipReceptionDays;
