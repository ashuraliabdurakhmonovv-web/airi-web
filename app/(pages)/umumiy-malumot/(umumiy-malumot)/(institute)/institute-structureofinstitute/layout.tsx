/** @format */

import type { Metadata } from "next";
import { pageMetadataFor } from "@/config/seo";
import BreadcrumbJsonLd from "@/app/_components/seo/breadcrumb-jsonld";

const PATH = "/umumiy-malumot/institute-structureofinstitute";

// Sarlavha, tavsif va til muqobillari `config/pages.json` dan keladi.
export const metadata: Metadata = pageMetadataFor(PATH, "uz");

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd path={PATH} />
      {children}
    </>
  );
}
