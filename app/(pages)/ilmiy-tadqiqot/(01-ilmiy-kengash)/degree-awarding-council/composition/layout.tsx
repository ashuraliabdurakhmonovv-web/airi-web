/** @format */

import type { Metadata } from "next";
import { pageMetadata } from "@/config/seo";

export const metadata: Metadata = pageMetadata({
  title: "Ilmiy darajalar beruvchi kengash tarkibi",
  description: "AIRI huzuridagi ilmiy darajalar beruvchi kengash rahbariyati va a’zolari tarkibi.",
  path: "/ilmiy-tadqiqot/degree-awarding-council/composition",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
