/** @format */

export interface DissertationBase {
  slug: string;
  fullName: string;
  imageUrl: string;
  detailLink: string;
}

export interface Dissertation extends DissertationBase {
  title: string;
  bio: string;
  description: string;
  date: string;
}

export type GraduateInterviewBlock = {
  question: string;
  answer: readonly string[];
  points?: readonly string[];
};

export type GraduateDetailContent = {
  profile: readonly string[];
  interview: readonly GraduateInterviewBlock[];
  implementation: readonly string[];
  futurePlans: readonly string[];
};

export const dissertations2025Base: DissertationBase[] = [
  {
    slug: "djumayozov-umidjon-zafarjonovich",
    fullName: "Djumayozov Umidjon Zafarjonovich",
    imageUrl:
      "https://server.airi.uz/public_media/img/bb95cfd6-ad02-455f-b37b-30619a3174b6.jpg",
    detailLink: "http://airi.uz/11",
  },
  {
    slug: "aymurat-orinbaev",
    fullName: "Aymurat Baxadurovich Orinbaev",
    imageUrl:
      "https://server.airi.uz/public_media/img/429f2f88-15e5-4163-8a0e-2c8060035453.jpg",
    detailLink: "http://airi.uz/12",
  },
  {
    slug: "farxod-meliyev",
    fullName: "Farxod Meliyev",
    imageUrl:
      "https://server.airi.uz/public_media/img/f85b05aa-e79d-4748-bf9b-889347b96e02.jpg",
    detailLink: "http://airi.uz/13",
  },
  {
    slug: "ilxom-ismailov",
    fullName: "Ilxom Ismailov",
    imageUrl:
      "https://server.airi.uz/public_media/img/06fc40e2-1b7f-4d4c-8c05-0ee1a56bad68.jpg",
    detailLink: "http://airi.uz/ilxomismailov",
  },
  {
    slug: "gulstan-artikbayeva",
    fullName: "Gulstan Artikbayeva",
    imageUrl:
      "https://server.airi.uz/public_media/img/68593e17-22d1-46c9-a2c7-26a65ea544eb.jpg",
    detailLink: "http://airi.uz/gulstanartikbayeva",
  },
  {
    slug: "baxtiyor-boboraximov",
    fullName: "Baxtiyor Boboraximov",
    imageUrl:
      "https://server.airi.uz/public_media/img/003e6181-6e4e-4f11-8e77-8dafb1618275.jpg",
    detailLink: "http://airi.uz/boboraximovbaxtiyor",
  },
];

export const dissertations2024Base: DissertationBase[] = [
  {
    slug: "masudjon-eshmurodov",
    fullName: "Mas'udjon Eshmurodov",
    imageUrl:
      "https://server.airi.uz/public_media/img/dd4ce717-998f-4748-b6b9-ed95b19ca321.png",
    detailLink: "http://airi.uz/masudjoneshmurodov",
  },
  {
    slug: "qodirbek-maxarov",
    fullName: "Qodirbek Maxarov",
    imageUrl:
      "https://server.airi.uz/public_media/img/6677d5ae-0f62-4955-87db-db79336a38bd.png",
    detailLink: "http://airi.uz/qodirbekmaxarov",
  },
];

export const graduateYearSectionBase = [
  { year: "2025", items: dissertations2025Base },
  { year: "2024", items: dissertations2024Base },
];

export const allDissertationBase = graduateYearSectionBase.flatMap(
  ({ items }) => items,
);

export const getDissertationBaseBySlug = (slug: string) =>
  allDissertationBase.find((diss) => diss.slug === slug);
