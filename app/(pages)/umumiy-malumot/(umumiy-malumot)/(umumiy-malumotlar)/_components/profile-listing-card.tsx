/** @format */

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight, CalendarDays, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type CardTone = "violet" | "cyan" | "emerald";

type ProfileListingCardProps = {
  href: string;
  imageUrl: string;
  name: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  detailsLabel: string;
  tone?: CardTone;
};

const toneStyles: Record<
  CardTone,
  {
    bar: string;
    dot: string;
    icon: string;
    hover: string;
    text: string;
  }
> = {
  violet: {
    bar: "from-[#604eff] via-[#08e8ea] to-[#604eff]",
    dot: "from-[#604eff] to-[#08e8ea]",
    icon: "bg-[#604eff]/10 text-[#604eff]",
    hover:
      "hover:border-[#604eff]/35 hover:shadow-[0_24px_70px_rgba(96,78,255,0.14)]",
    text: "text-[#604eff]",
  },
  cyan: {
    bar: "from-[#08e8ea] via-[#604eff] to-[#08e8ea]",
    dot: "from-[#08e8ea] to-[#604eff]",
    icon: "bg-cyan-50 text-cyan-600",
    hover:
      "hover:border-cyan-400/45 hover:shadow-[0_24px_70px_rgba(8,232,234,0.16)]",
    text: "text-cyan-600",
  },
  emerald: {
    bar: "from-emerald-400 via-[#08e8ea] to-[#604eff]",
    dot: "from-emerald-400 to-[#604eff]",
    icon: "bg-emerald-50 text-emerald-600",
    hover:
      "hover:border-emerald-400/45 hover:shadow-[0_24px_70px_rgba(16,185,129,0.14)]",
    text: "text-emerald-600",
  },
};

export function ProfileListingCard({
  href,
  imageUrl,
  name,
  title,
  excerpt,
  date,
  category,
  detailsLabel,
  tone = "violet",
}: ProfileListingCardProps) {
  const styles = toneStyles[tone];

  return (
    <article
      className={cn(
        "group relative h-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_16px_50px_rgba(15,23,42,0.07)] transition duration-300 hover:-translate-y-1",
        styles.hover,
      )}>
      <div className={cn("h-1.5 bg-linear-to-r", styles.bar)} />

      <Link
        href={href}
        className="block h-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#604eff]">
        <div className="p-3">
          <div className="relative aspect-[4/4.65] overflow-hidden rounded-lg bg-slate-100">
            <Image
              src={imageUrl}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover object-top transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-slate-950/55 to-transparent opacity-80 transition duration-300 group-hover:opacity-100" />
            <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-lg border border-white/45 bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm backdrop-blur">
              <span
                className={cn(
                  "h-2 w-2 rounded-full bg-linear-to-r",
                  styles.dot,
                )}
              />
              {category}
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-xs font-bold text-white/90">
              <CalendarDays className="h-4 w-4" />
              <time>{date}</time>
            </div>
          </div>

          <div className="flex min-h-[15.5rem] flex-col px-2 pb-2 pt-5">
            <div className="mb-3 flex items-start gap-3">
              <span
                className={cn(
                  "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                  styles.icon,
                )}>
                <UserRound className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-heading text-[20px] font-extrabold leading-7 text-slate-950">
                  {name}
                </h2>
                <p className={cn("mt-1 text-sm font-bold", styles.text)}>
                  {title}
                </p>
              </div>
            </div>

            <p className="line-clamp-4 text-[15px] font-medium leading-6 text-slate-600">
              {excerpt}
            </p>

            <div className="mt-auto flex items-end justify-between gap-3 pt-6">
              <Button
                asChild
                size="sm"
                className="rounded-lg bg-[#604eff] font-bold text-white shadow-lg shadow-[#604eff]/20 hover:bg-[#4f3ff0]">
                <span>
                  {detailsLabel}
                  <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
