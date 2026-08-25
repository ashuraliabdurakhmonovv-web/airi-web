/** @format */

import type { Metadata } from "next";
import { pageMetadata } from "@/config/seo";

export const metadata: Metadata = pageMetadata({
  title: "Xalqaro hamkorlik",
  description: "AIRI ning xorijiy universitetlar, ilmiy markazlar va texnologik kompaniyalar bilan hamkorlik aloqalari.",
  path: "/umumiy-malumot/research-internationalrelationships",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
