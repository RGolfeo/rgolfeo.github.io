import { profile } from '@/data/profile'

/**
 * "Book a call" everywhere on the site goes through here.
 *
 * With profile.bookingUrl set (a Google Calendar booking page, Calendly...)
 * the button opens that page. Until then it opens a short, pre-filled email
 * asking for a call, so the button is never a dead end.
 */

export const callIsExternal = () => profile.bookingUrl.trim() !== ''

export function callHref(): string {
  if (callIsExternal()) return profile.bookingUrl.trim()
  const subject = 'Intro call request'
  const body = [
    `Hi ${profile.firstName},`,
    '',
    'I would like to book a 15-minute intro call.',
    '',
    'What I need help with:',
    'Times that work for me (with my time zone):',
    '',
    'Thanks,',
  ].join('\n')
  return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
