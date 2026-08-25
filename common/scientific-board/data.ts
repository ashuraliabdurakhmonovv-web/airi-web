/** @format */

import type { LucideIcon } from "lucide-react";
import {
  BookOpenCheck,
  BrainCircuit,
  CalendarDays,
  FlaskConical,
  Globe2,
  GraduationCap,
  Landmark,
  ScrollText,
  ShieldCheck,
} from "lucide-react";

export type BoardMember = {
  id: number;
  fullName: string;
  degree: string;
  position: string;
  researchArea: string;
  email: string;
  avatar: string;
};

export type IconCard = {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
};

export type BoardMeeting = {
  id: number;
  type: string;
  title: string;
  date: string;
  description: string;
  icon: LucideIcon;
};

export const boardMembers: BoardMember[] = [
  {
    id: 1,
    fullName: "Ravshanov Normaxmad",
    degree: "Texnika fanlari doktori, professor",
    position: "Ilmiy kengash raisi",
    researchArea:
      "Sun'iy intellekt, ilmiy strategiya va institut tadqiqot yo'nalishlarini muvofiqlashtirish.",
    email: "info@airi.uz",
    avatar: "/institutJamoasi/RavshanDomla.png",
  },
  {
    id: 2,
    fullName: "Axmedov Dilshot Dilmuradovich",
    degree: "Texnika fanlari falsafa doktori, katta ilmiy xodim",
    position: "Ilmiy kengash a'zosi",
    researchArea:
      "Mashinaviy o'qitish, laboratoriyalar faoliyati va ilmiy natijalar monitoringi.",
    email: "info@airi.uz",
    avatar: "/institutJamoasi/AxmedovDomla.png",
  },
  {
    id: 3,
    fullName: "Tashtemirova Nadira Nematillayevna",
    degree: "Texnika fanlari doktori",
    position: "Ilmiy kengash kotibi",
    researchArea:
      "Doktorantura jarayonlari, ilmiy muhokamalar va kengash bayonnomalarini yuritish.",
    email: "info@airi.uz",
    avatar: "/institutJamoasi/NodiraTashtemirova.jpg",
  },
  {
    id: 4,
    fullName: "Azimov Baxtiyor Magrupovich",
    degree: "Texnika fanlari doktori, katta ilmiy xodim",
    position: "Ilmiy kengash a'zosi",
    researchArea:
      "Raqamli texnologiyalar, texnik tizimlarni boshqarish va akademik sifat nazorati.",
    email: "info@airi.uz",
    avatar: "/Domlalar/AzimovBaxtiyor.jpg",
  },
  {
    id: 5,
    fullName: "Bayxanov Islomjon Ilxomjon o'g'li",
    degree: "Direktor o'rinbosari",
    position: "Ilmiy kengash a'zosi",
    researchArea:
      "Institut boshqaruvi, ilmiy-tashkiliy jarayonlar va amaliy loyihalarni muvofiqlashtirish.",
    email: "info@airi.uz",
    avatar: "/institutJamoasi/Islomaka.png",
  },
  {
    id: 6,
    fullName: "Boboraximov Baxtiyor Ixtiyorovich",
    degree: "Texnika fanlari falsafa doktori",
    position: "Ilmiy kengash a'zosi",
    researchArea:
      "Intellektual dasturiy tizimlar va ularni amaliy sohalarga integratsiya qilish.",
    email: "info@airi.uz",
    avatar: "/institutJamoasi/Boboraximov%20Baxtiyor.png",
  },
  {
    id: 7,
    fullName: "Fazilov Shavkat Xayrullayevich",
    degree: "Texnika fanlari doktori, professor",
    position: "Ilmiy kengash a'zosi",
    researchArea:
      "Timsollarni tanib olish, kompyuter ko'rish va tasvirlarga ishlov berish.",
    email: "info@airi.uz",
    avatar: "/institutJamoasi/Fazilov%20Shavkat.png",
  },
  {
    id: 8,
    fullName: "Fozilova Madina Mirxalilovna",
    degree: "Texnika fanlari doktori",
    position: "Ilmiy kengash a'zosi",
    researchArea:
      "Tabiiy tilni qayta ishlash, matn tahlili va til modellari.",
    email: "info@airi.uz",
    avatar: "/institutJamoasi/Fozilova%20Madina.png",
  },
  {
    id: 9,
    fullName: "Isxakova Laviza Fuatovna",
    degree: "Yuridik fanlar nomzodi",
    position: "Ilmiy kengash a'zosi",
    researchArea:
      "Huquqiy ekspertiza, intellektual mulk himoyasi va akademik-huquqiy masalalar.",
    email: "info@airi.uz",
    avatar: "/institutJamoasi/Laviza.jpg",
  },
  {
    id: 10,
    fullName: "Kadirov Anvarxodja Asatullayevich",
    degree: "Direktor",
    position: "Ilmiy kengash a'zosi",
    researchArea:
      "Institutning strategik rivojlanishi, ilmiy va ishlab chiqarish yo'nalishlarini boshqarish.",
    email: "info@airi.uz",
    avatar: "/institutJamoasi/Direktor%20Anvar.png",
  },
  {
    id: 11,
    fullName: "Kamilov Mirzoyan Mirzaaxmedovich",
    degree: "Texnika fanlari doktori, akademik",
    position: "Ilmiy kengash a'zosi",
    researchArea:
      "Fundamental ilmiy tadqiqotlar, hisoblash usullari va ilmiy maktab an'analari.",
    email: "info@airi.uz",
    avatar: "/institutJamoasi/Kamilov%20Mirzoyan.png",
  },
  {
    id: 12,
    fullName: "Kaxarov Shukrullo Sa'dullo o'g'li",
    degree: "Texnika fanlari falsafa doktori",
    position: "Ilmiy kengash a'zosi",
    researchArea:
      "Biometrik tizimlar, shaxsni aniqlash va identifikatsiya texnologiyalari.",
    email: "info@airi.uz",
    avatar: "/institutJamoasi/Kaxarov%20Shukrullo.png",
  },
  {
    id: 13,
    fullName: "Mirzaev Nomaz",
    degree: "Texnika fanlari doktori, professor",
    position: "Ilmiy kengash a'zosi",
    researchArea:
      "Sun'iy intellekt, mashinaviy o'qitish va fundamental algoritmlar nazariyasi.",
    email: "info@airi.uz",
    avatar: "/Domlalar/MirzayevNomaz.png",
  },
  {
    id: 14,
    fullName: "Murodullayev Baxtiyor To'lqin o'g'li",
    degree: "Texnika fanlari falsafa doktori",
    position: "Ilmiy kengash a'zosi",
    researchArea:
      "Murakkab tizimlarni modellashtirish va matematik simulyatsiya usullari.",
    email: "info@airi.uz",
    avatar: "/institutJamoasi/Murodullayev%20Baxtiyor.png",
  },
  {
    id: 15,
    fullName: "Nuraliyev Faxriddin Murodillaevich",
    degree: "Texnika fanlari doktori, professor",
    position: "Ilmiy kengash a'zosi",
    researchArea:
      "Axborot-kommunikatsiya texnologiyalari, dasturiy ta'minot va bulutli tizimlar.",
    email: "info@airi.uz",
    avatar: "/institutJamoasi/Nuraliyev%20Faxriddin.png",
  },
  {
    id: 16,
    fullName: "Nuriddinov Azizjon Umidjon o'g'li",
    degree: "Direktor o'rinbosari",
    position: "Ilmiy kengash a'zosi",
    researchArea:
      "Ishlab chiqarish jarayonlari, amaliy AI yechimlari va dasturiy mahsulotlarni joriy etish.",
    email: "info@airi.uz",
    avatar: "/institutJamoasi/AzizNuriddinov.jpg",
  },
  {
    id: 17,
    fullName: "Sulyukova Larisa Faritovna",
    degree: "Texnika fanlari doktori, katta ilmiy xodim",
    position: "Ilmiy kengash a'zosi",
    researchArea:
      "Ilmiy tadqiqotlar, ma'lumotlar tahlili va akademik ekspertiza.",
    email: "info@airi.uz",
    avatar: "/institutJamoasi/Sulyukova%20Larisa.png",
  },
  {
    id: 18,
    fullName: "Xamdamov Rustam Xamdamovich",
    degree: "Texnika fanlari doktori, professor",
    position: "Ilmiy kengash a'zosi",
    researchArea:
      "Aqlli tizimlar, buyumlar interneti (IoT) va sensor tarmoqlari texnologiyalari.",
    email: "info@airi.uz",
    avatar: "/Domlalar/XamdamovRustam.png",
  },
  {
    id: 19,
    fullName: "Yetmishboyev Shaxzodbek Ma'murjon o'g'li",
    degree: "Kasaba uyushmasi raisi",
    position: "Ilmiy kengash a'zosi",
    researchArea:
      "Institut jamoasi va ilmiy-tashkiliy jarayonlarda kasaba uyushmasi vakilligi.",
    email: "info@airi.uz",
    avatar: "/institutJamoasi/Shaxzod.png",
  },
];

