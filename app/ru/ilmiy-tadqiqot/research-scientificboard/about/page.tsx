/** @format */

import type { Metadata } from "next";
import { pageMetadataFor } from "@/config/seo";
import BreadcrumbJsonLd from "@/app/_components/seo/breadcrumb-jsonld";
import { InstituteCouncilAboutPage } from "@/app/(pages)/ilmiy-tadqiqot/(01-ilmiy-kengash)/_components/council-section-pages";

const PATH = "/ilmiy-tadqiqot/research-scientificboard/about";
export const metadata: Metadata = pageMetadataFor(PATH, "ru");

export default function Page() {
  return <><BreadcrumbJsonLd path={PATH} locale="ru" /><InstituteCouncilAboutPage /></>;
}
