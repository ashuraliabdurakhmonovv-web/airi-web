/** @format */

import type { Metadata } from "next";
import RootShell from "../_root/root-shell";
import { rootMetadata } from "../_root/root-metadata";

/**
 * O'zbekcha daraxtning ROOT layouti.
 *
 * `(pages)` — route group, ya'ni URL'ga ta'sir qilmaydi: bu fayl ostidagi
 * sahifalar avvalgidek `/umumiy-malumot/...`, `/ilmiy-tadqiqot/...` da
 * qoladi. Lekin endi u root layout hisoblanadi va `<html lang="uz">` ni
 * o'zi beradi — shu tufayli `app/ru/layout.tsx` o'z `<html lang="ru">` ini
 * bera oladi.
 */
export const metadata: Metadata = rootMetadata("uz");

export default function UzRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootShell locale="uz">{children}</RootShell>;
}
