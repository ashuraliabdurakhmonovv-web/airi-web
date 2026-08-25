/** @format */

export const laboratories = [
  {
    id: "biometric-systems",
    icon: "fingerprint",
    coverImage: "/Laboratoriya/BiometrikTizimlari.png",
    alt: "Biometrik tizimlar laboratoriyasi logotipi",
    name: "Biometrik tizimlar",
    href: "/ilmiy-tadqiqot/research-laboratories/biometric-systems",
    description:
      "Yuzni aniqlash, ovoz biometrikasi, shaxsni tasdiqlash va xavfsiz autentifikatsiya tizimlari bo'yicha ilmiy-amaliy tadqiqotlar olib boradi.",
    tags: ["Biometrics", "Face ID", "Security"],
    metrics: {
      trained: 28,
      current: 9,
      teachers: 4,
      supervisors: 3,
      projects: 5,
      publications: 16,
    },
    supervisors: [
      {
        name: "Axmedov Dilshot Dilmuradovich",
        role: "PhD, katta ilmiy xodim",
        focus: "Biometrik autentifikatsiya va ma'lumotlar xavfsizligi",
      },
      {
        name: "Xamdamov Rustam",
        role: "PhD, katta ilmiy xodim",
        focus: "Yuzni aniqlash algoritmlari va real vaqtli sinovlar",
      },
    ],
    education: [
      "PhD izlanuvchilar uchun biometrik identifikatsiya bo'yicha seminarlar",
      "Yosh tadqiqotchilar bilan yuz va ovoz biometrikasi datasetlari ustida ishlash",
      "Davlat xizmatlari uchun xavfsiz autentifikatsiya prototiplarini sinovdan o'tkazish",
    ],
    outputs: [
      "Face ID prototiplari",
      "Ovoz biometrikasi sinov modullari",
      "Xavfsiz kirish algoritmlari",
    ],
  },
  {
    id: "pattern-recognition",
    icon: "scan",
    coverImage: "/Laboratoriya/TimsollarniTanibOlish.png",
    alt: "Timsollarni tanib olish laboratoriyasi logotipi",
    name: "Timsollarni tanib olish",
    href: "/ilmiy-tadqiqot/research-laboratories/pattern-recognition",
    description:
      "Computer Vision, obyektlarni aniqlash, OCR, tasvirlarni tahlil qilish va vizual ma'lumotlardan qaror chiqarish algoritmlarini ishlab chiqadi.",
    tags: ["Computer Vision", "OCR", "Detection"],
    metrics: {
      trained: 34,
      current: 11,
      teachers: 5,
      supervisors: 3,
      projects: 6,
      publications: 21,
    },
    supervisors: [
      {
        name: "Fozilov Shavkat Xayrullayevich",
        role: "DSc, professor",
        focus: "Tasvirlarga ishlov berish va timsollarni tanib olish",
      },
      {
        name: "Azimov Baxtiyor Magrupovich",
        role: "DSc, professor",
        focus: "Algoritmlar va murakkab vizual tizimlarni modellashtirish",
      },
    ],
    education: [
      "Computer Vision va OCR bo'yicha amaliy laboratoriya mashg'ulotlari",
      "Tasvirlarni belgilash, dataset tayyorlash va model validatsiyasi",
      "Transport, hujjat va xavfsizlik yo'nalishlari uchun prototiplar",
    ],
    outputs: [
      "OCR modullari",
      "Obyekt aniqlash modellari",
      "Video analitika prototiplari",
    ],
  },
  {
    id: "natural-language-processing",
    icon: "messages",
    coverImage: "/Laboratoriya/NLP.png",
    alt: "Tabiiy tilni qayta ishlash laboratoriyasi logotipi",
    name: "Tabiiy tilni qayta ishlash",
    href: "/ilmiy-tadqiqot/research-laboratories/natural-language-processing",
    description:
      "O'zbek tili uchun NLP, matn tahlili, semantik qidiruv, chatbotlar, tarjima tizimlari va LLM moslashtirish yo'nalishida ishlaydi.",
    tags: ["NLP", "LLM", "Uzbek AI"],
    metrics: {
      trained: 22,
      current: 8,
      teachers: 4,
      supervisors: 3,
      projects: 5,
      publications: 18,
    },
    supervisors: [
      {
        name: "Nuraliyev Faxriddin",
        role: "DSc, professor",
        focus: "Tabiiy tilni qayta ishlash va ta'lim platformalari",
      },
      {
        name: "Axmedov Dilshot Dilmuradovich",
        role: "PhD, katta ilmiy xodim",
        focus: "Matn tahlili, semantik qidiruv va LLM moslashtirish",
      },
    ],
    education: [
      "O'zbek tili korpuslari, tokenizatsiya va matn klassifikatsiyasi bo'yicha treninglar",
      "Chatbot, semantik qidiruv va tarjima tizimlari uchun amaliy topshiriqlar",
      "Magistr va PhD izlanuvchilar uchun LLM fine-tuning tajribalari",
    ],
    outputs: [
      "O'zbekcha NLP pipeline",
      "Semantik qidiruv prototipi",
      "Chatbot va tarjima modullari",
    ],
  },
  {
    id: "ai-machine-learning",
    icon: "brain",
    coverImage: "/Laboratoriya/SuniyIntelektMashinaviy.png",
    alt: "Sun’iy intellekt va mashinaviy o‘qitish laboratoriyasi logotipi",
    name: "Sun'iy intellekt va mashinaviy o'qitish",
    href: "/ilmiy-tadqiqot/research-laboratories/ai-machine-learning",
    description:
      "Mashinaviy o'qitish, chuqur o'rganish, bashoratli tahlil, neyron tarmoqlar va tavsiya tizimlari bo'yicha modellar yaratadi.",
    tags: ["Machine Learning", "Deep Learning", "AI"],
    metrics: {
      trained: 41,
      current: 14,
      teachers: 6,
      supervisors: 4,
      projects: 8,
      publications: 25,
    },
    supervisors: [
      {
        name: "Azimov Baxtiyor Magrupovich",
        role: "DSc, professor",
        focus: "Mashinaviy o'qitish va optimallashtirish algoritmlari",
      },
      {
        name: "Xamdamov Rustam",
        role: "PhD, katta ilmiy xodim",
        focus: "Deep Learning modellarini amaliy tizimlarga joriy qilish",
      },
    ],
    education: [
      "ML/DL bo'yicha haftalik amaliy seminarlar va model review sessiyalari",
      "Tavsiya tizimlari, prognozlash va neyron tarmoqlar bo'yicha mini-loyihalar",
      "Yosh tadqiqotchilar uchun MLOps va model monitoring yo'nalishlari",
    ],
    outputs: [
      "Prognozlash modellari",
      "Tavsiya tizimi prototiplari",
      "MLOps sinov muhiti",
    ],
  },
  {
    id: "intelligent-software-systems",
    icon: "code",
    coverImage: "/Laboratoriya/IntelektualDasturiyTizimlar.png",
    alt: "Intellektual dasturiy tizimlar laboratoriyasi logotipi",
    name: "Intellektual dasturiy tizimlar",
    href: "/ilmiy-tadqiqot/research-laboratories/intelligent-software-systems",
    description:
      "AI asosidagi dasturiy platformalar, avtomatlashtirilgan qaror qabul qilish tizimlari va korporativ aqlli yechimlarni ishlab chiqadi.",
    tags: ["Software AI", "Automation", "Decision Systems"],
    metrics: {
      trained: 25,
      current: 10,
      teachers: 4,
      supervisors: 3,
      projects: 7,
      publications: 13,
    },
    supervisors: [
      {
        name: "Nuraliyev Faxriddin",
        role: "DSc, professor",
        focus: "Aqlli dasturiy platformalar va axborot tizimlari",
      },
      {
        name: "Axmedov Dilshot Dilmuradovich",
        role: "PhD, katta ilmiy xodim",
        focus: "Avtomatlashtirilgan qaror qabul qilish tizimlari",
      },
    ],
    education: [
      "AI servislar, API arxitekturasi va korporativ platformalar bo'yicha mashg'ulotlar",
      "Dasturiy prototiplarni ishlab chiqish va foydalanuvchi oqimlarini sinash",
      "Tadqiqot natijalarini web va backend tizimlarga integratsiya qilish",
    ],
    outputs: [
      "AI platforma prototiplari",
      "Decision-support modullari",
      "Avtomatlashtirish servislar",
    ],
  },
  {
    id: "complex-systems-modeling",
    icon: "network",
    coverImage: "/Laboratoriya/MurakkabTizimlarniModellashtirish.png",
    alt: "Murakkab tizimlarni modellashtirish laboratoriyasi logotipi",
    name: "Murakkab tizimlarni modellashtirish",
    href: "/ilmiy-tadqiqot/research-laboratories/complex-systems-modeling",
    description:
      "Matematik modellashtirish, simulyatsiya, raqamli egizaklar, optimallashtirish va murakkab tizimlar tahlili bilan shug'ullanadi.",
    tags: ["Modeling", "Simulation", "Digital Twin"],
    metrics: {
      trained: 31,
      current: 9,
      teachers: 5,
      supervisors: 3,
      projects: 6,
      publications: 20,
    },
    supervisors: [
      {
        name: "Azimov Baxtiyor Magrupovich",
        role: "DSc, professor",
        focus: "Murakkab tizimlar va matematik modellashtirish",
      },
      {
        name: "Mirzayev Nomaz",
        role: "DSc, akademik",
        focus: "Fundamental modellashtirish va ilmiy ekspertiza",
      },
    ],
    education: [
      "Simulyatsiya, optimallashtirish va raqamli egizaklar bo'yicha loyiha ishlari",
      "Tizimli tahlil va matematik model qurish bo'yicha ilmiy seminarlar",
      "Real jarayonlarni modelga aylantirish va natijalarni validatsiya qilish",
    ],
    outputs: [
      "Simulyatsiya modellari",
      "Optimallashtirish algoritmlari",
      "Digital Twin konseptlari",
    ],
  },
  {
    id: "technical-control-digital-design",
    icon: "cpu",
    coverImage: "/Laboratoriya/TexnikTizimlarniBoshqarishvaRaqamliLoyihalash.png",
    alt: "Texnik tizimlarni boshqarish va raqamli loyihalash laboratoriyasi logotipi",
    name: "Texnik tizimlarni boshqarish va raqamli loyihalash",
    href: "/ilmiy-tadqiqot/research-laboratories/technical-control-digital-design",
    description:
      "Texnik boshqaruv tizimlari, avtomatika, robototexnika, raqamli prototiplash va kiber-fizik tizimlar bo'yicha tadqiqot olib boradi.",
    tags: ["Control Systems", "Robotics", "Design"],
    metrics: {
      trained: 27,
      current: 7,
      teachers: 4,
      supervisors: 2,
      projects: 5,
      publications: 15,
    },
    supervisors: [
      {
        name: "Fozilov Shavkat Xayrullayevich",
        role: "DSc, professor",
        focus: "Texnik ko'rish va boshqaruv tizimlari",
      },
      {
        name: "Xamdamov Rustam",
        role: "PhD, katta ilmiy xodim",
        focus: "Raqamli prototiplash va kiber-fizik yechimlar",
      },
    ],
    education: [
      "Avtomatika, robototexnika va sensorli boshqaruv bo'yicha laboratoriya ishlari",
      "Raqamli dizayn, prototiplash va texnik model validatsiyasi",
      "Kiber-fizik tizimlar uchun amaliy sinov stendlari",
    ],
    outputs: [
      "Boshqaruv algoritmlari",
      "Raqamli prototiplar",
      "Robototexnika sinov modullari",
    ],
  },
  {
    id: "smart-systems-iot",
    icon: "wifi",
    coverImage: "/Laboratoriya/AqlliTizimlarvaBuyumlarInterneti.png",
    alt: "Aqlli tizimlar va buyumlar interneti laboratoriyasi logotipi",
    name: "Aqlli tizimlar va buyumlar interneti",
    href: "/ilmiy-tadqiqot/research-laboratories/smart-systems-iot",
    description:
      "IoT qurilmalari, aqlli sensorlar, edge AI, monitoring platformalari va smart city tizimlari uchun ilmiy-amaliy yechimlar yaratadi.",
    tags: ["IoT", "Edge AI", "Smart City"],
    metrics: {
      trained: 30,
      current: 12,
      teachers: 5,
      supervisors: 3,
      projects: 7,
      publications: 17,
    },
    supervisors: [
      {
        name: "Nuraliyev Faxriddin",
        role: "DSc, professor",
        focus: "IoT platformalar va raqamli infratuzilma",
      },
      {
        name: "Xamdamov Rustam",
        role: "PhD, katta ilmiy xodim",
        focus: "Edge AI, sensorlar va monitoring tizimlari",
      },
    ],
    education: [
      "IoT qurilmalari, sensorlar va edge inference bo'yicha amaliy kurslar",
      "Smart city monitoring platformalari uchun talabalar mini-loyihalari",
      "Ma'lumot yig'ish, uzatish va real vaqtli tahlil jarayonlari",
    ],
    outputs: [
      "IoT monitoring prototiplari",
      "Edge AI modullari",
      "Smart city dashboard konseptlari",
    ],
  },
];

export type Laboratory = (typeof laboratories)[number];

export function getLaboratoryBySlug(slug: string) {
  return laboratories.find((laboratory) => laboratory.id === slug);
}
