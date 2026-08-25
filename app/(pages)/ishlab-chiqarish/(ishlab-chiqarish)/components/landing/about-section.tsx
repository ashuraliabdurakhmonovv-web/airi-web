"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useLocale } from "@/i18n";
import { getProductionContent } from "@/i18n/production-content";

/* -------------------------------------------------------------------------- */
/*  AIRI Production Map                                                        */
/*  Markazda AIRI, atrofida 4 ta kompetensiya, pastda 6 bosqichli jarayon rels */
/* -------------------------------------------------------------------------- */

type Node = {
  id: string;
  label: string;
  caption: string;
  /** konteyner ichidagi foizli koordinata (viewBox 0 0 100 100 bilan bir xil) */
  x: number;
  y: number;
  align: "start" | "end";
};

const nodes: Node[] = [
  {
    id: "ai",
    label: "AI Systems",
    caption: "ML, CV, NLP",
    x: 19,
    y: 20,
    align: "start",
  },
  {
    id: "data",
    label: "Data & Analytics",
    caption: "Tahlil, prognoz",
    x: 81,
    y: 20,
    align: "end",
  },
  {
    id: "software",
    label: "Software Platforms",
    caption: "Web, axborot tizimlari",
    x: 19,
    y: 80,
    align: "start",
  },
  {
    id: "integration",
    label: "Integration",
    caption: "API, avtomatlashtirish",
    x: 81,
    y: 80,
    align: "end",
  },
];

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
}

