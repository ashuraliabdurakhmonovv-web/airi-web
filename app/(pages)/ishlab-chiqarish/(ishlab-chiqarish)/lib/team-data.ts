import type { StaticImageData } from "next/image";
import { projects } from "./projects-data";
import HojiakbarImage from "../public/teams/hojiakbar.jpg";
import IslomMamadiyevImage from "../public/teams/IslomMamadiyev.jpg";
import KamoliddinImage from "../public/teams/Kamoliddin.jpg";
import ShaxzodImage from "../public/teams/shaxzod.jpg";

export type DepartmentIcon =
  | "beaker"
  | "brain"
  | "chart"
  | "braces"
  | "layers"
  | "cpu"
  | "boxes";

export type Department = {
  slug: string;
  title: string;
  description: string;
  icon: DepartmentIcon;
  focus: string[];
  positions: string[];
  responsibilities: string[];
};

export type TeamMemberLink = {
  label: string;
  url: string;
};

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  level:
    | "Bo'lim boshlig'i"
    | "Bosh mutaxassis"
    | "Yetakchi mutaxassis"
    | "1-mutaxassis"
    | "2-mutaxassis";
  departmentSlug: string;
  image: StaticImageData;
  summary: string;
  skills: string[];
  projects: string[];
  responsibilities: string[];
  portfolio: string[];

  /**
   * Quyidagi maydonlar ixtiyoriy va faqat TASDIQLANGAN ma'lumot bo'lgandagina
   * to'ldiriladi. Bo'sh qolsa profil sahifasida tegishli qator umuman
   * render qilinmaydi — placeholder yoki taxminiy qiymat yozilmaydi.
   */
  email?: string;
  phone?: string;
  laboratory?: string;
  /** Professional biografiya — har bir element alohida paragraf. */
  biography?: string[];
  links?: TeamMemberLink[];
};

export const departments: Department[] = [
  {
    slug: "software-development",
    title: "Dasturiy mahsulotlarni ishlab chiqish bo'limi",
    description:
      "Institutning ishlab chiqarish yo'nalishida web platformalar, ichki tizimlar, mobil va integratsion dasturiy mahsulotlarni yaratish bo'yicha ishlaydi.",
    icon: "braces",
    focus: ["Frontend", "Backend", "API", "Ma'lumotlar bazasi", "Integratsiya"],
    positions: [
      "Bo'lim boshlig'i",
      "Bosh mutaxassis",
      "Yetakchi mutaxassis",
      "1-mutaxassis",
      "2-mutaxassis",
    ],
    responsibilities: [
      "Dasturiy mahsulotlar arxitekturasi, texnik topshiriq va ishlab chiqish jarayonlarini yuritish.",
      "Frontend, backend, API va ma'lumotlar bazasi qatlamlarini ishlab chiqish.",
      "Loyihalarni prototipdan foydalanishga tayyor mahsulot holatigacha olib borish.",
    ],
  },
  {
    slug: "software-testing",
    title: "Dasturiy mahsulotlarni sinovdan o'tkazish bo'limi",
    description:
      "Yaratilgan dasturiy mahsulotlarni funksional, texnik, xavfsizlik va foydalanish qulayligi bo'yicha tekshiradi.",
    icon: "beaker",
    focus: ["QA", "Manual testing", "Regression", "Acceptance", "Bug tracking"],
    positions: [
      "Bo'lim boshlig'i",
      "Bosh mutaxassis",
      "Yetakchi mutaxassis",
      "1-mutaxassis",
      "2-mutaxassis",
    ],
    responsibilities: [
      "Test rejalar, chek-listlar va qabul qilish mezonlarini tayyorlash.",
      "Dasturiy mahsulotlardagi xatoliklarni aniqlash, hujjatlashtirish va qayta tekshirish.",
      "Release oldidan mahsulot sifati va barqarorligini baholash.",
    ],
  },
  {
    slug: "it-security-implementation",
    title: "Axborot texnologiyalarini joriy qilish va axborot xavfsizligini ta'minlash bo'limi",
    description:
      "Ishlab chiqilgan yechimlarni ish muhitiga joriy qilish, server va tarmoq infratuzilmasi, monitoring hamda axborot xavfsizligini ta'minlashga mas'ul.",
    icon: "cpu",
    focus: ["Deployment", "Monitoring", "DevOps", "Cybersecurity", "Access control"],
    positions: [
      "Bo'lim boshlig'i",
      "Bosh mutaxassis",
      "Yetakchi mutaxassis",
      "1-mutaxassis",
      "2-mutaxassis",
    ],
    responsibilities: [
      "Dasturiy mahsulotlarni server, domen va foydalanuvchi muhitlariga joriy qilish.",
      "Monitoring, zaxira nusxa, kirish huquqlari va xavfsizlik talablarini boshqarish.",
      "Ichki tizimlar barqarorligi va axborot xavfsizligi bo'yicha nazorat yuritish.",
    ],
  },
  {
    slug: "startup-support",
    title: "AKT startaplarini qo'llab-quvvatlash bo'limi",
    description:
      "AKT va sun'iy intellekt yo'nalishidagi startap tashabbuslarini aniqlash, rivojlantirish, prototiplash va pilot loyihalarga tayyorlash bilan shug'ullanadi.",
    icon: "boxes",
    focus: ["Startup", "MVP", "Pilot", "Pitch deck", "Mentorlik"],
    positions: [
      "Bo'lim boshlig'i",
      "Bosh mutaxassis",
      "Yetakchi mutaxassis",
      "1-mutaxassis",
      "2-mutaxassis",
    ],
    responsibilities: [
      "Startap g'oyalarini saralash, rivojlantirish va loyiha formatiga keltirish.",
      "MVP, prototip va pilot ishlanmalarni tayyorlashda jamoalarga ko'maklashish.",
      "Tanlovlar, hamkorlar va investorlar uchun taqdimot materiallarini shakllantirish.",
    ],
  },
];

