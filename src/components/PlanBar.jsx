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

/** One honest sentence about the estimate vs. the budget. */
export function BudgetLine({ derived }) {
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
        {estimate.incomplete ? `${est}+` : est}
      </span>
      <span className={`budget-line__item budget-line__status is-${status.kind}`}>
        <small>{{ over: 'Over budget', open: 'Budget', tight: 'Budget check', incomplete: 'Budget check' }[status.kind] || 'Remaining'}</small>
        {status.kind === 'open' && 'Showing everything'}
        {status.kind === 'incomplete' && 'Some items have no estimate'}
        {status.kind === 'under' && `about ${rangeText(status.left)}`}
        {status.kind === 'tight' && `fits at the low end; could run up to ${$(status.upTo)} over`}
        {status.kind === 'over' && `by about ${rangeText(status.by)}`}
      </span>
    </div>
  )
}

/**
 * Sticky-feeling plan bar under the hero: the budget at a glance, a view
 * switch (Recommended / Explore everything) and a gentle "Edit party details".
 */
export default function PlanBar({ derived, answers, setAnswers, view, setView, onSwap }) {
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
          <BudgetLine derived={derived} />
          <div className="plan-bar__actions">
            <div className="seg seg--sm" role="tablist" aria-label="What to show">
              <button role="tab" aria-selected={view === 'rec'} className={view === 'rec' ? 'is-active' : ''} onClick={() => setView('rec')}>
                Recommended for you
              </button>
              <button role="tab" aria-selected={view === 'all'} className={view === 'all' ? 'is-active' : ''} onClick={() => setView('all')}>
                Explore everything
              </button>
            </div>
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

/** Small add/remove control used on cards and zones. */
export function PlanToggle({ inPlan, onToggle, label }) {
  return (
    <button
      type="button"
      className={`plan-toggle ${inPlan ? 'is-in' : ''}`}
      onClick={onToggle}
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

/** "Recommended / All" switch for a single section. */
export function SectionView({ view, setView, count, noun }) {
  return (
    <button type="button" className="text-link section-view" onClick={() => setView(view === 'all' ? 'rec' : 'all')}>
      {view === 'all' ? 'Show only your plan' : `Explore all ${count} ${noun}`}
    </button>
  )
}
