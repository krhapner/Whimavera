// Menu image mapping: src/assets/menu/<item-id>.webp|jpg|png are bundled
// and picked up automatically. Missing images fall back to illustrations.
const files = import.meta.glob('../assets/menu/*.{webp,jpg,jpeg,png}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const byId = {}
for (const [path, url] of Object.entries(files)) {
  const id = path.split('/').pop().replace(/\.(webp|jpe?g|png)$/, '')
  if (!byId[id] || path.endsWith('.webp')) byId[id] = url
}

export const menuImageAlt = {
  'toadstool-cupcakes': 'Cupcakes with domed red frosting and white candy spots, like toadstools, on a white cake stand',
  'fairy-treats': 'Crispy rice marshmallow treats with pink, lavender and white drizzle and pastel sprinkles on a pink scalloped platter',
  'rainbow-fruit-wands': 'Fruit skewers with melon stars, strawberries, blueberries and grapes, tied with pastel ribbon',
  'garden-veggie-cups': 'Clear cups of hummus with carrot, cucumber and snap pea sticks standing upright on a wooden tray',
  'honey-pinwheel-sandwiches': 'Tortilla pinwheel sandwiches arranged in a ring on a cream platter',
  'petal-pink-lemonade': 'Pitchers of pink and pastel lemonade with edible flowers and lemon slices',
  'fairy-cake': 'A semi-naked layered vanilla cake decorated with pressed edible flowers, toadstools and pastel candles',
}

export const menuImageUrl = (id) => byId[id] || null
