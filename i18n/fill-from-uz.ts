/** @format */

import type { Locale } from "./config";

/**
 * Tarjima daraxtini o'zbekcha daraxt bo'yicha TO'LDIRADI.
 *
 * Muammo: ma'lumot massivlari (`common/lab/data.ts`, `common/conferences/data.ts`)
 * va tarjima massivlari (`i18n/research-content.ts`) INDEKS bo'yicha juftlanadi:
 *
 *     laboratories.map((lab, index) => copy.laboratories.items[index].name)
 *
 * Yangi laboratoriya qo'shilib tarjimasi unutilsa, `items[index]` = `undefined`
 * bo'ladi va `.name` o'qilganda `next build` YIQILADI — bitta tarjima tufayli
 * butun sayt chiqmaydi.
 *
 * Yechim: ~30 ta chaqiruv joyida `?.` yozish o'rniga daraxtni bir marta
 * o'zbekcha bilan to'ldiramiz. Tarjima yetishmasa foydalanuvchi o'zbekcha
 * matnni ko'radi — bu bo'sh ekran yoki yiqilgan build'dan afzal.
 *
 * Massiv uzunligi HAR DOIM o'zbekchadan olinadi: qisqa tarjima teshik
 * qoldirmaydi, uzun tarjima esa ma'lumot massividan oshib ketmaydi.
 */
export function fillFromUz<T>(uz: T, translated: unknown): T {
  if (translated === undefined || translated === null) return uz;

  if (Array.isArray(uz)) {
    const source = Array.isArray(translated) ? translated : [];
    return uz.map((item, index) => fillFromUz(item, source[index])) as unknown as T;
  }

  if (uz && typeof uz === "object") {
    if (typeof translated !== "object" || Array.isArray(translated)) return uz;
    const out: Record<string, unknown> = {};
    for (const key of Object.keys(uz as object)) {
      out[key] = fillFromUz(
        (uz as Record<string, unknown>)[key],
        (translated as Record<string, unknown>)[key],
      );
    }
    return out as T;
  }

  // Yaproq: tarjima bor, lekin turi boshqacha bo'lsa o'zbekchani saqlaymiz.
  return typeof translated === typeof uz ? (translated as T) : uz;
}

/**
 * Dev rejimida locale daraxtlari orasidagi nomuvofiqlikni konsolga yozadi.
 *
 * `fillFromUz` teshiklarni jimgina yopadi — bu ishlab chiqarishda to'g'ri
 * xatti-harakat, lekin ishlab chiqish paytida tarjima unutilgani sezilmay
 * qolishi mumkin. Shu funksiya uni ko'rinadigan qiladi. Production build'da
 * chaqiruv `process.env.NODE_ENV` sharti ortida qolib, dead-code sifatida
 * olib tashlanadi.
 */
export function warnParity(label: string, uz: unknown, translated: unknown, locale: Locale, path = ""): void {
  if (translated === undefined || translated === null) {
    console.warn(`[i18n:${label}] ${locale}: "${path || "(ildiz)"}" yo'q — o'zbekchasi ishlatiladi`);
    return;
  }

  if (Array.isArray(uz)) {
    if (!Array.isArray(translated)) {
      console.warn(`[i18n:${label}] ${locale}: "${path}" massiv bo'lishi kerak edi`);
      return;
    }
    if (translated.length !== uz.length) {
      console.warn(`[i18n:${label}] ${locale}: "${path}" uzunligi ${translated.length}, o'zbekchada ${uz.length}`);
    }
    uz.forEach((item, index) => warnParity(label, item, translated[index], locale, `${path}[${index}]`));
    return;
  }

  if (uz && typeof uz === "object") {
    if (typeof translated !== "object") return;
    for (const key of Object.keys(uz as object)) {
      warnParity(
        label,
        (uz as Record<string, unknown>)[key],
        (translated as Record<string, unknown>)[key],
        locale,
        path ? `${path}.${key}` : key,
      );
    }
  }
}
