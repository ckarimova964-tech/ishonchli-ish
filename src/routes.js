// Chet elga ishlash uchun qonuniy yo'llar. Qoidalar tez o'zgaradi — har bir kartochkada
// rasmiy manba havolasi bor. 2026-09-14 da tekshirilgan asosiy faktlar:
//  - AQSh H-2A/H-2B ro'yxatida O'zbekiston yo'q (uscis.gov, 2024-11-08 ro'yxati)
//  - AQSh DV lotereyasi: viza berish 2025-dekabrdan beri bir necha marta to'xtatilgan
//  - Germaniya Chancenkarte: nemis A1 yoki ingliz B2, 6 ball, tan olingan malaka
//  - Buyuk Britaniya Seasonal Worker: homiy (scheme operator) orqali, 6 oygacha, ariza £340

export const ROUTES = [
  {
    id: 'KR',
    name: 'Janubiy Koreya',
    flag: '🇰🇷',
    langs: [{ lang: 'Koreys tili', level: 'EPS-TOPIK imtihoni — majburiy' }],
    ways: [
      {
        title: 'EPS dasturi (E-9 ishchi vizasi)',
        how: 'O‘zbekiston — EPS hamkor davlati. Tanlov Migratsiya agentligi orqali o‘tadi: EPS-TOPIK imtihoni, tibbiy ko‘rik, keyin koreys ish beruvchisi tanlaydi.',
        who: 'Ishlab chiqarish, qurilish, qishloq xo‘jaligi ishchilari',
      },
    ],
    links: [
      { t: 'Migratsiya agentligi — Koreyaga ishga', u: 'https://xorijdaish.uz' },
      { t: 'EPS rasmiy sayti', u: 'https://www.eps.go.kr' },
    ],
  },
  {
    id: 'JP',
    name: 'Yaponiya',
    flag: '🇯🇵',
    langs: [{ lang: 'Yapon tili', level: 'odatda JLPT N4 yoki JFT-Basic darajasi' }],
    ways: [
      {
        title: '«Specified Skilled Worker» (Tokutei Ginou)',
        how: 'Yapon tili imtihoni + soha bo‘yicha malaka imtihonidan o‘tasiz, keyin yapon ish beruvchisi bilan shartnoma. Rasmiy vakansiyalar Migratsiya agentligida e’lon qilinadi.',
        who: 'Payvandchi, oshxona, qurilish, parvarish, haydovchi va boshqalar',
      },
      {
        title: 'Texnik stajirovka',
        how: 'Yapon korxonasida malaka oshirish dasturi — belgilangan muddatga.',
        who: 'Yosh mutaxassislar',
      },
    ],
    links: [
      { t: 'Migratsiya agentligi vakansiyalari', u: 'https://xorijdaish.uz' },
      { t: 'JITCO — dasturlar haqida', u: 'https://www.jitco.or.jp/en/' },
    ],
  },
  {
    id: 'DE',
    name: 'Germaniya',
    flag: '🇩🇪',
    langs: [
      { lang: 'Nemis tili', level: 'Chancenkarte uchun A1; kasbiy vizada odatda B1 va undan yuqori' },
      { lang: 'Ingliz tili', level: 'Chancenkarte uchun nemis o‘rniga B2' },
    ],
    ways: [
      {
        title: 'Chancenkarte (Imkoniyat kartasi)',
        how: 'Ish taklifisiz Germaniyaga borib, 1 yilgacha ish qidirish. Kamida 6 ball, tan olingan oliy yoki kamida 2 yillik kasbiy ma’lumot, nemis A1 yoki ingliz B2, o‘zingizni ta’minlashga mablag‘ talab qilinadi.',
        who: 'Diplomi va kasbi borlar',
      },
      {
        title: 'Malakali mutaxassis vizasi',
        how: 'Diplomingiz Germaniyada tan olinadi + ish beruvchidan taklif. Ariza Toshkentdagi Germaniya elchixonasi orqali.',
        who: 'Hamshira, muhandis, IT, kasbiy ma’lumotli ishchilar',
      },
      {
        title: 'Hamshiralar dasturi',
        how: 'Migratsiya agentligida Germaniya klinikalari uchun hamshira vakansiyalari muntazam e’lon qilinadi.',
        who: 'Tibbiyot ma’lumotiga ega bo‘lganlar',
      },
    ],
    links: [
      { t: 'Make it in Germany — rasmiy portal', u: 'https://www.make-it-in-germany.com/en/' },
      { t: 'Migratsiya agentligi vakansiyalari', u: 'https://xorijdaish.uz' },
    ],
  },
  {
    id: 'US',
    name: 'AQSh',
    flag: '🇺🇸',
    langs: [{ lang: 'Ingliz tili', level: 'ish va hayot uchun zarur; DV lotereyasida til sharti yo‘q' }],
    ways: [
      {
        title: 'DV lotereyasi (Green Card)',
        how: 'O‘zbekiston fuqarolari ishtirok eta oladi: o‘rta maktab ma’lumoti yoki malakali kasbda 2 yillik tajriba kerak. Ro‘yxatdan o‘tish BEPUL va faqat dvprogram.state.gov saytida.',
        who: 'Hamma uchun',
        warn: 'Diqqat: 2025-dekabrdan beri DV vizalarini berish bir necha marta to‘xtatilgan. Joriy holatni faqat rasmiy saytdan tekshiring. «Yutuq kafolati» va’da qiluvchilarga pul bermang.',
      },
      {
        title: 'Talabalik (F-1) yoki ish beruvchi homiyligi',
        how: 'Amerika universitetiga qabul yoki ish beruvchining homiyligi (uzoq jarayon).',
        who: 'Ingliz tilini yaxshi biladiganlar',
      },
    ],
    warn: 'AQShning mavsumiy ishchi vizalari (H-2A qishloq xo‘jaligi, H-2B boshqa sohalar) O‘zbekiston fuqarolariga berilmaydi — O‘zbekiston ruxsat etilgan davlatlar ro‘yxatida yo‘q. Bu vizani va’da qilganlar — firibgar.',
    links: [
      { t: 'DV lotereyasi — rasmiy sayt', u: 'https://dvprogram.state.gov' },
      { t: 'AQSh elchixonasi Toshkentda', u: 'https://uz.usembassy.gov' },
    ],
  },
  {
    id: 'GB',
    name: 'Buyuk Britaniya',
    flag: '🇬🇧',
    langs: [{ lang: 'Ingliz tili', level: 'mavsumiy vizaning rasmiy sahifasida til sharti ko‘rsatilmagan; malakali vizada talab qilinadi' }],
    ways: [
      {
        title: 'Mavsumiy ishchi vizasi (Seasonal Worker)',
        how: 'Faqat rasmiy homiy — «scheme operator» orqali. Bog‘dorchilik va issiqxonada 6 oygacha, parrandachilikda 2-oktyabr — 31-dekabr. Ariza narxi £340.',
        who: 'Meva-sabzavot terish, issiqxona, parrandachilik',
      },
    ],
    links: [{ t: 'GOV.UK — Seasonal Worker visa', u: 'https://www.gov.uk/seasonal-worker-visa' }],
  },
  {
    id: 'RU',
    name: 'Rossiya',
    flag: '🇷🇺',
    langs: [{ lang: 'Rus tili', level: 'patent olish uchun rus tili, tarix va huquq asoslari imtihoni' }],
    ways: [
      {
        title: 'Patent asosida ishlash',
        how: 'O‘zbekiston fuqarolari Rossiyaga vizasiz kiradi. Ishlash uchun patent kerak: imtihon sertifikati, tibbiy ko‘rik, barmoq izi. Migratsiya hisobiga turish muddatlarini buzmang.',
        who: 'Hamma sohalar',
      },
      {
        title: 'Uyushgan tartibda — Migratsiya agentligi orqali',
        how: 'Ish beruvchi oldindan tanlangan, shartnoma rasmiy — yashash joyi ko‘pincha beriladi.',
        who: 'Ishchilar',
      },
    ],
    links: [
      { t: 'Migratsiya agentligi vakansiyalari', u: 'https://xorijdaish.uz' },
      { t: '«Работа России» — vakansiyalar', u: 'https://trudvsem.ru/vacancy/search' },
    ],
  },
  {
    id: 'KZ',
    name: 'Qozog‘iston',
    flag: '🇰🇿',
    langs: [{ lang: 'Rus yoki qozoq tili', level: 'majburiy imtihon yo‘q, lekin ish uchun kerak' }],
    ways: [
      {
        title: 'Ish beruvchi orqali yoki patent bilan',
        how: 'Vizasiz kirish. Ishlash uchun ruxsatnoma yoki patent rasmiylashtiriladi — shartlarini elchixonadan aniqlang.',
        who: 'Qurilish, savdo, xizmat ko‘rsatish',
      },
    ],
    links: [
      { t: 'Enbek.kz — davlat bandlik portali', u: 'https://www.enbek.kz' },
      { t: 'O‘zbekiston elchixonasi', u: 'https://uzembassy.kz' },
    ],
  },
  {
    id: 'TR',
    name: 'Turkiya',
    flag: '🇹🇷',
    langs: [{ lang: 'Turk tili', level: 'majburiy emas, lekin ish topishni osonlashtiradi' }],
    ways: [
      {
        title: 'Ish ruxsatnomasi (çalışma izni)',
        how: 'Ruxsatnomani ish beruvchi rasmiylashtiradi. Turist sifatida kirib ishlash — noqonuniy, deportatsiya va kirish taqiqiga olib keladi.',
        who: 'To‘qimachilik, xizmat ko‘rsatish, qurilish',
      },
    ],
    links: [{ t: 'İŞKUR — davlat bandlik agentligi', u: 'https://www.iskur.gov.tr' }],
  },
  {
    id: 'AE',
    name: 'BAA',
    flag: '🇦🇪',
    langs: [{ lang: 'Ingliz tili', level: 'amalda asosiy ish tili; arab tili afzallik' }],
    ways: [
      {
        title: 'Ish beruvchi homiyligidagi ish vizasi',
        how: 'Vizani ish beruvchi rasmiylashtiradi. Ish uchun «tashrif vizasi» bilan borish xavfli — shartnomasiz qolasiz.',
        who: 'Xizmat ko‘rsatish, qurilish, haydovchi, mehmonxona',
      },
    ],
    links: [{ t: 'O‘zbekiston elchixonasi BAAda', u: 'https://uzembassy.ae' }],
  },
  {
    id: 'PL',
    name: 'Polsha',
    flag: '🇵🇱',
    langs: [{ lang: 'Polyak yoki ingliz tili', level: 'majburiy emas, ish beruvchiga bog‘liq' }],
    ways: [
      {
        title: 'Ish ruxsatnomasi + milliy viza (D)',
        how: 'Avval polyak ish beruvchi ruxsatnoma oladi, keyin siz elchixonada ishchi vizasini rasmiylashtirasiz.',
        who: 'Ishlab chiqarish, logistika, qishloq xo‘jaligi',
      },
    ],
    links: [
      { t: 'EURES — Yevropa ish bazasi', u: 'https://eures.europa.eu/index_en' },
      { t: 'O‘zbekiston elchixonasi Polshada', u: 'https://poland.mfa.uz' },
    ],
  },
  {
    id: 'IT',
    name: 'Italiya',
    flag: '🇮🇹',
    langs: [{ lang: 'Italyan tili', level: 'majburiy imtihon yo‘q, lekin ish va hayot uchun kerak' }],
    ways: [
      {
        title: '«Decreto Flussi» kvotasi bo‘yicha ish vizasi',
        how: 'O‘zbekiston 2026–2028 yillar uchun Italiya ishchi kvotasi berilgan davlatlar ro‘yxatiga birinchi marta kiritildi. Italiyalik ish beruvchi belgilangan kunlarda siz uchun ishga ruxsat (nulla osta) so‘raydi.',
        who: 'Qishloq xo‘jaligi, turizm, parvarish va uy xizmati, qurilish',
      },
      {
        title: 'Mavsumiy ish',
        how: 'Qishloq xo‘jaligi va turizm uchun mavsumiy ishchilarga alohida kvota ajratiladi.',
        who: 'Mavsumiy ishchilar',
      },
    ],
    links: [
      { t: 'Italiya elchixonasi (Toshkent)', u: 'https://ambtashkent.esteri.it' },
      { t: 'Italiya viza portali — qaysi viza kerakligini aniqlash', u: 'https://vistoperitalia.esteri.it' },
    ],
  },
  {
    id: 'CZ',
    name: 'Chexiya',
    flag: '🇨🇿',
    langs: [{ lang: 'Chex tili', level: 'ish beruvchiga bog‘liq; tibbiyot sohasida odatda talab qilinadi' }],
    ways: [
      {
        title: 'Hukumatlararo kelishuv asosida',
        how: 'O‘zbekiston va Chexiya mehnat migratsiyasi bo‘yicha kelishuv imzolagan: tibbiyot va ijtimoiy soha, sanoat va avtomobilsozlik. Xabarlarga ko‘ra, yiliga 150 kishilik kvota bor va amalga oshirish 2026-yil sentabrdan boshlanadi.',
        who: 'Hamshira, tibbiyot va sanoat ishchilari',
      },
      {
        title: 'Xodim kartasi (zaměstnanecká karta)',
        how: 'Ish va yashash ruxsatnomasi bitta hujjatda, 2 yilgacha beriladi va uzaytiriladi. Vakansiya chet elliklar uchun ochiq ro‘yxatda bo‘lishi kerak.',
        who: 'Ish taklifi borlar',
      },
    ],
    links: [
      { t: 'Chexiya elchixonasi (Toshkent)', u: 'https://mzv.gov.cz/tashkent' },
      { t: 'Chexiya immigratsiya portali', u: 'https://ipc.gov.cz/en/' },
    ],
  },
  {
    id: 'LV',
    name: 'Latviya',
    flag: '🇱🇻',
    langs: [{ lang: 'Latish, rus yoki ingliz tili', level: 'majburiy imtihon yo‘q, ish beruvchiga bog‘liq' }],
    ways: [
      {
        title: 'Ish vizasi (milliy viza D)',
        how: '90 kundan ortiq ishlash uchun milliy viza kerak. Ish beruvchi vakansiyani Latviya bandlik agentligida ro‘yxatdan o‘tkazadi va sizni taklif qiladi. Migratsiya agentligida Latviya uchun, masalan, CE toifali haydovchi vakansiyalari bor.',
        who: 'Haydovchi, logistika, qurilish',
      },
    ],
    links: [
      { t: 'Latviya elchixonasi (Toshkent)', u: 'https://www2.mfa.gov.lv/en/uzbekistan' },
      { t: 'Migratsiya agentligi vakansiyalari', u: 'https://xorijdaish.uz' },
    ],
  },
  {
    id: 'HR',
    name: 'Xorvatiya',
    flag: '🇭🇷',
    langs: [{ lang: 'Xorvat yoki ingliz tili', level: 'majburiy emas, ish beruvchiga bog‘liq' }],
    ways: [
      {
        title: 'Yashash va ishlash ruxsatnomasi',
        how: 'Ruxsatnomani Xorvatiya ichki ishlar vazirligidan ish beruvchi so‘raydi, keyin siz viza olasiz.',
        who: 'Qurilish, turizm, mehmonxona',
      },
    ],
    warn: 'O‘zbekiston elchixonasi Xorvatiyaga faqat Migratsiya agentligidan litsenziya olgan xususiy agentliklar orqali borishni tavsiya qiladi.',
    links: [
      { t: 'Xorvatiya TIV — ish ruxsatnomasi', u: 'https://mvep.gov.hr/consular-information-145927/work-permit/180431' },
      { t: 'Litsenziyali agentliklar reyestri', u: 'https://my.gov.uz/uz/reyestr' },
    ],
  },
  {
    id: 'IL',
    name: 'Isroil',
    flag: '🇮🇱',
    langs: [{ lang: 'Ivrit yoki ingliz tili', level: 'majburiy imtihon yo‘q; parvarish ishida kundalik muloqot uchun kerak' }],
    ways: [
      {
        title: 'Hukumatlararo kelishuv (2022)',
        how: 'O‘zbekiston va Isroil fuqarolarni vaqtincha ishga joylashtirish bo‘yicha kelishuv imzolagan. Asosiy soha — qariyalarni parvarish qilish. Kelishuv orqali tanlov xususiy vositachilarning noqonuniy to‘lovlarisiz o‘tadi.',
        who: 'Parvarish; boshqa sohalar — e’lonlarga qarab',
      },
    ],
    warn: 'Isroilga ish uchun vositachiga katta pul to‘lash — firibgarlik belgisi. Kelishuv bo‘yicha tanlov rasmiy kanal orqali o‘tadi.',
    links: [
      { t: 'Isroil elchixonasi (Toshkent)', u: 'https://embassies.gov.il/tashkent' },
      { t: 'Migratsiya agentligi', u: 'https://xorijdaish.uz' },
    ],
  },
  {
    id: 'SA',
    name: 'Saudiya Arabistoni',
    flag: '🇸🇦',
    langs: [{ lang: 'Arab yoki ingliz tili', level: 'ish beruvchiga bog‘liq; kasbiy malaka imtihoni talab qilinadi' }],
    ways: [
      {
        title: 'Uyushgan tartibda — Migratsiya agentligi orqali',
        how: '2025-yil dekabrda mehnat migratsiyasi bo‘yicha kelishuv imzolangan: sog‘liqni saqlash, turizm, qurilish va muhandislik. Nomzodlar malaka imtihonidan o‘tadi; ish beruvchi viza, shartnoma, turar joy va tibbiy sug‘urta beradi.',
        who: 'Tibbiyot, qurilish, turizm, muhandislik',
      },
    ],
    links: [
      { t: 'Migratsiya agentligi vakansiyalari', u: 'https://xorijdaish.uz' },
      { t: 'Saudiya Arabistoni viza platformasi', u: 'https://visa.mofa.gov.sa' },
    ],
  },
  {
    id: 'CH',
    name: 'Shveytsariya',
    flag: '🇨🇭',
    langs: [{ lang: 'Nemis, fransuz yoki italyan tili', level: 'uzoq muddat qolishda til bilimi hisobga olinadi' }],
    ways: [
      {
        title: 'Faqat malakali mutaxassislar',
        how: 'YeI va EAST davlatlaridan tashqari fuqarolar faqat rahbar, mutaxassis yoki malakali kasb egasi sifatida ishlay oladi: odatda oliy ma’lumot va bir necha yillik tajriba. Ish beruvchi Shveytsariya yoki YeI dan mos odam topilmaganini isbotlashi kerak.',
        who: 'Oliy ma’lumotli, tajribali mutaxassislar',
      },
    ],
    warn: 'Malakasiz ish uchun Shveytsariya chet elliklarga ruxsat bermaydi. Bunday ishni va’da qilganlarga ishonmang.',
    links: [
      { t: 'SEM — YeI dan tashqari fuqarolar uchun ish', u: 'https://www.sem.admin.ch/sem/en/home/themen/arbeit/nicht-eu_efta-angehoerige.html' },
      { t: 'Migratsiya agentligi vakansiyalari', u: 'https://xorijdaish.uz' },
    ],
  },
  {
    id: 'CA',
    name: 'Kanada',
    flag: '🇨🇦',
    langs: [{ lang: 'Ingliz yoki fransuz tili', level: 'Express Entry uchun rasmiy test (IELTS, CELPIP yoki TEF) majburiy' }],
    ways: [
      {
        title: 'Express Entry (doimiy yashash)',
        how: 'Onlayn profil yaratiladi: yosh, ma’lumot, tajriba va til testi ballari bo‘yicha saralanadi. Taklif olsangiz — doimiy yashashga ariza berasiz.',
        who: 'Malakali mutaxassislar',
      },
      {
        title: 'Ish beruvchi taklifi bilan ish ruxsatnomasi',
        how: 'Ko‘pincha ish beruvchi Kanadada chet ellikni olishga ruxsat (LMIA) oladi, keyin siz onlayn ariza berasiz.',
        who: 'Ish taklifi borlar',
      },
    ],
    links: [{ t: 'Kanada immigratsiya xizmati (IRCC)', u: 'https://www.canada.ca/en/immigration-refugees-citizenship.html' }],
  },
  {
    id: 'AU',
    name: 'Avstraliya',
    flag: '🇦🇺',
    langs: [{ lang: 'Ingliz tili', level: 'malakali vizalar uchun rasmiy test (IELTS, PTE va boshqalar) majburiy' }],
    ways: [
      {
        title: 'Malakali ishchi vizalari',
        how: 'Kasbingiz Avstraliyaning malakali kasblar ro‘yxatida bo‘lishi, malakangiz baholanishi va ingliz tili testi kerak. Ish beruvchi homiyligidagi va ball tizimidagi vizalar bor.',
        who: 'Muhandis, IT, tibbiyot, qurilish ustalari',
      },
    ],
    links: [{ t: 'Avstraliya Uy ishlari departamenti — vizalar', u: 'https://immi.homeaffairs.gov.au' }],
  },
  {
    id: 'FI',
    name: 'Finlandiya',
    flag: '🇫🇮',
    langs: [{ lang: 'Fin, shved yoki ingliz tili', level: 'mavsumiy ishda odatda majburiy emas' }],
    ways: [
      {
        title: 'Mavsumiy ish',
        how: 'Reza meva terish va bog‘dorchilik: ish beruvchi bilan shartnoma, keyin Migri tizimida mavsumiy ish uchun ruxsat.',
        who: 'Qishloq xo‘jaligi',
      },
      {
        title: 'Ish uchun yashash ruxsatnomasi',
        how: 'Ish taklifi bilan Migri’ning «Enter Finland» xizmatida onlayn ariza.',
        who: 'Ish taklifi borlar',
      },
    ],
    links: [{ t: 'Migri — Finlandiya migratsiya xizmati', u: 'https://migri.fi/en/home' }],
  },
  {
    id: 'AT',
    name: 'Avstriya',
    flag: '🇦🇹',
    langs: [{ lang: 'Nemis tili', level: 'Qizil-Oq-Qizil kartaning ball tizimida hisoblanadi; ingliz tili ham ball beradi' }],
    ways: [
      {
        title: 'Qizil-Oq-Qizil karta (Rot-Weiß-Rot)',
        how: 'Tanqis kasblar va malakali ishchilar uchun ball tizimi: ma’lumot, tajriba, til va yosh. Ish beruvchi taklifi kerak.',
        who: 'Tanqis kasb egalari, malakali mutaxassislar',
      },
    ],
    links: [{ t: 'Avstriya rasmiy migratsiya portali', u: 'https://www.migration.gv.at/en/' }],
  },
  {
    id: 'HU',
    name: 'Vengriya',
    flag: '🇭🇺',
    langs: [{ lang: '—', level: 'hozircha chet ellik ishchilarga yangi ruxsat berilmaydi' }],
    ways: [
      {
        title: '«Mehmon ishchi» ruxsatnomasi — to‘xtatilgan',
        how: '2026-yil 6-iyundan boshlab Vengriya «mehmon ishchi» ruxsatnomasiga yangi arizalarni qabul qilmaydi. O‘zbekiston bu ro‘yxatda avval ham bo‘lmagan.',
        who: '—',
      },
    ],
    warn: 'Vengriyaga hozir «ish vizasi» va’da qilayotganlar — katta ehtimol bilan firibgar.',
    links: [{ t: 'Vengriya immigratsiya xizmati', u: 'https://oif.gov.hu' }],
  },
]

