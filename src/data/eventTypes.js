// Event-type registry. Each celebration category plugs in its own
// questionnaire, themes and plan library. Only "birthday" is live today;
// weddings and homeschool modules can be added by registering a new entry
// with the same shape — screens read from this registry, not from hard-coded data.
import { birthdayQuestions, defaultBirthdayAnswers } from './birthday/questions.js'
import { birthdayThemes } from './birthday/themes.js'
import { birthdayPlans } from './birthday/plans.js'

export const eventTypes = {
  birthday: {
    id: 'birthday',
    label: "Children's Birthdays",
    status: 'live',
    questions: birthdayQuestions,
    defaultAnswers: defaultBirthdayAnswers,
    themes: birthdayThemes,
    plans: birthdayPlans,
  },
  wedding: {
    id: 'wedding',
    label: 'Weddings & Showers',
    status: 'coming-soon',
    blurb: 'Intimate gatherings, garden showers and heirloom details.',
  },
  holiday: {
    id: 'holiday',
    label: 'Holidays',
    status: 'coming-soon',
    blurb: 'Seasonal tables and traditions worth keeping.',
  },
  homeschool: {
    id: 'homeschool',
    label: 'Learning Modules',
    status: 'coming-soon',
    blurb: 'Hands-on, theme-based learning adventures for curious minds.',
  },
}

export const liveEventType = eventTypes.birthday
