import fs from 'fs'
const B = 'https://lm-api.xorijdaish.uz/api/labour-migration'
const list = []
for (let p = 1; p <= 10; p++) {
  const r = await fetch(`${B}/vacancies?page=${p}`)
  const j = await r.json()
  const d = j?.data
  if (!d) break
  list.push(...d.data)
  if (p >= d.last_page) break
}
console.error('list:', list.length)
const full = []
for (const v of list) {
  try {
    const r = await fetch(`${B}/vacancies/${v.id}`)
    const j = await r.json()
    full.push({ ...v, detail: j?.data?.vacancy || null, extra: j?.data ? Object.fromEntries(Object.entries(j.data).filter(([k]) => k !== 'vacancy')) : null })
  } catch (e) {
    console.error('fail', v.id, e.message)
    full.push({ ...v, detail: null })
  }
}
fs.writeFileSync(process.argv[2], JSON.stringify(full, null, 1))
console.error('saved', full.length)
