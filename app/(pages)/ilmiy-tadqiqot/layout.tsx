/** @format */

import Navbar from "./_components/layout/navbar";
import Footer from "./_components/layout/footer";

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
      <style
        dangerouslySetInnerHTML={{
          __html: `
            html {
              scrollbar-width: none;
              -ms-overflow-style: none;
            }

            html::-webkit-scrollbar,
            body::-webkit-scrollbar {
              width: 0;
              height: 0;
              background: transparent;
            }

            html::-webkit-scrollbar-thumb,
            body::-webkit-scrollbar-thumb {
              background: transparent;
            }
          `,
        }}
      />
      <Navbar />
      <main className="pt-20 font-family">{children}</main>
      <Footer />
    </>
  );
}
