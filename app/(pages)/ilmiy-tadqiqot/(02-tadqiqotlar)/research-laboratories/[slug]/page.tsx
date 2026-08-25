/** @format */

import {
  getLaboratoryBySlug,
  laboratories,
  type Laboratory,
} from "@/common/lab/data";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  CheckCircle2,
  Cpu,
  Fingerprint,
  FlaskConical,
  Layers3,
  MessageSquareText,
  Microscope,
  Network,
  ScanSearch,
  Sparkles,
  Wifi,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/config/seo";
import { LocalizedResearchText as L } from "@/i18n/localized-text";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const laboratory = getLaboratoryBySlug(slug);
  if (!laboratory) return {};

  return pageMetadata({
    title: `${laboratory.name} laboratoriyasi`,
    description: laboratory.description,
    path: `/ilmiy-tadqiqot/research-laboratories/${slug}`,
  });
}

const researchTasks = [
  "Ilmiy tadqiqotlar olib borish",
  "AI modellar va algoritmlarni ishlab chiqish",
  "Amaliy loyihalarni sinovdan o‘tkazish",
  "Natijalarni prototip va texnologik yechimlarga aylantirish",
];

const profileItems = [
  {
    label: "Yo‘nalish",
    value: "Sun’iy intellekt va raqamli texnologiyalar",
  },
  {
    label: "Faoliyat turi",
    value: "Ilmiy tadqiqot va amaliy loyiha",
  },
  {
    label: "Kutiladigan natija",
    value: "Model, prototip va texnologik yechim",
  },
];

function LabIcon({
  icon,
  className,
}: {
  icon: Laboratory["icon"];
  className?: string;
}) {
  switch (icon) {
    case "fingerprint":
      return <Fingerprint className={className} />;
    case "scan":
      return <ScanSearch className={className} />;
    case "messages":
      return <MessageSquareText className={className} />;
    case "brain":
      return <BrainCircuit className={className} />;
    case "code":
      return <Cpu className={className} />;
    case "network":
      return <Network className={className} />;
    case "cpu":
      return <Cpu className={className} />;
    case "wifi":
      return <Wifi className={className} />;
    default:
      return <FlaskConical className={className} />;
  }
}

