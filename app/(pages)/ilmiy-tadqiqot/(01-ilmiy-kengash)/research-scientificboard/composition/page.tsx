/** @format */

import { InstituteCouncilCompositionPage } from "../../_components/council-section-pages";
import type { Metadata } from "next";
import { pageMetadataFor } from "@/config/seo";

export const metadata: Metadata = pageMetadataFor("/ilmiy-tadqiqot/research-scientificboard/composition", "uz");

export default function Page() {
  return <InstituteCouncilCompositionPage />;
}
