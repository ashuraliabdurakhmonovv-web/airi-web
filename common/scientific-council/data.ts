/** @format */

export type CouncilMember = {
  name: string;
  specialty: string;
  degree?: string;
  role?: "Rais" | "Rais o'rinbosari" | "Ilmiy kotib";
};

export type SeminarMember = {
  name: string;
  role?: "Rais" | "Rais o'rinbosari" | "Ilmiy kotib" | "OAK vakili";
};

export type Specialty = {
  code: string;
  title: string;
};

export type SeminarPanel = Specialty & {
  members: SeminarMember[];
};

export const councilCode = "DSc.09/2025.27.12.T.02.01.M";

export const specialties: Specialty[] = [
  {
    code: "05.01.02",
    title: "Tizimli tahlil, boshqaruv va axborotni qayta ishlash",
  },
  {
    code: "05.01.03",
    title: "Informatikaning nazariy asoslari",
  },
  {
    code: "05.01.07",
    title: "Matematik modellashtirish. Sonli usullar va dasturlar majmui",
  },
  {
    code: "05.01.11",
    title: "Raqamli texnologiyalar va sun'iy intellekt",
  },
];

export const degreeCouncilMembers: CouncilMember[] = [
  {
    name: "Ravshanov Normaxmad",
    specialty: "05.01.07",
    degree: "Texnika fanlar doktori, professor",
    role: "Rais",
  },
  {
    name: "Hamdamov Rustam Hamdamovich",
    specialty: "05.01.11",
    degree: "Texnika fanlar doktori, professor",
    role: "Rais o'rinbosari",
  },
  {
    name: "Nuraliyev Faxriddin Murodillaevich",
    specialty: "05.01.07",
    degree: "Texnika fanlari doktori, professor",
    role: "Ilmiy kotib",
  },
  { name: "Aloev Raxmatillo Djuraevich", specialty: "05.01.02", degree: "Fizika-matematika fanlari doktori, professor" },
  { name: "Djumayozov Umidjon Zafarjonovich", specialty: "05.01.07", degree: "Texnika fanlar doktori, dotsent" },
  { name: "Eshmatov Baxtiyor Xasanovich", specialty: "05.01.07", degree: "Fizika-matematika fanlari doktori, dotsent" },
  { name: "Fazilov Shavkat Xayrullayevich", specialty: "05.01.11", degree: "Texnika fanlar doktori, professor" },
  { name: "Ignatev Nikolay Aleksandrovich", specialty: "05.01.11", degree: "Fizika-matematika fanlari doktori, professor" },
  { name: "Ismagilov Ilyas Idrisovich", specialty: "05.01.02", degree: "Texnika fanlari doktori, professor" },
  { name: "Kamilov Mirzoyan Mirzaaxmedovich", specialty: "05.01.03", degree: "Texnika fanlari doktori, akademik" },
  { name: "Madraximov Shavkat Fayzullayevich", specialty: "05.01.02", degree: "Texnika fanlari doktori, professor" },
  { name: "Imankulov Timur Sakenovich", specialty: "05.01.11", degree: "Texnika fanlari doktori, dotsent" },
  { name: "Mirzaev Nomaz", specialty: "05.01.03", degree: "Texnika fanlari doktori, professor" },
  { name: "Muxammadiyev Abduvali Shukurovich", specialty: "05.01.02", degree: "Fizika-matematika fanlari doktori, dotsent" },
  { name: "Rustamov Nasim Tulegenovich", specialty: "05.01.11", degree: "Texnika fanlari doktori, professor" },
  { name: "Djumanov Jamoljon Xudaykulovich", specialty: "05.01.07", degree: "Texnika fanlari doktori, professor" },
  { name: "Opanasenko Vladimir Nikolaevich", specialty: "05.01.03", degree: "Texnika fanlari doktori, yetakchi ilmiy xodim" },
  { name: "Sadullayeva Shaxlo Azimbayevna", specialty: "05.01.07", degree: "Fizika-matematika fanlari doktori, professor" },
  { name: "Gulyamov Shuxrat Manapovich", specialty: "05.03.01", degree: "Texnika fanlari doktori, professor" },
  { name: "Tashaev Azat Aripovich", specialty: "05.01.03", degree: "Texnika fanlari doktori, professor" },
  { name: "Urunbaev Erkin", specialty: "05.01.03", degree: "Fizika-matematika fanlari doktori, dotsent" },
];

