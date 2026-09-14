import { useState } from 'react'
import { fmtDate } from '../utils.js'

const QUICK = ['Ofitsiant', 'Dasturchi', 'Quruvchi', "O'qituvchi", 'Haydovchi', 'Hamshira']

export default function Hero({ onGo, stats, liveState, setQuery }) {
  const [text, setText] = useState('')
  const nat = stats.nationalTotal

  function submit(e) {
    e.preventDefault()
    setQuery(text)
    onGo('ish')
  }

  function quick(word) {
    setText(word)
    setQuery(word)
    onGo('ish')
  }

  return (
    <header className="hero">
      <div className="wrap">
        <div className="eyebrow">O‘zbekiston · xorij · rasmiy davlat bazalari</div>
        <h1>
          Ishonchli ish — <em>oson topiladi</em>.
        </h1>
        <p className="lede">
          Uy yonidagi restorandan tortib Yaponiyadagi zavodgacha. Kasbingizni yozing — uchala
          rasmiy baza birdan qidiriladi va <strong>hamma e'lon</strong> chiqadi: qaysi tumanda,
          qancha maosh, kimga qo‘ng‘iroq qilish kerak.
        </p>

        <form className="hero-search" onSubmit={submit}>
          <input
            type="search"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Qanday ish qidiryapsiz? Masalan: ofitsiant, dasturchi, quruvchi…"
            aria-label="Ish qidirish"
          />
          <button className="btn" type="submit">
            Qidirish
          </button>
        </form>

        <div className="quick">
          <span>Tez qidiruv:</span>
          {QUICK.map(w => (
            <button key={w} onClick={() => quick(w)}>
              {w}
            </button>
          ))}
        </div>

        <div className="hero-links">
          <button onClick={() => onGo('yol')}>
            ✈️ Chet elga qanday borish mumkin va qaysi til kerak?
          </button>
          <button className="danger" onClick={() => onGo('yordam')}>
            🆘 Xorijda qiyin vaziyatga tushdingizmi?
          </button>
        </div>

        <div className="ribbon">
          <div>
            <b>{nat ? nat.toLocaleString('en-US').replace(/,/g, ' ') : stats.localCount}</b>
            <span>
              O‘zbekistondagi ish o‘rni{nat ? ' — bazada hozir' : ' (yig‘ilgan nusxa)'}
            </span>
          </div>
          <div>
            <b>{stats.uzCount}</b>
            <span>Migratsiya agentligining xorijiy vakansiyasi</span>
          </div>
          <div>
            <b>{stats.ruCount}</b>
            <span>Rossiya federal portalidagi e’lon</span>
          </div>
          <div>
            <b>{stats.districts}</b>
            <span>tuman va shahar qamrab olingan</span>
          </div>
        </div>
        <p className="eyebrow" style={{ marginTop: 12 }}>
          {liveState === 'live'
            ? 'Ma’lumot hozir rasmiy bazalardan yangilandi'
            : `Yig‘ilgan nusxa: ${fmtDate(stats.fetched)}`}{' '}
          · har bir e’lon o‘z manbasiga havola qiladi
        </p>
      </div>
    </header>
  )
}
