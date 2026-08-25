export type Relationship = {
  slug: string;
  href: string;
  logo: string;
  document?: string;
};

const detailBasePath = "/umumiy-malumot/research-internationalrelationships";
const assetsBasePath = "/xalqaro aloqalar";
const logosBasePath = `${assetsBasePath}/logos`;

export const relationships: Relationship[] = [
  {
    slug: "galgotias",
    href: `${detailBasePath}/galgotias`,
    logo: `${logosBasePath}/galgotias.png`,
    document: `${assetsBasePath}/MoU AIRI - Galgotias Univ. (India).PDF`,
  },
  {
    slug: "acceleration-consulting",
    href: `${detailBasePath}/acceleration-consulting`,
    logo: `${logosBasePath}/acceleration.png`,
    document: `${assetsBasePath}/MoU AIRI - Acceleration Consulting (Russia).PDF`,
  },
  {
    slug: "agsr",
    href: `${detailBasePath}/agsr`,
    logo: `${logosBasePath}/agsr.png`,
    document: `${assetsBasePath}/MoU AIRI - AGSR.PDF`,
  },
  {
    slug: "silk-road-research-network",
    href: `${detailBasePath}/silk-road-research-network`,
    logo: `${logosBasePath}/silkroad.png`,
    document: `${assetsBasePath}/MoA AIRI - Silk Road Research Network.PDF`,
  },
  {
    slug: "visitech",
    href: `${detailBasePath}/visitech`,
    logo: `${logosBasePath}/vizitek-soft.svg`,
    document: `${assetsBasePath}/MoU AIRI - Visitech (Russia, Skolkovo).PDF`,
  },
  {
    slug: "milliy-tadqiqot-yadro-universiteti",
    href: `${detailBasePath}/milliy-tadqiqot-yadro-universiteti`,
    logo: `${logosBasePath}/yadro tadqiqot institut.jpg`,
    document: `${assetsBasePath}/MoU AIRI - MMFI-Milliy tadqiqot yadro universiteti.PDF`,
  },
  {
    slug: "keldysh-research-center",
    href: `${detailBasePath}/keldysh-research-center`,
    logo: `${logosBasePath}/keldicha ran.jpg`,
    document: `${assetsBasePath}/MoU_AIRI_Федеральный_исл_центр_ИМП_им_М_В_Келдыша_РАН.pdf`,
  },
  {
    slug: "world-class-university-program",
    href: `${detailBasePath}/world-class-university-program`,
    logo: `${logosBasePath}/tashkentinternational.png`,
    document: `${assetsBasePath}/Term_of_Agreement_for_World_Class_University_Program_Participation.PDF`,
  },
  {
    slug: "mia-technology",
    href: `${detailBasePath}/mia-technology`,
    logo: `${logosBasePath}/miaTechnology.png`,
  },
  {
    slug: "technology-innovation-institute",
    href: `${detailBasePath}/technology-innovation-institute`,
    logo: `${logosBasePath}/technologyinnovationinstitute.png`,
  },
  {
    slug: "cafa",
    href: `${detailBasePath}/cafa`,
    logo: `${logosBasePath}/cafa.png`,
  },
  {
    slug: "isi",
    href: `${detailBasePath}/isi`,
    logo: `${logosBasePath}/isi logo.png`,
  },
  {
    slug: "mondrian",
    href: `${detailBasePath}/mondrian`,
    logo: `${logosBasePath}/mondrian.webp`,
  },
  {
    slug: "nuwa-robotics",
    href: `${detailBasePath}/nuwa-robotics`,
    logo: `${logosBasePath}/nuwaRobotics.png`,
  },
  {
    slug: "profit-project",
    href: `${detailBasePath}/profit-project`,
    logo: `${logosBasePath}/profit project.jpg`,
  },
  {
    slug: "relawan",
    href: `${detailBasePath}/relawan`,
    logo: `${logosBasePath}/relawan.png`,
  },
  {
    slug: "shanghai-cooperation-organization",
    href: `${detailBasePath}/shanghai-cooperation-organization`,
    logo: `${logosBasePath}/shanxay hamkorlik tashkilot.png`,
  },
  {
    slug: "tuyafed",
    href: `${detailBasePath}/tuyafed`,
    logo: `${logosBasePath}/tuyafed.svg`,
  },
  {
    slug: "issai",
    href: `${detailBasePath}/issai`,
    logo: `${logosBasePath}/issai logos.svg`,
  },
  {
    slug: "nazarbayev-university",
    href: `${detailBasePath}/nazarbayev-university`,
    logo: `${logosBasePath}/nazarbayev.png`,
  },
];

export function getRelationshipBySlug(slug: string) {
  return relationships.find((relationship) => relationship.slug === slug);
}
