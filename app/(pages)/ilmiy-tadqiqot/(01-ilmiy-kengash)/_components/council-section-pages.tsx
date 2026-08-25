/** @format */

"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Award,
  CheckCircle2,
  Landmark,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import {
  boardMembers,
  governancePillars,
  responsibilities,
} from "@/common/scientific-board/data";
import {
  councilCode,
  degreeCouncilMembers,
  specialties,
} from "@/common/scientific-council/data";
import { personImageFor } from "@/common/scientific-council/person-images";
import { useLocale } from "@/i18n/locale-provider";
import { localizeResearchInfo } from "@/i18n/research-info-locales";
import { localePath } from "@/config/pages";

const instituteAboutPath = "/ilmiy-tadqiqot/research-scientificboard/about";
const instituteCompositionPath = "/ilmiy-tadqiqot/research-scientificboard/composition";
const degreeAboutPath = "/ilmiy-tadqiqot/degree-awarding-council/about";
const degreeCompositionPath = "/ilmiy-tadqiqot/degree-awarding-council/composition";

export function InstituteCouncilAboutPage() {
  const { locale } = useLocale();
  const tr = (value: string) => localizeResearchInfo(value, locale);
  const pillars = localizeResearchInfo(governancePillars, locale);
  const duties = localizeResearchInfo(responsibilities, locale);

  return (
    <PageFrame
      eyebrow={tr("Ilmiy boshqaruv")}
      title={tr("Institut Ilmiy kengashi")}
      description={tr("Institut direktorining ilm-fan bo‘yicha maslahatchisi — Ilmiy kengash raisi rahbarligida faoliyat yurituvchi ilmiy va ilmiy-tashkiliy organ.")}
      icon={Landmark}
      sectionLinks={[
        { href: instituteAboutPath, label: tr("Kengash haqida"), active: true },
        { href: instituteCompositionPath, label: tr("Kengash tarkibi") },
      ]}
    >
      <section className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionIntro
          eyebrow={tr("Kengash haqida")}
          title={tr("Institutning ilmiy va ilmiy-tashkiliy markazi")}
          description={tr("Ilmiy kengash institutning ilmiy faoliyatini muvofiqlashtiradi, muhim ilmiy masalalarni muhokama qiladi va ilmiy-tashkiliy qarorlarni ko‘rib chiqadi.")}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {pillars.map((item) => (
            <InfoCard key={item} icon={CheckCircle2} text={item} />
          ))}
        </div>
      </section>

      <section className="mt-16">
        <SectionIntro
          eyebrow={tr("Vakolat va vazifalar")}
          title={tr("Ilmiy kengash faoliyatining asosiy yo‘nalishlari")}
          description={tr("Kengash ilmiy rejalar, doktorantura, laboratoriyalar, nashrlar, xalqaro hamkorlik va akademik sifat bilan bog‘liq masalalarni ko‘rib chiqadi.")}
          align="center"
        />
        <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {duties.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.id} className="rounded-lg border border-blue-100 bg-white/88 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.07)] transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_26px_80px_rgba(37,99,235,0.14)]">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-700">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-extrabold leading-snug text-slate-950">{item.title}</h2>
                <p className="mt-3 text-sm font-medium leading-7 text-slate-600">{item.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <Callout
        className="mt-16"
        icon={UsersRound}
        title={tr("Kengash tarkibi bilan tanishing")}
        description={tr("Institut Ilmiy kengashi tarkibidagi rahbariyat va a’zolar haqida ma’lumotlar alohida sahifada jamlangan.")}
        href={localePath(instituteCompositionPath, locale)}
        label={tr("Tarkib sahifasi")}
      />
    </PageFrame>
  );
}

export function InstituteCouncilCompositionPage() {
  const { locale } = useLocale();
  const tr = (value: string) => localizeResearchInfo(value, locale);
  const members = localizeResearchInfo(boardMembers, locale);

  return (
    <PageFrame
      eyebrow={tr("Kengash tarkibi")}
      title={tr("Institut Ilmiy kengashi tarkibi")}
      description={tr("Institutning ilmiy va ilmiy-tashkiliy faoliyatini muvofiqlashtiruvchi kengash a’zolari.")}
      icon={UsersRound}
      sectionLinks={[
        { href: instituteAboutPath, label: tr("Kengash haqida") },
        { href: instituteCompositionPath, label: tr("Kengash tarkibi"), active: true },
      ]}
    >
      <div className="mb-10 grid gap-4 sm:grid-cols-3">
        <Stat value={String(members.length)} label={tr("kengash a’zosi")} />
        <Stat value="01" label={tr("ilmiy kengash")} />
        <Stat value="AIRI" label={tr("institut")}/>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {members.map((member, index) => (
          <MemberCard
            key={member.id}
            index={index}
            name={member.fullName}
            degree={member.degree}
            role={member.position}
            description={member.researchArea}
            avatar={member.avatar}
          />
        ))}
      </div>
    </PageFrame>
  );
}

export function DegreeCouncilAboutPage() {
  const { locale } = useLocale();
  const tr = (value: string) => localizeResearchInfo(value, locale);
  const localizedSpecialties = localizeResearchInfo(specialties, locale);

  return (
    <PageFrame
      eyebrow={tr("PhD va DSc himoyalari")}
      title={tr("Ilmiy darajalar beruvchi kengash")}
      description={tr("Institut huzuridagi ilmiy darajalar beruvchi kengash dissertatsiya himoyalarini tashkil etadi va PhD hamda DSc ilmiy darajalarini berish yuzasidan qaror qabul qiladi.")}
      icon={Award}
      sectionLinks={[
        { href: degreeAboutPath, label: tr("Kengash haqida"), active: true },
        { href: degreeCompositionPath, label: tr("Kengash tarkibi") },
      ]}
    >
      <section className="grid gap-6 overflow-hidden rounded-2xl border border-blue-100 bg-white/88 p-6 text-slate-950 shadow-[0_26px_80px_rgba(15,23,42,0.10)] md:grid-cols-[1fr_auto] md:items-center md:p-9">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">{tr("Ilmiy kengash raqami")}</p>
          <p className="mt-3 break-words font-mono text-xl font-black text-slate-950 sm:text-2xl">{councilCode}</p>
          <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-slate-600">{tr("Kengash PhD va DSc dissertatsiyalarini tegishli ixtisosliklar bo‘yicha ko‘rib chiqadi.")}</p>
        </div>
        <ShieldCheck className="hidden h-16 w-16 text-blue-600 md:block" />
      </section>

      <section className="mt-16">
        <SectionIntro
          eyebrow={tr("Ixtisosliklar")}
          title={tr("Dissertatsiya himoyasi o‘tkaziladigan yo‘nalishlar")}
          description={tr("Kengash quyidagi ixtisoslik shifrlari bo‘yicha dissertatsiya ishlarini ko‘rib chiqadi.")}
          align="center"
        />
        <div className="mt-9 grid gap-5 md:grid-cols-2">
          {localizedSpecialties.map((specialty) => (
        <article key={specialty.code} className="rounded-lg border border-blue-100 bg-white/88 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.07)] transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_26px_80px_rgba(37,99,235,0.14)]">
              <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 font-mono text-sm font-black text-blue-700">{specialty.code}</span>
              <h2 className="mt-5 text-xl font-extrabold leading-snug text-slate-950">{specialty.title}</h2>
            </article>
          ))}
        </div>
      </section>

      <Callout
        className="mt-16"
        icon={UsersRound}
        title={tr("Tasdiqlangan tarkib")}
        description={tr("Kengash raisi, rais o‘rinbosari, ilmiy kotib va a’zolar tarkibi alohida sahifada berilgan.")}
        href={localePath(degreeCompositionPath, locale)}
        label={tr("Tarkib sahifasi")}
      />
    </PageFrame>
  );
}

export function DegreeCouncilCompositionPage() {
  const { locale } = useLocale();
  const tr = (value: string) => localizeResearchInfo(value, locale);
  const members = localizeResearchInfo(degreeCouncilMembers, locale);
  const localizedSpecialties = localizeResearchInfo(specialties, locale);

  return (
    <PageFrame
      eyebrow={tr("Kengash tarkibi")}
      title={tr("Ilmiy darajalar beruvchi kengash tarkibi")}
      description={tr("PhD va DSc dissertatsiyalarini ko‘rib chiquvchi ilmiy darajalar beruvchi kengash a’zolari.")}
      icon={UsersRound}
      sectionLinks={[
        { href: degreeAboutPath, label: tr("Kengash haqida") },
        { href: degreeCompositionPath, label: tr("Kengash tarkibi"), active: true },
      ]}
    >
      <div className="mb-10 grid gap-4 sm:grid-cols-3">
        <Stat value={String(members.length)} label={tr("kengash a’zosi")} />
        <Stat value={String(specialties.length)} label={tr("ixtisoslik")} />
        <Stat value="PhD/DSc" label={tr("ilmiy daraja")} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {members.map((member, index) => (
          <MemberCard
            key={member.name}
            index={index}
            name={member.name}
            degree={member.degree}
            role={member.role}
            specialty={member.specialty}
            specialtyTitle={localizedSpecialties.find((item) => item.code === member.specialty)?.title}
            avatar={personImageFor(member.name)}
          />
        ))}
      </div>
    </PageFrame>
  );
}

function PageFrame({
  eyebrow,
  title,
  description,
  icon: Icon,
  sectionLinks,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon: typeof Landmark;
  sectionLinks: Array<{ href: string; label: string; active?: boolean }>;
  children: React.ReactNode;
}) {
  const { locale } = useLocale();
  const tr = (value: string) => localizeResearchInfo(value, locale);

  return (
    <main className="min-h-screen bg-[#f7faff] text-slate-950">
      <section className="relative isolate overflow-hidden bg-[#f7faff] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_15%,rgba(14,165,233,0.14),transparent_27%),radial-gradient(circle_at_15%_85%,rgba(37,99,235,0.12),transparent_32%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(36,107,254,0.075)_1px,transparent_1px),linear-gradient(180deg,rgba(36,107,254,0.075)_1px,transparent_1px)] bg-[size:38px_38px]" />
        <div className="mx-auto max-w-7xl">
          <Link href={localePath("/ilmiy-tadqiqot", locale)} className="mb-8 inline-flex items-center gap-2 rounded-xl border border-blue-100 bg-white/86 px-4 py-2 text-sm font-extrabold text-blue-700 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white">
            <ArrowLeft className="h-4 w-4" />
            {tr("Ilmiy tadqiqot sahifasiga qaytish")}
          </Link>
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/86 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-blue-700 shadow-sm backdrop-blur">
                <Icon className="h-4 w-4" />
                {eyebrow}
              </span>
              <h1 className="font-display mt-5 max-w-5xl text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-6xl">{title}</h1>
              <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-slate-600">{description}</p>
            </div>
            <nav className="flex flex-col gap-3 sm:flex-row lg:flex-col" aria-label={tr("Kengash bo‘limlari")}>
              {sectionLinks.map((link) => (
                <Link
                  key={link.href}
                  href={localePath(link.href, locale)}
                  className={link.active
                    ? "inline-flex min-w-48 items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
                    : "inline-flex min-w-48 items-center justify-center rounded-xl border border-blue-100 bg-white/90 px-5 py-3 text-sm font-extrabold text-blue-700 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white"}
                >
                  {link.label}
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </section>
      <section className="bg-[#f7faff] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">{children}</div>
      </section>
    </main>
  );
}

function SectionIntro({ eyebrow, title, description, align = "left" }: { eyebrow: string; title: string; description: string; align?: "left" | "center" }) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-black leading-tight text-slate-950 sm:text-4xl">{title}</h2>
      <p className="mt-5 text-base font-medium leading-8 text-slate-600">{description}</p>
    </div>
  );
}

function InfoCard({ icon: Icon, text }: { icon: typeof CheckCircle2; text: string }) {
  return (
    <div className="flex gap-3 rounded-lg border border-blue-100 bg-white/88 p-5 shadow-[0_18px_55px_rgba(15,23,42,0.07)]">
      <Icon className="mt-1 h-5 w-5 shrink-0 text-emerald-600" />
      <p className="text-sm font-semibold leading-6 text-slate-700">{text}</p>
    </div>
  );
}

function Callout({ className = "", icon: Icon, title, description, href, label }: { className?: string; icon: typeof UsersRound; title: string; description: string; href: string; label: string }) {
  return (
    <div className={`${className} grid gap-6 overflow-hidden rounded-2xl border border-blue-100 bg-white/88 p-6 text-slate-950 shadow-[0_26px_80px_rgba(15,23,42,0.10)] md:grid-cols-[1fr_auto] md:items-center md:p-9`}>
      <div>
        <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-700"><Icon className="h-5 w-5" /></div>
        <h2 className="text-2xl font-black sm:text-3xl">{title}</h2>
        <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-slate-600">{description}</p>
      </div>
      <Link href={href} className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700">{label}<ArrowUpRight className="ml-2 h-4 w-4" /></Link>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg border border-blue-100 bg-white/88 p-5 shadow-[0_18px_55px_rgba(15,23,42,0.07)]">
      <p className="font-mono text-3xl font-black text-blue-700">{value}</p>
      <p className="mt-2 text-xs font-extrabold uppercase tracking-wide text-slate-500">{label}</p>
    </div>
  );
}

function MemberCard({ index, name, degree, role, description, specialty, specialtyTitle, avatar }: { index: number; name: string; degree?: string; role?: string; description?: string; specialty?: string; specialtyTitle?: string; avatar?: string }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-blue-100 bg-white/88 shadow-[0_18px_55px_rgba(15,23,42,0.07)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-[0_26px_80px_rgba(37,99,235,0.16)]">
      <div className="relative mx-3 mt-3 aspect-4/5 overflow-hidden rounded-lg bg-slate-100">
        {avatar ? <Image src={avatar} alt={name} fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw" className="object-cover object-top transition duration-500 group-hover:scale-105" /> : <MemberAvatar name={name} />}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
        <span className="absolute left-4 top-4 border border-white/20 bg-white/10 px-3 py-1 font-mono text-xs font-black text-white backdrop-blur">{String(index + 1).padStart(2, "0")}</span>
        {specialty && <span className="absolute bottom-4 left-4 border border-cyan-200/30 bg-slate-950/55 px-3 py-1 font-mono text-xs font-black text-cyan-100 backdrop-blur">{specialty}</span>}
      </div>
      <div className="flex grow flex-col p-5">
        {role && <p className="text-xs font-black uppercase tracking-wide text-blue-700">{role}</p>}
        <h2 className="mt-2 text-lg font-black leading-snug text-slate-950">{name}</h2>
        {degree && <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">{degree}</p>}
        {specialtyTitle && <p className="mt-3 text-xs font-bold leading-5 text-slate-500">{specialtyTitle}</p>}
        {description && <p className="mt-4 grow text-sm font-medium leading-7 text-slate-600">{description}</p>}
      </div>
    </article>
  );
}

function MemberAvatar({ name }: { name: string }) {
  const initials = name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
  return <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(96,78,255,0.9),rgba(15,23,42,1)_70%)] text-5xl font-black tracking-tight text-white">{initials}</div>;
}
