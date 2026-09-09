import { HOTLINE } from '../sources.js'

const LINKS = [
  { id: 'ish', label: 'Vakansiyalar' },
  { id: 'ogoh', label: 'Xabarlar' },
  { id: 'kanal', label: 'Rasmiy kanallar' },
  { id: 'hujjat', label: 'Hujjatlar' },
  { id: 'xavf', label: 'Xavfsizlik' },
]

export default function Topbar({ active, onGo }) {
  return (
    <div className="topbar">
      <div className="wrap topbar-in">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">II</span> Ishonchli Ish
        </div>
        <nav className="navlinks">
          {LINKS.map(l => (
            <button
              key={l.id}
              onClick={() => onGo(l.id)}
              aria-current={active === l.id ? 'true' : 'false'}
            >
              {l.label}
            </button>
          ))}
        </nav>
        <a className="hotline" href={`tel:${HOTLINE.num}`}>
          <span>Ishonch telefoni</span> {HOTLINE.num}
        </a>
      </div>
    </div>
  )
}
