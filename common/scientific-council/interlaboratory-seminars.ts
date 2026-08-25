/** @format */

export type InterlaboratoryMember = {
  name: string;
  details: string;
  specialty: string;
  role?: "Rais" | "Rais o‘rinbosari" | "Ilmiy kotib";
};

export type InterlaboratorySeminar = {
  id: string;
  title: string;
  specialties: { code: string; title: string }[];
  laboratories?: string[];
  members: InterlaboratoryMember[];
};

export const interlaboratorySeminars: InterlaboratorySeminar[] = [
  {
    id: "05-01-02-05-01-07",
    title:
      "05.01.02 va 05.01.07 bo‘yicha laboratoriyalararo ilmiy seminar",
    specialties: [
      {
        code: "05.01.02",
        title: "Tizimli tahlil, boshqaruv va axborotni qayta ishlash",
      },
      {
        code: "05.01.07",
        title: "Matematik modellashtirish. Sonli usullar va dasturlar majmui",
      },
    ],
    members: [
      {
        name: "Sulyukova Larisa Faritovna",
        role: "Rais",
        details:
          "Raqamli texnologiyalar va sun’iy intellektni rivojlantirish ilmiy-tadqiqot instituti, katta ilmiy xodim, texnika fanlari doktori, katta ilmiy xodim",
        specialty: "05.01.02",
      },
      {
        name: "Sadullayeva Shaxlo Azimbayevna",
        role: "Rais o‘rinbosari",
        details:
          "Belarus - O‘zbekiston qo‘shma tarmoqlararo amaliy texnik kvalifikatsiyalar instituti, ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari, fizika-matematika fanlari doktori, professor",
        specialty: "05.01.07",
      },
      {
        name: "Qurbonov Nozim Muhammadrashitovich",
        role: "Ilmiy kotib",
        details:
          "Raqamli texnologiyalar va sun’iy intellektni rivojlantirish ilmiy-tadqiqot instituti, katta ilmiy xodim, texnika fanlari falsafa doktori (PhD), dotsent",
        specialty: "05.01.07",
      },
      {
        name: "Muxamadiyev Abduvali Shukurovich",
        details:
          "Muhammad al-Xorazmiy nomidagi Toshkent axborot texnologiyalari universiteti, kafedra professori, fizika-matematika fanlari doktori, dotsent",
        specialty: "05.01.07",
      },
      {
        name: "Eshmatov Baxtiyor Xasanovich",
        details:
          "“Toshkent irrigatsiya va qishloq xo‘jaligini mexanizatsiyalash muhandislari instituti” Milliy tadqiqot universiteti, kafedra professori, fizika-matematika fanlari doktori, dotsent",
        specialty: "05.01.07",
      },
      {
        name: "Nuraliyev Faxriddin Murodillayevich",
        details:
          "Raqamli texnologiyalar va sun’iy intellektni rivojlantirish ilmiy-tadqiqot instituti, katta ilmiy xodim, texnika fanlari doktori, professor",
        specialty: "05.01.07",
      },
      {
        name: "Djumayozov Umidjon Zafarjonovich",
        details:
          "Muhammad al-Xorazmiy nomidagi Toshkent axborot texnologiyalari universiteti Samarqand filiali, kafedra dotsenti, texnika fanlari doktori",
        specialty: "05.01.07",
      },
      {
        name: "Axmedov Dilshod Dilmuradovich",
        details:
          "Raqamli texnologiyalar va sun’iy intellektni rivojlantirish ilmiy-tadqiqot instituti, direktorining ilm-fan bo‘yicha o‘rinbosari, texnika fanlari bo‘yicha falsafa doktori (PhD), katta ilmiy xodim",
        specialty: "05.01.02",
      },
      {
        name: "Boboraximov Baxtiyor Ixtiyorovich",
        details:
          "Raqamli texnologiyalar va sun’iy intellektni rivojlantirish ilmiy-tadqiqot instituti, laboratoriya mudiri, texnika fanlari falsafa doktori (PhD)",
        specialty: "05.01.07",
      },
      {
        name: "Murodullayev Baxtiyor To‘lqin o‘g‘li",
        details:
          "Raqamli texnologiyalar va sun’iy intellektni rivojlantirish ilmiy-tadqiqot instituti, laboratoriya mudiri, texnika fanlari falsafa doktori (PhD)",
        specialty: "05.01.07",
      },
      {
        name: "To‘raqulov Jahongir Anvarjon o‘g‘li",
        details:
          "Toshkent xalqaro ta’lim universiteti, kafedra dotsenti, texnika fanlari falsafa doktori (PhD)",
        specialty: "05.01.07",
      },
      {
        name: "Komilov Mirzoyan Mirzaaxmedovich",
        details:
          "Raqamli texnologiyalar va sun’iy intellektni rivojlantirish ilmiy-tadqiqot instituti, laboratoriya mudiri, texnika fanlari doktori, akademik",
        specialty: "05.01.02",
      },
      {
        name: "Nazirova Elmira Shodmonovna",
        details:
          "Muhammad al-Xorazmiy nomidagi Toshkent axborot texnologiyalari universiteti, fakultet dekani, texnika fanlari doktori, professor",
        specialty: "05.01.07",
      },
      {
        name: "Nurmamatov Mexriddin Qahramonovich",
        details:
          "Sharof Rashidov nomidagi Samarqand davlat universiteti, kafedra mudiri, texnika fanlari falsafa doktori (PhD)",
        specialty: "05.01.02",
      },
      {
        name: "Ravshanov Normaxmad",
        details:
          "Raqamli texnologiyalar va sun’iy intellektni rivojlantirish ilmiy-tadqiqot instituti, direktorning ilm-fan bo‘yicha maslahatchisi, texnika fanlari doktori, professor",
        specialty: "05.01.02",
      },
      {
        name: "Varlamova Lyudmila Petrovna",
        details:
          "O‘zbekiston Milliy universiteti, kafedra professori, texnika fanlari doktori, dotsent",
        specialty: "05.01.02",
      },
      {
        name: "Tuxtanazarov Dilmurod Solijonovich",
        details:
          "O‘zbekiston xalqaro islom akademiyasi, kafedra dotsenti, texnika fanlari bo‘yicha falsafa doktori (PhD), dotsent",
        specialty: "05.01.02",
      },
      {
        name: "Yakubjanova Dilfuza Kadirovna",
        details:
          "Toshkent axborot texnologiyalari universiteti Samarqand filiali, o‘quv va tarbiyaviy ishlar bo‘yicha direktor o‘rinbosari, texnika fanlari bo‘yicha falsafa doktori (PhD), dotsent",
        specialty: "05.01.02",
      },
      {
        name: "Sevinov Jasur Usmonovich",
        details:
          "Toshkent davlat texnika universiteti, kafedra mudiri, texnika fanlari doktori, professor",
        specialty: "05.01.02",
      },
    ],
  },
  {
    id: "05-01-03-05-01-11",
    title:
      "05.01.03 va 05.01.11 bo‘yicha laboratoriyalararo ilmiy seminar",
    specialties: [
      {
        code: "05.01.03",
        title: "Informatikaning nazariy asoslari",
      },
      {
        code: "05.01.11",
        title: "Raqamli texnologiyalar va sun’iy intellekt",
      },
    ],
    laboratories: [
      "Sun’iy intellekt va mashinaviy o‘qitish",
      "Biometrik tizimlar",
      "Tabiiy tilni qayta ishlash",
      "Aqlli tizimlar va buyumlar interneti",
    ],
    members: [
      {
        name: "Hamdamov Rustam Hamdamovich",
        role: "Rais",
        details:
          "Raqamli texnologiyalar va sun’iy intellektni rivojlantirish ilmiy-tadqiqot instituti, laboratoriya mudiri, texnika fanlari doktori, professor",
        specialty: "05.01.11",
      },
      {
        name: "Mirzayev Nomaz",
        role: "Rais o‘rinbosari",
        details:
          "Muhammad al-Xorazmiy nomidagi Toshkent axborot texnologiyalari universiteti, kafedra professori, texnika fanlari doktori, professor",
        specialty: "05.01.11",
      },
      {
        name: "Kaxarov Shukrullo Sa’dullo o‘g‘li",
        role: "Ilmiy kotib",
        details:
          "Raqamli texnologiyalar va sun’iy intellektni rivojlantirish ilmiy-tadqiqot instituti, katta ilmiy xodim, texnika fanlari bo‘yicha falsafa doktori (PhD), dotsent",
        specialty: "05.01.11",
      },
      {
        name: "Abdullayev Sherzod Shavkatjonovich",
        details:
          "Oliy ta’lim, fan va innovatsiyalar vazirligi, AKTni joriy etish va raqamlashtirish boshqarmasi bosh mutaxassisi, texnika fanlari bo‘yicha falsafa doktori (PhD)",
        specialty: "05.01.11",
      },
      {
        name: "Axmedov Dilshod Dilmuradovich",
        details:
          "Raqamli texnologiyalar va sun’iy intellektni rivojlantirish ilmiy-tadqiqot instituti, direktorning ilm-fan bo‘yicha o‘rinbosari, texnika fanlari bo‘yicha falsafa doktori (PhD), katta ilmiy xodim",
        specialty: "05.01.03",
      },
      {
        name: "Axundjanov Umidjon Yunus o‘g‘li",
        details:
          "Farg‘ona davlat texnika universiteti, fakultet dekani muovini, texnika fanlari nomzodi",
        specialty: "05.01.03",
      },
      {
        name: "Fazilov Shavkat Xayrullayevich",
        details:
          "Raqamli texnologiyalar va sun’iy intellektni rivojlantirish ilmiy-tadqiqot instituti, laboratoriya mudiri, texnika fanlari doktori, professor",
        specialty: "05.01.11",
      },
      {
        name: "Ignatev Nikolay Aleksandrovich",
        details:
          "Mirzo Ulug‘bek nomidagi O‘zbekiston Milliy universiteti, kafedra professori, fizika-matematika fanlari doktori, professor",
        specialty: "05.01.03",
      },
      {
        name: "Madraximov Shavkat Fayzullayevich",
        details:
          "Mirzo Ulug‘bek nomidagi O‘zbekiston Milliy universiteti, kafedra professori, texnika fanlari doktori, professor",
        specialty: "05.01.03",
      },
      {
        name: "Meliyev Farxod Fattoyevich",
        details:
          "Sharof Rashidov nomidagi Samarqand davlat universiteti, kafedra dotsenti, texnika fanlari bo‘yicha falsafa doktori (PhD)",
        specialty: "05.01.11",
      },
      {
        name: "Muhamadiyeva Dilnoz Tulkunovna",
        details:
          "“Toshkent irrigatsiya va qishloq xo‘jaligini mexanizatsiyalash muhandislari instituti” Milliy tadqiqot universiteti, kafedra professori, texnika fanlari doktori, professor",
        specialty: "05.01.03",
      },
      {
        name: "Nurimov Paraxat Boymurotovich",
        details:
          "“Toshkent irrigatsiya va qishloq xo‘jaligini mexanizatsiyalash muhandislari instituti” Milliy tadqiqot universiteti, doktorant, texnika fanlari bo‘yicha falsafa doktori (PhD)",
        specialty: "05.01.11",
      },
      {
        name: "Radjabov Sobirjon Sattorovich",
        details:
          "“Toshkent irrigatsiya va qishloq xo‘jaligini mexanizatsiyalash muhandislari instituti” Milliy tadqiqot universiteti, huzuridagi Fundamental va amaliy tadqiqotlar instituti, laboratoriya mudiri, texnika fanlari doktori, katta ilmiy xodim",
        specialty: "05.01.11",
      },
      {
        name: "Raxmanov Xoshim Erdashovich",
        details:
          "Muhammad al-Xorazmiy nomidagi Toshkent axborot texnologiyalari universiteti Samarqand filiali, kafedra mudiri, texnika fanlari bo‘yicha falsafa doktori (PhD)",
        specialty: "05.01.03",
      },
      {
        name: "Urunbayev Erkin",
        details:
          "Sharof Rashidov nomidagi Samarqand davlat universiteti, kafedra professori, fizika-matematika fanlari doktori, dotsent",
        specialty: "05.01.03",
      },
      {
        name: "Xashimov Axmad Anvarovich",
        details:
          "Qo‘qon universiteti, kafedra dotsenti, texnika fanlari bo‘yicha falsafa doktori (PhD)",
        specialty: "05.01.11",
      },
      {
        name: "Yusupov Ozod Rabbimovich",
        details:
          "Sharof Rashidov nomidagi Samarqand davlat universiteti, kafedra dotsenti, texnika fanlari bo‘yicha falsafa doktori (PhD), dotsent",
        specialty: "05.01.11",
      },
    ],
  },
];
