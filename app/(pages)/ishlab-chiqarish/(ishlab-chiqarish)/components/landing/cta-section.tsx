"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquareText } from "lucide-react";

export function CtaSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-20 text-black lg:py-28">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(180deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:84px_84px]" />
      <div className="absolute left-0 top-12 h-72 w-72 bg-[#54a2ff]/12 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-72 w-72 bg-[#2dd4bf]/14 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-350 px-6 lg:px-12">
        <div
          className={`grid gap-10 border border-black/10 bg-white/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.08)] transition-all duration-1000 md:p-10 lg:grid-cols-12 lg:items-center ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}>
          <div className="lg:col-span-8">
            <span className="mb-6 inline-flex items-center gap-3 font-mono text-sm text-black/45">
              <span className="h-px w-12 bg-black/20" />
              Keyingi qadam
            </span>
            <h2 className="font-display text-5xl leading-[0.92] tracking-tight md:text-7xl lg:text-[96px]">
              Keling,
              <br />
              <span className="text-black/35">yechimni boshlaymiz</span>
            </h2>
          </div>

          <div className="lg:col-span-4">
            <p className="text-lg leading-relaxed text-black/62">
              Hamkorlik, pilot loyiha, AI yechim yoki taklif bo&apos;yicha
              murojaat qoldiring. Jamoamiz siz bilan bog&apos;lanib, ehtiyojni
              tahlil qiladi va keyingi qadamlarni aniqlaydi.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Button
                asChild
                size="lg"
                className="h-13 bg-black px-7 text-base text-white hover:bg-black/85">
                <a href="/ishlab-chiqarish#contact">
                  Murojaat qilish
                  <MessageSquareText className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
