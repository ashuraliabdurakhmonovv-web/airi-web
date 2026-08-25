/** @format */

import type { Metadata } from "next";
import { pageMetadata } from "@/config/seo";

export const metadata: Metadata = pageMetadata({
  title: "O'tgan ilmiy seminarlar",
  description: "Institutda o'tkazilgan ilmiy seminarlar arxivi: mavzular, ma'ruzachilar va muhokama natijalari.",
  path: "/ilmiy-tadqiqot/past-seminars",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
