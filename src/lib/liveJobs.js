// Jonli ma'lumot: rasmiy bazalarga to'g'ridan-to'g'ri murojaat qiladi.
// Uchala API ham CORS'ga ruxsat bergan va kalit talab qilmaydi.
// So'rov bloklansa (masalan Artifact ichida) — sayt yig'ilgan nusxa bilan ishlayveradi.
import { tr, money } from './translit.js'
import SOATO from '../soato.json'

const NATIONAL = 'https://ishapi.mehnat.uz/api/v1/vacancies'
const AGENCY = 'https://lm-api.xorijdaish.uz/api/labour-migration/vacancies'
const RUSSIA = 'https://opendata.trudvsem.ru/api/v1/vacancies'
const CUR = { JPY: '¥', EUR: '€', USD: '$', RUB: '₽', KRW: '₩', PLN: 'zł', UZS: "so'm" }

export const PER_PAGE = 50

/** Kasb bo'limlari — har biriga bir nechta so'rov so'zi (lotin, kirill, rus). */
export const CATEGORIES = [
  { id: 'ofitsiant', label: 'Ofitsiant', uz: ['ofitsiant', 'barmen', 'idish yuvuvchi'], ru: ['официант', 'бармен'] },
  // To'yxonalar bazada «to'yxona» emas, «...bazmgohi», «...tantanalar saroyi» nomi bilan ro'yxatda
  { id: 'toyxona', label: 'To‘yxona · bazmgoh', uz: ['bazm', 'tantana', "to'y saroyi", 'restorani', 'kafesi'], ru: ['банкетный', 'официант банкет'] },
  { id: 'oshxona', label: 'Oshxona · restoran', uz: ['oshpaz', 'restoran', 'oshxona', 'qandolatchi'], ru: ['повар', 'кондитер'] },
  { id: 'qurilish', label: 'Qurilish', uz: ['qurilish', 'quruvchi', 'suvoqchi', 'gisht teruvchi', 'beton'], ru: ['строительн', 'каменщик', 'бетонщик'] },
  { id: 'it', label: 'IT · dasturchi', uz: ['dasturchi', 'programmist', 'kompyuter', 'axborot texnologiya'], ru: ['программист', 'системный администратор'] },
  { id: 'talim', label: "Ta'lim · o'qituvchi", uz: ['oqituvchi', 'muallim', 'tarbiyachi', 'trener'], ru: ['учитель', 'преподаватель', 'воспитатель'] },
  { id: 'tibbiyot', label: 'Tibbiyot', uz: ['shifokor', 'hamshira', 'feldsher', 'laborant'], ru: ['врач', 'медсестра'] },
  { id: 'savdo', label: 'Savdo · xizmat', uz: ['sotuvchi', 'kassir', 'administrator', 'menejer'], ru: ['продавец', 'кассир'] },
  { id: 'transport', label: 'Transport', uz: ['haydovchi', 'ekspeditor', 'logistika'], ru: ['водитель', 'экспедитор'] },
  { id: 'ishlab', label: 'Ishlab chiqarish', uz: ['payvandchi', 'chilangar', 'tokar', 'operator', 'tikuvchi'], ru: ['сварщик', 'слесарь', 'токарь', 'швея'] },
  { id: 'qishloq', label: "Qishloq xo'jaligi", uz: ['agronom', 'fermer', 'issiqxona', 'chorvador'], ru: ['агроном', 'тракторист'] },
  { id: 'buxgalter', label: 'Buxgalteriya · ofis', uz: ['buxgalter', 'iqtisodchi', 'kotib', 'hisobchi'], ru: ['бухгалтер', 'экономист'] },
  { id: 'xizmat', label: 'Xizmat ko‘rsatish', uz: ['farrosh', 'qorovul', 'soch', 'kir yuvish'], ru: ['уборщик', 'охранник', 'парикмахер'] },
  { id: 'muhandis', label: 'Muhandislik', uz: ['muhandis', 'texnik', 'energetik', 'elektrik'], ru: ['инженер', 'электрик'] },
]

