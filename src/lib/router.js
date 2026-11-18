import { useEffect, useState } from 'react'

// Minimal in-memory router with optional hash sync (#home, #plan, #results, #shop, #premium).
// Route changes are driven by app state, so navigation works even inside sandboxed
// previews where changing location.hash is blocked; the hash is updated when allowed
// so deep links and the back button still work in a normal browser.
// Swap for React Router when real URLs / nested routes are needed.

export const ROUTES = ['home', 'plan', 'results', 'shop', 'premium']
const EVENT = 'whimavera:navigate'

function readHash(fallback) {
  try {
    const h = (window.location.hash || '').replace(/^#/, '')
    return ROUTES.includes(h) ? h : fallback
  } catch {
    return fallback
  }
}

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
      if (ROUTES.includes(r)) {
        e.preventDefault()
        navigate(r)
      }
    }
    window.addEventListener(EVENT, onNav)
    window.addEventListener('hashchange', onHash)
    document.addEventListener('click', onClick)
    return () => {
      window.removeEventListener(EVENT, onNav)
      window.removeEventListener('hashchange', onHash)
      document.removeEventListener('click', onClick)
    }
  }, [fallback])
  return route
}

export function navigate(route) {
  window.dispatchEvent(new CustomEvent(EVENT, { detail: route }))
  try {
    if (window.location.hash !== `#${route}`) history.pushState(null, '', `#${route}`)
  } catch {
    /* sandboxed — state-only navigation */
  }
}
