import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Mail, Phone } from "lucide-react";

import { pageMetadata } from "@/config/seo";
import BreadcrumbJsonLd from "@/app/_components/seo/breadcrumb-jsonld";
import PersonJsonLd from "@/app/_components/seo/person-jsonld";
import { SiteFooter } from "../../components/shared/site-footer";
import { Navigation } from "../../components/landing/navigation";
import { LocalizedProductionText as P } from "@/i18n/localized-text";
import { statusTextStyles } from "../../lib/projects-data";
import {
  getDepartmentBySlug,
  getMemberProjects,
  getTeamMemberBySlug,
  teamMembers,
  ORGANIZATION_NAME,
} from "../../lib/team-data";

type TeamMemberPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return teamMembers.map((member) => ({ slug: member.slug }));
}

export async function generateMetadata({
  params,
}: TeamMemberPageProps): Promise<Metadata> {
  const { slug } = await params;
  const member = getTeamMemberBySlug(slug);

  if (!member) return {};

  return pageMetadata({
    title: `${member.name} — ${member.role}`,
    description: member.summary,
    path: `/ishlab-chiqarish/team/${slug}`,
  });
}

/** Faqat qiymati bor qatorlar chiziladi — placeholder ishlatilmaydi. */
function MetaRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1.5 border-b border-white/12 py-5 last:border-b-0 sm:grid-cols-[10rem_1fr] sm:gap-6">
      <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/58">
        <P value={label} />
      </dt>
      <dd className="leading-[1.65] text-white/82">{children}</dd>
    </div>
  );
}

