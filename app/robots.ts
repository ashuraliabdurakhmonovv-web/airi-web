/** @format */

import type { MetadataRoute } from "next";
import { SITE_URL, SEO_EXCLUDED_PATHS } from "@/config/seo";

// `output: "export"` rejimida statik `robots.txt` sifatida generatsiya qilinadi.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // DIQQAT: `/404` va `/not-found` ataylab BLOKLANMAGAN. Ular endi
        // haqiqiy 404/410 status qaytaradi; bloklansa robot bu statusni hech
        // qachon ko'rmaydi va eski URL indeksda muzlab qoladi.
        disallow: ["/_next/", ...SEO_EXCLUDED_PATHS],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
