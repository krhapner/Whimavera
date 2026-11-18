import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Header, Footer } from './components/Layout.jsx'
import { liveEventType } from './data/eventTypes.js'
import { buildPlan } from './lib/buildPlan.js'
import { useHashRoute, navigate, baseRouteOf, guideIdFrom } from './lib/router.js'
import Home from './screens/Home.jsx'
import Questionnaire from './screens/Questionnaire.jsx'
import Results from './screens/Results.jsx'
import ShopDiy from './screens/ShopDiy.jsx'
import Premium from './screens/Premium.jsx'

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

export default function App() {
  const route = useHashRoute('home')
  const baseRoute = baseRouteOf(route)
  const guideId = guideIdFrom(route)
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
        <Results plan={plan} onShowExample={showExample} guideId={guideId} onOpenGuide={openGuide} onCloseGuide={closeGuide} />
      )
      break
    case 'shop':
      screen = <ShopDiy plan={plan} />
      break
    case 'premium':
      screen = <Premium plan={plan} hasPlan={hasPlan} />
      break
    default:
      screen = <Home eventType={liveEventType} onPickTheme={startWithTheme} onShowExample={showExample} />
  }

  return (
    <div className="app">
      <Header route={baseRoute} />
      <main key={baseRoute} className="screen-enter">
        {screen}
      </main>
      <Footer />
    </div>
  )
}
