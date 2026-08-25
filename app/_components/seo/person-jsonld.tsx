/** @format */

import { SITE_URL, canonicalUrl } from "@/config/seo";
import JsonLd from "./json-ld";

/**
 * Xodim / ustoz / bitiruvchi sahifasi uchun Person schema.org markup'i.
 *
 * Nega kerak: Search Console'da shaxs sahifalari juda yuqori CTR beradi
 * (masalan eski `/elbekqosimov` — 33%, `/teachersmirzayevnomoz` — 17%), lekin
 * ko'rsatishlar soni juda past. Ya'ni odamlar institut xodimlarini ism bo'yicha
 * qidiryapti, biroq sahifalar yaxshi indekslanmagan. `Person` markup'i
 * ism–lavozim–tashkilot bog'lanishini aniq beradi.
 *
 * `worksFor` institutni qayta ta'riflamaydi, `@id` orqali
 * `organization-jsonld.tsx` dagi obyektga ishora qiladi.
 */
export default function PersonJsonLd({
  name,
  path,
  image,
  jobTitle,
  description,
  honorificSuffix,
  sameAs,
  alumni = false,
}: {
  name: string;
  /** Sayt ildizidan boshlangan yo'l — canonical bilan bir xil bo'lishi shart. */
  path: string;
  image?: string;
  jobTitle?: string;
  description?: string;
  /** Ilmiy daraja/unvon: "PhD", "DSc", "professor". */
  honorificSuffix?: string;
  sameAs?: string[];
  /** Bitiruvchilar uchun `alumniOf`, xodimlar uchun `worksFor`. */
  alumni?: boolean;
}) {
  const url = canonicalUrl(path);
  const organization = { "@id": `${SITE_URL}/#organization` };

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `${url}#person`,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        name,
        url,
        ...(image ? { image: image.startsWith("http") ? image : `${SITE_URL}${image}` } : {}),
        ...(jobTitle ? { jobTitle } : {}),
        ...(description ? { description } : {}),
        ...(honorificSuffix ? { honorificSuffix } : {}),
        ...(sameAs?.length ? { sameAs } : {}),
        ...(alumni ? { alumniOf: organization } : { worksFor: organization }),
      }}
    />
  );
}
