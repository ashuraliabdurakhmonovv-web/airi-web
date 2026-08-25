"use client";

import Image from "next/image";
import Link from "next/link";
import { partnerLogos } from "../partners-data";
import { useLocale } from "@/i18n";

export const Partners = () => {
  const { t } = useLocale();
  const firstRowLogos = partnerLogos.filter((_, index) => index % 2 === 0);
  const secondRowLogos = partnerLogos.filter((_, index) => index % 2 === 1);

  const renderLogoRow = (
    logos: typeof partnerLogos,
    direction: "left" | "right",
  ) => (
    <div className="partner-marquee-row">
      <div
        className={`partner-marquee-track ${
          direction === "right" ? "partner-marquee-track-reverse" : ""
        }`}>
        {[...logos, ...logos].map((partner, index) => {
          const partnerName =
            t.generalLanding.partnerLogoNames[partner.nameKey];

          return (
            <Link
              key={`${partner.nameKey}-${index}`}
              href={partner.href}
              target="_blank"
              rel="noreferrer"
              title={partnerName}
              aria-label={partnerName}
              className="airi-ring partner-logo-card group flex h-24 w-48 shrink-0 items-center justify-center border bg-white px-5 transition duration-300 hover:-translate-y-1 focus-visible:-translate-y-1 sm:h-28 sm:w-56 sm:px-6">
              <Image
                src={partner.logo}
                alt={partnerName}
                className="max-h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105 group-focus-visible:scale-105 sm:max-h-16"
                sizes="(max-width: 640px) 12rem, 14rem"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-0">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="airi-gradient-text airi-section-title font-semibold">
            {t.generalLanding.partnersTitle}
          </h2>
          <p className="airi-section-copy mt-3">
            {t.generalLanding.partnersDescription}
          </p>
        </div>
      </div>

      <div className="partner-marquee relative space-y-4 overflow-hidden py-2">
        {renderLogoRow(firstRowLogos, "left")}
        {renderLogoRow(secondRowLogos, "right")}
      </div>
    </section>
  );
};
