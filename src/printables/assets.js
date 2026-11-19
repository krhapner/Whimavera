/**
 * Artwork files, discovered automatically. Drop files into
 *   src/assets/printables/<collection-id>/<slot>.png        (all variants)
 *   src/assets/printables/<collection-id>/<slot>--<variant>.png  (one variant)
 * PNG or JPG only (PDFs embed them as-is, so supply 300 dpi artwork).
 */
const files = import.meta.glob('../assets/printables/*/*.{png,jpg,jpeg}', { eager: true, query: '?url', import: 'default' })

const byCollection = {}
for (const [path, url] of Object.entries(files)) {
  const m = path.match(/printables\/([^/]+)\/([^/.]+?)(?:--([a-z0-9-]+))?\.(png|jpe?g)$/i)
  if (!m) continue
  const [, collection, slot, variant, ext] = m
  const c = (byCollection[collection] ||= {})
  const s = (c[slot] ||= {})
  s[variant || 'default'] = { url, type: ext.toLowerCase() === 'png' ? 'png' : 'jpg' }
}

/** File for a slot in a colour variant, or null when not supplied yet. */
export function artFile(collectionId, slot, variantId) {
  const s = byCollection[collectionId]?.[slot]
  return (s && (s[variantId] || s.default)) || null
}

/** Which slots of a collection have artwork. */
export function artStatus(collection) {
  const slots = Object.keys(collection.art)
  const supplied = slots.filter((slot) => byCollection[collection.id]?.[slot])
  return { slots, supplied, missing: slots.filter((s) => !supplied.includes(s)) }
}

/** Load pixel sizes (and bytes, for PDFs) of the artwork a scene uses. */
const cache = new Map()
export function loadArt(file, readBytes = (u) => fetch(u).then((r) => r.arrayBuffer())) {
  if (!file) return Promise.resolve(null)
  if (!cache.has(file.url)) {
    cache.set(
      file.url,
      Promise.resolve(readBytes(file.url)).then((buf) => {
        const bytes = new Uint8Array(buf)
        return { ...file, bytes, ...imageSize(bytes, file.type) }
      }),
    )
  }
  return cache.get(file.url)
}

// Read width/height from PNG or JPEG headers (works without a DOM).
export function imageSize(b, type) {
  if (type === 'png' || (b[0] === 0x89 && b[1] === 0x50)) {
    const v = new DataView(b.buffer, b.byteOffset)
    return { w: v.getUint32(16), h: v.getUint32(20) }
  }
  let i = 2
  while (i < b.length) {
    if (b[i] !== 0xff) return { w: 0, h: 0 }
    const marker = b[i + 1]
    const len = (b[i + 2] << 8) + b[i + 3]
    if (marker >= 0xc0 && marker <= 0xc3) return { h: (b[i + 5] << 8) + b[i + 6], w: (b[i + 7] << 8) + b[i + 8] }
    i += 2 + len
  }
  return { w: 0, h: 0 }
}
