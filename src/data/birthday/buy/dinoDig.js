// Dino Dig buy lists. Costs are planning estimates, not retailer prices.
import { b, each, per, one, opt, home, keep } from './helpers.js'

export default {
  activities: {
    'fossil-excavation': [
      b('Play sand, 50 lb bag', 'play sand 50 lb', one(3), 'bag', [5, 8], { note: 'A few inches deep in a kiddie pool or sandbox.' }),
      b('Dinosaur skeleton & fossil dig toys', 'dinosaur fossil skeleton toys bulk', each(1, 2), 'fossil', [1, 2], { save: 'Homemade salt-dough fossils' }),
      b('Excavation brushes', 'paint brushes bulk kids', each(1), 'brush', [0.3, 0.6]),
      b('Plastic sand scoops', 'plastic sand scoops kids', per(2), 'scoop', [0.5, 1]),
      b('Kiddie pool or sandbox', 'kiddie pool hard plastic', one(1), 'pool', [15, 30], home),
      b('Explorer field notebooks', 'kraft mini notebooks bulk', each(1), 'notebook', [0.5, 1], opt),
      b('Kids magnifying glasses', 'kids magnifying glass bulk', each(1), 'magnifier', [1, 2], opt),
    ],
    'hatch-a-dino-egg': [
      b('Small water balloons', 'small water balloons', per(50), 'pack', [3, 6]),
      b('Mini dinosaur figures', 'mini dinosaur figures bulk', each(1, 2), 'dinosaur', [0.4, 0.8]),
      b('Plastic squeeze bottles', 'plastic squeeze bottles kids', per(3), 'bottle', [0.8, 1.5], { note: 'Fill with warm water for melting.' }),
      b('Shallow plastic tubs or trays', 'plastic storage tub shallow', per(4), 'tub', [3, 6], home),
      b('Kids safety goggles', 'kids safety goggles', each(1), 'pair', [1.5, 3], opt),
    ],
    'erupting-volcano': [
      b('Baking soda, 4 lb bag', 'baking soda 4 lb', one(1), 'bag', [3, 5]),
      b('White vinegar, 1 gallon', 'white vinegar gallon', one(1), 'jug', [3, 5]),
      b('Red & orange food coloring', 'liquid food coloring', one(1), 'set', [2, 4]),
      b('Dish soap, for extra foam', 'dish soap', one(1), 'bottle', [2, 4], home),
      b('Volcano science kit', 'volcano science kit kids', one(1), 'kit', [12, 20], { opt: true, save: 'A paper-cup volcano covered in brown play dough' }),
      b('Large plastic tray', 'large plastic tray kids crafts', one(1), 'tray', [5, 9], opt),
    ],
    'dino-egg-hunt': [
      b('Speckled plastic eggs', 'speckled plastic easter eggs', each(3), 'egg', [0.15, 0.3]),
      b('Mini dinosaur erasers or figures for inside', 'mini dinosaur erasers bulk', each(3), 'dinosaur', [0.15, 0.3]),
      b('Kraft bags or baskets for collecting', 'kraft paper bags small', each(1), 'bag', [0.2, 0.4]),
    ],
    'salt-dough-fossils': [
      b('Table salt, 26 oz', 'table salt 26 oz', per(8), 'canister', [1, 2]),
      b('All-purpose flour', 'all purpose flour 5 lb', per(8), 'bag', [3, 5], home),
      b('Parchment paper', 'parchment paper roll', one(1), 'roll', [3, 5]),
      b('Kraft bags to take fossils home', 'kraft paper bags small', each(1), 'bag', [0.2, 0.4]),
      b('Toy dinosaurs and shells for pressing', 'toy dinosaur figures set', one(1), 'set', [8, 14], opt),
      b('Kids rolling pins', 'kids rolling pin wooden', per(4), 'pin', [2, 4], opt),
    ],
    'dino-cookie-decorating': [
      b('Dinosaur cookie cutters', 'dinosaur cookie cutters set', one(1), 'set', [6, 10], keep),
      b('Sugar cookie mix', 'sugar cookie mix', per(12), 'pouch', [2.5, 4]),
      b('Cookie icing, green, orange & white', 'cookie icing bottles', per(4), 'bottle', [3, 5]),
      b('Sprinkles', 'sprinkles mix', one(1), 'jar', [3, 6]),
      b('Kids aprons', 'kids aprons bulk', each(1), 'apron', [1.5, 3], opt),
    ],
    'dino-stomp': [
      b('Paper dinosaur crowns', 'dinosaur paper crowns kids', each(1), 'crown', [0.3, 0.6], opt),
      b('Bluetooth speaker', 'portable bluetooth speaker', one(1), 'speaker', [20, 35], home),
    ],
    'dino-tail-tag': [
      b('Felt sheets for tails, green & orange', 'felt sheets 9x12', each(1), 'sheet', [0.3, 0.6], { save: 'Crepe-paper streamers' }),
      b('Field marker cones', 'sport cones kids', one(1), 'set', [6, 10], opt),
    ],
    'dino-storytime': [
      b('Dinosaur picture book', 'dinosaur picture book kids', one(1), 'book', [6, 12], home),
      b('Picnic blanket', 'picnic blanket large', one(1), 'blanket', [12, 20], home),
      b('Kids safari hats', 'kids safari hat bulk', each(1), 'hat', [2, 4], opt),
    ],
  },

  food: {
    'volcano-cupcakes': [
      b('Chocolate cake mix', 'chocolate cake mix', per(24), 'box', [2, 3]),
      b('Chocolate frosting', 'chocolate frosting', per(24), 'tub', [2, 3]),
      b('Orange candy melts, for the lava', 'orange candy melts', per(24), 'bag', [4, 6]),
      b('Large eggs', 'large eggs', per(24), 'dozen', [3, 5], { units: 'dozen' }),
      b('Vegetable oil', 'vegetable oil', one(1), 'bottle', [3, 5], home),
      b('Kraft cupcake liners', 'kraft cupcake liners', per(48), 'pack', [3, 5]),
    ],
    'dino-dirt-cups': [
      b('Instant chocolate pudding mix', 'instant chocolate pudding mix', per(4), 'box', [1.5, 2.5]),
      b('Milk, half gallon', 'whole milk', per(16), 'carton', [3, 4]),
      b('Chocolate sandwich cookies', 'chocolate sandwich cookies', per(12), 'pack', [3, 5]),
      b('Mini toy dinosaurs for the tops', 'mini dinosaur figures bulk', each(1), 'dinosaur', [0.3, 0.6]),
      b('Clear plastic cups, 9 oz', 'clear plastic cups 9 oz', each(1, 2), 'cup', [0.1, 0.2], { cat: 'tableware' }),
      b('Gummy leaves or mint leaves', 'gummy leaves candy', per(12), 'bag', [2, 4], opt),
    ],
    'fossil-sandwiches': [
      b('Sandwich bread', 'sandwich bread', per(10), 'loaf', [3, 4], { units: 'loaves' }),
      b('Sliced deli turkey', 'sliced deli turkey', per(8), 'pack', [4, 6]),
      b('Cheese slices', 'cheese slices', per(12), 'pack', [3, 5]),
      b('Dinosaur sandwich cutters', 'dinosaur sandwich cutters', one(1), 'set', [6, 10], keep),
      b('Cucumber, for the platter', 'english cucumber', per(12), 'cucumber', [1, 2], opt),
    ],
    'dino-bones': [
      b('Pretzel sticks', 'pretzel sticks', per(16), 'bag', [2, 4]),
      b('Mini marshmallows', 'mini marshmallows', per(24), 'bag', [2, 3]),
      b('White chocolate melts, to glue the ends', 'white candy melts', per(24), 'bag', [4, 6], opt),
    ],
    'fern-veggie-cups': [
      b('Broccoli crowns', 'broccoli crowns', per(6), 'crown', [2, 3]),
      b('Celery', 'celery', per(12), 'bunch', [2, 3], { units: 'bunches' }),
      b('Ranch dressing', 'ranch dressing', per(12), 'bottle', [3, 4]),
      b('Clear plastic cups, 9 oz', 'clear plastic cups 9 oz', each(1), 'cup', [0.1, 0.2], { cat: 'tableware' }),
    ],
    'lava-punch': [
      b('Orange juice, 52 oz', 'orange juice', per(12), 'bottle', [3, 5]),
      b('Pineapple juice, 46 oz', 'pineapple juice 46 oz', per(12), 'can', [2, 4]),
      b('Sparkling water, 2 L', 'sparkling water 2 liter', per(12), 'bottle', [1, 2]),
      b('Oranges, for slices', 'navel oranges', per(6), 'orange', [0.6, 1]),
      b('Glass drink pitcher', 'glass pitcher', one(1), 'pitcher', [12, 20], opt),
    ],
    'dino-cake': [
      b('Chocolate cake mix', 'chocolate cake mix', one(2), 'box', [2, 3]),
      b('Chocolate frosting', 'chocolate frosting', one(3), 'tub', [2, 3]),
      b('Large eggs', 'large eggs', one(1), 'dozen', [3, 5], { units: 'dozen' }),
      b('Sugar cones, for the volcano peak', 'sugar ice cream cones', one(1), 'box', [2, 4], { units: 'boxes' }),
      b('Chocolate sandwich cookies, for rocks', 'chocolate sandwich cookies', one(1), 'pack', [3, 5]),
      b('Orange candy melts, for lava', 'orange candy melts', one(1), 'bag', [4, 6]),
      b('Green decorating icing, for ferns', 'green decorating icing tube', one(1), 'tube', [2, 4]),
      b('Toy dinosaur cake toppers', 'dinosaur cake toppers figures', one(1), 'set', [6, 10]),
      b('Wooden cake stand', 'wooden cake stand', one(1), 'stand', [15, 25], opt),
      b('Dinosaur birthday candles', 'dinosaur birthday candles', one(1), 'pack', [3, 6], opt),
    ],
  },

  diy: {
    'dino-ice-eggs': [
      b('Small water balloons', 'small water balloons', per(50), 'pack', [3, 6]),
      b('Mini dinosaur figures', 'mini dinosaur figures bulk', each(1, 2), 'dinosaur', [0.4, 0.8]),
      b('Baking tray for the freezer', 'baking sheet', one(1), 'tray', [6, 10], home),
    ],
    'salt-dough-fossils': [
      b('Table salt, 26 oz', 'table salt 26 oz', per(8), 'canister', [1, 2]),
      b('All-purpose flour', 'all purpose flour 5 lb', per(8), 'bag', [3, 5], home),
      b('Shells and faux leaves for pressing', 'small sea shells craft', one(1), 'bag', [4, 7], opt),
    ],
    'backyard-excavation-pit': [
      b('Kiddie pool or sandbox', 'kiddie pool hard plastic', one(1), 'pool', [15, 30], home),
      b('Play sand, 50 lb bag', 'play sand 50 lb', one(3), 'bag', [5, 8]),
      b('Dinosaur skeleton & fossil dig toys', 'dinosaur fossil skeleton toys bulk', each(1, 2), 'fossil', [1, 2]),
      b('Brushes and scoops', 'sand scoops and brushes kids', per(2), 'set', [1, 2]),
      b('Dig-site flags', 'mini flags on sticks', one(1), 'pack', [4, 7], opt),
    ],
  },
}
