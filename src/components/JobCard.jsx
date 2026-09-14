import { useState } from 'react'
import { fmtDate, daysLeft } from '../utils.js'
import ApplyModal from './ApplyModal.jsx'

function Field({ label, value }) {
  if (!value && value !== 0) return null
  return (
    <div>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  )
}

function UzCard({ v }) {
  const [open, setOpen] = useState(false)
  const [how, setHow] = useState(false)
  const left = daysLeft(v.deadline)
  const closed = v.deadline && left !== null && left < 0

  return (
    <article className={`rec${closed ? ' closed' : ''}`}>
      <div className="rec-top">
        <div className="rec-title">
          <h3>{v.title}</h3>
          <div className="rec-emp">
            <b>{v.employer}</b> · {v.country}
            {v.sector ? ` · ${v.sector}` : ''}
          </div>
        </div>
        <div className="rec-pay">
          <b>
            {v.pay || '—'} {v.pay ? v.curSym : ''}
          </b>
          <small>{v.cur}</small>
        </div>
      </div>

      <div className="badges">
        <span className="badge ok">Migratsiya agentligi</span>
        {v.accom && <span className="badge blue">Yashash joyi bor</span>}
        {v.seats ? <span className="badge">{v.seats} ta o‘rin</span> : null}
        {v.langs && v.langs.length ? (
          <span className="badge warn">{v.langs.join(', ')} tili</span>
        ) : null}
        {closed ? (
          <span className="badge dim">Muddati tugagan</span>
        ) : v.deadline ? (
          <span className="badge dim">
            Muddat: {fmtDate(v.deadline)}
            {left !== null && left <= 30 ? ` · ${left} kun` : ''}
          </span>
        ) : null}
      </div>

      <dl className="kv">
        <Field label="Yosh" value={v.ageFrom || v.ageTo ? `${v.ageFrom || '—'}–${v.ageTo || '—'}` : null} />
        <Field label="Ish vaqti" value={[v.hours, v.days].filter(Boolean).join(' · ') || null} />
        <Field label="Malaka" value={v.exp} />
        <Field label="Ma’lumot" value={v.edu} />
        <Field label="Ijtimoiy sug‘urta" value={v.social} />
        <Field label="Jins talabi" value={v.gender} />
      </dl>

      {open && (
        <div className="rec-more">
          {v.duties && (
            <div>
              <h5>Vazifalar</h5>
              <p>{v.duties}</p>
            </div>
          )}
          {v.skills && (
            <div>
              <h5>Malaka talabi</h5>
              <p>{v.skills}</p>
            </div>
          )}
          {v.personal && (
            <div>
              <h5>Til va shaxsiy talablar</h5>
              <p>{v.personal}</p>
            </div>
          )}
          {v.probation && (
            <div>
              <h5>Sinov muddati</h5>
              <p>{v.probation}</p>
            </div>
          )}
          {v.place && (
            <div>
              <h5>Ish joyi manzili</h5>
              <p className="addr">{v.place}</p>
            </div>
          )}
          <div>
            <h5>Hujjat</h5>
            <p>
              {v.needPassport ? 'Xorijga chiqish pasporti talab qilinadi. ' : ''}
              E’lon tizimga {fmtDate(v.posted)} sanasida joylangan.
            </p>
          </div>
        </div>
      )}

      <div className="actions">
        <button className="btn sm" onClick={() => setHow(true)}>
          Ariza berish
        </button>
        <button className="btn sm ghost" onClick={() => setOpen(o => !o)}>
          {open ? 'Yopish' : 'Batafsil'}
        </button>
        <span className="spacer" />
        <span className="link-mini">Ariza bepul · davlat tizimi orqali</span>
      </div>

      {how && <ApplyModal v={v} onClose={() => setHow(false)} />}
    </article>
  )
}

function RuCard({ v }) {
  const [open, setOpen] = useState(false)
  return (
    <article className="rec ru">
      <div className="rec-top">
        <div className="rec-title">
          <h3>{v.occ}</h3>
          <div className="rec-emp">
            <b>{v.employer}</b>
          </div>
          <div className="rec-place">📍 {v.place || v.region}</div>
        </div>
        <div className="rec-pay">
          <b>
            {v.pay} {v.curSym}
          </b>
          <small>oyiga · RUB</small>
        </div>
      </div>

      <div className="badges">
        <span className="badge blue">«Работа России» — federal portal</span>
        {v.phone && <span className="badge">Telefon bor</span>}
        {v.email && <span className="badge">E-pochta bor</span>}
        <span className="badge dim">Yangilangan: {fmtDate(v.updated)}</span>
      </div>

      <dl className="kv">
        <Field label="Lavozim (rus tilida)" value={v.title} />
        <Field label="Tajriba" value={v.exp} />
        <Field label="Bandlik" value={v.employment} />
        <Field label="Ish grafigi" value={v.schedule} />
      </dl>

      {open && (
        <div className="rec-more">
          {v.duties && (
            <div>
              <h5>Talablar (manbadagi matn, rus tilida)</h5>
              <p>{v.duties}</p>
            </div>
          )}
          {v.term && (
            <div>
              <h5>Sharoit</h5>
              <p>{v.term}</p>
            </div>
          )}
          {v.addr && (
            <div>
              <h5>Manzil</h5>
              <p className="addr">{v.addr}</p>
            </div>
          )}
          {v.edu && (
            <div>
              <h5>Ma’lumot talabi</h5>
              <p>{v.edu}</p>
            </div>
          )}
          <div>
            <h5>Eslatma</h5>
            <p>
              Bu — Rossiya ish beruvchisining ochiq e’loni. Chet el fuqarosini ishga olish
              imkoniyati, patent va yashash joyi masalasini ish beruvchining o‘zidan aniqlang.
            </p>
          </div>
        </div>
      )}

      <div className="actions">
        {v.phone && (
          <a className="btn sm" href={`tel:${v.phone.replace(/[^\d+]/g, '')}`}>
            {v.phone}
          </a>
        )}
        {v.email && (
          <a className="btn sm ghost" href={`mailto:${v.email}`}>
            {v.email}
          </a>
        )}
        <button className="btn sm ghost" onClick={() => setOpen(o => !o)}>
          {open ? 'Yopish' : 'Batafsil'}
        </button>
        <span className="spacer" />
        <a className="link-mini" href={v.url} target="_blank" rel="noopener noreferrer">
          Asl e’lonni ko‘rish
        </a>
      </div>
    </article>
  )
}

