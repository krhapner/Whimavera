import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Header, Footer } from './components/Layout.jsx'
import { liveEventType } from './data/eventTypes.js'
import { buildPlan } from './lib/buildPlan.js'
import { buildCatalog, derivePlan, emptySelections, toggleSelection, swapVariant } from './lib/recommend.js'
import { catalogMetaByTheme } from './data/birthday/catalog/index.js'
import { useHashRoute, navigate, baseRouteOf, guideIdFrom, recipeIdFrom } from './lib/router.js'
import Home from './screens/Home.jsx'
import Questionnaire from './screens/Questionnaire.jsx'
import Results from './screens/Results.jsx'
import ShopDiy from './screens/ShopDiy.jsx'
import Premium from './screens/Premium.jsx'
import { ShopContext, SupplySheet } from './components/Shopping.jsx'
import { shoppingForItem, typicalTotal } from './lib/shopping.js'

const STORAGE_KEY = 'whimavera.answers.v1'
const PLANNED_KEY = 'whimavera.hasPlan.v1'

function loadAnswers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...liveEventType.defaultAnswers, ...JSON.parse(raw) }
  } catch {
    /* storage unavailable — fall back to the example */
  }
  return liveEventType.defaultAnswers
}

// Small persisted state for one viewer's conveniences (adult count,
// shopping list). Falls back to memory when storage is unavailable.
function usePersisted(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw != null ? JSON.parse(raw) : initial
    } catch {
      return initial
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* ignore */
    }
  }, [key, value])
  return [value, setValue]
}

