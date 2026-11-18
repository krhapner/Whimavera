// Fairy Garden catalog metadata — everything the recommendation engine needs
// to judge suitability: cost ranges, space, ages, diet, dependencies and the
// prep tasks each item adds to the checklist. Content (descriptions, guides,
// recipes) stays in plans/, guides/ and recipes/; this file only describes it.
//
// Costs are illustrative PLANNING ESTIMATES (USD ranges for generic items),
// not prices from any real product or retailer.
//   perChild: [lo, hi] × guest count; fixed: [lo, hi] once; perBatch: × recipe batches.
// space: 'small' (fits indoors), 'medium' (a large room or patio), 'large' (a yard or park).

export default {
  // ---- Activities (ids match plan.games) ----
  activities: {
    'flower-crown-studio': {
      cost: { perChild: [1.2, 2], fixed: [2, 4] },
      space: 'small',
      prep: { '2 weeks before': 'Gather flower crown supplies', 'Day before': 'Make the crown bases' },
    },
    'fairy-treasure-hunt': {
      cost: { perChild: [1, 2], fixed: [3, 5] },
      space: 'medium',
      prep: { '1 week before': 'Make the picture clue cards', 'Party day': 'Hide the treasure-hunt gems' },
    },
    'toadstool-cupcake-bar': {
      cost: { perChild: [0.2, 0.5] },
      space: 'small',
      requires: { food: ['toadstool-cupcakes'] },
      costNote: 'Plus the toadstool cupcakes on the menu',
      prep: { 'Day before': 'Portion frosting and spots for the cupcake bar' },
    },
    'fairy-potion-lab': {
      cost: { perChild: [0.6, 1.2], fixed: [8, 14] },
      space: 'small',
      prep: { 'Day before': 'Brew and chill the butterfly-pea tea' },
    },
    'freeze-fairy': {
      cost: { fixed: [0, 0] },
      space: 'medium',
      prep: { 'Day before': 'Make the freeze-dance playlist' },
    },
    'bug-bloom-safari': {
      cost: { perChild: [0.8, 1.6], fixed: [2, 5] },
      space: 'large',
      prep: { '1 week before': 'Draw the safari picture checklists', 'Party day': 'Walk the yard and remove any wild mushrooms' },
    },
    'wish-jars': {
      cost: { perChild: [1.5, 3], fixed: [5, 10] },
      space: 'small',
      prep: { '1 week before': 'Buy plastic jars and colored sand' },
    },
    'musical-toadstools': {
      cost: { perChild: [1.5, 3], fixed: [3, 6] },
      space: 'large',
      prep: { '1 week before': 'Make the non-slip toadstool mats' },
    },
    'fairy-storytime': {
      cost: { fixed: [0, 0] },
      space: 'small',
      prep: { '1 week before': 'Choose a fairy picture book' },
    },
  },

  // ---- Decorations: setup zones (slots) with budget / classic / premium versions ----
  // `zone` matches plan.setup[].zone for its description and photo.
  decor: [
    {
      id: 'welcome',
      zone: 'Welcome arch',
      essential: true,
      variants: [
        {
          id: 'welcome-sign',
          tier: 'budget',
          name: 'Hand-lettered welcome sign',
          description: 'A painted “Fairies Welcome” sign on an easel, framed with garden clippings and ribbon streamers.',
          cost: { fixed: [8, 18] },
          supplies: [
            { name: 'Chalkboard or kraft sign board', qty: 1, est: [5, 10] },
            { name: 'Ribbon in palette colors', qty: 1, unit: 'spool', est: [3, 6] },
          ],
        },
        {
          id: 'balloon-arch',
          tier: 'classic',
          name: 'Blush & sage balloon half-arch',
          description:
            'A half-arch of blush, sage and lavender balloons woven with faux ivy, with the hand-lettered “Fairies Welcome” sign on a small easel.',
          cost: { fixed: [34, 54] },
          supplies: [
            { name: 'Pastel balloon garland kit', qty: 1, est: [18, 26] },
            { name: 'Faux ivy & floral garland', qty: 2, est: [8, 14] },
          ],
        },
        {
          id: 'designer-balloons',
          tier: 'premium',
          name: 'Designer balloon garland, installed',
          description:
            'A full organic balloon arch with paper butterflies and oversized toadstools, built on site by a local balloon stylist.',
          cost: { fixed: [250, 500] },
          costNote: 'Varies widely by area and size — ask local stylists for quotes.',
          supplies: [],
        },
      ],
    },
    {
      id: 'feast-table',
      zone: 'The fairy feast table',
      essential: true,
      variants: [
        {
          id: 'blanket-feast',
          tier: 'budget',
          name: 'Picnic-blanket feast',
          description: 'Blankets and floor cushions around a coffee table, with garden flowers in jam jars down the middle.',
          cost: { fixed: [5, 12] },
          supplies: [{ name: 'Jam jars or bud vases (from home) + garden flowers', qty: 1, est: [0, 5] }, { name: 'Kraft paper table runner', qty: 1, est: [5, 7] }],
        },
        {
          id: 'styled-feast',
          tier: 'classic',
          name: 'Moss runner & toadstool table',
          description:
            'A low table dressed with a moss runner, mismatched bud vases, paper toadstools and warm string lights down the center.',
          cost: { fixed: [42, 68] },
          supplies: [
            { name: 'Moss table runner', qty: 1, est: [12, 18] },
            { name: 'Warm fairy string lights', qty: 3, est: [6, 10] },
            { name: 'Paper toadstool decorations', qty: 1, unit: 'set', est: [12, 20] },
          ],
        },
        {
          id: 'fresh-flower-feast',
          tier: 'premium',
          name: 'Fresh-flower & moss tablescape',
          description: 'A lush runner of fresh pastel flowers and moss from a local florist, with fairy lights and toadstools.',
          cost: { fixed: [120, 250] },
          costNote: 'Florist pricing varies by season and area.',
          supplies: [{ name: 'Fresh flowers (florist or market)', qty: 1, est: [80, 180] }, { name: 'Moss table runner', qty: 1, est: [12, 18] }, { name: 'Warm fairy string lights', qty: 3, est: [6, 10] }],
        },
      ],
    },
    {
      id: 'craft-glade',
      zone: 'Craft glade',
      servesKinds: ['crafts'],
      variants: [
        {
          id: 'craft-glade',
          tier: 'classic',
          name: 'Craft glade',
          description: 'A side table for wands and flower crowns, with supplies pre-sorted into small baskets so little hands can help themselves.',
          cost: { fixed: [5, 12] },
          supplies: [{ name: 'Small baskets for sorting supplies', qty: 4, est: [1, 3] }],
        },
      ],
    },
    {
      id: 'photo-nook',
      zone: 'Photo nook',
      servesKinds: ['pretend'],
      variants: [
        {
          id: 'diy-nook',
          tier: 'classic',
          name: 'Sheer-fabric photo nook',
          description: 'Sheer fabric draped from a branch, a basket of wings and wands, and fairy lights behind for a dreamy glow.',
          cost: { fixed: [15, 35] },
          supplies: [{ name: 'Sheer voile fabric, 5 yd', qty: 1, est: [8, 18] }, { name: 'Dress-up fairy wings', qty: 4, est: [2, 4] }],
        },
        {
          id: 'canopy-nook',
          tier: 'premium',
          name: 'Bell tent or canopy rental',
          description: 'A rented bell tent or canopy styled with cushions, rugs and lights — a magical dress-up and photo hideaway.',
          cost: { fixed: [150, 350] },
          costNote: 'Rental prices vary by area and season.',
          supplies: [],
        },
      ],
    },
    {
      id: 'favor-tree',
      zone: 'Favor tree',
      variants: [
        {
          id: 'favor-tree',
          tier: 'classic',
          name: 'Favor tree',
          description: 'Kraft favor bags tied with ribbon hanging from a potted branch near the exit.',
          cost: { fixed: [6, 15] },
          supplies: [{ name: 'Potted branch or small tree (borrow one)', qty: 1, est: [0, 8] }, { name: 'Ribbon for hanging favors', qty: 1, unit: 'spool', est: [3, 6] }],
        },
      ],
    },
  ],

  // ---- Food (ids match plan.food / recipes) ----
  // role: a lean menu has one 'showpiece', a 'drink' and something 'fresh';
  // 'savory' and 'sweet' dishes (and the headline cake) are budget upgrades.
  // diet: 'yes' as written, 'swap' with the recipe's substitution, 'no' not suitable.
  food: {
    'toadstool-cupcakes': {
      role: 'showpiece',
      cost: { perBatch: [10, 16] },
      diet: { 'nut-free': 'yes', 'gluten-free': 'swap', 'dairy-free': 'swap', 'egg-free': 'swap', vegetarian: 'yes' },
    },
    'fairy-treats': {
      role: 'sweet',
      cost: { perBatch: [9, 14] },
      diet: { 'nut-free': 'yes', 'gluten-free': 'swap', 'dairy-free': 'swap', 'egg-free': 'yes', vegetarian: 'swap' },
    },
    'rainbow-fruit-wands': {
      role: 'fresh',
      cost: { perBatch: [12, 20] },
      diet: { 'nut-free': 'yes', 'gluten-free': 'yes', 'dairy-free': 'yes', 'egg-free': 'yes', vegetarian: 'yes' },
    },
    'garden-veggie-cups': {
      role: 'fresh',
      cost: { perBatch: [10, 16] },
      diet: { 'nut-free': 'yes', 'gluten-free': 'yes', 'dairy-free': 'yes', 'egg-free': 'yes', vegetarian: 'yes' },
    },
    'honey-pinwheel-sandwiches': {
      role: 'savory',
      cost: { perBatch: [10, 16] },
      diet: { 'nut-free': 'yes', 'gluten-free': 'swap', 'dairy-free': 'swap', 'egg-free': 'yes', vegetarian: 'swap' },
    },
    'petal-pink-lemonade': {
      role: 'drink',
      cost: { perBatch: [4, 6] },
      diet: { 'nut-free': 'yes', 'gluten-free': 'yes', 'dairy-free': 'yes', 'egg-free': 'yes', vegetarian: 'yes' },
    },
    'fairy-cake': {
      role: 'showpiece',
      headline: true,
      cost: { fixed: [25, 45] },
      costNote: 'Homemade estimate; bakery prices vary.',
      diet: { 'nut-free': 'yes', 'gluten-free': 'swap', 'dairy-free': 'swap', 'egg-free': 'no', vegetarian: 'yes' },
      prep: { 'Day before': 'Bake, stack and crumb-coat the cake', 'Party day': 'Add pressed flowers to the cake' },
    },
  },

  // ---- DIY projects (ids are slugs of plan.diy names) ----
  diy: {
    'painted-toadstools': {
      kinds: ['crafts'],
      cost: { fixed: [12, 25] },
      minutes: 120,
      prep: { '1 week before': 'Paint the toadstools' },
    },
    'flower-crown-bases': {
      kinds: ['crafts'],
      requires: { activities: ['flower-crown-studio'] },
      cost: { fixed: [0, 0] },
      costNote: 'Supplies are part of Flower Crown Studio',
      minutes: 45,
    },
    'fairy-door': {
      kinds: ['crafts', 'pretend'],
      cost: { fixed: [8, 15] },
      minutes: 60,
      prep: { '1 week before': 'Make and paint the fairy door' },
    },
    'pressed-bloom-cake-topping': {
      kinds: ['cooking'],
      requires: { food: ['fairy-cake'] },
      cost: { fixed: [0, 0] },
      costNote: 'Flowers are in the cake recipe',
      minutes: 30,
    },
  },

  // Always-needed basics, scaled by guests (tableware & favors come from plan.shop).
  essentialsFromShop: ['Tableware', 'Favors'],
}
