/** @format */

"use client";

import { Button } from "@/components/ui/button";
import { useLocale } from "@/i18n";
import {
  Building2,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  UserRound,
} from "lucide-react";

const texts = {
  uz: { title: "Murojaatingizni bitta markaziy aloqa sahifasi orqali qabul qilamiz", description: "Institut faoliyati, hamkorlik, ilmiy yo'nalishlar yoki rasmiy ma'lumotlar bo'yicha savollaringizni yuboring. Jamoamiz murojaatingizni ko'rib chiqib, tegishli yo'nalish bo'yicha javob beradi.", cardTitles: ["Telefon", "Elektron pochta", "Telegram", "Manzil"], address: "100125, Toshkent sh., Mirzo Ulug'bek tumani, Bo'z-2, 17A", workTime: "Ish vaqti", weekdays: "Dushanba - Juma", institute: "Institut", instituteName: "Raqamli texnologiyalar va sun'iy intellekt ilmiy-tadqiqot instituti", formTitle: "Murojaat uchun", formDescription: "Quyidagi ma'lumotlarni yuborsangiz, murojaatingiz tegishli bo'limga yo'naltiriladi.", fullName: "Ism familiya", fullNamePlaceholder: "Ismingizni kiriting", contact: "Telefon yoki email", message: "Murojaat matni", messagePlaceholder: "Savolingiz yoki taklifingizni yozing", submit: "Murojaat yuborish" },
  ru: { title: "Мы принимаем обращения через единую страницу контактов", description: "Отправьте вопросы о деятельности института, сотрудничестве, научных направлениях или официальной информации. Наша команда рассмотрит обращение и ответит по соответствующему направлению.", cardTitles: ["Телефон", "Электронная почта", "Telegram", "Адрес"], address: "100125, г. Ташкент, Мирзо-Улугбекский р-н, массив Буз-2, 17А", workTime: "Время работы", weekdays: "Понедельник — пятница", institute: "Институт", instituteName: "Научно-исследовательский институт развития цифровых технологий и искусственного интеллекта", formTitle: "Обращение", formDescription: "Отправьте указанные ниже данные, и ваше обращение будет направлено в соответствующий отдел.", fullName: "Имя и фамилия", fullNamePlaceholder: "Введите имя и фамилию", contact: "Телефон или email", message: "Текст обращения", messagePlaceholder: "Напишите ваш вопрос или предложение", submit: "Отправить обращение" },
  en: { title: "We receive your inquiries through one central contact page", description: "Send your questions about the institute's activities, collaboration, research fields, or official information. Our team will review your inquiry and respond through the relevant department.", cardTitles: ["Phone", "Email", "Telegram", "Address"], address: "17A, Boz-2, Mirzo Ulugbek District, Tashkent 100125", workTime: "Working hours", weekdays: "Monday–Friday", institute: "Institute", instituteName: "Research Institute for the Development of Digital Technologies and Artificial Intelligence", formTitle: "Send an inquiry", formDescription: "Provide the information below and your inquiry will be directed to the appropriate department.", fullName: "Full name", fullNamePlaceholder: "Enter your full name", contact: "Phone or email", message: "Inquiry", messagePlaceholder: "Write your question or proposal", submit: "Send inquiry" },
} as const;

