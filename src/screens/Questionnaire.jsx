import { useState } from 'react'
import Scene from '../components/Scene.jsx'
import { Button, Eyebrow } from '../components/ui.jsx'

export default function Questionnaire({ eventType, answers, onChange, onComplete }) {
  const questions = eventType.questions
  const [step, setStep] = useState(0)
  const q = questions[step]
  const value = answers[q.id]
  const isLast = step === questions.length - 1
  const canContinue = q.type === 'multi' ? value?.length > 0 : value != null

  const set = (v) => onChange((a) => ({ ...a, [q.id]: v }))
  const toggle = (v) => {
    const cur = value || []
    set(cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v])
  }
  const next = () => (isLast ? onComplete() : setStep((s) => s + 1))
  const back = () => setStep((s) => Math.max(0, s - 1))
  const theme = eventType.themes.find((t) => t.id === answers.theme) || eventType.themes[0]

  return (
    <section className="quiz container">
      <div className="quiz__main">
        <div className="quiz__progress" aria-label={`Step ${step + 1} of ${questions.length}`}>
          {questions.map((qq, i) => (
            <button
              key={qq.id}
              className={`quiz__pip ${i < step ? 'is-done' : ''} ${i === step ? 'is-current' : ''}`}
              onClick={() => i <= step && setStep(i)}
              aria-label={`Go to step ${i + 1}`}
              disabled={i > step}
            />
          ))}
        </div>

        <div className="quiz__card" key={q.id}>
          <Eyebrow>{q.eyebrow}</Eyebrow>
          <h1 className="display-2 quiz__title">{q.title}</h1>
          {q.hint && <p className="quiz__hint">{q.hint}</p>}

          {q.type === 'single' && (
            <div className="choice-grid">
              {q.options.map((o) => (
                <button
                  key={o.value}
                  className={`choice ${value === o.value ? 'is-selected' : ''}`}
                  onClick={() => set(o.value)}
                  aria-pressed={value === o.value}
                >
                  <span className="choice__label">{o.label}</span>
                  {o.note && <span className="choice__note">{o.note}</span>}
                </button>
              ))}
            </div>
          )}

          {q.type === 'multi' && (
            <div className="chip-wrap">
              {q.options.map((o) => {
                const on = value?.includes(o.value)
                return (
                  <button key={o.value} className={`chip ${on ? 'is-selected' : ''}`} onClick={() => toggle(o.value)} aria-pressed={on}>
                    {o.label}
                  </button>
                )
              })}
            </div>
          )}

          {q.type === 'themes' && (
            <div className="theme-pick">
              {eventType.themes.map((t) => (
                <button
                  key={t.id}
                  className={`theme-pick__item ${value === t.id ? 'is-selected' : ''}`}
                  onClick={() => set(t.id)}
                  aria-pressed={value === t.id}
                >
                  <div className="theme-pick__img">
                    <Scene kind="detail" photo={t.photos?.detail || t.photos?.card} palette={t.palette} motif={t.motif} alt="" />
                  </div>
                  <span className="theme-pick__name">{t.name}</span>
                  <span className="theme-pick__tag">{t.tagline}</span>
                  {!eventType.plans[t.id] && <span className="theme-pick__soon">Full plan coming soon</span>}
                </button>
              ))}
            </div>
          )}

          {q.type === 'range' && (
            <div className="range">
              <output className="range__value">{q.format(value)}</output>
              <input
                type="range"
                min={q.min}
                max={q.max}
                step={q.step}
                value={value}
                onChange={(e) => set(Number(e.target.value))}
                style={{ '--pct': `${((value - q.min) / (q.max - q.min)) * 100}%` }}
                aria-label={q.title}
              />
              <div className="range__ends">
                <span>{q.format(q.min)}</span>
                <span>{q.format(q.max)}+</span>
              </div>
            </div>
          )}

          <div className="quiz__nav">
            <Button variant="ghost" onClick={back} disabled={step === 0}>
              ← Back
            </Button>
            <Button onClick={next} disabled={!canContinue}>
              {isLast ? 'Create my plan' : 'Continue'}
            </Button>
          </div>
        </div>
      </div>

      <aside className="quiz__aside" aria-label="Your party so far">
        <div className="quiz__aside-img">
          <Scene kind="tablescape" palette={theme.palette} motif={theme.motif} alt="" />
        </div>
        <Eyebrow>Your party so far</Eyebrow>
        <h3 className="display-3">{theme.name}</h3>
        <dl className="summary-list">
          <div><dt>Age</dt><dd>{answers.ageRange}</dd></div>
          <div><dt>Guests</dt><dd>{answers.guestCount}</dd></div>
          <div><dt>Budget</dt><dd>${answers.budget}</dd></div>
          <div><dt>Loves</dt><dd>{(answers.interests || []).length} picked</dd></div>
        </dl>
      </aside>
    </section>
  )
}
