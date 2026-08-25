/** @format */

import type { Metadata } from "next";
import { pageMetadata } from "@/config/seo";

export const metadata: Metadata = pageMetadata({
  title: "Ilmiy seminar tarkibi",
  description: "Dissertatsiya ishlari muhokama qilinadigan ilmiy seminar a'zolari va uning faoliyat tartibi.",
  path: "/ilmiy-tadqiqot/seminar-board",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
