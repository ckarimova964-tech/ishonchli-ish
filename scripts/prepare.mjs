import fs from 'fs'
const SP = process.argv[2]
const OUT = process.argv[3]
const uz = JSON.parse(fs.readFileSync(SP + '/data/uz-raw.json', 'utf8'))
const ru = JSON.parse(fs.readFileSync(SP + '/data/ru-raw.json', 'utf8'))
const SOATO = JSON.parse(fs.readFileSync(SP + '/src/soato.json', 'utf8'))

// --- Uzbek Cyrillic -> Latin ---
const M = {
  'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'yo','ж':'j','з':'z','и':'i','й':'y',
  'к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f',
  'х':'x','ц':'ts','ч':'ch','ш':'sh','щ':'sh','ъ':'ʼ','ы':'i','ь':'','э':'e','ю':'yu','я':'ya',
  'ў':'o‘','қ':'q','ғ':'g‘','ҳ':'h','ə':'a',
}
function tr(s) {
  if (!s) return ''
  let out = ''
  for (const ch of String(s)) {
    const low = ch.toLowerCase()
    const rep = M[low]
    if (rep === undefined) { out += ch; continue }
    out += ch === low ? rep : (rep.charAt(0).toUpperCase() + rep.slice(1))
  }
  return out.replace(/\s+/g, ' ').trim()
}
const CUR = { JPY: '¥', EUR: '€', USD: '$', RUB: '₽', KRW: '₩', PLN: 'zł' }
function money(v) {
  const n = Number(String(v || '').replace(/[^\d.]/g, ''))
  if (!n) return null
  return n.toLocaleString('fr-FR').replace(/\u202f|\u00a0/g, ' ')
}

const today = new Date()
const uzOut = uz.map(v => {
  const d = v.detail || {}
  const from = money(v.salary_dollar_from), to = money(v.salary_dollar_to), one = money(v.salary_dollar)
  const pay = from && to ? `${from}–${to}` : (one || null)
  const end = d.end_date ? d.end_date.slice(0, 10) : null
  const langs = (d.check_languages || []).map(tr)
  return {
    id: 'uz-' + v.id,
    src: 'uz',
    title: v.occupation_name_uz,
    sector: v.sector_name_uz,
    country: v.country_name_uz,
    place: tr(d.address_abroad || d.employer_address || ''),
    employer: v.employer_name,
    pay, cur: v.currency, curSym: CUR[v.currency] || v.currency,
    seats: d.total || null,
    hours: v.working_time_from ? `${v.working_time_from} soat` : null,
    days: v.work_days_of_week ? `${v.work_days_of_week} kun/hafta` : null,
    ageFrom: d.age_from || null, ageTo: d.age_to || null,
    gender: d.gender_vacancy_uz || null,
    exp: d.experience_uz || null,
    edu: d.education_uz || null,
    accom: !!d.is_accomodation_provided,
    social: d.social_insurance_uz || null,
    probation: tr(d.probationary_period || ''),
    duties: tr(d.responsibilities_uz || d.responsibilities || ''),
    skills: tr(d.skill_info || ''),
    personal: tr(d.personal_qualities || ''),
    langs,
    needPassport: d.is_passport_abroad === 1,
    deadline: end,
    open: end ? new Date(end) >= today : true,
    posted: (v.created_at || '').slice(0, 10),
    url: `https://xorijdaish.uz/vacancy?vacancy_id=${v.id}`,
  }
})

const cutoff = new Date(Date.now() - 365 * 86400000)
const seen = new Set()
const perOcc = {}
const ruOut = []
for (const v of ru.sort((a, b) => (b.smin || 0) - (a.smin || 0))) {
  if (!(v.email || v.phone)) continue
  if (!v.modified || new Date(v.modified) < cutoff) continue
  if (!v.smin || v.smin < 55000) continue
  const key = (v.company || '') + '|' + (v.title || '')
  if (seen.has(key)) continue
  perOcc[v.q] = (perOcc[v.q] || 0) + 1
  if (perOcc[v.q] > 11) continue
  seen.add(key)
  ruOut.push({
    id: 'ru-' + v.id,
    src: 'ru',
    title: v.title,
    occ: v.q,
    sector: v.q,
    country: 'Rossiya',
    place: (v.region || '').replace(/\s+/g, ' '),
    addr: v.addr,
    employer: v.company,
    pay: money(v.smin),
    payMax: v.smax && v.smax !== v.smin ? money(v.smax) : null,
    cur: 'RUB', curSym: '₽',
    exp: v.exp ? `${v.exp} yil tajriba` : 'Tajriba talab qilinmaydi',
    edu: v.edu || null,
    schedule: v.schedule || null,
    employment: v.employment || null,
    duties: (v.req || '').replace(/\s+/g, ' ').slice(0, 320),
    term: (v.term || '').replace(/\s+/g, ' ').slice(0, 220),
    email: v.email || '',
    phone: v.phone || '',
    updated: (v.modified || '').slice(0, 10),
    url: v.url,
    open: true,
  })
}
ruOut.sort((a, b) => a.occ.localeCompare(b.occ, 'uz'))

