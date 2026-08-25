/** @format */

export interface Talent {
  slug: string;
  name: string;
  date: string;
  imageUrl: string;
  direction: string;
  excerpt: string;
  content: readonly string[];
  achievements: readonly string[];
}

export type TalentBase = Omit<
  Talent,
  "date" | "direction" | "excerpt" | "content" | "achievements"
>;

export const talentBase: TalentBase[] = [
  {
    slug: "boronov-nazim",
    name: "BO'RONOV NAZIM",
    imageUrl:
      "https://server.airi.uz/public_media/img/158ad3ff-aba0-4a6e-af08-7781449c1063.jpg",
  },
  {
    slug: "usmonov-otabek",
    name: "USMONOV OTABEK",
    imageUrl:
      "https://server.airi.uz/public_media/img/55040faa-fa50-4eca-b428-cde4380108b9.jpg",
  },
  {
    slug: "yetmishboyev-shaxzod",
    name: "YETMISHBOYEV SHAXZOD",
    imageUrl:
      "https://server.airi.uz/public_media/img/2b15e299-0872-4cc9-ad74-35836128b71e.jpg",
  },
];

export function getTalentBySlug(slug: string) {
  return talentBase.find((talent) => talent.slug === slug);
}
