// Starry Night catalog metadata. Costs are illustrative PLANNING ESTIMATES
// (USD ranges for generic items), not prices from any product or retailer.
import { zone, diet } from './helpers.js'

export default {
  activities: {
    'constellation-cards': { cost: { perChild: [0.4, 0.8], fixed: [5, 8] }, space: 'small', ages: { min: 5, max: 12 }, prep: { '1 week before': 'Print the constellation patterns' } },
    'glow-star-hunt': { cost: { perChild: [0.5, 1], fixed: [3, 6] }, space: 'medium', ages: { min: 3, max: 10 }, prep: { 'Party day': 'Hide the glow stars' } },
    'straw-rocket-launch': { cost: { perChild: [0.3, 0.6], fixed: [3, 6] }, space: 'medium', ages: { min: 5, max: 12 }, prep: { '1 week before': 'Print rocket templates and gather straws' } },
    'galaxy-jars': { cost: { perChild: [1.2, 2], fixed: [3, 6] }, space: 'small', ages: { min: 4, max: 12 }, prep: { 'Day before': 'Mix the colored water for galaxy jars' } },
    'star-cookie-studio': { cost: { perChild: [0.8, 1.4], fixed: [4, 8] }, space: 'small', ages: { min: 3, max: 12 }, prep: { 'Day before': 'Bake star cookies and portion icing' } },
    'astronaut-training': { cost: { fixed: [0, 5] }, space: 'large', ages: { min: 3, max: 10 }, prep: { 'Day before': 'Set out the astronaut obstacle course' } },
    'glow-dance-party': { cost: { perChild: [0.45, 0.9] }, space: 'medium', ages: { min: 2, max: 12 }, prep: { 'Day before': 'Make the glow-dance playlist' } },
    'backyard-stargazing': { cost: { perChild: [1, 2] }, space: 'large', ages: { min: 4, max: 12 }, prep: { '1 week before': 'Buy mini flashlights' } },
    'bedtime-star-stories': { cost: { fixed: [0, 0] }, space: 'small', ages: { min: 2, max: 8 }, prep: { '1 week before': 'Choose a bedtime star story' } },
  },

  decor: [
    zone({
      id: 'moonlit-welcome',
      zone: 'Moonlit welcome',
      essential: true,
      variants: [
        { id: 'welcome-stars', tier: 'budget', name: 'Star-garland doorway', description: 'Gold star garlands swagged over the door with a chalk “Welcome, Stargazers” sign.', supplies: [{ name: 'Gold star garland', qty: 1, est: [5, 9] }, { name: 'Chalkboard or kraft sign board', qty: 1, est: [5, 10] }] },
        { id: 'welcome-moon', tier: 'classic', name: 'Moon lantern & balloons', description: 'A glowing paper moon over a cluster of navy, silver and gold balloons, with star garlands.', supplies: [{ name: 'Navy, silver & gold balloon kit', qty: 1, est: [16, 24] }, { name: 'Gold star garland', qty: 2, est: [5, 9] }, { name: 'Paper moon lantern', qty: 1, est: [10, 18] }] },
        { id: 'welcome-galaxy', tier: 'premium', name: 'Galaxy balloon arch', description: 'A full navy-and-gold organic arch with foil stars and a glowing moon, framed with twinkle lights.', supplies: [{ name: 'Large galaxy balloon arch kit (200+ balloons)', qty: 1, est: [30, 45] }, { name: 'Balloon arch frame stand', qty: 1, est: [25, 40] }, { name: 'Electric balloon pump', qty: 1, est: [15, 25] }, { name: 'Foil star balloons', qty: 1, unit: 'set', est: [8, 14] }, { name: 'Paper moon lantern', qty: 1, est: [10, 18] }, { name: 'Gold star garland', qty: 2, est: [5, 9] }, { name: 'Warm fairy string lights', qty: 2, est: [6, 10] }] },
      ],
    }),
    zone({
      id: 'constellation-table',
      zone: 'The constellation table',
      essential: true,
      variants: [
        { id: 'table-paper', tier: 'budget', name: 'Star-doodle table', description: 'Black or navy paper down the table with chalk-drawn constellations and tealights.', supplies: [{ name: 'Black kraft paper roll', qty: 1, est: [6, 10] }, { name: 'Battery tealights', qty: 6, est: [0.5, 1] }] },
        { id: 'table-classic', tier: 'classic', name: 'Navy & gold star table', description: 'A navy runner scattered with gold confetti stars, glowing tealights and star garlands.', supplies: [{ name: 'Navy table runner', qty: 1, est: [8, 14] }, { name: 'Battery tealights', qty: 12, est: [0.5, 1] }, { name: 'Gold star confetti', qty: 1, unit: 'bag', est: [4, 7] }, { name: 'Gold star garland', qty: 1, est: [5, 9] }] },
        { id: 'table-cosmos', tier: 'premium', name: 'Cosmic tablescape', description: 'A sequin starry runner, a canopy of starlights, glowing orbs, gold accents and a tiered treat stand.', supplies: [{ name: 'Navy sequin table runner', qty: 1, est: [15, 25] }, { name: 'Star curtain string lights', qty: 1, est: [15, 25] }, { name: 'LED glowing orb lights', qty: 3, est: [6, 12] }, { name: 'Battery tealights', qty: 12, est: [0.5, 1] }, { name: 'Gold star confetti', qty: 1, unit: 'bag', est: [4, 7] }, { name: 'Gold star garland', qty: 2, est: [5, 9] }, { name: 'Tiered cake & treat stand', qty: 1, est: [12, 20] }] },
      ],
    }),
    zone({
      id: 'stargazing-den',
      zone: 'Stargazing den',
      servesKinds: ['quiet', 'outdoors', 'science'],
      variants: [
        { id: 'den-blankets', tier: 'budget', name: 'Blanket fort', description: 'Blankets and pillows from home with glow-in-the-dark stars on the ceiling.', supplies: [{ name: 'Glow-in-the-dark stars', qty: 1, unit: 'pack', est: [5, 8] }] },
        { id: 'den-classic', tier: 'classic', name: 'Stargazing den', description: 'Cushions under a draped sheet ceiling of glow stars, with mini flashlights in a basket.', supplies: [{ name: 'Glow-in-the-dark stars', qty: 2, unit: 'pack', est: [5, 8] }, { name: 'Floor cushions', qty: 2, est: [8, 15] }, { name: 'Warm fairy string lights', qty: 1, est: [6, 10] }] },
        { id: 'den-tent', tier: 'premium', name: 'Star-projector tent', description: 'A play tent with a star projector, a soft rug, cushions and string lights — a tiny planetarium.', supplies: [{ name: 'Kids play tent or teepee', qty: 1, est: [40, 70] }, { name: 'Star night-light projector', qty: 1, est: [15, 30] }, { name: 'Floor cushions', qty: 4, est: [8, 15] }, { name: 'Round faux-fur or play rug', qty: 1, est: [20, 35] }, { name: 'Warm fairy string lights', qty: 2, est: [6, 10] }, { name: 'Glow-in-the-dark stars', qty: 1, unit: 'pack', est: [5, 8] }] },
      ],
    }),
    zone({
      id: 'craft-observatory',
      zone: 'Craft observatory',
      servesKinds: ['crafts', 'science'],
      variants: [
        { id: 'obs-basic', tier: 'budget', name: 'Kitchen-table observatory', description: 'Craft supplies in bowls on a paper-covered table.', supplies: [{ name: 'Black kraft paper roll', qty: 1, est: [6, 10] }] },
        { id: 'obs-classic', tier: 'classic', name: 'Craft observatory', description: 'Supplies for constellation cards and galaxy jars sorted into trays, with a lamp for poking holes.', supplies: [{ name: 'Shallow plastic craft trays', qty: 4, est: [1.5, 3] }, { name: 'Black kraft paper roll', qty: 1, est: [6, 10] }] },
        { id: 'obs-studio', tier: 'premium', name: 'Planetarium craft studio', description: 'A craft caddy, labelled trays, hanging paper planets and a starlight canopy over the table.', supplies: [{ name: 'Wooden craft caddy', qty: 1, est: [15, 25] }, { name: 'Shallow plastic craft trays', qty: 6, est: [1.5, 3] }, { name: 'Mini chalkboard labels', qty: 1, unit: 'set', est: [8, 12] }, { name: 'Hanging paper planets', qty: 1, unit: 'set', est: [10, 16] }, { name: 'Warm fairy string lights', qty: 2, est: [6, 10] }, { name: 'Black kraft paper roll', qty: 1, est: [6, 10] }] },
      ],
    }),
    zone({
      id: 'wishing-wall',
      zone: 'Wishing wall',
      variants: [
        { id: 'wall-paper', tier: 'budget', name: 'Paper-star wishes', description: 'Paper stars and tape — each guest writes a wish and sticks it on the wall.', supplies: [{ name: 'Yellow cardstock', qty: 1, unit: 'pack', est: [5, 8] }] },
        { id: 'wall-classic', tier: 'classic', name: 'Wishing wall', description: 'A navy board with gold-star wish cards and a little clip for each one.', supplies: [{ name: 'Navy foam board', qty: 1, est: [5, 9] }, { name: 'Gold star cutouts', qty: 1, unit: 'pack', est: [5, 8] }, { name: 'Mini wooden clothespins', qty: 1, unit: 'pack', est: [4, 7] }] },
        { id: 'wall-lights', tier: 'premium', name: 'Glowing wish curtain', description: 'A curtain of fairy lights with wish stars clipped on, glowing behind the cake table.', supplies: [{ name: 'Curtain string lights', qty: 1, est: [15, 25] }, { name: 'Gold star cutouts', qty: 2, unit: 'pack', est: [5, 8] }, { name: 'Mini wooden clothespins', qty: 1, unit: 'pack', est: [4, 7] }, { name: 'Gold paint pens', qty: 1, unit: 'set', est: [6, 10] }, { name: 'Command hooks', qty: 1, unit: 'pack', est: [5, 8] }] },
      ],
    }),
  ],

  food: {
    'galaxy-cupcakes': { role: 'sweet', cost: { perChild: [0.6, 1] }, diet: diet({ 'gluten-free': 'swap', 'dairy-free': 'swap', 'egg-free': 'swap' }) },
    'star-sandwiches': { role: 'savory', cost: { perChild: [0.8, 1.4] }, diet: diet({ 'gluten-free': 'swap', 'dairy-free': 'swap', vegetarian: 'swap' }) },
    'crescent-moon-crackers': { role: 'savory', cost: { perChild: [0.3, 0.6] }, diet: diet({ 'gluten-free': 'swap', 'dairy-free': 'swap' }) },
    'shooting-star-fruit-wands': { role: 'fresh', cost: { perChild: [0.9, 1.5] }, diet: diet() },
    'rocket-veggie-cups': { role: 'fresh', cost: { perChild: [0.6, 1] }, diet: diet({ 'dairy-free': 'swap', 'egg-free': 'swap' }) },
    'twinkle-lemonade': { role: 'drink', cost: { perChild: [0.3, 0.5] }, diet: diet() },
    'the-cake': { role: 'showpiece', headline: true, cost: { fixed: [25, 45] }, costNote: 'Homemade estimate; bakery prices vary.', diet: diet({ 'gluten-free': 'swap', 'dairy-free': 'swap', 'egg-free': 'swap' }) },
  },

  diy: {
    'paper-moon-lantern': { kinds: ['crafts'], cost: { fixed: [6, 12] }, minutes: 60, prep: { '1 week before': 'Make the paper moon lantern' } },
    'constellation-cards': { kinds: ['crafts', 'science'], requires: { activities: ['constellation-cards'] }, cost: { fixed: [0, 0] }, costNote: 'Supplies are part of Constellation Cards', minutes: 30 },
    'galaxy-jars': { kinds: ['crafts', 'science'], requires: { activities: ['galaxy-jars'] }, cost: { fixed: [0, 0] }, costNote: 'Supplies are part of Galaxy Jars', minutes: 20 },
  },

  essentialsFromShop: ['Tableware', 'Favors'],
}
