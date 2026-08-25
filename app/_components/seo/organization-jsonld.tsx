/** @format */

import { SITE_URL } from "@/config/seo";

/**
 * Institut haqidagi schema.org ma'lumotlari (JSON-LD).
 *
 * Nega kerak: sayt kontenti faqat o'zbekcha indekslanadi (til `localStorage`
 * orqali almashadi, URL'da `/ru/` yo'q), shuning uchun Google ruscha va
 * inglizcha so'rovlarda ("НИИ искусственного интеллекта", "институт ии")
 * institutni tanimasdi va eski saytni ko'rsatib turardi. `alternateName`
 * ro'yxati institutning rasmiy nomlarini uch tilda bitta obyektga bog'laydi —
 * bu Google Knowledge Graph uchun tilga bog'liq bo'lmagan signal.
 *
 * Bu to'liq ko'p tilli SEO o'rnini bosmaydi (buning uchun `/ru/`, `/en/`
 * URL'lari va hreflang kerak) — lekin brend so'rovlarida darhol yordam beradi.
 */
export default function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["EducationalOrganization", "ResearchOrganization"],
        "@id": `${SITE_URL}/#organization`,
        name: "Raqamli texnologiyalar va sunʼiy intellektni rivojlantirish ilmiy-tadqiqot instituti",
        alternateName: [
          "AIRI",
          // Ruscha rasmiy va qisqa nomlar — qidiruvda aynan shular yozilyapti
          "Научно-исследовательский институт развития цифровых технологий и искусственного интеллекта",
          "НИИ развития цифровых технологий и искусственного интеллекта",
          "НИИ искусственного интеллекта",
          "Институт искусственного интеллекта",
          // Inglizcha
          "Research Institute for the Development of Digital Technologies and Artificial Intelligence",
          "Artificial Intelligence Research Institute",
          // O'zbekcha qisqa shakllar
          "Sunʼiy intellekt instituti",
          "Raqamli texnologiyalar instituti",
        ],
        url: `${SITE_URL}/`,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/airi-logo_uz.png`,
        },
        image: `${SITE_URL}/og-image.jpg`,
        description:
          "Raqamli transformatsiya, ma'lumotlar tahlili, kompyuter ko'rishi va tabiiy tilni qayta ishlash sohalarida amaliy ilmiy tadqiqotlar olib boruvchi davlat ilmiy-tadqiqot instituti.",
        knowsLanguage: ["uz", "ru", "en"],
        address: {
          "@type": "PostalAddress",
          streetAddress: "Mirzo Ulug'bek tumani, Bo'z-2, 17A",
          addressLocality: "Toshkent",
          postalCode: "100125",
          addressCountry: "UZ",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+998712634198",
          email: "info@airi.uz",
          contactType: "customer support",
          availableLanguage: ["uz", "ru", "en"],
        },
        sameAs: [
          "https://t.me/airiuz",
          "https://www.instagram.com/airi.uz/",
          "https://www.linkedin.com/company/airiuz",
          "https://youtube.com/@airi_uz",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: "AIRI",
        inLanguage: ["uz", "ru", "en"],
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify chiqishi ishonchli (statik obyekt), XSS xavfi yo'q.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
