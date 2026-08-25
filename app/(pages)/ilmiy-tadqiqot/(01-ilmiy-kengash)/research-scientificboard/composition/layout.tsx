/** @format */

import type { Metadata } from "next";
import { pageMetadata } from "@/config/seo";

export const metadata: Metadata = pageMetadata({
  title: "Institut Ilmiy kengashi tarkibi",
  description: "AIRI Institut Ilmiy kengashi raisi, kotibi va a’zolari tarkibi.",
  path: "/ilmiy-tadqiqot/research-scientificboard/composition",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
