"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Quote,
  Sparkles,
} from "lucide-react";

const testimonials = [
  {
    quote:
      "AIRI bilan hamkorlik jarayonlarni aniq o'lchash, ma'lumotga tayangan qaror qabul qilish va natijani tez ko'rishga yordam berdi.",
    author: "Dilshod Karimov",
    role: "Raqamli transformatsiya bo'yicha rahbar",
    company: "AgroTech Uzbekistan",
    metric: { value: "42%", label: "tezroq tahlil jarayoni" },
    accent: "bg-[#2dd4bf]",
  },
  {
    quote:
      "Institut jamoasi murakkab texnik vazifani oddiy, tushunarli va amaliy yechimga aylantirdi. Pilot loyiha kutilganidan ham kuchli natija berdi.",
    author: "Malika Ergasheva",
    role: "Innovatsiyalar bo'limi boshlig'i",
    company: "Urban Data Lab",
    metric: { value: "3x", label: "tezroq pilot sinovi" },
    accent: "bg-[#54a2ff]",
  },
  {
    quote:
      "AIRI yechimlari hujjatlar, monitoring va tahlil ishlarida ortiqcha qo'l mehnatini kamaytirdi. Eng muhimi, tizim real ish jarayonimizga moslashdi.",
    author: "Jasur Tursunov",
    role: "Operatsion direktor",
    company: "FinControl Systems",
    metric: { value: "68%", label: "kamroq qo'l mehnati" },
    accent: "bg-[#f472b6]",
  },
  {
    quote:
      "Hamkorlik davomida ilmiy yondashuv, xavfsizlik va amaliy joriy etish bir xil darajada e'tiborda bo'ldi. Bunday jamoani qo'llab-quvvatlash kerak.",
    author: "Shahnoza Aliyeva",
    role: "Loyiha koordinatori",
    company: "EcoVision Group",
    metric: { value: "100%", label: "shaffof loyiha nazorati" },
    accent: "bg-[#a3e635]",
  },
];

