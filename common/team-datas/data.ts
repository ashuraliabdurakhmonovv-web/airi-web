/** @format */

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  phone?: string;
  email?: string;
  linkedin?: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Kadirov Anvarxodja Asatullayevich",
    role: "Direktor",
    image:
      "https://server.airi.uz/public_media/img/5a4566e2-8526-4027-81a3-3c89f4a24c54.png",
    phone: "+998712634198",
    email: "a.kadirov@airi.uz",
    linkedin: "https://www.linkedin.com/in/username",
  },
  {
    id: 2,
    name: "Ravshanov Normaxmad",
    role: "Direktorning ilm-fan bo'yicha maslahatchisi",
    image:
      "https://server.airi.uz/public_media/img/5f46c9d4-2e81-456e-ae78-a2dc51f3b2df.png",
    phone: "+998712634198",
  },
  {
    id: 3,
    name: "Axmedov Dilshot Dilmuradovich",
    role: "Direktorning ilm-fan bo'yicha o'rinbosari",
    image:
      "https://server.airi.uz/public_media/img/b0636c7a-75b7-426c-bda9-1a0aab60ebd5.png",
    phone: "+998712634198",
    email: "d.akhmedov@airi.uz",
  },
  {
    id: 4,
    name: "Baykhanov Islom Ilxomjon o'g'li",
    role: "Direktorning ishlab chiqarish bo'yicha o'rinbosari",
    image:
      "https://server.airi.uz/public_media/img/fd2c5d13-a560-452b-908d-96b6f811d3ad.webp",
    email: "I.baykhanov@gmail.com",
  },
  {
    id: 5,
    name: "Azizjon Nuriddinov Umidjon o'g'li",
    role: "Direktorning umumiy masalalar bo'yicha o'rinbosari",
    image:
      "https://server.airi.uz/public_media/img/47d462ff-2609-4148-8389-fa0a5f8b267d.jpg",
    email: "a.nuriddinov@airi.uz",
  },
  {
    id: 6,
    name: "Tashtemirova Nodira Nematillayevna",
    role: "Ilmiy kotib",
    image:
      "https://server.airi.uz/public_media/img/17981090-1958-4a07-ae9b-19b16a42bcd9.jpg",
    email: "i.kholmatova@airi.uz",
  },
  {
    id: 7,
    name: "Bo'ronov Nazim Mustafoqulovich",
    role: "Matbuot kotibi",
    image:
      "https://server.airi.uz/public_media/img/8aa211e1-28de-4be0-8035-a9f51936ab86.png",
    email: "n.buronov@airi.uz",
  },
 
  {
    id: 9,
    name: "Botirov G'ayrat Gofirovich",
    role: "Bosh buxgalter",
    image:
      "https://server.airi.uz/public_media/img/cb5dd4c6-6064-4f60-a7d9-09af203e1c54.jpg",
  },
];
