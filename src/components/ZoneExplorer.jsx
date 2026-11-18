import { useEffect, useState } from 'react'
import Scene from './Scene.jsx'
import { PlanToggle } from './PlanBar.jsx'
import { ShopSuppliesButton } from './Shopping.jsx'

const FALLBACK_KINDS = ['balloons', 'tablescape', 'crown', 'detail', 'invite']
const TIER_LABEL = { budget: 'Budget', classic: 'Classic', premium: 'Premium' }

/**
 * Interactive setup guide: pick a zone to see it, choose a version
 * (budget / classic / premium) and add or remove it from the plan.
 * Desktop — list on the left, large photo on the right.
 * Mobile — the selected zone opens inline with its photo.
 *
 * zones: [{ id, zone, photo, inPlan, variantId, variants:[{id,name,tier,description,costLabel,costNote}], reason, upgrade }]
 */
export default function ZoneExplorer({ zones, theme, onToggle, onSwap }) {
  const [active, setActive] = useState(0)
  useEffect(() => {
    if (active >= zones.length) setActive(0)
  }, [zones.length, active])
  if (!zones.length) return <p className="fine">No setup zones in your plan yet — explore everything to add some.</p>
  const zone = zones[Math.min(active, zones.length - 1)]
  const variantOf = (z) => z.variants.find((v) => v.id === z.variantId) || z.variants[0]

  const sceneFor = (z, i) => (
    <Scene
      kind={FALLBACK_KINDS[i % FALLBACK_KINDS.length]}
      photo={z.photo}
      palette={theme.palette}
      motif={theme.motif}
      label={theme.name}
      alt={z.zone}
    />
  )

  return (
    <div className="zx">
      <ol className="zx__list">
        {zones.map((z, i) => {
          const on = i === active
          const v = variantOf(z)
          return (
            <li key={z.id} className={`zx__item ${on ? 'is-active' : ''} ${z.inPlan ? '' : 'is-out'}`}>
              <button className="zx__btn" onClick={() => setActive(i)} aria-expanded={on}>
                <span className="zx__n">{String(i + 1).padStart(2, '0')}</span>
                <span className="zx__title">
                  {z.zone}
                  {!z.inPlan && <span className="zx__out">Not in your plan</span>}
                </span>
                <span className="zx__chev" aria-hidden="true" />
              </button>
              <div className="zx__body">
                <div className="zx__inner">
                  <div className="zx__inline-img">{on && sceneFor(z, i)}</div>
                  <div className="zx__detail">
                    <p className="zx__vname">
                      {v.name}
                      {v.costLabel && <span> · {v.costLabel}</span>}
                    </p>
                    <p>{v.description}</p>
                    {v.costNote && <p className="fine">{v.costNote}</p>}
                    {z.reason && z.inPlan && <p className="act-card__match">✦ {z.reason}</p>}
                    {z.upgrade && <p className="act-card__match">✦ Recommended upgrade: {z.upgrade}</p>}
                    {z.variants.length > 1 && (
                      <div className="variant-pick" role="radiogroup" aria-label={`${z.zone} version`}>
                        {z.variants.map((x) => (
                          <button
                            key={x.id}
                            type="button"
                            role="radio"
                            aria-checked={x.id === v.id}
                            className={`chip chip--sm ${x.id === v.id ? 'is-selected' : ''}`}
                            onClick={() => onSwap?.(z.id, x.id)}
                          >
                            {TIER_LABEL[x.tier] || x.name}
                            {x.costLabel && <span className="variant-pick__cost"> {x.costLabel}</span>}
                          </button>
                        ))}
                      </div>
                    )}
                    <div className="zx__actions">
                      {v.supplies?.length > 0 && <ShopSuppliesButton kind="decor" id={z.id} variantId={v.id} title={`${z.zone} · ${v.name}`} label="Shop this look" />}
                      {onToggle && <PlanToggle inPlan={z.inPlan} onToggle={() => onToggle(z.id, !z.inPlan)} label={z.zone} />}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ol>

      <figure className="zx__stage" aria-live="polite">
        <div className="zx__frame" key={zone.id}>
          {sceneFor(zone, Math.min(active, zones.length - 1))}
        </div>
        <figcaption>
          <span>
            Zone {Math.min(active, zones.length - 1) + 1} of {zones.length}
          </span>
          {zone.zone}
        </figcaption>
        <div className="zx__nav">
          <button onClick={() => setActive((active - 1 + zones.length) % zones.length)} aria-label="Previous zone">
            ←
          </button>
          <button onClick={() => setActive((active + 1) % zones.length)} aria-label="Next zone">
            →
          </button>
        </div>
      </figure>
    </div>
  )
}
