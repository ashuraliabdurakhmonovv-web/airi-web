/** @format */

export interface Teacher {
  slug: string;
  name: string;
  date: string;
  imageUrl: string;
  direction: string;
  excerpt: string;
  content: readonly string[];
  achievements: readonly string[];
}

export type TeacherBase = Omit<
  Teacher,
  "date" | "direction" | "excerpt" | "content" | "achievements"
>;

export const teacherBase: TeacherBase[] = [
  {
    slug: "ravshanov-normaxmad",
    name: "Ravshanov Normaxmad",
    imageUrl: "/Domlalar/RavshanovNormaxmad.png",
  },
  {
    slug: "azimov-baxtiyor",
    name: "Azimov Baxtiyor Magrupovich",
    imageUrl: "/Domlalar/AzimovBaxtiyor.jpg",
  },
  {
    slug: "fozilov-shavkat",
    name: "Fozilov Shavkat Xayrullayevich",
    imageUrl: "/Domlalar/FozilovShavkat.png",
  },
  {
    slug: "mirzayev-nomaz",
    name: "Mirzayev Nomaz",
    imageUrl: "/Domlalar/MirzayevNomaz.png",
  },
  {
    slug: "nuraliyev-faxriddin",
    name: "Nuraliyev Faxriddin",
    imageUrl: "/Domlalar/NuraliyevFaxriddin.png",
  },
  {
    slug: "xamdamov-rustam",
    name: "Xamdamov Rustam",
    imageUrl: "/Domlalar/XamdamovRustam.png",
  },
];

export function getTeacherBySlug(slug: string) {
  return teacherBase.find((teacher) => teacher.slug === slug);
}
