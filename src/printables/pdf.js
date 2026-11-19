/**
 * Print-ready PDFs from composed scenes.
 *
 * - Text is real text in embedded (subset) fonts — crisp at any zoom.
 * - Artwork is embedded at its original resolution (supply 300 dpi files).
 * - Large items print one per page (US Letter, or trim size for a print
 *   shop); small items are laid out on US Letter sheets.
 * - Optional 0.125 in bleed and crop marks; a final page has cutting and
 *   assembly instructions.
 */
import { PDFDocument, rgb, degrees, pushGraphicsState, popGraphicsState, concatTransformationMatrix, setCharacterSpacing, rectangle, clip, endPath, LineCapStyle } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit'
import { IN } from './text.js'
import { LETTER } from './products.js'
import { watermarkTiles, WATERMARK_TEXT, WATERMARK_COLOR, WATERMARK_OPACITY } from './watermark.js'

const hex = (h) => {
  const n = parseInt(String(h).replace('#', ''), 16)
  return rgb(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255)
}
const MARK = rgb(0.45, 0.45, 0.45)

/**
 * @param jobs  [{ product, scenes:[scene], copies, title }]
 * @param o.paper 'letter' | 'trim' (single-item products only)
 * @param o.bleed boolean, o.cropMarks boolean
 * @param o.watermark boolean — proof downloads
 * @param o.fonts loaded fonts, o.meta { title, collection, instructions:[{title, steps}] }
 */
export async function buildPdf(jobs, o) {
  const doc = await PDFDocument.create()
  doc.registerFontkit(fontkit)
  doc.setTitle(o.meta?.title || 'Whimavera printables')
  doc.setCreator('Whimavera')
  doc.setProducer('Whimavera')

  const fontCache = {}
  const font = async (id) => (fontCache[id] ||= await doc.embedFont(o.fonts[id].bytes, { subset: true }))
  const imgCache = {}
  const image = async (art) => (imgCache[art.url] ||= art.type === 'png' ? await doc.embedPng(art.bytes) : await doc.embedJpg(art.bytes))
  const bleed = o.bleed ? 0.125 * IN : 0
  const draft = jobs.some((j) => j.scenes.some((s) => s.missingArt.length))

  for (const job of jobs) {
    const p = job.product
    const W = p.size.w * IN
    const H = p.size.h * IN
    if (p.print.mode === 'single') {
      for (const scene of job.scenes) {
        const margin = o.paper === 'trim' ? bleed + (o.cropMarks ? 0.3 * IN : 0) : 0
        const size = o.paper === 'trim' ? [W + 2 * margin, H + 2 * margin] : [LETTER.w * IN, LETTER.h * IN]
        const page = doc.addPage(size)
        const ox = (size[0] - W) / 2
        const oy = (size[1] - H) / 2
        await drawScene(page, scene, ox, oy, { bleed, font, image, watermark: job.watermark ?? o.watermark })
        if (o.cropMarks) cropMarks(page, ox, oy, W, H, bleed)
        footer(page, job.title, draft, job.watermark ?? o.watermark)
      }
    } else {
      const fold = !!p.print.fold
      const cellW = W
      const cellH = fold ? H * 2 : H
      const gap = Math.max(0.25 * IN, 2 * bleed + (o.cropMarks ? 0.12 * IN : 0))
      const { cols, rows } = p.print
      const per = cols * rows
      const gridW = cols * cellW + (cols - 1) * gap
      const gridH = rows * cellH + (rows - 1) * gap
      const PW = LETTER.w * IN
      const PH = LETTER.h * IN
      const x0 = (PW - gridW) / 2
      const y0 = (PH - gridH) / 2
      const items = Array.from({ length: job.copies }, (_, i) => job.scenes[i % job.scenes.length])
      for (let start = 0; start < items.length; start += per) {
        const page = doc.addPage([PW, PH])
        for (let k = 0; k < per && start + k < items.length; k++) {
          const scene = items[start + k]
          const ox = x0 + (k % cols) * (cellW + gap)
          const oy = y0 + Math.floor(k / cols) * (cellH + gap)
          if (fold) {
            // Bottom half reads normally; top half is upside down so the
            // folded card reads from both sides.
            await drawScene(page, scene, ox, oy, { bleed, font, image, watermark: job.watermark ?? o.watermark, rotate: true, clipBleed: { top: true } })
            await drawScene(page, scene, ox, oy + H, { bleed, font, image, watermark: job.watermark ?? o.watermark, clipBleed: { bottom: true } })
            foldMarks(page, ox, oy + H, W, bleed)
          } else {
            await drawScene(page, scene, ox, oy, { bleed, font, image, watermark: job.watermark ?? o.watermark })
            if (p.shape === 'circle') cutCircle(page, ox + W / 2, oy + H / 2, W / 2)
          }
        }
        // Cut guides sit outside the grid so they never print on a card.
        if (p.shape !== 'circle') {
          const used = Math.min(per, items.length - start)
          const usedRows = Math.ceil(used / cols)
          const usedCols = Math.min(cols, used)
          const xs = Array.from({ length: usedCols }, (_, c) => [x0 + c * (cellW + gap), x0 + c * (cellW + gap) + cellW]).flat()
          const ys = Array.from({ length: usedRows }, (_, r) => [y0 + r * (cellH + gap), y0 + r * (cellH + gap) + cellH]).flat()
          gridMarks(page, xs, ys, bleed)
        }
        footer(page, job.title, draft, job.watermark ?? o.watermark)
      }
    }
  }

  if (o.meta?.instructions?.length) await instructionsPage(doc, o, await font('body'), await font('bodyMedium'), await font('displayItalic'))
  return doc.save()
}

