import { useState } from 'react'
import { Sparkle } from './ui.jsx'
import { birthdayThemes } from '../data/birthday/themes.js'
import { themePath, GUIDE_PATH } from '../seo/content.js'
import { AMAZON } from '../config/affiliate.js'

// `route` items are planner screens (hash routes on the home page); `href`
// items are real pages that search engines can crawl.
const NAV = [
  { route: 'home', label: 'Home' },
  { href: '/themes/', label: 'Party Themes' },
  { route: 'plan', label: 'Plan a Party' },
  { route: 'results', label: 'Your Plan' },
  { route: 'shop', label: 'Shop & DIY' },
]

/**
 * `base` is '' inside the planner (links stay on the page as #routes) and
 * '/' on prerendered pages, so planner links lead back to the app.
 */
const hrefOf = (n, base) => n.href || `${base}#${n.route}`

export function Logo({ onClick, base = '' }) {
  return (
    <a href={base ? '/' : '#home'} className="logo" onClick={onClick} aria-label="Whimavera home">
      <span className="logo__word">Whimavera</span>
      <Sparkle size={11} className="logo__spark" />
    </a>
  )
}

export function Header({ route, base = '' }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Logo onClick={() => setOpen(false)} base={base} />
        <nav className={`site-nav ${open ? 'is-open' : ''}`} aria-label="Main">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={hrefOf(n, base)}
              className={route === (n.route || n.href) ? 'is-active' : ''}
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

export function Footer({ base = '' }) {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div>
          <Logo base={base} />
          <p className="site-footer__tag">Beautifully imagined. Effortlessly planned.</p>
        </div>
        <div className="site-footer__cols">
          <div>
            <h4>Celebrate</h4>
            <a href={`${base}#plan`}>Plan a children's birthday</a>
            <a href="/themes/">Birthday party themes</a>
            <a href={GUIDE_PATH}>How to plan a kids’ party</a>
            <span className="muted">Weddings & showers — soon</span>
            <span className="muted">Holidays — soon</span>
            <span className="muted">Learning modules — soon</span>
          </div>
          <div>
            <h4>Party themes</h4>
            {birthdayThemes.map((t) => (
              <a key={t.id} href={themePath(t)}>
                {t.name}
              </a>
            ))}
          </div>
          <div>
            <h4>Whimavera</h4>
            <a href={`${base}#shop`}>Shop & DIY</a>
          </div>
        </div>
      </div>
      <p className="container site-footer__fine">
        {AMAZON.disclosure} Shopping links go to Amazon search results. Costs shown are typical planning estimates, not retailer prices.
      </p>
    </footer>
  )
}
