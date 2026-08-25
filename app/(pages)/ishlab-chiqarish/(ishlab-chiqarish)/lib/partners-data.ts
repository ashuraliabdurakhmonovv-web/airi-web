import type { StaticImageData } from "next/image";

import {
  partnerLogos,
  type PartnerLogoNameKey,
} from "@/app/(pages)/umumiy-malumot/(umumiy-malumot)/components/partners-data";

import School21Logo from "../public/logo/21school.png";
import AcademyLogo from "../public/logo/academy.png";
import AiriUzLogo from "../public/logo/airiuz.png";
import HigherEducationLogo from "../public/logo/highereducation'.png";
import OmskLogo from "../public/logo/omsk.png";
import SamarqandLogo from "../public/logo/samarqand.png";
import SekolakLogo from "../public/logo/sekolak.png";
import UmsidaLogo from "../public/logo/UMSIDA.png";

/**
 * Hamkorlar uchun yagona ro'yxat.
 *
 * Ikki manba birlashtiriladi:
 *  1. `/umumiy-malumot` — `components/partners-data.ts` (`partnerLogos`).
 *     Bu yerda nomlar i18n lug'atidan (`t.generalLanding.partnerLogoNames`)
 *     olinadi va har bir hamkorning rasmiy `href`i mavjud.
 *  2. `/ishlab-chiqarish` — eski `IntegrationsSection` ichidagi hamkorlar.
 *     Bularda i18n kaliti ham, rasmiy URL ham yo'q — shuning uchun ular
 *     TAXMIN QILINMAYDI, shunchaki `href` bo'sh qoldiriladi.
 *
 * Dublikat: "Raqamli texnologiyalar vazirligi" ikkala ro'yxatda ham bor
 * (`digitalMinistry`). Nomi bo'yicha aynan bir tashkilot ekani tasdiqlangani
 * uchun faqat shared yozuvi qoldirildi — mahalliy nusxasi olib tashlandi.
 */
export type ProductionPartner = {
  id: string;
  /** i18n kaliti mavjud bo'lsa nom shundan olinadi. */
  nameKey?: PartnerLogoNameKey;
  /** i18n kaliti yo'q hamkorlar uchun statik nom. */
  name?: string;
  logo: StaticImageData;
  /** Faqat manbada mavjud bo'lgan rasmiy havola. */
  href?: string;
  /** Faqat eski IntegrationsSection'da mavjud bo'lgan toifa. */
  category?: string;
};

/** `/ishlab-chiqarish`ga xos, shared ro'yxatda yo'q hamkorlar. */
const productionOnlyPartners: ProductionPartner[] = [
  { id: "21school", name: "21 School", category: "IT ta'limi", logo: School21Logo },
  { id: "academy", name: "Academy", category: "Ta'lim", logo: AcademyLogo },
  { id: "airiuz", name: "AIRI.UZ", category: "AI markaz", logo: AiriUzLogo },
  {
    id: "higher-education-ministry",
    name: "Oliy ta'lim, fan va innovatsiyalar vazirligi",
    category: "Davlat sektori",
    logo: HigherEducationLogo,
  },
  { id: "omsk", name: "Omsk universiteti", category: "Universitet", logo: OmskLogo },
  {
    id: "samarqand",
    name: "Samarqand davlat universiteti",
    category: "Universitet",
    logo: SamarqandLogo,
  },
  { id: "stmm", name: "STMM", category: "Xalqaro ta'lim", logo: SekolakLogo },
  {
    id: "umsida",
    name: "Universitas Muhammadiyah Sidoarjo",
    category: "Xalqaro universitet",
    logo: UmsidaLogo,
  },
];

const sharedPartners: ProductionPartner[] = partnerLogos.map((partner) => ({
  id: partner.nameKey,
  nameKey: partner.nameKey,
  href: partner.href,
  logo: partner.logo,
}));

export const productionPartners: ProductionPartner[] = [
  ...sharedPartners,
  ...productionOnlyPartners,
];
