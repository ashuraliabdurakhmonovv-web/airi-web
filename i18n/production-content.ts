import type { Locale } from "./config";
import { defaultLocale } from "./config";
import { fillFromUz, warnParity } from "./fill-from-uz";

type ProductionContent = {
  nav: { home: string; links: string[]; results: string; contact: string };
  hero: { words: string[]; badge: string; title: string; accent: string; stats: string[] };
  about: { eyebrow: string; title: string[]; paragraphs: string[]; pillars: string[]; map: { labels: string[]; captions: string[]; stages: string[]; center: string } };
  projects: { eyebrow: string; title: string[]; description: string; all: string; details: string };
  projectCards: { statuses: Record<"Faol" | "Joriy etilgan" | "Sinovda", string>; descriptions: string[] };
  services: { eyebrow: string; title: string[]; description: string; items: { title: string; description: string; tags: string[] }[] };
  partners: { eyebrow: string; title: string[]; description: string };
  contact: { eyebrow: string; title: string[]; description: string; labels: string[]; address: string; action: string };
  contactForm: { types: string[]; fields: { label: string; placeholder: string }[]; requestType: string; optional: string; message: string; messagePlaceholder: string; submit: string; success: string; note: string };
  faq: { eyebrow: string; title: string[]; items: { question: string; answer: string }[] };
  footer: { description: string; sections: string; contact: string; copyright: string; open: string };
};

