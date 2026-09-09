import { UZ_CHANNELS, FOREIGN_CHANNELS } from '../sources.js'

export default function Channels({ query }) {
  const q = query.trim()
  return (
    <section id="kanal">
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">Rasmiy kanallar</div>
          <h2>Ish ham, tekshiruv ham — faqat shu manzillardan</h2>
          <p>
            Quyidagi havolalarning hammasi davlat idoralariga tegishli va 2026-yil 5-sentabrda
            ishlashi tekshirilgan. Boshqa hech kimga oldindan pul o‘tkazmang.
          </p>
        </div>

        <div className="group-label">
          <span className="eyebrow">O‘zbekiston</span>
        </div>
        <div className="channels">
          {UZ_CHANNELS.map(c => (
            <div className="channel" key={c.url}>
              <div className="org">{c.org}</div>
              <h4>{c.name}</h4>
              <p>{c.what}</p>
              <div className="go">
                <a href={c.url} target="_blank" rel="noopener noreferrer">
                  Ochish ↗
                </a>
                <span className="eyebrow">{c.tag}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="group-label">
          <span className="eyebrow">Xorijiy davlat portallari</span>
        </div>
        <div className="channels">
          {FOREIGN_CHANNELS.map(c => (
            <div className="channel" key={c.url}>
              <div className="org">
                {c.country} · {c.org}
              </div>
              <h4>{c.name}</h4>
              <p>{c.what}</p>
              <div className="go">
                <a href={c.url} target="_blank" rel="noopener noreferrer">
                  Ochish ↗
                </a>
                {c.q && q && (
                  <a href={c.q + encodeURIComponent(q)} target="_blank" rel="noopener noreferrer">
                    «{q}» bo‘yicha qidirish ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
