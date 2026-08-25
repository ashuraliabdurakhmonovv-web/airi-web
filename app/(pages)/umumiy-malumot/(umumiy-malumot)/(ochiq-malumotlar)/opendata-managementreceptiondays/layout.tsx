/** @format */

import type { Metadata } from "next";
import { pageMetadata } from "@/config/seo";

export const metadata: Metadata = pageMetadata({
  title: "Rahbariyat qabul kunlari",
  description: "Institut rahbariyatining fuqarolarni qabul qilish kunlari, vaqti va murojaat qilish tartibi.",
  path: "/umumiy-malumot/opendata-managementreceptiondays",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
