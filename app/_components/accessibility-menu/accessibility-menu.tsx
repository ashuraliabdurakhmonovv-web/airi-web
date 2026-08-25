/** @format */
"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import FontSizeController from "../font-size-slider/font-size-slider";
import {
  Accessibility,
  Check,
  ChevronDown,
  Languages,
  Settings2,
  SlidersHorizontal,
} from "lucide-react";
import { useLocale } from "@/i18n";
import { useLocaleSwitch } from "@/i18n/use-locale-switch";
import type { Locale } from "@/i18n";

const languages: { code: Locale; label: string; name: string }[] = [
  { code: "uz", label: "UZ", name: "O'zbek" },
  { code: "ru", label: "RU", name: "Русский" },
  { code: "en", label: "EN", name: "English" },
];

type AccessibilityMenuProps = {
  icon?: "accessibility" | "sliders";
  variant?: "dropdown" | "inline";
};

export function AccessibilityMenu({
  icon = "accessibility",
  variant = "dropdown",
}: AccessibilityMenuProps) {
  const { t } = useLocale();
  // Tarjimasi bor sahifada URL'ga o'tadi, aks holda joyida almashtiradi.
  const { locale, switchLocale } = useLocaleSwitch();
  const [isInlineOpen, setIsInlineOpen] = useState(false);
  const TriggerIcon = icon === "sliders" ? SlidersHorizontal : Accessibility;

  const activeLanguage = languages.find((lang) => lang.code === locale);

  const content = (
    <>
      <div className="border-b border-slate-200 bg-white px-4 py-4">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center border border-[#604eff]/15 bg-[#604eff]/5 text-[#604eff]">
            <Settings2 className="size-4 stroke-[2.4]" />
          </span>

          <div className="min-w-0">
            <p className="text-sm font-bold leading-none text-slate-950">
              {t.accessibilityMenu.title}
            </p>
            <p className="mt-1.5 text-xs font-medium leading-snug text-slate-500">
              {t.accessibilityMenu.subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
              <Languages className="size-4 text-[#604eff]" />
              <span>{t.accessibilityMenu.language}</span>
            </div>

            <span className="border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-500">
              {activeLanguage?.name}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {languages.map((lang) => {
              const isActive = locale === lang.code;

              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => switchLocale(lang.code)}
                  aria-label={lang.name}
                  className={`relative border px-3 py-2.5 text-xs font-bold tracking-[0.14em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#604eff]/30 ${
                    isActive
                      ? "border-[#604eff] bg-[#604eff] text-white"
                      : "border-slate-200 bg-slate-50 text-slate-600 hover:border-[#604eff]/35 hover:bg-[#604eff]/5 hover:text-[#604eff]"
                  }`}
                >
                  {lang.label}

                  {isActive && (
                    <Check className="absolute right-1.5 top-1.5 size-3" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="h-px bg-slate-200" />

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
            <SlidersHorizontal className="size-4 text-[#604eff]" />
            <span>{t.fontSizeController.fontSize}</span>
          </div>

          <div className="accessibility-controller-wrapper border border-slate-200 bg-slate-50 p-3">
            <FontSizeController />
          </div>
        </div>
      </div>
    </>
  );

  if (variant === "inline") {
    return (
      <div className="overflow-hidden border border-slate-200 bg-white shadow-sm">
        <button
          type="button"
          onClick={() => setIsInlineOpen((open) => !open)}
          aria-expanded={isInlineOpen}
          className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-[15px] font-semibold text-slate-700 transition hover:bg-[#604eff]/5 hover:text-[#604eff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#604eff]/30"
        >
          <span className="flex min-w-0 items-center gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center bg-[#604eff]/10 text-[#604eff]">
              <TriggerIcon className="size-6 stroke-[2.3]" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block leading-5">{t.accessibilityMenu.title}</span>
              <span className="block text-xs font-medium leading-4 text-slate-500">
                {t.accessibilityMenu.shortSubtitle}
              </span>
            </span>
          </span>

          <ChevronDown
            className={`size-4 shrink-0 stroke-[2.5] transition-transform duration-200 ${
              isInlineOpen ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ${
            isInlineOpen ? "max-h-[40rem] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-slate-200">{content}</div>
        </div>

        <style jsx global>{`
          .accessibility-controller-wrapper > div {
            display: flex !important;
            width: 100% !important;
            border: 0 !important;
            background: transparent !important;
            padding: 0 !important;
            box-shadow: none !important;
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            aria-label={t.accessibilityMenu.ariaLabel}
            className="group inline-flex h-11 w-11 items-center justify-center gap-2 border border-slate-200 bg-white px-0 text-slate-700 shadow-sm transition-all duration-200 hover:border-[#604eff]/35 hover:bg-[#f8faff] hover:text-[#604eff] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#604eff]/30 data-[state=open]:border-[#604eff]/40 data-[state=open]:bg-[#f8faff] data-[state=open]:text-[#604eff] data-[state=open]:shadow-md sm:w-auto sm:px-3"
          >
            <span className="flex size-8 shrink-0 items-center justify-center bg-slate-50 transition-all duration-200 group-hover:bg-[#604eff]/10 group-hover:text-[#604eff]">
              <TriggerIcon className="size-5 stroke-[2.3]" aria-hidden="true" />
            </span>

            <span className="hidden text-xs font-bold tracking-[0.14em] sm:inline">
              {activeLanguage?.label}
            </span>

            <ChevronDown
              className="hidden size-4 stroke-[2.5] transition-transform duration-200 group-data-[state=open]:rotate-180 sm:block"
              aria-hidden="true"
            />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          sideOffset={10}
          className="w-[min(22rem,calc(100vw-2rem))] overflow-hidden border border-slate-200 bg-white p-0 font-sans text-slate-900 shadow-xl shadow-slate-950/10"
        >
          {content}
        </DropdownMenuContent>
      </DropdownMenu>

      <style jsx global>{`
        .accessibility-controller-wrapper > div {
          display: flex !important;
          width: 100% !important;
          border: 0 !important;
          background: transparent !important;
          padding: 0 !important;
          box-shadow: none !important;
        }
      `}</style>
    </>
  );
}
