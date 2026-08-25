/** @format */

import type { Metadata } from "next";
import { pageMetadataFor } from "@/config/seo";
import BreadcrumbJsonLd from "@/app/_components/seo/breadcrumb-jsonld";
import { InstituteCouncilCompositionPage } from "@/app/(pages)/ilmiy-tadqiqot/(01-ilmiy-kengash)/_components/council-section-pages";

const PATH = "/ilmiy-tadqiqot/research-scientificboard/composition";
export const metadata: Metadata = pageMetadataFor(PATH, "en");

export default function Page() {
  return <><BreadcrumbJsonLd path={PATH} locale="en" /><InstituteCouncilCompositionPage /></>;
}
