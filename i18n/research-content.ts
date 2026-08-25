import type { Locale } from "./config";
import { defaultLocale } from "./config";
import { fillFromUz, warnParity } from "./fill-from-uz";

const uz = {
  hero: {
    imageAlt: "Ilmiy laboratoriya",
    indicators: "Ilmiy ko'rsatkichlar",
    indicatorsDescription: "tadqiqot, ta'lim va nashrlar",
    badge: "Ilmiy izlanishlardan amaliy natijagacha",
    titleAccent: "Ilmiy tadqiqotlar",
    title: "doktorantura va innovatsion izlanishlar markazi",
    description:
      "Institutning ilmiy tadqiqot bo'limi PhD va DSc izlanishlari, ilmiy laboratoriyalar, seminarlar, konferensiyalar hamda sun'iy intellekt yo'nalishidagi amaliy tadqiqotlarni yagona ilmiy ekotizimga birlashtiradi.",
    stats: [
      { label: "doktorantura yo'nalishi", detail: "PhD / DSc izlanishlari" },
      { label: "ilmiy laboratoriya", detail: "amaliy AI va data yo'nalishlari" },
      { label: "tadqiqotchi va doktorant", detail: "PhD / DSc izlanishlari" },
    ],
    map: {
      overviewLabel: "ilmiy xarita",
      overviewDetail: "asosiy ko'rsatkichlar paneli",
      researchers: "tadqiqotchi",
      publications: "maqolalar",
      publicationDetail: "jurnal va konferensiya materiallari",
      laboratories: "laboratoriya",
      laboratoryDetail: "amaliy AI yo'nalishlari",
      article: "ilmiy maqola",
    },
  },
  about: {
    imageAlt: "Ilmiy tadqiqot bo'limi",
    eyebrow: "Bo'lim haqida",
    title: "Ilmiy salohiyatni yagona tizimga jamlaydigan markaz",
    description:
      "Ilmiy tadqiqot bo'limi institutning fundamental va amaliy izlanishlarini rejalashtiradi, laboratoriyalar, doktorantura, nashrlar va seminar jarayonlarini yagona akademik oqimga bog'laydi.",
  },
  audience: {
    eyebrow: "Kimlar uchun?",
    title: "Ilmiy yo'lini boshlamoqchi bo'lganlar uchun aniq yo'nalish",
    description:
      "Bu sahifa doktorantura, ilmiy tadqiqot, laboratoriya faoliyati va hamkorlik imkoniyatlariga qiziqqan foydalanuvchilar uchun yo'l ko'rsatadi. Har bir tashrif buyuruvchi o'ziga kerakli ma'lumotni tez topishi va keyingi qadamni aniq belgilashi mumkin.",
    items: [
      {
        title: "Doktorant va izlanuvchilar",
        description:
          "PhD yo'lini boshlamoqchi bo'lgan nomzodlar uchun institut ixtisosliklari bo'yicha kirish imtihoni savollari rasmiy PDF hujjatlar sifatida e'lon qilinadi.",
      },
      {
        title: "Yosh tadqiqotchilar va ilmiy xodimlar",
        description:
          "Laboratoriyalar, ilmiy loyihalar, seminarlar, maqolalar va konferensiyalar orqali tadqiqot faoliyatini rivojlantirish, tajriba almashish va ilmiy muhitga qo'shilish imkoniyati yaratiladi.",
      },
      {
        title: "Hamkor tashkilotlar va keng jamoatchilik",
        description:
          "Institutning ilmiy salohiyati, amaliy AI yechimlari, grant loyihalari va tajriba-sinov ishlari bilan tanishib, qo'shma tadqiqot yoki texnologik hamkorlikni boshlash mumkin.",
      },
    ],
  },
  laboratories: {
    eyebrow: "Ilmiy laboratoriyalar",
    description:
      "Laboratoriyalar institutning ilmiy yo'nalishlari, doktorantura mavzulari va amaliy AI loyihalarini birlashtiradigan asosiy tadqiqot maydonlaridir.",
    stats: ["laboratoriya", "ustuvor yo'nalish", "ilmiy tadqiqot"],
    status: "Faol",
    metrics: ["loyiha", "maqola", "rahbar"],
    details: "Batafsil ko'rish",
    footer:
      "Har bir laboratoriya ilmiy rahbarlar, doktorantlar, amaliy prototiplar va nashrlar bilan bog'langan holda rivojlantiriladi.",
    items: [
      { name: "Biometrik tizimlar", description: "Yuzni aniqlash, ovoz biometrikasi, shaxsni tasdiqlash va xavfsiz autentifikatsiya tizimlari bo'yicha ilmiy-amaliy tadqiqotlar olib boradi.", alt: "Biometrik tizimlar laboratoriyasi logotipi" },
      { name: "Timsollarni tanib olish", description: "Computer Vision, obyektlarni aniqlash, OCR, tasvirlarni tahlil qilish va vizual ma'lumotlardan qaror chiqarish algoritmlarini ishlab chiqadi.", alt: "Timsollarni tanib olish laboratoriyasi logotipi" },
      { name: "Tabiiy tilni qayta ishlash", description: "O'zbek tili uchun NLP, matn tahlili, semantik qidiruv, chatbotlar, tarjima tizimlari va LLM moslashtirish yo'nalishida ishlaydi.", alt: "Tabiiy tilni qayta ishlash laboratoriyasi logotipi" },
      { name: "Sun'iy intellekt va mashinaviy o'qitish", description: "Mashinaviy o'qitish, chuqur o'rganish, bashoratli tahlil, neyron tarmoqlar va tavsiya tizimlari bo'yicha modellar yaratadi.", alt: "Sun'iy intellekt va mashinaviy o'qitish laboratoriyasi logotipi" },
      { name: "Intellektual dasturiy tizimlar", description: "AI asosidagi dasturiy platformalar, avtomatlashtirilgan qaror qabul qilish tizimlari va korporativ aqlli yechimlarni ishlab chiqadi.", alt: "Intellektual dasturiy tizimlar laboratoriyasi logotipi" },
      { name: "Murakkab tizimlarni modellashtirish", description: "Matematik modellashtirish, simulyatsiya, raqamli egizaklar, optimallashtirish va murakkab tizimlar tahlili bilan shug'ullanadi.", alt: "Murakkab tizimlarni modellashtirish laboratoriyasi logotipi" },
      { name: "Texnik tizimlarni boshqarish va raqamli loyihalash", description: "Texnik boshqaruv tizimlari, avtomatika, robototexnika, raqamli prototiplash va kiber-fizik tizimlar bo'yicha tadqiqot olib boradi.", alt: "Texnik tizimlarni boshqarish va raqamli loyihalash laboratoriyasi logotipi" },
      { name: "Aqlli tizimlar va buyumlar interneti", description: "IoT qurilmalari, aqlli sensorlar, edge AI, monitoring platformalari va smart city tizimlari uchun ilmiy-amaliy yechimlar yaratadi.", alt: "Aqlli tizimlar va buyumlar interneti laboratoriyasi logotipi" },
    ],
  },
  doctorate: {
    eyebrow: "Doktorantura",
    title: "Kirish imtihoni materiallari",
    description:
      "Institut ixtisosliklari bo'yicha kirish imtihoni savollari rasmiy PDF hujjatlar sifatida e'lon qilingan. Qabul muddati, kvota va imtihon tartibi rasmiy e'lonlar asosida belgilanadi.",
    link: "Doktorantura bo'limiga o'tish",
    countLabel: "ixtisoslik bo'yicha imtihon savollari",
    specialtyMarker: " ixtisosligi",
  },
  cta: {
    imageAlt: "Ilmiy laboratoriya banneri",
    eyebrow: "Ilmiy hamkorlik",
    title: "Tadqiqot g'oyangiz, doktorantura rejangiz yoki loyiha taklifingiz bormi?",
    description:
      "Bo'lim ilmiy rahbarlar, doktorantlar, laboratoriyalar va hamkor tashkilotlar bilan tashabbuslarni ko'rib chiqadi.",
    action: "Murojaat qilish",
    note: "Tashabbuslar ilmiy yo'nalish bo'yicha ko'rib chiqiladi",
  },
  faq: {
    title: "Ilmiy faoliyat bo'yicha ko'p so'raladigan savollar",
    description:
      "Doktorantura, ilmiy loyihalar, laboratoriyalar, nashrlar va hamkorlik jarayonlari bo'yicha eng muhim savollar shu yerda jamlanadi.",
    missingQuestion: "Savolingiz bu ro'yxatda yo'qmi?",
    contactNote:
      "Ilmiy bo'lim, doktorantura yoki loyiha taklifi bo'yicha alohida murojaat yuborishingiz mumkin.",
    support: "Qo'llab-quvvatlash",
    items: [
      {
        question: "Ilmiy tadqiqot bo'limi nimani muvofiqlashtiradi?",
        answer:
          "Bo'lim ilmiy loyihalar, laboratoriyalar, doktorantura jarayonlari, nashrlar, seminarlar, ilmiy hamkorlik va akademik muhokamalarni yagona tizimda muvofiqlashtiradi.",
      },
      {
        question: "Ilmiy loyiha taklifini qanday yuborish mumkin?",
        answer:
          "Tadqiqot g'oyasi, loyiha maqsadi, kutilayotgan natija, ijrochilar tarkibi va zarur resurslar bo'yicha qisqa tavsif tayyorlanadi. Taklif bo'lim tomonidan ko'rib chiqilib, tegishli ilmiy yo'nalish yoki laboratoriyaga yo'naltiriladi.",
      },
      {
        question: "Doktoranturaga oid ma'lumotlar qayerda jamlanadi?",
        answer:
          "Doktorantura yo'nalishlari, qabul tartibi, kvotalar, hujjatlar ro'yxati, ilmiy rahbarlar va doktorantlar haqidagi ma'lumotlar doktorantura bo'limidagi alohida sahifalarda jamlanadi.",
      },
      {
        question: "Ilmiy rahbar tanlash jarayoni qanday amalga oshiriladi?",
        answer:
          "Nomzodning tadqiqot mavzusi, ilmiy qiziqishi va tanlangan ixtisosligi mavjud ilmiy rahbarlarning yo'nalishlari bilan solishtiriladi. Moslik aniqlangach, nomzod tegishli ilmiy rahbar bilan dastlabki muhokamaga yo'naltiriladi.",
      },
      {
        question: "Laboratoriyalar bilan hamkorlik qilish mumkinmi?",
        answer:
          "Ha, institut laboratoriyalari ilmiy mavzu, tajriba-sinov ishlari, ma'lumotlar tahlili, sun'iy intellekt modellari, prototiplar va amaliy yechimlar bo'yicha hamkorlik tashabbuslarini ko'rib chiqadi.",
      },
      {
        question: "Ilmiy maqola yoki nashrlar bo'yicha yordam beriladimi?",
        answer:
          "Bo'lim ilmiy maqolalar, konferensiya materiallari, tezislar va nashrlar bo'yicha umumiy yo'nalish beradi. Mavzu dolzarbligi, ilmiy tuzilma, manbalar va rasmiy talablar bo'yicha maslahat berilishi mumkin.",
      },
      {
        question: "Seminar va ilmiy muhokamalar qanday tashkil etiladi?",
        answer:
          "Seminarlar tadqiqot mavzusi, ma'ruzachi, auditoriya va ilmiy yo'nalishdan kelib chiqib rejalashtiriladi. Unda doktorantlar, ilmiy rahbarlar, laboratoriya vakillari va hamkor tashkilotlar ishtirok etishi mumkin.",
      },
      {
        question: "Seminar va e'lonlar qanday farqlanadi?",
        answer:
          "Seminarlar ilmiy muhokama jadvalini ko'rsatadi. E'lonlar esa foydalanuvchi amal qilishi kerak bo'lgan muddat, talab yoki rasmiy xabarni bildiradi. Institut yangiliklari esa umumiy ma'lumotlar bo'limidagi yangiliklar sahifasida yoritiladi.",
      },
      {
        question: "Tashqi tashkilotlar institut bilan ilmiy hamkorlik qila oladimi?",
        answer:
          "Ha, oliy ta'lim muassasalari, ilmiy markazlar, davlat tashkilotlari, biznes vakillari va xalqaro hamkorlar tadqiqot, tajriba-sinov, texnologiya transferi yoki qo'shma loyiha bo'yicha taklif yuborishi mumkin.",
      },
      {
        question: "Ilmiy loyiha natijalari qanday baholanadi?",
        answer:
          "Loyiha natijalari ilmiy yangilik, amaliy ahamiyat, metodologik asos, prototip yoki dasturiy yechim, nashrlar, joriy etish imkoniyati va kutilayotgan ta'sir mezonlari asosida baholanadi.",
      },
    ],
  },
  footer: {
    description:
      "Sun'iy intellekt bo'yicha ilmiy tadqiqotlar, doktorantura va laboratoriyalar uchun yagona akademik portal.",
    groups: ["Ilmiy kengash", "Tadqiqot", "E'lonlar"],
    address: "100125, Toshkent sh., Mirzo Ulug'bek t., Bo'z-2, 17A",
    antiCorruption: "Korrupsiyaga qarshi kurashish boti",
    copyright: "© 2026 AIRI. Barcha huquqlar himoyalangan.",
  },
  pages: {
    back: "Ilmiy tadqiqot sahifasiga qaytish",
    conferences: {
      eyebrow: "Ilmiy tadbirlar",
      stats: ["tadbir", "yo'nalish", "format"],
      archived: "Arxiv tadbir",
      items: [
        { title: "“Raqamli texnologiyalar va sun'iy intellekt: Bugun va kelajak” xalqaro ilmiy-amaliy anjumani", date: "APREL 25 - 2025", location: "Toshkent", imageAlt: "“Raqamli texnologiyalar va sun'iy intellekt: Bugun va kelajak” konferensiyasi rasmi" },
        { title: "“Raqamli texnologiyalar va sun'iy intellektni rivojlantirishning zamonaviy holati va istiqbollari” xalqaro ilmiy-amaliy anjumani", date: "SENTABR 27 - 2024", location: "Buxoro", imageAlt: "Raqamli texnologiyalar va sun'iy intellektni rivojlantirish konferensiyasi rasmi" },
      ],
    },
    doctorate: {
      stats: ["hujjat", "format", "ixtisoslik"],
      preparation: "Tayyorlanish jarayoni",
      steps: ["Ixtisoslik yo'nalishini tanlash", "Kirish imtihoni savollarini ko'rib chiqish", "PDF hujjatlarni yuklab olish", "Rasmiy qabul e'lonlari bilan solishtirish"],
      note: "Qabul muddati, kvota va imtihon tartibi rasmiy e'lonlar asosida aniqlashtiriladi.",
      items: [
        "05.01.11 — “Raqamli texnologiya va sun'iy intellekt” ixtisosligi bo'yicha kirish imtihon savollari",
        "05.01.03 — “Informatikaning nazariy asoslari” ixtisosligi bo'yicha kirish imtihon savollari",
        "05.01.02 — “Tizimli tahlil, boshqaruv va axborotni qayta ishlash” ixtisosligi bo'yicha kirish imtihon savollari",
        "05.01.07 — “Matematik modellashtirish. Sonli usullar va dasturlar majmui” ixtisosligi bo'yicha kirish imtihon savollari",
      ],
    },
  },
} as const;

