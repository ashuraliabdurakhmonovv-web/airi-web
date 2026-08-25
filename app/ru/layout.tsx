/** @format */

import type { Metadata } from "next";
import RootShell from "../_root/root-shell";
import { rootMetadata } from "../_root/root-metadata";

/**
 * Ruscha daraxtning ROOT layouti — `<html lang="ru">`.
 *
 * `app/(pages)/layout.tsx` bilan bir darajada turadi (ikkalasi ham `app/`
 * ostidagi eng yuqori layout), shuning uchun Next ikkalasini ham mustaqil
 * root layout deb qabul qiladi.
 *
 * Ichkarida `RootShell` `RuProvider` ni tanlaydi va u ruscha lug'atni STATIK
 * import qiladi — natijada `out/ru/**` HTML fayllari ruscha matn bilan
 * chiqadi. Butun ko'p tilli SEO ishining maqsadi shu.
 */
export const metadata: Metadata = rootMetadata("ru");

export default function RuRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootShell locale="ru">{children}</RootShell>;
}