function RelatedLaboratories({ current }: { current: Laboratory }) {
  const related = laboratories
    .filter((laboratory) => laboratory.id !== current.id)
    .slice(0, 3);

  return (
    <section className="mt-14">
      <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="mb-2 text-xs font-black uppercase tracking-[0.24em] text-[#604eff]">
            <L value="Research network" />
          </p>

          <h2 className="text-2xl font-black text-gray-950 md:text-3xl">
            <L value="Boshqa laboratoriyalar" />
          </h2>
        </div>

        <p className="max-w-xl text-sm font-medium leading-7 text-gray-600">
          <L value="Institut laboratoriyalari o‘zaro bog‘langan ilmiy ekotizim sifatida ishlaydi: model, algoritm, tajriba va amaliy yechim bir zanjirga ulanadi." />
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {related.map((laboratory) => {
          return (
          <Link
            key={laboratory.id}
            href={laboratory.href}
            className="group overflow-hidden border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#604eff]/30 hover:shadow-[0_22px_70px_rgba(96,78,255,0.12)]"
          >
            <div className="h-1 bg-[linear-gradient(90deg,#604eff,#08e8ea)]" />

            <div className="p-6">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-lg border border-[#604eff]/10 bg-[#604eff]/5 text-[#604eff]">
                <LabIcon icon={laboratory.icon} className="h-7 w-7" />
              </div>

              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#604eff]">
                <L value="Research Lab" />
              </span>

              <h3 className="mt-3 line-clamp-2 text-lg font-black leading-snug text-gray-950 transition group-hover:text-[#604eff]">
                <L value={laboratory.name} />
              </h3>

              <p className="mt-3 line-clamp-3 text-sm font-medium leading-7 text-gray-600">
                <L value={laboratory.description} />
              </p>

              <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#604eff]">
                <L value="Batafsil" />
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
          );
        })}
      </div>
    </section>
  );
}

export default async function LaboratoryDetailPage({ params }: Props) {
  const { slug } = await params;
  const laboratory = getLaboratoryBySlug(slug);

  if (!laboratory) return notFound();

  const coverImage = laboratory.coverImage;
  const heroStats = [
    {
      value: laboratory.metrics.trained,
      label: "Ta'lim olganlar",
    },
    {
      value: laboratory.metrics.current,
      label: "Hozir o'qiydi",
    },
    {
      value: laboratory.metrics.teachers,
      label: "Biriktirilgan domlalar",
    },
    {
      value: laboratory.metrics.supervisors,
      label: "Ilmiy rahbarlar",
    },
  ];
  const resultStats = [
    {
      value: laboratory.metrics.projects,
      label: "Faol loyiha",
    },
    {
      value: laboratory.metrics.publications,
      label: "Ilmiy natija",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section className="relative overflow-hidden px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[#f7f9fc]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(96,78,255,0.07)_1px,transparent_1px),linear-gradient(180deg,rgba(8,232,234,0.08)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <Link
            href="/ilmiy-tadqiqot/research-laboratories"
            className="mb-8 inline-flex w-fit items-center gap-2 border border-[#604eff]/20 bg-white px-5 py-3 text-sm font-black text-[#604eff] shadow-sm transition hover:-translate-y-0.5 hover:border-[#604eff]/45"
          >
            <ArrowLeft className="h-4 w-4" />
            <L value="Barcha laboratoriyalar" />
          </Link>

          {/* Hero */}
          <header className="overflow-hidden border border-slate-200 bg-white shadow-[0_24px_90px_rgba(15,23,42,0.08)]">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="relative min-h-[360px] bg-gray-100 sm:min-h-[440px] lg:min-h-[520px]">
                <Image
                  src={coverImage}
                  alt={laboratory.alt || laboratory.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent lg:hidden" />

                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between gap-4 lg:hidden">
                  <span className="bg-white/90 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#604eff] backdrop-blur">
                    <L value="Ilmiy laboratoriya" />
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12">
                <div className="mb-6 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 border border-[#604eff]/15 bg-[#604eff]/5 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#604eff]">
                    <Microscope className="h-4 w-4" />
                    <L value="Ilmiy laboratoriya" />
                  </span>

                  <span className="inline-flex items-center gap-2 border border-cyan-500/15 bg-cyan-500/5 px-4 py-2 text-xs font-bold text-cyan-700">
                    <FlaskConical className="h-4 w-4" />
                    <L value="AI Research" />
                  </span>
                </div>

                <div className="mb-7 flex h-18 w-18 items-center justify-center rounded-lg border border-slate-200 bg-[#f7f9fc] p-4 text-[#604eff]">
                  <LabIcon icon={laboratory.icon} className="h-10 w-10" />
                </div>

                <h1 className="max-w-4xl text-3xl font-black leading-tight text-gray-950 md:text-5xl">
                  <L value={laboratory.name} />
                </h1>

                <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-gray-600 md:text-lg">
                  <L value={laboratory.description} />
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {heroStats.map((stat) => (
                    <div
                      key={stat.label}
                      className="border border-slate-200 bg-[#f7f9fc] p-4"
                    >
                      <p className="text-2xl font-black text-gray-950">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-xs font-bold leading-5 text-gray-500">
                        <L value={stat.label} />
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </header>

          {/* Main layout */}
          <article className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            <section className="space-y-8">
              {/* Focus areas */}
              <section className="border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                  <div>
                    <div className="mb-3 inline-flex items-center gap-2 border border-[#604eff]/15 bg-[#604eff]/5 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#604eff]">
                      <Layers3 className="h-4 w-4" />
                      <L value="Focus areas" />
                    </div>

                    <h2 className="text-2xl font-black text-gray-950 md:text-3xl">
                      <L value="Asosiy yo‘nalishlar" />
                    </h2>
                  </div>

                  <p className="max-w-xl text-sm font-medium leading-7 text-gray-600">
                    <L value="Laboratoriyaning asosiy yo‘nalishlari ilmiy izlanish, eksperiment va amaliy loyihalar orasidagi aniq bog‘lanishni ko‘rsatadi." />
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {laboratory.tags.map((tag) => (
                    <div
                      key={tag}
                      className="group flex items-center gap-3 border border-slate-200 bg-[#f8fafc] p-4 transition hover:border-[#604eff]/25 hover:bg-[#604eff]/5"
                    >
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-[#604eff]" />
                      <p className="text-sm font-bold leading-6 text-gray-800">
                        <L value={tag} />
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Education and supervisors */}
              <section className="border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                  <div>
                    <div className="mb-3 inline-flex items-center gap-2 border border-cyan-500/15 bg-cyan-500/5 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-cyan-700">
                      <BadgeCheck className="h-4 w-4" />
                      <L value="Academic support" />
                    </div>

                    <h2 className="text-2xl font-black text-gray-950 md:text-3xl">
                      <L value="Ta'lim va ilmiy rahbarlik" />
                    </h2>
                  </div>

                  <p className="max-w-xl text-sm font-medium leading-7 text-gray-600">
                    <L value="Bu blok laboratoriyaga biriktirilgan ustozlar, ilmiy rahbarlar va yosh tadqiqotchilar bilan olib borilayotgan amaliy tayyorgarlikni ko'rsatadi." />
                  </p>
                </div>

                <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
                  <div className="border border-slate-200 bg-[#f8fafc] p-5">
                    <h3 className="mb-4 text-lg font-black text-gray-950">
                      <L value="Talabalar va tadqiqotchilar bilan ishlar" />
                    </h3>

                    <div className="space-y-3">
                      {laboratory.education.map((item) => (
                        <div
                          key={item}
                          className="flex gap-3 border border-slate-200 bg-white p-4"
                        >
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#604eff]" />
                          <p className="text-sm font-semibold leading-7 text-gray-700">
                            <L value={item} />
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border border-slate-200 bg-[#f8fafc] p-5">
                    <h3 className="mb-4 text-lg font-black text-gray-950">
                      <L value="Biriktirilgan ilmiy rahbarlar" />
                    </h3>

                    <div className="space-y-3">
                      {laboratory.supervisors.map((supervisor) => (
                        <div
                          key={supervisor.name}
                          className="border border-slate-200 bg-white p-4"
                        >
                          <p className="text-base font-black leading-6 text-gray-950">
                            {supervisor.name}
                          </p>
                          <p className="mt-1 text-xs font-bold uppercase tracking-wide text-[#604eff]">
                            <L value={supervisor.role} />
                          </p>
                          <p className="mt-3 text-sm font-medium leading-7 text-gray-600">
                            <L value={supervisor.focus} />
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Tasks */}
              <section className="border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-7 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center border border-cyan-500/15 bg-cyan-500/5 text-cyan-700">
                    <Network className="h-6 w-6" />
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-700">
                      <L value="Mission flow" />
                    </p>
                    <h2 className="mt-1 text-2xl font-black text-gray-950 md:text-3xl">
                      <L value="Laboratoriya vazifalari" />
                    </h2>
                  </div>
                </div>

                <div className="relative grid gap-4">
                  {researchTasks.map((task, index) => (
                    <div
                      key={task}
                      className="relative border border-slate-200 bg-[#f8fafc] p-5 transition hover:border-[#604eff]/25 hover:bg-white hover:shadow-md"
                    >
                      <div className="flex gap-5">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#604eff] text-sm font-black text-white">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <div>
                          <p className="text-base font-black leading-7 text-gray-950">
                            <L value={task} />
                          </p>

                          <p className="mt-2 text-sm font-medium leading-6 text-gray-600">
                            <L value="Ushbu bosqich laboratoriya faoliyatini nazariy izlanishdan amaliy texnologik natijagacha olib boradi." />
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Methodology */}
              <section className="border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-7 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center border border-[#604eff]/15 bg-[#604eff]/5 text-[#604eff]">
                    <BrainCircuit className="h-6 w-6" />
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-[#604eff]">
                      <L value="Research pipeline" />
                    </p>
                    <h2 className="mt-1 text-2xl font-black text-gray-950 md:text-3xl">
                      <L value="Tadqiqot jarayoni" />
                    </h2>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-4">
                  {[
                    "Muammo tahlili",
                    "Model yaratish",
                    "Sinov va validatsiya",
                    "Prototipga aylantirish",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="border border-slate-200 bg-[#f8fafc] p-5"
                    >
                      <p className="text-3xl font-black text-[#604eff]/25">
                        0{index + 1}
                      </p>
                      <p className="mt-3 text-sm font-black leading-6 text-gray-950">
                        <L value={item} />
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </section>

            {/* Sidebar */}
            <aside className="space-y-6 lg:sticky lg:top-8 lg:self-start">
              <section className="border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-cyan-700">
                  <Sparkles className="h-4 w-4" />
                  <L value="Laboratoriya ko'rsatkichlari" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {resultStats.map((stat) => (
                    <div
                      key={stat.label}
                      className="border border-slate-200 bg-[#f8fafc] p-4"
                    >
                      <p className="text-2xl font-black text-gray-950">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-xs font-bold leading-5 text-gray-500">
                        <L value={stat.label} />
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-[#604eff]">
                  <BadgeCheck className="h-4 w-4" />
                  <L value="Tadqiqot profili" />
                </div>

                <div className="space-y-3">
                  {profileItems.map((item) => (
                    <div
                      key={item.label}
                      className="border border-slate-200 bg-[#f8fafc] p-4"
                    >
                      <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                        <L value={item.label} />
                      </p>
                      <p className="mt-1 text-sm font-black leading-6 text-gray-950">
                        <L value={item.value} />
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center border border-[#604eff]/15 bg-[#604eff]/5 text-[#604eff]">
                    <Layers3 className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#604eff]">
                      <L value="Outputs" />
                    </p>
                    <h2 className="text-lg font-black text-gray-950">
                      <L value="Ishlanmalar" />
                    </h2>
                  </div>
                </div>

                <div className="space-y-3">
                  {laboratory.outputs.map((item) => (
                    <div
                      key={item}
                      className="border border-slate-200 bg-[#f8fafc] px-4 py-3"
                    >
                      <p className="text-sm font-bold leading-6 text-gray-800">
                        <L value={item} />
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="overflow-hidden border border-[#604eff]/15 bg-white shadow-sm">
                <div className="h-1 bg-[linear-gradient(90deg,#604eff,#08e8ea)]" />

                <div className="p-6">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-lg bg-[#604eff]/10 text-[#604eff]">
                    <LabIcon icon={laboratory.icon} className="h-8 w-8" />
                  </div>

                  <h2 className="text-lg font-black leading-snug text-gray-950">
                    <L value={laboratory.name} />
                  </h2>

                  <p className="mt-4 text-sm font-medium leading-7 text-gray-600">
                    <L value="Laboratoriya institutning ilmiy-tadqiqot ekotizimida nazariy izlanish, tajriba va amaliy yechimlarni birlashtiradi." />
                  </p>
                </div>
              </section>

              <section className="border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center border border-cyan-500/15 bg-cyan-500/5 text-cyan-700">
                    <Sparkles className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">
                      <L value="Ecosystem" />
                    </p>
                    <h2 className="text-lg font-black text-gray-950">
                      <L value="Tadqiqot zanjiri" />
                    </h2>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    "Ilmiy g‘oya",
                    "Tajriba",
                    "Model",
                    "Amaliy yechim",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 border border-slate-200 bg-[#f8fafc] px-4 py-3"
                    >
                      <span className="flex h-7 w-7 items-center justify-center bg-[#604eff]/10 text-xs font-black text-[#604eff]">
                        {index + 1}
                      </span>
                      <p className="text-sm font-bold text-gray-800"><L value={item} /></p>
                    </div>
                  ))}
                </div>
              </section>

              <Link
                href="/ilmiy-tadqiqot/research-laboratories"
                className="inline-flex w-full items-center justify-center gap-2 bg-[#604eff] px-6 py-4 text-sm font-black text-white shadow-lg shadow-[#604eff]/20 transition hover:-translate-y-0.5 hover:bg-[#4d3ce6]"
              >
                <L value="Laboratoriyalar ro‘yxati" />
                <ArrowRight className="h-4 w-4" />
              </Link>
            </aside>
          </article>

          <RelatedLaboratories current={laboratory} />

          {/* Bottom CTA */}
          <section className="mt-14 overflow-hidden border border-[#604eff]/15 bg-white p-8 text-center shadow-[0_24px_90px_rgba(15,23,42,0.08)] md:p-12">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center border border-[#604eff]/15 bg-[#604eff]/5 text-[#604eff]">
              <Sparkles className="h-8 w-8" />
            </div>

            <h2 className="mx-auto max-w-3xl text-3xl font-black leading-tight text-gray-950 md:text-4xl">
              <L value="Ilmiy g‘oya laboratoriyada modelga, model esa real yechimga aylanadi" />
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm font-medium leading-7 text-gray-600 md:text-base">
              <L value="Laboratoriya sahifasi tadqiqot yo‘nalishi, vazifalar, texnologik profil va institutdagi ilmiy ekotizim bilan bog‘liqlikni aniq ko‘rsatadi." />
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}

export function generateStaticParams() {
  return laboratories.map((laboratory) => ({
    slug: laboratory.id,
  }));
}
