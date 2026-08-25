/** @format */

import type { Metadata } from "next";
import { pageMetadata } from "@/config/seo";

export const metadata: Metadata = pageMetadata({
  title: "Ilmiy seminarlar",
  description: "AIRI yangiliklaridan avtomatik saralangan, institutda o'tkazilgan ilmiy seminarlar, treninglar va muhokamalar arxivi.",
  path: "/ilmiy-tadqiqot/seminars",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