export default function ContactPage() {
  const { locale } = useLocale();
  const content = texts[locale];
  const contactCards = [
    { title: content.cardTitles[0], value: "+998 (71) 263-41-98", href: "tel:+998712634198", icon: Phone, tone: "from-[#604eff] via-[#08e8ea] to-[#604eff]" },
    { title: content.cardTitles[1], value: "info@airi.uz", href: "mailto:info@airi.uz", icon: Mail, tone: "from-[#08e8ea] via-[#604eff] to-[#08e8ea]" },
    { title: content.cardTitles[2], value: "@airiuz", href: "https://t.me/airiuz", icon: Send, tone: "from-[#604eff] via-emerald-400 to-[#08e8ea]" },
    { title: content.cardTitles[3], value: content.address, href: "https://goo.gl/maps/PuhsobtxYeY5pvCB7", icon: MapPin, tone: "from-emerald-400 via-[#08e8ea] to-[#604eff]" },
  ];

  return (
    <section className="bg-linear-to-b from-white via-[#fbfcff] to-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-16 lg:px-8 lg:py-20">
        <div className="mb-8 max-w-3xl text-center mx-auto">
          <h1 className="airi-section-title airi-gradient-text max-w-4xl uppercase">
            {content.title}
          </h1>
          <p className="airi-section-copy mt-5 max-w-3xl text-slate-600">
            {content.description}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              {contactCards.map((card) => {
                const Icon = card.icon;

                return (
                  <a
                    key={card.title}
                    href={card.href}
                    target={card.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      card.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white p-5 shadow-[0_16px_50px_rgba(15,23,42,0.07)] transition duration-300 hover:-translate-y-1 hover:border-[#604eff]/35 hover:shadow-[0_24px_70px_rgba(96,78,255,0.14)]">
                    <span
                      className={`absolute inset-x-0 top-0 h-1.5 bg-linear-to-r ${card.tone}`}
                    />
                    <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-[#604eff]/10 text-[#604eff] transition-colors group-hover:bg-[#604eff] group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="font-accent text-xs font-extrabold uppercase text-slate-500">
                      {card.title}
                    </p>
                    <p className="mt-2 text-base font-bold leading-6 text-slate-950 sm:text-lg">
                      {card.value}
                    </p>
                  </a>
                );
              })}
            </div>

            <div className="mt-8 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_16px_50px_rgba(15,23,42,0.07)]">
              <div className="h-1.5 bg-linear-to-r from-[#604eff] via-[#08e8ea] to-emerald-400" />
              <div className="grid gap-0 sm:grid-cols-2">
                <div className="p-5">
                  <div className="mb-3 flex items-center gap-2 font-accent text-xs font-extrabold uppercase text-[#604eff]">
                    <Clock3 className="h-4 w-4" />
                    {content.workTime}
                  </div>
                  <p className="font-heading text-xl font-extrabold text-slate-950">
                    {content.weekdays}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-600">
                    09:00 - 18:00
                  </p>
                </div>
                <div className="border-t border-slate-200 bg-slate-50 p-5 sm:border-l sm:border-t-0">
                  <div className="mb-3 flex items-center gap-2 font-accent text-xs font-extrabold uppercase text-[#604eff]">
                    <Building2 className="h-4 w-4" />
                    {content.institute}
                  </div>
                  <p className="font-heading text-xl font-extrabold text-slate-950">
                    AIRI
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                    {content.instituteName}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-[#604eff]/15 bg-white shadow-[0_24px_80px_rgba(96,78,255,0.12)]">
            <div className="h-1.5 bg-linear-to-r from-[#604eff] via-[#08e8ea] to-emerald-400" />
            <div className="p-5 sm:p-6">
              <div className="mb-6 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#604eff] text-white">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <h2 className=" text-2xl font-semibold text-slate-950">
                    {content.formTitle}
                  </h2>
                  <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                    {content.formDescription}
                  </p>
                </div>
              </div>

              <form
                action="mailto:info@airi.uz"
                method="post"
                encType="text/plain"
                className="space-y-4">
                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-sm font-semibold text-slate-700">
                    {content.fullName}
                  </label>
                  <div className="relative">
                    <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      className="h-12 w-full rounded-lg border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-medium text-slate-900 outline-none transition focus:border-[#604eff] focus:bg-white focus:ring-4 focus:ring-[#604eff]/10"
                      placeholder={content.fullNamePlaceholder}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-semibold text-slate-700">
                    {content.contact}
                  </label>
                  <div className="relative">
                    <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      id="phone"
                      name="phone"
                      type="text"
                      className="h-12 w-full rounded-lg border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-medium text-slate-900 outline-none transition focus:border-[#604eff] focus:bg-white focus:ring-4 focus:ring-[#604eff]/10"
                      placeholder="+998 ..."
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-semibold text-slate-700">
                    {content.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-[#604eff] focus:bg-white focus:ring-4 focus:ring-[#604eff]/10"
                    placeholder={content.messagePlaceholder}
                  />
                </div>

                <Button
                  type="submit"
                  className="h-12 w-full rounded-lg bg-[#604eff] font-bold text-white shadow-lg shadow-[#604eff]/20 hover:bg-[#4f3ff0]">
                  <Send className="h-4 w-4" />
                  {content.submit}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
