// Starry Night plan. Costs are illustrative planning estimates, not retailer prices.

export default {
  themeId: 'starry-night',
  title: 'A Starry Night Birthday',
  intro:
    'An early-evening party among the constellations — moons, soft gold and a sky full of wishes.',
  moodWords: ['Dreamy', 'Celestial', 'Glowing', 'Cozy'],
  headings: { decor: 'Five corners of the cosmos', food: 'A moonlit menu' },
  heroPhoto: 'starTreats',
  foodPhoto: 'starTreats',

  board: [
    { kind: 'tablescape', caption: 'The constellation table', photo: 'starTable' },
    { kind: 'cake', caption: 'Midnight cake with gold stars', photo: 'starTreats' },
    { kind: 'detail', caption: 'Twinkling lights', photo: 'starLights' },
    { kind: 'balloons', caption: 'Navy, lilac & gold balloons' },
    { kind: 'invite', caption: 'Midnight-blue invitation' },
    { kind: 'crown', caption: 'Star garland' },
  ],

  setup: [
    {
      zone: 'Moonlit welcome',
      description:
        'A paper moon and a gold star garland over the door, with a basket of glow bracelets for every guest.',
    },
    {
      zone: 'The constellation table',
      description:
        'A navy runner sprinkled with gold paper stars, battery tealights in clear jars, and little planet ornaments down the middle.',
    },
    {
      zone: 'Stargazing den',
      description:
        'A blanket fort or teepee with pillows and string lights inside — the cosiest spot in the house.',
    },
    {
      zone: 'Craft observatory',
      description:
        'A table for galaxy jars and constellation cards, with flashlights ready to test them.',
    },
    {
      zone: 'Wishing wall',
      description:
        'Star-shaped cards pegged to twine. Every guest writes or draws a birthday wish to hang up.',
    },
  ],

  games: [
    {
      name: 'Constellation Cards',
      time: '20 min',
      description: 'Poke holes along a dot pattern in dark card, then shine a flashlight through to project your stars on the wall.',
      energy: 'Calm',
      kinds: ['crafts', 'science'],
    },
    {
      name: 'Glow-Star Hunt',
      time: '15 min',
      description: 'Lights low, flashlights on: find the glow-in-the-dark stars hidden around the room.',
      energy: 'Active',
      kinds: ['hunts', 'active'],
    },
    {
      name: 'Straw Rocket Launch',
      time: '20 min',
      description: 'Decorate a paper rocket, slip it on a straw and blow. Whose rocket reaches the moon (a target on the wall)?',
      energy: 'Active',
      kinds: ['science', 'active', 'crafts'],
    },
    {
      name: 'Galaxy Jars',
      time: '20 min',
      description: 'Layer cotton wool, colored water and fine shimmer in a jar to make a pocket nebula.',
      energy: 'Calm',
      kinds: ['crafts', 'science'],
    },
    {
      name: 'Star Cookie Studio',
      time: '20 min',
      description: 'Star-shaped sugar cookies, navy and white icing, and gold sprinkles.',
      energy: 'Calm',
      kinds: ['cooking', 'crafts'],
    },
    {
      name: 'Astronaut Training',
      time: '15 min',
      description: 'An obstacle course of "moon craters" (cushions), a crawl-through tunnel and a moonwalk finish.',
      energy: 'Active',
      kinds: ['active', 'pretend', 'outdoors'],
    },
    {
      name: 'Glow Dance Party',
      time: '10 min',
      description: 'Glow sticks, lights off and a space-themed playlist.',
      energy: 'Active',
      kinds: ['music', 'active'],
    },
    {
      name: 'Backyard Stargazing',
      time: '15 min',
      description: 'If the sky is clear, spot the moon and the brightest stars with a free star-map app.',
      energy: 'Calm',
      kinds: ['outdoors', 'science', 'quiet'],
    },
    {
      name: 'Bedtime Star Stories',
      time: '10 min',
      description: 'Everyone in the stargazing den for a short story about the night sky.',
      energy: 'Calm',
      kinds: ['quiet'],
    },
  ],

  food: [
    { name: 'Galaxy cupcakes', detail: 'Swirled navy and lilac frosting with gold sprinkles', tag: 'Sweet' },
    { name: 'Star sandwiches', detail: 'Star-cut sandwiches — ham & cheese or jam', tag: 'Savory' },
    { name: 'Crescent-moon crackers', detail: 'Cheese and crackers cut into moons', tag: 'Savory' },
    { name: 'Shooting-star fruit wands', detail: 'Star-cut melon and pineapple on skewers', tag: 'Fresh' },
    { name: 'Rocket veggie cups', detail: 'Carrot and cucumber sticks with dip', tag: 'Fresh' },
    { name: 'Twinkle lemonade', detail: 'Lemonade with star-shaped ice', tag: 'Drink' },
    { name: 'The cake', detail: 'Midnight-blue cake scattered with gold stars', tag: 'Showpiece' },
  ],

  startHour: 17,
  moments: {
    setup: 'Hang the moon and star garlands, build the stargazing den.',
    prep: 'Sandwiches, fruit wands and twinkle lemonade.',
    final: 'Fairy lights on, lamps low, glow bracelets out.',
    arrive: ['Astronauts arrive', 'Glow bracelets at the moonlit welcome.'],
    feast: ['Moonlit supper', 'Sandwiches, fruit wands and galaxy cupcakes.'],
    cake: ['Cake & wishes', 'Wishes on the wishing wall.'],
    goodbye: ['Fly home', 'Favors and a last look at the stars.'],
  },

  checklistExtras: {
    '2 weeks before': ['Order glow sticks and glow stars'],
    '1 week before': ['Make paper moon lanterns', 'Print constellation patterns'],
    'Day before': ['Bake cake layers and star cookies', 'Build the stargazing den'],
    'Party day': ['Hide glow stars before guests arrive'],
  },

  shop: [
    {
      category: 'Decor',
      items: [
        { name: 'Gold star garland', qty: { fixed: 3 }, unit: 'garland', est: [5, 9], diyAlt: 'Gold card stars on string' },
        { name: 'Navy table runner', qty: { fixed: 1 }, unit: 'runner', est: [8, 14], diyAlt: 'Navy fabric remnant' },
        { name: 'Battery tealights', qty: { fixed: 12 }, unit: 'light', est: [0.5, 1], diyAlt: 'String lights in jars' },
        { name: 'Paper moon lantern', qty: { fixed: 1 }, unit: 'lantern', est: [10, 18], diyAlt: 'See DIY: Paper Moon Lantern' },
        { name: 'Glow-in-the-dark stars', qty: { fixed: 2 }, unit: 'pack', est: [5, 8], diyAlt: 'Foil stars and a flashlight hunt' },
      ],
    },
    {
      category: 'Tableware',
      items: [
        { name: 'Navy plates', qty: { perGuest: 1, extra: 6 }, unit: 'plate', est: [0.4, 0.7], diyAlt: 'Plain white plates + gold star stickers' },
        { name: 'Gold-rim cups', qty: { perGuest: 1, extra: 6 }, unit: 'cup', est: [0.3, 0.6], diyAlt: 'Clear cups' },
        { name: 'Star napkins', qty: { perGuest: 2, extra: 0 }, unit: 'napkin', est: [0.15, 0.3], diyAlt: 'Navy napkins' },
      ],
    },
    {
      category: 'Games & crafts',
      items: [
        { name: 'Mini flashlights', qty: { perGuest: 1, extra: 1 }, unit: 'flashlight', est: [1, 2], diyAlt: 'Borrow phone flashlights' },
        { name: 'Glow sticks', qty: { perGuest: 3, extra: 0 }, unit: 'stick', est: [0.15, 0.3], diyAlt: 'Skip and use flashlights' },
        { name: 'Galaxy jar supplies', qty: { perGuest: 1, extra: 1 }, unit: 'jar', est: [1.2, 2], diyAlt: 'Baby-food jars + cotton balls' },
        { name: 'Black cardstock', qty: { fixed: 1 }, unit: 'pack', est: [5, 8], diyAlt: 'Painted cereal-box card' },
      ],
    },
    {
      category: 'Favors',
      items: [
        { name: 'Star-print favor bags', qty: { perGuest: 1, extra: 2 }, unit: 'bag', est: [0.3, 0.6], diyAlt: 'Navy paper bags + star stamp' },
        { name: 'Glow-star sticker sheets', qty: { perGuest: 1, extra: 0 }, unit: 'sheet', est: [0.5, 1], diyAlt: 'Leftover glow stars' },
        { name: 'Mini star notebooks', qty: { perGuest: 1, extra: 0 }, unit: 'notebook', est: [0.8, 1.5], diyAlt: 'Stapled paper booklets' },
      ],
    },
  ],

  diy: [
    {
      name: 'Paper Moon Lantern',
      time: '1 hr + drying',
      difficulty: 'Moderate',
      saves: 'A statement piece from a balloon and paper',
      materials: ['A large round balloon', 'White tissue paper', 'Watered-down PVA glue', 'A battery string light'],
      steps: [
        'Blow up the balloon and brush on glue.',
        'Layer torn tissue paper, three layers thick.',
        'Dry overnight, pop and remove the balloon.',
        'Tuck the string light inside and hang.',
      ],
    },
    {
      name: 'Constellation Cards',
      time: '30 min',
      difficulty: 'Easy',
      saves: 'Activity prep on a printer and cardstock',
      materials: ['Black cardstock', 'Printed constellation patterns', 'Push pins or a skewer', 'Corkboard to work on'],
      steps: [
        'Cut cards to postcard size.',
        'Tape a constellation pattern on each.',
        'Leave them ready with pins for the party.',
        'Test with a flashlight in a dark room.',
      ],
    },
    {
      name: 'Galaxy Jars',
      time: '20 min prep',
      difficulty: 'Easy',
      saves: 'A favor guests make themselves',
      materials: ['Small jars with lids', 'Cotton wool', 'Water with blue, purple and pink coloring', 'Fine iridescent shimmer'],
      steps: [
        'Mix three cups of colored water.',
        'Guests add a layer of cotton, then a splash of color.',
        'Repeat, adding shimmer between layers.',
        'Close tightly — shake gently to see the galaxy move.',
      ],
    },
  ],

  substitutions: [
    { swap: 'Paper moon lantern', for: 'A round paper lantern you already own', why: 'Same glow' },
    { swap: 'Glow sticks', for: 'Flashlights and a lights-off hunt', why: 'Reusable and less waste' },
    { swap: 'Navy tableware', for: 'White plates with gold star stickers', why: 'Cheaper and just as pretty' },
    { swap: 'Bakery cake', for: 'Homemade navy cake + gold star sprinkles', why: 'Biggest single saving' },
  ],
}
