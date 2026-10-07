import type { CSSProperties } from 'react'
import { MagnetStraight, Timer, Trophy, CheckCircle } from '@/components/slab'
import type { Icon } from '@/components/slab'
import Autopilot, { TOOLS } from '@/components/Autopilot'

/**
 * ServicesGrid - the Services view on one glass sheet.
 *
 * Three bands, top to bottom: your three-step method (on a dark plate so it
 * is the first thing the eye lands on), the five services as cards that carry
 * the marks of what each one is built with, and the live automation demo
 * scaled into whatever height is left. Same object language as Home and
 * Projects: the glass, the bento card, plated marks, orange for the index
 * and the accent.
 *
 */

/* ---------- The method ---------- */

type Stage = {
  index: string
  label: string
  body: string
  Icon: Icon
  chips: string[]
}

const STAGES: Stage[] = [
  {
    index: '01',
    label: 'Align',
    body: 'Clarify goals, audience, tools, and hours, then set up trackers, templates, and an update rhythm.',
    Icon: MagnetStraight,
    chips: ['Goals', 'Target profile', 'Trackers', 'SOPs'],
  },
  {
    index: '02',
    label: 'Execute',
    body: 'Run the work every day: sourcing, verification, outreach, CRM updates, and follow-ups.',
    Icon: Timer,
    chips: ['Sourcing', 'Outreach', 'Follow-up'],
  },
  {
    index: '03',
    label: 'Report',
    body: 'You get clear start and end updates: what moved, what is blocked, and the next actions that matter.',
    Icon: Trophy,
    chips: ['Daily updates', 'Pipeline view', 'Next actions'],
  },
]

/* ---------- The services ---------- */

// Tool marks from /public/icons.
const LINKEDIN = '/icons/linkedin-color.svg'
const SHEETS = '/icons/sheets.svg'
const OPENAI = '/icons/openai.svg'
const OUTLOOK = '/icons/outlook.svg'
const CANVA = '/icons/canva.svg'
const GHL = '/icons/gohighlevel.png'
const GWS = '/icons/googleworkspace.svg'
const ZOOM = '/icons/zoom.svg'
const SLACK = '/icons/ai/slack-color.svg'
const LOOM = '/icons/loom.svg'

type Service = {
  index: string
  title: string
  description: string
  chip: string
  logos: string[]
  bullets: string[]
}

const SERVICES: Service[] = [
  {
    index: '01',
    title: 'Qualified lead sourcing',
    description: 'Targeted prospect lists built around relevance, decision-maker fit, and clear next actions.',
    chip: 'Find the right people',
    logos: [LINKEDIN, SHEETS, OPENAI],
    bullets: ['Verified individual professional emails', 'No duplicates across batches', 'Fit and priority notes on every record'],
  },
  {
    index: '02',
    title: 'LinkedIn & email outreach',
    description: 'Professional outreach that keeps conversations moving without sounding robotic.',
    chip: 'Start conversations',
    logos: [LINKEDIN, OUTLOOK, CANVA],
    bullets: ['Personalized connection requests', 'Email outreach and follow-ups', 'Company LinkedIn content support'],
  },
  {
    index: '03',
    title: 'CRM & tracker upkeep',
    description: 'Clean records, accurate statuses, and visible next steps for reliable follow-through.',
    chip: 'Know what happens next',
    logos: [GHL, SHEETS, GWS],
    bullets: ['Pipeline stages kept current', 'Lead scoring and prioritization', 'Dashboards your team can read'],
  },
  {
    index: '04',
    title: 'Calendar & inbox support',
    description: 'Follow-ups surfaced and communication organized so admin does not take over the day.',
    chip: 'Protect your time',
    logos: [OUTLOOK, ZOOM, GWS],
    bullets: ['Inbox triage and reply drafts', 'Scheduling across US time zones', 'Reminders that keep leads warm'],
  },
  {
    index: '05',
    title: 'Operations follow-through',
    description: 'Task execution, documented updates, and handoffs that keep small teams aligned.',
    chip: 'Keep handoffs intact',
    logos: [SLACK, LOOM, GWS],
    bullets: ['Daily start and end reports', 'SOPs and reusable templates', 'Credentialing and admin support'],
  },
]

