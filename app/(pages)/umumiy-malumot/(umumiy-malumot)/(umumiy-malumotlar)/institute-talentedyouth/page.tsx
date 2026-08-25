/** @format */
"use client";

import { ProfileListingCard } from "@/app/(pages)/umumiy-malumot/(umumiy-malumot)/(umumiy-malumotlar)/_components/profile-listing-card";
import { talentBase, type Talent } from "@/common/institute-talented-youth/data";
import { useLocale } from "@/i18n";
import { BrainCircuit } from "lucide-react";
import { FC } from "react";

const TalentedYouth: FC = () => {
  const { t } = useLocale();
  const talents: Talent[] = talentBase.map((talent, index) => ({
    ...talent,
    ...t.talentedYouthPage.items[index],
  }));
  return (
    <main className="min-h-screen bg-linear-to-b from-white via-[#fbfcff] to-white py-12 text-[#111827] sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-end">
          <div>
            <h1 className="airi-section-title airi-gradient-text mt-4 max-w-4xl uppercase">
              {t.talentedYouthPage.title}
            </h1>
            <p className="airi-section-copy mt-4 max-w-3xl text-gray-600">
              {t.talentedYouthPage.description}
            </p>
          </div>

          <div className="rounded-lg border border-[#604eff]/15 bg-white p-5 shadow-[0_16px_50px_rgba(96,78,255,0.09)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-accent text-sm font-bold uppercase text-gray-500">
                  {t.talentedYouthPage.countLabel}
                </p>
                <p className="airi-gradient-text mt-1 font-heading text-4xl font-extrabold">
                  {String(talents.length).padStart(2, "0")}
                </p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#604eff]/10 text-[#604eff]">
                <BrainCircuit className="h-7 w-7" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {talents.map((talent) => (
            <ProfileListingCard
              key={talent.slug}
              href={`/umumiy-malumot/institute-talentedyouth/${talent.slug}`}
              imageUrl={talent.imageUrl}
              name={talent.name}
              title={talent.direction}
              excerpt={talent.excerpt}
              date={talent.date}
              category={t.talentedYouthPage.category}
              detailsLabel={t.common.details}
              tone="cyan"
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default TalentedYouth;
