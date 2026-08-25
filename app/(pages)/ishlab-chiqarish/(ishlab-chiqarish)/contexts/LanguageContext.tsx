/** @format */

"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

export type Language = "en" | "uz" | "ru";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("en");

  const translations: Record<Language, Record<string, string>> = {
    en: {
      "nav.about": "About",
      "nav.research": "Research",
      "nav.projects": "Projects",
      "nav.publications": "Publications",
      "nav.news": "News",
      "nav.partners": "Partners",
      "nav.contact": "Contact",
      "nav.getStarted": "Get Started",

      "hero.badge": "Official Government Research Institute",
      "hero.title1": "Digital Technologies",
      "hero.title2": "& Artificial Intelligence",
      "hero.title3": "Research Institute",
      "hero.description":
        "Leading Uzbekistan's AI revolution through groundbreaking research, innovative solutions, and strategic partnerships. Implementing the Digital Uzbekistan - 2030 Strategy.",
      "hero.exploreResearch": "Explore Our Research",
      "hero.contactUs": "Contact Us",

      "stats.projects": "Research Projects",
      "stats.researchers": "AI Researchers",
      "stats.publications": "Publications",
      "stats.partners": "Global Partners",
      "stats.presidential": "Presidential Resolution",
      "stats.presidentialDesc": "Established by PP-4996",
      "stats.iso": "ISO Certified",
      "stats.isoDesc": "Quality Standards",
      "stats.digital2030": "Digital Uzbekistan 2030",
      "stats.digital2030Desc": "Strategic Partner",
      "stats.collaboration": "International Collaboration",
      "stats.collaborationDesc": "30+ Partnerships",

      "research.title": "Research Areas",
      "research.subtitle":
        "Cutting-edge AI research across multiple domains, driving innovation and practical solutions for national development",
      "research.learnMore": "Learn More",
      "research.overview": "Overview",
      "research.keyFocus": "Key Focus Areas",
      "research.applications": "Applications",
      "research.close": "Close",

      "research.cv.title": "Computer Vision",
      "research.cv.description":
        "Advanced image recognition, object detection, and visual AI solutions for security, healthcare, and public administration.",
      "research.nlp.title": "Natural Language Processing",
      "research.nlp.description":
        "Speech processing, language understanding, and text analysis for Uzbek and multilingual government applications.",
      "research.ml.title": "Machine Learning",
      "research.ml.description":
        "Cutting-edge ML algorithms, deep learning models, and intelligent automation for digital transformation.",
      "research.applied.title": "Applied AI Solutions",
      "research.applied.description":
        "Practical AI implementations for healthcare, agriculture, education, and public sector modernization.",

      "projects.title": "Featured Projects",
      "projects.subtitle":
        "Transforming research into real-world AI solutions that impact society and modernize government services",
      "projects.viewDetails": "View Project Details",
      "projects.overview": "Project Overview",
      "projects.team": "Team",
      "projects.timeline": "Timeline",
      "projects.objectives": "Project Objectives",
      "projects.impact": "Impact & Results",

      "publications.title": "Publications",
      "publications.subtitle":
        "Latest research publications and scientific contributions from our institute",
      "publications.filterAll": "All Categories",
      "publications.filterYear": "All Years",
      "publications.readMore": "Read Publication",
      "publications.authors": "Authors",
      "publications.published": "Published",

      "news.title": "Latest News & Updates",
      "news.subtitle":
        "Stay informed about our latest research breakthroughs, events, and collaborations",
      "news.readMore": "Read More",
      "news.allNews": "All News",

      "partners.title": "Strategic Partners",
      "partners.subtitle":
        "Collaborating with leading institutions to advance AI research and digital transformation",

      "cta.title": "Join Our Research",
      "cta.description":
        "Be part of Uzbekistan's AI revolution. Collaborate with leading researchers and contribute to groundbreaking projects that shape the digital future of our nation.",
      "cta.joinTeam": "Join Our Team",
      "cta.viewOpportunities": "View Opportunities",

      "footer.description":
        "Digital Technologies and Artificial Intelligence Research Institute - Leading AI research and development in Uzbekistan. Established by Presidential Resolution No. PP-4996.",
      "footer.quickLinks": "Quick Links",
      "footer.contact": "Contact",
      "footer.aboutUs": "About Us",
      "footer.careers": "Careers",
      "footer.copyright":
        "© 2025 AIRI.UZ. All rights reserved. Republic of Uzbekistan Government Institute",
      "footer.privacy": "Privacy Policy",
      "footer.terms": "Terms of Service",
      "footer.accessibility": "Accessibility",
    },
    uz: {
      "nav.about": "Biz haqimizda",
      "nav.research": "Tadqiqotlar",
      "nav.projects": "Loyihalar",
      "nav.publications": "Nashrlar",
      "nav.news": "Yangiliklar",
      "nav.partners": "Hamkorlar",
      "nav.contact": "Aloqa",
      "nav.getStarted": "Boshlash",

      "hero.badge": "Rasmiy Davlat Tadqiqot Instituti",
      "hero.title1": "Raqamli Texnologiyalar",
      "hero.title2": "va Sun'iy Intellekt",
      "hero.title3": "Tadqiqot Instituti",
      "hero.description":
        "Sun'iy intellekt inqilobini ilg'or tadqiqotlar, innovatsion yechimlar va strategik hamkorliklar orqali boshqarmoqda. Raqamli O'zbekiston - 2030 strategiyasini amalga oshirmoqda.",
      "hero.exploreResearch": "Tadqiqotlarni O'rganing",
      "hero.contactUs": "Bog'laning",

      "stats.projects": "Tadqiqot Loyihalari",
      "stats.researchers": "AI Tadqiqotchilari",
      "stats.publications": "Nashrlar",
      "stats.partners": "Xalqaro Hamkorlar",
      "stats.presidential": "Prezident Qarori",
      "stats.presidentialDesc": "PP-4996 asosida tashkil etilgan",
      "stats.iso": "ISO Sertifikati",
      "stats.isoDesc": "Sifat Standartlari",
      "stats.digital2030": "Raqamli O'zbekiston 2030",
      "stats.digital2030Desc": "Strategik Hamkor",
      "stats.collaboration": "Xalqaro Hamkorlik",
      "stats.collaborationDesc": "30+ Hamkorliklar",

      "research.title": "Tadqiqot Yo'nalishlari",
      "research.subtitle":
        "Milliy rivojlanish uchun innovatsiya va amaliy yechimlarni taqdim etuvchi ko'p sohali ilg'or AI tadqiqotlari",
      "research.learnMore": "Batafsil",
      "research.overview": "Umumiy ma'lumot",
      "research.keyFocus": "Asosiy Yo'nalishlar",
      "research.applications": "Qo'llanmalar",
      "research.close": "Yopish",

      "research.cv.title": "Kompyuter Ko'rishi",
      "research.cv.description":
        "Xavfsizlik, sog'liqni saqlash va davlat boshqaruvi uchun ilg'or tasvirni aniqlash va vizual AI yechimlari.",
      "research.nlp.title": "Tabiiy Tilni Qayta Ishlash",
      "research.nlp.description":
        "O'zbek va ko'p tilli davlat ilovalari uchun nutqni qayta ishlash, tilni tushunish va matnni tahlil qilish.",
      "research.ml.title": "Mashinani O'rganish",
      "research.ml.description":
        "Raqamli transformatsiya uchun ilg'or ML algoritmlari, chuqur o'rganish modellari va intellektual avtomatlashtirish.",
      "research.applied.title": "Amaliy AI Yechimlari",
      "research.applied.description":
        "Sog'liqni saqlash, qishloq xo'jaligi, ta'lim va davlat sektorini modernizatsiya qilish uchun amaliy AI.",

      "projects.title": "Taniqli Loyihalar",
      "projects.subtitle":
        "Jamiyatga ta'sir qiladigan va davlat xizmatlarini modernizatsiya qiladigan real AI yechimlariga tadqiqotlarni aylantirish",
      "projects.viewDetails": "Loyiha Tafsilotlari",
      "projects.overview": "Loyiha Haqida",
      "projects.team": "Jamoa",
      "projects.timeline": "Vaqt jadvali",
      "projects.objectives": "Loyiha Maqsadlari",
      "projects.impact": "Ta'sir va Natijalar",

      "publications.title": "Nashrlar",
      "publications.subtitle":
        "Institutimizning so'nggi ilmiy nashlari va ilmiy hissalari",
      "publications.filterAll": "Barcha Kategoriyalar",
      "publications.filterYear": "Barcha Yillar",
      "publications.readMore": "Nashrni O'qish",
      "publications.authors": "Mualliflar",
      "publications.published": "Nashr etilgan",

      "news.title": "So'nggi Yangiliklar",
      "news.subtitle":
        "Bizning so'nggi tadqiqot yutuqlarimiz, tadbirlar va hamkorliklarimiz haqida xabardor bo'ling",
      "news.readMore": "Batafsil",
      "news.allNews": "Barcha Yangiliklar",

      "partners.title": "Strategik Hamkorlar",
      "partners.subtitle":
        "AI tadqiqotlari va raqamli transformatsiyani rivojlantirish uchun yetakchi muassasalar bilan hamkorlik",

      "cta.title": "Tadqiqotimizga Qo'shiling",
      "cta.description":
        "O'zbekistonning AI inqilobining bir qismi bo'ling. Yetakchi tadqiqotchilar bilan hamkorlik qiling va xalqimizning raqamli kelajagini shakllantiruvchi innovatsion loyihalarga hissa qo'shing.",
      "cta.joinTeam": "Jamoamizga Qo'shiling",
      "cta.viewOpportunities": "Imkoniyatlarni Ko'rish",

      "footer.description":
        "Raqamli Texnologiyalar va Sun'iy Intellekt Tadqiqot Instituti - O'zbekistonda AI tadqiqotlari va ishlanmalarini olib boruvchi. Prezidentning PP-4996 qarori bilan tashkil etilgan.",
      "footer.quickLinks": "Tezkor Havolalar",
      "footer.contact": "Aloqa",
      "footer.aboutUs": "Biz Haqimizda",
      "footer.careers": "Karyera",
      "footer.copyright":
        "© 2025 AIRI.UZ. Barcha huquqlar himoyalangan. O'zbekiston Respublikasi Davlat Instituti",
      "footer.privacy": "Maxfiylik Siyosati",
      "footer.terms": "Foydalanish Shartlari",
      "footer.accessibility": "Qulaylik",
    },
    ru: {
      "nav.about": "О нас",
      "nav.research": "Исследования",
      "nav.projects": "Проекты",
      "nav.publications": "Публикации",
      "nav.news": "Новости",
      "nav.partners": "Партнёры",
      "nav.contact": "Контакты",
      "nav.getStarted": "Начать",

      "hero.badge": "Официальный Государственный Исследовательский Институт",
      "hero.title1": "Цифровые Технологии",
      "hero.title2": "и Искусственный Интеллект",
      "hero.title3": "Научно-Исследовательский Институт",
      "hero.description":
        "Возглавляем революцию ИИ в Узбекистане через передовые исследования, инновационные решения и стратегическое партнерство. Реализуем стратегию «Цифровой Узбекистан - 2030».",
      "hero.exploreResearch": "Изучить Исследования",
      "hero.contactUs": "Связаться",

      "stats.projects": "Научных Проектов",
      "stats.researchers": "Исследователей ИИ",
      "stats.publications": "Публикаций",
      "stats.partners": "Международных Партнёров",
      "stats.presidential": "Президентское Постановление",
      "stats.presidentialDesc": "Учреждено по ПП-4996",
      "stats.iso": "Сертификат ISO",
      "stats.isoDesc": "Стандарты Качества",
      "stats.digital2030": "Цифровой Узбекистан 2030",
      "stats.digital2030Desc": "Стратегический Партнёр",
      "stats.collaboration": "Международное Сотрудничество",
      "stats.collaborationDesc": "30+ Партнёрств",

      "research.title": "Направления Исследований",
      "research.subtitle":
        "Передовые исследования ИИ в различных областях, способствующие инновациям и практическим решениям для национального развития",
      "research.learnMore": "Подробнее",
      "research.overview": "Обзор",
      "research.keyFocus": "Ключевые Направления",
      "research.applications": "Применение",
      "research.close": "Закрыть",

      "research.cv.title": "Компьютерное Зрение",
      "research.cv.description":
        "Передовое распознавание изображений, обнаружение объектов и визуальные решения ИИ для безопасности, здравоохранения и государственного управления.",
      "research.nlp.title": "Обработка Естественного Языка",
      "research.nlp.description":
        "Обработка речи, понимание языка и анализ текста для узбекских и многоязычных государственных приложений.",
      "research.ml.title": "Машинное Обучение",
      "research.ml.description":
        "Передовые алгоритмы МО, модели глубокого обучения и интеллектуальная автоматизация для цифровой трансформации.",
      "research.applied.title": "Прикладные Решения ИИ",
      "research.applied.description":
        "Практическое внедрение ИИ в здравоохранение, сельское хозяйство, образование и модернизацию государственного сектора.",

      "projects.title": "Избранные Проекты",
      "projects.subtitle":
        "Превращаем исследования в реальные решения ИИ, которые влияют на общество и модернизируют государственные услуги",
      "projects.viewDetails": "Детали Проекта",
      "projects.overview": "Обзор Проекта",
      "projects.team": "Команда",
      "projects.timeline": "График",
      "projects.objectives": "Цели Проекта",
      "projects.impact": "Влияние и Результаты",

      "publications.title": "Публикации",
      "publications.subtitle":
        "Последние исследовательские публикации и научные вклады нашего института",
      "publications.filterAll": "Все Категории",
      "publications.filterYear": "Все Годы",
      "publications.readMore": "Читать Публикацию",
      "publications.authors": "Авторы",
      "publications.published": "Опубликовано",

      "news.title": "Последние Новости",
      "news.subtitle":
        "Будьте в курсе наших последних исследовательских прорывов, мероприятий и сотрудничества",
      "news.readMore": "Читать Далее",
      "news.allNews": "Все Новости",

      "partners.title": "Стратегические Партнёры",
      "partners.subtitle":
        "Сотрудничество с ведущими учреждениями для продвижения исследований ИИ и цифровой трансформации",

      "cta.title": "Присоединяйтесь к Исследованиям",
      "cta.description":
        "Станьте частью революции ИИ в Узбекистане. Сотрудничайте с ведущими исследователями и вносите вклад в передовые проекты, формирующие цифровое будущее нашей нации.",
      "cta.joinTeam": "Присоединиться к Команде",
      "cta.viewOpportunities": "Посмотреть Вакансии",

      "footer.description":
        "Научно-исследовательский институт цифровых технологий и искусственного интеллекта - ведущий центр исследований и разработок ИИ в Узбекистане. Учреждён Постановлением Президента № ПП-4996.",
      "footer.quickLinks": "Быстрые Ссылки",
      "footer.contact": "Контакты",
      "footer.aboutUs": "О Нас",
      "footer.careers": "Карьера",
      "footer.copyright":
        "© 2025 AIRI.UZ. Все права защищены. Государственный Институт Республики Узбекистан",
      "footer.privacy": "Политика Конфиденциальности",
      "footer.terms": "Условия Использования",
      "footer.accessibility": "Доступность",
    },
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
