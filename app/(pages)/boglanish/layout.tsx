/** @format */

import Navbar from "@/app/(pages)/umumiy-malumot/(umumiy-malumot)/components/navbar/navbar";
import Footer from "@/app/(pages)/umumiy-malumot/(umumiy-malumot)/components/footer/footer";
import type { Metadata } from "next";
import { pageMetadataFor } from "@/config/seo";
import BreadcrumbJsonLd from "@/app/_components/seo/breadcrumb-jsonld";

const PATH = "/boglanish";

// Sarlavha, tavsif va til muqobillari `config/pages.json` dan keladi.
export const metadata: Metadata = pageMetadataFor(PATH, "uz");

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <BreadcrumbJsonLd path={PATH} />
      <Navbar />
      <main className="pt-20">{children}</main>
      <Footer />
    </>
  );
}
