import { useState } from 'react'
import { Button, Eyebrow, Sparkle } from '../components/ui.jsx'
import { Motif, mix } from '../components/Scene.jsx'
import { bundleFor } from '../data/premium.js'

export default function Premium({ plan, hasPlan }) {
  const [open, setOpen] = useState(false)
  const deluxeBundle = bundleFor(plan.theme)
  const [name, setName] = useState('Olivia')
  const pal = plan.theme.palette.map((p) => p.hex)
  const age = plan.answers.ageRange === '6-8' ? 'six' : ''

  if (!hasPlan) {
    return (
      <section className="section container gate">
        <Eyebrow>
          <Sparkle size={10} /> Printables
        </Eyebrow>
        <h1 className="display-2">Printables are designed around your party</h1>
        <p className="lede">
          Plan your party first. We’ll match the invitations, signs, games and tags to your theme, colors and
          activities.
        </p>
        <Button as="a" href="#plan" size="lg">
          Plan Your Party
        </Button>
      </section>
    )
  }

  return (
    <div className="premium">
      <section className="page-hero container premium__hero">
        <div>
          <Eyebrow>
            <Sparkle size={10} /> Optional upgrade
          </Eyebrow>
          <h1 className="display-1">
            The {plan.theme.name} <em>Printable</em> Bundle
          </h1>
          <p className="lede">{deluxeBundle.description}</p>
          <label className="name-field">
            <span>Preview with a name</span>
            <input value={name} maxLength={14} onChange={(e) => setName(e.target.value)} />
          </label>
        </div>
        <div className="price-card">
          <span className="price-card__theme">{plan.theme.name} edition</span>
          <span className="price-card__price">
            <sup>$</sup>
            {deluxeBundle.price}
          </span>
          <span className="price-card__once">one-time · instant download</span>
          <ul>
            {deluxeBundle.perks.map((p) => (
              <li key={p}>
                <Sparkle size={9} /> {p}
              </li>
            ))}
          </ul>
          <Button size="lg" onClick={() => setOpen(true)}>
            Get the bundle
          </Button>
          <span className="price-card__fine">Prototype — no payment is taken</span>
        </div>
      </section>

      <section className="section container">
        <div className="printables">
          {deluxeBundle.includes.map((item) => (
            <article key={item.id} className="printable">
              <div className="printable__art" style={{ background: mix(pal[1], '#ffffff', 0.6) }}>
                <PrintableArt kind={item.art} pal={pal} name={name || 'Olivia'} age={age} motif={plan.theme.motif} />
              </div>
              <h3 className="display-3">{item.name}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      {open && (
        <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={() => setOpen(false)}>
          <div className="modal__card" onClick={(e) => e.stopPropagation()}>
            <Sparkle size={20} className="modal__spark" />
            <h2 id="modal-title" className="display-2">Checkout is coming soon</h2>
            <p>
              This prototype doesn’t take payments yet. When it launches, the {plan.theme.name} bundle for{' '}
              <strong>{name || 'your child'}</strong> will be ready to download instantly.
            </p>
            <Button onClick={() => setOpen(false)}>Back to the bundle</Button>
          </div>
        </div>
      )}
    </div>
  )
}

function PrintableArt({ kind, pal, name, age, motif }) {
  const ink = mix(pal[4], '#2d2219', 0.45)
  const serif = 'Cormorant Garamond, serif'
  const sans = 'Jost, sans-serif'
  const paper = '#FFFCF6'
  const common = { viewBox: '0 0 200 160', className: 'printable__svg', role: 'img' }

  if (kind === 'banner') {
    const letters = name.toUpperCase().slice(0, 8).split('')
    const w = 180 / Math.max(letters.length, 4)
    return (
      <svg {...common} aria-label="Name banner">
        <path d={`M 6 40 Q 100 60 194 40`} stroke={ink} strokeWidth="1" fill="none" />
        {letters.map((l, i) => {
          const x = 10 + i * w
          const y = 42 + Math.sin(((i + 0.5) / letters.length) * Math.PI) * 9
          return (
            <g key={i}>
              <path d={`M ${x} ${y} L ${x + w - 4} ${y} L ${x + (w - 4) / 2} ${y + w * 1.3} Z`} fill={pal[i % 4]} />
              <text x={x + (w - 4) / 2} y={y + w * 0.62} textAnchor="middle" fontFamily={serif} fontSize={w * 0.55} fill={ink}>
                {l}
              </text>
            </g>
          )
        })}
      </svg>
    )
  }
  if (kind === 'tag') {
    return (
      <svg {...common} aria-label="Favor tags">
        {[0, 1].map((k) => (
          <g key={k} transform={`translate(${48 + k * 62} ${28 + k * 10}) rotate(${k ? 8 : -6})`}>
            <path d="M0 10 L 10 0 L 50 0 L 50 100 L 0 100 Z" fill={paper} />
            <circle cx="18" cy="14" r="4" fill="none" stroke={ink} strokeWidth="1" />
            <Motif type={motif} x={25} y={48} s={0.45} c={pal} />
            <text x="25" y="82" textAnchor="middle" fontFamily={serif} fontStyle="italic" fontSize="10" fill={ink}>
              thank you
            </text>
          </g>
        ))}
      </svg>
    )
  }
  if (kind === 'cards') {
    return (
      <svg {...common} aria-label="Game cards">
        {[0, 1, 2].map((k) => (
          <g key={k} transform={`translate(${40 + k * 42} ${30 + (k % 2) * 8}) rotate(${(k - 1) * 8})`}>
            <rect width="56" height="80" rx="4" fill={paper} />
            <rect x="5" y="5" width="46" height="70" rx="2" fill="none" stroke={pal[k % 4]} strokeWidth="2" />
            <Motif type={motif} x={28} y={36} s={0.4} c={pal} />
            <text x="28" y="64" textAnchor="middle" fontFamily={sans} fontSize="6" letterSpacing="1" fill={ink}>
              CLUE {k + 1}
            </text>
          </g>
        ))}
      </svg>
    )
  }
  if (kind === 'sign') {
    return (
      <svg {...common} aria-label="Welcome sign">
        <rect x="50" y="14" width="100" height="132" fill={paper} />
        <rect x="56" y="20" width="88" height="120" fill="none" stroke={pal[1]} strokeWidth="1.5" />
        <Motif type={motif} x={100} y={52} s={0.55} c={pal} />
        <text x="100" y="90" textAnchor="middle" fontFamily={sans} fontSize="6" letterSpacing="2" fill={ink}>WELCOME TO</text>
        <text x="100" y="108" textAnchor="middle" fontFamily={serif} fontStyle="italic" fontSize="15" fill={ink}>{name}’s</text>
        <text x="100" y="122" textAnchor="middle" fontFamily={sans} fontSize="6" letterSpacing="2" fill={ink}>PARTY</text>
      </svg>
    )
  }
  if (kind === 'note') {
    return (
      <svg {...common} aria-label="Thank-you note">
        <rect x="30" y="28" width="140" height="104" fill={paper} transform="rotate(-3 100 80)" />
        <g transform="rotate(-3 100 80)">
          <text x="100" y="56" textAnchor="middle" fontFamily={serif} fontStyle="italic" fontSize="16" fill={ink}>Thank you</text>
          {[72, 86, 100, 114].map((y) => (
            <line key={y} x1="46" x2="154" y1={y} y2={y} stroke={pal[2]} strokeWidth="1" />
          ))}
          <text x="50" y="84" fontFamily={sans} fontSize="6" fill={ink} opacity="0.6">for coming to my party...</text>
        </g>
      </svg>
    )
  }
  // invite
  return (
    <svg {...common} aria-label="Invitation">
      <rect x="44" y="8" width="112" height="146" fill={mix(pal[2], '#ffffff', 0.4)} transform="rotate(5 100 80)" />
      <rect x="46" y="8" width="108" height="144" fill={paper} transform="rotate(-2 100 80)" />
      <g transform="rotate(-2 100 80)">
        <Motif type={motif} x={100} y={40} s={0.5} c={pal} />
        <text x="100" y="76" textAnchor="middle" fontFamily={sans} fontSize="6" letterSpacing="2" fill={ink}>YOU ARE INVITED</text>
        <text x="100" y="98" textAnchor="middle" fontFamily={serif} fontStyle="italic" fontSize="17" fill={ink}>
          {name} {age ? `is ${age}` : ''}
        </text>
        <line x1="80" x2="120" y1="108" y2="108" stroke={pal[4]} />
        <text x="100" y="124" textAnchor="middle" fontFamily={sans} fontSize="5.5" letterSpacing="1.5" fill={ink}>SATURDAY · 2 O’CLOCK</text>
      </g>
    </svg>
  )
}
