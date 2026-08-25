"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Beaker,
  Boxes,
  Braces,
  BrainCircuit,
  ChartNoAxesCombined,
  CheckCircle2,
  Cpu,
  Layers3,
  Users,
} from "lucide-react";
import NeuralImage from "../../public/images/neural.png";
import {
  capabilities,
  departments,
  getMembersByDepartment,
  type DepartmentIcon,
} from "../../lib/team-data";

const departmentIcons: Record<DepartmentIcon, typeof Beaker> = {
  beaker: Beaker,
  brain: BrainCircuit,
  chart: ChartNoAxesCombined,
  braces: Braces,
  layers: Layers3,
  cpu: Cpu,
  boxes: Boxes,
};

export function DevelopersSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeDepartmentIndex, setActiveDepartmentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const activeDepartment = departments[activeDepartmentIndex];
  const ActiveIcon = departmentIcons[activeDepartment.icon];
  const activeMembers = getMembersByDepartment(activeDepartment.slug);

  return (
    <section
      id="developers"
      ref={sectionRef}
      className="relative overflow-hidden bg-black py-24 text-white lg:py-32"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-35" />
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/22 to-transparent" />

      <div className="relative z-10 mx-auto max-w-350 px-6 lg:px-12">
        <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div
            className={`lg:col-span-8 transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <span className="mb-8 inline-flex items-center gap-4 font-mono text-sm text-white/68">
              <span className="h-px w-10 bg-white/25" />
              Jamoamiz
            </span>
            <h2 className="font-display text-6xl leading-[0.9] tracking-tight md:text-7xl lg:text-[104px]">
              Bo&apos;limlarimiz
              <br />
              <span className="text-white/62">jonli tizimda</span>
            </h2>
          </div>

          <div
            className={`lg:col-span-4 transition-all delay-100 duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <p className="text-lg leading-relaxed text-white/70">
              AIRI ichki strukturasi tadqiqot, muhandislik, analitika va testing
              oqimlarini bitta ishlab chiqarish ritmiga bog&apos;laydi. Bo&apos;limni
              tanlang va uning vazifalari, fokus yo&apos;nalishlari hamda jamoa
              profillarini ko&apos;ring.
            </p>
            <Link
              href="/ishlab-chiqarish/team"
              className="mt-6 inline-flex items-center gap-2 border border-white/18 bg-white/[0.055] px-4 py-2 text-sm font-mono text-white/72 transition-colors hover:border-white/45 hover:text-white"
            >
              To&apos;liq portfolio
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-12">
          <div
            className={`lg:col-span-4 transition-all delay-150 duration-700 ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
            }`}
          >
            <div className="border border-white/14 bg-white/[0.035] p-3">
              {departments.map((department, index) => {
                const Icon = departmentIcons[department.icon];
                const isActive = activeDepartment.slug === department.slug;

                return (
                  <button
                    key={department.slug}
                    type="button"
                    onClick={() => setActiveDepartmentIndex(index)}
                    onFocus={() => setActiveDepartmentIndex(index)}
                    onMouseEnter={() => setActiveDepartmentIndex(index)}
                    className={`group flex w-full items-center gap-4 border px-4 py-4 text-left transition-all duration-300 ${
                      isActive
                        ? "border-white/42 bg-white text-black"
                        : "border-transparent text-white/64 hover:border-white/18 hover:bg-white/[0.055] hover:text-white"
                    }`}
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center border transition-colors ${
                        isActive ? "border-black/15 bg-black text-white" : "border-white/16 bg-black/35"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-base font-medium">{department.title}</span>
                      <span className={`mt-1 block font-mono text-xs ${isActive ? "text-black/55" : "text-white/35"}`}>
                        {department.focus.slice(0, 2).join(" / ")}
                      </span>
                    </span>
                    <span className={`font-mono text-xs ${isActive ? "text-black/45" : "text-white/28"}`}>
                      0{index + 1}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 grid grid-cols-3 border border-white/14 bg-white/[0.035]">
              {[
                { value: departments.length, label: "bo'lim" },
                { value: activeMembers.length || 1, label: "profil" },
                { value: "R&D", label: "ritm" },
              ].map((item) => (
                <div key={item.label} className="border-r border-white/10 p-4 last:border-r-0">
                  <span className="block font-display text-3xl text-white">{item.value}</span>
                  <span className="mt-1 block text-xs text-white/42">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`lg:col-span-5 transition-all delay-200 duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <div className="relative min-h-[600px] overflow-hidden border border-white/14 bg-white/[0.035]">
              <Image
                src={NeuralImage}
                alt="AIRI innovatsion jamoa yo'nalishlari"
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover opacity-72"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/58 to-black/8" />
              <div className="absolute inset-0 bg-linear-to-r from-black/35 via-transparent to-black/35" />

              <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-4 border-b border-white/12 bg-black/35 p-5 backdrop-blur">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center border border-white/22 bg-white/10">
                    <ActiveIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <span className="font-mono text-xs text-white/42">Active department</span>
                    <h3 className="text-xl font-medium text-white">{activeDepartment.title}</h3>
                  </div>
                </div>
                <Users className="h-5 w-5 text-white/42" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                <p className="max-w-xl text-lg leading-relaxed text-white/76">
                  {activeDepartment.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {activeDepartment.focus.map((item) => (
                    <span key={item} className="border border-white/18 bg-black/40 px-3 py-2 text-xs font-mono text-white/68 backdrop-blur">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-7 grid gap-3">
                  {activeDepartment.responsibilities.map((item) => (
                    <div key={item} className="flex gap-3 border border-white/12 bg-black/35 p-3 text-sm leading-relaxed text-white/66 backdrop-blur">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-200" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href={`/ishlab-chiqarish/team#${activeDepartment.slug}`}
                  className="mt-7 inline-flex items-center gap-2 border border-white/20 bg-white/10 px-4 py-2 text-sm font-mono text-white/75 transition-colors hover:border-white/45 hover:text-white"
                >
                  Bo&apos;limni ko&apos;rish
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div
            className={`lg:col-span-3 transition-all delay-250 duration-700 ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
            }`}
          >
            <div className="border border-white/14 bg-white/[0.035] p-5">
              <span className="font-mono text-xs text-white/42">Team stream</span>
              <h3 className="mt-2 text-2xl font-medium text-white">Profil preview</h3>

              <div className="mt-5 grid gap-3">
                {(activeMembers.length ? activeMembers : []).map((member) => (
                  <Link
                    key={member.slug}
                    href={`/ishlab-chiqarish/team/${member.slug}`}
                    className="group grid grid-cols-[64px_1fr] gap-3 border border-white/12 bg-black/35 p-3 transition-colors hover:border-white/35"
                  >
                    <div className="relative h-16 w-16 overflow-hidden border border-white/12">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="64px"
                        className="object-cover opacity-82 transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="font-mono text-[10px] text-white/36">{member.level}</span>
                      <h4 className="truncate text-sm font-medium text-white">{member.name}</h4>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/48">{member.role}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-5 border border-white/14 bg-white/[0.035] p-5">
              <span className="font-mono text-xs text-white/42">Capabilities</span>
              <div className="mt-4 flex flex-wrap gap-2">
                {capabilities.map((capability, index) => (
                  <span
                    key={capability}
                    className={`border border-white/12 bg-black/35 px-3 py-2 text-xs text-white/58 transition-all duration-500 ${
                      isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    }`}
                    style={{ transitionDelay: `${index * 35 + 300}ms` }}
                  >
                    {capability}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
