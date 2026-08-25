"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import {
  ProjectCard,
  projectGridClassName,
} from "../shared/project-card";
import { projects } from "../../lib/projects-data";
import { useLocale } from "@/i18n";
import { getProductionContent } from "@/i18n/production-content";

/** Landingda tanlangan loyihalar — to'liq katalog /projects sahifasida. */
const featuredSlugs = [
  "urban-city",
  "handex",
  "muhofiz-ai",
  "mlr-predictor",
  "eco-ai-platform",
  "rag-hujjat-tahlili",
  "dom-finder",
  "coin",
  "mukammal-training",
];

const selected = featuredSlugs
  .map((slug) => projects.find((project) => project.slug === slug))
  .filter((project): project is (typeof projects)[number] => Boolean(project));

export function ProjectsSection() {
  const { locale } = useLocale();
  const copy = getProductionContent(locale).projects;
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.05 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#050912] py-24 text-white lg:py-32">
      {/* Navbar'dagi "Natijalar" havolasi shu bo'limga tushadi */}
      <span id="testimonials" className="absolute -top-24 block h-px w-px" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(45,212,191,0.10),transparent_30%),radial-gradient(circle_at_82%_34%,rgba(84,162,255,0.14),transparent_34%)]" />

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
            </h2>
          </div>

          <div
            className={`lg:col-span-5 transition-all delay-100 duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}>
            <p className="max-w-xl text-[1.05rem] leading-[1.75] text-white/78">
              {copy.description}
            </p>
          </div>
        </div>

        <div className={projectGridClassName}>
          {selected.map((project, index) => (
            <div
              key={project.slug}
              style={{
                transitionDelay: isVisible ? `${index * 60 + 180}ms` : "0ms",
              }}
              className={`transition-all duration-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}>
              <ProjectCard
                project={project}
                detailsLabel={copy.details}
                displayStatus={getProductionContent(locale).projectCards.statuses[project.status]}
                displayDescription={getProductionContent(locale).projectCards.descriptions[projects.findIndex((item) => item.slug === project.slug)]}
              />
            </div>
          ))}
        </div>

        <div
          className={`mt-14 transition-all delay-500 duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}>
          <Link
            href="/ishlab-chiqarish/projects"
            className="group inline-flex items-center gap-4 border-b border-white/25 pb-3 font-display text-2xl tracking-tight text-white transition-colors hover:border-white lg:text-3xl">
            {copy.all}
            <ArrowUpRight className="h-6 w-6 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
