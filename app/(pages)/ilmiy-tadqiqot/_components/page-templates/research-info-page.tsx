/** @format */

"use client";

import {
  ArrowLeft,
  ArrowUpRight,
  BookOpenCheck,
  CalendarDays,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Megaphone,
  Newspaper,
  ShieldCheck,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/i18n";
import { localizeResearchInfo } from "@/i18n/research-info-locales";

type ResearchInfoPageData = {
  eyebrow: string;
  title: string;
  description: string;
  stats: { value: string; label: string }[];
  sections: { title: string; items: string[] }[];
  primaryHref?: string;
  primaryLabel?: string;
};

const researchInfoPages = {
  scientificCouncilDecisions: {
    eyebrow: "Ilmiy boshqaruv",
    title: "Ilmiy kengash qarorlari",
    description:
      "Ilmiy kengash yig'ilishlarida qabul qilingan qarorlar, bayonnomalar va institut ilmiy faoliyatiga oid muhim tavsiyalar shu sahifada jamlanadi.",
    stats: [
      { value: "PDF", label: "hujjat" },
      { value: "Yil", label: "kesimi" },
      { value: "Arxiv", label: "saqlov" },
    ],
    sections: [
      {
        title: "Hujjatlar tarkibi",
        items: [
          "Ilmiy kengash bayonnomalari va qarorlari.",
          "Laboratoriyalar, loyihalar va ilmiy ishlar bo'yicha tavsiyalar.",
          "Doktorantura va ilmiy kadrlar tayyorlashga oid qarorlar.",
        ],
      },
      {
        title: "Kelajakda qo'shiladigan imkoniyatlar",
        items: [
          "Qarorlarni yil, sana va mavzu bo'yicha filtrlash.",
          "PDF ko'rish va yuklab olish.",
          "Muhim qarorlarni alohida belgilash.",
        ],
      },
    ],
  },
  researchProjects: {
    eyebrow: "Tadqiqot faoliyati",
    title: "Ilmiy loyihalar",
    description:
      "Institut laboratoriyalari va ilmiy guruhlari tomonidan olib borilayotgan fundamental, amaliy va innovatsion loyihalar haqida ma'lumotlar.",
    stats: [
      { value: "R&D", label: "yo'nalish" },
      { value: "AI", label: "markaz" },
      { value: "Grant", label: "format" },
    ],
    sections: [
      {
        title: "Loyiha kartasida bo'lishi kerak",
        items: [
          "Loyiha nomi, muddati, rahbari va ijrochi laboratoriya.",
          "Maqsad, kutilayotgan natija va amaliy joriy etish sohasi.",
          "Hamkor tashkilotlar, grant turi va asosiy nashrlar.",
        ],
      },
      {
        title: "Mantiqiy guruhlash",
        items: [
          "Sun'iy intellekt, kompyuter ko'rishi va NLP yo'nalishlari.",
          "Davlat boshqaruvi, sanoat, ta'lim va sog'liqni saqlash uchun yechimlar.",
          "Yakunlangan va davom etayotgan loyihalar arxivi.",
        ],
      },
    ],
  },
  scientificArticles: {
    eyebrow: "Tadqiqot faoliyati",
    title: "Ilmiy maqolalar",
    description:
      "Institut xodimlari, doktorantlari va hamkor mualliflarining ilmiy maqolalari, indekslangan nashrlari va bibliografik ma'lumotlari.",
    stats: [
      { value: "Scopus", label: "baza" },
      { value: "WoS", label: "baza" },
      { value: "DOI", label: "havola" },
    ],
    sections: [
      {
        title: "Maqola ma'lumotlari",
        items: [
          "Mualliflar, maqola nomi, jurnal yoki konferensiya nomi.",
          "Nashr yili, DOI, indekslanish bazasi va iqtibos ma'lumotlari.",
          "Laboratoriya yoki loyiha bilan bog'liqligi.",
        ],
      },
      {
        title: "Qulay navigatsiya",
        items: [
          "Yil, muallif, laboratoriya va yo'nalish bo'yicha saralash.",
          "Xalqaro va mahalliy nashrlarni alohida ko'rsatish.",
          "PDF yoki tashqi manbaga havola berish.",
        ],
      },
    ],
  },
  scientificJournals: {
    eyebrow: "Tadqiqot faoliyati",
    title: "Ilmiy jurnallar",
    description:
      "Institut faoliyati bilan bog'liq ilmiy jurnallar, maxsus sonlar, maqola topshirish talablari va tahririyat ma'lumotlari.",
    stats: [
      { value: "ISSN", label: "identifikator" },
      { value: "PDF", label: "sonlar" },
      { value: "Call", label: "maqola" },
    ],
    sections: [
      {
        title: "Sahifa tarkibi",
        items: [
          "Jurnal haqida, tahririyat hay'ati va maqola yuborish qoidalari.",
          "Arxiv sonlari, maxsus nashrlar va mualliflar uchun talablar.",
          "Indekslash, litsenziya va rasmiy kontaktlar.",
        ],
      },
      {
        title: "Foydali bloklar",
        items: [
          "Maqola qabul qilish muddatlari.",
          "Shablon fayllari va etik talablar.",
          "Ko'p beriladigan savollar.",
        ],
      },
    ],
  },
  dissertationDefenseAnnouncements: {
    eyebrow: "Yangiliklar va e'lonlar",
    title: "Dissertatsiya himoyasi e'lonlari",
    description:
      "Dissertatsiya himoyasi e'lonlari yangiliklardan alohida, rasmiy ilmiy jarayon sifatida joylashtiriladi. Yangiliklarda esa ularning qisqa xabari berilishi mumkin.",
    stats: [
      { value: "Sana", label: "himoya" },
      { value: "PDF", label: "e'lon" },
      { value: "OAK", label: "talab" },
    ],
    sections: [
      {
        title: "E'lon tarkibi",
        items: [
          "Talabgor, dissertatsiya mavzusi va ilmiy daraja turi.",
          "Himoya sanasi, vaqti, manzili va kengash ma'lumotlari.",
          "Avtoreferat, opponentlar va yetakchi tashkilot haqida ma'lumot.",
        ],
      },
      {
        title: "Nega alohida sahifa",
        items: [
          "Bu yangilik emas, rasmiy akademik jarayon hisoblanadi.",
          "Foydalanuvchi himoya e'lonlarini tez topishi kerak.",
          "Arxiv, hujjat va qidiruv funksiyalari keyin qo'shiladi.",
        ],
      },
    ],
  },
  upcomingSeminars: {
    eyebrow: "Seminarlar va e'lonlar",
    title: "Rejalashtirilgan seminarlar",
    description:
      "Oldindan rejalashtirilgan ilmiy seminarlar, ma'ruzachilar, mavzular, joy va vaqt haqida ma'lumotlar.",
    stats: [
      { value: "Sana", label: "jadval" },
      { value: "AI", label: "mavzu" },
      { value: "Live", label: "format" },
    ],
    sections: [
      {
        title: "Seminar kartasi",
        items: [
          "Mavzu, ma'ruzachi va tashkil etuvchi laboratoriya.",
          "Sana, vaqt, manzil yoki onlayn havola.",
          "Ro'yxatdan o'tish va savol yuborish imkoniyati.",
        ],
      },
      {
        title: "Kimlar uchun",
        items: [
          "Institut ilmiy xodimlari va doktorantlari.",
          "Hamkor oliy ta'lim va ilmiy tashkilotlar vakillari.",
          "Sun'iy intellekt va raqamli texnologiyalar tadqiqotchilari.",
        ],
      },
    ],
  },
  pastSeminars: {
    eyebrow: "Seminarlar va e'lonlar",
    title: "O'tgan seminarlar",
    description:
      "O'tkazilgan seminarlar arxivi, taqdimotlar, fotosuratlar, bayonnomalar va qisqa xulosalar.",
    stats: [
      { value: "Arxiv", label: "seminar" },
      { value: "PDF", label: "taqdimot" },
      { value: "Video", label: "material" },
    ],
    sections: [
      {
        title: "Arxiv tarkibi",
        items: [
          "Seminar nomi, sana, ma'ruzachi va qisqa xulosa.",
          "Taqdimot fayllari, foto va video materiallar.",
          "Muhokama natijalari va kelishilgan vazifalar.",
        ],
      },
      {
        title: "Qidiruv uchun",
        items: [
          "Yil va oy bo'yicha ajratish.",
          "Laboratoriya yoki mavzu bo'yicha filtr.",
          "Ma'ruzachi bo'yicha qidiruv.",
        ],
      },
    ],
  },
  seminars: {
    eyebrow: "E'lonlar va yangiliklar",
    title: "Seminarlar",
    description:
      "Seminarlar sahifasi rejalashtirilgan va o'tgan ilmiy seminarlarni bitta joyda jamlaydi. Navbar ichida alohida bo'linmaydi, sahifa ichida esa tablar orqali ajratiladi.",
    stats: [
      { value: "Tab", label: "format" },
      { value: "Live", label: "seminar" },
      { value: "Arxiv", label: "material" },
    ],
    sections: [
      {
        title: "Rejalashtirilgan seminarlar",
        items: [
          "Mavzu, ma'ruzachi, sana, vaqt va joy.",
          "Onlayn havola yoki ro'yxatdan o'tish imkoniyati.",
          "Tashkil etuvchi laboratoriya va mas'ul shaxs.",
        ],
      },
      {
        title: "O'tgan seminarlar",
        items: [
          "Seminar xulosasi, taqdimotlar va foto/video materiallar.",
          "Muhokama natijalari va kelishilgan ilmiy vazifalar.",
          "Yil, mavzu va laboratoriya bo'yicha arxivlash.",
        ],
      },
    ],
    primaryHref: "/ilmiy-tadqiqot/announcements",
    primaryLabel: "E'lonlarni ko'rish",
  },
  scientificTasks: {
    eyebrow: "Seminarlar va e'lonlar",
    title: "Ilmiy topshiriqlar",
    description:
      "Ilmiy kengash, laboratoriyalar yoki loyiha guruhlari tomonidan belgilangan vazifalar, muddatlar va mas'ullarni kuzatish sahifasi.",
    stats: [
      { value: "Task", label: "vazifa" },
      { value: "Deadline", label: "muddat" },
      { value: "Owner", label: "mas'ul" },
    ],
    sections: [
      {
        title: "Topshiriq ma'lumotlari",
        items: [
          "Vazifa nomi, tavsifi va kutilayotgan natija.",
          "Mas'ul shaxs yoki laboratoriya.",
          "Muddat, holat va yakuniy hujjatlar.",
        ],
      },
      {
        title: "Holatlar",
        items: [
          "Yangi topshiriqlar.",
          "Jarayondagi vazifalar.",
          "Yakunlangan va arxivlangan topshiriqlar.",
        ],
      },
    ],
  },
  announcements: {
    eyebrow: "Seminarlar va e'lonlar",
    title: "E'lonlar",
    description:
      "Ilmiy tadqiqot bo'limiga oid umumiy e'lonlar: seminar, qabul, hujjat topshirish, tanlov, grant va muddatlar.",
    stats: [
      { value: "E'lon", label: "xabar" },
      { value: "Muddat", label: "nazorat" },
      { value: "Rasmiy", label: "manba" },
    ],
    sections: [
      {
        title: "E'lon turlari",
        items: [
          "Qabul va imtihonlarga oid xabarlar.",
          "Grant, tanlov va ilmiy tadbir e'lonlari.",
          "Hujjat topshirish muddatlari va tashkiliy ma'lumotlar.",
        ],
      },
      {
        title: "Yangiliklardan farqi",
        items: [
          "E'lonlar foydalanuvchiga amal qilishi kerak bo'lgan muddat yoki talab beradi.",
          "Yangiliklar esa institut hayotidagi voqea va natijalarni yoritadi.",
          "Dissertatsiya himoyasi e'lonlari alohida sahifada yuritiladi.",
        ],
      },
    ],
  },
} satisfies Record<string, ResearchInfoPageData>;

const iconMap = [
  ShieldCheck,
  BookOpenCheck,
  ClipboardCheck,
  CalendarDays,
  Users,
  FileText,
  Newspaper,
  Megaphone,
  GraduationCap,
];

export type ResearchInfoPageKey = keyof typeof researchInfoPages;

export function ResearchInfoPage({ page }: { page: ResearchInfoPageKey }) {
  const { locale } = useLocale();
  const data: ResearchInfoPageData = localizeResearchInfo(researchInfoPages[page], locale);
  const backLabel = localizeResearchInfo("Ilmiy tadqiqot sahifasiga qaytish", locale);
  const Icon = iconMap[data.title.length % iconMap.length];

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section className="relative overflow-hidden bg-[#f7f9fc] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(96,78,255,0.07)_1px,transparent_1px),linear-gradient(180deg,rgba(8,232,234,0.08)_1px,transparent_1px)] bg-[size:64px_64px]" />

        <div className="relative mx-auto max-w-7xl">
          <Link
            href="/ilmiy-tadqiqot"
            className="mb-8 inline-flex items-center gap-2 border border-[#604eff]/20 bg-white px-4 py-2 text-sm font-extrabold text-[#604eff] transition hover:-translate-y-0.5 hover:border-[#604eff]/45"
          >
            <ArrowLeft className="h-4 w-4" />
            {backLabel}
          </Link>

          <header className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <span className="inline-flex items-center border border-[#604eff]/15 bg-white px-4 py-2 text-xs font-black uppercase text-[#604eff] shadow-sm">
                <Icon className="mr-2 h-4 w-4" />
                {data.eyebrow}
              </span>

              <h1 className="mt-5 max-w-4xl text-3xl font-black leading-tight text-slate-950 sm:text-4xl lg:text-6xl">
                {data.title}
              </h1>

              <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-slate-600">
                {data.description}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {data.stats.map((stat, index) => {
                const StatIcon = iconMap[index % iconMap.length];

                return (
                  <div
                    key={`${stat.value}-${stat.label}`}
                    className="border border-slate-200 bg-white p-5 text-center shadow-sm"
                  >
                    <StatIcon className="mx-auto mb-3 h-5 w-5 text-cyan-600" />
                    <p className="font-mono text-3xl font-black text-[#604eff]">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-xs font-extrabold uppercase text-slate-500">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </header>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-2">
            {data.sections.map((section, sectionIndex) => (
              <section
                key={section.title}
                className="border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#604eff] font-mono text-sm font-black text-white">
                    {String(sectionIndex + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-xl font-black leading-snug text-slate-950">
                    {section.title}
                  </h2>
                </div>

                <ul className="mt-6 space-y-4">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 bg-cyan-500" />
                      <p className="text-sm font-semibold leading-7 text-slate-600">
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          {data.primaryHref && data.primaryLabel && (
            <div className="mt-10">
              <Link
                href={data.primaryHref}
                className="inline-flex items-center justify-center bg-slate-950 px-5 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#604eff]"
              >
                {data.primaryLabel}
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
