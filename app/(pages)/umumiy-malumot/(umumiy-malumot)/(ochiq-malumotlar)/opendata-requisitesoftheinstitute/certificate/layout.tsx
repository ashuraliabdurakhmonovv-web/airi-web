/** @format */

import type { Metadata } from "next";
import { pageMetadata } from "@/config/seo";

export const metadata: Metadata = pageMetadata({
  title: "Institut guvohnomasi",
  description: "Institutning davlat ro'yxatidan o'tganligi to'g'risidagi guvohnoma va tegishli rasmiy hujjatlar.",
  path: "/umumiy-malumot/opendata-requisitesoftheinstitute/certificate",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
