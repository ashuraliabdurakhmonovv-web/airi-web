/** @format */

import { Microscope, BookOpen, Brain, Target, LucideIcon } from "lucide-react";

export interface ResearchArea {
  id: number;
  title: string;
  description: string;
  image: string;
  fullDescription: string;
  keyFocus: string[];
  applications: string[];
}

export const researchAreas: ResearchArea[] = [
  {
    title: "Kompyuter Ko'rish",
    id: 1,
    description:
      "Ilg'or tasvirni tan olish, ob'ektlarni aniqlash va xavfsizlik, sog'liqni saqlash hamda davlat boshqaruvi uchun vizual sun'iy intellekt yechimlari.",
    image:
      "https://lottie.host/embed/63d49fd1-8eed-4cb5-a1c8-505256afb25c/LVXu4SZW66.lottie",
    fullDescription:
      "Bizning Kompyuter Ko'rish tadqiqotlarimiz tasvir va video tahlili uchun eng zamonaviy algoritmlarni ishlab chiqishga qaratilgan. Biz milliy xavfsizlikni kuchaytiradigan, sog'liqni saqlash diagnostikasini yaxshilaydigan va vizual intellekt orqali davlat xizmatlarini modernizatsiya qiladigan ilg'or loyihalar ustida ishlaymiz.",
    keyFocus: [
      "Ob'ektlarni Aniqlash va Tan Olish",
      "Yuzni Tan Olish Tizimlari",
      "Tibbiy Tasvir Tahlili",
      "Video Kuzatuv va Tahlil",
      "Hujjatlarning Ishlov Berishi",
    ],
    applications: [
      "Transport Monitoring Tizimlari",
      "Xavfsizlik va Chegara Nazorati",
      "Sog'liqni Saqlash Diagnostikasi",
      "Hujjatlarni Raqamlashtirish",
    ],
  },
  {
    title: "Tabiiy Tilni Qayta Ishlash",
    id: 2,
    description:
      "Nutqni qayta ishlash, tilni tushunish va o'zbek va ko'p tilli davlat ilovalari uchun matn tahlili.",
    image:
      "https://lottie.host/embed/828e18d7-cf9d-4f01-9018-16d2001eb552/baOsBHaF3K.lottie",
    fullDescription:
      "Biz o'zbek va boshqa mintaqaviy tillar uchun maxsus moslashtirilgan ilg'or Tabiiy Tilni Qayta Ishlash yechimlarini ishlab chiqamiz. Tadqiqotlarimiz mashinalarga inson tilini tushunish, talqin qilish va yaratish imkonini berib, davlat xizmatlari, ta'lim va aloqani qo'llab-quvvatlaydi.",
    keyFocus: [
      "O'zbek Tilini Qayta Ishlash",
      "Mashina Tarjimasi",
      "Nutqni Tan Olish va Sintez",
      "Matn Tahlili va Xulosalash",
      "Sentiment Tahlili",
    ],
    applications: [
      "Davlat Xizmatlarini Avtomatlashtirish",
      "Ta'lim va Elektron O'qitish",
      "Mijozlarga Xizmat Ko'rsatish Botlari",
      "Huquqiy Hujjatlar Tahlili",
    ],
  },
  {
    title: "Mashinaviy O'rganish",
    id: 3,
    description:
      "Ilg'or mashinaviy o'rganish algoritmlari, chuqur o'rganish modellari va raqamli transformatsiya uchun aqlli avtomatlashtirish.",
    image:
      "https://lottie.host/embed/4f0f5408-80d6-44ea-9728-08204d2d9113/ncuYAuyu2D.lottie",

    fullDescription:
      "Bizning Mashinaviy O'rganish bo'limimiz innovatsion algoritmlar va neyron tarmoq arxitekturalarini kashf etadi. Biz ma'lumotlardan o'rganadigan, yangi vaziyatlarga moslashadigan va O'zbekistonning raqamli transformatsiyasini qo'llab-quvvatlash uchun aqlli qarorlar qabul qiladigan yechimlarni ishlab chiqamiz.",
    keyFocus: [
      "Chuqur O'rganish Arxitekturalari",
      "Bashoratli Tahlil",
      "Mustahkamlovchi O'rganish",
      "Transfer O'rganish",
      "AutoML Yechimlari",
    ],
    applications: [
      "Iqtisodiy Bashoratlash",
      "Resurslarni Optimallashtirish",
      "Firibgarlikni Aniqlash",
      "Bashoratli Texnik Xizmat",
    ],
  },
  {
    title: "Amaliy Sun'iy Intellekt Yechimlari",
    id: 4,
    description:
      "Sog'liqni saqlash, qishloq xo'jaligi, ta'lim va davlat sektorni modernizatsiyalash uchun amaliy sun'iy intellekt ilovalari.",
    image:
      "https://lottie.host/embed/c5884b9b-620c-4fcf-a644-eafe228311e9/Go11CN6c0D.lottie",

    fullDescription:
      "Biz tadqiqot va real dunyo ilovalari o'rtasidagi bo'shliqni to'ldiramiz. Jamoamiz sog'liqni saqlash, qishloq xo'jaligi, ta'lim va davlat xizmatlaridagi muayyan muammolarni hal qiladigan amaliy sun'iy intellekt yechimlarini ishlab chiqib, fuqarolar uchun real ta'sir ko'rsatadi.",
    keyFocus: [
      "Sog'liqni Saqlash Sun'iy Intellekt Ilovalari",
      "Aqlli Qishloq Xo'jaligi Tizimlari",
      "Ta'lim Texnologiyalari",
      "Elektron Hukumat Yechimlari",
      "Aqlli Shahar Tashabbuslari",
    ],
    applications: [
      "Tibbiy Diagnostika Qo'llab-quvvatlash",
      "Ekin Kasalliklarini Aniqlash",
      "Shaxsiylashtirilgan O'qitish",
      "Davlat Xizmatlarini Avtomatlashtirish",
    ],
  },
];
