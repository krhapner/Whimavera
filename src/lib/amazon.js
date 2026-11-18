/**
 * Central Amazon affiliate URL generator. Every Amazon link in Whimavera is
 * built here, so the tracking tag is applied in exactly one place.
 *
 *   amazonSearchUrl('green floral tape')     → https://www.amazon.com/s?k=green+floral+tape&tag=…
 *   amazonProductUrl('B0H41D1GQ5')           → https://www.amazon.com/dp/B0H41D1GQ5?tag=…
 *   withAffiliateTag('https://www.amazon.com/…?ref=x&tag=old-20')
 *                                            → same URL, other params kept, tag replaced
 */
import { AMAZON } from '../config/affiliate.js'

const ASIN = /^[A-Z0-9]{10}$/
const AMAZON_HOST = /(^|\.)amazon\.[a-z.]+$/i

/** Add (or replace) the tracking tag, keeping every other query parameter. */
export function withAffiliateTag(url, tag = AMAZON.tag) {
  let u
  try {
    u = new URL(url)
  } catch {
    return null
  }
  if (u.protocol !== 'https:' || !AMAZON_HOST.test(u.hostname)) return null
  // Remove any existing tag (including duplicates) before setting ours.
  u.searchParams.delete('tag')
  if (tag) u.searchParams.set('tag', tag)
  return u.toString()
}

/** Search results page for a phrase. */
export function amazonSearchUrl(query, tag = AMAZON.tag) {
  const q = String(query || '').replace(/\s+/g, ' ').trim()
  if (!q) return null
  const u = new URL('/s', AMAZON.host)
  u.searchParams.set('k', q)
  return withAffiliateTag(u.toString(), tag)
}

/** Product page for a verified ASIN. */
export function amazonProductUrl(asin, tag = AMAZON.tag) {
  const a = String(asin || '').trim().toUpperCase()
  if (!ASIN.test(a)) return null
  return withAffiliateTag(`${AMAZON.host}/dp/${a}`, tag)
}

/**
 * Best link for a supply-like object: a verified product URL, then an ASIN,
 * then a search for its search phrase. Returns { href, kind } or null.
 */
export function amazonLinkFor(s, tag = AMAZON.tag) {
  if (!s) return null
  const product = (s.url && withAffiliateTag(s.url, tag)) || (s.asin && amazonProductUrl(s.asin, tag))
  if (product) return { href: product, kind: 'product' }
  const search = amazonSearchUrl(s.search, tag)
  return search ? { href: search, kind: 'search' } : null
}
