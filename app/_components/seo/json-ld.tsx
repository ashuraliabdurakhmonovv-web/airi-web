/** @format */

/**
 * Barcha schema.org komponentlari uchun umumiy asos.
 *
 * `dangerouslySetInnerHTML` bu yerda xavfsiz: kiruvchi qiymat — bizning
 * ma'lumotlarimizdan yasalgan obyekt, `JSON.stringify` esa `<`, `&` kabi
 * belgilarni JSON qochirish qoidalari bo'yicha chiqaradi. Yagona real xavf —
 * matn ichida `</script>` uchrashi, shuning uchun uni ataylab neytrallaymiz.
 */
export default function JsonLd({ data }: { data: object }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
