/** @format */

import type { Metadata } from "next";
import { pageMetadata } from "@/config/seo";

export const metadata: Metadata = pageMetadata({
  title: "Rejalashtirilgan seminarlar",
  description: "Yaqin kunlarda o'tkaziladigan ilmiy seminarlar jadvali, mavzulari va ma'ruzachilari.",
  path: "/ilmiy-tadqiqot/upcoming-seminars",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
