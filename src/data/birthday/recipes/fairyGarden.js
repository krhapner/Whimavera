// Fairy Garden menu recipes, keyed by menu item id.
// Units: volumes in tsp/tbsp/cup, weights in oz/lb, everything else as a
// count noun. The same `key` must use the same dimension in every recipe so
// the shopping list can add them together. `noShop` keeps tap water etc. off
// the list.

const FOOD_SAFETY_2H =
  'Keep perishable food out of the fridge for no more than 2 hours in total — 1 hour if it’s above 90°F (32°C). Serve cold dishes in small batches and top up from the fridge or a cooler.'

export default {
  'toadstool-cupcakes': {
    id: 'toadstool-cupcakes',
    summary:
      'Fluffy vanilla cupcakes with a dome of red or pink buttercream and white “spots”. These are the cupcakes guests decorate at the Toadstool Cupcake Bar — bake and frost-ready ahead, then let little hands add the spots.',
    yield: { servings: 24, label: '24 cupcakes', perGuest: 1.25, step: 12, servingLabel: 'cupcake' },
    prepTime: '30 min',
    totalTime: '2 hr with cooling',
    ingredients: [
      { key: 'all-purpose-flour', name: 'All-purpose flour', qty: 2.5, unit: 'cup', aisle: 'Baking', group: 'Cupcakes' },
      { key: 'baking-powder', name: 'Baking powder', qty: 2.5, unit: 'tsp', aisle: 'Baking', group: 'Cupcakes' },
      { key: 'fine-salt', name: 'Fine salt', qty: 0.5, unit: 'tsp', aisle: 'Pantry', group: 'Cupcakes' },
      { key: 'unsalted-butter', name: 'Unsalted butter, softened', qty: 2, unit: 'stick', shopUnit: 'stick', aisle: 'Dairy & eggs', group: 'Cupcakes' },
      { key: 'granulated-sugar', name: 'Granulated sugar', qty: 1.5, unit: 'cup', aisle: 'Baking', group: 'Cupcakes' },
      { key: 'large-eggs', name: 'Large eggs, room temperature', qty: 4, unit: 'egg', aisle: 'Dairy & eggs', group: 'Cupcakes' },
      { key: 'vanilla-extract', name: 'Pure vanilla extract', qty: 2, unit: 'tsp', aisle: 'Baking', group: 'Cupcakes' },
      { key: 'whole-milk', name: 'Whole milk, room temperature', qty: 1, unit: 'cup', aisle: 'Dairy & eggs', group: 'Cupcakes' },
      { key: 'unsalted-butter', name: 'Unsalted butter, softened', qty: 2, unit: 'stick', shopUnit: 'stick', aisle: 'Dairy & eggs', group: 'Toadstool frosting' },
      { key: 'powdered-sugar', name: 'Powdered sugar', qty: 4, unit: 'cup', aisle: 'Baking', group: 'Toadstool frosting' },
      { key: 'whole-milk', name: 'Whole milk', qty: 3, unit: 'tbsp', aisle: 'Dairy & eggs', group: 'Toadstool frosting' },
      { key: 'vanilla-extract', name: 'Pure vanilla extract', qty: 1, unit: 'tsp', aisle: 'Baking', group: 'Toadstool frosting' },
      { key: 'gel-food-coloring', name: 'Red and pink gel food coloring', qty: 1, unit: 'set', aisle: 'Baking', group: 'Toadstool frosting', note: 'Or beet powder for a natural pink.' },
      { key: 'white-chocolate-chips', name: 'White chocolate chips or mini marshmallows, for spots', qty: 1, unit: 'cup', aisle: 'Baking', group: 'Toadstool frosting' },
    ],
    equipment: ['Two 12-cup muffin tins', 'Paper liners', 'Stand or hand mixer', 'Cooling rack'],
    steps: [
      'Heat the oven to 350°F (175°C) and line two muffin tins with paper liners.',
      'Whisk the flour, baking powder and salt in a bowl.',
      'Beat the cupcake butter and sugar until pale and fluffy, about 3 minutes. Beat in the eggs one at a time, then the vanilla.',
      'On low speed, add the flour mixture in three parts, alternating with the milk, mixing just until combined.',
      'Fill liners two-thirds full and bake 18–20 minutes, until a toothpick comes out clean. Cool in the tin 5 minutes, then completely on a rack.',
      'For the frosting, beat the butter until creamy, then add the powdered sugar a cup at a time. Beat in the milk and vanilla until smooth.',
      'Divide the frosting and tint half red and half pink with a little gel color at a time.',
      'Spread a domed cap of frosting over each cooled cupcake (or leave them bare for guests to frost at the cupcake bar), then add white spots.',
    ],
    makeAhead: [
      'Bake the cupcakes the day before and store them unfrosted in an airtight container at room temperature.',
      'Make the buttercream up to 1 week ahead and refrigerate; bring to room temperature and re-whip before using.',
    ],
    storage: [
      'Frosted cupcakes keep 2 days in an airtight container in a cool room. Refrigerate if your kitchen is warm, and bring back to room temperature before serving.',
    ],
    presentation: [
      'Arrange finished toadstools on a cake stand with a little moss around the base — a “fairy village”.',
      'Mix red and pink caps, and vary the spot sizes for a handmade look.',
    ],
    allergens: ['Wheat (gluten)', 'Milk', 'Egg', 'Soy — often in white chocolate chips; check the label'],
    substitutions: [
      'Gluten-free: use a 1:1 gluten-free baking flour that contains xanthan gum.',
      'Dairy-free: plant butter sticks and unsweetened oat milk; use dairy-free white chips or marshmallows.',
      'Egg-free: buy a certified egg-free cupcake mix rather than improvising — texture suffers with home swaps.',
      'Dye-free: color the frosting with beet or freeze-dried strawberry powder.',
    ],
    safety: [
      'Chocolate chips and mini marshmallows are choking hazards for children under three — use piped frosting dots instead.',
      'Check every sprinkle and topping label for allergens and “may contain” warnings; only use decorations labelled edible.',
      'Buttercream softens above about 75°F (24°C); keep cupcakes in the shade or indoors until serving.',
    ],
  },

  'fairy-treats': {
    id: 'fairy-treats',
    summary:
      'Classic crispy rice and marshmallow treats, cut into stars and finished with pastel pink, lavender and white candy drizzle, sprinkles and a little edible sparkle. No baking, and easy to make the day before.',
    yield: { servings: 12, label: '12 stars (one 9 × 13-in pan)', perGuest: 1, step: 12, servingLabel: 'star' },
    prepTime: '30 min',
    totalTime: '1 hr 30 min with setting',
    ingredients: [
      { key: 'unsalted-butter', name: 'Unsalted butter', qty: 3, unit: 'tbsp', shopUnit: 'stick', aisle: 'Dairy & eggs', group: 'Treats', note: 'Plus a little for greasing.' },
      { key: 'mini-marshmallows', name: 'Mini marshmallows', qty: 10, unit: 'oz', aisle: 'Baking', group: 'Treats', note: 'One 10-oz bag, about 6 cups.' },
      { key: 'vanilla-extract', name: 'Pure vanilla extract', qty: 0.5, unit: 'tsp', aisle: 'Baking', group: 'Treats', optional: true },
      { key: 'crisped-rice-cereal', name: 'Crisped rice cereal (such as Rice Krispies)', qty: 6, unit: 'cup', aisle: 'Pantry', group: 'Treats' },
      { key: 'candy-melts-pink', name: 'Pink candy melts', qty: 2, unit: 'oz', aisle: 'Baking', group: 'Pastel drizzle', note: 'About ⅓ cup.' },
      { key: 'candy-melts-lavender', name: 'Lavender candy melts', qty: 2, unit: 'oz', aisle: 'Baking', group: 'Pastel drizzle' },
      { key: 'candy-melts-white', name: 'White candy melts', qty: 2, unit: 'oz', aisle: 'Baking', group: 'Pastel drizzle' },
      { key: 'pastel-sprinkles', name: 'Pastel sprinkles', qty: 2, unit: 'tbsp', aisle: 'Baking', group: 'Pastel drizzle' },
      { key: 'edible-glitter', name: 'Edible glitter (labelled “edible”)', qty: 0.25, unit: 'tsp', aisle: 'Baking', group: 'Pastel drizzle', optional: true },
    ],
    equipment: [
      '9 × 13-in pan, greased or lined with parchment',
      'Large pot and a greased silicone spatula',
      '3-in star cookie cutter',
      '3 small zip-top bags (for drizzling)',
      'Parchment paper',
    ],
    steps: [
      'Grease a 9 × 13-in pan (or line it with parchment, leaving an overhang to lift the slab out).',
      'Melt the butter in a large pot over low heat. Add the marshmallows and stir until completely melted and smooth. Keep the heat low so the marshmallows stay soft.',
      'Take the pot off the heat and stir in the vanilla. Add the cereal and fold gently until every piece is coated.',
      'Tip into the pan and press it into an even layer with a greased spatula or a piece of parchment. Press lightly — packing it hard makes chewy, tough treats.',
      'Let it set at room temperature for 30–45 minutes.',
      'Lift out the slab and cut stars with a greased 3-in cutter, pressing straight down. Squeeze the scraps together and cut more stars, or roll them into “fairy bites”.',
      'Put each color of candy melts in its own zip-top bag. Microwave in 20-second bursts, kneading between each, until smooth. Snip a tiny corner off each bag.',
      'Lay the stars on parchment and drizzle zigzags of pink, lavender and white across each one.',
      'While the drizzle is wet, scatter sprinkles and a tiny pinch of edible glitter. Let set for about 20 minutes.',
    ],
    makeAhead: [
      'Make up to 1 day ahead. They’re softest within 24 hours.',
      'Decorate on the day you make them so the sprinkles stick, then store once the drizzle has set.',
    ],
    storage: [
      'Store in a single layer, or with parchment between layers, in an airtight container at room temperature for up to 2 days.',
      'Don’t refrigerate — the treats turn hard and the drizzle can sweat.',
    ],
    presentation: [
      'Pile the stars on a pastel scalloped platter, or stand each one on a paper straw to make a “fairy wand”.',
      'Add a single sugar butterfly or edible flower to a few for a mix of styles.',
    ],
    allergens: [
      'Milk — butter, and most candy melts contain milk solids',
      'Soy — common in candy melts; check the label',
      'Gluten — classic crisped rice cereal contains barley malt, so it is not gluten-free',
      'Gelatin — most marshmallows contain pork or beef gelatin',
    ],
    substitutions: [
      'Gluten-free: use a crisped rice cereal labelled gluten-free and check the marshmallows.',
      'Dairy-free: plant butter, and dairy-free white chocolate tinted with gel color instead of candy melts.',
      'Vegetarian or halal: use gelatin-free (vegan) marshmallows; they melt a little more slowly.',
      'Simpler: skip the drizzle and press sprinkles straight into the warm slab.',
    ],
    safety: [
      'Marshmallow treats are sticky and chewy. For children under four, cut them into small pieces and make sure they’re eaten sitting down.',
      'Only use glitter and decorations labelled “edible”. “Non-toxic” craft glitter and luster dust are not food.',
      'Melted marshmallow and candy melts get very hot — keep children away from the stove and let the drizzle cool before little helpers decorate.',
      'Check sprinkle and candy labels for nut “may contain” warnings if any guest has a nut allergy.',
    ],
  },

  'rainbow-fruit-wands': {
    id: 'rainbow-fruit-wands',
    summary:
      'Bright skewers of berries, melon, pineapple and grapes in rainbow order — the fresh, colorful counterpoint to all the sweets.',
    yield: { servings: 12, label: '12 wands', perGuest: 1, step: 6, servingLabel: 'wand' },
    prepTime: '25 min',
    totalTime: '25 min',
    ingredients: [
      { key: 'strawberries', name: 'Strawberries', qty: 12, unit: 'strawberry', aisle: 'Produce' },
      { key: 'cantaloupe', name: 'Cantaloupe', qty: 0.5, unit: 'cantaloupe', aisle: 'Produce' },
      { key: 'pineapple-chunks', name: 'Pineapple chunks, fresh or canned in juice', qty: 1.5, unit: 'cup', aisle: 'Produce' },
      { key: 'green-grapes', name: 'Seedless green grapes', qty: 6, unit: 'oz', aisle: 'Produce' },
      { key: 'blueberries', name: 'Blueberries', qty: 0.5, unit: 'cup', aisle: 'Produce' },
      { key: 'red-grapes', name: 'Seedless red grapes', qty: 6, unit: 'oz', aisle: 'Produce' },
    ],
    equipment: ['12 paper straws or 6-in wooden skewers with the points snipped off', 'Melon baller or small knife', 'Star cookie cutter (optional)'],
    steps: [
      'Wash and dry all the fruit well so it doesn’t slide.',
      'Hull the strawberries. Cut the cantaloupe into bite-size cubes (or stars with a small cutter).',
      'Cut grapes in half lengthwise — quarter them for any child under five. Halve or lightly squash blueberries for under-fours.',
      'Thread in rainbow order: strawberry, cantaloupe, pineapple, green grape, blueberry, red grape.',
      'Lay the wands flat on a tray, cover and refrigerate until serving.',
    ],
    makeAhead: ['Cut fruit up to 1 day ahead and store each type separately in the fridge; assemble wands up to 4 hours before the party.'],
    storage: ['Keep refrigerated and serve within 2 hours of setting out. Leftover fruit keeps 2 days in the fridge.'],
    presentation: ['Stand wands upright in a jar of uncooked rice or a small foam block wrapped in moss.', 'Top each wand with a paper star or butterfly for a “fairy wand”.'],
    allergens: ['None of the top allergens — but check for strawberry and citrus sensitivities on RSVPs'],
    substitutions: ['Swap any fruit for what’s in season: watermelon, kiwi, mango or raspberries all fit the rainbow.'],
    safety: [
      'Whole grapes and blueberries are a leading choking hazard for young children: quarter grapes lengthwise and halve or squash blueberries for under-fives.',
      'Use blunt paper straws or snip skewer points for younger guests, and supervise eating. For under-threes, serve the fruit cut small in a cup instead of on a stick.',
      FOOD_SAFETY_2H,
    ],
  },

  'garden-veggie-cups': {
    id: 'garden-veggie-cups',
    summary:
      'Little cups with a spoonful of dip in the bottom and crunchy “garden” vegetables standing up in it — easy to carry, no double-dipping.',
    yield: { servings: 12, label: '12 cups', perGuest: 1, step: 6, servingLabel: 'cup' },
    prepTime: '20 min',
    totalTime: '20 min',
    ingredients: [
      { key: 'hummus', name: 'Hummus', qty: 1.5, unit: 'cup', aisle: 'Deli', note: 'About 2 tbsp per cup.' },
      { key: 'english-cucumber', name: 'English cucumbers', qty: 2, unit: 'cucumber', aisle: 'Produce' },
      { key: 'carrots', name: 'Medium carrots', qty: 4, unit: 'carrot', aisle: 'Produce' },
      { key: 'snap-peas', name: 'Sugar snap peas', qty: 6, unit: 'oz', aisle: 'Produce' },
      { key: 'yellow-bell-pepper', name: 'Yellow bell pepper', qty: 1, unit: 'bell pepper', aisle: 'Produce' },
    ],
    equipment: ['12 clear 9-oz cups', 'Vegetable peeler', 'Spoon or piping bag for the dip'],
    steps: [
      'Peel the carrots and cut into thin sticks about 4 in (10 cm) long. For children under four, slice into thin ribbons with a peeler or steam the sticks for 2 minutes to soften.',
      'Cut the cucumber and pepper into sticks the same length. String the snap peas.',
      'Spoon about 2 tablespoons of dip into the bottom of each cup.',
      'Stand a mix of vegetable sticks upright in the dip, like a little garden.',
      'Cover and refrigerate until serving.',
    ],
    makeAhead: [
      'Cut vegetables up to 1 day ahead: store carrot and cucumber sticks in a container lined with damp paper towel.',
      'Assemble cups up to 2 hours before serving and keep chilled.',
    ],
    storage: ['Keep refrigerated; serve within 2 hours of setting out. Discard any dip left out longer.'],
    presentation: ['Line the cups up on a wooden board with a sprig of dill or parsley tucked in each “garden bed”.'],
    allergens: ['Sesame — hummus is made with tahini', 'Check store-bought dips for milk, garlic or other sensitivities'],
    substitutions: [
      'Sesame-free: a white-bean dip made without tahini, or a plain yogurt-ranch dip (contains milk).',
      'Swap snap peas for cherry tomatoes (quartered) or celery.',
    ],
    safety: [
      'Raw carrot sticks, whole snap peas and cherry tomatoes are choking hazards for young children — cut thin, soften or quarter for under-fours.',
      FOOD_SAFETY_2H,
    ],
  },

  'honey-pinwheel-sandwiches': {
    id: 'honey-pinwheel-sandwiches',
    summary:
      'Tortilla wraps rolled with cream cheese and honey, or turkey and cheese, then sliced into pretty spirals. Half of each — something sweet, something savory.',
    yield: { servings: 24, label: '24 pinwheels (4 wraps)', perGuest: 2, step: 12, servingLabel: 'pinwheel' },
    prepTime: '20 min',
    totalTime: '1 hr 20 min with chilling',
    ingredients: [
      { key: 'flour-tortillas', name: 'Large soft flour tortillas, 10 in', qty: 4, unit: 'tortilla', aisle: 'Bakery' },
      { key: 'cream-cheese', name: 'Cream cheese, softened', qty: 8, unit: 'oz', aisle: 'Dairy & eggs' },
      { key: 'honey', name: 'Honey', qty: 2, unit: 'tbsp', aisle: 'Pantry', group: 'Honey wraps' },
      { key: 'deli-turkey', name: 'Thinly sliced deli turkey', qty: 6, unit: 'oz', aisle: 'Deli', group: 'Turkey wraps' },
      { key: 'cheese-slices', name: 'Mild cheese slices (Colby or Swiss)', qty: 4, unit: 'slice', aisle: 'Dairy & eggs', group: 'Turkey wraps' },
    ],
    equipment: ['Offset spatula or butter knife', 'Plastic wrap', 'Sharp serrated knife'],
    steps: [
      'Beat the cream cheese until smooth. Spread half of it thinly over two tortillas, right to the edges.',
      'Honey wraps: drizzle 1 tablespoon of honey over each of the two cream-cheese tortillas.',
      'Turkey wraps: spread the remaining cream cheese thinly over the other two tortillas, then layer on the turkey and cheese.',
      'Roll each tortilla up tightly, wrap firmly in plastic wrap and chill for at least 1 hour so it holds its shape.',
      'Trim the ends, then cut each roll into 6 slices about 1 in (2.5 cm) thick.',
    ],
    makeAhead: ['Roll and wrap up to 24 hours ahead and refrigerate. Slice no more than 2 hours before serving for the cleanest spirals.'],
    storage: ['Keep refrigerated. Turkey pinwheels must not sit out longer than 2 hours.'],
    presentation: ['Arrange in a spiral on a round platter, alternating honey and turkey, with a few edible flowers in the center.'],
    allergens: ['Wheat (gluten)', 'Milk'],
    substitutions: [
      'Gluten-free: gluten-free wraps (warm them briefly so they roll without cracking).',
      'Dairy-free: a plant-based cream cheese.',
      'Under-ones or honey-free: use seedless jam or a little mashed banana instead.',
      'Vegetarian: swap turkey for thinly sliced cucumber.',
    ],
    safety: [
      'Never give honey to babies under 12 months — it can cause infant botulism. Make a jam version for any baby guests.',
      'Deli meat and cream cheese are perishable: keep them cold. ' + FOOD_SAFETY_2H,
    ],
  },

  'petal-pink-lemonade': {
    id: 'petal-pink-lemonade',
    summary:
      'Fresh lemonade tinted pink with strawberries — no artificial color — poured over ice cubes with edible flowers frozen inside. The guests call it “fairy nectar”.',
    yield: { servings: 8, label: '8 cups (½ gallon)', perGuest: 1.5, step: 4, servingLabel: 'cup' },
    prepTime: '20 min',
    totalTime: '20 min + freezing',
    ingredients: [
      { key: 'lemons', name: 'Lemons, for about 1 cup juice', qty: 6, unit: 'lemon', aisle: 'Produce' },
      { key: 'granulated-sugar', name: 'Granulated sugar', qty: 0.75, unit: 'cup', aisle: 'Baking' },
      { key: 'strawberries', name: 'Strawberries', qty: 8, unit: 'strawberry', aisle: 'Produce' },
      { key: 'water', name: 'Cold water', qty: 6, unit: 'cup', aisle: 'Other', noShop: true },
      { key: 'fresh-edible-flowers', name: 'Fresh edible flowers (violas or pansies)', qty: 12, unit: 'flower', aisle: 'Produce', note: 'Labelled edible / food grade.', optional: true },
    ],
    equipment: ['Blender', 'Fine sieve', 'Large pitcher or drink dispenser', 'Ice cube trays (large cubes)'],
    steps: [
      'Flower ice: put one edible flower in each section of a large-cube ice tray, half-fill with water and freeze. Top up with water and freeze again so the flowers sit in the middle.',
      'Stir the sugar into 1 cup of warm water until dissolved to make a syrup. Let it cool.',
      'Juice the lemons. Blend the hulled strawberries with ½ cup of the water and strain through a fine sieve.',
      'Combine lemon juice, syrup, strawberry purée and the remaining cold water in a pitcher. Taste and add a little more water if it’s too tart.',
      'Chill well. Add the flower ice just before serving.',
    ],
    makeAhead: [
      'Make the lemonade base up to 3 days ahead and keep it covered in the fridge.',
      'Freeze the flower ice 1–2 days ahead.',
    ],
    storage: ['Refrigerate leftovers and use within 3 days. Stir before pouring — the strawberry settles.'],
    presentation: [
      'Serve from a glass-look plastic dispenser with a sprig of mint and lemon wheels.',
      'Label it “Fairy Nectar” with a little tag on twine.',
    ],
    allergens: ['None of the top allergens — note strawberry and citrus sensitivities'],
    substitutions: ['Lower sugar: start with ½ cup sugar per batch and add to taste.', 'No strawberries: a splash of cranberry or raspberry juice turns it pink too.'],
    safety: [
      'Use only flowers sold as edible (food grade, grown without pesticides). Florist and garden-center flowers are not safe to eat, and some common flowers are toxic.',
      'Use large ice cubes for young children and serve in shatterproof cups.',
    ],
  },

  'fairy-cake': {
    id: 'fairy-cake',
    title: 'Semi-naked fairy cake',
    summary:
      'A two-tier vanilla cake (6-inch on 8-inch) with a thin, semi-naked buttercream finish and pressed edible flowers. Make it yourself, or hand this brief to a local bakery.',
    yield: { servings: 28, label: '24–30 party slices', fixed: true, servingLabel: 'slice' },
    prepTime: '1 hr 30 min',
    totalTime: '5 hr, best over two days',
    ingredients: [
      { key: 'all-purpose-flour', name: 'All-purpose flour', qty: 3.75, unit: 'cup', aisle: 'Baking', group: 'Vanilla cake' },
      { key: 'baking-powder', name: 'Baking powder', qty: 3.75, unit: 'tsp', aisle: 'Baking', group: 'Vanilla cake' },
      { key: 'fine-salt', name: 'Fine salt', qty: 0.75, unit: 'tsp', aisle: 'Pantry', group: 'Vanilla cake' },
      { key: 'unsalted-butter', name: 'Unsalted butter, softened', qty: 3, unit: 'stick', shopUnit: 'stick', aisle: 'Dairy & eggs', group: 'Vanilla cake' },
      { key: 'granulated-sugar', name: 'Granulated sugar', qty: 2.75, unit: 'cup', aisle: 'Baking', group: 'Vanilla cake' },
      { key: 'large-eggs', name: 'Large eggs, room temperature', qty: 6, unit: 'egg', aisle: 'Dairy & eggs', group: 'Vanilla cake' },
      { key: 'vanilla-extract', name: 'Pure vanilla extract', qty: 1.5, unit: 'tbsp', aisle: 'Baking', group: 'Vanilla cake' },
      { key: 'whole-milk', name: 'Whole milk, room temperature', qty: 1.5, unit: 'cup', aisle: 'Dairy & eggs', group: 'Vanilla cake' },
      { key: 'unsalted-butter', name: 'Unsalted butter, softened', qty: 3, unit: 'stick', shopUnit: 'stick', aisle: 'Dairy & eggs', group: 'Vanilla buttercream' },
      { key: 'powdered-sugar', name: 'Powdered sugar', qty: 4.5, unit: 'cup', aisle: 'Baking', group: 'Vanilla buttercream' },
      { key: 'whole-milk', name: 'Whole milk or cream', qty: 3, unit: 'tbsp', aisle: 'Dairy & eggs', group: 'Vanilla buttercream' },
      { key: 'vanilla-extract', name: 'Pure vanilla extract', qty: 2, unit: 'tsp', aisle: 'Baking', group: 'Vanilla buttercream' },
      { key: 'pressed-edible-flowers', name: 'Pressed edible flowers (violas, pansies, cornflower)', qty: 30, unit: 'flower', aisle: 'Other', group: 'Decoration', note: 'Food grade, sold as edible.' },
    ],
    equipment: [
      'Two 8-in round pans and two 6-in round pans (or bake in batches)',
      'Parchment paper',
      'A 6-in cake board',
      '4 plastic cake dowels or wide bubble-tea straws',
      'Offset spatula and bench scraper',
      'Cake turntable (helpful, not essential)',
    ],
    steps: [
      'Heat the oven to 350°F (175°C). Grease all four pans and line the bases with parchment.',
      'Whisk the flour, baking powder and salt. Beat the cake butter and sugar until pale and fluffy, about 4 minutes. Beat in the eggs one at a time, then the vanilla.',
      'On low speed, add the flour in three parts, alternating with the milk, mixing just until smooth.',
      'Divide the batter so every pan is filled to the same depth, about half full. Bake the 6-in layers 25–30 minutes and the 8-in layers 30–35 minutes, until a skewer comes out clean.',
      'Cool 10 minutes in the pans, then turn out and cool completely. Wrap and chill the layers for easier stacking.',
      'Make the buttercream: beat the butter until creamy, add the powdered sugar a cup at a time, then the milk and vanilla. Beat until light, 3–4 minutes.',
      'Level the layers if domed. Stack each tier with a layer of buttercream between, the 6-in tier on its cake board.',
      'Spread a thin coat of buttercream over each tier, then scrape most of it away with a bench scraper so the cake shows through — that’s the semi-naked look. Chill 30 minutes.',
      'Push the 4 dowels into the center of the 8-in tier, trim them flush with the top, and set the 6-in tier (on its board) on top.',
      'Press the edible flowers onto the sides and top, dabbing a tiny bit of buttercream behind each one.',
    ],
    makeAhead: [
      'Bake the layers up to 2 days ahead; wrap tightly and refrigerate, or freeze up to 1 month.',
      'Make the buttercream up to 1 week ahead and refrigerate; bring to room temperature and re-whip.',
      'Stack and frost the day before. Add the flowers on the morning of the party so they stay crisp and don’t bleed color.',
    ],
    storage: [
      'Keep the finished cake in a cool room or the fridge, loosely covered. Take it out about 1 hour before serving so the buttercream softens.',
      'Leftovers keep 3 days refrigerated in an airtight container.',
    ],
    presentation: [
      'Serve on a cream or wooden cake stand with a few toadstools and a sprinkle of loose petals around the base.',
      'Add a single paper butterfly topper — mark any non-edible decorations so they’re removed before cutting.',
      'Cut the top tier first and remove its board and the dowels before slicing the bottom tier.',
    ],
    allergens: ['Wheat (gluten)', 'Milk', 'Egg'],
    substitutions: [
      'Gluten-free: a 1:1 gluten-free baking flour; expect slightly more delicate layers, so chill well before stacking.',
      'Dairy-free: plant butter sticks and unsweetened oat milk in both cake and buttercream.',
      'For egg-free or top-allergen-free needs, a specialist bakery is the safest route.',
    ],
    safety: [
      'Edible flowers must be sold as food grade and grown without pesticides. Never use florist flowers. Some common garden flowers — such as lily of the valley, foxglove, hydrangea and daffodil — are toxic.',
      'Press your own only from food-grade fresh flowers (between parchment in a heavy book for 1–2 weeks), or buy flowers that are already pressed and labelled edible.',
      'Buttercream softens and can slump above about 75°F (24°C): keep the cake indoors or in the shade until it’s time to cut.',
      'Remove dowels, boards and any non-edible toppers before serving.',
    ],
    bakery: {
      summary:
        'Ordering is a lovely shortcut. Bring this brief to a local bakery you trust, ask the questions below, and confirm everything in writing.',
      order: [
        'Two tiers: 6-inch on 8-inch, about 24–30 party slices. For more than about 28 people, ask for a third tier or a matching sheet cake to cut in the kitchen.',
        'Vanilla sponge with vanilla buttercream, finished semi-naked so the cake shows through.',
        'Pressed edible flowers in soft pinks, lavender and buttercup yellow, plus a small butterfly topper.',
        'Show them the cake photo from your Fairy Garden board as a reference.',
      ],
      questions: [
        'Can you accommodate our guests’ allergies (and can you tell me about cross-contact in your kitchen)?',
        'Where do your edible flowers come from — are they food grade and pesticide-free?',
        'How far ahead do you need the order, and when is the final design and number confirmed?',
        'Is the cake dowelled for transport, and do you deliver or should I collect?',
        'Which decorations are non-edible and need removing before cutting?',
        'How should it be stored overnight and how long before serving should it come out of the fridge?',
      ],
      timeline: [
        '3–4 weeks before: contact bakeries — popular weekends book up early.',
        '2 weeks before: confirm design, flavors, allergies and pickup or delivery time.',
        '2–3 days before: confirm the order and the final details.',
      ],
      dayOf: [
        'Collect in a cool car on a flat surface (a non-slip mat in the trunk or footwell works well).',
        'Keep the cake indoors or in a cool room until it’s time to serve.',
        'Have a cake stand, cake knife, serving server and a container for leftovers ready.',
      ],
    },
  },
}
