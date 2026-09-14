// O'zbekiston fuqarosi uchun davlatlarga qonuniy ishga borish yo'llari.
// Faktlar rasmiy manbalardan (2026-09-14). Qoidalar o'zgarib turadi — har bir kartochkada manba bor.
// status: 'ochiq' | 'shartli' | 'cheklangan'

export const ROUTES = [
  {
    country: 'Janubiy Koreya',
    flag: '🇰🇷',
    status: 'ochiq',
    summary: 'O‘zbekiston EPS dasturining hamkor davlati — Koreyaga ishchi faqat davlat orqali yuboriladi.',
    langs: [{ l: 'Koreys tili', lvl: 'EPS-TOPIK imtihoni' }],
    ways: [
      {
        name: 'EPS (E-9 viza) — davlatlararo dastur',
        steps: [
          'Migratsiya agentligi e’lon qilgan EPS-TOPIK imtihoniga ro‘yxatdan o‘ting (xorijdaish.uz).',
          'Imtihon va malaka sinovidan o‘tgach, ma’lumotingiz Koreya ish beruvchilariga yuboriladi.',
          'Ish beruvchi tanlasa — shartnoma, viza va jo‘nash davlat orqali rasmiylashtiriladi.',
        ],
      },
    ],
    warn: 'Koreyaga «vositachi orqali tezda» ishga olib borish va’dasi — aldov. EPS faqat davlat kanali orqali.',
    links: [
      { t: 'EPS rasmiy sayti', u: 'https://www.eps.go.kr' },
      { t: 'Xorijda ish — ro‘yxatdan o‘tish', u: 'https://xorijdaish.uz' },
    ],
  },
  {
    country: 'Yaponiya',
    flag: '🇯🇵',
    status: 'ochiq',
    summary: '«Specified Skilled Worker» (SSW) dasturi: kasb imtihoni + yapon tili.',
    langs: [{ l: 'Yapon tili', lvl: 'kamida N4 (JLPT) yoki JFT-Basic' }],
    ways: [
      {
        name: 'Specified Skilled Worker (SSW)',
        steps: [
          'Tanlagan sohangiz bo‘yicha malaka imtihonini topshiring (qurilish, ishlab chiqarish, oziq-ovqat, parvarish va h.k.).',
          'Yapon tilidan N4 darajasini tasdiqlang.',
          'Migratsiya agentligidagi Yaponiya vakansiyalariga ariza bering — ular talablarni aniq ko‘rsatadi.',
        ],
      },
    ],
    links: [
      { t: 'JITCO — rasmiy ma’lumot', u: 'https://www.jitco.or.jp/en/' },
      { t: 'Yaponiya vakansiyalari', u: 'https://xorijdaish.uz' },
    ],
  },
  {
    country: 'Germaniya',
    flag: '🇩🇪',
    status: 'shartli',
    summary: 'Malakali mutaxassislar uchun ochiq: diplomingiz tan olinishi yoki ball tizimi orqali.',
    langs: [
      { l: 'Nemis tili', lvl: 'Chancenkarte uchun kamida A1; ko‘p kasblarda B1–B2' },
      { l: 'yoki ingliz tili', lvl: 'Chancenkarte uchun B2' },
    ],
    ways: [
      {
        name: 'Chancenkarte — ish qidirish kartasi',
        steps: [
          'Kasbiy ma’lumot yoki oliy ma’lumotingiz Germaniyada tan olinsin, yoki ball tizimidan kamida 6 ball to‘plang.',
          'Nemis tilidan A1 yoki ingliz tilidan B2 darajasini tasdiqlang.',
          'Yashash xarajatini ko‘rsating: bloklangan hisobda oyiga 1 091 € (2026-yil miqdori).',
          'Germaniya elchixonasiga viza uchun ariza bering va Germaniyada ish qidiring.',
        ],
      },
      {
        name: 'Malakali mutaxassis vizasi',
        steps: [
          'Diplomingizni «Anerkennung in Deutschland» portali orqali tan oldiring.',
          'Germaniyadagi ish beruvchidan ish taklifi oling.',
          'Hamshiralar uchun Migratsiya agentligida Germaniya vakansiyalari bor — ular orqali boring.',
        ],
      },
    ],
    links: [
      { t: 'Make it in Germany', u: 'https://www.make-it-in-germany.com/en/visa-residence/opportunity-card/job-search' },
      { t: 'Diplomni tan oldirish', u: 'https://www.anerkennung-in-deutschland.de/' },
    ],
  },
  {
    country: 'Buyuk Britaniya',
    flag: '🇬🇧',
    status: 'shartli',
    summary: 'Mavsumiy ishchi vizasi — mevachilik va parrandachilikda, faqat litsenziyali operator orqali.',
    langs: [{ l: 'Ingliz tili', lvl: 'operator/ish beruvchi talabiga qarab' }],
    ways: [
      {
        name: 'Seasonal Worker visa',
        steps: [
          'Rasmiy litsenziyali «scheme operator» (homiy) sizga «certificate of sponsorship» berishi kerak.',
          'Mevachilikda 6 oygacha; parrandachilikda 2-oktyabrdan 31-dekabrgacha ishlaysiz.',
          'Viza yig‘imi — £340. Yetarli shaxsiy jamg‘arma borligini ko‘rsatasiz.',
        ],
      },
    ],
    warn: 'Homiylik sertifikati uchun sizdan pul so‘ralsa — bu qonunbuzarlik. Rasmiy yig‘im faqat viza uchun.',
    links: [{ t: 'gov.uk — Seasonal Worker visa', u: 'https://www.gov.uk/seasonal-worker-visa' }],
  },
  {
    country: 'AQSH',
    flag: '🇺🇸',
    status: 'cheklangan',
    summary: '2026-yil holatiga ko‘ra O‘zbekiston fuqarolari uchun ishga borish yo‘llari juda cheklangan.',
    langs: [{ l: 'Ingliz tili', lvl: 'deyarli barcha yo‘llar uchun yuqori daraja' }],
    ways: [
      {
        name: 'H-2A / H-2B mavsumiy ish vizalari',
        steps: [
          'O‘zbekiston H-2A va H-2B dasturlari uchun ruxsat etilgan davlatlar ro‘yxatida YO‘Q (USCIS).',
          'Demak «AQShga mavsumiy ish vizasi qilib beraman» degan har qanday taklif — aldov.',
        ],
      },
      {
        name: 'Immigratsion vizalar (green karta, lotereya)',
        steps: [
          'AQSH Davlat departamenti 2026-yil 21-yanvardan O‘zbekiston fuqarolariga immigratsion viza berishni to‘xtatib turibdi.',
          'Holat sud qarorlari bilan o‘zgarib turibdi — faqat travel.state.gov dan tekshiring.',
        ],
      },
      {
        name: 'H-1B — oliy ma’lumotli mutaxassislar',
        steps: [
          'Oliy ma’lumot va AQSH ish beruvchisining homiyligi talab qilinadi.',
          'Ariza ish beruvchi tomonidan beriladi, o‘rinlar soni cheklangan.',
        ],
      },
    ],
    warn: 'AQSH vizasini «kafolat bilan» va’da qilib pul so‘rashsa — 100% aldov.',
    links: [
      { t: 'USCIS — H-2 ro‘yxati', u: 'https://www.uscis.gov/newsroom/alerts/dhs-announces-countries-eligible-for-h-2a-and-h-2b-visa-programs' },
      { t: 'travel.state.gov — viza yangiliklari', u: 'https://travel.state.gov/content/travel/en/News/visas-news.html' },
    ],
  },
  {
    country: 'Rossiya',
    flag: '🇷🇺',
    status: 'ochiq',
    summary: 'Vizasiz kirish, ishlash uchun patent kerak.',
    langs: [{ l: 'Rus tili', lvl: 'patent uchun rus tili, tarix va qonunchilik imtihoni' }],
    ways: [
      {
        name: 'Patent asosida ishlash',
        steps: [
          'Kelgach belgilangan muddatda migratsiya hisobiga turing.',
          'Rus tili, tarix va qonunchilik asoslari imtihonini topshiring, tibbiy ko‘rikdan o‘ting.',
          'Patent oling va har oy uning to‘lovini o‘z vaqtida qiling — kechiksa patent bekor bo‘ladi.',
        ],
      },
    ],
    links: [
      { t: '«Работа России» — vakansiyalar', u: 'https://trudvsem.ru/vacancy/search' },
      { t: 'Rasmiy vakansiyalar (agentlik)', u: 'https://xorijdaish.uz' },
    ],
  },
  {
    country: 'Qozog‘iston',
    flag: '🇰🇿',
    status: 'ochiq',
    summary: 'Vizasiz kirish; ishlash uchun ruxsatnoma rasmiylashtiriladi.',
    langs: [{ l: 'Rus yoki qozoq tili', lvl: 'kundalik muloqot darajasida foydali' }],
    ways: [
      {
        name: 'Ruxsatnoma asosida ishlash',
        steps: [
          'Kelgach migratsiya hisobiga turing.',
          'Ish beruvchi yoki o‘zingiz ruxsatnoma rasmiylashtirasiz.',
          'Vakansiyalarni davlatning Enbek.kz portalidan qidiring.',
        ],
      },
    ],
    links: [{ t: 'Enbek.kz', u: 'https://www.enbek.kz' }],
  },
  {
    country: 'Polsha',
    flag: '🇵🇱',
    status: 'shartli',
    summary: 'Ish beruvchi ruxsatnoma olganidan keyin viza beriladi.',
    langs: [{ l: 'Polyak yoki ingliz tili', lvl: 'ish beruvchi talabiga qarab' }],
    ways: [
      {
        name: 'Ish ruxsatnomasi + milliy viza',
        steps: [
          'Polshadagi ish beruvchi siz uchun ish ruxsatnomasi oladi.',
          'Ruxsatnoma asosida Polsha elchixonasida ish vizasi olasiz.',
          'Vakansiyalarni davlatning rasmiy bazasidan qidiring.',
        ],
      },
    ],
    warn: 'Ruxsatnomani ish beruvchi oladi. Vositachi sizdan «ruxsatnoma puli» so‘rasa — ehtiyot bo‘ling.',
    links: [{ t: 'Polsha davlat vakansiyalar bazasi', u: 'https://oferty.praca.gov.pl/portal/lista-ofert' }],
  },
  {
    country: 'Turkiya',
    flag: '🇹🇷',
    status: 'shartli',
    summary: 'Turistik kirish ishlash huquqini bermaydi — ish ruxsatnomasini ish beruvchi oladi.',
    langs: [{ l: 'Turk tili', lvl: 'ko‘p ishlarda kerak' }],
    ways: [
      {
        name: 'Ish ruxsatnomasi',
        steps: [
          'Ish beruvchi Turkiya Mehnat vazirligidan siz uchun ruxsatnoma oladi.',
          'Ruxsatnomasiz ishlash — jarima va deportatsiyaga olib keladi.',
        ],
      },
    ],
    links: [{ t: 'İŞKUR — davlat bandlik agentligi', u: 'https://www.iskur.gov.tr' }],
  },
  {
    country: 'BAA',
    flag: '🇦🇪',
    status: 'shartli',
    summary: 'Ish vizasi faqat ish beruvchi homiyligida beriladi.',
    langs: [{ l: 'Ingliz tili', lvl: 'xizmat ko‘rsatish sohasida kerak' }],
    ways: [
      {
        name: 'Ish beruvchi homiyligidagi viza',
        steps: [
          'BAAdagi ish beruvchi ish ruxsatnomasi va rezidentlik vizasini rasmiylashtiradi.',
          'Turistik viza bilan kelib ishlash taqiqlanadi.',
        ],
      },
    ],
    links: [{ t: 'MOHRE — Mehnat vazirligi', u: 'https://www.mohre.gov.ae/' }],
  },
  {
    country: 'Kanada',
    flag: '🇨🇦',
    status: 'shartli',
    summary: 'Asosan malakali mutaxassislar uchun ball tizimi (Express Entry).',
    langs: [
      { l: 'Ingliz tili', lvl: 'IELTS yoki CELPIP' },
      { l: 'yoki fransuz tili', lvl: 'TEF / TCF' },
    ],
    ways: [
      {
        name: 'Express Entry',
        steps: [
          'Til imtihoni va diplom baholashini topshiring.',
          'Express Entry tizimida profil yarating — ball bo‘yicha taklif keladi.',
          'Ish takliflari uchun Kanada davlat Job Bank portalidan qidiring.',
        ],
      },
    ],
    links: [
      { t: 'Express Entry — rasmiy', u: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry.html' },
      { t: 'Job Bank', u: 'https://www.jobbank.gc.ca' },
    ],
  },
]
