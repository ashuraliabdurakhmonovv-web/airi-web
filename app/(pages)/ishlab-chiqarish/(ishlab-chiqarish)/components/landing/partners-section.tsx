"use client";

import Image from "next/image";

import { useLocale } from "@/i18n";
import { getProductionContent } from "@/i18n/production-content";
import {
  productionPartners,
  type ProductionPartner,
} from "../../lib/partners-data";

function PartnerLogo({
  partner,
  name,
}: {
  partner: ProductionPartner;
  name: string;
}) {
  const content = (
    <Image
      src={partner.logo}
      alt={name}
      className="max-h-14 w-auto max-w-full object-contain sm:max-h-16"
      sizes="(max-width: 640px) 12rem, 14rem"
    />
  );
  const className =
    "flex h-24 w-48 shrink-0 items-center justify-center border border-white/12 bg-transparent px-5 outline-none transition-colors duration-300 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#54a2ff] sm:h-28 sm:w-56 sm:px-6";

  if (partner.href) {
    return (
      <a
        href={partner.href}
        target="_blank"
        rel="noopener noreferrer"
        title={name}
        aria-label={name}
        className={className}>
        {content}
      </a>
    );
  }

  return (
    <div title={name} className={className}>
      {content}
    </div>
  );
}

export function PartnersSection() {
  const { t, locale } = useLocale();
  const copy = getProductionContent(locale).partners;
  const firstRow = productionPartners.filter((_, index) => index % 2 === 0);
  const secondRow = productionPartners.filter((_, index) => index % 2 === 1);

  const renderRow = (
    partners: ProductionPartner[],
    direction: "left" | "right",
  ) => (
    <div className="partner-marquee-row">
      <div
        className={`partner-marquee-track ${
          direction === "right" ? "partner-marquee-track-reverse" : ""
        }`}>
        {[...partners, ...partners].map((partner, index) => {
          const name = partner.nameKey
            ? t.generalLanding.partnerLogoNames[partner.nameKey]
            : (partner.name ?? "");

          return (
            <PartnerLogo
              key={`${partner.id}-${index}`}
              partner={partner}
              name={name}
            />
          );
        })}
      </div>
    </div>
  );

  return (
    <section
      id="integrations"
      className="relative overflow-hidden bg-black py-24 text-white lg:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/15 to-transparent" />

      <div className="mx-auto max-w-350 px-6 lg:px-12">
        <div className="mb-14 grid gap-10 lg:mb-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <span className="mb-8 inline-flex items-center gap-4 font-mono text-sm text-white/50">
              <span className="h-px w-12 bg-white/20" />
              {copy.eyebrow}
            </span>

            <h2 className="font-display text-[clamp(2.75rem,6.5vw,5.75rem)] leading-[0.92] tracking-tight">
              <span className="block">{copy.title[0]}</span>
              <span className="block text-white/65">{copy.title[1]}</span>
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-lg leading-relaxed text-white/65">
              {copy.description}
            </p>
          </div>
        </div>
      </div>

      <div className="partner-marquee relative space-y-4 overflow-hidden py-2">
        {renderRow(firstRow, "left")}
        {renderRow(secondRow, "right")}
      </div>
    </section>
  );
}
