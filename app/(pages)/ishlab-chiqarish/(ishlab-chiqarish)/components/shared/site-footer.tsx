"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import FooterImage from "@/app/(pages)/ishlab-chiqarish/(ishlab-chiqarish)/public/images/footer.jpg";
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
  { name: "airi.uz", href: "https://airi.uz", external: true },
];

const socialLinks = [
  { name: "Telegram", href: "https://t.me/airiuz" },
  { name: "LinkedIn", href: "https://uz.linkedin.com/company/airiuz" },
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
    <footer className="relative bg-black text-white">
      {/* Vizual band */}
      <div className="relative h-48 w-full overflow-hidden md:h-64">
        <Image
          src={FooterImage}
          alt=""
          aria-hidden="true"
          placeholder="blur"
          sizes="100vw"
          className="h-full w-full object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/40 to-black" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black to-transparent" />
      </div>

      <div className="mx-auto max-w-350 px-6 lg:px-12">
        <div className="grid gap-14 pb-16 pt-4 lg:grid-cols-12 lg:pb-20">
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

            <p className="mt-6 max-w-sm leading-relaxed text-white/55">
              {copy.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-6">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-white">
                  {link.name}
                  <ArrowUpRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                </a>
              ))}
            </div>
          </div>

          {/* Bo'limlar */}
          <nav className="lg:col-span-3">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/38">
              {copy.sections}
            </h2>
            <ul className="mt-6 grid gap-3.5">
              {navLinks.map((link, index) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/65 transition-colors hover:text-white">
                    {production.nav.links[index]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Aloqa */}
          <div className="lg:col-span-3">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/38">
              {copy.contact}
            </h2>
            <ul className="mt-6 grid gap-3.5">
              {contactLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-sm text-white/65 transition-colors hover:text-white">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-8 text-sm text-white/35 md:flex-row md:items-center md:justify-between">
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
