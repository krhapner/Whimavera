// Under the Sea catalog metadata. Costs are illustrative PLANNING ESTIMATES
// (USD ranges for generic items), not prices from any product or retailer.
import { zone, diet } from './helpers.js'

export default {
  activities: {
    'sunken-treasure-hunt': { cost: { perChild: [0.3, 0.6], fixed: [8, 14] }, space: 'medium', ages: { min: 3, max: 10 }, prep: { '1 week before': 'Draw the treasure maps', 'Party day': 'Hide the coins and jewels' } },
    'shell-crown-studio': { cost: { perChild: [1.5, 2.5], fixed: [2, 4] }, space: 'small', ages: { min: 4, max: 10 }, prep: { '2 weeks before': 'Gather shells, pearls and crown bands' } },
    'ocean-in-a-bottle': { cost: { perChild: [0.8, 1.5], fixed: [4, 8] }, space: 'small', ages: { min: 4, max: 10 }, prep: { 'Day before': 'Pre-measure the oil and colored water' } },
    'jellyfish-cupcakes': { cost: { perChild: [0.3, 0.6] }, space: 'small', ages: { min: 3, max: 10 }, requires: { food: ['jellyfish-cupcakes'] }, costNote: 'Plus the cupcakes on the menu', prep: { 'Day before': 'Portion frosting and candy tentacles' } },
    'sharks-minnows': { cost: { fixed: [0, 0] }, space: 'large', ages: { min: 4, max: 12 } },
    'bubble-lagoon': { cost: { fixed: [10, 16] }, space: 'large', ages: { min: 2, max: 10 }, prep: { '1 week before': 'Buy giant bubble wands and solution' } },
    'go-fishing': { cost: { perChild: [0.2, 0.5], fixed: [10, 15] }, space: 'small', ages: { min: 2, max: 8 }, prep: { '1 week before': 'Cut out and number the paper fish' } },
    'freeze-fish': { cost: { fixed: [0, 0] }, space: 'medium', ages: { min: 2, max: 10 }, prep: { 'Day before': 'Make the freeze-dance playlist' } },
    'tide-pool-storytime': { cost: { fixed: [0, 0] }, space: 'small', ages: { min: 2, max: 8 }, prep: { '1 week before': 'Choose an ocean picture book' } },
  },

  decor: [
    zone({
      id: 'welcome-wave',
      zone: 'Welcome wave',
      essential: true,
      variants: [
        { id: 'wave-sign', tier: 'budget', name: 'Kelp-streamer doorway', description: 'Green crepe streamers hung like kelp over the door, with a hand-painted “Dive In” sign.', supplies: [{ name: 'Green crepe paper streamers', qty: 1, unit: 'pack', est: [4, 7] }, { name: 'Chalkboard or kraft sign board', qty: 1, est: [5, 10] }] },
        { id: 'wave-arch', tier: 'classic', name: 'Seafoam balloon half-arch', description: 'A half-arch of seafoam, pearl and coral balloons with streamer kelp, plus a basket of pearl necklaces for arriving guests.', supplies: [{ name: 'Seafoam & pearl balloon kit', qty: 1, est: [18, 26] }, { name: 'Green crepe paper streamers', qty: 1, unit: 'pack', est: [4, 7] }, { name: 'Balloon glue dots', qty: 1, unit: 'pack', est: [4, 7] }, { name: 'Chalkboard or kraft sign board', qty: 1, est: [5, 10] }] },
        { id: 'wave-grand', tier: 'premium', name: 'Grand ocean-wave arch', description: 'A full organic arch in seafoam and pearl on a frame, with net, starfish, foil fish balloons and glowing lights.', supplies: [{ name: 'Large ocean balloon arch kit (200+ balloons)', qty: 1, est: [30, 45] }, { name: 'Balloon arch frame stand', qty: 1, est: [25, 40] }, { name: 'Electric balloon pump', qty: 1, est: [15, 25] }, { name: 'Balloon glue dots', qty: 1, unit: 'pack', est: [4, 7] }, { name: 'Foil fish & sea-creature balloons', qty: 1, unit: 'set', est: [10, 18] }, { name: 'Decorative fishing net', qty: 1, est: [6, 10] }, { name: 'Warm fairy string lights', qty: 2, est: [6, 10] }] },
      ],
    }),
    zone({
      id: 'ocean-table',
      zone: 'The ocean-floor table',
      essential: true,
      variants: [
        { id: 'ocean-kraft', tier: 'budget', name: 'Sandy kraft-paper table', description: 'Kraft paper as sand, with shells from home and blue paper fish down the middle.', supplies: [{ name: 'Kraft paper table runner', qty: 1, est: [5, 7] }, { name: 'Natural seashell mix', qty: 1, unit: 'bag', est: [8, 12] }] },
        { id: 'ocean-classic', tier: 'classic', name: 'Shells, jars & tealights', description: 'A sand-colored runner scattered with shells, jars of blue water and battery tealights.', supplies: [{ name: 'Sand-colored table runner', qty: 1, est: [8, 14] }, { name: 'Natural seashell mix', qty: 1, unit: 'bag', est: [8, 12] }, { name: 'Flameless LED tea lights', qty: 1, unit: 'pack', est: [8, 14] }, { name: 'Small glass jars', qty: 4, est: [1, 2] }] },
        { id: 'ocean-luxe', tier: 'premium', name: 'Shimmering reef tablescape', description: 'Layered tulle waves, coral pieces, pearl strands, glowing jars, a tiered treat stand and a fishing-net canopy.', supplies: [{ name: 'Sand-colored table runner', qty: 1, est: [8, 14] }, { name: 'Blue tulle', qty: 6, unit: 'yard', est: [1.5, 3] }, { name: 'Natural seashell mix', qty: 2, unit: 'bag', est: [8, 12] }, { name: 'Faux coral decorations', qty: 1, unit: 'set', est: [15, 25] }, { name: 'Faux pearl garland strands', qty: 1, unit: 'pack', est: [8, 12] }, { name: 'Flameless LED tea lights', qty: 1, unit: 'pack', est: [8, 14] }, { name: 'Small glass jars', qty: 6, est: [1, 2] }, { name: 'Tiered cake & treat stand', qty: 1, est: [12, 20] }] },
      ],
    }),
    zone({
      id: 'craft-cove',
      zone: 'Craft cove',
      servesKinds: ['crafts', 'science'],
      variants: [
        { id: 'cove-basic', tier: 'budget', name: 'Kitchen-table craft cove', description: 'Supplies in bowls from the cupboard, with old towels nearby for drips.', supplies: [{ name: 'Kraft paper table runner', qty: 1, est: [5, 7] }] },
        { id: 'cove-classic', tier: 'classic', name: 'Craft cove', description: 'Shell crowns and bottle supplies sorted into shallow trays, with towels for drips.', supplies: [{ name: 'Shallow plastic craft trays', qty: 4, est: [1.5, 3] }, { name: 'Kraft paper table runner', qty: 1, est: [5, 7] }] },
        { id: 'cove-studio', tier: 'premium', name: 'Mermaid craft studio', description: 'A dedicated table with a craft caddy, labelled trays, a net canopy with lights and a sea-glass bowl of gems.', supplies: [{ name: 'Wooden craft caddy', qty: 1, est: [15, 25] }, { name: 'Shallow plastic craft trays', qty: 6, est: [1.5, 3] }, { name: 'Mini chalkboard labels', qty: 1, unit: 'set', est: [8, 12] }, { name: 'Decorative fishing net', qty: 1, est: [6, 10] }, { name: 'Warm fairy string lights', qty: 2, est: [6, 10] }, { name: 'Kraft paper table runner', qty: 1, est: [5, 7] }] },
      ],
    }),
    zone({
      id: 'photo-reef',
      zone: 'Photo reef',
      servesKinds: ['pretend'],
      variants: [
        { id: 'reef-streamers', tier: 'budget', name: 'Streamer wave wall', description: 'Blue and green streamers taped in waves on a wall — an instant underwater backdrop.', supplies: [{ name: 'Blue & green crepe paper streamers', qty: 1, unit: 'pack', est: [5, 8] }] },
        { id: 'reef-classic', tier: 'classic', name: 'Tulle & net photo reef', description: 'Layers of blue tulle, a fishing net with paper sea creatures and cardboard bubbles.', supplies: [{ name: 'Blue tulle', qty: 6, unit: 'yard', est: [1.5, 3] }, { name: 'Decorative fishing net', qty: 1, est: [6, 10] }, { name: 'Paper sea-creature cutouts', qty: 1, unit: 'set', est: [6, 10] }] },
        { id: 'reef-grotto', tier: 'premium', name: 'Mermaid grotto', description: 'A shimmering sequin backdrop framed in balloons and net, with a shell chair, a soft rug and a basket of mermaid tails and crowns.', supplies: [{ name: 'Mermaid sequin photo backdrop', qty: 1, est: [20, 35] }, { name: 'Backdrop stand', qty: 1, est: [20, 35] }, { name: 'Blue tulle', qty: 6, unit: 'yard', est: [1.5, 3] }, { name: 'Decorative fishing net', qty: 1, est: [6, 10] }, { name: 'Round faux-fur or play rug', qty: 1, est: [20, 35] }, { name: 'Dress-up mermaid tails & crowns', qty: 4, est: [4, 8] }, { name: 'Warm fairy string lights', qty: 2, est: [6, 10] }] },
      ],
    }),
    zone({
      id: 'treasure-chest',
      zone: 'Treasure chest',
      variants: [
        { id: 'chest-box', tier: 'budget', name: 'Painted cardboard chest', description: 'A cardboard box painted brown and gold, filled with the favors.', supplies: [{ name: 'Gold acrylic paint', qty: 1, est: [3, 6] }] },
        { id: 'chest-classic', tier: 'classic', name: 'Treasure chest', description: 'A small wooden chest spilling gold coins and pearls, opened together at the end.', supplies: [{ name: 'Small wooden treasure chest', qty: 1, est: [12, 20] }, { name: 'Gold treasure coins', qty: 1, unit: 'bag', est: [6, 10] }] },
        { id: 'chest-grand', tier: 'premium', name: 'Overflowing pirate chest', description: 'A large chest on a bed of sand and net, overflowing with coins, pearls and gems, lit from within.', supplies: [{ name: 'Large wooden treasure chest', qty: 1, est: [25, 45] }, { name: 'Gold treasure coins', qty: 2, unit: 'bag', est: [6, 10] }, { name: 'Faux pearl garland strands', qty: 1, unit: 'pack', est: [8, 12] }, { name: 'Acrylic gems', qty: 1, unit: 'bag', est: [6, 10] }, { name: 'Decorative fishing net', qty: 1, est: [6, 10] }, { name: 'Warm fairy string lights', qty: 1, est: [6, 10] }] },
      ],
    }),
  ],

  food: {
    'jellyfish-cupcakes': { role: 'sweet', cost: { perChild: [0.6, 1] }, diet: diet({ 'gluten-free': 'swap', 'dairy-free': 'swap', 'egg-free': 'swap' }) },
    'goldfish-cracker-cups': { role: 'savory', cost: { perChild: [0.3, 0.6] }, diet: diet({ 'gluten-free': 'swap', 'dairy-free': 'swap' }) },
    'sea-star-sandwiches': { role: 'savory', cost: { perChild: [0.8, 1.4] }, diet: diet({ 'gluten-free': 'swap', 'dairy-free': 'swap', vegetarian: 'swap' }) },
    'pearl-fruit-cups': { role: 'fresh', cost: { perChild: [0.8, 1.4] }, diet: diet() },
    'seaweed-veggie-cups': { role: 'fresh', cost: { perChild: [0.6, 1] }, diet: diet({ 'dairy-free': 'swap', 'egg-free': 'swap' }) },
    'sea-foam-lemonade': { role: 'drink', cost: { perChild: [0.3, 0.5] }, diet: diet() },
    'sea-cake': { role: 'showpiece', headline: true, cost: { fixed: [25, 45] }, costNote: 'Homemade estimate; bakery prices vary.', diet: diet({ 'gluten-free': 'swap', 'dairy-free': 'swap', 'egg-free': 'swap' }) },
  },

  diy: {
    'treasure-chest-favor-boxes': { kinds: ['crafts', 'pretend'], cost: { fixed: [8, 14] }, minutes: 60, prep: { '1 week before': 'Paint the treasure-chest favor boxes' } },
    'jellyfish-lanterns': { kinds: ['crafts'], cost: { fixed: [10, 18] }, minutes: 45, prep: { '1 week before': 'Make the jellyfish lanterns' } },
    'ocean-in-a-bottle-kits': { kinds: ['science', 'crafts'], requires: { activities: ['ocean-in-a-bottle'] }, cost: { fixed: [0, 0] }, costNote: 'Supplies are part of Ocean in a Bottle', minutes: 30 },
  },

  essentialsFromShop: ['Tableware', 'Favors'],
}
