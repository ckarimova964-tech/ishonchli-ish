// Viloyat va tumanlar ro'yxati — ish.mehnat.uz ning rasmiy ma'lumotnomasidan.
// Ishlatish: node scripts/harvest-soato.mjs src/soato.json
import fs from 'fs'

const B = 'https://ishapi.mehnat.uz/api/v1/resources'

const r = await (await fetch(`${B}/regions`)).json()
const d = await (await fetch(`${B}/districts`)).json()

const regions = {}
const districts = {}
for (const x of r.data || []) regions[x.soato] = { name: x.name_uz_ln, center: x.center_uz_ln }
for (const x of d.data || []) districts[x.soato] = { name: x.name_uz_ln, center: x.center_uz_ln }

fs.writeFileSync(process.argv[2], JSON.stringify({ regions, districts }))
console.error('viloyat:', Object.keys(regions).length, '| tuman/shahar:', Object.keys(districts).length)
