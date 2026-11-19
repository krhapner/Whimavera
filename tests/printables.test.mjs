// Run: npm run test:printables — engine checks for the Made to Match studio
import assert from 'node:assert/strict'
import { PDFDocument } from 'pdf-lib'
import { loadFonts } from '../src/printables/fonts.js'
import { nodeRead } from './node-read.mjs'
import { PRODUCTS, productById, instancesFor, copiesFor } from '../src/printables/products.js'
import col from '../src/printables/collections/fairyGarden.js'
import { formatDetails } from '../src/printables/details.js'
import { loadCollectionArt, studioContext, sceneFor, jobsFor, emptyStudio, instancesToUse } from '../src/printables/studio.js'
import { buildPdf } from '../src/printables/pdf.js'
import { artStatus } from '../src/printables/assets.js'
import { downloadLevel } from '../src/printables/entitlements.js'

let n = 0
const ok = (c, m) => { assert.ok(c, m); n++ }
const fonts = await loadFonts(nodeRead)
const artByUrl = await loadCollectionArt(col, nodeRead)

const plan = {
  guests: 12,
  games: [
    { id: 'flower-crown-studio', name: 'Flower Crown Studio', description: 'Twist pipe cleaners and blooms into crowns. More text.', time: '2:15 pm' },
    { id: 'fairy-treasure-hunt', name: 'Fairy Treasure Hunt', description: 'Follow picture clues to the treasure.', time: '2:45 pm' },
    { id: 'wish-jars', name: 'Wish Jars', description: 'Layer coloured sand.', time: '3:15 pm' },
  ],
  food: [
    { id: 'fairy-treats', name: 'Fairy Treats', recipe: { title: 'Fairy Treats' } },
    { id: 'lemonade', name: 'Pink Fairy Lemonade' },
    { id: 'pinwheels', name: 'Garden Pinwheels' },
  ],
}
const sel = { activities: ['flower-crown-studio', 'fairy-treasure-hunt'], food: ['fairy-treats', 'lemonade'] }
const full = { childName: 'Olivia', age: '6', date: '2027-05-15', startTime: '14:00', venue: 'The Hapner backyard', address: '123 Meadow Lane', rsvpName: 'Krista', rsvpContact: '303-555-0101', rsvpBy: '2027-05-01' }
const ctxFor = (details, extra = {}) => studioContext({ plan, sel, answers: { duration: 120, ageRange: '6-8' }, collection: col, studio: { ...emptyStudio(), details, ...extra }, fonts, artByUrl })
const textOf = (scene, key) => scene.els.find((e) => e.type === 'text' && e.key === key)

// Artwork mapped
const status = artStatus(col)
ok(status.missing.every((s) => s === 'paper'), `all artwork supplied except optional paper (missing: ${status.missing})`)

// Every product renders with full details, no issues, art present, nothing outside the card
const ctx = ctxFor(full)
for (const p of PRODUCTS) {
  for (const inst of instancesToUse(p.id, ctx, { all: true })) {
    const s = sceneFor(p.id, inst, ctx)
    ok(s.w === p.size.w * 72 && s.h === p.size.h * 72, `${p.id} scene is ${p.sizeLabel}`)
    ok(!s.issues.some((i) => ['overflow', 'missing', 'glyph'].includes(i.kind)), `${inst.key} has no text issues: ${JSON.stringify(s.issues.filter((i) => i.kind !== 'low-dpi'))}`)
    ok(s.missingArt.length === 0, `${inst.key} has all artwork`)
    for (const t of s.els.filter((e) => e.type === 'text'))
      for (const l of t.lines) ok(l.x >= 0 && l.x + l.width <= s.w + 0.5 && l.y <= s.h, `${inst.key}/${t.key} text inside card`)
    for (const im of s.els.filter((e) => e.type === 'image' && e.art)) {
      const r = im.w / im.h
      const ar = im.art.w / im.art.h
      ok(Math.abs(r - ar) / ar < 0.005, `${inst.key}/${im.slot} artwork keeps its proportions`)
    }
  }
}

