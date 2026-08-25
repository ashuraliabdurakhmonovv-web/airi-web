/** @format */

import type { Metadata } from "next";
import { ResearchInfoPage } from "../../_components/page-templates/research-info-page";

// Kontent tayyor bo'lguncha menyudan yashirilgan — qidiruvga ham tushmasin
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function ResearchProjectsPage() {
  return <ResearchInfoPage page="researchProjects" />;
}
