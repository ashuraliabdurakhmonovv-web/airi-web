"use client";

import { useEffect, useState, useRef } from "react";
import Connectimg from "../../public/images/connection.png";
import School21Logo from "../../public/logo/21school.png";
import AcademyLogo from "../../public/logo/academy.png";
import AiriUzLogo from "../../public/logo/airiuz.png";
import HigherEducationLogo from "../../public/logo/highereducation'.png";
import DigitalMinistryLogo from "../../public/logo/ministr digital.png";
import OmskLogo from "../../public/logo/omsk.png";
import SamarqandLogo from "../../public/logo/samarqand.png";
import SekolakLogo from "../../public/logo/sekolak.png";
import UmsidaLogo from "../../public/logo/UMSIDA.png";
import Image from "next/image";

const partners = [
  { name: "21 School", category: "IT ta'limi", logo: School21Logo },
  { name: "Academy", category: "Ta'lim", logo: AcademyLogo },
  { name: "AiRI.UZ", category: "AI markaz", logo: AiriUzLogo },
  {
    name: "Oliy ta'lim, fan va innovatsiyalar vazirligi",
    category: "Davlat sektori",
    logo: HigherEducationLogo,
  },
  {
    name: "Raqamli texnologiyalar vazirligi",
    category: "Davlat sektori",
    logo: DigitalMinistryLogo,
  },
  { name: "Omsk universiteti", category: "Universitet", logo: OmskLogo },
  {
    name: "Samarqand davlat universiteti",
    category: "Universitet",
    logo: SamarqandLogo,
  },
  { name: "STMM", category: "Xalqaro ta'lim", logo: SekolakLogo },
  {
    name: "Universitas Muhammadiyah Sidoarjo",
    category: "Xalqaro universitet",
    logo: UmsidaLogo,
  },
];

function PartnerLogo({
  partner,
  isHovered,
}: {
  partner: (typeof partners)[number];
  isHovered: boolean;
}) {
  return (
    <div
      className={`relative h-20 w-full max-w-40 overflow-hidden border border-white/20 bg-white/10 shadow-[0_12px_30px_rgba(0,0,0,0.18)] transition-all duration-300 ${
        isHovered ? "opacity-100 scale-105" : "opacity-95"
      }`}>
      <Image
        src={partner.logo}
        alt={`${partner.name} logo`}
        fill
        sizes="160px"
        className="object-contain p-3"
      />
    </div>
  );
}

export function IntegrationsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(
    null,
  );
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="integrations"
      ref={sectionRef}
      className="relative overflow-hidden">
      {/* Header — centré verticalement sur l'image */}
      <div className="relative z-10 pt-32 lg:pt-40 text-center">
        <span
          className={`inline-flex items-center gap-4 text-sm font-mono text-white/70 mb-8 transition-all duration-700 justify-center ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}>
          <span className="w-12 h-px bg-white/25" />
          Hamkorlarimiz
          <span className="w-12 h-px bg-white/25" />
        </span>

        <h2
          className={`text-6xl md:text-7xl lg:text-[128px] font-display tracking-tight leading-[0.9] text-white transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
          Strategik
          <br />
          <span className="text-white/75">hamkorliklar.</span>
        </h2>

        <p
          className={`mt-8 text-xl text-white/70 leading-relaxed max-w-2xl mx-auto transition-all duration-1000 delay-100 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}>
          AIRI ilmiy markazlar, davlat tashkilotlari, universitetlar va sanoat
          korxonalari bilan hamkorlikda innovatsion AI yechimlarni ishlab
          chiqadi.
        </p>
      </div>

      {/* Full-width image */}
      <div
        className={`relative left-1/2 -translate-x-1/2 w-screen -mt-16 transition-all duration-1000 delay-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
        <Image
          src={Connectimg}
          alt="Connection"
          aria-hidden="true"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Integration grid — remonte sur l'image avec spacing mobile approprié */}
      <div className="relative z-10 mt-0 lg:-mt-24 max-w-350 mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
          {partners.map((partner, index) => (
            <div
              key={partner.name}
              className={`group relative min-h-40 overflow-hidden border p-6 lg:min-h-44 lg:p-8 transition-all duration-500 cursor-default ${
                hoveredIndex === index
                  ? "border-white/55 bg-white/9 scale-[1.02]"
                  : "border-white/18 bg-black/20 hover:border-white/35 hover:bg-white/5.5"
              } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{
                transitionDelay: `${index * 30 + 300}ms`,
              }}
              onMouseEnter={(e) => {
                setHoveredIndex(index);
                const rect = e.currentTarget.getBoundingClientRect();
                setMousePos({
                  x: e.clientX - rect.left,
                  y: e.clientY - rect.top,
                });
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setMousePos({
                  x: e.clientX - rect.left,
                  y: e.clientY - rect.top,
                });
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
                setMousePos(null);
              }}>
              {/* Cursor-following halo */}
              {hoveredIndex === index && mousePos && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-0"
                  style={{
                    background: `radial-gradient(220px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.16) 0%, transparent 70%)`,
                  }}
                />
              )}
              {/* Category tag */}
              <span
                className={`absolute top-3 right-3 z-10 text-[10px] font-mono px-2 py-1 transition-colors ${
                  hoveredIndex === index
                    ? "bg-white text-black"
                    : "bg-white/12 text-white/70"
                }`}>
                {partner.category}
              </span>

              {/* Logo */}
              <div className="relative z-10 mb-6 flex h-20 items-center">
                <PartnerLogo
                  partner={partner}
                  isHovered={hoveredIndex === index}
                />
              </div>

              <span className="relative z-10 font-medium block leading-snug pr-4 text-white/90">
                {partner.name}
              </span>

              {/* Animated underline */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-white/18 overflow-hidden">
                <div
                  className={`h-full bg-white transition-all duration-500 ${
                    hoveredIndex === index ? "w-full" : "w-0"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stats row */}
        <div
          className={`flex flex-wrap items-center justify-between gap-8 pt-12 border-t border-white/15 transition-all duration-1000 delay-500 pb-32 lg:pb-40 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}>
          <div className="flex flex-wrap gap-12">
            {[
              { value: "9", label: "Hamkor tashkilotlar" },
              { value: "AI", label: "Amaliy yechimlar" },
              { value: "R&D", label: "Ilmiy tadqiqotlar" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-3">
                <span className="text-3xl font-display text-white">
                  {stat.value}
                </span>
                <span className="text-sm text-white/60">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
