/** @format */

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CardItem } from "./types";

export function InfoCard({ item }: { item: CardItem }) {
  const Icon = item.icon;
  const content = (
    <article className="group flex h-full flex-col border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#604eff]/35 hover:shadow-[0_22px_70px_rgba(96,78,255,0.12)]">
      <div className="flex h-12 w-12 items-center justify-center bg-[#604eff]/10 text-[#604eff]">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-5 text-xl font-black leading-snug text-slate-950">
        {item.title}
      </h3>
      <p className="mt-3 grow text-sm font-medium leading-7 text-slate-600">
        {item.description}
      </p>
      {item.href && (
        <span className="mt-5 inline-flex items-center text-sm font-extrabold text-[#604eff]">
          Batafsil ko&apos;rish
          <ArrowUpRight className="ml-2 h-4 w-4 transition group-hover:translate-x-0.5" />
        </span>
      )}
    </article>
  );

  if (!item.href) return content;

  return (
    <Link href={item.href} className="block h-full">
      {content}
    </Link>
  );
}
