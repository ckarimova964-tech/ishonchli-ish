// Sahifani joyida tarjima qilish: matn tugunlari Google Tarjimon orqali o'giriladi.
// Boshqa saytga o'tkazilmaydi, React qayta chizgan yangi matnlar ham kuzatib o'giriladi.
// Tarjimalar brauzer xotirasida saqlanadi — keyingi safar darhol chiqadi va so'rov kamayadi.
//
// Eslatma: translate.googleapis.com/translate_a/t — Google Tarjimonning ochiq, lekin rasmiy
// hujjatlashtirilmagan manzili. U to'xtab qolsa, sayt o'zbekcha ishlayveradi.

const ENDPOINT = 'https://translate.googleapis.com/translate_a/t'
const SOURCE = 'uz'
const STORE_KEY = 'lang'
const MAX_BATCH_ITEMS = 40
const MAX_BATCH_CHARS = 2500

// Eng ko'p ko'rinadigan qisqa yozuvlar — mashina tarjimasi kontekstsiz xato qilmasligi uchun
const OVERRIDES = {
  ru: {
    'Ishonchli Ish': 'Надёжная работа',
    'Yordam kerak': 'Нужна помощь',
    Yordam: 'Помощь',
    Qidirish: 'Искать',
    Batafsil: 'Подробнее',
    Yopish: 'Закрыть',
    'Borish yo‘llari': 'Как уехать',
    Xabarlar: 'Сообщения',
    Ofitsiant: 'Официант',
    'To‘yxona · bazmgoh': 'Свадебные залы',
  },
  en: {
    'Ishonchli Ish': 'Reliable Work',
    'Yordam kerak': 'Need help',
    Yordam: 'Help',
    Qidirish: 'Search',
    Batafsil: 'Details',
    Yopish: 'Close',
    'Borish yo‘llari': 'How to go',
    Xabarlar: 'Reports',
    Ofitsiant: 'Waiter',
    'To‘yxona · bazmgoh': 'Wedding halls',
  },
}
const PARALLEL = 4

export function savedLang() {
  try {
    return localStorage.getItem(STORE_KEY) || SOURCE
  } catch {
    return SOURCE
  }
}

export function saveLang(code) {
  try {
    if (code === SOURCE) localStorage.removeItem(STORE_KEY)
    else localStorage.setItem(STORE_KEY, code)
  } catch {
    /* saqlab bo'lmadi — faqat shu safar ishlaydi */
  }
}

function loadCache(lang) {
  try {
    return JSON.parse(localStorage.getItem(`tr:${lang}`) || '{}')
  } catch {
    return {}
  }
}

function saveCache(lang, cache) {
  try {
    localStorage.setItem(`tr:${lang}`, JSON.stringify(cache))
  } catch {
    /* xotira to'lgan bo'lishi mumkin — tarjima baribir ishlaydi */
  }
}

const HAS_LETTER = /\p{L}/u

function skip(el) {
  if (!el) return true
  return Boolean(
    el.closest('script, style, noscript, code, pre.no-tr, [translate="no"], .notranslate, textarea')
  )
}

async function translateBatch(texts, lang) {
  const body = new URLSearchParams()
  texts.forEach(t => body.append('q', t))
  const res = await fetch(`${ENDPOINT}?client=gtx&sl=${SOURCE}&tl=${encodeURIComponent(lang)}`, {
    method: 'POST',
    body, // application/x-www-form-urlencoded — oldindan so'rov (preflight) kerak emas
  })
  if (!res.ok) throw new Error(`tarjima ${res.status}`)
  const data = await res.json()
  const list = Array.isArray(data) ? data : [data]
  // Javob ba'zan ["matn"], ba'zan [["matn","til"]] ko'rinishida keladi
  return list.map(x => (Array.isArray(x) ? x[0] : x))
}

