export type QA = { q: string; a: string }

/**
 * The questions people ask before they email. One list, used by the FAQ
 * accordion on the Contact view (and the legacy long-scroll FAQ section).
 * Five questions, two or three sentences each: the accordion sits in a
 * fixed panel and more than that pushes the email row off the plate.
 */
export const FAQS: QA[] = [
  {
    q: 'What do you do?',
    a: 'Lead generation and virtual assistant support: prospect research, LinkedIn and email outreach, CRM and tracker upkeep, and admin follow-through. Most of my clients are founders and lean US teams.',
  },
  {
    q: 'How fast can you start?',
    a: 'Usually within a week. I work remotely and keep flexible hours that overlap with US time zones, so we can set a schedule that fits your team.',
  },
  {
    q: 'How do you charge?',
    a: 'I work part-time, contract, or project-based. After a short call about your goals and volume, I send a simple quote with the scope and hours.',
  },
  {
    q: 'Where are you based?',
    a: 'Pasig City, Philippines (GMT+8). I regularly work US Eastern, Central, and Pacific hours.',
  },
  {
    q: 'What happens after I write?',
    a: 'I reply within one business day to set up a quick call. We agree on goals, tools, and reporting, and I can start on a short trial task.',
  },
]