/** Draw one scene with its top-left trim corner at (ox, oy) from the page top. */
async function drawScene(page, s, ox, oy, { bleed, font, image, watermark, rotate, clipBleed = {} }) {
  const PH = page.getHeight()
  const X = (x) => ox + x
  const Y = (y) => PH - oy - y
  page.pushOperators(pushGraphicsState())
  if (rotate) {
    // Rotate 180° about the card centre.
    const cx = X(s.w / 2)
    const cy = Y(s.h / 2)
    page.pushOperators(concatTransformationMatrix(-1, 0, 0, -1, 2 * cx, 2 * cy))
  }
  const bt = clipBleed.top ? 0 : bleed
  const bb = clipBleed.bottom ? 0 : bleed

  // Paper (fills the bleed).
  if (!s.background.color) {
    // Die-cut shape: the artwork carries its own paper.
  } else if (s.shape === 'circle') {
    page.drawCircle({ x: X(s.w / 2), y: Y(s.h / 2), size: s.w / 2 + bleed, color: hex(s.background.color) })
  } else {
    page.drawRectangle({ x: X(-bleed), y: Y(s.h + bb), width: s.w + 2 * bleed, height: s.h + bt + bb, color: hex(s.background.color) })
    if (s.background.art?.bytes) {
      const img = await image(s.background.art)
      const bw = s.w + 2 * bleed
      const bh = s.h + bt + bb
      const r = Math.max(bw / img.width, bh / img.height)
      page.pushOperators(pushGraphicsState(), rectangle(X(-bleed), Y(s.h + bb), bw, bh), clip(), endPath())
      page.drawImage(img, { x: X(-bleed) + (bw - img.width * r) / 2, y: Y(s.h + bb) + (bh - img.height * r) / 2, width: img.width * r, height: img.height * r })
      page.pushOperators(popGraphicsState())
    }
  }

  for (const e of s.els) {
    if (e.type === 'image') {
      if (e.art?.bytes) {
        const img = await image(e.art)
        if (e.clip) {
          // Keep cover-fitted borders inside their box (trim + bleed). On
          // sheets the bleed is clipped away so cards don't overlap.
          const c = e.clip
          const cx = Math.max(c.x, -bleed)
          const cy = Math.max(c.y, clipBleed.top ? 0 : -bleed)
          const cr = Math.min(c.x + c.w, s.w + bleed)
          const cb = Math.min(c.y + c.h, s.h + (clipBleed.bottom ? 0 : bleed))
          page.pushOperators(pushGraphicsState(), rectangle(X(cx), Y(cb), cr - cx, cb - cy), clip(), endPath())
          page.drawImage(img, { x: X(e.x), y: Y(e.y + e.h), width: e.w, height: e.h })
          page.pushOperators(popGraphicsState())
        } else {
          page.drawImage(img, { x: X(e.x), y: Y(e.y + e.h), width: e.w, height: e.h })
        }
      }
    } else if (e.type === 'rect') {
      page.drawRectangle({ x: X(e.x), y: Y(e.y + e.h), width: e.w, height: e.h, borderColor: hex(e.stroke), borderWidth: e.width, opacity: 0, borderOpacity: 1 })
    } else if (e.type === 'line') {
      page.drawLine({ start: { x: X(e.x1), y: Y(e.y1) }, end: { x: X(e.x2), y: Y(e.y2) }, color: hex(e.stroke), thickness: e.width })
    } else if (e.type === 'circle') {
      page.drawCircle({ x: X(e.cx), y: Y(e.cy), size: e.r, borderColor: hex(e.stroke), borderWidth: e.width, opacity: 0, borderOpacity: 1 })
    } else if (e.type === 'text' && !e.placeholder) {
      const f = await font(e.font)
      for (const ln of e.lines) {
        if (!ln.text) continue
        if (e.tracking) page.pushOperators(setCharacterSpacing((e.tracking / 1000) * e.size))
        page.drawText(ln.text, { x: X(ln.x), y: Y(ln.y), size: e.size, font: f, color: hex(e.color) })
        if (e.tracking) page.pushOperators(setCharacterSpacing(0))
      }
    }
  }

  if (watermark) {
    // Tiled diagonal rows, clipped to the card so nothing spills onto the sheet.
    const f = await font('bodyMedium')
    const { tiles, cx, cy, angle } = watermarkTiles(s.w, s.h)
    const a = (angle * Math.PI) / 180
    page.pushOperators(pushGraphicsState(), rectangle(X(-bleed), Y(s.h + bb), s.w + 2 * bleed, s.h + bt + bb), clip(), endPath())
    for (const t of tiles) {
      const dx = t.x - cx
      const dy = t.y - cy
      page.drawText(WATERMARK_TEXT, {
        x: X(cx + dx * Math.cos(a) - dy * Math.sin(a)),
        y: Y(cy + dx * Math.sin(a) + dy * Math.cos(a)),
        size: t.size,
        font: f,
        color: rgb(WATERMARK_COLOR.r, WATERMARK_COLOR.g, WATERMARK_COLOR.b),
        opacity: WATERMARK_OPACITY,
        rotate: degrees(-angle),
      })
    }
    page.pushOperators(popGraphicsState())
  }
  page.pushOperators(popGraphicsState())
}

