/** @format */

import type { Metadata } from "next";
import { pageMetadata } from "@/config/seo";

export const metadata: Metadata = pageMetadata({
  title: "Institut rekvizitlari",
  description: "AIRI ning rasmiy rekvizitlari: STIR, bank ma'lumotlari, manzil va aloqa vositalari.",
  path: "/umumiy-malumot/opendata-requisitesoftheinstitute",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
