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
  'galaxy-cupcakes': 'Cupcakes with swirled navy and lilac frosting, gold star sprinkles and moon and star toppers on a cake stand',
  'star-sandwiches': 'Star-shaped ham and cheese and jam sandwiches on a pale blue platter with gold confetti stars',
  'crescent-moon-crackers': 'Crescent-moon cheese slices, tiny cheese stars and round crackers on a little wooden board',
  'shooting-star-fruit-wands': 'Skewers of star-cut melon, strawberries and blueberries on a pale blue plate',
  'rocket-veggie-cups': 'Clear cups of dip with carrot and cucumber sticks, each wrapped in a paper rocket',
  'twinkle-lemonade': 'Glasses of sparkling lemonade with lemon slices, ice and pale blue star stirrers',
  'sea-cake': 'A seafoam ombré cake with white-chocolate shells, sugar pearls, coral starfish and seahorse and fish toppers',
  'sea-foam-lemonade': 'Cups of lemonade with seafoam-blue ice cubes, lemon slices and striped straws',
  'seaweed-veggie-cups': 'Clear cups of ranch with cucumber ribbons, snap peas and carrot sticks, labeled with fish and starfish stickers',
  'pearl-fruit-cups': 'Clear cups of melon balls, green grapes and blueberries with paper shells on a sandy board',
  'sea-star-sandwiches': 'Star-shaped jam and turkey and cheese sandwiches on a seafoam plate with smiling paper starfish',
  'goldfish-cracker-cups': 'Fish-shaped crackers in coral, seafoam and teal paper cups decorated with paper fish and waves on a wooden tray',
  'jellyfish-cupcakes': 'Cupcakes with fluffy pastel seafoam, coral and aqua frosting, candy eyes and sour-strip tentacles on a cream platter',
  'starry-cake': 'A navy buttercream cake with lilac clouds, gold stars, cream rosettes and a sleepy moon topper',
}

export const menuImageUrl = (id) => byId[id] || null
