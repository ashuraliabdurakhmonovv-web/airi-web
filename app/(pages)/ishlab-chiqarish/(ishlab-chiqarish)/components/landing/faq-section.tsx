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
      className="relative overflow-hidden bg-[oklch(0.09_0.01_260)] py-24 text-white lg:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/15 to-transparent" />

      <div className="relative z-10 mx-auto max-w-350 px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4">
            <span
              className={`mb-8 inline-flex items-center gap-4 font-mono text-sm text-white/50 transition-all duration-700 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}>
              <span className="h-px w-12 bg-white/20" />
              {copy.eyebrow}
            </span>

            <h2
              className={`font-display text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[0.95] tracking-tight transition-all duration-1000 lg:sticky lg:top-28 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}>
              <span className="block">{copy.title[0]}</span>
              <span className="block text-white/65">{copy.title[1]}</span>
            </h2>
          </div>

          <div className="lg:col-span-8">
            <div className="border-t border-white/12">
              {copy.items.map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <div
                    key={faq.question}
                    style={{
                      transitionDelay: isVisible ? `${index * 50 + 120}ms` : "0ms",
                    }}
                    className={`border-b border-white/12 transition-all duration-700 ${
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
                        <span className="mt-1 font-mono text-xs text-white/30">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`flex-1 text-lg leading-snug transition-colors lg:text-xl ${
                            isOpen ? "text-white" : "text-white/78 group-hover:text-white"
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
                      <p className="pb-7 max-w-2xl leading-relaxed text-white/65">
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
