/** @format */

import { canonicalUrl } from "@/config/seo";
import JsonLd from "./json-ld";

/**
 * FAQPage schema.org markup'i.
 *
 * Google savol-javoblarni qidiruv natijasi ostida kengaytirilgan blok
 * sifatida ko'rsatishi mumkin — bu natija egallagan joyni kattalashtiradi.
 *
 * Talab: markup'dagi savol va javob sahifada foydalanuvchiga ham
 * KO'RINIB turishi shart. Shuning uchun ro'yxat sahifaning o'zi chizadigan
 * `t.faqPage.items` bilan bir xil manbadan olinadi.
 */
export default function FaqPageJsonLd({
  items,
  path,
}: {
  items: readonly { question: string; answer: string }[];
  path: string;
}) {
  if (!items.length) return null;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${canonicalUrl(path)}#faq`,
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }}
    />
  );
}
