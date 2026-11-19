/**
 * Fairy Garden — "Made to Match" stationery collection.
 *
 * Everything theme-specific lives here: colour variations, typography,
 * artwork slots and the layout of each product. Customer details are never
 * stored here; layouts receive them as `d` (see printables/details.js).
 *
 * Units are inches, measured from the top-left of the trimmed card.
 * Artwork goes in src/assets/printables/fairy-garden/<slot>.png (see ART).
 */

// ---------- Colour variations (approved palettes) ----------
export const variants = [
  { id: 'blush', name: 'Blush garden', swatch: ['#E9C6C1', '#A9B79E', '#B89A5E'], colors: { paper: '#FBF8EE', ink: '#4A3B37', accent: '#B0716F', muted: '#8C7D76', rule: '#D9B9B2' } },
  { id: 'lavender', name: 'Lavender meadow', swatch: ['#CBC2DD', '#E9C6C1', '#A9B79E'], colors: { paper: '#FAF8F0', ink: '#3E3949', accent: '#85729F', muted: '#7E7888', rule: '#CFC4DE' } },
  { id: 'sage', name: 'Sage woodland', swatch: ['#A9B79E', '#F1E2B2', '#E9C6C1'], colors: { paper: '#F9F8EE', ink: '#353F31', accent: '#667A5B', muted: '#7A8174', rule: '#C2CDB6' } },
]

// ---------- Artwork slots ----------
// Each slot is one reusable piece of artwork in
// src/assets/printables/fairy-garden/<slot>.png. A colour-specific version
// is <slot>--<variant>.png (e.g. border-portrait--sage.png). Sizes are what
// prints crisply at 300 dpi; smaller files work but print softer.
// scripts/prepare-printable-art.py cuts these from the delivered art sheets.
export const ART = {
  paper: { label: 'Paper texture', kind: 'background', size: 'at least 2550×3300 px', note: 'Optional subtle paper texture.' },
  'border-portrait': { label: 'Floral border (portrait)', kind: 'background', size: '1650×2250 px', note: 'Full-bleed border with a clear centre. Used for invitations, station signs and thank-you cards. One per colour.' },
  'border-8x10': { label: 'Floral border (8×10)', kind: 'background', size: '2475×3075 px', note: 'Full-bleed 4:5 border for the welcome sign.' },
  tag: { label: 'Favor tag', kind: 'shape', size: '650×950 px', note: 'Tag shape with hole, transparent outside. One per colour.' },
  'tent-frame': { label: 'Tent card frame', kind: 'background', size: '1050×630 px', note: 'Horizontal place-card frame, 5:3. One per colour.' },
  'topper-ring': { label: 'Topper wreath', kind: 'frame', size: '600×600 px', note: 'Round wreath with an empty centre, for name and age.' },
  'topper-butterfly': { label: 'Topper: butterfly', kind: 'illustration', size: '600×600 px' },
  'topper-bloom': { label: 'Topper: bloom', kind: 'illustration', size: '600×600 px' },
  'topper-toadstool': { label: 'Topper: toadstool', kind: 'illustration', size: '600×600 px' },
  'topper-cupcake': { label: 'Topper: cupcake', kind: 'illustration', size: '600×600 px' },
  'topper-wings': { label: 'Topper: fairy wings', kind: 'illustration', size: '600×600 px' },
  'topper-lavender': { label: 'Topper: lavender', kind: 'illustration', size: '600×600 px' },
  'clue-toadstool': { label: 'Clue picture: toadstool', kind: 'illustration', size: '780×510 px' },
  'clue-flowers': { label: 'Clue picture: flower bed', kind: 'illustration', size: '780×510 px' },
  'clue-bench': { label: 'Clue picture: bench', kind: 'illustration', size: '780×510 px' },
  'clue-tree': { label: 'Clue picture: big tree', kind: 'illustration', size: '780×510 px' },
}

