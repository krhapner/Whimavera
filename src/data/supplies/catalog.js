/**
 * Reusable supply catalog — shared by every theme.
 *
 * Each supply has a stable id. Party data (guides, decor, DIY, shop lists)
 * refers to supplies by exact material name via `aliases`, so the same
 * supply (e.g. warm fairy lights) is recognised wherever it appears and
 * consolidated on the shopping list.
 *
 * Fields
 *   name         Display name
 *   category     paper | decor | activities | food | tableware | favors
 *   search       Amazon search phrase (used when there is no verified product)
 *   asin         OPTIONAL verified Amazon product id — add only after checking
 *                the listing yourself. Never invent one.
 *   url          OPTIONAL verified Amazon URL (alternative to asin)
 *   unit         Singular unit used for quantities
 *   reusable     true when one is enough no matter how many activities use it
 *   est          OPTIONAL typical cost range per unit [low, high] in USD — a
 *                generic planning estimate, never an Amazon price
 *   alternatives OPTIONAL [{ label, search }] cheaper or different options
 *   kit          OPTIONAL id from KITS — a kit search that could cover this
 *   shop: false  Not something to buy (made at home, printed, from the garden)
 *
 * To add a curated product later: add `asin` to the supply. Every place
 * that shows the supply switches from a search link to the product link.
 */
