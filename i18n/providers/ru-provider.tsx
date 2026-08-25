/** @format */

"use client";

import type { ReactNode } from "react";
import ruDict from "../dictionaries/ru";
import { LocaleProvider } from "../locale-provider";

/**
 * `/ru/**` daraxti uchun provider.
 *
 * Lug'at ATAYLAB statik import qilingan (`loadDictionary()` ning dinamik
 * `import()` yo'li emas): shundagina RSC render — ya'ni `out/ru/.../index.html`
 * — allaqachon ruscha matnni o'z ichiga oladi. Butun ko'p tilli SEO ishining
 * mohiyati shu; dinamik yuklashda HTML bo'sh yoki o'zbekcha chiqardi.
 *
 * `routeLocked` — URL tilni belgilaydi, `localStorage` uni bekor qilmaydi.
 */
export default function RuProvider({ children }: { children: ReactNode }) {
  return (
    <LocaleProvider initialLocale="ru" initialDictionary={ruDict} routeLocked>
      {children}
    </LocaleProvider>
  );
}
