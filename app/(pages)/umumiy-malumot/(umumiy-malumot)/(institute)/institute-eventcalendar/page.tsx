/** @format */
"use client";

import React from "react";
import { ArrowUpRight, CalendarDays, Clock3, MapPin } from "lucide-react";
import { useLocale } from "@/i18n";

const InstituteEvent = () => {
  const { t } = useLocale();

  const events = [
    {
      day: "24",
      month: "Yan",
      title: t.eventCalendarPage.aiConference,
      location: t.eventCalendarPage.mainBuilding4thFloor,
      time: "10:00 - 13:00",
      type: t.eventCalendarPage.conference,
      status: t.eventCalendarPage.soon,
    },
    {
      day: "31",
      month: "Yan",
      title: t.eventCalendarPage.scientificSeminar,
      location: t.eventCalendarPage.conferenceHall,
      time: "14:00 - 16:00",
      type: t.eventCalendarPage.seminar,
      status: t.eventCalendarPage.planned,
    },
    {
      day: "07",
      month: "Fev",
      title: t.eventCalendarPage.aiProjectsPresentation,
      location: t.eventCalendarPage.mainBuilding2ndFloor,
      time: "11:00 - 12:30",
      type: t.eventCalendarPage.presentation,
      status: t.eventCalendarPage.open,
    },
  ];

  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="absolute left-[-120px] top-20 h-72 w-72 rounded-full bg-[#604eff]/10 blur-3xl" />
      <div className="absolute bottom-0 right-[-120px] h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-[#604eff] ">
              {t.eventCalendarPage.events}
            </span>

            <h1 className="airi-gradient-text airi-section-title mt-2">
              {t.eventCalendarPage.heading}
            </h1>
          </div>

          <p className="max-w-3xl text-base font-medium leading-8 text-gray-600 lg:justify-self-end">
            {t.eventCalendarPage.description}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <article
              key={`${event.day}-${event.title}`}
              className="group relative overflow-hidden rounded-[28px] border border-gray-200 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-2 hover:border-[#604eff]/35 hover:shadow-[0_24px_80px_rgba(96,78,255,0.16)]">
              <div className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-[#604eff] via-cyan-400 to-fuchsia-400" />

              <div className="mb-6 flex items-start justify-between gap-4">
                <div className="airi-gradient-soft flex min-h-[86px] min-w-[86px] flex-col items-center justify-center rounded-2xl border border-[#604eff]/15 p-4 text-[#604eff] shadow-sm">
                  <span className="text-4xl font-black leading-none">
                    {event.day}
                  </span>
                  <span className="mt-1 text-xs font-extrabold uppercase tracking-[0.18em]">
                    {event.month}
                  </span>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span className="rounded-full bg-gray-950 px-3 py-1 text-xs font-bold text-white">
                    0{index + 1}
                  </span>
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                    {event.status}
                  </span>
                </div>
              </div>

              <span className="mb-4 inline-flex rounded-full bg-[#604eff]/10 px-3 py-1 text-xs font-extrabold text-[#604eff]">
                {event.type}
              </span>

              <h3 className="min-h-16 text-2xl  leading-tight text-gray-950 font-heading font-semibold">
                {event.title}
              </h3>

              <div className="mt-5 space-y-3 border-t border-gray-100 pt-5">
                <p className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                  <MapPin className="h-4 w-4 shrink-0 text-[#604eff]" />
                  {event.location}
                </p>

                <p className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                  <Clock3 className="h-4 w-4 shrink-0 text-[#604eff]" />
                  {event.time}
                </p>
              </div>

              <button
                type="button"
                className="mt-6 inline-flex items-center text-sm font-extrabold text-[#604eff] transition duration-300 group-hover:translate-x-1">
                {t.common.details}
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </button>

              <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-[#604eff]/5 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstituteEvent;
