import { useEffect, useMemo, useState } from 'react'
import DATA from './vacancies.json'
import Topbar from './components/Topbar.jsx'
import Hero from './components/Hero.jsx'
import Vacancies from './components/Vacancies.jsx'
import Reports from './components/Reports.jsx'
import Channels from './components/Channels.jsx'
import Guide from './components/Guide.jsx'
import Safety from './components/Safety.jsx'
import { fmtDate, daysLeft } from './utils.js'
import { fetchAgency, nationalTotal } from './lib/liveJobs.js'
import SOATO from './soato.json'

const SECTIONS = ['ish', 'ogoh', 'kanal', 'hujjat', 'xavf']

export default function App() {
  const [active, setActive] = useState('ish')
  const [query, setQuery] = useState('')
  const [liveUz, setLiveUz] = useState(null)
  const [natTotal, setNatTotal] = useState(null)
  const liveState = liveUz ? 'live' : 'snapshot'

  const all = useMemo(() => {
    const uz = liveUz && liveUz.length ? liveUz : DATA.uz
    return [...uz, ...DATA.local, ...DATA.ru]
  }, [liveUz])

  const stats = useMemo(() => {
    const uzList = liveUz && liveUz.length ? liveUz : DATA.uz
    const openUz = uzList.filter(v => !v.deadline || daysLeft(v.deadline) >= 0)
    return {
      uzCount: openUz.length,
      localCount: DATA.local.length,
      ruCount: DATA.ru.length,
      countries: new Set(all.map(v => v.country)).size,
      nationalTotal: natTotal,
      districts: Object.keys(SOATO.districts).length,
      fetched: DATA.fetched,
    }
  }, [all, liveUz, natTotal])

  // Sahifa ochilganda rasmiy bazalardan yangi ma'lumot olishga urinamiz.
  // Bloklansa yoki internet bo'lmasa — yig'ilgan nusxa bilan ishlayveradi.
  useEffect(() => {
    let alive = true
    fetchAgency()
      .then(rows => alive && rows.length && setLiveUz(rows))
      .catch(() => {})
    nationalTotal()
      .then(t => alive && t && setNatTotal(t))
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [])

  function go(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY + 140
      let cur = SECTIONS[0]
      for (const id of SECTIONS) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= y) cur = id
      }
      setActive(cur)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <Topbar active={active} onGo={go} />
      <Hero onGo={go} stats={stats} liveState={liveState} setQuery={setQuery} />
      <Vacancies all={all} query={query} setQuery={setQuery} />
      <Reports />
      <Channels query={query} />
      <Guide />
      <Safety />

      <footer className="site">
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <h4>Ma’lumot qayerdan olingan</h4>
              <ul>
                <li>
                  <b>Milliy vakansiyalar bazasi</b> —{' '}
                  <a href="https://ish.mehnat.uz" target="_blank" rel="noopener noreferrer">
                    ish.mehnat.uz
                  </a>{' '}
                  (Bandlik va mehnat munosabatlari vazirligi): O‘zbekiston bo‘yicha 79 000 dan
                  ortiq e’lon. Qidiruv paytida jonli so‘raladi, {DATA.local.length} tasi saytga
                  yig‘ib qo‘yilgan
                </li>
                <li>
                  Migratsiya agentligining «Xorijda ish» axborot tizimi —{' '}
                  <a href="https://xorijdaish.uz" target="_blank" rel="noopener noreferrer">
                    xorijdaish.uz
                  </a>{' '}
                  ochiq ma’lumotlari ({DATA.uz.length} ta e’lon)
                </li>
                <li>
                  Rossiya Federatsiyasining «Работа России» federal portali —{' '}
                  <a href="https://trudvsem.ru" target="_blank" rel="noopener noreferrer">
                    trudvsem.ru
                  </a>{' '}
                  ochiq API’si ({DATA.ru.length} ta e’lon: maoshi 55 000 rubldan yuqori,
                  aloqa ma’lumoti ochiq bo‘lganlari)
                </li>
                <li>Ma’lumot olingan sana: {fmtDate(DATA.fetched)}</li>
              </ul>
            </div>
            <div>
              <h4>Muhim</h4>
              <ul>
                <li>Sayt hech kimdan pul olmaydi va ariza qabul qilmaydi.</li>
                <li>Har bir e’lon o‘z manbasiga havola qilingan — yakuniy shartni o‘sha yerdan o‘qing.</li>
                <li>
                  Shubhali holatda:{' '}
                  <a href="tel:1282">1282</a> — Migratsiya agentligi ishonch telefoni.
                </li>
              </ul>
            </div>
          </div>

          <p className="disclaim">
            <strong>Ishonchli Ish</strong> — mustaqil ma’lumot sahifasi, davlat organi emas va
            hech bir idora nomidan ish yuritmaydi. E’lonlar yuqoridagi rasmiy manbalardan{' '}
            {fmtDate(DATA.fetched)} holatiga ko‘chirilgan nusxa: maosh, o‘rin soni va muddat
            manbada o‘zgargan bo‘lishi mumkin. Shartnoma imzolashdan oldin ma’lumotni ish
            beruvchining o‘zidan yoki rasmiy portaldan tasdiqlang.
          </p>
        </div>
      </footer>
    </>
  )
}
