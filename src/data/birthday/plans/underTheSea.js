// Under the Sea plan. Costs are illustrative planning estimates, not retailer prices.

export default {
  themeId: 'under-the-sea',
  title: 'An Under the Sea Birthday',
  intro:
    'A shimmering afternoon beneath the waves — pearls, seashells and seafoam blues, with a treasure chest waiting to be found.',
  moodWords: ['Shimmering', 'Breezy', 'Pearlescent', 'Playful'],
  headings: { decor: 'Five spots beneath the waves', food: 'A seaside spread' },
  heroPhoto: 'seaDessertTable',
  foodPhoto: 'seaCake',

  board: [
    { kind: 'tablescape', caption: 'The ocean-floor table', photo: 'seaDessertTable' },
    { kind: 'cake', caption: 'Seafoam cake with candy shells', photo: 'seaCake' },
    { kind: 'detail', caption: 'Shells & pearls', photo: 'seaShellDetails' },
    { kind: 'balloons', caption: 'A wave of balloons', photo: 'seaBalloons' },
    { kind: 'invite', caption: 'Pearl-white invitation', photo: 'seaInvite' },
    { kind: 'crown', caption: 'Shell crown station', photo: 'seaCrowns' },
  ],

  setup: [
    {
      zone: 'Welcome wave',
      description:
        'A half-arch of seafoam, pearl and coral balloons with green streamers trailing like kelp. A basket of pearl necklaces greets each guest.',
    },
    {
      zone: 'The ocean-floor table',
      description:
        'A sand-colored runner scattered with shells, glass jars of blue water and battery tealights, and a few paper fish swimming down the center.',
    },
    {
      zone: 'Craft cove',
      description:
        'Shell crowns and ocean-in-a-bottle supplies sorted into shallow trays, with towels nearby for drips.',
    },
    {
      zone: 'Photo reef',
      description:
        'Layers of blue tulle, a fishing net with paper sea creatures, and big cardboard bubbles for little divers to pose between.',
    },
    {
      zone: 'Treasure chest',
      description:
        'A trunk (or a painted cardboard box) filled with favor boxes — opened together at the very end.',
    },
  ],

  games: [
    {
      name: 'Sunken Treasure Hunt',
      time: '20 min',
      description: 'Gold coins and "jewels" hidden around the yard, with a picture map for each crew of pirates and mermaids.',
      energy: 'Active',
      kinds: ['hunts', 'outdoors', 'active'],
    },
    {
      name: 'Shell Crown Studio',
      time: '25 min',
      description: 'Pre-cut crown bands plus shells, pearls and sea-glass gems. Every guest leaves a mermaid or a sea king.',
      energy: 'Calm',
      kinds: ['crafts', 'pretend'],
    },
    {
      name: 'Ocean in a Bottle',
      time: '15 min',
      description: 'Water, a drop of blue color, a little oil and tiny shells — tip it gently and watch the waves roll.',
      energy: 'Calm',
      kinds: ['science', 'crafts'],
    },
    {
      name: 'Jellyfish Cupcakes',
      time: '20 min',
      description: 'Pastel-frosted cupcakes plus ribbon-candy "tentacles" and candy eyes. Decorate, then save for the feast.',
      energy: 'Calm',
      kinds: ['cooking', 'crafts'],
    },
    {
      name: 'Sharks & Minnows',
      time: '10 min',
      description: 'The classic chase game across the "sea" — tagged minnows become seaweed and help catch the rest.',
      energy: 'Active',
      kinds: ['active', 'outdoors'],
    },
    {
      name: 'Bubble Lagoon',
      time: '15 min',
      description: 'Giant bubble wands and a tray of solution. Who can make the biggest jellyfish bubble?',
      energy: 'Active',
      kinds: ['outdoors', 'science', 'active'],
    },
    {
      name: 'Go Fishing',
      time: '15 min',
      description: 'Magnet fishing rods and paper fish with paperclip mouths, each with a little prize number on the back.',
      energy: 'Calm',
      kinds: ['pretend', 'hunts'],
    },
    {
      name: 'Freeze, Fish!',
      time: '10 min',
      description: 'Swim around while the music plays; freeze as your favorite sea creature when it stops.',
      energy: 'Active',
      kinds: ['music', 'active', 'pretend'],
    },
    {
      name: 'Tide-Pool Storytime',
      time: '10 min',
      description: 'A short ocean picture book on beach towels — a calm moment before cake.',
      energy: 'Calm',
      kinds: ['quiet'],
    },
  ],

  food: [
    { name: 'Jellyfish cupcakes', detail: 'Decorated by the guests themselves', tag: 'Sweet' },
    { name: 'Goldfish cracker cups', detail: 'Little paper cups for easy grabbing', tag: 'Savory' },
    { name: 'Sea-star sandwiches', detail: 'Star-cut sandwiches — jam or turkey & cheese', tag: 'Savory' },
    { name: 'Pearl fruit cups', detail: 'Melon balls, blueberries and green grapes', tag: 'Fresh' },
    { name: 'Seaweed veggie cups', detail: 'Cucumber ribbons, snap peas and carrot sticks over ranch', tag: 'Fresh' },
    { name: 'Sea-foam lemonade', detail: 'Lemonade with blue ice cubes', tag: 'Drink' },
    { id: 'sea-cake', name: 'The cake', detail: 'Ombré seafoam cake with white-chocolate shells, sugar pearls and seahorse and fish toppers', tag: 'Showpiece' },
  ],

  startHour: 14,
  moments: {
    setup: 'Balloon wave, tulle and the ocean-floor table.',
    prep: 'Sandwiches, fruit cups and sea-foam lemonade.',
    final: 'Bubbles out, music on, treasure hidden.',
    arrive: ['Divers arrive', 'Pearl necklaces at the welcome wave.'],
    feast: ['Seaside feast', 'Sandwiches, fruit and jellyfish cupcakes.'],
    cake: ['Cake & wishes', 'Song and candles at the reef.'],
    goodbye: ['Swim home', 'Favors from the treasure chest.'],
  },

  checklistExtras: {
    '2 weeks before': ['Gather shells, pearls and bottle supplies'],
    '1 week before': ['Paint the treasure chest and favor boxes', 'Cut out paper fish'],
    'Day before': ['Bake cake layers', 'Fill ocean bottles with water and color'],
    'Party day': ['Hide the sunken treasure'],
  },

  shop: [
    {
      category: 'Decor',
      items: [
        { name: 'Seafoam & pearl balloon kit', qty: { fixed: 1 }, unit: 'kit', est: [18, 26], diyAlt: 'Loose balloons + green curling ribbon' },
        { name: 'Sand-colored table runner', qty: { fixed: 1 }, unit: 'runner', est: [8, 14], diyAlt: 'Kraft paper or burlap' },
        { name: 'Natural seashell mix', qty: { fixed: 1 }, unit: 'bag', est: [8, 12], diyAlt: 'Shells from your last beach trip' },
        { name: 'Blue tulle', qty: { fixed: 6 }, unit: 'yard', est: [1.5, 3], diyAlt: 'A sheer blue curtain' },
        { name: 'Decorative fishing net', qty: { fixed: 1 }, unit: 'net', est: [6, 10], diyAlt: 'Produce netting from the grocery store' },
      ],
    },
    {
      category: 'Tableware',
      items: [
        { name: 'Wave-edge plates', qty: { perGuest: 1, extra: 6 }, unit: 'plate', est: [0.4, 0.7], diyAlt: 'Plain blue plates' },
        { name: 'Pearl-white cups', qty: { perGuest: 1, extra: 6 }, unit: 'cup', est: [0.3, 0.5], diyAlt: 'Clear cups with a ribbon' },
        { name: 'Seafoam napkins', qty: { perGuest: 2, extra: 0 }, unit: 'napkin', est: [0.15, 0.3], diyAlt: 'Plain napkins tied with twine' },
        { name: 'Clear dessert cups', qty: { perGuest: 1, extra: 2 }, unit: 'cup', est: [0.2, 0.4], diyAlt: 'Small jars from the cupboard' },
      ],
    },
    {
      category: 'Games & crafts',
      items: [
        { name: 'Shell crown supplies', qty: { perGuest: 1, extra: 2 }, unit: 'crown', est: [1.5, 2.5], diyAlt: 'Cardstock bands + glued shells' },
        { name: 'Small clear bottles', qty: { perGuest: 1, extra: 2 }, unit: 'bottle', est: [0.6, 1.2], diyAlt: 'Rinsed water bottles' },
        { name: 'Giant bubble wands & solution', qty: { fixed: 1 }, unit: 'set', est: [10, 16], diyAlt: 'Dish soap + string-and-straw wands' },
        { name: 'Gold treasure coins', qty: { fixed: 1 }, unit: 'bag', est: [6, 10], diyAlt: 'Cardboard coins painted gold' },
        { name: 'Magnet fishing set', qty: { fixed: 1 }, unit: 'set', est: [10, 15], diyAlt: 'Sticks, string, magnets and paper fish' },
      ],
    },
    {
      category: 'Favors',
      items: [
        { name: 'Mini treasure-chest boxes', qty: { perGuest: 1, extra: 2 }, unit: 'box', est: [0.8, 1.5], diyAlt: 'Kraft boxes painted gold' },
        { name: 'Pearl bead necklaces', qty: { perGuest: 1, extra: 0 }, unit: 'necklace', est: [0.5, 1], diyAlt: 'String your own at the craft cove' },
        { name: 'Mini sea-creature figures', qty: { perGuest: 1, extra: 0 }, unit: 'figure', est: [0.6, 1.2], diyAlt: 'Ocean stickers' },
      ],
    },
  ],

  diy: [
    {
      name: 'Treasure Chest Favor Boxes',
      time: '1 hr',
      difficulty: 'Easy',
      saves: 'Turns plain boxes into the grand finale',
      materials: ['Small kraft boxes', 'Gold and brown acrylic paint', 'Gold paint pen', 'Faux pearls and gems', 'Glue dots'],
      steps: [
        'Paint each box brown and let it dry.',
        'Add gold "bands" and a keyhole with the paint pen.',
        'Glue a pearl or gem on each lid.',
        'Fill with the favors and stack them in the big chest.',
      ],
    },
    {
      name: 'Jellyfish Lanterns',
      time: '45 min',
      difficulty: 'Easy',
      saves: 'Ceiling decor for the price of paper and ribbon',
      materials: ['Paper lanterns or paper bowls', 'Pastel ribbon and crepe streamers', 'Clear tape', 'Fishing line'],
      steps: [
        'Open the lanterns (or use upturned bowls).',
        'Tape ribbon and streamer "tentacles" around the bottom edge.',
        'Vary the lengths for movement.',
        'Hang at different heights over the table.',
      ],
    },
    {
      name: 'Ocean-in-a-Bottle Kits',
      time: '30 min',
      difficulty: 'Easy',
      saves: 'Activity and favor in one',
      materials: ['Small clear bottles', 'Blue food coloring', 'Baby oil or vegetable oil', 'Tiny shells', 'Strong glue for the caps'],
      steps: [
        'Pre-measure the oil into a jug.',
        'At the party, guests fill bottles two-thirds with colored water.',
        'Top up with oil and drop in shells.',
        'A grown-up glues each cap shut.',
      ],
    },
  ],

  substitutions: [
    { swap: 'Blue tulle', for: 'A sheer blue curtain or bedsheet', why: 'Same watery layers, nothing to buy' },
    { swap: 'Balloon kit', for: 'Loose balloons with curling-ribbon kelp', why: 'Quick and very effective' },
    { swap: 'Bought seashells', for: 'Shells from a beach trip', why: 'Free, and a story to tell' },
    { swap: 'Bakery cake', for: 'Homemade cake + candy shells', why: 'Biggest single saving' },
  ],
}
