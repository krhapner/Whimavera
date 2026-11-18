import { useMemo, useState } from 'react'
import { scaleRecipe, buildShoppingList } from '../lib/recipes.js'
import Scene from '../components/Scene.jsx'
import { Button, Eyebrow, SectionHeading, Tag, money } from '../components/ui.jsx'
import { BudgetLine, PlanToggle, SectionView, rangeText } from '../components/PlanBar.jsx'
import { itemCost } from '../lib/recommend.js'
import { slugify } from '../data/activityImages.js'

const TABS = [
  ['shop', 'Shop the list'],
  ['food', 'Food shopping list'],
  ['diy', 'Make it yourself'],
  ['swaps', 'Budget swaps'],
]

export default function ShopDiy({ plan, initialTab, adults = 0, shopping, catalog, derived, planApi }) {
  const [tab, setTab] = useState(initialTab || (plan.answers.style === 'diy' ? 'diy' : 'shop'))
  const [cat, setCat] = useState('All')
  const [diyView, setDiyView] = useState('rec')
  const pal = plan.theme.palette
  const { sel, rec, ctx } = derived
  // Only what's selected in the plan reaches the shopping list.
  const supplies = derived.supplies
  const cats = ['All', ...supplies.map((g) => g.title)]
  const visible = cat === 'All' ? supplies : supplies.filter((g) => g.title === cat)
  const diyAll = plan.diy.map((d) => ({ ...d, id: slugify(d.name) }))
  const diyList = diyView === 'all' ? diyAll : diyAll.filter((d) => sel.diy.includes(d.id))
  const foodInPlan = shopping.ids.filter((id) => sel.food.includes(id))

  return (
    <div className="shop">
      <section className="page-hero container">
        <div>
          <Eyebrow>Shop or DIY · {plan.theme.name}</Eyebrow>
          <h1 className="display-1">
            Everything you need, <em>your way</em>
          </h1>
          <p className="lede">
            Quantities are calculated for {plan.guests} guests. Buy it ready-made, make it by hand, or mix the two.
          </p>
        </div>
        <div className="estimate-card">
          <span className="estimate-card__label">Your plan, estimated</span>
          <span className="estimate-card__value">
            {derived.estimate.range[1] ? rangeText(derived.estimate.range) : 'No estimate yet'}
          </span>
          <span className="estimate-card__sub">
            {derived.budget == null ? 'No budget limit set' : `Party budget ${money(derived.budget)}`} · only items in your plan are listed
          </span>
        </div>
      </section>

      <div className="container">
        <div className="tabs" role="tablist">
          {TABS.map(([id, label]) => (
            <button key={id} role="tab" aria-selected={tab === id} className={tab === id ? 'is-active' : ''} onClick={() => setTab(id)}>
              {label}
              {id === 'food' && foodInPlan.length > 0 && <span className="tabs__count">{foodInPlan.length}</span>}
            </button>
          ))}
        </div>

        {tab === 'food' && <FoodList plan={plan} adults={adults} shopping={shopping} inPlan={sel.food} />}

        {tab === 'shop' && (
          <section className="section section--flush">
            <BudgetLine derived={derived} />
            <div className="chip-wrap chip-wrap--filters">
              {cats.map((c) => (
                <button key={c} className={`chip ${cat === c ? 'is-selected' : ''}`} onClick={() => setCat(c)}>
                  {c}
                </button>
              ))}
            </div>
            {!supplies.length && <p className="fine">Nothing in your plan needs buying yet — add ideas from your results.</p>}
            {visible.map((g, gi) => (
              <div key={g.id} className="shop-cat">
                <h2 className="display-3 shop-cat__title">{g.title}</h2>
                {g.items && (
                  <div className="product-grid">
                    {g.items.map((item, i) => (
                      <article key={item.name + i} className="product">
                        <div className="product__img">
                          <Scene kind={['detail', 'tablescape', 'balloons', 'crown', 'invite'][(i + gi) % 5]} palette={pal} motif={plan.theme.motif} label={plan.theme.name} alt="" />
                          <span className="product__ph">Product photo</span>
                        </div>
                        <div className="product__body">
                          <h3>{item.name}</h3>
                          <dl className="product__meta">
                            <div>
                              <dt>Qty</dt>
                              <dd>{item.quantity}</dd>
                            </div>
                            {item.estHigh != null && (
                              <div>
                                <dt>Est.</dt>
                                <dd>
                                  {money(item.estLow)}–{money(item.estHigh)}
                                </dd>
                              </div>
                            )}
                          </dl>
                          {item.detail && <p className="product__alt">{item.detail}</p>}
                          <a className="btn btn--secondary btn--sm product__link" href="#shop" onClick={(e) => e.preventDefault()} aria-disabled="true" title="Placeholder — retailer links coming later">
                            View options <span className="ph-pill">placeholder</span>
                          </a>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
                {g.activities && (
                  <div className="supply-groups">
                    {g.activities.map((a) => (
                      <div key={a.id} className="supply-group">
                        <h3>
                          {a.name}
                          {a.range && <span className="fine"> · {a.range[1] === 0 ? 'free' : rangeText(a.range)}</span>}
                        </h3>
                        <ul className="dot-list">
                          {a.items.map((m) => (
                            <li key={m.name}>
                              {m.name} <span className="fine">— {m.quantity}{m.optional ? ' · optional' : ''}{m.reusable ? ' · reusable' : ''}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
                {g.diy && (
                  <div className="supply-groups">
                    {g.diy.map((d) => (
                      <div key={d.name} className="supply-group">
                        <h3>{d.name}</h3>
                        <ul className="dot-list">
                          {d.materials.map((m) => (
                            <li key={m}>{m}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <p className="fine">
              Estimates are rough planning ranges for generic items, not prices from any specific product or retailer.
              Product links are placeholders.
            </p>
          </section>
        )}

        {tab === 'diy' && (
          <section className="section section--flush">
            <div className="section-head-row">
              <p className="lede">
                {sel.diy.length
                  ? `${sel.diy.length} ${sel.diy.length === 1 ? 'project' : 'projects'} in your plan.`
                  : 'No DIY projects in your plan yet.'}
              </p>
              <SectionView view={diyView} setView={setDiyView} count={diyAll.length} noun="projects" />
            </div>
            {!diyList.length && <p className="fine">Switch to “Explore everything” to browse all {diyAll.length} projects.</p>}
            <div className="diy-grid">
              {diyList.map((d, i) => {
                const inPlan = sel.diy.includes(d.id)
                const cost = itemCost(catalog, 'diy', d.id, ctx)
                return (
                <article key={d.name} className="diy">
                  <div className="diy__img">
                    <Scene kind={['detail', 'crown', 'invite', 'cake'][i % 4]} photo={d.photo} palette={pal} motif={plan.theme.motif} label={plan.theme.name} alt="" />
                  </div>
                  <div className="diy__body">
                    <div className="card__meta">
                      <Tag tone="sage">{d.difficulty}</Tag>
                      <span>{d.time}</span>
                    </div>
                    <h3 className="display-3">{d.name}</h3>
                    <p className="diy__saves">{d.saves}</p>
                    {inPlan && rec.reasons[d.id]?.[0] && <p className="act-card__match">✦ {rec.reasons[d.id][0]}</p>}
                    {!inPlan && rec.diy.includes(d.id) && <p className="act-card__match">✦ Recommended for you</p>}
                    {(rec.notes[d.id] || []).map((n) => (
                      <p key={n} className="act-card__note">{n}</p>
                    ))}
                    <div className="diy__plan">
                      {cost && <span className="fine">Materials {rangeText(cost)}</span>}
                      <PlanToggle inPlan={inPlan} onToggle={() => planApi.toggle('diy', d.id, !inPlan)} label={d.name} />
                    </div>
                    <div className="diy__cols">
                      <div>
                        <h4>Materials</h4>
                        <ul className="dot-list">
                          {d.materials.map((m) => (
                            <li key={m}>{m}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4>Steps</h4>
                        <ol className="num-list">
                          {d.steps.map((s) => (
                            <li key={s}>{s}</li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>
                </article>
                )
              })}
            </div>
          </section>
        )}

        {tab === 'swaps' && (
          <section className="section section--flush">
            <SectionHeading title="Beautiful for less" intro="Our favorite substitutions that keep the look while protecting the budget." />
            {derived.swaps.length > 0 && (
              <ul className="swaps">
                {derived.swaps.map((w) => (
                  <li key={w.slotId}>
                    <span className="swaps__from">{w.from}</span>
                    <span className="swaps__arrow" aria-hidden="true">→</span>
                    <span className="swaps__to">{w.to}</span>
                    <span className="swaps__why">
                      Saves about ${w.save}{' '}
                      <button type="button" className="link-btn" onClick={() => planApi.swap(w.slotId, w.variantId)}>
                        Make this swap
                      </button>
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <ul className="swaps">
              {plan.substitutions.map((s) => (
                <li key={s.swap}>
                  <span className="swaps__from">{s.swap}</span>
                  <span className="swaps__arrow" aria-hidden="true">→</span>
                  <span className="swaps__to">{s.for}</span>
                  <span className="swaps__why">{s.why}</span>
                </li>
              ))}
            </ul>
            <h3 className="display-3 swaps__sub">Item-by-item alternatives</h3>
            <ul className="swaps swaps--compact">
              {plan.shop.flatMap((c) => c.items).map((i) => (
                <li key={i.name}>
                  <span className="swaps__from">{i.name}</span>
                  <span className="swaps__arrow" aria-hidden="true">→</span>
                  <span className="swaps__to">{i.diyAlt}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="cta-band cta-band--slim">
          <div>
            <h2 className="display-3">Want the paper goods done for you?</h2>
            <p>Matching {plan.theme.name} invitations, signs, games and favor tags, personalized and ready to print.</p>
          </div>
          <Button as="a" href="#premium">See the {plan.theme.name} bundle · $29</Button>
        </div>
      </div>
    </div>
  )
}

/** Consolidated grocery list built from the recipes added in the menu. */
function FoodList({ plan, adults, shopping, inPlan }) {
  const [have, setHave] = useState(() => new Set())
  const [copied, setCopied] = useState(false)
  const recipes = plan.food.filter((f) => f.recipe && shopping.ids.includes(f.id) && inPlan.includes(f.id))
  const names = Object.fromEntries(plan.food.map((f) => [f.id, f.recipe?.title || f.name]))
  const groups = useMemo(
    () => buildShoppingList(recipes.map((f) => scaleRecipe(f.recipe, { children: plan.guests, adults })), names),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [shopping.ids.join(','), inPlan.join(','), plan.guests, adults, plan.theme.id],
  )
  const total = groups.reduce((n, g) => n + g.items.length, 0)
  const toggle = (id) =>
    setHave((s) => {
      const n = new Set(s)
      n.has(id) ? n.delete(id) : n.add(id)
      return n
    })
  const copy = async () => {
    const text = groups.map((g) => `${g.aisle}\n${g.items.map((i) => `- ${i.display} ${i.name}`).join('\n')}`).join('\n\n')
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  if (!recipes.length) {
    return (
      <section className="section section--flush food-list">
        <div className="food-list__empty">
          <h2 className="display-3">Your food shopping list is empty</h2>
          <p>Open any dish in your plan’s menu and choose “Add ingredients to shopping list”. Shared ingredients are combined here automatically.</p>
          <a href="#results" className="btn btn--secondary">
            Go to the menu
          </a>
        </div>
      </section>
    )
  }

  return (
    <section className="section section--flush food-list">
      <div className="food-list__head">
        <div>
          <h2 className="display-3">Groceries for {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'}</h2>
          <p className="fine">
            Scaled for {plan.guests} children{adults ? ` and ${adults} ${adults === 1 ? 'adult' : 'adults'}` : ''} · {total} items ·
            amounts rounded up
          </p>
        </div>
        <div className="food-list__actions">
          <button type="button" className="btn btn--secondary btn--sm" onClick={copy}>
            {copied ? 'Copied ✓' : 'Copy list'}
          </button>
        </div>
      </div>
      <ul className="food-list__recipes">
        {recipes.map((f) => (
          <li key={f.id}>
            {names[f.id]}
            <button type="button" onClick={() => shopping.remove(f.id)} aria-label={`Remove ${names[f.id]} from shopping list`}>
              ×
            </button>
          </li>
        ))}
      </ul>
      <div className="food-list__aisles">
        {groups.map((g) => (
          <div key={g.aisle} className="aisle">
            <h3 className="aisle__title">{g.aisle}</h3>
            <ul>
              {g.items.map((i) => {
                const on = have.has(i.id)
                return (
                  <li key={i.id}>
                    <label className={`check ${on ? 'is-on' : ''}`}>
                      <input type="checkbox" checked={on} onChange={() => toggle(i.id)} />
                      <span className="check__box" aria-hidden="true" />
                      <span className="mat">
                        <span className="mat__top">
                          <span className="mat__name">{i.name}</span>
                          <span className="mat__qty">{i.display}</span>
                        </span>
                        <span className="mat__note">
                          {i.sources.join(', ')}
                          {i.optional ? ' · optional' : ''}
                        </span>
                      </span>
                    </label>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
