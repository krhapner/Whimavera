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
  'flower-crown-studio': 'A flower crown station with finished crowns on cake stands, a tray of blooms and baskets of ribbon',
  'fairy-treasure-hunt': 'A basket of large fairy gems, drawstring pouches and picture clue cards on a garden bench',
  'toadstool-cupcake-bar': 'A cupcake decorating table with pink and red frosting, white candy spots and finished toadstool cupcakes',
  'fairy-potion-lab': 'Cups of blue butterfly-pea tea turning purple and pink beside lemon wedges and droppers',
  'freeze-fairy': 'A speaker and a basket of fairy wings and ribbon wands on the lawn by pastel balloons',
  'bug-bloom-safari': 'Pastel magnifying glasses, picture checklists and clipboards on a garden table',
  'wish-jars': 'Jars of pastel sand, confetti, funnels and wish scrolls on a craft table',
  'musical-toadstools': 'Red-and-white toadstool mats in a circle on the lawn',
  'fairy-storytime': 'Children in fairy wings on pastel cushions and blankets under a tree, with a basket of picture books',
}

export const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const activityImageUrl = (id) => byId[id] || null
