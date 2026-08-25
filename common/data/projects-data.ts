/** @format */

import { LucideIcon } from "lucide-react";

export interface Project {
  id: number;
  title: string;
  description: string;
  icon: string | LucideIcon;
  category: string;
  status: string;
  fullDescription: string;
  objectives: string[];
  team: string;
  timeline: string;
  impact: string[];
}

export const projects: Project[] = [
  {
    title: "Transport Vositalarini Tan Olish Tizimi",
    id: 1,
    description:
      "Milliy infratuzilma bo'ylab qoidabuzarliklarni aniqlash va transport raqamlarini tan olish uchun sun'iy intellektga asoslangan xavfsizlik dasturiy ta'minoti",
    icon: "https://lottie.host/embed/a052790a-4717-471c-85b2-1076a80672fa/kShJIFz7dj.lottie",
    category: "Kompyuter Ko'rish",
    status: "Joriy Qilingan",
    fullDescription:
      "Transport boshqaruvini va milliy xavfsizlikni kuchaytirish uchun ishlab chiqilgan kompleks sun'iy intellektga asoslangan tizim. Tizim ilg'or kompyuter ko'rish algoritmlaridan foydalanib, yo'l harakati qoidabuzarliklarini aniqlaydi, transport raqamlarini tan oladi va O'zbekiston bo'ylab transport harakatlari haqida xavfsiz ma'lumotlar bazasini yuritadi.",
    objectives: [
      "Real vaqtda transportni kuzatish va monitoring",
      "Avtomatik raqamni tan olish (ALPR)",
      "Yo'l harakati qoidabuzarliklarini aniqlash va hujjatlashtirish",
      "Milliy xavfsizlik ma'lumotlar bazalari bilan integratsiya",
      "Huquqni muhofaza qilish organlari uchun tahlil paneli",
    ],
    team: "15 tadqiqotchi va muhandis",
    timeline: "2021 - Hozirgacha (Joriy qilingan)",
    impact: [
      "Yo'l qoidabuzarliklarini 35% ga kamaytirdi",
      "Huquqni muhofaza qilish organlarining javob vaqtini yaxshiladi",
      "Chegara xavfsizligi operatsiyalarini kuchaytirdi",
      "Yirik shaharlarda transport boshqaruvini avtomatlashtirdi",
    ],
  },
  {
    title: "Atrof-muhit Monitoringi",
    id: 2,
    description:
      "Orol dengizi mintaqasidagi ekologik holatni real vaqtda ma'lumotlar bilan monitoring qilish va bashorat qilish uchun tahlil dasturiy ta'minoti",
    icon: "https://lottie.host/embed/ec08bde2-ebb9-4348-8ed6-cdeaed90f06c/JQtrxP1MYB.lottie",
    category: "Ma'lumotlarni Tahlil Qilish",
    status: "Faol",
    fullDescription:
      "Orol dengizi mintaqasiga qaratilgan ilg'or atrof-muhit monitoringi va bashorat tizimi. Sun'iy yo'ldosh tasvirlari, IoT sensorlari va mashinaviy o'rganish modellaridan foydalanib, bu tizim ekologik o'zgarishlarni kuzatadi, atrof-muhit tendensiyalarini bashorat qiladi va muhofaza qilish uchun amaliy tavsiyalar beradi.",
    objectives: [
      "Real vaqtda atrof-muhit ma'lumotlarini yig'ish",
      "Sun'iy yo'ldosh tasvirlarini tahlil qilish va talqin qilish",
      "Ekologik o'zgarishlar uchun bashoratli modellashtirish",
      "Suv sifatini monitoring qilish",
      "Iqlim naqshlarini tahlil qilish",
    ],
    team: "20 olim va ma'lumot tahlilchisi",
    timeline: "2020 - Davom etmoqda",
    impact: [
      "Atrof-muhit xavf-xatarlarini erta aniqlash",
      "Ma'lumotlarga asoslangan siyosat tavsiyalari",
      "Orol dengizini tiklash bo'yicha xalqaro hamkorlik",
      "Tabiiy ofatlarga tayyorgarlikni yaxshilash",
    ],
  },
  {
    title: "Tibbiy Sun'iy Intellekt Yordamchisi",
    id: 3,
    description:
      "Diagnostika qo'llab-quvvatlash, bemorlarga g'amxo'rlik va sog'liqni saqlashni optimallashtirish uchun ilg'or sun'iy intellektdan foydalanilgan kardiologiya ilovalari",
    icon: "https://lottie.host/embed/619d1d1d-edd4-4798-a762-1ad25670161e/jBbjjqolGo.lottie",
    category: "Sog'liqni Saqlash",
    status: "Ishlab Chiqilmoqda",
    fullDescription:
      "Kardiologlarga diagnostika, davolash rejalashtirish va bemorlarni monitoring qilishda yordam berish uchun ishlab chiqilgan aqlli tibbiy yordamchi tizim. Tizim tibbiy tasvirlar, EKG ma'lumotlari va bemor tarixini tahlil qilib, yurak-qon tomir kasalliklari uchun dalillarga asoslangan tavsiyalar va erta ogohlantirishlar beradi.",
    objectives: [
      "EKG tahlili va talqini",
      "Yurak tasvirlarini diagnostika qilish",
      "Yurak-qon tomir kasalliklari xavfini baholash",
      "Davolash tavsiyalari tizimi",
      "Bemorlarni monitoring qilish va ogohlantirishlar",
    ],
    team: "25 sun'iy intellekt mutaxassisi va tibbiyot mutaxassislari",
    timeline: "2022 - 2026",
    impact: [
      "Yurak-qon tomir holatlarini erta aniqlash",
      "Diagnostika xatolarini kamaytirish",
      "Bemor natijalarini yaxshilash",
      "Masofaviy sog'liqni saqlash xizmatlarini qo'llab-quvvatlash",
    ],
  },
  {
    title: "Milliy Gerbariyni Tan Olish",
    id: 4,
    description:
      "Botanika tadqiqotlari, biologik xilma-xillikni saqlash va atrof-muhit tadqiqotlari uchun raqamli tan olish tizimi",
    icon: "https://lottie.host/embed/f2041cbb-7ff6-4544-b74c-b69236fe1e22/BE0c38voCO.lottie",
    category: "Biologiya",
    status: "Tadqiqot Bosqichi",
    fullDescription:
      "O'simliklarni identifikatsiya qilish va botanika tadqiqotlari uchun innovatsion raqamli platforma. Kompyuter ko'rish va chuqur o'rganishdan foydalanib, bu tizim tadqiqotchilar, talabalar va atrof-muhit agentliklariga o'simlik turlarini aniqlash, biologik xilma-xillikni kuzatish va kelajak avlodlar uchun botanika bilimlarini saqlashda yordam beradi.",
    objectives: [
      "Tasvirlardan o'simlik turlarini aniqlash",
      "Raqamli gerbariy ma'lumotlar bazasini yaratish",
      "Yo'qolib borayotgan turlarni kuzatish",
      "Dala tadqiqotchilari uchun mobil ilova",
      "Xalqaro botanika ma'lumotlar bazalari bilan integratsiya",
    ],
    team: "12 botanik va sun'iy intellekt tadqiqotchisi",
    timeline: "2023 - 2025",
    impact: [
      "Botanika bilimlarini saqlash",
      "Biologik xilma-xillik tadqiqotlarini qo'llab-quvvatlash",
      "Talabalar uchun ta'lim vositasi",
      "Muhofaza rejalashtirish va monitoring",
    ],
  },
];
