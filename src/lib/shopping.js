/**
 * Shopping engine — turns party items into supply lines, resolves each to a
 * reusable supply, and consolidates a shopping list for the selected plan.
 *
 * Pure functions; no network calls. Amazon links are built from the central
 * affiliate config, using a verified product (asin/url) when a supply has
 * one and an Amazon search link otherwise. Nothing is ever added to an
 * Amazon cart — every visit starts with the parent clicking a link.
 */
import { amazonLinkFor } from './amazon.js'
import { SUPPLIES, KITS, KITS_FOR, THEME_SUPPLIES } from '../data/supplies/catalog.js'
import { scaleRecipe, buildShoppingList } from './recipes.js'
import { slugify } from '../data/activityImages.js'

export const CATEGORIES = [
  { id: 'paper', title: 'Invitations' },
  { id: 'decor', title: 'Decorations' },
  { id: 'activities', title: 'Activities & crafts' },
  { id: 'food', title: 'Food & groceries' },
  { id: 'tableware', title: 'Tableware' },
  { id: 'favors', title: 'Party favors' },
]
export const CATEGORY_LABEL = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.title]))

import { GROCERY_PRICES } from '../data/supplies/groceryPrices.js'
import { toBase } from './units.js'

// ---------- Supply resolution ----------

const norm = (s) =>
  String(s || '')
    .toLowerCase()
    .replace(/[“”"]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\s+/g, ' ')
    .trim()

/** "pouch" → "pouches", "stem" → "stems". */
export const plural = (u) => (!u ? '' : /(s|x|z|ch|sh)$/.test(u) ? `${u}es` : /[^aeiou]y$/.test(u) ? `${u.slice(0, -1)}ies` : `${u}s`)

const ALIASES = new Map()
for (const [id, s] of Object.entries(SUPPLIES)) {
  for (const a of [s.name, ...(s.aliases || [])]) if (a) ALIASES.set(norm(a), id)
}

/** A readable search phrase from a material name ("Hand mirror (adult use)" → "Hand mirror"). */
export function searchPhrase(name) {
  return String(name || '')
    .replace(/\([^)]*\)/g, ' ')
    .split(',')[0]
    .replace(/[“”"]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Resolve a material to a supply. Curated supplies come from the catalog;
 * anything else gets a fallback supply with an Amazon search for its name,
 * so a missing mapping never breaks shopping.
 */
export function resolveSupply(name, { id, category = 'activities' } = {}) {
  const sid = (id && SUPPLIES[id] && id) || ALIASES.get(norm(name))
  if (sid) {
    const s = SUPPLIES[sid]
    return { id: sid, curated: true, category, ...s, shop: s.shop !== false }
  }
  const phrase = searchPhrase(name)
  return { id: `x-${slugify(phrase)}`, curated: false, name: phrase || name, category, search: phrase, shop: !!phrase }
}

// ---------- Links ----------

/** Amazon link for a supply-like object (see lib/amazon.js), or null. */
export const amazonLink = (s) => amazonLinkFor(s)

export const kitsFor = (ids) => {
  const seen = new Set()
  return ids
    .flatMap((id) => KITS_FOR[id] || [])
    .filter((k) => KITS[k] && !seen.has(k) && seen.add(k))
    .map((k) => ({ id: k, ...KITS[k] }))
}

// ---------- Buy lists ----------

/**
 * Quantity rule → number to buy for `people`.
 *   { fixed: n }              n, whatever the party size
 *   { perChild: n, spare }    n per child, plus spares
 *   { per: n }                one per n children (packs, boxes, bags)
 */
export function buyQty(rule = { fixed: 1 }, people = 0) {
  if (typeof rule === 'number') return rule
  if (rule.fixed != null) return rule.fixed
  if (rule.per) return Math.max(1, Math.ceil(people / rule.per))
  if (rule.perChild != null) return Math.max(1, Math.ceil(rule.perChild * people + (rule.spare || 0)))
  return 1
}

/**
 * Lines from a buy list (see src/data/birthday/buy/). Each entry has its own
 * Amazon search phrase and a typical cost per unit; `home: true` marks things
 * most families already own — listed and linked, but left out of totals.
 */
export function buyLines(list, { people, source, category = 'activities' }) {
  return (list || []).map((b) => {
    const qty = buyQty(b.qty, people)
    const unit = b.unit || ''
    const supply = {
      id: `b-${slugify(b.search || b.name)}`,
      curated: true,
      name: b.name,
      category: b.cat || category,
      search: b.search || searchPhrase(b.name),
      shop: true,
      household: !!b.home,
    }
    return line(supply, {
      qty,
      unit,
      unitPlural: b.units,
      label: `${qty}${unit ? ` ${qty === 1 ? unit : b.units || plural(unit)}` : ''}`,
      optional: !!b.opt,
      reusable: !!b.keep,
      est: b.est ? [b.est[0] * qty, b.est[1] * qty] : null,
      note: b.note,
      substitute: b.save,
      source,
    })
  })
}

/** Typical cost of the lines a party must buy: required, not already-at-home. */
export function linesCost(lines) {
  const priced = lines.filter((l) => l.est && !l.optional && !l.supply.household)
  if (!priced.length) return null
  return priced.reduce((r, l) => [r[0] + l.est[0], r[1] + l.est[1]], [0, 0]).map(Math.round)
}

// ---------- Lines from party items ----------

function line(supply, { qty = null, unit = '', unitPlural = '', label, optional = false, reusable, est = null, note, substitute, source }) {
  return {
    key: `${source.kind}:${source.id}:${supply.id}`,
    supply,
    qty: typeof qty === 'number' && isFinite(qty) ? qty : null,
    unit: unit || supply.unit || '',
    unitPlural: unitPlural && unitPlural !== `${unit}s` ? unitPlural : plural(unit || supply.unit),
    label: label || (qty != null ? `${qty}` : 'As needed'),
    optional,
    reusable: reusable ?? !!supply.reusable,
    est,
    note,
    substitute,
    source,
  }
}

/** Typical cost for `qty` of a supply in the unit a guide counts it in. */
function priceFor(supply, unit, qty) {
  if (typeof qty !== 'number' || !isFinite(qty)) return null
  const e = supply.estBy?.[unit] || (supply.est && (!unit || unit === supply.unit) ? supply.est : null)
  return e ? [e[0] * qty, e[1] * qty] : null
}

/** Materials for one activity, quantities already scaled to the guest count. */
export function linesForActivity(game) {
  const source = { kind: 'activity', id: game.id, name: game.name }
  if (game.buy) return buyLines(game.buy, { people: game.buyFor || 0, source })
  return (game.guide?.materials || [])
    .map((m) => {
      const supply = resolveSupply(m.name, { id: m.supply })
      return line(supply, {
        qty: m.quantity?.total,
        unit: m.unit,
        unitPlural: m.unitPlural,
        label: m.quantity?.label,
        optional: m.optional,
        reusable: m.reusable || undefined,
        est: priceFor(supply, m.unit, m.quantity?.total),
        note: [m.quantity?.detail, m.note].filter(Boolean).join(' · ') || undefined,
        substitute: m.substitute,
        source,
      })
    })
    .filter((l) => l.supply.shop)
}

/** Supplies for one decor zone in the version the parent chose. */
export function linesForZone(slot, variant) {
  if (!slot || !variant) return []
  const source = { kind: 'decor', id: slot.id, name: slot.zone }
  return (variant.supplies || [])
    .map((s) => {
      const supply = resolveSupply(s.name, { id: s.supply, category: 'decor' })
      const unit = s.unit || supply.unit || ''
      return line(supply, {
        qty: s.qty,
        unit,
        label: `${s.qty}${unit ? ` ${s.qty > 1 ? plural(unit) : unit}` : ''}`,
        est: s.est ? [s.est[0] * s.qty, s.est[1] * s.qty] : null,
        source,
      })
    })
    .filter((l) => l.supply.shop)
}

/** DIY materials are free text; resolve each so curated ones link precisely. */
export function linesForDiy(d) {
  const source = { kind: 'diy', id: d.id || slugify(d.name), name: d.name }
  if (d.buy) return buyLines(d.buy, { people: d.buyFor || 0, source })
  return (d.materials || [])
    .map((m) => line(resolveSupply(m, { category: 'activities' }), { label: 'As needed', source }))
    .filter((l) => l.supply.shop)
}

/** Tableware or favors from the theme's shop list (quantities per guest). */
export function linesForShopCategory(plan, category, catId) {
  const c = plan.shop.find((x) => x.category === category)
  if (!c) return []
  const source = { kind: 'shop', id: catId, name: category }
  return c.items
    .map((i) => {
      const supply = resolveSupply(i.name, { id: i.supply, category: catId })
      return line(supply, {
        qty: i.quantity,
        unit: i.unit,
        label: `${i.quantity} ${i.quantity > 1 ? plural(i.unit) : i.unit}`,
        est: i.estHigh != null ? [i.estLow, i.estHigh] : null,
        substitute: i.diyAlt,
        source,
      })
    })
    .filter((l) => l.supply.shop)
}

/** Theme-wide supplies such as invitations. */
export function linesForTheme(plan) {
  const source = { kind: 'theme', id: plan.theme.id, name: `${plan.theme.name} party` }
  return (THEME_SUPPLIES[plan.theme.id] || [])
    .map((t) => {
      const supply = resolveSupply('', { id: t.supply })
      const qty = t.qty.fixed ?? Math.ceil(plan.guests * (t.qty.perGuest || 1) + (t.qty.extra || 0))
      const unit = supply.unit || ''
      return line(supply, { qty, unit, label: `${qty}${unit ? ` ${qty > 1 ? plural(unit) : unit}` : ''}`, note: t.qty.extra ? `1 per guest plus ${t.qty.extra} spare` : undefined, source })
    })
    .filter((l) => l.supply.shop)
}

/** Packs to buy for a recipe ingredient, priced from GROCERY_PRICES. */
function groceryPack(i) {
  const p = GROCERY_PRICES[i.key]
  if (!p) return null
  const per = toBase(p.pack[0], p.pack[1])
  if (!per || !i.base) return null
  const packs = Math.max(1, Math.ceil(i.base / per - 1e-9))
  return { packs, label: p.label, est: [p.est[0] * packs, p.est[1] * packs], home: !!p.home }
}

/**
 * Every ingredient to buy for the dishes given, scaled to children + adults.
 * Dishes with a buy list use it; dishes with a recipe use its ingredients,
 * priced by the pack. Fresh food is included — Amazon search covers grocery.
 */
export function groceryLines(foods, { guests, adults = 0 }) {
  const people = guests + adults
  const lines = foods
    .filter((f) => f.buy)
    .flatMap((f) => buyLines(f.buy, { people, source: { kind: 'recipe', id: f.id, name: f.recipe?.title || f.name }, category: 'food' }))
  const withRecipes = foods.filter((f) => f.recipe && !f.buy)
  if (!withRecipes.length) return lines
  const names = Object.fromEntries(withRecipes.map((f) => [f.id, f.recipe.title || f.name]))
  const groups = buildShoppingList(
    withRecipes.map((f) => scaleRecipe(f.recipe, { children: guests, adults })),
    names,
  )
  return lines.concat(
    groups.flatMap((g) =>
      g.items.map((i) => {
        const pack = groceryPack(i)
        return {
          key: `grocery:${i.id}`,
          supply: { id: `g-${i.key}`, curated: false, name: i.name, category: 'food', search: GROCERY_PRICES[i.key]?.search || searchPhrase(i.name), shop: true, household: !!pack?.home },
          qty: null,
          unit: '',
          unitPlural: '',
          label: pack?.label ? `${i.display} · buy ${pack.packs} × ${pack.label}` : i.display,
          optional: i.optional,
          reusable: false,
          est: pack?.est || null,
          sources: i.sources,
          source: { kind: 'recipe', id: 'menu', name: i.sources.join(', ') },
        }
      }),
    ),
  )
}

/** Serveware from recipes in the plan (cups, liners, stands) — optional extras. */
export function servewareLines(foods) {
  return foods
    .filter((f) => f.recipe && !f.buy)
    .flatMap((f) =>
      f.recipe.equipment
        .filter((e) => e.serve && e.search)
        .map((e) => ({
          key: `serve:${f.id}:${e.search}`,
          supply: { id: `s-${slugify(e.search)}`, curated: false, name: e.name, category: 'tableware', search: e.search, shop: true },
          qty: null,
          unit: '',
          unitPlural: '',
          label: 'As needed',
          optional: true,
          reusable: true,
          est: null,
          source: { kind: 'recipe', id: f.id, name: f.recipe.title || f.name },
        })),
    )
}

// ---------- Consolidation ----------

/**
 * Merge lines that use the same supply. Reusable supplies need only the
 * largest single quantity; others are summed when units agree, and listed
 * side by side when they don't.
 */
export function consolidate(lines) {
  const map = new Map()
  for (const l of lines) {
    const id = l.supply.id
    const cur = map.get(id)
    const sources = l.sources || [l.source.name]
    if (!cur) {
      map.set(id, {
        id,
        supply: l.supply,
        name: l.supply.name,
        category: l.supply.category || 'activities',
        qty: l.qty,
        unit: l.unit,
        unitPlural: l.unitPlural,
        labels: [l.label],
        mixed: false,
        optional: l.optional,
        reusable: l.reusable,
        est: l.est,
        sources: [...sources],
        notes: l.note ? [l.note] : [],
        substitutes: l.substitute ? [l.substitute] : [],
      })
      continue
    }
    for (const s of sources) if (!cur.sources.includes(s)) cur.sources.push(s)
    cur.optional = cur.optional && l.optional
    cur.reusable = cur.reusable && l.reusable
    if (l.substitute && !cur.substitutes.includes(l.substitute)) cur.substitutes.push(l.substitute)
    if (l.est) cur.est = cur.est ? [cur.est[0] + l.est[0], cur.est[1] + l.est[1]] : l.est
    // A DIY "as needed" line adds no amount of its own.
    if (l.qty == null && l.label === 'As needed') continue
    if (cur.qty == null && cur.labels.length === 1 && cur.labels[0] === 'As needed') {
      Object.assign(cur, { qty: l.qty, unit: l.unit, unitPlural: l.unitPlural, labels: [l.label] })
      continue
    }
    const sameUnit = cur.qty != null && l.qty != null && norm(cur.unit) === norm(l.unit)
    if (sameUnit) cur.qty = cur.reusable ? Math.max(cur.qty, l.qty) : cur.qty + l.qty
    else {
      cur.mixed = true
      if (!cur.labels.includes(l.label)) cur.labels.push(l.label)
    }
  }
  return [...map.values()].map((x) => ({
    ...x,
    label:
      !x.mixed && x.qty != null
        ? `${x.qty}${x.unit ? ` ${x.qty === 1 ? x.unit : x.unitPlural || plural(x.unit)}` : ''}`
        : x.labels.join(' + '),
    link: amazonLink(x.supply),
    alternatives: (x.supply.alternatives || []).map((a) => ({ ...a, link: amazonLink(a) })),
    kit: x.supply.kit && KITS[x.supply.kit] ? { id: x.supply.kit, ...KITS[x.supply.kit], link: amazonLink(KITS[x.supply.kit]) } : null,
  }))
}

// ---------- Item-level and party-level lists ----------

/** Shopping lines for one item — used by "Shop supplies" on any card. */
export function shoppingForItem(plan, catalog, kind, id, { variantId, adults = 0 } = {}) {
  let lines = []
  let kitIds = [id]
  if (kind === 'activity') {
    const g = plan.games.find((x) => x.id === id)
    if (g) lines = linesForActivity(g)
  } else if (kind === 'decor') {
    const slot = catalog.decor.find((x) => x.id === id)
    const v = slot && (slot.variants.find((x) => x.id === variantId) || slot.variants[0])
    lines = linesForZone(slot, v)
  } else if (kind === 'diy') {
    const d = plan.diy.find((x) => slugify(x.name) === id)
    if (d) lines = linesForDiy(d)
  } else if (kind === 'food') {
    const f = plan.food.find((x) => x.id === id)
    if (f) lines = [...groceryLines([f], { guests: plan.guests, adults }), ...servewareLines([f])]
  } else if (kind === 'theme') {
    lines = linesForTheme(plan)
  } else if (kind === 'favors') {
    lines = linesForShopCategory(plan, 'Favors', 'favors')
  }
  const items = consolidate(lines)
  return {
    required: items.filter((i) => !i.optional),
    optional: items.filter((i) => i.optional),
    kits: kitsFor(kitIds).map((k) => ({ ...k, link: amazonLink(k) })),
  }
}

/**
 * The consolidated list for everything selected in the plan. Optional
 * materials are kept separate from what the plan requires.
 */
export function buildPartyShopping(plan, catalog, sel, { adults = 0 } = {}) {
  const lines = [...linesForTheme(plan)]
  // Decorations: chosen version of each zone, or the theme list without metadata.
  if (catalog.hasMeta) {
    for (const [slotId, vid] of Object.entries(sel.slots)) {
      const slot = catalog.decor.find((x) => x.id === slotId)
      lines.push(...linesForZone(slot, slot?.variants.find((v) => v.id === vid)))
    }
  } else {
    lines.push(...linesForShopCategory(plan, 'Decor', 'decor'))
  }
  // Activities: materials from each selected activity's guide.
  const games = sel.activities.map((id) => plan.games.find((g) => g.id === id)).filter(Boolean)
  const actLines = games.flatMap(linesForActivity)
  lines.push(...(actLines.length ? actLines : linesForShopCategory(plan, 'Games & crafts', 'activities')))
  // DIY projects in the plan.
  const diys = sel.diy.map((id) => plan.diy.find((d) => slugify(d.name) === id)).filter(Boolean)
  lines.push(...diys.flatMap(linesForDiy))
  // Tableware and favors are part of every party.
  lines.push(...linesForShopCategory(plan, 'Tableware', 'tableware'))
  lines.push(...linesForShopCategory(plan, 'Favors', 'favors'))
  // Shelf-stable groceries for dishes in the plan.
  const foods = sel.food.map((id) => plan.food.find((f) => f.id === id)).filter(Boolean)
  lines.push(...groceryLines(foods, { guests: plan.guests, adults }))
  lines.push(...servewareLines(foods))

  const items = consolidate(lines)
  const groups = CATEGORIES.map((c) => ({
    ...c,
    required: items.filter((i) => i.category === c.id && !i.optional),
    optional: items.filter((i) => i.category === c.id && i.optional),
  })).filter((g) => g.required.length || g.optional.length)

  const kitIds = [...sel.activities, ...Object.keys(sel.slots), ...sel.food, ...sel.diy]
  return {
    groups,
    items,
    kits: kitsFor(kitIds).map((k) => ({ ...k, link: amazonLink(k) })),
    freshCount: foods.filter((f) => f.recipe).length,
  }
}

/** Sum of typical cost ranges for items still to buy (owned/skipped excluded). */
export function typicalTotal(items) {
  const priced = items.filter((i) => i.est && !i.supply?.household)
  if (!priced.length) return null
  return {
    range: priced.reduce((r, i) => [r[0] + i.est[0], r[1] + i.est[1]], [0, 0]).map(Math.round),
    covered: priced.length,
    of: items.length,
  }
}