async function getJson(url, ms = 12000) {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), ms)
  try {
    const r = await fetch(url, { signal: ctrl.signal, headers: { Accept: 'application/json' } })
    if (!r.ok) throw new Error(String(r.status))
    return await r.json()
  } finally {
    clearTimeout(t)
  }
}

/** SOATO kodidan aniq joyni chiqaradi: viloyat + tuman/shahar. */
export function placeOf(code7, code4) {
  const region = SOATO.regions[code4 || String(code7 || '').slice(0, 4)]
  const district = SOATO.districts[code7]
  return {
    region: region?.name || '',
    district: district?.name || '',
    center: district?.center || '',
    full: [region?.name, district?.name].filter(Boolean).join(' · '),
  }
}

function mapNational(v) {
  let prof = {}
  let phones = []
  try {
    prof = JSON.parse(v.company?.profile_data || '{}')
  } catch {
    /* bo'sh */
  }
  try {
    phones = JSON.parse(v.company?.phones || '[]')
  } catch {
    /* bo'sh */
  }
  const phone = prof.phone_vacancies || phones[0] || ''
  const code7 = v.vacancy_soato_code || v.company_soato_code7 || v.company_soato_code
  const loc = placeOf(code7, v.company_soato_code4)
  return {
    id: 'uzl-' + v.id,
    src: 'local',
    title: tr(v.position_name || ''),
    titleRu: v.position_name_ru || null,
    occ: tr(v.structure_name || '') || 'Vakansiya',
    country: "O'zbekiston",
    region: loc.region,
    district: loc.district,
    center: loc.center,
    place: loc.full,
    addr: prof.actual_address || prof.address || v.vacancy_address || '',
    employer: v.company_name,
    tin: v.company_tin || null,
    pay: money(v.position_salary),
    cur: 'UZS',
    curSym: CUR.UZS,
    rate: v.position_rate ? Number(v.position_rate) : null,
    unit: tr(v.structure_name || ''),
    phone: phone ? '+' + String(phone).replace(/[^0-9]/g, '') : '',
    posted: (v.date_start || '').slice(0, 10),
    views: v.detail?.view_count || 0,
    url: 'https://ish.mehnat.uz/vacancies/' + v.id,
    open: true,
  }
}

function mapAgency(v) {
  const from = money(v.salary_dollar_from)
  const to = money(v.salary_dollar_to)
  const one = money(v.salary_dollar)
  return {
    id: 'uz-' + v.id,
    src: 'uz',
    title: v.occupation_name_uz,
    sector: v.sector_name_uz,
    country: v.country_name_uz,
    place: v.country_name_uz,
    employer: v.employer_name,
    pay: from && to ? `${from}–${to}` : one,
    cur: v.currency,
    curSym: CUR[v.currency] || v.currency,
    langs: [],
    posted: (v.created_at || '').slice(0, 10),
    url: `https://xorijdaish.uz/vacancy?vacancy_id=${v.id}`,
    open: true,
  }
}

function mapRussia(w) {
  const v = w.vacancy || w
  const contacts = v.contact_list || []
  const phone = contacts.find(c => /елефон/i.test(c.contact_type))?.contact_value || ''
  const email =
    v.company?.email || contacts.find(c => /почт/i.test(c.contact_type))?.contact_value || ''
  const addr = v.addresses?.address?.[0]?.location || ''
  return {
    id: 'ru-' + v.id,
    src: 'ru',
    title: v['job-name'],
    occ: v['job-name'],
    country: 'Rossiya',
    region: v.region?.name || '',
    district: '',
    place: v.region?.name || '',
    addr,
    employer: v.company?.name || '',
    pay: money(v.salary_min || v.salary),
    cur: 'RUB',
    curSym: '₽',
    exp: v.requirement?.experience ? `${v.requirement.experience} yil tajriba` : 'Tajriba talab qilinmaydi',
    edu: v.requirement?.education || null,
    schedule: v.schedule || null,
    employment: v.employment || null,
    duties: (v.requirements || v.duty || '').replace(/\s+/g, ' ').slice(0, 320),
    term: (v.term?.text || '').replace(/\s+/g, ' ').slice(0, 220),
    email,
    phone,
    updated: (v.date_modify || '').slice(0, 10),
    url: v.vac_url,
    open: true,
  }
}

