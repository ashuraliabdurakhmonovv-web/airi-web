/** @format */

"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpenCheck,
  ClipboardList,
  GraduationCap,
  UserRoundCheck,
  UsersRound,
} from "lucide-react";
import {
  councilCode,
  seminarPanels,
  type SeminarMember,
} from "@/common/scientific-council/data";
import { personImageFor } from "@/common/scientific-council/person-images";
import { useLocale } from "@/i18n/locale-provider";
import { localizeResearchInfo } from "@/i18n/research-info-locales";

export default function SeminarBoardPage() {
  const { locale } = useLocale();
  const tr = (value: string) => localizeResearchInfo(value, locale);

  return (
    <main className="min-h-screen bg-[#f7faff] text-slate-950">
      <section className="relative isolate overflow-hidden bg-[#f7faff] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.14),transparent_25%),radial-gradient(circle_at_15%_85%,rgba(37,99,235,0.12),transparent_30%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(36,107,254,0.075)_1px,transparent_1px),linear-gradient(180deg,rgba(36,107,254,0.075)_1px,transparent_1px)] bg-[size:38px_38px]" />

        <div className="mx-auto max-w-7xl">
          <Link
            href="/ilmiy-tadqiqot"
            className="mb-8 inline-flex items-center gap-2 rounded-xl border border-blue-100 bg-white/86 px-4 py-2 text-sm font-extrabold text-blue-700 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200"
          >
            <ArrowLeft className="h-4 w-4" />
            {tr("Ilmiy tadqiqot sahifasiga qaytish")}
          </Link>

          <header className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/86 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-blue-700 shadow-sm">
                <BookOpenCheck className="mr-2 h-4 w-4" />
                {tr("Kengash qoshidagi ilmiy seminarlar")}
              </span>
              <h1 className="font-display mt-5 max-w-4xl text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-6xl">
                {tr("Ilmiy seminarlar tarkibi")}
              </h1>
              <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-slate-600">
                {tr("Dissertatsiya ishlarini dastlabki ekspertizadan o'tkazuvchi va himoyaga tavsiya etuvchi to'rtta ixtisoslik seminari.")}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <HeroStat value="4" label={tr("ilmiy seminar")} icon={ClipboardList} />
              <HeroStat value="68" label={tr("tarkib o'rni")} icon={UsersRound} />
              <HeroStat value="PhD / DSc" label={tr("muhokama")} icon={GraduationCap} />
            </div>
          </header>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white px-4 py-6 sm:px-6 lg:px-8">
        <nav
          aria-label={tr("Ilmiy seminar ixtisosliklari")}
          className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {seminarPanels.map((panel) => (
            <Link
              key={panel.code}
              href={`#seminar-${panel.code.replaceAll(".", "-")}`}
              className="group flex items-center justify-between rounded-lg border border-blue-100 bg-white/88 px-4 py-3 shadow-[0_18px_55px_rgba(15,23,42,0.07)] transition hover:-translate-y-0.5 hover:border-blue-200"
            >
              <span>
                <span className="block font-mono text-sm font-black text-blue-700">
                  {panel.code}
                </span>
                <span className="mt-1 block text-xs font-bold text-slate-500">
                  {panel.members.length} {tr("tarkib o'rni")}
                </span>
              </span>
              <ArrowUpRight className="h-4 w-4 text-slate-400 transition group-hover:text-blue-700" />
            </Link>
          ))}
        </nav>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 overflow-hidden rounded-2xl border border-blue-100 bg-white/88 p-6 text-slate-950 shadow-[0_26px_80px_rgba(15,23,42,0.10)] lg:grid-cols-[1fr_auto] lg:items-center lg:p-9">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
              {tr("Tegishli ilmiy darajalar kengashi")}
            </p>
            <p className="mt-3 break-words font-mono text-xl font-black text-slate-950 sm:text-2xl">
              {councilCode}
            </p>
            <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-slate-600">
              {tr("Bu sahifa ilmiy darajalar beruvchi kengash tarkibi emas. Seminarlar mazkur kengash qoshida dissertatsiyalarni dastlabki muhokama qilish uchun faoliyat yuritadi.")}
            </p>
          </div>
          <Link
            href="/ilmiy-tadqiqot/degree-awarding-council/composition"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
          >
            {tr("Daraja beruvchi kengash tarkibi")}
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      <div className="bg-[#f7faff] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-12">
          {seminarPanels.map((panel, panelIndex) => (
            <section
              id={`seminar-${panel.code.replaceAll(".", "-")}`}
              key={panel.code}
              className="scroll-mt-28 overflow-hidden rounded-2xl border border-blue-100 bg-white/88 shadow-[0_18px_55px_rgba(15,23,42,0.07)]"
            >
              <header className="grid gap-6 border-b border-slate-200 bg-white p-6 sm:p-8 lg:grid-cols-[auto_1fr_auto] lg:items-start">
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600 font-mono text-lg font-black text-white">
                  {String(panelIndex + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-mono text-sm font-black text-blue-700">
                    {panel.code}
                  </p>
                  <h2 className="mt-2 max-w-4xl text-2xl font-black leading-tight text-slate-950 sm:text-3xl">
                    {tr(panel.title)}
                  </h2>
                </div>
                  <span className="h-fit rounded-full border border-cyan-200 bg-cyan-50 px-3 py-2 text-xs font-black uppercase tracking-wide text-cyan-800">
                  {panel.members.length} {tr("tarkib o'rni")}
                </span>
              </header>

              <div className="grid gap-4 border-b border-blue-100 bg-[#f8fbff] p-6 sm:grid-cols-3 sm:p-8">
                {leadershipOf(panel.members).map((member) => (
                  <LeadershipCard key={member.name} member={localizeResearchInfo(member, locale)} />
                ))}
              </div>

              <div className="px-5 pt-6 sm:px-8">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                  {tr("Seminar a'zolari")}
                </p>
              </div>

              <ol className="grid p-5 pt-4 sm:grid-cols-2 sm:px-8 sm:pb-8 lg:grid-cols-3">
                {restOf(panel.members).map((member, index) => (
                  <li
                    key={`${panel.code}-${member.name}`}
                    className="flex items-baseline gap-3 py-2.5"
                  >
                    <span className="w-6 shrink-0 font-mono text-xs font-black text-slate-300">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm font-semibold leading-6 text-slate-700">
                      {tr(member.name)}
                      {member.role === "OAK vakili" && (
                        <span className="ml-2 inline-block whitespace-nowrap bg-amber-50 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-amber-700">
                          OAK
                        </span>
                      )}
                    </p>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      </div>

    </main>
  );
}

function leadershipOf(members: SeminarMember[]) {
  return members.filter(
    (member) => member.role && member.role !== "OAK vakili",
  );
}

function restOf(members: SeminarMember[]) {
  return members.filter(
    (member) => !member.role || member.role === "OAK vakili",
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
    <div className="rounded-lg border border-blue-100 bg-white/88 p-4 text-center shadow-[0_18px_55px_rgba(15,23,42,0.07)]">
      <Icon className="mx-auto h-5 w-5 text-blue-600" />
      <p className="mt-3 font-mono text-2xl font-black text-blue-700">
        {value}
      </p>
      <p className="mt-2 text-xs font-extrabold uppercase text-slate-500">
        {label}
      </p>
    </div>
  );
}

function LeadershipCard({ member }: { member: SeminarMember }) {
  const avatar = personImageFor(member.name);

  return (
    <article className="rounded-lg border border-blue-100 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        {avatar ? (
          <div className="relative h-12 w-12 overflow-hidden rounded-full border border-blue-100 bg-slate-100">
            <Image
              src={avatar}
              alt={member.name}
              fill
              sizes="48px"
              className="object-cover object-top"
            />
          </div>
        ) : (
          <UserRoundCheck className="h-6 w-6 text-blue-700" />
        )}
        <p className="text-xs font-black uppercase tracking-wide text-blue-700">
          {member.role}
        </p>
      </div>
      <h3 className="mt-2 text-base font-black leading-6 text-slate-950">
        {member.name}
      </h3>
    </article>
  );
}
