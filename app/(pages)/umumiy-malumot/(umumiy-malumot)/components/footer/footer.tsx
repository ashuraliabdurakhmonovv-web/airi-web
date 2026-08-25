/** @format */

"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "@/i18n";
import {
  Phone,
  MapPin,
  Mail,
  Youtube,
  Send,
  Instagram,
  Facebook,
  ArrowUpRight,
} from "lucide-react";

const pageLinks = [
  { href: "/umumiy-malumot/news", labelKey: "news" },
  { href: "/umumiy-malumot/partners", labelKey: "partners" },
  { href: "/ilmiy-tadqiqot", labelKey: "research" },
  { href: "/umumiy-malumot/faq", labelKey: "faq" },
  { href: "/boglanish", labelKey: "contact" },
] as const;

const instituteLinks = [
  {
    href: "/umumiy-malumot/institute-abouttheinstitute",
    labelKey: "aboutInstitute",
  },
  {
    href: "/umumiy-malumot/institute-structureofinstitute",
    labelKey: "instituteStructure",
  },
  { href: "/umumiy-malumot/institute-instituteteam", labelKey: "instituteTeam" },
  {
    href: "/umumiy-malumot/research-internationalrelationships",
    labelKey: "internationalRelations",
  },
  {
    href: "/umumiy-malumot/opendata-requisitesoftheinstitute",
    labelKey: "instituteRequisites",
  },
] as const;

const socialLinks = [
  { href: "https://t.me/airiuz", label: "Telegram", icon: Send },
  { href: "https://www.youtube.com/@airi_uz", label: "YouTube", icon: Youtube },
  { href: "https://www.instagram.com/airi.uz/", label: "Instagram", icon: Instagram },
  { href: "https://www.facebook.com/ai.uzbekistan/", label: "Facebook", icon: Facebook },
];

const Footer = () => {
  const { locale, t } = useLocale();

  return (
    <footer className="relative bg-[#0b132e] text-white">
      <div className="airi-gradient h-1 w-full" />

      <div className="mx-auto w-full max-w-7xl px-4 pb-8 pt-12 sm:px-6 sm:pt-14 lg:px-8">
        {/* Asosiy grid: mobil 1 ustun, planshet 2, desktop 12-ustunli */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brend */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Link href="/umumiy-malumot" className="group inline-block w-fit">
              <Image
                src={`/airi-logo_${locale}_oq.png`}
                alt={t.hero.instituteFullName}
                width={420}
                height={88}
                className="h-14 w-auto object-contain transition duration-300 group-hover:brightness-110 sm:h-16"
                priority
              />
            </Link>

            <p className="mt-6 max-w-md text-sm leading-7 text-white/65">
              {t.footer.description}
            </p>

            <div className="mt-7 flex flex-wrap gap-2.5">
              {socialLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] text-white/70 transition duration-300 hover:-translate-y-0.5 hover:border-[#08e8ea]/45 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08e8ea]/45">
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Sahifalar */}
          <nav className="lg:col-span-2">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
              {t.footer.pagesTitle}
            </h3>
            <ul className="mt-5 grid gap-3">
              {pageLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-white/70 transition-colors duration-300 hover:text-white">
                    <span>{t.footer[item.labelKey]}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Institut */}
          <nav className="lg:col-span-2">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
              {t.footer.institut}
            </h3>
            <ul className="mt-5 grid gap-3">
              {instituteLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-start gap-1.5 text-sm leading-6 text-white/70 transition-colors duration-300 hover:text-white">
                    <span>{t.footer[item.labelKey]}</span>
                    <ArrowUpRight className="mt-1 h-3.5 w-3.5 shrink-0 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Aloqa + xarita */}
          <div className="sm:col-span-2 lg:col-span-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
              {t.footer.contactTitle}
            </h3>

            <ul className="mt-5 grid gap-3.5">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#08e8ea]" />
                <span className="text-sm leading-6 text-white/70">
                  {t.footer.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-[#08e8ea]" />
                <a
                  href="tel:+998712634198"
                  className="text-sm text-white/70 transition-colors hover:text-white">
                  +998 (71) 263-41-98
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-[#08e8ea]" />
                <a
                  href="mailto:info@airi.uz"
                  className="text-sm text-white/70 transition-colors hover:text-white">
                  info@airi.uz
                </a>
              </li>
            </ul>

            <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]">
              <iframe
                title={t.footer.mapTitle}
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3552.923923191463!2d69.34985607643814!3d41.34756799846357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDHCsDIwJzUxLjIiTiA2OcKwMjEnMDguOCJF!5e1!3m2!1sen!2s!4v1777783806726!5m2!1sen!2s"
                className="absolute inset-0 h-full w-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* Pastki qator */}
        <div className="mt-12 flex flex-col gap-5 border-t border-white/10 pt-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-1.5 text-xs leading-5 text-white/45">
            <p>{t.footer.copyright}</p>
            <p>{t.footer.tagline}</p>
          </div>

          <a
            href="http://www.uz/uz/res/visitor/index?id=47731"
            target="_top"
            rel="noopener noreferrer"
            aria-label={t.footer.counterTitle}
            title={t.footer.counterTitle}
            className="inline-flex w-fit shrink-0 opacity-70 transition hover:opacity-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="http://cnt0.www.uz/counter/collect?id=47731&r=&pg=https%3A%2F%2Fairi.uz%2F&c=Y&col=340F6E&t=ffffff&p=BD6F6F"
              width="88"
              height="31"
              alt={t.footer.counterTitle}
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