/** Milliy bazadan qidiruv — sahifama-sahifa, 79 000+ e'lon ichidan. */
export async function searchNational(query, page = 1, perPage = PER_PAGE) {
  const j = await getJson(
    `${NATIONAL}?search=${encodeURIComponent(query)}&per_page=${perPage}&page=${page}`
  )
  const d = j?.data
  const list = d?.data || []
  return {
    rows: list.map(mapNational).filter(v => v.title && v.employer),
    total: d?.total ?? list.length,
    page: d?.current_page ?? page,
    lastPage: d?.last_page ?? 1,
  }
}

/** Rossiya federal portalidan qidiruv. */
export async function searchRussia(query, page = 1, perPage = 30) {
  const offset = (page - 1) * perPage
  const j = await getJson(
    `${RUSSIA}?text=${encodeURIComponent(query)}&limit=${perPage}&offset=${offset}`
  )
  const list = j?.results?.vacancies || []
  const total = j?.meta?.total ?? list.length
  return {
    rows: list.map(mapRussia).filter(v => v.title && v.employer),
    total,
    page,
    lastPage: Math.ceil(total / perPage) || 1,
  }
}

/** Bir nechta so'z bo'yicha qidirib, natijalarni birlashtiradi (kasb bo'limlari uchun). */
export async function searchManyNational(terms, perPage = 40) {
  const res = await Promise.allSettled(terms.map(t => searchNational(t, 1, perPage)))
  const rows = []
  const seen = new Set()
  let total = 0
  let lastPage = 1
  for (const r of res) {
    if (r.status !== 'fulfilled') continue
    total += r.value.total
    lastPage = Math.max(lastPage, r.value.lastPage || 1)
    for (const v of r.value.rows) {
      if (seen.has(v.id)) continue
      seen.add(v.id)
      rows.push(v)
    }
  }
  return { rows, total, lastPage }
}

/** Migratsiya agentligining barcha ochiq vakansiyalari. */
export async function fetchAgency() {
  const first = await getJson(AGENCY)
  const d = first?.data
  if (!d) return []
  const rows = [...d.data]
  const pages = Math.min(d.last_page || 1, 12)
  const rest = await Promise.allSettled(
    Array.from({ length: Math.max(pages - 1, 0) }, (_, i) => getJson(`${AGENCY}?page=${i + 2}`))
  )
  for (const r of rest) if (r.status === 'fulfilled') rows.push(...(r.value?.data?.data || []))
  return rows.map(mapAgency)
}

/** Milliy bazadagi jami e'lonlar soni. */
export async function nationalTotal() {
  const j = await getJson(`${NATIONAL}?per_page=1`)
  return j?.data?.total ?? null
}

// ---------- Dunyo bo'ylab: xususiy ochiq manbalar ----------
// Remotive — dunyo bo'yicha masofaviy ishlar; Arbeitnow — Yevropa (asosan Germaniya).
// Ikkalasi ham CORS'ga ruxsat bergan, kalit talab qilmaydi. Ular so'rovni kamroq yuborishni
// so'raydi — shuning uchun faqat foydalanuvchi qidirganda so'raymiz va natijani seans davomida saqlaymiz.
const REMOTIVE = 'https://remotive.com/api/remote-jobs'
const ARBEITNOW = 'https://www.arbeitnow.com/api/job-board-api'

// O'zbekcha so'z → ingliz va nemis e'lonlarida uchraydigan so'zlar
const WORLD_DICT = {
  ofitsiant: ['waiter', 'kellner', 'service'],
  barmen: ['bartender', 'barkeeper'],
  oshpaz: ['cook', 'chef', 'koch'],
  restoran: ['restaurant', 'gastronomie'],
  quruvchi: ['construction', 'bau'],
  qurilish: ['construction', 'bau'],
  dasturchi: ['developer', 'software', 'entwickler'],
  programmist: ['developer', 'software', 'entwickler'],
  kompyuter: ['it', 'support'],
  oqituvchi: ['teacher', 'tutor', 'lehrer'],
  hamshira: ['nurse', 'pflege'],
  shifokor: ['doctor', 'arzt'],
  sotuvchi: ['sales', 'verkäufer', 'verkauf'],
  kassir: ['cashier', 'kasse'],
  haydovchi: ['driver', 'fahrer'],
  payvandchi: ['welder', 'schweißer'],
  elektrik: ['electrician', 'elektriker'],
  muhandis: ['engineer', 'ingenieur'],
  buxgalter: ['accountant', 'buchhalter'],
  menejer: ['manager'],
  administrator: ['administrator', 'office'],
  farrosh: ['cleaner', 'reinigung'],
  tikuvchi: ['tailor', 'schneider'],
  operator: ['operator'],
  dizayner: ['designer'],
  marketing: ['marketing'],
  tarjimon: ['translator', 'übersetzer'],
  logistika: ['logistics', 'logistik'],
}