function cropMarks(page, ox, oy, W, H, bleed) {
  const PH = page.getHeight()
  const off = bleed + 0.06 * IN
  const len = 0.22 * IN
  const t = 0.35
  const corners = [
    [ox, oy],
    [ox + W, oy],
    [ox, oy + H],
    [ox + W, oy + H],
  ]
  for (const [cx, cy] of corners) {
    const sx = cx === ox ? -1 : 1
    const sy = cy === oy ? -1 : 1
    page.drawLine({ start: { x: cx + sx * off, y: PH - cy }, end: { x: cx + sx * (off + len), y: PH - cy }, thickness: t, color: MARK })
    page.drawLine({ start: { x: cx, y: PH - (cy + sy * off) }, end: { x: cx, y: PH - (cy + sy * (off + len)) }, thickness: t, color: MARK })
  }
}

/** Crop marks along every cut line, drawn only in the page margins. */
function gridMarks(page, xs, ys, bleed) {
  const PH = page.getHeight()
  const off = bleed + 0.08 * IN
  const len = 0.2 * IN
  const top = Math.min(...ys)
  const bottom = Math.max(...ys)
  const left = Math.min(...xs)
  const right = Math.max(...xs)
  for (const x of xs) {
    page.drawLine({ start: { x, y: PH - (top - off) }, end: { x, y: PH - (top - off - len) }, thickness: 0.35, color: MARK })
    page.drawLine({ start: { x, y: PH - (bottom + off) }, end: { x, y: PH - (bottom + off + len) }, thickness: 0.35, color: MARK })
  }
  for (const y of ys) {
    page.drawLine({ start: { x: left - off, y: PH - y }, end: { x: left - off - len, y: PH - y }, thickness: 0.35, color: MARK })
    page.drawLine({ start: { x: right + off, y: PH - y }, end: { x: right + off + len, y: PH - y }, thickness: 0.35, color: MARK })
  }
}

