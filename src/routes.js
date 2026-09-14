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
}

export const FROM_ABROAD_NOTE =
  'Siz hozir boshqa davlatdasiz. Ko‘p davlatlar ish vizasini faqat fuqaroligingiz yoki qonuniy yashash joyingizdagi elchixonada beradi. Turist sifatida kirib, keyin ishchi vizasiga o‘tish odatda mumkin emas — rasmiy saytdan tekshiring.'

export const FROM_HOME_NOTE =
  'Siz O‘zbekistondasiz — bu eng qulay holat. Avval Migratsiya agentligining «Xorijda ish» tizimida rasmiy vakansiya bor-yo‘qligini tekshiring: u yerda ariza bepul va ish beruvchi tekshirilgan.'