function LocalCard({ v }) {
  const [open, setOpen] = useState(false)
  return (
    <article className="rec local">
      <div className="rec-top">
        <div className="rec-title">
          <h3>{v.title}</h3>
          <div className="rec-emp">
            <b>{v.employer}</b>
          </div>
          <div className="rec-place">
            📍 {v.place || v.region || 'joyi ko‘rsatilmagan'}
            {v.center ? ` · markaz: ${v.center}` : ''}
          </div>
        </div>
        {v.pay && (
          <div className="rec-pay">
            <b>{v.pay}</b>
            <small>so‘m/oyiga</small>
          </div>
        )}
      </div>

      <div className="badges">
        <span className="badge ok">Milliy vakansiyalar bazasi</span>
        <span className="badge">O‘zbekiston</span>
        {v.phone && <span className="badge blue">Telefon bor</span>}
        {v.live && <span className="badge warn">jonli natija</span>}
        {v.posted && <span className="badge dim">E’lon: {fmtDate(v.posted)}</span>}
      </div>

      <dl className="kv">
        <Field label="Bo‘linma" value={v.unit && v.unit !== 'Bo‘linma mavjud emas' ? v.unit : null} />
        <Field label="Stavka" value={v.rate ? `${v.rate}` : null} />
        <Field label="STIR" value={v.tin} />
        <Field label="Ko‘rilgan" value={v.views ? `${v.views} marta` : null} />
      </dl>

      {open && (
        <div className="rec-more">
          {v.addr && (
            <div>
              <h5>Manzil</h5>
              <p className="addr">{v.addr}</p>
            </div>
          )}
          {v.titleRu && (
            <div>
              <h5>Lavozim (rus tilida)</h5>
              <p>{v.titleRu}</p>
            </div>
          )}
          <div>
            <h5>Eslatma</h5>
            <p>
              Bu — davlat Milliy vakansiyalar bazasidagi e’lon. Ish sharoiti, ish vaqti va
              maoshning aniq shartlarini ish beruvchining o‘zidan so‘rang.
            </p>
          </div>
        </div>
      )}

      <div className="actions">
        {v.phone && (
          <a className="btn sm" href={`tel:${v.phone}`}>
            {v.phone}
          </a>
        )}
        <a className="btn sm ghost" href={v.url} target="_blank" rel="noopener noreferrer">
          E’lon sahifasi
        </a>
        <button className="btn sm ghost" onClick={() => setOpen(o => !o)}>
          {open ? 'Yopish' : 'Batafsil'}
        </button>
        <span className="spacer" />
        <a className="link-mini" href={v.url} target="_blank" rel="noopener noreferrer">
          Asl e’lonni ko‘rish
        </a>
      </div>
    </article>
  )
}

function WorldCard({ v }) {
  return (
    <article className="rec world">
      <div className="rec-top">
        <div className="rec-title">
          <h3>{v.title}</h3>
          <div className="rec-emp">
            <b>{v.employer}</b>
          </div>
          <div className="rec-place">📍 {v.place || v.country}</div>
        </div>
        {v.pay && (
          <div className="rec-pay">
            <b className="pay-sm">{v.pay}</b>
            <small>maosh (manbada)</small>
          </div>
        )}
      </div>

      <div className="badges">
        <span className="badge world">{v.country}</span>
        <span className="badge dim">Manba: {v.provider}</span>
        {v.jobType && <span className="badge">{v.jobType.replace(/_/g, ' ')}</span>}
        {v.posted && <span className="badge dim">E’lon: {fmtDate(v.posted)}</span>}
      </div>

      {v.tags?.length > 0 && (
        <div className="badges">
          {v.tags.map(t => (
            <span key={t} className="badge dim">
              {t}
            </span>
          ))}
        </div>
      )}

      <div className="actions">
        <a className="btn sm" href={v.url} target="_blank" rel="noopener noreferrer">
          E’lonni ochish ↗
        </a>
        <span className="spacer" />
        <span className="link-mini">
          Xususiy manba · e’lon ingliz yoki nemis tilida · viza sharoitini ish beruvchidan so‘rang
        </span>
      </div>
    </article>
  )
}

export default function JobCard({ v }) {
  if (v.src === 'uz') return <UzCard v={v} />
  if (v.src === 'local') return <LocalCard v={v} />
  if (v.src === 'world') return <WorldCard v={v} />
  return <RuCard v={v} />
}