const uz: ProductionContent = {
  nav: { home: "Bosh sahifa", links: ["Xizmatlar", "Loyihalar", "Hamkorlar", "Jamoa"], results: "Natijalar", contact: "Murojaat qilish" },
  hero: { words: ["yaratamiz", "rivojlantiramiz", "joriy qilamiz", "natija beramiz"], badge: "Bu yerda kelajak qurilyapti", title: "Kelajak texnologiyalarini", accent: "birgalikda", stats: ["Sun'iy intellekt loyihalari", "Ilmiy yondashuv", "Sanoat yechimlari"] },
  about: { eyebrow: "Biz haqimizda", title: ["Tadqiqotni", "amaliy mahsulotga", "aylantiramiz."], paragraphs: ["AIRI ishlab chiqarish yo'nalishi sun'iy intellekt, dasturiy platformalar va raqamli axborot tizimlarini loyihalash, ishlab chiqish hamda amaliyotga joriy etish bilan shug'ullanadi.", "Biz ilmiy g'oyani prototipdan boshlab, real sharoitda ishlaydigan raqamli mahsulotgacha olib borishga e'tibor qaratamiz."], pillars: ["Sun'iy intellekt yechimlari", "Raqamli platformalar", "Tadqiqot va prototiplash"], map: { labels: ["AI tizimlari", "Ma'lumot va tahlil", "Dasturiy platformalar", "Integratsiya"], captions: ["ML, CV, NLP", "Tahlil, prognoz", "Web, axborot tizimlari", "API, avtomatlashtirish"], stages: ["Tadqiqot", "Prototip", "Ishlab chiqish", "Sinov", "Joriy etish", "Monitoring"], center: "Ishlab chiqarish" } },
  projects: { eyebrow: "Loyihalar", title: ["Tadqiqotdan", "real mahsulotgacha."], description: "Sun'iy intellekt, ma'lumotlar tahlili va raqamli platformalar asosidagi amaliy ishlanmalar.", all: "Barcha loyihalar", details: "Batafsil" },
  projectCards: { statuses: { Faol: "Faol", "Joriy etilgan": "Joriy etilgan", Sinovda: "Sinovda" }, descriptions: [
    "Shahar infratuzilmasi, transport oqimlari va hududiy rivojlanish ma'lumotlarini AI yordamida tahlil qiluvchi urban analytics platforma.",
    "Kar va eshitish qobiliyati zaif insonlar uchun tarjima, imo-ishora lug'ati va interaktiv o'rganishni birlashtiruvchi inklyuziv platforma.",
    "Xavf signallari, monitoring oqimlari va hodisalarni aniqlashda mas'ul jamoalarga tezkor qaror qabul qilishga yordam beruvchi AI tizim.",
    "Ob-havo, tuproq va agronomik ko'rsatkichlar asosida ekinlar hosildorligini Machine Learning yordamida prognoz qiluvchi AgriTech platforma.",
    "Atrof-muhit ko'rsatkichlari, sensor ma'lumotlari va hududiy indikatorlarni birlashtirib ekologik risklarni baholovchi platforma.",
    "Katta hajmdagi hujjatlar, normativ matnlar va ichki bilim bazalaridan aniq javob topish uchun RAG arxitekturali AI yordamchi.",
    "Uy ijarasi va savdosi uchun qidiruv, recommendation va antifraud mexanizmlarini birlashtiruvchi aqlli ko'chmas mulk platformasi.",
    "Shaxsiy va biznes moliyasini, tranzaksiyalarni hamda bozor ko'rsatkichlarini yagona dashboardda kuzatuvchi fintech analytics platforma.",
    "Professor-o'qituvchilar va mutaxassislar uchun AI, Machine Learning, Computer Vision va NLP bo'yicha malaka oshirish LMS platformasi.",
  ] },
  services: {
    eyebrow: "Xizmatlarimiz", title: ["Texnologiyani", "amaliy yechimga", "aylantiramiz."], description: "Institutning ishlab chiqarish yo'nalishi olti asosiy kompetensiya bo'yicha ishlaydi — tadqiqotdan boshlab foydalanishga tayyor mahsulotgacha.",
    items: [
      { title: "Sun'iy intellekt tizimlari", description: "Machine learning, deep learning, computer vision, NLP va generativ AI asosidagi amaliy yechimlarni ishlab chiqish.", tags: ["ML", "Computer vision", "NLP", "Generative AI"] },
      { title: "Web platformalar va axborot tizimlari", description: "Tashkilot jarayonlariga mos korporativ platformalar, veb-ilovalar va axborot tizimlarini ishlab chiqish.", tags: ["Web apps", "Korporativ portal", "Backend", "UI/UX"] },
      { title: "LLM va AI assistentlar", description: "RAG, bilim bazalari, hujjatlar bilan ishlovchi AI assistentlar va korporativ generativ AI yechimlarini yaratish.", tags: ["RAG", "Hujjat tahlili", "Bilim bazasi", "Chat interfeys"] },
      { title: "Ma'lumotlar tahlili", description: "Ma'lumotlarni yig'ish, qayta ishlash, tahlil qilish, prognozlash va qaror qabul qilishni qo'llab-quvvatlovchi analitik tizimlar.", tags: ["Dashboard", "Prognozlash", "BI", "Data pipeline"] },
      { title: "Integratsiya va avtomatlashtirish", description: "API, mavjud axborot tizimlari va raqamli xizmatlarni birlashtirish hamda takrorlanuvchi jarayonlarni avtomatlashtirish.", tags: ["API", "Tizimlararo aloqa", "Workflow", "Monitoring"] },
      { title: "Prototiplash va R&D", description: "Yangi texnologik g'oyalarni tadqiq qilish, proof-of-concept va MVP prototiplarini yaratish hamda real sharoitda sinovdan o'tkazish.", tags: ["PoC", "MVP", "Pilot", "Texnik tadqiqot"] },
    ],
  },
  partners: { eyebrow: "Hamkorlar", title: ["Hamkorlik orqali", "kengroq natija."], description: "Institut davlat tashkilotlari, universitetlar, xalqaro ta'lim markazlari va texnologiya kompaniyalari bilan birgalikda amaliy AI yechimlarini ishlab chiqadi." },
  contact: { eyebrow: "Bog'lanish", title: ["G'oyangiz bormi?", "Birgalikda yechim yarataylik."], description: "Sun'iy intellekt, raqamli platforma yoki tadqiqot loyihasi bo'yicha hamkorlikni muhokama qilish uchun biz bilan bog'laning.", labels: ["Email", "Telefon", "Manzil"], address: "100125, Toshkent sh., Mirzo Ulug'bek t., Bo'z-2, 17A", action: "Biz bilan bog'lanish" },
  contactForm: { types: ["Hamkorlik taklifi", "Loyiha bo'yicha murojaat", "Ishga kirish", "Taklif yoki izoh", "Boshqa savol"], fields: [{ label: "Ism familiya", placeholder: "Ismingiz va familiyangiz" }, { label: "Tashkilot", placeholder: "Ish joyingiz yoki tashkilot nomi" }, { label: "Lavozim", placeholder: "Lavozimingiz" }, { label: "Email", placeholder: "Email" }, { label: "Telefon", placeholder: "Telefon" }], requestType: "Murojaat turi", optional: "ixtiyoriy", message: "Xabar", messagePlaceholder: "Loyiha, hamkorlik, taklif yoki savolingizni qisqacha yozing", submit: "Murojaatni yuborish", success: "Pochta dasturingiz ochildi — xatni yuborishni tasdiqlang.", note: "Forma to'ldirilgan ma'lumotlarni tayyor xat holida pochta dasturingizda ochadi va info@airi.uz manziliga yo'naltiradi. Xat yuborilishidan oldin uni ko'rib chiqishingiz mumkin." },
  faq: { eyebrow: "Savol-javob", title: ["Ko'p beriladigan", "savollar."], items: [
    { question: "AIRI qanday yo'nalishlarda faoliyat yuritadi?", answer: "AIRI sun'iy intellekt, ma'lumotlar tahlili, aqlli platformalar va innovatsion raqamli yechimlar ishlab chiqish yo'nalishlarida ilmiy va amaliy faoliyat olib boradi." },
    { question: "Institut qanday AI yechimlar ishlab chiqadi?", answer: "Biz biznes, davlat va jamiyat ehtiyojlariga mos AI modellar, analitik platformalar, avtomatlashtirilgan tizimlar va aqlli xizmatlarni yaratamiz." },
    { question: "AIRI bilan qanday hamkorlik qilish mumkin?", answer: "Tashkilotlar va kompaniyalar institut bilan ilmiy tadqiqotlar, pilot loyihalar va innovatsion mahsulotlar ishlab chiqish bo'yicha hamkorlik qilishi mumkin." },
    { question: "Loyihalar qanday bosqichlarda amalga oshiriladi?", answer: "Har bir loyiha muammoni tahlil qilish, yechim ishlab chiqish, testdan o'tkazish va real tizimlarga joriy etish bosqichlaridan o'tadi." },
    { question: "AIRI faqat tadqiqot bilan shug'ullanadimi?", answer: "Yo'q. Institut ilmiy tadqiqotlardan tashqari real amaliy yechimlar ishlab chiqadi va ularni joriy etadi." },
    { question: "Qaysi sohalar uchun AI yechimlar ishlab chiqasiz?", answer: "Qishloq xo'jaligi, ekologiya, moliya, hujjatlar tahlili, avtomatlashtirish va raqamli xizmatlar uchun AI yechimlar ishlab chiqamiz." },
    { question: "AIRI yosh mutaxassislar uchun imkoniyat yaratadimi?", answer: "Ha. Institut yosh tadqiqotchilar, dasturchilar va AI mutaxassislar uchun ilmiy va amaliy rivojlanish imkoniyatlarini taqdim etadi." },
    { question: "AIRI loyihalari qanday natija beradi?", answer: "Loyihalar jarayonlarni optimallashtirish, xarajatlarni kamaytirish va qaror qabul qilish samaradorligini oshirishga xizmat qiladi." },
  ] },
  footer: { description: "Raqamli texnologiyalar va sun'iy intellektni rivojlantirish ilmiy-tadqiqot instituti — ishlab chiqarish yo'nalishi.", sections: "Bo'limlar", contact: "Aloqa", copyright: "© 2026 AIRI. Barcha huquqlar himoyalangan.", open: "Hamkorlik va pilot loyihalar uchun ochiq" },
};

