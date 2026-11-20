// Rainbow Picnic plan. Costs are illustrative planning estimates, not retailer prices.

export default {
  themeId: 'rainbow-picnic',
  title: 'A Rainbow Picnic',
  intro:
    'Gingham blankets, berries and sunny pastels — an easy, joyful picnic made for the littlest guests.',
  moodWords: ['Sunny', 'Cheerful', 'Soft', 'Simple'],
  headings: { decor: 'Five spots on the blanket', food: 'A rainbow picnic basket' },
  heroPhoto: 'rainbowGardenParty',
  foodPhoto: 'rainbowCake',

  board: [
    { kind: 'tablescape', caption: 'Party hats & confetti', photo: 'rainbowTable' },
    { kind: 'cake', caption: 'Sprinkle cake', photo: 'rainbowCake' },
    { kind: 'detail', caption: 'Picnic blankets', photo: 'rainbowPicnicBlankets' },
    { kind: 'balloons', caption: 'A rainbow of balloons', photo: 'rainbowBalloons' },
    { kind: 'invite', caption: 'Rainbow invitation', photo: 'rainbowInvite' },
    { kind: 'crown', caption: 'Ribbon wands', photo: 'rainbowWands' },
  ],

  setup: [
    {
      zone: 'Rainbow welcome',
      photo: 'rainbowZoneWelcome',
      description:
        'A pastel balloon rainbow arching over the entrance — the one photo every parent will take.',
    },
    {
      zone: 'Picnic blankets',
      photo: 'rainbowZoneBlankets',
      description:
        'Gingham blankets in a circle with low crates or trays for food, so little ones can sit and reach.',
    },
    {
      zone: 'Little-ones play zone',
      photo: 'rainbowZonePlay',
      description:
        'Soft cushions, sensory bins and a few board books for the youngest guests.',
    },
    {
      zone: 'Bubble meadow',
      photo: 'rainbowZoneBubbles',
      description:
        'A bubble machine on a little stool at the edge of the lawn — instant joy, no instructions needed.',
    },
    {
      zone: 'Streamer photo spot',
      photo: 'rainbowZonePhoto',
      description:
        'Pastel crepe streamers hung from a branch or curtain rod, with a little stool for the birthday child.',
    },
  ],

  games: [
    {
      name: 'Bubble Meadow',
      time: '15 min',
      description: 'A bubble machine plus wands for chasing, popping and catching.',
      energy: 'Active',
      kinds: ['outdoors', 'active', 'science'],
    },
    {
      name: 'Rainbow Sensory Bins',
      time: '20 min',
      description: 'Bins of rainbow-dyed rice with scoops, cups and hidden toys. (Supervise little ones who put things in their mouths.)',
      energy: 'Calm',
      kinds: ['science', 'quiet'],
    },
    {
      name: 'Color Hunt',
      time: '15 min',
      description: 'Find something red, orange, yellow, green, blue and purple. Parents and toddlers hunt together.',
      energy: 'Active',
      kinds: ['hunts', 'outdoors'],
    },
    {
      name: 'Parachute Play',
      time: '10 min',
      description: 'Everyone holds the edge — lift high, make waves, bounce balls. Works from age one up.',
      energy: 'Active',
      kinds: ['active', 'music'],
    },
    {
      name: 'Ribbon Dance',
      time: '10 min',
      description: 'Rainbow ribbon wands and a happy playlist.',
      energy: 'Active',
      kinds: ['music', 'active'],
    },
    {
      name: 'Sticker Rainbows',
      time: '15 min',
      description: 'Big paper clouds and a pile of colored dot stickers — perfect for little fingers.',
      energy: 'Calm',
      kinds: ['crafts'],
    },
    {
      name: 'Sprinkle Cookie Bar',
      time: '15 min',
      description: 'Pre-frosted cookies and shakers of rainbow sprinkles. Delightfully messy.',
      energy: 'Calm',
      kinds: ['cooking', 'crafts'],
    },
    {
      name: 'Teddy Bear Picnic',
      time: '15 min',
      description: 'Everyone brings a teddy; serve the bears pretend tea and snacks.',
      energy: 'Calm',
      kinds: ['pretend', 'quiet'],
    },
    {
      name: 'Rainbow Storytime',
      time: '10 min',
      description: 'A color-filled picture book on the blankets before cake.',
      energy: 'Calm',
      kinds: ['quiet'],
    },
  ],

  food: [
    { name: 'Rainbow fruit cups', detail: 'Strawberries, mango, kiwi, blueberries and grapes, cut small for little ones', tag: 'Fresh' },
    { name: 'Veggie & hummus cups', detail: 'Pepper strips, cucumber and carrots', tag: 'Fresh' },
    { name: 'Mini muffins', detail: 'Banana and blueberry', tag: 'Sweet' },
    { name: 'Cheese & cracker stacks', detail: 'Easy for small hands', tag: 'Savory' },
    { name: 'Picnic sandwiches', detail: 'Cut into small squares', tag: 'Savory' },
    { name: 'Strawberry-lemon water', detail: 'Lightly flavored, kind to toddlers', tag: 'Drink' },
    { id: 'rainbow-cake', name: 'The cake', detail: 'Vanilla sprinkle cake with pastel rosettes and a piped rainbow — plus a little smash cake for a first birthday', tag: 'Showpiece' },
  ],

  startHour: 10,
  moments: {
    setup: 'Balloon rainbow, blankets and the play zone.',
    prep: 'Fruit cups, sandwiches and muffins.',
    final: 'Bubble machine on, sensory bins out.',
    arrive: ['Little ones arrive', 'Bubbles and a wave at the rainbow.'],
    feast: ['Picnic time', 'Everyone on the blankets.'],
    cake: ['Cake & wishes', 'Sprinkle cake (and a smash cake for one-year-olds).'],
    goodbye: ['Home for naps', 'Bubble bottles and crayons to take home.'],
  },

  checklistExtras: {
    '2 weeks before': ['Borrow extra picnic blankets'],
    '1 week before': ['Dye the sensory-bin rice', 'Make ribbon wands'],
    'Day before': ['Bake the sprinkle cake', 'Wash and prep fruit'],
    'Party day': ['Plan around nap times — mornings work best'],
  },

  shop: [
    {
      category: 'Decor',
      items: [
        { name: 'Pastel balloon rainbow kit', qty: { fixed: 1 }, unit: 'kit', est: [18, 26], diyAlt: 'Loose balloons in rainbow order' },
        { name: 'Gingham picnic blankets', qty: { fixed: 3 }, unit: 'blanket', est: [10, 18], diyAlt: 'Blankets and quilts you own' },
        { name: 'Crepe streamers', qty: { fixed: 6 }, unit: 'roll', est: [1, 2], diyAlt: 'Ribbon scraps' },
        { name: 'Picnic baskets or crates', qty: { fixed: 2 }, unit: 'basket', est: [8, 15], diyAlt: 'Laundry baskets lined with a cloth' },
      ],
    },
    {
      category: 'Tableware',
      items: [
        { name: 'Rainbow plates', qty: { perGuest: 1, extra: 8 }, unit: 'plate', est: [0.4, 0.7], diyAlt: 'Plain plates in mixed colors' },
        { name: 'Compostable cups', qty: { perGuest: 1, extra: 8 }, unit: 'cup', est: [0.2, 0.4], diyAlt: 'Reusable kids cups' },
        { name: 'Gingham napkins', qty: { perGuest: 2, extra: 4 }, unit: 'napkin', est: [0.15, 0.3], diyAlt: 'Plain napkins' },
      ],
    },
    {
      category: 'Games & crafts',
      items: [
        { name: 'Bubble machine', qty: { fixed: 1 }, unit: 'machine', est: [15, 25], diyAlt: 'Bubble wands and a bucket' },
        { name: 'Sensory bin fillers', qty: { fixed: 1 }, unit: 'set', est: [6, 12], diyAlt: 'Rice + food coloring' },
        { name: 'Play parachute', qty: { fixed: 1 }, unit: 'parachute', est: [15, 25], diyAlt: 'A big flat bedsheet' },
        { name: 'Ribbon wands', qty: { perGuest: 1, extra: 1 }, unit: 'wand', est: [0.8, 1.5], diyAlt: 'See DIY: Ribbon Wands' },
      ],
    },
    {
      category: 'Favors',
      items: [
        { name: 'Mini bubble bottles', qty: { perGuest: 1, extra: 2 }, unit: 'bottle', est: [0.3, 0.6], diyAlt: 'Skip — bubbles at the party are enough' },
        { name: 'Chunky rainbow crayons', qty: { perGuest: 1, extra: 0 }, unit: 'set', est: [0.6, 1.2], diyAlt: 'Melted-crayon rainbows' },
        { name: 'Sticker sheets', qty: { perGuest: 1, extra: 0 }, unit: 'sheet', est: [0.4, 0.8], diyAlt: 'Leftover dot stickers' },
      ],
    },
  ],

  diy: [
    {
      name: 'Rainbow Rice Sensory Bin',
      time: '30 min + drying',
      difficulty: 'Easy',
      saves: 'A favorite activity for the cost of rice',
      materials: ['Uncooked rice', 'Zip bags', 'Food coloring', 'A splash of vinegar', 'A shallow bin and scoops'],
      steps: [
        'Put rice in a bag with vinegar and a few drops of color.',
        'Shake well; repeat for each color.',
        'Spread on trays and dry for a few hours.',
        'Layer the colors in the bin with scoops and cups.',
      ],
    },
    {
      name: 'Ribbon Wands',
      time: '30 min',
      difficulty: 'Easy',
      saves: 'Activity and favor in one',
      materials: ['Wooden dowels or chopsticks', 'Satin ribbon in rainbow colors', 'Small screw eyes or hot glue'],
      steps: [
        'Cut ribbons about 60 cm long, three per wand.',
        'Tie or glue them to the top of each dowel.',
        'Sand any rough edges.',
        'Bundle in a jar near the dance spot.',
      ],
    },
    {
      name: 'Streamer Backdrop',
      time: '30 min',
      difficulty: 'Easy',
      saves: 'A photo wall for a few dollars',
      materials: ['Crepe streamers in pastel rainbow colors', 'A curtain rod or branch', 'Tape'],
      steps: [
        'Cut streamers to the length of the drop.',
        'Tape them along the rod in rainbow order.',
        'Twist a few for texture.',
        'Hang where the light is soft.',
      ],
    },
  ],

  substitutions: [
    { swap: 'Picnic blankets', for: 'Quilts and throws from home', why: 'Cozier, and free' },
    { swap: 'Play parachute', for: 'A big flat bedsheet', why: 'Works just as well' },
    { swap: 'Balloon rainbow kit', for: 'Loose balloons in rainbow order', why: 'Same effect, less assembly' },
    { swap: 'Bakery cake', for: 'Homemade cake + rainbow sprinkles', why: 'Biggest single saving' },
  ],
}
