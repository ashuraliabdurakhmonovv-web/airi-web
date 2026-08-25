/** @format */

import type { Metadata } from "next";
import { pageMetadataFor } from "@/config/seo";
import ResearchLandingPage from "./_components/landing/research-landing-page";

const PATH = "/ilmiy-tadqiqot";

// Sarlavha, tavsif va hreflang to'plami `config/pages.json` dan.
export const metadata: Metadata = pageMetadataFor(PATH, "uz");

export default function Page() {
  return <ResearchLandingPage />;
}
