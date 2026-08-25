"use client";

import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, Languages, Menu, X } from "lucide-react";
import { useLocale, type Locale } from "@/i18n";
import { useLocaleSwitch } from "@/i18n/use-locale-switch";
import { getProductionContent } from "@/i18n/production-content";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { href: "/ishlab-chiqarish#features" },
  { href: "/ishlab-chiqarish/projects" },
  { href: "/ishlab-chiqarish#integrations" },
  { href: "/ishlab-chiqarish/team" },
];

const languages: { code: Locale; label: string; name: string }[] = [
  { code: "uz", label: "UZ", name: "O'zbek" },
  { code: "ru", label: "RU", name: "Русский" },
  { code: "en", label: "EN", name: "English" },
];

const logoDimensions: Record<Locale, { width: number; height: number }> = {
  uz: { width: 1920, height: 327 },
  ru: { width: 1920, height: 358 },
  en: { width: 1920, height: 345 },
};

function LanguageDropdown({ solid }: { solid: boolean }) {
  const { locale, t } = useLocale();
  const { switchLocale } = useLocaleSwitch();
  const activeLanguage = languages.find((language) => language.code === locale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={t.hero.languageSelector}
          className={`group inline-flex h-9 items-center gap-1.5 rounded-full border px-3 text-xs font-semibold tracking-[0.14em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 ${
            solid
              ? "border-white/16 bg-white/[0.055] text-white/78 backdrop-blur-xl hover:border-white/32 hover:bg-white/[0.09] hover:text-white focus-visible:ring-white/40"
              : "border-white/20 bg-white/10 text-white/75 backdrop-blur-md hover:border-white/40 hover:bg-white/15 hover:text-white focus-visible:ring-white/50"
          }`}
        >
          <Languages className="size-3.5" aria-hidden="true" />
          <span>{activeLanguage?.label ?? "UZ"}</span>
          <ChevronDown
            className="size-3.5 transition-transform duration-300 group-data-[state=open]:rotate-180"
            aria-hidden="true"
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className={`min-w-36 rounded-xl p-1 ${
          solid
            ? "border-white/14 bg-[#0b132e]/78 text-white shadow-xl backdrop-blur-2xl"
            : "border-white/15 bg-[#101318]/95 text-white"
        }`}
      >
        {languages.map((language) => {
          const isActive = locale === language.code;

          return (
            <DropdownMenuItem
              key={language.code}
              onSelect={() => switchLocale(language.code)}
              className={`cursor-pointer justify-between rounded-lg px-3 py-2.5 text-xs font-semibold tracking-[0.08em] ${
                isActive
                  ? solid
                    ? "bg-white/12 text-white"
                    : "bg-white/12 text-white"
                  : solid
                    ? "text-white/68 hover:bg-white/8 hover:text-white"
                    : "text-white/65 hover:bg-white/8 hover:text-white"
              }`}
            >
              <span className="flex items-center gap-2">
                <span>{language.label}</span>
                <span className="font-normal tracking-normal opacity-60">
                  {language.name}
                </span>
              </span>
              {isActive && <Check className="size-3.5" aria-hidden="true" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Navigation() {
  const { locale, t } = useLocale();
  const copy = getProductionContent(locale).nav;
  const localizedNavLinks = [
    { href: "/", label: copy.home },
    ...navLinks.map((link, index) => ({
      ...link,
      label: copy.links[index],
    })),
  ];
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const scrollContainer = document.querySelector<HTMLElement>(
      "[data-landing-scroll]",
    );

    const handleScroll = () => {
      const scrollTop = scrollContainer?.scrollTop ?? window.scrollY;
      setIsScrolled(scrollTop > 20);
    };

    handleScroll();
    const target = scrollContainer ?? window;
    target.addEventListener("scroll", handleScroll, { passive: true });
    return () => target.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const usesSolidNav = isScrolled || isMobileMenuOpen;
  const isProductionHome =
    pathname === "/ishlab-chiqarish" || pathname === "/ishlab-chiqarish/";

  const getLogoHref = () => {
    if (isProductionHome && !isScrolled) {
      return "/";
    }

    return "/ishlab-chiqarish";
  };

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    closeMobileMenu();

    if (!isProductionHome || !isScrolled) return;

    event.preventDefault();
    const scrollContainer = document.querySelector<HTMLElement>(
      "[data-landing-scroll]",
    );

    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={`fixed z-50 transition-all duration-500 ${
        isScrolled
          ? "left-3 right-3 top-3 md:left-4 md:right-4 md:top-4"
          : "inset-x-0 top-0"
      }`}>
      <nav
        className={`mx-auto transition-all duration-500 ${
          usesSolidNav
            ? "max-w-350 border border-white/14 bg-[#0b132e]/48 shadow-[0_18px_55px_rgba(0,0,0,0.18)] backdrop-blur-2xl"
            : "max-w-350 bg-transparent"
        } ${isScrolled ? "rounded-xl" : ""}`}>
        <div
          className={`flex items-center justify-between gap-3 px-4 transition-all duration-500 sm:px-6 lg:px-8 ${
            isScrolled ? "h-16" : "h-22"
          }`}>
          <a
            href={getLogoHref()}
            onClick={handleLogoClick}
            className="group flex min-w-0 shrink-0 items-center gap-2 sm:gap-3"
            aria-label="AIRI logo">
            <Image
              src={`/airi-logo_${locale}_oq.png`}
              width={logoDimensions[locale].width}
              height={logoDimensions[locale].height}
              alt="AIRI logo"
              className={`w-auto max-w-[calc(70vw-3.25rem)] object-contain object-left transition-all duration-500 sm:max-w-[calc(70vw-4rem)] ${
                isScrolled ? "h-9 sm:h-11" : "h-10 sm:h-12"
              }`}
              priority
            />

            <span
              className={`h-8 w-px shrink-0 bg-linear-to-b from-transparent to-transparent sm:h-10 ${
                usesSolidNav ? "via-white/25" : "via-white/45"
              }`}
            />

            <Image
              src="/uzbekistan_35_yil_round_transparent.png"
              alt=""
              width={1064}
              height={1064}
              priority
              className={`shrink-0 object-contain transition-all duration-500 group-hover:scale-105 ${
                isScrolled ? "size-10 sm:size-11" : "size-10 sm:size-12"
              }`}
            />
          </a>

          <div className="hidden min-w-0 items-center justify-center gap-1 lg:flex">
            {localizedNavLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`group relative px-3 py-2 text-sm font-medium transition-colors duration-300 xl:text-[15px] ${
                  usesSolidNav
                    ? "text-white/72 hover:text-white"
                    : "text-white/72 hover:text-white"
                }`}>
                {link.label}
                <span
                  className={`absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${
                    usesSolidNav ? "bg-[#54a2ff]" : "bg-white"
                  }`}
                />
              </a>
            ))}
          </div>

          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            <LanguageDropdown solid={usesSolidNav} />
            <Button
              asChild
              size="sm"
              className={`h-9 rounded-full px-4 text-sm transition-all duration-500 ${
                usesSolidNav
                  ? "bg-[#0b2c71] text-white hover:bg-[#123d91]"
                  : "bg-white text-black hover:bg-white/90"
              }`}>
              <a href="/ishlab-chiqarish#contact">{copy.contact}</a>
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className={`grid h-10 w-10 place-items-center transition-colors duration-500 lg:hidden ${
              usesSolidNav ? "text-white" : "text-white"
            }`}
            aria-label={isMobileMenuOpen ? t.common.closeMenu : t.common.openMenu}
            aria-expanded={isMobileMenuOpen}>
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-background transition-all duration-500 lg:hidden ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}>
        <div className="flex h-full flex-col px-6 pb-8 pt-28 sm:px-8">
          <div className="flex-1 overflow-y-auto">
            <div className="grid gap-3">
              {localizedNavLinks.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className={`border-b border-foreground/10 py-4 font-display text-[clamp(2rem,9vw,3.5rem)] leading-none tracking-tight text-foreground transition-all duration-500 hover:text-muted-foreground ${
                    isMobileMenuOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                  style={{
                    transitionDelay: isMobileMenuOpen
                      ? `${index * 55}ms`
                      : "0ms",
                  }}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div
            className={`grid gap-3 border-t border-foreground/10 pt-5 transition-all duration-500 ${
              isMobileMenuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: isMobileMenuOpen ? "260ms" : "0ms" }}>
            <div className="flex justify-end">
              <LanguageDropdown solid />
            </div>

            <Button
              asChild
              className="h-13 rounded-full bg-foreground text-base text-background">
              <a href="/ishlab-chiqarish#contact" onClick={closeMobileMenu}>
                {copy.contact}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
