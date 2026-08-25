import type { StaticImageData } from "next/image";
import DomFinderImage from "../public/images/DomFinder.png";
import EcoImage from "../public/images/Ekologik platform.png";
import CoinImage from "../public/images/coin.png";
import HandexImage from "../public/images/handex.png";
import MlrImage from "../public/images/Mlr Predictor.png";
import MuhofizImage from "../public/images/Muhofiz ai.png";
import RagImage from "../public/images/Rag raqamli intitut.png";
import TrainingImage from "../public/images/mukammal trening.png";
import UrbanCityImage from "../public/images/urban city.png";

export type ProjectStatus = "Faol" | "Joriy etilgan" | "Sinovda";

export type ProjectIcon =
  | "building"
  | "brain"
  | "shield"
  | "map"
  | "wallet"
  | "chart"
  | "leaf"
  | "file";

export type Project = {
  slug: string;
  title: string;
  author: string;
  shortDescription: string;
  description: string;
  status: ProjectStatus;
  image: StaticImageData;
  icon: ProjectIcon;
  sector: string;
  year: string;
  leadDepartment: string;
  participants: string[];
  stack: string[];
  capabilities: string[];
  outcomes: string[];
  metrics: { value: string; label: string }[];
  stages: { title: string; description: string }[];
};

const author = "Abdulhakimov Hojiakbar";
const authorLead = "Muallif va loyiha rahbari";

