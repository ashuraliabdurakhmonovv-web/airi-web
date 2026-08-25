/** @format */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { navItemsIlmiy, type NavItem } from "@/common/nav-items/nav-items";
import ResearchAccessibilityMenu from "../accessibility/research-accessibility-menu";
import TextReader from "@/app/_components/text-reader/text-reader";
import { useLocale } from "@/i18n";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileSubmenus, setOpenMobileSubmenus] = useState<string[]>([]);
  const [isAtTop, setIsAtTop] = useState(true);

  const pathname = usePathname();
  const { locale, t } = useLocale();

  const isResearchHome =
    pathname === "/ilmiy-tadqiqot" || pathname === "/ilmiy-tadqiqot/";

  const isTransparent = isResearchHome && isAtTop && !isMobileMenuOpen;

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 24);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileMenuOpen(false);
    setOpenMobileSubmenus([]);
  }, [pathname]);

  const isActive = (item: NavItem) => {
    const ownPathActive = item.href
      ? item.href === "/"
        ? pathname === "/"
        : pathname.startsWith(item.href)
      : false;

    return ownPathActive || Boolean(item.children?.some(isActive));
  };

  const renderDesktopItems = (items: NavItem[]) =>
    items.map((child) => {
      const childActive = isActive(child);

      if (child.children?.length) {
        return (
          <div key={child.id} className="group/submenu relative">
            <div
              className={[
                "flex items-center justify-between border-l-2 text-sm font-bold leading-snug transition",
                childActive
                  ? "border-[#604eff] bg-[#604eff]/5 text-[#604eff]"
                  : "border-transparent text-slate-700 hover:border-[#604eff] hover:bg-slate-50 hover:text-[#604eff]",
              ].join(" ")}>
              {child.href ? (
                <Link href={child.href} className="flex min-w-0 grow px-4 py-3">
                  {t.nav[child.labelKey]}
                </Link>
              ) : (
                <span className="flex min-w-0 grow px-4 py-3">
                  {t.nav[child.labelKey]}
                </span>
              )}
              <ChevronRight className="mr-3 h-4 w-4 shrink-0" />
            </div>
            <div className="invisible absolute left-full top-0 z-10 pl-2 opacity-0 transition duration-200 group-hover/submenu:visible group-hover/submenu:opacity-100">
              <div className="min-w-80 border border-slate-200 bg-white p-2 shadow-[0_24px_80px_rgba(15,23,42,0.12)]">
                {renderDesktopItems(child.children)}
              </div>
            </div>
          </div>
        );
      }

      return (
        <Link
          key={child.id}
          href={child.href ?? "#"}
          className={[
            "group/link flex items-center justify-between border-l-2 px-4 py-3 text-sm font-bold leading-snug transition",
            childActive
              ? "border-[#604eff] bg-[#604eff]/5 text-[#604eff]"
              : "border-transparent text-slate-700 hover:border-[#604eff] hover:bg-slate-50 hover:text-[#604eff]",
          ].join(" ")}>
          {t.nav[child.labelKey]}
          <span className="h-px w-4 bg-slate-200 transition group-hover/link:w-7 group-hover/link:bg-[#604eff]" />
        </Link>
      );
    });

  const renderMobileChildren = (items: NavItem[], depth = 0) =>
    items.map((child) => {
      const hasChildren = Boolean(child.children?.length);
      const childActive = isActive(child);

      if (!hasChildren) {
        return (
          <Link
            key={child.id}
            href={child.href ?? "#"}
            onClick={closeMobileMenu}
            className={[
              "mt-2 block border px-4 py-3 text-sm font-bold transition",
              depth > 0 ? "ml-3" : "",
              childActive
                ? "border-[#604eff]/25 bg-[#604eff]/5 text-[#604eff]"
                : "border-slate-200 bg-slate-50 text-slate-600 hover:border-[#604eff]/25 hover:text-[#604eff]",
            ].join(" ")}>
            {t.nav[child.labelKey]}
          </Link>
        );
      }

      return (
        <div key={child.id} className={depth > 0 ? "ml-3" : ""}>
          <div className="mt-2 flex border border-slate-200 bg-slate-50">
            {child.href ? (
              <Link
                href={child.href}
                onClick={closeMobileMenu}
                className={[
                  "grow px-4 py-3 text-left text-sm font-bold",
                  childActive ? "text-[#604eff]" : "text-slate-600",
                ].join(" ")}>
                {t.nav[child.labelKey]}
              </Link>
            ) : (
              <span className="grow px-4 py-3 text-left text-sm font-bold text-slate-600">
                {t.nav[child.labelKey]}
              </span>
            )}
            <button
              type="button"
              onClick={() =>
                setOpenMobileSubmenus((current) =>
                  current.includes(child.id)
                    ? current.filter((id) => id !== child.id)
                    : [...current, child.id],
                )
              }
              className="border-l border-slate-200 px-3 text-slate-500"
              aria-label={`${t.nav[child.labelKey]} ichki menyusi`}>
              <ChevronDown
                className={[
                  "h-4 w-4 transition",
                  openMobileSubmenus.includes(child.id) ? "rotate-180" : "",
                ].join(" ")}
              />
            </button>
          </div>
          <div
            className={[
              "overflow-hidden transition-all duration-300",
              openMobileSubmenus.includes(child.id)
                ? "max-h-96 opacity-100"
                : "max-h-0 opacity-0",
            ].join(" ")}>
            {renderMobileChildren(child.children ?? [], depth + 1)}
          </div>
        </div>
      );
    });

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenMobileSubmenus([]);
  };

  const getLogoHref = () => {
    if (isResearchHome && isAtTop) {
      return "/";
    }

    return "/ilmiy-tadqiqot";
  };

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    closeMobileMenu();

    if (!isResearchHome || isAtTop) return;

    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav
      className={[
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        isTransparent
          ? "border-b border-transparent bg-transparent shadow-none"
          : "border-b border-slate-200 bg-[#f7faff]/95 shadow-[0_14px_45px_rgba(15,23,42,0.08)] backdrop-blur-xl",
      ].join(" ")}>
      <div
        className={[
          "h-1 w-full bg-[linear-gradient(90deg,#604eff,#08e8ea)] transition-opacity duration-300",
          isTransparent ? "opacity-0" : "opacity-100",
        ].join(" ")}
      />

      <div className="mx-auto max-w-7xl px-3 sm:px-5 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3 sm:h-18 lg:h-20 lg:gap-4">
          <Link
            href={getLogoHref()}
            onClick={handleLogoClick}
            className="group flex min-w-0 shrink-0 items-center gap-2 sm:gap-3"
            aria-label="AIRI ilmiy tadqiqot bosh sahifasi">
            <div className="relative h-10 w-32 shrink-0 sm:h-12 sm:w-52 md:w-56 lg:h-14 lg:w-64 xl:w-72">
              <Image
                src={`/airi-logo_${locale}.png`}
                alt="AIRI logo"
                fill
                className={[
                  "object-contain object-left transition duration-300",
                  isTransparent
                    ? "drop-shadow-[0_8px_20px_rgba(255,255,255,0.45)] group-hover:brightness-110"
                    : "group-hover:brightness-110",
                ].join(" ")}
                priority
              />
            </div>

            <span
              className={[
                "h-8 w-px shrink-0 bg-linear-to-b from-transparent to-transparent sm:h-10",
                isTransparent ? "via-white/55" : "via-slate-300",
              ].join(" ")}
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
            {navItemsIlmiy.map((item) => {
              const active = isActive(item);

              const itemClassName = [
                "relative inline-flex h-11 items-center gap-2 border px-4 text-sm font-extrabold transition duration-300",
                active
                  ? isTransparent
                    ? "border-white/60 bg-white/40 text-blue-700 shadow-sm backdrop-blur-xl"
                    : "border-[#604eff]/25 bg-[#604eff]/5 text-[#604eff]"
                  : isTransparent
                    ? "border-transparent text-slate-800 hover:border-white/60 hover:bg-white/38 hover:text-blue-700 hover:backdrop-blur-xl"
                    : "border-transparent text-slate-700 hover:border-[#604eff]/20 hover:bg-[#604eff]/5 hover:text-[#604eff]",
              ].join(" ");

              return (
                <div key={item.id} className="group relative">
                  {item.href ? (
                    <Link href={item.href} className={itemClassName}>
                      {t.nav[item.labelKey]}
                    </Link>
                  ) : (
                    <button className={itemClassName} type="button">
                      {t.nav[item.labelKey]}
                      <ChevronDown className="h-4 w-4 transition group-hover:rotate-180" />
                    </button>
                  )}

                  {item.children && (
                    <div className="invisible absolute left-0 top-full pt-3 opacity-0 transition duration-200 group-hover:visible group-hover:opacity-100">
                      <div className="min-w-80 border border-slate-200 bg-white p-2 shadow-[0_24px_80px_rgba(15,23,42,0.12)]">
                        {renderDesktopItems(item.children)}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <ResearchAccessibilityMenu />

            <Link
              href="/boglanish"
              className="airi-button px-5 py-3 text-sm font-extrabold">
              {t.nav.contact}
            </Link>
          </div>

          <div className="flex shrink-0 items-center gap-2 lg:hidden">
            <ResearchAccessibilityMenu />

            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen((prev) => !prev);
                setOpenMobileSubmenus([]);
              }}
              className={[
                "flex h-10 w-10 items-center justify-center border text-slate-700 transition sm:h-11 sm:w-11",
                isTransparent
                  ? "border-white/60 bg-white/75 shadow-sm backdrop-blur-xl hover:border-blue-200 hover:text-[#604eff]"
                  : "border-slate-200 bg-white hover:border-[#604eff]/30 hover:text-[#604eff]",
              ].join(" ")}
              aria-label={
                isMobileMenuOpen
                  ? "Mobil menyuni yopish"
                  : "Mobil menyuni ochish"
              }
              aria-expanded={isMobileMenuOpen}>
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <TextReader />

      <div
        className={[
          "lg:hidden transition-all duration-300",
          isMobileMenuOpen
            ? "max-h-[calc(100svh-68px)] overflow-y-auto opacity-100 sm:max-h-[calc(100svh-76px)]"
            : "max-h-0 overflow-hidden opacity-0",
        ].join(" ")}>
        <div className="space-y-2 border-t border-slate-200 bg-white px-4 pb-6 pt-3 shadow-[0_18px_45px_rgba(15,23,42,0.1)]">
          {navItemsIlmiy.map((item) => {
            const active = isActive(item);
            const hasChildren = Boolean(item.children?.length);

            if (!hasChildren && item.href) {
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={[
                    "flex w-full items-center justify-between border px-4 py-3 text-left text-sm font-extrabold transition",
                    active
                      ? "border-[#604eff]/25 bg-[#604eff]/5 text-[#604eff]"
                      : "border-slate-200 text-slate-700 hover:border-[#604eff]/25 hover:text-[#604eff]",
                  ].join(" ")}>
                  {t.nav[item.labelKey]}
                </Link>
              );
            }

            return (
              <div key={item.id}>
                <button
                  type="button"
                  onClick={() =>
                    setOpenMobileSubmenus((current) =>
                      current.includes(item.id)
                        ? current.filter((id) => id !== item.id)
                        : [...current, item.id],
                    )
                  }
                  className={[
                    "flex w-full items-center justify-between border px-4 py-3 text-left text-sm font-extrabold transition",
                    active
                      ? "border-[#604eff]/25 bg-[#604eff]/5 text-[#604eff]"
                      : "border-slate-200 text-slate-700 hover:border-[#604eff]/25 hover:text-[#604eff]",
                  ].join(" ")}>
                  {t.nav[item.labelKey]}

                  <ChevronDown
                    className={[
                      "h-4 w-4 transition",
                      openMobileSubmenus.includes(item.id) ? "rotate-180" : "",
                    ].join(" ")}
                  />
                </button>

                <div
                  className={[
                    "overflow-hidden pl-3 transition-all duration-300",
                    openMobileSubmenus.includes(item.id)
                      ? "max-h-[1000px] opacity-100"
                      : "max-h-0 opacity-0",
                  ].join(" ")}>
                  {renderMobileChildren(item.children ?? [])}
                </div>
              </div>
            );
          })}

          <Link
            href="/boglanish"
            onClick={closeMobileMenu}
            className="airi-button mt-4 flex justify-center px-4 py-3 text-center text-sm font-extrabold">
            {t.nav.contact}
          </Link>
        </div>
      </div>
    </nav>
  );
}
