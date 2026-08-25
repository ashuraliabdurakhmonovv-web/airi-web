/** @format */

import Navbar from "@/app/(pages)/umumiy-malumot/(umumiy-malumot)/components/navbar/navbar";
import Footer from "@/app/(pages)/umumiy-malumot/(umumiy-malumot)/components/footer/footer";
import TextReader from "@/app/_components/text-reader/text-reader";

// SEO: bu yerda `title`/`description`/`openGraph` E'LON QILINMAYDI.
// Bo'lim layoutida ular butun bo'lim ostidagi sahifalarga meros bo'lib o'tib,
// hammasini bir xil sarlavhaga aylantirib qo'yadi (avval `AIRI | AIRI` edi).
// Har bir sahifa o'z metadata'sini `pageMetadata()` orqali beradi.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TextReader />
      <Navbar />
      <main className="pt-20 font-sans">{children}</main>
      <Footer />
    </>
  );
}
