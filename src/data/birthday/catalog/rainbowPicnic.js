// Rainbow Picnic catalog metadata. Costs are illustrative PLANNING ESTIMATES
// (USD ranges for generic items), not prices from any product or retailer.
import { zone, diet } from './helpers.js'

export default {
  activities: {
    'bubble-meadow': { cost: { fixed: [15, 25] }, space: 'large', ages: { min: 1, max: 8 }, prep: { '1 week before': 'Test the bubble machine and buy solution' } },
    'rainbow-sensory-bins': { cost: { fixed: [6, 12] }, space: 'small', ages: { min: 1, max: 6 }, prep: { '1 week before': 'Dye and dry the rainbow rice' } },
    'color-hunt': { cost: { fixed: [0, 3] }, space: 'medium', ages: { min: 2, max: 10 }, prep: { 'Day before': 'Make the color-hunt cards' } },
    'parachute-play': { cost: { fixed: [15, 25] }, space: 'medium', ages: { min: 1, max: 8 }, prep: { '1 week before': 'Buy or borrow a play parachute' } },
    'ribbon-dance': { cost: { perChild: [0.8, 1.5] }, space: 'medium', ages: { min: 1, max: 10 }, prep: { 'Day before': 'Make the ribbon-dance playlist' } },
    'sticker-rainbows': { cost: { perChild: [0.4, 0.8] }, space: 'small', ages: { min: 2, max: 8 }, prep: { '1 week before': 'Print the rainbow outlines' } },
    'sprinkle-cookie-bar': { cost: { perChild: [0.8, 1.4], fixed: [4, 8] }, space: 'small', ages: { min: 2, max: 10 }, prep: { 'Day before': 'Bake cookies and portion icing and sprinkles' } },
    'teddy-bear-picnic': { cost: { fixed: [0, 0] }, space: 'small', ages: { min: 1, max: 6 }, prep: { 'Day before': 'Remind guests to bring a teddy' } },
    'rainbow-storytime': { cost: { fixed: [0, 0] }, space: 'small', ages: { min: 1, max: 6 }, prep: { '1 week before': 'Choose a rainbow picture book' } },
  },

  decor: [
    zone({
      id: 'rainbow-welcome',
      zone: 'Rainbow welcome',
      essential: true,
      variants: [
        { id: 'welcome-streamers', tier: 'budget', name: 'Streamer rainbow doorway', description: 'Pastel streamers in rainbow order hung across the door, with a chalk welcome sign.', supplies: [{ name: 'Pastel crepe paper streamers', qty: 1, unit: 'pack', est: [5, 8] }, { name: 'Chalkboard or kraft sign board', qty: 1, est: [5, 10] }] },
        { id: 'welcome-balloons', tier: 'classic', name: 'Pastel balloon rainbow', description: 'A pastel balloon rainbow over the entry with streamer tails and a welcome sign.', supplies: [{ name: 'Pastel balloon rainbow kit', qty: 1, est: [18, 26] }, { name: 'Balloon glue dots', qty: 1, unit: 'pack', est: [4, 7] }, { name: 'Pastel crepe paper streamers', qty: 1, unit: 'pack', est: [5, 8] }, { name: 'Chalkboard or kraft sign board', qty: 1, est: [5, 10] }] },
        { id: 'welcome-grand', tier: 'premium', name: 'Grand rainbow arch', description: 'A full free-standing pastel rainbow arch with cloud balloons and a flower garland.', supplies: [{ name: 'Large pastel rainbow balloon arch kit (200+ balloons)', qty: 1, est: [30, 45] }, { name: 'Balloon arch frame stand', qty: 1, est: [25, 40] }, { name: 'Electric balloon pump', qty: 1, est: [15, 25] }, { name: 'Cloud foil balloons', qty: 1, unit: 'set', est: [8, 14] }, { name: 'Silk flower garland runner', qty: 1, est: [15, 25] }, { name: 'Balloon glue dots', qty: 1, unit: 'pack', est: [4, 7] }, { name: 'Chalkboard or kraft sign board', qty: 1, est: [5, 10] }] },
      ],
    }),
    zone({
      id: 'picnic-blankets',
      zone: 'Picnic blankets',
      essential: true,
      variants: [
        { id: 'blankets-home', tier: 'budget', name: 'Blankets from home', description: 'Every blanket in the house laid out together, with flowers in jars at the center.', supplies: [{ name: 'Small glass bud vases', qty: 3, est: [1, 2] }] },
        { id: 'blankets-classic', tier: 'classic', name: 'Gingham picnic', description: 'Gingham blankets around low crates, with picnic baskets of treats and pastel flowers.', supplies: [{ name: 'Gingham picnic blankets', qty: 2, est: [10, 18] }, { name: 'Picnic baskets or crates', qty: 1, est: [8, 15] }, { name: 'Small glass bud vases', qty: 3, est: [1, 2] }] },
        { id: 'blankets-luxe', tier: 'premium', name: 'Styled boho picnic', description: 'A low picnic table on rugs and cushions, with a flower runner, pastel lanterns and a tiered treat stand.', supplies: [{ name: 'Low picnic table', qty: 1, est: [30, 50] }, { name: 'Gingham picnic blankets', qty: 3, est: [10, 18] }, { name: 'Floor cushions', qty: 4, est: [8, 15] }, { name: 'Silk flower garland runner', qty: 1, est: [15, 25] }, { name: 'Pastel paper lanterns', qty: 1, unit: 'set', est: [10, 16] }, { name: 'Tiered cake & treat stand', qty: 1, est: [12, 20] }] },
      ],
    }),
    zone({
      id: 'little-ones',
      zone: 'Little-ones play zone',
      servesKinds: ['quiet', 'pretend'],
      variants: [
        { id: 'little-blanket', tier: 'budget', name: 'Soft blanket corner', description: 'A blanket and a basket of toys from home, set apart for the littlest guests.', supplies: [{ name: 'Teddy bear picnic stickers', qty: 1, unit: 'pack', est: [3, 5] }] },
        { id: 'little-classic', tier: 'classic', name: 'Little-ones play zone', description: 'Foam mats, a sensory bin and stacking toys in a calm corner.', supplies: [{ name: 'Foam play mats', qty: 1, unit: 'set', est: [15, 25] }, { name: 'Shallow plastic craft trays', qty: 2, est: [1.5, 3] }] },
        { id: 'little-nook', tier: 'premium', name: 'Cloud play nook', description: 'A play tent with foam mats, cushions, soft blocks and cloud lights — a peaceful spot for toddlers.', supplies: [{ name: 'Kids play tent or teepee', qty: 1, est: [40, 70] }, { name: 'Foam play mats', qty: 1, unit: 'set', est: [15, 25] }, { name: 'Floor cushions', qty: 2, est: [8, 15] }, { name: 'Soft foam play blocks', qty: 1, unit: 'set', est: [15, 25] }, { name: 'Cloud string lights', qty: 1, est: [10, 16] }] },
      ],
    }),
    zone({
      id: 'bubble-meadow-zone',
      zone: 'Bubble meadow',
      servesKinds: ['outdoors', 'active'],
      variants: [
        { id: 'meadow-wands', tier: 'budget', name: 'Bubble wands', description: 'Homemade bubble solution and wands from the kitchen drawer.', supplies: [{ name: 'Bubble solution refill', qty: 1, est: [4, 8] }] },
        { id: 'meadow-classic', tier: 'classic', name: 'Bubble meadow', description: 'A bubble machine on a crate with a stack of wands for chasing.', supplies: [{ name: 'Bubble machine', qty: 1, est: [15, 25] }, { name: 'Bubble solution refill', qty: 1, est: [4, 8] }] },
        { id: 'meadow-grand', tier: 'premium', name: 'Bubble wonderland', description: 'Two bubble machines, giant wands, a bubble tray and pinwheels lining the lawn.', supplies: [{ name: 'Bubble machine', qty: 2, est: [15, 25] }, { name: 'Bubble solution refill', qty: 2, est: [4, 8] }, { name: 'Giant bubble wands', qty: 1, unit: 'set', est: [10, 16] }, { name: 'Rainbow pinwheels', qty: 1, unit: 'pack', est: [8, 14] }, { name: 'Bubble tray', qty: 1, est: [6, 10] }] },
      ],
    }),
    zone({
      id: 'streamer-photo',
      zone: 'Streamer photo spot',
      servesKinds: ['pretend'],
      variants: [
        { id: 'photo-wall', tier: 'budget', name: 'Taped streamer wall', description: 'Pastel streamers taped to a wall in rainbow order.', supplies: [{ name: 'Pastel crepe paper streamers', qty: 1, unit: 'pack', est: [5, 8] }] },
        { id: 'photo-classic', tier: 'classic', name: 'Streamer photo spot', description: 'Streamers hung from a rod or branch as a fringe curtain, with paper clouds on top.', supplies: [{ name: 'Pastel crepe paper streamers', qty: 2, unit: 'pack', est: [5, 8] }, { name: 'Tension curtain rod', qty: 1, est: [8, 14] }, { name: 'Paper cloud decorations', qty: 1, unit: 'set', est: [6, 10] }] },
        { id: 'photo-grand', tier: 'premium', name: 'Rainbow photo backdrop', description: 'A fringe backdrop on a stand, framed with balloon clouds and a giant rainbow, with props for every guest.', supplies: [{ name: 'Rainbow fringe photo backdrop', qty: 1, est: [15, 25] }, { name: 'Backdrop stand', qty: 1, est: [20, 35] }, { name: 'Cloud foil balloons', qty: 1, unit: 'set', est: [8, 14] }, { name: 'Giant rainbow cutout', qty: 1, est: [12, 20] }, { name: 'Rainbow photo props', qty: 1, unit: 'set', est: [8, 14] }, { name: 'Warm fairy string lights', qty: 1, est: [6, 10] }] },
      ],
    }),
  ],

  food: {
    'rainbow-fruit-cups': { role: 'fresh', cost: { perChild: [0.9, 1.5] }, diet: diet() },
    'veggie-hummus-cups': { role: 'fresh', cost: { perChild: [0.6, 1] }, diet: diet() },
    'mini-muffins': { role: 'sweet', cost: { perChild: [0.5, 0.9] }, diet: diet({ 'gluten-free': 'swap', 'dairy-free': 'swap', 'egg-free': 'swap' }) },
    'cheese-cracker-stacks': { role: 'savory', cost: { perChild: [0.5, 0.9] }, diet: diet({ 'gluten-free': 'swap', 'dairy-free': 'swap' }) },
    'picnic-sandwiches': { role: 'savory', cost: { perChild: [0.8, 1.4] }, diet: diet({ 'gluten-free': 'swap', 'dairy-free': 'swap', vegetarian: 'swap' }) },
    'strawberry-lemon-water': { role: 'drink', cost: { perChild: [0.3, 0.5] }, diet: diet() },
    'the-cake': { role: 'showpiece', headline: true, cost: { fixed: [25, 45] }, costNote: 'Homemade estimate; bakery prices vary.', diet: diet({ 'gluten-free': 'swap', 'dairy-free': 'swap', 'egg-free': 'swap' }) },
  },

  diy: {
    'rainbow-rice-sensory-bin': { kinds: ['science', 'quiet'], requires: { activities: ['rainbow-sensory-bins'] }, cost: { fixed: [0, 0] }, costNote: 'Supplies are part of Rainbow Sensory Bins', minutes: 30 },
    'ribbon-wands': { kinds: ['crafts', 'music'], requires: { activities: ['ribbon-dance'] }, cost: { fixed: [0, 0] }, costNote: 'Supplies are part of Ribbon Dance', minutes: 30 },
    'streamer-backdrop': { kinds: ['crafts', 'pretend'], cost: { fixed: [6, 12] }, minutes: 30, prep: { 'Day before': 'Hang the streamer backdrop' } },
  },

  essentialsFromShop: ['Tableware', 'Favors'],
}
