// Whimavera's single recommendation system.
//
//   catalog      — every idea for the theme, with metadata  (buildCatalog)
//   recommended  — what the quiz answers suggest, with reasons (recommend)
//   selected     — what the parent actually chose: recommendations plus their
//                  own additions, removals and swaps         (applySelections)
//
// Budget totals, the timeline, the checklist and the supplies list are all
// derived from *selected* items (derivePlan). Everything is pure and runs on
// render — no network or AI calls when filters change.

import { slugify } from '../data/activityImages.js'
import { scaleRecipe } from './recipes.js'
import { linesForActivity, groceryLines, linesCost } from './shopping.js'
import { buildChecklist } from '../data/birthday/plans/shared.js'

// ---------------------------------------------------------------- helpers

export const PLAY_KINDS = ['crafts', 'cooking', 'active', 'music', 'pretend', 'hunts', 'science', 'outdoors', 'quiet']
const AGE = { '1-2': [1, 2], '3-5': [3, 5], '6-8': [6, 8], '9-12': [9, 12] }
const SPACE_RANK = { small: 1, medium: 2, large: 3 }
const SPACE_OF_LOCATION = { home: 'small', venue: 'medium', backyard: 'large', park: 'large' }
const SPACE_LABEL = { medium: 'a large room or patio', large: 'a yard or park' }
const FIXED_BLOCKS = 65 // arrival 15 + feast 25 + cake 15 + goodbye 10 (minutes)

export const isUnlimited = (answers) => answers.budgetMode === 'all'
export const lovesOf = (answers) => {
  const i = answers.interests || []
  return i.includes('everything') ? PLAY_KINDS : i
}
const dietsOf = (answers) => (answers.diet || []).filter((d) => d !== 'none')

const add = (a, b) => (a && b ? [a[0] + b[0], a[1] + b[1]] : null)
const pluralUnit = (u) => (/(s|x|z|ch|sh)$/.test(u) ? `${u}es` : /[^aeiou]y$/.test(u) ? `${u.slice(0, -1)}ies` : `${u}s`)
const mid = (r) => (r ? (r[0] + r[1]) / 2 : 0)

/** Cost range for a cost spec, or null if there's no estimate. */
export function costRange(cost, { guests = 0, batches = 1 } = {}) {
  if (!cost) return null
  let r = [0, 0]
  if (cost.fixed) r = add(r, cost.fixed)
  if (cost.perChild) r = add(r, [cost.perChild[0] * guests, cost.perChild[1] * guests])
  if (cost.perBatch) r = add(r, [cost.perBatch[0] * batches, cost.perBatch[1] * batches])
  return [Math.round(r[0]), Math.round(r[1])]
}

// ---------------------------------------------------------------- catalog

/** Merge plan content with theme metadata into one catalog with stable ids. */
export function buildCatalog(plan, meta) {
  const m = meta || {}
  const activities = plan.games.map((g) => {
    const a = m.activities?.[g.id] || {}
    return {
      id: g.id,
      name: g.name,
      energy: g.energy,
      kinds: g.kinds || [],
      minutes: parseInt(g.time, 10) || null,
      ages: g.guide?.ages || a.ages || null,
      space: a.space || null,
      // A priced buy list sets the cost, so the card and its list agree.
      cost: (() => {
        const c = linesCost(linesForActivity(g))
        return c ? { fixed: c } : a.cost || null
      })(),
      costNote: a.costNote || null,
      requires: a.requires || null,
      prep: a.prep || null,
      order: g.order ?? 0,
    }
  })

  const decor = m.decor
    ? m.decor.map((slot) => ({
        ...slot,
        info: plan.setup.find((z) => z.zone === slot.zone) || null,
      }))
    : plan.setup.map((z) => ({
        id: slugify(z.zone),
        zone: z.zone,
        essential: false,
        info: z,
        variants: [{ id: slugify(z.zone), tier: 'classic', name: z.zone, description: z.description, cost: null, supplies: null }],
      }))

  const food = plan.food.map((f) => ({ id: f.id, name: f.recipe?.title || f.name, tag: f.tag, recipe: f.recipe, buy: f.buy || null, src: f, meta: m.food?.[f.id] || null }))

  const diy = plan.diy.map((d) => {
    const id = slugify(d.name)
    return { id, name: d.name, difficulty: d.difficulty, time: d.time, materials: d.materials, meta: m.diy?.[id] || null }
  })

  return { themeId: plan.theme.id, hasMeta: !!meta, activities, decor, food, diy, meta: m }
}

