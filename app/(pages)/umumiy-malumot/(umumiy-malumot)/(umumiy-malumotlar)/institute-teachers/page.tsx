/** @format */
"use client";

import { ProfileListingCard } from "@/app/(pages)/umumiy-malumot/(umumiy-malumot)/(umumiy-malumotlar)/_components/profile-listing-card";
import { teacherBase, type Teacher } from "@/common/institute-teachers/data";
import { useLocale } from "@/i18n";
import { GraduationCap } from "lucide-react";
import { FC } from "react";

const InstituteTeachers: FC = () => {
  const { t } = useLocale();
  const teachers: Teacher[] = teacherBase.map((teacher, index) => ({
    ...teacher,
    ...t.teachersPage.items[index],
  }));
  return (
    <main className="min-h-screen bg-linear-to-b from-white via-[#fbfcff] to-white py-12 text-[#111827] sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-end">
          <div>
            <h1 className="airi-section-title airi-gradient-text mt-4 max-w-4xl uppercase">
              {t.teachersPage.title}
            </h1>
            <p className="airi-section-copy mt-4 max-w-3xl text-gray-600">
              {t.teachersPage.description}
            </p>
          </div>

          <div className="rounded-lg border border-[#604eff]/15 bg-white p-5 shadow-[0_16px_50px_rgba(96,78,255,0.09)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-accent text-sm font-bold uppercase text-gray-500">
                  {t.teachersPage.countLabel}
                </p>
                <p className="airi-gradient-text mt-1 font-heading text-4xl font-extrabold">
                  {String(teachers.length).padStart(2, "0")}
                </p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#604eff]/10 text-[#604eff]">
                <GraduationCap className="h-7 w-7" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {teachers.map((teacher) => (
            <ProfileListingCard
              key={teacher.slug}
              href={`/umumiy-malumot/institute-teachers/${teacher.slug}`}
              imageUrl={teacher.imageUrl}
              name={teacher.name}
              title={teacher.direction}
              excerpt={teacher.excerpt}
              date={teacher.date}
              category={t.teachersPage.category}
              detailsLabel={t.common.details}
              tone="violet"
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default InstituteTeachers;
