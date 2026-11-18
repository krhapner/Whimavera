import { useState } from 'react'
import { Sparkle } from './ui.jsx'

const NAV = [
  { route: 'home', label: 'Home' },
  { route: 'plan', label: 'Plan a Party' },
  { route: 'results', label: 'Your Plan' },
  { route: 'shop', label: 'Shop & DIY' },
  { route: 'premium', label: 'Printables' },
]

export function Logo({ onClick }) {
  return (
    <a href="#home" className="logo" onClick={onClick} aria-label="Whimavera home">
      <span className="logo__word">Whimavera</span>
      <Sparkle size={11} className="logo__spark" />
    </a>
  )
}

export function Header({ route }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Logo onClick={() => setOpen(false)} />
        <nav className={`site-nav ${open ? 'is-open' : ''}`} aria-label="Main">
          {NAV.map((n) => (
            <a
              key={n.route}
              href={`#${n.route}`}
              className={route === n.route ? 'is-active' : ''}
              onClick={() => setOpen(false)}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <button
          className={`menu-toggle ${open ? 'is-open' : ''}`}
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div>
          <Logo />
          <p className="site-footer__tag">Beautifully imagined. Effortlessly planned.</p>
        </div>
        <div className="site-footer__cols">
          <div>
            <h4>Celebrate</h4>
            <a href="#plan">Children's birthdays</a>
            <span className="muted">Weddings & showers — soon</span>
            <span className="muted">Holidays — soon</span>
            <span className="muted">Learning modules — soon</span>
          </div>
          <div>
            <h4>Whimavera</h4>
            <a href="#premium">Printable bundles</a>
            <a href="#shop">Shop & DIY</a>
          </div>
        </div>
      </div>
      <p className="container site-footer__fine">
        Prototype · Illustrations stand in for photography · Costs shown are planning estimates, not retailer prices · Product links are placeholders.
        Some recommendations may become affiliate links in future.
      </p>
    </footer>
  )
}
