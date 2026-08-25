/** @format */

import type { Metadata } from "next";
import { pageMetadata } from "@/config/seo";

export const metadata: Metadata = pageMetadata({
  title: "Ichki hujjatlar",
  description: "Institut ustavi, jamoa shartnomasi, ichki mehnat tartib qoidalari va boshqa rasmiy ichki hujjatlar.",
  path: "/umumiy-malumot/institute-internaldocuments",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
