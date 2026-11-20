import { createContext, useContext, useMemo } from 'react'
import GuideShell from './GuideShell.jsx'
import { PlanToggle } from './PlanBar.jsx'
import { AMAZON } from '../config/affiliate.js'
import { CATEGORY_LABEL, shoppingForItem, typicalTotal } from '../lib/shopping.js'
import { amazonSearchUrl } from '../lib/amazon.js'

/**
 * Shared shopping state: what the parent already owns, supplies they've
 * deselected, and opening the "Shop supplies" panel for any item.
 * Provided once by App so cards, guides and the list stay in sync.
 */
export const ShopContext = createContext(null)
export const useShop = () => useContext(ShopContext)

/** "Shop on Amazon" link. Opens in a new tab, only on a click. */
export function AmazonButton({ link, label = 'Shop on Amazon', className = '', size = 'sm', subtle = false }) {
  if (!link) return null
  return (
    <a
      className={`amz-btn ${subtle ? 'amz-btn--subtle' : ''} amz-btn--${size} ${className}`}
      href={link.href}
      target="_blank"
      rel="sponsored nofollow noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
    >
      {label}
      <span className="amz-btn__arrow" aria-hidden="true">↗</span>
      <span className="sr-only"> (opens Amazon in a new tab)</span>
    </a>
  )
}

export function AffiliateDisclosure({ className = '' }) {
  return <p className={`affiliate-note ${className}`}>{AMAZON.disclosure} Links open Amazon search results unless a specific product is shown.</p>
}

/** "$12–20" from a [low, high] range. */
export const money = (r) => (!r ? '' : r[0] === r[1] ? `$${r[0]}` : `$${r[0]}–${r[1]}`)

/**
 * Button that opens the shopping panel for one item, from any card. Shows
 * how many things there are to buy and what they typically cost, so the
 * shopping is visible at a glance.
 */
export function ShopSuppliesButton({ kind, id, title, variantId, label = 'Shop supplies' }) {
  const shop = useShop()
  if (!shop) return null
  const s = shop.summary?.(kind, id, variantId)
  return (
    <button
      type="button"
      className="shop-trigger"
      data-shop={`${kind}-${id}`}
      onClick={(e) => {
        e.stopPropagation()
        shop.openShop({ kind, id, title, variantId })
      }}
    >
      <BagIcon />
      <span className="shop-trigger__text">
        <span className="shop-trigger__label">{label}</span>
        {s?.count > 0 && (
          <span className="shop-trigger__meta">
            {s.count} {s.count === 1 ? 'item' : 'items'}
            {s.range && s.range[1] > 0 ? ` · ${money(s.range)}` : ''}
          </span>
        )}
      </span>
    </button>
  )
}

/**
 * Sticky "shop your party" bar: how much there is to buy for the whole plan
 * and one tap to the combined list. Hidden when there is nothing to buy.
 */
export function PartyShopBar({ count }) {
  if (!count) return null
  return (
    <a className="shop-bar no-print" href="#shop">
      <span className="shop-bar__icon" aria-hidden="true">
        <BagIcon />
      </span>
      <span className="shop-bar__text">
        <strong>Shop your party</strong>
        <span>
          {count} {count === 1 ? 'thing' : 'things'} to buy<span className="shop-bar__wide">, each linked to Amazon</span>
        </span>
      </span>
      <span className="shop-bar__go">
        <span className="shop-bar__go-label">See the list </span>
        <span aria-hidden="true">→</span>
      </span>
    </a>
  )
}

const BagIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 5.5h10l-.8 8H3.8L3 5.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    <path d="M5.8 5.5V4.3a2.2 2.2 0 0 1 4.4 0v1.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
)

/**
 * One supply: name, quantity, category, Amazon link, alternatives, and
 * "Already have this". Optionally an include/exclude switch for the list.
 */
export function SupplyRow({ item, showCategory = true, onSkip, skipped = false, showSources = false }) {
  const shop = useShop()
  const owned = shop?.owned.has(item.id)
  const isProduct = item.link?.kind === 'product'
  return (
    <li className={`supply ${owned ? 'is-owned' : ''} ${skipped ? 'is-skipped' : ''}`}>
      <div className="supply__main">
        <div className="supply__top">
          <span className="supply__name">{item.name}</span>
          <span className="supply__qty">{item.label}</span>
        </div>
        {item.est && <p className={`supply__est ${item.supply?.household ? 'is-home' : ''}`}>Typically {money(item.est.map(Math.round))}</p>}
        <div className="supply__meta">
          {showCategory && <span>{CATEGORY_LABEL[item.category] || 'Supplies'}</span>}
          {item.reusable && <span>Reusable</span>}
          {item.optional && <span>Optional</span>}
          {item.supply?.household && <span className="supply__home">Most homes have this</span>}
          {isProduct && <span className="supply__pick">Whimavera pick</span>}
          {showSources && item.sources?.length > 0 && <span className="supply__for">For {item.sources.join(', ')}</span>}
        </div>
        {item.notes?.length > 0 && <p className="supply__note">{item.notes.join(' · ')}</p>}
        {item.substitutes?.length > 0 && <p className="supply__note">Save: {item.substitutes.join(' · ')}</p>}
        {(item.alternatives?.length > 0 || item.kit) && (
          <details className="supply__alts">
            <summary>Alternatives</summary>
            <ul>
              {item.kit && (
                <li>
                  {item.kit.link ? (
                    <a href={item.kit.link.href} target="_blank" rel="sponsored nofollow noopener noreferrer">
                      Browse {item.kit.name.toLowerCase()} ↗
                    </a>
                  ) : (
                    item.kit.name
                  )}
                  <span> — {item.kit.note}</span>
                </li>
              )}
              {item.alternatives?.map((a) => (
                <li key={a.label}>
                  {a.link ? (
                    <a href={a.link.href} target="_blank" rel="sponsored nofollow noopener noreferrer">
                      {a.label} ↗
                    </a>
                  ) : (
                    a.label
                  )}
                </li>
              ))}
            </ul>
          </details>
        )}
      </div>
      <div className="supply__actions">
        <AmazonButton link={item.link} label={isProduct ? 'View on Amazon' : 'Shop on Amazon'} />
        {shop && (
          <label className={`check check--sm ${owned ? 'is-on' : ''}`}>
            <input type="checkbox" checked={!!owned} onChange={() => shop.toggleOwned(item.id)} />
            <span className="check__box" aria-hidden="true" />
            <span>Already have this</span>
          </label>
        )}
        {onSkip && (
          <button type="button" className="text-link supply__skip" onClick={onSkip}>
            {skipped ? 'Add back to list' : 'Not needed'}
          </button>
        )}
      </div>
    </li>
  )
}

