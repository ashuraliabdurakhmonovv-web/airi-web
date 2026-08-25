/** @format */

import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries/uz";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  uz: () => import("./dictionaries/uz").then((m) => m.default),
  ru: () => import("./dictionaries/ru").then((m) => m.default),
  en: () => import("./dictionaries/en").then((m) => m.default),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  return dictionaries[locale]();
};
