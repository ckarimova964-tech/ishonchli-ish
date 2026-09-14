// Xorijda qiyin vaziyatga tushgan O'zbekiston fuqarolari uchun rasmiy yordam kanallari.
// Manbalar (2026-09-14 da tekshirilgan):
//  - Migratsiya agentligi raqamlari: gov.uz/oz/migration/pages/agentlikning-barcha-raqamlari_ (yangilangan 2026-04-02)
//  - Tashqi ishlar vazirligi: gov.uz/oz/mfa/contacts
//  - Elchixona telefonlari — har bir elchixonaning o'z rasmiy saytidan olingan
// Raqam qo'shish yoki o'zgartirishdan oldin albatta rasmiy manbadan tekshiring.

export const HOME_CONTACTS = {
  mfa: {
    name: 'Tashqi ishlar vazirligi',
    hotline: '1164',
    phone: '+998 71 239-46-35',
    email: 'info@mfa.uz',
    address: '100003, Toshkent, Islom Karimov ko‘chasi, 45A',
    url: 'https://gov.uz/oz/mfa/contacts',
    embassies: 'https://gov.uz/oz/mfa/sections/o-zbekiston-respublikasining-xorijdagi-diplomatik-vakolatxonalari-va-konsullik-muassasalari_',
  },
  migration: {
    name: 'Migratsiya agentligi',
    hotline: '1282',
    phone: '+998 71 202-33-55',
    appeal: 'https://xorijdaish.uz/service/appeal',
    url: 'https://gov.uz/oz/migration/pages/agentlikning-barcha-raqamlari_',
  },
}

