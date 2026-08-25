/** @format */

import type { Metadata } from "next";
import { pageMetadata } from "@/config/seo";

export const metadata: Metadata = pageMetadata({
  title: "Ilmiy darajalar beruvchi ilmiy kengash (PhD, DSc)",
  description: "AIRI huzuridagi ilmiy darajalar beruvchi ilmiy kengash tarkibi, vakolatlari va dissertatsiya himoyasi tartibi.",
  path: "/ilmiy-tadqiqot/degree-awarding-council",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