// Personalization consistent across the collection
const inv = sceneFor('invitation', instancesFor('invitation', ctx)[0], ctx)
ok(textOf(inv, 'name').lines[0].text === 'Olivia', 'invitation name')
ok(textOf(inv, 'age').lines[0].text === 'turning six', 'age in words')
ok(textOf(inv, 'date').lines[0].text === 'Saturday, May 15', 'date formatted')
ok(textOf(inv, 'time').lines[0].text.includes('2 – 4'), 'end time from party length')
const sign = sceneFor('welcome-sign', instancesFor('welcome-sign', ctx)[0], ctx)
ok(textOf(sign, 'name').lines[0].text === 'Olivia’s', 'welcome sign possessive')
ok(textOf(sign, 'details').lines[0].text.startsWith('SIXTH BIRTHDAY'), 'ordinal on sign')
const thanks = sceneFor('thank-you', instancesFor('thank-you', ctx)[0], ctx)
ok(textOf(thanks, 'sign').lines[0].text === 'Love, Olivia', 'thank-you signed')

// Long names shrink and wrap, never overflow
for (const name of ['Maximiliana Alexandria Montgomery-Featherstone', 'Anastasia-Josephine Wolfeschlegelsteinhausen', 'Bartholomew']) {
  const c = ctxFor({ ...full, childName: name })
  for (const pid of ['invitation', 'welcome-sign', 'favor-tag', 'thank-you', 'cupcake-topper']) {
    const s = sceneFor(pid, instancesFor(pid, c)[0], c)
    const over = s.issues.filter((i) => i.kind === 'overflow')
    const t = s.els.find((e) => e.type === 'text' && /name|from|sign/.test(e.key))
    ok(t && t.lines.every((l) => l.x >= 0 && l.x + l.width <= s.w), `${pid} long name fits inside the card (${name})`)
    if (over.length) ok(over.every((i) => i.message.includes('shorten')), `${pid} asks to shorten (${name})`)
  }
}
const longInv = sceneFor('invitation', instancesFor('invitation', ctxFor({ ...full, childName: 'Maximiliana Alexandria Montgomery-Featherstone' }))[0], ctxFor({ ...full, childName: 'Maximiliana Alexandria Montgomery-Featherstone' }))
ok(textOf(longInv, 'name').size < 58 && textOf(longInv, 'name').lines.length === 2, 'long invitation name shrinks onto two lines')

// Missing details: nothing invented; required name prompts; optional lines dropped
const empty = ctxFor({})
const e1 = sceneFor('invitation', instancesFor('invitation', empty)[0], empty)
ok(e1.issues.some((i) => i.kind === 'missing' && i.key === 'name'), 'missing name reported')
ok(textOf(e1, 'name').placeholder, 'name placeholder shown only as preview')
ok(!textOf(e1, 'date') && !textOf(e1, 'venue') && !textOf(e1, 'age') && !textOf(e1, 'rsvp'), 'no invented date/place/age/rsvp')
const e2 = sceneFor('welcome-sign', instancesFor('welcome-sign', empty)[0], empty)
ok(!textOf(e2, 'details'), 'sign details line omitted when unknown')
ok(instancesFor('cupcake-topper', empty).every((i) => i.design !== 'age'), 'no age topper without an age')

// Ages: picture clues for young, rhymes for older
const young = ctxFor({ ...full, age: '4' })
const older = ctxFor({ ...full, age: '9' })
const cy = sceneFor('clue-card', instancesFor('clue-card', young)[0], young)
const co = sceneFor('clue-card', instancesFor('clue-card', older)[0], older)
ok(textOf(cy, 'clue').lines.join(' ').length < textOf(co, 'clue').lines.map((l) => l.text).join(' ').length, 'older children get longer rhyming clues')
ok(cy.els.find((e) => e.type === 'image').w > co.els.find((e) => e.type === 'image').w, 'younger children get bigger pictures')
ok(textOf(sceneFor('invitation', instancesFor('invitation', ctxFor({ ...full, age: '12' }))[0], ctxFor({ ...full, age: '12' })), 'age').lines[0].text === 'turning twelve', 'age twelve')

