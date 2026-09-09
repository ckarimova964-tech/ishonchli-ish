import { useEffect, useState } from 'react'
import { fetchReports, submitReport, isConfigured } from '../lib/reportsApi.js'
import { fmtDate } from '../utils.js'
import { HOTLINE } from '../sources.js'

const EMPTY = { who: '', place: '', story: '', loss: '', evidence: '', author: '', contact: '' }

function OfficialFallback({ reason }) {
  return (
    <div className="callout">
      <div>
        <b>Xabaringizni rasmiy kanalga yozing</b>
        <p>
          {reason === 'not-configured'
            ? "Bu nusxada xabarlar bazasi ulanmagan (sayt o'z hostingida ishga tushirilganda ochiladi)."
            : "Baza hozir javob bermayapti — xabaringiz yo'qolib qolmasligi uchun rasmiy kanaldan foydalaning."}{' '}
          Migratsiya agentligi murojaatni rasman qabul qiladi va vositachi ustidan tekshiruv
          boshlaydi.
        </p>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <a
          className="btn"
          href="https://xorijdaish.uz/service/appeal"
          target="_blank"
          rel="noopener noreferrer"
        >
          Rasmiy murojaat ↗
        </a>
        <a className="btn ghost" href={`tel:${HOTLINE.num}`}>
          {HOTLINE.num} ga qo‘ng‘iroq
        </a>
      </div>
    </div>
  )
}

export default function Reports() {
  const [state, setState] = useState(isConfigured ? 'loading' : 'off')
  const [rows, setRows] = useState([])
  const [form, setForm] = useState(EMPTY)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [err, setErr] = useState('')

  useEffect(() => {
    if (!isConfigured) return
    let alive = true
    fetchReports()
      .then(r => {
        if (!alive) return
        setRows(r)
        setState('ready')
      })
      .catch(() => alive && setState('error'))
    return () => {
      alive = false
    }
  }, [])

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  async function onSubmit(e) {
    e.preventDefault()
    setErr('')
    setSending(true)
    try {
      await submitReport(form)
      setForm(EMPTY)
      setSent(true)
    } catch (e2) {
      setErr(
        String(e2.message).startsWith('not-configured')
          ? "Baza ulanmagan — quyidagi rasmiy kanaldan yozing."
          : "Yuborilmadi. Internetni tekshiring yoki rasmiy kanaldan yozing."
      )
    } finally {
      setSending(false)
    }
  }

  const showForm = state === 'ready' || state === 'loading'

  return (
    <section id="ogoh">
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">Ogohlantirish</div>
          <h2>Aldanganlar tajribasi</h2>
          <p>
            Bu bo‘limdagi xabarlarni odamlarning o‘zi yozadi. Har bir xabar{' '}
            <strong>moderatordan o‘tgandan keyin</strong> chiqadi — dalilsiz va aniq bo‘lmagan
            ayblovlar e’lon qilinmaydi. Vositachiga pul berishdan oldin uning nomini shu yerdan
            qidirib ko‘ring.
          </p>
        </div>

        {state === 'ready' && rows.length > 0 && (
          <div className="records">
            {rows.map(r => (
              <article className="rec report" key={r.id}>
                <div className="rec-top">
                  <div className="rec-title">
                    <h3>{r.who}</h3>
                    <div className="rec-emp">
                      {r.place || 'joyi ko‘rsatilmagan'} · {r.author || 'Anonim'} ·{' '}
                      {fmtDate(r.published_at)}
                    </div>
                  </div>
                  {r.loss_uzs > 0 && (
                    <div className="rec-pay">
                      <b>{r.loss_uzs.toLocaleString('en-US').replace(/,/g, ' ')}</b>
                      <small>ming so‘m zarar</small>
                    </div>
                  )}
                </div>
                <p className="report-story">{r.story}</p>
                {r.evidence && (
                  <div className="badges">
                    <span className="badge warn">Dalil: {r.evidence}</span>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}

        {state === 'ready' && rows.length === 0 && (
          <div className="empty">
            Hozircha tasdiqlangan xabar yo‘q. Birinchi bo‘lib siz yozishingiz mumkin.
          </div>
        )}

        {state === 'loading' && <div className="empty">Xabarlar yuklanmoqda…</div>}

        {(state === 'off' || state === 'error') && <OfficialFallback reason={state === 'off' ? 'not-configured' : 'error'} />}

        {showForm && (
          <form className="tell" onSubmit={onSubmit}>
            <h4>Siz ham aldangansizmi? Yozib qoldiring — keyingi odam saqlanadi.</h4>
            <div className="tell-grid">
              <label>
                <span>Vositachi yoki firma nomi *</span>
                <input type="text" value={form.who} onChange={set('who')} required maxLength={160} />
              </label>
              <label>
                <span>Qaysi shahar yoki davlat</span>
                <input type="text" value={form.place} onChange={set('place')} maxLength={160} />
              </label>
            </div>
            <label>
              <span>Nima bo‘lganini qisqacha yozing *</span>
              <textarea value={form.story} onChange={set('story')} required maxLength={2000} rows={4} />
            </label>
            <div className="tell-grid">
              <label>
                <span>Qancha pul yo‘qotdingiz (ming so‘m)</span>
                <input type="text" inputMode="numeric" value={form.loss} onChange={set('loss')} />
              </label>
              <label>
                <span>Qanday dalilingiz bor *</span>
                <input
                  type="text"
                  value={form.evidence}
                  onChange={set('evidence')}
                  required
                  maxLength={300}
                  placeholder="chek, yozishma, shartnoma nusxasi…"
                />
              </label>
            </div>
            <div className="tell-grid">
              <label>
                <span>Ismingiz yoki taxallus</span>
                <input type="text" value={form.author} onChange={set('author')} maxLength={80} />
              </label>
              <label>
                <span>Aloqa (faqat moderator ko‘radi)</span>
                <input
                  type="text"
                  value={form.contact}
                  onChange={set('contact')}
                  maxLength={120}
                  placeholder="telefon yoki e-pochta"
                />
              </label>
            </div>

            <div className="row-end">
              <button className="btn" type="submit" disabled={sending}>
                {sending ? 'Yuborilmoqda…' : 'Xabarni yuborish'}
              </button>
              <span className="hint">
                Xabar darhol chiqmaydi: moderator dalilni ko‘rib chiqqach e’lon qilinadi. Yolg‘on
                ayblov uchun javobgarlik yozgan odamning zimmasida.
              </span>
            </div>
            {sent && (
              <p className="ok-note">
                Rahmat — xabaringiz qabul qilindi va moderatsiyani kutmoqda. Shoshilinch holatda{' '}
                <a href={`tel:${HOTLINE.num}`}>{HOTLINE.num}</a> ga qo‘ng‘iroq qiling.
              </p>
            )}
            {err && <p className="err-note">{err}</p>}
          </form>
        )}
      </div>
    </section>
  )
}
