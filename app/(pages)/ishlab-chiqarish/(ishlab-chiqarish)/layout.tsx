/** @format */

import "./globals.css";

// SEO: bu yerda `title`/`description`/`openGraph` E'LON QILINMAYDI.
// Bo'lim layoutida ular butun bo'lim ostidagi sahifalarga meros bo'lib o'tib,
// hammasini bir xil sarlavhaga aylantirib qo'yadi (avval `AIRI | AIRI` edi).
// Har bir sahifa o'z metadata'sini `pageMetadata()` orqali beradi.

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
