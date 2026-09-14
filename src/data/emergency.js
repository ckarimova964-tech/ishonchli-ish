// Chet elda qiyin vaziyatga tushgan O'zbekiston fuqarolari uchun rasmiy kanallar.
// Har bir raqam va havola rasmiy manbadan tekshirilgan (2026-09-14):
//  - 1282 va +998 71 202-33-55 — Migratsiya agentligining rasmiy Telegram kanali (t.me/migratsiyaagentligi)
//  - consulate.mfa.uz/contact va (+998 71) 233-45-01 — TIV «Interaktiv konsullik xizmatlari» sahifasi
//  - Qaytish guvohnomasi tartibi — gov.uz/oz/advice/717/document/3275

export const CHANNELS = [
  {
    id: 'migratsiya',
    org: 'Migratsiya agentligi',
    what: 'Chet eldagi mehnat muhojirlari uchun: aldov, ish haqi berilmasligi, ish beruvchi bilan nizo, uyga qaytish masalalari.',
    phones: [
      { label: 'O‘zbekistondan', num: '1282' },
      { label: 'Chet eldan', num: '+998712023355', show: '+998 71 202-33-55' },
    ],
    links: [
      { t: 'Onlayn murojaat', u: 'https://xorijdaish.uz/service/appeal' },
      { t: 'Telegram kanal', u: 'https://t.me/migratsiyaagentligi' },
    ],
  },
  {
    id: 'konsul',
    org: 'Tashqi ishlar vazirligi — konsullik xizmati',
    what: 'Pasport yo‘qolishi, hibsga olinish, kasallik, vafot etish holatlari. Elchixona va konsulliklar orqali yordam.',
    phones: [{ label: 'Konsullik boshqarmasi', num: '+998712334501', show: '+998 71 233-45-01' }],
    links: [
      { t: 'Onlayn murojaat qoldirish', u: 'https://consulate.mfa.uz/contact' },
      { t: 'Elchixonalar ro‘yxati', u: 'https://gov.uz/mfa/uz/consular/consular/' },
      { t: 'Telegram kanal', u: 'https://t.me/uzbekmfa' },
    ],
  },
]

