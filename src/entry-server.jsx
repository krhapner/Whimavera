/**
 * Build-time renderer for the public, crawlable pages. `vite build --ssr`
 * compiles this file; scripts/prerender.mjs calls render() and writes the
 * HTML into dist/. Nothing here runs in the browser.
 *
 * Every page comes from data: add a theme to the theme list and its page,
 * sitemap entry, metadata and structured data appear on the next build.
 */
import { renderToString } from 'react-dom/server'
import { liveEventType } from './data/eventTypes.js'
import { buildPlan } from './lib/buildPlan.js'
import { buildCatalog, derivePlan, costRange } from './lib/recommend.js'
import { catalogMetaByTheme } from './data/birthday/catalog/index.js'
import { buildPartyShopping } from './lib/shopping.js'
import { defaultBudget, buildChecklist } from './data/birthday/plans/shared.js'
import { photoUrl, ownPhotos } from './data/photos.js'
import { SITE, absolute } from './config/site.js'
import { seoFor, themePath, GUIDE_PATH } from './seo/content.js'
import { ThemePage, ThemesIndexPage, GuidePage, NotFoundPage } from './seo/pages.jsx'
import { Header, Footer } from './components/Layout.jsx'
import Home from './screens/Home.jsx'

const GUESTS = 12
const BUDGET = 300

/** Everything a theme page needs, computed from the theme's plan data. */
function themeData(theme) {
  const answers = { ...liveEventType.defaultAnswers, theme: theme.id, guestCount: GUESTS, budget: BUDGET, budgetMode: 'limit' }
  const plan = buildPlan(liveEventType, answers)
  const catalog = buildCatalog(plan, catalogMetaByTheme[theme.id])
  const derived = derivePlan(plan, catalog, answers)
  const seo = seoFor(theme, plan)
  const party = buildPartyShopping(plan, catalog, derived.sel)
  const shopping = party.items
    .filter((i) => !i.optional && !i.supply?.household && i.link && ['decor', 'activities', 'favors', 'paper'].includes(i.category))
    .sort((a, b) => (b.est?.[1] || 0) - (a.est?.[1] || 0))
    .slice(0, 10)
  return { theme, seo, plan, catalog, derived, cost: derived.estimate.range, shopping, guests: GUESTS, costOf: (c) => costRange(c, { guests: GUESTS }) }
}

const themes = liveEventType.themes
const cards = () => themes.map((t) => ({ theme: t, seo: seoFor(t, buildPlan(liveEventType, { ...liveEventType.defaultAnswers, theme: t.id })), photo: t.photos?.card }))

// ---------- Head: title, description, canonical, social, structured data

const ORG = {
  '@type': 'Organization',
  '@id': `${SITE.url}/#organization`,
  name: SITE.name,
  url: `${SITE.url}/`,
  logo: absolute('/icon-512.png'),
  slogan: SITE.tagline,
}

const breadcrumbLd = (crumbs) => ({
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: absolute(c.path) })),
})

/** An image URL for social cards: the generated share card, else the photo. */
const shareImage = (key) => absolute(`/og/${key}.jpg`)

function head({ path, title, description, image, imageAlt, type = 'website', ld = [], noindex = false }) {
  return {
    path,
    title,
    description,
    canonical: absolute(path),
    image,
    imageAlt,
    type,
    noindex,
    ld: ld.length ? { '@context': 'https://schema.org', '@graph': ld } : null,
  }
}

const HOME_CRUMB = { name: 'Home', path: '/' }
const THEMES_CRUMB = { name: 'Party themes', path: '/themes/' }

// ---------- Pages

