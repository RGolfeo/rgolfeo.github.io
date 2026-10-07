/**
 * The systems tree shown in the Projects "systems" pop-up (and as chips on
 * Home and in the Projects bento card).
 *
 * This file is the ONLY place node copy lives. AIStack.tsx and AIStackGrid.tsx
 * render whatever shape they find here, so swapping in content is a data edit
 * and never a JSX edit. Keep the exported names and types stable.
 *
 * Shape rules:
 * - The root is you. Its children are the categories (branches).
 * - A branch with `status` is itself a system; a branch without one is a
 *   group whose children are the systems.
 * - Status is what the thing actually does today: "Live" (in use by others),
 *   "Internal" (works, you use it), "Beta".
 * - Logo marks in AIStackGrid.tsx are keyed by the node `id` below.
 */

import {
  Sparkle,
  Coffee,
  Robot,
  Article,
  FilmSlate,
  UsersThree,
  Database,
  SlackLogo,
  MagnifyingGlass,
  ChatCircleDots,
  FlowArrow,
  PhoneCall,
  Browser,
  Broadcast,
  Timer,
} from '@/components/slab'
import type { Icon } from '@/components/slab'
import { profile } from '@/data/profile'

export type StackStatus = 'Live' | 'Internal' | 'Beta'

/** A vendor mark, masked to a single ink colour so the row reads as one set
 *  rather than a rainbow of brand palettes. Only marks that already exist in
 *  public/icons are listed. */
export type StackLogo = { src: string; name: string }

export type StackNode = {
  id: string
  name: string
  /** One plain sentence a non-technical client understands. */
  what: string
  /** Real stack / model / where it runs. Rendered small and muted. */
  stack?: string
  status?: StackStatus
  /** Phosphor glyph for the card's mark tile. Every node has one. */
  Icon: Icon
  logos?: StackLogo[]
  children?: StackNode[]
}

const ANTHROPIC: StackLogo = { src: '/icons/anthropic.svg', name: 'Anthropic' }
const OPENAI: StackLogo = { src: '/icons/openai.svg', name: 'OpenAI' }
const SLACK: StackLogo = { src: '/icons/slack.svg', name: 'Slack' }
const LINKEDIN: StackLogo = { src: '/icons/linkedin.svg', name: 'LinkedIn' }

/** Single root: Ryan. Branches are the categories. */
export const aiStack: StackNode = {
  id: 'root',
  Icon: Sparkle,
  name: profile.name,
  what: 'The repeatable systems behind my lead generation and support work.',
  stack: 'Lead Generation & Virtual Assistant',
  children: [
    {
      id: 'project-a',
      Icon: Coffee,
      logos: [LINKEDIN],
      name: 'Daily Prospect Batches',
      what: 'Verified, outreach-ready professionals delivered in clean batches, deduplicated and ready to contact.',
      stack: 'LinkedIn, license lookups, Google Sheets',
      status: 'Live',
    },
    {
      id: 'category-one',
      Icon: Robot,
      name: 'Outreach',
      what: 'Getting from a verified prospect to a real conversation.',
      children: [
        {
          id: 'project-b',
          Icon: Article,
          logos: [LINKEDIN],
          name: 'LinkedIn Outreach Board',
          what: 'Tracks every lead with priority, request status, and the next action in one view.',
          stack: 'LinkedIn, Sales Navigator, Google Sheets',
          status: 'Live',
        },
        {
          id: 'project-c',
          Icon: FilmSlate,
          logos: [OPENAI],
          name: 'Email Outreach & Follow-ups',
          what: 'Personalized emails with a set follow-up rhythm, so no reply slips through.',
          stack: 'Outlook, templates, tracker',
          status: 'Live',
        },
        {
          id: 'project-d',
          Icon: UsersThree,
          logos: [LINKEDIN],
          name: 'Speaker & Partner Outreach',
          what: 'Reaching software and industry partners to set up webinar and speaking sessions for a client.',
          stack: 'Email, LinkedIn, event briefs',
          status: 'Live',
        },
      ],
    },
    {
      id: 'category-two',
      Icon: Database,
      name: 'Pipeline & CRM',
      what: 'Keeping every record clean, current, and easy to act on.',
      children: [
        {
          id: 'project-e',
          Icon: SlackLogo,
          logos: [SLACK],
          name: 'Master Prospect Pipeline',
          what: 'Organizes research by record type, specialty, location, source, and next step.',
          stack: 'Google Sheets, CRM',
          status: 'Live',
        },
        {
          id: 'project-f',
          Icon: MagnifyingGlass,
          logos: [OPENAI],
          name: 'Lead Scoring',
          what: 'Tiers prospects by fit so the highest-value leads get attention first.',
          stack: 'Tier A / Tier B scoring',
          status: 'Live',
        },
      ],
    },
    {
      id: 'category-three',
      Icon: ChatCircleDots,
      name: 'Admin & Operations',
      what: 'The support work that keeps a lean team moving.',
      children: [
        {
          id: 'project-g',
          Icon: FlowArrow,
          logos: [ANTHROPIC],
          name: 'Credentialing Support',
          what: 'Application status checks, document verification, CAQH and NPI lookups, and tracking-log updates.',
          stack: 'CAQH ProView, NPI Registry, state boards',
          status: 'Live',
        },
        {
          id: 'project-h',
          Icon: PhoneCall,
          logos: [SLACK],
          name: 'Calendar & Inbox',
          what: 'Scheduling across US time zones, inbox triage, and meeting follow-ups.',
          stack: 'Outlook, Zoom, WhatsApp',
          status: 'Live',
        },
        {
          id: 'project-i',
          Icon: Browser,
          logos: [OPENAI],
          name: 'Daily & Weekly Reports',
          what: 'Start and end-of-shift updates plus weekly summaries, in the client time zone.',
          stack: 'Google Docs, Google Sheets',
          status: 'Live',
        },
      ],
    },
    {
      id: 'project-j',
      Icon: Broadcast,
      logos: [OPENAI, ANTHROPIC],
      name: 'AI-Assisted Research',
      what: 'AI tools speed up research, drafting, and SOPs, and every fact still gets checked by hand.',
      stack: 'ChatGPT, Claude',
      status: 'Internal',
      children: [
        {
          id: 'project-k',
          Icon: Timer,
          name: 'SOPs & Templates',
          what: 'Reusable intake notes, outreach templates, and step-by-step SOPs.',
          stack: 'Google Docs',
          status: 'Internal',
        },
      ],
    },
  ],
}
