/** @format */

import { InstituteCouncilAboutPage } from "../../_components/council-section-pages";
import type { Metadata } from "next";
import { pageMetadataFor } from "@/config/seo";

export const metadata: Metadata = pageMetadataFor("/ilmiy-tadqiqot/research-scientificboard/about", "uz");

export default function Page() {
  return <InstituteCouncilAboutPage />;
}
