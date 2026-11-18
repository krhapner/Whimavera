// Fairy Garden activity guides. Keyed by activity id (slug of the name).
// Structure: see activityGuideSchema in lib/guides.js.
// Quantities: perChild (+ spare), perGroup (children per item) or fixed.

export default {
  'flower-crown-studio': {
    id: 'flower-crown-studio',
    ages: { min: 4, max: 10 },
    summary:
      'Every guest designs a flower crown to wear for the rest of the party. No glue and no exposed wire — just twist, tuck and tie onto a soft, ready-made base.',
    materials: [
      { name: 'Green chenille stems (pipe cleaners), 12 in', qty: { perChild: 3, spare: 6 }, unit: 'stem', note: 'Three twisted together make one sturdy base.' },
      { name: 'Faux flower stems or picks with plastic stems', qty: { perChild: 8 }, unit: 'bloom', note: 'Mix a few large blooms with smaller fillers.', substitute: 'Fresh daisies, clover and leaves from the garden, or felt flowers.' },
      { name: 'Faux greenery or leaf sprigs', qty: { perChild: 3 }, unit: 'sprig' },
      { name: 'Satin ribbon, ⅜ in wide, cut to 18 in', qty: { perChild: 2 }, unit: 'length', note: 'Pastels to match the palette.' },
      { name: 'Green floral tape', qty: { perGroup: 6 }, unit: 'roll', note: 'For wrapping joins and covering any cut ends.' },
      { name: 'Small baskets or bowls for sorting flowers', qty: { perGroup: 4 }, unit: 'basket', reusable: true },
      { name: 'Wire cutters (adult use only)', qty: { fixed: 1 }, unit: 'pair', reusable: true },
      { name: 'Clothespins for name tags', qty: { perChild: 1 }, unit: 'clothespin', optional: true, reusable: true },
      { name: 'Hand mirror', qty: { fixed: 1 }, unit: 'mirror', optional: true, reusable: true },
    ],
    prep: [
      'Make one crown base per child: twist two chenille stems together end to end, then spiral a third around them for strength. Size to about 20 in (51 cm) for ages 5–8, or 19 in (48 cm) for younger guests.',
      'Close each loop by twisting the ends together, then fold every cut tip back on itself twice and pinch flat so nothing pokes. Wrap the join in floral tape.',
      'Snip faux flower stems to 2–3 in (5–8 cm) with wire cutters. Fold any wire tip into a small hook and wrap it with floral tape — no bare wire should reach the table.',
      'Cut ribbon into 18-in lengths and tie two at the back of each base so they trail like streamers.',
      'Sort flowers by color into baskets and put greenery in its own basket.',
      'Make one finished crown as an example and display it on a cake stand or upturned bowl.',
      'Clip a name clothespin to each base so crowns don’t get mixed up.',
    ],
    setup: [
      { label: 'Table', text: 'One long table (or two folding tables pushed together) with about 2 ft of elbow room per child, seated on both sides.' },
      { label: 'Supplies', text: 'A crown base at every seat, flower baskets down the center within easy reach, and the floral tape and cutters kept with the adult helper.' },
      { label: 'Space', text: 'Roughly a 10 × 6 ft area for 12 children, plus a “finished crowns” spot nearby so creations don’t get crushed.' },
      { label: 'Supervision', text: 'One adult per 6 children. Adults handle floral tape for under-fives and check every crown before it goes on a head.' },
      { label: 'Mess', text: 'Lay a tablecloth or old sheet so stray petals and snips can be gathered up in one go.' },
    ],
    setupByLocation: {
      outdoor: 'Set up in the shade — faux blooms get warm in direct sun and little crafters wilt faster than the flowers.',
      indoor: 'A kitchen or dining table works well; keep a small bin at each end for stem trimmings.',
    },
    run: [
      { step: 'Gather everyone around the example crown.', say: 'Every fairy needs a crown! Pick five or six flowers you love — you can always add more.' },
      { step: 'Demonstrate the twist: hold a flower flat against the base and wrap its stem around twice, pointing the end along the crown, not toward your head.', say: 'Twist, twist, tuck!' },
      { step: 'Let them build. Circulate and help tuck stems so they lie flat along the base.' },
      { step: 'After about 10 minutes, offer extra ribbon for anyone who wants longer streamers.', say: 'Finishing touches, fairies — would you like more ribbon?' },
      { step: 'An adult checks each crown for poking ends, wraps tape where needed and adjusts the fit.' },
      { step: 'Crown each guest and send them to the photo nook.', say: 'By the magic of the fairy garden, I crown you… a garden fairy!' },
    ],
    tips: {
      younger: [
        'Pre-attach three flowers so ages 3–4 only add two or three more.',
        'Use only large blooms — no small flower heads, beads or loose pieces.',
      ],
      older: [
        'Let them weave ribbon in and out of the base before adding flowers.',
        'Challenge them to make a matching wrist corsage or a mini crown for a toy.',
      ],
      budget: [
        'Pull apart dollar-store bouquets — each gives about 10 flower heads.',
        'Use garden clippings, or fold tissue-paper flowers ahead of time.',
      ],
      sensory: [
        'Some children dislike things on their heads — offer a wrist cuff or flower wand instead.',
        'Choose smooth satin ribbon over scratchy tulle.',
      ],
      troubleshooting: [
        'Crown too big? Twist a small loop at the back to tighten it.',
        'Flowers spinning around? Wrap the stem with a little floral tape.',
        'Finished in three minutes? Make a second crown for a teddy or sibling.',
      ],
    },
    safety: [
      'No exposed wire: fold and tape every cut end, and keep wire cutters with an adult.',
      'For any child under three, skip small flower heads and loose decorations entirely.',
    ],
    cleanup: [
      'Gather leftover flowers into one basket — they’re perfect for next year.',
      'Wrap stem trimmings in tape before binning so no one gets poked.',
      'Shake the tablecloth outdoors and wipe the table.',
      'Store spare bases flat in a zip bag.',
    ],
  },

  'fairy-treasure-hunt': {
    id: 'fairy-treasure-hunt',
    ages: { min: 3, max: 10 },
    summary:
      'Teams of little fairies follow picture clues around the garden, collecting hidden fairy gems in their pouches until the last clue leads to the fairy queen’s treasure chest.',
    materials: [
      { name: 'Large acrylic “fairy gems” (at least 1¾ in / 4.5 cm)', qty: { perChild: 6, spare: 10 }, unit: 'gem', note: 'Larger than a choking-test size; count them before and after.', substitute: 'Smooth stones painted with metallic acrylic paint.' },
      { name: 'Drawstring organza or cotton pouches', qty: { perChild: 1 }, unit: 'pouch' },
      { name: 'Picture clue cards, in sheet protectors', qty: { perGroup: 4 }, unit: 'set of 6 cards', unitPlural: 'sets of 6 cards', note: 'One set per team; each card shows a photo or drawing of the next hiding spot.' },
      { name: 'Treasure box for the final clue', qty: { fixed: 1 }, unit: 'box', reusable: true },
      { name: 'Washi tape or sticky tack for clues', qty: { fixed: 1 }, unit: 'roll' },
      { name: 'A bell or chime to call teams back', qty: { fixed: 1 }, unit: 'bell', optional: true, reusable: true },
    ],
    prep: [
      'Walk the hunt area and set boundaries. Remove hazards and mark out-of-bounds areas (pond, gate, garage) with ribbon.',
      'Choose six hiding zones kids can reach — under a toadstool, by the birdbath, inside a flower pot — and photograph or sketch each one for the clue cards.',
      'Number the cards. Each zone holds gems plus the card for the next zone; card 1 is handed out at the start, and the last zone holds the treasure box.',
      'Divide the gems evenly between zones and write down how many are in each so you can tell when a zone is cleared.',
      'Put one gem in every pouch so nobody starts empty-handed.',
      'Fill the treasure box with something to share — wrapped treats, stickers or the favor-tree tags.',
    ],
    setup: [
      { label: 'Start', text: 'Gather everyone at the welcome arch so the hunt begins with a little ceremony.' },
      { label: 'Teams', text: 'Teams of 3–4 mixed ages, each with an adult or older child as guide.' },
      { label: 'Space', text: 'A backyard is ideal. Six zones spread so teams can move between them without crowding.' },
      { label: 'Supervision', text: 'An adult stationed at any water feature, gate or road edge. Count heads at the start and finish.' },
      { label: 'Mess', text: 'Keep a tally of gems hidden so none are left for the lawnmower.' },
    ],
    setupByLocation: {
      indoor: 'Use two or three rooms with two zones each; keep bedrooms and stairs off-limits.',
      outdoor: 'Hide gems at child height and in plain sight for younger hunters — under leaves is plenty tricky.',
    },
    run: [
      { step: 'Gather everyone and set the scene.', say: 'The garden fairies hid their gems all over the garden — and only the bravest fairies can find them!' },
      { step: 'Explain the rules: walk near tables and flower beds, stay inside the ribbons, and stop at five gems.', say: 'When you have five gems, you become a helper fairy and help your team find the rest.' },
      { step: 'Hand each team its first clue card and send them off.' },
      { step: 'At each zone, teams collect gems and find the next clue taped there.' },
      { step: 'The final clue leads everyone to the treasure chest — wait until all teams arrive before opening it.', say: 'One, two, three… open the fairy treasure!' },
      { step: 'Count gems together and even them out so everyone goes home with the same number.' },
    ],
    tips: {
      younger: [
        'Skip the clues — simply say “find the pink gems!” with gems in plain sight.',
        'Pair each little one with a grown-up buddy who holds their hand.',
      ],
      older: [
        'Swap picture cards for rhyming riddles or a hand-drawn map with compass directions.',
        'Add a timer, or a secret word spelled out by letters hidden at each zone.',
      ],
      budget: ['Paint river rocks instead of buying gems.', 'Use paper lunch bags stamped with stars as pouches.'],
      sensory: [
        'Let a child who finds the rush overwhelming be the “gem keeper” who guards the treasure box.',
        'Ring a soft chime rather than shouting to call teams back.',
      ],
      troubleshooting: [
        'Keep a duplicate set of clue cards in your pocket in case one goes missing.',
        'Uneven finds? The helper-fairy rule and an even share at the end fix it.',
        'Rain? Move indoors with half the zones and twice the gems per zone.',
      ],
    },
    safety: [
      'Use gems at least 1¾ in (4.5 cm) across; for children under three, use larger painted stones or skip loose gems.',
      'Supervise closely near ponds, pools and gates, and check hiding spots for anthills or bees.',
    ],
    cleanup: [
      'Count gems against your tally and do one last sweep of the yard.',
      'Collect clue cards in their sleeves — they can be reused.',
      'Return borrowed baskets and toadstools to their spots.',
    ],
  },

  'toadstool-cupcake-bar': {
    id: 'toadstool-cupcake-bar',
    ages: { min: 3, max: 10 },
    summary:
      'Each guest turns a plain cupcake into a spotted toadstool with red or pink frosting and white “dots” — then saves it for the fairy feast.',
    materials: [
      { name: 'Plain vanilla cupcakes, completely cooled', qty: { perChild: 1, spare: 4 }, unit: 'cupcake', note: 'Bake the day before.' },
      { name: 'Buttercream tinted red and pink', qty: { perChild: 2 }, unit: 'tablespoon', note: 'About 1½ cups for 12 children.', substitute: 'Beet powder for natural pink if avoiding artificial dyes.' },
      { name: 'White chocolate chips or mini marshmallows for spots', qty: { perChild: 10 }, unit: 'spot', note: 'Choose a brand labelled free of the allergens your guests avoid.' },
      { name: 'Wooden craft sticks or plastic butter knives for spreading', qty: { perChild: 1 }, unit: 'stick' },
      { name: 'Small cups for frosting and toppings', qty: { perGroup: 2 }, unit: 'cup', note: 'One set shared between two children.' },
      { name: 'Paper plates, labelled with names', qty: { perChild: 1 }, unit: 'plate' },
      { name: 'Wet wipes and a hand-washing station', qty: { fixed: 1 }, unit: 'set' },
      { name: 'Aprons or old t-shirts', qty: { perChild: 1 }, unit: 'apron', optional: true, reusable: true },
      { name: 'Piping bags for older decorators', qty: { perGroup: 2 }, unit: 'bag', optional: true },
    ],
    prep: [
      'Ask about allergies on the RSVP (nuts, dairy, egg, gluten, food dyes) and check every ingredient label, including sprinkles and candy.',
      'Bake cupcakes the day before and let them cool completely so frosting doesn’t melt.',
      'Make allergy-friendly cupcakes separately, with their own frosting and toppings, labelled and plated first.',
      'Tint the frosting and portion it into small cups, about half full — one cup per pair of children.',
      'Portion spots into separate cups so little hands aren’t all in one bowl.',
      'Decorate one example toadstool and put a name plate at every seat.',
    ],
    setup: [
      { label: 'Table', text: 'A wipeable tablecloth with a plate, cupcake and spreading stick at every seat.' },
      { label: 'Supplies', text: 'Frosting and spot cups shared between neighbours; extra frosting kept with an adult.' },
      { label: 'Space', text: 'The feast table works well — decorate, then leave cupcakes in place for the feast.' },
      { label: 'Supervision', text: 'One adult per 6 children, plus one adult watching the allergy-safe seats.' },
      { label: 'Mess', text: 'Wipes at both ends of the table; aprons for anyone in their party best.' },
    ],
    setupByLocation: {
      outdoor: 'Keep frosting in a cooler until the moment you start — buttercream slumps in warm sun.',
      indoor: 'Lay a sheet under the table if it’s on carpet.',
    },
    run: [
      { step: 'Everyone washes hands and finds their name.', say: 'Every fairy village needs toadstools — let’s build ours!' },
      { step: 'Spread a dome of red or pink frosting over the top of the cupcake.' },
      { step: 'Add white spots.', say: 'Toadstools have spots — how many will yours have?' },
      { step: 'Older children can pipe a frosting ring around the edge or add a second color.' },
      { step: 'Gather the cupcakes onto a cake stand as a “fairy village” until feast time, with name plates beside them.' },
    ],
    tips: {
      younger: ['Pre-frost the cupcakes so toddlers only add spots.', 'Use whipped-cream dots instead of chips or marshmallows for very small children.'],
      older: ['Give them piping bags and let them design two-tone caps.', 'Add a marshmallow “stem” on top for a 3-D toadstool.'],
      budget: ['A boxed cake mix and homemade buttercream cost far less than bakery cupcakes.'],
      sensory: ['Offer a spoon or glove to children who dislike sticky fingers.', 'Have a plain, dye-free option for children who avoid colors or textures.'],
      troubleshooting: [
        'Frosting too stiff to spread? Stir in a teaspoon of milk.',
        'Child doesn’t want to eat theirs? Box it up to take home.',
      ],
    },
    safety: [
      'Confirm allergies in advance; check labels on every topping and keep allergy-safe cupcakes completely separate.',
      'Use only toppings labelled edible — “non-toxic” glitter or dust is not the same as food-safe.',
      'Chips and mini marshmallows are choking hazards for children under three; use soft frosting dots instead.',
    ],
    cleanup: [
      'Wipe the table and sticks; compost paper plates and liners.',
      'Box leftover cupcakes for families to take home.',
      'Wash piping tips and frosting cups in hot, soapy water.',
    ],
  },

  'fairy-potion-lab': {
    id: 'fairy-potion-lab',
    ages: { min: 4, max: 10 },
    summary:
      'Little fairy scientists add “lemon drops” to a cool blue tea and watch it turn purple and pink — a real color-changing reaction with food-safe ingredients.',
    materials: [
      { name: 'Dried butterfly-pea flowers (food grade)', qty: { fixed: 1 }, unit: 'small bag', unitPlural: 'small bags', note: 'About 1 tbsp per 2 cups of water.' },
      { name: 'Brewed, fully cooled butterfly-pea tea', qty: { perChild: 0.5, spare: 2 }, unit: 'cup', note: 'About half a cup per child, plus extra.' },
      { name: 'Lemon juice in squeeze bottles', qty: { perChild: 2 }, unit: 'tablespoon', note: 'Label the bottles “Fairy Lemon Drops”.', substitute: 'Plain lemonade works too.' },
      { name: 'Clear shatterproof plastic cups, 9 oz', qty: { perChild: 1, spare: 4 }, unit: 'cup' },
      { name: 'Plastic droppers or small spoons', qty: { perChild: 1 }, unit: 'dropper', reusable: true },
      { name: 'Trays to stand cups on', qty: { perGroup: 4 }, unit: 'tray', reusable: true },
      { name: 'Potion labels and a marker', qty: { perChild: 1 }, unit: 'label', optional: true },
      { name: 'Honey or simple syrup to sweeten', qty: { fixed: 1 }, unit: 'jar', optional: true, note: 'No honey for children under one.' },
    ],
    prep: [
      'The day before, steep 2 tbsp dried flowers in 4 cups of just-boiled water for 10 minutes. Strain, then refrigerate. Repeat for the quantity you need.',
      'Taste it: the flavour is mild and earthy. Sweeten lightly if you like.',
      'Use filtered water if your tap water already turns the tea purple — the color change works best from a deep blue.',
      'Squeeze lemon juice into squeeze bottles and label them.',
      'Just before the activity, pour the blue tea into each cup, about half full.',
      'Make one demo cup so you know exactly how many drops create the change.',
      'Check with parents about any sensitivities to citrus or herbal teas, and plan a water-and-food-coloring version for anyone who should skip it.',
    ],
    setup: [
      { label: 'Table', text: 'A low table with trays under the cups to catch drips.' },
      { label: 'Supplies', text: 'One blue cup, one dropper and a label at each place; lemon bottles shared between two children.' },
      { label: 'Space', text: 'Small — a single table for 12 is enough. Good light makes the color change sing.' },
      { label: 'Supervision', text: 'One adult per 6 children. All liquids cooled; nothing hot anywhere near the table.' },
      { label: 'Mess', text: 'Butterfly-pea can stain light fabric — wipe spills quickly and keep paper towels handy.' },
    ],
    setupByLocation: {
      outdoor: 'Set up in bright shade; full sun warms the tea quickly.',
      indoor: 'A kitchen counter near a window shows off the color change beautifully.',
    },
    run: [
      { step: 'Show everyone the blue potion.', say: 'This blue potion comes from the butterfly-pea flower. Watch what happens when we add a little lemon magic…' },
      { step: 'Add a few drops to your demo cup so they see it turn purple.' },
      { step: 'Each fairy squeezes in their lemon drops, a few at a time.', say: 'Slowly! Watch the color — do you see purple? Pink?' },
      { step: 'Explain the science simply.', say: 'Lemon is an acid. Acids make this flower’s color change — it looks like magic, but it’s science!' },
      { step: 'Name your potion and write it on a label.' },
      { step: 'Raise cups for a toast to the birthday child. Sipping is optional — no one has to drink.' },
    ],
    tips: {
      younger: ['An adult holds the cup steady while the child squeezes.', 'Use a spoon instead of a dropper for little hands.'],
      older: [
        'Try a pinch of baking soda in a separate, clearly labelled “not for drinking” cup — it shifts toward green.',
        'Have them predict and record each color in a little “potion journal”.',
      ],
      budget: ['One small bag of dried flowers makes enough for a whole party.'],
      sensory: ['The taste is unusual — never pressure anyone to drink.', 'Offer cups with lids and straws to children who dislike spills.'],
      troubleshooting: [
        'Color too pale? Steep the tea longer or use more flowers.',
        'Tea already purple? Your water is acidic — use filtered water.',
      ],
    },
    safety: [
      'Use only food-grade, caffeine-free butterfly-pea flowers and fully cooled liquids.',
      'Check with parents about ingredient sensitivities; offer a water-and-food-coloring alternative.',
      'Keep any non-drinkable experiments in separate, clearly labelled cups.',
      'Shatterproof plastic cups only — no glass.',
    ],
    cleanup: [
      'Pour leftovers down the sink and rinse cups and droppers.',
      'Wipe any blue drips right away to avoid stains.',
      'Wash droppers to reuse for the next party.',
    ],
  },

  'freeze-fairy': {
    id: 'freeze-fairy',
    ages: { min: 2, max: 10 },
    summary:
      'Flutter while the music plays, then freeze in a fairy pose when it stops. No one is ever out — a quick burst of giggles between calmer activities.',
    materials: [
      { name: 'Bluetooth speaker or phone', qty: { fixed: 1 }, unit: 'speaker', reusable: true },
      { name: 'Playlist of 6–8 upbeat songs', qty: { fixed: 1 }, unit: 'playlist', reusable: true },
      { name: 'Silky play scarves or the party wings', qty: { perChild: 1 }, unit: 'scarf', optional: true, reusable: true },
      { name: 'A wand for the “Fairy Queen” host', qty: { fixed: 1 }, unit: 'wand', optional: true, reusable: true },
    ],
    prep: [
      'Build a playlist that mixes fast and slow songs, and test the speaker volume outside.',
      'Write a short list of pose prompts on a card (see “How to run it”).',
      'Clear the dance area of toys, garden tools and trip hazards.',
    ],
    setup: [
      { label: 'Space', text: 'About 3 ft (1 m) of space around each child — a 12 × 12 ft patch of lawn for 12 guests.' },
      { label: 'Layout', text: 'Away from the feast and craft tables, with the speaker at one edge.' },
      { label: 'Supervision', text: 'One adult controls the music; another watches for collisions.' },
    ],
    setupByLocation: {
      indoor: 'Push furniture to the walls and play on a rug or carpet — not in socks on a hard floor.',
      outdoor: 'Choose flat, soft grass and check it for holes.',
    },
    run: [
      { step: 'Gather everyone in the dance space.', say: 'When the music plays, flutter like fairies. When it stops, freeze like statues — I’m looking for wobbly wings!' },
      { step: 'Play 10–20 seconds, then stop the music and call a pose.', say: 'Freeze like… a sleeping fairy! A flower in the wind! A fairy holding a giant acorn!' },
      { step: 'Anyone who wobbles becomes a “wind fairy” for one round, helping spot movement, then rejoins.' },
      { step: 'Vary the music speed to keep it surprising.' },
      { step: 'Finish with a slow song and a final pose: sitting down.', say: 'Last freeze: fairies, float down to the ground and sit as still as a flower.' },
    ],
    tips: {
      younger: ['Keep rounds very short and demonstrate each pose yourself.', 'Toddlers can freeze while holding a grown-up’s hand.'],
      older: ['Use tricky poses or “opposite” commands (freeze when the music plays!).', 'Let a guest take a turn as DJ.'],
      budget: ['No supplies needed beyond a phone.'],
      sensory: [
        'Keep the volume moderate; offer a quieter spot nearby.',
        'For noise-sensitive guests, raise the wand as a visual “freeze” signal.',
        'Anyone can be the DJ or pose-caller instead of dancing.',
      ],
      troubleshooting: ['Collisions? Shrink the area with a ribbon boundary.', 'Arguments about who moved? Use the wind-fairy rule — nobody is out.'],
    },
    safety: ['Clear trip hazards and keep dancing away from tables and steps.'],
    cleanup: ['Collect scarves and wands into one basket.', 'Put the speaker away to charge for later.'],
  },

  'bug-bloom-safari': {
    id: 'bug-bloom-safari',
    ages: { min: 3, max: 10 },
    summary:
      'Explorers search the garden with magnifying glasses and a picture checklist — a ladybug, a feather, something purple, a heart-shaped leaf — learning to look closely without picking or disturbing.',
    materials: [
      { name: 'Shatterproof acrylic magnifying glasses', qty: { perGroup: 2 }, unit: 'magnifier', note: 'One per pair of explorers.', reusable: true, substitute: 'Paper-towel tubes as “fairy spyglasses”.' },
      { name: 'Picture checklist cards (8 items)', qty: { perChild: 1 }, unit: 'card', note: 'Pictures, not words, so non-readers can play.' },
      { name: 'Crayons or pencils', qty: { perChild: 1 }, unit: 'crayon' },
      { name: 'Clipboards', qty: { perChild: 1 }, unit: 'clipboard', optional: true, reusable: true },
      { name: 'Small paper bags for fallen treasures', qty: { perChild: 1 }, unit: 'bag', optional: true },
    ],
    prep: [
      'Walk the yard first and choose eight things you know are there: a feather, a smooth stone, something purple, a heart-shaped leaf, a clover, a flower with five petals, something fuzzy, an ant (look, don’t touch).',
      'Draw or print a picture checklist with a tick box beside each item.',
      'Check for bees’ nests, stinging plants and anything you don’t want little hands near. Remove any wild mushrooms.',
      'Mark the explore area with ribbon, and “plant” a few fallen feathers or petals if your garden is sparse.',
      'Ask parents ahead about bee or wasp sting allergies and know where any medication is kept.',
    ],
    setup: [
      { label: 'Start', text: 'Under a shady tree, with checklists and magnifiers in a basket.' },
      { label: 'Teams', text: 'Explorers work in pairs so each pair shares one magnifier.' },
      { label: 'Space', text: 'The whole garden inside the ribbon boundary.' },
      { label: 'Supervision', text: 'One adult per 6 children, with one adult at the boundary nearest any road, pond or gate.' },
    ],
    setupByLocation: {
      indoor: 'No garden? Hide picture cards of bugs and blooms around the room and search with magnifiers.',
      outdoor: 'Go in shade where possible and have water bottles ready.',
    },
    run: [
      { step: 'Gather the explorers.', say: 'The garden fairies want to know who else lives in their garden. Will you help them find out?' },
      { step: 'Show the checklist and how to use a magnifier: hold it close to your eye, then move toward the thing you’re looking at.' },
      { step: 'Explain the explorer rules.', say: 'Living things stay where they are. We only look at bugs — no touching — and we only collect things that have already fallen.' },
      { step: 'Explore for about 10 minutes, ticking off finds.' },
      { step: 'Regroup and share.', say: 'What was the smallest thing you found? What surprised you?' },
    ],
    tips: {
      younger: ['Cut the checklist to four easy items.', 'Pair each little explorer with a grown-up buddy.'],
      older: ['Add a tally (how many ants?) and space to draw one discovery.', 'Include bonus hard finds: a spider web, a seed pod, a bird’s feather with stripes.'],
      budget: ['Skip magnifiers and make paper “spyglasses” — the looking is the fun.'],
      sensory: [
        'Some children dislike bugs — give them the “bloom spotter” job (flowers and leaves only).',
        'Let a child who prefers to watch be the checklist keeper.',
      ],
      troubleshooting: [
        'Bad weather? Use the indoor picture-card version.',
        'Nothing to find? Scatter a few fallen petals, feathers and pebbles before the party.',
      ],
    },
    safety: [
      'Wild mushrooms may be toxic: teach “look, never touch or taste” and remove any you find before the party.',
      'Know of any sting allergies and keep medication accessible.',
      'Everyone washes hands afterward.',
    ],
    cleanup: [
      'Collect magnifiers and clipboards.',
      'Return natural finds to the garden.',
      'Wash hands before the feast.',
    ],
  },

  'wish-jars': {
    id: 'wish-jars',
    ages: { min: 4, max: 10 },
    summary:
      'Guests spoon layers of colored sand into a little jar, then add a written or drawn wish for the birthday child — a keepsake from every friend.',
    materials: [
      { name: 'Clear PET plastic jars with screw lids, 4–8 oz', qty: { perChild: 1, spare: 2 }, unit: 'jar', note: 'Shatterproof — no glass.' },
      { name: 'Colored craft sand in 4–5 colors', qty: { perChild: 0.5 }, unit: 'cup' },
      { name: 'Small funnels or paper cones', qty: { perGroup: 2 }, unit: 'funnel', reusable: true },
      { name: 'Spoons for each sand color', qty: { fixed: 5 }, unit: 'spoon', reusable: true },
      { name: 'Large paper confetti shapes', qty: { fixed: 1 }, unit: 'small bag', unitPlural: 'small bags', optional: true, note: 'Bigger shapes, not fine glitter.' },
      { name: 'Paper wish scrolls and pens', qty: { perChild: 1 }, unit: 'scroll' },
      { name: 'Ribbon to tie scrolls, cut to 8 in', qty: { perChild: 1 }, unit: 'piece' },
      { name: 'Baking trays to catch spills', qty: { perGroup: 2 }, unit: 'tray', reusable: true },
      { name: 'Strong glue for lids (adult use)', qty: { fixed: 1 }, unit: 'tube' },
    ],
    prep: [
      'Pour each sand color into its own bowl with a spoon.',
      'Cut wish scrolls (about 3 × 5 in) and write a starter on each: “My wish for ___ is…”.',
      'Cut ribbon lengths for tying scrolls.',
      'Make one example jar with three or four layers.',
      'Decide in advance whether jars go home with each guest or are gifted to the birthday child.',
    ],
    setup: [
      { label: 'Table', text: 'Seats on both sides with a tray at every place; sand bowls down the middle.' },
      { label: 'Supplies', text: 'Funnels shared between two; pens and scrolls at each seat; glue stays with the adult.' },
      { label: 'Space', text: 'A table that can be vacuumed or swept — avoid carpet if possible.' },
      { label: 'Supervision', text: 'One adult per 6 children, and an adult seals every lid.' },
      { label: 'Mess', text: 'Work over trays and fill jars only three-quarters full so lids close cleanly.' },
    ],
    setupByLocation: {
      outdoor: 'Choose a still spot — sand and confetti travel on a breeze.',
      indoor: 'Lay a sheet under the table to catch stray sand.',
    },
    run: [
      { step: 'Introduce the jars.', say: 'Fairies keep their wishes safe in little jars. Let’s each make one for the birthday fairy.' },
      { step: 'Spoon in sand through the funnel, one color at a time. Tilt the jar for wavy layers.' },
      { step: 'Add a pinch of confetti if you like.' },
      { step: 'Write or draw a wish, roll the scroll and tie it with ribbon.', say: 'Wishes can be words or pictures — anything kind.' },
      { step: 'An adult glues the lid on and ties the scroll around the neck of the jar.' },
      { step: 'Hold a little wish ceremony: each guest gives their jar to the birthday child, or keeps it as a favor.' },
    ],
    tips: {
      younger: ['Use two colors and a wide funnel; an adult steadies the jar.', 'Children can dictate their wish for a grown-up to write.'],
      older: ['Push a skewer down the side to make patterns.', 'Decorate a label for the lid.'],
      budget: ['Color table salt with chalk, or dye rice with food coloring.'],
      sensory: ['Children who dislike the texture can use spoons only.', 'Offer a quiet corner of the table away from the bustle.'],
      troubleshooting: ['Colors mixing? Pour slowly and don’t shake the jar.', 'Spill? Funnel the sand from the tray back into its bowl.'],
    },
    safety: [
      'Sand and confetti are choking and inhalation hazards for children under three — skip this activity for them or give a pre-made, sealed jar.',
      'Use plastic jars only, and have an adult seal every lid.',
    ],
    cleanup: [
      'Funnel leftover sand back into bags by color.',
      'Vacuum or sweep around the table.',
      'Wipe trays and funnels.',
    ],
  },

  'musical-toadstools': {
    id: 'musical-toadstools',
    ages: { min: 3, max: 8 },
    summary:
      'A gentle, cooperative musical chairs: tiptoe around toadstool mats, and when the music stops everyone must share a toadstool. Nobody is ever out.',
    materials: [
      { name: 'Non-slip round mats, about 14 in (35 cm)', qty: { perChild: 1 }, unit: 'mat', note: 'Rubber-backed bath or doormats work well.', reusable: true },
      { name: 'Red felt circles with white felt dots, glued to each mat', qty: { perChild: 1 }, unit: 'cap', substitute: 'Paint the mats directly with fabric paint.' },
      { name: 'Rug gripper or non-slip shelf liner', qty: { fixed: 1 }, unit: 'roll', optional: true, note: 'Only needed if your mats slide.' },
      { name: 'Speaker and playlist', qty: { fixed: 1 }, unit: 'speaker', reusable: true },
    ],
    prep: [
      'Glue felt toadstool tops to non-slip mats and let them dry overnight. Avoid paper or loose felt — it slides underfoot.',
      'Test every mat on the surface you’ll play on; step on it and twist. Add rug gripper underneath if it moves.',
      'Choose a playlist and decide who controls the music.',
    ],
    setup: [
      { label: 'Layout', text: 'Mats in a large circle about 3 ft apart, on flat lawn or a rug.' },
      { label: 'Space', text: 'Clear at least 3 ft around the circle — roughly 15 × 15 ft for 12 children.' },
      { label: 'Supervision', text: 'One adult on music, one inside the circle to keep it gentle.' },
    ],
    setupByLocation: {
      indoor: 'Play on carpet or a large rug, never on a hard floor in socks; bare feet or shoes are safest.',
      outdoor: 'Pick a flat, level patch of grass free of holes and sprinklers.',
    },
    run: [
      { step: 'Explain the game.', say: 'When the music plays, tiptoe around the toadstools. When it stops, find a toadstool — and every fairy must be on one, even if we share!' },
      { step: 'Play, then stop the music. Everyone finds a toadstool.' },
      { step: 'Remove one toadstool each round. Children share, holding hands to balance.' },
      { step: 'Walking only — call “tiptoe, fairies!” if anyone starts to run.' },
      { step: 'Finish when the whole group squeezes onto the last few toadstools together.', say: 'Look at that — the whole fairy village fits on three toadstools!' },
    ],
    tips: {
      younger: ['Don’t remove any mats — just find a toadstool when the music stops.', 'Hold hands with a grown-up partner.'],
      older: ['Add a movement for each round: skip, hop, flutter.', 'Freeze in a pose once you’re on a toadstool.'],
      budget: ['On grass, colorful towels or hula hoops make good toadstools (not on hard floors).'],
      sensory: ['Squeezing together can feel crowded — offer the job of “music keeper”.', 'Lower the volume and use a slower song.'],
      troubleshooting: ['Pushing? Keep one fairy per mat until the final round.', 'Mats sliding? Move to grass or add rug gripper.'],
    },
    safety: [
      'Use secure, non-slip mats only — test them first.',
      'Walking, not running; keep mats well spaced and away from tables and steps.',
    ],
    cleanup: ['Stack mats flat to store for next time.', 'Put the speaker away.'],
  },

  'fairy-storytime': {
    id: 'fairy-storytime',
    ages: { min: 2, max: 10 },
    summary: 'A short fairy tale read aloud on blankets — a calm landing that settles everyone before cake.',
    materials: [
      { name: 'A fairy or garden picture book (5–8 minutes to read)', qty: { fixed: 1 }, unit: 'book', reusable: true },
      { name: 'Blankets or floor cushions', qty: { perGroup: 3 }, unit: 'blanket', reusable: true },
      { name: 'A battery lantern or fairy lights for atmosphere', qty: { fixed: 1 }, unit: 'lantern', optional: true, reusable: true },
    ],
    prep: [
      'Choose a book that takes 5–8 minutes to read and practise it once aloud.',
      'Pick two or three questions to ask along the way.',
    ],
    setup: [
      { label: 'Space', text: 'Blankets in a semicircle in the shade or the photo nook, with the reader facing the group.' },
      { label: 'Supervision', text: 'One reader; one adult sitting among the children.' },
    ],
    setupByLocation: { indoor: 'Dim the lights a little and use the lantern.', outdoor: 'Sit with the sun behind the children, not in their eyes.' },
    run: [
      { step: 'Invite everyone to sit.', say: 'Fairies, float to the blankets — it’s story time in the garden.' },
      { step: 'Read slowly, showing every page.' },
      { step: 'Pause for a question or two.', say: 'What do you think the little fairy will do next?' },
      { step: 'Close the book and lead everyone to the cake.', say: 'And now… the birthday fairy has a wish to make!' },
    ],
    tips: {
      younger: ['Choose a board book with big pictures and few words.'],
      older: ['Let a confident reader read a page.'],
      budget: ['Borrow from the library.'],
      sensory: ['Let wigglers hold a soft toy or sit at the edge.'],
      troubleshooting: ['Losing attention? Skip ahead to the ending — short is sweet.'],
    },
    safety: [],
    cleanup: ['Fold blankets and return the book.'],
  },
}