type DeepStrings<T> = T extends string
  ? string
  : T extends readonly unknown[]
    ? { readonly [I in keyof T]: DeepStrings<T[I]> }
    : { readonly [K in keyof T]: DeepStrings<T[K]> };

export type ResearchContent = DeepStrings<typeof uz>;

const ru: ResearchContent = {
  hero: {
    imageAlt: "Научная лаборатория",
    indicators: "Научные показатели",
    indicatorsDescription: "исследования, образование и публикации",
    badge: "От научных исследований к практическим результатам",
    titleAccent: "Научные исследования",
    title: "центр докторантуры и инновационных исследований",
    description:
      "Научно-исследовательский отдел института объединяет исследования PhD и DSc, научные лаборатории, семинары, конференции и прикладные исследования в области искусственного интеллекта в единую научную экосистему.",
    stats: [
      { label: "направления докторантуры", detail: "исследования PhD / DSc" },
      { label: "научных лабораторий", detail: "прикладные направления ИИ и данных" },
      { label: "исследователей и докторантов", detail: "исследования PhD / DSc" },
    ],
    map: {
      overviewLabel: "научная карта",
      overviewDetail: "панель основных показателей",
      researchers: "исследователей",
      publications: "статей",
      publicationDetail: "журналы и материалы конференций",
      laboratories: "лабораторий",
      laboratoryDetail: "прикладные направления ИИ",
      article: "научных статей",
    },
  },
  about: {
    imageAlt: "Отдел научных исследований",
    eyebrow: "О подразделении",
    title: "Центр, объединяющий научный потенциал в единую систему",
    description:
      "Научно-исследовательский отдел планирует фундаментальные и прикладные исследования института, связывает лаборатории, докторантуру, публикации и семинарские процессы в единый академический поток.",
  },
  audience: {
    eyebrow: "Для кого?",
    title: "Чёткое направление для тех, кто хочет начать научную карьеру",
    description:
      "Эта страница предназначена для пользователей, заинтересованных в докторантуре, исследованиях, лабораторной деятельности и возможностях сотрудничества. Каждый посетитель может быстро найти нужную информацию и определить следующий шаг.",
    items: [
      { title: "Докторанты и исследователи", description: "Для кандидатов, желающих начать путь PhD, вопросы вступительных экзаменов по специальностям института публикуются в виде официальных PDF-документов." },
      { title: "Молодые исследователи и научные сотрудники", description: "Лаборатории, научные проекты, семинары, статьи и конференции позволяют развивать исследовательскую деятельность, обмениваться опытом и присоединяться к научной среде." },
      { title: "Партнёрские организации и общественность", description: "Можно ознакомиться с научным потенциалом института, прикладными решениями ИИ, грантовыми проектами и экспериментальными работами, а также начать совместное исследование или технологическое сотрудничество." },
    ],
  },
  laboratories: {
    eyebrow: "Научные лаборатории",
    description: "Лаборатории являются основными исследовательскими площадками, объединяющими научные направления института, темы докторантуры и прикладные проекты ИИ.",
    stats: ["лабораторий", "приоритетное направление", "научные исследования"],
    status: "Действующая",
    metrics: ["проектов", "статей", "руководителей"],
    details: "Подробнее",
    footer: "Каждая лаборатория развивается во взаимосвязи с научными руководителями, докторантами, прикладными прототипами и публикациями.",
    items: [
      { name: "Биометрические системы", description: "Проводит научные и практические исследования в области распознавания лиц, голосовой биометрии, проверки личности и безопасной аутентификации.", alt: "Логотип лаборатории биометрических систем" },
      { name: "Распознавание образов", description: "Лаборатория компьютерного зрения разрабатывает алгоритмы обнаружения объектов, OCR, анализа изображений и принятия решений на основе визуальных данных.", alt: "Логотип лаборатории распознавания образов" },
      { name: "Обработка естественного языка", description: "Лаборатория работает над технологиями NLP для узбекского языка: анализом текста, семантическим поиском, чат-ботами, переводом и адаптацией больших языковых моделей (LLM).", alt: "Логотип лаборатории обработки естественного языка" },
      { name: "Искусственный интеллект и машинное обучение", description: "Лаборатория создаёт модели машинного обучения, глубокого обучения, прогнозной аналитики, нейронных сетей и рекомендательных систем.", alt: "Логотип лаборатории искусственного интеллекта и машинного обучения" },
      { name: "Интеллектуальные программные системы", description: "Лаборатория разрабатывает программные платформы, автоматизированные системы принятия решений и интеллектуальные корпоративные решения.", alt: "Логотип лаборатории интеллектуальных программных систем" },
      { name: "Моделирование сложных систем", description: "Занимается математическим моделированием, симуляцией, цифровыми двойниками, оптимизацией и анализом сложных систем.", alt: "Логотип лаборатории моделирования сложных систем" },
      { name: "Управление техническими системами и цифровое проектирование", description: "Проводит исследования в области систем управления, автоматизации, робототехники, цифрового прототипирования и киберфизических систем.", alt: "Логотип лаборатории управления техническими системами и цифрового проектирования" },
      { name: "Умные системы и Интернет вещей", description: "Создаёт научные и практические решения для устройств IoT, интеллектуальных датчиков, Edge AI, платформ мониторинга и систем умного города.", alt: "Логотип лаборатории умных систем и Интернета вещей" },
    ],
  },
  doctorate: {
    eyebrow: "Докторантура",
    title: "Материалы вступительных экзаменов",
    description: "Вопросы вступительных экзаменов по специальностям института опубликованы в виде официальных PDF-документов. Сроки приёма, квоты и порядок проведения экзаменов определяются официальными объявлениями.",
    link: "Перейти в раздел докторантуры",
    countLabel: "комплекта экзаменационных вопросов по специальностям",
    specialtyMarker: " специальности",
  },
  cta: {
    imageAlt: "Баннер научной лаборатории",
    eyebrow: "Научное сотрудничество",
    title: "Есть исследовательская идея, план докторантуры или проектное предложение?",
    description: "Подразделение рассматривает инициативы совместно с научными руководителями, докторантами, лабораториями и партнёрскими организациями.",
    action: "Связаться",
    note: "Инициативы рассматриваются по соответствующему научному направлению",
  },
  faq: {
    title: "Часто задаваемые вопросы о научной деятельности",
    description: "Здесь собраны основные вопросы о докторантуре, научных проектах, лабораториях, публикациях и сотрудничестве.",
    missingQuestion: "Не нашли свой вопрос в списке?",
    contactNote: "Вы можете направить отдельное обращение по вопросам научного отдела, докторантуры или проектного предложения.",
    support: "Поддержка",
    items: [
      { question: "Что координирует научно-исследовательский отдел?", answer: "Отдел координирует научные проекты, лаборатории, процессы докторантуры, публикации, семинары, научное сотрудничество и академические обсуждения в единой системе." },
      { question: "Как подать предложение о научном проекте?", answer: "Необходимо подготовить краткое описание исследовательской идеи, цели проекта, ожидаемого результата, состава исполнителей и необходимых ресурсов. Отдел рассмотрит предложение и направит его в соответствующее научное направление или лабораторию." },
      { question: "Где собрана информация о докторантуре?", answer: "Направления докторантуры, порядок приёма, квоты, перечень документов, сведения о научных руководителях и докторантах собраны на отдельных страницах раздела докторантуры." },
      { question: "Как выбирается научный руководитель?", answer: "Тема исследования, научные интересы и выбранная специальность кандидата сопоставляются с направлениями действующих научных руководителей. После определения соответствия кандидат направляется на предварительное обсуждение с подходящим руководителем." },
      { question: "Можно ли сотрудничать с лабораториями?", answer: "Да. Лаборатории института рассматривают инициативы по научным темам, опытно-экспериментальным работам, анализу данных, моделям искусственного интеллекта, прототипам и прикладным решениям." },
      { question: "Оказывается ли помощь по научным статьям и публикациям?", answer: "Отдел предоставляет общие рекомендации по научным статьям, материалам конференций, тезисам и публикациям. Возможны консультации по актуальности темы, научной структуре, источникам и формальным требованиям." },
      { question: "Как организуются семинары и научные обсуждения?", answer: "Семинары планируются с учётом темы исследования, докладчика, аудитории и научного направления. В них могут участвовать докторанты, научные руководители, представители лабораторий и партнёрских организаций." },
      { question: "Чем отличаются семинары от объявлений?", answer: "Семинары отражают расписание научных обсуждений. Объявления содержат сроки, требования или официальные сообщения, требующие действий пользователя. Новости института публикуются на странице новостей общего раздела." },
      { question: "Могут ли внешние организации сотрудничать с институтом?", answer: "Да. Вузы, научные центры, государственные организации, представители бизнеса и международные партнёры могут направлять предложения по исследованиям, опытным работам, трансферу технологий или совместным проектам." },
      { question: "Как оцениваются результаты научного проекта?", answer: "Результаты оцениваются по научной новизне, практической значимости, методологической основе, наличию прототипа или программного решения, публикациям, возможности внедрения и ожидаемому эффекту." },
    ],
  },
  footer: {
    description: "Единый академический портал научных исследований, докторантуры и лабораторий в области искусственного интеллекта.",
    groups: ["Учёный совет", "Исследования", "Объявления"],
    address: "100125, г. Ташкент, Мирзо-Улугбекский р-н, массив Буз-2, 17А",
    antiCorruption: "Антикоррупционный бот",
    copyright: "© 2026 AIRI. Все права защищены.",
  },
  pages: {
    back: "Вернуться на страницу научных исследований",
    conferences: {
      eyebrow: "Научные мероприятия",
      stats: ["мероприятия", "направление", "формат"],
      archived: "Архивное мероприятие",
      items: [
        { title: "Международная научно-практическая конференция «Цифровые технологии и искусственный интеллект: сегодня и будущее»", date: "25 АПРЕЛЯ 2025", location: "Ташкент", imageAlt: "Конференция «Цифровые технологии и искусственный интеллект: сегодня и будущее»" },
        { title: "Международная научно-практическая конференция «Современное состояние и перспективы развития цифровых технологий и искусственного интеллекта»", date: "27 СЕНТЯБРЯ 2024", location: "Бухара", imageAlt: "Конференция по развитию цифровых технологий и искусственного интеллекта" },
      ],
    },
    doctorate: {
      stats: ["документа", "формат", "специальность"],
      preparation: "Процесс подготовки",
      steps: ["Выбрать направление специальности", "Изучить вопросы вступительного экзамена", "Скачать PDF-документы", "Сверить сведения с официальными объявлениями о приёме"],
      note: "Сроки приёма, квоты и порядок проведения экзаменов уточняются в официальных объявлениях.",
      items: [
        "05.01.11 — Вопросы вступительного экзамена по специальности «Цифровые технологии и искусственный интеллект»",
        "05.01.03 — Вопросы вступительного экзамена по специальности «Теоретические основы информатики»",
        "05.01.02 — Вопросы вступительного экзамена по специальности «Системный анализ, управление и обработка информации»",
        "05.01.07 — Вопросы вступительного экзамена по специальности «Математическое моделирование. Численные методы и комплексы программ»",
      ],
    },
  },
};