function ProductionMap({ isVisible }: { isVisible: boolean }) {
  const { locale } = useLocale();
  const mapCopy = getProductionContent(locale).about.map;
  const reducedMotion = usePrefersReducedMotion();
  const [cycleIndex, setCycleIndex] = useState(0);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    if (reducedMotion || !isVisible) return;

    const interval = setInterval(() => {
      setCycleIndex((prev) => (prev + 1) % nodes.length);
    }, 3200);

    return () => clearInterval(interval);
  }, [reducedMotion, isVisible]);

  const activeId = hovered ?? nodes[cycleIndex].id;

  return (
    <div className="w-full">
      {/* Hub */}
      <div className="relative mx-auto aspect-square w-full max-w-[34rem]">
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true">
          <circle
            cx="50"
            cy="50"
            r="31"
            fill="none"
            stroke="rgba(255,255,255,0.09)"
            strokeWidth="0.2"
            strokeDasharray="1.4 2.2"
          />
          <circle
            cx="50"
            cy="50"
            r="41"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="0.2"
          />

          {nodes.map((node) => {
            const isActive = activeId === node.id;

            return (
              <g key={node.id}>
                <line
                  x1="50"
                  y1="50"
                  x2={node.x}
                  y2={node.y}
                  stroke={
                    isActive ? "rgba(84,162,255,0.75)" : "rgba(255,255,255,0.16)"
                  }
                  strokeWidth={isActive ? 0.35 : 0.22}
                  className="transition-all duration-700"
                />
                {isActive && !reducedMotion && (
                  <line
                    x1="50"
                    y1="50"
                    x2={node.x}
                    y2={node.y}
                    stroke="rgba(255,255,255,0.9)"
                    strokeWidth="0.4"
                    strokeLinecap="round"
                    pathLength={100}
                    className="airi-map-flow"
                  />
                )}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isActive ? 1.1 : 0.7}
                  fill={isActive ? "#54a2ff" : "rgba(255,255,255,0.35)"}
                  className="transition-all duration-500"
                />
              </g>
            );
          })}
        </svg>

        {/* Markaziy tugun */}
        <div
          className={`absolute left-1/2 top-1/2 z-10 flex size-26 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/25 bg-black text-center transition-all duration-1000 sm:size-30 ${
            isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
          }`}>
          <span className="font-display text-2xl tracking-tight text-white sm:text-3xl">
            AIRI
          </span>
          <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white/40 sm:text-[10px]">
            {mapCopy.center}
          </span>
        </div>

        {/* Kompetensiya tugunlari */}
        {nodes.map((node, index) => {
          const isActive = activeId === node.id;

          return (
            <div
              key={node.id}
              onMouseEnter={() => setHovered(node.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transitionDelay: isVisible ? `${index * 90 + 200}ms` : "0ms",
              }}
              className={`absolute z-10 w-[8.5rem] -translate-x-1/2 -translate-y-1/2 border px-3 py-2.5 backdrop-blur-sm sm:w-40 sm:px-4 sm:py-3 ${
                isActive
                  ? "border-white/45 bg-white/[0.09]"
                  : "border-white/14 bg-black/70"
              } ${
                isVisible
                  ? "translate-x-[-50%] opacity-100"
                  : "translate-x-[-50%] opacity-0"
              } ${node.align === "end" ? "text-right" : "text-left"} transition-[opacity,border-color,background-color] duration-700`}>
              <span
                className={`block text-[13px] font-medium leading-tight transition-colors duration-500 sm:text-sm ${
                  isActive ? "text-white" : "text-white/72"
                }`}>
                {mapCopy.labels[index]}
              </span>
              <span className="mt-1 block font-mono text-[10px] leading-tight text-white/38 sm:text-[11px]">
                {mapCopy.captions[index]}
              </span>
            </div>
          );
        })}
      </div>

      {/* Jarayon relsi */}
      <div className="mt-10 border-t border-white/10 pt-8">
        <div className="relative mb-6 h-px w-full bg-white/12">
          {!reducedMotion && isVisible && (
            <span
              aria-hidden="true"
              className="airi-map-rail absolute -top-px left-0 h-0.5 w-16 bg-linear-to-r from-transparent via-[#54a2ff] to-transparent"
            />
          )}
        </div>

        <ol className="grid grid-cols-3 gap-x-4 gap-y-5 sm:grid-cols-6">
          {mapCopy.stages.map((stage, index) => (
            <li
              key={stage}
              style={{ transitionDelay: isVisible ? `${index * 70}ms` : "0ms" }}
              className={`transition-all duration-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-3 opacity-0"
              }`}>
              <span className="block font-mono text-[10px] text-white/30">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mt-1.5 block text-[13px] leading-tight text-white/62">
                {stage}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

export function AboutSection() {
  const { locale } = useLocale();
  const copy = getProductionContent(locale).about;
  const pillars = ["AI", "WEB", "R&D"].map((key, index) => ({ key, label: copy.pillars[index] }));
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.12 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-[oklch(0.09_0.01_260)] py-24 text-white lg:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/15 to-transparent" />

      <div className="relative z-10 mx-auto max-w-350 px-6 lg:px-12">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-20">
          {/* Chap ustun — matn */}
          <div className="lg:col-span-6">
            <span
              className={`mb-8 inline-flex items-center gap-4 font-mono text-sm text-white/45 transition-all duration-700 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}>
              <span className="h-px w-12 bg-white/20" />
              {copy.eyebrow}
            </span>

            <h2
              className={`font-display text-[clamp(2.75rem,6.5vw,5.5rem)] leading-[0.92] tracking-tight transition-all duration-1000 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}>
              <span className="block">{copy.title[0]}</span>
              <span className="block text-white/62">{copy.title[1]}</span>
              <span className="block">{copy.title[2]}</span>
            </h2>

            <div
              className={`mt-10 grid max-w-xl gap-5 text-lg leading-relaxed text-white/62 transition-all delay-100 duration-1000 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}>
              <p>{copy.paragraphs[0]}</p>
              <p>{copy.paragraphs[1]}</p>
            </div>

            <div
              className={`mt-12 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-3 ${
                isVisible ? "opacity-100" : "opacity-0"
              } transition-opacity delay-200 duration-1000`}>
              {pillars.map((pillar) => (
                <div
                  key={pillar.key}
                  className="bg-[oklch(0.09_0.01_260)] px-5 py-6">
                  <span className="font-display text-3xl tracking-tight text-white">
                    {pillar.key}
                  </span>
                  <p className="mt-2 text-sm leading-snug text-white/48">
                    {pillar.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* O'ng ustun — Production Map */}
          <div
            className={`lg:col-span-6 transition-all delay-200 duration-1000 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}>
            <ProductionMap isVisible={isVisible} />
          </div>
        </div>
      </div>
    </section>
  );
}
