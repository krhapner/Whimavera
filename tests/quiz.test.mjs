// Run: npm run test:quiz — every quiz answer is respected by the recommended plan.
import { liveEventType } from '../src/data/eventTypes.js'
import { buildPlan } from '../src/lib/buildPlan.js'
import { buildCatalog, derivePlan, PLAY_KINDS } from '../src/lib/recommend.js'
import { catalogMetaByTheme } from '../src/data/birthday/catalog/index.js'
import { defaultBirthdayAnswers as D } from '../src/data/birthday/questions.js'
const AGE = { '1-2': [1, 2], '3-5': [3, 5], '6-8': [6, 8], '9-12': [9, 12] }
const SPACE = { home: 1, venue: 2, backyard: 3, park: 3 }, SR = { small: 1, medium: 2, large: 3 }
const issues = {}; let runs = 0
const flag = (k, ex) => { (issues[k] ||= { n: 0, ex }).n++ }
const run = (a) => {
  const plan = buildPlan(liveEventType, a); const cat = buildCatalog(plan, catalogMetaByTheme[plan.theme.id])
  const d = derivePlan(plan, cat, a); runs++; return { plan, cat, d }
}
const ints = [['crafts'],['cooking'],['active'],['music'],['pretend'],['hunts'],['science'],['outdoors'],['quiet'],['everything'],['crafts','hunts','pretend'],[]]
for (const ageRange of Object.keys(AGE)) for (const interests of ints) for (const location of Object.keys(SPACE))
for (const duration of [90,180]) for (const diet of [['none'],['gluten-free'],['egg-free'],['dairy-free','nut-free'],['vegetarian']])
for (const style of ['diy','mix','ready']) for (const prepTime of ['few-hours','two-weeks']) for (const budgetMode of ['limit','all']) {
  const a = { ...D, ageRange, interests, location, duration, diet, style, prepTime, budgetMode, budget: 300 }
  const { plan, cat, d } = run(a); const s = d.sel; const ex = JSON.stringify({ ageRange, interests, location, duration, diet, style, prepTime, budgetMode })
  const [lo, hi] = AGE[ageRange]
  for (const id of s.activities) {
    const act = cat.activities.find((x) => x.id === id)
    if (act.ages && (hi < act.ages.min || lo > act.ages.max)) flag('activity outside age range', ex + ' ' + id)
    if (act.space && SR[act.space] > SPACE[location]) flag('activity too big for location', ex + ' ' + id)
  }
  if (!s.activities.length) flag('no activities', ex)
  const loves = interests.includes('everything') ? PLAY_KINDS : interests
  const matchable = cat.activities.filter((x) => x.kinds.some((k) => loves.includes(k)) && (!x.ages || (hi >= x.ages.min && lo <= x.ages.max)) && (!x.space || SR[x.space] <= SPACE[location]))
  if (loves.length && matchable.length && !s.activities.some((id) => cat.activities.find((x) => x.id === id).kinds.some((k) => loves.includes(k)))) flag('no activity matches interests (though one could)', ex + ' ' + s.activities)
  if (d.timeline.over > 0) flag('timeline runs past party length', ex + ` over ${d.timeline.over}m`)
  const diets = diet.filter((x) => x !== 'none')
  for (const fid of s.food) { const m = cat.food.find((f) => f.id === fid)?.meta; if (diets.some((x) => m?.diet?.[x] === 'no')) flag('food unsuitable for diet', ex + ' ' + fid) }
  const roles = new Set(s.food.map((f) => cat.food.find((x) => x.id === f)?.meta?.role))
  for (const r of ['drink', 'fresh']) if (!roles.has(r)) flag(`menu missing ${r}`, ex)
  if (!roles.has('showpiece')) flag('menu has no cake/showpiece', ex)
  const maxMin = { 'few-hours': 60, weekend: 180, 'two-weeks': 999 }[prepTime]
  const optionalDiy = s.diy.filter((id) => !cat.diy.find((x) => x.id === id)?.meta?.requires)
  if (style === 'ready' && optionalDiy.length) flag('ready-made still gets optional DIY', ex + ' ' + optionalDiy)
  for (const id of optionalDiy) if ((cat.diy.find((x) => x.id === id)?.meta?.minutes || 0) > maxMin) flag('DIY longer than prep time', ex + ' ' + id)
  if (style === 'diy' && budgetMode === 'all' && prepTime === 'two-weeks' && optionalDiy.length === 0) flag('DIY lover, unlimited budget, 2 weeks: no DIY projects', ex)
  if (budgetMode === 'limit' && d.status.kind === 'over') flag('over budget at $300', ex)
  if (budgetMode === 'all' && d.status.kind !== 'open') flag('unlimited mode not open', ex)
}
// Guests scale costs and quantities
const g = [6, 12, 24].map((n) => run({ ...D, guestCount: n, budgetMode: 'all' }))
if (!(g[0].d.estimate.range[1] < g[1].d.estimate.range[1] && g[1].d.estimate.range[1] < g[2].d.estimate.range[1])) flag('cost does not scale with guests', '')
// Every theme renders, with and without a budget
const themeOut = liveEventType.themes.map((t) => { const r = run({ ...D, theme: t.id }); return `${t.id}: ${r.d.status.kind}, ${r.d.sel.activities.length} activities, ${r.d.sel.food.length} foods, ${Object.keys(r.d.sel.slots).length} zones, est ${r.d.estimate.range} incomplete ${r.d.estimate.incomplete}` })
void themeOut
for (const [k, v] of Object.entries(issues)) console.log(`✗ ${k}: ${v.n}×  e.g. ${v.ex}`)
const failed = Object.entries(issues)
if (failed.length) {
  for (const [k, v] of failed) console.error(`✗ ${k}: ${v.n}×  e.g. ${v.ex}`)
  process.exit(1)
}
console.log(`✓ ${runs} quiz combinations filter correctly`)