// ---------- O'zbekiston ichidagi ishlar (Milliy vakansiyalar bazasi) ----------
let localOut = []
let regionsMap = {}
try {
  const L = JSON.parse(fs.readFileSync(SP + '/data/local-raw.json', 'utf8'))
  const regionByCode = L.regionByCode || {}
  regionsMap = regionByCode
  const seenL = new Set()
  for (const v of L.rows) {
    if (seenL.has(v.id)) continue
    seenL.add(v.id)
    let prof = {}
    try { prof = JSON.parse(v.company?.profile_data || '{}') } catch {}
    let phones = []
    try { phones = JSON.parse(v.company?.phones || '[]') } catch {}
    const phone = prof.phone_vacancies || phones[0] || ''
    const salary = Number(v.position_salary || 0)
    localOut.push({
      id: 'uzl-' + v.id,
      src: 'local',
      title: tr(v.position_name || ''),
      titleRu: v.position_name_ru || null,
      occ: v._q,
      sector: v._q,
      country: "O'zbekiston",
      region: SOATO.regions[v.company_soato_code4]?.name || regionByCode[v.company_soato_code4] || '',
      district: SOATO.districts[v.company_soato_code7 || v.company_soato_code]?.name || '',
      center: SOATO.districts[v.company_soato_code7 || v.company_soato_code]?.center || '',
      place: [SOATO.regions[v.company_soato_code4]?.name, SOATO.districts[v.company_soato_code7 || v.company_soato_code]?.name].filter(Boolean).join(' · '),
      addr: prof.actual_address || prof.address || '',
      employer: v.company_name,
      tin: v.company_tin || null,
      pay: salary > 0 ? money(salary) : null,
      cur: 'UZS',
      curSym: "so'm",
      rate: v.position_rate ? Number(v.position_rate) : null,
      unit: tr(v.structure_name || ''),
      phone: phone ? '+' + String(phone).replace(/[^0-9]/g, '') : '',
      posted: (v.date_start || '').slice(0, 10),
      views: v.detail?.view_count || 0,
      url: 'https://ish.mehnat.uz/vacancies/' + v.id,
      open: true,
    })
  }
  localOut = localOut.filter(v => v.title && v.employer)
} catch (e) {
  console.error('local-raw.json topilmadi — Ozbekiston ishlarisiz davom etamiz')
}

// Ikkinchi himoya: biror bo'lim bo'sh chiqsa, oldingi nusxadagi ma'lumot saqlanadi
let prev = null
try {
  prev = JSON.parse(fs.readFileSync(OUT, 'utf8'))
} catch {
  /* birinchi marta — oldingi nusxa yo'q */
}
if (prev) {
  if (!localOut.length && prev.local?.length) {
    console.error('local bo‘sh — oldingi', prev.local.length, 'ta e’lon saqlab qolindi')
    localOut = prev.local
    regionsMap = prev.regions || regionsMap
  }
  if (!uzOut.length && prev.uz?.length) uzOut.push(...prev.uz)
  if (!ruOut.length && prev.ru?.length) ruOut.push(...prev.ru)
}

const payload = {
  fetched: new Date().toISOString().slice(0, 10),
  regions: regionsMap,
  uz: uzOut,
  local: localOut,
  ru: ruOut,
}
fs.writeFileSync(OUT, JSON.stringify(payload))
console.error('uz', uzOut.length, 'local', localOut.length, 'ru', ruOut.length, 'bytes', fs.statSync(OUT).size)
console.error('uz open', uzOut.filter(v => v.open).length)
console.error('ru regions', new Set(ruOut.map(v => v.place)).size)
