/** @format */
"use client";

import { FC, useMemo, useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  ArrowUpDown,
  ClipboardList,
  Mail,
  MapPin,
  Phone,
  Search,
  Wallet,
} from "lucide-react";

import { useLocale } from "@/i18n";
import {
  formatSalary,
  VACANCIES_EMAIL,
  VACANCIES_PHONE,
  vacancyBase,
  vacancyCategories,
  type Vacancy,
  type VacancyCategory,
} from "@/common/vacancies/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const categoryDot: Record<VacancyCategory, string> = {
  management: "bg-[#604eff]",
  specialist: "bg-sky-500",
  research: "bg-emerald-500",
  service: "bg-amber-500",
};

const categoryBadge: Record<VacancyCategory, string> = {
  management: "border-[#604eff]/20 bg-[#604eff]/8 text-[#4a3ae0]",
  specialist: "border-sky-200 bg-sky-50 text-sky-700",
  research: "border-emerald-200 bg-emerald-50 text-emerald-700",
  service: "border-amber-200 bg-amber-50 text-amber-700",
};

const phoneHref = `tel:${VACANCIES_PHONE.replace(/[^\d+]/g, "")}`;
const emailHref = `mailto:${VACANCIES_EMAIL}`;

const Vacancies: FC = () => {
  const { t } = useLocale();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<VacancyCategory | "all">("all");
  const [sortAsc, setSortAsc] = useState<boolean | null>(null);
  const [selected, setSelected] = useState<Vacancy | null>(null);

  const page = t.vacanciesPage;

  const vacancies: Vacancy[] = useMemo(
    () =>
      vacancyBase.map((vacancy, index) => ({
        ...vacancy,
        ...page.vacancies[index],
      })),
    [page.vacancies]
  );

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();

    const result = vacancies.filter((vacancy) => {
      const matchesCategory =
        category === "all" || vacancy.category === category;
      const matchesQuery =
        needle.length === 0 || vacancy.title.toLowerCase().includes(needle);

      return matchesCategory && matchesQuery;
    });

    if (sortAsc === null) return result;

    return [...result].sort((a, b) =>
      sortAsc ? a.salary - b.salary : b.salary - a.salary
    );
  }, [vacancies, query, category, sortAsc]);

  const salaries = vacancyBase.map((vacancy) => vacancy.salary);

  const stats = [
    {
      label: page.stats.openPositions,
      value: String(vacancies.length),
      suffix: "",
    },
    {
      label: page.stats.directions,
      value: String(vacancyCategories.length),
      suffix: "",
    },
    {
      label: page.stats.minSalary,
      value: formatSalary(Math.min(...salaries)),
      suffix: page.currency,
    },
    {
      label: page.stats.maxSalary,
      value: formatSalary(Math.max(...salaries)),
      suffix: page.currency,
    },
  ];

  const filters: { id: VacancyCategory | "all"; label: string }[] = [
    { id: "all", label: page.allCategories },
    ...vacancyCategories.map((id) => ({ id, label: page.categories[id] })),
  ];

  const isFiltered = query.trim().length > 0 || category !== "all";

  const resetFilters = () => {
    setQuery("");
    setCategory("all");
  };

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="grid items-center gap-8 lg:grid-cols-[1fr_360px] lg:gap-12">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#604eff]">
              {page.eyebrow}
            </span>
            <h1 className="mt-3 font-heading text-3xl font-bold tracking-[-0.035em] text-slate-950 md:text-5xl">
              {page.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              {page.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <a href={phoneHref} className="inline-flex items-center gap-2 font-semibold text-slate-700 transition hover:text-[#604eff]">
                <Phone className="h-4 w-4 text-[#604eff]" />
                {VACANCIES_PHONE}
              </a>
              <a href={emailHref} className="inline-flex items-center gap-2 font-semibold text-slate-700 transition hover:text-[#604eff]">
                <Mail className="h-4 w-4 text-[#604eff]" />
                {VACANCIES_EMAIL}
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[260px] sm:max-w-xs lg:max-w-sm">
            <div className="absolute inset-8 rounded-full bg-[#604eff]/8 blur-3xl" />
            <div className="relative aspect-4/3">
              <Image
                src="/vacansy.png"
                alt={page.heroImageAlt}
                fill
                sizes="360px"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </header>

        <div className="mt-10 border-y border-slate-200">
          <dl className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`py-5 ${index % 2 === 0 ? "border-r border-slate-200 pr-4" : "pl-4"} ${index < 2 ? "border-b border-slate-200 md:border-b-0" : ""} md:border-r md:px-6 md:first:pl-0 md:last:border-r-0`}>
                <dt className="text-xs font-medium text-slate-500">{stat.label}</dt>
                <dd className="mt-1 font-heading text-2xl font-bold tracking-tight text-slate-950">
                  {stat.value}
                  {stat.suffix ? (
                    <span className="ml-1.5 text-xs font-medium text-slate-400">
                      {stat.suffix}
                    </span>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-12 overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="flex flex-col gap-5 border-b border-slate-200 px-5 py-5 md:px-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3">
                <div>
                  <h2 className="font-heading text-lg font-bold leading-6 text-slate-950">
                    {page.title}
                  </h2>
                  <p className="text-[13px] text-slate-500">
                    <span className="font-bold text-[#604eff]">
                      {filtered.length}
                    </span>{" "}
                    {page.resultsFound}
                  </p>
                </div>
              </div>

              <div className="relative w-full lg:max-w-xs">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={page.searchPlaceholder}
                  aria-label={page.searchLabel}
                  className="h-10 rounded-lg border-slate-200 bg-white pl-10 text-sm"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {filters.map((filter) => {
                const isActive = category === filter.id;
                const dot =
                  filter.id === "all" ? null : categoryDot[filter.id];

                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setCategory(filter.id)}
                    aria-pressed={isActive}
                    className={
                      isActive
                        ? "inline-flex min-h-8 items-center gap-2 rounded-md bg-[#604eff] px-3 text-xs font-semibold text-white transition"
                        : "inline-flex min-h-8 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                    }>
                    {dot ? (
                      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
                    ) : null}
                    {filter.label}
                  </button>
                );
              })}

              {isFiltered ? (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex min-h-8 items-center rounded-full px-3 text-xs font-semibold text-slate-400 underline-offset-4 transition hover:text-[#604eff] hover:underline">
                  {page.resetFilters}
                </button>
              ) : null}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#604eff]/10 text-[#604eff]">
                <Search className="h-6 w-6" />
              </div>

              <h3 className="mt-5 font-heading text-lg font-extrabold text-slate-950">
                {page.emptyTitle}
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                {page.emptyDescription}
              </p>

              <Button
                onClick={resetFilters}
                className="mt-6 h-11 rounded-xl bg-[#604eff] px-6 font-bold text-white hover:bg-[#4f3ff0]">
                {page.resetFilters}
              </Button>
            </div>
          ) : (
            <>
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-200 bg-slate-50/80 hover:bg-slate-50/80">
                      <TableHead className="w-14 py-3 pl-7 pr-2 text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400">
                        {page.table.number}
                      </TableHead>
                      <TableHead className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400">
                        {page.table.position}
                      </TableHead>
                      <TableHead className="w-44 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400">
                        {page.table.selection}
                      </TableHead>
                      <TableHead className="w-52 px-4 py-3 text-right text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400">
                        <button
                          type="button"
                          onClick={() =>
                            setSortAsc((previous) =>
                              previous === null ? false : !previous
                            )
                          }
                          title={page.sortBySalary}
                          className={`ml-auto inline-flex items-center gap-1.5 rounded-md px-2 py-1 uppercase transition hover:bg-white hover:text-[#604eff] ${
                            sortAsc === null ? "" : "bg-white text-[#604eff]"
                          }`}>
                          {page.table.salary}
                          <ArrowUpDown className="h-3.5 w-3.5" />
                        </button>
                      </TableHead>
                      <TableHead className="w-52 py-3 pl-4 pr-7 text-right text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400">
                        {page.table.requirements}
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {filtered.map((vacancy) => (
                      <TableRow
                        key={vacancy.id}
                        className="group border-slate-100 transition-colors hover:bg-[#f8faff]">
                        <TableCell className="relative py-4 pl-7 pr-2 align-middle font-mono text-[13px] font-bold text-slate-300">
                          <span
                            className={`absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full opacity-0 transition-opacity group-hover:opacity-100 ${
                              categoryDot[vacancy.category]
                            }`}
                          />
                          {vacancy.id}
                        </TableCell>

                        <TableCell className="max-w-md px-4 py-4 align-middle">
                          <p className="text-[15px] font-semibold leading-6 text-slate-900">
                            {vacancy.title}
                          </p>

                          <p className="mt-1 flex items-center gap-1.5 text-[12px] font-medium text-slate-400">
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                categoryDot[vacancy.category]
                              }`}
                            />
                            {page.categories[vacancy.category]}
                          </p>
                        </TableCell>

                        <TableCell className="px-4 py-4 align-middle">
                          <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-[12px] font-medium text-slate-600">
                            {page.selectionInterview}
                          </span>
                        </TableCell>

                        <TableCell className="px-4 py-4 text-right align-middle whitespace-nowrap">
                          <span className="font-mono text-[15px] font-extrabold tracking-tight text-slate-900">
                            {formatSalary(vacancy.salary)}
                          </span>
                          <span className="ml-1 text-[12px] font-medium text-slate-400">
                            {page.currency}
                          </span>
                        </TableCell>

                        <TableCell className="py-4 pl-4 pr-7 text-right align-middle">
                          <button
                            type="button"
                            onClick={() => setSelected(vacancy)}
                        className="inline-flex min-h-9 items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 text-[13px] font-semibold text-slate-600 transition group-hover:border-[#604eff]/30 group-hover:text-[#604eff] hover:bg-slate-50">
                            {page.viewRequirements}
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <ul className="divide-y divide-slate-100 md:hidden">
                {filtered.map((vacancy) => (
                  <li key={vacancy.id} className="p-5">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-100 font-mono text-xs font-bold text-slate-500">
                        {vacancy.id}
                      </span>

                      <div className="min-w-0">
                        <p className="text-[15px] font-semibold leading-6 text-slate-900">
                          {vacancy.title}
                        </p>

                        <Badge
                          variant="outline"
                          className={`mt-2 ${categoryBadge[vacancy.category]}`}>
                          {page.categories[vacancy.category]}
                        </Badge>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3 border-l-2 border-slate-200 pl-4">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-400">
                          {page.table.selection}
                        </span>
                        <span className="text-sm font-medium text-slate-700">
                          {page.selectionInterview}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-400">
                          {page.table.salary}
                        </span>
                        <span className="font-mono text-sm font-extrabold text-slate-900">
                          {formatSalary(vacancy.salary)}{" "}
                          <span className="font-sans text-xs font-medium text-slate-400">
                            {page.currency}
                          </span>
                        </span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      onClick={() => setSelected(vacancy)}
                      className="mt-4 h-10 w-full rounded-lg border-slate-200 text-sm font-semibold text-[#604eff] hover:border-[#604eff]/35 hover:bg-slate-50 hover:text-[#604eff]">
                      {page.viewRequirements}
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="mt-10 border-t border-slate-200 pt-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <h2 className="font-heading text-xl font-extrabold text-slate-950 md:text-2xl">
                {page.apply.title}
              </h2>
              <p className="mt-2 max-w-lg text-sm leading-6 text-slate-600">
                {page.apply.description}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <a
                href={phoneHref}
                className="flex flex-col gap-1.5 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-[#604eff]/35">
                <Phone className="h-4 w-4 text-[#604eff]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400">
                  {page.phoneLabel}
                </span>
                <span className="text-[13px] font-bold text-slate-900">
                  {VACANCIES_PHONE}
                </span>
              </a>

              <a
                href={emailHref}
                className="flex flex-col gap-1.5 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-[#604eff]/35">
                <Mail className="h-4 w-4 text-[#604eff]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400">
                  {page.emailLabel}
                </span>
                <span className="text-[13px] font-bold break-all text-slate-900">
                  {VACANCIES_EMAIL}
                </span>
              </a>

              <div className="flex flex-col gap-1.5 rounded-lg border border-slate-200 bg-white p-4">
                <MapPin className="h-4 w-4 text-[#604eff]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400">
                  {page.apply.addressLabel}
                </span>
                <span className="text-[13px] font-semibold leading-5 text-slate-900">
                  {page.apply.address}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}>
        <DialogContent className="max-h-[85vh] gap-0 overflow-y-auto rounded-xl border-slate-200 p-0 sm:max-w-2xl">
          {selected ? (
            <>
              <DialogHeader className="border-b border-slate-200 bg-white px-6 py-6 text-left">
                <Badge
                  variant="outline"
                  className={categoryBadge[selected.category]}>
                  {page.categories[selected.category]}
                </Badge>

                <DialogTitle className="mt-2 font-heading text-xl font-extrabold leading-7 text-slate-950">
                  {selected.title}
                </DialogTitle>

                <DialogDescription className="text-sm text-slate-500">
                  {page.dialog.title}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 px-6 py-6 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                  <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.08em] text-slate-400">
                    <ClipboardList className="h-4 w-4 text-[#604eff]" />
                    {page.dialog.selectionLabel}
                  </p>
                  <p className="mt-2 text-[15px] font-semibold text-slate-800">
                    {page.selectionInterview}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                  <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.08em] text-slate-400">
                    <Wallet className="h-4 w-4 text-[#604eff]" />
                    {page.dialog.salaryLabel}
                  </p>
                  <p className="mt-2 font-mono text-[15px] font-extrabold text-slate-900">
                    {formatSalary(selected.salary)}{" "}
                    <span className="font-sans text-xs font-medium text-slate-400">
                      {page.currency} / {page.perMonth}
                    </span>
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6">
                {selected.requirements && selected.requirements.length > 0 ? (
                  <ul className="space-y-3">
                    {selected.requirements.map((requirement) => (
                      <li
                        key={requirement}
                        className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 text-[15px] leading-6 text-slate-700">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#604eff]" />
                        {requirement}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="rounded-xl border border-dashed border-[#604eff]/30 bg-[#f7f8ff] p-5">
                    <p className="font-heading text-[15px] font-extrabold text-slate-900">
                      {page.dialog.pendingTitle}
                    </p>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {page.dialog.pendingDescription}
                    </p>

                    <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.08em] text-slate-400">
                      {page.dialog.contactNote}
                    </p>

                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      <a
                        href={phoneHref}
                        className="flex min-h-11 items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition hover:border-[#604eff]/35 hover:text-[#604eff]">
                        <Phone className="h-4 w-4 shrink-0 text-[#604eff]" />
                        {VACANCIES_PHONE}
                      </a>

                      <a
                        href={emailHref}
                        className="flex min-h-11 items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition hover:border-[#604eff]/35 hover:text-[#604eff]">
                        <Mail className="h-4 w-4 shrink-0 text-[#604eff]" />
                        {VACANCIES_EMAIL}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <DialogFooter className="border-t border-slate-200 bg-slate-50/70 px-6 py-4">
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="h-11 rounded-xl px-6 font-bold">
                    {page.dialog.close}
                  </Button>
                </DialogClose>
              </DialogFooter>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Vacancies;
