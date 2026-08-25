/** @format */

import type { Metadata } from "next";
import { pageMetadata } from "@/config/seo";

export const metadata: Metadata = pageMetadata({
  title: "Davlat ramzlari",
  description: "O'zbekiston Respublikasining davlat bayrog'i, gerbi va madhiyasi haqida ma'lumot.",
  path: "/umumiy-malumot/generalinformation-statesymbols",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
