/** @format */
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Home, SearchX } from "lucide-react";
import { useLocale } from "@/i18n";
import notFoundImage from "@/public/404bad.png";
import { googleSans, scienceGothic } from "./font";
import "./globals.css";

/**
 * 404 sahifasi. `out/404.html` shu komponentdan chiqadi va Apache uni
 * `ErrorDocument 404` sifatida beradi.
 *
 * Nega CSS, font va `<title>` shu yerda: Next `not-found` konventsiyasini
 * `/_not-found` marshrutiga aylantiradi va u ILDIZ layoutga bog'lanmasligi
 * mumkin (root layout bo'lingandan keyin Next standart bo'sh layoutni beradi).
 * Shu sabab sahifa o'zini o'zi ta'minlaydi.
 *
 * `<title>` va `robots` metasi ham shu yerda: avval `404.html` sayt standart
 * sarlavhasini olardi va root layoutdan meros `index, follow` metasini olib
 * kelardi — natijada Google Search Console'da brend so'rovlarida haqiqiy
 * sahifadek ko'rinardi.
 */
const NotFoundPage = () => {
  const { t } = useLocale();

  return (
    <main
      className={`relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#f6f9ff] ${googleSans.variable} ${scienceGothic.variable}`}>
      <title>Sahifa topilmadi | AIRI</title>
      <meta name="robots" content="noindex, nofollow" />

      {/* Orqa fon effektlari */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(96,78,255,0.04)_1px,transparent_1px),linear-gradient(180deg,rgba(8,232,234,0.04)_1px,transparent_1px)] bg-size-[60px_60px]" />
      
      <section className="relative flex min-h-screen w-full flex-col lg:flex-row">
        
        {/* CHAP TOMON: Matn va Kontent */}
        <div className="relative z-10 flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16 xl:px-24">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#604eff]/15 bg-white/50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#604eff] backdrop-blur-md">
              <SearchX className="h-4 w-4" />
              {t.notFound.error}
            </div>

            <h1 className="mt-8 font-heading text-5xl font-bold leading-tight text-slate-900 sm:text-6xl lg:text-7xl">
              {t.notFound.title}
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-slate-600 sm:text-xl">
              {t.notFound.description}
            </p>

            <div className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row">
              <Link
                href="/"
                className="airi-button flex min-h-14 items-center justify-center  px-8 py-4 text-base font-bold text-white shadow-lg transition-transform hover:-translate-y-1 focus:ring-2 focus:ring-[#604eff]/50"
              >
                <Home className="mr-2 h-5 w-5" />
                {t.notFound.returnHome}
              </Link>

              <button
                type="button"
                onClick={() => window.history.back()}
                className="inline-flex min-h-14 items-center justify-center  border border-slate-200 bg-white px-8 py-4 text-base font-bold text-slate-700 shadow-sm transition-all hover:border-[#604eff]/30 hover:bg-slate-50 hover:text-[#604eff]"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                {t.notFound.goBack}
              </button>
            </div>
          </div>
        </div>

        {/* O'NG TOMON: To'liq ekran rasm */}
        <div className="relative hidden h-64 w-full lg:block lg:h-auto lg:w-1/2">
          <div className="absolute inset-0 z-10 bg-linear-to-r from-[#f6f9ff] via-transparent to-transparent lg:from-[#f6f9ff]/80" />
          
          {/* Rasm konteyneri */}
          <div className="relative h-full w-full overflow-hidden">
            <Image
              src={notFoundImage}
              alt="404 Not Found"
              fill
              priority
              className="object-cover object-center transition-transform duration-700 hover:scale-105"
              sizes="50vw"
            />
            
            {/* Dekorativ overlay (ixtiyoriy) */}
            <div className="absolute inset-0 bg-[#604eff]/5 mix-blend-multiply" />
          </div>
        </div>

      </section>
    </main>
  );
};

export default NotFoundPage;