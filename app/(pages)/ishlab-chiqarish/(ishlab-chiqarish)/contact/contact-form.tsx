"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { useLocale } from "@/i18n";
import { getProductionContent } from "@/i18n/production-content";

const CONTACT_EMAIL = "info@airi.uz";

type Field = {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
};

const identityFields: Field[] = [
  {
    name: "fullName",
    label: "Ism familiya",
    required: true,
    placeholder: "Ismingiz va familiyangiz",
    autoComplete: "name",
  },
  {
    name: "organization",
    label: "Tashkilot",
    placeholder: "Ish joyingiz yoki tashkilot nomi",
    autoComplete: "organization",
  },
  {
    name: "position",
    label: "Lavozim",
    placeholder: "Lavozimingiz",
    autoComplete: "organization-title",
  },
];

const contactFields: Field[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
    placeholder: "email@example.com",
    autoComplete: "email",
  },
  {
    name: "phone",
    label: "Telefon",
    type: "tel",
    placeholder: "+998 90 123 45 67",
    autoComplete: "tel",
  },
];

const inputClassName =
  "h-13 w-full border border-white/15 bg-white/[0.03] px-4 text-[15px] text-white outline-none transition-colors placeholder:text-white/28 focus:border-white/55 focus:bg-white/[0.06]";

export function ContactForm() {
  const { locale } = useLocale();
  const copy = getProductionContent(locale).contactForm;
  const [requestTypeIndex, setRequestTypeIndex] = useState(0);
  const requestType = copy.types[requestTypeIndex];
  const [sent, setSent] = useState(false);

  /**
   * Sayt statik eksport (`output: "export"`) sifatida chiqariladi — server
   * endpoint yo'q. Shuning uchun forma to'ldirilgan ma'lumotlarni tayyor
   * xat sifatida foydalanuvchining pochta dasturida ochadi.
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "").trim();

    const lines = [
      `${copy.requestType}: ${requestType}`,
      `${copy.fields[0].label}: ${value("fullName")}`,
      value("organization") && `${copy.fields[1].label}: ${value("organization")}`,
      value("position") && `${copy.fields[2].label}: ${value("position")}`,
      `Email: ${value("email")}`,
      value("phone") && `${copy.fields[4].label}: ${value("phone")}`,
      "",
      `${copy.message}:`,
      value("message"),
    ].filter(Boolean);

    const subject = `${requestType} — ${value("fullName")}`;
    const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(lines.join("\n"))}`;

    window.location.href = href;
    setSent(true);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-10">
      {/* Murojaat turi */}
      <fieldset className="grid gap-4">
        <legend className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">
          {copy.requestType}
        </legend>
        <div className="flex flex-wrap gap-2.5">
          {copy.types.map((type, index) => {
            const active = requestTypeIndex === index;

            return (
              <label
                key={type}
                className={`cursor-pointer border px-4 py-2.5 text-sm transition-colors ${
                  active
                    ? "border-white bg-white text-black"
                    : "border-white/18 text-white/65 hover:border-white/45 hover:text-white"
                }`}>
                <input
                  type="radio"
                  name="requestType"
                  value={type}
                  checked={active}
                  onChange={() => setRequestTypeIndex(index)}
                  className="sr-only"
                />
                {type}
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Kim murojaat qilmoqda */}
      <div className="grid gap-5 sm:grid-cols-3">
        {identityFields.map((field, index) => (
          <label key={field.name} className="grid gap-2.5">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">
              {copy.fields[index].label}
              {!field.required && (
                <span className="ml-2 normal-case tracking-normal text-white/25">
                  {copy.optional}
                </span>
              )}
            </span>
            <input
              name={field.name}
              type={field.type ?? "text"}
              required={field.required}
              placeholder={copy.fields[index].placeholder}
              autoComplete={field.autoComplete}
              className={inputClassName}
            />
          </label>
        ))}
      </div>

      {/* Aloqa */}
      <div className="grid gap-5 sm:grid-cols-2">
        {contactFields.map((field, index) => (
          <label key={field.name} className="grid gap-2.5">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">
              {copy.fields[index + 3].label}
              {!field.required && (
                <span className="ml-2 normal-case tracking-normal text-white/25">
                  {copy.optional}
                </span>
              )}
            </span>
            <input
              name={field.name}
              type={field.type ?? "text"}
              required={field.required}
              placeholder={index === 0 ? field.placeholder : copy.fields[index + 3].placeholder}
              autoComplete={field.autoComplete}
              className={inputClassName}
            />
          </label>
        ))}
      </div>

      {/* Xabar */}
      <label className="grid gap-2.5">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">
          {copy.message}
        </span>
        <textarea
          name="message"
          required
          rows={7}
          placeholder={copy.messagePlaceholder}
          className="w-full resize-y border border-white/15 bg-white/[0.03] p-4 text-[15px] leading-relaxed text-white outline-none transition-colors placeholder:text-white/28 focus:border-white/55 focus:bg-white/[0.06]"
        />
      </label>

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="inline-flex w-fit items-center gap-3 border border-white bg-white px-7 py-4 text-sm font-medium text-black transition-colors hover:bg-transparent hover:text-white">
          {copy.submit}
          <ArrowUpRight className="h-4 w-4" />
        </button>

        {sent && (
          <p className="inline-flex items-center gap-2 text-sm text-emerald-300">
            <Check className="h-4 w-4" />
            {copy.success}
          </p>
        )}
      </div>

      <p className="border-t border-white/12 pt-6 text-sm leading-relaxed text-white/45">
        {copy.note}
      </p>
    </form>
  );
}
