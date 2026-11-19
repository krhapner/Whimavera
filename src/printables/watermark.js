/**
 * The "Preview" watermark for unpurchased designs. One layout, used by the
 * on-screen preview (SVG), image export (PNG) and proof PDFs, so a screenshot
 * or download carries the same mark. Diagonal rows tile the whole design so
 * it can't be cropped away.
 *
 * Units are the scene's points; the origin is top-left.
 */
export const WATERMARK_TEXT = 'WHIMAVERA · PREVIEW'
export const WATERMARK_ANGLE = -30 // degrees, rising left to right
export const WATERMARK_COLOR = { r: 0.42, g: 0.32, b: 0.32 }
export const WATERMARK_OPACITY = 0.2

/** Rows of watermark text covering a w × h scene (before rotation about its center). */
export function watermarkTiles(w, h) {
  const size = Math.max(7, Math.min(w, h) / 13)
  const diag = Math.hypot(w, h)
  const stepY = size * 3.2
  const stepX = size * WATERMARK_TEXT.length * 0.78
  const tiles = []
  let row = 0
  for (let y = -diag / 2; y <= diag / 2; y += stepY, row++) {
    const offset = (row % 2) * (stepX / 2)
    for (let x = -diag / 2 - stepX + offset; x <= diag / 2; x += stepX) tiles.push({ x: w / 2 + x, y: h / 2 + y, size })
  }
  return { tiles, size, cx: w / 2, cy: h / 2, angle: WATERMARK_ANGLE }
}
