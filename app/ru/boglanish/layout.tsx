/** @format */

import Navbar from "@/app/(pages)/umumiy-malumot/(umumiy-malumot)/components/navbar/navbar";
import Footer from "@/app/(pages)/umumiy-malumot/(umumiy-malumot)/components/footer/footer";

/**
 * "Bog'lanish" bo'limi o'z navbar/footer'ini beradi (umumiy bo'lim layouti
 * ostida emas).
 *
 * O'zbekcha `boglanish/layout.tsx` ni qayta eksport QILMAYMIZ: u o'z ichida
 * o'zbekcha `BreadcrumbJsonLd` ni chizadi va sahifada ikkita — o'zbekcha va
 * ruscha — breadcrumb paydo bo'lardi. Bu yerda faqat tuzilma qoladi,
 * breadcrumb esa `page.tsx` da to'g'ri til bilan beriladi.
 */
export default function RuContactLayout({
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
