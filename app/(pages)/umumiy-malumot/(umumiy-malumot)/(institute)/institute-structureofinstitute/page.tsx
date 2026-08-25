/** @format */
"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
  BookOpenCheck,
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  Cpu,
  FlaskConical,
  Network,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useLocale } from "@/i18n";

const connectorClass = "bg-[#8e96bd]";

type SectionKey = "science" | "production" | "general" | "services";

type BranchItem = {
  key: SectionKey;
  title: string;
  icon: ReactNode;
  items: readonly string[];
};

function BaseCard({
  title,
  icon,
  dashed = false,
  compact = false,
  children,
  rightSlot,
}: {
  title: string;
  icon?: ReactNode;
  dashed?: boolean;
  compact?: boolean;
  children?: ReactNode;
  rightSlot?: ReactNode;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[26px] border bg-white/85 backdrop-blur-md transition duration-300 ${
        dashed
          ? "border-dashed border-[#604eff]/35"
          : "border-[#604eff]/12 shadow-[0_10px_30px_rgba(96,78,255,0.08)]"
      } ${compact ? "p-4" : "p-5"}`}>
      <div className="absolute inset-0 bg-linear-to-br from-white via-white to-[#f3f5ff]" />
      <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#604eff]/0 blur-2xl transition duration-500 group-hover:bg-[#604eff]/12" />
      <div className="absolute -left-10 bottom-0 h-20 w-20 rounded-full bg-cyan-400/0 blur-2xl transition duration-500 group-hover:bg-cyan-400/12" />
      <div className="absolute inset-x-8 bottom-0 h-px bg-linear-to-r from-transparent via-[#604eff]/40 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            {icon ? (
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-[#604eff]/12 to-cyan-400/10 text-[#604eff]">
                {icon}
              </div>
            ) : null}

            <h3
              className={`font-bold text-gray-950 ${
                compact ? "text-base leading-6" : "text-[17px] leading-7"
              }`}>
              {title}
            </h3>
          </div>

          {rightSlot}
        </div>

        {children}
      </div>
    </div>
  );
}

function TopNode({
  title,
  icon,
  dashed = false,
}: {
  title: string;
  icon: ReactNode;
  dashed?: boolean;
}) {
  return <BaseCard title={title} icon={icon} dashed={dashed} compact />;
}

function ChildList({ items }: { items: readonly string[] }) {
  return (
    <div className="relative mt-5">
      <div
        className={`absolute left-1/2 top-0 h-6 w-[2px] -translate-x-1/2 ${connectorClass}`}
      />

      <div className="space-y-3 pt-6">
        {items.map((item, index) => (
          <div key={item} className="relative">
            <div
              className={`absolute left-1/2 top-[-12px] h-3 w-[2px] -translate-x-1/2 ${connectorClass}`}
            />
            <div
              className="group/item relative overflow-hidden rounded-2xl border border-[#604eff]/12 bg-white/90 px-4 py-3.5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-[#604eff]/25 hover:shadow-[0_10px_30px_rgba(96,78,255,0.08)]"
              style={{
                animationDelay: `${index * 60}ms`,
              }}>
              <div className="absolute inset-0 bg-linear-to-r from-white via-white to-[#f8faff]" />
              <div className="absolute -right-8 top-0 h-16 w-16 rounded-full bg-[#604eff]/0 blur-2xl transition duration-500 group-hover/item:bg-[#604eff]/10" />
              <div className="relative text-[15px] font-semibold leading-6 text-gray-800">
                {item}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DesktopBranch({
  branch,
  open,
  onToggle,
  openLabel,
  closeLabel,
  unitLabel,
}: {
  branch: BranchItem;
  open: boolean;
  onToggle: () => void;
  openLabel: string;
  closeLabel: string;
  unitLabel: string;
}) {
  return (
    <div className="relative">
      <BaseCard
        title={branch.title}
        icon={branch.icon}
        rightSlot={
          <button
            type="button"
            onClick={onToggle}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#604eff]/12 bg-white text-[#604eff] transition duration-300 hover:border-[#604eff]/30 hover:bg-[#f7f8ff]"
            aria-label={open ? closeLabel : openLabel}>
            <ChevronDown
              className={`h-5 w-5 transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>
        }>
        <div className="mt-3 flex items-center justify-between">
          <span className="rounded-full bg-[#604eff]/8 px-3 py-1 text-[13px] font-bold text-[#4c3bea]">
            {branch.items.length} {unitLabel}
          </span>
        </div>

        <div
          className={`grid transition-all duration-500 ease-out ${
            open
              ? "mt-1 grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}>
          <div className="overflow-hidden">
            <ChildList items={branch.items} />
          </div>
        </div>
      </BaseCard>
    </div>
  );
}

function MobileBranch({
  branch,
  open,
  onToggle,
  openLabel,
  closeLabel,
  unitLabel,
}: {
  branch: BranchItem;
  open: boolean;
  onToggle: () => void;
  openLabel: string;
  closeLabel: string;
  unitLabel: string;
}) {
  return (
    <div className="relative">
      <BaseCard
        title={branch.title}
        icon={branch.icon}
        rightSlot={
          <button
            type="button"
            onClick={onToggle}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#604eff]/12 bg-white text-[#604eff] transition duration-300 hover:border-[#604eff]/30 hover:bg-[#f7f8ff]"
            aria-label={open ? closeLabel : openLabel}>
            <ChevronDown
              className={`h-5 w-5 transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>
        }>
        <div className="mt-3 flex items-center justify-between">
          <span className="rounded-full bg-[#604eff]/8 px-3 py-1 text-[13px] font-bold text-[#4c3bea]">
            {branch.items.length} {unitLabel}
          </span>
        </div>

        <div
          className={`grid transition-all duration-500 ease-out ${
            open
              ? "mt-1 grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}>
          <div className="overflow-hidden">
            <ChildList items={branch.items} />
          </div>
        </div>
      </BaseCard>
    </div>
  );
}

export default function InstituteStructure() {
  const { t } = useLocale();
  const [openMap, setOpenMap] = useState<Record<SectionKey, boolean>>({
    science: true,
    production: true,
    general: true,
    services: true,
  });

  const allOpen = useMemo(
    () => Object.values(openMap).every(Boolean),
    [openMap],
  );

  const toggleOne = (key: SectionKey) => {
    setOpenMap((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleAll = () => {
    const next = !allOpen;
    setOpenMap({
      science: next,
      production: next,
      general: next,
      services: next,
    });
  };

  const branches: BranchItem[] = [
    {
      key: "science",
      title: t.structurePage.branches.science.title,
      icon: <FlaskConical className="h-5 w-5" />,
      items: t.structurePage.branches.science.items,
    },
    {
      key: "production",
      title: t.structurePage.branches.production.title,
      icon: <Cpu className="h-5 w-5" />,
      items: t.structurePage.branches.production.items,
    },
    {
      key: "general",
      title: t.structurePage.branches.general.title,
      icon: <BriefcaseBusiness className="h-5 w-5" />,
      items: t.structurePage.branches.general.items,
    },
    {
      key: "services",
      title: t.structurePage.branches.services.title,
      icon: <ShieldCheck className="h-5 w-5" />,
      items: t.structurePage.branches.services.items,
    },
  ];

  const topNodes = [
    {
      title: t.structurePage.topNodes.scientificCouncil,
      icon: <Users className="h-5 w-5" />,
      dashed: true,
    },
    {
      title: t.structurePage.topNodes.scienceAdvisor,
      icon: <BookOpenCheck className="h-5 w-5" />,
      dashed: false,
    },
    {
      title: t.structurePage.topNodes.director,
      icon: <Building2 className="h-5 w-5" />,
      dashed: false,
    },
    {
      title: t.structurePage.topNodes.youngScientistsCouncil,
      icon: <Users className="h-5 w-5" />,
      dashed: true,
    },
  ];

  const summaryIcons = [
    <FlaskConical key="science" className="h-6 w-6" />,
    <Cpu key="production" className="h-6 w-6" />,
    <Network key="ecosystem" className="h-6 w-6" />,
  ];

  return (
    <section className="relative overflow-hidden py-20">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(rgba(96,78,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(96,78,255,0.06) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />

        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-[#604eff]/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-violet-400/10 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#604eff]/25 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-5xl text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-center  airi-gradient-text airi-section-title mt-2">
            {t.structurePage.title}
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-gray-600 md:text-lg">
            {t.structurePage.description}
          </p>

          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={toggleAll}
              className="inline-flex items-center rounded-xl h-12 bg-linear-to-r from-[#2f8cff] via-[#604eff] to-[#8b5cf6] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#604eff]/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#604eff]/30">
              {allOpen ? t.structurePage.closeAll : t.structurePage.openAll}
              <ChevronDown
                className={`ml-2 h-4 w-4 transition-transform duration-300 ${
                  allOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Desktop org chart */}
        <div className="hidden xl:block">
          {/* Top nodes with connector line */}
          <div className="relative z-20 mb-14">
            <div
              className={`absolute left-[9%] right-[9%] top-[52px] h-[2px] ${connectorClass}`}
            />

            <div className="grid grid-cols-4 gap-6">
              {topNodes.map((node) => (
                <TopNode
                  key={node.title}
                  title={node.title}
                  icon={node.icon}
                  dashed={node.dashed}
                />
              ))}
            </div>
          </div>

          {/* Main line from director to 4 branches */}
          <div className="relative z-0 h-16">
            <div
              className={`absolute left-[62.5%] top-[-56px] h-[80px] w-[2px] -translate-x-1/2 ${connectorClass}`}
            />
            <div
              className={`absolute left-[12.5%] right-[12.5%] top-6 h-[2px] ${connectorClass}`}
            />
            <div
              className={`absolute bottom-0 left-[12.5%] top-6 w-[2px] -translate-x-1/2 ${connectorClass}`}
            />
            <div
              className={`absolute bottom-0 left-[37.5%] top-6 w-[2px] -translate-x-1/2 ${connectorClass}`}
            />
            <div
              className={`absolute bottom-0 left-[62.5%] top-6 w-[2px] -translate-x-1/2 ${connectorClass}`}
            />
            <div
              className={`absolute bottom-0 left-[87.5%] top-6 w-[2px] -translate-x-1/2 ${connectorClass}`}
            />
          </div>

          <div className="relative z-20 grid grid-cols-4 gap-6">
            {branches.map((branch) => (
              <DesktopBranch
                key={branch.key}
                branch={branch}
                open={openMap[branch.key]}
                onToggle={() => toggleOne(branch.key)}
                openLabel={t.common.open}
                closeLabel={t.common.close}
                unitLabel={t.structurePage.unitLabel}
              />
            ))}
          </div>
        </div>

        {/* Mobile / tablet */}
        <div className="xl:hidden">
          <div className="grid gap-4 md:grid-cols-2">
            {topNodes.map((node) => (
              <TopNode
                key={node.title}
                title={node.title}
                icon={node.icon}
                dashed={node.dashed}
              />
            ))}
          </div>

          <div className="mt-8 space-y-5">
            {branches.map((branch) => (
              <MobileBranch
                key={branch.key}
                branch={branch}
                open={openMap[branch.key]}
                onToggle={() => toggleOne(branch.key)}
                openLabel={t.common.open}
                closeLabel={t.common.close}
                unitLabel={t.structurePage.unitLabel}
              />
            ))}
          </div>
        </div>

        {/* Bottom summary */}
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {t.structurePage.summaries.map((summary, index) => (
            <div
              key={summary.title}
              className="rounded-2xl border border-[#604eff]/12 bg-white/85 p-6 shadow-[0_10px_30px_rgba(96,78,255,0.08)] backdrop-blur">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-[#604eff]/12 to-cyan-400/10 text-[#604eff]">
                {summaryIcons[index]}
              </div>
              <h3 className="text-lg font-bold text-gray-950">
                {summary.title}
              </h3>
              <p className="mt-2 text-[15px] leading-7 text-gray-700">
                {summary.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
