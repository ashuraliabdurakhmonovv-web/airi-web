/** @format */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { navItems, type NavItem } from "@/common/nav-items/nav-items";
import { AccessibilityMenu } from "@/app/_components/accessibility-menu/accessibility-menu";
import TextReader from "@/app/_components/text-reader/text-reader";
import { useLocale } from "@/i18n";

export default function Navbar() {
  const { locale, t } = useLocale();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(
    null,
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isLandingPage =
    pathname === "/umumiy-malumot" || pathname === "/umumiy-malumot/";
  const isHeroOverlay = isLandingPage && !isScrolled && !isMobileMenuOpen;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (item: NavItem) => {
    if (item.href) {
      return item.href === "/"
        ? pathname === "/"
        : pathname.startsWith(item.href);
    }

    if (item.children) {
      return item.children.some((child) =>
        child.href
          ? pathname.startsWith(child.href)
          : Boolean(child.children?.some((nested) => nested.href && pathname.startsWith(nested.href))),
      );
    }

    return false;
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenMobileSubmenu(null);
  };

  const getLogoHref = () => {
    if (isLandingPage && !isScrolled) {
      return "/";
    }

    return "/umumiy-malumot";
  };

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    closeMobileMenu();

    if (!isLandingPage || !isScrolled) return;

    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isHeroOverlay
          ? "border-b border-transparent bg-transparent shadow-none"
          : "border-b border-[#604eff]/15 bg-white/95 shadow-lg shadow-[#604eff]/10 backdrop-blur-xl"
      }`}
    >
      <div className="container mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-2 md:h-20">
          <Link
            href={getLogoHref()}
            onClick={handleLogoClick}
            className="group flex min-w-0 shrink-0 cursor-pointer items-center gap-2 sm:gap-3"
            aria-label={t.hero.instituteFullName}
          >
            <div className="flex min-w-0 items-center">
              <Image
                src={`/airi-logo_${locale}.png`}
                alt={t.hero.instituteFullName}
                width={420}
                height={88}
                priority
                className="relative h-9 w-auto max-w-[calc(70vw-3.25rem)] object-contain object-left transition-all duration-300 sm:h-11 sm:max-w-[calc(70vw-4rem)] lg:h-12"
              />
            </div>

            <span
              className={`h-8 w-px shrink-0 bg-linear-to-b from-transparent to-transparent sm:h-10 ${
                isHeroOverlay ? "via-white/45" : "via-slate-300"
              }`}
            />

            <Image
              src="/uzbekistan_35_yil_round_transparent.png"
              alt=""
              width={1064}
              height={1064}
              priority
              className="size-9 shrink-0 object-contain drop-shadow-[0_4px_12px_rgba(15,23,42,0.18)] transition-transform duration-300 group-hover:scale-105 sm:size-11 lg:size-12"
            />
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const active = isActive(item);

              const itemClassName = `relative  px-4 py-2.5 text-[14px] font-semibold leading-none transition-all duration-300 ${
                active
                  ? "text-[#604eff]"
                  : "text-slate-700 hover:bg-[#604eff]/10 hover:text-[#604eff]"
              }`;

              return (
                <div key={item.id} className="group relative">
                  {item.href ? (
                    <Link href={item.href} className={itemClassName}>
                      {active && (
                        <span className="airi-gradient-soft absolute inset-0  border border-[#604eff]/25" />
                      )}

                      <span className="relative z-10">
                        {t.nav[item.labelKey]}
                      </span>

                      <span className="airi-gradient absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 transition-all duration-300 group-hover:w-full" />
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className={`${itemClassName} cursor-default`}
                    >
                      {active && (
                        <span className="airi-gradient-soft absolute inset-0  border border-[#604eff]/25" />
                      )}

                      <span className="relative z-10 hover:cursor-pointer">
                        {t.nav[item.labelKey]}
                      </span>

                      <span className="airi-gradient absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 transition-all duration-300 group-hover:w-full" />
                    </button>
                  )}

                  {item.children && (
                    <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                      <div className="min-w-72  border border-[#604eff]/15 bg-white/95 p-2 shadow-xl shadow-[#604eff]/10 backdrop-blur-xl">
                        {item.children.map((child) => {
                          const childActive = child.href
                            ? pathname.startsWith(child.href)
                            : Boolean(child.children?.some((nested) => nested.href && pathname.startsWith(nested.href)));

                          return (
                            <Link
                              key={child.id}
                              href={child.href ?? "#"}
                              className={`block  px-4 py-3 text-[15px] font-semibold leading-snug transition-all duration-300 ${
                                childActive
                                  ? "airi-gradient-soft text-[#604eff]"
                                  : "text-slate-700 hover:bg-[#604eff]/10 hover:text-[#604eff]"
                              }`}
                            >
                              {t.nav[child.labelKey]}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="hidden items-center gap-4 lg:flex">
            <AccessibilityMenu icon="sliders" />

            <Link
              href="/boglanish"
              className="airi-button  px-6 py-2.5 text-sm font-semibold rounded-sm"
            >
              {t.nav.contact}
            </Link>
          </div>

          <div className="flex shrink-0 items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={
                isMobileMenuOpen ? t.common.closeMenu : t.common.openMenu
              }
              aria-expanded={isMobileMenuOpen}
              className="inline-flex h-12 w-12 items-center justify-center  border border-slate-200 bg-white text-slate-700 shadow-sm transition-all duration-300 hover:border-[#604eff]/35 hover:bg-[#604eff]/10 hover:text-[#604eff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#604eff]/30"
            >
              {isMobileMenuOpen ? (
                <X className="h-7 w-7" aria-hidden="true" />
              ) : (
                <Menu className="h-7 w-7" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      <TextReader />

      <div
        className={`transition-all duration-300 lg:hidden ${
          isMobileMenuOpen
            ? "max-h-[calc(100vh-4rem)] opacity-100 md:max-h-[calc(100vh-5rem)]"
            : "max-h-0 overflow-hidden opacity-0"
        }`}
      >
        <div className="max-h-[inherit] space-y-2 overflow-y-auto border-t border-[#604eff]/15 bg-white/95 px-3 pb-6 pt-2 shadow-lg shadow-[#604eff]/10 backdrop-blur-xl sm:px-6">
          <AccessibilityMenu icon="sliders" variant="inline" />

          {navItems.map((item) => {
            const active = isActive(item);

            return (
              <div key={item.id}>
                {item.href ? (
                  <Link
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={`block w-full  px-4 py-3 text-left text-[15px] font-semibold transition-all duration-300 ${
                      active
                        ? "airi-gradient-soft border border-[#604eff]/25 text-[#604eff]"
                        : "text-slate-700 hover:bg-[#604eff]/10 hover:text-[#604eff]"
                    }`}
                  >
                    {t.nav[item.labelKey]}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      setOpenMobileSubmenu(
                        openMobileSubmenu === item.id ? null : item.id,
                      )
                    }
                    aria-expanded={openMobileSubmenu === item.id}
                    className={`flex w-full items-center justify-between gap-3  px-4 py-3 text-left text-[15px] font-semibold transition-all duration-300 ${
                      active
                        ? "airi-gradient-soft border border-[#604eff]/25 text-[#604eff]"
                        : "text-slate-700 hover:bg-[#604eff]/10 hover:text-[#604eff]"
                    }`}
                  >
                    <span>{t.nav[item.labelKey]}</span>

                    <ChevronDown
                      className={`h-4 w-4 shrink-0 transition-transform duration-300 ${
                        openMobileSubmenu === item.id ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                )}

                {item.children && (
                  <div
                    className={`overflow-hidden pl-4 transition-all duration-300 ${
                      openMobileSubmenu === item.id
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.id}
                        href={child.href ?? "#"}
                        onClick={closeMobileMenu}
                        className="block  px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-[#604eff]/10 hover:text-[#604eff]"
                      >
                        {t.nav[child.labelKey]}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <div className="flex flex-col gap-3 pt-4">
            <Link
              href="/boglanish"
              onClick={closeMobileMenu}
              className="airi-button  px-4 py-3 text-center text-sm font-semibold"
            >
              {t.nav.contact}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