const foodCost = (f, ctx) => {
  // A priced ingredient list sets the cost (scaled to children + adults).
  if (f.src && (f.buy || f.recipe)) {
    const c = linesCost(groceryLines([f.src], { guests: ctx.guests || 0, adults: ctx.adults || 0 }))
    if (c) return c
  }
  if (!f.meta?.cost) return null
  const batches = f.recipe ? scaleRecipe(f.recipe, { children: ctx.guests, adults: ctx.adults }).factor : 1
  return costRange(f.meta.cost, { guests: ctx.guests, batches })
}
const variantCost = (v, ctx) => costRange(v.cost, ctx)

/** Tableware & favors: always needed, scaled to guests (from plan.shop). */
export function essentialsRange(plan, meta) {
  const cats = meta?.essentialsFromShop || []
  const items = plan.shop.filter((c) => cats.includes(c.category)).flatMap((c) => c.items)
  if (!items.length) return null
  return items.reduce((r, i) => [r[0] + i.estLow, r[1] + i.estHigh], [0, 0])
}

// ---------------------------------------------------------------- recommend

/**
 * Recommend a curated plan from quiz answers. Returns ids plus a reason for
 * every pick, and notes for items that were considered but not recommended.
 */
export function recommend(plan, catalog, answers, { adults = 0 } = {}) {
  const guests = answers.guestCount || 0
  const ctx = { guests, adults }
  const budget = isUnlimited(answers) ? null : answers.budget
  const loves = lovesOf(answers)
  const diets = dietsOf(answers)
  const [ageLo, ageHi] = AGE[answers.ageRange] || [0, 99]
  const space = SPACE_OF_LOCATION[answers.location] || 'large'
  const duration = Number(answers.duration) || 120
  const reasons = {}
  const why = (id, r) => (reasons[id] ||= []).push(r)
  const notes = {}
  const note = (id, r) => (notes[id] ||= []).push(r)
  // Why an item doesn't suit this party (age, space, diet) — shown, never hidden.
  const unsuited = {}
  const unsuit = (id, r) => {
    unsuited[id] ||= r
  }

  // ---- Activities: suitability, interest score, time budget, balance
  const scored = catalog.activities.map((a) => {
    const ageOk = !a.ages || (ageHi >= a.ages.min && ageLo <= a.ages.max)
    const spaceOk = !a.space || SPACE_RANK[a.space] <= SPACE_RANK[space]
    const matches = a.kinds.filter((k) => loves.includes(k))
    if (!ageOk) unsuit(a.id, `Best for ages ${a.ages.min}–${a.ages.max}`)
    if (!spaceOk) unsuit(a.id, `Needs ${SPACE_LABEL[a.space]}`)
    return { a, ageOk, spaceOk, matches, cost: costRange(a.cost, ctx) }
  })
  const suitable = scored
    .filter((s) => s.ageOk && s.spaceOk)
    .sort((x, y) => y.matches.length - x.matches.length || x.a.order - y.a.order)

  let minutesLeft = Math.max(20, duration - FIXED_BLOCKS)
  const fits = (s) => (s.a.minutes || 15) + 5 <= minutesLeft
  const picks = []
  const take = (s, reason) => {
    picks.push(s)
    minutesLeft -= (s.a.minutes || 15) + 5
    why(s.a.id, reason)
  }
  // Round-robin across the child's interests so several loves are represented.
  const order = loves.length ? loves : []
  let progress = true
  while (progress) {
    progress = false
    for (const k of order) {
      const open = suitable.filter((x) => !picks.includes(x) && x.matches.includes(k) && fits(x))
      const s = open.find((x) => x.a.kinds[0] === k) || open[0]
      if (s) {
        take(s, `For their love of ${KIND_LABEL[k]}`)
        progress = true
      }
    }
  }
  // If interests didn't fill the time, add the best remaining fits.
  for (const s of suitable) {
    if (picks.length >= 2) break
    if (!picks.includes(s) && fits(s)) take(s, 'A crowd-pleaser for this age')
  }
  // Balance calm and active unless the parent asked for only one kind.
  const wantsOnlyCalm = loves.length && loves.every((k) => ['quiet', 'crafts', 'science', 'cooking'].includes(k))
  const wantsOnlyActive = loves.length && loves.every((k) => ['active', 'music', 'outdoors', 'hunts'].includes(k))
  for (const energy of ['Calm', 'Active']) {
    if (picks.length < 2 || picks.some((p) => p.a.energy === energy)) continue
    if ((energy === 'Active' && wantsOnlyCalm) || (energy === 'Calm' && wantsOnlyActive)) continue
    const alt = suitable.find((x) => !picks.includes(x) && x.a.energy === energy)
    if (!alt) continue
    if (fits(alt)) take(alt, energy === 'Calm' ? 'A calm moment to balance the energy' : 'A burst of movement to balance the energy')
    else {
      const drop = picks[picks.length - 1]
      picks.pop()
      minutesLeft += (drop.a.minutes || 15) + 5
      delete reasons[drop.a.id]
      if (fits(alt)) take(alt, energy === 'Calm' ? 'A calm moment to balance the energy' : 'A burst of movement to balance the energy')
    }
  }

  // ---- Food: diet suitability; core dishes make a complete menu
  const foodOk = {}
  for (const f of catalog.food) {
    const d = f.meta?.diet
    const bad = diets.filter((x) => d && d[x] === 'no')
    const swaps = diets.filter((x) => d && d[x] === 'swap')
    const unknown = diets.length && !d
    foodOk[f.id] = !bad.length
    if (bad.length) unsuit(f.id, `Not suitable for ${bad.join(', ')} guests`)
    if (swaps.length) note(f.id, f.recipe ? `Use the ${swaps.join(' & ')} swap in the recipe` : `Choose a ${swaps.join(' & ')} version`)
    if (unknown) note(f.id, 'Check the recipe for your dietary needs')
  }
  // Lean menu: the cheapest suitable dish for each core role. Richer dishes
  // are added later as budget upgrades.
  const foodIds = []
  const foodC = (f) => mid(foodCost(f, ctx))
  if (!catalog.hasMeta) {
    for (const f of catalog.food) {
      if (!foodOk[f.id]) continue
      foodIds.push(f.id)
      why(f.id, 'On the theme menu')
    }
  } else {
    for (const role of ['showpiece', 'drink', 'fresh']) {
      const f = catalog.food.filter((x) => x.meta?.role === role && foodOk[x.id]).sort((x, y) => foodC(x) - foodC(y))[0]
      if (f) {
        foodIds.push(f.id)
        why(f.id, role === 'showpiece' ? 'An easy, budget-friendly showpiece' : role === 'drink' ? 'Something to drink' : 'Something fresh on the table')
      }
    }
  }
  // Dependencies: food needed by chosen activities.
  for (const p of picks) {
    for (const fid of p.a.requires?.food || []) {
      if (!foodIds.includes(fid) && foodOk[fid] !== false) {
        foodIds.push(fid)
        why(fid, `Needed for ${p.a.name}`)
      }
    }
  }

  // ---- Decor: start lean (budget versions of essentials), relevant zones
  // Zones follow each picked activity's *primary* style (e.g. crafting).
  const pickedKinds = new Set(picks.map((p) => p.a.kinds[0]))
  const slots = {}
  for (const slot of catalog.decor) {
    const relevant = slot.essential || !slot.servesKinds || slot.servesKinds.some((k) => pickedKinds.has(k) || loves.includes(k))
    if (!catalog.hasMeta) {
      slots[slot.id] = slot.variants[0].id
      why(slot.id, 'Part of the theme setup')
      continue
    }
    if (!relevant || !slot.essential) continue
    const cheapest = slot.variants.find((v) => v.tier === 'budget') || slot.variants.find((v) => v.tier === 'classic')
    slots[slot.id] = cheapest.id
  }

  // ---- DIY: by interest, style and prep time
  const style = answers.style || 'mix'
  const maxDiyMinutes = { 'few-hours': 60, weekend: 180, 'two-weeks': 999 }[answers.prepTime] ?? 180
  const diyCandidates = catalog.diy.filter((d) => {
    const req = d.meta?.requires
    if (req?.activities && !req.activities.some((id) => picks.some((p) => p.a.id === id))) return false
    if (req?.food && !req.food.some((id) => foodIds.includes(id))) return false
    return true
  })
  const diyIds = []
  for (const d of diyCandidates) {
    const req = d.meta?.requires
    if (req) {
      diyIds.push(d.id)
      why(d.id, req.activities ? 'Prep for an activity in your plan' : 'Finishes a dish in your plan')
    }
  }

  // ---- Budget: drop from the lean plan if needed, then upgrade while it fits
  const sel = { activities: picks.map((p) => p.a.id), food: foodIds, slots, diy: diyIds }
  const total = () => estimateTotal(plan, catalog, sel, ctx)
  const upgrades = []
  // Plan to the high end of the estimate so a recommended plan never starts
  // out "could run over" — the parent gets headroom, not a surprise.
  const fitsBudget = () => budget == null || total().range[1] <= budget

  const tryUpgrade = (apply, undo, label) => {
    apply()
    if (fitsBudget()) return true
    undo()
    return false
  }

  if (budget != null) {
    // If even the lean plan could run over, swap the costliest activities for
    // cheaper ones that suit the child, then drop activities (keep at least one).
    const actCost = (id) => mid(costRange(byId(catalog.activities, id).cost, ctx))
    const minsOf = (a) => (a.minutes || 15) + 5
    let guard = 20
    while (!fitsBudget() && guard-- > 0) {
      const costly = [...sel.activities].sort((x, y) => actCost(y) - actCost(x))[0]
      if (!costly || !actCost(costly)) break
      const out = byId(catalog.activities, costly)
      const spare = minutesLeft + minsOf(out)
      const swap = suitable
        .filter((x) => !sel.activities.includes(x.a.id) && mid(x.cost) < actCost(costly) && minsOf(x.a) <= spare)
        .sort((x, y) => y.matches.length - x.matches.length || mid(x.cost) - mid(y.cost))[0]
      if (swap) {
        sel.activities = sel.activities.map((id) => (id === costly ? swap.a.id : id))
        minutesLeft = spare - minsOf(swap.a)
        delete reasons[costly]
        why(swap.a.id, `A budget-friendly pick to stay within $${budget}`)
      } else if (sel.activities.length > 1) {
        sel.activities = sel.activities.filter((id) => id !== costly)
        minutesLeft = spare
        delete reasons[costly]
      } else break
      // Drop food and prep that were only there for the removed activity.
      const stillNeeds = (fid) => sel.activities.some((id) => byId(catalog.activities, id)?.requires?.food?.includes(fid))
      for (const fid of out.requires?.food || []) {
        const onlyDep = (reasons[fid] || []).every((r) => r.startsWith('Needed for'))
        if (foodIds.includes(fid) && onlyDep && !stillNeeds(fid)) {
          foodIds.splice(foodIds.indexOf(fid), 1)
          delete reasons[fid]
        }
      }
      for (const id of [...diyIds]) {
        const req = byId(catalog.diy, id)?.meta?.requires
        const ok = (!req?.activities || req.activities.some((x) => sel.activities.includes(x))) && (!req?.food || req.food.some((x) => foodIds.includes(x)))
        if (!ok) {
          diyIds.splice(diyIds.indexOf(id), 1)
          delete reasons[id]
        }
      }
      // A swapped-in activity may need food of its own.
      for (const id of sel.activities) {
        for (const fid of byId(catalog.activities, id)?.requires?.food || []) {
          if (!foodIds.includes(fid) && foodOk[fid] !== false) {
            foodIds.push(fid)
            why(fid, `Needed for ${byId(catalog.activities, id).name}`)
          }
        }
      }
    }
    picks.splice(0, picks.length, ...sel.activities.map((id) => scored.find((x) => x.a.id === id)))
  }

  // Upgrades in priority order: classic decor for essentials, relevant extra
  // zones, extra dishes, then DIY projects that suit their style and time.
  for (const slot of catalog.decor) {
    if (!catalog.hasMeta) break
    const classic = slot.variants.find((v) => v.tier === 'classic')
    if (!classic || !slots[slot.id] || slots[slot.id] === classic.id) continue
    const prev = slots[slot.id]
    if (tryUpgrade(() => (slots[slot.id] = classic.id), () => (slots[slot.id] = prev))) why(slot.id, budget ? `The classic look fits your $${budget} budget` : 'The classic look')
    else why(slot.id, `A budget-friendly version to stay within $${budget}`)
  }
  for (const slot of catalog.decor) {
    if (!catalog.hasMeta || slot.essential || slots[slot.id]) continue
    const classic = slot.variants.find((v) => v.tier === 'classic') || slot.variants[0]
    const relevant = !slot.servesKinds || slot.servesKinds.some((k) => pickedKinds.has(k) || loves.includes(k))
    if (!relevant) continue
    if (tryUpgrade(() => (slots[slot.id] = classic.id), () => delete slots[slot.id]))
      why(slot.id, slot.servesKinds ? `Supports their love of ${slot.servesKinds.map((k) => KIND_LABEL[k]).join(' & ')}` : 'A sweet finishing touch')
  }
  for (const slot of catalog.decor) {
    if (!catalog.hasMeta || slot.essential || slots[slot.id] || slot.servesKinds) continue
    const classic = slot.variants.find((v) => v.tier === 'classic') || slot.variants[0]
    if (tryUpgrade(() => (slots[slot.id] = classic.id), () => delete slots[slot.id])) why(slot.id, 'A sweet finishing touch')
  }
  if (catalog.hasMeta) {
    const addFood = (f, reason) => {
      if (!f || foodIds.includes(f.id) || !foodOk[f.id]) return false
      if (tryUpgrade(() => foodIds.push(f.id), () => foodIds.splice(foodIds.indexOf(f.id), 1))) {
        why(f.id, reason)
        return true
      }
      return false
    }
    const of = (role) => catalog.food.filter((x) => x.meta?.role === role)
    of('savory').forEach((f) => addFood(f, budget ? 'Something savory that fits the budget' : 'Something savory'))
    // Upgrade the showpiece to the celebration cake if it fits.
    const cake = of('showpiece').find((x) => x.meta?.headline)
    if (cake && !foodIds.includes(cake.id) && foodOk[cake.id]) {
      const small = foodIds.find((id) => byId(catalog.food, id)?.meta?.role === 'showpiece')
      const needed = small && picks.some((p) => p.a.requires?.food?.includes(small))
      const swap = () => {
        if (small && !needed) foodIds.splice(foodIds.indexOf(small), 1)
        foodIds.push(cake.id)
      }
      const undo = () => {
        foodIds.splice(foodIds.indexOf(cake.id), 1)
        if (small && !needed) foodIds.push(small)
      }
      if (tryUpgrade(swap, undo)) {
        if (small && !needed) delete reasons[small]
        why(cake.id, budget ? `The celebration cake fits your $${budget} budget` : 'The celebration cake')
      }
    }
    of('sweet').forEach((f) => addFood(f, budget ? 'An extra treat that still fits the budget' : 'An extra treat for the table'))
    of('fresh').forEach((f) => addFood(f, 'More fresh food for the table'))
    of('showpiece').forEach((f) => addFood(f, 'Extra sweets for the table'))
  }
  if (style !== 'ready') {
    const limit = style === 'diy' ? 2 : 1
    let added = 0
    // Projects matching the child's loves come first. A "Mostly DIY" parent
    // still gets make-ahead projects when none match — the project is theirs.
    const loveCount = (d) => (d.meta?.kinds || []).filter((k) => loves.includes(k)).length
    for (const d of [...diyCandidates].sort((x, y) => loveCount(y) - loveCount(x))) {
      if (diyIds.includes(d.id) || added >= limit) continue
      const req = d.meta?.requires
      if (req?.activities && !req.activities.some((id) => sel.activities.includes(id))) continue
      if (req?.food && !req.food.some((id) => foodIds.includes(id))) continue
      if (d.meta?.minutes && d.meta.minutes > maxDiyMinutes) continue
      const match = (d.meta?.kinds || []).filter((k) => loves.includes(k))
      if (catalog.hasMeta && !match.length && style !== 'diy') continue
      if (tryUpgrade(() => diyIds.push(d.id), () => diyIds.splice(diyIds.indexOf(d.id), 1))) {
        added++
        why(d.id, match.length ? `A make-ahead project for a child who loves ${match.map((k) => KIND_LABEL[k]).join(' & ')}` : 'A make-ahead project for a DIY-loving host')
      }
    }
  }

  // Premium upgrades are suggested (not selected) when there's room for them.
  const headroom = budget != null ? budget - total().range[1] : null
  for (const slot of catalog.decor) {
    for (const v of slot.variants) {
      if (v.tier !== 'premium') continue
      const c = variantCost(v, ctx)
      const current = slot.variants.find((x) => x.id === slots[slot.id])
      const extra = c ? c[1] - (current ? variantCost(current, ctx)?.[1] || 0 : 0) : null
      if (budget == null || (extra != null && extra <= headroom)) {
        upgrades.push({ slotId: slot.id, variantId: v.id, reason: budget == null ? 'A showstopping upgrade' : `Fits within your $${budget} budget` })
      }
    }
  }

  return {
    activities: sel.activities,
    food: [...new Set(foodIds)],
    slots,
    diy: diyIds,
    upgrades,
    reasons,
    notes,
    unsuited,
    foodOk,
    budget,
  }
}

