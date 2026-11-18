import { useState } from 'react'
import Scene from '../components/Scene.jsx'
import ZoneExplorer from '../components/ZoneExplorer.jsx'
import ActivityCard from '../components/ActivityCard.jsx'
import ActivityGuide from '../components/ActivityGuide.jsx'
import FoodCard from '../components/FoodCard.jsx'
import RecipeGuide from '../components/RecipeGuide.jsx'
import Stepper from '../components/Stepper.jsx'
import PlanBar, { BudgetLine, SectionView, rangeText } from '../components/PlanBar.jsx'
import { itemCost, overBudgetBy, lovesOf } from '../lib/recommend.js'
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

export default function Results({
  plan,
  onShowExample,
  guideId,
  recipeId,
  onOpenGuide,
  onOpenRecipe,
  onCloseGuide,
  adults,
  setAdults,
  shopping,
  catalog,
  derived,
  planApi,
  answers: quizAnswers,
  setAnswers,
}) {
  const { theme, answers } = plan
  const pal = theme.palette
  const { rec, sel, ctx } = derived
  const [views, setViews] = useState({ decor: 'rec', games: 'rec', food: 'rec' })
  const globalView = Object.values(views).every((v) => v === 'all') ? 'all' : 'rec'
  const setAllViews = (v) => setViews({ decor: v, games: v, food: v })

  const [done, setDone] = useState(() => new Set())
  const checklist = derived.checklist
  const totalTasks = checklist.reduce((n, g) => n + g.tasks.length, 0)
  const doneCount = checklist.reduce((n, g) => n + g.tasks.filter((t) => done.has(`${g.when}:${t}`)).length, 0)

  // Why something is (or isn't) in the plan — every recommendation has a reason.
  const recIds = { activities: rec.activities, food: rec.food }
  const reasonFor = (section, id, inPlan) => {
    if (inPlan) return rec.reasons[id]?.[0] || 'Added by you'
    if (recIds[section]?.includes(id)) return 'Recommended for you'
    return null
  }
  const notesFor = (id, inPlan, cost) => {
    const out = [...(rec.notes[id] || [])]
    if (!inPlan) {
      const over = overBudgetBy(derived, cost)
      if (over) out.push(`Adding this may take you about $${over} over budget`)
    }
    return out
  }
  const orderBy = (all, ids) => [...ids.map((id) => all.find((x) => x.id === id)).filter(Boolean), ...all.filter((x) => !ids.includes(x.id))]
  const gameList = views.games === 'all' ? orderBy(plan.games, sel.activities) : orderBy(plan.games, sel.activities).filter((g) => sel.activities.includes(g.id))
  const foodList = views.food === 'all' ? orderBy(plan.food, sel.food) : orderBy(plan.food, sel.food).filter((f) => sel.food.includes(f.id))
  const listCount = shopping.ids.filter((id) => sel.food.includes(id)).length

  const zoneModels = catalog.decor
    .map((slot) => {
      const inPlan = !!sel.slots[slot.id]
      const variantId = sel.slots[slot.id] || rec.slots[slot.id] || (slot.variants.find((v) => v.tier === 'classic') || slot.variants[0]).id
      const up = rec.upgrades.find((u) => u.slotId === slot.id && u.variantId !== variantId)
      const upV = up && slot.variants.find((v) => v.id === up.variantId)
      return {
        id: slot.id,
        zone: slot.zone,
        photo: slot.info?.photo,
        inPlan,
        variantId,
        reason: rec.reasons[slot.id]?.[0] || (inPlan ? 'Added by you' : null),
        upgrade: upV ? `${upV.name} (${rangeText(itemCost(catalog, 'decor', slot.id, ctx, upV.id))})` : null,
        variants: slot.variants.map((v) => ({ ...v, costLabel: v.cost ? rangeText(itemCost(catalog, 'decor', slot.id, ctx, v.id)) : null })),
      }
    })
    .filter((z) => views.decor === 'all' || z.inPlan)

  const loves = lovesOf(answers)
  const gamesIntro = (answers.interests || []).includes('everything')
    ? 'A balanced mix of calm and active play, picked for a child who loves a bit of everything.'
    : loves.length
      ? `Picked for a child who loves ${listify(loves.map((k) => PLAY[k]))}, with calm and active moments balanced.`
      : 'Alternating calm and active keeps little guests happy (and avoids meltdowns).'
  const lengthLabel = { 90: '1½-hour', 120: '2-hour', 180: '3-hour' }[Number(answers.duration) || 120]
  const dietList = (answers.diet || []).filter((d) => d !== 'none')
  const dietText = dietList.length ? ` and suited to ${listify(dietList)} guests` : ''
  const toggle = (key) =>
    setDone((s) => {
      const n = new Set(s)
      n.has(key) ? n.delete(key) : n.add(key)
      return n
    })

  const openIndex = guideId ? plan.games.findIndex((g) => g.id === guideId) : -1
  const openActivity = openIndex >= 0 ? plan.games[openIndex] : null
  const openFood = recipeId ? plan.food.find((f) => f.id === recipeId) : null

  return (
    <div className="results" style={{ '--accent': pal[0].hex, '--accent-2': pal[1].hex }}>
      {openFood && (
        <RecipeGuide
          item={openFood}
          theme={theme}
          childCount={plan.guests}
          adults={adults}
          setAdults={setAdults}
          shopping={shopping}
          onClose={onCloseGuide}
        />
      )}
      {openActivity && (
        <ActivityGuide
          activity={openActivity}
          theme={theme}
          index={openIndex}
          playLabel={playLabel}
          onClose={onCloseGuide}
        />
      )}
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
              <li>{answers.budgetMode === 'all' ? 'No budget limit' : `${money(plan.total)} budget`}</li>
              <li>{LABELS.location[answers.location]}</li>
              <li>{LABELS.style[answers.style]}</li>
              <li>{LABELS.prepTime[answers.prepTime]}</li>
            </ul>
            <div className="hero__actions">
              <Button as="a" href="#shop">Shop or DIY this plan</Button>
              <Button as="a" href="#plan" variant="ghost">Retake the quiz</Button>
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

      <PlanBar
        derived={derived}
        answers={quizAnswers}
        setAnswers={setAnswers}
        view={globalView}
        setView={setAllViews}
        onSwap={(slotId, variantId) => planApi.swap(slotId, variantId)}
      />

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
          <div className="section-head-row">
            <SectionHeading
              eyebrow="02 · Decorations & setup"
              title={plan.headings?.decor || 'Setting the scene'}
              intro={`Laid out for a ${LABELS.location[answers.location].toLowerCase()} party. Tap each zone to see it, choose the version that suits you, and set up in this order.`}
            />
            <SectionView view={views.decor} setView={(v) => setViews((x) => ({ ...x, decor: v }))} count={catalog.decor.length} noun="setup ideas" />
          </div>
          <ZoneExplorer
            zones={zoneModels}
            theme={theme}
            onToggle={(id, on) => planApi.toggle('decor', id, on)}
            onSwap={(slotId, variantId) => planApi.swap(slotId, variantId)}
          />
        </div>
      </section>

      {/* Budget */}
      <section className="section container" id="budget">
        <SectionHeading
          eyebrow="03 · Budget"
          title={derived.budget == null ? 'What it could cost' : `Planning within ${money(derived.budget)}`}
          intro="Estimates are ranges for everything currently in your plan. They update as you add, remove or swap ideas."
        />
        <div className="budget">
          <BudgetLine derived={derived} />
          <ul className="budget__rows budget__rows--est">
            {derived.estimate.categories.map((c, i) => (
              <li key={c.id}>
                <span className="budget__dot" style={{ background: pal[i % pal.length].hex }} />
                <div className="budget__label">
                  <strong>{c.label}</strong>
                  <span>{c.items.map((it) => it.name).join(' · ')}</span>
                </div>
                <span className="budget__amt">{rangeText(c.range)}</span>
              </li>
            ))}
            <li className="budget__total">
              <span />
              <div className="budget__label">
                <strong>Estimated total</strong>
                {derived.estimate.upgrades[1] > 0 && <span>Includes optional upgrades of {rangeText(derived.estimate.upgrades)}</span>}
              </div>
              <span className="budget__amt">
                {rangeText(derived.estimate.range)}
                {derived.estimate.incomplete ? '+' : ''}
              </span>
            </li>
          </ul>
          <p className="fine">
            Ranges are planning estimates for generic items, not quotes.
            {derived.estimate.incomplete > 0 && ` ${derived.estimate.incomplete} item${derived.estimate.incomplete === 1 ? ' has' : 's have'} no estimate yet, so the total may be higher.`}
          </p>
        </div>
      </section>

      {/* Games */}
      <section className="section section--tinted" id="games">
        <div className="container">
          <div className="section-head-row">
            <SectionHeading
              eyebrow="04 · Games & activities"
              title={`Made for ${ageLabel(answers.ageRange)}`}
              intro={gamesIntro}
            />
            <SectionView view={views.games} setView={(v) => setViews((x) => ({ ...x, games: v }))} count={plan.games.length} noun="activities" />
          </div>
          <div className="act-grid">
            {gameList.map((g, i) => {
              const inPlan = sel.activities.includes(g.id)
              const cost = itemCost(catalog, 'activities', g.id, ctx)
              return (
                <ActivityCard
                  key={g.id}
                  activity={g}
                  theme={theme}
                  index={i}
                  onOpen={onOpenGuide}
                  inPlan={inPlan}
                  onToggle={() => planApi.toggle('activities', g.id, !inPlan)}
                  reason={reasonFor('activities', g.id, inPlan)}
                  notes={notesFor(g.id, inPlan, cost)}
                  costLabel={cost ? (cost[1] === 0 ? 'free' : rangeText(cost)) : null}
                />
              )
            })}
          </div>
          {views.games === 'rec' && <p className="fine section-foot">Planned for a {lengthLabel} party — explore all activities to add more.</p>}
        </div>
      </section>

      {/* Food */}
      <section className="section container" id="food">
        <div className="section-head-row">
          <SectionHeading
            eyebrow="05 · Food & refreshments"
            title={plan.headings?.food || 'The menu'}
            intro={`Recipes are scaled for ${plan.guests} children${dietText}. Add grown-ups if they’ll be eating too — tap any dish for the full recipe.`}
          />
          <SectionView view={views.food} setView={(v) => setViews((x) => ({ ...x, food: v }))} count={plan.food.length} noun="dishes" />
        </div>
        <div className="menu-bar">
          <Stepper label="Adults eating too" value={adults} onChange={setAdults} />
          <a href="#shopping" className={`menu-bar__list ${listCount ? 'has-items' : ''}`}>
            {listCount ? `Shopping list · ${listCount} ${listCount === 1 ? 'recipe' : 'recipes'}` : 'Your shopping list is empty'}
            <span aria-hidden="true"> →</span>
          </a>
        </div>
        <div className="food-grid">
          {foodList.map((f, i) => {
            const inPlan = sel.food.includes(f.id)
            const cost = itemCost(catalog, 'food', f.id, ctx)
            return (
              <FoodCard
                key={f.id}
                index={i}
                item={f}
                theme={theme}
                onOpen={onOpenRecipe}
                inList={inPlan && shopping.ids.includes(f.id)}
                inPlan={inPlan}
                onToggle={() => planApi.toggle('food', f.id, !inPlan)}
                reason={reasonFor('food', f.id, inPlan)}
                notes={notesFor(f.id, inPlan, cost)}
                costLabel={cost ? rangeText(cost) : null}
              />
            )
          })}
        </div>
      </section>

      {/* Timeline */}
      <section className="section section--tinted" id="timeline">
        <div className="container">
          <SectionHeading
            eyebrow="06 · Party-day timeline"
            title="The day, gently paced"
            intro={`From ${derived.timeline.start} to ${derived.timeline.end}, built around the activities in your plan.`}
          />
          {derived.timeline.over > 0 && (
            <p className="notice notice--soft">
              This runs about {derived.timeline.over} minutes longer than your {lengthLabel} party. Remove an activity, or allow a little extra time.
            </p>
          )}
          <ol className="timeline">
            {derived.timeline.rows.map((t, i) => (
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
        <SectionHeading eyebrow="07 · Preparation checklist" title="Three weeks to wonderful" intro="Tasks for exactly what’s in your plan." />
        <div className="progress">
          <div className="progress__bar">
            <span style={{ width: `${(doneCount / totalTasks) * 100}%` }} />
          </div>
          <span>
            {doneCount} of {totalTasks} done
          </span>
        </div>
        <div className="checklist">
          {checklist.map((g) => (
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
            <Button as="a" href="#shop">Shop your party</Button>
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

const playLabel = (keys) => listify(keys.map((k) => PLAY[k]))
