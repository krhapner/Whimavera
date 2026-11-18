// Stock photography (Unsplash, free under the Unsplash License).
// Images are hot-linked by photo id; if one can't load (offline, or a host that
// blocks remote images), <Scene> falls back to its illustrated version automatically.
// To self-host later: download each image into /public/photos and change `url()`.

export const photos = {
  blushCake: { id: 'J5zOVRff6Ag', alt: 'White frosted cake with blush flowers on a lace doily' },
  floralCake: { id: 'F873DfKOB6U', alt: 'Cream and pink cake adorned with flowers on a glass stand' },
  layerCake: { id: '22JxStzTxwo', alt: 'Three-layer cake with flower accents' },
  tableSetting: { id: 'uUivvH9n73w', alt: 'A birthday table setting with decorations', credit: 'Trazos' },
  softBalloons: { id: 'inXo3N90wgI', alt: 'Balloons in soft colors', credit: 'Aedrian Salazar' },
  pastelSetup: { id: 'k07fCdkYiJk', alt: 'Pastel balloons and a party hat on a cozy floor setup' },
  redMushroom: { id: 'hzbS8PmXCLQ', alt: 'A red toadstool in a lush green field', credit: 'Kier in Sight Archives' },
  mossMushrooms: { id: 'JbstCu7FYlA', alt: 'Tiny mushrooms growing on a mossy trunk', credit: 'Yume Photography' },
  whiteMushroom: { id: '1ll1wdDj5r8', alt: 'White mushroom on moss', credit: 'Andrea Scully' },
}

export const photoUrl = (key, w = 1200) => {
  const p = photos[key]
  return p ? `https://unsplash.com/photos/${p.id}/download?w=${w}` : null
}
