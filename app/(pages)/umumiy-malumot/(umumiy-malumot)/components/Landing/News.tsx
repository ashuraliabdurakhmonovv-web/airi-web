"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { useLocale } from "@/i18n";
import { NewsImage } from "@/components/news/news-image";
import { useNews } from "@/hooks/use-news";
import { localizedText, newsHref, newsImage } from "@/lib/news";

export default function News() {
  const { locale, t } = useLocale();
  const language = (["uz", "ru", "en"].includes(locale) ? locale : "uz") as "uz" | "ru" | "en";
  const { data, isLoading } = useNews({ page: 1, limit: 6, language });
  const items = data?.data || [];
  const [carouselRef, carouselApi] = useEmblaCarousel({ align: "start", loop: items.length > 3, skipSnaps: false });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const onSelect = useCallback(() => {
    if (carouselApi) setCurrentIndex(carouselApi.selectedScrollSnap());
  }, [carouselApi]);

  useEffect(() => {
    if (!carouselApi) return;
    queueMicrotask(onSelect);
    carouselApi.on("select", onSelect);
    carouselApi.on("reInit", onSelect);
    return () => {
      carouselApi.off("select", onSelect);
      carouselApi.off("reInit", onSelect);
    };
  }, [carouselApi, onSelect]);

  useEffect(() => {
    if (!carouselApi || isPaused || items.length <= 1 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => carouselApi.scrollNext(), 5500);
    return () => window.clearInterval(timer);
  }, [carouselApi, isPaused, items.length]);

  if (isLoading) {
    return <section className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 3 }).map((_, index) => <div key={index} className="h-[460px] animate-pulse bg-gray-200" />)}</section>;
  }
  if (!items.length) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-0">
      <div ref={carouselRef} className="overflow-hidden" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
        <div className="-ml-5 flex">
          {items.map((item, index) => {
            const title = localizedText(item.title, locale);
            const excerpt = localizedText(item.description, locale);
            const image = newsImage(item);
            return (
              <div key={item.id} className="min-w-0 shrink-0 grow-0 basis-full pl-5 md:basis-1/2 lg:basis-1/3">
                <article className="group relative h-[460px] overflow-hidden bg-slate-900 shadow-lg shadow-[#604eff]/10">
                  <NewsImage src={image} alt={title} priority={index < 3} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover opacity-85 transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
                  <div className="relative z-10 flex h-full flex-col justify-end p-4 sm:p-5">
                    <p className="mb-2 text-xs font-bold uppercase tracking-wide text-blue-200">{item.category}</p>
                    <h3 className="line-clamp-3 text-xl font-bold leading-tight text-white">{title}</h3>
                    {excerpt ? <p className="mt-3 line-clamp-3 text-sm font-medium leading-relaxed text-white/80">{excerpt}</p> : null}
                    <Link href={newsHref(item)} className="airi-button mt-5 w-fit rounded-xl px-5 py-3 text-sm font-bold">{t.news.readMore}</Link>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
      {items.length > 1 ? <div className="mt-5 flex items-center justify-center gap-2">{items.map((item, index) => <button key={item.id} type="button" aria-label={`${t.generalLanding.newsSlideLabel} ${index + 1}`} aria-current={index === currentIndex} onClick={() => carouselApi?.scrollTo(index)} className={`h-1 rounded-full transition-all duration-500 ${index === currentIndex ? "airi-gradient w-14" : "w-9 bg-[#604eff]/25 hover:bg-[#604eff]/40"}`} />)}</div> : null}
    </section>
  );
}
