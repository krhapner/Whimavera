import { useEffect, useMemo, useState } from 'react'
import { Header, Footer } from './components/Layout.jsx'
import { liveEventType } from './data/eventTypes.js'
import { buildPlan } from './lib/buildPlan.js'
import { useHashRoute, navigate } from './lib/router.js'
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

  useEffect(() => {
    try {
      window.scrollTo(0, 0)
    } catch {
      /* ignore */
    }
  }, [route])

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
  switch (route) {
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
      screen = <Results plan={plan} onShowExample={showExample} />
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
      <Header route={route} />
      <main key={route} className="screen-enter">
        {screen}
      </main>
      <Footer />
    </div>
  )
}
