/** @format */
"use client";

import React, { useState } from "react";
import {
  Building,
  Globe,
  Award,
  BookOpen,
  Briefcase,
  Users,
  X,
  ExternalLink,
} from "lucide-react";
import { useLocale } from "@/i18n";

interface Partner {
  name: string;
  typeKey: "government" | "education" | "research" | "privateSector" | "international";
  description: string;
  logo: string;
  established: string;
  projects: readonly string[];
  impact: string;
  website?: string;
}

export const Partners = () => {
  const { t } = useLocale();
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  const getIcon = (typeKey: Partner["typeKey"]) => {
    switch (typeKey) {
      case "government":
        return Building;
      case "education":
        return BookOpen;
      case "research":
        return Award;
      case "privateSector":
        return Briefcase;
      case "international":
        return Globe;
      default:
        return Users;
    }
  };

  const partnerMeta = [
    {
      typeKey: "government" as const,
      logo: "🏛️",
      established: "2020",
      website: "https://digital.gov.uz",
    },
    {
      typeKey: "education" as const,
      logo: "🎓",
      established: "2019",
      website: "https://tiu.uz",
    },
    {
      typeKey: "education" as const,
      logo: "💻",
      established: "2018",
      website: "https://tuit.uz",
    },
    {
      typeKey: "international" as const,
      logo: "🌎",
      established: "2024",
      website: "https://mit.edu",
    },
    {
      typeKey: "privateSector" as const,
      logo: "🔬",
      established: "2021",
    },
    {
      typeKey: "research" as const,
      logo: "🤝",
      established: "2022",
    },
  ];
  const partners: Partner[] = partnerMeta.map((partner, index) => ({
    ...partner,
    ...t.partnersPage.legacyPartners[index],
  }));

  const typeLabel = (typeKey: Partner["typeKey"]) => t.partnersPage[typeKey];

  return (
    <>
      <section
        id='partners'
        className='relative z-10 py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold mb-4'>
              <span className='airi-gradient-text'>
                {t.partnersPage.title}
              </span>
            </h2>
            <p className={` text-lg max-w-2xl mx-auto`}>
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
                className={` backdrop-blur-sm border rounded-xl p-6 text-center transform hover:scale-105 transition-all duration-300`}>
                <div className='airi-gradient-text mb-2 text-3xl font-bold'>
                  {stat.value}
                </div>
                <div className={`text-sm `}>{stat.label}</div>
              </div>
            ))}
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {partners.map((partner, index) => {
              const Icon = getIcon(partner.typeKey);
              return (
                <div
                  key={index}
                  onClick={() => setSelectedPartner(partner)}
                  className={` backdrop-blur-sm border rounded-2xl p-6  transition-all duration-300 group cursor-pointer transform hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden`}>
                  <div className='airi-gradient-soft absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100'></div>

                  <div className='relative z-10'>
                    <div className='flex items-start justify-between mb-4'>
                      <div className='text-5xl'>{partner.logo}</div>
                      <Icon className='h-6 w-6 text-[#604eff] transition-transform group-hover:scale-110' />
                    </div>

                    <h3
                      className={`text-xl font-semibold mb-3 
                       text-gray-900 group-hover:text-[#604eff]
                       transition-colors`}>
                      {partner.name}
                    </h3>

                    <div className='mb-4'>
                      <span
                        className={`text-xs px-3 py-1.5 rounded-full border font-medium `}>
                        {typeLabel(partner.typeKey)}
                      </span>
                    </div>

                    <p className={` text-sm mb-4 line-clamp-3 leading-relaxed`}>
                      {partner.description}
                    </p>

                    <div className='flex items-center justify-between pt-4 border-t border-gray-200 dark:border-slate-700'>
                      <span className={`text-xs `}>
                        {t.common.since} {partner.established}
                      </span>
                      <span className='flex items-center gap-1 text-sm font-medium text-[#604eff] transition-all group-hover:gap-2'>
                        {t.partnersPage.learnMore}
                        <ExternalLink size={14} />
                      </span>
                    </div>
                  </div>

                  <div className='absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-[#604eff]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100'></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {selectedPartner && (
        <div className='fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm'>
          <div
            className={`relative  border rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl`}>
            <div className='airi-gradient sticky top-0 z-10 rounded-t-3xl p-6 text-white'>
              <button
                onClick={() => setSelectedPartner(null)}
                className='absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors'>
                <X size={24} />
              </button>

              <div className='flex items-center gap-4 mb-4'>
                <div className='text-6xl'>{selectedPartner.logo}</div>
                <div className='flex-1'>
                  <h2 className='text-3xl font-bold mb-2'>
                    {selectedPartner.name}
                  </h2>
                  <div className='flex gap-2 flex-wrap'>
                    <span className='px-3 py-1 bg-white/20 rounded-full text-sm font-medium'>
                      {typeLabel(selectedPartner.typeKey)}
                    </span>
                    <span className='px-3 py-1 bg-white/20 rounded-full text-sm font-medium'>
                      {t.common.since} {selectedPartner.established}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className='p-8'>
              <div className='mb-8'>
                <h3
                  className={`text-xl font-semibold 
                   text-gray-900
                   mb-3`}>
                  {t.partnersPage.aboutPartnership}
                </h3>
                <p className={` leading-relaxed text-lg`}>
                  {selectedPartner.description}
                </p>
              </div>

              <div className='mb-8'>
                <h3 className={`text-xl font-semibold ${"text-gray-900"} mb-4`}>
                  {t.partnersPage.collaborativeProjects}
                </h3>
                <div className='grid md:grid-cols-2 gap-3'>
                  {selectedPartner.projects.map((project, idx) => (
                    <div
                      key={idx}
                      className={`
                        airi-gradient-soft
                       border  border-[#604eff]/15
                       rounded-lg p-4 flex items-start gap-3`}>
                      <span className='mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#604eff]/15 text-sm font-semibold text-[#604eff]'>
                        {idx + 1}
                      </span>
                      <p
                        className={` text-gray-700
                         text-sm`}>
                        {project}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className='mb-8'>
                <h3
                  className={`text-xl font-semibold 
                   text-gray-900
                   mb-3`}>
                  {t.partnersPage.impact}
                </h3>
                <div
                  className={`
                    airi-gradient-soft
                   border 
                     border-[#604eff]/15
                   rounded-xl p-6`}>
                  <p
                    className={`
                     text-[#604eff]
                     text-lg`}>
                    {selectedPartner.impact}
                  </p>
                </div>
              </div>

              {selectedPartner.website && (
                <div className='mb-8'>
                  <a
                    href={selectedPartner.website}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='airi-link inline-flex items-center gap-2 font-medium'>
                    {t.partnersPage.visitPartnerWebsite}
                    <ExternalLink size={18} />
                  </a>
                </div>
              )}

              <div className='pt-6 border-t border-gray-200 dark:border-slate-700'>
                <button
                  onClick={() => setSelectedPartner(null)}
                  className='airi-button w-full rounded-xl px-6 py-3 font-medium'>
                  {t.common.close}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