// ---------- Typography ----------
// Pinyon Script for names, Cormorant Garamond for display, Jost for details.
const T = {
  eyebrow: { font: 'body', size: 8, min: 6.5, upper: true, tracking: 200, color: 'muted' },
  script: { font: 'script', color: 'accent', leading: 1.05 },
  display: { font: 'display', color: 'ink', leading: 1.15 },
  italic: { font: 'displayItalic', color: 'ink', leading: 1.2 },
  body: { font: 'body', color: 'ink', leading: 1.45 },
  caps: { font: 'bodyMedium', upper: true, tracking: 140, color: 'ink', leading: 1.4 },
}
const s = (base, extra) => ({ ...T[base], ...extra })

// Double hairline frame used until the illustrated border is supplied.
const ruleFrame = (inset, slot) => ({ type: 'frame', inset, gap: 0.06, color: 'rule', width: 0.6, unlessArt: slot })

// ---------- Treasure hunt clues ----------
// Hiding spots with a matching picture. The last clue leads to the treasure.
export const clues = [
  { spot: 'toadstool', art: 'clue-toadstool', short: 'Look by the toadstool', rhyme: 'Where a red cap sits with spots of white, peek all around — your clue’s in sight!' },
  { spot: 'flowers', art: 'clue-flowers', short: 'Search the flower bed', rhyme: 'Where petals bloom in pink and blue, the flowers hide a clue for you.' },
  { spot: 'bench', art: 'clue-bench', short: 'Look by the bench', rhyme: 'Sit for a while and rest your feet — the clue is hiding by the seat.' },
  { spot: 'tree', art: 'clue-tree', short: 'Find the big tree', rhyme: 'Tall and leafy, wise and old — search my roots for something bold.' },
  { spot: 'treasure', art: 'topper-butterfly', short: 'Find the fairy treasure!', rhyme: 'You followed every fairy sign — now find the treasure, it’s yours and mine!' },
]

// ---------- Layouts ----------
const border = (slot, w, h) => ({ slot, box: [-0.125, -0.125, w + 0.25, h + 0.25], fit: 'cover' })

