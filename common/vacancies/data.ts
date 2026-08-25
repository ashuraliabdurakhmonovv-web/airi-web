/** @format */

export type VacancyCategory =
  | "management"
  | "specialist"
  | "research"
  | "service";

export interface VacancyBase {
  /** Jadvaldagi tartib raqami (T/r) */
  id: number;
  category: VacancyCategory;
  /** Oylik maosh, so'mda */
  salary: number;
  /**
   * Lavozim bo'yicha rasmiy malaka talablari.
   * Hozircha bo'sh — rasmiy matn kadrlar bo'limidan olingach shu yerga qo'shiladi.
   * Bo'sh bo'lsa, modalda "talablar tayyorlanmoqda" holati ko'rsatiladi.
   */
  requirements?: string[];
  /**
   * E'lon joylangan sana, ISO formatda (`"2026-08-01"`).
   *
   * Google `JobPosting` strukturali ma'lumotida buni MAJBURIY deb belgilaydi:
   * sanasiz vakansiya Google Jobs blokiga umuman tushmaydi. Hozircha
   * to'ldirilmagan — kadrlar bo'limidan haqiqiy sanalar olingach qo'shilsin,
   * `<JobPostingJsonLd>` o'zi ishlay boshlaydi.
   */
  datePosted?: string;
  /** E'lon amal qilish muddati, ISO formatda. Ixtiyoriy, lekin tavsiya etiladi. */
  validThrough?: string;
}

export interface Vacancy extends VacancyBase {
  title: string;
}

export const VACANCIES_PHONE = "+998 (71) 263-41-98";
export const VACANCIES_EMAIL = "info@airi.uz";

export const vacancyBase: VacancyBase[] = [
  { id: 1, category: "management", salary: 1912855 },
  { id: 2, category: "specialist", salary: 2230605 },
  { id: 3, category: "specialist", salary: 4524760 },
  { id: 4, category: "specialist", salary: 2230605 },
  { id: 5, category: "service", salary: 1271000 },
  { id: 6, category: "service", salary: 1338363 },
  { id: 7, category: "service", salary: 1271000 },
  { id: 8, category: "service", salary: 1271000 },
  { id: 9, category: "service", salary: 1471818 },
  { id: 10, category: "research", salary: 6834167 },
  { id: 11, category: "management", salary: 6342290 },
  { id: 12, category: "specialist", salary: 3805374 },
  { id: 13, category: "management", salary: 6342290 },
  { id: 14, category: "specialist", salary: 5638156 },
  { id: 15, category: "specialist", salary: 6342290 },
  { id: 16, category: "specialist", salary: 4932751 },
];

export const vacancyCategories: VacancyCategory[] = [
  "management",
  "specialist",
  "research",
  "service",
];

/** 1912855 -> "1 912 855" (SSR va klientda bir xil natija beradi) */
export const formatSalary = (salary: number): string =>
  String(salary).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
