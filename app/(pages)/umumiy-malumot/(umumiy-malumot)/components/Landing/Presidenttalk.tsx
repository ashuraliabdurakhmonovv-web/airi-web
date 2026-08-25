"use client";

import { useLocale } from "@/i18n";
import Image from "next/image";
import President from "../../image/president.png";

export const Presidenttalk = () => {
  const { t } = useLocale();

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-0">
      <div>
        <h2 className="airi-gradient-text mb-9 text-center text-[30px] font-bold leading-tight sm:text-[34px]">
          {t.generalLanding.presidentRecognitionTitle}
        </h2>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.08fr_1fr] lg:gap-11">
          <div className="relative aspect-[1.27/1] overflow-hidden bg-gray-100">
            <Image
              src={President}
              alt={t.generalLanding.presidentRecognitionAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="object-cover"
            />
          </div>

          <article className="pt-1 lg:pt-2">
            <p className="text-[13px] font-medium leading-tight text-neutral-600">
              {t.generalLanding.presidentRecognitionDate}
            </p>

            <h3 className="airi-gradient-text mt-1 text-[22px] font-bold leading-tight sm:text-[24px]">
              {t.generalLanding.presidentName}
            </h3>

            <p className="mt-1 text-[17px] font-medium leading-tight text-[#604eff]">
              {t.generalLanding.presidentPosition}
            </p>

            <blockquote className="mt-4 text-[16px] font-medium leading-[1.28] text-neutral-700 sm:text-[17px]">
              <span>&ldquo;{t.generalLanding.presidentQuoteBeforeAi} </span>
              <span className="font-medium text-[#604eff]">
                {t.generalLanding.presidentQuoteAi}
              </span>
              <span> {t.generalLanding.presidentQuoteAfterAi}&rdquo;</span>
            </blockquote>
          </article>
        </div>
      </div>
    </section>
  );
};
