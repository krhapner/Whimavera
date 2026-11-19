/**
 * Entitlements — who can download what, and what a cart costs. Kept apart
 * from the studio UI so a payment provider can plug in at `startCheckout`.
 *
 * Today no payments exist:
 *   - 'sample' products are free and download clean.
 *   - Premium products preview and download with a watermark until bought.
 *   - Parents can buy single designs or the whole collection (bundle).
 *   - Checkout isn't connected; in dev a simulated purchase unlocks designs
 *     so the full flow can be tested.
 * Set VITE_PRINTABLES_UNLOCKED=true to unlock everything (e.g. for proofing).
 */
import { PRODUCTS } from './products.js'

export const PRICES = {
  bundle: 29, // every design in the collection
  single: 6, // one premium design — change here to reprice
}

const KEY = 'whimavera.purchases.v1'
const env = () => import.meta.env || {}

function readPurchases() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}')
  } catch {
    return {}
  }
}

/** What this browser may download for a theme. */
export function getEntitlements(themeId) {
  const e = env()
  const unlocked = String(e.VITE_PRINTABLES_UNLOCKED || '') === 'true'
  const owned = themeId ? readPurchases()[themeId] || [] : []
  return {
    unlocked,
    purchased: new Set(owned),
    checkoutAvailable: false,
    canSimulate: e.DEV === true,
  }
}

/** 'full' | 'proof' for a product. */
export function downloadLevel(product, ent = getEntitlements()) {
  if (ent.unlocked || product.tier === 'sample' || ent.purchased.has(product.id) || ent.purchased.has('bundle')) return 'full'
  return 'proof'
}

/** Premium designs not yet owned. */
export const forSale = (ent) => PRODUCTS.filter((p) => downloadLevel(p, ent) === 'proof')

/**
 * Price a cart of product ids (or ['bundle']). Once singles reach the bundle
 * price, the bundle is the better deal and is offered instead.
 */
export function priceCart(ids) {
  if (ids.includes('bundle')) return { items: ['bundle'], total: PRICES.bundle, bundle: true, singlesTotal: 0, bundleIsBetter: false }
  const singlesTotal = ids.length * PRICES.single
  return { items: ids, total: singlesTotal, bundle: false, singlesTotal, bundleIsBetter: singlesTotal >= PRICES.bundle }
}

/**
 * Begin checkout. Returns { status: 'unavailable' } until a payment provider
 * is connected; the UI explains that nothing is charged.
 */
export async function startCheckout(/* { themeId, items } */) {
  return { status: 'unavailable' }
}

/** Dev only: record a purchase locally so the unlocked experience can be tested. */
export function simulatePurchase(themeId, items) {
  if (env().DEV !== true) return false
  const all = readPurchases()
  all[themeId] = [...new Set([...(all[themeId] || []), ...items])]
  try {
    localStorage.setItem(KEY, JSON.stringify(all))
  } catch {
    return false
  }
  return true
}

/** Dev only: forget simulated purchases for a theme. */
export function resetPurchases(themeId) {
  if (env().DEV !== true) return
  const all = readPurchases()
  delete all[themeId]
  try {
    localStorage.setItem(KEY, JSON.stringify(all))
  } catch {
    /* ignore */
  }
}
