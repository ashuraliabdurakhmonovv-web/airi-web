/** @format */

"use client";

import { useEffect } from "react";

const THEME_CLASSES = [
  "theme-light",
  "theme-dark",
  "theme-high-contrast",
  "theme-grayscale",
];

const getThemeClass = (theme: string) =>
  `theme-${theme === "highContrast" ? "high-contrast" : theme}`;

export default function ClientPreferences({
  /**
   * `/ru/` va `/en/` daraxtlarida marshrut tili. Berilgan bo'lsa,
   * `localStorage` dagi tanlov `<html lang>` ni QAYTA YOZMAYDI.
   *
   * Nega muhim: bu funksiya avval `root.lang` ni shartsiz `localStorage`
   * qiymatiga o'rnatardi. Ruscha sahifada saqlangan til "uz" bo'lsa,
   * HTML `lang="ru"` bilan kelib, hidratsiyadan keyin `lang="uz"` ga
   * o'zgarardi. Googlebot JS'ni render qiladi va bunday ziddiyatda
   * hreflang klasterini rad etadi.
   */
  routeLocale,
}: {
  routeLocale?: string;
}) {
  useEffect(() => {
    try {
      const root = document.documentElement;
      const theme = localStorage.getItem("themeMode") || "light";
      const scale = localStorage.getItem("textScale");

      root.classList.remove(...THEME_CLASSES);
      root.classList.add(getThemeClass(theme));
      if (!routeLocale) root.lang = localStorage.getItem("locale") || "uz";

      if (scale && Number(scale) !== 1) {
        root.style.setProperty("--text-scale", scale);
        root.style.fontSize = `${Number(scale) * 100}%`;
      } else {
        root.style.removeProperty("--text-scale");
        root.style.removeProperty("font-size");
      }
    } catch {
      // Ignore storage access errors, for example in restricted browser modes.
    }
  }, [routeLocale]);

  return null;
}
