/**
 * compose() turns a collection layout + party details into a "scene": a
 * flat list of positioned elements in points that every renderer (SVG
 * preview, PDF, PNG) draws the same way.
 *
 * Artwork is fitted with "contain" — never stretched or cropped. Text is
 * real text, fitted into its box; anything that can't fit is reported as
 * an issue instead of being drawn over the artwork.
 */
import { IN, fitText, missingGlyphs } from './text.js'
import { artFile } from './assets.js'

const pt = (n) => n * IN

// "cover" is only for full-bleed borders designed for the card's shape: it
// fills the box keeping proportions, trimming a sliver off one side.
function coverBox([x, y, w, h], art) {
  if (!art?.w || !art?.h) return { x, y, w, h }
  const r = Math.max(w / art.w, h / art.h)
  const dw = art.w * r
  const dh = art.h * r
  return { x: x + (w - dw) / 2, y: y + (h - dh) / 2, w: dw, h: dh }
}

function containBox([x, y, w, h], art) {
  if (!art?.w || !art?.h) return { x, y, w, h }
  const r = Math.min(w / art.w, h / art.h)
  const dw = art.w * r
  const dh = art.h * r
  return { x: x + (w - dw) / 2, y: y + (h - dh) / 2, w: dw, h: dh }
}

/**
 * @param o.collection  collection definition
 * @param o.product     product definition (size)
 * @param o.variantId   colour variation
 * @param o.data        formatted details + instance fields (item, index, …)
 * @param o.fonts       loaded fonts (fonts.js)
 * @param o.art         { [slot]: loaded art {url,bytes,w,h} } for supplied slots
 * @param o.overrides   { [textKey]: string } edited wording
 */
