/**
 * Grocery pack sizes and typical costs for recipe ingredients, keyed by the
 * ingredient `key` used in recipes. Used to turn "2½ cups flour" into
 * "1 bag" with a cost, and to give each ingredient a clean Amazon search.
 *
 *   pack   [amount, unit] — one pack, in the same dimension the recipe uses
 *          (volume in tsp/tbsp/cup, weight in oz/lb, or the counted unit)
 *   label  what one pack is called ("bag", "carton", "bunch")
 *   est    typical cost per pack [low, high] in USD — a generic planning
 *          estimate, never a retailer price
 *   home   pantry staple most kitchens already have: listed and linked,
 *          left out of cost totals
 *   search optional Amazon search phrase (defaults to the ingredient name)
 */
export const GROCERY_PRICES = {
  // Baking
  'all-purpose-flour': { pack: [18, 'cup'], label: '5 lb bag', est: [3, 5], home: true, search: 'all purpose flour' },
  'baking-powder': { pack: [16, 'tbsp'], label: 'can', est: [2, 4], home: true },
  'granulated-sugar': { pack: [10, 'cup'], label: '4 lb bag', est: [3, 5], home: true, search: 'granulated sugar' },
  'powdered-sugar': { pack: [3.75, 'cup'], label: '1 lb bag', est: [2, 3], search: 'powdered sugar' },
  'vanilla-extract': { pack: [12, 'tsp'], label: '2 oz bottle', est: [4, 8], home: true, search: 'pure vanilla extract' },
  'mini-marshmallows': { pack: [10, 'oz'], label: '10 oz bag', est: [2, 3] },
  'candy-melts-pink': { pack: [12, 'oz'], label: '12 oz bag', est: [4, 6], search: 'pink candy melts' },
  'candy-melts-lavender': { pack: [12, 'oz'], label: '12 oz bag', est: [4, 6], search: 'lavender candy melts' },
  'candy-melts-white': { pack: [12, 'oz'], label: '12 oz bag', est: [4, 6], search: 'white candy melts' },
  'edible-glitter': { pack: [4, 'tsp'], label: 'jar', est: [5, 9], search: 'edible glitter' },
  'gel-food-coloring': { pack: [1, 'set'], label: 'set', est: [5, 9], search: 'gel food coloring red pink' },
  'pastel-sprinkles': { pack: [8, 'tbsp'], label: 'jar', est: [4, 7], search: 'pastel sprinkles' },
  'white-chocolate-chips': { pack: [2, 'cup'], label: '11 oz bag', est: [3, 5], search: 'white chocolate chips' },
  'pressed-edible-flowers': { pack: [30, 'flower'], label: 'box', est: [12, 20], search: 'pressed edible flowers' },

  // Pantry
  'fine-salt': { pack: [150, 'tsp'], label: 'canister', est: [1, 2], home: true, search: 'fine sea salt' },
  'crisped-rice-cereal': { pack: [10, 'cup'], label: '12 oz box', est: [3, 5], search: 'crisp rice cereal' },
  honey: { pack: [24, 'tbsp'], label: '12 oz bottle', est: [4, 7], search: 'honey squeeze bottle' },
  paprika: { pack: [12, 'tsp'], label: 'jar', est: [2, 4], home: true, search: 'sweet paprika' },

  // Dairy & eggs
  'unsalted-butter': { pack: [4, 'stick'], label: '1 lb box', est: [4, 6], search: 'unsalted butter' },
  'large-eggs': { pack: [12, 'egg'], label: 'dozen', est: [3, 5], search: 'large eggs' },
  'whole-milk': { pack: [8, 'cup'], label: 'half gallon', est: [3, 4], search: 'whole milk' },
  'cream-cheese': { pack: [8, 'oz'], label: '8 oz block', est: [2, 4], search: 'cream cheese block' },
  'cheese-slices': { pack: [12, 'slice'], label: '12-slice pack', est: [3, 5], search: 'colby jack cheese slices' },

  // Deli & bakery
  'deli-turkey': { pack: [8, 'oz'], label: '8 oz pack', est: [4, 6], search: 'sliced deli turkey' },
  hummus: { pack: [2, 'cup'], label: '16 oz tub', est: [4, 6], search: 'hummus' },
  'flour-tortillas': { pack: [8, 'tortilla'], label: '8-pack', est: [3, 4], search: 'large flour tortillas' },

  // Produce
  blueberries: { pack: [1.5, 'cup'], label: 'pint', est: [3, 5], search: 'fresh blueberries' },
  raspberries: { pack: [1.5, 'cup'], label: '6 oz box', est: [3, 5], search: 'fresh raspberries' },
  strawberries: { pack: [16, 'strawberry'], label: '1 lb box', est: [3, 5], search: 'fresh strawberries' },
  'green-grapes': { pack: [16, 'oz'], label: '1 lb bag', est: [3, 4], search: 'seedless green grapes' },
  'red-grapes': { pack: [16, 'oz'], label: '1 lb bag', est: [3, 4], search: 'seedless red grapes' },
  'pineapple-chunks': { pack: [2, 'cup'], label: 'container', est: [3, 5], search: 'pineapple chunks' },
  cantaloupe: { pack: [1, 'cantaloupe'], label: 'melon', est: [3, 4], search: 'cantaloupe' },
  broccoli: { pack: [4, 'cup'], label: 'crown', est: [2, 3], search: 'broccoli florets' },
  carrots: { pack: [8, 'carrot'], label: '1 lb bag', est: [1, 3], search: 'rainbow carrots' },
  celery: { pack: [8, 'stalk'], label: 'bunch', est: [2, 3], search: 'celery' },
  'cherry-tomatoes': { pack: [2, 'cup'], label: 'pint', est: [3, 4], search: 'cherry tomatoes' },
  'english-cucumber': { pack: [1, 'cucumber'], label: 'cucumber', est: [1, 2], search: 'english cucumber' },
  'red-bell-pepper': { pack: [1, 'bell pepper'], label: 'pepper', est: [1, 2], search: 'red bell pepper' },
  'yellow-bell-pepper': { pack: [1, 'bell pepper'], label: 'pepper', est: [1, 2], search: 'yellow bell pepper' },
  'snap-peas': { pack: [8, 'oz'], label: '8 oz bag', est: [3, 4], search: 'sugar snap peas' },
  lemons: { pack: [1, 'lemon'], label: 'lemon', est: [0.4, 0.8], search: 'fresh lemons' },
  'fresh-dill': { pack: [1, 'bunch'], label: 'bunch', est: [2, 3], search: 'fresh dill' },
  'fresh-mint': { pack: [1, 'bunch'], label: 'bunch', est: [2, 3], search: 'fresh mint' },
  'fresh-edible-flowers': { pack: [12, 'flower'], label: 'clamshell', est: [6, 10], search: 'fresh edible flowers' },

  // Drinks & frozen
  'sparkling-water': { pack: [8, 'cup'], label: '2 L bottle', est: [1, 2], search: 'sparkling water' },
  'ice-cubes': { pack: [1, 'bag'], label: 'bag', est: [2, 3], search: 'bagged ice' },
}