export const responsibilities: IconCard[] = [
  {
    id: 1,
    title: "Ilmiy yo'nalishlarni tasdiqlash",
    description:
      "Institutning ustuvor tadqiqot yo'nalishlari, laboratoriya strategiyalari va ilmiy dasturlarini ko'rib chiqadi.",
    icon: BrainCircuit,
  },
  {
    id: 2,
    title: "Doktorantura jarayonlari",
    description:
      "Doktorantlar mavzulari, ilmiy rahbarlar, dissertatsiya muhokamalari va himoya jarayonlarini muvofiqlashtiradi.",
    icon: GraduationCap,
  },
  {
    id: 3,
    title: "Maqolalar va konferensiyalar",
    description:
      "Ilmiy maqolalar, konferensiya materiallari, seminarlar va ilmiy tadbirlar sifatini nazorat qiladi.",
    icon: BookOpenCheck,
  },
  {
    id: 4,
    title: "Laboratoriyalar faoliyati",
    description:
      "Laboratoriyalarning ilmiy natijalari, loyihalari, nashrlari va tadqiqot samaradorligini tahlil qiladi.",
    icon: FlaskConical,
  },
  {
    id: 5,
    title: "Xalqaro ilmiy hamkorlik",
    description:
      "Xorijiy universitetlar, ilmiy markazlar va xalqaro tashkilotlar bilan hamkorlik tashabbuslarini rivojlantiradi.",
    icon: Globe2,
  },
  {
    id: 6,
    title: "Ilmiy etika va sifat",
    description:
      "Akademik halollik, plagiatga qarshi nazorat va ilmiy etika talablariga rioya qilinishini ta'minlaydi.",
    icon: ShieldCheck,
  },
];

