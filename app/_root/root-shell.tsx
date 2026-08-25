/** @format */

import { Suspense } from "react";
import type { ReactNode } from "react";

import { googleSans, scienceGothic } from "../font";
import NavigationEvents from "../navigation-event";
import ClientPreferences from "../client-preferences";
import TextReader from "../_components/text-reader/text-reader";
import Chatbot from "../_components/chatbot/chatbot";
import OrganizationJsonLd from "../_components/seo/organization-jsonld";
import QueryProvider from "@/config/providers/query-provider";
import type { RouteLocale } from "@/config/pages";
import LocaleBoundary from "./locale-boundary";
import "../globals.css";

/**
 * Uchala til daraxti uchun umumiy `<html>` / `<body>` qobig'i.
 *
 * Nega alohida komponent: har bir til o'z ROOT layoutiga ega bo'lishi shart —
 * faqat root layout `<html>` chiza oladi va `lang` atributi til bo'yicha
 * farq qilishi kerak. Qobiqni bu yerda saqlab, uch marta nusxalashdan
 * qutulamiz.
 *
 * `locale` — marshrut segmentidan keladigan til:
 *   - `(pages)` daraxtida `"uz"`, lekin u YAKUNIY emas: foydalanuvchi
 *     `localStorage` orqali tilni almashtira oladi;
 *   - `/ru/` va `/en/` daraxtlarida esa YAKUNIY — URL tilni belgilaydi va
 *     `localStorage` uni bekor qila olmaydi. Aks holda berilgan HTML va
 *     hidratsiyadan keyingi DOM turli tilda bo'lib qolardi, Google esa
 *     bunday hreflang klasterini rad etadi.
 */
export default function RootShell({
  locale,
  children,
}: {
  locale: RouteLocale;
  children: ReactNode;
}) {
  const routeLocked = locale !== "uz";

  return (
    <html
      lang={locale}
      className={`${googleSans.variable} ${scienceGothic.variable}`}
      suppressHydrationWarning>
      <body suppressHydrationWarning>
        <OrganizationJsonLd />
        <ClientPreferences routeLocale={routeLocked ? locale : undefined} />
        <QueryProvider>
          <LocaleBoundary locale={locale}>
            <Suspense fallback={null}>
              <NavigationEvents />
            </Suspense>
            <TextReader />
            <Chatbot />
            <main className="">{children}</main>
          </LocaleBoundary>
        </QueryProvider>
      </body>
    </html>
  );
}
