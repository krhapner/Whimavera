import { useState } from 'react'
import GuideShell from './GuideShell.jsx'
import { ActivityImage } from './ActivityCard.jsx'
import { Tag, Sparkle } from './ui.jsx'

const TIP_GROUPS = [
  ['younger', 'Simpler for younger children'],
  ['older', 'More exciting for older children'],
  ['budget', 'Low-cost alternatives'],
  ['sensory', 'Sensory-friendly & accessible'],
  ['troubleshooting', 'If something goes wrong'],
]

/**
 * Activity guide dialog. Large modal on desktop, full-screen sheet on mobile.
 * Escape closes, focus is trapped while open and returned to the card after.
 */
export default function ActivityGuide({ activity, theme, index, playLabel, onClose }) {
  const [have, setHave] = useState(() => new Set())
  const g = activity.guide

  const toggle = (key) =>
    setHave((s) => {
      const n = new Set(s)
      n.has(key) ? n.delete(key) : n.add(key)
      return n
    })

  const ages = g.ages ? `Ages ${g.ages.min}–${g.ages.max}` : null
  const tipGroups = TIP_GROUPS.filter(([k]) => g.tips[k].length)
  const titleId = `guide-title-${activity.id}`

  return (
    <GuideShell
      crumb={`Activity guide · ${theme.name}`}
      titleId={titleId}
      returnFocusSelector={`[data-activity="${activity.id}"]`}
      onClose={onClose}
    >
        <header className="guide__hero">
          <div className="guide__hero-img">
            <ActivityImage activity={activity} theme={theme} index={index} eager />
          </div>
          <div className="guide__hero-copy">
            <div className="guide__chips">
              <Tag tone={activity.energy === 'Calm' ? 'sage' : 'blush'}>{activity.energy}</Tag>
              <span>{activity.time}</span>
              {ages && <span>{ages}</span>}
            </div>
            <h2 id={titleId} className="display-2">
              {activity.name}
            </h2>
            <p className="lede">{g.summary || activity.description}</p>
            {activity.matches.length > 0 && (
              <p className="guide__match">
                <Sparkle size={10} /> Picked for their love of {playLabel(activity.matches)}
              </p>
            )}
            {g.guests && g.materials.length > 0 && (
              <p className="guide__for">Quantities below are for {g.guests} guests.</p>
            )}
          </div>
        </header>

        {!activity.hasFullGuide && (
          <section className="guide__section">
            <p className="guide__soon">A step-by-step guide for this activity is on its way.</p>
          </section>
        )}

        {g.ageNote && (
          <aside className="guide__callout">
            <h4>
              {g.ageNote.belowRange
                ? `Best for ages ${g.ages.min}+ — how to adapt it`
                : g.ageNote.tone === 'younger'
                  ? 'For your younger guests'
                  : 'For your older guests'}
            </h4>
            <ul>
              {g.ageNote.tips.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </aside>
        )}

        {g.materials.length > 0 && (
          <section className="guide__section">
            <h3 className="guide__h">Materials needed</h3>
            <p className="guide__hint">Tick things off as you gather them.</p>
            <ul className="mat-list">
              {g.materials.map((m) => {
                const on = have.has(m.name)
                return (
                  <li key={m.name}>
                    <label className={`check ${on ? 'is-on' : ''}`}>
                      <input type="checkbox" checked={on} onChange={() => toggle(m.name)} />
                      <span className="check__box" aria-hidden="true" />
                      <span className="mat">
                        <span className="mat__top">
                          <span className="mat__name">{m.name}</span>
                          <span className="mat__qty">{m.quantity.label}</span>
                        </span>
                        {(m.quantity.detail || m.note) && (
                          <span className="mat__note">{[m.quantity.detail, m.note].filter(Boolean).join(' · ')}</span>
                        )}
                        {m.substitute && <span className="mat__note">Swap: {m.substitute}</span>}
                        {(m.optional || m.reusable) && (
                          <span className="mat__tags">
                            {m.optional && <span>Optional</span>}
                            {m.reusable && <span>Reusable</span>}
                          </span>
                        )}
                      </span>
                    </label>
                  </li>
                )
              })}
            </ul>
          </section>
        )}

        {g.hasProducts && (
          <section className="guide__section">
            <h3 className="guide__h">Shop the supplies</h3>
            <ul className="shop-supplies">
              {g.materials
                .filter((m) => m.products.length)
                .flatMap((m) =>
                  m.products.map((p) => (
                    <li key={p.url}>
                      <span>{m.name}</span>
                      <a href={p.url} target="_blank" rel="noopener sponsored">
                        {p.title} · {p.retailer}
                      </a>
                    </li>
                  )),
                )}
            </ul>
          </section>
        )}

        {g.prep.length > 0 && (
          <section className="guide__section">
            <h3 className="guide__h">Before guests arrive</h3>
            <ol className="num-list guide__steps">
              {g.prep.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ol>
          </section>
        )}

        {g.setup.length > 0 && (
          <section className="guide__section">
            <h3 className="guide__h">Setting up the station</h3>
            <dl className="setup-list">
              {g.setup.map((s) => (
                <div key={s.label}>
                  <dt>{s.label}</dt>
                  <dd>{s.text}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {g.run.length > 0 && (
          <section className="guide__section">
            <h3 className="guide__h">How to run it</h3>
            <ol className="num-list guide__steps">
              {g.run.map((r) => (
                <li key={r.step}>
                  {r.step}
                  {r.say && <q className="guide__say">{r.say}</q>}
                </li>
              ))}
            </ol>
          </section>
        )}

        {g.safety.length > 0 && (
          <aside className="guide__callout guide__callout--safety">
            <h4>Safety notes</h4>
            <ul>
              {g.safety.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </aside>
        )}

        {tipGroups.length > 0 && (
          <section className="guide__section">
            <h3 className="guide__h">Tips & variations</h3>
            <div className="tip-grid">
              {tipGroups.map(([k, label]) => (
                <div key={k} className="tip">
                  <h4>{label}</h4>
                  <ul className="dot-list">
                    {g.tips[k].map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {g.cleanup.length > 0 && (
          <section className="guide__section">
            <h3 className="guide__h">Cleanup</h3>
            <ul className="dot-list">
              {g.cleanup.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </section>
        )}

    </GuideShell>
  )
}