const byId = (list, id) => list.find((x) => x.id === id)

export const KIND_LABEL = {
  crafts: 'crafting',
  cooking: 'cooking',
  active: 'running around',
  music: 'music',
  pretend: 'pretend play',
  hunts: 'treasure hunts',
  science: 'science',
  outdoors: 'the outdoors',
  quiet: 'quiet play',
}

// ---------------------------------------------------------------- selections

export const emptySelections = () => ({
  activities: { added: [], removed: [] },
  decor: { added: [], removed: [], swaps: {} },
  food: { added: [], removed: [] },
  diy: { added: [], removed: [] },
})

/** Recommended + parent's additions − removals, with swaps applied. */
export function applySelections(catalog, rec, s = emptySelections()) {
  const merge = (recIds, part) => [...recIds.filter((id) => !part.removed.includes(id)), ...part.added.filter((id) => !recIds.includes(id))]
  const activities = merge(rec.activities, s.activities)
  const diy = merge(rec.diy, s.diy)
  let food = merge(rec.food, s.food)
  const missing = []
  // Dependencies follow the *selected* activities.
  for (const id of activities) {
    const a = byId(catalog.activities, id)
    for (const fid of a?.requires?.food || []) {
      if (food.includes(fid)) continue
      if (s.food.removed.includes(fid)) missing.push({ activity: a.name, food: fid })
      else food = [...food, fid]
    }
  }
  const slots = {}
  for (const slot of catalog.decor) {
    const recVariant = rec.slots[slot.id]
    const included = (recVariant && !s.decor.removed.includes(slot.id)) || s.decor.added.includes(slot.id)
    if (!included) continue
    const fallback = recVariant || (slot.variants.find((v) => v.tier === 'classic') || slot.variants[0]).id
    slots[slot.id] = s.decor.swaps[slot.id] || fallback
  }
  return { activities, food, diy, slots, missing }
}

