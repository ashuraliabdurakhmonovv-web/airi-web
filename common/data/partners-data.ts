/** @format */

export interface PartnerBase {
  slug: string;
  type: "Government" | "Education" | "Research" | "Private Sector" | "International";
  logo: string;
  established: string;
  website?: string;
}

export interface Partner extends PartnerBase {
  name: string;
  description: string;
  projects: readonly string[];
  impact: string;
}

export const partnerBase: PartnerBase[] = [
  {
    slug: "ministry-of-digital-technologies",
    type: "Government",
    logo: "https://api-portal.gov.uz/uploads/17/2025/06/20/3a596ff3-a1ab-526d-1f33-da8943ddfd03_authority_17.png",
    established: "2020",
    website: "https://digital.gov.uz",
  },
  {
    slug: "tashkent-international-university",
    type: "Education",
    logo: "https://static.wixstatic.com/media/df577c_4830a50bc834404b9da1fd4856246a15~mv2.png/v1/crop/x_114,y_50,w_1554,h_658/fill/w_148,h_63,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%D0%BE%D0%BA%20%D1%82%D0%B8%D1%83_PNG.png",
    established: "2019",
    website: "https://tiu.uz",
  },
  {
    slug: "tashkent-university-of-information-technologies",
    type: "Education",
    logo: "https://static.tuit.uz/uploads/1/W73eM8T-hn5cLRoa_rQWKshn3eUutXvm.png",
    established: "2018",
    website: "https://tuit.uz",
  },
];

export const partners = partnerBase;
