/** @format */

import type { Metadata } from "next";
import { pageMetadata } from "@/config/seo";

export const metadata: Metadata = pageMetadata({
  title: "Ilmiy topshiriqlar",
  description: "Institut zimmasidagi davlat ilmiy topshiriqlari va ularning bajarilishi bo'yicha ma'lumot.",
  path: "/ilmiy-tadqiqot/scientific-tasks",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
