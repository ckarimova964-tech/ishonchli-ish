import { useMemo, useState } from 'react'
import { COUNTRIES, SITUATIONS, HOME_CONTACTS, guessCountry } from '../help.js'

const digits = s => String(s || '').replace(/[^\d+]/g, '')

export default function Help() {
  const guessed = useMemo(() => guessCountry(), [])
  const [countryId, setCountryId] = useState(
    guessed && guessed !== 'UZ' && COUNTRIES.some(c => c.id === guessed) ? guessed : 'RU'
  )
  const [situationId, setSituationId] = useState('passport')
  const [form, setForm] = useState({ name: '', contact: '', where: '', what: '' })
  const [copied, setCopied] = useState(false)

  const country = COUNTRIES.find(c => c.id === countryId) || COUNTRIES[0]
  const situation = SITUATIONS.find(s => s.id === situationId) || SITUATIONS[0]
  const { mfa, migration } = HOME_CONTACTS
  const whatsappOffice = country.offices.find(o => o.whatsapp)

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const message = [
    'Assalomu alaykum. Men O‘zbekiston fuqarosiman, yordam kerak.',
    `Vaziyat: ${situation.label}.`,
    `Davlat: ${country.name}${form.where ? `, ${form.where}` : ''}.`,
    form.name && `Ism-familiya: ${form.name}.`,
    form.contact && `Bog‘lanish uchun: ${form.contact}.`,
    form.what && `Nima bo‘ldi: ${form.what}`,
  ]
    .filter(Boolean)
    .join('\n')

  const mailto = `mailto:${mfa.email}?subject=${encodeURIComponent(
    `Xorijdagi fuqaroga yordam — ${country.name}`
  )}&body=${encodeURIComponent(message)}`

  async function copy() {
    try {
      await navigator.clipboard.writeText(message)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section id="yordam" className="help">
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow sos-eyebrow">Xorijdagi fuqarolar uchun</div>
          <h2>Qiyin vaziyatga tushib qoldingizmi?</h2>
          <p>
            Pasport yo‘qolsa, ish haqi berilmasa yoki aldangan bo‘lsangiz — quyida qayerdaligingizni
            va vaziyatni tanlang. Rasmiy yordam raqamlari va nima qilish kerakligi chiqadi.
          </p>
        </div>

        <div className="help-alert">
          <b>Hayotingizga xavf bo‘lsa — avval shu raqamga qo‘ng‘iroq qiling:</b>
          <div className="help-emergency">
            {country.emergency.map(e => (
              <a key={e.num + e.label} className="sos-num" href={`tel:${e.num}`}>
                <span>{e.num}</span>
                <small>{e.label}</small>
              </a>
            ))}
          </div>
        </div>

        <div className="help-grid">
          <div className="help-col">
            <label className="help-label" htmlFor="help-country">
              1. Siz hozir qaysi davlatdasiz?
            </label>
            <select
              id="help-country"
              className="help-select"
              value={countryId}
              onChange={e => setCountryId(e.target.value)}
            >
              {COUNTRIES.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {guessed && guessed === countryId && (
              <p className="help-hint">Telefoningiz vaqt mintaqasiga qarab tanlandi — noto‘g‘ri bo‘lsa, o‘zgartiring.</p>
            )}

            <div className="help-label">2. Nima bo‘ldi?</div>
            <div className="help-situations">
              {SITUATIONS.map(s => (
                <button
                  key={s.id}
                  className="chip"
                  aria-pressed={situationId === s.id}
                  onClick={() => setSituationId(s.id)}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <ol className="help-steps">
              {situation.steps.map(step => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>

          <div className="help-col">
            <div className="help-label">3. Kimga murojaat qilish kerak — {country.name}</div>

            {country.embassy && (
              <div className="contact-card">
                <div className="contact-kind">Elchixona</div>
                <h4>{country.embassy.name}</h4>
                {country.embassy.phone && (
                  <a className="contact-phone" href={`tel:${digits(country.embassy.phone)}`}>
                    {country.embassy.phone}
                    {country.embassy.phoneNote ? <small> · {country.embassy.phoneNote}</small> : null}
                  </a>
                )}
                <a href={country.embassy.url} target="_blank" rel="noopener noreferrer">
                  Rasmiy sayt ↗
                </a>
              </div>
            )}

            {country.offices.map(o => (
              <div className="contact-card" key={o.city}>
                <div className="contact-kind">Migratsiya agentligi vakolatxonasi</div>
                <h4>{o.city}</h4>
                {o.addr && <p>{o.addr}</p>}
                {o.phones.map(p => (
                  <a key={p} className="contact-phone" href={`tel:${digits(p)}`}>
                    {p}
                  </a>
                ))}
                {o.whatsapp && (
                  <a
                    href={`https://wa.me/${digits(o.whatsapp).replace('+', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp / Telegram: {o.whatsapp} ↗
                  </a>
                )}
                {o.email && <a href={`mailto:${o.email}`}>{o.email}</a>}
              </div>
            ))}

            {!country.embassy && !country.offices.length && (
              <div className="contact-card">
                <div className="contact-kind">Elchixonalar ro‘yxati</div>
                <h4>Shu davlatdagi O‘zbekiston elchixonasini toping</h4>
                <a href={mfa.embassies} target="_blank" rel="noopener noreferrer">
                  Tashqi ishlar vazirligining rasmiy ro‘yxati ↗
                </a>
              </div>
            )}

            <div className="contact-card home">
              <div className="contact-kind">O‘zbekistonda — 24 soat</div>
              <h4>{mfa.name}</h4>
              <p>
                Ishonch telefoni <b>{mfa.hotline}</b> (faqat O‘zbekiston ichidan) · xorijdan:{' '}
                <a href={`tel:${digits(mfa.phone)}`}>{mfa.phone}</a> ·{' '}
                <a href={`mailto:${mfa.email}`}>{mfa.email}</a>
              </p>
              <h4 style={{ marginTop: 8 }}>{migration.name}</h4>
              <p>
                Ishonch telefoni <b>{migration.hotline}</b> (faqat O‘zbekiston ichidan) · xorijdan:{' '}
                <a href={`tel:${digits(migration.phone)}`}>{migration.phone}</a>
              </p>
            </div>
          </div>
        </div>

        <div className="report-box">
          <div className="report-head">
            <h3>4. Vaziyatingiz haqida xabar bering</h3>
            <p>
              Bo‘sh joylarni to‘ldiring — tayyor xabar hosil bo‘ladi. Uni o‘zingiz tanlagan yo‘l bilan
              rasmiy idoraga yuborasiz. Bu sayt xabaringizni hech qayerga saqlamaydi.
            </p>
          </div>
          <div className="tell-grid">
            <label>
              <span>Ism-familiyangiz</span>
              <input type="text" value={form.name} onChange={set('name')} maxLength={80} />
            </label>
            <label>
              <span>Telefon yoki Telegram</span>
              <input type="text" value={form.contact} onChange={set('contact')} maxLength={80} />
            </label>
            <label>
              <span>Shahar, manzil</span>
              <input type="text" value={form.where} onChange={set('where')} maxLength={120} />
            </label>
          </div>
          <label className="report-what">
            <span>Nima bo‘ldi — qisqacha</span>
            <textarea value={form.what} onChange={set('what')} rows={3} maxLength={800} />
          </label>

          <pre className="report-preview">{message}</pre>

          <div className="row-end">
            <a className="btn" href={mailto}>
              Tashqi ishlar vazirligiga e-pochta
            </a>
            {whatsappOffice && (
              <a
                className="btn"
                href={`https://wa.me/${digits(whatsappOffice.whatsapp).replace('+', '')}?text=${encodeURIComponent(message)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp — {whatsappOffice.city} vakolatxonasi
              </a>
            )}
            <a className="btn ghost" href={migration.appeal} target="_blank" rel="noopener noreferrer">
              Migratsiya agentligiga rasmiy murojaat ↗
            </a>
            <button className="btn ghost" type="button" onClick={copy}>
              {copied ? 'Nusxalandi ✓' : 'Matnni nusxalash'}
            </button>
          </div>
        </div>

        <p className="help-source">
          Raqamlar manbasi: Migratsiya agentligi va Tashqi ishlar vazirligining gov.uz dagi rasmiy
          sahifalari, elchixonalarning o‘z saytlari (2026-yil sentabrda tekshirilgan). Raqam
          ishlamasa — elchixonaning rasmiy saytidan yangisini tekshiring.
        </p>
      </div>
    </section>
  )
}
