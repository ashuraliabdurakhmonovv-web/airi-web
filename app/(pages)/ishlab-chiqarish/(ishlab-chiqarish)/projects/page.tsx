import type { Metadata } from "next";
import { pageMetadata } from "@/config/seo";
import { SiteFooter } from "../components/shared/site-footer";
import { Navigation } from "../components/landing/navigation";
import { projects } from "../lib/projects-data";
import {
  ProjectCard,
  projectGridClassName,
} from "../components/shared/project-card";
import { LocalizedText } from "@/i18n/localized-text";

export const metadata: Metadata = pageMetadata({
  title: "Loyihalar — AIRI ishlab chiqqan AI mahsulotlari",
  description:
    "AIRI tomonidan ishlab chiqilgan sun'iy intellekt yechimlari, analitik platformalar va innovatsion raqamli mahsulotlar katalogi.",
  path: "/ishlab-chiqarish/projects",
});

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Minimal header — landingdagi featured bo'limdan farqli */}
      <section className="relative pt-36 lg:pt-48">
        <div className="mx-auto max-w-350 px-6 lg:px-12">
          <span className="mb-8 inline-flex items-center gap-4 font-mono text-sm text-white/50">
            <span className="h-px w-12 bg-white/20" />
            <LocalizedText uz="Loyihalar" ru="Проекты" en="Projects" />
          </span>

          <h1 className="font-display text-[clamp(2.75rem,6.5vw,5.75rem)] leading-[0.92] tracking-tight">
            <span className="block"><LocalizedText uz="Amaliy ishlanmalar" ru="Прикладные разработки" en="Applied developments" /></span>
            <span className="block text-white/65"><LocalizedText uz="va raqamli mahsulotlar." ru="и цифровые продукты." en="and digital products." /></span>
          </h1>

          <div className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-3 border-t border-white/12 pt-8 font-mono text-sm text-white/45">
            <span>
              <span className="text-white/85">{projects.length}</span>{" "}<LocalizedText uz="loyiha" ru="проектов" en="projects" />
            </span>
            <span><LocalizedText uz="Sun'iy intellekt / analitika / platformalar" ru="Искусственный интеллект / аналитика / платформы" en="Artificial intelligence / analytics / platforms" /></span>
          </div>
        </div>
      </section>

      {/* Katalog — landing bilan bir xil vizual tizim, 3 ustun */}
      <section className="mx-auto max-w-350 px-6 pb-24 pt-16 lg:px-12 lg:pb-32 lg:pt-20">
        <div className={projectGridClassName}>
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
