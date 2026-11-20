// Rainbow Picnic buy lists. Costs are planning estimates, not retailer prices.
// Portions are sized for toddlers and preschoolers.
import { b, each, per, one, opt, home, keep } from './helpers.js'

export default {
  activities: {
    'bubble-meadow': [
      b('Bubble machine', 'bubble machine kids', one(1), 'machine', [15, 25], keep),
      b('Bubble solution refill', 'bubble solution refill', one(1), 'bottle', [4, 8]),
      b('Bubble wands', 'bubble wands bulk kids', each(1), 'wand', [0.4, 0.8], opt),
      b('Batteries for the machine', 'AA batteries', one(1), 'pack', [5, 9], home),
    ],
    'rainbow-sensory-bins': [
      b('White rice, 5 lb bag', 'long grain white rice 5 lb', per(6), 'bag', [4, 6], { note: 'About 2 cups per color.' }),
      b('Gel food coloring, rainbow set', 'gel food coloring rainbow set', one(1), 'set', [5, 9], keep),
      b('White vinegar', 'white vinegar', one(1), 'bottle', [2, 4], home),
      b('Zip-top bags, gallon', 'gallon zip bags', one(1), 'box', [3, 5], { ...home, units: 'boxes' }),
      b('Shallow bins or trays', 'shallow plastic bins kids sensory', per(4), 'bin', [3, 6], home),
      b('Wooden scoops and cups', 'wooden scoops sensory bin', per(3), 'set', [4, 8], opt),
      b('Toys to hide in the rice', 'chunky toys toddlers sensory', one(1), 'set', [6, 12], opt),
    ],
    'color-hunt': [
      b('Kraft paper bags for collecting', 'kraft paper bags small', each(1), 'bag', [0.05, 0.1]),
      b('Rainbow color-sorting baskets', 'small woven baskets set', one(1), 'set', [10, 18], opt),
      b('Colorful toys to hide', 'rainbow counting bears toddlers', one(1), 'set', [8, 14], opt),
    ],
    'parachute-play': [
      b('Play parachute, 12 ft', 'play parachute 12 ft kids', one(1), 'parachute', [15, 25], keep),
      b('Soft play balls', 'soft play balls toddlers', one(1), 'set', [6, 10], opt),
    ],
    'ribbon-dance': [
      b('Ribbon wands', 'ribbon wands kids dance', each(1), 'wand', [0.8, 1.5], { save: 'Ribbon tied to wooden dowels (see DIY)' }),
      b('Bluetooth speaker', 'portable bluetooth speaker', one(1), 'speaker', [20, 35], home),
    ],
    'sticker-rainbows': [
      b('Colored dot stickers', 'colored dot stickers 3/4 inch', per(6), 'pack', [2, 4]),
      b('White cardstock', 'white cardstock 8.5x11', per(50), 'pack', [4, 7]),
      b('Cloud and rainbow stickers', 'rainbow stickers kids', per(12), 'pack', [3, 5], opt),
    ],
    'sprinkle-cookie-bar': [
      b('Sugar cookie mix', 'sugar cookie mix', per(12), 'pouch', [2.5, 4]),
      b('Vanilla frosting', 'vanilla frosting', per(12), 'tub', [2, 3]),
      b('Rainbow sprinkles', 'rainbow sprinkles', one(1), 'jar', [3, 6]),
      b('Sprinkle shakers', 'sprinkle shaker bottles', per(4), 'shaker', [1, 2], opt),
      b('Plastic butter knives', 'plastic knives kids', each(1), 'knife', [0.05, 0.1], { cat: 'tableware' }),
    ],
    'teddy-bear-picnic': [
      b('Wooden toy tea set', 'wooden toy tea set kids', one(1), 'set', [12, 20], opt),
      b('Picnic blanket', 'picnic blanket large', one(1), 'blanket', [12, 20], home),
      b('A teddy bear for guests who forget', 'small teddy bear', one(2), 'bear', [4, 7], opt),
    ],
    'rainbow-storytime': [
      b('Rainbow picture book', 'rainbow colors picture book toddlers', one(1), 'book', [6, 12], home),
      b('Floor cushions', 'floor cushions kids', one(2), 'cushion', [8, 15], opt),
    ],
  },

  food: {
    'rainbow-fruit-cups': [
      b('Strawberries, 1 lb', 'fresh strawberries', per(12), 'box', [3, 5], { units: 'boxes' }),
      b('Mangoes', 'fresh mango', per(6), 'mango', [1, 2]),
      b('Kiwis', 'fresh kiwi', per(6), 'kiwi', [0.5, 1]),
      b('Blueberries, pint', 'fresh blueberries', per(12), 'pint', [3, 5]),
      b('Seedless grapes, 1 lb', 'seedless grapes', per(12), 'bag', [3, 4]),
      b('Clear 9 oz cups', 'clear plastic cups 9 oz', each(1), 'cup', [0.1, 0.2], { cat: 'tableware' }),
    ],
    'veggie-hummus-cups': [
      b('Hummus, 16 oz', 'hummus', per(12), 'tub', [4, 6]),
      b('Red bell peppers', 'red bell pepper', per(6), 'pepper', [1, 2]),
      b('English cucumbers', 'english cucumber', per(6), 'cucumber', [1, 2]),
      b('Carrot sticks', 'carrot sticks', per(12), 'bag', [1.5, 3]),
      b('Small clear cups', 'clear plastic cups 5 oz', each(1), 'cup', [0.08, 0.15], { cat: 'tableware' }),
    ],
    'mini-muffins': [
      b('Blueberry muffin mix', 'blueberry muffin mix', per(24), 'box', [3, 5], { units: 'boxes' }),
      b('Bananas', 'bananas', per(24), 'bunch', [1, 2], { units: 'bunches' }),
      b('Large eggs', 'large eggs', per(24), 'dozen', [3, 5], { units: 'dozen' }),
      b('Mini muffin liners', 'mini muffin liners pastel', one(1), 'pack', [2, 4]),
      b('Mini muffin pan', 'mini muffin pan 24', one(1), 'pan', [8, 14], home),
    ],
    'cheese-cracker-stacks': [
      b('Round butter crackers', 'round butter crackers', per(12), 'box', [3, 5], { units: 'boxes' }),
      b('Cheese slices', 'cheese slices', per(8), 'pack', [3, 5]),
      b('Flower cookie cutters', 'mini flower cookie cutters', one(1), 'set', [4, 7], opt),
    ],
    'picnic-sandwiches': [
      b('Sandwich bread', 'sandwich bread', per(12), 'loaf', [3, 4], { units: 'loaves' }),
      b('Sliced deli turkey or ham', 'sliced deli turkey', per(12), 'pack', [4, 6]),
      b('Cheese slices', 'cheese slices', per(12), 'pack', [3, 5]),
      b('Strawberry jam', 'strawberry jam', one(1), 'jar', [3, 5], opt),
    ],
    'strawberry-lemon-water': [
      b('Strawberries, 1 lb', 'fresh strawberries', per(16), 'box', [3, 5], { units: 'boxes' }),
      b('Lemons', 'fresh lemons', per(6), 'lemon', [0.4, 0.8]),
      b('Glass drink pitcher', 'glass pitcher', one(1), 'pitcher', [12, 20], opt),
      b('Toddler sippy cups or paper cups', 'paper cups 9 oz pastel', each(1), 'cup', [0.1, 0.2], { cat: 'tableware', opt: true }),
    ],
    'rainbow-cake': [
      b('White cake mix', 'white cake mix', one(2), 'box', [2, 3], { units: 'boxes' }),
      b('Vanilla frosting', 'vanilla frosting', one(3), 'tub', [2, 3]),
      b('Large eggs', 'large eggs', one(1), 'dozen', [3, 5], { units: 'dozen' }),
      b('Pastel gel food coloring', 'pastel gel food coloring', one(1), 'set', [5, 9]),
      b('Rainbow sprinkles', 'rainbow sprinkles', one(1), 'jar', [3, 6]),
      b('Piping bags and star tip', 'piping bags star tip set', one(1), 'set', [6, 10]),
      b('Pastel birthday candles', 'pastel birthday candles', one(1), 'pack', [3, 5], opt),
      b('Smash cake pan, 6 in', '6 inch cake pan', one(1), 'pan', [6, 10], opt),
    ],
  },

  diy: {
    'rainbow-rice-sensory-bin': [
      b('White rice, 5 lb bag', 'long grain white rice 5 lb', one(1), 'bag', [4, 6]),
      b('Gel food coloring, rainbow set', 'gel food coloring rainbow set', one(1), 'set', [5, 9]),
      b('White vinegar', 'white vinegar', one(1), 'bottle', [2, 4], home),
      b('Zip-top bags, gallon', 'gallon zip bags', one(1), 'box', [3, 5], { ...home, units: 'boxes' }),
      b('Baking sheets to dry the rice', 'baking sheet', one(2), 'sheet', [6, 10], home),
    ],
    'ribbon-wands': [
      b('Pastel satin ribbon, assorted', 'pastel satin ribbon assorted', one(1), 'pack', [6, 10]),
      b('Wooden dowels, 12 in', 'wooden dowels 12 inch', each(1), 'dowel', [0.2, 0.4]),
      b('Small jingle bells', 'small jingle bells craft', one(1), 'pack', [3, 5], opt),
    ],
    'streamer-backdrop': [
      b('Pastel crepe paper streamers', 'pastel crepe paper streamers', one(1), 'pack', [8, 14]),
      b('Removable hooks or tape', 'removable adhesive hooks', one(1), 'pack', [4, 7], home),
      b('Tension rod (if no branch)', 'tension rod', one(1), 'rod', [8, 14], opt),
      b('Paper flowers', 'paper flowers backdrop pastel', one(1), 'set', [8, 14], opt),
    ],
  },
}