export function render() {
  const pages = []
  const today = new Date().toISOString().slice(0, 10)

  // Home — the planner's shell, prerendered so its content is in the HTML.
  pages.push({
    head: head({
      path: '/',
      title: 'Whimavera | Magical Birthday Party Ideas & Planning',
      description:
        'Whimavera plans magical kids’ birthday parties: fairy garden, dinosaur, under the sea and more — with a free planner for games, menu, timeline, budget and shopping list.',
      image: shareImage('home'),
      imageAlt: ownPhotos.homeHero.alt,
      ld: [ORG, { '@type': 'WebSite', '@id': `${SITE.url}/#website`, name: SITE.name, alternateName: 'Whimavera Birthday Party Planner', url: `${SITE.url}/`, publisher: { '@id': ORG['@id'] } }],
    }),
    body: renderToString(
      <div className="app">
        <Header route="home" />
        <main className="screen-enter">
          <Home eventType={liveEventType} onPickTheme={() => {}} onShowExample={() => {}} />
        </main>
        <Footer />
      </div>,
    ),
    shell: true, // keeps the planner's script; React replaces this markup on load
  })

  // Themes index
  const crumbsIndex = [HOME_CRUMB, THEMES_CRUMB]
  pages.push({
    head: head({
      path: '/themes/',
      title: 'Kids’ Birthday Party Themes & Ideas | Whimavera',
      description:
        'Creative birthday party themes for kids, toddlers to ten: fairy garden, dinosaur, under the sea, starry night, woodland tea party and rainbow picnic — with games, food and costs.',
      image: shareImage('themes'),
      imageAlt: 'Whimavera birthday party themes',
      ld: [ORG, breadcrumbLd(crumbsIndex), { '@type': 'CollectionPage', name: 'Kids’ birthday party themes', url: absolute('/themes/'), isPartOf: { '@id': `${SITE.url}/#website` } }],
    }),
    body: renderToString(<ThemesIndexPage items={cards()} crumbs={crumbsIndex} />),
  })

  // One page per theme
  const all = themes.map(themeData)
  all.forEach((d, i) => {
    const path = themePath(d.theme)
    const crumbs = [HOME_CRUMB, THEMES_CRUMB, { name: d.seo.label, path }]
    const related = [1, 2, 3].map((k) => all[(i + k) % all.length]).map((r) => ({ theme: r.theme, seo: r.seo, photo: r.theme.photos?.card }))
    const heroAlt = ownPhotos[d.plan.heroPhoto]?.alt || `${d.theme.name} birthday party`
    pages.push({
      head: head({
        path,
        title: `${d.seo.title} | Whimavera`,
        description: d.seo.description,
        image: shareImage(d.seo.slug),
        imageAlt: heroAlt,
        type: 'article',
        ld: [
          ORG,
          breadcrumbLd(crumbs),
          {
            '@type': 'Article',
            headline: `${d.seo.label} ideas`,
            description: d.seo.description,
            image: [shareImage(d.seo.slug), absolute(photoUrl(d.plan.heroPhoto))],
            author: { '@id': ORG['@id'] },
            publisher: { '@id': ORG['@id'] },
            datePublished: SITE.published,
            dateModified: today,
            mainEntityOfPage: absolute(path),
          },
        ],
      }),
      body: renderToString(<ThemePage d={{ ...d, related, crumbs }} />),
      lastmod: today,
    })
  })

  // Planning guide
  const crumbsGuide = [HOME_CRUMB, { name: 'How to plan a kids’ birthday party', path: GUIDE_PATH }]
  const AGES = [
    ['Toddlers (ages 1–2)', 1, 2],
    ['Preschoolers (ages 3–5)', 3, 5],
    ['Ages 6–8', 6, 8],
    ['Ages 9–12', 9, 12],
  ]
  const pool = all.flatMap((d) => d.plan.games.map((g) => ({ g, d, meta: d.catalog.activities.find((a) => a.id === g.id) })))
  const byAge = AGES.map(([label, lo, hi]) => {
    const fits = pool.filter(({ meta }) => meta?.ages && meta.ages.min <= hi && meta.ages.max >= lo)
    // One per theme, mixing calm and active, so the list isn't all crafts.
    const seen = new Set()
    const items = []
    for (const energy of ['Calm', 'Active', 'Calm', 'Active', 'Calm']) {
      const pick = fits.find(({ g, d }) => g.energy === energy && !seen.has(d.theme.id) && !items.some((x) => x.name === g.name))
      if (pick) {
        seen.add(pick.d.theme.id)
        items.push({ name: pick.g.name, theme: pick.d.theme.name, description: pick.g.description })
      }
    }
    return { label, items }
  })
  const costs = all.map((d) => d.cost).filter(Boolean)
  pages.push({
    head: head({
      path: GUIDE_PATH,
      title: 'How to Plan a Kids’ Birthday Party: Checklist & Budget',
      description:
        'A step-by-step guide to planning a kids’ birthday party at home: choosing a theme, a realistic budget, games by age, a party-day timeline and a planning checklist.',
      image: shareImage('guide'),
      imageAlt: 'Planning a child’s birthday party',
      type: 'article',
      ld: [
        ORG,
        breadcrumbLd(crumbsGuide),
        {
          '@type': 'Article',
          headline: 'How to plan a kids’ birthday party',
          description: 'A step-by-step guide to planning a kids’ birthday party at home, with a checklist and budget.',
          image: [shareImage('guide')],
          author: { '@id': ORG['@id'] },
          publisher: { '@id': ORG['@id'] },
          datePublished: SITE.published,
          dateModified: today,
          mainEntityOfPage: absolute(GUIDE_PATH),
        },
      ],
    }),
    body: renderToString(
      <GuidePage
        g={{
          crumbs: crumbsGuide,
          themes: all.map((d) => ({ theme: d.theme, seo: d.seo })),
          budget: defaultBudget,
          costSpan: costs.length ? [Math.min(...costs.map((c) => c[0])), Math.max(...costs.map((c) => c[1]))] : null,
          byAge,
          timeline: [
            { time: '0:00', title: 'Guests arrive', detail: 'a simple welcome activity — crowns, coloring or a dress-up basket — keeps early arrivals busy' },
            { time: '0:15', title: 'First activity', detail: 'something calm and hands-on while everyone settles in' },
            { time: '0:45', title: 'Active game', detail: 'a hunt or running game to burn off energy before food' },
            { time: '1:05', title: 'Food', detail: 'small, easy-to-hold food; drinks out from the start' },
            { time: '1:30', title: 'Cake & candles', detail: 'sing, cut, and let the birthday child hand out slices' },
            { time: '1:45', title: 'Quiet finish', detail: 'a story, a craft to take home, or open play' },
            { time: '2:00', title: 'Goodbyes', detail: 'favors by the door, so pickups are quick and happy' },
          ],
          checklist: buildChecklist(),
          saves: all.flatMap((d) => d.plan.substitutions || []).filter((s, i, a) => a.findIndex((x) => x.for === s.for) === i).slice(0, 8),
        }}
      />,
    ),
    lastmod: today,
  })

  // 404
  pages.push({
    head: head({ path: '/404.html', title: 'Page not found | Whimavera', description: 'This page could not be found.', image: shareImage('home'), noindex: true }),
    body: renderToString(<NotFoundPage />),
    file: '404.html',
    noSitemap: true,
  })

  return pages.map((p) => ({ ...p, file: p.file || `${p.head.path.replace(/^\//, '')}index.html` }))
}

/** Share-card sources: which photo each social image is cropped from. */
export function shareSources() {
  const out = { home: 'homeHero', themes: 'fairyTable', guide: 'teaGardenTable' }
  for (const t of themes) {
    const plan = buildPlan(liveEventType, { ...liveEventType.defaultAnswers, theme: t.id })
    out[seoFor(t, plan).slug] = plan.heroPhoto
  }
  return out
}