export const layouts = {
  invitation: {
    art: [border('border-portrait', 5, 7)],
    shapes: [ruleFrame(0.28, 'border-portrait')],
    stacks: [
      {
        box: [0.85, 1.1, 3.3, 4.85],
        items: [
          { key: 'opening', label: 'Opening line', text: () => 'Please join us to celebrate', style: s('eyebrow', { size: 8.5 }) },
          { key: 'name', label: 'Child’s name', field: 'childName', required: true, placeholder: 'Your child’s name', text: (d) => d.name, style: s('script', { size: 58, min: 26, maxLines: 2 }), gap: 0.06 },
          { key: 'age', label: 'Age line', text: (d) => (d.ageWord ? `turning ${d.ageWord}` : null), style: s('italic', { size: 19, min: 12 }) },
          { divider: 0.85, gap: 0.2 },
          { key: 'date', label: 'Date', field: 'date', text: (d) => d.dateLong, style: s('display', { size: 17, min: 11 }), gap: 0.2 },
          { key: 'time', label: 'Time', field: 'startTime', text: (d) => d.time, style: s('caps', { size: 8.5, min: 7 }), gap: 0.05 },
          { key: 'venue', label: 'Place', field: 'venue', text: (d) => d.venue, style: s('italic', { size: 15, min: 10, maxLines: 2 }), gap: 0.2 },
          { key: 'address', label: 'Address', field: 'address', text: (d) => d.address, style: s('body', { size: 9, min: 7, maxLines: 2 }), gap: 0.03 },
          { key: 'rsvp', label: 'RSVP', field: 'rsvpContact', text: (d) => d.rsvpLine, style: s('eyebrow', { size: 7.5, min: 6.25, maxLines: 2, leading: 1.5 }), gap: 0.26 },
        ],
      },
    ],
  },

  'welcome-sign': {
    art: [border('border-8x10', 8, 10)],
    shapes: [ruleFrame(0.42, 'border-8x10')],
    stacks: [
      {
        box: [1.35, 2.35, 5.3, 5.1],
        items: [
          { key: 'welcome', label: 'Welcome line', text: () => 'Welcome to', style: s('eyebrow', { size: 15, min: 11, tracking: 320 }) },
          { key: 'name', label: 'Child’s name', field: 'childName', required: true, placeholder: 'Your child’s', text: (d) => d.possessive, style: s('script', { size: 100, min: 48, maxLines: 2 }), gap: 0.1 },
          { key: 'title', label: 'Title', text: () => 'Fairy Garden', style: s('italic', { size: 52, min: 32 }) },
          { divider: 1.4, gap: 0.35 },
          { key: 'details', label: 'Details', text: (d) => [d.ordinal && `${d.ordinal} birthday`, d.dateShort].filter(Boolean).join('  ·  ') || null, style: s('eyebrow', { size: 12.5, min: 9, tracking: 240, color: 'ink' }), gap: 0.35 },
        ],
      },
    ],
  },

  // One face of a folded tent card (the sheet prints it twice, top half upside down).
  'food-tent': {
    art: [{ slot: 'tent-frame', box: [0, 0, 3.5, 2.1], fit: 'cover' }],
    shapes: [{ type: 'frame', inset: 0.14, color: 'rule', width: 0.5, unlessArt: 'tent-frame' }],
    stacks: [
      {
        box: [0.62, 0.5, 2.26, 1.1],
        items: [
          { key: 'dish', label: 'Dish name', text: (d) => d.item?.name, required: true, placeholder: 'Dish name', style: s('italic', { size: 19, min: 10, maxLines: 2 }) },
          { key: 'note', label: 'Note (e.g. nut-free)', text: (d) => d.item?.note || null, style: s('eyebrow', { size: 6.5, min: 5.5, maxLines: 2 }), gap: 0.06 },
        ],
      },
    ],
  },

  'favor-tag': {
    // The tag artwork is the shape itself: no paper colour behind it.
    noPaperWithArt: 'tag',
    art: [{ slot: 'tag', box: [0, 0, 2, 3] }],
    shapes: [
      { type: 'frame', inset: 0.1, color: 'rule', width: 0.5, unlessArt: 'tag' },
      { type: 'hole', cx: 1, cy: 0.3, r: 0.09, color: 'rule', unlessArt: 'tag' },
    ],
    stacks: [
      {
        box: [0.42, 1.28, 1.16, 1.15],
        items: [
          { key: 'thanks', label: 'Message', text: () => 'Thank you for fluttering by', style: s('italic', { size: 12.5, min: 8.5, maxLines: 3 }) },
          { key: 'from', label: 'From', field: 'childName', required: true, placeholder: 'Love, your child', text: (d) => d.name && `love, ${d.name}`, style: s('script', { size: 17, min: 9, maxLines: 2 }), gap: 0.08 },
        ],
      },
    ],
  },

  // Picture clues for younger children, rhyming clues for older ones.
  'clue-card': (d) =>
    d.young
      ? {
          art: [{ slot: d.item.art, box: [0.25, 0.72, 2.5, 1.63] }],
          shapes: [ruleFrame(0.14)],
          stacks: [
            { box: [0.3, 0.28, 2.4, 0.36], items: [{ key: 'number', label: 'Clue number', text: (x) => `Clue ${x.index + 1} of ${x.count}`, style: s('eyebrow', { size: 8, color: 'accent' }) }] },
            { box: [0.3, 2.6, 2.4, 1.3], items: [{ key: 'clue', label: 'Clue', text: (x) => x.item.short, required: true, style: s('italic', { size: 21, min: 12, maxLines: 2 }) }] },
            { box: [0.3, 4.2, 2.4, 0.4], items: [{ key: 'footer', label: 'Footer', text: () => 'Fairy treasure hunt', style: s('eyebrow', { size: 6.5 }) }] },
          ],
        }
      : {
          art: [{ slot: d.item.art, box: [0.55, 0.66, 1.9, 1.24] }],
          shapes: [ruleFrame(0.14)],
          stacks: [
            { box: [0.3, 0.26, 2.4, 0.3], items: [{ key: 'number', label: 'Clue number', text: (x) => `Clue ${x.index + 1} of ${x.count}`, style: s('eyebrow', { size: 8, color: 'accent' }) }] },
            {
              box: [0.36, 2.1, 2.28, 2.45],
              items: [{ key: 'clue', label: 'Clue', text: (x) => x.item.rhyme, required: true, style: s('italic', { size: 16, min: 10, maxLines: 6, leading: 1.3 }) }],
            },
          ],
        },

  'station-sign': {
    art: [border('border-portrait', 5, 7)],
    shapes: [ruleFrame(0.28, 'border-portrait')],
    stacks: [
      {
        box: [0.85, 1.3, 3.3, 4.6],
        items: [
          { key: 'label', label: 'Label', text: () => 'Activity station', style: s('eyebrow', { size: 8.5 }) },
          { key: 'activity', label: 'Activity', text: (d) => d.item?.name, required: true, placeholder: 'Activity name', style: s('script', { size: 46, min: 22, maxLines: 2 }), gap: 0.1 },
          { divider: 0.85, gap: 0.24 },
          { key: 'about', label: 'Description', text: (d) => d.item?.blurb, style: s('italic', { size: 14, min: 10, maxLines: 5 }), gap: 0.24 },
          { key: 'time', label: 'Time', text: (d) => d.item?.time, style: s('eyebrow', { size: 7.5 }), gap: 0.2 },
        ],
      },
    ],
  },

  // Name and age toppers sit in the empty wreath; picture toppers are art only.
  'cupcake-topper': (d) =>
    d.design === 'art'
      ? { art: [{ slot: `topper-${d.art}`, box: [0, 0, 2, 2] }], shapes: [{ type: 'circle', cx: 1, cy: 1, r: 0.84, color: 'rule', width: 0.6, unlessArt: `topper-${d.art}` }], stacks: [] }
      : {
          art: [{ slot: 'topper-ring', box: [0, 0, 2, 2] }],
          shapes: [{ type: 'circle', cx: 1, cy: 1, r: 0.84, color: 'rule', width: 0.6, unlessArt: 'topper-ring' }],
          stacks: [
            d.design === 'age' && d.age
              ? { box: [0.5, 0.5, 1.0, 1.0], items: [{ key: 'age', label: 'Age', text: (x) => String(x.age), style: s('display', { size: 60, min: 34, color: 'accent', leading: 1 }) }] }
              : { box: [0.48, 0.6, 1.04, 0.8], items: [{ key: 'name', label: 'Name', field: 'childName', required: true, placeholder: 'Name', text: (x) => x.name, style: s('script', { size: 28, min: 12, maxLines: 2 }) }] },
          ],
        },

  'thank-you': {
    art: [border('border-portrait', 4, 6)],
    shapes: [
      ruleFrame(0.22, 'border-portrait'),
      ...[3.3, 3.68, 4.06, 4.44].map((y) => ({ type: 'line', x1: 0.8, y1: y, x2: 3.2, y2: y, color: 'rule', width: 0.5 })),
    ],
    stacks: [
      {
        box: [0.6, 1.0, 2.8, 1.9],
        items: [
          { key: 'thanks', label: 'Headline', text: () => 'Thank you', style: s('script', { size: 52, min: 32 }) },
          { key: 'for', label: 'Line', text: () => 'for helping me celebrate', style: s('eyebrow', { size: 7.5 }), gap: 0.06 },
        ],
      },
      { box: [0.6, 4.6, 2.8, 0.6], items: [{ key: 'sign', label: 'Signature', field: 'childName', required: true, placeholder: 'Love, your child', text: (d) => d.name && `Love, ${d.name}`, style: s('script', { size: 21, min: 12 }) }] },
    ],
  },
}

export default {
  id: 'fairy-garden',
  themeId: 'fairy-garden',
  name: 'Fairy Garden',
  description: 'Watercolor toadstools, wildflowers and butterflies with a soft script.',
  variants,
  art: ART,
  layouts,
  clues,
  toppers: ['butterfly', 'bloom', 'toadstool', 'cupcake', 'wings', 'lavender'],
}
