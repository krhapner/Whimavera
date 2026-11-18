import { useState } from 'react'
import Scene from './Scene.jsx'

const FALLBACK_KINDS = ['balloons', 'tablescape', 'crown', 'detail', 'invite']

/**
 * Interactive setup guide: pick a zone to see it.
 * Desktop — list on the left, large photo on the right.
 * Mobile — the selected zone opens inline with its photo.
 */
export default function ZoneExplorer({ zones, theme }) {
  const [active, setActive] = useState(0)
  const zone = zones[active]
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
          return (
            <li key={z.zone} className={`zx__item ${on ? 'is-active' : ''}`}>
              <button className="zx__btn" onClick={() => setActive(i)} aria-expanded={on}>
                <span className="zx__n">{String(i + 1).padStart(2, '0')}</span>
                <span className="zx__title">{z.zone}</span>
                <span className="zx__chev" aria-hidden="true" />
              </button>
              <div className="zx__body">
                <div className="zx__inner">
                  <div className="zx__inline-img">{on && sceneFor(z, i)}</div>
                  <p>{z.description}</p>
                </div>
              </div>
            </li>
          )
        })}
      </ol>

      <figure className="zx__stage" aria-live="polite">
        <div className="zx__frame" key={active}>
          {sceneFor(zone, active)}
        </div>
        <figcaption>
          <span>
            Zone {active + 1} of {zones.length}
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
