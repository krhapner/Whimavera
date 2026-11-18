// Run: npm run test:links
import assert from 'node:assert/strict'
import { withAffiliateTag, amazonSearchUrl, amazonProductUrl, amazonLinkFor } from '../src/lib/amazon.js'
import { AMAZON } from '../src/config/affiliate.js'
import { SUPPLIES, KITS } from '../src/data/supplies/catalog.js'
import { buildPlan } from '../src/lib/buildPlan.js'
import { liveEventType } from '../src/data/eventTypes.js'
import { buildCatalog, derivePlan, emptySelections } from '../src/lib/recommend.js'
import { catalogMetaByTheme } from '../src/data/birthday/catalog/index.js'
import { buildPartyShopping, shoppingForItem, resolveSupply } from '../src/lib/shopping.js'

const tag = AMAZON.tag
const tagsOf = (href) => new URL(href).searchParams.getAll('tag')
let n = 0
const ok = (cond, msg) => { assert.ok(cond, msg); n++ }

ok(tag, 'a tracking tag is configured')

// Search URLs
const s = amazonSearchUrl('green floral tape')
ok(s.startsWith('https://www.amazon.com/s?'), 'search URL on amazon.com')
ok(new URL(s).searchParams.get('k') === 'green floral tape', 'search phrase kept')
ok(tagsOf(s).length === 1 && tagsOf(s)[0] === tag, 'search URL has exactly one tag')
ok(amazonSearchUrl('   ') === null, 'empty search gives no link')

// Product URLs
const p = amazonProductUrl('B0H41D1GQ5')
ok(p === `https://www.amazon.com/dp/B0H41D1GQ5?tag=${tag}`, 'ASIN product URL')
ok(amazonProductUrl('not-an-asin') === null, 'invalid ASIN rejected')

// Existing URLs: params preserved, tag replaced, no duplicates
const pasted = 'https://www.amazon.com/Asdhw-Invitation/dp/B0H41D1GQ5?crid=34EJ&keywords=fairy+birthday+invitations&tag=someone-else-20&tag=dup-21&linkCode=ll2&ref_=as_li_ss_tl'
const w = new URL(withAffiliateTag(pasted))
ok(w.searchParams.getAll('tag').length === 1 && w.searchParams.get('tag') === tag, 'existing tags replaced by one tag')
for (const k of ['crid', 'keywords', 'linkCode', 'ref_']) ok(w.searchParams.has(k), `kept ${k}`)
ok(withAffiliateTag('https://evil.example.com/?q=1') === null, 'non-Amazon URL refused')
ok(withAffiliateTag('http://www.amazon.com/dp/B0H41D1GQ5') === null, 'non-https refused')

// Supply precedence: url > asin > search
ok(amazonLinkFor({ asin: 'B0H41D1GQ5', search: 'x' }).kind === 'product', 'asin beats search')
ok(amazonLinkFor({ search: 'pipe cleaners' }).kind === 'search', 'search fallback')
ok(amazonLinkFor({}) === null, 'nothing to link → null')

// Every catalog supply and kit produces a tagged link
for (const [id, sup] of Object.entries(SUPPLIES)) {
  if (sup.shop === false) continue
  const l = amazonLinkFor(sup)
  ok(l && tagsOf(l.href).length === 1 && tagsOf(l.href)[0] === tag, `supply ${id} tagged`)
}
for (const [id, k] of Object.entries(KITS)) ok(tagsOf(amazonLinkFor(k).href)[0] === tag, `kit ${id} tagged`)

// Unmapped material still gets a relevant tagged search
const u = resolveSupply('Glitter glue pens (washable), 6 colors')
ok(!u.curated && new URL(amazonLinkFor(u).href).searchParams.get('k') === 'Glitter glue pens', 'fallback search from material name')

// Whole party: every linked item tagged, Flower Crown Studio searches fit
const answers = { ...liveEventType.defaultAnswers, theme: 'fairy-garden', budgetMode: 'all', interests: ['everything'] }
const plan = buildPlan(liveEventType, answers)
const cat = buildCatalog(plan, catalogMetaByTheme['fairy-garden'])
const d = derivePlan(plan, cat, answers, emptySelections())
const party = buildPartyShopping(plan, cat, d.sel)
for (const i of party.items) if (i.link) ok(tagsOf(i.link.href)[0] === tag, `party item ${i.id} tagged`)
const crown = shoppingForItem(plan, cat, 'activity', 'flower-crown-studio')
const queries = crown.required.map((i) => new URL(i.link.href).searchParams.get('k') || '').join(' | ')
for (const word of ['flower', 'chenille', 'ribbon']) ok(queries.includes(word), `crown searches include "${word}"`)
ok(crown.kits.some((k) => k.id === 'flower-crown-kit'), 'crown suggests kit search')

console.log(`✓ ${n} link checks passed (tag: ${tag})`)
