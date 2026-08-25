/** @format */
"use client";

import React from "react";
import { FileText } from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/i18n";
import { relationships } from "@/common/relationships-data/relationships";

const InternationalCooperation: React.FC = () => {
  const { t } = useLocale();
  const getRelationshipName = (slug: string) => {
    const index = relationships.findIndex((item) => item.slug === slug);

    return t.internationalPage.relationshipNames[index] ?? slug;
  };

  return (
    <section className="max-w-7xl mx-auto my-12 px-4">
      <h1 className="text-2xl md:text-3xl font-bold text-center  pb-3 md:pb-6 airi-gradient-text airi-section-title mt-2">
        {t.internationalPage.title}
      </h1>

      <p className="max-w-3xl text-base leading-7 text-gray-600 lg:justify-self-end text-center mx-auto">
        {t.internationalPage.description}
      </p>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 mt-8">
        {relationships.map((partner) => {
          const name = getRelationshipName(partner.slug);

          return (
          <Link
            key={partner.slug}
            href={partner.href}
            title={`${t.internationalPage.viewMemo}: ${name}`}
            className="airi-ring group relative flex h-28 items-center justify-center rounded-2xl border bg-white px-5 transition duration-300 hover:-translate-y-1 hover:border-[#604eff] hover:shadow-lg hover:shadow-[#604eff]/10 sm:h-32 sm:px-6">
            <img
              src={partner.logo}
              alt={`${name} ${t.internationalPage.logoAltSuffix}`}
              className="max-h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105 sm:max-h-20"
              loading="lazy"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
            />
            {partner.document && (
              <FileText className="absolute top-2 right-2 w-5 h-5 text-gray-600 hover:text-gray-800" />
            )}
          </Link>
          );
        })}
      </div>
    </section>
  );
};

export default InternationalCooperation;
