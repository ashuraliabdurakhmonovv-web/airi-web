import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { pageMetadata } from "@/config/seo";
import { SiteFooter } from "../components/shared/site-footer";
import { Navigation } from "../components/landing/navigation";
import { LocalizedProductionText as P } from "@/i18n/localized-text";
import {
  departments,
  getDepartmentBySlug,
  getMembersByDepartment,
  teamMembers,
} from "../lib/team-data";

export const metadata: Metadata = pageMetadata({
  title: "Ishlab chiqarish jamoasi",
  description:
    "Sun'iy intellekt, dasturiy injiniring, ma'lumotlar tahlili va amaliy tadqiqotlar ustida ishlayotgan AIRI mutaxassislari.",
  path: "/ishlab-chiqarish/team",
});

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation />

      <section className="pt-36 lg:pt-48">
        <div className="mx-auto max-w-350 px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <span className="mb-8 inline-flex items-center gap-4 font-mono text-sm text-white/50">
                <span className="h-px w-12 bg-white/20" />
                <P value="Jamoa" />
              </span>

              <h1 className="font-display text-[clamp(2.75rem,6.5vw,5.75rem)] leading-[0.92] tracking-tight">
                <span className="block"><P value="Mahsulot ortidagi" /></span>
                <span className="block text-white/65"><P value="mutaxassislar." /></span>
              </h1>
            </div>

            <div className="lg:col-span-4">
              <p className="text-lg leading-relaxed text-white/65">
                <P value="Sun'iy intellekt, dasturiy injiniring, ma'lumotlar tahlili va amaliy tadqiqotlarni yagona mahsulotga aylantiradigan jamoa." />
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-12 gap-y-5 border-t border-white/12 pt-7 font-mono text-xs uppercase tracking-[0.14em] text-white/38">
            <span>
              <span className="mr-2 text-lg text-white/85">
                {String(teamMembers.length).padStart(2, "0")}
              </span>
              <P value="mutaxassis" />
            </span>
            <span>
              <span className="mr-2 text-lg text-white/85">
                {String(departments.length).padStart(2, "0")}
              </span>
              <P value="bo'linma" />
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-350 px-6 pb-24 pt-16 lg:px-12 lg:pb-32 lg:pt-20">
        <div className="grid border-l border-t border-white/10 lg:grid-cols-2">
          {teamMembers.map((member, index) => {
            const department = getDepartmentBySlug(member.departmentSlug);

            return (
              <article
                key={member.slug}
                className="overflow-hidden border-b border-r border-white/10 bg-black">
                <Link
                  href={`/ishlab-chiqarish/team/${member.slug}`}
                  className="group grid h-full outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#54a2ff] sm:grid-cols-[minmax(11rem,0.82fr)_minmax(0,1.18fr)]">
                  <div className="relative aspect-4/5 min-h-80 overflow-hidden sm:aspect-auto sm:min-h-[26rem]">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(min-width: 1280px) 22vw, (min-width: 640px) 40vw, 100vw"
                      className="object-cover brightness-95 transition-transform duration-[900ms] ease-out group-hover:scale-[1.025]"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent" />
                    <span className="absolute left-5 top-5 font-mono text-[10px] tracking-[0.16em] text-white/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="flex min-w-0 flex-col p-6 lg:p-8">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#54a2ff]">
                      <P value={member.level} />
                    </span>

                    <h2 className="mt-5 font-display text-[clamp(1.75rem,2.6vw,2.65rem)] leading-[1.02] tracking-tight text-white">
                      {member.name}
                    </h2>

                    <p className="mt-4 text-[15px] leading-relaxed text-white/62">
                      <P value={member.role} />
                    </p>

                    {department && (
                      <div className="mt-6 flex flex-wrap gap-2">
                        {department.focus.slice(0, 3).map((item) => (
                          <span
                            key={item}
                            className="border border-white/12 px-2 py-1 font-mono text-[10px] text-white/45">
                            <P value={item} />
                          </span>
                        ))}
                      </div>
                    )}

                    <span
                      aria-hidden="true"
                      className="mt-auto flex items-center justify-between gap-3 border-t border-white/10 pt-6 font-mono text-xs text-white/52 transition-colors group-hover:text-white">
                      <P value="Profilni ko'rish" />
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="relative bg-black py-24 lg:py-32">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/12 to-transparent" />

        <div className="mx-auto max-w-350 px-6 lg:px-12">
          <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <span className="mb-6 inline-flex items-center gap-4 font-mono text-sm text-white/50">
                <span className="h-px w-12 bg-white/20" />
                <P value="Bo'linmalar" />
              </span>
              <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[0.95] tracking-tight">
                <P value="To'rtta bo'linma," />
                <br />
                <span className="text-white/65"><P value="bitta jarayon." /></span>
              </h2>
            </div>
          </div>

          <div className="border-t border-white/12">
            {departments.map((department, index) => {
              const members = getMembersByDepartment(department.slug);

              return (
                <div
                  key={department.slug}
                  id={department.slug}
                  className="grid scroll-mt-28 gap-6 border-b border-white/12 py-8 lg:grid-cols-12 lg:gap-10 lg:py-10">
                  <div className="flex items-start gap-5 lg:col-span-5">
                    <span className="font-mono text-sm text-white/30">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-xl leading-tight tracking-tight text-white lg:text-2xl">
                        <P value={department.title} />
                      </h3>
                      {members.length > 0 && (
                        <p className="mt-3 font-mono text-[11px] text-white/38">
                          {members.length} <P value="mutaxassis" />
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="lg:col-span-7">
                    <p className="max-w-2xl leading-relaxed text-white/62">
                      <P value={department.description} />
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {department.focus.map((item) => (
                        <span
                          key={item}
                          className="border border-white/14 px-2.5 py-1 font-mono text-[11px] text-white/55">
                          <P value={item} />
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
