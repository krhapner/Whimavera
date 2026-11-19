// Activity image mapping. Files in src/assets/activities/ named
// `<activity-id>.webp|jpg|png` are bundled and picked up automatically.
const files = import.meta.glob('../assets/activities/*.{webp,jpg,jpeg,png}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const byId = {}
for (const [path, url] of Object.entries(files)) {
  const id = path.split('/').pop().replace(/\.(webp|jpe?g|png)$/, '')
  // Prefer .webp when more than one format exists.
  if (!byId[id] || path.endsWith('.webp')) byId[id] = url
}

/** Descriptive alt text per activity image (used when the image exists). */
export const activityImageAlt = {
  'flower-crown-studio': 'A flower crown station with finished crowns on cake stands, a tray of blooms and baskets of ribbon',
  'fairy-treasure-hunt': 'A basket of large fairy gems, drawstring pouches and picture clue cards on a garden bench',
  'toadstool-cupcake-bar': 'A cupcake decorating table with pink and red frosting, white candy spots and finished toadstool cupcakes',
  'fairy-potion-lab': 'Cups of blue butterfly-pea tea turning purple and pink beside lemon wedges and droppers',
  'freeze-fairy': 'A speaker and a basket of fairy wings and ribbon wands on the lawn by pastel balloons',
  'bug-bloom-safari': 'Pastel magnifying glasses, picture checklists and clipboards on a garden table',
  'wish-jars': 'Jars of pastel sand, confetti, funnels and wish scrolls on a craft table',
  'musical-toadstools': 'Red-and-white toadstool mats in a circle on the lawn',
  'fairy-storytime': 'Children in fairy wings on pastel cushions and blankets under a tree, with a basket of picture books',
  'constellation-cards': 'Navy cards pricked with constellation patterns, one held up to a light box, with a flashlight and gold paper stars',
  'glow-star-hunt': 'Two children with flashlights searching a sofa scattered with glow-in-the-dark stars under a smiling paper moon',
  'straw-rocket-launch': 'A child holding a star-printed paper rocket on a straw, aiming at a paper moon target',
  'galaxy-jars': 'Children layering cotton wool and shimmering blue, lilac and pink water into jars on a navy table',
  'star-cookie-studio': 'Star sugar cookies with bowls of navy, lilac and white icing, gold star sprinkles and a child piping a smiley face',
  'astronaut-training': 'Children in pajamas tumbling out of a star-print tunnel and hopping across cushion craters beside a giant smiling moon',
  'glow-dance-party': 'Children dancing in the dark with glowing bracelets and hoops under a paper moon and stars',
  'backyard-stargazing': 'Children on blankets in the backyard at dusk, pointing at the stars with a star map, lanterns and a paper moon nearby',
  'teacup-planters': 'A child painting a flowered teacup beside finished teacup planters with seedlings and pots of paint',
  'woodland-animal-masks': 'Children decorating felt fox and rabbit masks with felt pieces and feathers, with trays of crayons and ferns',
  'leaf-rubbing-journals': 'A green crayon leaf rubbing on cream paper beside a nature journal and a pile of autumn leaves',
  'story-circle': 'Four children on floor cushions reading a woodland picture book, with plush hedgehogs, toadstools and teacups nearby',
  'pass-the-teapot': 'Smiling children sitting in a circle passing a pink teapot filled with tiny wrapped prizes',
  'fox-rabbits': 'Laughing children in bunny and fox ears hopping between hula-hoop burrows on a rug',
  'acorn-hunt': 'Two girls finding big painted acorns and collecting them in a wicker basket among cushions and ferns',
  'fancy-hat-parade': 'Giggling children parading in straw hats, bonnets, bunny ears and bow ties',
  'tea-sandwich-kitchen': 'Children cutting sandwiches with leaf and acorn cookie cutters beside bowls of jam and cucumber',
  'sunken-treasure-hunt': 'Children on the lawn opening a little treasure chest of gold coins beside a hand-drawn picture map',
  'shell-crown-studio': 'Paper crowns in coral, seafoam and teal decorated with shells and pearls on craft trays',
  'ocean-in-a-bottle': 'A child pouring water into clear bottles with little shells inside, with towels nearby',
  'jellyfish-cupcakes': 'Children decorating pastel-frosted cupcakes with candy eyes and sour-strip tentacles',
  'sharks-minnows': 'Laughing children running across a sunny backyard lawn past paper sharks and balloons',
  'bubble-lagoon': 'Children making giant bubbles with a hoop wand over a tray of solution in the backyard',
  'go-fishing': 'Two children with stick-and-string fishing rods catching paper fish from a blue cardboard pond',
  'freeze-fish': 'Children dancing under seafoam crepe-paper seaweed and pink paper jellyfish',
  'tide-pool-storytime': 'Three children reading an ocean picture book under a blue gauze canopy with octopus and starfish pillows',
  'bedtime-star-stories': 'Three girls reading a moon picture book together in a glowing blanket tent with star and moon pillows',
}

export const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const activityImageUrl = (id) => byId[id] || null
