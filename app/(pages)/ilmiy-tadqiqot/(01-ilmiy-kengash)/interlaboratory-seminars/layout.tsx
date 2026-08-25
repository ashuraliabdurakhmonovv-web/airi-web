/** @format */

import type { Metadata } from "next";
import { pageMetadataFor } from "@/config/seo";
import BreadcrumbJsonLd from "@/app/_components/seo/breadcrumb-jsonld";

const PATH = "/ilmiy-tadqiqot/interlaboratory-seminars";

export const metadata: Metadata = pageMetadataFor(PATH, "uz");

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd path={PATH} />
      {children}
    </>
  );
}
