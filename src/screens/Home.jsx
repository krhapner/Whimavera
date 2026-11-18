import Scene from '../components/Scene.jsx'
import { Button, Eyebrow, SectionHeading, Sparkle, Divider } from '../components/ui.jsx'
import { eventTypes } from '../data/eventTypes.js'

const STEPS = [
  { n: '01', title: 'Tell us about them', body: 'Eight gentle questions — age, loves, guests, budget, and how much time you really have.' },
  { n: '02', title: 'Receive your plan', body: 'A cohesive mood board, palette, games, menu, timeline and checklist, made for your party.' },
  { n: '03', title: 'Shop it or make it', body: 'Curated lists with quantities and estimates, or step-by-step DIY with budget swaps.' },
]

export default function Home({ eventType, onPickTheme, onShowExample }) {
  const featured = eventType.themes[0]
  const comingSoon = Object.values(eventTypes).filter((e) => e.status !== 'live')

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__copy">
            <Eyebrow>
              <Sparkle size={10} /> Children’s birthday planner
            </Eyebrow>
            <h1 className="display-1">
              Beautifully imagined.
              <br />
              <em>Effortlessly planned.</em>
            </h1>
            <p className="lede">
              Whimavera turns a few thoughtful answers into a complete, personalized party — from the
              palette and the games to the very last favor tag.
            </p>
            <div className="hero__actions">
              <Button as="a" href="#plan" size="lg">
                Plan Your Party
              </Button>
              <Button variant="ghost" size="lg" onClick={onShowExample}>
                See an example plan
              </Button>
            </div>
            <p className="hero__fine">No account needed · Takes about two minutes</p>
          </div>
          <figure className="hero__image">
            <Scene kind="hero" photo="homeHero" palette={featured.palette} motif={featured.motif} alt="Children in fairy wings twirling at a fairy garden party" />
            <figcaption className="photo-caption">
              <span>Featured</span> The Fairy Garden, for a six-year-old’s afternoon
            </figcaption>
          </figure>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k}>
              Fairy gardens <Sparkle size={9} /> Tea parties <Sparkle size={9} /> Starry nights <Sparkle size={9} /> Dino
              digs <Sparkle size={9} /> Under the sea <Sparkle size={9} /> Rainbow picnics <Sparkle size={9} />{' '}
            </span>
          ))}
        </div>
      </div>

      {/* How it works */}
      <section className="section container">
        <SectionHeading eyebrow="How it works" title="A party plan, thoughtfully composed" align="center" />
        <ol className="steps">
          {STEPS.map((s) => (
            <li key={s.n} className="steps__item">
              <span className="steps__n">{s.n}</span>
              <h3 className="display-3">{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Theme previews */}
      <section className="section section--tinted">
        <div className="container">
          <SectionHeading
            eyebrow="Theme collection"
            title="Begin with a little inspiration"
            intro="Each theme arrives with its own palette, games, menu and paper goods. Tap one to start planning."
          />
          <div className="theme-grid">
            {eventType.themes.map((t, i) => (
              <button key={t.id} className="theme-card" onClick={() => onPickTheme(t.id)}>
                <div className="theme-card__img">
                  <Scene kind={['tablescape', 'detail', 'cake', 'invite', 'balloons', 'crown'][i % 6]} photo={t.photos?.card} palette={t.palette} motif={t.motif} label={t.name} alt={`${t.name} inspiration`} />
                </div>
                <div className="theme-card__body">
                  <div className="theme-card__dots">
                    {t.palette.slice(0, 4).map((p) => (
                      <span key={p.hex} style={{ background: p.hex }} />
                    ))}
                  </div>
                  <h3 className="display-3">{t.name}</h3>
                  <p>{t.tagline}</p>
                  <span className="text-link">Plan this theme →</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial feature */}
      <section className="section container feature">
        <div className="feature__images">
          <Scene kind="cake" photo="fairyPortrait" palette={featured.palette} className="feature__a" alt="A smiling girl in fairy wings" />
        </div>
        <div className="feature__copy">
          <Eyebrow>The example plan</Eyebrow>
          <h2 className="display-2">
            Olivia turns six in a <em>fairy garden</em>
          </h2>
          <p className="lede">
            Twelve little fairies, a backyard, a $300 budget and one free weekend. See exactly how Whimavera
            pulls it together — inspiration board to party-day timeline.
          </p>
          <ul className="feature__list">
            <li>Five-color palette & mood board</li>
            <li>Budget breakdown that adds up</li>
            <li>Games for six-year-olds</li>
            <li>A minute-by-minute party day</li>
          </ul>
          <Button onClick={onShowExample}>Open the Fairy Garden plan</Button>
        </div>
      </section>

      <Divider />

      {/* Premium teaser */}
      <section className="section container">
        <div className="teaser">
          <div>
            <Eyebrow>Made to match</Eyebrow>
            <h2 className="display-2">Every paper detail, designed for your party</h2>
            <p className="lede">
              Once your plan is ready, add matching invitations, signs, games and favor tags — in your theme’s
              colors, personalized with your child’s name.
            </p>
            <Button as="a" href="#plan" variant="secondary">
              Start your plan
            </Button>
          </div>
          <Scene kind="invite" photo="paperSuite" palette={featured.palette} motif={featured.motif} className="teaser__img" alt="Matching fairy garden invitation, note card, place card and favor tag" />
        </div>
      </section>

      {/* Future categories */}
      <section className="section section--tinted">
        <div className="container">
          <SectionHeading eyebrow="Coming to Whimavera" title="More reasons to gather" align="center" />
          <div className="soon-grid">
            {comingSoon.map((e) => (
              <div key={e.id} className="soon-card">
                <Tag>Coming soon</Tag>
                <h3 className="display-3">{e.label}</h3>
                <p>{e.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function Tag({ children }) {
  return <span className="tag tag--soft">{children}</span>
}
