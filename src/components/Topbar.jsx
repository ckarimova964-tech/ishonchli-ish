import LangPicker from './LangPicker.jsx'

const LINKS = [
  { id: 'ish', label: 'Vakansiyalar' },
  { id: 'yol', label: 'Borish yo‘llari' },
  { id: 'ogoh', label: 'Xabarlar' },
  { id: 'kanal', label: 'Rasmiy kanallar' },
  { id: 'hujjat', label: 'Hujjatlar' },
]

export default function Topbar({ active, onGo }) {
  return (
    <div className="topbar">
      <div className="wrap topbar-in">
        <div className="brand" translate="no">
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
        <div className="topbar-actions">
          <LangPicker />
          <button className="sos-btn" onClick={() => onGo('yordam')}>
            <span className="hide-sm">Yordam kerak</span>
            <span className="show-sm">Yordam</span>
          </button>
        </div>
      </div>
    </div>
  )
}
