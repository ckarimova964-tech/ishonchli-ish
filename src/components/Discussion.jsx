import { useCallback, useEffect, useMemo, useState } from 'react'
import { TOPICS, contactProblem, fetchDiscussion, isConfigured, postMessage } from '../lib/discussionApi.js'

const EMPTY = { author: '', message: '', topic: 'fikr' }

function when(iso) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  const now = new Date()
  const time = d.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })
  const sameDay = d.toDateString() === now.toDateString()
  const y = new Date(now)
  y.setDate(now.getDate() - 1)
  if (sameDay) return `bugun ${time}`
  if (d.toDateString() === y.toDateString()) return `kecha ${time}`
  return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`
}

function MessageForm({ parentId, onDone, compact }) {
  const [form, setForm] = useState(EMPTY)
  const [state, setState] = useState('idle')
  const [error, setError] = useState('')
  const bad = contactProblem(form.message) || contactProblem(form.author)
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  async function submit(e) {
    e.preventDefault()
    if (bad || form.message.trim().length < 3) return
    setState('sending')
    setError('')
    try {
      await postMessage({ ...form, parentId })
      setForm(EMPTY)
      setState('sent')
      onDone?.()
    } catch (err) {
      setState('idle')
      setError(
        err.message === 'contacts'
          ? 'Xabarda havola, telefon raqami yoki @nom bor — ularni olib tashlang.'
          : err.message === 'not-configured'
            ? 'Muhokama hali ulanmagan.'
            : 'Yuborilmadi. Internetni tekshirib, qayta urinib ko‘ring.'
      )
    }
  }

  return (
    <form className={`disc-form${compact ? ' compact' : ''}`} onSubmit={submit}>
      {!compact && (
        <div className="disc-row">
          <label>
            <span>Ismingiz (ixtiyoriy)</span>
            <input type="text" value={form.author} onChange={set('author')} maxLength={60} placeholder="Mehmon" />
          </label>
          <label>
            <span>Mavzu</span>
            <select value={form.topic} onChange={set('topic')}>
              {TOPICS.map(t => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}
      <label>
        {!compact && <span>Xabaringiz</span>}
        <textarea
          value={form.message}
          onChange={set('message')}
          rows={compact ? 2 : 4}
          maxLength={1500}
          placeholder={compact ? 'Javobingizni yozing…' : 'Sayt haqida fikringiz, savolingiz yoki taklifingiz…'}
          required
        />
      </label>
      {bad && (
        <p className="disc-warn">
          Havola, telefon raqami va @nom yozish mumkin emas — muhokamani firibgar vositachilardan himoya qilish uchun.
        </p>
      )}
      {error && <p className="disc-warn">{error}</p>}
      <div className="disc-actions">
        <button className="btn sm" type="submit" disabled={!isConfigured || bad || state === 'sending'}>
          {state === 'sending' ? 'Yuborilmoqda…' : compact ? 'Javob yuborish' : 'Xabarni yuborish'}
        </button>
        {state === 'sent' && !compact && <span className="disc-ok">Rahmat! Xabaringiz chiqdi.</span>}
      </div>
    </form>
  )
}

export default function Discussion() {
  const [rows, setRows] = useState([])
  const [state, setState] = useState(isConfigured ? 'loading' : 'off')
  const [topic, setTopic] = useState('all')
  const [replyTo, setReplyTo] = useState(null)

  const load = useCallback(() => {
    if (!isConfigured) return
    fetchDiscussion()
      .then(r => {
        setRows(r)
        setState('ready')
      })
      .catch(() => setState('error'))
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const threads = useMemo(() => {
    const replies = new Map()
    for (const r of rows) {
      if (!r.parent_id) continue
      if (!replies.has(r.parent_id)) replies.set(r.parent_id, [])
      replies.get(r.parent_id).push(r)
    }
    return rows
      .filter(r => !r.parent_id && (topic === 'all' || r.topic === topic))
      .map(r => ({ ...r, replies: (replies.get(r.id) || []).slice().reverse() }))
  }, [rows, topic])

  const topicLabel = id => TOPICS.find(t => t.id === id)?.label || id

  return (
    <section id="muhokama">
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">Muhokama</div>
          <h2>Sayt haqida gaplashamiz</h2>
          <p>
            Fikringizni yozing, savol bering, taklif qiling yoki ish qidirish tajribangiz bilan
            bo‘lishing. Xabar darhol chiqadi. Firibgarlarning reklamasidan himoya uchun havola,
            telefon raqami va @nom yozib bo‘lmaydi.
          </p>
        </div>

        {state === 'off' && (
          <div className="disc-off">
            <b>Muhokama bo‘limi hali ulanmagan.</b> Sayt egasi xabarlar bazasini ulashi bilan shu yerda
            odamlarning fikrlari chiqadi va yozish mumkin bo‘ladi.
          </div>
        )}
        {state === 'error' && (
          <div className="disc-off">Xabarlarni yuklab bo‘lmadi. Birozdan keyin sahifani yangilang.</div>
        )}

        <div className="disc-grid">
          <div className="disc-new">
            <h3>Yangi xabar</h3>
            <MessageForm onDone={load} />
          </div>

          <div className="disc-list">
            <div className="chips">
              <button className="chip" aria-pressed={topic === 'all'} onClick={() => setTopic('all')}>
                Hammasi
              </button>
              {TOPICS.map(t => (
                <button key={t.id} className="chip" aria-pressed={topic === t.id} onClick={() => setTopic(t.id)}>
                  {t.label}
                </button>
              ))}
            </div>

            {state === 'loading' && <div className="empty">Xabarlar yuklanmoqda…</div>}
            {state === 'ready' && threads.length === 0 && (
              <div className="empty">Hozircha xabar yo‘q — birinchi bo‘lib siz yozing.</div>
            )}

            {threads.map(t => (
              <article className="disc-item" key={t.id}>
                <header>
                  <span className={`badge topic-${t.topic}`}>{topicLabel(t.topic)}</span>
                  <b>{t.author}</b>
                  <time dateTime={t.created_at}>{when(t.created_at)}</time>
                </header>
                <p>{t.message}</p>

                {t.replies.length > 0 && (
                  <div className="disc-replies">
                    {t.replies.map(r => (
                      <div className="disc-reply" key={r.id}>
                        <header>
                          <b>{r.author}</b>
                          <time dateTime={r.created_at}>{when(r.created_at)}</time>
                        </header>
                        <p>{r.message}</p>
                      </div>
                    ))}
                  </div>
                )}

                <button className="link-mini disc-reply-btn" onClick={() => setReplyTo(replyTo === t.id ? null : t.id)}>
                  {replyTo === t.id ? 'Bekor qilish' : `Javob yozish${t.replies.length ? ` · ${t.replies.length} ta javob` : ''}`}
                </button>
                {replyTo === t.id && (
                  <MessageForm
                    compact
                    parentId={t.id}
                    onDone={() => {
                      setReplyTo(null)
                      load()
                    }}
                  />
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
