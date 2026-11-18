import { useState } from 'react'
import Scene from '../components/Scene.jsx'
import ZoneExplorer from '../components/ZoneExplorer.jsx'
import { Button, Eyebrow, SectionHeading, Palette, Tag, Sparkle, money } from '../components/ui.jsx'
import { ageLabel } from '../lib/buildPlan.js'

const SECTIONS = [
  ['inspiration', 'Inspiration'],
  ['decor', 'Decor & setup'],
  ['budget', 'Budget'],
  ['games', 'Games'],
  ['food', 'Food'],
  ['timeline', 'Timeline'],
  ['checklist', 'Checklist'],
]

const PLAY = {
  crafts: 'crafting', cooking: 'cooking', active: 'running around', music: 'music',
  pretend: 'pretend play', hunts: 'treasure hunts', science: 'science', outdoors: 'the outdoors', quiet: 'quiet play',
}

const LABELS = {
  location: { backyard: 'Backyard', home: 'At home', park: 'Park', venue: 'Venue' },
  style: { diy: 'Mostly DIY', mix: 'DIY + ready-made', ready: 'Ready-made' },
  prepTime: { 'few-hours': 'A few hours prep', weekend: 'A weekend of prep', 'two-weeks': '2+ weeks prep' },
}

// Scroll within the page without touching the hash (the hash is the route).
const jump = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

