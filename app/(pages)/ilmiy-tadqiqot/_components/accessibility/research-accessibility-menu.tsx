/** @format */
"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import FontSizeController from "@/app/_components/font-size-slider/font-size-slider";
import { type Locale } from "@/i18n";
import { useLocaleSwitch } from "@/i18n/use-locale-switch";
import {
  Check,
  ChevronDown,
  Languages,
  Settings2,
  SlidersHorizontal,
} from "lucide-react";

const languages: { code: Locale; label: string; name: string }[] = [
  { code: "uz", label: "UZ", name: "O'zbek" },
  { code: "ru", label: "RU", name: "Русский" },
  { code: "en", label: "EN", name: "English" },
];

export default function ResearchAccessibilityMenu() {
  // Tarjimasi bor sahifada URL'ga o'tadi, aks holda joyida almashtiradi.
  const { locale, switchLocale } = useLocaleSwitch();
  const activeLanguage = languages.find((lang) => lang.code === locale);
  const text = {
    uz: { title: "Maxsus imkoniyatlar", description: "Til, shrift va ko'rinish sozlamalari", language: "Til", fontSize: "Shrift o'lchami" },
    ru: { title: "Специальные возможности", description: "Настройки языка, шрифта и отображения", language: "Язык", fontSize: "Размер шрифта" },
    en: { title: "Accessibility", description: "Language, font, and display settings", language: "Language", fontSize: "Font size" },
  }[locale];

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            aria-label={text.title}
            className="group inline-flex h-11 items-center justify-center gap-2 border border-slate-200 bg-white px-3 text-slate-700 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-[#604eff]/35 hover:bg-[#604eff]/5 hover:text-[#604eff] data-[state=open]:border-[#604eff]/35 data-[state=open]:bg-[#604eff]/5 data-[state=open]:text-[#604eff]"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-slate-200 bg-slate-50 text-slate-700 transition group-hover:border-[#604eff]/25 group-hover:bg-white group-hover:text-[#604eff]">
              <SlidersHorizontal className="h-4 w-4 stroke-[2.4]" />
            </span>
            <span className="hidden font-mono text-xs font-black tracking-[0.18em] sm:inline">
              {activeLanguage?.label}
            </span>
            <ChevronDown className="h-4 w-4 stroke-[2.5] transition group-data-[state=open]:rotate-180" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          sideOffset={12}
          className="w-[min(22rem,calc(100vw-2rem))] overflow-hidden border border-slate-200 bg-white p-0 text-slate-950 shadow-[0_24px_80px_rgba(15,23,42,0.16)]"
        >
          <div className="border-b border-slate-200 bg-slate-950 px-4 py-4 text-white">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center border border-white/15 bg-white/10 text-cyan-200">
                <Settings2 className="h-5 w-5 stroke-[2.4]" />
              </span>
              <div>
                <p className="text-sm font-black leading-none">
                  {text.title}
                </p>
                <p className="mt-1.5 text-xs font-medium leading-none text-slate-300">
                  {text.description}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-5 p-4">
            <section className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm font-black text-slate-800">
                  <Languages className="h-4 w-4 text-[#604eff]" />
                  <span>{text.language}</span>
                </div>
                <span className="border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-500">
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
                      className={`relative border px-3 py-2.5 font-mono text-xs font-black tracking-[0.16em] transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#604eff]/30 ${
                        isActive
                          ? "border-[#604eff] bg-[#604eff] text-white shadow-[0_12px_28px_rgba(96,78,255,0.18)]"
                          : "border-slate-200 bg-white text-slate-600 hover:border-[#604eff]/35 hover:bg-[#604eff]/5 hover:text-[#604eff]"
                      }`}
                    >
                      {lang.label}
                      {isActive && (
                        <Check className="absolute right-1.5 top-1.5 h-3 w-3" />
                      )}
                    </button>
                  );
                })}
              </div>
            </section>

            <div className="h-px bg-slate-200" />

            <section className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-black text-slate-800">
                <SlidersHorizontal className="h-4 w-4 text-[#604eff]" />
                <span>{text.fontSize}</span>
              </div>

              <div className="research-accessibility-controller border border-slate-200 bg-[#f7f9fc] p-3">
                <FontSizeController />
              </div>
            </section>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <style jsx global>{`
        .research-accessibility-controller > div {
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
