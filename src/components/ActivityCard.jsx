import Scene from './Scene.jsx'
import { Tag, Sparkle } from './ui.jsx'
import { PlanToggle } from './PlanBar.jsx'
import { ShopSuppliesButton } from './Shopping.jsx'

const PLACEHOLDER_KINDS = ['crown', 'balloons', 'tablescape', 'cake']

/** Activity photo with a graceful illustrated placeholder. */
export function ActivityImage({ activity, theme, index = 0, eager = false, className = '' }) {
  if (activity.imageUrl) {
    return (
      <img
        className={`activity-img ${className}`}
        src={activity.imageUrl}
        alt={activity.imageAlt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    )
  }
  return (
    <div className={`activity-img activity-img--placeholder ${className}`} aria-hidden="true">
      <Scene
        kind={PLACEHOLDER_KINDS[index % PLACEHOLDER_KINDS.length]}
        palette={theme.palette}
        motif={theme.motif}
        label={theme.name}
      />
    </div>
  )
}

/**
 * Activity card. The card opens the guide; the footer adds/removes the
 * activity from the plan. `reason` explains why it's recommended, `notes`
 * flag suitability (age, space, budget) without hiding anything.
 */
export default function ActivityCard({ activity, theme, index, onOpen, inPlan, onToggle, reason, notes = [], costLabel }) {
  return (
    <article className={`act-card ${inPlan ? 'act-card--in' : inPlan === false ? 'act-card--out' : ''}`}>
      <button
        type="button"
        className="act-card__open"
        data-activity={activity.id}
        onClick={() => onOpen(activity.id)}
        aria-label={`${activity.name} — view activity guide`}
      >
        <div className="act-card__media">
          <ActivityImage activity={activity} theme={theme} index={index} />
        </div>
        <div className="act-card__body">
          <div className="card__meta">
            <Tag tone={activity.energy === 'Calm' ? 'sage' : 'blush'}>{activity.energy}</Tag>
            <span>
              {activity.time}
              {costLabel ? ` · ${costLabel}` : ''}
            </span>
          </div>
          <h3 className="display-3">{activity.name}</h3>
          <p className="act-card__desc">{activity.description}</p>
          {reason && (
            <p className="act-card__match">
              <Sparkle size={10} /> {reason}
            </p>
          )}
          {notes.map((n) => (
            <p key={n} className="act-card__note">
              {n}
            </p>
          ))}
          <span className="act-card__cta">
            {activity.hasFullGuide ? 'View activity guide' : 'View activity'} <span aria-hidden="true">→</span>
          </span>
        </div>
      </button>
      <div className="act-card__foot">
        <ShopSuppliesButton kind="activity" id={activity.id} title={activity.name} label="Shop supplies" />
        {onToggle && <PlanToggle inPlan={inPlan} onToggle={onToggle} label={activity.name} />}
      </div>
    </article>
  )
}
