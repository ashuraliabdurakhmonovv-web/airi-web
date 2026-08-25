"use client";

import Image from "next/image";
import { useLocale, type Locale } from "@/i18n";

const banners: Record<Locale, { src: string; alt: string }> = {
  uz: {
    src: "/yagona vatan.png",
    alt: "O‘zbekiston Respublikasi davlat mustaqilligining 35 yilligi",
  },
  ru: {
    src: "/rus_yagona vatan2.png",
    alt: "35-летие государственной независимости Республики Узбекистан",
  },
  en: {
    src: "/eng_yagona vatan2.png",
    alt: "35th anniversary of the state independence of the Republic of Uzbekistan",
  },
};

export default function IndependenceBanner() {
  const { locale } = useLocale();
  const banner = banners[locale];

  return (
    <section
      aria-label={banner.alt}
      className="mx-auto mt-8 w-full max-w-[1080px]"
    >
      <Image
        src={banner.src}
        alt={banner.alt}
        width={2172}
        height={517}
        priority
        className="block h-auto w-full object-contain"
      />
    </section>
  );
}
