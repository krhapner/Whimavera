import { useMemo, useState } from 'react'
import { scaleRecipe, buildShoppingList } from '../lib/recipes.js'
import Scene from '../components/Scene.jsx'
import { Button, Eyebrow, SectionHeading, Tag, money } from '../components/ui.jsx'
import { BudgetLine, PlanToggle, FitBadge, rangeText } from '../components/PlanBar.jsx'
import { itemCost, fitFor, FIT_ORDER } from '../lib/recommend.js'
import { buildPartyShopping, typicalTotal } from '../lib/shopping.js'
import { SupplyRow, KitList, AffiliateDisclosure, ShopSuppliesButton, useShop } from '../components/Shopping.jsx'
import { slugify } from '../data/activityImages.js'

const TABS = [
  ['shop', 'Shop your party'],
  ['food', 'Food shopping list'],
  ['diy', 'Make it yourself'],
  ['swaps', 'Budget swaps'],
]

export default function ShopDiy({ plan, initialTab, adults = 0, shopping, catalog, derived, planApi }) {
  const [tab, setTab] = useState(initialTab || (plan.answers.style === 'diy' ? 'diy' : 'shop'))
  const [cat, setCat] = useState('All')
  const pal = plan.theme.palette
  const { sel, rec, ctx } = derived
  // Only what's selected in the plan reaches the shopping list.
  const party = useMemo(() => buildPartyShopping(plan, catalog, sel, { adults }), [plan, catalog, sel, adults])
  const diyAll = plan.diy.map((d) => ({ ...d, id: slugify(d.name) }))
  const diyFit = (d) => fitFor(derived, catalog, 'diy', d.id, { inPlan: sel.diy.includes(d.id) })
  const diyList = [...diyAll].sort((a, b) => FIT_ORDER[diyFit(a).kind] - FIT_ORDER[diyFit(b).kind])
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

        {tab === 'shop' && <PartyList party={party} derived={derived} plan={plan} cat={cat} setCat={setCat} />}

        {tab === 'diy' && (
          <section className="section section--flush">
            <div className="section-head-row">
              <p className="lede">
                {sel.diy.length
                  ? `${sel.diy.length} ${sel.diy.length === 1 ? 'project' : 'projects'} in your plan.`
                  : 'No DIY projects in your plan yet.'}
              </p>
            </div>
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
                    <FitBadge fit={diyFit(d)} />
                    <div className="diy__plan">
                      {cost && <span className="fine">Materials {rangeText(cost)}</span>}
                      <ShopSuppliesButton kind="diy" id={d.id} title={d.name} label="Shop materials" />
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

/** The consolidated party shopping list: only what's selected in the plan. */
function PartyList({ party, derived, plan, cat, setCat }) {
  const shop = useShop()
  const [copied, setCopied] = useState(false)
  const groups = cat === 'All' ? party.groups : party.groups.filter((g) => g.title === cat)
  const required = party.groups.flatMap((g) => g.required)
  const isOut = (i) => shop.owned.has(i.id) || shop.skipped.has(i.id)
  const toBuy = required.filter((i) => !isOut(i))
  const owned = required.filter((i) => shop.owned.has(i.id)).length
  const skipped = required.filter((i) => shop.skipped.has(i.id) && !shop.owned.has(i.id)).length
  const typical = typicalTotal(toBuy)
  const lean = derived.budget != null && (derived.budget <= 200 || ['tight', 'over'].includes(derived.status.kind))

  const asText = () =>
    [
      `${plan.theme.name} party — shopping list (${plan.guests} guests)`,
      ...party.groups
        .map((g) => {
          const items = g.required.filter((i) => !isOut(i))
          return items.length ? `\n${g.title}\n${items.map((i) => `- ${i.name} — ${i.label}${i.link ? `\n  ${i.link.href}` : ''}`).join('\n')}` : ''
        })
        .filter(Boolean),
    ].join('\n')
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(asText())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section className="section section--flush party-list">
      <div className="party-list__head">
        <div>
          <h2 className="display-2">Shop your party</h2>
          <p className="lede">
            Everything your plan needs, combined across activities, decorations and the menu — quantities for {plan.guests} guests.
          </p>
          <p className="party-list__counts">
            <strong>{toBuy.length}</strong> to buy · {owned} already owned{skipped ? ` · ${skipped} not needed` : ''}
            {typical && (
              <span>
                {' '}
                · typical cost of {typical.covered} estimated {typical.covered === 1 ? 'item' : 'items'} {rangeText(typical.range)}
              </span>
            )}
          </p>
        </div>
        <div className="party-list__actions no-print">
          <button type="button" className="btn btn--secondary btn--sm" onClick={copy}>
            {copied ? 'Copied ✓' : 'Copy list'}
          </button>
          <button type="button" className="btn btn--secondary btn--sm" onClick={() => window.print()}>
            Print
          </button>
        </div>
      </div>

      {lean && (
        <p className="notice notice--soft">
          Keeping costs down? Multipacks and items marked <em>Reusable</em> go furthest, and each item’s <em>Save</em> line and
          Alternatives show a cheaper route. You can still browse anything you like.
        </p>
      )}

      <div className="chip-wrap chip-wrap--filters no-print">
        {['All', ...party.groups.map((g) => g.title)].map((c) => (
          <button key={c} className={`chip ${cat === c ? 'is-selected' : ''}`} onClick={() => setCat(c)}>
            {c}
          </button>
        ))}
      </div>

      {!party.groups.length && <p className="fine">Nothing in your plan needs buying yet — add ideas from your results.</p>}

      {groups.map((g) => (
        <div key={g.id} className="shop-cat">
          <h3 className="display-3 shop-cat__title">{g.title}</h3>
          {g.required.length > 0 && (
            <ul className="supply-list">
              {g.required.map((i) => (
                <SupplyRow
                  key={i.id}
                  item={i}
                  showCategory={false}
                  showSources
                  skipped={shop.skipped.has(i.id)}
                  onSkip={() => shop.toggleSkipped(i.id)}
                />
              ))}
            </ul>
          )}
          {g.id === 'food' && <p className="fine">Fresh produce, dairy and eggs are on your <a href="#shopping">food shopping list</a>.</p>}
          {g.optional.length > 0 && (
            <details className="optional-ideas">
              <summary>
                Optional ideas · {g.optional.length} — not needed for your plan
              </summary>
              <ul className="supply-list">
                {g.optional.map((i) => (
                  <SupplyRow key={i.id} item={i} showCategory={false} showSources />
                ))}
              </ul>
            </details>
          )}
        </div>
      ))}

      <KitList kits={party.kits} />
      <p className="fine">
        Typical costs are generic planning estimates, not Amazon prices — check current prices on Amazon.
      </p>
      <AffiliateDisclosure />
    </section>
  )
}
