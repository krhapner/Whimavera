// Premium printable bundle — one design per theme, offered after a plan exists.
// `art` picks the preview illustration; names and details are theme-specific.

const BASE = {
  price: 29,
  currency: 'USD',
  perks: ['Instant digital download', 'Personalized name & age', 'Letter and A4 sizes', 'Unlimited home printing'],
}

const PRINTABLES = {
  'fairy-garden': [
    ['invite', 'Fairy invitations', '5×7 invitation with toadstools + matching RSVP card'],
    ['sign', 'Garden signs', '"Fairies Welcome" sign, Fairy Feast menu and food labels'],
    ['cards', 'Treasure-hunt clues', 'Picture clue cards and fairy bingo'],
    ['tag', 'Favor-tree tags', 'Thank-you tags to hang on the favor tree'],
    ['banner', 'Toadstool name bunting', 'Pennant letters for any name'],
    ['note', 'Thank-you notes', 'Fill-in-the-blank cards for little writers'],
  ],
  'under-the-sea': [
    ['invite', 'Pearl invitations', '5×7 invitation with seashells + RSVP card'],
    ['sign', 'Reef signs', '"Welcome to the Reef" sign, menu and food labels'],
    ['cards', 'Treasure map & bingo', 'A treasure map and sea-creature bingo'],
    ['tag', 'Treasure-chest tags', 'Tags for the favor boxes'],
    ['banner', 'Wave name bunting', 'Pennant letters for any name'],
    ['note', 'Message-in-a-bottle thank-yous', 'Rolled notes to tie with twine'],
  ],
  'starry-night': [
    ['invite', 'Midnight invitations', 'Navy-and-gold invitation + RSVP card'],
    ['sign', 'Observatory signs', 'Welcome sign, moonlit menu and food labels'],
    ['cards', 'Constellation cards', 'Punch-out constellation patterns and space bingo'],
    ['tag', 'Star favor tags', 'Gold-star thank-you tags'],
    ['banner', 'Gold-star name banner', 'Pennant letters for any name'],
    ['note', 'Postcards from space', 'Thank-you postcards to color and send'],
  ],
  'woodland-tea': [
    ['invite', 'Pressed-leaf invitations', 'Tea-party invitation + RSVP card'],
    ['sign', 'Tea-room signs', 'Menu, place cards and "Tea is Served" sign'],
    ['cards', 'Acorn-hunt cards', 'Hunt score cards and woodland bingo'],
    ['tag', 'Teacup tags', 'Tags for planters and favor boxes'],
    ['banner', 'Leaf name bunting', 'Pennant letters for any name'],
    ['note', 'Woodland thank-you notes', 'Notes with a fox, rabbit and owl'],
  ],
  'dino-dig': [
    ['invite', 'Expedition invitations', 'Field-guide style invitation + RSVP card'],
    ['sign', 'Dig-site signs', '"Explorers Only" sign, menu and food labels'],
    ['cards', 'Field notebooks', 'Fossil log pages and dinosaur bingo'],
    ['tag', 'Explorer badges', 'Badges and favor tags'],
    ['banner', 'Dino name banner', 'Pennant letters for any name'],
    ['note', 'Roar-some thank-yous', 'Thank-you notes with dino footprints'],
  ],
  'rainbow-picnic': [
    ['invite', 'Rainbow invitations', 'Sunny invitation + RSVP card'],
    ['sign', 'Picnic signs', 'Welcome sign and picnic menu'],
    ['cards', 'Color-hunt cards', 'Color hunt checklist and sticker rainbows'],
    ['tag', 'Cloud favor tags', 'Tags for bubble bottles and crayons'],
    ['banner', 'Rainbow name banner', 'Pennant letters for any name'],
    ['note', 'Sunny thank-you notes', 'Handprint-friendly cards for little ones'],
  ],
}

export function bundleFor(theme) {
  const items = PRINTABLES[theme.id] || PRINTABLES['fairy-garden']
  return {
    ...BASE,
    id: `printables-${theme.id}`,
    name: `The ${theme.name} Printable Bundle`,
    description: `Every paper detail for your ${theme.name} party — designed to match your palette and personalized with your child’s name. Print at home or at a local print shop.`,
    includes: items.map(([art, name, detail]) => ({ id: `${theme.id}-${art}`, art, name, detail })),
  }
}