/** Return new selections with an item turned on or off (never mutates). */
export function toggleSelection(s, section, id, on, recommendedIds) {
  const next = structuredClone(s)
  const part = next[section]
  const isRec = recommendedIds.includes(id)
  part.added = part.added.filter((x) => x !== id)
  part.removed = part.removed.filter((x) => x !== id)
  if (on && !isRec) part.added.push(id)
  if (!on && isRec) part.removed.push(id)
  return next
}

export function swapVariant(s, slotId, variantId) {
  const next = structuredClone(s)
  next.decor.swaps[slotId] = variantId
  if (!next.decor.added.includes(slotId)) next.decor.added.push(slotId)
  next.decor.removed = next.decor.removed.filter((x) => x !== slotId)
  return next
}

// ---------------------------------------------------------------- estimates

/** Budget estimate for a selection, by category, with ranges. */
export function estimateTotal(plan, catalog, sel, ctx) {
  const cats = []
  let incomplete = 0
  const push = (id, label, items) => {
    let range = [0, 0]
    for (const it of items) {
      if (it.range) range = add(range, it.range)
      else incomplete++
    }
    cats.push({ id, label, items, range })
  }

  const essCats = catalog.meta?.essentialsFromShop || []
  const essItems = plan.shop
    .filter((c) => essCats.includes(c.category))
    .flatMap((c) => c.items)
    .map((i) => ({ name: i.name, qty: `${i.quantity} ${i.quantity === 1 ? i.unit : pluralUnit(i.unit)}`, range: [i.estLow, i.estHigh] }))
  push('basics', 'Tableware & favors', essItems.length ? essItems : [{ name: 'Plates, cups, napkins and favors', range: null }])

  push(
    'decor',
    'Decorations',
    Object.entries(sel.slots).map(([slotId, vid]) => {
      const slot = byId(catalog.decor, slotId)
      const v = slot && byId(slot.variants, vid)
      return { id: slotId, name: v?.name || slot?.zone, range: v ? variantCost(v, ctx) : null, tier: v?.tier, note: v?.costNote }
    }),
  )
  push(
    'activities',
    'Activities',
    sel.activities.map((id) => {
      const a = byId(catalog.activities, id)
      return { id, name: a?.name || id, range: a ? costRange(a.cost, ctx) : null, note: a?.costNote }
    }),
  )
  push(
    'food',
    'Food & drinks',
    sel.food.map((id) => {
      const f = byId(catalog.food, id)
      return { id, name: f?.name || id, range: f ? foodCost(f, ctx) : null, note: f?.meta?.costNote }
    }),
  )
  // Dishes share groceries (one box of butter can serve three recipes), so
  // the menu total prices the combined shopping list, not dish by dish.
  const foodCat = cats.find((c) => c.id === 'food')
  const menu = sel.food.map((id) => byId(catalog.food, id)?.src).filter((f) => f && (f.buy || f.recipe))
  if (foodCat && menu.length === sel.food.length && menu.length > 1) {
    const combined = linesCost(groceryLines(menu, { guests: ctx.guests || 0, adults: ctx.adults || 0 }))
    if (combined && combined[1] < foodCat.range[1]) Object.assign(foodCat, { range: combined, shared: true })
  }
  push(
    'diy',
    'DIY projects',
    sel.diy.map((id) => {
      const d = byId(catalog.diy, id)
      return { id, name: d?.name || id, range: d ? costRange(d.meta?.cost, ctx) : null, note: d?.meta?.costNote }
    }),
  )

  const range = cats.reduce((r, c) => add(r, c.range), [0, 0])
  const upgrades = cats
    .find((c) => c.id === 'decor')
    .items.filter((i) => i.tier === 'premium')
    .reduce((r, i) => (i.range ? add(r, i.range) : r), [0, 0])
  return { categories: cats.filter((c) => c.items.length), range, upgrades, incomplete }
}

