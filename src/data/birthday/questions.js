// Questionnaire definition — rendered generically by <Questionnaire />.
// Field types: 'single' (choose one), 'multi' (choose several), 'themes', 'range'.
export const birthdayQuestions = [
  {
    id: 'ageRange',
    type: 'single',
    eyebrow: 'Step one',
    title: 'How old is the guest of honor turning?',
    options: [
      { value: '1-2', label: '1 – 2', note: 'Little ones' },
      { value: '3-5', label: '3 – 5', note: 'Preschool magic' },
      { value: '6-8', label: '6 – 8', note: 'Big imaginations' },
      { value: '9-12', label: '9 – 12', note: 'Tweens' },
    ],
  },
  {
    id: 'interests',
    type: 'multi',
    eyebrow: 'Step two',
    title: 'How do they love to play?',
    hint: 'Choose as many as you like — we’ll build the games and activities around these.',
    options: [
      { value: 'crafts', label: 'Crafting & making' },
      { value: 'cooking', label: 'Cooking & decorating treats' },
      { value: 'active', label: 'Running-around games' },
      { value: 'music', label: 'Music & dancing' },
      { value: 'pretend', label: 'Dress-up & pretend play' },
      { value: 'hunts', label: 'Treasure hunts & puzzles' },
      { value: 'science', label: 'Science & experiments' },
      { value: 'outdoors', label: 'Exploring outdoors' },
      { value: 'quiet', label: 'Stories & quiet play' },
    ],
  },
  {
    id: 'theme',
    type: 'themes',
    eyebrow: 'Step three',
    title: 'Pick a theme that feels like them.',
    hint: 'Not sure? Fairy Garden is a crowd favorite.',
  },
  {
    id: 'guestCount',
    type: 'range',
    eyebrow: 'Step four',
    title: 'How many little guests?',
    min: 4,
    max: 30,
    step: 1,
    format: (v) => `${v} guests`,
  },
  {
    id: 'budget',
    type: 'range',
    eyebrow: 'Step five',
    title: "What's your total budget?",
    hint: 'Everything — decor, food, favors and supplies.',
    min: 100,
    max: 1000,
    step: 25,
    format: (v) => `$${v}`,
  },
  {
    id: 'location',
    type: 'single',
    eyebrow: 'Step six',
    title: 'Where will you celebrate?',
    options: [
      { value: 'backyard', label: 'Backyard or garden' },
      { value: 'home', label: 'At home, indoors' },
      { value: 'park', label: 'Park or pavilion' },
      { value: 'venue', label: 'Rented venue' },
    ],
  },
  {
    id: 'style',
    type: 'single',
    eyebrow: 'Step seven',
    title: 'Do you prefer to make or to buy?',
    options: [
      { value: 'diy', label: 'Mostly DIY', note: 'I love a project' },
      { value: 'mix', label: 'A thoughtful mix', note: 'Some of each' },
      { value: 'ready', label: 'Ready-made', note: 'Keep it simple' },
    ],
  },
  {
    id: 'prepTime',
    type: 'single',
    eyebrow: 'Final step',
    title: 'How much prep time do you have?',
    options: [
      { value: 'few-hours', label: 'A few hours' },
      { value: 'weekend', label: 'A weekend' },
      { value: 'two-weeks', label: 'Two weeks or more' },
    ],
  },
]

// The featured example: Fairy Garden, age 6, 12 guests, $300.
export const defaultBirthdayAnswers = {
  ageRange: '6-8',
  interests: ['crafts', 'pretend', 'hunts'],
  theme: 'fairy-garden',
  guestCount: 12,
  budget: 300,
  location: 'backyard',
  style: 'mix',
  prepTime: 'weekend',
}