export const projects: Project[] = [
  {
    slug: "urban-city",
    title: "UrbanCity",
    author,
    shortDescription: "Shahar infratuzilmasi, transport oqimlari va hududiy rivojlanish ma'lumotlarini AI yordamida tahlil qiluvchi urban analytics platforma.",
    description: "UrbanCity shahar infratuzilmasi, transport oqimlari va hududiy rivojlanish ma'lumotlarini birlashtirib, AI va data analytics orqali tahlil qiladi. Platforma qarorlarni subyektiv kuzatuvga emas, ma'lumotlarga tayangan holda qabul qilishga yordam beradi: tirbandlik, aholi zichligi, yashil hududlar, yo'l tarmoqlari va hududiy KPI ko'rsatkichlari yagona xarita hamda dashboardda ko'rsatiladi.",
    status: "Faol",
    image: UrbanCityImage,
    icon: "building",
    sector: "Smart city / AI",
    year: "2026",
    leadDepartment: authorLead,
    participants: [author, "Data Analytics", "Frontend va Backend"],
    stack: ["GIS / Geospatial Data", "Interactive Maps", "Time-series Analytics", "Machine Learning", "REST API"],
    capabilities: ["Shahar infratuzilmasini monitoring qilish", "Transport oqimlari va tirbandlikni tahlil qilish", "Hududiy rivojlanish ko'rsatkichlarini solishtirish", "Aholi zichligi va urban indikatorlarni ko'rsatish", "Xarita orqali yo'l va yashil hududlarni tahlil qilish", "AI asosida trend va prognozlar yaratish"],
    outcomes: ["Shahar infratuzilmasi va transport oqimlari yagona panelda kuzatiladi.", "Hududlar kesimida indikatorlar va KPI ko'rsatkichlari solishtiriladi.", "AI asosidagi trend va prognozlar strategik rejalashtirishni qo'llab-quvvatlaydi."],
    metrics: [{ value: "GIS", label: "xarita tahlili" }, { value: "AI", label: "prognozlash" }, { value: "KPI", label: "shahar indikatorlari" }],
    stages: [{ title: "Ma'lumotlar integratsiyasi", description: "Transport, hududiy, statistik va operatsion ma'lumotlar yagona modelga birlashtiriladi." }, { title: "Geospatial tahlil", description: "Xarita, zichlik, yo'l va yashil hudud qatlamlari orqali shahar holati o'rganiladi." }, { title: "Prognoz va dashboard", description: "AI natijalari mutaxassislar uchun tushunarli indikatorlar va boshqaruv paneliga chiqariladi." }],
  },
  {
    slug: "handex",
    title: "Handex",
    author,
    shortDescription: "Kar va eshitish qobiliyati zaif insonlar uchun tarjima, imo-ishora lug'ati va interaktiv o'rganishni birlashtiruvchi inklyuziv platforma.",
    description: "Handex kar va eshitish qobiliyati zaif insonlarning kundalik muloqot imkoniyatlarini kengaytirishga qaratilgan. Platforma imo-ishora lug'ati, daktil vositalari, matn va imo-ishora tarjimasi, vizual kontent hamda quiz-o'yinlarni yagona accessibility-oriented tajribaga birlashtiradi.",
    status: "Joriy etilgan",
    image: HandexImage,
    icon: "brain",
    sector: "Accessibility / AI",
    year: "2026",
    leadDepartment: authorLead,
    participants: [author, "Frontend va Backend", "Accessibility"],
    stack: ["Web Application", "REST API", "Sign Language Data", "Interactive Learning", "AI-assisted Translation"],
    capabilities: ["Imo-ishora lug'ati", "Matn va imo-ishora tarjimasi", "Daktil / finger-spelling vositalari", "Interaktiv darslar va vizual kontent", "Quiz va o'yinlar orqali mashq qilish", "Mobil va web accessibility interfeysi"],
    outcomes: ["Muloqotdagi kommunikatsion to'siqlarni kamaytirishga xizmat qiladi.", "Imo-ishora lug'ati va interaktiv mashqlar orqali o'rganishni qo'llab-quvvatlaydi.", "President Tech Award tanlovida 2-o'rin sovrindori bo'lgan."],
    metrics: [{ value: "5000+", label: "foydalanuvchilar" }, { value: "1000+", label: "imo-ishoralar" }, { value: "2-o'rin", label: "President Tech Award" }],
    stages: [{ title: "Lug'at va tarjima", description: "So'z, tushuncha va matnlar imo-ishora ma'lumotlari bilan bog'lanadi." }, { title: "Interaktiv o'rganish", description: "Quiz, o'yin va vizual kontent orqali foydalanuvchi bilimini mustahkamlaydi." }, { title: "Accessibility tajribasi", description: "Mobil va web interfeyslar barcha foydalanuvchilar uchun tushunarli qilib ishlab chiqiladi." }],
  },
  {
    slug: "muhofiz-ai",
    title: "Muhofiz AI",
    author,
    shortDescription: "Xavf signallari, monitoring oqimlari va hodisalarni aniqlashda mas'ul jamoalarga tezkor qaror qabul qilishga yordam beruvchi AI tizim.",
    description: "Muhofiz AI turli monitoring kanallaridan kelayotgan xavf signallari va hodisalarni aniqlab, mas'ul jamoalarga tezkor va asoslangan qaror qabul qilishda yordam beradi. Tizim inson operatorini almashtirmaydi, balki katta oqimdan muhim vaziyatlarni ajratib, e'tiborni ustuvor holatlarga yo'naltiradi.",
    status: "Faol",
    image: MuhofizImage,
    icon: "shield",
    sector: "Security AI",
    year: "2026",
    leadDepartment: authorLead,
    participants: [author, "Machine Learning", "Infrastructure va Monitoring"],
    stack: ["Anomaly Detection", "Risk Scoring", "Computer Vision", "Audio Analysis", "IoT Monitoring", "Real-time Processing"],
    capabilities: ["Real-time monitoring", "Xavfli hodisalarni aniqlash", "Risk score hisoblash", "Video, audio va sensor signallarini tahlil qilish", "Avtomatik ogohlantirish va notification", "Incident dashboard va analitik hisobotlar"],
    outcomes: ["Muhim hodisalar xavf darajasi bo'yicha ustuvorlashtiriladi.", "Video, audio, sensor va IoT signallari yagona monitoring oqimida ko'rsatiladi.", "Operator qarorini almashtirmasdan, mas'ul jamoa e'tiborini muhim vaziyatlarga yo'naltiradi."],
    metrics: [{ value: "AI", label: "hodisa aniqlash" }, { value: "24/7", label: "monitoring" }, { value: "Risk", label: "ustuvorlashtirish" }],
    stages: [{ title: "Signal qabul qilish", description: "Video, audio, sensor, tarmoq va IoT oqimlari yagona tizimga keladi." }, { title: "Risk tahlili", description: "AI hodisa turini, xavf darajasini va zarur javob ustuvorligini ajratadi." }, { title: "Tezkor javob", description: "Alert, notification va incident dashboard orqali mas'ul jamoaga xabar beriladi." }],
  },
  {
    slug: "mlr-predictor",
    title: "MLR Predictor",
    author,
    shortDescription: "Ob-havo, tuproq va agronomik ko'rsatkichlar asosida ekinlar hosildorligini Machine Learning yordamida prognoz qiluvchi AgriTech platforma.",
    description: "MLR Predictor Abdulhakimov Hojiakbarning magistratura davridagi ilmiy-tadqiqot loyihasi bo'lib, amaliy dasturiy platformaga aylantirilgan. Tizim ekin turi, maydon, harorat, yog'ingarchilik, tuproq pH va NPK ko'rsatkichlari, tarixiy hosildorlik hamda NDVI kabi ma'lumotlardan foydalanib hosilni prognoz qiladi.",
    status: "Joriy etilgan",
    image: MlrImage,
    icon: "chart",
    sector: "AgriTech / ML",
    year: "2026",
    leadDepartment: authorLead,
    participants: [author, "Machine Learning", "AgriTech Analytics"],
    stack: ["Python", "Scikit-learn", "Regression Models", "Flask", "MongoDB", "Model Evaluation"],
    capabilities: ["Hosildorlik prognozi", "Gektar va umumiy hosilni hisoblash", "Ob-havo va tuproq parametrlarini tahlil qilish", "NDVI va sun'iy yo'ldosh ma'lumotlari", "Dron tasvirlari va dala monitoringi", "Model aniqligi va prediction confidence", "Fermer uchun amaliy tavsiyalar"],
    outcomes: ["Ekin hosildorligi gektar va umumiy hajm bo'yicha prognoz qilinadi.", "Dala, xarita, NDVI, dron va ob-havo ma'lumotlarini tahlil qilish imkoniyati yaratiladi.", "R², MAE, MAPE va RMSE metrikalari orqali model sifati baholanadi."],
    metrics: [{ value: "MLR", label: "regression modeli" }, { value: "91.6%", label: "namunaviy aniqlik" }, { value: "Agri", label: "hosildorlik prognozi" }],
    stages: [{ title: "Ma'lumotlarni tayyorlash", description: "Ob-havo, tuproq, dala va agronomik ko'rsatkichlar preprocessing qilinadi." }, { title: "Modelni o'qitish", description: "Regression modeli tanlanadi, o'qitiladi va R², MAE, MAPE hamda RMSE bilan baholanadi." }, { title: "Hosildorlik prognozi", description: "Natijalar dashboard, xarita va fermer uchun amaliy tavsiyalar ko'rinishida chiqariladi." }],
  },
  {
    slug: "eco-ai-platform",
    title: "Ekologik AI Platforma",
    author,
    shortDescription: "Atrof-muhit ko'rsatkichlari, IoT sensorlar va hududiy indikatorlarni birlashtirib ekologik risklarni baholovchi platforma.",
    description: "Ekologik AI Platforma atrof-muhit ko'rsatkichlari, IoT sensorlar va hududiy indikatorlarni yagona axborot tizimiga birlashtiradi. Platforma havo va suv sifati, shovqin, ifloslanish manbalari hamda ekologik risklarni xarita, dashboard va AI tahlili orqali kuzatishga yordam beradi.",
    status: "Sinovda",
    image: EcoImage,
    icon: "leaf",
    sector: "Environmental AI",
    year: "2026",
    leadDepartment: authorLead,
    participants: [author, "IoT va Data Analytics", "AI Research"],
    stack: ["IoT", "Environmental Sensors", "Geospatial Analytics", "Time-series Data", "Machine Learning", "REST API"],
    capabilities: ["Havo sifati va AQI monitoringi", "PM2.5, PM10, NO₂, SO₂, CO va O₃ ko'rsatkichlari", "Suv sifati va shovqin darajasini kuzatish", "Ekologik xarita va hududiy risk darajasi", "Ifloslanish manbalarini tahlil qilish", "Avtomatik ogohlantirish va ekologik tavsiyalar"],
    outcomes: ["AQI, PM2.5, PM10, NO₂, SO₂, CO, O₃ va boshqa ko'rsatkichlar kuzatiladi.", "Xarita va risk modeli orqali kritik hududlar hamda ifloslanish manbalari ajratiladi.", "Avtomatik ogohlantirish, ekologik tavsiyalar va davriy hisobotlar shakllantiriladi."],
    metrics: [{ value: "128", label: "namunaviy sensorlar" }, { value: "AQI", label: "havo sifati" }, { value: "Real-time", label: "monitoring" }],
    stages: [{ title: "Sensor ma'lumotlari", description: "Havo, suv, shovqin va boshqa ekologik indikatorlar real vaqtga yaqin yig'iladi." }, { title: "Xarita va risk tahlili", description: "Hududiy qatlamlar, trendlar va AI asosidagi anomaly detection orqali risklar baholanadi." }, { title: "Ogohlantirish va hisobot", description: "Kritik holatlar bo'yicha ogohlantirishlar, tavsiyalar va haftalik yoki oylik hisobotlar beriladi." }],
  },
  {
    slug: "rag-hujjat-tahlili",
    title: "RAG Hujjat Tahlili",
    author,
    shortDescription: "Katta hajmdagi hujjatlar, normativ matnlar va ichki bilim bazalaridan aniq javob topish uchun RAG arxitekturali AI yordamchi.",
    description: "RAG Hujjat Tahlili PDF, DOCX, TXT, normativ hujjatlar va tashkilotning ichki bilim bazalaridan kerakli ma'lumotni topadi. Parsing, chunking, embedding va semantic retrieval bosqichlari orqali LLM javobni relevant kontekst hamda manba ko'rsatmasi bilan shakllantiradi.",
    status: "Faol",
    image: RagImage,
    icon: "file",
    sector: "LLM / RAG",
    year: "2026",
    leadDepartment: authorLead,
    participants: [author, "LLM va Backend", "Knowledge Engineering"],
    stack: ["Large Language Models", "RAG", "Embeddings", "Vector Search", "Document Parsing", "Access Control"],
    capabilities: ["PDF, DOCX va TXT hujjatlarini yuklash", "Avtomatik parsing va indekslash", "Semantic search va relevant fragmentlarni topish", "Bir nechta hujjat asosida umumlashtirilgan javob", "Javob manbasi va citation ko'rsatish", "Ichki bilim bazalari bilan ishlash", "Foydalanuvchi huquqlari va access control"],
    outcomes: ["PDF, DOCX, TXT, normativ hujjat va ichki reglamentlar bilan ishlaydi.", "Javoblar relevant fragmentlar va manba ko'rsatmalari bilan qaytariladi.", "Access-control konsepsiyasi orqali ichki va maxfiy hujjatlar himoyalanadi."],
    metrics: [{ value: "RAG", label: "arxitektura" }, { value: "Docs", label: "hujjat tahlili" }, { value: "Source", label: "asoslangan javob" }],
    stages: [{ title: "Ingestion va indekslash", description: "Hujjatlar parsing, cleaning, chunking va embedding bosqichlaridan o'tadi." }, { title: "Semantic retrieval", description: "Foydalanuvchi savoliga mos kontekst vector index orqali topiladi." }, { title: "Grounded answer", description: "LLM javobni tanlangan manbalar va citation bilan shakllantiradi." }],
  },
  {
    slug: "dom-finder",
    title: "DomFinder",
    author,
    shortDescription: "Uy ijarasi va savdosi uchun qidiruv, recommendation va antifraud mexanizmlarini birlashtiruvchi aqlli ko'chmas mulk platformasi.",
    description: "DomFinder uy ijaraga olish, sotib olish va ko'chmas mulk obyektlarini joylashtirish jarayonini soddalashtiradi. Uy egasi obyekt rasmlari, tavsifi, narxi va lokatsiyasini joylashtiradi; mijoz esa narx, hudud, maydon va xonalar soni bo'yicha mos variantlarni topadi. Recommendation va antifraud mexanizmlari xavfsizroq tanlovni qo'llab-quvvatlaydi.",
    status: "Sinovda",
    image: DomFinderImage,
    icon: "map",
    sector: "PropTech / AI",
    year: "2026",
    leadDepartment: authorLead,
    participants: [author, "Marketplace Engineering", "Data va AI"],
    stack: ["Recommendation Systems", "Fraud Detection", "Image Analysis", "Search Engine", "Geolocation", "REST API"],
    capabilities: ["Ijara va sotuv e'lonlarini joylashtirish", "Narx, hudud, maydon va xona bo'yicha filter", "Xarita orqali qidirish", "Sevimlilar va yangi e'lonlar bildirishnomasi", "Foydalanuvchi xatti-harakatlari asosida recommendation", "E'lon va foydalanuvchi verifikatsiyasi", "Shubhali e'lonlar uchun antifraud risk score", "Bir xil yoki o'g'irlangan rasmlarni aniqlash"],
    outcomes: ["Ijara va sotuv e'lonlari aniq filter hamda xarita orqali topiladi.", "Qidiruvlar, ko'rilgan uylar va saqlangan e'lonlar asosida tavsiyalar beriladi.", "Verifikatsiya, risk score va antifraud mexanizmlari shubhali e'lonlarni kamaytiradi."],
    metrics: [{ value: "AI", label: "tavsiya mexanizmi" }, { value: "Geo", label: "xarita qidiruvi" }, { value: "Anti-fraud", label: "xavfsiz e'lonlar" }],
    stages: [{ title: "E'lon joylash", description: "Uy egasi obyekt rasmi, tavsifi, narxi va lokatsiyasini joylashtiradi." }, { title: "Mos variantlar", description: "Foydalanuvchi narx, hudud, maydon va xonalar bo'yicha variantlarni saralaydi." }, { title: "Tavsiya va antifraud", description: "Recommendation va risk tahlili foydalanuvchiga xavfsizroq tanlov qilishga yordam beradi." }],
  },
  {
    slug: "coin",
    title: "Coin",
    author,
    shortDescription: "Shaxsiy va biznes moliyasini, tranzaksiyalarni hamda bozor ko'rsatkichlarini yagona dashboardda kuzatuvchi fintech analytics platforma.",
    description: "Coin foydalanuvchining kundalik moliyaviy operatsiyalari, xarajatlari, tushumlari va bozor ko'rsatkichlarini yagona dashboard orqali kuzatishga mo'ljallangan. Tizim moliyaviy tarixni tahlil qilib, noodatiy xarajatlar, budgetdan chiqib ketish xavfi va optimallashtirish imkoniyatlari bo'yicha AI tavsiyalarini shakllantiradi.",
    status: "Faol",
    image: CoinImage,
    icon: "wallet",
    sector: "FinTech / Analytics",
    year: "2026",
    leadDepartment: authorLead,
    participants: [author, "FinTech Engineering", "Data va AI Analytics"],
    stack: ["Transaction Processing", "Financial Analytics", "Time-series Analysis", "Recommendation Systems", "Anomaly Detection", "Secure Authentication"],
    capabilities: ["Kirim va chiqimlarni qayd etish", "Tranzaksiyalar tarixi va xarajat kategoriyalari", "Karta va hamyonlarni boshqarish", "Haftalik va oylik moliyaviy hisobotlar", "Valyuta va bozor aktivlari monitoringi", "Budget nazorati va trendlar", "AI tavsiyalar va noodatiy xarajatlarni aniqlash", "Shubhali operatsiyalarni kuzatish"],
    outcomes: ["Kirim, chiqim, tranzaksiyalar va budjet yagona dashboardda kuzatiladi.", "Valyuta, qimmatbaho metallar va tanlangan bozor aktivlari dinamikasi ko'rsatiladi.", "AI analytics noodatiy xarajatlar va budgetdan chiqib ketish xavfini aniqlaydi."],
    metrics: [{ value: "Live", label: "moliyaviy monitoring" }, { value: "AI", label: "tavsiyalar" }, { value: "BI", label: "analytics panel" }],
    stages: [{ title: "Tranzaksiyalar", description: "Kirim, chiqim, karta, hamyon va xarajat kategoriyalari qayd etiladi." }, { title: "Analytics", description: "Vaqt bo'yicha dinamika, bozor ko'rsatkichlari va noodatiy o'zgarishlar tahlil qilinadi." }, { title: "AI tavsiyalar", description: "Foydalanuvchiga xarajatlarni optimallashtirish va budjetni nazorat qilish bo'yicha tavsiyalar beriladi." }],
  },
  {
    slug: "mukammal-training",
    title: "AIRI Training / Mukammal Training",
    author,
    shortDescription: "Professor-o'qituvchilar va mutaxassislar uchun AI, Machine Learning, Computer Vision va NLP bo'yicha malaka oshirish LMS platformasi.",
    description: "AIRI Training / Mukammal Training — sun'iy intellektni nazariya bilan cheklamasdan, amaliy kurslar va laboratoriya topshiriqlari orqali o'rgatuvchi institutsional LMS platforma. Student, teacher va superadmin kabinetlari, kurslar, progress, baholash, sertifikatlash hamda AI chatbot imkoniyatlari yagona tizimda jamlangan. Platforma training.airi.uz manzilida ishlaydi.",
    status: "Joriy etilgan",
    image: TrainingImage,
    icon: "brain",
    sector: "EdTech / AI",
    year: "2026",
    leadDepartment: authorLead,
    participants: [author, "Education Platform", "AI va Infrastructure"],
    stack: ["React", "Vite", "TypeScript", "Django", "REST API", "PostgreSQL", "Redis / Celery", "Docker / Nginx"],
    capabilities: ["Student, teacher va superadmin kabinetlari", "Kurs, modul va darslarni boshqarish", "Video kontent va laboratoriya topshiriqlari", "Foydalanuvchi progressi va baholash", "Sertifikatlash va mustaqil ta'lim", "AI chatbot integratsiyasi", "Background processing va video processing", "Docker, Nginx va PostgreSQL asosidagi production infratuzilma"],
    outcomes: ["AI asoslari, Machine Learning, Computer Vision va NLP bo'yicha kurslar birlashtiriladi.", "Video dars, laboratoriya, progress, baholash va sertifikatlash jarayonlari boshqariladi.", "Production LMS platformasi real foydalanuvchilar uchun server infratuzilmasiga joylashtirilgan."],
    metrics: [{ value: "500+", label: "o'qituvchilar" }, { value: "20+", label: "ixtisoslashgan kurslar" }, { value: "LMS", label: "production platforma" }],
    stages: [{ title: "Kurslar va kabinetlar", description: "Student, teacher va superadmin rollari hamda kurs-modul-dars tuzilmasi tashkil qilinadi." }, { title: "Amaliy ta'lim", description: "Video kontent, laboratoriya topshiriqlari, mustaqil ta'lim va AI chatbot o'quv jarayonini qo'llab-quvvatlaydi." }, { title: "Progress va joriy etish", description: "Baholash, sertifikatlash, background tasklar va production deploy orqali platforma barqaror ishlaydi." }],
  },
];

export const focusAreas = [
  "Ilmiy tadqiqotlar",
  "AI loyihalar",
  "Hamkorliklar",
  "Ishlab chiqarish jarayonlari",
  "Jamoa",
  "Innovatsion platformalar",
];

export const statusTextStyles: Record<ProjectStatus, string> = {
  Faol: "text-emerald-300",
  "Joriy etilgan": "text-sky-300",
  Sinovda: "text-amber-300",
};

export const statusStyles: Record<ProjectStatus, string> = {
  Faol: "border-emerald-300/40 bg-emerald-300/12 text-emerald-100",
  "Joriy etilgan": "border-sky-300/40 bg-sky-300/12 text-sky-100",
  Sinovda: "border-amber-300/40 bg-amber-300/12 text-amber-100",
};

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
