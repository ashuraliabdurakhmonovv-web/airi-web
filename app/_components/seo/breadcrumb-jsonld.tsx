/** @format */

import { canonicalUrl } from "@/config/seo";
import { crumbChain, crumbLabel, localePath, type RouteLocale } from "@/config/pages";
import JsonLd from "./json-ld";

/**
 * BreadcrumbList — qidiruv natijasida yalang'och URL o'rniga bo'lim yo'lini
 * ko'rsatadi: "airi.uz › Umumiy ma'lumot › Institut haqida".
 *
 * Zanjir `config/pages.json` dagi `parent` maydonidan quriladi, shuning uchun
 * yangi sahifa qo'shilganda bu komponentga tegish shart emas.
 *
 * DIQQAT: sahifaga XOS `layout.tsx` yoki server `page.tsx` ga qo'ying.
 * Bo'lim layoutiga (masalan `umumiy-malumot/(umumiy-malumot)/layout.tsx`)
 * qo'yilsa, uning ostidagi 20 dan ortiq sahifa bir xil — ya'ni noto'g'ri —
 * zanjirni e'lon qiladi.
 */
export default function BreadcrumbJsonLd({
  path,
  locale = "uz",
  leaf,
}: {
  path: string;
  locale?: RouteLocale;
  /**
   * Registrda o'z yozuvi yo'q dinamik sahifalar uchun oxirgi bo'g'in
   * (yangilik sarlavhasi, xodim ismi va h.k.).
   */
  leaf?: { name: string; path: string };
}) {
  const chain = crumbChain(path);

  const items = chain.map((crumbPath, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumbLabel(crumbPath, locale),
    item: canonicalUrl(localePath(crumbPath, locale)),
  }));

  if (leaf) {
    items.push({
      "@type": "ListItem",
      position: items.length + 1,
      name: leaf.name,
      item: canonicalUrl(localePath(leaf.path, locale)),
    });
  }

  // Bitta bo'g'inli zanjir (faqat bosh sahifa) foydasiz.
  if (items.length < 2) return null;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl(localePath(leaf?.path ?? path, locale))}#breadcrumb`,
        itemListElement: items,
      }}
    />
  );
}