// Plan-aware content
ok(instancesToUse('station-sign', ctx).map((i) => i.item.id).join() === 'flower-crown-studio,fairy-treasure-hunt', 'station signs only for selected activities')
ok(instancesToUse('station-sign', ctx, { all: true }).length === 3, 'all station signs browsable')
ok(instancesToUse('food-tent', ctx).map((i) => i.item.id).join() === 'fairy-treats,lemonade', 'tent cards from chosen menu')
ok(copiesFor(productById['favor-tag'], 12, instancesFor('favor-tag', ctx)) === 14, 'favor tags for guests + spares')

// Text editing: overrides replace wording for one design only
const edited = ctxFor(full, { overrides: { 'invitation:main': { opening: 'Fairies, gather round' } } })
ok(textOf(sceneFor('invitation', instancesFor('invitation', edited)[0], edited), 'opening').lines[0].text === 'FAIRIES, GATHER ROUND', 'edited opening line (styled caps)')
const tooLong = ctxFor(full, { overrides: { 'invitation:main': { venue: 'The enchanted bottom-of-the-garden fairy glen behind the old oak tree near the creek and the blackberry bushes, past the little blue gate and the stepping stones, where the toadstools grow in a ring' } } })
ok(sceneFor('invitation', instancesFor('invitation', tooLong)[0], tooLong).issues.some((i) => i.kind === 'overflow'), 'too-long edit is flagged')
const emoji = ctxFor({ ...full, childName: 'Olivia 🦋' })
ok(sceneFor('invitation', instancesFor('invitation', emoji)[0], emoji).issues.some((i) => i.kind === 'glyph'), 'unprintable characters flagged')

// PDFs: page sizes, bleed, sheets, instructions
const pdfOf = async (ids, o) => PDFDocument.load(await buildPdf(jobsFor(ids, ctx), { fonts, cropMarks: true, meta: { title: 't', instructions: [{ title: 'x', steps: ['y'] }] }, ...o }))
const home = await pdfOf(['invitation'], { paper: 'letter' })
ok(home.getPages().every((p) => p.getWidth() === 612 && p.getHeight() === 792), 'home invitation on US Letter')
const shop = await pdfOf(['invitation'], { paper: 'trim', bleed: true })
const sp = shop.getPages()[0]
ok(Math.abs(sp.getWidth() - (5 + 0.25 + 0.6) * 72) < 0.01 && Math.abs(sp.getHeight() - (7 + 0.25 + 0.6) * 72) < 0.01, 'print-shop page = trim + bleed + mark slug')
const tb = sp.getTrimBox ? null : null
void tb
const tags = await pdfOf(['favor-tag'], { paper: 'letter' })
ok(tags.getPageCount() === 2 + 1, '14 favor tags = 2 sheets + instructions')
const toppers = await pdfOf(['cupcake-topper'], { paper: 'letter' })
ok(toppers.getPageCount() === 1 + 1, '12 toppers = 1 sheet of 12 + instructions')
const all = await pdfOf(PRODUCTS.map((p) => p.id), { paper: 'letter' })
ok(all.getPageCount() >= 8, `complete collection PDF has ${all.getPageCount()} pages`)
const raw = Buffer.from(await all.save({ useObjectStreams: false })).toString('latin1')
ok(/FontFile2|FontFile3|FontFile/.test(raw), 'fonts embedded')
ok((raw.match(/\/Subtype\s*\/Image/g) || []).length >= 10, 'artwork embedded as images')

// Entitlements
ok(downloadLevel(productById['favor-tag'], { unlocked: false, purchased: new Set() }) === 'full', 'favor tags are a free sample')
ok(downloadLevel(productById.invitation, { unlocked: false, purchased: new Set() }) === 'proof', 'premium invitation downloads as proof')
ok(downloadLevel(productById.invitation, { unlocked: false, purchased: new Set(['bundle']) }) === 'full', 'bundle purchase unlocks')

console.log(`✓ ${n} printables checks passed`)
