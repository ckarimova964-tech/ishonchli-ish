// Firibgarlik xabarlari uchun kichik API qatlami.
// Supabase'ning REST (PostgREST) interfeysiga to'g'ridan-to'g'ri murojaat qiladi —
// qo'shimcha kutubxona kerak emas, shuning uchun sayt yengil qoladi.
//
// Kalitlar `.env` faylidan olinadi (namuna: `.env.example`).
// Anon kalit ochiq bo'lishi normal: himoya RLS qoidalari bilan bazada turadi.

const URL_BASE = (import.meta.env.VITE_SUPABASE_URL || '').replace(/\/$/, '')
const ANON = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const isConfigured = Boolean(URL_BASE && ANON)

// Yangi «publishable» kalit (sb_publishable_...) faqat apikey sarlavhasida yuboriladi;
// eski «anon» JWT kalit (eyJ...) uchun Authorization ham qo'shiladi.
const headers = extra => ({
  apikey: ANON,
  ...(ANON.startsWith('eyJ') ? { Authorization: `Bearer ${ANON}` } : {}),
  'Content-Type': 'application/json',
  ...extra,
})

/** Tasdiqlangan xabarlar. Faqat `public_reports` ko'rinishidan o'qiydi. */
export async function fetchReports(limit = 60) {
  if (!isConfigured) throw new Error('not-configured')
  const url =
    `${URL_BASE}/rest/v1/public_reports` +
    `?select=id,who,place,story,loss_uzs,evidence,author,published_at` +
    `&order=published_at.desc&limit=${limit}`
  const res = await fetch(url, { headers: headers() })
  if (!res.ok) throw new Error(`fetch-failed-${res.status}`)
  return res.json()
}

/** Yangi xabar. Bazaga `status = 'pending'` bo'lib tushadi va moderatsiyani kutadi. */
export async function submitReport(form) {
  if (!isConfigured) throw new Error('not-configured')
  const body = {
    who: form.who.trim().slice(0, 160),
    place: form.place.trim().slice(0, 160),
    story: form.story.trim().slice(0, 2000),
    loss_uzs: Number(String(form.loss).replace(/\D/g, '')) || 0,
    evidence: form.evidence.trim().slice(0, 300),
    author: form.author.trim().slice(0, 80) || 'Anonim',
    contact: form.contact.trim().slice(0, 120),
  }
  const res = await fetch(`${URL_BASE}/rest/v1/reports`, {
    method: 'POST',
    headers: headers({ Prefer: 'return=minimal' }),
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`submit-failed-${res.status}: ${text.slice(0, 200)}`)
  }
  return true
}