/** How the estimate compares with the budget, in honest ranges. */
export function budgetStatus(estimate, budget) {
  if (budget == null) return { kind: 'open' }
  if (estimate.incomplete) return { kind: 'incomplete' }
  const [lo, hi] = estimate.range
  if (lo > budget) return { kind: 'over', by: [lo - budget, hi - budget] }
  if (hi > budget) return { kind: 'tight', upTo: hi - budget, leftLow: budget - lo }
  return { kind: 'under', left: [budget - hi, budget - lo] }
}

/** Cheaper swaps for the selected decor, biggest savings first. */
export function cheaperSwaps(catalog, sel, ctx) {
  const out = []
  for (const [slotId, vid] of Object.entries(sel.slots)) {
    const slot = byId(catalog.decor, slotId)
    const cur = slot && byId(slot.variants, vid)
    const curC = cur && variantCost(cur, ctx)
    if (!curC) continue
    for (const v of slot.variants) {
      const c = variantCost(v, ctx)
      if (c && mid(c) < mid(curC) - 5) out.push({ slotId, from: cur.name, to: v.name, variantId: v.id, save: Math.round(mid(curC) - mid(c)) })
    }
  }
  return out.sort((a, b) => b.save - a.save)
}

// ---------------------------------------------------------------- derived plan

