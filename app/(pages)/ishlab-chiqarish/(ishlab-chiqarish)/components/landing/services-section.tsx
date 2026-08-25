"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { LaptopVisual } from "../shared/laptop-visual";
import { useLocale } from "@/i18n";
import { getProductionContent } from "@/i18n/production-content";

type Service = {
  number: string;
  title: string;
  meta: string;
  description: string;
  tags: string[];
};

const services: Service[] = [
  {
    number: "01",
    title: "Sun'iy intellekt tizimlari",
    meta: "Artificial Intelligence",
    description:
      "Machine learning, deep learning, computer vision, NLP va generativ AI asosidagi amaliy yechimlarni ishlab chiqish.",
    tags: ["ML", "Computer vision", "NLP", "Generative AI"],
  },
  {
    number: "02",
    title: "Web platformalar va axborot tizimlari",
    meta: "Web Platforms",
    description:
      "Tashkilot jarayonlariga mos korporativ platformalar, veb-ilovalar va axborot tizimlarini ishlab chiqish.",
    tags: ["Web apps", "Korporativ portal", "Backend", "UI/UX"],
  },
  {
    number: "03",
    title: "LLM va AI assistentlar",
    meta: "LLM & Assistants",
    description:
      "RAG, bilim bazalari, hujjatlar bilan ishlovchi AI assistentlar va korporativ generativ AI yechimlarini yaratish.",
    tags: ["RAG", "Hujjat tahlili", "Bilim bazasi", "Chat interfeys"],
  },
  {
    number: "04",
    title: "Ma'lumotlar tahlili",
    meta: "Data Analytics",
    description:
      "Ma'lumotlarni yig'ish, qayta ishlash, tahlil qilish, prognozlash va qaror qabul qilishni qo'llab-quvvatlovchi analitik tizimlar.",
    tags: ["Dashboard", "Prognozlash", "BI", "Data pipeline"],
  },
  {
    number: "05",
    title: "Integratsiya va avtomatlashtirish",
    meta: "Integration",
    description:
      "API, mavjud axborot tizimlari va raqamli xizmatlarni birlashtirish hamda takrorlanuvchi jarayonlarni avtomatlashtirish.",
    tags: ["API", "Tizimlararo aloqa", "Workflow", "Monitoring"],
  },
  {
    number: "06",
    title: "Prototiplash va R&D",
    meta: "Research & Development",
    description:
      "Yangi texnologik g'oyalarni tadqiq qilish, proof-of-concept va MVP prototiplarini yaratish hamda real sharoitda sinovdan o'tkazish.",
    tags: ["PoC", "MVP", "Pilot", "Texnik tadqiqot"],
  },
];

export function ServicesSection() {
  const { locale } = useLocale();
  const copy = getProductionContent(locale).services;
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.08 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#050912] py-24 text-white lg:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/15 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_22%,rgba(84,162,255,0.13),transparent_32%),radial-gradient(circle_at_86%_72%,rgba(45,212,191,0.08),transparent_30%)]" />

      <div className="relative z-10 mx-auto max-w-350 px-6 lg:px-12">
        <div className="mb-10 grid gap-10 rounded-2xl border border-white/12 bg-white/[0.055] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:p-8 lg:mb-12 lg:grid-cols-12 lg:items-end lg:p-10">
          <div className="lg:col-span-7">
            <span
              className={`mb-8 inline-flex items-center gap-4 font-mono text-sm text-white/68 transition-all duration-700 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}>
              <span className="h-px w-12 bg-white/20" />
              {copy.eyebrow}
            </span>

            <h2
              className={`max-w-3xl text-[clamp(2rem,3.7vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-balance transition-all duration-1000 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}>
              <span className="block">{copy.title[0]}</span>
              <span className="block text-white/82">{copy.title[1]}</span>
              <span className="block">{copy.title[2]}</span>
            </h2>
          </div>

          <div
            className={`lg:col-span-5 transition-all delay-100 duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}>
            <div className="mb-10 flex items-end justify-center lg:justify-end">
              <LaptopVisual />
            </div>

            <p className="max-w-xl text-[1.05rem] leading-[1.75] text-white/78">
              {copy.description}
            </p>
          </div>
        </div>

        {/* Editorial rows */}
        <div className="overflow-hidden rounded-2xl border border-white/12 bg-white/[0.04] px-5 shadow-[0_24px_80px_rgba(0,0,0,0.20)] backdrop-blur-xl sm:px-8">
          {services.map((service, index) => {
            const isActive = activeIndex === index;
            const localizedService = copy.items[index];

            return (
              <div
                key={service.number}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                onFocus={() => setActiveIndex(index)}
                onBlur={() => setActiveIndex(null)}
                tabIndex={0}
                style={{
                  transitionDelay: isVisible ? `${index * 70 + 150}ms` : "0ms",
                }}
                className={`group relative border-b border-white/12 outline-none transition-all duration-700 focus-visible:bg-white/[0.04] ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}>
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-0 bg-white/[0.035] transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />

                <div className="relative grid gap-4 px-1 py-7 lg:grid-cols-12 lg:items-baseline lg:gap-8 lg:py-9">
                  <div className="flex items-baseline gap-5 lg:col-span-5">
                    <span
                      className={`font-mono text-sm transition-colors duration-500 ${
                        isActive ? "text-[#54a2ff]" : "text-white/28"
                      }`}>
                      {service.number}
                    </span>
                    <h3
                      className={`text-xl font-semibold leading-snug tracking-[-0.02em] transition-transform duration-500 md:text-2xl lg:text-[1.65rem] ${
                        isActive ? "translate-x-2 text-white" : "text-white/88"
                      }`}>
                      {localizedService.title}
                    </h3>
                  </div>

                  <div className="lg:col-span-6">
                    <p
                      className={`max-w-2xl text-[0.98rem] leading-[1.7] transition-colors duration-500 ${
                        isActive ? "text-white/86" : "text-white/68"
                      }`}>
                      {localizedService.description}
                    </p>

                    <div
                      className={`grid transition-all duration-500 ${
                        isActive
                          ? "mt-4 grid-rows-[1fr] opacity-100"
                          : "mt-0 grid-rows-[0fr] opacity-0"
                      }`}>
                      <div className="overflow-hidden">
                        <div className="flex flex-wrap gap-2">
                          {localizedService.tags.map((tag) => (
                            <span
                              key={tag}
                              className="border border-white/14 px-2.5 py-1 font-mono text-[11px] text-white/55">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 lg:col-span-1 lg:justify-end">
                    <span className="font-mono text-[11px] uppercase tracking-widest text-white/25 lg:hidden">
                      {service.meta}
                    </span>
                    <ArrowUpRight
                      className={`h-5 w-5 shrink-0 transition-all duration-500 ${
                        isActive
                          ? "translate-x-0 -translate-y-0 text-white opacity-100"
                          : "-translate-x-2 translate-y-2 text-white/40 opacity-0"
                      }`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
