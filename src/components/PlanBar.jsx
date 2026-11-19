import { useState } from 'react'
import Stepper from './Stepper.jsx'
import { KIND_LABEL } from '../lib/recommend.js'

const $ = (n) => `$${Math.round(n).toLocaleString()}`
export const rangeText = (r) => (r ? (r[0] === r[1] ? $(r[0]) : `${$(r[0])}–${$(r[1])}`) : 'No estimate')

const DIETS = [
  ['nut-free', 'Nut-free'],
  ['gluten-free', 'Gluten-free'],
  ['dairy-free', 'Dairy-free'],
  ['egg-free', 'Egg-free'],
  ['vegetarian', 'Vegetarian'],
]
const LENGTHS = [
  [90, '1½ hours'],
  [120, '2 hours'],
  [180, '3 hours'],
]

const signed = (r) => (r[1] < 0 ? `−${rangeText([-r[1], -r[0]])}` : `+${rangeText(r)}`)

/** How an option fits the budget — shown on every card, nothing hidden. */
export function FitBadge({ fit, compact = false }) {
  if (!fit || fit.kind === 'in' || fit.kind === 'unknown') return null
  if (fit.kind === 'unsuited') return <p className="fit fit--unsuited">{fit.reason}</p>
  const free = fit.add[1] === 0 && fit.add[0] === 0
  const cost = free ? 'Free' : signed(fit.add)
  if (fit.kind === 'open') return <p className="fit fit--open">{cost}</p>
  if (fit.kind === 'fits')
    return (
      <p className="fit fit--fits">
        <span aria-hidden="true">✓</span> {compact ? 'Fits' : 'Fits your budget'} · {cost}
      </p>
    )
  return (
    <p className="fit fit--over">
      {compact ? `Over by ~$${fit.by}` : `Over budget by ~$${fit.by}`} · {cost}
    </p>
  )
}

/** Compact budget readout for the sticky section menu, with the add preview. */
export function BudgetMini({ derived, peek }) {
  const { estimate, budget, status } = derived
  const p = peek?.fit?.total ? peek : null
  const range = p ? p.fit.total : estimate.range
  const kind = p ? p.fit.kind : status.kind
  const left = budget != null ? [budget - range[1], budget - range[0]] : null
  return (
    <div className={`budget-mini is-${kind}`} aria-live="polite" data-budget-mini>
      {p && <span className="budget-mini__peek">With {p.name}:</span>}
      <span className="budget-mini__est">{estimate.incomplete && !p ? 'Est. —' : rangeText(range)}</span>
      {budget != null && (
        <span className="budget-mini__left">
          {left[0] >= 0 ? `of ${rangeText([budget, budget])} · ${rangeText([Math.max(0, left[0]), left[1]])} left` : `of ${rangeText([budget, budget])} · ~$${Math.round(-left[0])} over`}
        </span>
      )}
    </div>
  )
}

/** One honest sentence about the estimate vs. the budget. */
export function BudgetLine({ derived, peek }) {
  const { estimate, budget, status } = derived
  const est = rangeText(estimate.range)
  return (
    <div className="budget-line" aria-live="polite">
      <span className="budget-line__item">
        <small>Party budget</small>
        {budget == null ? 'No limit' : $(budget)}
      </span>
      <span className="budget-line__item">
        <small>Estimated cost</small>
        {estimate.incomplete ? (estimate.range[1] > 0 ? `${est}+` : 'Not estimated yet') : est}
      </span>
      <span className={`budget-line__item budget-line__status is-${status.kind}`}>
        <small>{{ over: 'Over budget', open: 'Budget', tight: 'Budget check', incomplete: 'Budget check' }[status.kind] || 'Remaining'}</small>
        {status.kind === 'open' && 'Showing everything'}
        {status.kind === 'incomplete' && (estimate.range[1] > 0 ? 'Some items have no estimate' : 'Cost estimates for this theme are coming soon')}
        {status.kind === 'under' && `about ${rangeText(status.left)}`}
        {status.kind === 'tight' && `fits at the low end; could run up to ${$(status.upTo)} over`}
        {status.kind === 'over' && `by about ${rangeText(status.by)}`}
      </span>
      {peek?.fit?.total && (
        <span className={`budget-line__item budget-line__peek is-${peek.fit.kind}`}>
          <small>With {peek.name}</small>
          {rangeText(peek.fit.total)}
          {peek.fit.kind === 'over' ? ` · ~$${peek.fit.by} over` : peek.fit.kind === 'fits' ? ' · still fits' : ''}
        </span>
      )}
    </div>
  )
}

/**
 * Sticky-feeling plan bar under the hero: the budget at a glance, a view
 * switch (Recommended / Explore everything) and a gentle "Edit party details".
 */