export function createTranslator(lang, { onState } = {}) {
  const root = document.getElementById('root')
  const cache = loadCache(lang)
  const original = new WeakMap() // tugun -> asl o'zbekcha matn
  const written = new WeakMap() // tugun -> biz yozgan tarjima (o'z yozuvimizni ajratish uchun)
  const overrides = OVERRIDES[lang] || {}
  let pending = new Set()
  let timer = null
  let busy = false
  let failed = false

  function apply(node, source) {
    const core = source.trim()
    const tr = overrides[core] || cache[core]
    if (!tr) return false
    const lead = source.match(/^\s*/)[0]
    const trail = source.match(/\s*$/)[0]
    const next = lead + tr + trail
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.nodeValue !== next) {
        written.set(node, next)
        node.nodeValue = next
      }
    } else if (node.getAttribute('placeholder') !== next) {
      written.set(node, next)
      node.setAttribute('placeholder', next)
    }
    return true
  }

  function collect(scope) {
    const found = []
    const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT)
    let n
    while ((n = walker.nextNode())) {
      if (skip(n.parentElement)) continue
      const value = n.nodeValue
      if (!value || !HAS_LETTER.test(value)) continue
      // Tugun allaqachon tarjima qilingan bo'lsa — o'tkazib yuboramiz
      if (written.get(n) === value) continue
      original.set(n, value)
      found.push(n)
    }
    if (scope.querySelectorAll) {
      scope.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(el => {
        const ph = el.getAttribute('placeholder')
        if (skip(el.parentElement) || written.get(el) === ph) return
        if (ph && HAS_LETTER.test(ph)) {
          original.set(el, ph)
          found.push(el)
        }
      })
    }
    return found
  }

  async function flush() {
    if (busy) return
    busy = true
    try {
      const nodes = [...pending]
      pending = new Set()
      const missing = new Set()
      for (const node of nodes) {
        const src = original.get(node)
        if (!src) continue
        if (!apply(node, src)) missing.add(src.trim())
      }
      if (missing.size && !failed) {
        onState?.('loading')
        const all = [...missing]
        const batches = []
        let cur = []
        let chars = 0
        for (const t of all) {
          if (cur.length >= MAX_BATCH_ITEMS || chars + t.length > MAX_BATCH_CHARS) {
            batches.push(cur)
            cur = []
            chars = 0
          }
          cur.push(t)
          chars += t.length
        }
        if (cur.length) batches.push(cur)

        // Bir vaqtda bir nechta so'rov; har bir to'plam kelishi bilan darhol ekranga chiqaramiz
        for (let i = 0; i < batches.length; i += PARALLEL) {
          const group = batches.slice(i, i + PARALLEL)
          const results = await Promise.all(group.map(b => translateBatch(b, lang)))
          group.forEach((batch, gi) => {
            batch.forEach((t, j) => {
              if (results[gi][j]) cache[t] = results[gi][j]
            })
          })
          for (const node of nodes) {
            const src = original.get(node)
            if (src) apply(node, src)
          }
        }
        saveCache(lang, cache)
      }
      onState?.('done')
    } catch {
      // Vaqtincha xato (masalan, juda ko'p so'rov) — 20 soniyadan keyin qayta urinamiz
      failed = true
      onState?.('error')
      setTimeout(() => {
        failed = false
        queue(root)
      }, 20000)
    } finally {
      busy = false
      if (pending.size) schedule()
    }
  }

  function schedule() {
    clearTimeout(timer)
    timer = setTimeout(flush, 250)
  }

  function queue(scope) {
    collect(scope).forEach(n => pending.add(n))
    if (pending.size) schedule()
  }

  const observer = new MutationObserver(mutations => {
    for (const m of mutations) {
      if (m.type === 'characterData') {
        const n = m.target
        // O'zimiz yozgan tarjima bo'lsa — e'tibor bermaymiz
        if (written.get(n) === n.nodeValue) continue
        // Aks holda React yangi o'zbekcha matn yozgan — asl matn sifatida olib, qayta o'giramiz
        if (!skip(n.parentElement) && n.nodeValue && HAS_LETTER.test(n.nodeValue)) {
          original.set(n, n.nodeValue)
          pending.add(n)
        }
      } else if (m.type === 'attributes' && m.attributeName === 'placeholder') {
        const el = m.target
        const ph = el.getAttribute('placeholder')
        if (written.get(el) === ph) continue
        if (ph && HAS_LETTER.test(ph)) {
          original.set(el, ph)
          pending.add(el)
        }
      } else {
        m.addedNodes.forEach(node => {
          if (node.nodeType === Node.TEXT_NODE) {
            if (!skip(node.parentElement) && node.nodeValue && HAS_LETTER.test(node.nodeValue)) {
              original.set(node, node.nodeValue)
              pending.add(node)
            }
          } else if (node.nodeType === Node.ELEMENT_NODE && !skip(node)) {
            collect(node).forEach(n => pending.add(n))
          }
        })
      }
    }
    if (pending.size) schedule()
  })

  return {
    start() {
      document.documentElement.lang = lang
      // O'ngdan chapga yoziladigan tillar
      if (['ar', 'fa', 'ur', 'ps', 'iw', 'sd', 'yi'].includes(lang)) document.documentElement.dir = 'rtl'
      queue(root)
      observer.observe(root, {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true,
        attributeFilter: ['placeholder'],
      })
    },
    stop() {
      observer.disconnect()
      clearTimeout(timer)
    },
  }
}
