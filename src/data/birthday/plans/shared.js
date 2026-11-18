// Pieces shared by every birthday plan. Themes supply their own content;
// lib/buildPlan.js assembles budget, checklist and timeline from these.

export const defaultBudget = [
  { id: 'decor', label: 'Decor & setup', share: 0.3, note: 'Backdrop, table styling, lighting' },
  { id: 'food', label: 'Food, cake & drinks', share: 0.3, note: 'Homemade cake + a simple spread' },
  { id: 'activities', label: 'Games & crafts', share: 0.15, note: 'Supplies for the activities' },
  { id: 'tableware', label: 'Tableware', share: 0.1, note: 'Plates, cups, napkins' },
  { id: 'favors', label: 'Favors', share: 0.1, note: 'A little something to take home' },
  { id: 'buffer', label: 'Breathing room', share: 0.05, note: 'For the inevitable extra' },
]

const BASE_CHECKLIST = {
  '3 weeks before': ['Set date, time and guest list', 'Send invitations', 'Decide DIY vs. ready-made for each item'],
  '2 weeks before': ['Order decor and tableware', 'Plan the menu and cake'],
  '1 week before': ['Confirm RSVPs & allergies', 'Assemble favor bags'],
  'Day before': ['Make a party playlist', 'Charge camera & lights'],
  'Party day': ['Set up zones 15 minutes before guests arrive', 'Assemble fresh food', 'Breathe — and enjoy it'],
}

/** Merge a theme's extra tasks into the shared checklist. */
export function buildChecklist(extras = {}) {
  return Object.entries(BASE_CHECKLIST).map(([when, tasks]) => ({
    when,
    tasks: [...tasks.slice(0, -1), ...(extras[when] || []), tasks[tasks.length - 1]],
  }))
}
