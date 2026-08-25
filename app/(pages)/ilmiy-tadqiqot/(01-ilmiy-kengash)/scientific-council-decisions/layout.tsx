/** @format */

import type { Metadata } from "next";
import { pageMetadata } from "@/config/seo";

export const metadata: Metadata = pageMetadata({
  title: "Ilmiy kengash qarorlari",
  description: "AIRI Ilmiy kengashi tomonidan qabul qilingan qarorlar va majlis bayonnomalari to'plami.",
  path: "/ilmiy-tadqiqot/scientific-council-decisions",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
