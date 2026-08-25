import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react";

import { pageMetadata } from "@/config/seo";
import { Navigation } from "../components/landing/navigation";
import { SiteFooter } from "../components/shared/site-footer";
import { ContactForm } from "./contact-form";
import { LocalizedText } from "@/i18n/localized-text";
import ContactBackground from "@/app/(pages)/ishlab-chiqarish/(ishlab-chiqarish)/public/images/footer.jpg";

export const metadata: Metadata = pageMetadata({
  title: "Bog'lanish — AIRI ishlab chiqarish yo'nalishi",
  description:
    "Sun'iy intellekt, raqamli platforma yoki tadqiqot loyihasi bo'yicha AIRI ishlab chiqarish jamoasi bilan bog'laning.",
  path: "/ishlab-chiqarish/contact",
});

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

export default function ContactPage() {
  return (
    <main className="production-contact-page relative min-h-screen overflow-hidden bg-[#050912] text-white">
      <div className="pointer-events-none fixed inset-0 z-0">
        <Image
          src={ContactBackground}
          alt=""
          aria-hidden="true"
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(2,6,23,0.96)_0%,rgba(3,10,24,0.86)_42%,rgba(4,12,28,0.72)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(84,162,255,0.18),transparent_34%),radial-gradient(circle_at_18%_72%,rgba(45,212,191,0.10),transparent_30%)]" />
      </div>
      <Navigation />

      <section className="relative z-10 pt-32 lg:pt-40">
        <div className="mx-auto max-w-350 px-6 lg:px-12">
          <Link
            href="/ishlab-chiqarish"
            className="group inline-flex items-center gap-3 font-mono text-sm text-white/70 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4 transition-transform duration-500 group-hover:-translate-x-1" />
            <LocalizedText uz="Bosh sahifaga qaytish" ru="Вернуться на главную" en="Back to home" />
          </Link>

          <div className="mt-12 grid gap-14 lg:grid-cols-12 lg:gap-20">
            {/* Chap — sarlavha va kanallar */}
            <div className="lg:col-span-5">
              <span className="mb-8 inline-flex items-center gap-4 font-mono text-sm text-white/65">
                <span className="h-px w-12 bg-white/20" />
                <LocalizedText uz="Bog'lanish" ru="Контакты" en="Contact" />
              </span>

              <h1 className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.94] tracking-tight">
                <span className="block"><LocalizedText uz="Murojaat" ru="Оставьте" en="Send us" /></span>
                <span className="block text-white/78"><LocalizedText uz="qoldiring." ru="обращение." en="an inquiry." /></span>
              </h1>

              <p className="mt-8 max-w-md text-lg leading-relaxed text-white/76">
                <LocalizedText uz="Formani to'ldiring — jamoamiz murojaatingizni ko'rib chiqib, siz bilan bog'lanadi. Yoki to'g'ridan-to'g'ri quyidagi kanallardan foydalaning." ru="Заполните форму — наша команда рассмотрит обращение и свяжется с вами. Также можно воспользоваться указанными каналами напрямую." en="Complete the form and our team will review your inquiry and contact you. You can also use the channels below directly." />
              </p>

              <div className="mt-12 border-t border-white/12">
                {channels.map((channel, index) => {
                  const Icon = channel.icon;

                  return (
                    <a
                      key={channel.label}
                      href={channel.href}
                      target={channel.external ? "_blank" : undefined}
                      rel={channel.external ? "noopener noreferrer" : undefined}
                      className="group flex items-start gap-5 border-b border-white/12 py-6 transition-colors hover:bg-white/[0.03]">
                      <Icon className="mt-1 h-4.5 w-4.5 shrink-0 text-white/55 transition-colors group-hover:text-[#54a2ff]" />
                      <span className="min-w-0 flex-1">
                        <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-white/55">
                          {index === 0 ? <LocalizedText uz="Email" ru="Email" en="Email" /> : index === 1 ? <LocalizedText uz="Telefon" ru="Телефон" en="Phone" /> : <LocalizedText uz="Manzil" ru="Адрес" en="Address" />}
                        </span>
                        <span className="mt-2 block leading-relaxed text-white/78 transition-colors group-hover:text-white">
                          {index === 2 ? <LocalizedText uz="100125, Toshkent sh., Mirzo Ulug'bek t., Bo'z-2, 17A" ru="100125, г. Ташкент, Мирзо-Улугбекский р-н, массив Буз-2, 17А" en="17A, Boz-2, Mirzo Ulugbek District, Tashkent 100125" /> : channel.value}
                        </span>
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* O'ng — forma */}
            <div className="production-contact-form rounded-2xl border border-white/12 bg-[#0b1424]/72 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:p-7 lg:col-span-7 lg:p-9">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10 mt-16 border-t border-white/10 lg:mt-20">
        <SiteFooter />
      </div>
    </main>
  );
}
