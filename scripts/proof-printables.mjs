// Proof every Fairy Garden printable to a PDF with sample details.
//   npm run printables:proof -- [blush|lavender|sage] [old]
// Writes /tmp/whimavera-proof-<colour>.pdf (or ./proof-<colour>.pdf on Windows).
import { loadFonts } from '../src/printables/fonts.js'
import { nodeRead } from '../tests/node-read.mjs'
import { compose, slotsFor } from '../src/printables/compose.js'
import { loadArt } from '../src/printables/assets.js'
import { buildPdf } from '../src/printables/pdf.js'
import { PRODUCTS, instancesFor } from '../src/printables/products.js'
import col from '../src/printables/collections/fairyGarden.js'
import { formatDetails } from '../src/printables/details.js'
import fs from 'node:fs'
const fonts = await loadFonts(nodeRead)
const variant = process.argv[2] || 'blush'
const young = process.argv[3] !== 'old'
const det = formatDetails({ childName: 'Olivia', age: young ? '6' : '9', date: '2027-05-15', startTime: '14:00', venue: 'The Hapner backyard', address: '123 Meadow Lane, Broomfield', rsvpName: 'Krista', rsvpContact: '303-555-0101', rsvpBy: '2027-05-01' }, { duration: 120 })
const plan = { games: [{ id: 'flower-crown-studio', name: 'Flower Crown Studio', description: 'Little fairies twist pipe cleaners, faux blooms and ribbon into crowns to wear all party long.', time: '2:15 pm' }], food: [{ id: 'fairy-treats', name: 'Fairy Treats', recipe: { title: 'Fairy Treats' } }, { id: 'lemonade', name: 'Pink Fairy Lemonade' }] }
const sel = { food: ['fairy-treats'], activities: ['flower-crown-studio'] }
const jobs = []
for (const p of PRODUCTS) {
  const inst = instancesFor(p.id, { plan, sel, details: det, collection: col })
  const scenes = []
  for (const i of inst.slice(0, p.print.mode === 'sheet' ? 12 : 1)) {
    const data = { ...det, ...i }
    const art = {}
    for (const [slot, f] of slotsFor(col, p.id, data, variant)) art[slot] = await loadArt(f, nodeRead)
    const sc = compose({ collection: col, product: p, variantId: variant, data, fonts, art })
    if (sc.issues.length) console.log(p.id, sc.issues.map((x) => x.kind + ':' + x.message).join(' | '))
    scenes.push(sc)
  }
  jobs.push({ product: p, scenes, copies: p.print.mode === 'sheet' ? Math.min(12, p.print.cols * p.print.rows) : 1, title: p.name })
}
const bytes = await buildPdf(jobs, { paper: 'letter', bleed: false, cropMarks: true, fonts, meta: { title: 'Test' } })
const out = process.platform === 'win32' ? `proof-${variant}.pdf` : `/tmp/whimavera-proof-${variant}.pdf`
fs.writeFileSync(out, bytes)
console.log(`Wrote ${out}`)
