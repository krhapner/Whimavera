// Stock photography (Unsplash, free under the Unsplash License).
// Images are hot-linked by photo id; if one can't load (offline, or a host that
// blocks remote images), <Scene> falls back to its illustrated version automatically.
// Run `npm run photos` to download them into the project so they're bundled.

import { photos, ownPhotos } from './photoList.js'
export { photos, ownPhotos }

// Photos downloaded by `npm run photos` live in src/assets/photos/<key>.jpg and
// are bundled by Vite. Anything not downloaded is hot-linked from Unsplash instead.
const local = import.meta.glob('../assets/photos/*.jpg', { eager: true, query: '?url', import: 'default' })

export const photoUrl = (key, w = 1200) => {
  const bundled = local[`../assets/photos/${key}.jpg`]
  if (bundled) return bundled
  const p = photos[key]
  return p ? `https://unsplash.com/photos/${p.id}/download?w=${w}` : null
}
