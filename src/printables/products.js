/**
 * Printable products — shared by every collection. A collection supplies
 * the look (layouts); products define size, sheet layout, pricing tier and
 * which copies to make for a party plan.
 *
 * tier: 'sample' (free download) | 'premium'. Prices are not set here —
 * see entitlements.js.
 */
import { slugify } from '../data/activityImages.js'

const LETTER = { w: 8.5, h: 11 }

export const PRODUCTS = [
  {
    id: 'invitation',
    instructions: ['Print one invitation per page on 5×7 or letter cardstock.', 'Trim along the crop marks with a paper trimmer for straight edges.', 'Fits a standard A7 (5¼×7¼ in) envelope.'],
    name: 'Birthday invitation',
    size: { w: 5, h: 7 },
    sizeLabel: '5×7 in',
    description: 'The heart of the collection — name, age, date, place and RSVP.',
    tier: 'premium',
    print: { mode: 'single', copies: 'one card per page — print as many as you need' },
    digital: true,
  },
  {
    id: 'welcome-sign',
    instructions: ['Print on letter cardstock, or send the print-shop file to be printed at 8×10.', 'Trim along the crop marks and slip it into an 8×10 frame or onto an easel.'],
    name: 'Welcome sign',
    size: { w: 8, h: 10 },
    sizeLabel: '8×10 in',
    description: 'Greets guests at the garden gate. Fits a standard 8×10 frame.',
    tier: 'premium',
    print: { mode: 'single' },
  },
  {
    id: 'food-tent',
    instructions: ['Print on cardstock and cut around the crop marks.', 'Score and fold along the dashed fold marks so the card stands like a tent.', 'Each card reads from both sides.'],
    name: 'Food & drink tent cards',
    size: { w: 3.5, h: 2.1 },
    sizeLabel: '3.5×2.1 in folded',
    description: 'One for each dish on your menu, printed to read from both sides.',
    tier: 'premium',
    print: { mode: 'sheet', fold: true, cols: 2, rows: 2 },
  },
  {
    id: 'favor-tag',
    instructions: ['Print on cardstock and cut around the tag outline (or along the crop marks for a simple rectangle).', 'Punch a hole at the small circle (⅛–¼ in punch) and tie on with ribbon.'],
    name: 'Favor tags',
    size: { w: 2, h: 3 },
    sizeLabel: '2×3 in',
    description: 'Thank-you tags to tie onto favor bags or hang on the favor tree.',
    tier: 'sample',
    print: { mode: 'sheet', cols: 3, rows: 3, perGuest: true, spare: 2 },
  },
  {
    id: 'clue-card',
    instructions: ['Print, cut along the crop marks, and slip into sheet protectors if they’ll be outdoors.', 'Hide them in order: give teams Clue 1, and tape each next clue at the spot shown.'],
    name: 'Treasure hunt clue cards',
    size: { w: 3, h: 5 },
    sizeLabel: '3×5 in',
    description: 'Picture clues for little ones, rhyming clues for older fairies.',
    tier: 'premium',
    print: { mode: 'sheet', cols: 2, rows: 2 },
  },
  {
    id: 'station-sign',
    instructions: ['Print one sign per page and trim along the crop marks.', 'Stand in a 5×7 frame or tape to a card easel at each station.'],
    name: 'Activity station signs',
    size: { w: 5, h: 7 },
    sizeLabel: '5×7 in',
    description: 'A sign for each activity in your plan.',
    tier: 'premium',
    print: { mode: 'single' },
  },
  {
    id: 'cupcake-topper',
    instructions: ['Print on cardstock. Cut out with a 2 in circle punch, or scissors along the dashed circle.', 'Tape or glue a toothpick to the back. Add toppers just before serving.'],
    name: 'Cupcake toppers',
    size: { w: 2, h: 2 },
    sizeLabel: '2 in circles',
    description: 'Name and age toppers to tape onto toothpicks.',
    tier: 'sample',
    shape: 'circle',
    print: { mode: 'sheet', cols: 3, rows: 4, perGuest: true },
  },
  {
    id: 'thank-you',
    instructions: ['Print on cardstock and cut along the crop marks.', 'Fits an A6 (4¾×6½ in) envelope. Leave the lines for a note in their own hand.'],
    name: 'Thank-you cards',
    size: { w: 4, h: 6 },
    sizeLabel: '4×6 in',
    description: 'With writing lines for a little note in their own hand.',
    tier: 'premium',
    print: { mode: 'sheet', cols: 2, rows: 1 },
  },
]

export const productById = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]))
export { LETTER }

const firstSentence = (t) => (String(t || '').match(/^[^.!?]+[.!?]/) || [t || ''])[0].trim()

/**
 * The designs to make for one product. `inPlan` says whether it follows the
 * plan; everything stays browsable either way.
 * ctx: { plan, sel, details (formatted) }
 */
export function instancesFor(productId, { plan, sel, details, collection }) {
  const games = plan.games.map((g) => ({ id: g.id, name: g.name, blurb: firstSentence(g.description), time: g.time }))
  const foods = plan.food.map((f) => ({ id: f.id, name: f.recipe?.title || f.name }))
  switch (productId) {
    case 'food-tent':
      return foods.map((f) => ({ key: `food-tent:${f.id}`, label: f.name, item: f, inPlan: sel.food.includes(f.id) }))
    case 'station-sign':
      return games.map((g) => ({ key: `station-sign:${g.id}`, label: g.name, item: g, inPlan: sel.activities.includes(g.id) }))
    case 'clue-card': {
      const hunt = plan.games.find((g) => /treasure|hunt/i.test(g.name))
      const inPlan = !!hunt && sel.activities.includes(hunt.id)
      return (collection?.clues || []).map((c, i, all) => ({ key: `clue-card:${c.spot}`, label: `Clue ${i + 1}`, item: c, index: i, count: all.length, inPlan }))
    }
    case 'cupcake-topper':
      // Name and age toppers alternate with picture toppers across the sheet.
      return [
        { key: 'cupcake-topper:name', label: 'Name topper', design: 'name', inPlan: true },
        ...(details.age ? [{ key: 'cupcake-topper:age', label: 'Age topper', design: 'age', inPlan: true }] : []),
        ...(collection?.toppers || []).map((art) => ({ key: `cupcake-topper:${art}`, label: `${art[0].toUpperCase()}${art.slice(1)} topper`, design: 'art', art, inPlan: true })),
      ]
    default:
      return [{ key: `${productId}:main`, label: productById[productId]?.name, inPlan: true }]
  }
}

/** Is this product part of the plan (vs. only browsable)? */
export function productInPlan(productId, ctx) {
  return instancesFor(productId, ctx).some((i) => i.inPlan)
}

/** How many copies a sheet product needs for this party. */
export function copiesFor(product, guests, instances) {
  const p = product.print
  if (p.mode !== 'sheet') return 1
  if (p.perGuest) return Math.max(1, guests + (p.spare || 0))
  return instances.length
}

export { slugify }
