import { useEffect, useState } from 'react'

// Minimal in-memory router with optional hash sync.
// Screens: #home, #plan, #results, #shop, #premium.
// Activity guides and recipes open over the results as #guide-<id> and
// #recipe-<id>, so the browser Back button closes them. #shopping opens
// Shop & DIY on the food shopping list. Route changes are driven by app
// state, so navigation still works in sandboxed previews where history
// can't be changed; the hash is updated when allowed.

export const ROUTES = ['home', 'plan', 'results', 'shop', 'shopping', 'premium']
const GUIDE = /^(guide|recipe)-[a-z0-9-]+$/
const EVENT = 'whimavera:navigate'

const valid = (r) => ROUTES.includes(r) || GUIDE.test(r)

function readHash(fallback) {
  try {
    const h = (window.location.hash || '').replace(/^#/, '')
    return valid(h) ? h : fallback
  } catch {
    return fallback
  }
}

export const isGuideRoute = (r) => GUIDE.test(r)
export const guideIdFrom = (r) => (/^guide-/.test(r) ? r.slice('guide-'.length) : null)
export const recipeIdFrom = (r) => (/^recipe-/.test(r) ? r.slice('recipe-'.length) : null)
export const baseRouteOf = (r) => (GUIDE.test(r) ? 'results' : r)

export function useHashRoute(fallback = 'home') {
  const [route, setRoute] = useState(() => readHash(fallback))
  useEffect(() => {
    const onNav = (e) => setRoute(e.detail)
    const onHash = () => setRoute(readHash(fallback))
    // Any <a href="#route"> in the app navigates through the router.
    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]')
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return
      const r = a.getAttribute('href').slice(1)
      if (valid(r)) {
        e.preventDefault()
        navigate(r)
      }
    }
    window.addEventListener(EVENT, onNav)
    window.addEventListener('hashchange', onHash)
    window.addEventListener('popstate', onHash)
    document.addEventListener('click', onClick)
    return () => {
      window.removeEventListener(EVENT, onNav)
      window.removeEventListener('hashchange', onHash)
      window.removeEventListener('popstate', onHash)
      document.removeEventListener('click', onClick)
    }
  }, [fallback])
  return route
}

/**
 * Navigate to a route. Returns true when a browser history entry was added
 * (so history.back() will return here), false when navigation is state-only.
 */
export function navigate(route, { replace = false } = {}) {
  window.dispatchEvent(new CustomEvent(EVENT, { detail: route }))
  try {
    if (window.location.hash === `#${route}`) return false
    if (replace) history.replaceState(null, '', `#${route}`)
    else history.pushState(null, '', `#${route}`)
    return !replace
  } catch {
    return false
  }
}
