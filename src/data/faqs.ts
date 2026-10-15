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
    a: 'I am a virtual assistant for founders and lean US teams: lead generation and outreach, CRM and reporting, healthcare credentialing support, and everyday admin and customer support.',
  },
  {
    q: 'How fast can you start?',
    a: 'Usually within a week. I am in Pasig City, Philippines (GMT+8) and regularly work US Eastern, Central, and Pacific hours, so we can set a schedule that fits your team.',
  },
  {
    q: 'How do you charge?',
    a: 'I work part-time, contract, or project-based. After a short call about your goals and volume, I send a simple quote with the scope and hours.',
  },
  {
    q: 'What if my task is not on your list?',
    a: 'Ask me. Most research, admin, and support work is a quick learn for me, and I will tell you honestly if something is outside what I can do well.',
  },
  {
    q: 'What happens after I write?',
    a: 'I reply within one business day to set up a quick call. We agree on goals, tools, and reporting, and I can start on a short trial task.',
  },
]
