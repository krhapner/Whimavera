// Woodland Tea catalog metadata. Costs are illustrative PLANNING ESTIMATES
// (USD ranges for generic items), not prices from any product or retailer.
import { zone, diet } from './helpers.js'

export default {
  activities: {
    'teacup-planters': { cost: { perChild: [2.5, 5], fixed: [3, 6] }, space: 'small', ages: { min: 4, max: 12 }, prep: { '2 weeks before': 'Thrift teacups and buy seedlings' } },
    'woodland-animal-masks': { cost: { perChild: [1, 2] }, space: 'small', ages: { min: 3, max: 10 }, prep: { '1 week before': 'Print and cut the mask templates' } },
    'tea-sandwich-kitchen': { cost: { perChild: [0.3, 0.6] }, space: 'small', ages: { min: 4, max: 12 }, requires: { food: ['tea-sandwiches'] }, costNote: 'Plus the tea sandwiches on the menu', prep: { 'Day before': 'Prep sandwich fillings and cutters' } },
    'acorn-hunt': { cost: { fixed: [6, 10] }, space: 'medium', ages: { min: 2, max: 10 }, prep: { 'Party day': 'Hide the wooden acorns' } },
    'fancy-hat-parade': { cost: { perChild: [0.5, 1] }, space: 'medium', ages: { min: 3, max: 10 }, prep: { '1 week before': 'Gather hats and trimmings' } },
    'pass-the-teapot': { cost: { perChild: [0.3, 0.6] }, space: 'small', ages: { min: 3, max: 10 }, prep: { 'Day before': 'Wrap the little prizes' } },
    'fox-rabbits': { cost: { fixed: [0, 0] }, space: 'large', ages: { min: 4, max: 12 } },
    'leaf-rubbing-journals': { cost: { perChild: [0.5, 1], fixed: [3, 5] }, space: 'medium', ages: { min: 4, max: 12 }, prep: { '1 week before': 'Make the little leaf journals' } },
    'story-circle': { cost: { fixed: [0, 0] }, space: 'small', ages: { min: 2, max: 8 }, prep: { '1 week before': 'Choose a woodland picture book' } },
  },

  decor: [
    zone({
      id: 'woodland-welcome',
      zone: 'Woodland welcome',
      essential: true,
      variants: [
        { id: 'welcome-greens', tier: 'budget', name: 'Garden-greens doorway', description: 'Clippings from the garden tied over the door with twine, and a hand-lettered sign.', supplies: [{ name: 'Jute twine', qty: 1, unit: 'spool', est: [3, 6] }, { name: 'Chalkboard or kraft sign board', qty: 1, est: [5, 10] }] },
        { id: 'welcome-ferns', tier: 'classic', name: 'Fern garland & lanterns', description: 'Fern garlands over the entry with lanterns at the path and a woodland welcome sign.', supplies: [{ name: 'Faux fern garland', qty: 2, est: [8, 14] }, { name: 'Small lanterns', qty: 2, est: [4, 8] }, { name: 'Chalkboard or kraft sign board', qty: 1, est: [5, 10] }] },
        { id: 'welcome-arch', tier: 'premium', name: 'Enchanted forest arch', description: 'A sage-and-cream organic balloon arch woven with ferns, mushrooms and lights, with lanterns lining the path.', supplies: [{ name: 'Large sage & cream balloon arch kit (200+ balloons)', qty: 1, est: [30, 45] }, { name: 'Balloon arch frame stand', qty: 1, est: [25, 40] }, { name: 'Electric balloon pump', qty: 1, est: [15, 25] }, { name: 'Faux fern garland', qty: 3, est: [8, 14] }, { name: 'Small lanterns', qty: 4, est: [4, 8] }, { name: 'Warm fairy string lights', qty: 2, est: [6, 10] }, { name: 'Chalkboard or kraft sign board', qty: 1, est: [5, 10] }] },
      ],
    }),
    zone({
      id: 'tea-table',
      zone: 'The tea table',
      essential: true,
      variants: [
        { id: 'tea-simple', tier: 'budget', name: 'Kitchen tea table', description: 'A tablecloth from home, garden flowers in jars and mismatched mugs.', supplies: [{ name: 'Kraft paper table runner', qty: 1, est: [5, 7] }, { name: 'Small glass bud vases', qty: 3, est: [1, 2] }] },
        { id: 'tea-classic', tier: 'classic', name: 'Linen & fern tea table', description: 'A linen-look cloth, a fern runner, a tiered cake stand and little lanterns.', supplies: [{ name: 'Linen-look tablecloth', qty: 1, est: [12, 20] }, { name: 'Faux fern garland', qty: 1, est: [8, 14] }, { name: 'Tiered cake & treat stand', qty: 1, est: [12, 20] }, { name: 'Small lanterns', qty: 2, est: [4, 8] }] },
        { id: 'tea-luxe', tier: 'premium', name: 'Enchanted tea tablescape', description: 'Linen, moss and fern runners, bud vases, mushroom accents, tea lights and two tiers of treats.', supplies: [{ name: 'Linen-look tablecloth', qty: 1, est: [12, 20] }, { name: 'Moss table runner', qty: 1, est: [12, 18] }, { name: 'Faux fern garland', qty: 2, est: [8, 14] }, { name: 'Small glass bud vases', qty: 6, est: [1.5, 3] }, { name: 'Paper toadstool decorations', qty: 1, unit: 'set', est: [12, 20] }, { name: 'Flameless LED tea lights', qty: 1, unit: 'pack', est: [8, 14] }, { name: 'Tiered cake & treat stand', qty: 2, est: [12, 20] }] },
      ],
    }),
    zone({
      id: 'hat-bar',
      zone: 'Hat & bonnet bar',
      servesKinds: ['pretend', 'music'],
      variants: [
        { id: 'hat-home', tier: 'budget', name: 'Dress-up basket', description: 'A basket of hats and scarves from home, with a mirror nearby.', supplies: [{ name: 'Faux flower picks', qty: 1, unit: 'bunch', est: [4, 7] }] },
        { id: 'hat-classic', tier: 'classic', name: 'Hat & bonnet bar', description: 'Straw hats and trimmings — ribbons, flowers and feathers — to decorate before the parade.', supplies: [{ name: 'Kids straw hats', qty: 4, est: [2, 4] }, { name: 'Faux flower picks', qty: 1, unit: 'bunch', est: [4, 7] }, { name: 'Ribbon in palette colors', qty: 1, unit: 'spool', est: [3, 6] }] },
        { id: 'hat-boutique', tier: 'premium', name: 'Milliner’s boutique', description: 'A hat stand of straw hats, a trimmings caddy, a standing mirror and a little runway rug for the parade.', supplies: [{ name: 'Kids straw hats', qty: 8, est: [2, 4] }, { name: 'Faux flower picks', qty: 2, unit: 'bunch', est: [4, 7] }, { name: 'Ribbon in palette colors', qty: 2, unit: 'spool', est: [3, 6] }, { name: 'Craft feathers', qty: 1, unit: 'pack', est: [4, 7] }, { name: 'Wooden craft caddy', qty: 1, est: [15, 25] }, { name: 'Runner rug', qty: 1, est: [15, 25] }] },
      ],
    }),
    zone({
      id: 'craft-clearing',
      zone: 'Craft clearing',
      servesKinds: ['crafts', 'outdoors'],
      variants: [
        { id: 'clearing-basic', tier: 'budget', name: 'Picnic-table crafts', description: 'Supplies in bowls on a paper-covered table outside.', supplies: [{ name: 'Kraft paper table runner', qty: 1, est: [5, 7] }] },
        { id: 'clearing-classic', tier: 'classic', name: 'Craft clearing', description: 'Planters and masks set out on trays, with paint pens and soil in little baskets.', supplies: [{ name: 'Small baskets for sorting supplies', qty: 4, est: [1, 3] }, { name: 'Kraft paper table runner', qty: 1, est: [5, 7] }] },
        { id: 'clearing-studio', tier: 'premium', name: 'Forest craft studio', description: 'A craft caddy, labelled baskets and a fern-and-lantern canopy over a long craft table.', supplies: [{ name: 'Wooden craft caddy', qty: 1, est: [15, 25] }, { name: 'Small baskets for sorting supplies', qty: 6, est: [1, 3] }, { name: 'Mini chalkboard labels', qty: 1, unit: 'set', est: [8, 12] }, { name: 'Faux fern garland', qty: 2, est: [8, 14] }, { name: 'Small lanterns', qty: 2, est: [4, 8] }, { name: 'Kraft paper table runner', qty: 1, est: [5, 7] }] },
      ],
    }),
    zone({
      id: 'forest-friends',
      zone: 'Friends of the forest',
      variants: [
        { id: 'friends-toys', tier: 'budget', name: 'Stuffed-animal guests', description: 'Stuffed animals from home seated at their own little table.', supplies: [{ name: 'Woodland animal stickers', qty: 1, unit: 'pack', est: [3, 5] }] },
        { id: 'friends-classic', tier: 'classic', name: 'Friends of the forest', description: 'Woodland animal figures nestled in moss and ferns, with name cards for each.', supplies: [{ name: 'Woodland animal figurines', qty: 1, unit: 'set', est: [10, 16] }, { name: 'Preserved moss', qty: 1, unit: 'bag', est: [6, 10] }] },
        { id: 'friends-grove', tier: 'premium', name: 'Woodland grove display', description: 'Plush woodland animals on log slices among moss, ferns, mushrooms and glowing lanterns.', supplies: [{ name: 'Plush woodland animals', qty: 4, est: [8, 14] }, { name: 'Wood log slices', qty: 1, unit: 'set', est: [12, 20] }, { name: 'Preserved moss', qty: 2, unit: 'bag', est: [6, 10] }, { name: 'Faux fern garland', qty: 1, est: [8, 14] }, { name: 'Paper toadstool decorations', qty: 1, unit: 'set', est: [12, 20] }, { name: 'Small lanterns', qty: 2, est: [4, 8] }] },
      ],
    }),
  ],

  food: {
    'tea-sandwiches': { role: 'savory', cost: { perChild: [0.8, 1.4] }, diet: diet({ 'gluten-free': 'swap', 'dairy-free': 'swap', vegetarian: 'swap' }) },
    'mini-scones': { role: 'sweet', cost: { perChild: [0.5, 0.9] }, diet: diet({ 'gluten-free': 'swap', 'dairy-free': 'swap', 'egg-free': 'swap' }) },
    'mushroom-meringues': { role: 'sweet', cost: { perChild: [0.3, 0.6] }, diet: diet({ 'egg-free': 'no' }) },
    'berry-bowls': { role: 'fresh', cost: { perChild: [1, 1.8] }, diet: diet() },
    'garden-crudit-s': { role: 'fresh', cost: { perChild: [0.6, 1] }, diet: diet({ 'dairy-free': 'swap', 'egg-free': 'swap' }) },
    'woodland-tea': { role: 'drink', cost: { perChild: [0.3, 0.5] }, diet: diet() },
    'the-cake': { role: 'showpiece', headline: true, cost: { fixed: [30, 50] }, costNote: 'Homemade estimate; fresh berries and bakery prices vary.', diet: diet({ 'gluten-free': 'swap', 'dairy-free': 'swap', 'egg-free': 'swap' }) },
  },

  diy: {
    'fresh-fern-garland': { kinds: ['crafts', 'outdoors'], cost: { fixed: [4, 8] }, minutes: 45, prep: { 'Day before': 'Make the fresh fern garland' } },
    'woodland-animal-masks': { kinds: ['crafts', 'pretend'], requires: { activities: ['woodland-animal-masks'] }, cost: { fixed: [0, 0] }, costNote: 'Supplies are part of Woodland Animal Masks', minutes: 60 },
    'teacup-planters': { kinds: ['crafts', 'outdoors'], requires: { activities: ['teacup-planters'] }, cost: { fixed: [0, 0] }, costNote: 'Supplies are part of Teacup Planters', minutes: 30 },
  },

  essentialsFromShop: ['Tableware', 'Favors'],
}
