/** @format */
"use client";

import Link from "next/link";
import {
  Building,
  Globe,
  Award,
  BookOpen,
  Briefcase,
  Users,
  ExternalLink,
} from "lucide-react";
import { Partner, partnerBase } from "@/common/data/partners-data";
import Image from "next/image";
import { useLocale } from "@/i18n";

const getIcon = (type: string) => {
  switch (type) {
    case "Government":
      return Building;
    case "Education":
      return BookOpen;
    case "Research":
      return Award;
    case "Private Sector":
      return Briefcase;
    case "International":
      return Globe;
    default:
      return Users;
  }
};

export default function PartnersPage() {
  const { t } = useLocale();
  const partners: Partner[] = partnerBase.map((partner, index) => ({
    ...partner,
    ...t.partnersPage.legacyPartners[index],
  }));
  const partnerTypeLabel = (type: string) => {
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
  };

  return (
    <section id='partners' className='relative z-10 py-20 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-16'>
          <h1 className='text-4xl md:text-5xl font-bold mb-4'>
            <span className='airi-gradient-text'>
              {t.partnersPage.title}
            </span>
          </h1>

          <p className='text-lg max-w-2xl mx-auto'>
            {t.partnersPage.subtitle}
          </p>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-12'>
          {[
            { label: t.partnersPage.strategicPartners, value: "50+" },
            { label: t.partnersPage.countries, value: "15+" },
            { label: t.partnersPage.jointProjects, value: "100+" },
            { label: t.partnersPage.yearsOfCollaboration, value: "5+" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className='backdrop-blur-sm border rounded-xl p-6 text-center
                         transform hover:scale-105 transition-all duration-300'>
              <div
                className='airi-gradient-text mb-2 text-3xl font-bold'>
                {stat.value}
              </div>
              <div className='text-sm'>{stat.label}</div>
            </div>
          ))}
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {partners.map((partner) => {
            const Icon = getIcon(partner.type);

            return (
              <Link
                key={partner.slug}
                href={`/umumiy-malumot/partners/${partner.slug}`}
                className='group backdrop-blur-sm border rounded-2xl p-6
                           transition-all duration-300 cursor-pointer
                           transform hover:-translate-y-2 hover:shadow-2xl
                           relative overflow-hidden'>
                <div className='airi-gradient-soft absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />

                <div className='relative z-10'>
                  <div className='flex items-start justify-between mb-4'>
                    <div className='text-5xl'>
                      <Image
                        src={partner.logo}
                        width={100}
                        height={100}
                        alt={partner.name}
                        unoptimized
                      />
                    </div>
                    <Icon className='h-6 w-6 text-[#604eff] transition-transform group-hover:scale-110' />
                  </div>

                  <h3
                    className='text-xl font-semibold mb-3
                                 text-gray-900 group-hover:text-[#604eff]
                                 transition-colors'>
                    {partner.name}
                  </h3>

                  <div className='mb-4'>
                    <span className='text-xs px-3 py-1.5 rounded-full border font-medium'>
                      {partnerTypeLabel(partner.type)}
                    </span>
                  </div>

                  <p className='text-sm mb-4 line-clamp-3 leading-relaxed'>
                    {partner.description}
                  </p>

                  <div className='flex items-center justify-between pt-4 border-t'>
                    <span className='text-xs'>{t.common.since} {partner.established}</span>
                    <span className='flex items-center gap-1 text-sm font-medium text-[#604eff] transition-all group-hover:gap-2'>
                      {t.partnersPage.learnMore}
                      <ExternalLink size={14} />
                    </span>
                  </div>
                </div>

                <div className='absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-[#604eff]/10 opacity-0 transition-opacity group-hover:opacity-100' />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
