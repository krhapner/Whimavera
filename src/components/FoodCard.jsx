import Scene from './Scene.jsx'
import { Tag } from './ui.jsx'
import { PlanToggle, FitBadge } from './PlanBar.jsx'
import { ShopSuppliesButton } from './Shopping.jsx'

const PLACEHOLDER_KINDS = ['cake', 'tablescape', 'balloons', 'crown']
const TONE = { Sweet: 'blush', Showpiece: 'blush', Fresh: 'sage', Savory: 'neutral', Drink: 'sage' }

/** Menu photo with a graceful illustrated placeholder. */
export function MenuImage({ item, theme, index = 0, eager = false }) {
  if (item.imageUrl) {
    return (
      <img
        className="activity-img"
        src={item.imageUrl}
        alt={item.imageAlt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    )
  }
  return (
    <div className="activity-img activity-img--placeholder" aria-hidden="true">
      <Scene kind={item.tag === 'Showpiece' ? 'cake' : PLACEHOLDER_KINDS[index % PLACEHOLDER_KINDS.length]} palette={theme.palette} motif={theme.motif} label={theme.name} />
    </div>
  )
}

export const tagTone = (tag) => TONE[tag] || 'neutral'

export default function FoodCard({ item, theme, index = 0, onOpen, inList, inPlan, onToggle, reason, notes = [], costLabel, fit, onPeek }) {
  const isCake = !!item.recipe?.bakery
  return (
    <article className={`act-card food-card ${inPlan ? 'act-card--in' : inPlan === false ? 'act-card--out' : ''} ${fit ? `is-fit-${fit.kind}` : ''}`}>
      <button
        type="button"
        className="act-card__open"
        data-recipe={item.id}
        onClick={() => onOpen(item.id)}
        aria-label={`${item.recipe?.title || item.name} — view recipe`}
      >
        <div className="act-card__media food-card__media">
          <MenuImage item={item} theme={theme} index={index} />
          {inList && <span className="food-card__flag">On your shopping list</span>}
        </div>
        <div className="act-card__body">
          <div className="card__meta">
            <Tag tone={tagTone(item.tag)}>{item.tag}</Tag>
            <span>
              {item.recipe?.prepTime ? `${item.recipe.prepTime} prep` : ''}
              {costLabel ? ` · ${costLabel}` : ''}
            </span>
          </div>
          <h3 className="display-3">{item.recipe?.title || item.name}</h3>
          <p className="act-card__desc">{item.detail}</p>
          {reason && <p className="act-card__match">✦ {reason}</p>}
          <FitBadge fit={fit} />
          {notes.map((n) => (
            <p key={n} className="act-card__note">
              {n}
            </p>
          ))}
          <span className="act-card__cta">
            {item.recipe ? (isCake ? 'Recipe or bakery brief' : 'View recipe') : 'View details'} <span aria-hidden="true">→</span>
          </span>
        </div>
      </button>
      <div className="act-card__foot">
        <ShopSuppliesButton kind="food" id={item.id} title={item.recipe?.title || item.name} label="Shop ingredients" />
        {onToggle && <PlanToggle inPlan={inPlan} onToggle={onToggle} label={item.recipe?.title || item.name} onPeek={onPeek} />}
      </div>
    </article>
  )
}
