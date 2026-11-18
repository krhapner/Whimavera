import Scene from './Scene.jsx'
import { Tag, Sparkle } from './ui.jsx'

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

export default function ActivityCard({ activity, theme, index, playLabel, onOpen }) {
  return (
    <button
      type="button"
      className={`act-card ${activity.matches.length ? 'act-card--match' : ''}`}
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
          <span>{activity.time}</span>
        </div>
        <h3 className="display-3">{activity.name}</h3>
        <p className="act-card__desc">{activity.description}</p>
        {activity.matches.length > 0 && (
          <p className="act-card__match">
            <Sparkle size={10} /> For their love of {playLabel(activity.matches)}
          </p>
        )}
        <span className="act-card__cta">
          {activity.hasFullGuide ? 'View activity guide' : 'View activity'} <span aria-hidden="true">→</span>
        </span>
      </div>
    </button>
  )
}
