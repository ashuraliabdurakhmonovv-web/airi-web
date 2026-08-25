"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Send,
  Youtube,
  type LucideIcon,
} from "lucide-react";

import { useLocale } from "@/i18n";
import { getProductionContent } from "@/i18n/production-content";

const navLinks = [
  { href: "/ishlab-chiqarish#features" },
  { href: "/ishlab-chiqarish/projects" },
  { href: "/ishlab-chiqarish#integrations" },
  { href: "/ishlab-chiqarish/team" },
];

const contactLinks = [
  { name: "info@airi.uz", href: "mailto:info@airi.uz", external: false },
  { name: "+998 (71) 263-41-98", href: "tel:+998712634198", external: false },
];

const socialLinks: { name: string; href: string; icon: LucideIcon }[] = [
  { name: "Telegram", href: "https://t.me/airiuz", icon: Send },
  { name: "YouTube", href: "https://www.youtube.com/@airi_uz", icon: Youtube },
  { name: "Instagram", href: "https://www.instagram.com/airi.uz/", icon: Instagram },
  { name: "Facebook", href: "https://www.facebook.com/ai.uzbekistan/", icon: Facebook },
  {
    name: "LinkedIn",
    href: "https://uz.linkedin.com/company/airiuz",
    icon: Linkedin,
  },
];

const logoDimensions = {
  uz: { width: 1920, height: 327 },
  ru: { width: 1920, height: 358 },
  en: { width: 1920, height: 345 },
} as const;

/**
 * AIRI ishlab chiqarish bo'limining yagona footer'i.
 * Landing, /projects, /projects/[slug], /team va /team/[slug] sahifalarida
 * shu bitta komponent ishlatiladi — markup takrorlanmaydi.
 */
export function SiteFooter() {
  const { locale } = useLocale();
  const production = getProductionContent(locale);
  const copy = production.footer;

  return (
    <footer className="relative overflow-hidden bg-[#050912] px-6 pb-6 text-white lg:px-12 lg:pb-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(84,162,255,0.14),transparent_34%),radial-gradient(circle_at_16%_82%,rgba(45,212,191,0.08),transparent_30%)]" />
      <div className="relative  rounded-2xl border border-white/12 bg-white/[0.055] px-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl lg:px-12">
        <div className="grid gap-12 pb-12 pt-20 md:pt-24 lg:grid-cols-12 lg:pb-14">
          {/* Brend */}
          <div className="lg:col-span-6">
            <Link
              href="/ishlab-chiqarish"
              className="inline-flex items-center"
              aria-label="AIRI">
              <Image
                src={`/airi-logo_${locale}_oq.png`}
                width={logoDimensions[locale].width}
                height={logoDimensions[locale].height}
                alt="AIRI"
                className="h-11 w-auto"
              />
            </Link>

            <p className="mt-5 max-w-sm leading-relaxed text-white/82">
              {copy.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    title={link.name}
                    className="group grid size-12 place-items-center rounded-xl border border-white/25 bg-white/[0.10] text-white/88 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#54a2ff]/70 hover:bg-[#0b2c71]/80 hover:text-white hover:shadow-[0_12px_30px_rgba(11,44,113,0.35)]">
                    <Icon className="size-5 transition-transform duration-300 group-hover:scale-110" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Bo'limlar */}
          <nav className="lg:col-span-3">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
              {copy.sections}
            </h2>
            <ul className="mt-6 grid gap-3.5">
              {navLinks.map((link, index) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/88 transition-colors hover:text-white">
                    {production.nav.links[index]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Aloqa */}
          <div className="lg:col-span-3">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
              {copy.contact}
            </h2>
            <ul className="mt-6 grid gap-3.5">
              {contactLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-sm text-white/88 transition-colors hover:text-white">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/20 py-6 text-sm text-white/68 md:flex-row md:items-center md:justify-between">
          <p>{copy.copyright}</p>
          <p className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#54a2ff]" />
            {copy.open}
          </p>
        </div>
      </div>
    </footer>
  );
}
