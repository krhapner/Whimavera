// Woodland Tea Party plan. Costs are illustrative planning estimates, not retailer prices.

export default {
  themeId: 'woodland-tea',
  title: 'A Woodland Tea Party',
  intro:
    'Teacups among the ferns, honey cakes and woodland friends — a gentle, storybook gathering.',
  moodWords: ['Gentle', 'Storybook', 'Honeyed', 'Leafy'],
  headings: { decor: 'Five nooks in the woods', food: 'Tea for the woodland friends' },
  heroPhoto: 'teaGardenTable',
  foodPhoto: 'teaCake',

  board: [
    { kind: 'tablescape', caption: 'The woodland tea table', photo: 'teaGardenTable' },
    { kind: 'cake', caption: 'Honey cake with berries', photo: 'teaCake' },
    { kind: 'detail', caption: 'Mismatched teacups', photo: 'teaCupsSet' },
    { kind: 'balloons', caption: 'Fern & honey balloons', photo: 'teaBalloons' },
    { kind: 'invite', caption: 'Woodland friends invitation', photo: 'teaInvite' },
    { kind: 'crown', caption: 'Fern garland', photo: 'teaGarland' },
  ],

  setup: [
    {
      zone: 'Woodland welcome',
      photo: 'teaZoneWelcome',
      description:
        'An ivy-framed doorway with a fern-and-flower welcome sign, giant toadstools, woodland animal cutouts and little lanterns leading to the tea table.',
    },
    {
      zone: 'The tea table',
      photo: 'teaZoneTable',
      description:
        'A linen cloth, mismatched teacups and saucers, tiered cake stands and honey jars filled with wildflowers.',
    },
    {
      zone: 'Hat & bonnet bar',
      photo: 'teaZoneHatBar',
      description:
        'A hat stand or basket of sun hats, bonnets, bow ties and animal ears for proper tea-party dressing.',
    },
    {
      zone: 'Craft clearing',
      photo: 'teaZoneCraft',
      description:
        'A low table for animal masks and teacup planters, with smocks for little painters.',
    },
    {
      zone: 'Friends of the forest',
      photo: 'teaZoneFriends',
      description:
        'Stuffed woodland animals seated at their own tiny table — the perfect photo spot.',
    },
  ],

  games: [
    {
      name: 'Teacup Planters',
      time: '25 min',
      description: 'Paint a plain teacup (or a sturdy paper one) and plant a seedling to take home.',
      energy: 'Calm',
      kinds: ['crafts', 'outdoors'],
    },
    {
      name: 'Woodland Animal Masks',
      time: '20 min',
      description: 'Fox, rabbit, owl or hedgehog — pre-cut masks with felt, feathers and markers.',
      energy: 'Calm',
      kinds: ['crafts', 'pretend'],
    },
    {
      name: 'Tea Sandwich Kitchen',
      time: '20 min',
      description: 'Little chefs fill and cut their own sandwiches with leaf and acorn cookie cutters.',
      energy: 'Calm',
      kinds: ['cooking'],
    },
    {
      name: 'Acorn Hunt',
      time: '15 min',
      description: 'Painted acorns (or wooden ones) hidden in the garden — each color is worth a different number of points.',
      energy: 'Active',
      kinds: ['hunts', 'outdoors', 'active'],
    },
    {
      name: 'Fancy Hat Parade',
      time: '10 min',
      description: 'Everyone in their finest hats, parading to music and taking a bow.',
      energy: 'Active',
      kinds: ['pretend', 'music'],
    },
    {
      name: 'Pass the Teapot',
      time: '10 min',
      description: 'Pass-the-parcel with a teapot full of tiny prizes. When the music stops, take one.',
      energy: 'Calm',
      kinds: ['music'],
    },
    {
      name: 'Fox & Rabbits',
      time: '10 min',
      description: 'A gentle game of tag: the fox chases, rabbits are safe in their burrows (hula hoops).',
      energy: 'Active',
      kinds: ['active', 'outdoors'],
    },
    {
      name: 'Leaf-Rubbing Journals',
      time: '15 min',
      description: 'Collect leaves, rub them with crayons and label them in a little nature journal.',
      energy: 'Calm',
      kinds: ['science', 'outdoors', 'quiet'],
    },
    {
      name: 'Story Circle',
      time: '10 min',
      description: 'A woodland picture book read aloud while the tea is poured.',
      energy: 'Calm',
      kinds: ['quiet'],
    },
  ],

  food: [
    { name: 'Tea sandwiches', detail: 'Cucumber & cream cheese, jam, and honey butter', tag: 'Savory' },
    { name: 'Mini scones', detail: 'With jam and whipped cream', tag: 'Sweet' },
    { name: 'Mushroom meringues', detail: 'Meringue caps on meringue stems, dusted with cocoa', tag: 'Sweet' },
    { name: 'Berry bowls', detail: 'Strawberries, raspberries and blueberries', tag: 'Fresh' },
    { id: 'garden-crudites', name: 'Garden crudités', detail: 'Carrots with their tops, radishes and snap peas around a herb dip', tag: 'Fresh' },
    { name: 'Woodland "tea"', detail: 'Iced peach tea or caffeine-free chamomile with honey', tag: 'Drink' },
    { id: 'tea-cake', name: 'The cake', detail: 'Naked honey cake with fresh berries, flowers, sugar mushrooms and a bunny topper', tag: 'Showpiece' },
  ],

  startHour: 14,
  moments: {
    setup: 'Lantern path, tea table and the hat bar.',
    prep: 'Sandwiches, scones and a pot of woodland tea.',
    final: 'Teacups out, lanterns lit, music on.',
    arrive: ['Woodland friends arrive', 'Choose a hat at the bonnet bar.'],
    feast: ['Tea is served', 'Sandwiches, scones and mushroom meringues.'],
    cake: ['Cake & wishes', 'Honey cake on the tiered stand.'],
    goodbye: ['Home through the woods', 'Teacup planters and favors to take home.'],
  },

  checklistExtras: {
    '2 weeks before': ['Thrift mismatched teacups and saucers', 'Gather hats and bow ties'],
    '1 week before': ['Paint the acorns', 'Pre-cut animal masks'],
    'Day before': ['Bake honey cake and meringues', 'Pot up seedlings for the planters'],
    'Party day': ['Hide the acorns'],
  },

  shop: [
    {
      category: 'Decor',
      items: [
        { name: 'Faux fern garland', qty: { fixed: 2 }, unit: 'garland', est: [8, 14], diyAlt: 'Fresh ferns from the garden' },
        { name: 'Linen-look tablecloth', qty: { fixed: 1 }, unit: 'cloth', est: [12, 20], diyAlt: 'A plain bedsheet' },
        { name: 'Small lanterns', qty: { fixed: 4 }, unit: 'lantern', est: [4, 8], diyAlt: 'Jars with battery tealights' },
        { name: 'Tiered cake stand', qty: { fixed: 1 }, unit: 'stand', est: [12, 20], diyAlt: 'Stacked plates on upturned cups' },
      ],
    },
    {
      category: 'Tableware',
      items: [
        { name: 'Teacups & saucers (thrifted)', qty: { perGuest: 1, extra: 2 }, unit: 'set', est: [1, 3], diyAlt: 'Paper teacups' },
        { name: 'Floral dessert plates', qty: { perGuest: 1, extra: 6 }, unit: 'plate', est: [0.4, 0.7], diyAlt: 'Plain plates + doilies' },
        { name: 'Tea napkins', qty: { perGuest: 2, extra: 0 }, unit: 'napkin', est: [0.15, 0.3], diyAlt: 'Cloth napkins you own' },
      ],
    },
    {
      category: 'Games & crafts',
      items: [
        { name: 'Animal mask kit', qty: { perGuest: 1, extra: 2 }, unit: 'mask', est: [1, 2], diyAlt: 'Paper-plate masks' },
        { name: 'Seedlings for planters', qty: { perGuest: 1, extra: 1 }, unit: 'plant', est: [1.5, 3], diyAlt: 'Seeds and soil' },
        { name: 'Acrylic paint set', qty: { fixed: 1 }, unit: 'set', est: [8, 14], diyAlt: 'Paints you already have' },
        { name: 'Wooden acorns', qty: { fixed: 1 }, unit: 'bag', est: [6, 10], diyAlt: 'Real acorns or pinecones' },
      ],
    },
    {
      category: 'Favors',
      items: [
        { name: 'Tea-party favor boxes', qty: { perGuest: 1, extra: 2 }, unit: 'box', est: [0.6, 1.2], diyAlt: 'Kraft bags with a leaf stamp' },
        { name: 'Wildflower seed packets', qty: { perGuest: 1, extra: 0 }, unit: 'packet', est: [0.8, 1.5], diyAlt: 'Seeds in paper envelopes' },
        { name: 'Woodland animal stickers', qty: { perGuest: 1, extra: 0 }, unit: 'sheet', est: [0.5, 1], diyAlt: 'Printed coloring pages' },
      ],
    },
  ],

  diy: [
    {
      name: 'Fresh Fern Garland',
      time: '45 min',
      difficulty: 'Easy',
      saves: 'Lush greenery for almost nothing',
      materials: ['Fresh ferns or leafy branches', 'Jute twine', 'Floral wire', 'A spray bottle of water'],
      steps: [
        'Cut a length of twine for the table or doorway.',
        'Wire small bundles of ferns along it, overlapping as you go.',
        'Mist with water and keep cool until the party.',
        'Drape down the table or over the welcome sign.',
      ],
    },
    {
      name: 'Woodland Animal Masks',
      time: '1 hr',
      difficulty: 'Easy',
      saves: 'Pre-cut masks for a fraction of a kit',
      materials: ['Printable mask templates', 'Card stock', 'Felt scraps and feathers', 'Elastic cord', 'Hole punch'],
      steps: [
        'Print templates onto card stock and cut out.',
        'Punch holes at the sides and thread elastic.',
        'Sort felt ears and noses by animal into bowls.',
        'Guests glue and color their own at the party.',
      ],
    },
    {
      name: 'Teacup Planters',
      time: '30 min prep',
      difficulty: 'Easy',
      saves: 'A favor that keeps growing',
      materials: ['Thrifted teacups', 'Small succulents or herb seedlings', 'Potting mix', 'Acrylic paint pens'],
      steps: [
        'Wash the teacups and set out paint pens.',
        'Guests decorate their cups first.',
        'Add a little potting mix and a seedling.',
        'Water lightly and set aside to take home.',
      ],
    },
  ],

  substitutions: [
    { swap: 'New teacups', for: 'Thrift-store cups and saucers', why: 'Mismatched is the look — and it costs less' },
    { swap: 'Faux fern garland', for: 'Fresh ferns from the garden', why: 'Free and smells lovely' },
    { swap: 'Cake stand', for: 'Plates stacked on upturned cups', why: 'Same height, nothing to buy' },
    { swap: 'Bakery cake', for: 'Homemade honey cake + fresh berries', why: 'Biggest single saving' },
  ],
}
