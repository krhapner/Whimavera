/**
 * Text measurement and fitting. All sizes in points (1 in = 72 pt).
 * Text is wrapped on word boundaries and shrunk step by step down to a
 * minimum size; if it still doesn't fit, the result is flagged `overflow`
 * so the editor can ask for shorter wording instead of printing it badly.
 */

export const IN = 72

const caseOf = (text, style) => (style.upper ? text.toUpperCase() : text)

/** Width of a single line at a size, including tracking (1/1000 em). */
export function measure(font, text, size, tracking = 0) {
  if (!text) return 0
  const run = font.fk.layout(text)
  const chars = [...text].length
  return (run.advanceWidth / font.fk.unitsPerEm) * size + (tracking / 1000) * size * Math.max(0, chars - 1)
}

/** Characters the font can't draw (shown as a gentle warning in the editor). */
export function missingGlyphs(font, text) {
  const out = new Set()
  for (const ch of text || '') {
    const cp = ch.codePointAt(0)
    if (cp > 32 && !font.fk.hasGlyphForCodePoint(cp)) out.add(ch)
  }
  return [...out]
}

function wrap(font, text, size, width, tracking) {
  const words = text.split(/\s+/).filter(Boolean)
  const lines = []
  let cur = ''
  let tooWide = false
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w
    if (measure(font, next, size, tracking) <= width) cur = next
    else {
      if (cur) lines.push(cur)
      cur = w
      if (measure(font, w, size, tracking) > width) tooWide = true
    }
  }
  if (cur) lines.push(cur)
  // Explicit line breaks are respected too.
  return { lines, tooWide }
}

/**
 * Fit text into `width`, at most `maxLines` lines, from style.size down to
 * style.min. Returns { size, lines:[{text,width}], height, overflow }.
 */
export function fitText(font, rawText, style, width, { scale = 1 } = {}) {
  const text = caseOf(String(rawText ?? ''), style)
  const tracking = style.tracking || 0
  const leading = style.leading || 1.2
  const max = Math.max(style.min || style.size, style.size * scale)
  const min = Math.min(style.min || style.size, max)
  const maxLines = style.maxLines || 1
  const paragraphs = text.split('\n')
  let best = null
  for (let size = max; size >= min - 0.001; size -= 0.25) {
    let lines = []
    let tooWide = false
    for (const p of paragraphs) {
      const r = wrap(font, p, size, width, tracking)
      lines = lines.concat(r.lines.length ? r.lines : [''])
      tooWide = tooWide || r.tooWide
    }
    best = { size, lines, overflow: tooWide || lines.length > maxLines }
    if (!best.overflow) break
  }
  const size = best.size
  return {
    size,
    lines: best.lines.map((t) => ({ text: t, width: measure(font, t, size, tracking) })),
    lineHeight: size * leading,
    height: best.lines.length * size * leading,
    overflow: best.overflow,
    tracking,
  }
}