export function worldTerms(words) {
  const out = new Set()
  for (const w of words) {
    const k = String(w || '').toLowerCase().replace(/[‘’'`ʼ]/g, '').trim()
    if (!k) continue
    const hit = Object.entries(WORLD_DICT).find(([uz]) => k.includes(uz) || uz.includes(k))
    if (hit) hit[1].forEach(t => out.add(t))
    else if (/^[a-zäöüß\s-]{3,}$/i.test(k)) out.add(k) // ingliz/nemischa yozilgan bo'lsa o'zi
  }
  return [...out]
}

function mapRemotive(v) {
  return {
    id: 'rm-' + v.id,
    src: 'world',
    provider: 'Remotive',
    title: v.title,
    employer: v.company_name,
    country: 'Masofaviy (dunyo)',
    place: v.candidate_required_location || 'Masofaviy',
    pay: v.salary || null,
    tags: (v.tags || []).slice(0, 5),
    jobType: v.job_type || '',
    posted: (v.publication_date || '').slice(0, 10),
    url: v.url,
    open: true,
  }
}

function mapArbeitnow(v) {
  return {
    id: 'an-' + v.slug,
    src: 'world',
    provider: 'Arbeitnow',
    title: v.title,
    employer: v.company_name,
    country: v.remote ? 'Masofaviy (Yevropa)' : 'Yevropa',
    place: v.location || '',
    pay: null,
    tags: (v.tags || []).slice(0, 5),
    jobType: (v.job_types || []).join(', '),
    posted: v.created_at ? new Date(v.created_at * 1000).toISOString().slice(0, 10) : '',
    url: v.url,
    open: true,
  }
}

function cacheGet(key) {
  try {
    const raw = sessionStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function cacheSet(key, val) {
  try {
    sessionStorage.setItem(key, JSON.stringify(val))
  } catch {
    /* saqlab bo'lmadi — muhim emas */
  }
}

/** Dunyo bo'ylab qidiruv. `words` — o'zbekcha yoki inglizcha so'zlar. */
export async function searchWorld(words) {
  const terms = worldTerms(words)
  if (!terms.length) return { rows: [], total: 0, terms }
  const key = 'world:' + terms.join('|')
  const cached = cacheGet(key)
  if (cached) return cached

  const [rem, arb] = await Promise.allSettled([
    getJson(`${REMOTIVE}?search=${encodeURIComponent(terms[0])}&limit=40`),
    getJson(ARBEITNOW),
  ])
  const rows = []
  if (rem.status === 'fulfilled') {
    const jobs = rem.value?.jobs || []
    // Remotive tavsif ichidan ham qidiradi — sarlavha, soha yoki teglarda so'z borlarini afzal ko'ramiz
    const relevant = jobs.filter(v => {
      const hay = `${v.title} ${v.category} ${(v.tags || []).join(' ')}`.toLowerCase()
      return terms.some(t => hay.includes(t))
    })
    rows.push(...(relevant.length ? relevant : jobs).map(mapRemotive))
  }
  if (arb.status === 'fulfilled') {
    const list = arb.value?.data || []
    rows.push(
      ...list
        .filter(v => {
          const hay = `${v.title} ${(v.tags || []).join(' ')}`.toLowerCase()
          return terms.some(t => hay.includes(t))
        })
        .map(mapArbeitnow)
    )
  }
  const result = { rows: rows.filter(v => v.title && v.employer), total: rows.length, terms }
  cacheSet(key, result)
  return result
}