// Davlatlar: mahalliy favqulodda raqam, elchixona va Migratsiya agentligi vakolatxonalari
export const COUNTRIES = [
  {
    id: 'RU',
    name: 'Rossiya',
    emergency: [{ label: 'Yagona favqulodda xizmat', num: '112' }],
    embassy: { name: 'O‘zbekiston elchixonasi (Moskva)', phone: '+7 499 238-36-20', url: 'http://www.uzembassy.ru/' },
    offices: [
      { city: 'Moskva', addr: '1-Kazachiy tor ko‘chasi, 11/2 (metro Polyanka)', phones: ['+7 925 045-47-44'] },
      { city: 'Sankt-Peterburg', addr: '4-ya Krasnoarmeyskaya ko‘chasi, 4-A', phones: ['+7 951 680-95-97'] },
      { city: 'Yekaterinburg', addr: 'Karla Libknexta ko‘chasi, 22', phones: ['+7 936 251-76-21'] },
      { city: 'Krasnodar', addr: '1-May ko‘chasi, 298/4', phones: ['+7 980 130-63-07'] },
      { city: 'Novosibirsk', addr: 'Semi Shamshinix ko‘chasi, 30', phones: ['+7 932 327-00-04'] },
      { city: 'Samara', addr: '', phones: ['+7 925 750-87-57'] },
      { city: 'Blagoveshchensk (Amur viloyati)', addr: 'Gorkiy ko‘chasi, 87', phones: ['+7 925 657-67-18'] },
    ],
  },
  {
    id: 'KZ',
    name: 'Qozog‘iston',
    emergency: [{ label: 'Yagona favqulodda xizmat', num: '112' }],
    embassy: { name: 'O‘zbekiston elchixonasi (Astana)', phone: '+7 7172 95-42-52', url: 'https://uzembassy.kz' },
    offices: [
      // Manbada raqam shu ko'rinishda berilgan
      { city: 'Chimkent', addr: 'Beybitshilik ko‘chasi, 64 («Aydana plaza» mehmonxonasi yonida)', phones: ['+7717304400'] },
    ],
  },
  {
    id: 'TR',
    name: 'Turkiya',
    emergency: [{ label: 'Yagona favqulodda xizmat', num: '112' }],
    embassy: null,
    offices: [
      { city: 'Istanbul', addr: 'Levent mahallasi, Lale Sk. No 8, Beşiktaş', phones: ['+90 212 323-20-37'], whatsapp: '+905535411717' },
      { city: 'Anqara', addr: 'Sancak mahallasi, 549-ko‘cha, 3-uy, Yıldız-Çankaya', phones: ['+90 312 441-17-46', '+90 312 441-38-71'], whatsapp: '+905056791545', email: 'avtm.ankara@mail.ru' },
    ],
  },
  {
    id: 'KR',
    name: 'Janubiy Koreya',
    emergency: [
      { label: 'Politsiya', num: '112' },
      { label: 'Tez yordam va o‘t o‘chirish', num: '119' },
      { label: 'Chet elliklar uchun ma’lumot markazi (ko‘p tilli)', num: '1345' },
    ],
    embassy: { name: 'O‘zbekiston elchixonasi (Seul)', phone: '', url: 'https://korea.mfa.uz' },
    offices: [
      { city: 'Seul', addr: 'Jung-gu, Jangchungdan-ro 213, 10-qavat, 1003-xona', phones: ['+82 2 2285-1341', '+82 2 2285-1343', '+82 10 3987-1661'] },
    ],
  },
  {
    id: 'JP',
    name: 'Yaponiya',
    emergency: [
      { label: 'Politsiya', num: '110' },
      { label: 'Tez yordam va o‘t o‘chirish', num: '119' },
    ],
    embassy: { name: 'O‘zbekiston elchixonasi (Tokio)', phone: '+81 3 6277-3442', phoneNote: 'konsullik masalalari', url: 'https://www.uzbekistan.jp/site/index?language=en' },
    offices: [],
  },
  {
    id: 'AE',
    name: 'BAA',
    emergency: [
      { label: 'Politsiya', num: '999' },
      { label: 'Tez yordam', num: '998' },
    ],
    embassy: { name: 'O‘zbekiston elchixonasi (Abu-Dabi)', phone: '+971 2 448-82-15', url: 'https://uzembassy.ae' },
    offices: [],
  },
  {
    id: 'DE',
    name: 'Germaniya',
    emergency: [
      { label: 'Politsiya', num: '110' },
      { label: 'Tez yordam va o‘t o‘chirish', num: '112' },
    ],
    embassy: { name: 'O‘zbekiston elchixonasi (Berlin)', phone: '+49 30 394-098-0', url: 'https://uzbekistan.de' },
    offices: [],
  },
  {
    id: 'GB',
    name: 'Buyuk Britaniya',
    emergency: [{ label: 'Favqulodda xizmat', num: '999' }],
    embassy: { name: 'O‘zbekiston elchixonasi (London)', phone: '', url: 'https://www.uzbekembassy.org' },
    offices: [],
  },
  {
    id: 'US',
    name: 'AQSh',
    emergency: [{ label: 'Favqulodda xizmat', num: '911' }],
    embassy: { name: 'O‘zbekiston elchixonasi (Vashington)', phone: '+1 202 887-5300', url: 'https://www.uzbekistan.org' },
    offices: [],
  },
  {
    id: 'PL',
    name: 'Polsha',
    emergency: [{ label: 'Yagona favqulodda xizmat', num: '112' }],
    embassy: { name: 'O‘zbekiston elchixonasi (Varshava)', phone: '', url: 'https://poland.mfa.uz' },
    offices: [],
  },
  {
    id: 'OTHER',
    name: 'Boshqa davlat',
    emergency: [{ label: 'Ko‘p davlatlarda favqulodda raqam', num: '112' }],
    embassy: null,
    offices: [],
  },
]

// Telefon mintaqasidan taxminiy davlatni aniqlash (ruxsat so'ramaydi, faqat oldindan tanlash uchun)
const TZ = [
  ['Asia/Tashkent', 'UZ'], ['Asia/Samarkand', 'UZ'],
  ['Europe/Moscow', 'RU'], ['Europe/Samara', 'RU'], ['Europe/Volgograd', 'RU'], ['Europe/Kaliningrad', 'RU'],
  ['Asia/Yekaterinburg', 'RU'], ['Asia/Omsk', 'RU'], ['Asia/Novosibirsk', 'RU'], ['Asia/Krasnoyarsk', 'RU'],
  ['Asia/Irkutsk', 'RU'], ['Asia/Yakutsk', 'RU'], ['Asia/Vladivostok', 'RU'], ['Asia/Magadan', 'RU'],
  ['Asia/Almaty', 'KZ'], ['Asia/Qostanay', 'KZ'], ['Asia/Aqtobe', 'KZ'], ['Asia/Aqtau', 'KZ'], ['Asia/Atyrau', 'KZ'], ['Asia/Oral', 'KZ'], ['Asia/Qyzylorda', 'KZ'],
  ['Europe/Istanbul', 'TR'], ['Asia/Seoul', 'KR'], ['Asia/Tokyo', 'JP'], ['Asia/Dubai', 'AE'],
  ['Europe/Berlin', 'DE'], ['Europe/London', 'GB'], ['Europe/Warsaw', 'PL'], ['America/', 'US'],
]

