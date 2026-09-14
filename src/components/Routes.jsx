import { useMemo, useState } from 'react'
import { ROUTES, FROM_ABROAD_NOTE, FROM_HOME_NOTE } from '../routes.js'
import { guessCountry } from '../help.js'
import { norm } from '../utils.js'

export default function Routes() {
  const guessed = useMemo(() => guessCountry(), [])
  const [where, setWhere] = useState(guessed && guessed !== 'UZ' ? 'abroad' : 'home')
  const [dest, setDest] = useState('DE')
  const [q, setQ] = useState('')

  const list = useMemo(() => {
    const s = norm(q.trim())
    return s ? ROUTES.filter(r => norm(r.name).includes(s)) : ROUTES
  }, [q])
  const route = ROUTES.find(r => r.id === dest) || ROUTES[0]

  return (
    <section id="yol">
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">Borish yo‘llari</div>
          <h2>Chet elga qanday qilib qonuniy borsa bo‘ladi?</h2>
          <p>
            Qayerdaligingizni va qaysi davlatga bormoqchi ekaningizni tanlang — qonuniy yo‘llar,
            kerakli til va rasmiy havolalar chiqadi.
          </p>
        </div>

        <div className="route-controls">
          <div>
            <div className="help-label">Siz hozir qayerdasiz?</div>
            <div className="seg" role="group" aria-label="Joylashuv">
              <button aria-pressed={where === 'home'} onClick={() => setWhere('home')}>
                O‘zbekistonda
              </button>
              <button aria-pressed={where === 'abroad'} onClick={() => setWhere('abroad')}>
                Boshqa davlatda
              </button>
            </div>
          </div>
          <div className="route-search">
            <label className="help-label" htmlFor="route-q">
              Qaysi davlatga bormoqchisiz?
            </label>
            <input
              id="route-q"
              className="search"
              type="search"
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Davlat nomini yozing…"
            />
          </div>
        </div>

        <div className="dest-chips">
          {list.map(r => (
            <button
              key={r.id}
              className="dest-chip"
              aria-pressed={dest === r.id}
              onClick={() => setDest(r.id)}
            >
              <span aria-hidden="true">{r.flag}</span> {r.name}
            </button>
          ))}
          {list.length === 0 && (
            <p className="help-hint">
              Bu davlat bo‘yicha qo‘llanma hali yo‘q. Rasmiy vakansiyalarni{' '}
              <a href="https://xorijdaish.uz" target="_blank" rel="noopener noreferrer">
                xorijdaish.uz
              </a>{' '}
              dan tekshiring.
            </p>
          )}
        </div>

        <p className={`route-note ${where}`}>{where === 'home' ? FROM_HOME_NOTE : FROM_ABROAD_NOTE}</p>

        <article className="route-card">
          <header>
            <span className="route-flag" aria-hidden="true">
              {route.flag}
            </span>
            <h3>{route.name}</h3>
          </header>

          {route.warn && <div className="route-warn">⚠ {route.warn}</div>}

          <div className="route-body">
            <div>
              <h5>Qonuniy yo‘llar</h5>
              <div className="ways">
                {route.ways.map(w => (
                  <div className="way" key={w.title}>
                    <b>{w.title}</b>
                    <p>{w.how}</p>
                    <small>Kimlar uchun: {w.who}</small>
                    {w.warn && <div className="route-warn small">⚠ {w.warn}</div>}
                  </div>
                ))}
              </div>
            </div>
            <aside>
              <h5>Qaysi til kerak</h5>
              <ul className="langs">
                {route.langs.map(l => (
                  <li key={l.lang}>
                    <b>{l.lang}</b>
                    <span>{l.level}</span>
                  </li>
                ))}
              </ul>
              <h5>Rasmiy manbalar</h5>
              <ul className="route-links">
                {route.links.map(l => (
                  <li key={l.u}>
                    <a href={l.u} target="_blank" rel="noopener noreferrer">
                      {l.t} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </article>
      </div>
    </section>
  )
}
