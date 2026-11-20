/**
 * Editorial copy for the public theme pages. Written by hand per theme so
 * each page answers what a parent searching for that party actually wants
 * to know. Everything else on a theme page (palette, zones, activities,
 * food, DIY, shopping, costs) comes from the theme's plan data, so a new
 * theme gets a page automatically — copy here just makes it better.
 *
 *   slug         URL: /themes/<slug>/
 *   short        the theme as parents say it, for headings ("Dinosaur")
 *   label        how parents search for it ("dinosaur birthday party")
 *   title        <title>, under ~60 characters
 *   description  meta description, under ~155 characters
 *   intro        opening paragraphs
 *   tips         three practical, theme-specific tips
 */
export const THEME_SEO = {
  'fairy-garden': {
    short: 'Fairy garden',
    slug: 'fairy-garden-birthday',
    label: 'Fairy garden birthday party',
    title: 'Fairy Garden Birthday Party Ideas, Games & Food',
    description:
      'Fairy garden birthday party ideas: flower crowns, toadstool cupcakes, a fairy treasure hunt and a blush-and-sage palette — with costs and a shopping list.',
    intro: [
      'A fairy garden party works almost anywhere there is a patch of green: a backyard, a park corner, even a balcony with a few potted plants. The magic comes from small things — moss on the table, toadstools tucked under a tree, a flower crown waiting for every guest.',
      'It suits children who love dressing up, making things and quiet make-believe, and it is one of the easiest themes to do on a budget, because so much of the decoration can be gathered from the garden or made the week before.',
    ],
    tips: [
      'Make the flower crowns the first activity: guests wear them for the rest of the party and every photo looks finished.',
      'Count the treasure-hunt gems before and after — and choose gems larger than a choking-test size for younger siblings.',
      'Bake plain cupcakes the day before; children decorate them as toadstools at the party, which doubles as dessert.',
    ],
  },
  'under-the-sea': {
    short: 'Under the sea',
    slug: 'under-the-sea-birthday',
    label: 'Under the sea birthday party',
    title: 'Under the Sea Birthday Party Ideas for Kids',
    description:
      'Under the sea birthday party ideas: shell crowns, a sunken treasure hunt, ocean-in-a-bottle crafts, jellyfish cupcakes and a seafoam palette — with costs.',
    intro: [
      'An under the sea party is pearls, shells and seafoam blues rather than one particular cartoon — which means it works for mermaid fans, pirate fans and children who simply love the beach.',
      'The activities lean towards treasure: hunting for gold coins, crowning every guest with shells, and making a little ocean in a bottle to take home. It is lively without being loud, and most of it can be set up the morning of the party.',
    ],
    tips: [
      'Give each crew of pirates and mermaids its own picture map so younger children can play without reading.',
      'Freeze blue ice cubes the night before — dropped into plain lemonade they turn it "sea-foam" with no extra cost.',
      'Glue the caps on the ocean bottles yourself before they go home; it saves a sticky car seat.',
    ],
  },
  'starry-night': {
    short: 'Starry night',
    slug: 'starry-night-birthday',
    label: 'Starry night birthday party',
    title: 'Starry Night & Space Birthday Party Ideas',
    description:
      'Starry night birthday party ideas for kids: a glow-star hunt, straw rockets, galaxy jars, a stargazing den and a midnight-blue palette — with costs.',
    intro: [
      'A starry night party is a celestial theme with a softer side: moons and constellations, lilac clouds and soft gold, rather than rockets alone. It is a lovely choice for a late-afternoon or early-evening party, when the lights can go down for the glow games.',
      'Older children enjoy the science in it — projecting their own constellations, making a nebula in a jar — while younger guests are happy hunting for glow-in-the-dark stars with a flashlight.',
    ],
    tips: [
      'Start forty-five minutes before sunset if you can, so the glow activities happen as it gets dark naturally.',
      'Charge or replace flashlight batteries the day before — a dead flashlight is the fastest way to end a glow hunt in tears.',
      'Keep a quiet stargazing den with cushions and a picture book for guests who need a break from the excitement.',
    ],
  },
  'woodland-tea': {
    short: 'Woodland tea party',
    slug: 'woodland-tea-party-birthday',
    label: 'Woodland tea party birthday',
    title: 'Woodland Tea Party Birthday Ideas for Kids',
    description:
      'Woodland tea party birthday ideas: teacup planters, animal masks, an acorn hunt, tea sandwiches and honey cake in a fern-and-honey palette — with costs.',
    intro: [
      'A woodland tea party is a gentle, storybook kind of birthday — teacups among the ferns, little sandwiches, and woodland friends at their own table. It suits children who like pretend play and grown-up rituals, and it is calm enough for a small, mixed-age group.',
      'Thrifted, mismatched teacups do most of the decorating. The activities are crafts and quiet games: painting a teacup planter to take home, making a fox or rabbit mask, and hunting for painted acorns in the garden.',
    ],
    tips: [
      'Use real but mismatched thrifted teacups for older children and sturdy paper cups for the under-fives.',
      'Let the children make their own sandwiches with leaf and acorn cutters — it is an activity and lunch at once.',
      'Serve caffeine-free iced peach or chamomile "tea" so the tea party is real without the caffeine.',
    ],
  },
  'dino-dig': {
    short: 'Dinosaur',
    slug: 'dinosaur-birthday',
    label: 'Dinosaur birthday party',
    title: 'Dinosaur Birthday Party Ideas: Fossil Dig & Games',
    description:
      'Dinosaur birthday party ideas: a backyard fossil excavation, dino ice eggs, an erupting volcano, dirt cups and a volcano cake — with costs and a shopping list.',
    intro: [
      'A dinosaur party is really an expedition. Guests arrive as paleontologists, dig for fossils in a sandpit, hatch dinosaurs from ice eggs and finish with an erupting volcano — so it suits busy, curious children who would rather do than watch.',
      'The look is earthy rather than bright: terracotta, olive and sand, with ferns and toy dinosaurs in party hats. Much of it is homemade, and the excavation pit is the one big job — fill a kiddie pool with play sand and bury the fossils the day before.',
    ],
    tips: [
      'Bury fossils at different depths so quick diggers keep finding things while slower ones still get their share.',
      'Freeze the dino ice eggs at least 24 hours ahead — they need longer than you think to set all the way through.',
      'Do the volcano last and outside on a tray; it is the finale, and the mess stays in one place.',
    ],
  },
  'rainbow-picnic': {
    short: 'Rainbow picnic',
    slug: 'rainbow-picnic-birthday',
    label: 'Rainbow picnic birthday party',
    title: 'Rainbow Picnic Birthday Party for Toddlers',
    description:
      'Rainbow picnic birthday ideas for first and second birthdays: bubbles, sensory bins, parachute play, toddler-friendly food and soft pastels — with costs.',
    intro: [
      'A rainbow picnic is made for the littlest guests — first, second and third birthdays — when the best party is a sunny blanket, soft toys, bubbles and grown-ups close by. Gingham blankets and low crates replace tables, so toddlers can sit, reach and wander.',
      'Activities need no instructions: a bubble machine, rainbow rice to scoop, a parachute to lift together. The food is cut small and easy to hold, and the cake comes with a little smash cake for a first birthday.',
    ],
    tips: [
      'Plan around nap time: a late-morning start usually means happier toddlers and calmer parents.',
      'Supervise sensory bins closely with children who still put things in their mouths, and keep the rice bins on a blanket for easy cleanup.',
      'Cut fruit and grapes into quarters lengthwise for under-fours; whole grapes are a choking hazard.',
    ],
  },
}

/** Fallback copy for a theme without hand-written SEO content. */
export function seoFor(theme, plan) {
  const own = THEME_SEO[theme.id]
  if (own) return own
  const label = `${theme.name} birthday party`
  return {
    slug: `${theme.id}-birthday`,
    short: theme.name,
    label,
    title: `${theme.name} Birthday Party Ideas`,
    description: `${theme.name} birthday party ideas: ${plan.games.slice(0, 3).map((g) => g.name.toLowerCase()).join(', ')} and more — with a palette, menu and costs.`,
    intro: [plan.intro],
    tips: [],
  }
}

/** URL path of a theme's public page. */
export const themePath = (theme) => `/themes/${THEME_SEO[theme.id]?.slug || `${theme.id}-birthday`}/`

/** The planning guide's URL. */
export const GUIDE_PATH = '/guides/how-to-plan-a-kids-birthday-party/'
