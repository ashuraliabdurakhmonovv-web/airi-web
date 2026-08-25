/** @format */

import type { Metadata } from "next";
import { pageMetadata } from "@/config/seo";

export const metadata: Metadata = pageMetadata({
  title: "Institut Ilmiy kengashi — Kengash haqida",
  description: "AIRI Institut Ilmiy kengashining vazifalari, vakolatlari va ilmiy-tashkiliy faoliyati haqida ma’lumot.",
  path: "/ilmiy-tadqiqot/research-scientificboard/about",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
