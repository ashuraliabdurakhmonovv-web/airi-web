/** @format */

export interface Leader {
  name: string;
  position: string;
  description: string;
  imageUrl: string;
  phone: string;
  email: string;
  receptionDay: string;
  receptionTime: string;
}

export type LeaderBase = Omit<
  Leader,
  "position" | "description" | "receptionDay"
>;

export const leaderBase: LeaderBase[] = [
  {
    name: "Kadirov Anvarxodja Asatullayevich",
    imageUrl: "/institutJamoasi/Direktor%20Anvar.png",
    phone: "+998 71-263-41-98",
    email: "a.kadirov@airi.uz",
    receptionTime: "16:00-18:00",
  },
  {
    name: "Axmedov Dilshot Dilmuradovich",
    imageUrl: "/institutJamoasi/AxmedovDomla.png",
    phone: "+998 71-263-41-98",
    email: "d.akhmedov@airi.uz",
    receptionTime: "11:00-13:00",
  },
  {
    name: "Bayxanov Islomjon Ilxomjon o'g'li",
    imageUrl: "/institutJamoasi/Islomaka.png",
    phone: "+998 71-263-41-98",
    email: "ibaykhanov@airi.uz",
    receptionTime: "11:00-13:00",
  },
  {
    name: "Nuriddinov Azizjon Umidjon o‘g‘li",
    imageUrl: "/institutJamoasi/AzizNuriddinov.jpg",
    phone: "+998 71-263-41-98",
    email: "a.nuriddinov@airi.uz",
    receptionTime: "16:00-18:00",
  },
  {
    name: "Tashtemirova Nodira",
    imageUrl: "/institutJamoasi/NodiraTashtemirova.jpg",
    phone: "+998 99-123-45-67",
    email: "i.kholmatova@airi.uz",
    receptionTime: "11:00-13:00",
  },
];
