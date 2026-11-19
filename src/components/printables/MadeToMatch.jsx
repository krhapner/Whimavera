import { useEffect, useMemo, useState } from 'react'
import SceneSVG from './SceneSVG.jsx'
import GuideShell from '../GuideShell.jsx'
import { collectionForTheme } from '../../printables/collections/index.js'
import { loadFonts } from '../../printables/fonts.js'
import { DETAIL_FIELDS, addMinutes } from '../../printables/details.js'
import { productInPlan, copiesFor, LETTER } from '../../printables/products.js'
import { IN } from '../../printables/text.js'
import {
  PRODUCTS,
  productById,
  emptyStudio,
  loadCollectionArt,
  studioContext,
  instancesToUse,
  sceneFor,
  issuesFor,
  makePdf,
  saveBlob,
  fileName,
  sceneToPng,
  downloadLevel,
  getEntitlements,
} from '../../printables/studio.js'
import { PRICES, priceCart, startCheckout, simulatePurchase, resetPurchases } from '../../printables/entitlements.js'

const KEY = 'whimavera.printables.v1'

/** Studio state per theme, kept in the browser and apart from quiz answers. */
function useStudio(themeId, answers) {
  const [all, setAll] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY) || '{}')
    } catch {
      return {}
    }
  })
  const studio = useMemo(() => {
    const s = { ...emptyStudio(), ...(all[themeId] || {}) }
    s.details = { ...emptyStudio().details, ...s.details }
    return s
  }, [all, themeId])
  const update = (fn) =>
    setAll((prev) => {
      const cur = { ...emptyStudio(), ...(prev[themeId] || {}) }
      const next = { ...prev, [themeId]: fn(cur) }
      try {
        localStorage.setItem(KEY, JSON.stringify(next))
      } catch {
        /* storage unavailable — keeps working for this visit */
      }
      return next
    })
  // End time follows the party length from the quiz until the parent sets one.
  const setDetail = (key, value) =>
    update((s) => {
      const d = { ...s.details, [key]: value }
      if (key === 'startTime' && !s.details.endTimeEdited && answers.duration) d.endTime = addMinutes(value, Number(answers.duration))
      if (key === 'endTime') d.endTimeEdited = true
      return { ...s, details: d }
    })
  return { studio, update, setDetail }
}

const CART_KEY = 'whimavera.cart.v1'

/** Designs the parent has picked to buy, per theme. */
function useCart(themeId) {
  const [all, setAll] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY) || '{}')
    } catch {
      return {}
    }
  })
  const ids = all[themeId] || []
  const save = (next) =>
    setAll((prev) => {
      const out = { ...prev, [themeId]: next }
      try {
        localStorage.setItem(CART_KEY, JSON.stringify(out))
      } catch {
        /* storage unavailable */
      }
      return out
    })
  return {
    ids,
    has: (id) => ids.includes(id),
    toggle: (id) => save(ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]),
    clear: () => save([]),
  }
}

/** Stop casual "Save image" / drag-to-desktop on unpurchased previews. */
const guard = (on) => (on ? { onContextMenu: (e) => e.preventDefault(), onDragStart: (e) => e.preventDefault() } : {})

/** Fonts + artwork for a collection, loaded once. */
function useAssets(collection) {
  const [assets, setAssets] = useState(null)
  const [error, setError] = useState(null)
  useEffect(() => {
    if (!collection) return
    let live = true
    Promise.all([loadFonts(), loadCollectionArt(collection)])
      .then(([fonts, artByUrl]) => live && setAssets({ fonts, artByUrl }))
      .catch((e) => live && setError(e))
    return () => {
      live = false
    }
  }, [collection])
  return { assets, error }
}

/**
 * "Made to Match" — the printable collection for the party, personalized
 * from the plan. Browsing and previewing never require choosing anything.
 */
