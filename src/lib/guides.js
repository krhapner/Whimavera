// Activity guides: schema, validation and personalization.
//
// Guides are authored (or, later, AI-generated) as plain JSON matching
// `activityGuideSchema`. `normalizeGuide` is the single gatekeeper: it
// drops malformed fields and fills defaults so the UI never breaks on
// missing data. `personalizeGuide` adapts a normalized guide to the party
// (guest count, age, location, interests) once, when the plan is built.

/**
 * JSON Schema for one activity guide. Use as the structured-output schema
 * when generating guides with an AI model; validate before storing.
 */
export const activityGuideSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  title: 'ActivityGuide',
  type: 'object',
  required: ['id', 'summary', 'materials', 'prep', 'setup', 'run', 'cleanup'],
  properties: {
    id: { type: 'string', pattern: '^[a-z0-9-]+$' },
    imageUrl: { type: 'string' },
    imageAlt: { type: 'string' },
    ages: { type: 'object', properties: { min: { type: 'integer' }, max: { type: 'integer' } } },
    summary: { type: 'string' },
    materials: {
      type: 'array',
      items: {
        type: 'object',
        required: ['name', 'qty'],
        properties: {
          name: { type: 'string' },
          qty: {
            type: 'object',
            description: 'Exactly one of perChild, perGroup or fixed',
            properties: {
              perChild: { type: 'number' },
              spare: { type: 'number' },
              perGroup: { type: 'number', description: 'Children per item' },
              fixed: { type: 'number' },
            },
          },
          unit: { type: 'string', description: 'Singular unit, e.g. "stem"' },
          unitPlural: { type: 'string' },
          note: { type: 'string' },
          optional: { type: 'boolean' },
          reusable: { type: 'boolean' },
          substitute: { type: 'string' },
          // Future: verified affiliate products. Never invented.
          products: {
            type: 'array',
            items: {
              type: 'object',
              required: ['title', 'url', 'retailer', 'verified'],
              properties: {
                title: { type: 'string' },
                url: { type: 'string' },
                retailer: { type: 'string' },
                verified: { type: 'boolean' },
              },
            },
          },
        },
      },
    },
    prep: { type: 'array', items: { type: 'string' } },
    setup: {
      type: 'array',
      items: { type: 'object', required: ['label', 'text'], properties: { label: { type: 'string' }, text: { type: 'string' } } },
    },
    setupByLocation: {
      type: 'object',
      properties: { indoor: { type: 'string' }, outdoor: { type: 'string' } },
    },
    run: {
      type: 'array',
      items: { type: 'object', required: ['step'], properties: { step: { type: 'string' }, say: { type: 'string' } } },
    },
    tips: {
      type: 'object',
      properties: {
        younger: { type: 'array', items: { type: 'string' } },
        older: { type: 'array', items: { type: 'string' } },
        budget: { type: 'array', items: { type: 'string' } },
        sensory: { type: 'array', items: { type: 'string' } },
        troubleshooting: { type: 'array', items: { type: 'string' } },
      },
    },
    safety: { type: 'array', items: { type: 'string' } },
    cleanup: { type: 'array', items: { type: 'string' } },
  },
}

const str = (v) => (typeof v === 'string' && v.trim() ? v.trim() : null)
const strList = (v) => (Array.isArray(v) ? v.map(str).filter(Boolean) : [])
const num = (v) => (typeof v === 'number' && Number.isFinite(v) && v >= 0 ? v : null)

