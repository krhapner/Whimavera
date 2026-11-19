/**
 * Party details for printables — stored separately from quiz answers and
 * from the design. Only what the parent provides (or the quiz recorded) is
 * used; nothing is invented.
 */
export const DETAIL_FIELDS = [
  { key: 'childName', label: 'Child’s name', placeholder: 'e.g. Olivia', maxLength: 28 },
  { key: 'age', label: 'Age they’re turning', type: 'number', placeholder: 'e.g. 6', min: 1, max: 18 },
  { key: 'date', label: 'Party date', type: 'date' },
  { key: 'startTime', label: 'Start time', type: 'time' },
  { key: 'endTime', label: 'End time', type: 'time', hint: 'Filled from your party length — change it if you like.' },
  { key: 'venue', label: 'Place', placeholder: 'e.g. The Hapner backyard', maxLength: 60 },
  { key: 'address', label: 'Address', placeholder: 'Street, city', maxLength: 80 },
  { key: 'rsvpName', label: 'RSVP to', placeholder: 'e.g. Krista', maxLength: 30 },
  { key: 'rsvpContact', label: 'RSVP phone, email or link', placeholder: 'e.g. 303-555-0101', maxLength: 60 },
  { key: 'rsvpBy', label: 'RSVP by', type: 'date' },
]

export const emptyDetails = () => ({ childName: '', age: '', date: '', startTime: '', endTime: '', venue: '', address: '', rsvpName: '', rsvpContact: '', rsvpBy: '' })

const WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen']
const ORD = ['', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth']

function parseDate(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '')
  return m ? new Date(Date.UTC(+m[1], +m[2] - 1, +m[3])) : null
}
const fmtDate = (d, opts) => d.toLocaleDateString('en-US', { timeZone: 'UTC', ...opts })

function fmtTime(t) {
  const m = /^(\d{1,2}):(\d{2})/.exec(t || '')
  if (!m) return null
  const h = +m[1]
  return { text: `${((h + 11) % 12) + 1}${m[2] === '00' ? '' : `:${m[2]}`}`, pm: h >= 12 }
}

/** Add minutes to "HH:MM". */
export function addMinutes(t, mins) {
  const m = /^(\d{1,2}):(\d{2})/.exec(t || '')
  if (!m) return ''
  const total = (+m[1] * 60 + +m[2] + mins) % (24 * 60)
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`
}

/** Readable values for layouts, from stored details (+ quiz answers). */
export function formatDetails(details = {}, answers = {}) {
  const name = (details.childName || '').trim().replace(/\s+/g, ' ')
  const ageNum = Number(details.age)
  const age = Number.isInteger(ageNum) && ageNum > 0 && ageNum <= 18 ? ageNum : null
  const date = parseDate(details.date)
  const start = fmtTime(details.startTime)
  const end = fmtTime(details.endTime || (details.startTime && answers.duration ? addMinutes(details.startTime, Number(answers.duration)) : ''))
  const time = start ? (end ? `${start.text}${start.pm === end.pm ? '' : start.pm ? ' pm' : ' am'} – ${end.text} ${end.pm ? 'pm' : 'am'}` : `${start.text} ${start.pm ? 'pm' : 'am'}`) : null
  const rsvpBy = parseDate(details.rsvpBy)
  const who = (details.rsvpName || '').trim()
  const how = (details.rsvpContact || '').trim()
  const rsvpParts = [who || how ? `RSVP${who ? ` to ${who}` : ''}${how ? `${who ? ' · ' : ' '}${how}` : ''}` : null, rsvpBy ? `by ${fmtDate(rsvpBy, { month: 'long', day: 'numeric' })}` : null].filter(Boolean)
  // Picture clues until children read confidently (about age 7).
  const young = age != null ? age <= 6 : ['1-2', '3-5'].includes(answers.ageRange)
  return {
    name: name || null,
    possessive: name ? `${name}’${/s$/i.test(name) ? '' : 's'}` : null,
    age,
    ageWord: age != null ? WORDS[age] : null,
    ordinal: age != null ? ORD[age][0].toUpperCase() + ORD[age].slice(1) : null,
    dateLong: date ? fmtDate(date, { weekday: 'long', month: 'long', day: 'numeric' }) : null,
    dateShort: date ? fmtDate(date, { month: 'long', day: 'numeric' }) : null,
    time,
    venue: (details.venue || '').trim() || null,
    address: (details.address || '').trim() || null,
    rsvpLine: rsvpParts.length ? rsvpParts.join(' ') : null,
    young,
  }
}