const ru: ProductionContent = {
  nav: { home: "Главная", links: ["Услуги", "Проекты", "Партнёры", "Команда"], results: "Результаты", contact: "Связаться" },
  hero: { words: ["создаём", "развиваем", "внедряем", "достигаем результата"], badge: "Будущее строится здесь", title: "Технологии будущего", accent: "мы создаём вместе", stats: ["Проекты искусственного интеллекта", "Научный подход", "Отраслевые решения"] },
  about: { eyebrow: "О нас", title: ["Превращаем исследования", "в практический", "продукт."], paragraphs: ["Производственное направление AIRI проектирует, разрабатывает и внедряет системы искусственного интеллекта, программные платформы и цифровые информационные системы.", "Мы сопровождаем научную идею от прототипа до цифрового продукта, работающего в реальных условиях."], pillars: ["Решения искусственного интеллекта", "Цифровые платформы", "Исследования и прототипирование"], map: { labels: ["Системы ИИ", "Данные и аналитика", "Программные платформы", "Интеграция"], captions: ["ML, CV, NLP", "Анализ, прогноз", "Веб, информационные системы", "API, автоматизация"], stages: ["Исследование", "Прототип", "Разработка", "Тестирование", "Внедрение", "Мониторинг"], center: "Производство" } },
  projects: { eyebrow: "Проекты", title: ["От исследования", "к реальному продукту."], description: "Практические разработки на основе искусственного интеллекта, анализа данных и цифровых платформ.", all: "Все проекты", details: "Подробнее" },
  projectCards: { statuses: { Faol: "Действующий", "Joriy etilgan": "Внедрён", Sinovda: "На испытании" }, descriptions: [
    "Платформа городской аналитики, которая анализирует городскую инфраструктуру, транспортные потоки и данные регионального развития с помощью ИИ.",
    "Инклюзивная платформа с переводом, словарём жестов и интерактивным обучением для людей с нарушением слуха.",
    "Система ИИ, помогающая ответственным командам быстро принимать решения при анализе сигналов риска, потоков мониторинга и событий.",
    "AgriTech-платформа, прогнозирующая урожайность по данным о погоде, почве и агрономических показателях с помощью машинного обучения.",
    "Платформа оценки экологических рисков, объединяющая показатели окружающей среды, данные датчиков и региональные индикаторы.",
    "ИИ-ассистент с архитектурой RAG для поиска точных ответов в больших массивах документов, нормативных текстов и внутренних баз знаний.",
    "Цифровая платформа недвижимости с поиском, рекомендациями и механизмами защиты от мошенничества.",
    "FinTech-платформа для мониторинга личных и бизнес-финансов, транзакций и рыночных показателей.",
    "LMS-платформа повышения квалификации преподавателей и специалистов в области ИИ, ML, CV и NLP.",
  ] },
  services: { eyebrow: "Наши услуги", title: ["Превращаем технологии", "в практические", "решения."], description: "Производственное направление института работает по шести основным компетенциям — от исследования до готового к использованию продукта.", items: [
    { title: "Системы искусственного интеллекта", description: "Разработка прикладных решений на основе машинного и глубокого обучения, компьютерного зрения, NLP и генеративного ИИ.", tags: ["ML", "Компьютерное зрение", "NLP", "Генеративный ИИ"] },
    { title: "Веб-платформы и информационные системы", description: "Разработка корпоративных платформ, веб-приложений и информационных систем под процессы организации.", tags: ["Веб-приложения", "Корпоративный портал", "Backend", "UI/UX"] },
    { title: "LLM и ИИ-ассистенты", description: "Создание RAG-систем, баз знаний, ИИ-ассистентов для работы с документами и корпоративных генеративных решений.", tags: ["RAG", "Анализ документов", "База знаний", "Чат-интерфейс"] },
    { title: "Анализ данных", description: "Аналитические системы для сбора, обработки, анализа и прогнозирования данных, поддерживающие принятие решений.", tags: ["Панель", "Прогнозирование", "BI", "Конвейер данных"] },
    { title: "Интеграция и автоматизация", description: "Объединение API, действующих информационных систем и цифровых сервисов, а также автоматизация повторяющихся процессов.", tags: ["API", "Межсистемная связь", "Workflow", "Мониторинг"] },
    { title: "Прототипирование и R&D", description: "Исследование новых технологических идей, создание proof-of-concept и MVP-прототипов и их испытание в реальных условиях.", tags: ["PoC", "MVP", "Пилот", "Техническое исследование"] },
  ] },
  partners: { eyebrow: "Партнёры", title: ["Больше результатов", "благодаря сотрудничеству."], description: "Институт разрабатывает прикладные решения ИИ совместно с государственными организациями, университетами, международными образовательными центрами и технологическими компаниями." },
  contact: { eyebrow: "Контакты", title: ["Есть идея?", "Создадим решение вместе."], description: "Свяжитесь с нами, чтобы обсудить сотрудничество в области искусственного интеллекта, цифровых платформ или исследовательских проектов.", labels: ["Email", "Телефон", "Адрес"], address: "100125, г. Ташкент, Мирзо-Улугбекский р-н, массив Буз-2, 17А", action: "Связаться с нами" },
  contactForm: { types: ["Предложение о сотрудничестве", "Обращение по проекту", "Трудоустройство", "Предложение или комментарий", "Другой вопрос"], fields: [{ label: "Имя и фамилия", placeholder: "Ваши имя и фамилия" }, { label: "Организация", placeholder: "Место работы или название организации" }, { label: "Должность", placeholder: "Ваша должность" }, { label: "Email", placeholder: "Email" }, { label: "Телефон", placeholder: "Телефон" }], requestType: "Тип обращения", optional: "необязательно", message: "Сообщение", messagePlaceholder: "Кратко опишите проект, предложение о сотрудничестве или вопрос", submit: "Отправить обращение", success: "Почтовая программа открыта — подтвердите отправку письма.", note: "Форма откроет заполненные данные как готовое письмо в вашей почтовой программе и направит его на info@airi.uz. Перед отправкой письмо можно проверить." },
  faq: { eyebrow: "Вопросы и ответы", title: ["Часто задаваемые", "вопросы."], items: [
    { question: "В каких направлениях работает AIRI?", answer: "AIRI ведёт научную и практическую деятельность в области искусственного интеллекта, анализа данных, интеллектуальных платформ и инновационных цифровых решений." },
    { question: "Какие решения ИИ разрабатывает институт?", answer: "Мы создаём модели ИИ, аналитические платформы, автоматизированные системы и интеллектуальные сервисы для потребностей бизнеса, государства и общества." },
    { question: "Как можно сотрудничать с AIRI?", answer: "Организации и компании могут сотрудничать с институтом в научных исследованиях, пилотных проектах и разработке инновационных продуктов." },
    { question: "Из каких этапов состоит реализация проекта?", answer: "Каждый проект проходит этапы анализа проблемы, разработки решения, тестирования и внедрения в реальные системы." },
    { question: "AIRI занимается только исследованиями?", answer: "Нет. Помимо научных исследований институт разрабатывает и внедряет реальные прикладные решения." },
    { question: "Для каких отраслей вы создаёте решения ИИ?", answer: "Мы разрабатываем решения для сельского хозяйства, экологии, финансов, анализа документов, автоматизации и цифровых сервисов." },
    { question: "Создаёт ли AIRI возможности для молодых специалистов?", answer: "Да. Институт предоставляет молодым исследователям, разработчикам и специалистам по ИИ возможности для научного и практического развития." },
    { question: "Какие результаты дают проекты AIRI?", answer: "Проекты помогают оптимизировать процессы, сокращать расходы и повышать эффективность принятия решений." },
  ] },
  footer: { description: "Научно-исследовательский институт развития цифровых технологий и искусственного интеллекта — производственное направление.", sections: "Разделы", contact: "Контакты", copyright: "© 2026 AIRI. Все права защищены.", open: "Открыты для сотрудничества и пилотных проектов" },
};

