/** @format */
"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  CalendarDays,
  CheckCircle2,
  Sparkle,
  UserRound,
} from "lucide-react";
import {
  getTeacherBySlug,
  teacherBase,
  type Teacher,
} from "@/common/institute-teachers/data";
import { useLocale } from "@/i18n";

export default function TeacherDetailPage() {
  const { t } = useLocale();
  const params = useParams();
  const slug = String(params?.slug || "");
  const teacherBaseItem = getTeacherBySlug(slug);
  const teacherIndex = teacherBase.findIndex((item) => item.slug === slug);
  const teacher = teacherBaseItem && teacherIndex >= 0
    ? ({
        ...teacherBaseItem,
        ...t.teachersPage.items[teacherIndex],
      } satisfies Teacher)
    : null;

  if (!teacher) {
    notFound();
    return null;
  }

  const teachers: Teacher[] = teacherBase.map((item, index) => ({
    ...item,
    ...t.teachersPage.items[index],
  }));
  const relatedTeachers = teachers.filter((item) => item.slug !== teacher.slug);

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#111827]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <Link
          href="/umumiy-malumot/institute-teachers"
          className="airi-link mb-8 inline-flex w-fit items-center gap-2 text-sm font-semibold">
          <ArrowLeft className="h-4 w-4" />
          {t.teachersPage.backToAll}
        </Link>

        <article className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          <section className="space-y-8">
            <header className="overflow-hidden rounded-lg bg-white shadow-sm">
              <div className="grid gap-0 lg:grid-cols-[360px_1fr]">
                <div className="relative min-h-[420px] bg-gray-200">
                  <Image
                    src={teacher.imageUrl}
                    alt={teacher.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 360px"
                    className="object-cover object-top"
                  />
                </div>

                <div className="flex flex-col justify-end p-6 sm:p-8 lg:p-10">
                  <div className="mb-5 flex flex-wrap gap-3">
                    <span className="inline-flex items-center gap-2 rounded-lg border border-[#604eff]/15 bg-[#604eff]/10 px-3 py-2 text-xs font-bold text-[#604eff]">
                      <Sparkle className="h-4 w-4" />
                      {t.teachersPage.category}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-600">
                      <CalendarDays className="h-4 w-4 text-blue-500" />
                      {teacher.date}
                    </span>
                  </div>

                  <h1 className="text-3xl font-bold leading-tight text-gray-950 md:text-5xl">
                    {teacher.name}
                  </h1>
                  <p className="mt-4 text-base font-semibold text-[#604eff] md:text-lg">
                    {teacher.direction}
                  </p>
                  <p className="mt-5 max-w-2xl text-base leading-8 text-gray-600">
                    {teacher.excerpt}
                  </p>
                </div>
              </div>
            </header>

            <section className="rounded-lg bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-6 flex items-center gap-2 text-xl font-bold">
                <UserRound className="h-5 w-5 text-blue-500" />
                <h2>{t.teachersPage.aboutTeacher}</h2>
              </div>

              <div className="space-y-5 text-sm leading-7 text-gray-600 md:text-base md:leading-8">
                {teacher.content.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          </section>

          <aside className="space-y-6">
            <section className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-2 text-sm font-bold">
                <Award className="h-4 w-4 text-blue-500" />
                <h2>{t.teachersPage.achievements}</h2>
              </div>

              <div className="space-y-3">
                {teacher.achievements.map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-lg border border-gray-100 bg-gray-50 p-3 text-sm leading-6 text-gray-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#604eff]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </article>

        <section className="mt-10 border-t border-gray-200 pt-8">
          <div className="grid gap-5 md:grid-cols-2">
            {relatedTeachers.slice(0, 2).map((item) => (
              <Link
                key={`bottom-${item.slug}`}
                href={`/umumiy-malumot/institute-teachers/${item.slug}`}
                className="group rounded-lg bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
                <span className="text-xs font-semibold text-gray-500">
                  {item.date}
                </span>
                <h3 className="mt-2 text-lg font-bold text-gray-950 transition group-hover:text-[#604eff]">
                  {item.name}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600">
                  {item.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#604eff]">
                  {t.common.details}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
