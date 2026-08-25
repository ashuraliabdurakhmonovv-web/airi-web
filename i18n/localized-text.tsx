"use client";

import { useLocale } from "./locale-provider";
import { localizeResearchInfo } from "./research-info-locales";
import { localizeProductionInfo } from "./production-info-locales";

export function LocalizedText({
  uz,
  ru,
  en,
}: {
  uz: string;
  ru: string;
  en: string;
}) {
  const { locale } = useLocale();
  return <>{locale === "ru" ? ru : locale === "en" ? en : uz}</>;
}

export function LocalizedResearchText({ value }: { value: string }) {
  const { locale } = useLocale();
  return <>{localizeResearchInfo(value, locale)}</>;
}

export function LocalizedProductionText({ value }: { value: string }) {
  const { locale } = useLocale();
  return <>{localizeProductionInfo(value, locale)}</>;
}
