// Run: npm run test:coverage — every activity, dish and DIY project in every
// theme has something to buy, every line links to Amazon with our tag, and
// each item's cost estimate is the sum of its buy list.
import assert from 'node:assert/strict'
import { liveEventType } from '../src/data/eventTypes.js'
import { buildPlan } from '../src/lib/buildPlan.js'
import { buildCatalog, costRange, itemCost } from '../src/lib/recommend.js'
import { catalogMetaByTheme } from '../src/data/birthday/catalog/index.js'
import { shoppingForItem, linesForActivity, groceryLines, linesCost } from '../src/lib/shopping.js'
import { slugify } from '../src/data/activityImages.js'
import { AMAZON } from '../src/config/affiliate.js'

let n = 0
const tagged = (href) => new URL(href).searchParams.getAll('tag').join() === AMAZON.tag
for (const theme of liveEventType.themes.map((t) => t.id)) {
  for (const guestCount of [6, 12, 20]) {
    const plan = buildPlan(liveEventType, { ...liveEventType.defaultAnswers, theme, guestCount })
    const catalog = buildCatalog(plan, catalogMetaByTheme[theme])
    const check = (kind, id) => {
      const r = shoppingForItem(plan, catalog, kind, id)
      const all = [...r.required, ...r.optional]
      assert.ok(all.length > 0, `${theme} ${kind} ${id}: has things to buy`)
      for (const i of all) {
        assert.ok(i.link && tagged(i.link.href), `${theme} ${kind} ${id} · ${i.name}: tagged Amazon link`)
        n++
      }
      return all
    }
    for (const g of plan.games) {
      const all = check('activity', g.id)
      assert.ok(all.filter((i) => !i.optional).every((i) => i.est), `${theme} ${g.id}: every required line priced`)
      const c = linesCost(linesForActivity(g))
      if (c) assert.deepEqual(costRange(catalog.activities.find((a) => a.id === g.id).cost, { guests: guestCount }), c, `${theme} ${g.id}: card cost = list cost`)
    }
    for (const f of plan.food) {
      check('food', f.id)
      const c = linesCost(groceryLines([f], { guests: guestCount }))
      assert.ok(c, `${theme} ${f.id}: priced`)
      assert.deepEqual(itemCost(catalog, 'food', f.id, { guests: guestCount, adults: 0 }), c, `${theme} ${f.id}: card cost = list cost`)
    }
    for (const d of plan.diy) check('diy', slugify(d.name))
  }
}
console.log(`✓ ${n} shopping lines covered, tagged and priced`)