export const boardMeetings: BoardMeeting[] = [
  {
    id: 1,
    type: "Yig'ilish",
    title: "Doktorantura mavzularini tasdiqlash bo'yicha ilmiy kengash yig'ilishi",
    date: "18.04.2026",
    description:
      "PhD va DSc izlanuvchilari uchun yangi tadqiqot mavzulari, ilmiy rahbarlar va laboratoriya biriktirish masalalari muhokama qilindi.",
    icon: CalendarDays,
  },
  {
    id: 2,
    type: "Bayonnoma",
    title: "Ilmiy laboratoriyalar faoliyati bo'yicha choraklik hisobot",
    date: "11.04.2026",
    description:
      "Laboratoriyalar kesimida ilmiy maqolalar, amaliy loyihalar va doktorantlar faoliyati bo'yicha tahliliy hisobot ko'rib chiqildi.",
    icon: ScrollText,
  },
  {
    id: 3,
    type: "E'lon",
    title: "Ilmiy seminarlar haftaligi bo'yicha tashkiliy qaror",
    date: "04.04.2026",
    description:
      "Sun'iy intellekt, NLP, Computer Vision va IoT yo'nalishlari bo'yicha haftalik ilmiy seminarlar jadvali tasdiqlandi.",
    icon: Landmark,
  },
];

export const scientificStats = [
  {
    id: 1,
    value: "8",
    label: "Ilmiy laboratoriya",
  },
  {
    id: 2,
    value: "20+",
    label: "Doktorant va izlanuvchi",
  },
  {
    id: 3,
    value: "100+",
    label: "Ilmiy maqola",
  },
  {
    id: 4,
    value: "10+",
    label: "Konferensiya va seminar",
  },
];

export const governancePillars = [
  "Ilmiy strategiya",
  "Doktorantura nazorati",
  "Laboratoriyalar baholovi",
  "Konferensiyalar muvofiqlashtiruvi",
  "Xalqaro hamkorlik",
];

export const boardSummary = {
  members: "19",
  meetings: "Har oy",
  focus: "AI Research",
};
