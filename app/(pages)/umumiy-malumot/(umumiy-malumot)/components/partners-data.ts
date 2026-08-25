import { StaticImageData } from "next/image";
import AmityLogo from "../image/hamkor/Amity 1.png";
import ChungbukLogo from "../image/hamkor/chungbuk national university 1.png";
import DigitalMinistryLogo from "../image/hamkor/image 14.png";
import GalgotiasLogo from "../image/hamkor/image 11.png";
import HuaweiLogo from "../image/hamkor/Huawei 1.png";
import MbzuaiLogo from "../image/hamkor/image 9.png";
import NuwaLogo from "../image/hamkor/image 20.png";
import UniconLogo from "../image/hamkor/image 12.png";
import VisiTechLogo from "../image/hamkor/image 15.png";
import AccelerationLogo from "../image/hamkor/image 21.png";
import SoliqLogo from "../image/hamkor/Soliq uz 1.png";
import TatuLogo from "../image/hamkor/TATU 1.png";
import TransportLogo from "../image/hamkor/Transport Vazirligi 1.png";
import Adliya from "../image/hamkor/adliya.jpg"

const IssaiLogo: StaticImageData = {
  src: "/xalqaro%20aloqalar/logos/issai%20logos.svg",
  width: 187,
  height: 68,
};

const NazarbayevLogo: StaticImageData = {
  src: "/xalqaro%20aloqalar/logos/nazarbayev.png",
  width: 249,
  height: 78,
};

export type PartnerLogo = {
  nameKey: PartnerLogoNameKey;
  href: string;
  logo: StaticImageData;
};

export type PartnerLogoNameKey =
  | "mbzuai"
  | "chungbuk"
  | "galgotias"
  | "unicon"
  | "tatu"
  | "digitalMinistry"
  | "justiceMinistry"
  | "visitech"
  | "taxCommittee"
  | "huawei"
  | "amity"
  | "transportMinistry"
  | "nuwa"
  | "acceleration"
  | "issai"
  | "nazarbayev";

export const partnerLogos: PartnerLogo[] = [
  {
    nameKey: "mbzuai",
    href: "https://mbzuai.ac.ae/",
    logo: MbzuaiLogo,
  },
  {
    nameKey: "chungbuk",
    href: "https://www.cbnu.ac.kr/site/english/main.do",
    logo: ChungbukLogo,
  },
  {
    nameKey: "galgotias",
    href: "https://gu.galgotiasuniversity.edu.in/",
    logo: GalgotiasLogo,
  },
  {
    nameKey: "unicon",
    href: "https://unicon.uz/",
    logo: UniconLogo,
  },
  {
    nameKey: "tatu",
    href: "https://tuit.uz/",
    logo: TatuLogo,
  },
  {
    nameKey: "digitalMinistry",
    href: "https://mitc.uz/uz/",
    logo: DigitalMinistryLogo,
  },
  {
    nameKey: "justiceMinistry",
    href: "https://adliya.uz/",
    logo: Adliya,
  },
  {
    nameKey: "visitech",
    href: "https://visitech.ru/",
    logo: VisiTechLogo,
  },
  {
    nameKey: "taxCommittee",
    href: "https://soliq.uz/",
    logo: SoliqLogo,
  },
  {
    nameKey: "huawei",
    href: "https://www.huawei.com/uz/",
    logo: HuaweiLogo,
  },
  {
    nameKey: "amity",
    href: "https://amity.uz/",
    logo: AmityLogo,
  },
  {
    nameKey: "transportMinistry",
    href: "https://mintrans.uz/",
    logo: TransportLogo,
  },
  {
    nameKey: "nuwa",
    href: "https://www.nuwarobotics.com/",
    logo: NuwaLogo,
  },
  {
    nameKey: "acceleration",
    href: "https://acceleration.ru/",
    logo: AccelerationLogo,
  },
  {
    nameKey: "issai",
    href: "https://www.issai.org/",
    logo: IssaiLogo,
  },
  {
    nameKey: "nazarbayev",
    href: "https://nu.edu.kz/",
    logo: NazarbayevLogo,
  },
];
