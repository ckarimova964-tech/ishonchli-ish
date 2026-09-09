import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import JobCard from './JobCard.jsx'
import { norm, daysLeft } from '../utils.js'
import { FOREIGN_CHANNELS } from '../sources.js'
import {
  CATEGORIES,
  searchNational,
  searchManyNational,
  searchRussia,
  PER_PAGE,
} from '../lib/liveJobs.js'
import SOATO from '../soato.json'

const SOURCES = [
  { id: 'all', label: 'Hammasi' },
  { id: 'local', label: "O'zbekiston" },
  { id: 'uz', label: 'Xorij — agentlik' },
  { id: 'ru', label: 'Rossiya' },
]

const PAGE = 15
const EMPTY_LIVE = { rows: [], total: 0, ruTotal: 0, page: 1, lastPage: 1, state: 'idle', label: '' }

export default function Vacancies({ all, query, setQuery }) {
  const [src, setSrc] = useState('all')
  const [cat, setCat] = useState(null)
  const [country, setCountry] = useState('Hammasi')
  const [region, setRegion] = useState('Hammasi')
  const [showClosed, setShowClosed] = useState(false)
  const [limit, setLimit] = useState(PAGE)
  const [live, setLive] = useState(EMPTY_LIVE)
  const [loadingMore, setLoadingMore] = useState(false)
  const timer = useRef(null)
  const reqId = useRef(0)

  // --- Jonli qidiruv: yozilgan so'z yoki tanlangan kasb bo'yicha ---
  const runSearch = useCallback(async (q, category) => {
    const my = ++reqId.current
    setLive(l => ({ ...l, state: 'loading' }))
    try {
      let nat
      let ru = { rows: [], total: 0 }
      if (category) {
        nat = await searchManyNational(category.uz)
        const ruRes = await Promise.allSettled(category.ru.map(t => searchRussia(t, 1, 20)))
        for (const r of ruRes) {
          if (r.status === 'fulfilled') {
            ru.rows.push(...r.value.rows)
            ru.total += r.value.total
          }
        }
      } else {
        nat = await searchNational(q, 1)
        ru = await searchRussia(q, 1, 30).catch(() => ({ rows: [], total: 0 }))
      }
      if (my !== reqId.current) return
      setLive({
        rows: [...nat.rows, ...ru.rows].map(v => ({ ...v, live: true })),
        total: nat.total,
        ruTotal: ru.total,
        page: 1,
        lastPage: nat.lastPage || 1,
        state: 'done',
        label: category ? category.label : q,
      })
      setLimit(PAGE)
    } catch {
      if (my === reqId.current) setLive({ ...EMPTY_LIVE, state: 'failed' })
    }
  }, [])

  useEffect(() => {
    clearTimeout(timer.current)
    const q = query.trim()
    if (cat) {
      runSearch('', cat)
      return
    }
    if (q.length < 3) {
      setLive(EMPTY_LIVE)
      return
    }
    timer.current = setTimeout(() => runSearch(q, null), 550)
    return () => clearTimeout(timer.current)
  }, [query, cat, runSearch])

  async function loadMoreLive() {
    if (live.page >= live.lastPage || loadingMore) return
    setLoadingMore(true)
    try {
      const next = live.page + 1
      const q = cat ? cat.uz[0] : query.trim()
      const nat = await searchNational(q, next)
      setLive(l => {
        const have = new Set(l.rows.map(v => v.id))
        return { ...l, rows: [...l.rows, ...nat.rows.filter(v => !have.has(v.id))], page: next }
      })
      setLimit(l => l + PAGE)
    } catch {
      /* jim o'tkazamiz — mavjud natijalar qoladi */
    } finally {
      setLoadingMore(false)
    }
  }

  // --- Ro'yxatni yig'ish ---
  const merged = useMemo(() => {
    if (!live.rows.length) return all
    const inLive = new Set(live.rows.map(v => v.id))
    return [...live.rows, ...all.filter(v => !inLive.has(v.id))]
  }, [all, live.rows])

  const countries = useMemo(() => {
    const counts = new Map()
    for (const v of merged) counts.set(v.country, (counts.get(v.country) || 0) + 1)
    return ['Hammasi', ...[...counts.entries()].sort((a, b) => b[1] - a[1]).map(e => e[0])]
  }, [merged])

  const regionNames = useMemo(
    () => ['Hammasi', ...Object.values(SOATO.regions).map(r => r.name).sort((a, b) => a.localeCompare(b, 'uz'))],
    []
  )

  const rows = useMemo(() => {
    const s = norm(query.trim())
    const terms = cat ? cat.uz.map(norm) : []
    const list = merged.filter(v => {
      if (src !== 'all' && v.src !== src) return false
      if (country !== 'Hammasi' && v.country !== country) return false
      if (region !== 'Hammasi' && v.region !== region) return false
      const closed = v.src === 'uz' && v.deadline && daysLeft(v.deadline) < 0
      if (closed && !showClosed) return false
      if (v.live) return true
      if (!s && !cat) return true
      const hay = norm(
        [v.title, v.titleRu, v.occ, v.employer, v.country, v.place, v.district, v.sector, v.duties]
          .filter(Boolean)
          .join(' ')
      )
      if (cat) return terms.some(t => hay.includes(t))
      return hay.includes(s)
    })
    // Bir xil kasb ketma-ket chiqib qolmasin — manba va kasb bo'yicha aralashtiramiz
    if (!live.rows.length && !s && !cat) {
      const buckets = new Map()
      for (const v of list) {
        const k = `${v.src}|${v.occ || v.title}`
        if (!buckets.has(k)) buckets.set(k, [])
        buckets.get(k).push(v)
      }
      const out = []
      let added = true
      while (added) {
        added = false
        for (const b of buckets.values()) {
          const item = b.shift()
          if (item) {
            out.push(item)
            added = true
          }
        }
      }
      return out
    }
    return list
  }, [merged, src, country, region, showClosed, query, cat, live.rows.length])

  const shown = rows.slice(0, limit)
  const reset = fn => v => {
    setLimit(PAGE)
    fn(v)
  }
  const external = FOREIGN_CHANNELS.filter(c => c.q).slice(0, 3)
  const canLoadLiveMore = live.state === 'done' && live.page < live.lastPage

  return (
    <section id="ish">
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">Vakansiyalar</div>
          <h2>Qidirgan ishingizni yozing — hammasi chiqadi</h2>
          <p>
            Qidiruv uchta rasmiy bazani birdan so‘raydi: O‘zbekistonning Milliy vakansiyalar
            bazasi (79 000+ e'lon), Migratsiya agentligining «Xorijda ish» tizimi va Rossiyaning
            federal portali. Natijalar jonli keladi — yig‘ilgan nusxa bilan cheklanmaydi.
          </p>
        </div>

        <div className="panel">
          <div className="panel-row">
            <input
              className="search"
              type="search"
              value={query}
              onChange={e => {
                setCat(null)
                reset(setQuery)(e.target.value)
              }}
              placeholder="Masalan: ofitsiant, dasturchi, quruvchi, o‘qituvchi, Samarqand"
              aria-label="Ish qidirish"
            />
            <div className="seg" role="group" aria-label="Manba">
              {SOURCES.map(o => (
                <button key={o.id} aria-pressed={src === o.id} onClick={() => reset(setSrc)(o.id)}>
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          <div className="panel-row">
            <div className="chips">
              <button
                className="chip"
                aria-pressed={!cat && !query.trim()}
                onClick={() => {
                  setCat(null)
                  reset(setQuery)('')
                }}
              >
                Hamma kasblar
              </button>
              {CATEGORIES.map(c => (
                <button
                  key={c.id}
                  className="chip"
                  aria-pressed={cat?.id === c.id}
                  onClick={() => {
                    setQuery('')
                    setLimit(PAGE)
                    setCat(cat?.id === c.id ? null : c)
                  }}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="panel-row">
            <div className="sort">
              <label htmlFor="region">Viloyat:</label>
              <select id="region" value={region} onChange={e => reset(setRegion)(e.target.value)}>
                {regionNames.map(r => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
            <div className="sort">
              <label htmlFor="country">Davlat:</label>
              <select id="country" value={country} onChange={e => reset(setCountry)(e.target.value)}>
                {countries.map(c => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={showClosed}
                onChange={e => reset(setShowClosed)(e.target.checked)}
              />
              Muddati tugaganlarini ham ko‘rsatish
            </label>
          </div>
        </div>

        <div className="result-line">
          <span>
            <b>{rows.length}</b> ta e’lon ro‘yxatda{live.rows.length ? ` (${live.rows.length} tasi bazadan hozir yuklandi)` : ''}
          </span>
          {live.state === 'loading' && <span>Rasmiy bazalardan qidirilmoqda…</span>}
          {live.state === 'done' && (
            <span>
              «{live.label}» bo‘yicha: Milliy bazada <b>{live.total.toLocaleString('en-US').replace(/,/g, ' ')}</b> ta
              {live.ruTotal ? (
                <>
                  , Rossiya portalida <b>{live.ruTotal.toLocaleString('en-US').replace(/,/g, ' ')}</b> ta
                </>
              ) : null}
            </span>
          )}
          {live.state === 'failed' && (
            <span>Jonli qidiruv ishlamadi — yig‘ilgan nusxadan ko‘rsatilmoqda</span>
          )}
          {query.trim() && (
            <span>
              Xorijiy portallarda:{' '}
              {external.map((c, i) => (
                <span key={c.name}>
                  {i > 0 && ' · '}
                  <a
                    href={c.q + encodeURIComponent(query.trim())}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {c.name}
                  </a>
                </span>
              ))}
            </span>
          )}
        </div>

        <div className="records">
          {shown.length === 0 && (
            <div className="empty">
              Bu shart bo‘yicha e’lon topilmadi. Boshqa so‘z bilan qidiring yoki filtrlarni
              bo‘shating.
            </div>
          )}
          {shown.map(v => (
            <JobCard key={v.id} v={v} />
          ))}
        </div>

        {(shown.length < rows.length || canLoadLiveMore) && (
          <div className="more-row">
            {shown.length < rows.length && (
              <button className="btn ghost" onClick={() => setLimit(l => l + PAGE)}>
                Yana {Math.min(PAGE, rows.length - shown.length)} ta ko‘rsatish
              </button>
            )}
            {canLoadLiveMore && (
              <button className="btn" onClick={loadMoreLive} disabled={loadingMore}>
                {loadingMore
                  ? 'Yuklanmoqda…'
                  : `Bazadan yana ${PER_PAGE} ta yuklash (${live.page}/${live.lastPage}-sahifa)`}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
