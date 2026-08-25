/** @format */

"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { Locale } from "./config";
import { defaultLocale, locales } from "./config";
import type { Dictionary } from "./dictionaries/uz";
import uzDict from "./dictionaries/uz";

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
}

const LocaleContext = createContext<LocaleContextType>({
  locale: defaultLocale,
  setLocale: () => {},
  t: uzDict,
});

function getStoredLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale;
  const stored = localStorage.getItem("locale");
  if (stored && locales.includes(stored as Locale)) {
    return stored as Locale;
  }
  return defaultLocale;
}

const dictionaryCache: Partial<Record<Locale, Dictionary>> = {
  uz: uzDict,
};

async function loadDictionary(locale: Locale): Promise<Dictionary> {
  const cached = dictionaryCache[locale];
  if (cached) return cached;

  let dict: Dictionary;
  switch (locale) {
    case "ru":
      dict = (await import("./dictionaries/ru")).default;
      break;
    case "en":
      dict = (await import("./dictionaries/en")).default;
      break;
    default:
      dict = uzDict;
  }
  dictionaryCache[locale] = dict;
  return dict;
}

export function LocaleProvider({
  children,
  initialLocale = defaultLocale,
  initialDictionary = uzDict,
  routeLocked = false,
}: {
  children: ReactNode;
  /** Marshrutdan keladigan til. Serverda ham shu qiymat bilan render bo'ladi. */
  initialLocale?: Locale;
  /**
   * Boshlang'ich lug'at. STATIK import qilingan bo'lishi shart — shundagina
   * RSC render, ya'ni eksport qilingan HTML, o'sha tildagi matnni oladi.
   */
  initialDictionary?: Dictionary;
  /**
   * `true` — til URL bilan belgilangan (`/ru/`, `/en/`) va `localStorage`
   * uni bekor qila olmaydi. Aks holda berilgan HTML bir tilda, hidratsiyadan
   * keyingi DOM boshqa tilda bo'lib qolardi.
   */
  routeLocked?: boolean;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [dictionary, setDictionary] = useState<Dictionary>(initialDictionary);
  const [mounted, setMounted] = useState(false);

  // `setState` effekt ichida ataylab: server render har doim `initialLocale`
  // bilan chiqadi (statik eksportda `localStorage` mavjud emas), saqlangan
  // tanlov esa faqat brauzerda ma'lum bo'ladi. Bu — tashqi tizim bilan
  // sinxronizatsiya, ya'ni effektning to'g'ri ishlatilishi.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (routeLocked) {
      // `localStorage` ga ATAYLAB YOZILMAYDI.
      //
      // Avval bu yerda `setItem("locale", initialLocale)` bor edi va u
      // quyidagi xatoga olib kelardi: foydalanuvchi bir marta `/ru/` ga
      // kirsa, saqlangan til "ru" bo'lib qolardi va orqaga qaytganda
      // O'ZBEKCHA manzillar ham ruscha ko'rinardi. Bundan tashqari, o'zbekcha
      // sahifada berilgan HTML (uz) va hidratsiyadan keyingi DOM (ru) bir-biriga
      // zid bo'lardi.
      //
      // Til manbasi bu daraxtlarda — URL, `localStorage` emas. Ildizdagi
      // o'zbekcha daraxt esa o'z tanlovini mustaqil saqlaydi.
      document.documentElement.lang = initialLocale;
      setMounted(true);
      return;
    }

    const stored = getStoredLocale();
    setLocaleState(stored);
    loadDictionary(stored).then(setDictionary);
    document.documentElement.lang = stored;
    setMounted(true);
  }, [routeLocked, initialLocale]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
    document.documentElement.lang = newLocale;
    loadDictionary(newLocale).then(setDictionary);
  }, []);

  if (!mounted) {
    // DIQQAT: bu yerda avval `defaultLocale`/`uzDict` qattiq yozilgan edi —
    // aynan shu sabab eksport qilingan HTML har doim o'zbekcha chiqardi va
    // ruscha/inglizcha qidiruvda sayt umuman topilmasdi.
    return (
      <LocaleContext.Provider
        value={{ locale: initialLocale, setLocale, t: initialDictionary }}>
        {children}
      </LocaleContext.Provider>
    );
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: dictionary }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
