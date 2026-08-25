/** @format */

import type { ReactNode } from "react";
import type { RouteLocale } from "@/config/pages";
import UzProvider from "@/i18n/providers/uz-provider";
import RuProvider from "@/i18n/providers/ru-provider";
import EnProvider from "@/i18n/providers/en-provider";

/**
 * Til bo'yicha mos `LocaleProvider` ni tanlaydigan server komponenti.
 *
 * Nega uchta alohida provider moduli, bitta `locale` prop o'rniga: har biri
 * o'z lug'atini STATIK import qiladi, shuning uchun webpack `/ru/**` chunk
 * grafiga faqat ruscha lug'atni qo'shadi — o'zbekcha sahifalar ruscha
 * lug'at yukini ko'tarmaydi.
 */
export default function LocaleBoundary({
  locale,
  children,
}: {
  locale: RouteLocale;
  children: ReactNode;
}) {
  if (locale === "ru") return <RuProvider>{children}</RuProvider>;
  if (locale === "en") return <EnProvider>{children}</EnProvider>;
  return <UzProvider>{children}</UzProvider>;
}
