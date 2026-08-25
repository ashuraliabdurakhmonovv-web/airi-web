/** @format */

import type { Metadata } from "next";
import { pageMetadata } from "@/config/seo";

export const metadata: Metadata = pageMetadata({
  title: "Bitiruvchilar",
  description: "Institut doktoranturasini tamomlagan va ilmiy daraja olgan bitiruvchilar ro'yxati.",
  path: "/umumiy-malumot/institute-graduates",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