export function compose({ collection, product, variantId, data, fonts, art = {}, overrides = {} }) {
  const variant = collection.variants.find((v) => v.id === variantId) || collection.variants[0]
  const C = variant.colors
  const raw = collection.layouts[product.id]
  const layout = typeof raw === 'function' ? raw(data) : raw
  const W = pt(product.size.w)
  const H = pt(product.size.h)
  const els = []
  const issues = []
  const fields = []
  const usedSlots = []

  // Paper: texture if supplied (a background may fill the bleed), else colour.
  const paperFile = artFile(collection.id, 'paper', variant.id)
  const bare = layout.noPaperWithArt && artFile(collection.id, layout.noPaperWithArt, variant.id)
  const background = { color: bare ? null : C.paper, art: paperFile && !bare ? art.paper || null : null, slot: paperFile ? 'paper' : null }
  if (paperFile) usedSlots.push('paper')

  for (const a of layout.art || []) {
    const file = artFile(collection.id, a.slot, variant.id)
    const loaded = file ? art[a.slot] : null
    const area = a.box.map(pt)
    const box = a.fit === 'cover' ? coverBox(area, loaded) : containBox(area, loaded)
    usedSlots.push(a.slot)
    const clipTo = a.fit === 'cover' ? { x: area[0], y: area[1], w: area[2], h: area[3] } : null
    const el = { type: 'image', slot: a.slot, label: collection.art[a.slot]?.label || a.slot, ...box, clip: clipTo, area: { x: area[0], y: area[1], w: area[2], h: area[3] }, file, art: loaded, missing: !file }
    if (loaded?.w) {
      el.dpi = Math.round(loaded.w / (box.w / IN))
      if (el.dpi < 240) issues.push({ kind: 'low-dpi', key: a.slot, message: `${el.label} artwork is ${el.dpi} dpi here — supply a larger file for crisp printing.` })
    }
    els.push(el)
  }

  const hasArt = (slot) => !!artFile(collection.id, slot, variant.id)
  for (const sh of layout.shapes || []) {
    if (sh.unlessArt && hasArt(sh.unlessArt)) continue
    const color = C[sh.color] || sh.color
    if (sh.type === 'frame') {
      const i = pt(sh.inset)
      els.push({ type: 'rect', x: i, y: i, w: W - 2 * i, h: H - 2 * i, stroke: color, width: sh.width || 0.5 })
      if (sh.gap) {
        const j = i + pt(sh.gap)
        els.push({ type: 'rect', x: j, y: j, w: W - 2 * j, h: H - 2 * j, stroke: color, width: (sh.width || 0.5) * 0.6 })
      }
    } else if (sh.type === 'line') {
      els.push({ type: 'line', x1: pt(sh.x1), y1: pt(sh.y1), x2: pt(sh.x2), y2: pt(sh.y2), stroke: color, width: sh.width || 0.5 })
    } else if (sh.type === 'circle' || sh.type === 'hole') {
      els.push({ type: 'circle', cx: pt(sh.cx), cy: pt(sh.cy), r: pt(sh.r), stroke: color, width: sh.width || 0.5, hole: sh.type === 'hole' })
    }
  }

  for (const stack of layout.stacks || []) {
    if (!stack) continue
    const [bx, by, bw, bh] = stack.box.map(pt)
    // Resolve text first; missing optional lines are simply left out.
    const items = []
    for (const it of stack.items) {
      if (it.divider) {
        items.push({ divider: pt(it.divider), gap: pt(it.gap || 0) })
        continue
      }
      const auto = it.text ? it.text(data) : null
      const has = Object.prototype.hasOwnProperty.call(overrides, it.key)
      const value = has ? overrides[it.key] : auto
      fields.push({ key: it.key, label: it.label, value: value ?? '', auto: auto ?? '', edited: has, field: it.field, required: it.required, maxLength: it.style.maxLines > 2 ? 280 : 90 })
      const text = typeof value === 'string' ? value.trim() : value
      if (!text) {
        if (it.required) {
          issues.push({ kind: 'missing', key: it.key, field: it.field, message: `Add ${it.label.toLowerCase()}` })
          if (it.placeholder) items.push({ it, text: it.placeholder, placeholder: true, gap: pt(it.gap || 0) })
        }
        continue
      }
      items.push({ it, text, gap: pt(it.gap || 0) })
    }
    // Drop a divider that ends up first or last.
    while (items[0]?.divider) items.shift()
    while (items.length && items[items.length - 1].divider) items.pop()
    if (!items.length) continue

    // Fit everything; if the stack is too tall, scale sizes down together.
    let fitted
    let total = 0
    for (let k = 1; k >= 0.55; k -= 0.05) {
      fitted = items.map((x) => (x.divider ? x : { ...x, fit: fitText(fonts[x.it.style.font], x.text, x.it.style, bw - 2 * pt(x.it.pad || 0), { scale: k }) }))
      total = fitted.reduce((h, x, i) => h + (i ? x.gap : 0) + (x.divider ? 1 : x.fit.height), 0)
      if (total <= bh + 0.5) break
    }
    const valign = stack.valign || 'center'
    let y = valign === 'top' ? by : by + Math.max(0, (bh - total) / 2)
    fitted.forEach((x, i) => {
      if (i) y += x.gap
      if (x.divider) {
        const cx = bx + bw / 2
        els.push({ type: 'line', x1: cx - x.divider / 2, y1: y, x2: cx + x.divider / 2, y2: y, stroke: C.rule, width: 0.6 })
        y += 1
        return
      }
      const st = x.it.style
      const font = fonts[st.font]
      const fk = font.fk
      const asc = fk.ascent / fk.unitsPerEm
      const desc = fk.descent / fk.unitsPerEm
      const align = stack.align || 'center'
      const lines = x.fit.lines.map((ln, n) => {
        const top = y + n * x.fit.lineHeight
        const baseline = top + x.fit.lineHeight / 2 + ((asc + desc) / 2) * x.fit.size
        const lx = align === 'left' ? bx : align === 'right' ? bx + bw - ln.width : bx + (bw - ln.width) / 2
        return { text: ln.text, x: lx, y: baseline, width: ln.width }
      })
      els.push({
        type: 'text',
        key: x.it.key,
        font: st.font,
        family: font.family,
        size: x.fit.size,
        tracking: x.fit.tracking,
        color: x.placeholder ? C.muted : C[st.color] || C.ink,
        placeholder: !!x.placeholder,
        lines,
        box: { x: bx, y, w: bw, h: x.fit.height },
      })
      if (x.fit.overflow) issues.push({ kind: 'overflow', key: x.it.key, message: `${x.it.label} is too long to fit beautifully — please shorten it.` })
      const missing = missingGlyphs(font, x.text)
      if (missing.length) issues.push({ kind: 'glyph', key: x.it.key, message: `${x.it.label}: “${missing.join(' ')}” can’t be printed in this font.` })
      y += x.fit.height
    })
    if (total > bh + 0.5) issues.push({ kind: 'overflow', key: stack.items[0]?.key, message: 'There’s more wording than fits — please shorten some lines.' })
  }

  return {
    product: product.id,
    variant: variant.id,
    w: W,
    h: H,
    bleed: pt(0.125),
    shape: product.shape || 'rect',
    background,
    els,
    issues,
    fields,
    usedSlots,
    missingArt: usedSlots.filter((s) => s !== 'paper' && !hasArt(s)),
  }
}

/** Artwork files a layout needs, for preloading. */
export function slotsFor(collection, productId, data, variantId) {
  const raw = collection.layouts[productId]
  const layout = typeof raw === 'function' ? raw(data) : raw
  const slots = ['paper', ...(layout.art || []).map((a) => a.slot)]
  return slots.map((slot) => [slot, artFile(collection.id, slot, variantId)]).filter(([, f]) => f)
}