const en: ProductionContent = {
  nav: { home: "Home", links: ["Services", "Projects", "Partners", "Team"], results: "Results", contact: "Contact us" },
  hero: { words: ["create", "develop", "deploy", "deliver results"], badge: "The future is built here", title: "We build tomorrow's technologies", accent: "together", stats: ["Artificial intelligence projects", "Scientific approach", "Industry solutions"] },
  about: { eyebrow: "About us", title: ["We turn research", "into practical", "products."], paragraphs: ["AIRI's production division designs, develops, and deploys artificial intelligence systems, software platforms, and digital information systems.", "We focus on taking a scientific idea from prototype to a digital product that performs in real-world conditions."], pillars: ["Artificial intelligence solutions", "Digital platforms", "Research and prototyping"], map: { labels: ["AI systems", "Data and analytics", "Software platforms", "Integration"], captions: ["ML, CV, NLP", "Analysis, forecasting", "Web, information systems", "API, automation"], stages: ["Research", "Prototype", "Development", "Testing", "Deployment", "Monitoring"], center: "Production" } },
  projects: { eyebrow: "Projects", title: ["From research", "to a real product."], description: "Practical developments powered by artificial intelligence, data analytics, and digital platforms.", all: "All projects", details: "Details" },
  projectCards: { statuses: { Faol: "Active", "Joriy etilgan": "Deployed", Sinovda: "In testing" }, descriptions: [
    "An urban analytics platform that uses AI to analyze city infrastructure, traffic flows, and regional development data.",
    "An inclusive platform with translation, a sign-language dictionary, and interactive learning for people with hearing loss.",
    "An AI system that helps responsible teams make rapid decisions when analyzing risk signals, monitoring streams, and incidents.",
    "An AgriTech platform that forecasts crop yields from weather, soil, and agronomic data using machine learning.",
    "A platform that combines environmental indicators, sensor data, and regional metrics to assess ecological risks.",
    "A RAG-based AI assistant for finding accurate answers across large document collections, regulatory texts, and internal knowledge bases.",
    "A smart real-estate platform combining property search, recommendations, and anti-fraud mechanisms.",
    "A fintech analytics platform for monitoring personal and business finances, transactions, and market indicators.",
    "An LMS platform for upskilling teachers and specialists in AI, machine learning, computer vision, and NLP.",
  ] },
  services: { eyebrow: "Our services", title: ["We turn technology", "into practical", "solutions."], description: "The institute's production division works across six core competencies—from research to a product ready for use.", items: [
    { title: "Artificial intelligence systems", description: "Developing applied solutions based on machine learning, deep learning, computer vision, NLP, and generative AI.", tags: ["ML", "Computer vision", "NLP", "Generative AI"] },
    { title: "Web platforms and information systems", description: "Developing enterprise platforms, web applications, and information systems tailored to organizational processes.", tags: ["Web apps", "Enterprise portal", "Backend", "UI/UX"] },
    { title: "LLMs and AI assistants", description: "Creating RAG systems, knowledge bases, document AI assistants, and enterprise generative AI solutions.", tags: ["RAG", "Document analysis", "Knowledge base", "Chat interface"] },
    { title: "Data analytics", description: "Analytical systems for collecting, processing, analyzing, and forecasting data to support decision-making.", tags: ["Dashboard", "Forecasting", "BI", "Data pipeline"] },
    { title: "Integration and automation", description: "Connecting APIs, existing information systems, and digital services while automating repetitive processes.", tags: ["API", "System integration", "Workflow", "Monitoring"] },
    { title: "Prototyping and R&D", description: "Researching new technology ideas, creating proof-of-concept and MVP prototypes, and testing them in real-world conditions.", tags: ["PoC", "MVP", "Pilot", "Technical research"] },
  ] },
  partners: { eyebrow: "Partners", title: ["Broader impact", "through collaboration."], description: "The institute develops applied AI solutions together with government organizations, universities, international education centers, and technology companies." },
  contact: { eyebrow: "Contact", title: ["Have an idea?", "Let's build a solution together."], description: "Contact us to discuss collaboration on artificial intelligence, digital platforms, or research projects.", labels: ["Email", "Phone", "Address"], address: "17A, Boz-2, Mirzo Ulugbek District, Tashkent 100125", action: "Contact us" },
  contactForm: { types: ["Collaboration proposal", "Project inquiry", "Employment", "Suggestion or feedback", "Other question"], fields: [{ label: "Full name", placeholder: "Your first and last name" }, { label: "Organization", placeholder: "Your workplace or organization" }, { label: "Position", placeholder: "Your position" }, { label: "Email", placeholder: "Email" }, { label: "Phone", placeholder: "Phone" }], requestType: "Inquiry type", optional: "optional", message: "Message", messagePlaceholder: "Briefly describe your project, collaboration proposal, or question", submit: "Send inquiry", success: "Your mail app has opened — confirm sending the message.", note: "The form opens the completed information as a ready-to-send email addressed to info@airi.uz. You can review it before sending." },
  faq: { eyebrow: "Questions and answers", title: ["Frequently asked", "questions."], items: [
    { question: "What fields does AIRI work in?", answer: "AIRI conducts scientific and practical work in artificial intelligence, data analytics, intelligent platforms, and innovative digital solutions." },
    { question: "What AI solutions does the institute develop?", answer: "We create AI models, analytics platforms, automated systems, and intelligent services tailored to business, government, and societal needs." },
    { question: "How can an organization collaborate with AIRI?", answer: "Organizations and companies can partner with the institute on scientific research, pilot projects, and innovative product development." },
    { question: "What stages does a project go through?", answer: "Each project moves through problem analysis, solution development, testing, and deployment into real systems." },
    { question: "Does AIRI only conduct research?", answer: "No. In addition to scientific research, the institute develops and deploys real applied solutions." },
    { question: "Which industries do you develop AI solutions for?", answer: "We develop solutions for agriculture, ecology, finance, document analysis, automation, and digital services." },
    { question: "Does AIRI create opportunities for young specialists?", answer: "Yes. The institute provides young researchers, developers, and AI specialists with opportunities for scientific and practical growth." },
    { question: "What outcomes do AIRI projects deliver?", answer: "Projects help optimize processes, reduce costs, and improve decision-making efficiency." },
  ] },
  footer: { description: "Research Institute for the Development of Digital Technologies and Artificial Intelligence — production division.", sections: "Sections", contact: "Contact", copyright: "© 2026 AIRI. All rights reserved.", open: "Open to collaboration and pilot projects" },
};

const content: Record<Locale, ProductionContent> = { uz, ru, en };

/** Til bo'yicha bir marta to'ldirilgan daraxtlar keshi. */
const filled: Partial<Record<Locale, ProductionContent>> = {};

/**
 * Ishlab chiqarish bo'limining tarjimalarini qaytaradi.
 * `getResearchContent` bilan bir xil kafolat: natija o'zbekcha daraxt bilan
 * to'ldirilgan, shuning uchun indeks bo'yicha murojaat hech qachon
 * `undefined` bermaydi.
 */
export function getProductionContent(locale: Locale): ProductionContent {
  const target = content[locale] ?? content[defaultLocale];

  if (process.env.NODE_ENV !== "production" && !filled[locale]) {
    warnParity("production", uz, content[locale], locale);
  }

  return (filled[locale] ??= fillFromUz(uz, target));
}
