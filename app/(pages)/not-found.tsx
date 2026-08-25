/** @format */

/**
 * O'zbekcha daraxt uchun 404.
 *
 * `app/not-found.tsx` endi ildizda emas, `(pages)` root layouti ostida —
 * shuning uchun uni shu yerdan qayta eksport qilamiz. Shunda `(pages)`
 * ostidagi `notFound()` chaqiruvlari navbar/footer va til provideri bilan
 * birga to'liq sahifani ko'rsatadi.
 */
export { default } from "../not-found";
