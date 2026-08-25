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
    "flex h-24 w-48 shrink-0 items-center justify-center rounded-xl border border-white/14 bg-white/[0.06] px-5 shadow-[0_12px_36px_rgba(0,0,0,0.16)] backdrop-blur-xl outline-none transition-colors duration-300 hover:bg-white/[0.12] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#54a2ff] sm:h-28 sm:w-56 sm:px-6";

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
      className="relative overflow-hidden bg-[#050912] py-24 text-white lg:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/15 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_24%,rgba(45,212,191,0.10),transparent_30%),radial-gradient(circle_at_20%_78%,rgba(84,162,255,0.12),transparent_34%)]" />

      <div className="relative mx-auto max-w-350 px-6 lg:px-12">
        <div className="mb-10 grid gap-10 rounded-2xl border border-white/12 bg-white/[0.055] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:p-8 lg:mb-12 lg:grid-cols-12 lg:items-end lg:p-10">
          <div className="lg:col-span-7">
            <span className="mb-8 inline-flex items-center gap-4 font-mono text-sm text-white/68">
              <span className="h-px w-12 bg-white/20" />
              {copy.eyebrow}
            </span>

            <h2 className="max-w-3xl text-[clamp(2rem,3.7vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-balance">
              <span className="block">{copy.title[0]}</span>
              <span className="block text-white/82">{copy.title[1]}</span>
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="max-w-xl text-[1.05rem] leading-[1.75] text-white/78">
              {copy.description}
            </p>
          </div>
        </div>
      </div>

      <div className="partner-marquee relative space-y-4 overflow-hidden py-3">
        {renderRow(firstRow, "left")}
        {renderRow(secondRow, "right")}
      </div>
    </section>
  );
}
