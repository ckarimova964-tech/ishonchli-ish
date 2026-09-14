// Muhokama bo'limi uchun API — «Xabarlar» bilan bitta Supabase bazasi va bir xil kalitlar.
// Xabar darhol chiqadi; havola, telefon raqami va @nom baza darajasida rad etiladi.

const URL_BASE = (import.meta.env.VITE_SUPABASE_URL || '').replace(/\/$/, '')
const ANON = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const isConfigured = Boolean(URL_BASE && ANON)

export const TOPICS = [
  { id: 'fikr', label: 'Fikr' },
  { id: 'savol', label: 'Savol' },
  { id: 'taklif', label: 'Taklif' },
  { id: 'tajriba', label: 'Tajriba' },
]

// Bazadagi tekshiruv bilan bir xil — foydalanuvchi yuborishdan oldin ko'rsin
const CONTACTS = /(https?:\/\/|www\.|t\.me\/|[a-z0-9-]+\.(uz|ru|com|net|org|me)\b|@[a-z0-9_]{4,}|(\d[\s()-]*){9,})/i

export function contactProblem(text) {
  return CONTACTS.test(String(text || ''))
}

const headers = extra => ({
  apikey: ANON,
  Authorization: `Bearer ${ANON}`,
  'Content-Type': 'application/json',
  ...extra,
})

/** Oxirgi xabarlar va ularga javoblar. */
export async function fetchDiscussion(limit = 200) {
  if (!isConfigured) throw new Error('not-configured')
  const url =
    `${URL_BASE}/rest/v1/public_discussion` +
    `?select=id,parent_id,topic,author,message,created_at&order=created_at.desc&limit=${limit}`
  const res = await fetch(url, { headers: headers() })
  if (!res.ok) throw new Error(`fetch-failed-${res.status}`)
  return res.json()
}

/** Yangi xabar yoki javob. */
export async function postMessage({ author, message, topic, parentId }) {
  if (!isConfigured) throw new Error('not-configured')
  const body = {
    author: (author || '').trim().slice(0, 60) || 'Mehmon',
    message: message.trim().slice(0, 1500),
    topic: topic || 'fikr',
    parent_id: parentId || null,
  }
  const res = await fetch(`${URL_BASE}/rest/v1/discussion`, {
    method: 'POST',
    headers: headers({ Prefer: 'return=minimal' }),
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    if (/discussion_no_contacts/.test(text)) throw new Error('contacts')
    throw new Error(`post-failed-${res.status}`)
  }
  return true
}