export default function App() {
  const route = useHashRoute('home')
  const baseRoute = baseRouteOf(route)
  const guideId = guideIdFrom(route)
  const recipeId = recipeIdFrom(route)
  // Adults are never assumed — the host adds them if they'll eat too.
  const [adults, setAdults] = usePersisted('whimavera.adults.v1', 0)
  // Shopping list stores recipe ids only, so adding twice is a no-op and the
  // consolidated list always reflects current guest numbers.
  const [shoppingIds, setShoppingIds] = usePersisted('whimavera.shopping.v1', [])
  const addToList = useCallback((id) => setShoppingIds((ids) => (ids.includes(id) ? ids : [...ids, id])), [setShoppingIds])
  const removeFromList = useCallback((id) => setShoppingIds((ids) => ids.filter((x) => x !== id)), [setShoppingIds])
  const shopping = { ids: shoppingIds, add: addToList, remove: removeFromList, clear: () => setShoppingIds([]) }
  const [answers, setAnswers] = useState(loadAnswers)
  const [hasPlan, setHasPlan] = useState(() => {
    try {
      return localStorage.getItem(PLANNED_KEY) === '1'
    } catch {
      return false
    }
  })
  const markPlanned = () => {
    setHasPlan(true)
    try {
      localStorage.setItem(PLANNED_KEY, '1')
    } catch {
      /* ignore */
    }
  }

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers))
    } catch {
      /* ignore */
    }
  }, [answers])

  // Scroll to top only when the screen changes — opening or closing an
  // activity guide keeps the results exactly where they were.
  useEffect(() => {
    try {
      window.scrollTo(0, 0)
    } catch {
      /* ignore */
    }
  }, [baseRoute])

  // Guides: remember whether opening added a history entry, so closing can
  // use Back (natural) or a replace (deep link / sandboxed preview).
  const guidePushed = useRef(false)
  const openGuide = useCallback((id) => {
    guidePushed.current = navigate(`guide-${id}`)
  }, [])
  const openRecipe = useCallback((id) => {
    guidePushed.current = navigate(`recipe-${id}`)
  }, [])
  const closeGuide = useCallback(() => {
    if (guidePushed.current) {
      guidePushed.current = false
      try {
        history.back()
        return
      } catch {
        /* fall through */
      }
    }
    navigate('results', { replace: true })
  }, [])

  const plan = useMemo(() => buildPlan(liveEventType, answers), [answers])

  // Quiz answers and the parent's own choices are stored separately. Choices
  // are kept per theme as additions/removals/swaps on top of recommendations,
  // so recalculating recommendations never overwrites them.
  const [allSelections, setAllSelections] = usePersisted('whimavera.selections.v1', {})
  const selections = allSelections[plan.theme.id] || emptySelections()
  const catalog = useMemo(() => buildCatalog(plan, catalogMetaByTheme[plan.theme.id]), [plan])
  const derived = useMemo(
    () => derivePlan(plan, catalog, answers, selections, { adults }),
    [plan, catalog, answers, selections, adults],
  )
  const updateSelections = useCallback(
    (fn) => setAllSelections((all) => ({ ...all, [plan.theme.id]: fn(all[plan.theme.id] || emptySelections()) })),
    [plan.theme.id, setAllSelections],
  )
  const recIds = {
    activities: derived.rec.activities,
    food: derived.rec.food,
    diy: derived.rec.diy,
    decor: Object.keys(derived.rec.slots),
  }
  const planApi = {
    toggle: (section, id, on) => updateSelections((s) => toggleSelection(s, section, id, on, recIds[section])),
    swap: (slotId, variantId) => updateSelections((s) => swapVariant(s, slotId, variantId)),
    reset: () => updateSelections(() => emptySelections()),
  }

  // Shopping: owned supplies and deselected supplies are shared across the
  // whole app and persisted. Opening a shopping panel never changes the plan.
  const [ownedIds, setOwnedIds] = usePersisted('whimavera.owned.v1', [])
  const [skippedIds, setSkippedIds] = usePersisted('whimavera.skipped.v1', [])
  const [shopRequest, setShopRequest] = useState(null)
  const flip = (setter) => (id) => setter((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]))
  // Item count and typical cost for any card's "Shop" button, computed once
  // per plan (the same lists the shopping panel shows).
  const summaryCache = useMemo(() => new Map(), [plan, catalog, adults])
  const shopApi = useMemo(
    () => ({
      owned: new Set(ownedIds),
      skipped: new Set(skippedIds),
      toggleOwned: flip(setOwnedIds),
      toggleSkipped: flip(setSkippedIds),
      openShop: (req) => setShopRequest(req),
      summary: (kind, id, variantId) => {
        const key = `${kind}:${id}:${variantId || ''}`
        if (!summaryCache.has(key)) {
          const r = shoppingForItem(plan, catalog, kind, id, { variantId, adults })
          summaryCache.set(key, { count: r.required.length + r.optional.length, range: typicalTotal(r.required)?.range || null })
        }
        return summaryCache.get(key)
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ownedIds, skippedIds, summaryCache],
  )

  const startWithTheme = (themeId) => {
    setAnswers((a) => ({ ...a, theme: themeId }))
    navigate('plan')
  }
  const showExample = () => {
    setAnswers(liveEventType.defaultAnswers)
    markPlanned()
    navigate('results')
  }

  let screen
  switch (baseRoute) {
    case 'plan':
      screen = (
        <Questionnaire
          eventType={liveEventType}
          answers={answers}
          onChange={setAnswers}
          onComplete={() => {
            markPlanned()
            navigate('results')
          }}
        />
      )
      break
    case 'results':
      screen = (
        <Results
          plan={plan}
          onShowExample={showExample}
          guideId={guideId}
          recipeId={recipeId}
          onOpenGuide={openGuide}
          onOpenRecipe={openRecipe}
          onCloseGuide={closeGuide}
          adults={adults}
          setAdults={setAdults}
          shopping={shopping}
          catalog={catalog}
          derived={derived}
          planApi={planApi}
          answers={answers}
          setAnswers={setAnswers}
        />
      )
      break
    case 'shop':
    case 'shopping':
      screen = (
        <ShopDiy
          plan={plan}
          initialTab={baseRoute === 'shopping' ? 'food' : undefined}
          adults={adults}
          shopping={shopping}
          catalog={catalog}
          derived={derived}
          planApi={planApi}
        />
      )
      break
    case 'premium':
      screen = <Premium plan={plan} hasPlan={hasPlan} sel={derived.sel} />
      break
    default:
      screen = <Home eventType={liveEventType} onPickTheme={startWithTheme} onShowExample={showExample} />
  }

  return (
    <ShopContext.Provider value={shopApi}>
    <div className="app">
      <Header route={baseRoute === 'shopping' ? 'shop' : baseRoute} />
      <main key={baseRoute} className="screen-enter">
        {screen}
      </main>
      <Footer />
      {shopRequest && (
        <SupplySheet
          request={shopRequest}
          plan={plan}
          catalog={catalog}
          derived={derived}
          planApi={planApi}
          onClose={() => setShopRequest(null)}
          onViewGuide={(id) => {
            setShopRequest(null)
            if (baseRoute !== 'results') navigate('results')
            openGuide(id)
          }}
        />
      )}
    </div>
    </ShopContext.Provider>
  )
}
