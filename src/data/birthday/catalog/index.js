// Catalog metadata by theme: costs, space, ages, diet, dependencies and decor
// tiers. Themes without an entry still work: the engine treats unknown
// costs/space/diet as "no estimate" instead of inventing them.
import fairyGarden from './fairyGarden.js'
import underTheSea from './underTheSea.js'
import starryNight from './starryNight.js'
import woodlandTea from './woodlandTea.js'
import dinoDig from './dinoDig.js'
import rainbowPicnic from './rainbowPicnic.js'

export const catalogMetaByTheme = {
  'fairy-garden': fairyGarden,
  'under-the-sea': underTheSea,
  'starry-night': starryNight,
  'woodland-tea': woodlandTea,
  'dino-dig': dinoDig,
  'rainbow-picnic': rainbowPicnic,
}
