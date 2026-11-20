// Fairy Garden buy lists. Activities shop from their full guides and the
// menu from its recipes (priced in src/data/supplies/), so only the DIY
// projects need lists here. Costs are planning estimates, not retailer prices.
import { b, each, one, opt, home } from './helpers.js'

export default {
  diy: {
    'painted-toadstools': [
      b('Terracotta pots, assorted sizes', 'small terracotta pots', one(5), 'pot', [1, 2]),
      b('Paper bowls for the caps', 'paper bowls', one(1), 'pack', [3, 5]),
      b('Acrylic paint, red, white & blush', 'acrylic paint set', one(1), 'set', [5, 9]),
      b('Hot glue gun and sticks', 'hot glue gun with sticks', one(1), 'kit', [8, 14], home),
      b('Round sponge dabbers', 'round sponge dabbers', one(1), 'set', [3, 6]),
    ],
    'flower-crown-bases': [
      b('Green pipe cleaners', 'green chenille stems pipe cleaners 12 inch', each(3, 6), 'stem', [0.05, 0.1]),
      b('Green floral tape', 'green floral tape', one(2), 'roll', [1.5, 3]),
      b('Faux small blooms', 'small artificial flower picks craft', each(8), 'bloom', [0.15, 0.3]),
      b('Pastel satin ribbon', 'pastel satin ribbon 3/8 inch', one(1), 'spool', [3, 6]),
    ],
    'fairy-door': [
      b('Craft wood plaque or popsicle sticks', 'jumbo popsicle sticks', one(1), 'pack', [3, 6]),
      b('Acrylic paints', 'acrylic paint set', one(1), 'set', [5, 9], home),
      b('Tiny hinges or brads', 'miniature hinges craft', one(1), 'set', [3, 6]),
      b('Preserved moss and pebbles', 'preserved moss craft', one(1), 'bag', [5, 9]),
    ],
    'pressed-bloom-cake-topping': [
      b('Pressed edible flowers', 'pressed edible flowers', one(1), 'box', [12, 20]),
      b('Piping gel', 'piping gel', one(1), 'tub', [3, 5], opt),
      b('Small food-safe brush', 'pastry brush small', one(1), 'brush', [3, 5], home),
    ],
  },
}
