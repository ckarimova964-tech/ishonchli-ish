import fs from 'fs'

const QUERIES = [
  ['сварщик', 'Payvandchi'],
  ['бетонщик', 'Beton ishlari'],
  ['каменщик', "G'isht teruvchi"],
  ['штукатур', 'Suvoqchi'],
  ['разнорабочий', 'Ishchi (umumiy)'],
  ['водитель категории', 'Haydovchi'],
  ['швея', 'Tikuvchi'],
  ['повар', 'Oshpaz'],
  ['грузчик', 'Yuk ortuvchi'],
  ['электромонтажник', 'Elektromontajchi'],
  ['оператор станка', 'Stanok operatori'],
  ['уборщик', 'Farrosh'],
  ['подсобный рабочий', 'Yordamchi ishchi'],
  ['арматурщик', 'Armaturachi'],
  ['монтажник', 'Montajchi'],
]

const out = []
for (const [q, uz] of QUERIES) {
  const url = `http://opendata.trudvsem.ru/api/v1/vacancies?text=${encodeURIComponent(q)}&limit=40&offset=0`
  try {
    const r = await fetch(url)
    const j = await r.json()
    const list = j?.results?.vacancies || []
    for (const w of list) {
      const v = w.vacancy
      if (!v) continue
      const contacts = (v.contact_list || []).map(c => ({ t: c.contact_type, v: c.contact_value }))
      out.push({
        id: v.id,
        q: uz,
        qru: q,
        title: v['job-name'],
        company: v.company?.name,
        companyUrl: v.company?.url,
        inn: v.company?.inn,
        region: v.region?.name,
        addr: v.addresses?.address?.[0]?.location || '',
        salary: v.salary,
        smin: v.salary_min,
        smax: v.salary_max,
        employment: v.employment,
        schedule: v.schedule,
        exp: v.requirement?.experience,
        edu: v.requirement?.education,
        req: (v.requirements || v.duty || '').slice(0, 400),
        term: v.term?.text || '',
        url: v.vac_url,
        contacts,
        email: v.company?.email || contacts.find(c => /почт/i.test(c.t))?.v || '',
        phone: contacts.find(c => /елефон/i.test(c.t))?.v || '',
        created: v['creation-date'],
        modified: v.date_modify,
        source: v.source,
      })
    }
    console.error(`${q}: ${list.length}`)
  } catch (e) {
    console.error(`${q}: ERROR ${e.message}`)
  }
}
fs.writeFileSync(process.argv[2], JSON.stringify(out, null, 1))
console.error('TOTAL', out.length)
