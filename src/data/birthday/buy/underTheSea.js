// Under the Sea buy lists. Costs are planning estimates, not retailer prices.
import { b, each, per, one, opt, home, keep } from './helpers.js'

export default {
  activities: {
    'sunken-treasure-hunt': [
      b('Plastic gold coins', 'plastic gold coins bulk', each(6), 'coin', [0.03, 0.06]),
      b('Acrylic treasure gems', 'acrylic gems treasure kids', each(4), 'gem', [0.05, 0.1]),
      b('Small treasure chest', 'small wooden treasure chest', one(1), 'chest', [8, 14], keep),
      b('Drawstring treasure pouches', 'drawstring pouches small', each(1), 'pouch', [0.2, 0.4]),
      b('Kraft paper for picture maps', 'kraft paper roll', one(1), 'roll', [5, 8], opt),
    ],
    'shell-crown-studio': [
      b('Paper crown bands', 'paper crowns kids craft', each(1, 2), 'crown', [0.4, 0.8]),
      b('Small craft shells', 'small sea shells craft', per(6), 'bag', [4, 7]),
      b('Faux pearls and flat-back gems', 'flat back pearls gems craft', per(8), 'pack', [3, 5]),
      b('Glue dots', 'glue dots craft', per(6), 'roll', [2, 4]),
      b('Craft trays', 'craft trays kids', per(3), 'tray', [1, 2], opt),
    ],
    'ocean-in-a-bottle': [
      b('Small clear plastic bottles with caps', 'small clear plastic bottles with caps', each(1, 2), 'bottle', [0.5, 1]),
      b('Baby oil', 'baby oil', per(8), 'bottle', [3, 5]),
      b('Blue food coloring', 'blue food coloring', one(1), 'bottle', [2, 4]),
      b('Tiny shells and sea glitter', 'tiny shells glitter craft', one(1), 'pack', [4, 7]),
      b('Small funnels', 'small funnels', per(4), 'funnel', [0.5, 1]),
      b('Strong glue for the caps', 'super glue', one(1), 'tube', [4, 7], home),
    ],
    'jellyfish-cupcakes': [
      b('Candy eyes', 'candy eyes', per(24), 'pack', [3, 5]),
      b('Sour strip candy, for tentacles', 'sour strip candy rainbow', per(12), 'bag', [3, 5]),
      b('Pastel frosting', 'pastel frosting tub', per(12), 'tub', [2, 3]),
      b('Plastic butter knives', 'plastic knives kids', each(1), 'knife', [0.05, 0.1], { cat: 'tableware', opt: true }),
    ],
    'sharks-minnows': [
      b('Field marker cones', 'sport cones kids', one(1), 'set', [6, 10], opt),
      b('Shark fin headbands', 'shark fin headband kids', one(2), 'headband', [2, 4], opt),
    ],
    'bubble-lagoon': [
      b('Giant bubble wands', 'giant bubble wand kids', per(3), 'wand', [2, 4]),
      b('Bubble solution, 64 oz', 'bubble solution refill', one(1), 'jug', [6, 10]),
      b('Large shallow tray', 'large plastic tray kids crafts', one(1), 'tray', [5, 9], home),
    ],
    'go-fishing': [
      b('Magnetic fishing game set', 'magnetic fishing rods kids game', per(4), 'set', [6, 12]),
      b('Colored cardstock for fish', 'colored cardstock', one(1), 'pack', [4, 7]),
      b('Paper clips', 'paper clips', one(1), 'box', [1, 3], { ...home, units: 'boxes' }),
      b('Blue tablecloth or cardboard pond', 'blue plastic tablecloth', one(1), 'tablecloth', [2, 4], opt),
      b('Tiny prizes', 'ocean party favors bulk', each(1), 'prize', [0.2, 0.5], opt),
    ],
    'freeze-fish': [
      b('Bluetooth speaker', 'portable bluetooth speaker', one(1), 'speaker', [20, 35], home),
      b('Sea creature masks or headbands', 'sea animal masks kids', each(1), 'mask', [0.5, 1], opt),
    ],
    'tide-pool-storytime': [
      b('Ocean picture book', 'ocean picture book kids', one(1), 'book', [6, 12], home),
      b('Beach towels', 'beach towels', one(3), 'towel', [6, 12], home),
      b('Octopus and starfish pillows', 'sea animal plush pillow kids', one(2), 'pillow', [8, 15], opt),
    ],
  },

  food: {
    'jellyfish-cupcakes': [
      b('Vanilla cake mix', 'vanilla cake mix', per(24), 'box', [2, 3], { units: 'boxes' }),
      b('Large eggs', 'large eggs', per(24), 'dozen', [3, 5], { units: 'dozen' }),
      b('Vegetable oil', 'vegetable oil', one(1), 'bottle', [3, 5], home),
      b('Cupcake liners', 'pastel cupcake liners', per(48), 'pack', [3, 5]),
      b('Pastel frosting', 'pastel frosting tub', per(12), 'tub', [2, 3], { note: 'Shared with the decorating activity if you do both.' }),
    ],
    'goldfish-cracker-cups': [
      b('Fish-shaped crackers, large carton', 'goldfish crackers carton', per(16), 'carton', [6, 10]),
      b('Paper snack cups, coral & teal', 'paper snack cups colorful', each(1), 'cup', [0.08, 0.15], { cat: 'tableware' }),
      b('Fish and wave stickers', 'ocean stickers kids', one(1), 'pack', [3, 5], opt),
    ],
    'sea-star-sandwiches': [
      b('Sandwich bread', 'sandwich bread', per(10), 'loaf', [3, 4], { units: 'loaves' }),
      b('Sliced deli turkey', 'sliced deli turkey', per(12), 'pack', [4, 6]),
      b('Cheese slices', 'cheese slices', per(12), 'pack', [3, 5]),
      b('Strawberry jam', 'strawberry jam', one(1), 'jar', [3, 5]),
      b('Star sandwich cutter', 'star sandwich cutter', one(1), 'set', [4, 8], keep),
    ],
    'pearl-fruit-cups': [
      b('Cantaloupe or honeydew', 'cantaloupe', per(14), 'melon', [3, 4]),
      b('Blueberries, pint', 'fresh blueberries', per(14), 'pint', [3, 5]),
      b('Green grapes, 1 lb', 'seedless green grapes', per(14), 'bag', [3, 4]),
      b('Melon baller', 'melon baller', one(1), 'scoop', [4, 7], home),
      b('Clear 9 oz cups', 'clear plastic cups 9 oz', each(1), 'cup', [0.1, 0.2], { cat: 'tableware' }),
    ],
    'seaweed-veggie-cups': [
      b('English cucumbers', 'english cucumber', per(6), 'cucumber', [1, 2]),
      b('Sugar snap peas, 8 oz', 'sugar snap peas', per(8), 'bag', [3, 4]),
      b('Carrot sticks', 'carrot sticks', per(12), 'bag', [1.5, 3]),
      b('Ranch dressing', 'ranch dressing', per(12), 'bottle', [3, 4]),
      b('Clear 9 oz cups', 'clear plastic cups 9 oz', each(1), 'cup', [0.1, 0.2], { cat: 'tableware' }),
    ],
    'sea-foam-lemonade': [
      b('Lemonade, 52 oz', 'lemonade bottle', per(8), 'bottle', [3, 4]),
      b('Blue food coloring, for the ice', 'blue food coloring', one(1), 'bottle', [2, 4]),
      b('Ice cube trays', 'silicone ice cube trays', one(2), 'tray', [3, 6], home),
      b('Striped paper straws', 'striped paper straws', one(1), 'pack', [3, 5], { cat: 'tableware', opt: true }),
    ],
    'sea-cake': [
      b('Vanilla cake mix', 'vanilla cake mix', one(2), 'box', [2, 3], { units: 'boxes' }),
      b('Large eggs', 'large eggs', one(1), 'dozen', [3, 5], { units: 'dozen' }),
      b('Vanilla buttercream frosting', 'vanilla frosting', one(3), 'tub', [2, 3]),
      b('Teal and seafoam gel coloring', 'teal gel food coloring', one(1), 'set', [4, 7]),
      b('Seashell chocolate mold', 'seashell candy mold', one(1), 'mold', [5, 9], keep),
      b('White candy melts, for shells', 'white candy melts', one(1), 'bag', [4, 6]),
      b('Sugar pearls', 'sugar pearls sprinkles white', one(1), 'jar', [3, 6]),
      b('Ocean cake toppers', 'under the sea cake topper', one(1), 'set', [6, 10], opt),
    ],
  },

  diy: {
    'treasure-chest-favor-boxes': [
      b('Small kraft treasure boxes', 'kraft treasure chest favor boxes', each(1), 'box', [0.4, 0.8]),
      b('Gold and brown acrylic paint', 'acrylic paint gold brown', one(1), 'set', [5, 9]),
      b('Gold paint pen', 'gold paint pen', one(1), 'pen', [3, 5]),
      b('Faux pearls and gems', 'flat back pearls gems craft', one(1), 'pack', [3, 5]),
      b('Glue dots', 'glue dots craft', one(1), 'roll', [2, 4]),
    ],
    'jellyfish-lanterns': [
      b('Paper lanterns, pastel', 'pastel paper lanterns', one(6), 'lantern', [1, 2]),
      b('Pastel ribbon and crepe streamers', 'pastel crepe paper streamers', one(1), 'pack', [8, 14]),
      b('Clear tape', 'clear tape', one(1), 'roll', [2, 4], home),
      b('Clear fishing line', 'clear fishing line', one(1), 'spool', [3, 6]),
    ],
    'ocean-in-a-bottle-kits': [
      b('Small clear plastic bottles with caps', 'small clear plastic bottles with caps', each(1, 2), 'bottle', [0.5, 1]),
      b('Blue food coloring', 'blue food coloring', one(1), 'bottle', [2, 4]),
      b('Baby oil', 'baby oil', per(8), 'bottle', [3, 5]),
      b('Tiny shells', 'tiny shells craft', one(1), 'pack', [4, 7]),
      b('Strong glue for the caps', 'super glue', one(1), 'tube', [4, 7], home),
    ],
  },
}
