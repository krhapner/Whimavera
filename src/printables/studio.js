/**
 * Studio helpers — glue between the party plan, the parent's details and
 * edits, and the rendering engine. Pure apart from asset loading.
 *
 * Studio state (persisted per theme, separate from quiz answers and from the
 * collection design):
 *   { details, variant, overrides: { [instanceKey]: { [textKey]: string } },
 *     chosen: { [productId]: boolean }, showAll: { [productId]: boolean } }
 */
import { compose } from './compose.js'
import { artFile, loadArt } from './assets.js'
import { PRODUCTS, productById, instancesFor, copiesFor } from './products.js'
import { formatDetails, emptyDetails } from './details.js'
import { downloadLevel, getEntitlements } from './entitlements.js'
import { IN } from './text.js'

export const emptyStudio = () => ({ details: emptyDetails(), variant: null, overrides: {}, chosen: {}, showAll: {} })

/** Load every artwork file a collection has (all colours), keyed by url. */
export async function loadCollectionArt(collection, readBytes) {
  const urls = new Map()
  for (const slot of Object.keys(collection.art)) {
    for (const v of collection.variants) {
      const f = artFile(collection.id, slot, v.id)
      if (f) urls.set(f.url, f)
    }
  }
  const loaded = await Promise.all([...urls.values()].map((f) => loadArt(f, readBytes)))
  return Object.fromEntries(loaded.map((a) => [a.url, a]))
}

/** { slot: loadedArt } for one colour variant. */
export function artForVariant(collection, variantId, artByUrl) {
  const out = {}
  for (const slot of Object.keys(collection.art)) {
    const f = artFile(collection.id, slot, variantId)
    if (f && artByUrl[f.url]) out[slot] = artByUrl[f.url]
  }
  return out
}

/** Everything needed to render, derived once per change. */
export function studioContext({ plan, sel, answers, collection, studio, fonts, artByUrl }) {
  const details = formatDetails(studio.details, answers)
  const variantId = studio.variant || collection.variants[0].id
  return { plan, sel, details, collection, fonts, variantId, art: artForVariant(collection, variantId, artByUrl), overrides: studio.overrides, studio }
}

/** Instances of a product to show/print: the plan's, or all when browsing. */
export function instancesToUse(productId, ctx, { all = false } = {}) {
  const list = instancesFor(productId, ctx)
  const inPlan = list.filter((i) => i.inPlan)
  return all || ctx.studio.showAll[productId] || !inPlan.length ? list : inPlan
}

export function sceneFor(productId, instance, ctx) {
  const product = productById[productId]
  return compose({
    collection: ctx.collection,
    product,
    variantId: ctx.variantId,
    data: { ...ctx.details, ...instance },
    fonts: ctx.fonts,
    art: ctx.art,
    overrides: ctx.overrides[instance.key] || {},
  })
}

/** Print jobs for products; respects plan vs browse-all per product. */
export function jobsFor(productIds, ctx) {
  return productIds
    .map((id) => {
      const product = productById[id]
      const instances = instancesToUse(id, ctx)
      if (!instances.length) return null
      const scenes = instances.map((i) => sceneFor(id, i, ctx))
      return { product, scenes, copies: product.print.mode === 'sheet' ? copiesFor(product, ctx.plan.guests, instances) : scenes.length, title: product.name }
    })
    .filter(Boolean)
}

/** Issues the parent should fix before printing (missing / too long / glyphs). */
export function issuesFor(scenes) {
  const seen = new Set()
  const out = []
  for (const s of scenes)
    for (const i of s.issues) {
      if (i.kind === 'low-dpi') continue
      const k = `${i.kind}:${i.key}`
      if (!seen.has(k)) seen.add(k), out.push(i)
    }
  return out
}

/** Build a PDF for one product or the whole collection. */
export async function makePdf(productIds, ctx, { printShop = false } = {}) {
  const { buildPdf } = await import('./pdf.js') // loaded on first download
  const ent = getEntitlements()
  const jobs = jobsFor(productIds, ctx)
  const watermark = jobs.some((j) => downloadLevel(j.product, ent) === 'proof')
  const draft = jobs.some((j) => j.scenes.some((s) => s.missingArt.length))
  const bytes = await buildPdf(jobs, {
    paper: printShop ? 'trim' : 'letter',
    bleed: printShop,
    cropMarks: true,
    watermark,
    fonts: ctx.fonts,
    meta: {
      title: `${ctx.details.possessive || 'Your'} ${ctx.collection.name} printables`,
      draft,
      instructions: jobs.map((j) => ({ title: `${j.product.name} · ${j.product.sizeLabel}`, steps: j.product.instructions || [] })),
    },
  })
  return { bytes, watermark, jobs }
}