/** Kit search suggestions — always framed as browsing, never as one product. */
export function KitList({ kits }) {
  if (!kits?.length) return null
  return (
    <div className="kit-list">
      <h4 className="guide__sub">Prefer a kit?</h4>
      <ul>
        {kits.map((k) => (
          <li key={k.id}>
            <div>
              <strong>{k.name}</strong>
              <span>{k.note}</span>
            </div>
            <AmazonButton link={k.link} label="Browse kits" subtle />
          </li>
        ))}
      </ul>
    </div>
  )
}

const KIND_CRUMB = { activity: 'Shop this activity', decor: 'Shop this setup', diy: 'Shop this project', food: 'Shop ingredients', theme: 'Shop invitations', favors: 'Shop favors' }

/**
 * Shopping panel for one item. Opening it never adds anything to the plan;
 * the parent can add the item here deliberately if they want.
 */
export function SupplySheet({ request, plan, catalog, derived, planApi, onClose, onViewGuide }) {
  const { kind, id, variantId } = request
  const result = useMemo(() => shoppingForItem(plan, catalog, kind, id, { variantId }), [plan, catalog, kind, id, variantId])
  const section = { activity: 'activities', decor: 'decor', diy: 'diy', food: 'food' }[kind]
  const inPlan =
    section === 'decor'
      ? !!derived.sel.slots[id]
      : section
        ? derived.sel[section]?.includes(id)
        : null
  const titleId = `shop-title-${kind}-${id}`
  const total = result.required.length + result.optional.length
  const typical = typicalTotal(result.required)?.range

  return (
    <GuideShell crumb={KIND_CRUMB[kind] || 'Shop supplies'} titleId={titleId} returnFocusSelector={`[data-shop="${kind}-${id}"]`} onClose={onClose}>
      <header className="sheet__head">
        <h2 id={titleId} className="display-2">
          {request.title}
        </h2>
        <p className="lede">
          {total
            ? `Everything you’ll need${plan.guests ? `, with quantities for ${plan.guests} guests` : ''}. Tick off what you already have.`
            : 'A detailed supply list for this one is on its way.'}
        </p>
        {typical && typical[1] > 0 && (
          <p className="sheet__total">
            <strong>Typically {money(typical)}</strong> for everything required
            <span> · each item opens on Amazon</span>
          </p>
        )}
        {section && (
          <div className="sheet__plan">
            <span className="fine">
              {inPlan ? 'In your party plan — these supplies are on your shopping list.' : 'Just browsing — nothing is added to your plan or list unless you choose.'}
            </span>
            <div className="sheet__plan-actions">
              {kind === 'activity' && onViewGuide && (
                <button type="button" className="text-link" onClick={() => onViewGuide(id)}>
                  View guide
                </button>
              )}
              <PlanToggle inPlan={inPlan} onToggle={() => planApi.toggle(section, id, !inPlan)} label={request.title} />
            </div>
          </div>
        )}
      </header>

      {result.required.length > 0 && (
        <section className="guide__section">
          <h3 className="guide__h">Materials & shopping</h3>
          <ul className="supply-list">
            {result.required.map((i) => (
              <SupplyRow key={i.id} item={i} />
            ))}
          </ul>
        </section>
      )}
      {result.optional.length > 0 && (
        <section className="guide__section">
          <h3 className="guide__h">Nice to have</h3>
          <ul className="supply-list">
            {result.optional.map((i) => (
              <SupplyRow key={i.id} item={i} />
            ))}
          </ul>
        </section>
      )}
      {!total && kind === 'activity' && (
        <section className="guide__section">
          <AmazonButton link={{ href: searchFor(request.title), kind: 'search' }} label={`Browse ${request.title.toLowerCase()} supplies`} />
        </section>
      )}
      <section className="guide__section">
        <KitList kits={result.kits} />
        {kind === 'food' && <p className="fine">Fresh produce, dairy and bread link to Amazon’s grocery search — or take the list to your local store.</p>}
        <AffiliateDisclosure />
      </section>
    </GuideShell>
  )
}

const searchFor = (title) => amazonSearchUrl(`${title} party supplies`)