// Vizani qanday olish (qadamlar) va qayerda topshiriladi.
// Manzillar 2026-09-14 da tekshirilgan: taschkent.diplo.de, uz.usembassy.gov, gov.uk,
// gov.pl/web/uzbekistan, mofa.gov.ae, mfa.gov.tr, eps.go.kr, gosuslugi.ru.
// Ba'zi viza markazlari (TLScontact, VFS Global, Yaponiya elchixonasi) avtomatik tekshiruvni
// bloklaydi, lekin brauzerda ochiladi.
export const VISA = {
  KR: {
    steps: [
      'Migratsiya agentligining Koreya bo‘yicha tanloviga ro‘yxatdan o‘ting.',
      'EPS-TOPIK (koreys tili) imtihonini, keyin kasbiy ko‘nikma sinovini topshiring.',
      'Nomzodlar ro‘yxatiga kiritilasiz — koreys ish beruvchisi sizni tanlaydi va mehnat shartnomasi imzolanadi.',
      'Ish beruvchi Koreyada viza berishni tasdiqlovchi hujjat (CCVI) oladi.',
      'Tibbiy ko‘rik va jo‘nashdan oldingi o‘qishdan o‘tasiz, E-9 vizasi Koreya elchixonasida rasmiylashtiriladi.',
    ],
    where: [
      { t: 'Migratsiya agentligi — ro‘yxatdan o‘tish va tanlov', u: 'https://xorijdaish.uz' },
      { t: 'Koreya Respublikasi elchixonasi, konsullik bo‘limi (Toshkent)', u: 'https://overseas.mofa.go.kr/uz-ko/index.do' },
      { t: 'EPS tizimi — rus tilida', u: 'https://www.eps.go.kr/eo/langMain.eo?langCD=ru' },
    ],
  },
  JP: {
    steps: [
      'Yapon tili imtihoni (JFT-Basic yoki JLPT N4) va tanlagan sohangiz bo‘yicha malaka imtihonidan o‘ting.',
      'Yaponiyadagi ro‘yxatdan o‘tgan ish beruvchi bilan shartnoma tuzing (rasmiy vakansiyalar Migratsiya agentligida).',
      'Ish beruvchi Yaponiya immigratsiya xizmatidan siz uchun «Certificate of Eligibility» (COE) oladi.',
      'COE bilan Yaponiya elchixonasiga oldindan onlayn yozilib, viza hujjatlarini qog‘oz shaklida topshirasiz.',
      'COE amal qilish muddati ichida (odatda 3 oy) Yaponiyaga kirishingiz kerak.',
    ],
    where: [
      { t: 'Yaponiya elchixonasi (Toshkent) — onlayn navbat', u: 'https://www.uz.emb-japan.go.jp' },
      { t: 'Migratsiya agentligi vakansiyalari', u: 'https://xorijdaish.uz' },
    ],
  },
  DE: {
    steps: [
      'Diplomingiz Germaniyada tan olinishini tekshiring va ariza bering («Anerkennung» portali).',
      'Til sertifikatini oling: Chancenkarte uchun nemis A1 yoki ingliz B2; ish vizasi uchun odatda nemis B1.',
      'Milliy viza (90 kundan ortiq) arizasini Germaniya Tashqi ishlar vazirligining onlayn portalida to‘ldiring.',
      'TLScontact orqali Toshkentdagi viza markaziga navbatga yoziling — navbat ro‘yxatdan o‘tish tartibida beriladi.',
      'Belgilangan kuni hujjatlar va barmoq izini topshirasiz. Biometrik xorijga chiqish pasporti majburiy.',
    ],
    where: [
      { t: 'Germaniya elchixonasi — Toshkent, Sharaf Rashidov ko‘chasi, 15 · +998 78 120-84-40', u: 'https://taschkent.diplo.de' },
      { t: 'Onlayn ariza — Auslandsportal', u: 'https://digital.diplo.de' },
      { t: 'TLScontact — Toshkentdagi viza markazi (navbat)', u: 'https://visas-de.tlscontact.com/en-us/country/uz/vac/uzTAS2de' },
      { t: 'Diplomni tan oldirish portali', u: 'https://www.anerkennung-in-deutschland.de/html/en/index.php' },
    ],
  },
  US: {
    steps: [
      'DV lotereyasi ochilgan davrda faqat dvprogram.state.gov saytida BEPUL ro‘yxatdan o‘ting va tasdiq raqamini saqlang.',
      'Natijani o‘sha saytdagi «Entrant Status Check» bo‘limida o‘zingiz tekshirasiz — xat yoki SMS kelmaydi.',
      'Yutgan bo‘lsangiz, DS-260 immigratsiya anketasini onlayn to‘ldirasiz.',
      'Suhbat Toshkentdagi AQSh elchixonasida bo‘ladi: hujjatlar, tibbiy ko‘rik, viza to‘lovi.',
    ],
    warn: 'Faqat .gov manzilli rasmiy saytdan foydalaning. «Ro‘yxatdan o‘tkazib qo‘yamiz» deb pul so‘raganlar — firibgar.',
    where: [
      { t: 'AQSh elchixonasi (Toshkent) — viza bo‘limi', u: 'https://uz.usembassy.gov/visas/' },
      { t: 'DV lotereyasi — rasmiy sayt', u: 'https://dvprogram.state.gov' },
    ],
  },
  GB: {
    steps: [
      'GOV.UK dagi ro‘yxatdan rasmiy «scheme operator» (homiy tashkilot)ni tanlab, u orqali ishga qabul qilinasiz.',
      'Homiy sizga «Certificate of Sponsorship» raqamini beradi.',
      'Vizaga GOV.UK saytida onlayn ariza berasiz va to‘lovni qilasiz.',
      'Toshkentdagi viza arizalari markaziga borib, barmoq izi va rasm topshirasiz.',
    ],
    where: [
      { t: 'GOV.UK — Seasonal Worker vizasiga ariza', u: 'https://www.gov.uk/seasonal-worker-visa/apply' },
      { t: 'VFS Global — Toshkentdagi viza markazi', u: 'https://visa.vfsglobal.com/uzb/en/gbr' },
    ],
  },
  RU: {
    steps: [
      'Viza kerak emas. Chegarada migratsiya kartasida tashrif maqsadini «работа» (ish) deb ko‘rsating.',
      'Belgilangan muddatda migratsiya hisobiga turing (odatda ish beruvchi yoki yashash joyi egasi qiladi).',
      'Kirgan kundan boshlab 30 kun ichida patent uchun ariza bering: rus tili, tarix va huquq imtihoni sertifikati, tibbiy ko‘rik, sug‘urta, barmoq izi.',
      'Patent uchun har oy belgilangan avans to‘lovini o‘z vaqtida to‘lang — kechiktirsangiz patent bekor bo‘ladi.',
    ],
    where: [
      { t: 'Hujjatlar ko‘p migratsiya markazlarida (MMC) va MVD migratsiya bo‘limlarida qabul qilinadi', u: 'https://www.gosuslugi.ru/situation/foreign_citizens' },
      { t: 'Migratsiya agentligi vakolatxonalari — yordam va maslahat (Yordam bo‘limida)', u: '#yordam' },
    ],
  },
  KZ: {
    steps: [
      'Viza kerak emas, lekin ishlash uchun rasmiy ruxsat kerak.',
      'Yuridik shaxsda ishlasangiz — ruxsatnomani ish beruvchi rasmiylashtiradi.',
      'Jismoniy shaxslar (xonadonlar) uchun ishlasangiz — mehnat muhojiriga ruxsatnoma olinadi va oylik soliq to‘lanadi.',
      'Joriy talab va muddatlarni O‘zbekiston elchixonasi yoki Qozog‘iston davlat xizmatlaridan aniqlang.',
    ],
    where: [
      { t: 'O‘zbekiston elchixonasi (Astana)', u: 'https://uzembassy.kz' },
      { t: 'Enbek.kz — davlat bandlik portali', u: 'https://www.enbek.kz' },
    ],
  },
  TR: {
    steps: [
      'Avval Turkiyadagi ish beruvchi bilan kelishib, shartnoma tuzing.',
      'Ish beruvchi Turkiya Mehnat vazirligidan siz uchun ish ruxsatnomasi (çalışma izni) oladi.',
      'Siz Turkiyaning Toshkentdagi elchixonasi yoki konsulligida ish vizasini rasmiylashtirasiz.',
      'Turist sifatida kirib ishlash — deportatsiya va kirish taqiqiga olib keladi.',
    ],
    where: [{ t: 'Turkiyaning O‘zbekistondagi vakolatxonalari — rasmiy ro‘yxat', u: 'https://www.mfa.gov.tr/turkiye_nin-ozbekistan-daki-temsilcilikleri.en.mfa' }],
  },
  AE: {
    steps: [
      'Ish beruvchi bilan shartnoma tuzasiz — BAAda vizani faqat ish beruvchi (homiy) rasmiylashtiradi.',
      'Ish beruvchi ish ruxsatnomasi va kirish ruxsatnomasini oladi, siz shu bilan BAAga kirasiz.',
      'BAAda tibbiy ko‘rik, Emirates ID va yashash vizasi rasmiylashtiriladi.',
      'Siz o‘zingiz elchixonaga ariza bermaysiz. Viza uchun sizdan pul so‘ralsa — ehtiyot bo‘ling.',
    ],
    where: [{ t: 'BAA elchixonasi (Toshkent)', u: 'https://www.mofa.gov.ae/en/missions/tashkent' }],
  },
  PL: {
    steps: [
      'Polsha ish beruvchisi viloyat idorasidan siz uchun ish ruxsatnomasi (zezwolenie na pracę) oladi va sizga yuboradi.',
      'e-Konsulat tizimida milliy viza (D) uchun ro‘yxatdan o‘tib, anketani to‘ldirasiz va navbat olasiz.',
      'Belgilangan kuni Polshaning Toshkentdagi elchixonasiga hujjatlar bilan borasiz.',
    ],
    where: [
      { t: 'Polsha elchixonasi (Toshkent)', u: 'https://www.gov.pl/web/uzbekistan' },
      { t: 'e-Konsulat — viza arizasi va navbat', u: 'https://secure2.e-konsulat.gov.pl' },
    ],
  },
  IT: {
    steps: [
      'Italiyalik ish beruvchini toping — rasmiy vakansiyalar orqali yoki to‘g‘ridan-to‘g‘ri.',
      'Ish beruvchi hukumat belgilagan kunlarda Italiyada siz uchun ishga ruxsat — «nulla osta» so‘raydi.',
      'Nulla osta berilgach, Italiyaning Toshkentdagi elchixonasiga ish vizasi uchun hujjat topshirasiz.',
      'Italiyaga kelgach, qisqa muddat ichida yashash ruxsatnomasi (permesso di soggiorno) uchun ariza berasiz.',
    ],
    where: [
      { t: 'Italiya elchixonasi (Toshkent)', u: 'https://ambtashkent.esteri.it' },
      { t: 'Italiya viza portali', u: 'https://vistoperitalia.esteri.it' },
    ],
  },
  CZ: {
    steps: [
      'Chexiyalik ish beruvchi bilan kelishing — vakansiya chet elliklar uchun ochiq bo‘lishi kerak.',
      'Kelishuv bo‘yicha tanlov e’lonlarini Migratsiya agentligidan kuzating.',
      'Xodim kartasiga arizani Chexiyaning Toshkentdagi elchixonasiga oldindan navbat olib topshirasiz.',
      'Tasdiqlangach, Chexiyaga kelib kartani Ichki ishlar vazirligi bo‘limida olasiz.',
    ],
    where: [
      { t: 'Chexiya elchixonasi (Toshkent)', u: 'https://mzv.gov.cz/tashkent' },
      { t: 'Chexiya immigratsiya portali', u: 'https://ipc.gov.cz/en/' },
    ],
  },
  LV: {
    steps: [
      'Ish beruvchi vakansiyani Latviya bandlik agentligida ro‘yxatdan o‘tkazadi va sizga taklifnoma rasmiylashtiradi.',
      'Taklifnoma tasdiqlangach, milliy viza (D) uchun hujjatlarni tayyorlaysiz.',
      'Hujjatlarni Toshkentdagi VFS Global viza markazida topshirasiz.',
      'Savollar bo‘yicha — Latviya elchixonasi konsullik bo‘limi: +998 71 237-08-51 (ish kunlari 15:00–16:00).',
    ],
    where: [
      { t: 'Latviya elchixonasi — Toshkent, Lashkarbegi ko‘chasi', u: 'https://www2.mfa.gov.lv/en/uzbekistan' },
      { t: 'VFS Global — Latviya vizalari (Toshkent)', u: 'https://visa.vfsglobal.com/uzb/en/lva' },
    ],
  },
  HR: {
    steps: [
      'Ishni faqat litsenziyali agentlik yoki to‘g‘ridan-to‘g‘ri ish beruvchi orqali toping — litsenziyani reyestrdan tekshiring.',
      'Ish beruvchi Xorvatiya ichki ishlar vazirligidan yashash va ishlash ruxsatnomasini oladi.',
      'Ruxsatnoma asosida viza rasmiylashtirasiz. Xorvatiyaning O‘zbekistonda elchixonasi yo‘q — qaysi vakolatxona xizmat ko‘rsatishini rasmiy saytdan tekshiring.',
    ],
    where: [
      { t: 'Xorvatiya TIV — ish ruxsatnomasi', u: 'https://mvep.gov.hr/consular-information-145927/work-permit/180431' },
      { t: 'Litsenziyali agentliklar reyestri', u: 'https://my.gov.uz/uz/reyestr' },
    ],
  },
  IL: {
    steps: [
      'Kelishuv bo‘yicha tanlov e’lonlarini Migratsiya agentligidan kuzating.',
      'Tanlovdan o‘tsangiz, Isroil tomoni ish ruxsatnomasini tasdiqlaydi.',
      'Ish vizasi Isroilning Toshkentdagi elchixonasi orqali rasmiylashtiriladi.',
    ],
    where: [
      { t: 'Migratsiya agentligi', u: 'https://xorijdaish.uz' },
      { t: 'Isroil elchixonasi (Toshkent)', u: 'https://embassies.gov.il/tashkent' },
    ],
  },
  SA: {
    steps: [
      'Migratsiya agentligida Saudiya Arabistoni vakansiyalariga ro‘yxatdan o‘ting.',
      'Kasbiy malaka imtihonidan o‘ting.',
      'Ish beruvchi bilan shartnoma imzolanadi — ish vizasini ish beruvchi rasmiylashtiradi.',
      'Viza tasdiqlangach jo‘naysiz; turar joy va tibbiy sug‘urta ish beruvchi zimmasida.',
    ],
    where: [
      { t: 'Migratsiya agentligi', u: 'https://xorijdaish.uz' },
      { t: 'Saudiya Arabistoni viza platformasi', u: 'https://visa.mofa.gov.sa' },
    ],
  },
  CH: {
    steps: [
      'Shveytsariyalik ish beruvchidan ish taklifi oling.',
      'Ish beruvchi kanton migratsiya idorasidan ruxsat so‘raydi va mahalliy yoki YeI dan mos nomzod yo‘qligini isbotlaydi.',
      'Ruxsat tasdiqlangach, Shveytsariyaning Toshkentdagi elchixonasida milliy vizani rasmiylashtirasiz.',
    ],
    where: [
      { t: 'SEM — Shveytsariya migratsiya davlat kotibiyati', u: 'https://www.sem.admin.ch/sem/en/home/themen/arbeit/nicht-eu_efta-angehoerige.html' },
      { t: 'Shveytsariya elchixonasi (Toshkent)', u: 'https://www.eda.admin.ch/tashkent' },
    ],
  },
  CA: {
    steps: [
      'Til testini topshiring: IELTS yoki CELPIP (ingliz), TEF (fransuz).',
      'Express Entry uchun diplomingizni rasmiy tashkilotda baholating.',
      'IRCC saytida onlayn profil yoki ariza yarating.',
      'Barmoq izi topshirish uchun xat keladi. Toshkentda Kanada viza markazi yo‘q — eng yaqinini canada.ca dagi rasmiy qidiruvdan toping.',
    ],
    where: [
      { t: 'Kanada immigratsiya xizmati (IRCC)', u: 'https://www.canada.ca/en/immigration-refugees-citizenship.html' },
      { t: 'Kanada viza markazini topish', u: 'https://www.canada.ca/en/immigration-refugees-citizenship/corporate/contact-ircc/offices/find-visa-application-centre.html' },
    ],
  },
  AU: {
    steps: [
      'Kasbingiz Avstraliyaning malakali kasblar ro‘yxatida borligini tekshiring.',
      'Malakangizni vakolatli tashkilotda baholating va ingliz tili testini topshiring.',
      'ImmiAccount orqali onlayn ariza bering — ish beruvchi homiyligida yoki ball tizimida.',
    ],
    where: [{ t: 'Avstraliya vizalari — onlayn ariza', u: 'https://immi.homeaffairs.gov.au' }],
  },
  FI: {
    steps: [
      'Finlandiyalik ish beruvchi bilan shartnoma tuzing.',
      'Migri’ning «Enter Finland» xizmatida onlayn ariza bering.',
      'Shaxsingizni Finlandiya vakolatxonasida yoki viza markazida tasdiqlaysiz — joyini Migri saytidan tekshiring.',
    ],
    where: [{ t: 'Migri — Finlandiya migratsiya xizmati', u: 'https://migri.fi/en/home' }],
  },
  AT: {
    steps: [
      'Qizil-Oq-Qizil karta ball tizimi bo‘yicha o‘zingizni rasmiy portaldagi hisoblagichda tekshiring.',
      'Avstriyalik ish beruvchidan ish taklifi oling.',
      'Ariza Avstriya vakolatxonasida yoki ish beruvchi orqali Avstriyada topshiriladi; Toshkentda Avstriya hujjatlari VFS Global markazi orqali qabul qilinadi.',
    ],
    where: [
      { t: 'Avstriya migratsiya portali', u: 'https://www.migration.gv.at/en/' },
      { t: 'VFS Global — Avstriya (Toshkent)', u: 'https://visa.vfsglobal.com/uzb/en/aut/attend-centre/Tashkent' },
    ],
  },
  HU: {
    steps: [
      'Hozircha chet ellik ishchilarga yangi «mehmon ishchi» ruxsatnomasi berilmaydi.',
      'Vaziyat o‘zgarganini faqat Vengriya immigratsiya xizmatining rasmiy saytidan tekshiring.',
    ],
    where: [{ t: 'Vengriya immigratsiya xizmati', u: 'https://oif.gov.hu' }],
  },
}

export const FROM_ABROAD_NOTE =
  'Siz hozir boshqa davlatdasiz. Ko‘p davlatlar ish vizasini faqat fuqaroligingiz yoki qonuniy yashash joyingizdagi elchixonada beradi. Turist sifatida kirib, keyin ishchi vizasiga o‘tish odatda mumkin emas — rasmiy saytdan tekshiring.'

export const FROM_HOME_NOTE =
  'Siz O‘zbekistondasiz — bu eng qulay holat. Avval Migratsiya agentligining «Xorijda ish» tizimida rasmiy vakansiya bor-yo‘qligini tekshiring: u yerda ariza bepul va ish beruvchi tekshirilgan.'
