"use client";

import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { useLocale } from "@/i18n";
import { getProductionContent } from "@/i18n/production-content";

export function FaqSection() {
  const { locale } = useLocale();
  const copy = getProductionContent(locale).faq;
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
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
      id="faq"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#050912] pb-6 pt-24 text-white lg:pb-8 lg:pt-32">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/15 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(84,162,255,0.14),transparent_34%),radial-gradient(circle_at_16%_82%,rgba(45,212,191,0.08),transparent_30%)]" />

      <div className="relative z-10 mx-auto max-w-350 px-6 lg:px-12">
        <div className="grid gap-12 rounded-2xl border border-white/12 bg-white/[0.055] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:p-8 lg:grid-cols-12 lg:gap-16 lg:p-10">
          <div className="lg:col-span-4">
            <span
              className={`mb-8 inline-flex items-center gap-4 font-mono text-sm text-white/68 transition-all duration-700 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}>
              <span className="h-px w-12 bg-white/20" />
              {copy.eyebrow}
            </span>

            <h2
              className={`text-[clamp(2.15rem,3.6vw,3.35rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-balance transition-all duration-1000 lg:sticky lg:top-28 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}>
              <span className="block">{copy.title[0]}</span>
              <span className="block text-white/82">{copy.title[1]}</span>
            </h2>
          </div>

          <div className="lg:col-span-8">
            <div className="overflow-hidden rounded-xl border border-white/12 bg-[#07101e]/48 px-4 sm:px-6">
              {copy.items.map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <div
                    key={faq.question}
                    style={{
                      transitionDelay: isVisible ? `${index * 50 + 120}ms` : "0ms",
                    }}
                    className={`border-b border-white/12 last:border-b-0 transition-all duration-700 ${
                      isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-4 opacity-0"
                    }`}>
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${index}`}
                        className="group flex w-full items-start gap-6 py-6 text-left outline-none transition-colors hover:bg-white/[0.03] focus-visible:bg-white/[0.05]">
                        <span className="mt-1 font-mono text-xs text-white/52">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`flex-1 text-base font-medium leading-[1.5] tracking-[-0.01em] transition-colors lg:text-lg ${
                            isOpen ? "text-white" : "text-white/82 group-hover:text-white"
                          }`}>
                          {faq.question}
                        </span>
                        <Plus
                          aria-hidden="true"
                          className={`mt-1 h-5 w-5 shrink-0 transition-transform duration-500 ${
                            isOpen ? "rotate-45 text-[#54a2ff]" : "text-white/40"
                          }`}
                        />
                      </button>
                    </h3>

                    <div
                      id={`faq-panel-${index}`}
                      hidden={!isOpen}
                      className="grid grid-rows-[1fr] pl-12 pr-11">
                      <p className="pb-7 max-w-2xl leading-relaxed text-white/72">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