export function saveBlob(bytes, filename, type) {
  const blob = bytes instanceof Blob ? bytes : new Blob([bytes], { type })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 4000)
}

export const fileName = (ctx, what, ext) =>
  `${[ctx.details.name, ctx.collection.name, what].filter(Boolean).join(' ').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}.${ext}`

// ---------- PNG export (digital sharing) ----------

const b64 = (bytes) => {
  let s = ''
  const chunk = 0x8000
  for (let i = 0; i < bytes.length; i += chunk) s += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk))
  return btoa(s)
}

/**
 * Render a scene to a PNG at `dpi`. Fonts and artwork are embedded in a
 * standalone SVG so the canvas draws exactly what the preview shows.
 */
export async function sceneToPng(scene, fonts, { dpi = 300 } = {}) {
  const used = [...new Set(scene.els.filter((e) => e.type === 'text' && !e.placeholder).map((e) => e.font))]
  const faces = used.map((id) => `@font-face{font-family:'${fonts[id].family}';src:url(data:font/woff;base64,${b64(fonts[id].bytes)}) format('woff');}`).join('')
  const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const parts = scene.background.color ? [`<rect width="${scene.w}" height="${scene.h}" fill="${scene.background.color}"/>`] : []
  scene.els.forEach((e, i) => {
    if (e.type === 'image' && e.art?.bytes) {
      const href = `data:image/${e.art.type === 'png' ? 'png' : 'jpeg'};base64,${b64(e.art.bytes)}`
      const clip = e.clip ? ` clip-path="url(#c${i})"` : ''
      if (e.clip) parts.push(`<clipPath id="c${i}"><rect x="${e.clip.x}" y="${e.clip.y}" width="${e.clip.w}" height="${e.clip.h}"/></clipPath>`)
      parts.push(`<image href="${href}" x="${e.x}" y="${e.y}" width="${e.w}" height="${e.h}" preserveAspectRatio="none"${clip}/>`)
    } else if (e.type === 'rect') parts.push(`<rect x="${e.x}" y="${e.y}" width="${e.w}" height="${e.h}" fill="none" stroke="${e.stroke}" stroke-width="${e.width}"/>`)
    else if (e.type === 'line') parts.push(`<line x1="${e.x1}" y1="${e.y1}" x2="${e.x2}" y2="${e.y2}" stroke="${e.stroke}" stroke-width="${e.width}"/>`)
    else if (e.type === 'circle') parts.push(`<circle cx="${e.cx}" cy="${e.cy}" r="${e.r}" fill="none" stroke="${e.stroke}" stroke-width="${e.width}"/>`)
    else if (e.type === 'text' && !e.placeholder)
      for (const ln of e.lines)
        parts.push(`<text x="${ln.x}" y="${ln.y}" font-family="'${fonts[e.font].family}'" font-size="${e.size}" fill="${e.color}"${e.tracking ? ` letter-spacing="${(e.tracking / 1000) * e.size}"` : ''}>${esc(ln.text)}</text>`)
  })
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${scene.w}" height="${scene.h}" viewBox="0 0 ${scene.w} ${scene.h}"><style>${faces}</style>${parts.join('')}</svg>`
  const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }))
  try {
    const img = new Image()
    img.decoding = 'sync'
    await new Promise((res, rej) => {
      img.onload = res
      img.onerror = rej
      img.src = url
    })
    // Give embedded fonts a moment to apply inside the SVG image.
    await new Promise((r) => setTimeout(r, 60))
    const k = dpi / IN
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(scene.w * k)
    canvas.height = Math.round(scene.h * k)
    const g = canvas.getContext('2d')
    g.imageSmoothingQuality = 'high'
    g.drawImage(img, 0, 0, canvas.width, canvas.height)
    return await new Promise((res) => canvas.toBlob(res, 'image/png'))
  } finally {
    URL.revokeObjectURL(url)
  }
}

export { PRODUCTS, productById, downloadLevel, getEntitlements }
