/** @format */
"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ArrowUpRight,
  Linkedin,
  Mail,
  Phone,
  X,
} from "lucide-react";
import { useLocale } from "@/i18n";

type SocialLink = {
  type: "phone" | "email" | "linkedin";
  url: string;
};

type TeamMember = {
  id: string;
  name: string;
  position: string;
  category: string;
  description: string;
  responsibilities: readonly string[];
  imageUrl: string;
  accent: string;
  highlight?: boolean;
  socialLinks: SocialLink[];
};

type TeamMemberBase = Omit<
  TeamMember,
  "position" | "category" | "description" | "responsibilities"
>;

const teamMemberBase: TeamMemberBase[] = [
  {
    id: "director",
    name: "Kadirov Anvarxodja Asatullayevich",
    imageUrl: "/institutJamoasi/Direktor%20Anvar.png",
    accent: "from-[#604eff] via-sky-400 to-cyan-300",
    highlight: true,
    socialLinks: [
      { type: "phone", url: "tel:+998712634198" },
      { type: "email", url: "mailto:a.kadirov@airi.uz" },
    ],
  },
  {
    id: "ravshanov-normaxmad",
    name: "Ravshanov Normaxmad",
    imageUrl: "/institutJamoasi/RavshanDomla.png",
    accent: "from-cyan-400 via-[#604eff] to-violet-400",
    socialLinks: [
      { type: "phone", url: "tel:+998712634198" },
      { type: "email", url: "mailto:n.ravshanov@airi.uz" },
    ],
  },
  {
    id: "axmedov-dilshot",
    name: "Axmedov Dilshot Dilmuradovich",
    imageUrl: "/institutJamoasi/AxmedovDomla.png",
    accent: "from-emerald-400 via-cyan-400 to-[#604eff]",
    socialLinks: [
      { type: "phone", url: "tel:+998712634198" },
      { type: "email", url: "mailto:d.akhmedov@airi.uz" },
    ],
  },
  {
    id: "baykhanov-islom",
    name: "Baykhanov Islom Ilxomjon o'g'li",
    imageUrl: "/institutJamoasi/Islomaka.png",
    accent: "from-amber-300 via-orange-400 to-[#604eff]",
    socialLinks: [
      { type: "phone", url: "tel:+998712634198" },
      { type: "email", url: "mailto:I.baykhanov@gmail.com" },
    ],
  },
  {
    id: "nuriddinov-aziz",
    name: "Nuriddinov Aziz Umidjon o'g'li",
    imageUrl: "/institutJamoasi/AzizNuriddinov.jpg",
    accent: "from-indigo-400 via-[#604eff] to-fuchsia-400",
    socialLinks: [
      { type: "phone", url: "tel:+998712634198" },
      { type: "email", url: "mailto:a.nuriddinov@airi.uz" },
    ],
  },
  {
    id: "tashtemirova-nodira",
    name: "Tashtemirova Nodira Nematillayevna",
    imageUrl: "/institutJamoasi/NodiraTashtemirova.jpg",
    accent: "from-rose-300 via-fuchsia-400 to-[#604eff]",
    socialLinks: [
      { type: "phone", url: "tel:+998712634198" },
      { type: "email", url: "mailto:i.kholmatova@airi.uz" },
    ],
  },
  {
    id: "boronov-nazim",
    name: "Bo'ronov Nazim Mustafoqulovich",
    imageUrl: "/institutJamoasi/BoronovNazim.png",
    accent: "from-sky-400 via-cyan-300 to-emerald-300",
    socialLinks: [
      { type: "phone", url: "tel:+998712634198" },
      { type: "email", url: "mailto:n.buronov@airi.uz" },
    ],
  },
 
  {
    id: "botirov-gayrat",
    name: "Botirov G'ayrat Gofirovich",
    imageUrl: "/institutJamoasi/BotirovGayrat.jpg",
    accent: "from-slate-500 via-[#604eff] to-cyan-300",
    socialLinks: [
      { type: "phone", url: "tel:+998712634198" },
      { type: "email", url: "mailto:g.botirov@airi.uz" },
    ],
  },
  {
    id: "valieva-nigora",
    name: "Valieva Nigora Shuxratovna",
    imageUrl: "/institutJamoasi/ValievaNigora.jpg",
    accent: "from-emerald-300 via-teal-400 to-[#604eff]",
    socialLinks: [
      { type: "phone", url: "tel:+998712634198" },
      { type: "email", url: "mailto:n.valiyeva@airi.uz" },
    ],
  },
  {
    id: "isxakova-laviza",
    name: "Isxakova Laviza Fuatovna",
    imageUrl: "/institutJamoasi/Laviza.jpg",
    accent: "from-red-300 via-rose-400 to-[#604eff]",
    socialLinks: [
      { type: "phone", url: "tel:+998712634198" },
      { type: "email", url: "mailto:l.isxakova@airi.uz" },
    ],
  },
  {
    id: "chotboyev-muhammad",
    name: "Cho'tboyev Muhammad Choriyevich",
    imageUrl: "/institutJamoasi/Muhammad.png",
    accent: "from-blue-400 via-[#604eff] to-cyan-300",
    socialLinks: [
      { type: "phone", url: "tel:+998712634198" },
      { type: "email", url: "mailto:m.chotboyev@airi.uz" },
    ],
  },
  {
    id: "sergeyeva-lyudmila",
    name: "Sergeyeva Lyudmila Vladimirovna",
    imageUrl: "/institutJamoasi/Lyudmila.png",
    accent: "from-fuchsia-300 via-violet-400 to-cyan-300",
    socialLinks: [
      { type: "phone", url: "tel:+998712634198" },
      { type: "email", url: "mailto:l.sergeyeva@airi.uz" },
    ],
  },
  {
    id: "tilyaev-xasan",
    name: "Tilyaev Xasan Baltabayevich",
    imageUrl: "/institutJamoasi/TilyaevXasan.jpg",
    accent: "from-lime-300 via-emerald-400 to-[#604eff]",
    socialLinks: [
      { type: "phone", url: "tel:+998712634198" },
      { type: "linkedin", url: "http://www.linkedin.com/in/xasantilyayev" },
      { type: "email", url: "mailto:x.tilyaev@airi.uz" },
    ],
  },
  {
    id: "kaxarov-shukrullo",
    name: "Kaxarov Shukrullo Sa'dullo o'g'li",
    imageUrl: "/institutJamoasi/Kaxarov%20Shukrullo.png",
    accent: "from-[#604eff] via-sky-400 to-cyan-300",
    socialLinks: [{ type: "phone", url: "tel:+998712634198" }],
  },
  {
    id: "fazilov-shavkat",
    name: "Fazilov Shavkat Xayrullayevich",
    imageUrl: "/institutJamoasi/Fazilov%20Shavkat.png",
    accent: "from-cyan-400 via-[#604eff] to-violet-400",
    socialLinks: [{ type: "phone", url: "tel:+998712634198" }],
  },
  {
    id: "fozilova-madina",
    name: "Fozilova Madina Mirxalilovna",
    imageUrl: "/institutJamoasi/Fozilova%20Madina.png",
    accent: "from-rose-300 via-fuchsia-400 to-[#604eff]",
    socialLinks: [{ type: "phone", url: "tel:+998712634198" }],
  },
  {
    id: "mirzayev-nomaz",
    name: "Mirzayev Nomaz",
    imageUrl: "/Domlalar/MirzayevNomaz.png",
    accent: "from-emerald-400 via-cyan-400 to-[#604eff]",
    socialLinks: [{ type: "phone", url: "tel:+998712634198" }],
  },
  {
    id: "boboraximov-baxtiyor",
    name: "Boboraximov Baxtiyor Ixtiyorovich",
    imageUrl: "/institutJamoasi/Boboraximov%20Baxtiyor.png",
    accent: "from-indigo-400 via-[#604eff] to-fuchsia-400",
    socialLinks: [{ type: "phone", url: "tel:+998712634198" }],
  },
  {
    id: "murodullayev-baxtiyor",
    name: "Murodullayev Bahtiyor To'lqin o'g'li",
    imageUrl: "/institutJamoasi/Murodullayev%20Baxtiyor.png",
    accent: "from-sky-400 via-cyan-300 to-emerald-300",
    socialLinks: [{ type: "phone", url: "tel:+998712634198" }],
  },
  {
    id: "azimov-baxtiyor",
    name: "Azimov Baxtiyor Magrupovich",
    imageUrl: "/Domlalar/AzimovBaxtiyor.jpg",
    accent: "from-amber-300 via-orange-400 to-[#604eff]",
    socialLinks: [{ type: "phone", url: "tel:+998712634198" }],
  },
  {
    id: "xamdamov-rustam",
    name: "Xamdamov Rustam Xamdamovich",
    imageUrl: "/Domlalar/XamdamovRustam.png",
    accent: "from-lime-300 via-emerald-400 to-[#604eff]",
    socialLinks: [{ type: "phone", url: "tel:+998712634198" }],
  },
  {
    id: "alimov-sanjar",
    name: "Alimov Sanjar Baxadirovich",
    imageUrl: "/institutJamoasi/SanjarAlimov.jpg",
    accent: "from-blue-400 via-[#604eff] to-cyan-300",
    socialLinks: [{ type: "phone", url: "tel:+998712634198" }],
  },
  {
    id: "Abdulhakimov-Hojiakbar",
    name: "Abdulhakimov Hojiakbar Nodirbek o'g'li",
    imageUrl: "/institutJamoasi/hojiakbar.png",
    accent: "from-amber-300 via-orange-400 to-[#604eff]",
    socialLinks: [
      { type: "phone", url: "tel:+99886246440" },
      { type: "email", url: "mailto:hojiakbar@airi.uz" },
    ],
  },
];

