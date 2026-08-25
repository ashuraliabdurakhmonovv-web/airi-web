import { Navigation } from "./components/landing/navigation";
import { HeroSection } from "./components/landing/hero-section";
import { AboutSection } from "./components/landing/about-section";
import { ProjectsSection } from "./components/landing/projects-section";
import { ServicesSection } from "./components/landing/services-section";
import { PartnersSection } from "./components/landing/partners-section";
import { ContactSection } from "./components/landing/contact-section";
import { FaqSection } from "./components/landing/faq-section";
import { SiteFooter } from "./components/shared/site-footer";

export default function App() {
  return (
    <main className="relative overflow-x-hidden bg-background">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ServicesSection />
      <PartnersSection />
      <ContactSection />
      <FaqSection />
      <SiteFooter />
    </main>
  );
}
