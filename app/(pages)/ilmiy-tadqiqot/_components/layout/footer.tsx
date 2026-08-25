/** @format */

"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AlertCircle,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Youtube,
} from "lucide-react";
import { useLocale } from "@/i18n";
import { getResearchContent } from "@/i18n/research-content";
import { localePath } from "@/config/pages";

const footerGroups = [
  {
    title: "Ilmiy kengash",
    links: [
      {
        href: "/ilmiy-tadqiqot/research-scientificboard/about",
        labelKey: "instituteScientificCouncil",
      },
      {
        href: "/ilmiy-tadqiqot/research-scientificboard/composition",
        labelKey: "councilComposition",
      },
      {
        href: "/ilmiy-tadqiqot/degree-awarding-council/about",
        labelKey: "degreeAwardingCouncil",
      },
      {
        href: "/ilmiy-tadqiqot/degree-awarding-council/composition",
        labelKey: "councilComposition",
      },
      { href: "/ilmiy-tadqiqot/seminar-board", labelKey: "scientificSeminar" },
      {
        href: "/ilmiy-tadqiqot/interlaboratory-seminars",
        labelKey: "interlaboratorySeminar",
      },
    ],
  },
  {
    title: "Tadqiqot",
    links: [
      {
        href: "/ilmiy-tadqiqot/research-laboratories",
        labelKey: "laboratories",
      },
      {
        href: "/ilmiy-tadqiqot/research-conferences",
        labelKey: "conferences",
      },
      { href: "/ilmiy-tadqiqot/research-doctorate", labelKey: "doctorate" },
      // Kontent tayyor bo'lguncha vaqtincha yashirildi
      // { href: "/ilmiy-tadqiqot/research-projects", label: "Ilmiy loyihalar" },
      // { href: "/ilmiy-tadqiqot/scientific-articles", label: "Ilmiy maqolalar" },
      // { href: "/ilmiy-tadqiqot/scientific-journals", label: "Ilmiy jurnallar" },
    ],
  },
  {
    title: "E'lonlar",
    links: [
      { href: "/ilmiy-tadqiqot/announcements", labelKey: "announcements" },
      { href: "/ilmiy-tadqiqot/seminars", labelKey: "seminars" },
      {
        href: "/ilmiy-tadqiqot/dissertation-defense-announcements",
        labelKey: "dissertationDefenseAnnouncements",
      },
    ],
  },
];

const contactLinks = [
  { href: "tel:+998712634198", label: "+998 (71) 263-41-98", Icon: Phone },
  { href: "mailto:doktorant@airi.uz", label: "doktorant@airi.uz", Icon: Mail },
  {
    href: "https://goo.gl/maps/PuhsobtxYeY5pvCB7",
    label: "100125, Toshkent sh., Mirzo Ulug'bek t., Bo'z-2, 17A",
    Icon: MapPin,
  },
];

const socials = [
  { href: "https://t.me/airiuz", label: "Telegram", Icon: Send },
  { href: "https://youtube.com/@airi_uz", label: "YouTube", Icon: Youtube },
  {
    href: "https://www.linkedin.com/company/airiuz",
    label: "LinkedIn",
    Icon: Linkedin,
  },
  {
    href: "https://m.facebook.com/ai.uzbekistan",
    label: "Facebook",
    Icon: Facebook,
  },
  {
    href: "https://www.instagram.com/airi.uz/",
    label: "Instagram",
    Icon: Instagram,
  },
];

const logoDimensions = {
  uz: { width: 1920, height: 327 },
  ru: { width: 1920, height: 358 },
  en: { width: 1920, height: 345 },
} as const;

const Footer: React.FC = () => {
  const { locale, t } = useLocale();
  const copy = getResearchContent(locale).footer;
  const localizeHref = (href: string) => localePath(href, locale);

  return (
    <footer className="relative bg-slate-950 text-white">
      <div className="h-px w-full bg-linear-to-r from-[#604eff] via-blue-500 to-cyan-300" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Brend + bo'limlar */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href={localizeHref("/ilmiy-tadqiqot")}
              className="w-fit"
              aria-label="AIRI">
              <Image
                src={`/airi-logo_${locale}_oq.png`}
                alt="AIRI"
                width={logoDimensions[locale].width}
                height={logoDimensions[locale].height}
                className="h-11 w-auto object-contain"
              />
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
              {copy.description}
            </p>
          </div>

          {footerGroups.map((group, index) => (
            <nav key={group.title}>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                {copy.groups[index]}
              </h3>
              <ul className="mt-5 grid gap-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={localizeHref(link.href)}
                      className="text-sm leading-6 text-slate-400 transition-colors hover:text-white">
                      {t.nav[link.labelKey as keyof typeof t.nav]}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Aloqa */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-x-8 gap-y-3 sm:flex-row sm:flex-wrap sm:items-center">
            {contactLinks.map(({ href, label, Icon }) => (
              <a
                key={href}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={
                  href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                className="inline-flex items-start gap-2.5 text-sm text-slate-400 transition-colors hover:text-white">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                {Icon === MapPin ? copy.address : label}
              </a>
            ))}

            <a
              href="https://t.me/airi_anticorruption_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-lg border border-rose-400/25 bg-rose-500/10 px-3.5 py-2 text-sm font-medium text-rose-200 transition hover:border-rose-400/45 hover:bg-rose-500/15 hover:text-rose-100 sm:ml-auto">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {copy.antiCorruption}
            </a>
          </div>
        </div>

        {/* Pastki qator */}
        <div className="mt-8 flex flex-col-reverse gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            {copy.copyright}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-slate-500 transition-colors hover:text-cyan-300">
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
