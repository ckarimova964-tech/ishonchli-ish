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
]

export const FROM_ABROAD_NOTE =
  'Siz hozir boshqa davlatdasiz. Ko‘p davlatlar ish vizasini faqat fuqaroligingiz yoki qonuniy yashash joyingizdagi elchixonada beradi. Turist sifatida kirib, keyin ishchi vizasiga o‘tish odatda mumkin emas — rasmiy saytdan tekshiring.'

export const FROM_HOME_NOTE =
  'Siz O‘zbekistondasiz — bu eng qulay holat. Avval Migratsiya agentligining «Xorijda ish» tizimida rasmiy vakansiya bor-yo‘qligini tekshiring: u yerda ariza bepul va ish beruvchi tekshirilgan.'