const clock = (mins) => {
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')}`
}

/** Party-day timeline from the selected activities, with real durations. */
export function buildTimeline(plan, catalog, sel, duration = 120) {
  const start = (plan.startHour ?? 14) * 60
  const mo = plan.moments
  const acts = sel.activities.map((id) => plan.games.find((g) => g.id === id)).filter(Boolean)
  const half = Math.ceil(acts.length / 2)
  const rows = [
    { t: start - (start < 12 * 60 ? 120 : 240), title: 'Set the scene', detail: mo.setup, prep: true },
    { t: start - 90, title: 'Food prep', detail: mo.prep, prep: true },
    { t: start - 15, title: 'Final touches', detail: mo.final, prep: true },
  ]
  let t = start
  rows.push({ t, title: mo.arrive[0], detail: mo.arrive[1] })
  t += 15
  const act = (g) => {
    rows.push({ t, title: g.name, detail: g.description.split(/(?<=[.!?])\s/)[0], minutes: parseInt(g.time, 10) || 15 })
    t += (parseInt(g.time, 10) || 15) + 5
  }
  acts.slice(0, half).forEach(act)
  rows.push({ t, title: mo.feast[0], detail: mo.feast[1] })
  t += 25
  rows.push({ t, title: mo.cake[0], detail: mo.cake[1] })
  t += 15
  acts.slice(half).forEach(act)
  rows.push({ t, title: mo.goodbye[0], detail: mo.goodbye[1] })
  const end = t + 10
  return {
    rows: rows.map((r) => ({ ...r, time: clock(r.t) })),
    start: clock(start),
    end: clock(end),
    minutes: end - start,
    over: Math.max(0, end - start - duration),
  }
}

