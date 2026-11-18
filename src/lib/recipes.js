// Recipes: validation, scaling and shopping-list consolidation.
// Pure functions — recipes are attached to the plan once; scaling runs on
// render from (children, adults) and is cheap. No network calls.
import { dimensionOf, toBase, formatQty, formatIn } from './units.js'

/**
 * JSON Schema for a menu recipe (usable for AI structured output later).
 * Ingredient `key` identifies the same ingredient across recipes so the
 * shopping list can consolidate it; units must be consistent per key.
 */
export const recipeSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  title: 'MenuRecipe',
  type: 'object',
  required: ['id', 'summary', 'yield', 'ingredients', 'steps'],
  properties: {
    id: { type: 'string', pattern: '^[a-z0-9-]+$' },
    title: { type: 'string' },
    imageUrl: { type: 'string' },
    summary: { type: 'string' },
    yield: {
      type: 'object',
      required: ['servings', 'label'],
      properties: {
        servings: { type: 'number', description: 'Servings one batch makes' },
        label: { type: 'string', description: 'e.g. "24 cupcakes"' },
        perGuest: { type: 'number', description: 'Servings each guest eats (default 1)' },
        step: { type: 'number', description: 'Scale in multiples of this many servings' },
        fixed: { type: 'boolean', description: 'Do not scale (e.g. a tiered cake)' },
        servingLabel: { type: 'string' },
      },
    },
    prepTime: { type: 'string' },
    totalTime: { type: 'string' },
    ingredients: {
      type: 'array',
      items: {
        type: 'object',
        required: ['key', 'name', 'qty', 'unit'],
        properties: {
          key: { type: 'string' },
          name: { type: 'string' },
          qty: { type: 'number' },
          unit: { type: 'string', description: 'tsp | tbsp | cup | oz | lb | a count noun' },
          aisle: { type: 'string' },
          group: { type: 'string', description: 'Sub-heading, e.g. "Frosting"' },
          note: { type: 'string' },
          optional: { type: 'boolean' },
          noShop: { type: 'boolean', description: 'Leave off the shopping list (e.g. tap water)' },
          shopUnit: { type: 'string', description: 'Unit to total in on the shopping list, e.g. "stick" for butter' },
        },
      },
    },
    equipment: { type: 'array', items: { type: 'string' } },
    steps: { type: 'array', items: { type: 'string' } },
    makeAhead: { type: 'array', items: { type: 'string' } },
    storage: { type: 'array', items: { type: 'string' } },
    presentation: { type: 'array', items: { type: 'string' } },
    allergens: { type: 'array', items: { type: 'string' } },
    substitutions: { type: 'array', items: { type: 'string' } },
    safety: { type: 'array', items: { type: 'string' } },
    bakery: {
      type: 'object',
      description: 'Optional "order from a bakery" guidance. Never includes listings or prices.',
      properties: {
        summary: { type: 'string' },
        order: { type: 'array', items: { type: 'string' } },
        questions: { type: 'array', items: { type: 'string' } },
        timeline: { type: 'array', items: { type: 'string' } },
        dayOf: { type: 'array', items: { type: 'string' } },
      },
    },
  },
}

const str = (v) => (typeof v === 'string' && v.trim() ? v.trim() : null)
const list = (v) => (Array.isArray(v) ? v.map(str).filter(Boolean) : [])
const pos = (v, d) => (typeof v === 'number' && v > 0 ? v : d)

