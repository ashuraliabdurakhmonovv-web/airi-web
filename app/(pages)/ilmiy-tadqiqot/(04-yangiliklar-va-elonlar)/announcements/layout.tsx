/** @format */

import type { Metadata } from "next";
import { pageMetadata } from "@/config/seo";

export const metadata: Metadata = pageMetadata({
  title: "E'lonlar",
  description: "AIRI qabul jarayonlari, imtihonlar, grantlar, tanlovlar, hujjat topshirish va ro'yxatdan o'tish bo'yicha rasmiy ilmiy e'lonlari.",
  path: "/ilmiy-tadqiqot/announcements",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
