"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { statusTextStyles, type Project } from "../../lib/projects-data";
import { projects } from "../../lib/projects-data";
import { useLocale } from "@/i18n";
import { getProductionContent } from "@/i18n/production-content";

/**
 * Landing va `/projects` katalogi uchun yagona karta.
 * Barcha kartalar bir xil strukturaga va vizual og'irlikka ega — featured
 * variant yo'q.
 *
 * Semantika: butun karta bitta `<a>` hisoblanadi. Shu sabab rasm, matn yoki
 * bo'sh joyning istalgan qismiga bir marta bosish loyiha sahifasini ochadi.
 */
export function ProjectCard({ project, detailsLabel = "Batafsil", displayStatus, displayDescription }: { project: Project; detailsLabel?: string; displayStatus?: string; displayDescription?: string }) {
  const { locale } = useLocale();
  const content = getProductionContent(locale);
  // `findIndex` noma'lum slug uchun -1 qaytaradi; `descriptions[-1]` esa
  // `undefined` bo'lib, tavsif jimgina yo'qolardi. Bunday holda loyihaning
  // o'z tavsifiga tushamiz.
  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const localizedStatus = displayStatus ?? content.projectCards.statuses[project.status];
  const localizedDescription =
    displayDescription ??
    (projectIndex >= 0 ? content.projectCards.descriptions[projectIndex] : project.shortDescription);
  const localizedDetails = detailsLabel === "Batafsil" ? content.projects.details : detailsLabel;

  return (
    <article className="h-full bg-white/[0.055] backdrop-blur-xl transition-colors duration-500 hover:bg-white/[0.085]">
      <Link
        href={`/ishlab-chiqarish/projects/${project.slug}`}
        className="group flex h-full flex-col outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#54a2ff]">
        <div className="relative aspect-4/3 overflow-hidden">
          <Image
            src={project.image}
            alt={`${project.title} loyihasi`}
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 48vw, 100vw"
            className="object-cover brightness-95 transition-transform duration-[900ms] ease-out group-hover:scale-[1.02]"
          />
          <div className="absolute inset-x-0 bottom-0 h-14 bg-linear-to-t from-black/55 to-transparent" />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-[11px] uppercase tracking-[0.16em]">
            <span className={statusTextStyles[project.status]}>
              {localizedStatus}
            </span>
            <span className="text-white/50">{project.sector}</span>
          </div>

          <h3 className="mt-4 text-xl font-semibold leading-[1.3] tracking-[-0.02em] text-white">
            {project.title}
          </h3>

          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-white/42">
            {project.author}
          </p>

          <p className="mt-3 line-clamp-3 flex-1 text-[15px] leading-[1.65] text-white/76">
            {localizedDescription ?? project.shortDescription}
          </p>

          <span
            aria-hidden="true"
            className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-white/55 transition-colors group-hover:text-white">
          {localizedDetails}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    </article>
  );
}

/** Grid: >=1280px 3 ustun, 768–1279px 2 ustun, <768px 1 ustun. */
export const projectGridClassName =
  "grid gap-[5px] overflow-hidden rounded-2xl border border-white/12 bg-white/[0.025] p-[5px] shadow-[0_24px_80px_rgba(0,0,0,0.20)] md:grid-cols-2 xl:grid-cols-3";
