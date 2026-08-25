/** @format */

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useLocale } from "@/i18n";
import { NewsImage } from "@/components/news/news-image";
import { formatUzbekDate, localizedText, newsHref, newsImage } from "@/lib/news";
import { getNewsHighlights } from "@/lib/news/news-highlights";

const NEWS_LIST_HREF = "/umumiy-malumot/news";
const HIGHLIGHT_LIMIT = 9;

export default function News() {
  const { locale, t } = useLocale();

  const items = useMemo(() => getNewsHighlights(HIGHLIGHT_LIMIT), []);

  const [carouselRef, carouselApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: false,
  });
  const [snaps, setSnaps] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const showPrevious = useCallback(() => carouselApi?.scrollPrev(), [carouselApi]);
  const showNext = useCallback(() => carouselApi?.scrollNext(), [carouselApi]);
  const scrollTo = useCallback((index: number) => carouselApi?.scrollTo(index), [carouselApi]);

  const onSelect = useCallback(() => {
    if (!carouselApi) return;
    setCurrentIndex(carouselApi.selectedScrollSnap());
  }, [carouselApi]);

  const onReInit = useCallback(() => {
    if (!carouselApi) return;
    setSnaps(carouselApi.scrollSnapList());
    setCurrentIndex(carouselApi.selectedScrollSnap());
  }, [carouselApi]);

  useEffect(() => {
    if (!carouselApi) return;

    queueMicrotask(onReInit);
    carouselApi.on("select", onSelect);
    carouselApi.on("reInit", onReInit);

    return () => {
      carouselApi.off("select", onSelect);
      carouselApi.off("reInit", onReInit);
    };
  }, [carouselApi, onReInit, onSelect]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!carouselApi || isPaused || prefersReducedMotion || items.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => carouselApi.scrollNext(), 5500);

    return () => window.clearInterval(timer);
  }, [carouselApi, isPaused, items.length]);

  if (!items.length) return null;

  return (
    <section className="relative w-full overflow-hidden bg-[#f8fafc] text-slate-950">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(180deg,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-size-[80px_80px]" />
      <div className="pointer-events-none absolute -right-48 -top-48 h-128 w-128 rounded-full bg-[#54a2ff]/12 blur-[150px]" />
      <div className="pointer-events-none absolute -bottom-56 -left-40 h-112 w-112 rounded-full bg-[#2dd4bf]/10 blur-[150px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#54a2ff]/55 to-transparent" />

      <div className="relative z-10 mx-auto max-w-350 px-6 py-20 lg:px-12 lg:py-28">
        <div className="flex flex-col gap-9 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="flex items-center gap-4 font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-[#2478cf]">
              <span className="h-px w-12 bg-linear-to-r from-[#2478cf] to-[#14b8a6]" />
              {t.nav.news}
            </p>

            <h2 className="mt-5 font-display text-[clamp(2.25rem,3.5vw,3.5rem)] font-semibold uppercase leading-[1.02] tracking-[-0.015em]">
              <span className="bg-linear-to-r from-[#1768c4] via-[#3598ef] to-[#10a99c] bg-clip-text text-transparent">
                {t.generalLanding.latestNewsTitle}
              </span>
            </h2>

            <p className="mt-5 max-w-3xl font-sans text-base leading-7 text-slate-600 sm:text-[17px]">
              {t.generalLanding.latestNewsDescription}
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-3">
            <div className="flex">
              <button
                type="button"
                aria-label={t.news.previous}
                onClick={showPrevious}
                className="group flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center border border-slate-900/12 bg-white text-slate-800 transition-colors hover:border-[#2478cf] hover:text-[#1768c4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2478cf]">
                <ChevronLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
              </button>

              <button
                type="button"
                aria-label={t.news.next}
                onClick={showNext}
                className="group -ml-px flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center border border-slate-900/12 bg-white text-slate-800 transition-colors hover:z-10 hover:border-[#2478cf] hover:text-[#1768c4] focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2478cf]">
                <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </div>

            <Link
              href={NEWS_LIST_HREF}
              className="group inline-flex h-12 items-center gap-3 border border-[#2478cf]/30 bg-[#2478cf]/8 px-6 font-sans text-sm font-semibold text-slate-900 transition-colors hover:border-[#2478cf]/60 hover:bg-[#2478cf]/14 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2478cf]">
              {t.news.allNews}
              <ArrowRight className="h-4 w-4 text-[#1768c4] transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div
          ref={carouselRef}
          aria-roledescription="carousel"
          className="mt-14 overflow-hidden lg:mt-16"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="-ml-5 flex items-stretch">
            {items.map((item, index) => {
              const title = localizedText(item.title, locale);
              const excerpt = localizedText(item.description, locale);
              const image = newsImage(item);
              const displayDate = item.displayDate || formatUzbekDate(item.publishedAt);

              return (
                <div
                  key={item.id}
                  className="min-w-0 shrink-0 grow-0 basis-full pl-5 md:basis-1/2 lg:basis-1/3">
                  <article className="h-full">
                    <Link
                      href={newsHref(item)}
                      className="group flex h-full min-h-[32rem] flex-col overflow-hidden border border-slate-900/10 bg-white outline-none transition-all duration-500 hover:border-[#2478cf]/55 hover:shadow-[0_24px_70px_-35px_rgba(23,104,196,0.5)] focus-visible:border-[#2478cf] focus-visible:ring-2 focus-visible:ring-[#2478cf]/30">
                      <div className="relative aspect-16/10 shrink-0 overflow-hidden bg-slate-100">
                        <NewsImage
                          src={image}
                          alt={title}
                          priority={index < 3}
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                        />
                        <span className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-950/25 via-transparent to-transparent" />
                        <span className="absolute right-4 top-4 grid h-9 min-w-9 place-items-center bg-slate-950/78 px-2 font-mono text-[10px] tracking-[0.12em] text-white backdrop-blur-md">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col p-6 lg:p-7">
                        <div className="flex min-h-5 flex-wrap items-center justify-between gap-x-4 gap-y-2 font-sans text-[11px] font-semibold uppercase tracking-[0.12em]">
                          <span className="text-[#1768c4]">
                            {item.category || t.nav.news}
                          </span>

                          {displayDate ? (
                            <time
                              dateTime={item.publishedAt || undefined}
                              className="inline-flex items-center gap-1.5 normal-case tracking-normal text-slate-500">
                              <CalendarDays className="h-3.5 w-3.5 text-[#3a8fdf]" />
                              {displayDate}
                            </time>
                          ) : null}
                        </div>

                        <h3 className="mt-5 line-clamp-3 font-display text-xl font-semibold leading-[1.25] tracking-[-0.015em] text-slate-950 transition-colors duration-300 group-hover:text-[#1768c4]">
                          {title}
                        </h3>

                        {excerpt ? (
                          <p className="mt-4 line-clamp-3 font-sans text-[14px] leading-6 text-slate-600">
                            {excerpt}
                          </p>
                        ) : null}

                        <span className="mt-auto block h-px w-full bg-slate-900/10 transition-colors duration-500 group-hover:bg-[#2478cf]/35" />

                        <span className="mt-5 inline-flex items-center justify-between gap-4 font-sans text-[12px] font-bold uppercase tracking-[0.14em] text-slate-800 transition-colors group-hover:text-[#1768c4]">
                          {t.news.readMore}
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </Link>
                  </article>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-9 flex w-full max-w-md items-center gap-5">
          <span className="shrink-0 font-mono text-[11px] tracking-[0.15em] text-slate-500">
            {String(currentIndex + 1).padStart(2, "0")}
            <span className="mx-2 text-slate-300">/</span>
            {String(snaps.length).padStart(2, "0")}
          </span>

          <div className="flex flex-1 items-center gap-1.5">
            {snaps.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`${t.nav.news} ${index + 1}`}
                aria-current={index === currentIndex}
                onClick={() => scrollTo(index)}
                className={`h-1 min-w-3 flex-1 cursor-pointer transition-colors duration-500 ${
                  index === currentIndex
                    ? "bg-linear-to-r from-[#2478cf] to-[#14b8a6]"
                    : "bg-slate-900/12 hover:bg-[#2478cf]/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
