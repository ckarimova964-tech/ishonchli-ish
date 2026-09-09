// Rasmiy manbalar. Har bir havola 2026-yil 5-sentabrda tekshirilgan (HTTP 200).

export const HOTLINE = { label: 'Migratsiya agentligi ishonch telefoni', num: '1282' }

export const UZ_CHANNELS = [
  {
    name: '«Xorijda ish» axborot tizimi',
    org: 'Vazirlar Mahkamasi huzuridagi Migratsiya agentligi',
    what: "Xorijiy ish beruvchilarning rasmiy vakansiyalari. Ariza shu yerdan beriladi — ishchidan haq olinmaydi.",
    url: 'https://xorijdaish.uz',
    tag: 'ariza berish',
  },
  {
    name: 'Xususiy bandlik agentliklari reyestri',
    org: 'my.gov.uz',
    what: "Vositachi firmaning litsenziyasi bor-yo'qligini ism yoki STIR bo'yicha shu yerdan tekshiring.",
    url: 'https://my.gov.uz/uz/reyestr',
    tag: 'tekshirish',
  },
  {
    name: 'Litsenziya ma\u2019lumotlari',
    org: 'license.gov.uz',
    what: "Xorijga ishga joylashtirish litsenziyasi bo'yicha rasmiy xizmat sahifasi.",
    url: 'https://license.gov.uz/service/2561',
    tag: 'tekshirish',
  },
  {
    name: 'Xorijda ish pasporti uchun ariza',
    org: 'my.gov.uz · 418-xizmat',
    what: 'Xorijda mehnat faoliyati uchun hujjat rasmiylashtirish xizmati.',
    url: 'https://my.gov.uz/uz/service/418',
    tag: 'hujjat',
  },
  {
    name: 'Chiqishga cheklov bor-yo\u2018qligini tekshirish',
    org: 'my.gov.uz · 412-xizmat',
    what: "Chegaraga borib qaytarilmaslik uchun ketishdan oldin holatingizni tekshiring.",
    url: 'https://my.gov.uz/uz/service/412',
    tag: 'tekshirish',
  },
  {
    name: 'Migratsiya agentligi',
    org: 'gov.uz',
    what: "Agentlikning rasmiy sahifasi: yangiliklar, murojaat va aloqa ma'lumotlari.",
    url: 'https://gov.uz/oz/migration',
    tag: 'rasmiy',
  },
]

// Xorijiy rasmiy portallar. `q` — qidiruv so'zi qo'shiladigan havola shabloni.
export const FOREIGN_CHANNELS = [
  {
    name: '«Работа России»',
    country: 'Rossiya',
    org: 'Rossiya Mehnat vazirligi · trudvsem.ru',
    what: "Federal bandlik portali. Ish beruvchining telefoni va e-pochtasi ochiq — to'g'ridan-to'g'ri yozasiz.",
    url: 'https://trudvsem.ru/vacancy/search',
    q: 'https://trudvsem.ru/vacancy/search?text=',
  },
  {
    name: 'EURES',
    country: 'Yevropa Ittifoqi',
    org: 'Yevropa Komissiyasi',
    what: "EIga a'zo 30 dan ortiq davlatning rasmiy vakansiya bazasi.",
    url: 'https://eures.europa.eu/index_en',
    q: 'https://europa.eu/eures/portal/jv-se/search?lang=en&keywords=',
  },
  {
    name: 'Arbeitsagentur Jobsuche',
    country: 'Germaniya',
    org: 'Germaniya Federal mehnat agentligi',
    what: 'Germaniyaning davlat ish qidirish bazasi.',
    url: 'https://www.arbeitsagentur.de/jobsuche/',
    q: 'https://www.arbeitsagentur.de/jobsuche/suche?was=',
  },
  {
    name: 'Make it in Germany',
    country: 'Germaniya',
    org: 'Germaniya hukumati',
    what: 'Viza, diplom tan olinishi va ish sharoitlari bo\u2018yicha rasmiy qo\u2018llanma.',
    url: 'https://www.make-it-in-germany.com/en/',
  },
  {
    name: 'EPS — Employment Permit System',
    country: 'Janubiy Koreya',
    org: 'HRD Korea',
    what: "Koreyaga E-9 vizasi bilan borishning yagona qonuniy yo'li. EPS-TOPIK imtihoni shu tizim orqali.",
    url: 'https://www.eps.go.kr',
  },
  {
    name: 'Enbek.kz',
    country: 'Qozog\u2018iston',
    org: 'Elektron mehnat birjasi',
    what: 'Qozog\u2018istonning davlat bandlik portali.',
    url: 'https://www.enbek.kz',
  },
  {
    name: '\u0130\u015eKUR',
    country: 'Turkiya',
    org: 'Turkiya bandlik agentligi',
    what: 'Turkiyaning davlat ish topish idorasi va vakansiya bazasi.',
    url: 'https://www.iskur.gov.tr',
  },
  {
    name: 'JITCO',
    country: 'Yaponiya',
    org: 'Xalqaro malaka oshirish tashkiloti',
    what: "Yaponiyadagi stajirovka va «Specified Skills» dasturlari bo'yicha rasmiy ma'lumot.",
    url: 'https://www.jitco.or.jp/en/',
  },
]

