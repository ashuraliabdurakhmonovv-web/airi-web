/** @format */

import type { Metadata } from "next";
import { pageMetadata } from "@/config/seo";

export const metadata: Metadata = pageMetadata({
  title: "Ilmiy darajalar beruvchi kengash — Kengash haqida",
  description: "AIRI huzuridagi ilmiy darajalar beruvchi kengashning vazifalari, kodi va ixtisoslik yo‘nalishlari.",
  path: "/ilmiy-tadqiqot/degree-awarding-council/about",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
