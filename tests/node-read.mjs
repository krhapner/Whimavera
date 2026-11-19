// Read a Vite asset URL from disk (tests run without a browser).
import fs from 'node:fs'
import path from 'node:path'
const root = path.resolve(new URL('..', import.meta.url).pathname)
export function nodeRead(u) {
  let p = decodeURIComponent(String(u).split('?')[0]).replace(/^\/@fs/, '')
  if (!fs.existsSync(p)) p = path.join(root, p)
  return fs.readFileSync(p)
}
