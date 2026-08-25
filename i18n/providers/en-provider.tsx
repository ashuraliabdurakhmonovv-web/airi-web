/** @format */

"use client";

import type { ReactNode } from "react";
import enDict from "../dictionaries/en";
import { LocaleProvider } from "../locale-provider";

/**
 * `/en/**` daraxti uchun provider. Mantiq `ru-provider.tsx` bilan bir xil:
 * lug'at statik import qilinadi, til URL bilan qulflanadi.
 */
export default function EnProvider({ children }: { children: ReactNode }) {
  return (
    <LocaleProvider initialLocale="en" initialDictionary={enDict} routeLocked>
      {children}
    </LocaleProvider>
  );
}