/** The tool marks, stacked horizontally on white tiles (same as Projects). */
function Marks({ logos }: { logos: string[] }) {
  return (
    <span className="bento__logos" aria-hidden="true">
      {logos.map((src) => (
        <span key={src} className="bento__logo">
          <img src={src} alt="" width={22} height={22} decoding="async" />
        </span>
      ))}
    </span>
  )
}

/* ---------- The page ---------- */

export default function ServicesGrid() {
  return (
    <section className="pgrid sgrid" aria-labelledby="services-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Services</span>
        <h1 className="pgrid__title" id="services-title">
          Support built around business outcomes.
        </h1>
        <p className="pgrid__lede">
          Better prospecting, cleaner execution, and stronger follow-up for founders and lean US teams.
        </p>
      </header>

      <div className="home__glass sgrid__glass">
        {/* One dark plate, the headline on the left, the three stages wired
            in order on the right with a signal running them. */}
        <div className="sgrid__method" aria-labelledby="method-title">
          <div className="sgrid__method-copy">
            <span className="sgrid__method-eyebrow">How I work</span>
            <h2 className="sgrid__method-title" id="method-title">
              Align. Execute. Report.
              <br />
              <span>A rhythm that keeps work moving.</span>
            </h2>
            <p className="sgrid__method-sub">
              Clear goals, steady execution, and visible reporting, so you always know what moved and what needs attention.
            </p>
          </div>

          <ol className="sgrid__stages" role="list">
            {STAGES.map((s, i) => {
              const StageIcon = s.Icon
              return (
                <li key={s.index} className="sgrid__stage" style={{ '--i': i } as CSSProperties}>
                  <span className="sgrid__stage-ghost" aria-hidden="true">{s.index}</span>
                  <span className="sgrid__stage-icon" aria-hidden="true">
                    <StageIcon size={22} weight="duotone" />
                  </span>
                  <h3 className="sgrid__stage-label">{s.label}.</h3>
                  <p className="sgrid__stage-body">{s.body}</p>
                  <ul className="sgrid__stage-chips" role="list" aria-label={`${s.label} touches`}>
                    {s.chips.map((c) => (
                      <li key={c} className="sgrid__stage-chip">{c}</li>
                    ))}
                  </ul>
                </li>
              )
            })}
          </ol>
        </div>

        {/* Five cards, each carrying the marks of what it is built with. */}
        <div className="sgrid__offers">
          <div className="sgrid__offers-head">
            <h2 className="sgrid__offers-title">Five ways I can help.</h2>
            <p className="sgrid__offers-sub">Start with one. Add more as your team grows.</p>
          </div>
          <ul className="bento sgrid__services" role="list">
            {SERVICES.map((s) => (
              <li key={s.title} className="bento__card sgrid__service">
                <span className="bento__head">
                  <span className="sgrid__service-top">
                    <Marks logos={s.logos} />
                    <span className="sgrid__service-index" aria-hidden="true">{s.index} / 05</span>
                  </span>
                  <span className="bento__title">{s.title}</span>
                  <span className="bento__desc">{s.description}</span>
                </span>
                <span className="sgrid__chip" aria-hidden="true">{s.chip}</span>
                <ul className="sgrid__bullets" role="list">
                  {s.bullets.map((b) => (
                    <li key={b} className="sgrid__bullet">
                      <CheckCircle size={15} weight="duotone" aria-hidden="true" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        {/* The live workflow. Its caption and the tool chips sit in a header
            above the window, so the canvas gets the whole glass width. */}
        <div className="sgrid__flow">
          <header className="sgrid__flow-head">
            <div className="sgrid__flow-copy">
              <span className="sgrid__flow-eyebrow">Live workflow</span>
              <h2 className="sgrid__flow-title">From prospect to follow-up.</h2>
              <p className="sgrid__flow-sub">
                A simplified view of the outreach workflow I run for clients: source, verify, reach out, track, and follow up.
              </p>
            </div>
            <ul className="sgrid__flow-tools" role="list" aria-label="Tools that power this flow">
              {TOOLS.map(({ Icon: ToolIcon, label }) => (
                <li key={label} className="sgrid__flow-tool">
                  <ToolIcon size={14} weight="duotone" aria-hidden="true" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </header>
          <div className="sgrid__flow-main">
            <Autopilot compact maxScale={1.08} />
          </div>
        </div>
      </div>
    </section>
  )
}