export default function Results({ plan, onShowExample }) {
  const { theme, answers } = plan
  const pal = theme.palette
  const [done, setDone] = useState(() => new Set())
  const totalTasks = plan.checklist.reduce((n, g) => n + g.tasks.length, 0)
  const toggle = (key) =>
    setDone((s) => {
      const n = new Set(s)
      n.has(key) ? n.delete(key) : n.add(key)
      return n
    })

  return (
    <div className="results" style={{ '--accent': pal[0].hex, '--accent-2': pal[1].hex }}>
      {/* Plan hero */}
      <section className="plan-hero">
        <div className="container plan-hero__grid">
          <div>
            <Eyebrow>
              <Sparkle size={10} /> Your personalized plan
            </Eyebrow>
            <h1 className="display-1">{plan.title}</h1>
            <p className="lede">{plan.intro}</p>
            <ul className="fact-chips">
              <li>{ageLabel(answers.ageRange)}</li>
              <li>{plan.guests} guests</li>
              <li>{money(plan.total)} budget</li>
              <li>{LABELS.location[answers.location]}</li>
              <li>{LABELS.style[answers.style]}</li>
              <li>{LABELS.prepTime[answers.prepTime]}</li>
            </ul>
            <div className="hero__actions">
              <Button as="a" href="#shop">Shop or DIY this plan</Button>
              <Button as="a" href="#plan" variant="ghost">Edit answers</Button>
            </div>
          </div>
          <figure className="plan-hero__img">
            <Scene kind="hero" photo={plan.heroPhoto} palette={pal} motif={theme.motif} alt={`${theme.name} party scene`} />
          </figure>
        </div>
        {plan.isPreview && (
          <div className="container">
            <div className="notice">
              <strong>{theme.name}</strong> is getting its full plan soon. For now we’ve applied its palette to our
              complete Fairy Garden template so you can see how everything fits together.{' '}
              <button className="text-link" onClick={onShowExample}>View the Fairy Garden example</button>
            </div>
          </div>
        )}
      </section>

      <nav className="section-nav" aria-label="Plan sections">
        <div className="container section-nav__inner">
          {SECTIONS.map(([id, label]) => (
            <button key={id} onClick={() => jump(id)}>
              {label}
            </button>
          ))}
        </div>
      </nav>

      {/* Inspiration */}
      <section className="section container" id="inspiration">
        <SectionHeading eyebrow="01 · Inspiration board" title="The feeling we’re after" />
        <div className="mood-words">
          {plan.moodWords.map((w) => (
            <span key={w}>{w}</span>
          ))}
        </div>
        <div className="board">
          {plan.board.map((b, i) => (
            <figure key={i} className={`board__item board__item--${i}`}>
              <Scene kind={b.kind} photo={b.photo} palette={pal} motif={theme.motif} label={theme.name} alt={b.caption} />
              <figcaption>{b.caption}</figcaption>
            </figure>
          ))}
        </div>
        <div className="palette-block">
          <h3 className="display-3">Color palette</h3>
          <Palette colors={pal} />
        </div>
      </section>

      {/* Decor & setup */}
      <section className="section section--tinted" id="decor">
        <div className="container">
          <SectionHeading
            eyebrow="02 · Decorations & setup"
            title={plan.headings?.decor || 'Setting the scene'}
            intro={`Laid out for a ${LABELS.location[answers.location].toLowerCase()} party. Tap each zone to see it — set up in this order and you’ll be done in about three hours.`}
          />
          <ZoneExplorer zones={plan.setup} theme={theme} />
        </div>
      </section>

      {/* Budget */}
      <section className="section container" id="budget">
        <SectionHeading
          eyebrow="03 · Budget breakdown"
          title={`How ${money(plan.total)} comes together`}
          intro="A suggested split — move money between categories to suit what matters most to you."
        />
        <div className="budget">
          <div className="budget__bar" role="img" aria-label="Budget split">
            {plan.budget.map((b, i) => (
              <span key={b.id} style={{ flex: b.share, background: pal[i % pal.length].hex }} title={`${b.label}: ${money(b.amount)}`} />
            ))}
          </div>
          <ul className="budget__rows">
            {plan.budget.map((b, i) => (
              <li key={b.id}>
                <span className="budget__dot" style={{ background: pal[i % pal.length].hex }} />
                <div className="budget__label">
                  <strong>{b.label}</strong>
                  <span>{b.note}</span>
                </div>
                <span className="budget__pct">{Math.round(b.share * 100)}%</span>
                <span className="budget__amt">{money(b.amount)}</span>
              </li>
            ))}
            <li className="budget__total">
              <span />
              <div className="budget__label">
                <strong>Total</strong>
              </div>
              <span />
              <span className="budget__amt">{money(plan.budget.reduce((s, b) => s + b.amount, 0))}</span>
            </li>
          </ul>
          <p className="fine">Per guest: about {money(plan.total / plan.guests)}. Amounts are planning targets, not quotes.</p>
        </div>
      </section>

      {/* Games */}
      <section className="section section--tinted" id="games">
        <div className="container">
          <SectionHeading
            eyebrow="04 · Games & activities"
            title={`Made for ${ageLabel(answers.ageRange)}`}
            intro={
              (answers.interests || []).length
                ? `Picked first for a child who loves ${listify((answers.interests || []).map((k) => PLAY[k]))}. Alternate calm and active to keep the energy happy.`
                : 'Alternating calm and active keeps little guests happy (and avoids meltdowns).'
            }
          />
          <div className="card-grid">
            {plan.games.map((g) => (
              <article key={g.name} className={`card ${g.matches.length ? 'card--match' : ''}`}>
                <div className="card__meta">
                  <Tag tone={g.energy === 'Calm' ? 'sage' : 'blush'}>{g.energy}</Tag>
                  <span>{g.time}</span>
                </div>
                <h3 className="display-3">{g.name}</h3>
                <p>{g.description}</p>
                {g.matches.length > 0 && (
                  <p className="card__match">
                    <Sparkle size={10} /> For their love of {listify(g.matches.map((k) => PLAY[k]))}
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Food */}
      <section className="section container" id="food">
        <div className="split">
          <div>
            <SectionHeading eyebrow="05 · Food & refreshments" title={plan.headings?.food || 'The menu'} intro={`Quantities planned for ${plan.guests} children plus a few grown-ups.`} />
            <figure className="split__img">
              <Scene kind="cake" photo={plan.foodPhoto} palette={pal} alt="Cake" />
            </figure>
          </div>
          <ul className="menu">
            {plan.food.map((f) => (
              <li key={f.name}>
                <div>
                  <h3>{f.name}</h3>
                  <p>{f.detail}</p>
                </div>
                <Tag>{f.tag}</Tag>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Timeline */}
      <section className="section section--tinted" id="timeline">
        <div className="container">
          <SectionHeading eyebrow="06 · Party-day timeline" title="The day, gently paced" intro={`A two-hour party from ${plan.timeline[3].time} to ${plan.timeline[9].time}, built around their favorite activities.`} />
          <ol className="timeline">
            {plan.timeline.map((t, i) => (
              <li key={i} className={t.prep ? 'is-prep' : ''}>
                <time>{t.time}</time>
                <div>
                  <h3>{t.title}</h3>
                  <p>{t.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Checklist */}
      <section className="section container" id="checklist">
        <SectionHeading eyebrow="07 · Preparation checklist" title="Three weeks to wonderful" />
        <div className="progress">
          <div className="progress__bar">
            <span style={{ width: `${(done.size / totalTasks) * 100}%` }} />
          </div>
          <span>
            {done.size} of {totalTasks} done
          </span>
        </div>
        <div className="checklist">
          {plan.checklist.map((g) => (
            <div key={g.when} className="checklist__group">
              <h3 className="display-3">{g.when}</h3>
              <ul>
                {g.tasks.map((t) => {
                  const key = `${g.when}:${t}`
                  const on = done.has(key)
                  return (
                    <li key={t}>
                      <label className={`check ${on ? 'is-on' : ''}`}>
                        <input type="checkbox" checked={on} onChange={() => toggle(key)} />
                        <span className="check__box" aria-hidden="true" />
                        <span>{t}</span>
                      </label>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="cta-band">
          <div>
            <h2 className="display-2">Ready to bring it to life?</h2>
            <p className="lede">See everything to buy, what to make, and where to save.</p>
          </div>
          <div className="cta-band__actions">
            <Button as="a" href="#shop">Shop or DIY</Button>
            <Button as="a" href="#premium" variant="secondary">{theme.name} printables · $29</Button>
          </div>
        </div>
      </section>
    </div>
  )
}

function listify(items) {
  if (items.length <= 1) return items.join('')
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`
}
