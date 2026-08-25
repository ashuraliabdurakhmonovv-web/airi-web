/** @format */

"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/i18n";

export default function HistoryPage() {
  const { t } = useLocale();
  const timelineItems = t.historyPage.timeline;
  const stats = t.historyPage.stats;
  const directions = t.historyPage.directions;
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = timelineItems[activeIndex];
  const timelineRef = useRef<HTMLDivElement>(null);
  const moveTimeline = (step: number) => {
    setActiveIndex(
      (activeIndex + step + timelineItems.length) % timelineItems.length,
    );
  };

  useEffect(() => {
    const activeElement = timelineRef.current?.querySelector<HTMLElement>(
      `[data-timeline-index="${activeIndex}"]`,
    );

    activeElement?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeIndex]);

  return (
    <section className="relative min-h-[calc(100vh-5rem)] overflow-hidden">
      <div className="pointer-events-none absolute -left-32 top-24 h-72 w-72 rounded-full bg-[#2f35cf]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 bottom-20 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="mb-10 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wider text-[#604eff]">
              {t.nav.aboutInstitute}
            </p>

            <h1 className="airi-gradient-text airi-section-title mt-3">
              {t.historyPage.title}
            </h1>

            <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-gray-600 sm:text-base">
              {t.historyPage.description}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/70 bg-white/80 p-4 text-center shadow-[0_14px_40px_rgba(15,23,42,0.06)] backdrop-blur">
                <p className="font-heading font-semibold uppercase tracking-wider text-[#604eff] text-2xl sm:text-3xl">
                  {item.value}
                </p>
                <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-gray-600 sm:text-base">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid items-stretch gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="flex min-h-[360px] flex-col justify-center rounded-[2rem] border border-white/70 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-8 lg:col-start-1 lg:row-start-2 lg:min-h-[460px]">
            <span className="mb-5 inline-flex w-fit rounded-full bg-[#2f35cf]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#2f35cf]">
              {activeItem.label}
            </span>

            <h2 className="text-2xl font-extrabold leading-tight text-gray-950 sm:text-3xl">
              {activeItem.year}: {activeItem.title}
            </h2>

            <p className="mt-5 text-sm font-medium leading-7 text-gray-600 sm:text-base">
              {activeItem.description}
            </p>

            <div className="mt-7 rounded-2xl border border-[#2f35cf]/10 bg-[#2f35cf]/5 p-5">
              <p className="text-sm font-bold leading-7 text-gray-800">
                {t.historyPage.quote}
              </p>
            </div>
          </article>

          <div className="relative flex min-h-[250px] min-w-0 items-center lg:col-span-2 lg:row-start-1">
            <button type="button" aria-label={t.historyPage.previousStage} onClick={() => moveTimeline(-1)} className="absolute left-0 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white bg-white/90 text-2xl font-bold text-[#2f35cf] shadow-lg">‹</button>
            <div className="relative w-full min-w-0 px-8">
              <div className="absolute left-0 right-0 top-7 h-px bg-gradient-to-r from-transparent via-[#2f35cf]/30 to-transparent" />

              <div ref={timelineRef} className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {timelineItems.map((item, index) => (
                  <div key={item.year} className="relative flex w-[190px] shrink-0 flex-col gap-3">
                    <button
                      type="button"
                      data-timeline-index={index}
                      aria-label={`${item.year}: ${item.title}`}
                      aria-current={index === activeIndex ? "step" : undefined}
                      onClick={() => setActiveIndex(index)}
                      className={[
                        "relative z-10 flex h-14 w-fit min-w-14 items-center justify-center rounded-2xl border px-3 text-sm font-extrabold shadow-sm",
                        index === activeIndex
                          ? "border-[#2f35cf] bg-[#2f35cf] text-white shadow-[0_14px_30px_rgba(47,53,207,0.28)]"
                          : "border-white bg-white text-gray-400 hover:border-[#2f35cf]/40 hover:text-[#2f35cf]",
                      ].join(" ")}>
                      {item.year}
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={[
                        "rounded-2xl border p-4 text-left transition duration-300",
                        index === activeIndex
                          ? "border-[#2f35cf]/20 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.08)]"
                          : "border-white/70 bg-white/60 hover:bg-white",
                      ].join(" ")}>
                      <h3
                        className={[
                          "text-sm font-extrabold",
                          index === activeIndex ? "text-gray-950" : "text-gray-500",
                        ].join(" ")}>
                        {item.title}
                      </h3>

                      <p className="mt-2 line-clamp-3 text-xs font-medium leading-5 text-gray-500">
                        {item.description}
                      </p>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <button type="button" aria-label={t.historyPage.nextStage} onClick={() => moveTimeline(1)} className="absolute right-0 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white bg-white/90 text-2xl font-bold text-[#2f35cf] shadow-lg">›</button>
          </div>

          <div className="group relative min-h-90 overflow-hidden rounded-2xl border border-white/70 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.10)] sm:min-h-[420px] lg:col-start-2 lg:row-start-2 lg:min-h-[460px]">
            <Image
              src="/history.png"
              alt={t.historyPage.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

            <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white/80 backdrop-blur-md">
              {activeItem.year}
            </div>

            <div className="absolute bottom-0 left-0 right-0 sm:p-2">
              <div className="max-w-md rounded-2xl border border-white/20 bg-white/15 p-5 text-white backdrop-blur-md">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/70">
                  {activeItem.label}
                </p>

                <h3 className="mt-2 text-xl font-extrabold leading-tight">
                  {t.historyPage.imageTitle}
                </h3>

                <p className="mt-3 text-sm font-medium leading-6 text-white/75">
                  {activeItem.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {directions.map((item, index) => (
            <div
              key={item.title}
              className="group rounded-[1.7rem] border border-white/70 bg-white p-6 shadow-[0_16px_45px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(15,23,42,0.10)]">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2f35cf]/10 text-lg font-extrabold text-[#2f35cf] transition duration-300 group-hover:bg-[#2f35cf] group-hover:text-white">
                0{index + 1}
              </div>

              <h3 className="text-lg font-extrabold text-gray-950">
                {item.title}
              </h3>

              <p className="mt-3 text-sm font-medium leading-7 text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
