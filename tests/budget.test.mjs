// Run: npm run test:budget — a fresh recommended plan must fit the budget at
// the HIGH end of its estimate whenever the leanest possible plan can.
import assert from 'node:assert/strict'
import { liveEventType } from '../src/data/eventTypes.js'
import { buildPlan } from '../src/lib/buildPlan.js'
import { buildCatalog, derivePlan } from '../src/lib/recommend.js'
import { catalogMetaByTheme } from '../src/data/birthday/catalog/index.js'
import { defaultBirthdayAnswers } from '../src/data/birthday/questions.js'

let n = 0
for (const budget of [125, 150, 175, 200, 250, 300, 500]) {
  for (const guestCount of [6, 8, 12, 16]) {
    for (const interests of [['crafts', 'hunts'], ['everything'], ['active']]) {
      const answers = { ...defaultBirthdayAnswers, theme: 'fairy-garden', budget, guestCount, interests, budgetMode: 'limit' }
      const plan = buildPlan(liveEventType, answers)
      const d = derivePlan(plan, buildCatalog(plan, catalogMetaByTheme[plan.theme.id]), answers)
      const tag = `$${budget}, ${guestCount} guests, ${interests.join('+')}: ${d.estimate.range.join('–')}`
      assert.ok(d.sel.activities.length >= 1, `has an activity (${tag})`)
      if (budget >= 175 && guestCount <= 12) assert.equal(d.status.kind, 'under', `fits the budget (${tag})`)
      assert.notEqual(d.status.kind, 'over', `not over budget (${tag})`)
      n++
    }
  }
}
console.log(`✓ ${n} budget checks passed`)
