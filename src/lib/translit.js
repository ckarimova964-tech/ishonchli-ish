// O'zbek kirill yozuvini lotinga o'giradi. Rasmiy manbalarning matni ko'pincha
// kirillda keladi — mazmun o'zgarmaydi, faqat harflar almashadi.
const MAP = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo', ж: 'j', з: 'z', и: 'i', й: 'y',
  к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f',
  х: 'x', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sh', ъ: 'ʼ', ы: 'i', ь: '', э: 'e', ю: 'yu', я: 'ya',
  ў: 'o‘', қ: 'q', ғ: 'g‘', ҳ: 'h', ə: 'a',
}

export function tr(s) {
  if (!s) return ''
  let out = ''
  for (const ch of String(s)) {
    const low = ch.toLowerCase()
    const rep = MAP[low]
    if (rep === undefined) {
      out += ch
      continue
    }
    out += ch === low ? rep : rep.charAt(0).toUpperCase() + rep.slice(1)
  }
  return out.replace(/\s+/g, ' ').trim()
}

export const money = v => {
  const n = Number(String(v ?? '').replace(/[^\d.]/g, ''))
  if (!n) return null
  return Math.round(n).toLocaleString('en-US').replace(/,/g, ' ')
}
