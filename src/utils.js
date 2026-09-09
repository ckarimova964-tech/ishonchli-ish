export const fmtDate = s => {
  if (!s) return '—'
  const [y, m, d] = s.slice(0, 10).split('-')
  return `${d}.${m}.${y}`
}

export const daysLeft = s => {
  if (!s) return null
  const end = new Date(s + 'T23:59:59')
  return Math.ceil((end - new Date()) / 86400000)
}

export const norm = s =>
  String(s || '')
    .toLowerCase()
    .replace(/[’‘`´]/g, "'")
    .replace(/o'/g, 'o')
    .replace(/g'/g, 'g')
