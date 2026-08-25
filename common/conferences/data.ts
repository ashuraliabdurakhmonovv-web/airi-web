/** @format */

interface Conference {
  title: string;
  date: string;
  location: string;
  datetime: string;
  imageSrc: string;
  imageAlt: string;
  link: string;
  isUpcoming: boolean;
}

export const conferences: Conference[] = [
  {
    title:
      "“Raqamli texnologiyalar va sun'iy intellekt: Bugun va kelajak” xalqaro ilmiy-amaliy anjumani",
    date: "APREL 25 - 2025",
    location: "Toshkent",
    datetime: "2025-04-25",
    imageSrc:
      "https://server.airi.uz/public_media/img/e26542ae-0019-43de-a188-e5bca241b31f.jpg",
    imageAlt:
      "“Raqamli texnologiyalar va sun'iy intellekt: Bugun va kelajak” konferensiyasi rasmi",
    link: "http://airi.uz/digitaltechnologiesandartificialintelligencetodayandthefuture",
    isUpcoming: true,
  },
  {
    title:
      '"Raqamli texnologiyalar va sun\'iy intellektni rivojlantirishning zamonaviy holati va istiqbollari" xalqaro ilmiy-amaliy anjumani',
    date: "SENTABR 27 - 2024",
    location: "Buxoro",
    datetime: "2024-09-27",
    imageSrc:
      "https://server.airi.uz/public_media/img/f5d7efb5-8ef0-432a-a47a-60f33f248d2e.png",
    imageAlt:
      "Raqamli texnologiyalar va sun’iy intellektni rivojlantirish konferensiyasi rasmi",
    link: "#",
    isUpcoming: false,
  },
];
