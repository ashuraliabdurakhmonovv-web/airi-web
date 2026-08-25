/** @format */

"use client";

import type { ReactNode } from "react";
import uzDict from "../dictionaries/uz";
import { LocaleProvider } from "../locale-provider";

/**
 * O'zbekcha (ildiz) daraxt uchun provider.
 *
 * `routeLocked` BERILMAYDI: bu URL'lar til prefiksisiz va foydalanuvchi
 * til almashtirgich orqali ru/en ga o'tishi mumkin — `localStorage` dagi
 * tanlov o'z kuchida qoladi.
 */
export default function UzProvider({ children }: { children: ReactNode }) {
  return (
    <LocaleProvider initialLocale="uz" initialDictionary={uzDict}>
      {children}
    </LocaleProvider>
  );
}
