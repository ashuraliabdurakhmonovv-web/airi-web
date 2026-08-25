/** @format */

import { AboutUs } from "./AboutUs";
import { AudienceSection } from "./audience-section";
import { CtaBanner } from "./cta-banner";
import { DoctorateSection } from "./doctorate-section";
import { FaqSection } from "./faq-section";
import { HeroSections } from "./HeroSection";
import ResearchLaboratoriesPreview from "./research-laboratories-preview";

export default function ResearchLandingPage() {
  return (
    <div className="bg-white text-slate-950">
      <HeroSections />
      <AboutUs />
      <AudienceSection />
      <div id="laboratoriyalar" className="scroll-mt-24">
        <ResearchLaboratoriesPreview />
      </div>
      <DoctorateSection />
      <CtaBanner />
      <FaqSection />
    </div>
  );
}
