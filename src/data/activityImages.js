// Activity image mapping. Files in src/assets/activities/ named
// `<activity-id>.webp|jpg|png` are bundled and picked up automatically.
const files = import.meta.glob('../assets/activities/*.{webp,jpg,jpeg,png}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const byId = {}
for (const [path, url] of Object.entries(files)) {
  const id = path.split('/').pop().replace(/\.(webp|jpe?g|png)$/, '')
  // Prefer .webp when more than one format exists.
  if (!byId[id] || path.endsWith('.webp')) byId[id] = url
}

/** Descriptive alt text per activity image (used when the image exists). */
export const activityImageAlt = {
  'flower-crown-studio': 'Children’s flower crowns made from faux blooms and ribbon on a craft table',
  'fairy-treasure-hunt': 'Fairy gems and drawstring pouches hidden among garden flowers',
  'toadstool-cupcake-bar': 'Cupcakes decorated as red-and-white spotted toadstools',
  'fairy-potion-lab': 'Clear cups of blue butterfly-pea tea turning purple with lemon',
  'freeze-fairy': 'Children in fairy wings dancing on the lawn',
  'bug-bloom-safari': 'A child looking at a flower through a magnifying glass',
  'wish-jars': 'Small jars layered with pastel sand and rolled wish scrolls',
  'musical-toadstools': 'Toadstool mats arranged in a circle on the grass',
  'fairy-storytime': 'Children on blankets listening to a story in the garden',
}

export const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const activityImageUrl = (id) => byId[id] || null
