/** @format */

import type { Metadata } from "next";
import { canonicalUrl, hreflangFor } from "@/config/seo";
import Hero from "../_components/hero/hero";
import News from "../_components/news/news";

// Canonical FAQAT shu yerda — root layoutga qo'yilsa butun saytga meros bo'lib o'tadi.
//
// Sarlavha va tavsif ataylab root layoutdan meros qoladi: bosh sahifa saytning
// eng ko'p klik oladigan sahifasi va uning `<title>` ida `| AIRI` qo'shimchasi
// yo'q. `pageMetadataFor()` uni qo'shib yuborardi, shuning uchun bu yerda
// faqat canonical va til muqobillari beriladi.
export const metadata: Metadata = {
  alternates: { canonical: canonicalUrl("/"), languages: hreflangFor("/") },
};

const Home = () => {
  return (
    <div className="bg-black">
      <Hero />
      <News />
    </div>
  );
};

export default Home;
