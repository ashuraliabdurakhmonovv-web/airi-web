"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import {
  BrainCircuit,
  CheckCircle2,
  Cpu,
  DatabaseZap,
  Layers3,
  Microscope,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import HeroImag from "@/public/heroimg.png";
import HeroImageDark from "@/public/general-hero-dark-v2.png";
import { useLocale } from "@/i18n";

type StatProps = {
  value: number;
  label: ReactNode;
  accent?: boolean;
};

type FloatCardStyle = CSSProperties & {
  "--airi-float-hover"?: string;
  "--airi-float-x"?: string;
  "--airi-float-y-start"?: string;
};

const visualCards = [
  {
    icon: BrainCircuit,
    hotspotClass: "right-[34%] top-[18%]",
    cardClass: "left-8 top-8",
    startX: "-18px",
    startY: "18px",
    hoverY: "-8px",
  },
  {
    icon: DatabaseZap,
    hotspotClass: "right-[4%] top-[30%]",
    cardClass: "right-8 top-8",
    startX: "22px",
    startY: "16px",
    hoverY: "-6px",
  },
  {
    icon: Layers3,
    hotspotClass: "right-[30%] bottom-[16%]",
    cardClass: "left-8 bottom-8",
    startX: "-12px",
    startY: "22px",
    hoverY: "-10px",
  },
];

function CountStat({ value, label, accent = false }: StatProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const run = () => {
      if (reduceMotion) {
        setCount(value);
        return;
      }

      const start = performance.now();
      const duration = 1000;

      const tick = (time: number) => {
        const progress = Math.min((time - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        setCount(Math.round(eased * value));

        if (progress < 1) {
          frame.current = requestAnimationFrame(tick);
        }
      };

      setCount(0);
      frame.current = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) run();
      },
      { threshold: 0.45 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [value]);

  return (
    <div
      ref={ref}
      className={[
        "relative overflow-hidden border p-2.5 transition duration-300 min-[380px]:p-3 sm:p-6 text-center",
        accent
          ? "border-[#246BFE] bg-[#246BFE] text-white shadow-2xl shadow-blue-600/20"
          : "border-[#dbe7ff] bg-white/82 text-slate-950 shadow-sm backdrop-blur-xl hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/5",
      ].join(" ")}>
      <div
        className={[
          "text-2xl  tracking-normal min-[380px]:text-3xl sm:text-4xl font-heading font-semibold",
          accent ? "text-white" : "text-[#246BFE]",
        ].join(" ")}>
        {count}+
      </div>

      <div
        className={[
          "mt-2 text-[14px] font-light leading-3 tracking-[0.04em] min-[380px]:text-[11px] min-[380px]:leading-4 min-[380px]:tracking-[0.08em] sm:text-[13px] sm:leading-5 sm:tracking-[0.12em]",
          accent ? "text-white/85" : "text-slate-500",
        ].join(" ")}>
        {label}
      </div>
    </div>
  );
}

function HeroAmbient() {
  return (
    <div className="pointer-events-none absolute inset-0 z-1 overflow-hidden">
      {/* Clean visible grid */}
      <div
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage:
            "linear-gradient(rgba(36,107,254,0.085) 1px, transparent 1px), linear-gradient(90deg, rgba(36,107,254,0.085) 1px, transparent 1px)",
          backgroundSize: "38px 38px",
        }}
      />

      {/* Soft technological glow */}
      <div className="absolute -left-40 top-24 h-105 w-105 rounded-full bg-blue-400/10 blur-3xl" />
      <div className="absolute right-0 top-0 h-155 w-155 rounded-full bg-cyan-300/14 blur-3xl" />
      <div className="absolute bottom-0 left-1/2 h-90 w-155 -translate-x-1/2 rounded-full bg-indigo-300/8 blur-3xl" />

      {/* Subtle vignette, image remains clear */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_45%,transparent_0%,transparent_38%,rgba(247,250,255,0.18)_72%,rgba(247,250,255,0.36)_100%)]" />
    </div>
  );
}

