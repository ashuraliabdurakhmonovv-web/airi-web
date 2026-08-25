"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { teacherBase, type Teacher } from "@/common/institute-teachers/data";
import { useLocale } from "@/i18n";

export default function Teachers() {
  const { t } = useLocale();
  const teachers: Teacher[] = teacherBase.map((teacher, index) => ({
    ...teacher,
    ...t.teachersPage.items[index],
  }));
  const [carouselRef, carouselApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: false,
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const showPrevious = useCallback(() => {
    carouselApi?.scrollPrev();
  }, [carouselApi]);

  const showNext = useCallback(() => {
    carouselApi?.scrollNext();
  }, [carouselApi]);

  const scrollTo = useCallback(
    (index: number) => {
      carouselApi?.scrollTo(index);
    },
    [carouselApi],
  );

  const onSelect = useCallback(() => {
    if (!carouselApi) {
      return;
    }

    setCurrentIndex(carouselApi.selectedScrollSnap());
  }, [carouselApi]);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    queueMicrotask(onSelect);
    carouselApi.on("select", onSelect);
    carouselApi.on("reInit", onSelect);

    return () => {
      carouselApi.off("select", onSelect);
      carouselApi.off("reInit", onSelect);
    };
  }, [carouselApi, onSelect]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!carouselApi || isPaused || prefersReducedMotion || teachers.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      carouselApi.scrollNext();
    }, 5500);

    return () => window.clearInterval(timer);
  }, [carouselApi, isPaused]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-0">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="airi-gradient-text airi-section-title font-semibold">
            {t.generalLanding.teachersTitle}
          </h2>
          <p className="airi-section-copy mt-3">
            {t.generalLanding.teachersDescription}
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <button
            type="button"
            aria-label={t.generalLanding.previousTeacher}
            onClick={showPrevious}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white text-gray-900 shadow-sm transition-colors hover:bg-gray-50">
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            aria-label={t.generalLanding.nextTeacher}
            onClick={showNext}
            className="airi-button flex h-11 w-11 cursor-pointer items-center justify-center rounded-full">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={carouselRef}
        className="overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="-ml-5 flex">
          {teachers.map((teacher) => (
            <div
              key={teacher.slug}
              className="min-w-0 shrink-0 grow-0 basis-full pl-5 sm:basis-1/2 lg:basis-1/3"
            >
              <Link
                href={`/umumiy-malumot/institute-teachers/${teacher.slug}`}
                className="group relative block h-105 overflow-hidden bg-gray-100 shadow-lg shadow-[#604eff]/10 sm:h-115 lg:h-120"
              >
                <Image
                  src={teacher.imageUrl}
                  alt={teacher.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-x-0 bottom-0 bg-gray-950/55 px-4 py-4 text-center text-white backdrop-blur-md sm:px-5">
                  <h3 className="text-[22px] font-bold leading-tight">
                    {teacher.name}
                  </h3>

                  <p className="mt-2 text-[15px] font-medium leading-tight text-white/90">
                    {teacher.direction}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2">
        {teachers.map((teacher, index) => (
          <button
            key={teacher.slug}
            type="button"
            aria-label={`${t.generalLanding.teacherSlideLabel} ${index + 1}`}
            aria-current={index === currentIndex}
            onClick={() => scrollTo(index)}
            className={`h-1 rounded-full transition-all duration-500 ${
              index === currentIndex
                ? "airi-gradient w-14"
                : "w-9 bg-[#604eff]/25 hover:bg-[#604eff]/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