/** Validate and fill defaults. Returns null only if the guide is unusable. */
export function normalizeGuide(raw) {
  if (!raw || typeof raw !== 'object' || !str(raw.id)) return null
  const materials = (Array.isArray(raw.materials) ? raw.materials : [])
    .filter((m) => m && str(m.name))
    .map((m) => {
      const q = m.qty || {}
      const qty =
        num(q.perChild) != null
          ? { perChild: q.perChild, spare: num(q.spare) || 0 }
          : num(q.perGroup) != null && q.perGroup > 0
            ? { perGroup: q.perGroup }
            : { fixed: num(q.fixed) ?? 1 }
      return {
        name: str(m.name),
        qty,
        unit: str(m.unit) || '',
        unitPlural: str(m.unitPlural) || (str(m.unit) ? `${str(m.unit)}s` : ''),
        note: str(m.note),
        optional: !!m.optional,
        reusable: !!m.reusable,
        substitute: str(m.substitute),
        products: (Array.isArray(m.products) ? m.products : []).filter((p) => p && p.verified && str(p.url) && str(p.title)),
      }
    })
  const tips = raw.tips || {}
  return {
    id: str(raw.id),
    imageUrl: str(raw.imageUrl),
    imageAlt: str(raw.imageAlt),
    ages: raw.ages && num(raw.ages.min) != null ? { min: raw.ages.min, max: num(raw.ages.max) ?? 12 } : null,
    summary: str(raw.summary) || '',
    materials,
    prep: strList(raw.prep),
    setup: (Array.isArray(raw.setup) ? raw.setup : []).filter((s) => s && str(s.label) && str(s.text)),
    setupByLocation: raw.setupByLocation || {},
    run: (Array.isArray(raw.run) ? raw.run : [])
      .filter((r) => r && str(r.step))
      .map((r) => ({ step: str(r.step), say: str(r.say) })),
    tips: {
      younger: strList(tips.younger),
      older: strList(tips.older),
      budget: strList(tips.budget),
      sensory: strList(tips.sensory),
      troubleshooting: strList(tips.troubleshooting),
    },
    safety: strList(raw.safety),
    cleanup: strList(raw.cleanup),
  }
}

const AGE_RANGES = { '1-2': [1, 2], '3-5': [3, 5], '6-8': [6, 8], '9-12': [9, 12] }
const INDOOR = new Set(['home', 'venue'])

const FRACTIONS = { 0.25: '¼', 0.5: '½', 0.75: '¾' }
const fmt = (n) => FRACTIONS[n] || String(n)

function quantityText(m, guests) {
  const unit = (n) => (n <= 1 ? m.unit : m.unitPlural)
  const q = m.qty
  if (q.perChild != null) {
    const per = `${fmt(q.perChild)} ${unit(q.perChild)} per child`.trim()
    if (!guests) return { total: null, label: per }
    const total = Math.ceil(q.perChild * guests + (q.spare || 0))
    return { total, label: `${total} ${unit(total)}`.trim(), detail: q.spare ? `${per}, plus ${q.spare} spare` : per }
  }
  if (q.perGroup != null) {
    const per = `1 ${m.unit} per ${q.perGroup} children`.trim()
    if (!guests) return { total: null, label: per }
    const total = Math.max(1, Math.ceil(guests / q.perGroup))
    return { total, label: `${total} ${unit(total)}`.trim(), detail: per }
  }
  return { total: q.fixed, label: `${q.fixed} ${unit(q.fixed)}`.trim() }
}

/**
 * Adapt a normalized guide to a party. Pure; called once per plan build.
 * ctx: { guests, ageRange, location, interests, theme, budget, activity }
 */
export function personalizeGuide(guide, ctx = {}) {
  if (!guide) return null
  const guests = ctx.guests > 0 ? ctx.guests : null
  const [ageLo, ageHi] = AGE_RANGES[ctx.ageRange] || []
  const indoor = INDOOR.has(ctx.location)

  let ageNote = null
  if (guide.ages && ageLo != null) {
    if (ageHi < guide.ages.min) ageNote = { tone: 'younger', belowRange: true, tips: guide.tips.younger }
    else if (ageLo <= 4 && guide.tips.younger.length) ageNote = { tone: 'younger', tips: guide.tips.younger.slice(0, 2) }
    else if (ageLo >= 8 && guide.tips.older.length) ageNote = { tone: 'older', tips: guide.tips.older.slice(0, 2) }
  }

  const locationNote = indoor ? guide.setupByLocation.indoor : guide.setupByLocation.outdoor

  return {
    ...guide,
    guests,
    materials: guide.materials.map((m) => ({ ...m, quantity: quantityText(m, guests) })),
    setup: locationNote ? [...guide.setup, { label: indoor ? 'Indoors' : 'Outdoors', text: locationNote }] : guide.setup,
    ageNote,
    underThree: ageLo != null && ageLo < 3,
    hasProducts: guide.materials.some((m) => m.products.length),
  }
}

/** Fallback guide for activities without a written guide yet. */
export function minimalGuide(activity) {
  return normalizeGuide({ id: activity.id, summary: activity.description, materials: [], prep: [], setup: [], run: [], cleanup: [] })
}