const en: ResearchContent = {
  hero: {
    imageAlt: "Research laboratory",
    indicators: "Research indicators",
    indicatorsDescription: "research, education, and publications",
    badge: "From scientific inquiry to practical results",
    titleAccent: "Scientific research",
    title: "center for doctoral studies and innovative research",
    description: "The institute's research division brings together PhD and DSc studies, research laboratories, seminars, conferences, and applied artificial intelligence research within a unified scientific ecosystem.",
    stats: [
      { label: "doctoral study areas", detail: "PhD / DSc research" },
      { label: "research laboratories", detail: "applied AI and data fields" },
      { label: "researchers and doctoral students", detail: "PhD / DSc research" },
    ],
    map: {
      overviewLabel: "research map",
      overviewDetail: "key indicators dashboard",
      researchers: "researchers",
      publications: "articles",
      publicationDetail: "journals and conference proceedings",
      laboratories: "laboratories",
      laboratoryDetail: "applied AI fields",
      article: "research articles",
    },
  },
  about: {
    imageAlt: "Research division",
    eyebrow: "About the division",
    title: "A center that brings scientific capacity into one system",
    description: "The research division plans the institute's fundamental and applied studies and connects laboratories, doctoral education, publications, and seminars into a unified academic workflow.",
  },
  audience: {
    eyebrow: "Who is it for?",
    title: "A clear path for those beginning a research career",
    description: "This page guides people interested in doctoral education, research, laboratory activities, and collaboration opportunities. Every visitor can quickly find the information they need and determine their next step.",
    items: [
      { title: "Doctoral candidates and researchers", description: "Candidates planning to begin a PhD can access official PDF documents containing entrance examination questions for the institute's specializations." },
      { title: "Early-career researchers and scientific staff", description: "Laboratories, research projects, seminars, papers, and conferences create opportunities to develop research, exchange experience, and join the scientific community." },
      { title: "Partner organizations and the public", description: "Visitors can explore the institute's scientific capacity, applied AI solutions, grant projects, and experimental work, and initiate joint research or technology partnerships." },
    ],
  },
  laboratories: {
    eyebrow: "Research laboratories",
    description: "Laboratories are the institute's core research environments, connecting scientific fields, doctoral topics, and applied AI projects.",
    stats: ["laboratories", "priority field", "scientific research"],
    status: "Active",
    metrics: ["projects", "articles", "supervisors"],
    details: "View details",
    footer: "Each laboratory develops in connection with scientific supervisors, doctoral candidates, applied prototypes, and publications.",
    items: [
      { name: "Biometric Systems", description: "Conducts scientific and applied research in facial recognition, voice biometrics, identity verification, and secure authentication systems.", alt: "Biometric Systems Laboratory logo" },
      { name: "Pattern Recognition", description: "The computer vision laboratory develops algorithms for object detection, OCR, image analysis, and decision-making from visual data.", alt: "Pattern Recognition Laboratory logo" },
      { name: "Natural Language Processing", description: "The laboratory works on Uzbek-language NLP, text analysis, semantic search, chatbots, translation systems, and large language model adaptation.", alt: "Natural Language Processing Laboratory logo" },
      { name: "Artificial Intelligence and Machine Learning", description: "The laboratory builds models for machine learning, deep learning, predictive analytics, neural networks, and recommendation systems.", alt: "Artificial Intelligence and Machine Learning Laboratory logo" },
      { name: "Intelligent Software Systems", description: "The laboratory develops AI-powered software platforms, automated decision systems, and intelligent enterprise solutions.", alt: "Intelligent Software Systems Laboratory logo" },
      { name: "Complex Systems Modeling", description: "Focuses on mathematical modeling, simulation, digital twins, optimization, and analysis of complex systems.", alt: "Complex Systems Modeling Laboratory logo" },
      { name: "Technical Systems Control and Digital Design", description: "Conducts research in control systems, automation, robotics, digital prototyping, and cyber-physical systems.", alt: "Technical Systems Control and Digital Design Laboratory logo" },
      { name: "Smart Systems and the Internet of Things", description: "Creates scientific and applied solutions for IoT devices, smart sensors, Edge AI, monitoring platforms, and smart city systems.", alt: "Smart Systems and Internet of Things Laboratory logo" },
    ],
  },
  doctorate: {
    eyebrow: "Doctoral studies",
    title: "Entrance examination materials",
    description: "Entrance examination questions for the institute's specializations are published as official PDF documents. Application dates, quotas, and examination procedures are defined in official announcements.",
    link: "Go to doctoral studies",
    countLabel: "sets of examination questions by specialization",
    specialtyMarker: " specialization",
  },
  cta: {
    imageAlt: "Research laboratory banner",
    eyebrow: "Scientific collaboration",
    title: "Do you have a research idea, doctoral plan, or project proposal?",
    description: "The division reviews initiatives together with scientific supervisors, doctoral candidates, laboratories, and partner organizations.",
    action: "Contact us",
    note: "Initiatives are reviewed within the relevant scientific field",
  },
  faq: {
    title: "Frequently asked questions about research activities",
    description: "Key questions about doctoral studies, research projects, laboratories, publications, and collaboration are collected here.",
    missingQuestion: "Is your question not listed?",
    contactNote: "You can send a separate inquiry about the research division, doctoral studies, or a project proposal.",
    support: "Support",
    items: [
      { question: "What does the research division coordinate?", answer: "The division coordinates research projects, laboratories, doctoral processes, publications, seminars, scientific cooperation, and academic discussions within a unified system." },
      { question: "How can I submit a research project proposal?", answer: "Prepare a short description of the research idea, project objective, expected result, team, and required resources. The division will review the proposal and direct it to the relevant scientific field or laboratory." },
      { question: "Where can I find information about doctoral studies?", answer: "Doctoral fields, admission procedures, quotas, required documents, scientific supervisors, and doctoral candidates are presented on dedicated pages in the doctoral studies section." },
      { question: "How is a scientific supervisor selected?", answer: "The candidate's topic, research interests, and chosen specialization are compared with the fields of available scientific supervisors. Once a match is identified, the candidate is referred for an initial discussion with the relevant supervisor." },
      { question: "Can I collaborate with the laboratories?", answer: "Yes. The institute's laboratories consider collaboration initiatives involving research topics, experimental work, data analysis, artificial intelligence models, prototypes, and applied solutions." },
      { question: "Is support available for research papers or publications?", answer: "The division provides general guidance on research papers, conference materials, abstracts, and publications. Advice may cover topic relevance, scientific structure, sources, and formal requirements." },
      { question: "How are seminars and scientific discussions organized?", answer: "Seminars are planned according to the research topic, speaker, audience, and scientific field. Doctoral candidates, supervisors, laboratory representatives, and partner organizations may participate." },
      { question: "What is the difference between seminars and announcements?", answer: "Seminars show the schedule of scientific discussions. Announcements communicate deadlines, requirements, or official notices requiring user action. Institute news is published on the news page in the general information section." },
      { question: "Can external organizations collaborate with the institute?", answer: "Yes. Universities, research centers, government bodies, businesses, and international partners may submit proposals for research, experimental work, technology transfer, or joint projects." },
      { question: "How are research project results evaluated?", answer: "Results are evaluated by scientific novelty, practical value, methodological foundation, prototype or software output, publications, implementation potential, and expected impact." },
    ],
  },
  footer: {
    description: "A unified academic portal for artificial intelligence research, doctoral studies, and laboratories.",
    groups: ["Scientific Council", "Research", "Announcements"],
    address: "17A, Boz-2, Mirzo Ulugbek District, Tashkent 100125",
    antiCorruption: "Anti-corruption bot",
    copyright: "© 2026 AIRI. All rights reserved.",
  },
  pages: {
    back: "Back to scientific research",
    conferences: {
      eyebrow: "Scientific events",
      stats: ["events", "field", "format"],
      archived: "Archived event",
      items: [
        { title: "International Scientific and Practical Conference “Digital Technologies and Artificial Intelligence: Today and the Future”", date: "APRIL 25, 2025", location: "Tashkent", imageAlt: "Digital Technologies and Artificial Intelligence: Today and the Future conference" },
        { title: "International Scientific and Practical Conference “Current State and Prospects for the Development of Digital Technologies and Artificial Intelligence”", date: "SEPTEMBER 27, 2024", location: "Bukhara", imageAlt: "Conference on the development of digital technologies and artificial intelligence" },
      ],
    },
    doctorate: {
      stats: ["documents", "format", "specialization"],
      preparation: "Preparation process",
      steps: ["Choose a specialization", "Review the entrance examination questions", "Download the PDF documents", "Compare the information with official admission announcements"],
      note: "Application dates, quotas, and examination procedures are confirmed in official announcements.",
      items: [
        "05.01.11 — Entrance examination questions for the Digital Technologies and Artificial Intelligence specialization",
        "05.01.03 — Entrance examination questions for the Theoretical Foundations of Computer Science specialization",
        "05.01.02 — Entrance examination questions for the Systems Analysis, Control, and Information Processing specialization",
        "05.01.07 — Entrance examination questions for the Mathematical Modeling, Numerical Methods, and Software Systems specialization",
      ],
    },
  },
};

const contents: Record<Locale, ResearchContent> = { uz, ru, en };

/** Til bo'yicha bir marta to'ldirilgan daraxtlar keshi. */
const filled: Partial<Record<Locale, ResearchContent>> = {};

/**
 * Ilmiy tadqiqot bo'limining tarjimalarini qaytaradi.
 *
 * Natija HAR DOIM o'zbekcha daraxt bilan to'ldirilgan bo'ladi (`fillFromUz`),
 * shuning uchun `copy.laboratories.items[index]` hech qachon `undefined`
 * bo'lmaydi — ma'lumot massivi tarjimadan uzunroq bo'lsa ham. Buningsiz
 * bitta tarjimasi unutilgan laboratoriya butun build'ni yiqitardi.
 */
export function getResearchContent(locale: Locale): ResearchContent {
  const target = contents[locale] ?? contents[defaultLocale];

  if (process.env.NODE_ENV !== "production" && !filled[locale]) {
    warnParity("research", uz, contents[locale], locale);
  }

  return (filled[locale] ??= fillFromUz(uz, target));
}
