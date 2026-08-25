/** @format */
"use client";

import { FC } from "react";
import { useLocale } from "@/i18n";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  BadgeCheck,
  CreditCard,
  FileText,
  Landmark,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const InstituteRequisites: FC = () => {
  const { t } = useLocale();

  const mainRequisites = [
    {
      label: t.requisitesPage.address,
      value: t.requisitesPage.addressValue,
      icon: <MapPin className="h-5 w-5" />,
    },
    {
      label: t.requisitesPage.taxIdLabel,
      value: "308927120",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      label: t.requisitesPage.okonxLabel,
      value: "95120",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      label: t.requisitesPage.ifutLabel,
      value: t.requisitesPage.ifutValue,
      icon: <FileText className="h-5 w-5" />,
    },
    {
      label: t.requisitesPage.ktutLabel,
      value: "31222444",
      icon: <FileText className="h-5 w-5" />,
    },
  ];

  return (
    <section className="bg-linear-to-b from-white via-[#fbfcff] to-white py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h1 className="airi-section-title airi-gradient-text uppercase">
            {t.requisitesPage.title}
          </h1>

          <p className="airi-section-copy mx-auto mt-4 max-w-3xl text-slate-600">
            {t.requisitesPage.description}
          </p>
        </div>

        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_16px_50px_rgba(15,23,42,0.07)]">
          <div className="h-1.5 bg-linear-to-r from-[#604eff] via-[#08e8ea] to-emerald-400" />
          <div className="border-b border-slate-200 bg-linear-to-r from-[#f8faff] via-white to-[#f8faff] px-6 py-7 md:px-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-accent text-xs font-extrabold uppercase text-[#604eff]">
                  {t.requisitesPage.fullNameLabel}
                </p>
                <h2 className="mt-2 max-w-4xl font-heading text-xl font-extrabold leading-8 text-slate-950 md:text-2xl">
                  {t.requisitesPage.fullName}
                </h2>
              </div>

              <div className="inline-flex w-fit items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">
                <BadgeCheck className="h-4 w-4" />
                {t.requisitesPage.officialInfo}
              </div>
            </div>
          </div>

          <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="p-6 md:p-10">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#604eff]/10 text-[#604eff]">
                  <FileText className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-heading text-xl font-extrabold text-slate-950">
                    {t.requisitesPage.mainRequisites}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {t.requisitesPage.mainRequisitesDescription}
                  </p>
                </div>
              </div>

              <dl className="grid gap-4 md:grid-cols-2">
                {mainRequisites.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-lg border border-slate-200 bg-slate-50 p-5 transition duration-300 hover:border-[#604eff]/25 hover:bg-white hover:shadow-sm">
                    <dt className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
                      <span className="text-[#604eff]">{item.icon}</span>
                      {item.label}
                    </dt>

                    <dd className="text-[15px] font-medium leading-7 text-slate-600">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="border-t border-slate-200 bg-[#fbfcff] p-6 md:p-10 lg:border-l lg:border-t-0">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#604eff]/10 text-[#604eff]">
                  <Landmark className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-heading text-xl font-extrabold text-slate-950">
                    {t.requisitesPage.accounts}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {t.requisitesPage.accountsDescription}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg border border-slate-200 bg-white p-5">
                  <div className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-700">
                    <CreditCard className="h-4 w-4 text-[#604eff]" />
                    {t.requisitesPage.accountNumber}
                  </div>

                  <p className="break-all rounded-lg bg-[#f7f8ff] px-4 py-3 font-mono text-sm font-bold leading-6 text-[#604eff]">
                    400110860262697015100078001
                  </p>

                  <p className="mt-4 text-sm font-medium leading-6 text-slate-600">
                    {t.requisitesPage.centralBank}
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    {t.requisitesPage.bankCode}:{" "}
                    <span className="font-semibold text-slate-700">00014</span>
                  </p>
                </div>

                <div className="rounded-lg border border-slate-200 bg-white p-5">
                  <div className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-700">
                    <Landmark className="h-4 w-4 text-[#604eff]" />
                    {t.requisitesPage.treasury}
                  </div>

                  <p className="text-sm text-slate-500">
                    {t.requisitesPage.taxIdLabel}:{" "}
                    <span className="font-mono font-semibold text-slate-800">
                      201122919
                    </span>
                  </p>

                  <p className="mt-4 break-all rounded-lg bg-[#f7f8ff] px-4 py-3 font-mono text-sm font-bold leading-6 text-[#604eff]">
                    23402000300100001010
                  </p>
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
                <div className="relative aspect-4/3 overflow-hidden rounded-lg bg-slate-50">
                  <Image
                    src="/guvohnoma.jpg"
                    alt={t.requisitesPage.certificateAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-contain"
                  />
                </div>
              </div>

              <Button
                asChild
                className="mt-6 h-12 w-full rounded-lg bg-[#604eff] font-bold text-white shadow-lg shadow-[#604eff]/20 hover:bg-[#4f3ff0]">
                <Link href="/umumiy-malumot/opendata-requisitesoftheinstitute/certificate">
                  {t.requisitesPage.viewCertificate}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstituteRequisites;
