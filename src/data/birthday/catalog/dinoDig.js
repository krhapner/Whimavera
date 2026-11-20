// Dino Dig catalog metadata. Costs are illustrative PLANNING ESTIMATES
// (USD ranges for generic items), not prices from any product or retailer.
import { zone, diet } from './helpers.js'

export default {
  activities: {
    'fossil-excavation': { cost: { perChild: [1.4, 2.8], fixed: [15, 24] }, space: 'large', ages: { min: 3, max: 10 }, prep: { '2 weeks before': 'Order play sand and plaster fossils', 'Party day': 'Bury the fossils' } },
    'hatch-a-dino-egg': { cost: { perChild: [0.6, 1.2], fixed: [1, 3] }, space: 'small', ages: { min: 2, max: 8 }, prep: { 'Day before': 'Freeze the dino ice eggs' } },
    'erupting-volcano': { cost: { fixed: [4, 8] }, space: 'medium', ages: { min: 3, max: 10 }, prep: { 'Day before': 'Build the volcano and measure baking soda' } },
    'dino-egg-hunt': { cost: { perChild: [0.6, 1.2] }, space: 'medium', ages: { min: 2, max: 8 }, prep: { 'Party day': 'Hide the speckled eggs' } },
    'salt-dough-fossils': { cost: { fixed: [3, 6] }, space: 'small', ages: { min: 3, max: 10 }, prep: { 'Day before': 'Mix the salt dough' } },
    'dino-cookie-decorating': { cost: { perChild: [0.8, 1.4], fixed: [4, 8] }, space: 'small', ages: { min: 3, max: 12 }, prep: { 'Day before': 'Bake dino cookies and portion icing' } },
    'dino-stomp': { cost: { fixed: [0, 0] }, space: 'medium', ages: { min: 2, max: 8 }, prep: { 'Day before': 'Make the dino-stomp playlist' } },
    'dino-tail-tag': { cost: { perChild: [0.3, 0.6] }, space: 'large', ages: { min: 4, max: 10 }, prep: { '1 week before': 'Make crepe-paper dino tails' } },
    'dino-storytime': { cost: { fixed: [0, 0] }, space: 'small', ages: { min: 2, max: 8 }, prep: { '1 week before': 'Choose a dinosaur picture book' } },
  },

  decor: [
    zone({
      id: 'jurassic-gate',
      zone: 'Jurassic gate',
      essential: true,
      variants: [
        { id: 'gate-sign', tier: 'budget', name: 'Danger-zone sign', description: 'A painted “Dino Dig — Explorers Only” sign with caution tape at the entry.', supplies: [{ name: 'Chalkboard or kraft sign board', qty: 1, est: [5, 10] }, { name: 'Caution tape', qty: 1, unit: 'roll', est: [3, 6] }] },
        { id: 'gate-classic', tier: 'classic', name: 'Jungle leaf gate', description: 'Palm and fern leaves framing the door with terracotta and olive balloons.', supplies: [{ name: 'Faux palm & fern leaves', qty: 1, unit: 'set', est: [10, 16] }, { name: 'Terracotta & olive balloons', qty: 1, unit: 'pack', est: [8, 14] }, { name: 'Chalkboard or kraft sign board', qty: 1, est: [5, 10] }, { name: 'Caution tape', qty: 1, unit: 'roll', est: [3, 6] }] },
        { id: 'gate-grand', tier: 'premium', name: 'Jurassic jungle arch', description: 'A full jungle balloon arch with palm leaves, a giant inflatable dinosaur peeking through and vines of lights.', supplies: [{ name: 'Large jungle balloon arch kit (200+ balloons)', qty: 1, est: [30, 45] }, { name: 'Balloon arch frame stand', qty: 1, est: [25, 40] }, { name: 'Electric balloon pump', qty: 1, est: [15, 25] }, { name: 'Faux palm & fern leaves', qty: 2, unit: 'set', est: [10, 16] }, { name: 'Giant inflatable dinosaur', qty: 1, est: [15, 30] }, { name: 'Faux jungle vines', qty: 1, unit: 'pack', est: [8, 14] }, { name: 'Warm fairy string lights', qty: 1, est: [6, 10] }] },
      ],
    }),
    zone({
      id: 'fossil-table',
      zone: 'Fossil feast table',
      essential: true,
      variants: [
        { id: 'table-kraft', tier: 'budget', name: 'Kraft-paper dig table', description: 'Kraft paper down the table with dinosaur footprints stamped in paint and toy dinos from home.', supplies: [{ name: 'Kraft paper roll', qty: 1, est: [6, 10] }] },
        { id: 'table-classic', tier: 'classic', name: 'Jungle fossil table', description: 'Kraft paper and palm leaves, a herd of toy dinosaurs and little volcano centerpieces.', supplies: [{ name: 'Kraft paper roll', qty: 1, est: [6, 10] }, { name: 'Toy dinosaur set', qty: 1, est: [10, 16] }, { name: 'Faux palm & fern leaves', qty: 1, unit: 'set', est: [10, 16] }] },
        { id: 'table-luxe', tier: 'premium', name: 'Prehistoric tablescape', description: 'A moss and palm runner, large dinosaur figures among succulents, fossil-print accents and a tiered treat stand.', supplies: [{ name: 'Moss table runner', qty: 1, est: [12, 18] }, { name: 'Faux palm & fern leaves', qty: 2, unit: 'set', est: [10, 16] }, { name: 'Large dinosaur figures', qty: 1, unit: 'set', est: [15, 25] }, { name: 'Faux succulents', qty: 1, unit: 'set', est: [10, 16] }, { name: 'Flameless LED tea lights', qty: 1, unit: 'pack', est: [8, 14] }, { name: 'Tiered cake & treat stand', qty: 1, est: [12, 20] }] },
      ],
    }),
    zone({
      id: 'excavation-site',
      zone: 'Excavation site',
      servesKinds: ['science', 'hunts', 'outdoors'],
      variants: [
        { id: 'dig-tray', tier: 'budget', name: 'Tray dig', description: 'Baking trays of sand on a tarp, with paintbrushes from the craft drawer.', supplies: [{ name: 'Play sand', qty: 1, unit: 'bag', est: [5, 8] }] },
        { id: 'dig-classic', tier: 'classic', name: 'Excavation site', description: 'A sandbox or kiddie pool of play sand, roped off with caution tape and marked with flags.', supplies: [{ name: 'Play sand', qty: 3, unit: 'bag', est: [5, 8] }, { name: 'Caution tape', qty: 1, unit: 'roll', est: [3, 6] }, { name: 'Mini marker flags', qty: 1, unit: 'pack', est: [4, 7] }] },
        { id: 'dig-quarry', tier: 'premium', name: 'Paleontologist quarry', description: 'A large dig pit with a shade canopy, sifting screens, explorer tools and a fossil-ID station.', supplies: [{ name: 'Kiddie pool or sandbox', qty: 1, est: [20, 35] }, { name: 'Play sand', qty: 5, unit: 'bag', est: [5, 8] }, { name: 'Sand sifting screens', qty: 4, est: [3, 6] }, { name: 'Pop-up shade canopy', qty: 1, est: [40, 70] }, { name: 'Caution tape', qty: 1, unit: 'roll', est: [3, 6] }, { name: 'Mini marker flags', qty: 1, unit: 'pack', est: [4, 7] }] },
      ],
    }),
    zone({
      id: 'explorer-station',
      zone: 'Explorer station',
      servesKinds: ['pretend'],
      variants: [
        { id: 'explorer-basket', tier: 'budget', name: 'Explorer basket', description: 'Hats and binoculars from home in a basket at the door.', supplies: [{ name: 'Explorer badges', qty: 1, unit: 'pack', est: [4, 7] }] },
        { id: 'explorer-classic', tier: 'classic', name: 'Explorer station', description: 'Safari hats, binoculars and badges for every explorer to suit up.', supplies: [{ name: 'Kids safari hats', qty: 4, est: [2, 4] }, { name: 'Toy binoculars', qty: 4, est: [1.5, 3] }, { name: 'Explorer badges', qty: 1, unit: 'pack', est: [4, 7] }] },
        { id: 'explorer-camp', tier: 'premium', name: 'Base-camp photo station', description: 'A safari tent backdrop with explorer vests, hats, binoculars and a giant dino-egg prop for photos.', supplies: [{ name: 'Jungle photo backdrop', qty: 1, est: [15, 25] }, { name: 'Backdrop stand', qty: 1, est: [20, 35] }, { name: 'Kids explorer vests', qty: 4, est: [5, 9] }, { name: 'Kids safari hats', qty: 6, est: [2, 4] }, { name: 'Toy binoculars', qty: 6, est: [1.5, 3] }, { name: 'Giant dinosaur egg prop', qty: 1, est: [10, 18] }, { name: 'Explorer badges', qty: 1, unit: 'pack', est: [4, 7] }] },
      ],
    }),
    zone({
      id: 'volcano-lab',
      zone: 'Volcano lab',
      servesKinds: ['science'],
      variants: [
        { id: 'lab-basic', tier: 'budget', name: 'Kitchen volcano', description: 'A bottle volcano on a baking tray — baking soda and vinegar from the pantry.', supplies: [{ name: 'Baking soda & vinegar', qty: 1, unit: 'set', est: [4, 6] }] },
        { id: 'lab-classic', tier: 'classic', name: 'Volcano lab', description: 'A painted volcano on a tarp with goggles and measuring cups for every scientist.', supplies: [{ name: 'Baking soda & vinegar', qty: 1, unit: 'set', est: [4, 6] }, { name: 'Kids safety goggles', qty: 4, est: [1.5, 3] }, { name: 'Plastic measuring cups', qty: 1, unit: 'set', est: [3, 6] }] },
        { id: 'lab-grand', tier: 'premium', name: 'Mad-scientist volcano lab', description: 'A large volcano kit, lab coats, goggles, beakers and a splash mat — eruptions on repeat.', supplies: [{ name: 'Large volcano science kit', qty: 1, est: [15, 25] }, { name: 'Baking soda & vinegar', qty: 2, unit: 'set', est: [4, 6] }, { name: 'Kids safety goggles', qty: 6, est: [1.5, 3] }, { name: 'Kids lab coats', qty: 6, est: [4, 7] }, { name: 'Plastic beakers', qty: 1, unit: 'set', est: [8, 14] }, { name: 'Splash mat', qty: 1, est: [8, 15] }] },
      ],
    }),
  ],

  food: {
    'volcano-cupcakes': { role: 'sweet', cost: { perChild: [0.6, 1] }, diet: diet({ 'gluten-free': 'swap', 'dairy-free': 'swap', 'egg-free': 'swap' }) },
    'dino-dirt-cups': { role: 'sweet', cost: { perChild: [0.6, 1] }, diet: diet({ 'gluten-free': 'swap', 'dairy-free': 'swap' }) },
    'fossil-sandwiches': { role: 'savory', cost: { perChild: [0.8, 1.4] }, diet: diet({ 'gluten-free': 'swap', 'dairy-free': 'swap', vegetarian: 'swap' }) },
    'dino-bones': { role: 'savory', cost: { perChild: [0.3, 0.6] }, diet: diet({ 'gluten-free': 'swap', 'dairy-free': 'swap' }) },
    'fern-veggie-cups': { role: 'fresh', cost: { perChild: [0.6, 1] }, diet: diet({ 'dairy-free': 'swap', 'egg-free': 'swap' }) },
    'lava-punch': { role: 'drink', cost: { perChild: [0.3, 0.5] }, diet: diet() },
    'dino-cake': { role: 'showpiece', headline: true, cost: { fixed: [25, 45] }, costNote: 'Homemade estimate; bakery prices vary.', diet: diet({ 'gluten-free': 'swap', 'dairy-free': 'swap', 'egg-free': 'swap' }) },
  },

  diy: {
    'dino-ice-eggs': { kinds: ['science'], requires: { activities: ['hatch-a-dino-egg'] }, cost: { fixed: [0, 0] }, costNote: 'Supplies are part of Hatch a Dino Egg', minutes: 15 },
    'salt-dough-fossils': { kinds: ['crafts'], requires: { activities: ['salt-dough-fossils'] }, cost: { fixed: [0, 0] }, costNote: 'Supplies are part of Salt-Dough Fossils', minutes: 30 },
    'backyard-excavation-pit': { kinds: ['science', 'hunts', 'outdoors'], requires: { activities: ['fossil-excavation'] }, cost: { fixed: [0, 0] }, costNote: 'Supplies are part of Fossil Excavation', minutes: 45 },
  },

  essentialsFromShop: ['Tableware', 'Favors'],
}
