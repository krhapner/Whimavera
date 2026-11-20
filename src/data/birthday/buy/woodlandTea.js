// Woodland Tea Party buy lists. Costs are planning estimates, not retailer prices.
import { b, each, per, one, opt, home, keep } from './helpers.js'

export default {
  activities: {
    'teacup-planters': [
      b('Small terracotta pots or plain teacups', 'small terracotta pots 3 inch', each(1), 'pot', [1, 2], { note: 'Plain white teacups look lovely too if you find them thrifted.' }),
      b('Small succulents or herb seedlings', 'small succulent plants bulk', each(1), 'plant', [1, 2]),
      b('Potting mix', 'potting mix small bag', one(1), 'bag', [4, 7]),
      b('Acrylic paint pens', 'acrylic paint pens', per(12), 'set', [6, 10]),
      b('Smocks or old t-shirts', 'kids art smock', each(1), 'smock', [1.5, 3], opt),
    ],
    'woodland-animal-masks': [
      b('Blank paper masks or cardstock', 'blank paper masks kids', each(1, 2), 'mask', [0.4, 0.8]),
      b('Felt sheets, brown, orange & white', 'felt sheets 9x12', per(2), 'sheet', [0.3, 0.6]),
      b('Craft feathers', 'craft feathers natural', one(1), 'bag', [3, 5]),
      b('Elastic cord', 'elastic cord craft', one(1), 'spool', [2, 4]),
      b('Glue sticks', 'glue sticks bulk', per(3), 'stick', [0.3, 0.6]),
      b('Markers', 'washable markers', one(1), 'pack', [4, 7], home),
    ],
    'tea-sandwich-kitchen': [
      b('Leaf and acorn cookie cutters', 'leaf acorn cookie cutters', one(1), 'set', [5, 9], keep),
      b('Kids plastic knives', 'plastic knives kids', each(1), 'knife', [0.05, 0.1], { cat: 'tableware' }),
      b('Kids aprons', 'kids aprons bulk', each(1), 'apron', [1.5, 3], opt),
    ],
    'acorn-hunt': [
      b('Wooden or faux acorns', 'wooden acorns craft', each(4), 'acorn', [0.1, 0.2]),
      b('Acrylic paint, 4 colors', 'acrylic paint set', one(1), 'set', [5, 9], home),
      b('Small baskets for collecting', 'small woven baskets set', per(4), 'basket', [2, 4], opt),
    ],
    'fancy-hat-parade': [
      b('Kids straw hats', 'kids straw hats bulk', each(1), 'hat', [1, 2], { save: 'Hats from the dress-up box' }),
      b('Silk flowers and ribbon to trim', 'small silk flowers ribbon craft', per(6), 'pack', [3, 5], opt),
      b('Bluetooth speaker', 'portable bluetooth speaker', one(1), 'speaker', [20, 35], home),
    ],
    'pass-the-teapot': [
      b('Teapot (any sturdy one from the kitchen)', 'toy teapot kids', one(1), 'teapot', [8, 14], home),
      b('Tiny wrapped prizes', 'mini party favors bulk kids', each(2), 'prize', [0.2, 0.4]),
      b('Bluetooth speaker', 'portable bluetooth speaker', one(1), 'speaker', [20, 35], home),
    ],
    'fox-rabbits': [
      b('Hula hoops, for burrows', 'hula hoops kids', per(4), 'hoop', [2, 4], { opt: true, save: 'Chalk circles or towels on the grass' }),
      b('Fox and bunny ears headbands', 'bunny ears fox ears headbands kids', each(1), 'headband', [0.5, 1], opt),
    ],
    'leaf-rubbing-journals': [
      b('Mini kraft notebooks', 'kraft mini notebooks bulk', each(1), 'notebook', [0.5, 1]),
      b('Chunky crayons, peeled', 'jumbo crayons', per(4), 'pack', [2, 4]),
      b('Washi tape for labels', 'washi tape set', one(1), 'set', [4, 7], opt),
      b('Clipboards', 'clipboards kids', each(1), 'clipboard', [1, 2], opt),
    ],
    'story-circle': [
      b('Woodland picture book', 'woodland animals picture book', one(1), 'book', [6, 12], home),
      b('Floor cushions', 'floor cushions kids', one(4), 'cushion', [8, 15], home),
      b('Woodland plush toys', 'woodland animal plush set', one(1), 'set', [12, 20], opt),
    ],
  },

  food: {
    'tea-sandwiches': [
      b('Soft white sandwich bread', 'sandwich bread', per(10), 'loaf', [3, 4], { units: 'loaves' }),
      b('Cream cheese, 8 oz', 'cream cheese block', per(12), 'block', [2, 4]),
      b('English cucumbers', 'english cucumber', per(12), 'cucumber', [1, 2]),
      b('Strawberry jam', 'strawberry jam', one(1), 'jar', [3, 5]),
      b('Honey', 'honey squeeze bottle', one(1), 'bottle', [4, 7]),
      b('Butter', 'salted butter', one(1), 'box', [4, 6], { ...home, units: 'boxes' }),
    ],
    'mini-scones': [
      b('Scone mix', 'scone mix', per(12), 'box', [3, 5], { units: 'boxes' }),
      b('Strawberry jam', 'strawberry jam', one(1), 'jar', [3, 5]),
      b('Whipped cream', 'whipped cream can', per(12), 'can', [3, 4]),
    ],
    'mushroom-meringues': [
      b('Large eggs, for the whites', 'large eggs', one(1), 'dozen', [3, 5], { units: 'dozen' }),
      b('Superfine sugar', 'superfine sugar', one(1), 'box', [3, 5], { units: 'boxes' }),
      b('Cream of tartar', 'cream of tartar', one(1), 'jar', [3, 5], home),
      b('Unsweetened cocoa powder', 'unsweetened cocoa powder', one(1), 'can', [3, 5], home),
      b('Piping bags and round tip', 'piping bags round tip', one(1), 'set', [5, 8]),
    ],
    'berry-bowls': [
      b('Strawberries, 1 lb', 'fresh strawberries', per(8), 'box', [3, 5], { units: 'boxes' }),
      b('Raspberries, 6 oz', 'fresh raspberries', per(8), 'box', [3, 5], { units: 'boxes' }),
      b('Blueberries, pint', 'fresh blueberries', per(10), 'pint', [3, 5]),
      b('Small pastel bowls', 'small pastel bowls kids', each(1), 'bowl', [0.3, 0.6], { cat: 'tableware', opt: true }),
    ],
    'garden-crudites': [
      b('Carrots with tops', 'carrots with tops', per(12), 'bunch', [2, 3], { units: 'bunches' }),
      b('Radishes', 'radishes', per(12), 'bunch', [1.5, 2.5], { units: 'bunches' }),
      b('Sugar snap peas, 8 oz', 'sugar snap peas', per(12), 'bag', [3, 4]),
      b('Herb dip or ranch', 'herb dip', per(12), 'tub', [3, 5]),
    ],
    'woodland-tea': [
      b('Peach iced tea, caffeine-free', 'caffeine free peach tea', per(8), 'bottle', [3, 5]),
      b('Chamomile tea bags', 'chamomile tea bags', one(1), 'box', [3, 5], { units: 'boxes', opt: true }),
      b('Honey', 'honey squeeze bottle', one(1), 'bottle', [4, 7], opt),
      b('Peaches, for slices', 'fresh peaches', per(6), 'peach', [0.8, 1.5], opt),
    ],
    'tea-cake': [
      b('Yellow or honey cake mix', 'yellow cake mix', one(2), 'box', [2, 3], { units: 'boxes' }),
      b('Large eggs', 'large eggs', one(1), 'dozen', [3, 5], { units: 'dozen' }),
      b('Vanilla frosting', 'vanilla frosting', one(2), 'tub', [2, 3]),
      b('Honey', 'honey squeeze bottle', one(1), 'bottle', [4, 7]),
      b('Fresh berries for the top', 'fresh mixed berries', one(2), 'box', [3, 5], { units: 'boxes' }),
      b('Sugar mushrooms or toppers', 'mushroom cake toppers', one(1), 'set', [5, 9]),
      b('Bunny cake topper', 'bunny cake topper', one(1), 'topper', [4, 8], opt),
      b('Edible flowers', 'edible flowers', one(1), 'box', [8, 14], { opt: true, units: 'boxes' }),
    ],
  },

  diy: {
    'fresh-fern-garland': [
      b('Jute twine', 'jute twine', one(1), 'roll', [3, 5]),
      b('Floral wire', 'floral wire', one(1), 'spool', [3, 5]),
      b('Spray bottle', 'spray bottle', one(1), 'bottle', [2, 4], home),
      b('Faux ferns (if no garden ferns)', 'artificial fern stems', one(1), 'pack', [10, 16], opt),
    ],
    'woodland-animal-masks': [
      b('White cardstock', 'white cardstock 8.5x11', per(25), 'pack', [4, 7]),
      b('Felt scraps and feathers', 'felt sheets and craft feathers', one(1), 'pack', [6, 10]),
      b('Elastic cord', 'elastic cord craft', one(1), 'spool', [2, 4]),
      b('Hole punch', 'hole punch', one(1), 'punch', [3, 6], home),
    ],
    'teacup-planters': [
      b('Plain ceramic teacups', 'plain white teacups bulk', each(1), 'teacup', [1.5, 3], { save: 'Thrifted teacups' }),
      b('Small succulents or herb seedlings', 'small succulent plants bulk', each(1), 'plant', [1, 2]),
      b('Potting mix', 'potting mix small bag', one(1), 'bag', [4, 7]),
      b('Acrylic paint pens', 'acrylic paint pens', one(1), 'set', [6, 10]),
    ],
  },
}