const trustSignals = [
  "Biznes uchun real foyda",
  "Davlat va jamiyat ehtiyojlariga mos",
  "Ilmiy yondashuv va amaliy natija",
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const goTo = (index: number) => setActiveIndex(index);

  const goPrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-24 text-black lg:py-32">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(180deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:72px_72px]" />
      <div className="absolute left-0 top-0 h-72 w-72 bg-[#2dd4bf]/16 blur-[120px]" />
      <div className="absolute bottom-16 right-0 h-80 w-80 bg-[#f472b6]/12 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-350 px-6 lg:px-12">
        <div className="mb-14 grid gap-10 lg:mb-20 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <span className="mb-6 inline-flex items-center gap-3 font-mono text-sm text-black/45">
              <span className="h-px w-12 bg-black/20" />
              Mijozlar fikri
            </span>
            <h2
              className={`font-display text-5xl leading-[0.9] tracking-tight transition-all duration-1000 md:text-7xl lg:text-[112px] ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}>
              Ishonch
              <br />
              <span className="text-black/35">natijada ko&apos;rinadi</span>
            </h2>
          </div>

          <div
            className={`lg:col-span-4 transition-all delay-150 duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}>
            <p className="text-lg leading-relaxed text-black/62">
              AIRI bilan ishlagan tashkilotlar sun&apos;iy intellektni reklama
              shiori sifatida emas, real jarayonni tezlashtiradigan va
              boshqaruvni aniqlashtiradigan amaliy kuch sifatida ko&apos;rmoqda.
            </p>
          </div>
        </div>

        <div
          className={`grid gap-5 transition-all delay-200 duration-1000 lg:grid-cols-12 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}>
          <div className="relative overflow-hidden border border-black/10 bg-black p-6 text-white md:p-10 lg:col-span-7 lg:min-h-155">
            <div
              className={`absolute right-0 top-0 h-2 w-1/2 ${activeTestimonial.accent}`}
            />
            <div className="absolute inset-x-0 bottom-0 h-px bg-white/12" />
            <div className="mb-10 flex items-center justify-between gap-4">
              <span className="inline-flex items-center gap-2 border border-white/15 bg-white/8 px-3 py-2 text-xs font-mono text-white/65">
                <Sparkles className="h-4 w-4" />
                Hamkorlar tomonidan e&apos;tirof etilgan
              </span>
              <Quote className="h-10 w-10 text-white/18" />
            </div>

            <blockquote
              key={activeIndex}
              className="animate-fadeSlideIn font-display text-3xl leading-[1.18] tracking-tight md:text-5xl lg:text-6xl">
              {activeTestimonial.quote}
            </blockquote>

            <div className="mt-12 grid gap-5 border-t border-white/12 pt-8 sm:grid-cols-[auto_1fr] sm:items-center">
              <div className="flex h-16 w-16 items-center justify-center border border-white/20 bg-white/10">
                <span className="font-display text-2xl">
                  {activeTestimonial.author.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-lg font-medium">{activeTestimonial.author}</p>
                <p className="mt-1 text-sm leading-relaxed text-white/58">
                  {activeTestimonial.role}, {activeTestimonial.company}
                </p>
              </div>
            </div>

            <div className="mt-10 flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`${idx + 1}-fikrni ko'rsatish`}
                  onClick={() => goTo(idx)}
                  className="h-1.5 flex-1 overflow-hidden bg-white/16">
                  <span
                    className={`block h-full transition-all duration-300 ${
                      idx === activeIndex ? "w-full bg-white" : "w-0 bg-white/40"
                    }`}
                    style={
                      idx === activeIndex
                        ? { animation: "progress 8s linear forwards" }
                        : undefined
                    }
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-5 lg:col-span-5">
            <div className="border border-black/10 bg-white p-6 md:p-8">
              <span className="text-sm font-mono text-black/42">
                Asosiy ko&apos;rsatkich
              </span>
              <div key={`metric-${activeIndex}`} className="animate-fadeSlideIn">
                <span className="mt-5 block font-display text-7xl leading-none tracking-tight lg:text-8xl">
                  {activeTestimonial.metric.value}
                </span>
                <span className="mt-3 block text-lg text-black/56">
                  {activeTestimonial.metric.label}
                </span>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {trustSignals.map((signal) => (
                <div
                  key={signal}
                  className="flex min-h-20 items-center gap-3 border border-black/10 bg-white/80 px-5 py-4">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <span className="text-sm font-medium leading-snug text-black/70">
                    {signal}
                  </span>
                </div>
              ))}
            </div>

            <div className="border border-black/10 bg-[#f6f7f8] p-5">
              <span className="mb-4 block text-xs font-mono uppercase tracking-widest text-black/38">
                Hamkor tashkilotlar
              </span>
              <div className="grid gap-2">
                {testimonials.map((testimonial, idx) => (
                  <button
                    key={testimonial.company}
                    type="button"
                    onClick={() => goTo(idx)}
                    className={`group flex items-center justify-between gap-4 border px-4 py-3 text-left transition-all ${
                      idx === activeIndex
                        ? "border-black bg-black text-white"
                        : "border-black/10 bg-white text-black/62 hover:border-black/30"
                    }`}>
                    <span className="inline-flex items-center gap-3 text-sm font-medium">
                      <Building2 className="h-4 w-4" />
                      {testimonial.company}
                    </span>
                    <span
                      className={`h-2 w-2 ${
                        idx === activeIndex
                          ? testimonial.accent
                          : "bg-black/18 group-hover:bg-black/35"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Oldingi fikr"
                onClick={goPrev}
                className="grid h-13 flex-1 place-items-center border border-black/12 bg-white text-black transition-colors hover:bg-black hover:text-white">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Keyingi fikr"
                onClick={goNext}
                className="grid h-13 flex-1 place-items-center border border-black/12 bg-white text-black transition-colors hover:bg-black hover:text-white">
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 border-t border-black/10 pt-8 text-black/58 md:grid-cols-3">
          {[
            { value: "AI", label: "tahlil va avtomatlashtirish" },
            { value: "R&D", label: "tadqiqotdan joriy etishgacha" },
            { value: "24/7", label: "barqaror texnik hamkorlik" },
          ].map((item) => (
            <div key={item.label} className="flex items-baseline gap-3">
              <span className="font-display text-3xl text-black">
                {item.value}
              </span>
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fadeSlideIn {
          animation: fadeSlideIn 0.5s ease-out forwards;
        }
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
