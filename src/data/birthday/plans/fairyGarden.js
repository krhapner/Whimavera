// Fairy Garden plan.
//
// IMPORTANT: costs below are illustrative PLANNING ESTIMATES for generic items,
// not prices from any real product or retailer. Links are placeholders.

const fairyGarden = {
  themeId: 'fairy-garden',
  headings: { decor: 'Five little zones of magic', food: 'A fairy feast' },
  heroPhoto: 'fairyGirlTable',
  foodPhoto: 'fairyTreats',
  title: 'A Fairy Garden Birthday',
  intro:
    'A soft, storybook afternoon among moss, toadstools and twinkling lights — where every guest becomes a garden fairy for the day.',
  moodWords: ['Whimsical', 'Botanical', 'Soft-lit', 'Hand-made'],

  board: [
    { kind: 'tablescape', caption: 'The fairy feast table', photo: 'fairyTable' },
    { kind: 'cake', caption: 'Butterflies at golden hour', photo: 'fairyCupcake' },
    { kind: 'detail', caption: 'Wings & flower crowns', photo: 'fairyPortrait' },
    { kind: 'balloons', caption: 'Rose cupcakes', photo: 'fairyTreats' },
    { kind: 'invite', caption: 'Moss runner & wild roses', photo: 'fairyHero' },
    { kind: 'crown', caption: 'Toadstools & moss', photo: 'mossMushrooms' },
  ],

  // Budget split as shares of the total budget.
  budget: [
    { id: 'decor', label: 'Decor & setup', share: 0.3, note: 'Garland, lights, table styling' },
    { id: 'food', label: 'Food, cake & drinks', share: 0.3, note: 'Homemade cake + grazing table' },
    { id: 'activities', label: 'Games & crafts', share: 0.15, note: 'Wands, crowns, treasure hunt' },
    { id: 'tableware', label: 'Tableware', share: 0.1, note: 'Plates, cups, napkins' },
    { id: 'favors', label: 'Favors', share: 0.1, note: 'Seed packets & fairy gems' },
    { id: 'buffer', label: 'Breathing room', share: 0.05, note: 'For the inevitable extra' },
  ],

  setup: [
    {
      zone: 'Welcome arch',
      description:
        'Frame the entry with a half-arch of blush, sage and lavender balloons woven with faux ivy. A hand-lettered "Fairies Welcome" sign leans on a small easel.',
    },
    {
      zone: 'The fairy feast table',
      description:
        'A low table (or a coffee table with floor cushions) dressed with a moss runner, mismatched bud vases, paper toadstools and warm string lights down the center.',
    },
    {
      zone: 'Craft glade',
      description:
        'A side table for wands and flower crowns. Pre-sort supplies into small baskets so little hands can help themselves.',
    },
    {
      zone: 'Photo nook',
      description:
        'Drape sheer fabric from a branch or curtain rod, add a basket of wings and wands, and string fairy lights behind for a dreamy glow.',
    },
    {
      zone: 'Favor tree',
      description:
        'Hang kraft favor bags with ribbon from a potted branch or tree limb near the exit — the last bit of magic on the way out.',
    },
  ],

  // `kinds` match the "How do they love to play?" answers; matching activities
  // are surfaced first in the plan.
  games: [
    {
      name: 'Fairy Treasure Hunt',
      time: '20 min',
      description:
        'Hide "fairy gems" around the garden. Each guest gets a little pouch and a picture clue card — no reading required.',
      energy: 'Active',
      kinds: ['hunts', 'outdoors', 'active'],
    },
    {
      name: 'Flower Crown Studio',
      time: '25 min',
      description:
        'Pre-made pipe-cleaner bases + faux blooms and ribbon. Every fairy leaves with a crown they designed.',
      energy: 'Calm',
      kinds: ['crafts', 'pretend'],
    },
    {
      name: 'Toadstool Cupcake Bar',
      time: '20 min',
      description:
        'Plain cupcakes, red and pink frosting, and white candy dots. Each guest decorates their own toadstool to eat at the feast.',
      energy: 'Calm',
      kinds: ['cooking', 'crafts'],
    },
    {
      name: 'Fairy Potion Lab',
      time: '15 min',
      description:
        'Butterfly-pea tea turns from blue to pink with a squeeze of lemon. Little scientists mix "potions" in clear cups and name their spells.',
      energy: 'Calm',
      kinds: ['science', 'cooking', 'pretend'],
    },
    {
      name: 'Musical Toadstools',
      time: '10 min',
      description:
        'Musical chairs, gently: paper toadstool mats on the grass and nobody is "out" — remove a toadstool and everyone shares.',
      energy: 'Active',
      kinds: ['music', 'active'],
    },
    {
      name: 'Freeze, Fairy!',
      time: '10 min',
      description:
        'Flutter while the music plays; freeze in your best fairy pose when it stops. Perfect between activities.',
      energy: 'Active',
      kinds: ['music', 'active', 'pretend'],
    },
    {
      name: 'Bug & Bloom Safari',
      time: '15 min',
      description:
        'Magnifying glasses and a picture checklist: a ladybug, a feather, something purple, a heart-shaped leaf.',
      energy: 'Active',
      kinds: ['outdoors', 'science', 'hunts'],
    },
    {
      name: 'Fairy Storytime',
      time: '10 min',
      description:
        'Gather on blankets for a short fairy tale read aloud — a calm landing right before cake.',
      energy: 'Calm',
      kinds: ['quiet'],
    },
    {
      name: 'Wish Jars',
      time: '15 min',
      description:
        'Fill small jars with colored sand and confetti, then write (or draw) a wish for the birthday child.',
      energy: 'Calm',
      kinds: ['crafts', 'quiet'],
    },
  ],

  food: [
    { name: 'Toadstool cupcakes', detail: 'Red-capped with white candy dots', tag: 'Sweet' },
    { name: 'Fairy bread', detail: 'Buttered triangles with pastel sprinkles', tag: 'Sweet' },
    { name: 'Rainbow fruit wands', detail: 'Berries, melon and grapes on skewers', tag: 'Fresh' },
    { name: 'Garden veggie cups', detail: 'Cucumber, carrot and snap peas over hummus', tag: 'Fresh' },
    { name: 'Honey pinwheel sandwiches', detail: 'Cream cheese & honey or turkey & cheese', tag: 'Savory' },
    { name: 'Petal pink lemonade', detail: '"Fairy nectar" with edible flowers frozen in ice', tag: 'Drink' },
    { name: 'The cake', detail: 'Two-tier semi-naked vanilla cake with pressed edible blooms', tag: 'Showpiece' },
  ],

  startHour: 14,
  moments: {
    setup: 'Hang lights, arch and garland. Lay the feast table.',
    prep: 'Assemble fruit wands, sandwiches and lemonade.',
    final: 'Lights on, music on, crowns and wings laid out.',
    arrive: ['Fairies arrive', 'Welcome with wings & wands at the arch.'],
    feast: ['Fairy feast', 'Grazing table and petal lemonade.'],
    cake: ['Cake & wishes', 'Song, candles and wish jars.'],
    goodbye: ['Flutter home', 'Favors from the favor tree.'],
  },

  checklistExtras: {
    '2 weeks before': ['Gather crown and wand supplies'],
    '1 week before': ['Paint toadstools and make the fairy door'],
    'Day before': ['Bake cake layers', 'Prep crown bases and gem pouches'],
    'Party day': ['Hide the treasure-hunt gems'],
  },

  // Shop list. qty: { fixed } or { perGuest, extra }. est: planning estimate per unit/pack.
  shop: [
    {
      category: 'Decor',
      items: [
        { name: 'Moss table runner', qty: { fixed: 1 }, unit: 'runner', est: [12, 18], diyAlt: 'Preserved moss sheets on kraft paper' },
        { name: 'Warm fairy string lights', qty: { fixed: 3 }, unit: 'strand', est: [6, 10], diyAlt: 'Borrow from holiday decor' },
        { name: 'Pastel balloon garland kit', qty: { fixed: 1 }, unit: 'kit', est: [18, 26], diyAlt: 'Loose balloons + fishing line' },
        { name: 'Faux ivy & floral garland', qty: { fixed: 2 }, unit: 'garland', est: [8, 14], diyAlt: 'Clippings from the garden' },
        { name: 'Paper toadstool decorations', qty: { fixed: 1 }, unit: 'set', est: [12, 20], diyAlt: 'See DIY: Painted toadstools' },
      ],
    },
    {
      category: 'Tableware',
      items: [
        { name: 'Scalloped pastel plates', qty: { perGuest: 1, extra: 6 }, unit: 'plate', est: [0.4, 0.7], diyAlt: 'Plain white plates + doily' },
        { name: 'Paper cups with petals', qty: { perGuest: 1, extra: 6 }, unit: 'cup', est: [0.3, 0.5], diyAlt: 'Mason jars from the cupboard' },
        { name: 'Sage linen-look napkins', qty: { perGuest: 2, extra: 0 }, unit: 'napkin', est: [0.15, 0.3], diyAlt: 'Tie plain napkins with twine' },
        { name: 'Wooden cutlery set', qty: { perGuest: 1, extra: 4 }, unit: 'set', est: [0.25, 0.4], diyAlt: 'Everyday cutlery' },
      ],
    },
    {
      category: 'Games & crafts',
      items: [
        { name: 'Flower crown supplies', qty: { perGuest: 1, extra: 2 }, unit: 'crown', est: [1.5, 2.5], diyAlt: 'Pipe cleaners + garden blooms' },
        { name: 'Fairy wand craft kit', qty: { perGuest: 1, extra: 2 }, unit: 'wand', est: [1, 2], diyAlt: 'Sticks, ribbon and felt stars' },
        { name: 'Treasure hunt "fairy gems"', qty: { fixed: 1 }, unit: 'bag', est: [8, 12], diyAlt: 'Painted pebbles' },
        { name: 'Drawstring gem pouches', qty: { perGuest: 1, extra: 0 }, unit: 'pouch', est: [0.5, 1], diyAlt: 'Paper bags with stamped stars' },
      ],
    },
    {
      category: 'Favors',
      items: [
        { name: 'Kraft favor bags & ribbon', qty: { perGuest: 1, extra: 2 }, unit: 'bag', est: [0.3, 0.6], diyAlt: 'Lunch bags + washi tape' },
        { name: 'Wildflower seed packets', qty: { perGuest: 1, extra: 0 }, unit: 'packet', est: [0.8, 1.5], diyAlt: 'Seed paper you make together' },
        { name: 'Mini fairy wings', qty: { perGuest: 1, extra: 0 }, unit: 'pair', est: [1.2, 2], diyAlt: 'Cellophane + wire hanger wings' },
      ],
    },
  ],

  diy: [
    {
      name: 'Painted Toadstools',
      time: '2 hrs + drying',
      difficulty: 'Easy',
      saves: 'Replaces store-bought toadstool decor',
      materials: [
        'Terracotta pots (various sizes)',
        'Paper bowls or plates for caps',
        'Red, white and blush acrylic paint',
        'Hot glue gun',
        'Round sponge dabbers',
      ],
      steps: [
        'Flip each pot upside down — that is your toadstool stem.',
        'Paint the paper bowls red or blush; let dry.',
        'Dab white dots with a round sponge.',
        'Hot-glue caps to pots and cluster them by the feast table.',
      ],
    },
    {
      name: 'Flower Crown Bases',
      time: '45 min',
      difficulty: 'Easy',
      saves: 'Lets crowns cost a fraction of pre-made ones',
      materials: ['Green pipe cleaners', 'Floral tape', 'Faux or fresh small blooms', 'Satin ribbon (30 cm per crown)'],
      steps: [
        'Twist two pipe cleaners together and size to a child\'s head.',
        'Wrap the join with floral tape.',
        'Tie two ribbon tails at the back.',
        'Set out blooms in a basket — guests add their own at the party.',
      ],
    },
    {
      name: 'Fairy Door',
      time: '1 hr',
      difficulty: 'Moderate',
      saves: 'A keepsake that becomes part of the garden',
      materials: ['Craft wood plaque or popsicle sticks', 'Acrylic paints', 'Tiny hinge or brad', 'Pebbles and moss'],
      steps: [
        'Glue sticks side-by-side and trim into an arched door shape.',
        'Paint, then add a brad doorknob.',
        'Prop at the base of a tree with a pebble path and moss.',
        'Leave a tiny note from the fairies for the birthday child.',
      ],
    },
    {
      name: 'Pressed-Bloom Cake Topping',
      time: '30 min',
      difficulty: 'Easy',
      saves: 'Bakery look on a homemade cake',
      materials: ['Edible flowers (pansies, violas)', 'Clean brush', 'A little piping gel or water'],
      steps: [
        'Choose flat, food-safe edible blooms.',
        'Lightly brush the back with gel or water.',
        'Press gently onto the lightly frosted cake sides.',
        'Add just before the party so petals stay fresh.',
      ],
    },
  ],

  substitutions: [
    { swap: 'Balloon garland kit', for: 'A few loose balloons tied in clusters', why: 'Same color story, less assembly' },
    { swap: 'Bakery cake', for: 'Homemade cake + pressed blooms', why: 'Biggest single saving' },
    { swap: 'New string lights', for: 'Holiday lights you already own', why: 'Warm white is all you need' },
    { swap: 'Printed signage', for: 'Hand-lettered chalkboard', why: 'Charming and reusable' },
  ],
}

export default fairyGarden
