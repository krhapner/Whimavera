// Starry Night buy lists. Costs are planning estimates, not retailer prices.
import { b, each, per, one, opt, home, keep } from './helpers.js'

export default {
  activities: {
    'constellation-cards': [
      b('Black cardstock', 'black cardstock 8.5x11', per(25), 'pack', [5, 8]),
      b('Printed constellation patterns', 'white printer paper', one(1), 'ream', [6, 9], home),
      b('Push pins', 'push pins', one(1), 'box', [2, 4], { units: 'boxes' }),
      b('Corkboard squares to work on', 'cork board squares', per(2), 'square', [1, 2]),
      b('Small flashlights', 'mini led flashlights bulk', each(1), 'flashlight', [0.8, 1.5], opt),
    ],
    'glow-star-hunt': [
      b('Glow-in-the-dark stars', 'glow in the dark stars', each(4), 'star', [0.05, 0.1]),
      b('Small flashlights', 'mini led flashlights bulk', each(1), 'flashlight', [0.8, 1.5]),
      b('Batteries for flashlights', 'AAA batteries', one(1), 'pack', [5, 9], home),
      b('Star collection pouches', 'drawstring pouches small', each(1), 'pouch', [0.2, 0.4], opt),
    ],
    'straw-rocket-launch': [
      b('Paper straws', 'paper straws', each(1, 4), 'straw', [0.03, 0.06]),
      b('Printable rocket templates on cardstock', 'white cardstock 8.5x11', per(25), 'pack', [4, 7]),
      b('Tape', 'clear tape', one(1), 'roll', [2, 4], home),
      b('Star stickers', 'gold star stickers', one(1), 'pack', [2, 4]),
      b('Paper moon target', 'large paper moon decoration', one(1), 'moon', [5, 9], opt),
    ],
    'galaxy-jars': [
      b('Small jars with lids', 'small plastic jars with lids', each(1, 2), 'jar', [0.6, 1.2]),
      b('Cotton balls', 'cotton balls', per(6), 'bag', [2, 3]),
      b('Liquid food coloring, blue, purple, pink', 'liquid food coloring', one(1), 'set', [3, 5]),
      b('Iridescent fine glitter', 'iridescent fine glitter', one(1), 'jar', [3, 6]),
      b('Small funnels', 'small funnels', per(4), 'funnel', [0.5, 1], opt),
    ],
    'star-cookie-studio': [
      b('Star cookie cutters', 'star cookie cutters set', one(1), 'set', [5, 9], keep),
      b('Sugar cookie mix', 'sugar cookie mix', per(12), 'pouch', [2.5, 4]),
      b('Cookie icing, navy & white', 'cookie icing bottles', per(4), 'bottle', [3, 5]),
      b('Gold star sprinkles', 'gold star sprinkles', one(1), 'jar', [4, 7]),
    ],
    'astronaut-training': [
      b('Kids play tunnel', 'kids play tunnel', one(1), 'tunnel', [15, 25], { opt: true, save: 'Couch cushions and a blanket over two chairs' }),
      b('Floor cushions as moon craters', 'floor cushions kids', one(4), 'cushion', [8, 15], home),
      b('Foil space blanket, for a finish line', 'emergency mylar blanket', one(1), 'blanket', [1, 3]),
    ],
    'glow-dance-party': [
      b('Glow stick bracelets', 'glow stick bracelets bulk', each(3), 'glow stick', [0.1, 0.2]),
      b('Glow necklaces', 'glow necklaces bulk', each(1), 'necklace', [0.15, 0.3]),
      b('Bluetooth speaker', 'portable bluetooth speaker', one(1), 'speaker', [20, 35], home),
    ],
    'backyard-stargazing': [
      b('Kids binoculars', 'kids binoculars', per(3), 'pair', [5, 9], { opt: true, units: 'pairs' }),
      b('Red-light flashlights', 'red light flashlight', per(4), 'flashlight', [2, 4]),
      b('Picnic blankets', 'picnic blanket large', per(4), 'blanket', [12, 20], home),
      b('Glow-in-the-dark star map', 'glow in the dark star chart kids', one(1), 'map', [6, 10], opt),
    ],
    'bedtime-star-stories': [
      b('Night sky picture book', 'night sky picture book kids', one(1), 'book', [6, 12], home),
      b('Star projector night light', 'star projector night light', one(1), 'projector', [12, 20], opt),
    ],
  },

  food: {
    'galaxy-cupcakes': [
      b('Chocolate cake mix', 'chocolate cake mix', per(24), 'box', [2, 3], { units: 'boxes' }),
      b('Large eggs', 'large eggs', per(24), 'dozen', [3, 5], { units: 'dozen' }),
      b('Vegetable oil', 'vegetable oil', one(1), 'bottle', [3, 5], home),
      b('Vanilla frosting', 'vanilla frosting', per(12), 'tub', [2, 3]),
      b('Navy and lilac gel coloring', 'navy purple gel food coloring', one(1), 'set', [4, 7]),
      b('Gold star sprinkles', 'gold star sprinkles', one(1), 'jar', [4, 7]),
      b('Navy cupcake liners', 'navy cupcake liners', per(48), 'pack', [3, 5]),
      b('Moon and star cupcake toppers', 'moon star cupcake toppers', per(24), 'pack', [4, 7], opt),
    ],
    'star-sandwiches': [
      b('Sandwich bread', 'sandwich bread', per(10), 'loaf', [3, 4], { units: 'loaves' }),
      b('Sliced deli ham', 'sliced deli ham', per(12), 'pack', [4, 6]),
      b('Cheese slices', 'cheese slices', per(12), 'pack', [3, 5]),
      b('Strawberry jam', 'strawberry jam', one(1), 'jar', [3, 5]),
      b('Star sandwich cutter', 'star sandwich cutter', one(1), 'set', [4, 8], keep),
    ],
    'crescent-moon-crackers': [
      b('Round crackers', 'round crackers', per(12), 'box', [3, 5], { units: 'boxes' }),
      b('Cheese block, cheddar or colby', 'cheddar cheese block', per(12), 'block', [3, 5]),
      b('Mini moon and star cutters', 'mini moon star cookie cutters', one(1), 'set', [4, 7], keep),
    ],
    'shooting-star-fruit-wands': [
      b('Cantaloupe or watermelon', 'cantaloupe', per(8), 'melon', [3, 4]),
      b('Strawberries, 1 lb', 'fresh strawberries', per(12), 'box', [3, 5], { units: 'boxes' }),
      b('Blueberries, pint', 'fresh blueberries', per(12), 'pint', [3, 5]),
      b('Bamboo skewers, blunt or cut short', 'bamboo skewers 6 inch', one(1), 'pack', [2, 4]),
      b('Small star cookie cutter', 'mini star cookie cutter', one(1), 'cutter', [2, 4], keep),
    ],
    'rocket-veggie-cups': [
      b('Carrot sticks', 'carrot sticks', per(12), 'bag', [1.5, 3]),
      b('English cucumbers', 'english cucumber', per(6), 'cucumber', [1, 2]),
      b('Ranch or hummus dip', 'ranch dressing', per(12), 'bottle', [3, 4]),
      b('Clear 9 oz cups', 'clear plastic cups 9 oz', each(1), 'cup', [0.1, 0.2], { cat: 'tableware' }),
      b('Printable rocket wraps on cardstock', 'white cardstock 8.5x11', one(1), 'pack', [4, 7], opt),
    ],
    'twinkle-lemonade': [
      b('Sparkling lemonade', 'sparkling lemonade', per(6), 'bottle', [2, 4]),
      b('Lemons, for slices', 'fresh lemons', per(6), 'lemon', [0.4, 0.8]),
      b('Star drink stirrers', 'star drink stirrers', each(1), 'stirrer', [0.1, 0.2], { cat: 'tableware', opt: true }),
    ],
    'starry-cake': [
      b('Chocolate cake mix', 'chocolate cake mix', one(2), 'box', [2, 3], { units: 'boxes' }),
      b('Large eggs', 'large eggs', one(1), 'dozen', [3, 5], { units: 'dozen' }),
      b('Vanilla buttercream frosting', 'vanilla frosting', one(3), 'tub', [2, 3]),
      b('Navy and lilac gel coloring', 'navy purple gel food coloring', one(1), 'set', [4, 7]),
      b('Gold star sprinkles', 'gold star sprinkles', one(1), 'jar', [4, 7]),
      b('Piping bags and star tip', 'piping bags star tip set', one(1), 'set', [6, 10]),
      b('Moon cake topper', 'moon cake topper', one(1), 'topper', [5, 9], opt),
      b('Gold birthday candles', 'gold birthday candles', one(1), 'pack', [3, 5], opt),
    ],
  },

  diy: {
    'paper-moon-lantern': [
      b('Large round balloon, 36 in', 'giant round balloon 36 inch', one(1), 'balloon', [2, 4]),
      b('White tissue paper', 'white tissue paper', one(1), 'pack', [4, 7]),
      b('PVA craft glue', 'white craft glue', one(1), 'bottle', [3, 5]),
      b('Battery string light', 'battery fairy lights', one(1), 'strand', [6, 10]),
    ],
    'constellation-cards': [
      b('Black cardstock', 'black cardstock 8.5x11', per(25), 'pack', [5, 8]),
      b('Push pins', 'push pins', one(1), 'box', [2, 4], { units: 'boxes' }),
      b('Corkboard to work on', 'cork board squares', one(1), 'pack', [6, 10]),
    ],
    'galaxy-jars': [
      b('Small jars with lids', 'small plastic jars with lids', each(1, 2), 'jar', [0.6, 1.2]),
      b('Cotton balls', 'cotton balls', per(6), 'bag', [2, 3]),
      b('Liquid food coloring', 'liquid food coloring', one(1), 'set', [3, 5]),
      b('Iridescent fine glitter', 'iridescent fine glitter', one(1), 'jar', [3, 6]),
    ],
  },
}
