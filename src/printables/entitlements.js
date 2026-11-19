/**
 * Entitlements — who can download what. Kept separate so a payment
 * provider can plug in later without touching the studio UI.
 *
 * Today: no payments exist. Previews are free for everyone, 'sample'
 * products download free, and premium products download as a watermarked
 * proof. Set VITE_PRINTABLES_UNLOCKED=true (or run the dev server) to
 * download everything unwatermarked while testing.
 */
export const OFFERS = {
  // Bundle price comes from the existing premium bundle (data/premium.js).
  bundle: { id: 'bundle', label: 'Complete printable collection' },
  // Individual product pricing hasn't been decided — none is shown.
}

export function getEntitlements() {
  const env = import.meta.env || {}
  const unlocked = env.DEV === true || String(env.VITE_PRINTABLES_UNLOCKED || '') === 'true'
  return { unlocked, purchased: new Set(), checkoutAvailable: false }
}

/** 'full' | 'proof' for a product. */
export function downloadLevel(product, ent = getEntitlements()) {
  if (ent.unlocked || product.tier === 'sample' || ent.purchased.has(product.id) || ent.purchased.has('bundle')) return 'full'
  return 'proof'
}
