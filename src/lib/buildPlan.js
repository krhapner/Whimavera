import { fallbackPlanId } from '../data/birthday/plans.js'

const roundTo = (n, step = 5) => Math.round(n / step) * step

function qtyFor(rule, guests) {
  if (rule.fixed != null) return rule.fixed
  return Math.ceil(rule.perGuest * guests + (rule.extra || 0))
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

  const budget = template.budget.map((b) => ({ ...b, amount: roundTo(total * b.share) }))

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
    shop,
    shopTotal,
    title: isPreview ? `A ${theme.name} Birthday` : template.title,
  }
}

export const ageLabel = (range) =>
  ({ '1-2': 'ages 1–2', '3-5': 'ages 3–5', '6-8': 'ages 6–8', '9-12': 'ages 9–12' })[range] || range