export default function MadeToMatch({ plan, sel, answers, eyebrow = 'Made to Match', heading }) {
  const collection = collectionForTheme(plan.theme.id)
  const { studio, update, setDetail } = useStudio(plan.theme.id, answers)
  const { assets, error } = useAssets(collection)
  const [open, setOpen] = useState(null)
  const [busy, setBusy] = useState(false)
  const themeId = plan.theme.id
  const [ent, setEnt] = useState(() => getEntitlements(themeId))
  useEffect(() => setEnt(getEntitlements(themeId)), [themeId])
  const cart = useCart(themeId)
  const [checkout, setCheckout] = useState(null)

  if (!collection) {
    return (
      <div className="m2m m2m--soon">
        <p className="lede">Matching printables for the {plan.theme.name} theme are being designed. They’ll appear here as soon as the artwork is ready.</p>
      </div>
    )
  }

  const ctx = assets && studioContext({ plan, sel, answers, collection, studio, fonts: assets.fonts, artByUrl: assets.artByUrl })
  const cartIds = cart.ids.filter((id) => productById[id] && downloadLevel(productById[id], ent) === 'proof')
  const forSaleCount = PRODUCTS.filter((p) => downloadLevel(p, ent) === 'proof').length
  const ownsAll = forSaleCount === 0
  const quote = priceCart(cartIds)
  const buy = async (items) => {
    const res = await startCheckout({ themeId, items })
    setCheckout({ items, total: priceCart(items).total, status: res.status })
  }
  const simulate = () => {
    if (simulatePurchase(themeId, checkout.items)) {
      setEnt(getEntitlements(themeId))
      if (checkout.items.includes('bundle')) cart.clear()
      else checkout.items.forEach((id) => cart.has(id) && cart.toggle(id))
    }
    setCheckout(null)
  }
  const chosenIds = PRODUCTS.filter((p) => (studio.chosen[p.id] ?? (ctx ? productInPlan(p.id, ctx) : true))).map((p) => p.id)
  const variant = collection.variants.find((v) => v.id === (studio.variant || collection.variants[0].id))
  const missing = ['childName', 'age', 'date', 'startTime', 'venue', 'rsvpContact'].filter((k) => !String(studio.details[k] || '').trim())

  const downloadAll = async () => {
    if (!ctx || !chosenIds.length) return
    setBusy(true)
    try {
      const { bytes } = await makePdf(chosenIds, ctx)
      saveBlob(bytes, fileName(ctx, 'printables', 'pdf'), 'application/pdf')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="m2m">
      <div className="m2m__head">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="display-2">{heading || `The ${collection.name} paper collection`}</h2>
          <p className="lede">
            Invitations, signs, tags and toppers in one watercolor suite — personalized with your party details, with signs and labels for
            the activities and food in your plan.
          </p>
        </div>
        <div className="m2m__colors" role="radiogroup" aria-label="Color">
          <span className="edit-panel__label">Color</span>
          <div className="m2m__swatches">
            {collection.variants.map((v) => (
              <button
                key={v.id}
                type="button"
                role="radio"
                aria-checked={v.id === variant.id}
                className={`swatch-btn ${v.id === variant.id ? 'is-on' : ''}`}
                onClick={() => update((s) => ({ ...s, variant: v.id }))}
                title={v.name}
              >
                <span className="swatch-btn__dots">
                  {v.swatch.map((c) => (
                    <i key={c} style={{ background: c }} />
                  ))}
                </span>
                <span>{v.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {missing.length > 0 && (
        <p className="notice notice--soft m2m__missing">
          Add {listify(missing.map((k) => DETAIL_FIELDS.find((f) => f.key === k).label.toLowerCase()))} to finish your invitation — open any design to
          fill in the details.
        </p>
      )}

      {error && <p className="notice">The printable designs couldn’t load. Please refresh to try again.</p>}

      <div className="m2m__grid">
        {PRODUCTS.map((p, i) => {
          const inst = ctx ? instancesToUse(p.id, ctx) : []
          const scene = ctx && inst[0] ? sceneFor(p.id, inst[0], ctx) : null
          const inPlan = ctx ? productInPlan(p.id, ctx) : true
          const level = downloadLevel(p, ent)
          return (
            <article key={p.id} className={`m2m-card m2m-card--${p.id}`}>
              <button type="button" className="m2m-card__open" data-printable={p.id} onClick={() => setOpen(p.id)} aria-label={`Personalize ${p.name}`}>
                <div className={`m2m-card__stage ${p.shape === 'circle' ? 'is-circle' : p.size.w > p.size.h ? 'is-wide' : 'is-tall'}`} style={{ '--tilt': `${[-1.6, 1.2, -0.8, 1.6][i % 4]}deg` }}>
                  {scene ? (
                    <div className={`m2m-card__paper ${level === 'proof' ? 'is-proof' : ''}`} style={{ aspectRatio: `${p.size.w} / ${p.size.h}` }} {...guard(level === 'proof')}>
                      <SceneSVG scene={scene} title={`${p.name} preview`} watermark={level === 'proof'} />
                    </div>
                  ) : (
                    <div className="m2m-card__paper is-loading" style={{ aspectRatio: `${p.size.w} / ${p.size.h}` }} />
                  )}
                  {inst.length > 1 && <span className="m2m-card__count">{inst.length} designs</span>}
                </div>
                <div className="m2m-card__body">
                  <div className="m2m-card__tags">
                    <span>{p.sizeLabel}</span>
                    {level === 'full' && p.tier === 'sample' && <span className="is-free">Free download</span>}
                    {level === 'full' && p.tier !== 'sample' && <span className="is-owned">{ent.unlocked ? 'Unlocked' : 'Yours'}</span>}
                    {level === 'proof' && <span className="is-price">${PRICES.single}</span>}
                    {!inPlan && <span>Browse</span>}
                  </div>
                  <h3>{p.name}</h3>
                  <p>{p.description}</p>
                  <span className="m2m-card__cta">Personalize →</span>
                </div>
              </button>
              {level === 'proof' && (
                <button
                  type="button"
                  className={`m2m-card__add ${cart.has(p.id) ? 'is-in' : ''}`}
                  aria-pressed={cart.has(p.id)}
                  onClick={() => cart.toggle(p.id)}
                  data-cart={p.id}
                >
                  {cart.has(p.id) ? '✓ In your cart' : `Add to cart · $${PRICES.single}`}
                </button>
              )}
            </article>
          )
        })}
      </div>

      <div className="m2m__buy" aria-live="polite">
        {ownsAll ? (
          <div>
            <h3 className="display-3">{ent.unlocked ? 'Every design is unlocked' : 'Your collection is complete'}</h3>
            <p>Every design downloads in full, without the preview mark.</p>
          </div>
        ) : (
          <div>
            <h3 className="display-3">Pick your favorites, or take them all</h3>
            <p>
              ${PRICES.single} per design, or all {PRODUCTS.length} designs for ${PRICES.bundle}. Favor tags and cupcake toppers are always free.
            </p>
            {cartIds.length > 0 && (
              <p className="m2m__cart-line">
                <strong>
                  {cartIds.length} design{cartIds.length === 1 ? '' : 's'} · ${quote.total}
                </strong>{' '}
                — {cartIds.map((id) => productById[id].name).join(', ')}
                {quote.bundleIsBetter && <span className="m2m__deal"> The complete collection is only ${PRICES.bundle} — every design, for less.</span>}
              </p>
            )}
          </div>
        )}
        {!ownsAll && (
          <div className="m2m__buy-actions">
            {cartIds.length > 0 && !quote.bundleIsBetter && (
              <button type="button" className="btn btn--secondary" onClick={() => buy(cartIds)} data-checkout="cart">
                Buy {cartIds.length} · ${quote.total}
              </button>
            )}
            <button type="button" className="btn btn--primary" onClick={() => buy(['bundle'])} data-checkout="bundle">
              Get all {PRODUCTS.length} · ${PRICES.bundle}
            </button>
          </div>
        )}
      </div>

      {checkout && (
        <div className="m2m__checkout notice notice--soft" role="dialog" aria-label="Checkout">
          <p>
            <strong>
              {checkout.items.includes('bundle') ? `The complete ${collection.name} collection` : `${checkout.items.length} design${checkout.items.length === 1 ? '' : 's'}`} · $
              {checkout.total}
            </strong>
          </p>
          <p>Secure checkout is coming soon. Payments aren’t connected yet, so nothing has been charged.</p>
          <div className="m2m__buy-actions">
            {ent.canSimulate && (
              <button type="button" className="btn btn--primary btn--sm" onClick={simulate} data-simulate>
                Simulate purchase (dev only)
              </button>
            )}
            <button type="button" className="btn btn--secondary btn--sm" onClick={() => setCheckout(null)}>
              Close
            </button>
          </div>
        </div>
      )}

      <div className="m2m__bundle">
        <div>
          <h3 className="display-3">Download your collection</h3>
          <p>
            {chosenIds.length} of {PRODUCTS.length} designs selected, sized for {plan.guests} guests, in {variant.name.toLowerCase()} — one PDF with
            print sheets and cutting instructions.
          </p>
          <p className="fine">{accessNote(ent, forSaleCount)}</p>
          {ent.canSimulate && !ent.unlocked && ent.purchased.size > 0 && (
            <button type="button" className="text-link fine" onClick={() => (resetPurchases(themeId), setEnt(getEntitlements(themeId)))}>
              Reset simulated purchases (dev only)
            </button>
          )}
        </div>
        <button type="button" className="btn btn--primary" onClick={downloadAll} disabled={!ctx || busy || !chosenIds.length}>
          {busy ? 'Preparing PDF…' : 'Download the collection'}
        </button>
      </div>

      {open && ctx && (
        <Editor
          productId={open}
          ctx={ctx}
          studio={studio}
          update={update}
          setDetail={setDetail}
          collection={collection}
          plan={plan}
          onClose={() => setOpen(null)}
          ent={ent}
          cart={cart}
        />
      )}
    </div>
  )
}

function accessNote(ent, forSale) {
  if (ent.unlocked) return 'Preview access: every design downloads in full.'
  if (!forSale) return 'Every design downloads in full, without the preview mark.'
  return 'Designs you haven’t bought download as proofs with a “Preview” mark. Free and purchased designs download clean.'
}

const listify = (a) => (a.length <= 1 ? a.join('') : `${a.slice(0, -1).join(', ')} and ${a[a.length - 1]}`)

// ---------- Editor ----------

const FIELD_FOR = { childName: 'childName', age: 'age', date: 'date', startTime: 'startTime', venue: 'venue', rsvpContact: 'rsvpContact' }

function Editor({ productId, ctx, studio, update, setDetail, collection, plan, onClose, ent, cart }) {
  const product = productById[productId]
  const instances = instancesToUse(productId, ctx)
  const allInstances = instancesToUse(productId, ctx, { all: true })
  const [idx, setIdx] = useState(0)
  const [view, setView] = useState('card')
  const [printShop, setPrintShop] = useState(false)
  const [busy, setBusy] = useState(null)
  const [showAllDetails, setShowAllDetails] = useState(false)
  const inst = instances[Math.min(idx, instances.length - 1)]
  const scene = inst ? sceneFor(productId, inst, ctx) : null
  const scenes = instances.map((i) => sceneFor(productId, i, ctx))
  const issues = issuesFor(scenes)
  const level = downloadLevel(product, ent)
  const proof = level === 'proof'
  const inCollection = studio.chosen[productId] ?? productInPlan(productId, ctx)
  const canBrowseMore = allInstances.length > instances.length || studio.showAll[productId]
  const titleId = `print-title-${productId}`

  // Detail fields this design uses, then the rest on request.
  const used = new Set(scenes.flatMap((s) => s.fields.map((f) => f.field)).filter(Boolean))
  if (['invitation', 'welcome-sign', 'cupcake-topper'].includes(productId)) used.add('age')
  const primary = DETAIL_FIELDS.filter((f) => used.has(f.key) || (productId === 'invitation' && ['endTime', 'address', 'rsvpName', 'rsvpBy'].includes(f.key)))
  const rest = DETAIL_FIELDS.filter((f) => !primary.includes(f))

  const setOverride = (key, value) =>
    update((s) => ({ ...s, overrides: { ...s.overrides, [inst.key]: { ...(s.overrides[inst.key] || {}), [key]: value } } }))
  const resetOverride = (key) =>
    update((s) => {
      const o = { ...(s.overrides[inst.key] || {}) }
      delete o[key]
      return { ...s, overrides: { ...s.overrides, [inst.key]: o } }
    })

  const download = async (kind) => {
    setBusy(kind)
    try {
      if (kind === 'png') {
        const blob = await sceneToPng(scene, ctx.fonts, { dpi: proof ? 96 : 300, watermark: proof })
        saveBlob(blob, fileName(ctx, product.id, 'png'), 'image/png')
      } else {
        const { bytes } = await makePdf([productId], ctx, { printShop })
        saveBlob(bytes, fileName(ctx, `${product.id}${printShop ? '-print-shop' : ''}`, 'pdf'), 'application/pdf')
      }
    } finally {
      setBusy(null)
    }
  }

  return (
    <GuideShell crumb={`${collection.name} · Made to Match`} titleId={titleId} returnFocusSelector={`[data-printable="${productId}"]`} onClose={onClose} wide closeLabel="Close editor">
      <div className="pe">
        <div className="pe__preview">
          <div className="seg seg--sm pe__view" role="tablist" aria-label="Preview">
            <button role="tab" aria-selected={view === 'card'} className={view === 'card' ? 'is-active' : ''} onClick={() => setView('card')}>
              {product.shape === 'circle' ? 'Topper' : 'Card'}
            </button>
            <button role="tab" aria-selected={view === 'sheet'} className={view === 'sheet' ? 'is-active' : ''} onClick={() => setView('sheet')}>
              Print sheet
            </button>
          </div>
          <div className={`pe__stage ${view === 'sheet' ? 'is-sheet' : ''} ${proof ? 'is-proof' : ''}`} {...guard(proof)}>
            {view === 'card' && scene && (
              <div className={`pe__paper ${product.shape === 'circle' ? 'is-circle' : ''} ${scene.background.color ? '' : 'is-bare'}`} style={{ aspectRatio: `${product.size.w} / ${product.size.h}` }}>
                <SceneSVG scene={scene} title={`${product.name} preview`} watermark={proof} />
              </div>
            )}
            {view === 'sheet' && <SheetPreview product={product} scenes={scenes} instances={instances} guests={plan.guests} watermark={proof} />}
          </div>
          {instances.length > 1 && view === 'card' && (
            <div className="pe__pager" role="group" aria-label="Designs">
              {instances.map((x, n) => (
                <button key={x.key} type="button" className={`chip chip--sm ${n === idx ? 'is-selected' : ''}`} onClick={() => setIdx(n)}>
                  {x.label}
                  {!x.inPlan && studio.showAll[productId] ? ' ·' : ''}
                </button>
              ))}
            </div>
          )}
          <p className="fine pe__size">
            {product.sizeLabel} · {printLine(product, plan.guests, instances)}
          </p>
        </div>

        <div className="pe__form">
          <h2 id={titleId} className="display-2">
            {product.name}
          </h2>
          <p className="pe__desc">{product.description}</p>

          {issues.length > 0 && (
            <ul className="pe__issues" aria-live="polite">
              {issues.map((i) => (
                <li key={`${i.kind}${i.key}`} className={`is-${i.kind}`}>
                  {i.message}
                </li>
              ))}
            </ul>
          )}

          <fieldset className="pe__group">
            <legend>Color</legend>
            <div className="m2m__swatches">
              {collection.variants.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  className={`swatch-btn ${v.id === ctx.variantId ? 'is-on' : ''}`}
                  aria-pressed={v.id === ctx.variantId}
                  onClick={() => update((s) => ({ ...s, variant: v.id }))}
                >
                  <span className="swatch-btn__dots">
                    {v.swatch.map((c) => (
                      <i key={c} style={{ background: c }} />
                    ))}
                  </span>
                  <span>{v.name}</span>
                </button>
              ))}
            </div>
          </fieldset>

          {primary.length > 0 && (
            <fieldset className="pe__group">
              <legend>Party details</legend>
              <p className="fine">Shared by every design in the collection.</p>
              <div className="pe__fields">
                {primary.map((f) => (
                  <DetailInput key={f.key} f={f} value={studio.details[f.key]} onChange={(v) => setDetail(f.key, v)} />
                ))}
              </div>
              {rest.length > 0 && (
                <button type="button" className="text-link pe__more" onClick={() => setShowAllDetails((x) => !x)} aria-expanded={showAllDetails}>
                  {showAllDetails ? 'Fewer details' : 'More party details'}
                </button>
              )}
              {showAllDetails && (
                <div className="pe__fields">
                  {rest.map((f) => (
                    <DetailInput key={f.key} f={f} value={studio.details[f.key]} onChange={(v) => setDetail(f.key, v)} />
                  ))}
                </div>
              )}
            </fieldset>
          )}

          {scene && scene.fields.length > 0 && (
            <fieldset className="pe__group">
              <legend>Wording{instances.length > 1 ? ` · ${inst.label}` : ''}</legend>
              <p className="fine">Change any line for this design. Text resizes to fit; we’ll tell you if something is too long.</p>
              <div className="pe__fields">
                {scene.fields.map((f) => {
                  const long = f.maxLength > 100
                  const Input = long ? 'textarea' : 'input'
                  return (
                    <label key={f.key} className="pe__field">
                      <span>
                        {f.label}
                        {f.edited && (
                          <button type="button" className="link-btn pe__reset" onClick={() => resetOverride(f.key)}>
                            Reset
                          </button>
                        )}
                      </span>
                      <Input
                        value={f.value}
                        maxLength={f.maxLength}
                        rows={long ? 3 : undefined}
                        placeholder={f.field ? `From ${DETAIL_FIELDS.find((d) => d.key === FIELD_FOR[f.field] || d.key === f.field)?.label.toLowerCase() || 'details'}` : ''}
                        onChange={(e) => setOverride(f.key, e.target.value)}
                      />
                    </label>
                  )
                })}
              </div>
            </fieldset>
          )}

          {canBrowseMore && (
            <label className="check check--sm pe__browse">
              <input type="checkbox" checked={!!studio.showAll[productId]} onChange={() => update((s) => ({ ...s, showAll: { ...s.showAll, [productId]: !s.showAll[productId] } }))} />
              <span className="check__box" aria-hidden="true" />
              <span>Include designs for things not in my plan ({allInstances.length} in all)</span>
            </label>
          )}

          <div className="pe__download">
            <label className="check check--sm">
              <input type="checkbox" checked={inCollection} onChange={() => update((s) => ({ ...s, chosen: { ...s.chosen, [productId]: !inCollection } }))} />
              <span className="check__box" aria-hidden="true" />
              <span>Include in my complete collection</span>
            </label>
            <label className="check check--sm">
              <input type="checkbox" checked={printShop} onChange={() => setPrintShop((x) => !x)} />
              <span className="check__box" aria-hidden="true" />
              <span>Print-shop file (exact size, ⅛ in bleed, crop marks)</span>
            </label>
            {proof && (
              <div className="pe__buy">
                <button type="button" className={`btn ${cart.has(productId) ? 'btn--secondary' : 'btn--primary'}`} onClick={() => cart.toggle(productId)} data-cart-editor={productId}>
                  {cart.has(productId) ? '✓ In your cart' : `Add to cart · $${PRICES.single}`}
                </button>
                <span className="fine">or all {PRODUCTS.length} designs for ${PRICES.bundle}</span>
              </div>
            )}
            <div className="pe__buttons">
              <button type="button" className={`btn ${proof ? 'btn--secondary' : 'btn--primary'}`} onClick={() => download('pdf')} disabled={!!busy}>
                {busy === 'pdf' ? 'Preparing…' : level === 'full' ? 'Download PDF' : 'Download watermarked proof'}
              </button>
              {product.digital && (
                <button type="button" className="btn btn--secondary" onClick={() => download('png')} disabled={!!busy}>
                  {busy === 'png' ? 'Preparing…' : 'Image for sharing'}
                </button>
              )}
            </div>
            <p className="fine">
              {level === 'full'
                ? product.tier === 'sample'
                  ? 'A free design from the collection.'
                  : 'Full download, without watermark.'
                : 'Previews and proofs carry a “Preview” mark. Buy this design or the whole collection for the clean, full-resolution files.'}{' '}
              Print at 100% (“Actual size”) on matte cardstock.
            </p>
          </div>
        </div>
      </div>
    </GuideShell>
  )
}

function printLine(product, guests, instances) {
  const p = product.print
  if (p.mode !== 'sheet') return instances.length > 1 ? `${instances.length} designs, one per page` : 'one per page'
  const copies = copiesFor(product, guests, instances)
  const per = p.cols * p.rows
  return `${copies} ${copies === 1 ? 'piece' : 'pieces'} · ${per} per US Letter sheet`
}

function DetailInput({ f, value, onChange }) {
  return (
    <label className="pe__field">
      <span>{f.label}</span>
      <input
        type={f.type || 'text'}
        value={value || ''}
        placeholder={f.placeholder}
        maxLength={f.maxLength}
        min={f.min}
        max={f.max}
        inputMode={f.type === 'number' ? 'numeric' : undefined}
        onChange={(e) => onChange(e.target.value)}
      />
      {f.hint && <em>{f.hint}</em>}
    </label>
  )
}

/** A US Letter sheet laid out exactly like the PDF (home printing). */
function SheetPreview({ product, scenes, instances, guests, watermark = false }) {
  const PW = LETTER.w * IN
  const PH = LETTER.h * IN
  const W = product.size.w * IN
  const H = product.size.h * IN
  if (product.print.mode !== 'sheet') {
    return (
      <svg className="sheet-svg" viewBox={`0 0 ${PW} ${PH}`} role="img" aria-label="Print sheet preview">
        <rect width={PW} height={PH} fill="#fff" />
        <svg x={(PW - W) / 2} y={(PH - H) / 2} width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
          <SceneSVG scene={scenes[0]} showMissing={false} watermark={watermark} />
        </svg>
        <CropMarks x={(PW - W) / 2} y={(PH - H) / 2} w={W} h={H} />
      </svg>
    )
  }
  const { cols, rows, fold } = product.print
  const cellH = fold ? H * 2 : H
  const gap = 0.25 * IN
  const gridW = cols * W + (cols - 1) * gap
  const gridH = rows * cellH + (rows - 1) * gap
  const x0 = (PW - gridW) / 2
  const y0 = (PH - gridH) / 2
  const count = Math.min(cols * rows, copiesFor(product, guests, instances))
  return (
    <svg className="sheet-svg" viewBox={`0 0 ${PW} ${PH}`} role="img" aria-label="Print sheet preview">
      <rect width={PW} height={PH} fill="#fff" />
      {Array.from({ length: count }, (_, k) => {
        const s = scenes[k % scenes.length]
        const x = x0 + (k % cols) * (W + gap)
        const y = y0 + Math.floor(k / cols) * (cellH + gap)
        return (
          <g key={k}>
            {fold && (
              <g transform={`rotate(180 ${x + W / 2} ${y + H / 2})`}>
                <svg x={x} y={y} width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
                  <SceneSVG scene={s} showMissing={false} watermark={watermark} />
                </svg>
              </g>
            )}
            <svg x={x} y={fold ? y + H : y} width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
              <SceneSVG scene={s} showMissing={false} watermark={watermark} />
            </svg>
            {fold && <line x1={x - 10} y1={y + H} x2={x + W + 10} y2={y + H} stroke="#999" strokeWidth={0.5} strokeDasharray="2 2" />}
            {product.shape === 'circle' && <circle cx={x + W / 2} cy={y + H / 2} r={W / 2} fill="none" stroke="#999" strokeWidth={0.5} strokeDasharray="2 2" />}
          </g>
        )
      })}
    </svg>
  )
}

function CropMarks({ x, y, w, h }) {
  const o = 6
  const l = 14
  const lines = []
  for (const [cx, sx] of [
    [x, -1],
    [x + w, 1],
  ])
    for (const [cy, sy] of [
      [y, -1],
      [y + h, 1],
    ]) {
      lines.push([cx + sx * o, cy, cx + sx * (o + l), cy], [cx, cy + sy * o, cx, cy + sy * (o + l)])
    }
  return lines.map(([a, b, c, d], i) => <line key={i} x1={a} y1={b} x2={c} y2={d} stroke="#888" strokeWidth={0.4} />)
}
