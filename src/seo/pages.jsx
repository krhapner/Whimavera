/**
 * Public, prerendered pages: the theme guides, the themes index and the
 * planning guide. They render to static HTML at build time (see
 * src/entry-server.jsx and scripts/prerender.mjs) and use the app's own
 * styles and components, so they look like the rest of Whimavera.
 */
import Scene from '../components/Scene.jsx'
import { Header, Footer } from '../components/Layout.jsx'
import { Button, Eyebrow, Palette, Tag, Sparkle } from '../components/ui.jsx'
import { ActivityImage } from '../components/ActivityCard.jsx'
import { AMAZON } from '../config/affiliate.js'
import { themePath, GUIDE_PATH } from './content.js'

const SPONSORED = 'sponsored nofollow noopener noreferrer'
const range = (r) => (!r ? '' : r[0] === r[1] ? `$${r[0]}` : `$${r[0]}–$${r[1]}`)
const ageText = (a) => (a ? `Ages ${a.min}–${a.max}` : null)
const planHref = (theme) => `/?theme=${theme.id}#plan`
const sampleHref = (theme) => `/?theme=${theme.id}&sample=1#results`

/** Shared page frame: header, breadcrumbs, content, footer. */
export function StaticPage({ route, crumbs, children }) {
  return (
    <div className="app">
      <Header route={route} base="/" />
      <main>
        {crumbs && (
          <nav className="crumbs container" aria-label="Breadcrumb">
            <ol>
              {crumbs.map((c, i) => (
                <li key={c.name}>
                  {i < crumbs.length - 1 ? <a href={c.path}>{c.name}</a> : <span aria-current="page">{c.name}</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {children}
      </main>
      <Footer base="/" />
    </div>
  )
}

function MenuImg({ item }) {
  if (!item.imageUrl) return null
  return <img className="activity-img" src={item.imageUrl} alt={item.imageAlt} loading="lazy" decoding="async" />
}

/** One theme's guide: everything a parent needs before opening the planner. */
export function ThemePage({ d }) {
  const { theme, seo, plan, catalog, cost, shopping, related, crumbs } = d
  const activities = plan.games.map((g) => ({ g, meta: catalog.activities.find((a) => a.id === g.id) }))
  const indoor = activities.filter(({ meta }) => meta?.space === 'small')

  return (
    <StaticPage route="/themes/" crumbs={crumbs}>
      <article className="theme-page">
        {/* Hero */}
        <header className="hero hero--theme">
          <div className="container hero__grid">
            <div className="hero__copy">
              <Eyebrow>
                <Sparkle size={10} /> Birthday party theme
              </Eyebrow>
              <h1 className="display-1">{seo.label} ideas</h1>
              <p className="lede">{plan.intro}</p>
              <ul className="theme-facts">
                {theme.ages?.length > 0 && <li><strong>Best for</strong> ages {theme.ages[0].split('-')[0]}–{theme.ages[theme.ages.length - 1].split('-')[1]}</li>}
                {cost && <li><strong>Typical cost</strong> {range(cost)} for {d.guests} children</li>}
                <li><strong>{plan.games.length} activities</strong> · {plan.food.length} dishes · {plan.diy.length} DIY projects</li>
              </ul>
              <div className="hero__actions">
                <Button as="a" href={planHref(theme)} size="lg">
                  Plan this party
                </Button>
                <Button as="a" href={sampleHref(theme)} variant="ghost" size="lg">
                  See a sample plan
                </Button>
              </div>
              <p className="hero__fine">Free · No account needed · Answer a few questions, or skip straight to a sample plan</p>
            </div>
            <figure className="hero__image">
              <Scene kind="hero" photo={plan.heroPhoto} palette={theme.palette} motif={theme.motif} label={theme.name} priority />
            </figure>
          </div>
        </header>

        {/* Intro */}
        <section className="section container theme-intro">
          {seo.intro.map((p) => (
            <p key={p.slice(0, 24)} className="lede">
              {p}
            </p>
          ))}
        </section>

        {/* Palette & inspiration */}
        <section className="section section--tinted" id="inspiration">
          <div className="container">
            <h2 className="display-2">Colors & inspiration</h2>
            <p className="lede">
              {plan.moodWords.join(' · ')}. A five-color palette keeps everything — balloons, paper, plates and cake — looking like it belongs together.
            </p>
            <Palette colors={theme.palette} />
            <div className="board">
              {plan.board.map((b, i) => (
                <figure key={b.caption} className={`board__item board__item--${i}`}>
                  <Scene kind={b.kind} photo={b.photo} palette={theme.palette} motif={theme.motif} label={theme.name} />
                  <figcaption>{b.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Decorations */}
        <section className="section container" id="decorations">
          <h2 className="display-2">Decorations & setup: {plan.headings.decor.toLowerCase()}</h2>
          <p className="lede">Set the party up as a few small zones rather than decorating everything — it looks fuller and costs less.</p>
          <div className="zone-list">
            {plan.setup.map((z) => (
              <div key={z.zone} className="zone-item">
                {z.photo && (
                  <div className="zone-item__img">
                    <Scene kind="tablescape" photo={z.photo} palette={theme.palette} motif={theme.motif} label={theme.name} />
                  </div>
                )}
                <div>
                  <h3 className="display-3">{z.zone}</h3>
                  <p>{z.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Activities */}
        <section className="section section--tinted" id="activities">
          <div className="container">
            <h2 className="display-2">{seo.short} party games & activities</h2>
            <p className="lede">
              {plan.games.length} ideas, from calm crafts to running games. Mix one or two of each so quieter guests and busy ones both have a moment.
              {indoor.length > 0 && ` ${indoor.length} of them work well indoors if the weather turns.`}
            </p>
            <div className="act-grid">
              {activities.map(({ g, meta }, i) => (
                <article key={g.id} className="act-card">
                  <div className="act-card__media">
                    <ActivityImage activity={g} theme={theme} index={i} />
                  </div>
                  <div className="act-card__body">
                    <div className="card__meta">
                      <Tag tone={g.energy === 'Calm' ? 'sage' : 'blush'}>{g.energy}</Tag>
                      <span>
                        {g.time}
                        {ageText(meta?.ages) ? ` · ${ageText(meta.ages)}` : ''}
                        {meta?.space === 'small' ? ' · Works indoors' : ''}
                      </span>
                    </div>
                    <h3 className="display-3">{g.name}</h3>
                    <p className="act-card__desc">{g.description}</p>
                    {meta?.cost && (
                      <p className="act-card__note">
                        {d.costOf(meta.cost)?.[1] > 0 ? `Supplies typically ${range(d.costOf(meta.cost))} for ${d.guests} children` : 'No supplies to buy'}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* DIY */}
        {plan.diy.length > 0 && (
          <section className="section container" id="diy">
            <h2 className="display-2">DIY {seo.short.toLowerCase()} decorations & crafts</h2>
            <div className="diy-list">
              {plan.diy.map((p) => (
                <div key={p.name} className="diy-item">
                  <h3 className="display-3">{p.name}</h3>
                  <p className="diy-item__meta">
                    {p.time} · {p.difficulty}
                    {p.saves ? ` · ${p.saves}` : ''}
                  </p>
                  <h4>You’ll need</h4>
                  <ul>
                    {p.materials.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                  <h4>How to make it</h4>
                  <ol>
                    {p.steps.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Food */}
        <section className="section section--tinted" id="food">
          <div className="container">
            <h2 className="display-2">{seo.short} party food & snacks</h2>
            <p className="lede">{plan.headings.food}: easy, small-hand-friendly food with one showpiece cake.</p>
            <div className="act-grid">
              {plan.food.map((f) => (
                <article key={f.id} className="act-card">
                  <div className="act-card__media">
                    <MenuImg item={f} />
                  </div>
                  <div className="act-card__body">
                    <div className="card__meta">
                      <Tag>{f.tag}</Tag>
                    </div>
                    <h3 className="display-3">{f.name === 'The cake' ? `The ${seo.short.toLowerCase()} cake` : f.name}</h3>
                    <p className="act-card__desc">{f.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Budget */}
        <section className="section container" id="budget">
          <h2 className="display-2">What a {seo.short.toLowerCase()} party costs</h2>
          {cost && (
            <p className="lede">
              Planned for {d.guests} children with a few activities, the menu and simple decorations, a {theme.name} party typically costs{' '}
              <strong>{range(cost)}</strong> in supplies. The planner adjusts every quantity and cost to your guest count and budget.
            </p>
          )}
          {plan.substitutions?.length > 0 && (
            <>
              <h3 className="display-3">Ways to save</h3>
              <ul className="save-list">
                {plan.substitutions.map((s) => (
                  <li key={s.swap}>
                    <strong>{s.for}</strong> instead of {s.swap.toLowerCase()} — {s.why.toLowerCase()}.
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>

        {/* Shopping */}
        {shopping.length > 0 && (
          <section className="section section--tinted" id="shopping">
            <div className="container">
              <h2 className="display-2">What to buy</h2>
              <p className="lede">The supplies that make the biggest difference, with quantities for {d.guests} children. Each opens matching options on Amazon.</p>
              <ul className="shop-highlights">
                {shopping.map((i) => (
                  <li key={i.id}>
                    <div>
                      <strong>{i.name}</strong>
                      <span>
                        {i.label}
                        {i.est ? ` · typically ${range(i.est.map(Math.round))}` : ''}
                        {i.sources?.length ? ` · for ${i.sources.slice(0, 2).join(', ')}` : ''}
                      </span>
                    </div>
                    {i.link && (
                      <a className="amz-btn amz-btn--sm" href={i.link.href} target="_blank" rel={SPONSORED}>
                        Shop on Amazon <span className="amz-btn__arrow" aria-hidden="true">↗</span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
              <p className="affiliate-note">{AMAZON.disclosure} Links open Amazon search results; costs are typical planning estimates, not retailer prices.</p>
            </div>
          </section>
        )}

        {/* Tips */}
        {seo.tips.length > 0 && (
          <section className="section container" id="tips">
            <h2 className="display-2">Tips for a smooth {seo.short.toLowerCase()} party</h2>
            <ol className="tip-list">
              {seo.tips.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ol>
          </section>
        )}

        {/* CTA */}
        <section className="section container">
          <div className="cta-band">
            <div>
              <h2 className="display-2">Make it your party</h2>
              <p className="lede">
                Tell us your child’s age, guests, budget and how much time you have. Whimavera builds a {theme.name} plan with games, menu, timeline,
                checklist and a shopping list — free.
              </p>
            </div>
            <div className="cta-band__actions">
              <Button as="a" href={planHref(theme)}>
                Plan this party
              </Button>
              <Button as="a" href={sampleHref(theme)} variant="secondary">
                See a sample plan
              </Button>
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="section section--tinted" id="related">
          <div className="container">
            <h2 className="display-2">More birthday party themes</h2>
            <ThemeCards items={related} />
          </div>
        </section>
      </article>
    </StaticPage>
  )
}

/** Theme cards as plain links (crawlable). */
export function ThemeCards({ items }) {
  return (
    <div className="theme-grid">
      {items.map(({ theme, seo, photo }, i) => (
        <a key={theme.id} className="theme-card" href={themePath(theme)}>
          <div className="theme-card__img">
            <Scene kind={['tablescape', 'detail', 'cake'][i % 3]} photo={photo} palette={theme.palette} motif={theme.motif} label={theme.name} />
          </div>
          <div className="theme-card__body">
            <div className="theme-card__dots">
              {theme.palette.slice(0, 4).map((p) => (
                <span key={p.hex} style={{ background: p.hex }} />
              ))}
            </div>
            <h3 className="display-3">{theme.name}</h3>
            <p>{theme.tagline}</p>
            <span className="text-link">{seo.label} ideas →</span>
          </div>
        </a>
      ))}
    </div>
  )
}

/** /themes/ — every theme, linked. */
export function ThemesIndexPage({ items, crumbs }) {
  return (
    <StaticPage route="/themes/" crumbs={crumbs}>
      <section className="section container themes-index">
        <Eyebrow>
          <Sparkle size={10} /> Theme collection
        </Eyebrow>
        <h1 className="display-1">Kids’ birthday party themes</h1>
        <p className="lede">
          Six complete party themes, each with its own palette, decorations, games, food, DIY projects and shopping list — for first birthdays through to
          ten-year-olds. Open a theme for ideas, or plan it for your child in about two minutes.
        </p>
        <ThemeCards items={items} />
        <div className="themes-index__list">
          {items.map(({ theme, seo }) => (
            <div key={theme.id}>
              <h2 className="display-3">
                <a href={themePath(theme)}>{seo.label}</a>
              </h2>
              <p>{seo.description}</p>
            </div>
          ))}
        </div>
      </section>
    </StaticPage>
  )
}

/** /guides/how-to-plan-a-kids-birthday-party/ — the planning guide. */
export function GuidePage({ g }) {
  return (
    <StaticPage route="/themes/" crumbs={g.crumbs}>
      <article className="section container guide-page">
        <Eyebrow>
          <Sparkle size={10} /> Planning guide
        </Eyebrow>
        <h1 className="display-1">How to plan a kids’ birthday party</h1>
        <p className="lede">
          A calm, step-by-step way to plan a child’s birthday at home — from choosing a theme to the morning of the party — with a printable-style
          checklist and real budget numbers.
        </p>

        <h2 className="display-2">1. Start with the child, then the theme</h2>
        <p>
          Before colors or cakes, think about what your child loves doing: making things, running, pretending, discovering. A theme is just a way to wrap
          those things together. Toddlers do best with simple sensory play; five- to eight-year-olds love a mission — a treasure hunt, a dig, a craft to take
          home.
        </p>
        <ul className="guide-themes">
          {g.themes.map(({ theme, seo }) => (
            <li key={theme.id}>
              <a href={themePath(theme)}>{seo.label}</a> — {theme.tagline.toLowerCase()}, best for ages {theme.ages[0].split('-')[0]}–
              {theme.ages[theme.ages.length - 1].split('-')[1]}
            </li>
          ))}
        </ul>

        <h2 className="display-2">2. Set a budget you can keep</h2>
        <p>
          Pick a number first and split it before you shop. For a home party, this split leaves room for a proper cake and a few good activities without
          skimping on the basics:
        </p>
        <table className="guide-table">
          <thead>
            <tr>
              <th scope="col">Category</th>
              <th scope="col">Share</th>
              <th scope="col">On a $300 budget</th>
            </tr>
          </thead>
          <tbody>
            {g.budget.map((b) => (
              <tr key={b.id}>
                <th scope="row">{b.label}</th>
                <td>{Math.round(b.share * 100)}%</td>
                <td>${Math.round(b.share * 300)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          What a party actually costs depends mostly on the number of children. Across Whimavera’s themes, a 12-child party with a few activities, the menu
          and simple decorations typically runs <strong>{range(g.costSpan)}</strong> in supplies; the cheapest version of each theme starts lower.
        </p>

        <h2 className="display-2">3. Choose activities by age</h2>
        <p>Plan two or three activities for a two-hour party, alternating calm and active. Some ideas that work at each age:</p>
        {g.byAge.map((a) => (
          <div key={a.label} className="guide-ages">
            <h3 className="display-3">{a.label}</h3>
            <ul>
              {a.items.map((i) => (
                <li key={i.name}>
                  <strong>{i.name}</strong> ({i.theme}) — {i.description}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <h2 className="display-2">4. Plan the party day, hour by hour</h2>
        <p>A two-hour afternoon party usually flows best like this:</p>
        <ol className="guide-timeline">
          {g.timeline.map((t) => (
            <li key={t.time + t.title}>
              <strong>{t.time}</strong> {t.title} — {t.detail}
            </li>
          ))}
        </ol>

        <h2 className="display-2">5. Birthday party planning checklist</h2>
        {g.checklist.map((c) => (
          <div key={c.when} className="guide-check">
            <h3 className="display-3">{c.when}</h3>
            <ul>
              {c.tasks.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        ))}

        <h2 className="display-2">6. Easy ways to save</h2>
        <ul className="save-list">
          {g.saves.map((s) => (
            <li key={s.swap}>
              <strong>{s.for}</strong> instead of {s.swap.toLowerCase()} — {s.why.toLowerCase()}.
            </li>
          ))}
        </ul>

        <div className="cta-band">
          <div>
            <h2 className="display-2">Let Whimavera do the planning</h2>
            <p className="lede">Answer eight quick questions and get a complete plan with quantities, costs and a shopping list — free.</p>
          </div>
          <div className="cta-band__actions">
            <Button as="a" href="/#plan">
              Plan your party
            </Button>
            <Button as="a" href="/themes/" variant="secondary">
              Browse themes
            </Button>
          </div>
        </div>
      </article>
    </StaticPage>
  )
}

/** Branded 404 page (served by Netlify with a real 404 status). */
export function NotFoundPage() {
  return (
    <StaticPage route="">
      <section className="section container not-found">
        <h1 className="display-1">This page has wandered off</h1>
        <p className="lede">The link may be old, or the page may have moved. These are good places to start:</p>
        <div className="hero__actions">
          <Button as="a" href="/themes/">
            Birthday party themes
          </Button>
          <Button as="a" href="/#plan" variant="secondary">
            Plan a party
          </Button>
        </div>
      </section>
    </StaticPage>
  )
}
