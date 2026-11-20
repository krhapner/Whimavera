/**
 * Prerender the public pages after `vite build`:
 *   1. vite build                      → dist/ (the app)
 *   2. vite build --ssr src/entry-server.jsx --outDir dist-ssr
 *   3. node scripts/prerender.mjs      → this file
 *
 * Writes static HTML for the home page, /themes/, every theme page, the
 * planning guide and 404.html, each with its own title, description,
 * canonical URL, social tags and structured data; then sitemap.xml and
 * robots.txt. Theme and guide pages ship without the planner's JavaScript,
 * so they're fast; the home page keeps it and the app takes over on load.
 */
import { readFile, writeFile, mkdir, access } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const { render } = await import(pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href)
const { SITE } = await import(pathToFileURL(join(root, 'src', 'config', 'site.js')).href)

const exists = (p) => access(p).then(() => true, () => false)
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// ---------- image dimensions (prevents layout shift) ----------

function imageSize(buf) {
  // PNG
  if (buf.readUInt32BE(0) === 0x89504e47) return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) }
  // WebP
  if (buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
    const kind = buf.toString('ascii', 12, 16)
    if (kind === 'VP8X') return { width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) }
    if (kind === 'VP8 ') return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff }
    if (kind === 'VP8L') {
      const b = buf.readUInt32LE(21)
      return { width: (b & 0x3fff) + 1, height: ((b >> 14) & 0x3fff) + 1 }
    }
  }
  // JPEG: walk segments to a start-of-frame marker
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2
    while (i < buf.length) {
      if (buf[i] !== 0xff) return null
      const marker = buf[i + 1]
      const len = buf.readUInt16BE(i + 2)
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) return { width: buf.readUInt16BE(i + 7), height: buf.readUInt16BE(i + 5) }
      i += 2 + len
    }
  }
  return null
}

const sizes = new Map()
async function sizeOf(src) {
  if (!src.startsWith('/') || src.startsWith('//')) return null
  if (!sizes.has(src)) {
    const file = join(dist, decodeURIComponent(src.split('?')[0]))
    sizes.set(src, (await exists(file)) ? imageSize(await readFile(file)) : null)
  }
  return sizes.get(src)
}

async function addImageSizes(html) {
  const tags = [...new Set(html.match(/<img\b[^>]*>/g) || [])]
  for (const tag of tags) {
    if (/\swidth=/.test(tag)) continue
    const src = tag.match(/\ssrc="([^"]+)"/)?.[1]
    const size = src && (await sizeOf(src))
    if (size) html = html.split(tag).join(tag.replace('<img', `<img width="${size.width}" height="${size.height}"`))
  }
  return html
}

// ---------- head ----------

async function headTags(h) {
  const ogFile = h.image?.startsWith(SITE.url) ? join(dist, h.image.slice(SITE.url.length)) : null
  const image = ogFile && !(await exists(ogFile)) ? null : h.image
  const tags = [
    `<title>${esc(h.title)}</title>`,
    `<meta name="description" content="${esc(h.description)}" />`,
    h.noindex ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${esc(h.canonical)}" />`,
    `<meta property="og:site_name" content="${esc(SITE.name)}" />`,
    `<meta property="og:locale" content="${SITE.locale}" />`,
    `<meta property="og:type" content="${h.type}" />`,
    `<meta property="og:title" content="${esc(h.title)}" />`,
    `<meta property="og:description" content="${esc(h.description)}" />`,
    h.noindex ? '' : `<meta property="og:url" content="${esc(h.canonical)}" />`,
    image ? `<meta property="og:image" content="${esc(image)}" />` : '',
    image ? '<meta property="og:image:width" content="1200" />' : '',
    image ? '<meta property="og:image:height" content="630" />' : '',
    image && h.imageAlt ? `<meta property="og:image:alt" content="${esc(h.imageAlt)}" />` : '',
    `<meta name="twitter:card" content="${image ? 'summary_large_image' : 'summary'}" />`,
    SITE.gscVerification ? `<meta name="google-site-verification" content="${esc(SITE.gscVerification)}" />` : '',
    h.ld ? `<script type="application/ld+json">${JSON.stringify(h.ld).replace(/</g, '\\u003c')}</script>` : '',
  ]
  return tags.filter(Boolean).join('\n    ')
}

// Tiny script for the mobile menu on pages that ship without the app.
const MENU_SCRIPT = `<script>document.addEventListener('click',function(e){var b=e.target.closest('.menu-toggle');if(!b)return;var n=document.querySelector('.site-nav');var o=!n.classList.contains('is-open');n.classList.toggle('is-open',o);b.classList.toggle('is-open',o);b.setAttribute('aria-expanded',o)})</script>`

// ---------- write pages ----------

const template = await readFile(join(dist, 'index.html'), 'utf8')
const pages = render()

for (const page of pages) {
  let html = template
    .replace(/<title>[\s\S]*?<\/title>\s*/, '')
    .replace(/<meta name="description"[^>]*>\s*/, '')
    .replace('</head>', `    ${await headTags(page.head)}\n  </head>`)
  if (page.shell) {
    html = html.replace('<div id="root"></div>', `<div id="root">${page.body}</div>`)
  } else {
    // Static page: no planner bundle, just styles and the menu script.
    html = html
      .replace(/<script type="module"[^>]*><\/script>\s*/g, '')
      .replace(/<link rel="modulepreload"[^>]*>\s*/g, '')
      .replace('<div id="root"></div>', `${page.body}${MENU_SCRIPT}`)
  }
  html = await addImageSizes(html)
  const out = join(dist, page.file)
  await mkdir(dirname(out), { recursive: true })
  await writeFile(out, html)
  console.log(`  ${page.head.path.padEnd(52)} ${(html.length / 1024).toFixed(0)} kB`)
}

// ---------- sitemap & robots ----------

const urls = pages
  .filter((p) => !p.noSitemap && !p.head.noindex)
  .map((p) => `  <url>\n    <loc>${p.head.canonical}</loc>${p.lastmod ? `\n    <lastmod>${p.lastmod}</lastmod>` : ''}\n  </url>`)
await writeFile(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`)
await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`)
console.log(`✓ prerendered ${pages.length} pages, sitemap.xml (${urls.length} URLs), robots.txt`)
