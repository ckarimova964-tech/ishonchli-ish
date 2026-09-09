import { RED_FLAGS, HOTLINE } from '../sources.js'

export default function Safety() {
  return (
    <section id="xavf">
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">Xavfsizlik</div>
          <h2>Bu belgilarni ko‘rsangiz — to‘xtang</h2>
          <p>
            Firibgarlikning deyarli hammasi bir xil boshlanadi: pul oldindan so‘raladi, shartnoma
            berilmaydi, o‘ylashga vaqt qoldirilmaydi.
          </p>
        </div>

        <div className="flags">
          {RED_FLAGS.map(r => (
            <div className="flag" key={r.b}>
              <span className="no" aria-hidden="true">
                !
              </span>
              <span>
                <b>{r.b}</b>
                <span className="s">{r.s}</span>
              </span>
            </div>
          ))}
        </div>

        <div className="callout">
          <div>
            <b>Vositachi litsenziyasini bir daqiqada tekshiring</b>
            <p>
              Firma nomini yoki STIRini rasmiy reyestrdan qidiring. Ro‘yxatda yo‘q bo‘lsa — u
              tashkilot sizni xorijga ishga jo‘natishga umuman haqli emas. Aldangan bo‘lsangiz,
              Migratsiya agentligining ishonch telefoniga qo‘ng‘iroq qiling.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <a
              className="btn"
              href="https://my.gov.uz/uz/reyestr"
              target="_blank"
              rel="noopener noreferrer"
            >
              Reyestrni ochish ↗
            </a>
            <a className="btn ghost" href={`tel:${HOTLINE.num}`}>
              {HOTLINE.num} ga qo‘ng‘iroq
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