export default async function TeamMemberDetailPage({
  params,
}: TeamMemberPageProps) {
  const { slug } = await params;
  const member = getTeamMemberBySlug(slug);

  if (!member) notFound();

  const department = getDepartmentBySlug(member.departmentSlug);
  const memberProjects = getMemberProjects(member);
  const biography = member.biography ?? [];
  const otherMembers = teamMembers.filter((item) => item.slug !== member.slug);

  return (
    <main className="min-h-screen bg-[#050912] text-white">
      <PersonJsonLd
        name={member.name}
        path={`/ishlab-chiqarish/team/${slug}`}
        image={member.image.src}
        jobTitle={member.role}
        description={member.summary}
      />
      <BreadcrumbJsonLd
        path="/ishlab-chiqarish/team"
        leaf={{ name: member.name, path: `/ishlab-chiqarish/team/${slug}` }}
      />
      <Navigation />

      {/* ---------------------------------------------------------------- */}
      {/* Portret + asosiy ma'lumot                                         */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden pt-32 lg:pt-40">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(45,212,191,0.09),transparent_30%),radial-gradient(circle_at_82%_42%,rgba(84,162,255,0.15),transparent_36%)]" />
        <div className="relative mx-auto max-w-350 px-6 lg:px-12">
          <Link
            href="/ishlab-chiqarish/team"
            className="group inline-flex items-center gap-3 font-mono text-sm text-white/72 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4 transition-transform duration-500 group-hover:-translate-x-1" />
            <P value="Jamoaga qaytish" />
          </Link>

          <div className="mt-10 grid gap-10 rounded-2xl border border-white/12 bg-white/[0.055] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:p-7 lg:grid-cols-12 lg:gap-14 lg:p-9">
            <div className="lg:col-span-5">
              <div className="relative aspect-4/5 w-full overflow-hidden rounded-xl border border-white/12">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover brightness-95"
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/62">
                <P value={member.level} />
              </span>

              <h1 className="mt-5 text-[clamp(2.15rem,4vw,3.75rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-balance">
                {member.name}
              </h1>

              <p className="mt-6 max-w-xl text-[1.05rem] leading-[1.75] text-white/80">
                <P value={member.role} />
              </p>

              <dl className="mt-10 overflow-hidden rounded-xl border border-white/12 bg-[#07101e]/48 px-5">
                {department && (
                  <MetaRow label="Bo'lim"><P value={department.title} /></MetaRow>
                )}

                {member.laboratory && (
                  <MetaRow label="Laboratoriya"><P value={member.laboratory} /></MetaRow>
                )}

                {member.email && (
                  <MetaRow label="Email">
                    <a
                      href={`mailto:${member.email}`}
                      className="group inline-flex items-center gap-2 transition-colors hover:text-white">
                      <Mail className="h-4 w-4 text-white/40" />
                      {member.email}
                    </a>
                  </MetaRow>
                )}

                {member.phone && (
                  <MetaRow label="Telefon">
                    <a
                      href={`tel:${member.phone.replace(/[^\d+]/g, "")}`}
                      className="inline-flex items-center gap-2 transition-colors hover:text-white">
                      <Phone className="h-4 w-4 text-white/40" />
                      {member.phone}
                    </a>
                  </MetaRow>
                )}

                <MetaRow label="Tashkilot"><P value={ORGANIZATION_NAME} /></MetaRow>
              </dl>

              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="mt-10 inline-flex items-center gap-3 border border-white/20 px-6 py-4 text-sm font-medium text-white transition-colors hover:border-white hover:bg-white hover:text-black">
                  <P value="Bog'lanish" />
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Mutaxassis haqida                                                 */}
      {/* ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-350 px-6 pt-20 lg:px-12 lg:pt-24">
        <div className="grid gap-10 rounded-2xl border border-white/12 bg-white/[0.05] p-6 shadow-[0_20px_65px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:p-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-3">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/62 lg:sticky lg:top-28">
              <P value="Mutaxassis haqida" />
            </h2>
          </div>

          <div className="max-w-[52rem] lg:col-span-9">
            <p className="text-lg font-medium leading-[1.75] text-white/88 lg:text-xl">
              <P value={member.summary} />
            </p>

            {biography.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-6 text-[1.05rem] leading-[1.8] text-white/76">
                <P value={paragraph} />
              </p>
            ))}

            <div className="mt-12 grid gap-3">
              {member.responsibilities.map((item) => (
                <p
                  key={item}
                  className="rounded-r-lg border-l-2 border-[#54a2ff]/55 bg-white/[0.035] px-5 py-3 leading-[1.7] text-white/76">
                  <P value={item} />
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Yo'nalishlar                                                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-350 px-6 pt-20 lg:px-12 lg:pt-24">
        <div className="grid gap-10 rounded-2xl border border-white/12 bg-white/[0.05] p-6 backdrop-blur-xl sm:p-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-3">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/62">
              <P value="Yo'nalishlar" />
            </h2>
          </div>
          <div className="lg:col-span-9">
            <div className="flex flex-wrap gap-2.5">
              {member.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg border border-white/15 bg-white/[0.045] px-4 py-2.5 text-sm text-white/78">
                  <P value={skill} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Portfolio                                                         */}
      {/* ---------------------------------------------------------------- */}
      {member.portfolio.length > 0 && (
        <section className="mx-auto max-w-350 px-6 pt-20 lg:px-12 lg:pt-24">
          <div className="grid gap-10 rounded-2xl border border-white/12 bg-white/[0.05] p-6 backdrop-blur-xl sm:p-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-3">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/62">
                <P value="Portfolio" />
              </h2>
            </div>
            <div className="max-w-[52rem] lg:col-span-9">
              <div className="grid gap-5">
                {member.portfolio.map((item, index) => (
                  <div key={item} className="flex gap-5">
                    <span className="font-mono text-xs text-white/28">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="leading-[1.7] text-white/78"><P value={item} /></p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Loyihalar — faqat haqiqiy bog'lanish topilgan bo'lsa              */}
      {/* ---------------------------------------------------------------- */}
      {memberProjects.length > 0 && (
        <section className="mx-auto max-w-350 px-6 pt-20 lg:px-12 lg:pt-24">
          <div className="grid gap-10 rounded-2xl border border-white/12 bg-white/[0.05] p-6 backdrop-blur-xl sm:p-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-3">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/62">
                <P value="Loyihalar" />
              </h2>
            </div>

            <div className="lg:col-span-9">
              <div className="border-t border-white/12">
                {memberProjects.map((project) => (
                  <Link
                    key={project.slug}
                    href={`/ishlab-chiqarish/projects/${project.slug}`}
                    className="group flex items-center justify-between gap-6 border-b border-white/12 py-6 transition-colors hover:bg-white/[0.03]">
                    <span className="min-w-0">
                      <span
                        className={`block font-mono text-[11px] uppercase tracking-[0.16em] ${statusTextStyles[project.status]}`}>
                        <P value={project.status} />
                      </span>
                      <span className="mt-2 block text-xl font-semibold leading-snug tracking-[-0.02em] text-white/90 transition-all duration-500 group-hover:translate-x-1 group-hover:text-white lg:text-2xl">
                        {project.title}
                      </span>
                    </span>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-white/40 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Havolalar                                                         */}
      {/* ---------------------------------------------------------------- */}
      {member.links && member.links.length > 0 && (
        <section className="mx-auto max-w-350 px-6 pt-20 lg:px-12 lg:pt-24">
          <div className="grid gap-10 rounded-2xl border border-white/12 bg-white/[0.05] p-6 backdrop-blur-xl sm:p-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-3">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/62">
                <P value="Havolalar" />
              </h2>
            </div>
            <div className="lg:col-span-9">
              <div className="flex flex-wrap gap-3">
                {member.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/18 bg-white/[0.04] px-4 py-2.5 text-sm text-white/78 transition-colors hover:border-white hover:bg-white/[0.08] hover:text-white">
                    <P value={link.label} />
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Boshqa mutaxassislar                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-350 px-6 py-24 lg:px-12 lg:py-32">
        <div className="rounded-2xl border border-white/12 bg-white/[0.05] p-6 shadow-[0_20px_65px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:p-8">
          <h2 className="mb-8 font-mono text-[11px] uppercase tracking-[0.18em] text-white/62">
            <P value="Boshqa mutaxassislar" />
          </h2>

          <div className="grid overflow-hidden rounded-xl border border-white/12 bg-white/10 sm:grid-cols-3">
            {otherMembers.map((item) => (
              <Link
                key={item.slug}
                href={`/ishlab-chiqarish/team/${item.slug}`}
                className="group flex flex-col bg-[#07101e]/78 p-6 transition-colors hover:bg-white/[0.09]">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/38">
                  <P value={item.level} />
                </span>
                <span className="mt-3 text-xl font-semibold leading-snug tracking-[-0.02em] text-white/90 transition-all duration-500 group-hover:translate-x-1 group-hover:text-white">
                  {item.name}
                </span>
                <span className="mt-3 line-clamp-2 text-sm leading-[1.65] text-white/70">
                  <P value={item.role} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
