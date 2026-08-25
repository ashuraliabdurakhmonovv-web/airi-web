/** @format */

import type { Metadata } from "next";
import { pageMetadata } from "@/config/seo";

export const metadata: Metadata = pageMetadata({
  title: "Dissertatsiya himoyasi e'lonlari",
  description: "AIRI yangiliklaridan avtomatik saralangan PhD va DSc dissertatsiya himoyasi e'lonlari, sanalari va mavzulari.",
  path: "/ilmiy-tadqiqot/dissertation-defense-announcements",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
