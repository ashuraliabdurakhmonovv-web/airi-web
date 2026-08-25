/** @format */

import type { Metadata } from "next";
import { pageMetadataFor } from "@/config/seo";
import BreadcrumbJsonLd from "@/app/_components/seo/breadcrumb-jsonld";
import InterlaboratorySeminarsPage from "@/app/(pages)/ilmiy-tadqiqot/(01-ilmiy-kengash)/interlaboratory-seminars/page";

const PATH = "/ilmiy-tadqiqot/interlaboratory-seminars";
const LOCALE = "ru";

export const metadata: Metadata = pageMetadataFor(PATH, LOCALE);

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd path={PATH} locale={LOCALE} />
      <InterlaboratorySeminarsPage />
    </>
  );
}
