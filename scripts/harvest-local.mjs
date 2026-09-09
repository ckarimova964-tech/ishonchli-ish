// O'zbekiston ichidagi ish o'rinlari — "Milliy vakansiyalar bazasi" (ish.mehnat.uz)
// rasmiy API'sidan. Ishlatish: node scripts/harvest-local.mjs data/local-raw.json
import fs from 'fs'

const API = 'https://ishapi.mehnat.uz/api/v1/vacancies'

// Har xil soha qamrab olinsin: xizmat ko'rsatish, qurilish, ta'lim, tibbiyot, ishlab chiqarish, IT
const QUERIES = [
  ['oshpaz', 'Oshpaz'],
  ['ofitsiant', 'Ofitsiant'],
  ['qandolatchi', 'Qandolatchi'],
  ['sotuvchi', 'Sotuvchi'],
  ['kassir', 'Kassir'],
  ['administrator', 'Administrator'],
  ['menejer', 'Menejer'],
  ['quruvchi', 'Quruvchi'],
  ['qurilish', 'Qurilish'],
  ['suvoqchi', 'Suvoqchi'],
  ['payvandchi', 'Payvandchi'],
  ['chilangar', 'Chilangar'],
  ['elektrik', 'Elektrik'],
  ['muhandis', 'Muhandis'],
  ['texnik', 'Texnik'],
  ['dasturchi', 'Dasturchi'],
  ['programmist', 'Dasturchi'],
  ['kompyuter', 'Kompyuter'],
  ['oqituvchi', "O'qituvchi"],
  ['muallim', "O'qituvchi"],
  ['tarbiyachi', 'Tarbiyachi'],
  ['trener', 'Trener'],
  ['shifokor', 'Shifokor'],
  ['hamshira', 'Hamshira'],
  ['laborant', 'Laborant'],
  ['haydovchi', 'Haydovchi'],
  ['ekspeditor', 'Ekspeditor'],
  ['buxgalter', 'Buxgalter'],
  ['iqtisodchi', 'Iqtisodchi'],
  ['kotib', 'Kotib'],
  ['tikuvchi', 'Tikuvchi'],
  ['operator', 'Operator'],
  ['agronom', 'Agronom'],
  ['chorvador', 'Chorvador'],
  ['farrosh', 'Farrosh'],
  ['qorovul', 'Qorovul'],
  ['sartarosh', 'Sartarosh'],
  ['yuk tashuvchi', 'Yuk tashuvchi'],
]

const PER = 20

async function getJson(url) {
  const r = await fetch(url, { headers: { Accept: 'application/json' } })
  return r.json()
}

const rows = []
for (const [q, label] of QUERIES) {
  try {
    const j = await getJson(`${API}?search=${encodeURIComponent(q)}&per_page=${PER}`)
    const list = j?.data?.data || []
    for (const v of list) rows.push({ ...v, _q: label })
    console.error(`${q}: ${list.length} (jami bazada ${j?.data?.total ?? '?'})`)
  } catch (e) {
    console.error(`${q}: XATO ${e.message}`)
  }
}

// Viloyat nomlarini API'ning o'zidan aniqlaymiz (SOATO kodini taxmin qilmaymiz)
const codes = [...new Set(rows.map(r => r.company_soato_code4).filter(Boolean))]
const regionByCode = {}
for (const code of codes) {
  const sample = rows.find(r => r.company_soato_code4 === code)
  try {
    const j = await getJson(`${API}/${sample.id}`)
    const name = j?.data?.region?.name_uz_ln
    if (name) regionByCode[code] = name
  } catch {
    /* nomsiz qoladi */
  }
}
console.error('viloyatlar aniqlandi:', Object.keys(regionByCode).length, '/', codes.length)

fs.writeFileSync(process.argv[2], JSON.stringify({ rows, regionByCode }, null, 1))
console.error('saqlandi:', rows.length, 'ta yozuv')
