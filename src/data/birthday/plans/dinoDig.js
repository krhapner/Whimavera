// Dino Dig plan. Costs are illustrative planning estimates, not retailer prices.

export default {
  themeId: 'dino-dig',
  title: 'A Dino Dig Birthday',
  intro:
    'Fossils, ferns and desert sunsets — a day for little paleontologists to dig, discover and roar.',
  moodWords: ['Adventurous', 'Earthy', 'Prehistoric', 'Roaring'],
  headings: { decor: 'Five stops on the expedition', food: 'A prehistoric picnic' },
  heroPhoto: 'dinoDessertTable',
  foodPhoto: 'dinoVolcanoCake',

  board: [
    { kind: 'tablescape', caption: 'Dinosaurs in party hats', photo: 'dinoDessertTable' },
    { kind: 'cake', caption: 'Volcano cake', photo: 'dinoVolcanoCake' },
    { kind: 'detail', caption: 'Ferns & fossils', photo: 'dinoFossilDetails' },
    { kind: 'balloons', caption: 'Terracotta & olive balloons', photo: 'dinoBalloons' },
    { kind: 'invite', caption: 'Expedition invitation', photo: 'dinoInvite' },
    { kind: 'crown', caption: 'Fern garland', photo: 'dinoGarland' },
  ],

  setup: [
    {
      zone: 'Jurassic gate',
      description:
        'Big fern and palm leaves around the entrance with a hand-painted "Dino Dig — Explorers Only" sign.',
    },
    {
      zone: 'Fossil feast table',
      description:
        'Kraft paper runner, potted ferns and toy dinosaurs wearing tiny party hats marching down the middle.',
    },
    {
      zone: 'Excavation site',
      description:
        'A sandbox or kiddie pool of play sand with fossils and dino skeletons buried for digging.',
    },
    {
      zone: 'Explorer station',
      description:
        'Safari hats, paintbrushes, magnifying glasses and a "field notebook" for every paleontologist.',
    },
    {
      zone: 'Volcano lab',
      description:
        'An outdoor table on a tray (it gets messy!) for egg-hatching and the volcano finale.',
    },
  ],

  games: [
    {
      name: 'Fossil Excavation',
      time: '25 min',
      description: 'Dig with brushes and scoops to uncover buried fossils, then record each find in a field notebook.',
      energy: 'Calm',
      kinds: ['science', 'hunts', 'outdoors', 'pretend'],
    },
    {
      name: 'Hatch a Dino Egg',
      time: '20 min',
      description: 'Toy dinosaurs frozen inside ice "eggs" — melt them free with warm water and squeeze bottles.',
      energy: 'Calm',
      kinds: ['science'],
    },
    {
      name: 'Erupting Volcano',
      time: '10 min',
      description: 'Baking soda, vinegar and a drop of red color. Count down together — then stand back.',
      energy: 'Active',
      kinds: ['science', 'outdoors'],
    },
    {
      name: 'Dino Egg Hunt',
      time: '15 min',
      description: 'Speckled plastic eggs hidden around the yard, each with a mini dinosaur inside.',
      energy: 'Active',
      kinds: ['hunts', 'active', 'outdoors'],
    },
    {
      name: 'Salt-Dough Fossils',
      time: '20 min',
      description: 'Press shells, leaves and toy dino feet into salt dough to make fossils to bake at home.',
      energy: 'Calm',
      kinds: ['crafts'],
    },
    {
      name: 'Dino Cookie Decorating',
      time: '20 min',
      description: 'Dinosaur sugar cookies with green, orange and white icing.',
      energy: 'Calm',
      kinds: ['cooking', 'crafts'],
    },
    {
      name: 'Dino Stomp',
      time: '10 min',
      description: 'Stomp and roar while the music plays; freeze like a fossil when it stops.',
      energy: 'Active',
      kinds: ['music', 'active', 'pretend'],
    },
    {
      name: 'Dino Tail Tag',
      time: '10 min',
      description: 'Everyone tucks a fabric "tail" in their waistband. Grab tails, keep your own.',
      energy: 'Active',
      kinds: ['active', 'outdoors'],
    },
    {
      name: 'Dino Storytime',
      time: '10 min',
      description: 'A dinosaur picture book in the shade, explorers resting their boots.',
      energy: 'Calm',
      kinds: ['quiet'],
    },
  ],

  food: [
    { name: 'Volcano cupcakes', detail: 'Chocolate cupcakes with orange "lava" frosting', tag: 'Sweet' },
    { name: 'Dino dirt cups', detail: 'Chocolate pudding, cookie crumbs and a toy dino', tag: 'Sweet' },
    { name: 'Fossil sandwiches', detail: 'Dinosaur-cut sandwiches — cheese or turkey', tag: 'Savory' },
    { name: 'Dino bones', detail: 'Pretzel sticks with a mini marshmallow on each end', tag: 'Savory' },
    { name: 'Fern veggie cups', detail: 'Broccoli "trees", celery and ranch', tag: 'Fresh' },
    { name: 'Lava punch', detail: 'Orange and pineapple juice with sparkling water', tag: 'Drink' },
    { name: 'The cake', detail: 'Chocolate volcano cake with toy dinosaurs at the base', tag: 'Showpiece' },
  ],

  startHour: 14,
  moments: {
    setup: 'Fern gate, excavation pit and the fossil feast table.',
    prep: 'Sandwiches, dirt cups and lava punch.',
    final: 'Fossils buried, ice eggs out of the freezer.',
    arrive: ['Explorers arrive', 'Safari hats and field notebooks at the Jurassic gate.'],
    feast: ['Prehistoric picnic', 'Fossil sandwiches, dino bones and lava punch.'],
    cake: ['Cake & wishes', 'A roar instead of a cheer.'],
    goodbye: ['Expedition complete', 'Explorer badges and a dino to take home.'],
  },

  checklistExtras: {
    '2 weeks before': ['Order play sand, fossils and toy dinosaurs'],
    '1 week before': ['Freeze dinosaur ice eggs', 'Make the explorer sign'],
    'Day before': ['Bake the volcano cake', 'Bury fossils in the excavation pit'],
    'Party day': ['Hide the dino eggs'],
  },

  shop: [
    {
      category: 'Decor',
      items: [
        { name: 'Faux palm & fern leaves', qty: { fixed: 1 }, unit: 'set', est: [10, 16], diyAlt: 'Garden branches and ferns' },
        { name: 'Kraft paper roll', qty: { fixed: 1 }, unit: 'roll', est: [6, 10], diyAlt: 'Opened paper grocery bags' },
        { name: 'Toy dinosaur set', qty: { fixed: 1 }, unit: 'set', est: [10, 16], diyAlt: 'Dinosaurs from the toy box' },
        { name: 'Terracotta & olive balloons', qty: { fixed: 1 }, unit: 'pack', est: [8, 14], diyAlt: 'Green and orange balloons' },
      ],
    },
    {
      category: 'Tableware',
      items: [
        { name: 'Terracotta-tone plates', qty: { perGuest: 1, extra: 6 }, unit: 'plate', est: [0.4, 0.7], diyAlt: 'Plain kraft plates' },
        { name: 'Kraft cups', qty: { perGuest: 1, extra: 6 }, unit: 'cup', est: [0.25, 0.45], diyAlt: 'Clear cups + dino stickers' },
        { name: 'Olive napkins', qty: { perGuest: 2, extra: 0 }, unit: 'napkin', est: [0.15, 0.3], diyAlt: 'Green napkins' },
      ],
    },
    {
      category: 'Games & crafts',
      items: [
        { name: 'Play sand', qty: { fixed: 3 }, unit: 'bag', est: [5, 8], diyAlt: 'Your sandbox' },
        { name: 'Plaster fossils & skeletons', qty: { perGuest: 1, extra: 2 }, unit: 'fossil', est: [1, 2], diyAlt: 'See DIY: Salt-Dough Fossils' },
        { name: 'Excavation brushes', qty: { perGuest: 1, extra: 0 }, unit: 'brush', est: [0.4, 0.8], diyAlt: 'Clean paintbrushes' },
        { name: 'Speckled plastic eggs', qty: { perGuest: 3, extra: 0 }, unit: 'egg', est: [0.2, 0.4], diyAlt: 'Painted paper eggs' },
        { name: 'Baking soda & vinegar', qty: { fixed: 1 }, unit: 'set', est: [4, 6], diyAlt: 'From the pantry' },
      ],
    },
    {
      category: 'Favors',
      items: [
        { name: 'Mini dinosaur figures', qty: { perGuest: 1, extra: 0 }, unit: 'figure', est: [0.6, 1.2], diyAlt: 'Dino stickers' },
        { name: 'Explorer badges', qty: { perGuest: 1, extra: 0 }, unit: 'badge', est: [0.4, 0.8], diyAlt: 'Printed badges + safety pins' },
        { name: 'Kraft favor bags', qty: { perGuest: 1, extra: 2 }, unit: 'bag', est: [0.3, 0.6], diyAlt: 'Lunch bags with a dino stamp' },
      ],
    },
  ],

  diy: [
    {
      name: 'Dino Ice Eggs',
      time: '15 min + overnight freeze',
      difficulty: 'Easy',
      saves: 'A science activity for the price of balloons',
      materials: ['Small water balloons', 'Mini toy dinosaurs', 'Water', 'A tray for the freezer'],
      steps: [
        'Push a mini dinosaur into each balloon.',
        'Fill with water and tie.',
        'Freeze overnight on a tray.',
        'Peel off the balloons just before the party.',
      ],
    },
    {
      name: 'Salt-Dough Fossils',
      time: '30 min',
      difficulty: 'Easy',
      saves: 'Replaces store-bought fossil kits',
      materials: ['2 cups flour', '1 cup salt', '¾ cup water', 'Shells, leaves and toy dinosaurs to press'],
      steps: [
        'Mix flour, salt and water into a smooth dough.',
        'Roll into balls and flatten into rounds.',
        'Press shells, leaves or dino feet into each one.',
        'Bake low (about 250°F) for 2–3 hours, or air-dry.',
      ],
    },
    {
      name: 'Backyard Excavation Pit',
      time: '45 min',
      difficulty: 'Easy',
      saves: 'The main event, using a sandbox or kiddie pool',
      materials: ['Sandbox or kiddie pool', 'Play sand', 'Fossils and toy skeletons', 'Brushes and scoops'],
      steps: [
        'Fill the pool with a few inches of sand.',
        'Bury fossils at different depths.',
        'Mark the corners with "dig site" flags.',
        'Set out brushes and scoops beside it.',
      ],
    },
  ],

  substitutions: [
    { swap: 'Plaster fossil kits', for: 'Homemade salt-dough fossils', why: 'Pennies each' },
    { swap: 'Faux palm leaves', for: 'Garden branches and ferns', why: 'Free and more realistic' },
    { swap: 'New toy dinosaurs', for: 'The toy box', why: 'Every house has a few' },
    { swap: 'Bakery cake', for: 'Homemade chocolate volcano cake', why: 'Biggest single saving' },
  ],
}