function FloatingCards() {
  const { t } = useLocale();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-30 hidden lg:block">
      <div className="airi-hotspot absolute right-[9%] top-[18%]">
        <span className="airi-hover-field" />

        <div
          className="airi-float-card absolute left-5 top-5 w-52"
          style={
            {
              "--airi-float-hover": "-9px",
              "--airi-float-x": "18px",
              "--airi-float-y-start": "18px",
            } as FloatCardStyle
          }>
          <div className="airi-card-shell relative overflow-hidden border border-white/70 bg-white/78 p-4 shadow-2xl shadow-blue-950/10 backdrop-blur-2xl">
            <span className="airi-card-sheen pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 bg-linear-to-r from-transparent via-white/65 to-transparent" />

            <div className="relative mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-blue-700">
                <Cpu className="h-4 w-4" />
                {t.generalLanding.heroPanelTitle}
              </div>
              <span className="airi-status-dot h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.85)]" />
            </div>

            <div className="relative flex h-20 items-end gap-2">
              {[42, 68, 54, 88, 74, 96].map((height, index) => (
                <span
                  key={height}
                  className="airi-meter-bar flex-1 rounded-t-md bg-linear-to-t from-[#246BFE] to-[#08e8ea]"
                  style={{
                    height: `${height}%`,
                    opacity: 0.62 + index * 0.055,
                    transitionDelay: `${index * 55}ms`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {visualCards.map((card, index) => {
        const Icon = card.icon;
        const content = t.generalLanding.heroVisualCards[index];

        return (
          <div
            key={content.title}
            className={`airi-hotspot absolute ${card.hotspotClass}`}>
            <span className="airi-hover-field" />

            <div
              className={`airi-float-card absolute hidden min-w-48 xl:block ${card.cardClass}`}
              style={
                {
                  "--airi-float-hover": card.hoverY,
                  "--airi-float-x": card.startX,
                  "--airi-float-y-start": card.startY,
                } as FloatCardStyle
              }>
              <div className="airi-card-shell relative overflow-hidden border border-white/70 bg-white/80 p-3 shadow-xl shadow-blue-950/10 backdrop-blur-2xl">
                <span className="airi-card-sheen pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 bg-linear-to-r from-transparent via-white/65 to-transparent" />

                <div className="relative flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-blue-50 text-blue-600 ring-1 ring-blue-100/80">
                    <Icon className="h-5 w-5" />
                  </span>

                  <div>
                    <p className="text-sm font-black leading-4 text-slate-950">
                      {content.title}
                    </p>
                    <p className="mt-1 text-[11px] font-bold uppercase tracking-widest text-slate-500">
                      {content.value}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="airi-hotspot absolute bottom-[10%] right-[5%]">
        <span className="airi-hover-field" />

        <div
          className="airi-float-card absolute right-5 bottom-5 w-107"
          style={
            {
              "--airi-float-hover": "-7px",
              "--airi-float-x": "28px",
              "--airi-float-y-start": "24px",
            } as FloatCardStyle
          }>
          <div className="airi-card-shell relative overflow-hidden border border-white/75 bg-white/82 p-4 shadow-2xl shadow-blue-950/12 backdrop-blur-2xl">
            <span className="airi-card-sheen pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 bg-linear-to-r from-transparent via-white/65 to-transparent" />

            <div className="relative mb-3 flex items-center gap-2 text-blue-700">
              <Microscope className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-widest">
                {t.generalLanding.heroEcosystemTitle}
              </span>
            </div>

            <div className="relative grid grid-cols-3 gap-2">
              {t.generalLanding.heroImpactChips.map((item) => (
                <div
                  key={item}
                  className="airi-impact-chip border border-blue-100 bg-white/68 p-3 text-center">
                  <CheckCircle2 className="mx-auto mb-1 h-4 w-4 text-blue-600" />
                  <p className="text-[11px] font-black uppercase tracking-[0.08em] text-slate-700">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .airi-hotspot {
          pointer-events: auto;
          height: 150px;
          width: 260px;
        }

        .airi-hover-field {
          position: absolute;
          inset: 0;
          border: 1px solid rgba(36, 107, 254, 0);
          background:
            linear-gradient(
                90deg,
                rgba(36, 107, 254, 0.16) 0 18px,
                transparent 18px
              )
              0 0 / 100% 1px no-repeat,
            linear-gradient(
                90deg,
                transparent calc(100% - 18px),
                rgba(36, 107, 254, 0.16) calc(100% - 18px)
              )
              0 100% / 100% 1px no-repeat,
            linear-gradient(rgba(36, 107, 254, 0.16) 0 18px, transparent 18px) 0
              0 / 1px 100% no-repeat,
            linear-gradient(
                transparent calc(100% - 18px),
                rgba(36, 107, 254, 0.16) calc(100% - 18px)
              )
              100% 0 / 1px 100% no-repeat;
          opacity: 0;
          transform: scale(0.98);
          transition:
            opacity 220ms ease,
            transform 220ms ease,
            border-color 220ms ease,
            background-color 220ms ease;
        }

        .airi-hotspot:hover .airi-hover-field,
        .airi-hotspot:focus-within .airi-hover-field {
          background-color: rgba(255, 255, 255, 0.08);
          border-color: rgba(36, 107, 254, 0.14);
          opacity: 1;
          transform: scale(1);
        }

        .airi-float-card {
          filter: blur(10px);
          opacity: 0;
          pointer-events: none;
          transform: translate3d(
              var(--airi-float-x, 0),
              var(--airi-float-y-start, 18px),
              0
            )
            scale(0.94);
          transition:
            opacity 620ms cubic-bezier(0.22, 1, 0.36, 1),
            filter 620ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 720ms cubic-bezier(0.22, 1, 0.36, 1);
          will-change: opacity, filter, transform;
        }

        .airi-card-shell {
          box-shadow:
            0 20px 52px rgba(15, 23, 42, 0.11),
            inset 0 1px 0 rgba(255, 255, 255, 0.72);
          transition:
            border-color 260ms ease,
            box-shadow 260ms ease,
            transform 260ms ease,
            background-color 260ms ease;
        }

        .airi-hotspot:hover .airi-float-card,
        .airi-hotspot:focus-within .airi-float-card {
          animation: airi-card-float 4.8s ease-in-out infinite;
          animation-delay: 520ms;
          filter: blur(0);
          opacity: 1;
          pointer-events: auto;
          transform: translate3d(0, 0, 0) scale(1);
        }

        .airi-float-card:hover .airi-card-shell {
          background-color: rgba(255, 255, 255, 0.91);
          border-color: rgba(36, 107, 254, 0.28);
          box-shadow:
            0 26px 70px rgba(37, 99, 235, 0.18),
            inset 0 1px 0 rgba(255, 255, 255, 0.82);
          transform: translateY(-3px) scale(1.018);
        }

        .airi-card-sheen {
          opacity: 0;
          transform: skewX(-18deg) translateX(-120%);
        }

        .airi-hotspot:hover .airi-card-sheen,
        .airi-hotspot:focus-within .airi-card-sheen {
          animation: airi-card-sheen 3.6s ease-in-out infinite;
          animation-delay: 420ms;
          opacity: 1;
        }

        .airi-meter-bar {
          transform: scaleY(0.42);
          transform-origin: bottom;
          transition: transform 760ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .airi-hotspot:hover .airi-meter-bar,
        .airi-hotspot:focus-within .airi-meter-bar {
          transform: scaleY(1);
        }

        .airi-hotspot:hover .airi-status-dot,
        .airi-hotspot:focus-within .airi-status-dot {
          animation: airi-status-pulse 1.8s ease-in-out infinite;
        }

        .airi-impact-chip {
          transition:
            background-color 260ms ease,
            border-color 260ms ease,
            transform 260ms ease;
        }

        .airi-impact-chip:hover {
          background-color: rgba(255, 255, 255, 0.92);
          border-color: rgba(36, 107, 254, 0.26);
          transform: translateY(-2px);
        }

        @keyframes airi-card-float {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(0, var(--airi-float-hover, -8px), 0)
              scale(1.012);
          }
        }

        @keyframes airi-card-sheen {
          0% {
            transform: skewX(-18deg) translateX(-130%);
          }
          42%,
          100% {
            transform: skewX(-18deg) translateX(340%);
          }
        }

        @keyframes airi-status-pulse {
          0%,
          100% {
            box-shadow: 0 0 12px rgba(52, 211, 153, 0.72);
          }
          50% {
            box-shadow: 0 0 22px rgba(52, 211, 153, 0.95);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .airi-hotspot:hover .airi-float-card,
          .airi-hotspot:focus-within .airi-float-card,
          .airi-hotspot:hover .airi-card-sheen,
          .airi-hotspot:focus-within .airi-card-sheen,
          .airi-hotspot:hover .airi-status-dot,
          .airi-hotspot:focus-within .airi-status-dot {
            animation: none;
          }

          .airi-float-card,
          .airi-card-shell,
          .airi-meter-bar,
          .airi-impact-chip {
            transition-duration: 1ms;
          }
        }
      `}</style>
    </div>
  );
}

export default function Hero() {
  const { t } = useLocale();

  return (
    <section className="airi-hero relative flex min-h-svh items-center overflow-hidden bg-[#f7faff]">
      <HeroAmbient />

      {/* Rasm qismi: O'ng tomonda top va bottom to'liq egallaydi */}
      <div className="absolute bottom-0 right-0 top-0 z-3 w-full lg:w-[55%]">
        <Image
          src={HeroImag}
          alt={t.generalLanding.heroImageAlt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="theme-image-light object-cover object-[48%_center] contrast-[1.05] saturate-[1.08]"
        />
        <Image
          src={HeroImageDark}
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="theme-image-dark object-cover object-center"
        />

        {/* Mobil qurilmalar uchun fon (matn aniq o'qilishi uchun) */}
        <div className="hero-reading-overlay absolute inset-0 bg-[#f7faff]/85 lg:hidden" />

        {/* Desktop uchun rasmning chap tomonini asosiy fon rangiga silliq o'tkazuvchi gradient */}
        <div className="hero-edge-overlay absolute bottom-0 left-0 top-0 hidden w-48 bg-linear-to-r from-[#f7faff] via-[#f7faff]/70 to-transparent lg:block" />
      </div>

      <FloatingCards />

      {/* Matn qismi: Chap tomonda joylashadi */}
      <div className="container relative z-20 mx-auto w-full px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-20">
        <div className="mx-auto w-full max-w-175 text-center lg:mx-0 lg:text-left">
          <div className="mb-5 inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-blue-100 bg-white/86 px-4 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-blue-700 shadow-sm backdrop-blur-xl sm:text-xs sm:tracking-[0.16em]">
            <Sparkles className="h-4 w-4" />
            <span>{t.hero.landingBadge}</span>
          </div>

          <h1 className="font-heading text-[clamp(2.55rem,12vw,3.75rem)] font-semibold leading-[0.96] tracking-normal text-slate-950 sm:text-[4.25rem] sm:leading-[0.94] md:text-[4.75rem] lg:text-[70px] xl:text-[70px]">
            <span className="block bg-linear-to-r from-[#246BFE] via-[#0ea5e9] to-[#06b6d4] bg-clip-text text-transparent sm:inline">
              {t.hero.landingTitleFirst}
            </span>{" "}
            {t.hero.landingTitleRest}
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm font-light leading-6 text-slate-600 sm:mt-6 sm:text-base sm:leading-8 md:text-lg lg:mx-0 text-justify">
            {t.hero.landingDescription}
          </p>

          <div className="mt-7 grid grid-cols-3 gap-2 sm:mt-9 sm:gap-4">
            <CountStat
              value={25}
              accent
              label={
                <>
                  {t.hero.aiProjects}
                </>
              }
            />

            <CountStat
              value={8}
              label={
                <>
                  {t.hero.laboratories}
                </>
              }
            />

            <CountStat
              value={40}
              label={
                <>
                  {t.hero.doctoralStudents}
                </>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
