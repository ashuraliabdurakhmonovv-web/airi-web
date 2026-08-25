/** @format */

export interface InternalDocument {
  slug: string;
  viewUrl: string;
  downloadUrl: string;
  fileUrl: string;
}

const detailBasePath = "/umumiy-malumot/institute-internaldocuments";
const documentsBasePath = "/ichki hujjatlar";

export const internalDocuments: InternalDocument[] = [
  {
    slug: "ijtimoiy-mehnat-komissiyasi",
    viewUrl: `${detailBasePath}/ijtimoiy-mehnat-komissiyasi`,
    downloadUrl: `${documentsBasePath}/37 Ijt-mehnat komissiyasi.pdf`,
    fileUrl: `${documentsBasePath}/37 Ijt-mehnat komissiyasi.pdf`,
  },
  {
    slug: "konfidensial-axborot",
    viewUrl: `${detailBasePath}/konfidensial-axborot`,
    downloadUrl: `${documentsBasePath}/I-1 2025 konfidensial axborot FZ95158048.pdf`,
    fileUrl: `${documentsBasePath}/I-1 2025 konfidensial axborot FZ95158048.pdf`,
  },
  {
    slug: "jamoa-shartnomasi",
    viewUrl: `${detailBasePath}/jamoa-shartnomasi`,
    downloadUrl: `${documentsBasePath}/Jamoa shartnomasi 2025.06.01 (1).PDF`,
    fileUrl: `${documentsBasePath}/Jamoa shartnomasi 2025.06.01 (1).PDF`,
  },
  {
    slug: "mehnat-nizolari-komissiyasi",
    viewUrl: `${detailBasePath}/mehnat-nizolari-komissiyasi`,
    downloadUrl: `${documentsBasePath}/GE22161112.pdf`,
    fileUrl: `${documentsBasePath}/GE22161112.pdf`,
  },
  {
    slug: "odob-axloq-qoidalari",
    viewUrl: `${detailBasePath}/odob-axloq-qoidalari`,
    downloadUrl: `${documentsBasePath}/Ichki mehnat tartib qoidalari+.pdf`,
    fileUrl: `${documentsBasePath}/Ichki mehnat tartib qoidalari+.pdf`,
  },
  {
    slug: "ijtimoiy-himoya-komissiyasi",
    viewUrl: `${detailBasePath}/ijtimoiy-himoya-komissiyasi`,
    downloadUrl: `${documentsBasePath}/ilovepdf_merged (1).pdf`,
    fileUrl: `${documentsBasePath}/ilovepdf_merged (1).pdf`,
  },
  {
    slug: "institut-ustavi",
    viewUrl: `${detailBasePath}/institut-ustavi`,
    downloadUrl: `${documentsBasePath}/Ustav RTSIR ITI (27.03.2026) Veb-sayt uchun (1).pdf`,
    fileUrl: `${documentsBasePath}/Ustav RTSIR ITI (27.03.2026) Veb-sayt uchun (1).pdf`,
  },
  {
    slug: "murojaatlar-bilan-ishlash",
    viewUrl: `${detailBasePath}/murojaatlar-bilan-ishlash`,
    downloadUrl: `${documentsBasePath}/Murojaatlar bilan ishlash.pdf`,
    fileUrl: `${documentsBasePath}/Murojaatlar bilan ishlash.pdf`,
  },
];

export function getInternalDocumentBySlug(slug: string) {
  return internalDocuments.find((document) => document.slug === slug);
}
