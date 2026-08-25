/** @format */

import { DegreeCouncilAboutPage } from "../../_components/council-section-pages";
import type { Metadata } from "next";
import { pageMetadataFor } from "@/config/seo";

export const metadata: Metadata = pageMetadataFor("/ilmiy-tadqiqot/degree-awarding-council/about", "uz");

export default function Page() {
  return <DegreeCouncilAboutPage />;
}
