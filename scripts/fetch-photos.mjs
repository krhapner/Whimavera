// Downloads the stock photos listed in src/data/photoList.js into src/assets/photos/.
// Run once with internet access:  npm run photos
// Bundled photos then work everywhere — dev server, production build and the
// single-file preview (where remote images are blocked).
import { mkdir, writeFile, access } from 'node:fs/promises'
import { photos } from '../src/data/photoList.js'

const dir = new URL('../src/assets/photos/', import.meta.url)
await mkdir(dir, { recursive: true })
const force = process.argv.includes('--force')

for (const [key, p] of Object.entries(photos)) {
  const file = new URL(`${key}.jpg`, dir)
  if (!force) {
    try {
      await access(file)
      console.log(`✓ ${key} (already downloaded)`)
      continue
    } catch {}
  }
  const url = `https://unsplash.com/photos/${p.id}/download?w=1400&fm=jpg&q=72`
  try {
    const res = await fetch(url, { redirect: 'follow' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const buf = Buffer.from(await res.arrayBuffer())
    await writeFile(file, buf)
    console.log(`↓ ${key}  ${(buf.length / 1024).toFixed(0)} KB`)
  } catch (e) {
    console.warn(`✗ ${key}: ${e.message} — the app will fall back to its illustration`)
  }
}
console.log('\nDone. Restart `npm run dev` to see them. Please keep photographer credits in src/data/photoList.js.')
