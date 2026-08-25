"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { useLocale } from "@/i18n";
import { getProductionContent } from "@/i18n/production-content";

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: "info@airi.uz",
    href: "mailto:info@airi.uz",
    external: false,
  },
  {
    icon: Phone,
    label: "Telefon",
    value: "+998 (71) 263-41-98",
    href: "tel:+998712634198",
    external: false,
  },
  {
    icon: MapPin,
    label: "Manzil",
    value: "100125, Toshkent sh., Mirzo Ulug'bek t., Bo'z-2, 17A",
    href: "https://goo.gl/maps/PuhsobtxYeY5pvCB7",
    external: true,
  },
];

export function ContactSection() {
  const { locale } = useLocale();
  const copy = getProductionContent(locale).contact;
  const localizedChannels = channels.map((channel, index) => ({
    ...channel,
    label: copy.labels[index],
    value: index === 2 ? copy.address : channel.value,
  }));
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.12 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden bg-black py-24 text-white lg:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/15 to-transparent" />
      <div className="absolute -right-20 top-10 h-72 w-72 bg-[#54a2ff]/10 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-350 px-6 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          {/* Chap — sarlavha */}
          <div className="lg:col-span-7">
            <span
              className={`mb-8 inline-flex items-center gap-4 font-mono text-sm text-white/45 transition-all duration-700 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}>
              <span className="h-px w-12 bg-white/20" />
              {copy.eyebrow}
            </span>

            <h2
              className={`font-display text-[clamp(2.5rem,6vw,5.25rem)] leading-[0.94] tracking-tight transition-all duration-1000 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}>
              <span className="block">{copy.title[0]}</span>
              <span className="block text-white/62">
                {copy.title[1]}
              </span>
            </h2>

            <p
              className={`mt-9 max-w-xl text-lg leading-relaxed text-white/60 transition-all delay-100 duration-1000 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}>
              {copy.description}
            </p>
          </div>

          {/* O'ng — kanallar */}
          <div
            className={`lg:col-span-5 transition-all delay-150 duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}>
            <div className="border-t border-white/12">
              {localizedChannels.map((channel) => {
                const Icon = channel.icon;

                return (
                  <a
                    key={channel.label}
                    href={channel.href}
                    target={channel.external ? "_blank" : undefined}
                    rel={channel.external ? "noopener noreferrer" : undefined}
                    className="group flex items-start gap-5 border-b border-white/12 py-6 transition-colors hover:bg-white/[0.03]">
                    <Icon className="mt-1 h-4.5 w-4.5 shrink-0 text-white/35 transition-colors group-hover:text-[#54a2ff]" />

                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-white/32">
                        {channel.label}
                      </span>
                      <span className="mt-2 block text-base leading-relaxed text-white/78 transition-colors group-hover:text-white">
                        {channel.value}
                      </span>
                    </span>

                    <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 -translate-x-1 translate-y-1 text-white/40 opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-white group-hover:opacity-100" />
                  </a>
                );
              })}
            </div>

            <Link
              href="/ishlab-chiqarish/contact"
              className="mt-10 inline-flex items-center gap-3 border border-white/20 px-6 py-4 text-sm font-medium text-white transition-colors hover:border-white hover:bg-white hover:text-black">
              {copy.action}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
