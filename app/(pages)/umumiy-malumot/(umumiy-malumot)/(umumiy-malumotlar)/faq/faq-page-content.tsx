/** @format */
"use client";

import { Button } from "@/components/ui/button";
import {
  Building2,
  ChevronDown,
  CircleHelp,
  Mail,
} from "lucide-react";
import { useLocale } from "@/i18n";

export default function FaqPageContent() {
  const { t } = useLocale();

  return (
    <main className="bg-linear-to-b from-white via-[#fbfcff] to-white">
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div>
            <h1 className="airi-section-title airi-gradient-text mt-5 max-w-4xl uppercase">
              {t.faqPage.title}
            </h1>
            <p className="airi-section-copy mt-5 max-w-3xl text-slate-600">
              {t.faqPage.description}
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.36fr_0.64fr]">
          <aside className="h-fit rounded-lg border border-[#604eff]/15 bg-white p-6 shadow-[0_16px_44px_rgb(96_78_255/.08)] lg:sticky lg:top-28">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="font-accent text-sm font-bold uppercase text-[#604eff]">
                  {t.faqPage.topics}
                </span>
                <h2 className="mt-3 font-heading text-2xl font-extrabold leading-tight text-slate-950">
                  {t.faqPage.questionsSection}
                </h2>
              </div>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-white">
                <CircleHelp className="h-6 w-6" />
              </span>
            </div>

            <div className="mt-6 grid gap-3">
              {t.faqPage.topicList.map((item) => (
                <span
                  key={item}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-600">
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-6 rounded-lg bg-[#080c14] p-5 text-white">
              <div className="mb-3 flex items-center gap-2">
                <Building2 className="h-4 w-4 text-[#08e8ea]" />
                <p className="text-sm font-bold">{t.faqPage.contactTitle}</p>
              </div>
              <p className="text-sm leading-6 text-white/70">
                {t.faqPage.contactDescription}
              </p>
              <Button
                asChild
                size="lg"
                className="mt-5 rounded-lg bg-white font-bold text-slate-950 hover:bg-white/85">
                <a href="mailto:info@airi.uz">
                  {t.faqPage.sendMessage}
                  <Mail className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </aside>

          <div className="grid gap-4">
            {t.faqPage.items.map((item, index) => (
              <details
                key={item.question}
                open={index === 0}
                className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition duration-300 open:border-[#604eff]/30 open:shadow-xl open:shadow-[#604eff]/10 hover:border-[#604eff]/25">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-5 px-5 py-5 md:px-7 md:py-6">
                  <span className="grid gap-2">
                    <span className="font-accent text-xs font-extrabold uppercase text-[#604eff]">
                      {String(index + 1).padStart(2, "0")} / {item.category}
                    </span>
                    <span className=" text-lg font-semibold leading-snug text-slate-950 md:text-2xl">
                      {item.question}
                    </span>
                  </span>
                  <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#604eff]/15 bg-[#604eff]/10 text-[#604eff] transition duration-300 group-open:rotate-180 group-open:bg-[#604eff] group-open:text-white">
                    <ChevronDown className="h-5 w-5" />
                  </span>
                </summary>

                <div className="px-5 pb-6 md:px-7">
                  <div className="border-t border-slate-100 pt-5">
                    <p className="max-w-3xl text-display font-medium leading-8 text-slate-600">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
