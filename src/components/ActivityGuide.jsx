import { useMemo } from 'react'
import { SupplyRow, KitList, AffiliateDisclosure } from './Shopping.jsx'
import { linesForActivity, consolidate, kitsFor, amazonLink } from '../lib/shopping.js'
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
  const g = activity.guide
  // Each material resolves to a reusable supply with an Amazon link; things
  // made at home stay in the list without a shopping link.
  const materialRows = useMemo(
    () =>
      g.materials.map((m, i) => {
        const [l] = linesForActivity({ id: activity.id, name: activity.name, guide: { materials: [m] } })
        return { key: `${m.name}-${i}`, m, item: l ? consolidate([l])[0] : null }
      }),
    [activity.id, activity.name, g],
  )
  const kits = useMemo(() => kitsFor([activity.id]).map((k) => ({ ...k, link: amazonLink(k) })), [activity.id])

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
          <section className="guide__section" id={`materials-${activity.id}`}>
            <h3 className="guide__h">Materials & shopping</h3>
            <p className="guide__hint">
              {g.guests ? `Quantities for ${g.guests} guests. ` : ''}Tick what you already have — shop the rest, or use the swaps.
            </p>
            <ul className="supply-list">
              {materialRows.map((row) =>
                row.item ? (
                  <SupplyRow key={row.key} item={row.item} />
                ) : (
                  <li key={row.key} className="supply supply--home">
                    <div className="supply__main">
                      <div className="supply__top">
                        <span className="supply__name">{row.m.name}</span>
                        <span className="supply__qty">{row.m.quantity.label}</span>
                      </div>
                      <div className="supply__meta">
                        <span>Made or gathered at home</span>
                      </div>
                    </div>
                  </li>
                ),
              )}
            </ul>
            <KitList kits={kits} />
            <AffiliateDisclosure />
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