export const SUPPLIES = {
  // ---------- Activities & crafts ----------
  'pipe-cleaners': {
    name: 'Green pipe cleaners (chenille stems)',
    category: 'activities',
    search: 'green chenille stems pipe cleaners 12 inch',
    unit: 'stem',
    kit: 'flower-crown-kit',
    aliases: ['Green chenille stems (pipe cleaners), 12 in', 'Green pipe cleaners'],
  },
  'faux-flower-picks': {
    name: 'Faux flower picks',
    category: 'activities',
    search: 'small artificial flower picks craft',
    unit: 'stem',
    kit: 'flower-crown-kit',
    alternatives: [{ label: 'Silk flower heads (cheaper per crown)', search: 'silk flower heads bulk craft' }],
    aliases: ['Faux flower stems or picks with plastic stems', 'Faux or fresh small blooms'],
  },
  'faux-greenery': {
    name: 'Faux greenery sprigs',
    category: 'activities',
    search: 'artificial greenery leaf picks craft',
    unit: 'sprig',
    aliases: ['Faux greenery or leaf sprigs'],
  },
  'satin-ribbon': {
    name: 'Satin ribbon, ⅜ in',
    category: 'activities',
    search: 'pastel satin ribbon 3/8 inch',
    unit: 'piece',
    kit: 'flower-crown-kit',
    aliases: ['Satin ribbon, ⅜ in wide, cut to 18 in', 'Ribbon to tie scrolls, cut to 8 in', 'Satin ribbon (30 cm per crown)'],
  },
  'floral-tape': {
    name: 'Green floral tape',
    category: 'activities',
    search: 'green floral tape',
    unit: 'roll',
    aliases: ['Green floral tape', 'Floral tape'],
  },
  'small-baskets': {
    name: 'Small baskets',
    category: 'decor',
    search: 'small woven baskets set',
    unit: 'basket',
    reusable: true,
    aliases: ['Small baskets or bowls for sorting flowers', 'Small baskets for sorting supplies'],
  },
  'wire-cutters': { name: 'Wire cutters', category: 'activities', search: 'craft wire cutters', unit: 'pair', reusable: true, aliases: ['Wire cutters (adult use only)'] },
  clothespins: { name: 'Mini wooden clothespins', category: 'activities', search: 'mini wooden clothespins craft', unit: 'clothespin', aliases: ['Clothespins for name tags'] },
  'hand-mirror': { name: 'Hand mirror', category: 'activities', search: 'shatterproof hand mirror kids', unit: 'mirror', reusable: true, aliases: ['Hand mirror'] },
  'acrylic-gems': {
    name: 'Large acrylic gems (1¾ in+)',
    category: 'activities',
    search: 'large acrylic gems 2 inch kids',
    unit: 'gem',
    alternatives: [{ label: 'Painted pebbles (DIY)', search: 'smooth river rocks for painting' }],
    aliases: ['Large acrylic “fairy gems” (at least 1¾ in / 4.5 cm)', 'Treasure hunt "fairy gems"'],
  },
  'drawstring-pouches': {
    name: 'Drawstring pouches',
    category: 'activities',
    search: 'organza drawstring pouches',
    unit: 'pouch',
    aliases: ['Drawstring organza or cotton pouches', 'Drawstring gem pouches'],
  },
  'sheet-protectors': { name: 'Sheet protectors (for clue cards)', category: 'activities', search: 'sheet protectors letter size', unit: 'pack', aliases: ['Picture clue cards, in sheet protectors'] },
  'treasure-box': { name: 'Treasure box', category: 'activities', search: 'wooden treasure chest box kids', unit: 'box', reusable: true, aliases: ['Treasure box for the final clue'] },
  'washi-tape': { name: 'Washi tape', category: 'activities', search: 'pastel washi tape set', unit: 'roll', reusable: true, aliases: ['Washi tape or sticky tack for clues'] },
  'hand-bell': { name: 'Hand bell or chime', category: 'activities', search: 'hand bell kids', unit: 'bell', reusable: true, aliases: ['A bell or chime to call teams back'] },
  'craft-sticks': { name: 'Wooden craft sticks', category: 'activities', search: 'wooden craft sticks', unit: 'stick', aliases: ['Wooden craft sticks or plastic butter knives for spreading'] },
  'portion-cups': { name: 'Small portion cups', category: 'tableware', search: 'small portion cups 2 oz', unit: 'cup', aliases: ['Small cups for frosting and toppings'] },
  'plain-plates': { name: 'Paper plates', category: 'tableware', search: 'white paper plates', unit: 'plate', aliases: ['Paper plates, labelled with names'] },
  'wet-wipes': { name: 'Wet wipes', category: 'activities', search: 'baby wipes multipack', unit: 'pack', reusable: true, aliases: ['Wet wipes and a hand-washing station'] },
  'kids-aprons': { name: 'Kids’ aprons', category: 'activities', search: 'kids aprons bulk', unit: 'apron', reusable: true, alternatives: [{ label: 'Old t-shirts from home', search: '' }], aliases: ['Aprons or old t-shirts'] },
  'piping-bags': { name: 'Piping bags', category: 'food', search: 'disposable piping bags', unit: 'bag', aliases: ['Piping bags for older decorators'] },
  'squeeze-bottles': { name: 'Small squeeze bottles', category: 'activities', search: 'small squeeze bottles 4 oz', unit: 'bottle', reusable: true, aliases: [] },
  'lemon-juice': { name: 'Lemon juice', category: 'food', search: 'lemon juice', unit: 'bottle', alternatives: [{ label: 'Small squeeze bottles to serve it in', search: 'small squeeze bottles 4 oz' }], aliases: ['Lemon juice in squeeze bottles'] },
  'clear-cups': { name: 'Clear shatterproof cups, 9 oz', category: 'tableware', search: 'clear plastic cups 9 oz', unit: 'cup', aliases: ['Clear shatterproof plastic cups, 9 oz'] },
  'plastic-droppers': { name: 'Plastic droppers', category: 'activities', search: 'plastic transfer pipettes kids', unit: 'dropper', aliases: ['Plastic droppers or small spoons'] },
  'serving-trays': { name: 'Serving trays', category: 'tableware', search: 'plastic serving trays', unit: 'tray', reusable: true, aliases: ['Trays to stand cups on', 'Baking trays to catch spills'] },
  'blank-labels': { name: 'Blank labels', category: 'activities', search: 'blank kraft labels stickers', unit: 'sheet', aliases: ['Potion labels and a marker'] },
  'bluetooth-speaker': { name: 'Bluetooth speaker', category: 'activities', search: 'portable bluetooth speaker', unit: 'speaker', reusable: true, aliases: ['Bluetooth speaker or phone', 'Speaker and playlist'] },
  'play-scarves': { name: 'Silky play scarves', category: 'activities', search: 'silk play scarves kids', unit: 'scarf', aliases: ['Silky play scarves or the party wings'] },
  'fairy-wand': { name: 'Fairy wand', category: 'activities', search: 'fairy wand kids', unit: 'wand', reusable: true, aliases: ['A wand for the “Fairy Queen” host'] },
  'magnifying-glasses': { name: 'Kids’ magnifying glasses', category: 'activities', search: 'kids magnifying glasses shatterproof', unit: 'glass', aliases: ['Shatterproof acrylic magnifying glasses'] },
  crayons: { name: 'Crayons', category: 'activities', search: 'crayons bulk', unit: 'pack', reusable: true, aliases: ['Crayons or pencils'] },
  clipboards: { name: 'Kids’ clipboards', category: 'activities', search: 'small clipboards kids', unit: 'clipboard', aliases: ['Clipboards'] },
  'paper-bags': { name: 'Small paper bags', category: 'activities', search: 'small kraft paper bags', unit: 'bag', aliases: ['Small paper bags for fallen treasures'] },
  'plastic-jars': { name: 'Clear PET jars with lids, 4–8 oz', category: 'activities', search: 'clear plastic jars with lids 8 oz', unit: 'jar', aliases: ['Clear PET plastic jars with screw lids, 4–8 oz'] },
  'craft-sand': { name: 'Colored craft sand', category: 'activities', search: 'colored craft sand set', unit: 'set', aliases: ['Colored craft sand in 4–5 colors'] },
  funnels: { name: 'Small funnels', category: 'activities', search: 'small funnels set', unit: 'funnel', reusable: true, aliases: ['Small funnels or paper cones'] },
  'plastic-spoons': { name: 'Plastic spoons', category: 'tableware', search: 'plastic spoons', unit: 'spoon', aliases: ['Spoons for each sand color'] },
  'paper-confetti': { name: 'Large paper confetti', category: 'activities', search: 'large paper confetti shapes', unit: 'pack', aliases: ['Large paper confetti shapes'] },
  'strong-glue': { name: 'Strong craft glue', category: 'activities', search: 'strong craft glue', unit: 'tube', reusable: true, aliases: ['Strong glue for lids (adult use)'] },
  'round-mats': { name: 'Non-slip round mats, 14 in', category: 'activities', search: 'round non slip mats 14 inch', unit: 'mat', aliases: ['Non-slip round mats, about 14 in (35 cm)'] },
  'felt-sheets': { name: 'Red and white felt', category: 'activities', search: 'red white felt sheets', unit: 'pack', aliases: ['Red felt circles with white felt dots, glued to each mat'] },
  'rug-gripper': { name: 'Rug gripper / shelf liner', category: 'activities', search: 'non slip shelf liner', unit: 'roll', aliases: ['Rug gripper or non-slip shelf liner'] },
  'picture-book': { name: 'Fairy picture book', category: 'activities', search: 'fairy garden picture book kids', unit: 'book', reusable: true, aliases: ['A fairy or garden picture book (5–8 minutes to read)'] },
  'floor-cushions': { name: 'Floor cushions', category: 'decor', search: 'floor cushions kids', unit: 'cushion', reusable: true, aliases: ['Blankets or floor cushions'] },
  'craft-paint': { name: 'Acrylic craft paint', category: 'activities', search: 'acrylic craft paint set', unit: 'set', reusable: true, aliases: ['Red, white and blush acrylic paint', 'Acrylic paints'] },
  'terracotta-pots': { name: 'Small terracotta pots', category: 'activities', search: 'small terracotta pots', unit: 'pot', aliases: ['Terracotta pots (various sizes)'] },
  'paper-bowls': { name: 'Paper bowls', category: 'tableware', search: 'paper bowls', unit: 'bowl', aliases: ['Paper bowls or plates for caps'] },
  'glue-gun': { name: 'Hot glue gun', category: 'activities', search: 'mini hot glue gun', unit: 'gun', reusable: true, aliases: ['Hot glue gun'] },
  'sponge-dabbers': { name: 'Round sponge dabbers', category: 'activities', search: 'round sponge dabbers', unit: 'set', reusable: true, aliases: ['Round sponge dabbers'] },
  'wood-plaque': { name: 'Small craft wood plaque', category: 'activities', search: 'small unfinished wood plaque', unit: 'plaque', alternatives: [{ label: 'Popsicle sticks', search: 'jumbo craft sticks' }], aliases: ['Craft wood plaque or popsicle sticks'] },
  'mini-hinges': { name: 'Mini hinges', category: 'activities', search: 'mini decorative hinges', unit: 'set', aliases: ['Tiny hinge or brad'] },
  'preserved-moss': { name: 'Preserved moss', category: 'decor', search: 'preserved sheet moss', unit: 'bag', aliases: ['Pebbles and moss'] },

  // ---------- Decorations ----------
  'chalkboard-sign': { name: 'Chalkboard sign board', category: 'decor', search: 'chalkboard sign easel', unit: 'sign', reusable: true, est: [5, 10], aliases: ['Chalkboard or kraft sign board'] },
  'ribbon-spool': { name: 'Ribbon spool in palette colors', category: 'decor', search: 'pastel ribbon spool set', unit: 'spool', est: [3, 6], aliases: ['Ribbon in palette colors', 'Ribbon for hanging favors'] },
  'balloon-garland-kit': {
    name: 'Pastel balloon garland kit',
    category: 'decor',
    search: 'pastel balloon garland arch kit',
    unit: 'kit',
    est: [18, 26],
    alternatives: [{ label: 'Loose pastel balloons + fishing line', search: 'pastel balloons 12 inch' }],
    aliases: ['Pastel balloon garland kit'],
  },
  'ivy-garland': { name: 'Faux ivy & floral garland', category: 'decor', search: 'artificial ivy flower garland', unit: 'garland', est: [8, 14], aliases: ['Faux ivy & floral garland'] },
  'bud-vases': { name: 'Bud vases', category: 'decor', search: 'small glass bud vases set', unit: 'vase', reusable: true, alternatives: [{ label: 'Jam jars from home', search: '' }], aliases: ['Jam jars or bud vases (from home) + garden flowers'] },
  'kraft-paper': { name: 'Kraft paper table runner roll', category: 'decor', search: 'kraft paper roll table runner', unit: 'roll', est: [5, 7], aliases: ['Kraft paper table runner'] },
  'moss-runner': { name: 'Moss table runner', category: 'decor', search: 'moss table runner', unit: 'runner', est: [12, 18], alternatives: [{ label: 'Preserved moss sheets on kraft paper', search: 'preserved sheet moss' }], aliases: ['Moss table runner'] },
  'fairy-lights': {
    name: 'Warm fairy string lights',
    category: 'decor',
    search: 'warm white fairy string lights battery',
    unit: 'strand',
    reusable: true,
    est: [6, 10],
    aliases: ['Warm fairy string lights', 'A battery lantern or fairy lights for atmosphere'],
  },
  'toadstool-decor': { name: 'Toadstool decorations', category: 'decor', search: 'mushroom toadstool party decorations', unit: 'set', est: [12, 20], aliases: ['Paper toadstool decorations'] },
  'sheer-voile': { name: 'Sheer voile fabric', category: 'decor', search: 'sheer voile curtain panels white', unit: 'panel', est: [8, 18], aliases: ['Sheer voile fabric, 5 yd'] },
  'fairy-wings': {
    name: 'Dress-up fairy wings',
    category: 'favors',
    search: 'kids fairy wings',
    unit: 'pair',
    kit: 'fairy-wings-multipack',
    est: [2, 4],
    aliases: ['Dress-up fairy wings', 'Mini fairy wings'],
  },

  // ---------- Invitations & paper ----------
  'fairy-invitations': {
    name: 'Fairy birthday invitations with envelopes',
    category: 'paper',
    // Curated by Whimavera — product chosen and verified by hand.
    asin: 'B0H41D1GQ5',
    search: 'fairy birthday invitations',
    unit: 'invitation',
    alternatives: [{ label: 'Browse other fairy invitations', search: 'fairy birthday invitations with envelopes' }],
    aliases: ['Fairy invitations'],
  },

  // ---------- Tableware ----------
  'scalloped-plates': { name: 'Scalloped pastel plates', category: 'tableware', search: 'scalloped pastel paper plates', unit: 'plate', aliases: ['Scalloped pastel plates'] },
  'petal-cups': { name: 'Floral paper cups', category: 'tableware', search: 'floral paper cups party', unit: 'cup', aliases: ['Paper cups with petals'] },
  'sage-napkins': { name: 'Sage napkins', category: 'tableware', search: 'sage green paper napkins', unit: 'napkin', aliases: ['Sage linen-look napkins'] },
  'wooden-cutlery': { name: 'Wooden cutlery sets', category: 'tableware', search: 'disposable wooden cutlery set', unit: 'set', aliases: ['Wooden cutlery set'] },

  // ---------- Favors ----------
  'favor-bags': { name: 'Kraft favor bags', category: 'favors', search: 'kraft favor bags', unit: 'bag', aliases: ['Kraft favor bags & ribbon'] },
  'seed-packets': { name: 'Wildflower seed packets', category: 'favors', search: 'wildflower seed packets party favors', unit: 'packet', aliases: ['Wildflower seed packets'] },
  'crown-supplies': {
    name: 'Flower crown supplies',
    category: 'activities',
    search: 'flower crown making kit kids',
    unit: 'crown',
    kit: 'flower-crown-kit',
    aliases: ['Flower crown supplies'],
  },
  'wand-kit': { name: 'Fairy wand craft supplies', category: 'activities', search: 'fairy wand craft kit kids', unit: 'wand', aliases: ['Fairy wand craft kit'] },

  // ---------- Food & baking (shelf-stable only) ----------
  'butterfly-pea-flowers': { name: 'Dried butterfly-pea flowers (food grade)', category: 'food', search: 'dried butterfly pea flower tea food grade', unit: 'bag', aliases: ['Dried butterfly-pea flowers (food grade)'] },
  'white-chocolate-chips': { name: 'White chocolate chips', category: 'food', search: 'white chocolate chips', unit: 'bag', aliases: ['White chocolate chips or mini marshmallows for spots'] },
  'cupcake-liners': { name: 'Cupcake liners', category: 'food', search: 'pastel cupcake liners', unit: 'pack', kit: 'cupcake-decorating', aliases: ['Cupcake liners'] },

  // ---------- Not bought ----------
  'not-bought': {
    name: 'Made or gathered at home',
    shop: false,
    aliases: [
      'Plain vanilla cupcakes, completely cooled',
      'Buttercream tinted red and pink',
      'Brewed, fully cooled butterfly-pea tea',
      'Honey or simple syrup to sweeten',
      'Playlist of 6–8 upbeat songs',
      'Picture checklist cards (8 items)',
      'Paper wish scrolls and pens',
      'Fresh flowers (florist or market)',
      'Potted branch or small tree (borrow one)',
      'Edible flowers (pansies, violas)',
      'Clean brush',
      'A little piping gel or water',
    ],
  },
}

