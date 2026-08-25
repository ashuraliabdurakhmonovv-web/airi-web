import {
  ArrowLeft,
  BarChart3,
  BrainCircuit,
  Building2,
  CheckCircle2,
  FileSearch,
  Leaf,
  Map,
  ShieldCheck,
  Users,
  WalletCards,
} from "lucide-react";
import type { Metadata } from "next";
import { pageMetadata } from "@/config/seo";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "../../components/shared/site-footer";
import { Navigation } from "../../components/landing/navigation";
import { LocalizedProjectText as ProjectText } from "../../components/shared/localized-project-text";
import { LocalizedProductionText as P } from "@/i18n/localized-text";
import {
  getProjectBySlug,
  projects,
  statusStyles,
  type ProjectIcon,
} from "../../lib/projects-data";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const projectIcons: Record<ProjectIcon, typeof Building2> = {
  building: Building2,
  brain: BrainCircuit,
  shield: ShieldCheck,
  map: Map,
  wallet: WalletCards,
  chart: BarChart3,
  leaf: Leaf,
  file: FileSearch,
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return {};

  return pageMetadata({
    title: `${project.title} — ${project.sector} loyihasi`,
    description: project.shortDescription,
    path: `/ishlab-chiqarish/projects/${slug}`,
  });
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const Icon = projectIcons[project.icon];
  const otherProjects = projects.filter((item) => item.slug !== project.slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation />

      <section className="relative min-h-[82vh] overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-black/20" />
        <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/35 to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[82vh] max-w-350 flex-col justify-end px-6 py-12 lg:px-12 lg:py-20">
          <Link
            href="/ishlab-chiqarish/projects"
            className="mb-10 inline-flex w-fit items-center gap-3 border border-white/20 bg-black/30 px-4 py-2 text-sm text-white/75 backdrop-blur-md transition-colors hover:border-white/45 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <P value="Loyihalarga qaytish" />
          </Link>

          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 border border-white/20 bg-black/30 px-3 py-1.5 text-xs font-mono text-white/75 backdrop-blur-md">
              <Icon className="h-3.5 w-3.5" />
            <ProjectText project={project} type="field" field="sector" fallback={project.sector} />
            </span>
            <span className={`border px-3 py-1.5 text-xs font-mono backdrop-blur-md ${statusStyles[project.status]}`}>
              <P value={project.status} />
            </span>
            <span className="border border-white/20 bg-black/30 px-3 py-1.5 text-xs font-mono text-white/75 backdrop-blur-md">
              {project.year}
            </span>
          </div>

          <h1 className="max-w-5xl font-display text-5xl leading-[0.95] tracking-tight md:text-7xl lg:text-[110px]">
            <ProjectText project={project} type="field" field="title" fallback={project.title} />
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/72 lg:text-xl">
            <ProjectText project={project} type="field" field="shortDescription" fallback={project.shortDescription} />
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-350 gap-12 px-6 py-16 lg:grid-cols-12 lg:px-12 lg:py-24">
        <article className="lg:col-span-8">
          <span className="mb-6 inline-flex items-center gap-3 font-mono text-sm text-white/45">
            <span className="h-px w-10 bg-white/20" />
            <P value="Loyiha tavsifi" />
          </span>
          <p className="text-xl leading-9 text-white/76">
            <ProjectText project={project} type="field" field="description" fallback={project.description} />

          <div className="mt-12">
            <h2 className="font-display text-4xl tracking-tight"><P value="Asosiy imkoniyatlar" /></h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {project.capabilities.map((capability, index) => (
                <div key={capability} className="border border-white/12 bg-white/[0.03] p-4 text-white/68">
                  <span className="mr-3 font-mono text-xs text-emerald-200/70">0{index + 1}</span>
                  <ProjectText project={project} type="capability" index={index} fallback={capability} />
                </div>
              ))}
            </div>
          </div>
          </p>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {project.metrics.map((metric, index) => (
              <div key={metric.label} className="border border-white/14 bg-white/[0.04] p-5">
                <span className="font-display text-4xl text-white"><ProjectText project={project} type="metricValue" index={index} fallback={metric.value} /></span>
                <p className="mt-2 text-sm text-white/55"><ProjectText project={project} type="metricLabel" index={index} fallback={metric.label} /></p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <h2 className="font-display text-4xl tracking-tight"><P value="Ishlash bosqichlari" /></h2>
            <div className="mt-6 grid gap-4">
              {project.stages.map((stage, index) => (
                <div key={stage.title} className="grid gap-4 border border-white/14 bg-white/[0.035] p-6 md:grid-cols-[80px_1fr]">
                  <span className="font-mono text-sm text-white/38">0{index + 1}</span>
                  <div>
                    <h3 className="text-xl font-medium text-white"><ProjectText project={project} type="stageTitle" index={index} fallback={stage.title} /></h3>
                    <p className="mt-2 leading-relaxed text-white/62"><ProjectText project={project} type="stageDescription" index={index} fallback={stage.description} /></p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <h2 className="font-display text-4xl tracking-tight"><P value="Natijalar" /></h2>
            <div className="mt-6 grid gap-3">
              {project.outcomes.map((outcome, index) => (
                <div key={outcome} className="flex gap-3 border border-white/12 bg-white/[0.03] p-4 text-white/68">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-200" />
                  <span><ProjectText project={project} type="outcome" index={index} fallback={outcome} /></span>
                </div>
              ))}
            </div>
          </div>
        </article>

        <aside className="lg:col-span-4">
          <div className="sticky top-8 grid gap-5">
            <div className="border border-white/15 bg-white/[0.035] p-6">
              <span className="font-mono text-sm uppercase tracking-[0.16em] text-white/45">
                <P value="Muallif" />
              </span>
              <p className="mt-4 text-2xl font-medium text-white">{project.author}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                <P value="Loyiha konsepsiyasi, ishlab chiqilishi va amaliy joriy etilishi." />
              </p>
            </div>
            <div className="border border-white/15 bg-white/[0.035] p-6">
              <span className="inline-flex items-center gap-3 font-mono text-sm text-white/45">
                <Users className="h-4 w-4" />
                <P value="Ishtirokchilar" />
              </span>
              <h2 className="mt-4 text-2xl font-medium text-white"><ProjectText project={project} type="field" field="leadDepartment" fallback={project.leadDepartment} /></h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.participants.map((participant) => (
                  <span key={participant} className="border border-white/14 bg-black/35 px-3 py-2 text-xs text-white/62">
                    <P value={participant} />
                  </span>
                ))}
              </div>
            </div>

            <div className="border border-white/15 bg-white/[0.035] p-6">
              <h2 className="text-2xl font-medium text-white"><P value="Texnologiyalar" /></h2>
              <div className="mt-5 grid gap-2">
                {project.stack.map((item) => (
                  <span key={item} className="border border-white/12 bg-black/35 px-3 py-2 text-sm text-white/62">
                    <P value={item} />
                  </span>
                ))}
              </div>
            </div>

            <div className="border border-white/15 bg-white/[0.035] p-6">
              <h2 className="text-2xl font-medium text-white"><P value="Boshqa loyihalar" /></h2>
              <div className="mt-5 grid gap-3">
                {otherProjects.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/ishlab-chiqarish/projects/${item.slug}`}
                    className="group border border-white/12 bg-black/35 p-4 transition-colors hover:border-white/35"
                  >
                    <span className="font-mono text-xs text-white/40"><P value={item.status} /></span>
                    <h3 className="mt-2 text-lg font-medium text-white transition-transform group-hover:translate-x-1">
                      {item.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </section>

      <SiteFooter />
    </main>
  );
}