export const STEPS = [
  {
    n: 1,
    h: 'Vositachini tekshiring',
    p: "Firma nomini yoki STIRni rasmiy reyestrdan qidiring. Litsenziyasi yo'q bo'lsa — pul bermang, hujjat bermang.",
    link: { t: 'Reyestrni ochish', u: 'https://my.gov.uz/uz/reyestr' },
  },
  {
    n: 2,
    h: 'Biometrik pasport va chiqish holati',
    p: "Pasport muddati yetarli bo'lsin. Chiqishga cheklov bor-yo'qligini oldindan tekshiring — bu chegarada qaytarilishning eng ko'p sababi.",
    link: { t: 'Cheklovni tekshirish', u: 'https://my.gov.uz/uz/service/412' },
  },
  {
    n: 3,
    h: '«Xorijda ish» tizimida ariza',
    p: "Rasmiy vakansiyalarga ariza shu tizim orqali beriladi. Ro'yxatdan o'tish ham, ariza ham ishchi uchun bepul.",
    link: { t: 'xorijdaish.uz', u: 'https://xorijdaish.uz' },
  },
  {
    n: 4,
    h: 'Til va malaka talabi',
    p: "Koreya uchun EPS-TOPIK, Yaponiya uchun N4 va «Specified Skills» imtihoni, Yevropa uchun kasbiy sertifikat talab qilinishi mumkin. Vakansiya sahifasida aynan nima talab qilinishi yozilgan.",
    link: { t: 'EPS tizimi', u: 'https://www.eps.go.kr' },
  },
  {
    n: 5,
    h: 'Shartnomani qo\u2018lingizga oling',
    p: "Maosh, ish soati, yashash joyi, yo'l puli — hammasi yozma shartnomada bo'lsin va nusxasi sizda qolsin. Yozilmagan va'da — va'da emas.",
  },
  {
    n: 6,
    h: 'Borgach ro\u2018yxatdan o\u2018ting',
    p: "Ko'pchilik aynan shu bosqichda qonunbuzarga aylanadi. Muddatni telefon kalendaringizga belgilab qo'ying.",
  },
]

export const RED_FLAGS = [
  { b: 'Oldindan katta pul so\u2018raydi', s: "Rasmiy tizimda ishchi ariza uchun pul to'lamaydi. Vositachilik haqini ish beruvchi to'laydi." },
  { b: 'Shartnoma yo\u2018q, faqat og\u2018zaki va\u2019da', s: "«Borgach hal qilamiz» — eng ko'p uchraydigan aldash gapi." },
  { b: 'Pasportingizni olib qo\u2018ymoqchi', s: 'Hech kim sizning pasportingizni saqlab turishga haqli emas.' },
  { b: 'Litsenziyasini ko\u2018rsatmaydi', s: "Reyestrda yo'q bo'lsa — bu firma xorijga ishga jo'natishga umuman haqli emas." },
  { b: 'Faqat shaxsiy kartaga o\u2018tkazing deydi', s: 'Rasmiy tashkilot hisob raqamiga oladi va kvitansiya beradi.' },
  { b: 'Shoshiltiradi', s: "«Bugun to'lamasangiz o'rin ketadi» — o'ylashga vaqt bermaslik uchun aytiladi." },
  { b: 'Maosh bozordagidan bir necha barobar yuqori', s: "Juda shirin taklif — tekshirilmagan bo'lsa, deyarli har doim yolg'on." },
  { b: 'Turistik viza bilan ishga chiqaraman deydi', s: 'Bu qonunbuzarlik — javobgarlik sizning zimmangizga tushadi.' },
]
