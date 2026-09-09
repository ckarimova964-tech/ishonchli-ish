import { STEPS } from '../sources.js'

export default function Guide() {
  return (
    <section id="hujjat">
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">Tayyorgarlik</div>
          <h2>Hujjatlar: qaysi biri qachon kerak</h2>
          <p>
            Tartib muhim — bittasini o‘tkazib yuborsangiz, chegarada yoki ish joyida muammo
            chiqadi. Har bir qadamdagi havola rasmiy davlat xizmatiga olib boradi.
          </p>
        </div>
        <div className="steps">
          {STEPS.map(s => (
            <div className="step" key={s.n}>
              <div className="step-n">Qadam {s.n}</div>
              <h4>{s.h}</h4>
              <p>{s.p}</p>
              {s.link && (
                <a href={s.link.u} target="_blank" rel="noopener noreferrer">
                  {s.link.t} ↗
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
