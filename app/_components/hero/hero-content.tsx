/** @format */

"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/i18n";
import LanguageFlags from "../lang-selector/selector";
import IndependenceBanner from "@/components/home/independence-banner";

export default function HeroContent() {
  const { locale, t } = useLocale();

  const instituteFullName = t.hero.instituteFullName;

  const portalLinks = [
    {
      href: "/umumiy-malumot",
      label: t.hero.aboutInstitute,
      sub: t.hero.aboutInstituteSub,
    },
    {
      href: "/ilmiy-tadqiqot",
      label: t.hero.scientificResearch,
      sub: t.hero.scientificResearchSub,
    },
    {
      href: "/ishlab-chiqarish",
      label: t.hero.production,
      sub: t.hero.productionSub,
    },
  ];

  return (
    <div className="container mx-auto flex min-h-screen w-full flex-col px-4 py-5 sm:px-6 lg:px-10 xl:px-12">
      <header className="flex items-center justify-between gap-4 sm:gap-6">
        <Link
          href="/"
          aria-label={`${instituteFullName} bosh sahifasi`}
          className="group relative flex max-w-[70vw] shrink-0 items-center gap-2.5 sm:gap-3.5"
        >
          <span className="absolute -inset-3 rounded-2xl bg-[#54a2ff]/0 blur-xl transition-all duration-500 group-hover:bg-[#54a2ff]/12" />

          <Image
            src={`/airi-logo_${locale}.png`}
            alt={instituteFullName}
            width={420}
            height={88}
            priority
            className="relative h-9 w-auto min-w-0 max-w-[calc(70vw-3.5rem)] object-contain object-left transition-all duration-300 sm:h-11 sm:max-w-[calc(70vw-4.5rem)] lg:h-12"
          />

          <span className="relative h-8 w-px shrink-0 bg-linear-to-b from-transparent via-white/30 to-transparent sm:h-10" />

          <Image
            src="/uzbekistan_35_yil_round_transparent.png"
            alt=""
            width={1064}
            height={1064}
            priority
            className="relative size-10 shrink-0 object-contain drop-shadow-[0_0_14px_rgba(84,162,255,0.28)] transition-transform duration-300 group-hover:scale-105 sm:size-12 lg:size-14"
          />
        </Link>

        <div
          aria-label={t.hero.languageSelector}
          className="border border-white/10 bg-black/20 px-2 py-1.5 backdrop-blur-xl"
        >
          <LanguageFlags />
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center py-8 sm:py-10 lg:py-12">
        <div className="mx-auto w-full max-w-7xl text-center">
          {/* Asosiy sarlavha */}
          <h1
            className="
        mx-auto max-w-280
        font-display
        text-[28px]
        font-semibold
        uppercase
        leading-[1.04]
        tracking-[0.01em]
        text-white

        sm:text-[36px]
        md:text-[44px]
        lg:text-[52px]
        xl:text-[58px]
        2xl:text-[62px]
      "
          >
            <span className="block">{t.hero.titleFirstLine}</span>

            <span
              className="
          block
          bg-linear-to-r
          from-[#54a2ff]
          via-[#8ecbff]
          to-[#2dd4bf]
          bg-clip-text
          text-transparent
          drop-shadow-[0_0_28px_rgba(84,162,255,0.16)]
        "
            >
              {t.hero.titleSecondLine}
            </span>
          </h1>

          <p className="sr-only">{instituteFullName}</p>

          {/* Asosiy izoh */}
          <p
            className="
        mx-auto mt-5
        max-w-[850px]
        font-sans
        text-[16px]
        font-normal
        leading-7
        text-white/70

        sm:text-[18px]
        lg:text-[20px]
        lg:leading-8
      "
          >
            {t.hero.description}
          </p>

          {/* Katta navigatsiya tugmalari */}
          <nav
            aria-label={t.hero.portalNavigation}
            className="
        mx-auto mt-10 
        grid w-full
        max-w-[1080px]
        gap-4

        sm:grid-cols-3
        lg:mt-8
        lg:gap-5
      "
          >
            {portalLinks.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
            group relative
            flex min-h-[76px]
            flex-col items-center justify-center
            overflow-hidden
            border
            px-5 py-3
            text-center
            backdrop-blur-xl
            transition-all duration-300

            sm:min-h-[82px]
            sm:px-5
            sm:py-3.5

            lg:min-h-[88px]
            lg:px-6
            lg:py-4

            ${
              index === 0
                ? `
                  border-[#54a2ff]/55
                  bg-[#54a2ff]/12
                  shadow-[0_0_45px_rgba(84,162,255,0.10)]
                  hover:border-[#54a2ff]/80
                  hover:bg-[#54a2ff]/18
                `
                : `
                  border-white/15
                  bg-white/[0.065]
                  hover:border-[#54a2ff]/50
                  hover:bg-[#54a2ff]/10
                `
            }
          `}
              >
                {/* Hover yaltirashi */}
                <span
                  className="
              pointer-events-none
              absolute inset-0
              -translate-x-full
              bg-linear-to-r
              from-transparent
              via-white/10
              to-transparent
              transition-transform
              duration-700
              group-hover:translate-x-full
            "
                />

                {/* Yuqoridagi ingichka chiziq */}
                <span
                  className="
              pointer-events-none
              absolute inset-x-7 top-0
              h-px
              bg-linear-to-r
              from-transparent
              via-[#54a2ff]/75
              to-transparent
              opacity-0
              transition-opacity
              duration-300
              group-hover:opacity-100
            "
                />

                {/* Tugma asosiy nomi */}
                <span
                  className="
              relative
              flex items-center justify-center
              gap-2.5
              font-sans
              text-[15px]
              font-semibold
              leading-5
              text-white

              lg:text-base
            "
                >
                  {item.label}

                  <ArrowRight
                    className="
                h-[17px] w-[17px]
                shrink-0
                text-[#8ecbff]
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
                  />
                </span>

                {/* Tugma ikkilamchi matni */}
                <span
                  className="
              relative
              mt-1
              block
              min-h-5
              font-sans
              text-[13px]
              font-normal
              leading-5
              text-white/65
              transition-colors
              duration-300

              lg:text-sm
              group-hover:text-[#b6dcff]
            "
                >
                  {item.sub}
                </span>
              </Link>
            ))}
          </nav>

          <IndependenceBanner />
        </div>
      </main>
    </div>
  );
}