export const capabilities = [
  "Dasturiy mahsulot ishlab chiqish",
  "Mahsulotlarni sinovdan o'tkazish",
  "Axborot texnologiyalarini joriy qilish",
  "Axborot xavfsizligini ta'minlash",
  "AKT startaplarini qo'llab-quvvatlash",
  "Ko'p yo'nalishli mutaxassislar",
];

export const teamMembers: TeamMember[] = [
  {
    slug: "abdulhakimov-hojiakbar",
    name: "Abdulhakimov Hojiakbar",
    role: "Dasturiy mahsulotlarni ishlab chiqish bo'yicha bosh mutaxassis",
    level: "Bosh mutaxassis",
    departmentSlug: "software-development",
    image: HojiakbarImage,
    email: "hojiakbar@airi.uz",
    summary:
      "Ishlab chiqarish jarayonlarida texnik yechimlarni loyihalash, dasturlash va amaliy tizimlarni ishga tushirish bo'yicha ko'p yo'nalishli tajribaga ega.",
    skills: [
      "Frontend",
      "Backend",
      "API",
      "Ma'lumotlar bazasi",
      "Integratsiya",
      "Texnik arxitektura",
    ],
    projects: ["Handex", "RAG Hujjat Tahlili", "DomFinder"],
    responsibilities: [
      "Dasturiy mahsulotlar arxitekturasi va ishlab chiqish yo'nalishini belgilash.",
      "Backend, frontend va integratsiya oqimlarini ishlab chiqish.",
      "Murakkab texnik vazifalarni bajarish va jamoa ishini texnik tomondan muvofiqlashtirish.",
    ],
    portfolio: [
      "Ishlab chiqarish uchun web platformalar va servislar.",
      "Ma'lumot oqimlari va API integratsiyalari.",
      "Prototipdan amaliy mahsulotgacha olib borilgan texnik yechimlar.",
    ],
  },
  {
    slug: "islom-mamadiyev",
    name: "Islom Mamadiyev",
    role: "Dasturiy mahsulotlarni sinovdan o'tkazish va loyiha hujjatlari bo'yicha yetakchi mutaxassis",
    level: "Yetakchi mutaxassis",
    departmentSlug: "software-testing",
    image: IslomMamadiyevImage,
    summary:
      "Loyiha hujjatlari, test ssenariylari, hisobotlar va mahsulot sifatini tartibli nazorat qilish jarayonlariga mas'ul mutaxassis.",
    skills: [
      "QA hujjatlari",
      "Manual testing",
      "Test case",
      "Bug report",
      "Hisobot",
      "Loyiha nazorati",
    ],
    projects: ["RAG Hujjat Tahlili", "Handex", "Ekologik AI Platforma"],
    responsibilities: [
      "Test reja, chek-list va qabul qilish mezonlarini hujjatlashtirish.",
      "Aniqlangan xatoliklar, topshiriqlar va tuzatishlarni nazorat qilish.",
      "Jamoa va hamkorlar o'rtasida hujjatli axborot almashinuvini ta'minlash.",
    ],
    portfolio: [
      "Loyiha pasportlari va ish rejasi shablonlari.",
      "Mahsulot sinovi uchun test ssenariylari.",
      "Hamkorlik uchrashuvlari uchun hisobot materiallari.",
    ],
  },
  {
    slug: "shaxzod-yetmishboyev",
    name: "Shaxzod Yetmishboyev",
    role: "AKT startaplarini qo'llab-quvvatlash bo'yicha yetakchi mutaxassis",
    level: "Yetakchi mutaxassis",
    departmentSlug: "startup-support",
    image: ShaxzodImage,
    summary:
      "Startap g'oyalarini qo'llab-quvvatlaydi, jamoani ruhlantiradi va lider sifatida loyihalarning oldinga siljishiga kuch beradi.",
    skills: [
      "Startup support",
      "Leadership",
      "Pitch tayyorlash",
      "Mentorlik",
      "Jamoa koordinatsiyasi",
      "Pilot loyiha",
    ],
    projects: ["AKT startaplari", "DomFinder", "UrbanCity"],
    responsibilities: [
      "Startap tashabbuslarini shakllantirish va rivojlantirishga ko'maklashish.",
      "Jamoa ichida motivatsiya, intizom va umumiy yo'nalishni ushlab turish.",
      "Loyiha taqdimotlari va tanlovlarga tayyorgarlik jarayonini qo'llab-quvvatlash.",
    ],
    portfolio: [
      "Startap g'oyalarini saralash va taqdimotga tayyorlash.",
      "Jamoaviy ishlarni tashkil qilish va yo'naltirish tajribasi.",
      "Tanlov va loyiha jarayonlarida motivatsion liderlik.",
    ],
  },
  {
    slug: "kamoliddin-nishonov",
    name: "Kamoliddin Nishonov",
    role: "AKT startaplari, mexatronika, robototexnika va 3D prototiplash bo'yicha mutaxassis",
    level: "1-mutaxassis",
    departmentSlug: "startup-support",
    image: KamoliddinImage,
    summary:
      "Bir qancha startap loyihalarida g'olib bo'lgan, mexatronika, robototexnika va 3D printer yo'nalishlarida amaliy qurilmalar bilan ishlaydigan kuchli mutaxassis.",
    skills: [
      "Mechatronics",
      "Robotics",
      "3D printing",
      "Startup prototyping",
      "IoT",
      "Texnik demo",
    ],
    projects: ["AKT startaplari", "Robototexnika prototiplari", "3D printer ishlanmalari"],
    responsibilities: [
      "Startap g'oyalarini texnik prototipga aylantirish.",
      "Mexatronika va robototexnika yo'nalishidagi qurilmalar ustida ishlash.",
      "3D printer orqali tajriba namunalarini tayyorlash va sinash.",
    ],
    portfolio: [
      "Startap tanlovlarida qo'lga kiritilgan yutuqlar.",
      "Mexatronik va robototexnik prototiplar.",
      "3D printer yordamida tayyorlangan amaliy modellar.",
    ],
  },
];

export function getDepartmentBySlug(slug: string) {
  return departments.find((department) => department.slug === slug);
}

export function getMembersByDepartment(slug: string) {
  return teamMembers.filter((member) => member.departmentSlug === slug);
}

export function getTeamMemberBySlug(slug: string) {
  return teamMembers.find((member) => member.slug === slug);
}

/**
 * Mutaxassisning `projects` ro'yxatidagi nomlarni haqiqiy loyiha yozuvlariga
 * bog'laydi. Mos loyiha topilmagan nomlar (masalan "AKT startaplari")
 * qaytarilmaydi — mavjud bo'lmagan sahifaga havola yasalmaydi.
 */
export function getMemberProjects(member: TeamMember) {
  return member.projects
    .map((title) => projects.find((project) => project.title === title))
    .filter((project): project is (typeof projects)[number] => Boolean(project));
}

export const ORGANIZATION_NAME =
  "Raqamli texnologiyalar va sun'iy intellektni rivojlantirish ilmiy-tadqiqot instituti";