export function normalizeRecipe(raw) {
  if (!raw || !str(raw.id)) return null
  const y = raw.yield || {}
  const servings = pos(y.servings, 1)
  const ingredients = (Array.isArray(raw.ingredients) ? raw.ingredients : [])
    .filter((i) => i && str(i.name) && typeof i.qty === 'number' && i.qty > 0 && str(i.unit))
    .map((i) => ({
      key: str(i.key) || str(i.name).toLowerCase(),
      name: str(i.name),
      qty: i.qty,
      unit: str(i.unit),
      aisle: str(i.aisle) || 'Other',
      group: str(i.group),
      note: str(i.note),
      optional: !!i.optional,
      noShop: !!i.noShop,
      shopUnit: str(i.shopUnit),
    }))
  const b = raw.bakery
  return {
    id: str(raw.id),
    title: str(raw.title),
    imageUrl: str(raw.imageUrl),
    summary: str(raw.summary) || '',
    yield: {
      servings,
      label: str(y.label) || `${servings} servings`,
      perGuest: pos(y.perGuest, 1),
      step: pos(y.step, servings),
      fixed: !!y.fixed,
      servingLabel: str(y.servingLabel) || 'serving',
    },
    prepTime: str(raw.prepTime),
    totalTime: str(raw.totalTime),
    ingredients,
    equipment: list(raw.equipment),
    steps: list(raw.steps),
    makeAhead: list(raw.makeAhead),
    storage: list(raw.storage),
    presentation: list(raw.presentation),
    allergens: list(raw.allergens),
    substitutions: list(raw.substitutions),
    safety: list(raw.safety),
    bakery: b
      ? {
          summary: str(b.summary) || '',
          order: list(b.order),
          questions: list(b.questions),
          timeline: list(b.timeline),
          dayOf: list(b.dayOf),
        }
      : null,
  }
}

/**
 * Scale a recipe for a party.
 * people = children + adults the host has chosen to count (adults never assumed).
 */
export function scaleRecipe(recipe, { children = 0, adults = 0 } = {}) {
  const y = recipe.yield
  const people = Math.max(0, children) + Math.max(0, adults)
  const needed = Math.ceil(people * y.perGuest)
  let factor = 1
  let makes = y.servings
  if (!y.fixed && needed > 0) {
    makes = Math.ceil(needed / y.step) * y.step
    factor = makes / y.servings
  }
  return {
    ...recipe,
    people,
    needed,
    makes,
    factor,
    tooSmall: y.fixed && needed > y.servings,
    ingredients: recipe.ingredients.map((i) => {
      const dim = dimensionOf(i.unit)
      const base = toBase(i.qty, i.unit) * factor
      return { ...i, dimension: dim, base, display: formatIn(i.qty * factor, i.unit) }
    }),
  }
}

const AISLES = ['Produce', 'Bakery', 'Dairy & eggs', 'Deli', 'Baking', 'Pantry', 'Frozen', 'Other']

/**
 * Consolidate ingredients from several scaled recipes into one list,
 * grouped by aisle. The same key + dimension is summed once.
 */
export function buildShoppingList(scaledRecipes, names = {}) {
  const map = new Map()
  for (const r of scaledRecipes) {
    for (const i of r.ingredients) {
      if (i.noShop) continue
      const aisle = AISLES.includes(i.aisle) ? i.aisle : 'Other'
      const id = `${i.key}|${i.dimension}|${i.dimension === 'count' ? i.unit : ''}`
      const cur = map.get(id) || { id, key: i.key, name: i.name.split(',')[0], aisle, dimension: i.dimension, unit: i.unit, shopUnit: null, base: 0, sources: [], optional: true }
      cur.base += i.base
      cur.shopUnit = cur.shopUnit || i.shopUnit
      if (!cur.sources.includes(names[r.id] || r.id)) cur.sources.push(names[r.id] || r.id)
      cur.optional = cur.optional && i.optional
      map.set(id, cur)
    }
  }
  const items = [...map.values()].map((x) => ({
    ...x,
    display: x.shopUnit
      ? formatIn(x.base / toBase(1, x.shopUnit), x.shopUnit)
      : formatQty(x.base, x.dimension, x.dimension === 'count' ? x.unit : ''),
  }))
  return AISLES.map((aisle) => ({
    aisle,
    items: items.filter((i) => i.aisle === aisle).sort((a, b) => a.name.localeCompare(b.name)),
  })).filter((g) => g.items.length)
}