export const seminarPanels: SeminarPanel[] = [
  {
    ...specialties[0],
    members: [
      { name: "Sulyukova Larisa Faritovna", role: "Rais" },
      {
        name: "Muhamediyeva Dilnoz Tulkunovna",
        role: "Rais o'rinbosari",
      },
      {
        name: "Abdurazzoqov Javohir Rustamovich",
        role: "Ilmiy kotib",
      },
      { name: "Aloyev Rahmatillo Djurayevich" },
      { name: "Kubayev Saydazim Tashbayevich" },
      { name: "Ismailov Mirxalil Agzamovich" },
      { name: "Nurmamatov Mehriddin Qahramonovich" },
      { name: "Oteniyazov Rashid Idrisovich" },
      { name: "Ravshanov Normaxmad" },
      { name: "OAK ekspert kengashi a'zosi", role: "OAK vakili" },
      { name: "Sevinov Jasur Usmonovich" },
      { name: "Seytov Aybek Jumabayevich" },
      { name: "Tuxtanazarov Dilmurod Solijonovich" },
      { name: "Uteuliyev Niyetbay Uteuliyevich" },
      { name: "Varlamova Lyudmila Petrovna" },
      { name: "Yakubjanova Dilfuza Qodirovna" },
      { name: "Yo'rqulov Behzod Abdug'abborovich" },
    ],
  },
  {
    ...specialties[1],
    members: [
      { name: "Mirzayev Nomaz", role: "Rais" },
      { name: "Urunbayev Erkin", role: "Rais o'rinbosari" },
      { name: "Hoshimov Ahmad Anvarovich", role: "Ilmiy kotib" },
      { name: "Axmedov Dilshod Dilmurodovich" },
      { name: "Dadaxonov Musoxon Hoshimxonovich" },
      { name: "Fozilov Shavkat Xayrullayevich" },
      { name: "Qahhorov Shukrullo Sa'dullo o'g'li" },
      { name: "Kamilov Mirzayan Mirzaaxmedovich" },
      { name: "Madraximov Shavkat Fayzullayevich" },
      { name: "OAK ekspert kengashi a'zosi", role: "OAK vakili" },
      { name: "Muhamediyeva Dilnoz Tulkunovna" },
      { name: "Mo'minov Bahodir Boltayevich" },
      { name: "Raxmatov Hoshim Erdashovich" },
      { name: "Hamdamov Rustam Hamdamovich" },
      { name: "Meliyev Farhod Fattoyevich" },
    ],
  },
  {
    ...specialties[2],
    members: [
      { name: "Nazirova Elmira Shodmonovna", role: "Rais" },
      { name: "Xujayev Ismatulla Qushayevich", role: "Rais o'rinbosari" },
      {
        name: "Qurbonov Nozim Muhammadrashitovich",
        role: "Ilmiy kotib",
      },
      { name: "Aripov Mersaid Mirsidiqovich" },
      { name: "Boboraximov Baxtiyor Ixtiyorovich" },
      { name: "Daliyev Sherzod Qarshiyevich" },
      { name: "Djumanov Jamoljon Xudoyqulovich" },
      { name: "Djumayozov Umidjon Zafarjonovich" },
      { name: "Eshmatov Baxtiyor Xasanovich" },
      { name: "OAK ekspert kengashi a'zosi", role: "OAK vakili" },
      { name: "Muradov Farrux Abduqahhorovich" },
      { name: "Murodullayev Baxtiyor To'lqin o'g'li" },
      { name: "Muhamadiyev Abduvali Shukurovich" },
      { name: "Normurodov Chori Begaliyevich" },
      { name: "Nuraliyev Faxriddin Murodullayevich" },
      { name: "Palvanov Bozorboy Yusupovich" },
      { name: "Rasulmuhammedov Muhammada'ziz Maxamadaminovich" },
      { name: "Ravshanov Normaxmad" },
      { name: "Rahmonov Zafar Ravshanovich" },
      { name: "Sadullayeva Shaxlo Azimbayevna" },
      { name: "Shafiyev Tursun Rustamovich" },
    ],
  },
  {
    ...specialties[3],
    members: [
      { name: "Fozilov Shavkat Xayrullayevich", role: "Rais" },
      {
        name: "Hamdamov Rustam Hamdamovich",
        role: "Rais o'rinbosari",
      },
      { name: "Qahhorov Shukrullo Sa'dullo o'g'li", role: "Ilmiy kotib" },
      { name: "Abdullayev Sherzod Shavkatjonovich" },
      { name: "Axmedov Dilshod Dilmurodovich" },
      { name: "Kamilov Mirzayan Mirzaaxmedovich" },
      { name: "Madraximov Shavkat Fayzullayevich" },
      { name: "Mamatov Narzillo Solijonovich" },
      { name: "Boboraximov Baxtiyor Ixtiyorovich" },
      { name: "OAK ekspert kengashi a'zosi", role: "OAK vakili" },
      { name: "Mirzayev Nomaz" },
      { name: "Muhamediyeva Dilnoz Tulkunovna" },
      { name: "Rajabov Sobirjon Sattorovich" },
      { name: "Ignatev Nikolay Aleksandrovich" },
      { name: "Yusupov Ozod Rabbimovich" },
    ],
  },
];