/**
 * Supplies every party of a theme needs, outside any one activity or zone.
 * qty: { perGuest, extra } or { fixed }.
 */
export const THEME_SUPPLIES = {
  'fairy-garden': [{ supply: 'fairy-invitations', qty: { perGuest: 1, extra: 2 } }],
}

/**
 * Kit searches. These are search links for kinds of kit, not claims that a
 * particular kit exists — the UI always presents them as "browse … kits"
 * and reminds parents to check what's included.
 */
export const KITS = {
  'flower-crown-kit': { name: 'Flower crown craft kits', search: 'flower crown craft kit kids', note: 'Check that a kit includes enough crowns for your guests.' },
  'fairy-wings-multipack': { name: 'Fairy wings multipacks', search: 'fairy wings multipack kids party', note: 'Multipacks usually cost less per pair than single wings.' },
  'balloon-garland': { name: 'Pastel balloon garland kits', search: 'pastel balloon garland arch kit', note: 'Compare balloon counts — 100+ balloons makes a full arch.' },
  'cupcake-decorating': { name: 'Cupcake decorating supplies', search: 'cupcake decorating kit kids sprinkles', note: 'Look for sets with liners, toppers and sprinkles together.' },
}

/** Kits to suggest alongside an activity, zone or recipe. */
export const KITS_FOR = {
  'flower-crown-studio': ['flower-crown-kit'],
  'flower-crown-bases': ['flower-crown-kit'],
  welcome: ['balloon-garland'],
  'photo-nook': ['fairy-wings-multipack'],
  'toadstool-cupcake-bar': ['cupcake-decorating'],
  'toadstool-cupcakes': ['cupcake-decorating'],
}
