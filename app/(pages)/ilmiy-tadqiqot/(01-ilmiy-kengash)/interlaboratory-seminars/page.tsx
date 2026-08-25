/** @format */

"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  BookOpenCheck,
  FlaskConical,
  GraduationCap,
  UsersRound,
} from "lucide-react";
import { interlaboratorySeminars } from "@/common/scientific-council/interlaboratory-seminars";
import { personImageFor } from "@/common/scientific-council/person-images";
import { useLocale } from "@/i18n/locale-provider";
import { localizeResearchInfo } from "@/i18n/research-info-locales";

export default function InterlaboratorySeminarsPage() {
  const { locale } = useLocale();
  const tr = (value: string) => localizeResearchInfo(value, locale);
  const localizedSeminars = localizeResearchInfo(interlaboratorySeminars, locale);
  const seminars = locale === "en"
    ? localizedSeminars.map((seminar) => ({
        ...seminar,
        title: `Interlaboratory scientific seminar for ${seminar.specialties.map(({ code }) => code).join(" and ")}`,
        members: seminar.members.map((member) => ({
          ...member,
          name: member.name.replace(/[ʻʼ‘’]/g, "'"),
          details: `Approved seminar member and specialist for academic field ${member.specialty}.`,
        })),
      }))
    : localizedSeminars;
  const totalMembers = seminars.reduce(
    (total, seminar) => total + seminar.members.length,
    0,
  );
  const specialtyCount = new Set(
    seminars.flatMap((seminar) => seminar.specialties.map(({ code }) => code)),
  ).size;

  return (
    <main className="min-h-screen bg-[#f7faff] text-slate-950">
      <section className="relative isolate overflow-hidden bg-[#f7faff] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.14),transparent_25%),radial-gradient(circle_at_15%_85%,rgba(37,99,235,0.12),transparent_30%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(36,107,254,0.075)_1px,transparent_1px),linear-gradient(180deg,rgba(36,107,254,0.075)_1px,transparent_1px)] bg-[size:38px_38px]" />

        <div className="mx-auto max-w-7xl">
          <Link
            href="/ilmiy-tadqiqot"
            className="mb-8 inline-flex items-center gap-2 rounded-xl border border-blue-100 bg-white/86 px-4 py-2 text-sm font-extrabold text-blue-700 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200">
            <ArrowLeft className="h-4 w-4" />
            {tr("Ilmiy kengash sahifasiga qaytish")}
          </Link>

          <header className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/86 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-blue-700 shadow-sm">
                <BookOpenCheck className="mr-2 h-4 w-4" />
                {tr("Ilmiy seminar")}
              </span>
              <h1 className="font-display mt-5 max-w-4xl text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-6xl">
                {tr("Laboratoriyalararo ilmiy seminar")}
              </h1>
              <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-slate-600">
                {tr(
                  "Ilmiy kengash tarkibidagi laboratoriyalararo ilmiy seminarlar, ularning ixtisoslik yo‘nalishlari va tarkibi.",
                )}
              </p>
              {locale === "en" ? (
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500">
                  This page presents the approved interlaboratory seminar panels, their research specialties, leadership, participating laboratories, and full membership. It helps doctoral candidates and researchers identify the appropriate academic panel for preliminary dissertation review and scientific discussion.
                </p>
              ) : null}
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <HeroStat
                value={String(seminars.length)}
                label={tr("Seminarlar")}
                icon={BookOpenCheck}
              />
              <HeroStat
                value={String(totalMembers)}
                label={tr("a’zo")}
                icon={UsersRound}
              />
              <HeroStat
                value={String(specialtyCount)}
                label={tr("Ixtisosliklar")}
                icon={GraduationCap}
              />
            </div>
          </header>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white px-4 py-6 sm:px-6 lg:px-8">
        <nav
          aria-label={tr("Laboratoriyalararo ilmiy seminar")}
          className="mx-auto grid max-w-7xl gap-3 md:grid-cols-2">
          {seminars.map((seminar, index) => (
            <Link
              key={seminar.id}
              href={`#${seminar.id}`}
              className="group flex items-center gap-4 rounded-lg border border-blue-100 bg-white/88 px-4 py-4 shadow-[0_18px_55px_rgba(15,23,42,0.07)] transition hover:-translate-y-0.5 hover:border-blue-200">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 font-mono text-sm font-black text-white">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-sm font-extrabold leading-6 text-slate-800 group-hover:text-blue-700">
                {seminar.title}
              </span>
            </Link>
          ))}
        </nav>
      </section>

      <section className="bg-[#f7faff] px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-12">
          {seminars.map((seminar, index) => (
            <SeminarSection
              key={seminar.id}
              seminar={seminar}
              index={index}
              tr={tr}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

function SeminarSection({
  seminar,
  index,
  tr,
}: {
  seminar: (typeof interlaboratorySeminars)[number];
  index: number;
  tr: (value: string) => string;
}) {
  const leadership = seminar.members.filter((member) => member.role);

  return (
    <article
      id={seminar.id}
      className="scroll-mt-28 overflow-hidden rounded-2xl border border-blue-100 bg-white/88 shadow-[0_18px_55px_rgba(15,23,42,0.07)]">
      <header className="border-b border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex flex-wrap items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#604eff] font-mono text-lg font-black text-white">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0 grow">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#604eff]">
              {tr("Laboratoriyalararo ilmiy seminar")}
            </p>
            <h2 className="mt-2 text-2xl font-black leading-tight text-slate-950 sm:text-3xl">
              {seminar.title}
            </h2>
          </div>
          <span className="border border-cyan-200 bg-cyan-50 px-3 py-2 text-xs font-black uppercase tracking-wide text-cyan-800">
            {seminar.members.length} {tr("a’zo")}
          </span>
        </div>

        <div className="mt-7 grid gap-4 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-slate-400">
              {tr("Ixtisosliklar")}
            </p>
            <div className="flex flex-wrap gap-2">
              {seminar.specialties.map((specialty) => (
                <div
                  key={specialty.code}
                  className="border border-slate-200 bg-slate-50 px-3 py-2">
                  <span className="font-mono text-xs font-black text-[#604eff]">
                    {specialty.code}
                  </span>
                  <span className="ml-2 text-sm font-semibold text-slate-700">
                    {specialty.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {seminar.laboratories && (
            <div>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                {tr("Birlashtirilgan laboratoriyalar")}
              </p>
              <div className="flex flex-wrap gap-2">
                {seminar.laboratories.map((laboratory) => (
                  <span
                    key={laboratory}
                    className="inline-flex items-center gap-2 border border-blue-100 bg-blue-50 px-3 py-2 text-sm font-semibold text-slate-700">
                    <FlaskConical className="h-4 w-4 text-blue-700" />
                    {tr(laboratory)}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      <section className="border-b border-slate-200 bg-slate-50 p-6 sm:p-8">
        <p className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-slate-400">
          {tr("Seminar rahbariyati")}
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {leadership.map((member) => (
            <article
              key={member.name}
              className="border border-[#604eff]/20 bg-white p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <MemberAvatar name={member.name} />
                <div className="min-w-0">
                  <p className="text-xs font-black uppercase tracking-wide text-[#604eff]">
                    {member.role && tr(member.role)}
                  </p>
                  <h3 className="mt-2 text-base font-black leading-6 text-slate-950">
                    {member.name}
                  </h3>
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {member.details}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="p-6 sm:p-8">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
              {tr("Seminar a’zolari")}
            </p>
            <h3 className="mt-2 text-2xl font-black text-slate-950">
              {seminar.members.length} {tr("a’zo")}
            </h3>
          </div>
          <span className="text-sm font-semibold text-slate-500">
            {tr("PDFdagi rasmiy ro‘yxat asosida")}
          </span>
        </div>

        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead>
              <tr className="border-y border-slate-200 bg-slate-50 text-xs font-black uppercase tracking-wide text-slate-500">
                <th className="w-14 px-4 py-4">№</th>
                <th className="w-64 px-4 py-4">{tr("F.I.O.")}</th>
                <th className="px-4 py-4">
                  {tr("Lavozimi, ish joyi va ilmiy darajasi")}
                </th>
                <th className="w-36 px-4 py-4">{tr("Ixtisoslik shifri")}</th>
              </tr>
            </thead>
            <tbody>
              {seminar.members.map((member, memberIndex) => (
                  <MemberTableRow
                    key={member.name}
                    member={member}
                  index={memberIndex}
                  tr={tr}
                />
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-3 lg:hidden">
          {seminar.members.map((member, memberIndex) => (
            <article
              key={member.name}
              className={[
                "border bg-white p-4",
                member.role
                  ? "border-[#604eff]/20 bg-[#604eff]/5"
                  : "border-slate-200",
              ].join(" ")}>
              <div className="flex items-start gap-3">
                <span className="font-mono text-xs font-black text-slate-300">
                  {String(memberIndex + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h4 className="font-black leading-6 text-slate-950">
                    {member.name}
                  </h4>
                  {member.role && (
                    <p className="mt-1 text-xs font-black uppercase tracking-wide text-[#604eff]">
                      {tr(member.role)}
                    </p>
                  )}
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {member.details}
                  </p>
                  <span className="mt-3 inline-flex border border-[#604eff]/20 bg-[#604eff]/5 px-2 py-1 font-mono text-xs font-black text-[#604eff]">
                    {member.specialty}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </article>
  );
}

function MemberTableRow({
  member,
  index,
  tr,
}: {
  member: (typeof interlaboratorySeminars)[number]["members"][number];
  index: number;
  tr: (value: string) => string;
}) {
  return (
    <tr
      className={[
        "border-b border-slate-100 align-top hover:bg-slate-50/80",
        member.role ? "bg-[#604eff]/5" : "",
      ].join(" ")}>
      <td className="px-4 py-4 font-mono text-xs font-black text-slate-400">
        {index + 1}
      </td>
      <td className="px-4 py-4 font-bold leading-6 text-slate-800">
        <span className="block">{member.name}</span>
        {member.role && (
          <span className="mt-1 block text-xs font-black uppercase tracking-wide text-[#604eff]">
            {tr(member.role)}
          </span>
        )}
      </td>
      <td className="px-4 py-4 text-sm font-medium leading-6 text-slate-600">
        {member.details}
      </td>
      <td className="px-4 py-4">
        <span className="inline-flex border border-[#604eff]/20 bg-[#604eff]/5 px-2 py-1 font-mono text-xs font-black text-[#604eff]">
          {member.specialty}
        </span>
      </td>
    </tr>
  );
}

function MemberAvatar({ name }: { name: string }) {
  const src = personImageFor(name);
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  return src ? (
    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-[#604eff]/15 bg-slate-100">
      <Image
        src={src}
        alt={name}
        fill
        sizes="48px"
        className="object-cover object-top"
      />
    </div>
  ) : (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-xs font-black text-slate-500">
      {initials}
    </div>
  );
}

function HeroStat({
  value,
  label,
  icon: Icon,
}: {
  value: string;
  label: string;
  icon: typeof UsersRound;
}) {
  return (
    <div className="border border-slate-200 bg-white p-4 text-center shadow-sm">
      <Icon className="mx-auto h-5 w-5 text-cyan-600" />
      <p className="mt-3 font-mono text-2xl font-black text-[#604eff]">
        {value}
      </p>
      <p className="mt-2 text-xs font-extrabold uppercase text-slate-500">
        {label}
      </p>
    </div>
  );
}
