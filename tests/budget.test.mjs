// Run: npm run test:budget — a fresh recommended plan must fit the budget at
// the HIGH end of its estimate whenever the leanest possible plan can.
import assert from 'node:assert/strict'
import { liveEventType } from '../src/data/eventTypes.js'
import { buildPlan } from '../src/lib/buildPlan.js'
import { buildCatalog, derivePlan } from '../src/lib/recommend.js'
import { catalogMetaByTheme } from '../src/data/birthday/catalog/index.js'
import { defaultBirthdayAnswers } from '../src/data/birthday/questions.js'

let n = 0
let honestOver = 0
for (const theme of liveEventType.themes.map((t) => t.id)) for (const budget of [125, 150, 175, 200, 250, 300, 500]) {
  for (const guestCount of [6, 8, 12, 16]) {
    for (const interests of [['crafts', 'hunts'], ['everything'], ['active']]) {
      const answers = { ...defaultBirthdayAnswers, theme, budget, guestCount, interests, budgetMode: 'limit' }
      const plan = buildPlan(liveEventType, answers)
      const catalog = buildCatalog(plan, catalogMetaByTheme[plan.theme.id])
      const d = derivePlan(plan, catalog, answers)
      const tag = `${theme} $${budget}, ${guestCount} guests, ${interests.join('+')}: ${d.estimate.range.join('–')}`
      assert.ok(d.sel.activities.length >= 1, `has an activity (${tag})`)
      if (budget >= 175 && guestCount <= 8) assert.equal(d.status.kind, 'under', `fits the budget (${tag})`)
      // "Over" is only allowed when the plan is already the leanest possible
      // (free activities, budget decor, the three core dishes) — then it's
      // the honest answer: this budget can't cover this many guests.
      if (d.status.kind === 'over') {
        const cat = (id) => d.estimate.categories.find((c) => c.id === id)
        const lean =
          (cat('activities')?.range || [0, 0])[1] === 0 &&
          d.sel.food.length <= 3 &&
          Object.entries(d.sel.slots).every(([slotId, vid]) => {
            const slot = catalog.decor.find((z) => z.id === slotId)
            const cost = (v) => v.cost?.fixed?.[1] ?? 0
            return cost(slot.variants.find((v) => v.id === vid)) <= Math.min(...slot.variants.map(cost))
          })
        assert.ok(lean, `not over budget unless the plan is already lean (${tag})`)
        honestOver++
      }
      n++
    }
  }
}
console.log(`✓ ${n} budget checks passed${honestOver ? ` (${honestOver} lean plans honestly over a very tight budget)` : ''}`)

// Decor tiers: Budget < Classic < Premium in shoppable supplies, and each
// version's cost estimate matches the sum of its supplies.
import { resolveSupply } from '../src/lib/shopping.js'
const ORDER = ['budget', 'classic', 'premium']
let t = 0
for (const [theme, meta] of Object.entries(catalogMetaByTheme)) {
  for (const slot of meta.decor || []) {
    const counts = ORDER.map((tier) => slot.variants.find((v) => v.tier === tier)).map((v) => v && v.supplies.filter((s) => resolveSupply(s.name, { id: s.supply, category: 'decor' }).shop).length)
    const present = counts.filter((c) => c != null)
    for (let i = 1; i < present.length; i++) assert.ok(present[i] > present[i - 1], `${theme}/${slot.id}: more supplies at each tier (${counts})`)
    for (const v of slot.variants) {
      const sum = v.supplies.reduce((r, s) => [r[0] + s.est[0] * s.qty, r[1] + s.est[1] * s.qty], [0, 0]).map(Math.round)
      assert.deepEqual(v.cost.fixed, sum, `${theme}/${v.id}: cost matches supplies`)
    }
    t++
  }
}
console.log(`✓ ${t} decor zones step up by tier`)