export default function PlanBar({ derived, answers, setAnswers, onSwap, peek }) {
  const [open, setOpen] = useState(false)
  const set = (patch) => setAnswers((a) => ({ ...a, ...patch }))
  const loves = answers.interests || []
  const toggleLove = (k) =>
    set({ interests: loves.includes(k) ? loves.filter((x) => x !== k) : [...loves.filter((x) => x !== 'everything'), k] })
  const diets = (answers.diet || []).filter((d) => d !== 'none')
  const toggleDiet = (d) => {
    const next = diets.includes(d) ? diets.filter((x) => x !== d) : [...diets, d]
    set({ diet: next.length ? next : ['none'] })
  }
  const showSwaps = ['over', 'tight'].includes(derived.status.kind) && derived.swaps.length > 0

  return (
    <section className="plan-bar">
      <div className="container">
        <div className="plan-bar__row">
          <BudgetLine derived={derived} peek={peek} />
          <div className="plan-bar__actions">
            <button type="button" className="text-link plan-bar__edit" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
              {open ? 'Done' : 'Edit party details'}
            </button>
          </div>
        </div>

        {showSwaps && (
          <p className="plan-bar__hint">
            Want to trim? Try{' '}
            {derived.swaps.slice(0, 2).map((s, i) => (
              <span key={s.variantId}>
                {i > 0 && ' or '}
                <button type="button" className="text-link" onClick={() => onSwap(s.slotId, s.variantId)}>
                  {s.to.toLowerCase()} instead of {s.from.toLowerCase()}
                </button>{' '}
                (saves ~${s.save})
              </span>
            ))}
            .
          </p>
        )}
        {derived.sel.missing.length > 0 && (
          <p className="plan-bar__hint">
            {derived.sel.missing.map((m) => `${m.activity} uses the ${m.food.replace(/-/g, ' ')} you removed from the menu.`).join(' ')}
          </p>
        )}

        {open && (
          <div className="edit-panel">
            <div className="edit-panel__field">
              <span className="edit-panel__label">Budget</span>
              <div className="edit-panel__budget">
                <input
                  type="range"
                  min={100}
                  max={1000}
                  step={25}
                  value={answers.budget}
                  disabled={answers.budgetMode === 'all'}
                  onChange={(e) => set({ budget: Number(e.target.value) })}
                  style={{ '--pct': `${((answers.budget - 100) / 900) * 100}%` }}
                  aria-label="Party budget"
                />
                <output>{answers.budgetMode === 'all' ? 'No limit' : $(answers.budget)}</output>
              </div>
              <label className={`check ${answers.budgetMode === 'all' ? 'is-on' : ''}`}>
                <input
                  type="checkbox"
                  checked={answers.budgetMode === 'all'}
                  onChange={(e) => set({ budgetMode: e.target.checked ? 'all' : 'limit' })}
                />
                <span className="check__box" aria-hidden="true" />
                <span>Show me everything, regardless of budget</span>
              </label>
            </div>
            <div className="edit-panel__field">
              <Stepper label="Guests" value={answers.guestCount} min={4} max={30} onChange={(v) => set({ guestCount: v })} />
            </div>
            <div className="edit-panel__field">
              <span className="edit-panel__label">Party length</span>
              <div className="chip-wrap chip-wrap--tight">
                {LENGTHS.map(([v, l]) => (
                  <button key={v} type="button" className={`chip chip--sm ${Number(answers.duration) === v ? 'is-selected' : ''}`} onClick={() => set({ duration: v })}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div className="edit-panel__field edit-panel__field--wide">
              <span className="edit-panel__label">How they love to play</span>
              <div className="chip-wrap chip-wrap--tight">
                {Object.entries(KIND_LABEL).map(([k, l]) => (
                  <button key={k} type="button" className={`chip chip--sm ${loves.includes(k) || loves.includes('everything') ? 'is-selected' : ''}`} onClick={() => toggleLove(k)}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div className="edit-panel__field edit-panel__field--wide">
              <span className="edit-panel__label">Dietary needs</span>
              <div className="chip-wrap chip-wrap--tight">
                {DIETS.map(([d, l]) => (
                  <button key={d} type="button" className={`chip chip--sm ${diets.includes(d) ? 'is-selected' : ''}`} onClick={() => toggleDiet(d)}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <p className="fine edit-panel__note">
              Your recommendations update as you change these. Anything you’ve added, removed or swapped stays exactly as you left it.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

/** Small add/remove control used on cards and zones. `onPeek` previews the budget before adding. */
export function PlanToggle({ inPlan, onToggle, label, onPeek }) {
  const peekProps = onPeek && !inPlan ? { onMouseEnter: () => onPeek(true), onMouseLeave: () => onPeek(false), onFocus: () => onPeek(true), onBlur: () => onPeek(false) } : {}
  return (
    <button
      type="button"
      className={`plan-toggle ${inPlan ? 'is-in' : ''}`}
      onClick={() => {
        onPeek?.(false)
        onToggle()
      }}
      {...peekProps}
      aria-pressed={inPlan}
      aria-label={`${inPlan ? 'Remove' : 'Add'} ${label} ${inPlan ? 'from' : 'to'} your plan`}
    >
      {inPlan ? (
        <>
          <span className="plan-toggle__on">✓ In your plan</span>
          <span className="plan-toggle__off">Remove</span>
        </>
      ) : (
        '+ Add to plan'
      )}
    </button>
  )
}
