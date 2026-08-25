"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { NewsImage } from "@/components/news/news-image";
import { getAllStaticNews } from "@/lib/news/static-news-repository";
import { localizedText, newsHref, resolveNewsImage } from "@/lib/news";
import { useLocale } from "@/i18n";

const featuredNews = getAllStaticNews()
  .filter((article) => resolveNewsImage(article) !== "/logo.png")
  .slice(0, 3);

export default function NewsSuccess() {
  const { t, locale } = useLocale();
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeNews = featuredNews[currentIndex] || featuredNews[0];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === featuredNews.length - 1 ? 0 : prev + 1,
    );
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? featuredNews.length - 1 : prev - 1,
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  if (!activeNews) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-0">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-center">
          <div>
            <h2 className="airi-gradient-text airi-section-title font-semibold text-center">
              {t.generalLanding.latestNewsTitle}
            </h2>
            <p className="airi-section-copy mt-3 text-center">
              {t.generalLanding.latestNewsDescription}
            </p>
          </div>
        </div>

        <div className="group relative h-105 overflow-hidden bg-black shadow-2xl shadow-[#604eff]/14 md:h-125 lg:h-140">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0">
              <NewsImage
                src={activeNews.coverImage}
                alt={localizedText(activeNews.title, locale)}
                priority={currentIndex === 0}
                sizes="100vw"
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-linear-to-t from-gray-950/95 via-gray-950/45 to-black/10" />

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="max-w-3xl">
                  <h3 className="mb-4 max-w-4xl text-2xl font-extrabold leading-tight text-white md:text-4xl">
                    {localizedText(activeNews.title, locale)}
                  </h3>
                  <p className="max-w-3xl text-base font-medium leading-relaxed text-gray-200 hidden md:block">
                    {localizedText(activeNews.description, locale)}
                  </p>
                  <Link
                    href={newsHref(activeNews)}
                    className="airi-button mt-6 inline-flex items-center rounded-xl px-5 py-3 text-sm font-bold">
                    {t.news.readMore}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <button
            onClick={prevSlide}
            aria-label={t.news.previous}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors border border-white/20 cursor-pointer z-10 opacity-0 group-hover:opacity-100 duration-300">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            aria-label={t.news.next}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors border border-white/20 cursor-pointer z-10 opacity-0 group-hover:opacity-100 duration-300">
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-8 right-8 md:right-16 flex gap-3 z-10">
            {featuredNews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`${t.generalLanding.newsSlideLabel} ${i + 1}`}
                aria-current={i === currentIndex}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === currentIndex
                    ? "airi-gradient w-8"
                    : "bg-white/50 w-2.5 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
