/**
 * YOUR IDENTITY - start here.
 *
 * Everything that says who you are lives in this file: name, handle, photo,
 * socials, email and the Home headline.
 *
 * Page-specific copy (projects, services, testimonials, FAQs) lives in the
 * other files in src/data/ and at the top of each view component.
 */

import { Briefcase, SealCheck, Clock, type Icon } from '@/components/slab'

export type SocialLink = {
  label: string
  href: string
  iconPath: string
}

/** A proof fact on the phone's Home: a glyph, a short value, a caption. */
export type Stat = { value: string; label: string; Icon: Icon }

export type Profile = {
  name: string
  /** First name, used in "Hi, I'm ___." on About. */
  firstName: string
  handle: string
  /** Short role line under the handle on phones. */
  role: string
  /** Square image. An SVG, WebP or PNG with a transparent background looks best. */
  avatarSrc: string
  /** Tooltip / screen-reader label on the verified tick next to your name. */
  verifiedLabel: string
  email: string
  location: string
  /** Three short proof facts shown on phones under the Home lede. */
  stats: Stat[]
  displayName: { line1: string; line2: string }
  hero: {
    body: string
    portraitSrc: string
    portraitAlt: string
  }
  socials: SocialLink[]
}

export const profile: Profile = {
  name: 'Ryan Golfeo',
  firstName: 'Ryan',
  handle: '@rgolfeo',
  role: 'Lead Generation & Virtual Assistant',
  avatarSrc: '/avatar.webp',
  verifiedLabel: '7+ years of client-facing experience',
  email: 'rgolfeo41@gmail.com',
  location: 'Pasig City, Philippines',
  stats: [
    { value: '7+ yrs', label: 'Client-facing experience', Icon: Briefcase },
    { value: '287', label: 'LinkedIn leads tracked', Icon: SealCheck },
    { value: 'GMT+8', label: 'US-hours overlap', Icon: Clock },
  ],
  // The intro types this line, then flies it into the Home headline.
  // Keep it short: two halves, 5-8 words total.
  displayName: { line1: 'I find the leads.', line2: 'You close the deals.' },
  hero: {
    body: 'Lead generation and virtual assistant support for founders and lean US teams: sourcing, outreach, CRM, and follow-through.',
    portraitSrc: '/avatar.webp',
    portraitAlt: 'Ryan Golfeo in a professional workspace',
  },
  socials: [
    { label: 'LinkedIn profile', href: 'https://www.linkedin.com/in/ryan-golfeo-48a11a330', iconPath: '/icons/linkedin.svg' },
    { label: 'Email Ryan', href: 'mailto:rgolfeo41@gmail.com', iconPath: '/icons/mail.svg' },
    { label: 'View resume', href: 'https://drive.google.com/file/d/1JB3KWuVM-rXMoP-nXxD5KnlpUORhomLc/view', iconPath: '/icons/resume.svg' },
  ],
}
