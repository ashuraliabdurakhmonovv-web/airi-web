/** @format */

"use client";

import { Check, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useLocaleSwitch } from "@/i18n/use-locale-switch";
import type { Locale } from "@/i18n";

const languages: { code: Locale; label: string; name: string }[] = [
  { code: "uz", label: "UZ", name: "O'zbek" },
  { code: "ru", label: "RU", name: "Русский" },
  { code: "en", label: "EN", name: "English" },
];

export default function LanguageFlags({ variant = "dark" }: { variant?: "dark" | "light" }) {
  // Sahifaning tarjimasi bo'lsa URL'ga o'tadi, bo'lmasa joyida tilni almashtiradi.
  const { locale, switchLocale } = useLocaleSwitch();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeLanguage = languages.find((l) => l.code === locale)!;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectLanguage = (code: Locale) => {
    switchLocale(code);
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop */}
      <div className="ml-auto hidden items-center lg:flex">
        <div className="flex items-center gap-2">
          {languages.map((lang) => {
            const isActive = locale === lang.code;

            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => switchLocale(lang.code)}
                aria-label={lang.name}
                className={`
                  group relative min-h-10 overflow-hidden border px-4 py-2 font-mono text-xs
                  font-semibold tracking-[0.18em] backdrop-blur-xl transition-all duration-300
                  hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-[#54a2ff]/70
                  ${
                    isActive
                      ? "border-[#54a2ff]/55 bg-[#54a2ff]/14 text-white shadow-[0_0_34px_rgba(84,162,255,0.12)]"
                      : variant === "light"
                        ? "border-slate-200 bg-white text-slate-600 hover:border-[#604eff]/45 hover:bg-[#604eff]/10 hover:text-[#604eff]"
                        : "border-white/12 bg-white/5.5 text-white/52 hover:border-[#54a2ff]/45 hover:bg-[#54a2ff]/10 hover:text-white"
                  }
                `}
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span
                  className={`pointer-events-none absolute inset-x-3 top-0 h-px bg-linear-to-r from-transparent via-[#54a2ff]/70 to-transparent transition-opacity duration-300 ${
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                />
                <span className="relative">{lang.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile */}
      <div className="relative ml-auto lg:hidden" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Select language"
          aria-expanded={isOpen}
          className="group relative flex min-h-10 items-center gap-2 overflow-hidden border border-[#54a2ff]/35 bg-[#54a2ff]/10 px-3.5 py-2 text-white shadow-[0_0_34px_rgba(84,162,255,0.10)] backdrop-blur-xl transition-all duration-300 hover:border-[#54a2ff]/65 hover:bg-[#54a2ff]/16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#54a2ff]/70"
        >
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          <span className="pointer-events-none absolute inset-x-3 top-0 h-px bg-linear-to-r from-transparent via-[#54a2ff]/70 to-transparent" />

          <span className="font-mono text-xs font-medium tracking-[0.2em]">
            {activeLanguage.label}
          </span>

          <ChevronDown
            className={`h-3.5 w-3.5 text-[#8ecbff] transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full z-50 mt-2 min-w-32 overflow-hidden border border-[#54a2ff]/28 bg-[#06111f]/95 p-1 text-white shadow-[0_18px_70px_rgba(0,0,0,0.4)] backdrop-blur-xl">
            {languages.map((lang) => {
              const isActive = locale === lang.code;

              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => selectLanguage(lang.code)}
                  className={`
                    group relative flex w-full items-center justify-between overflow-hidden border px-3 py-2.5
                    font-mono text-xs font-semibold tracking-[0.18em] transition-all duration-200
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#54a2ff]/70
                    ${
                      isActive
                        ? "border-[#54a2ff]/45 bg-[#54a2ff]/14 text-white"
                        : variant === "light"
                          ? "border-transparent text-slate-600 hover:border-[#604eff]/35 hover:bg-[#604eff]/10 hover:text-[#604eff]"
                          : "border-transparent text-white/58 hover:border-[#54a2ff]/35 hover:bg-[#54a2ff]/10 hover:text-white"
                    }
                  `}
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <span className="relative">{lang.label}</span>

                  {isActive && (
                    <Check className="relative ml-3 h-3.5 w-3.5 text-[#8ecbff]" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