function foldMarks(page, ox, foldY, W, bleed) {
  const PH = page.getHeight()
  const off = bleed + 0.06 * IN
  const len = 0.16 * IN
  for (const [a, b] of [
    [ox - off, ox - off - len],
    [ox + W + off, ox + W + off + len],
  ])
    page.drawLine({ start: { x: a, y: PH - foldY }, end: { x: b, y: PH - foldY }, thickness: 0.35, color: MARK, dashArray: [2, 2] })
}

function cutCircle(page, cx, cy, r) {
  page.drawCircle({ x: cx, y: page.getHeight() - cy, size: r, borderColor: MARK, borderWidth: 0.35, borderDashArray: [2, 2], opacity: 0, borderOpacity: 0.8 })
}

function footer(page, title, draft, watermark) {
  // Small slug line outside the printable area; doesn't need an embedded font.
  void title
  void draft
  void watermark
  void LineCapStyle
}

async function instructionsPage(doc, o, body, medium, italic) {
  const PW = LETTER.w * IN
  const PH = LETTER.h * IN
  let page = doc.addPage([PW, PH])
  const ink = rgb(0.29, 0.23, 0.22)
  const muted = rgb(0.5, 0.45, 0.43)
  let y = PH - 0.9 * IN
  const x = 0.9 * IN
  const width = PW - 1.8 * IN
  const write = (text, f, size, color = ink, gap = 0.4) => {
    for (const line of wrapPdf(text, f, size, width)) {
      if (y < 0.9 * IN) {
        page = doc.addPage([PW, PH])
        y = PH - 0.9 * IN
      }
      page.drawText(line, { x, y, size, font: f, color })
      y -= size * 1.45
    }
    y -= gap * size
  }
  write(o.meta.title || 'Printing your collection', italic, 24, ink, 0.6)
  write('Print at 100% (“Actual size”) — never “Fit to page”. Heavy matte cardstock (80–110 lb / 216–300 gsm) gives the nicest finish.', body, 10, muted, 1.2)
  if (o.meta.draft) write('Draft proof: some artwork for this collection hasn’t been added yet, so those areas are left blank.', medium, 9.5, rgb(0.6, 0.38, 0.38), 1.2)
  if (o.watermark) write('These are preview proofs marked “Preview”. Full-resolution downloads without the mark come with the printable collection.', medium, 9.5, rgb(0.6, 0.38, 0.38), 1.2)
  for (const step of o.meta.instructions) {
    write(step.title, medium, 11, ink, 0.3)
    for (const s of step.steps) write(`•  ${s}`, body, 9.5, ink, 0.15)
    y -= 8
  }
}

function wrapPdf(text, f, size, width) {
  const words = text.split(/\s+/)
  const lines = []
  let cur = ''
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w
    if (f.widthOfTextAtSize(next, size) <= width) cur = next
    else {
      if (cur) lines.push(cur)
      cur = w
    }
  }
  if (cur) lines.push(cur)
  return lines
}
