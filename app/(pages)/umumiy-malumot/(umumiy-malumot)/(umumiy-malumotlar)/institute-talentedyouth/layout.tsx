/** @format */

import type { Metadata } from "next";
import { pageMetadata } from "@/config/seo";

export const metadata: Metadata = pageMetadata({
  title: "Iqtidorli yoshlar",
  description: "Institutning iqtidorli yosh tadqiqotchilari, ularning yutuqlari va ilmiy izlanishlari.",
  path: "/umumiy-malumot/institute-talentedyouth",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