export function guessCountry() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
    const hit = TZ.find(([prefix]) => tz.startsWith(prefix))
    return hit ? hit[1] : null
  } catch {
    return null
  }
}

export const SITUATIONS = [
  {
    id: 'passport',
    label: 'Pasportim yo‘qoldi yoki olib qo‘yildi',
    steps: [
      'Mahalliy politsiyaga yo‘qotish haqida ariza bering va ma’lumotnoma oling — elchixonada so‘raladi.',
      'Eng yaqin O‘zbekiston elchixonasi yoki konsulligiga boring. Pasport yo‘qolgan yoki muddati tugagan fuqaroga «O‘zbekistonga qaytish guvohnomasi» beriladi.',
      'Pasportingiz nusxasi, ID-karta yoki boshqa hujjatingiz bo‘lsa — o‘zingiz bilan oling, jarayon tezlashadi.',
      'Ish beruvchi pasportingizni olib qo‘ygan bo‘lsa — bu qonunbuzarlik. Migratsiya agentligi vakolatxonasiga yoki politsiyaga xabar bering.',
    ],
  },
  {
    id: 'wages',
    label: 'Ish haqimni bermayapti',
    steps: [
      'Shartnoma, ish vaqti yozuvlari, yozishmalar, pul o‘tkazmalari — hamma dalilni saqlang, rasmga oling.',
      'Migratsiya agentligining shu davlatdagi vakolatxonasiga murojaat qiling — ular mehnat huquqlari bo‘yicha yordam beradi.',
      'Rasmiy murojaatni xorijdaish.uz orqali ham yuborishingiz mumkin.',
      'Ish beruvchiga yolg‘iz o‘zingiz bosim o‘tkazmang — tahdid bo‘lsa, darhol politsiyaga qo‘ng‘iroq qiling.',
    ],
  },
  {
    id: 'trafficking',
    label: 'Aldandim, majburan ishlatishyapti',
    steps: [
      'Xavf ostida bo‘lsangiz — birinchi navbatda mahalliy favqulodda raqamga qo‘ng‘iroq qiling.',
      'Imkon bo‘lishi bilan elchixonaga yoki Migratsiya agentligi vakolatxonasiga joylashuvingizni yuboring.',
      'Qarindoshingizga manzilingiz va ish beruvchi haqida ma’lumot qoldiring.',
      'O‘zbekistondagi yaqinlaringiz 1282 (Migratsiya agentligi) va 1164 (Tashqi ishlar vazirligi) ga qo‘ng‘iroq qilishi mumkin.',
    ],
  },
  {
    id: 'police',
    label: 'Politsiya yoki migratsiya xizmati bilan muammo',
    steps: [
      'Tushunmagan hujjatingizga imzo chekmang. Tarjimon va elchixona bilan bog‘lanishni talab qiling.',
      'Elchixona yoki konsullikka ushlanganingiz haqida xabar berilishini so‘rang — bu sizning huquqingiz.',
      'Qarindoshlaringizga qayerda ekaningizni bildiring.',
    ],
  },
  {
    id: 'health',
    label: 'Kasal bo‘ldim yoki jarohat oldim',
    steps: [
      'Hayot uchun xavf bo‘lsa — darhol mahalliy tez yordam raqamiga qo‘ng‘iroq qiling.',
      'Elchixonaga holatingiz va qaysi shifoxonada ekaningizni bildiring.',
      'Tibbiy hujjatlar va cheklarni saqlang.',
    ],
  },
  {
    id: 'return',
    label: 'Uyga qaytolmayapman',
    steps: [
      'Elchixona yoki konsullikka murojaat qiling — hujjat masalasini hal qilishadi.',
      'Migratsiya agentligi vakolatxonasiga ham xabar bering.',
      'Qarindoshlaringiz O‘zbekistonda 1164 va 1282 raqamlariga murojaat qilishi mumkin.',
    ],
  },
]
