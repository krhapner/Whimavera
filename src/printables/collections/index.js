/**
 * Stationery collections by theme. To add a theme: create
 * collections/<theme>.js exporting the same shape as fairyGarden.js, add
 * artwork under src/assets/printables/<collection-id>/, and register it here.
 */
import fairyGarden from './fairyGarden.js'

export const collections = { [fairyGarden.id]: fairyGarden }
export const collectionForTheme = (themeId) => Object.values(collections).find((c) => c.themeId === themeId) || null
