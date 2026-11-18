import { fallbackPlanId } from '../data/birthday/plans/index.js'
import { defaultBudget, buildChecklist } from '../data/birthday/plans/shared.js'

const roundTo = (n, step = 5) => Math.round(n / step) * step

function qtyFor(rule, guests) {
  if (rule.fixed != null) return rule.fixed
  return Math.ceil(rule.perGuest * guests + (rule.extra || 0))
}

const clock = (mins) => {
  const h = Math.floor(mins / 60)
  const m = mins % 60
  const h12 = ((h + 11) % 12) + 1
  return `${h12}:${String(m).padStart(2, '0')}`
}

/** Party-day timeline built around the child's top-ranked activities. */
function buildTimeline(template, games) {
  const start = (template.startHour ?? 14) * 60
  const m = template.moments
  const calm = games.find((g) => g.energy === 'Calm')
  const active = games.find((g) => g.energy === 'Active')
  const third = games.find((g) => g !== calm && g !== active && parseInt(g.time, 10) <= 15) || games.find((g) => g !== calm && g !== active)
  const slot = (g) => [g.name, g.description.split(/(?<=[.!?])\s/)[0]]
  const rows = [
    [start - (start < 12 * 60 ? 120 : 240), 'Set the scene', m.setup, true],
    [start - 90, 'Food prep', m.prep, true],
    [start - 15, 'Final touches', m.final, true],
    [start, ...m.arrive],
    [start + 15, ...slot(calm)],
    [start + 45, ...slot(active)],
    [start + 65, ...m.feast],
    [start + 90, ...m.cake],
    [start + 105, ...slot(third)],
    [start + 120, ...m.goodbye],
  ]
  return rows.map(([t, title, detail, prep]) => ({ time: clock(t), title, detail, prep: !!prep }))
}

/**
 * Personalize a plan template from questionnaire answers.
 * Pure function — easy to replace later with a server / AI-backed builder.
 */
export function buildPlan(eventType, answers) {
  const theme = eventType.themes.find((t) => t.id === answers.theme) || eventType.themes[0]
  const template = eventType.plans[theme.id] || eventType.plans[fallbackPlanId]
  const isPreview = !eventType.plans[theme.id]
  const guests = answers.guestCount
  const total = answers.budget

  // Rank activities by how many of the child's play styles they match.
  const loves = answers.interests || []
  const games = template.games
    .map((g, i) => ({ ...g, matches: (g.kinds || []).filter((k) => loves.includes(k)), order: i }))
    .sort((a, b) => b.matches.length - a.matches.length || a.order - b.order)

  const budget = (template.budget || defaultBudget).map((b) => ({ ...b, amount: roundTo(total * b.share) }))

  const shop = template.shop.map((cat) => ({
    ...cat,
    items: cat.items.map((item) => {
      const qty = qtyFor(item.qty, guests)
      return {
        ...item,
        quantity: qty,
        estLow: +(qty * item.est[0]).toFixed(0),
        estHigh: +(qty * item.est[1]).toFixed(0),
        link: '#', // placeholder — no retailer integration yet
      }
    }),
  }))

  const shopTotal = shop.reduce(
    (acc, c) => {
      c.items.forEach((i) => {
        acc.low += i.estLow
        acc.high += i.estHigh
      })
      return acc
    },
    { low: 0, high: 0 },
  )

  return {
    ...template,
    theme,
    isPreview,
    answers,
    guests,
    total,
    budget,
    games,
    timeline: buildTimeline(template, games),
    checklist: buildChecklist(template.checklistExtras),
    shop,
    shopTotal,
    title: isPreview ? `A ${theme.name} Birthday` : template.title,
  }
}

export const ageLabel = (range) =>
  ({ '1-2': 'ages 1–2', '3-5': 'ages 3–5', '6-8': 'ages 6–8', '9-12': 'ages 9–12' })[range] || range