/** Checklist: shared tasks + theme basics + prep for each selected item. */
export function buildPlanChecklist(plan, catalog, sel) {
  const extras = {}
  const addTask = (when, task) => {
    ;(extras[when] ||= []).includes(task) || extras[when].push(task)
  }
  for (const [when, tasks] of Object.entries(plan.checklistExtras || {})) tasks.forEach((t) => addTask(when, t))
  const prepOf = [
    ...sel.activities.map((id) => byId(catalog.activities, id)?.prep),
    ...sel.food.map((id) => byId(catalog.food, id)?.meta?.prep),
    ...sel.diy.map((id) => byId(catalog.diy, id)?.meta?.prep),
  ]
  for (const p of prepOf) for (const [when, task] of Object.entries(p || {})) addTask(when, task)
  if (Object.keys(sel.slots).length) addTask('1 week before', `Gather decorations for ${Object.keys(sel.slots).length} setup zones`)
  return buildChecklist(extras)
}

/** Supplies to buy for the selected plan only (food lives in its own list). */
export function buildSupplies(plan, catalog, sel) {
  const groups = []
  if (catalog.hasMeta) {
    const items = Object.entries(sel.slots).flatMap(([slotId, vid]) => {
      const slot = byId(catalog.decor, slotId)
      const v = slot && byId(slot.variants, vid)
      return (v?.supplies || []).map((s) => ({
        name: s.name,
        detail: `${slot.zone} · ${v.name}`,
        quantity: `${s.qty}${s.unit ? ` ${s.unit}${s.qty > 1 ? 's' : ''}` : ''}`,
        estLow: Math.round(s.est[0] * s.qty),
        estHigh: Math.round(s.est[1] * s.qty),
      }))
    })
    groups.push({ id: 'decor', title: 'Decorations', items })
  } else {
    const c = plan.shop.find((x) => x.category === 'Decor')
    if (c) groups.push({ id: 'decor', title: 'Decorations', items: c.items.map(shopItem) })
  }

  const activityGroups = sel.activities
    .map((id) => plan.games.find((g) => g.id === id))
    .filter((g) => g?.hasFullGuide && g.guide.materials.length)
    .map((g) => ({
      id: g.id,
      name: g.name,
      range: costRange(byId(catalog.activities, g.id)?.cost, { guests: plan.guests }),
      items: g.guide.materials.map((m) => ({ name: m.name, quantity: m.quantity.label, optional: m.optional, reusable: m.reusable })),
    }))
  if (activityGroups.length) groups.push({ id: 'activities', title: 'Activities', activities: activityGroups })
  else {
    const c = plan.shop.find((x) => x.category === 'Games & crafts')
    if (c) groups.push({ id: 'activities-shop', title: 'Games & crafts', items: c.items.map(shopItem) })
  }

  for (const cat of ['Tableware', 'Favors']) {
    const c = plan.shop.find((x) => x.category === cat)
    if (c) groups.push({ id: cat.toLowerCase(), title: cat, items: c.items.map(shopItem) })
  }

  const diy = sel.diy.map((id) => plan.diy.find((d) => slugify(d.name) === id)).filter(Boolean)
  if (diy.length) groups.push({ id: 'diy', title: 'DIY projects', diy: diy.map((d) => ({ name: d.name, materials: d.materials })) })
  return groups.filter((g) => (g.items?.length || g.activities?.length || g.diy?.length))
}

