/** @format */

import type { Metadata } from "next";
import { pageMetadata } from "@/config/seo";

export const metadata: Metadata = pageMetadata({
  title: "Tadbirlar taqvimi",
  description: "Institutning yaqin oylardagi ilmiy tadbirlari, konferensiyalari va seminarlari taqvimi.",
  path: "/umumiy-malumot/institute-eventcalendar",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