export const SITUATIONS = [
  {
    id: 'pasport',
    label: 'Pasportim yo‘qoldi yoki o‘g‘irlandi',
    channel: 'konsul',
    steps: [
      'Eng yaqin politsiya bo‘limiga borib, pasport yo‘qolgani haqida ma’lumotnoma (spravka) oling.',
      'O‘zingiz turgan davlatdagi O‘zbekiston elchixonasi yoki konsulligiga murojaat qiling — manzilini «Elchixonalar ro‘yxati»dan toping.',
      'Konsullik sizga «O‘zbekiston Respublikasiga qaytish guvohnomasi» beradi. Kerak bo‘ladi: politsiya ma’lumotnomasi, pasport nusxasi (bo‘lsa), 35×45 mm hajmdagi 2 ta rangli surat.',
      'Guvohnoma odatda 7–14 kunda tayyor bo‘ladi va 1 oy amal qiladi (kasallik yoki hibs kabi alohida holatda 3 oygacha).',
      'O‘zbekistonga qaytgach, 10 kun ichida guvohnomani ichki ishlar organiga topshirib, yangi pasport oling.',
    ],
    source: { t: 'gov.uz — qaytish guvohnomasi', u: 'https://gov.uz/oz/advice/717/document/3275' },
  },
  {
    id: 'ishhaqi',
    label: 'Ish haqi berilmayapti yoki aldandim',
    channel: 'migratsiya',
    steps: [
      'Hamma dalilni saqlang: shartnoma, yozishmalar, to‘lov cheklari, ish joyi manzili, ish beruvchining ismi va telefoni.',
      'Migratsiya agentligiga qo‘ng‘iroq qiling yoki onlayn murojaat qoldiring — mutaxassislar ish beruvchi bilan bog‘lanishga yordam beradi.',
      'Pul vositachiga to‘langan bo‘lsa, uning litsenziyasini my.gov.uz reyestridan tekshiring va murojaatda ko‘rsating.',
      'Hech qachon hujjatlaringizni (pasport, shartnoma) ish beruvchiga yoki vositachiga topshirib qo‘ymang.',
    ],
  },
  {
    id: 'hujjat',
    label: 'Pasportimni olib qo‘yishdi, majburan ishlatishyapti',
    channel: 'konsul',
    urgent: true,
    steps: [
      'Agar hayotingizga xavf bo‘lsa — avval shu davlatning favqulodda xizmatiga qo‘ng‘iroq qiling (ko‘p davlatlarda 112).',
      'Imkon bo‘lishi bilan elchixonaga yoki konsullik boshqarmasiga xabar bering: qayerdasiz, kim ushlab turibdi, necha kishisiz.',
      'Joylashuvingizni ishonchli yaqiningizga yuboring.',
      'Pasportni ushlab turish ko‘p davlatlarda jinoyat hisoblanadi — bu haqda politsiyaga ham ariza bering.',
    ],
  },
  {
    id: 'hibs',
    label: 'Hibsga olindim yoki politsiya bilan muammo',
    channel: 'konsul',
    steps: [
      'Tushunmagan hujjatingizni imzolamang. Tarjimon va konsullik vakili bilan uchrashishni talab qilish huquqingiz bor.',
      'O‘zbekiston elchixonasi yoki konsulligiga xabar berilishini so‘rang.',
      'Yaqinlaringiz konsullik boshqarmasiga onlayn murojaat qoldirishi mumkin — to‘liq ism, tug‘ilgan sana va joylashuvni yozsin.',
    ],
  },
  {
    id: 'kasal',
    label: 'Kasal bo‘ldim yoki baxtsiz hodisa',
    channel: 'konsul',
    steps: [
      'Avval shu davlatning tez yordam xizmatiga qo‘ng‘iroq qiling (ko‘p davlatlarda 112).',
      'Kasalxonadan olingan barcha hujjatlarni saqlang.',
      'Elchixona yoki konsullikka xabar bering — ular yaqinlaringiz bilan bog‘lanish va hujjatlarda yordam beradi.',
    ],
  },
  {
    id: 'qaytish',
    label: 'Uyga qaytolmayapman (pul yoki hujjat yo‘q)',
    channel: 'migratsiya',
    steps: [
      'Migratsiya agentligiga chet eldan qo‘ng‘iroq qiling va vaziyatingizni tushuntiring.',
      'Hujjatingiz yo‘q bo‘lsa — elchixonadan qaytish guvohnomasi oling (yuqoridagi «Pasportim yo‘qoldi» bandiga qarang).',
      'Kim bilan, qayerda turganingizni, telefon raqamingizni murojaatda aniq yozing.',
    ],
  },
]

// Vaqt mintaqasidan foydalanuvchi qayerdaligini taxmin qilish (ruxsat so'ramaydi)
export const TZ_COUNTRY = {
  'Asia/Tashkent': 'O‘zbekiston',
  'Asia/Samarkand': 'O‘zbekiston',
  'Europe/Moscow': 'Rossiya',
  'Europe/Samara': 'Rossiya',
  'Asia/Yekaterinburg': 'Rossiya',
  'Asia/Novosibirsk': 'Rossiya',
  'Asia/Krasnoyarsk': 'Rossiya',
  'Asia/Irkutsk': 'Rossiya',
  'Asia/Vladivostok': 'Rossiya',
  'Europe/Kaliningrad': 'Rossiya',
  'Asia/Almaty': 'Qozog‘iston',
  'Asia/Qyzylorda': 'Qozog‘iston',
  'Asia/Aqtobe': 'Qozog‘iston',
  'Asia/Bishkek': 'Qirg‘iziston',
  'Europe/Istanbul': 'Turkiya',
  'Asia/Seoul': 'Janubiy Koreya',
  'Asia/Tokyo': 'Yaponiya',
  'Europe/Berlin': 'Germaniya',
  'Europe/Warsaw': 'Polsha',
  'Europe/London': 'Buyuk Britaniya',
  'Asia/Dubai': 'BAA',
  'America/New_York': 'AQSH',
  'America/Chicago': 'AQSH',
  'America/Denver': 'AQSH',
  'America/Los_Angeles': 'AQSH',
  'America/Toronto': 'Kanada',
  'America/Vancouver': 'Kanada',
  'Europe/Riga': 'Latviya',
  'Europe/Zagreb': 'Xorvatiya',
  'Europe/Zurich': 'Shveytsariya',
  'Europe/Prague': 'Chexiya',
  'Europe/Vilnius': 'Litva',
}