const shopItem = (i) => ({
  name: i.name,
  quantity: `${i.quantity} ${i.unit}${i.quantity > 1 ? 's' : ''}`,
  estLow: i.estLow,
  estHigh: i.estHigh,
  detail: i.diyAlt ? `Save: ${i.diyAlt}` : null,
})

/** Everything the results page needs, in one place. */
export function derivePlan(plan, catalog, answers, selections, { adults = 0 } = {}) {
  const ctx = { guests: answers.guestCount || 0, adults }
  const rec = recommend(plan, catalog, answers, { adults })
  const sel = applySelections(catalog, rec, selections)
  const estimate = estimateTotal(plan, catalog, sel, ctx)
  const budget = isUnlimited(answers) ? null : answers.budget
  return {
    rec,
    sel,
    estimate,
    budget,
    status: budgetStatus(estimate, budget),
    swaps: cheaperSwaps(catalog, sel, ctx),
    timeline: buildTimeline(plan, catalog, sel, Number(answers.duration) || 120),
    checklist: buildPlanChecklist(plan, catalog, sel),
    supplies: buildSupplies(plan, catalog, sel),
    ctx,
  }
}

/** Estimated cost range for one catalog item (null when there's no estimate). */
export function itemCost(catalog, section, id, ctx, variantId) {
  if (section === 'activities') return costRange(byId(catalog.activities, id)?.cost, ctx)
  if (section === 'food') {
    const f = byId(catalog.food, id)
    return f ? foodCost(f, ctx) : null
  }
  if (section === 'diy') return costRange(byId(catalog.diy, id)?.meta?.cost, ctx)
  if (section === 'decor') {
    const slot = byId(catalog.decor, id)
    const v = slot && (byId(slot.variants, variantId) || slot.variants[0])
    return v ? variantCost(v, ctx) : null
  }
  return null
}

/** Would adding this push the plan over budget? Returns ~dollars over, or 0. */
export function overBudgetBy(derived, range) {
  if (derived.budget == null || !range) return 0
  const over = derived.estimate.range[1] + range[1] - derived.budget
  return over > 0 ? Math.round(over) : 0
}

/**
 * How an item would fit the party, for labelling every option:
 *   in        — already in the plan
 *   unsuited  — not right for this age / space / diet (reason given)
 *   fits      — adding it keeps the high estimate within budget
 *   over      — adding it would run over (by ~$)
 *   open      — no budget set; just the added cost
 *   unknown   — no estimate for this item
 * `add` is the item's cost range; `total` is the plan's range with it added.
 * For a decor version, pass `variantId`: the change from the current version
 * is what's added.
 */
export function fitFor(derived, catalog, section, id, { variantId, inPlan } = {}) {
  const { rec, estimate, budget, ctx, sel } = derived
  if (inPlan) return { kind: 'in' }
  const reason = rec.unsuited?.[id]
  if (reason) return { kind: 'unsuited', reason }
  let add = itemCost(catalog, section, id, ctx, variantId)
  if (section === 'decor' && sel.slots[id] && add) {
    const cur = itemCost(catalog, 'decor', id, ctx, sel.slots[id])
    if (cur) add = [add[0] - cur[0], add[1] - cur[1]]
  }
  if (!add) return { kind: 'unknown' }
  const total = [estimate.range[0] + add[0], estimate.range[1] + add[1]]
  if (budget == null) return { kind: 'open', add, total }
  if (total[1] <= budget) return { kind: 'fits', add, total }
  return { kind: 'over', add, total, by: Math.round(total[1] - budget) }
}

/** Sort order for showing every option: plan, fits, over, unsuited. */
export const FIT_ORDER = { in: 0, fits: 1, open: 1, unknown: 1, over: 2, unsuited: 3 }
