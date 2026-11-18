// Stock photography (Unsplash, free under the Unsplash License — each verified
// as a free photo, not Unsplash+). Plain data so scripts/fetch-photos.mjs can read it.
// Credits are kept here; Unsplash doesn't require them but appreciates them.
export const photos = {
  kidsCandles: { id: 'As8zq82LBpw', alt: 'Three children blowing out candles on a birthday cake', credit: 'Nathan Dumlao' },
  partyHats: { id: 'YYXqBwvdoeI', alt: 'Two girls in sparkly party hats with a balloon', credit: 'Victoria Rodriguez' },
  pinkTable: { id: 'u_FetM6CuPo', alt: 'A long party table set with pink decorations and balloons', credit: 'Jose Marroquin' },
  cupcakes: { id: '-gDHgEcec6Q', alt: 'Pink cupcakes with Happy Birthday toppers', credit: 'Robert Anderson' },
  donutTower: { id: '9ou4URp__0s', alt: 'A tower of sprinkle donuts with birthday candles', credit: 'Shayna Douglas' },
  dinoParty: { id: 'eF_3z15RmWY', alt: 'Toy dinosaurs in party hats beside birthday cake', credit: 'Joyce Adams' },
  partyFlatlay: { id: 'MD_ha01Bk7c', alt: 'Party hats, plates and confetti on a colorful table', credit: 'Lidya Nada' },
  brightBalloons: { id: 'Hli3R6LKibo', alt: 'A ceiling of colorful party balloons', credit: 'Adi Goldstein' },
  seaTable: { id: 'WjgT2nQ9LK0', alt: 'Dessert table with blue balloons and ferns', credit: 'Jonathan Borba' },
  seaTreats: { id: 'pGM4sjt_BdQ', alt: 'Teal-frosted cupcakes with sprinkles' },
  seaShells: { id: 'JEo8Mr1sSmA', alt: 'A pile of pearly seashells' },
  starTreats: { id: 'Z4GQAHXer94', alt: 'Space-themed birthday cake and treats', credit: 'Jonathan Borba' },
  starTable: { id: '0EaC1vSDuEw', alt: 'Rocket-ship cake with planets and stars', credit: 'Jonathan Borba' },
  starLights: { id: '7Cb7ZVT4kf0', alt: 'Glowing star string lights' },
  teaTable: { id: 'ljapyesEe3U', alt: 'A table set for a tea party with flowers' },
  teaCups: { id: 'RbLjCVUk4zI', alt: 'Teapot, teacups and rose-print plates' },
  dinoTreats: { id: 'PWfwzN2p70g', alt: 'A toy dinosaur in a party hat on a cake' },
  dinoDecor: { id: 'Rs9ntEgZ8Sw', alt: 'Fruit tower and treats at a dinosaur party' },
  dinoFossil: { id: 'ZhVKeFCb6NE', alt: 'A spiral shell fossil' },
  rainbowTreats: { id: 'wnHeb_pRJBo', alt: 'Rainbow birthday cake with colorful candles' },
  picnicBlanket: { id: 'EgaPIySkcnM', alt: 'A picnic laid out on a blanket in the grass' },
  mossMushrooms: { id: 'JbstCu7FYlA', alt: 'Tiny mushrooms growing on a mossy trunk', credit: 'Yume Photography' },
}

// Whimavera's own images, bundled in src/assets/photos/<key>.jpg.
// `focus` is the CSS object-position used when the frame crops the image.
export const ownPhotos = {
  fairyHero: { alt: 'A fairy garden party table among flowers', focus: '45% 50%' },
  fairyTable: { alt: 'A long fairy garden table with moss, roses and a naked cake', focus: '50% 50%' },
  fairyGirlTable: { alt: 'A girl at a flower-filled fairy garden table', focus: '72% 40%' },
  fairyPortrait: { alt: 'A smiling girl in fairy wings and a flower crown', focus: '50% 35%' },
  fairyCupcake: { alt: 'A cupcake with a butterfly on a mossy table at golden hour', focus: '50% 60%' },
  fairyTreats: { alt: 'Rose cupcakes and a butterfly on a moss table runner', focus: '45% 65%' },
}
