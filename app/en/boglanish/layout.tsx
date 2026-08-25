/** @format */

import Navbar from "@/app/(pages)/umumiy-malumot/(umumiy-malumot)/components/navbar/navbar";
import Footer from "@/app/(pages)/umumiy-malumot/(umumiy-malumot)/components/footer/footer";

/**
 * "Bog'lanish" o'z navbar/footer'ini beradi. O'zbekcha layout qayta
 * eksport QILINMAYDI: u o'zbekcha breadcrumb chizadi va sahifada ikkita
 * breadcrumb paydo bo'lardi.
 */
export default function EnContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="pt-20">{children}</main>
      <Footer />
    </>
  );
}
