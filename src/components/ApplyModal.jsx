import { useEffect, useRef } from 'react'
import { fmtDate, daysLeft } from '../utils.js'

// «Ariza berish» bosilganda saytning o'zida ochiladigan oyna.
// Ariza faqat Migratsiya agentligining davlat tizimida qabul qilinadi (shaxs Face-ID / OneID / MyID
// orqali tasdiqlanadi), shuning uchun oxirgi qadam — rasmiy tizimga o'tish. Rasmiy sahifalar
// X-Frame-Options: SAMEORIGIN yuborgani uchun ularni sayt ichida ochib bo'lmaydi.

const ONEID = 'https://id.egov.uz/uz'

export default function ApplyModal({ v, onClose }) {
  const first = useRef(null)
  const left = daysLeft(v.deadline)

  useEffect(() => {
    first.current?.focus()
    const onKey = e => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  const reqs = [
    v.ageFrom || v.ageTo ? `Yosh: ${v.ageFrom || '—'}–${v.ageTo || '—'}` : null,
    v.gender ? `Jins: ${v.gender}` : null,
    v.exp ? `Malaka: ${v.exp}` : null,
    v.langs?.length ? `Til: ${v.langs.join(', ')}` : null,
    v.skills || null,
    v.personal || null,
  ].filter(Boolean)

  const docs = [
    'Biometrik xorijga chiqish pasporti',
    'O‘zingizning telefon raqamingiz — ro‘yxatdan o‘tishda SMS keladi',
    v.langs?.length ? `${v.langs.join(', ')} tili bo‘yicha sertifikat (talab qilinsa)` : 'Til sertifikati (vakansiyada talab qilinsa)',
    'Diplom yoki malaka hujjati (talab qilinsa)',
  ]

  return (
    <div className="modal-back" onMouseDown={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="apply-title">
        <button className="modal-x" onClick={onClose} aria-label="Yopish">
          ×
        </button>

        <div className="eyebrow">Ariza berish · bepul</div>
        <h3 id="apply-title">{v.title}</h3>
        <p className="modal-sub">
          <b>{v.employer}</b> · {v.country}
          {v.pay ? ` · ${v.pay} ${v.curSym || ''}` : ''}
        </p>
        {v.deadline && (
          <p className="modal-deadline">
            Ariza muddati: <b>{fmtDate(v.deadline)}</b>
            {left !== null && left >= 0 ? ` · ${left} kun qoldi` : ''}
          </p>
        )}

        {reqs.length > 0 && (
          <div className="modal-block">
            <h5>Talablar</h5>
            <ul>
              {reqs.map(r => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="modal-block">
          <h5>Tayyorlab qo‘ying</h5>
          <ul className="checklist">
            {docs.map(d => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>

        <div className="modal-block steps-2">
          <div className="step-card primary">
            <span className="step-no">1</span>
            <div>
              <b>Ro‘yxatdan o‘ting</b>
              <p>
                OneID — davlat xizmatlariga kirish uchun yagona hisob. Sahifada «Ro‘yxatdan o‘tish»
                tugmasini bosing, pasport ma’lumotlari va telefon raqamingizni kiriting.
              </p>
              <a ref={first} className="btn" href={ONEID} target="_blank" rel="noopener noreferrer">
                OneID’da ro‘yxatdan o‘tish ↗
              </a>
            </div>
          </div>
          <div className="step-card">
            <span className="step-no">2</span>
            <div>
              <b>Anketani to‘ldiring</b>
              <p>
                Vakansiya sahifasida «Anketa to‘ldirish» ni bosing va Face-ID, OneID yoki MyID orqali
                kiring. Hisobingiz bo‘lsa, darhol shu qadamdan boshlang.
              </p>
              <a className="btn ghost" href={v.url} target="_blank" rel="noopener noreferrer">
                Rasmiy tizimda ariza berish ↗
              </a>
            </div>
          </div>
        </div>

        <p className="modal-note">
          Ikkala havola ham yangi oynada ochiladi — bu sayt ochiq qoladi, arizadan keyin boshqa
          ishlarni ham ko‘rishingiz mumkin. Ariza uchun hech kimga pul to‘lamang va parolingizni
          hech kimga aytmang.
        </p>
      </div>
    </div>
  )
}
