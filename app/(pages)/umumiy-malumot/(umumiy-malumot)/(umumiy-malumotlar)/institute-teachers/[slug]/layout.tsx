/** @format */

import type { Metadata } from "next";
import { teacherBase } from "@/common/institute-teachers/data";
import { pageMetadata } from "@/config/seo";
import BreadcrumbJsonLd from "@/app/_components/seo/breadcrumb-jsonld";
import PersonJsonLd from "@/app/_components/seo/person-jsonld";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return teacherBase.map((teacher) => ({
    slug: teacher.slug,
  }));
}

// Sahifaning o'zi "use client" bo'lgani uchun metadata shu layoutda beriladi.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const teacher = teacherBase.find((item) => item.slug === slug);
  if (!teacher) return {};

  return pageMetadata({
    title: teacher.name,
    description: `${teacher.name} — AIRI instituti professor-o'qituvchisi. Ilmiy darajasi, tadqiqot yo'nalishlari va ilmiy faoliyati haqida ma'lumot.`,
    path: `/umumiy-malumot/institute-teachers/${slug}`,
  });
}

export default async function Layout({ children, params }: Props & { children: React.ReactNode }) {
  const { slug } = await params;
  const teacher = teacherBase.find((item) => item.slug === slug);
  const path = `/umumiy-malumot/institute-teachers/${slug}`;

  return (
    <>
      {teacher ? (
        <>
          {/*
            Search Console'da xodim sahifalari juda yuqori CTR beradi, lekin
            ko'rsatishlar soni past — ya'ni odamlar ism bo'yicha qidiryapti,
            sahifalar esa yomon indekslangan. `Person` markup'i ism, lavozim
            va institut o'rtasidagi bog'lanishni aniq beradi.
          */}
          <PersonJsonLd
            name={teacher.name}
            path={path}
            image={teacher.imageUrl}
            jobTitle="Professor-o'qituvchi"
          />
          <BreadcrumbJsonLd
            path="/umumiy-malumot/institute-teachers"
            leaf={{ name: teacher.name, path }}
          />
        </>
      ) : null}
      {children}
    </>
  );
}
