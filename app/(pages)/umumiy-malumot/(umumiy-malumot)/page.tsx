/** @format */

import type { Metadata } from "next";
import { pageMetadataFor } from "@/config/seo";
import Activities from "./components/Landing/Activities";
import Hero from "./components/Landing/Hero";
import OurTeachers from "./components/Landing/OurTeachers";
import { Partners } from "./components/Landing/Partnersland";
import ProfessorHighlight from "./components/Landing/ProfessorHighlight";

const PATH = "/umumiy-malumot";

// Sarlavha, tavsif va hreflang to'plami `config/pages.json` dan.
export const metadata: Metadata = pageMetadataFor(PATH, "uz");

const Home = () => {
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
      <div className="general-landing -mt-20 bg-white">
        <Hero />
        <div className="general-landing-sections space-y-4 bg-linear-to-b from-white via-[#f8faff] to-white pb-14">
          
          <ProfessorHighlight />
          <Activities />
          <OurTeachers />
          <Partners />
        </div>
      </div>
    </>
  );
};

export default Home;
