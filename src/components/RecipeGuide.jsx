import { useMemo, useState } from 'react'
import GuideShell from './GuideShell.jsx'
import Stepper from './Stepper.jsx'
import { MenuImage, tagTone } from './FoodCard.jsx'
import { Tag } from './ui.jsx'
import { scaleRecipe } from '../lib/recipes.js'

function Bullets({ items }) {
  return (
    <ul className="dot-list">
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  )
}

/** Recipe / preparation guide for a menu item, in the shared guide frame. */
export default function RecipeGuide({ item, theme, childCount, adults, setAdults, shopping, onClose }) {
  const recipe = item.recipe
  const [mode, setMode] = useState('diy')
  const scaled = useMemo(
    () => (recipe ? scaleRecipe(recipe, { children: childCount, adults }) : null),
    [recipe, childCount, adults],
  )
  const titleId = `recipe-title-${item.id}`
  const title = recipe?.title || item.name
  const inList = shopping.ids.includes(item.id)
  const showBakery = recipe?.bakery && mode === 'bakery'

  // Group ingredients under their sub-headings, preserving order.
  const groups = useMemo(() => {
    if (!scaled) return []
    const out = []
    for (const i of scaled.ingredients) {
      const name = i.group || ''
      let g = out.find((x) => x.name === name)
      if (!g) out.push((g = { name, items: [] }))
      g.items.push(i)
    }
    return out
  }, [scaled])

  return (
    <GuideShell
      crumb={`Menu · ${theme.name}`}
      titleId={titleId}
      returnFocusSelector={`[data-recipe="${item.id}"]`}
      onClose={onClose}
    >
      <header className="guide__hero">
        <div className="guide__hero-img">
          <MenuImage item={item} theme={theme} eager />
        </div>
        <div className="guide__hero-copy">
          <div className="guide__chips">
            <Tag tone={tagTone(item.tag)}>{item.tag}</Tag>
            {recipe?.prepTime && <span>Prep {recipe.prepTime}</span>}
            {recipe?.totalTime && <span>Total {recipe.totalTime}</span>}
          </div>
          <h2 id={titleId} className="display-2">
            {title}
          </h2>
          <p className="lede">{recipe?.summary || item.detail}</p>
        </div>
      </header>

      {!recipe && (
        <section className="guide__section">
          <p className="guide__soon">A full recipe for this dish is on its way.</p>
        </section>
      )}

      {recipe && (
        <>
          <section className="guide__section">
            <div className="serves">
              <div className="serves__count">
                <span className="serves__label">Serving</span>
                <span className="serves__num">
                  {childCount} {childCount === 1 ? 'child' : 'children'}
                  {adults > 0 && ` + ${adults} ${adults === 1 ? 'adult' : 'adults'}`}
                </span>
                <span className="serves__make">
                  {recipe.yield.fixed
                    ? `Makes ${recipe.yield.label}`
                    : `Makes ${scaled.makes} ${scaled.makes === 1 ? recipe.yield.servingLabel : `${recipe.yield.servingLabel}s`}` +
                      (scaled.makes > scaled.needed ? ` — about ${scaled.needed} needed, rounded up to a full batch` : '')}
                </span>
              </div>
              <Stepper label="Adults eating too" hint="Add them if they’ll eat" value={adults} onChange={setAdults} />
            </div>
            {scaled.tooSmall && (
              <p className="serves__warn">
                This cake serves {recipe.yield.label}. For {scaled.people} people, add a third tier or a matching sheet cake.
              </p>
            )}
          </section>

          {recipe.bakery && (
            <div className="guide__section">
              <div className="seg" role="tablist" aria-label="How to get the cake">
                <button role="tab" aria-selected={mode === 'diy'} className={mode === 'diy' ? 'is-active' : ''} onClick={() => setMode('diy')}>
                  Make it yourself
                </button>
                <button role="tab" aria-selected={mode === 'bakery'} className={mode === 'bakery' ? 'is-active' : ''} onClick={() => setMode('bakery')}>
                  Order from a bakery
                </button>
              </div>
            </div>
          )}

          {showBakery ? (
            <>
              <section className="guide__section">
                <h3 className="guide__h">Ordering from a bakery</h3>
                <p>{recipe.bakery.summary}</p>
                <h4 className="guide__sub">What to ask for</h4>
                <Bullets items={recipe.bakery.order} />
                <h4 className="guide__sub">Questions to ask</h4>
                <ol className="num-list guide__steps">
                  {recipe.bakery.questions.map((q) => (
                    <li key={q}>{q}</li>
                  ))}
                </ol>
                <h4 className="guide__sub">Timeline</h4>
                <Bullets items={recipe.bakery.timeline} />
                <h4 className="guide__sub">On the day</h4>
                <Bullets items={recipe.bakery.dayOf} />
                <p className="fine">Whimavera doesn’t list or recommend specific bakeries or prices — choose a local bakery you trust.</p>
              </section>
              {recipe.safety.length > 0 && (
                <aside className="guide__callout guide__callout--safety">
                  <h4>Edible flowers & safety</h4>
                  <ul>
                    {recipe.safety.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </aside>
              )}
            </>
          ) : (
            <>
              <section className="guide__section">
                <div className="ingr-head">
                  <h3 className="guide__h">Ingredients</h3>
                </div>
                {groups.map((g) => (
                  <div key={g.name || 'main'} className="ingr-group">
                    {g.name && <h4 className="guide__sub">{g.name}</h4>}
                    <ul className="ingr">
                      {g.items.map((i, n) => (
                        <li key={`${i.key}-${n}`}>
                          <span className="ingr__qty">{i.display}</span>
                          <span className="ingr__name">
                            {i.name}
                            {i.optional && <em> (optional)</em>}
                            {i.note && <span className="mat__note">{i.note}</span>}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className="list-action" aria-live="polite">
                  {inList ? (
                    <>
                      <span className="list-action__done">✓ In your shopping list</span>
                      <a href="#shopping" className="text-link">
                        View list
                      </a>
                      <button type="button" className="text-link list-action__remove" onClick={() => shopping.remove(item.id)}>
                        Remove
                      </button>
                    </>
                  ) : (
                    <button type="button" className="btn btn--primary btn--sm" onClick={() => shopping.add(item.id)}>
                      Add ingredients to shopping list
                    </button>
                  )}
                </div>
                {recipe.equipment.length > 0 && (
                  <>
                    <h4 className="guide__sub">You’ll also need</h4>
                    <Bullets items={recipe.equipment} />
                  </>
                )}
              </section>

              <section className="guide__section">
                <h3 className="guide__h">Method</h3>
                <ol className="num-list guide__steps">
                  {recipe.steps.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ol>
              </section>

              {(recipe.makeAhead.length > 0 || recipe.storage.length > 0) && (
                <section className="guide__section">
                  <h3 className="guide__h">Make ahead & storage</h3>
                  <div className="tip-grid">
                    {recipe.makeAhead.length > 0 && (
                      <div className="tip">
                        <h4>Make ahead</h4>
                        <Bullets items={recipe.makeAhead} />
                      </div>
                    )}
                    {recipe.storage.length > 0 && (
                      <div className="tip">
                        <h4>Storage</h4>
                        <Bullets items={recipe.storage} />
                      </div>
                    )}
                  </div>
                </section>
              )}

              {recipe.presentation.length > 0 && (
                <section className="guide__section">
                  <h3 className="guide__h">Presentation</h3>
                  <Bullets items={recipe.presentation} />
                </section>
              )}

              {(recipe.allergens.length > 0 || recipe.substitutions.length > 0) && (
                <section className="guide__section">
                  <h3 className="guide__h">Allergens & swaps</h3>
                  <div className="tip-grid">
                    {recipe.allergens.length > 0 && (
                      <div className="tip">
                        <h4>Contains</h4>
                        <Bullets items={recipe.allergens} />
                      </div>
                    )}
                    {recipe.substitutions.length > 0 && (
                      <div className="tip">
                        <h4>Substitutions</h4>
                        <Bullets items={recipe.substitutions} />
                      </div>
                    )}
                  </div>
                  <p className="fine">Always check product labels — recipes and “may contain” warnings change.</p>
                </section>
              )}

              {recipe.safety.length > 0 && (
                <aside className="guide__callout guide__callout--safety">
                  <h4>Food safety for little guests</h4>
                  <ul>
                    {recipe.safety.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </aside>
              )}
            </>
          )}
        </>
      )}
    </GuideShell>
  )
}
