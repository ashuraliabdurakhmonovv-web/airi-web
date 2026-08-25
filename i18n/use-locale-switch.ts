/** @format */

"use client";

import { useCallback } from "react";
import { usePathname } from "next/navigation";
import { useLocale } from "./index";
import type { Locale } from "./config";
import { PAGES, localePath, normalizePath } from "@/config/pages";

/** Yo'l boshidagi `/ru` yoki `/en` prefiksini olib tashlaydi. */
function stripLocale(pathname: string): string {
  return normalizePath(pathname.replace(/^\/(?:ru|en)(?=\/|$)/, "") || "/");
}

/**
 * Til almashtirish.
 *
 * Ikki xil holat bor va ular chalkashtirilmasligi kerak:
 *
 *   1. Joriy sahifaning TARJIMASI BOR (registrda `locales` ichida) —
 *      o'sha tildagi URL'ga o'tamiz. Bu to'g'ri xatti-harakat: foydalanuvchi
 *      ham, qidiruv tizimi ham bir xil manzilda bir xil tilni ko'radi.
 *
 *      O'tish ataylab `window.location.assign` orqali, `<Link>` bilan emas:
 *      `/` va `/ru/` daraxtlarining ROOT layoutlari boshqacha (`<html lang>`
 *      farq qiladi), Next esa root layoutlar orasida client-side navigatsiya
 *      qila olmaydi.
 *
 *   2. Tarjimasi YO'Q — eski xatti-harakat saqlanadi: sahifa o'sha URL'da
 *      qoladi, matn `localStorage` orqali almashadi. Mavjud bo'lmagan
 *      `/ru/...` manziliga yuborish 404 berardi.
 */
export function useLocaleSwitch() {
  const { locale, setLocale } = useLocale();
  const pathname = usePathname();

  const switchLocale = useCallback(
    (next: Locale) => {
      if (next === locale) return;

      const basePath = stripLocale(pathname ?? "/");
      const entry = PAGES[basePath];

      if (entry?.locales.includes(next)) {
        // Tanlovni saqlaymiz: bu foydalanuvchining ATAYLAB qilgan tanlovi,
        // shuning uchun tarjimasi yo'q sahifalarga o'tganda ham o'sha til
        // qolishi kerak.
        //
        // DIQQAT: buni `LocaleProvider` ning `routeLocked` tarmog'iga
        // ko'chirmang. U yerda yozilsa, `/ru/` ga shunchaki KIRISH ham
        // tanlovni o'zgartirib yuborardi va o'zbekcha manzillar ruscha
        // ko'rinib qolardi.
        try {
          localStorage.setItem("locale", next);
        } catch {
          // Cheklangan brauzer rejimlarida `localStorage` mavjud bo'lmasligi mumkin.
        }
        const nextPath = localePath(basePath, next);
        window.location.assign(nextPath === "/" ? "/" : `${nextPath}/`);
        return;
      }

      setLocale(next);
    },
    [locale, pathname, setLocale],
  );

  return { locale, switchLocale };
}