function SocialIcon({ type }: { type: SocialLink["type"] }) {
  if (type === "phone") return <Phone className="h-4 w-4" />;
  if (type === "linkedin") return <Linkedin className="h-4 w-4" />;

  return <Mail className="h-4 w-4" />;
}

function SocialLinks({ member }: { member: TeamMember }) {
  return (
    <div className="flex items-center gap-2">
      {member.socialLinks.map((link) => (
        <a
          key={`${member.id}-${link.type}`}
          href={link.url}
          onClick={(event) => event.stopPropagation()}
          target={link.type === "linkedin" ? "_blank" : undefined}
          rel={link.type === "linkedin" ? "noopener noreferrer" : undefined}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#604eff]/15 bg-white text-slate-500 transition duration-300 hover:border-[#604eff]/35 hover:bg-[#f7f8ff] hover:text-[#604eff]"
          aria-label={`${member.name} ${link.type}`}>
          <SocialIcon type={link.type} />
        </a>
      ))}
    </div>
  );
}

function TeamMemberCard({
  member,
  onOpen,
  detailsLabel,
}: {
  member: TeamMember;
  onOpen: (member: TeamMember) => void;
  detailsLabel: string;
}) {
  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onOpen(member)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen(member);
        }
      }}
      className="group relative cursor-pointer overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_16px_50px_rgba(15,23,42,0.07)] transition duration-300 hover:-translate-y-1 hover:border-[#604eff]/35 hover:shadow-[0_24px_70px_rgba(96,78,255,0.14)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#604eff]">
      <div className={`h-1.5 bg-linear-to-r ${member.accent}`} />

      <div className="p-3">
        <div className="relative aspect-[4/4.6] overflow-hidden rounded-lg bg-slate-100">
          <Image
            src={member.imageUrl}
            alt={member.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-top transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-slate-950/45 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
        </div>

        <div className="flex min-h-[12.5rem] flex-col px-2 pb-2 pt-5">
          <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-600">
            <span
              className={`h-2 w-2 rounded-full bg-linear-to-r ${member.accent}`}
            />
            {member.category}
          </div>

          <h3 className="text-[18px] font-extrabold leading-7 text-slate-950">
            {member.name}
          </h3>
          <p className="mt-2 text-[15px] font-medium leading-6 text-slate-600">
            {member.position}
          </p>

          <div className="mt-auto flex items-end justify-between gap-3 pt-5">
            <SocialLinks member={member} />
            <div className="inline-flex items-center gap-1 text-sm font-bold text-slate-400 transition duration-300 group-hover:text-[#604eff]">
              {detailsLabel}
              <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function TeamMemberModal({
  member,
  onClose,
  labels,
}: {
  member: TeamMember;
  onClose: () => void;
  labels: {
    detailsAria: (name: string) => string;
    mainResponsibilities: string;
    phone: string;
    close: string;
  };
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 px-4 py-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={labels.detailsAria(member.name)}
      onClick={onClose}>
      <div
        className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white shadow-[0_30px_100px_rgba(15,23,42,0.35)]"
        onClick={(event) => event.stopPropagation()}>
        <div className={`h-1.5 bg-linear-to-r ${member.accent}`} />

        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/90 text-slate-600 shadow-sm backdrop-blur transition hover:bg-slate-950 hover:text-white"
          aria-label={labels.close}>
          <X className="h-5 w-5" />
        </button>

        <div className="grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative min-h-[380px] bg-slate-100 lg:min-h-[620px]">
            <Image
              src={member.imageUrl}
              alt={member.name}
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-slate-950/65 to-transparent p-6">
              <span className="inline-flex items-center rounded-xl bg-white/95 px-4 py-2 text-sm font-extrabold text-slate-900 shadow-sm backdrop-blur">
                {member.category}
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            <p className="text-sm font-extrabold uppercase tracking-wider text-[#604eff]">
              {member.position}
            </p>

            <h2 className="mt-3 text-3xl font-black leading-tight text-slate-950 sm:text-4xl">
              {member.name}
            </h2>

            <p className="mt-5 text-base font-medium leading-8 text-slate-600">
              {member.description}
            </p>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-lg font-extrabold text-slate-950">
                {labels.mainResponsibilities}
              </h3>

              <ul className="mt-4 space-y-3">
                {member.responsibilities.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[15px] font-medium leading-7 text-slate-700">
                    <span
                      className={`mt-2.5 h-2 w-2 shrink-0 rounded-full bg-linear-to-r ${member.accent}`}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {member.socialLinks.map((link) => (
                <a
                  key={`modal-${member.id}-${link.type}`}
                  href={link.url}
                  target={link.type === "linkedin" ? "_blank" : undefined}
                  rel={
                    link.type === "linkedin"
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="inline-flex h-12 items-center gap-2 rounded-xl border border-[#604eff]/15 bg-white px-4 text-sm font-bold text-slate-700 shadow-sm transition hover:border-[#604eff]/35 hover:bg-[#f7f8ff] hover:text-[#604eff]">
                  <SocialIcon type={link.type} />
                  {link.type === "phone"
                    ? labels.phone
                    : link.type === "email"
                      ? "Email"
                      : "LinkedIn"}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Team() {
  const { t } = useLocale();
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const teamMembers: TeamMember[] = teamMemberBase.map((member, index) => ({
    ...member,
    ...t.teamPage.members[index],
  }));

  return (
    <main className="relative overflow-hidden bg-[#fbfcff]">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "linear-gradient(rgba(96,78,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(8,232,234,0.045) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />

        <div className="absolute left-[-120px] top-20 h-80 w-80 rounded-full bg-[#604eff]/10 blur-3xl" />
        <div className="absolute right-[-120px] top-48 h-80 w-80 rounded-full bg-cyan-300/14 blur-3xl" />
        <div className="absolute bottom-10 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-300/10 blur-3xl" />
      </div>

      <section className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto mb-10 max-w-4xl text-center">
          <h1 className="airi-gradient-text airi-section-title">
            {t.teamPage.title}
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-base font-normal leading-8 text-slate-600 sm:text-lg">
            {t.teamPage.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {teamMembers.map((member) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              onOpen={setSelectedMember}
              detailsLabel={t.common.details}
            />
          ))}
        </div>
      </section>

      {selectedMember ? (
        <TeamMemberModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
          labels={{
            detailsAria: (name) => `${name} ${t.teamPage.detailsAriaSuffix}`,
            mainResponsibilities: t.teamPage.mainResponsibilities,
            phone: t.teamPage.phone,
            close: t.common.close,
          }}
        />
      ) : null}
    </main>
  );
}
