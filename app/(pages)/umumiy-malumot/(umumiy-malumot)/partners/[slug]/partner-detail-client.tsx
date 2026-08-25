/** @format */
"use client";

import { Partner, partnerBase } from "@/common/data/partners-data";
import { useLocale } from "@/i18n";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type PartnerDetailClientProps = {
  slug: string;
};

function partnerTypeLabel(type: string, t: ReturnType<typeof useLocale>["t"]) {
  switch (type) {
    case "Government":
      return t.partnersPage.government;
    case "Education":
      return t.partnersPage.education;
    case "Research":
      return t.partnersPage.research;
    case "Private Sector":
      return t.partnersPage.privateSector;
    case "International":
      return t.partnersPage.international;
    default:
      return type;
  }
}

export default function PartnerDetailClient({ slug }: PartnerDetailClientProps) {
  const { t } = useLocale();
  const partners: Partner[] = partnerBase.map((partner, index) => ({
    ...partner,
    ...t.partnersPage.legacyPartners[index],
  }));
  const partner = partners.find((item: Partner) => item.slug === slug);

  if (!partner) {
    notFound();
    return null;
  }

  return (
    <section className="min-h-screen bg-gray-50 px-6 py-16 text-gray-900">
      <div className="mx-auto mt-12 max-w-5xl">
        <h1 className="mb-3 text-center text-4xl font-bold">
          {partner.name}
        </h1>

        <div className="mb-6 flex flex-wrap justify-center gap-3">
          <span className="rounded-full border bg-white px-3 py-1 text-sm">
            {partnerTypeLabel(partner.type, t)}
          </span>
          <span className="rounded-full border bg-white px-3 py-1 text-sm">
            {t.common.since} {partner.established}
          </span>
        </div>

        <p className="mx-auto mb-10 max-w-3xl text-center leading-relaxed text-gray-700">
          {partner.description}
        </p>

        <div className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold">
            {t.partnersPage.collaborativeProjects}
          </h2>

          <ul className="list-inside list-decimal space-y-3">
            {partner.projects.map((project, idx) => (
              <li
                key={`${partner.slug}-${idx}`}
                className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
              >
                {project}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold">
            {t.partnersPage.impact}
          </h2>

          <div className="airi-gradient-soft rounded-lg border border-[#604eff]/15 p-5 text-[#604eff] shadow-sm">
            {partner.impact}
          </div>
        </div>

        {partner.website ? (
          <div className="mb-12 text-center">
            <a
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="airi-link inline-flex items-center gap-2 font-medium"
            >
              {t.partnersPage.visitPartnerWebsite}
              <ExternalLink size={18} />
            </a>
          </div>
        ) : null}

        <div className="mt-12 text-center">
          <Link
            href="/umumiy-malumot"
            className="airi-button inline-flex rounded-xl px-6 py-3 font-medium"
          >
            {t.common.backToHome}
          </Link>
        </div>
      </div>
    </section>
  );
}
