import type { CSSProperties } from 'react'
import { ArrowUpRight, MapPin } from '@/components/slab'
import { profile } from '@/data/profile'

/**
 * AboutGrid - the About view as a fixed viewport.
 *
 * One glass sheet, two columns: who you are on the left, the illustration
 * on the right. Sized to the panel, so nothing here scrolls.
 *
 * The left column is a ladder, not a paragraph block: one display statement,
 * one line of context, then the four things you do - each carrying the marks
 * of the tools it is built with. The tools are the proof, so they are the
 * visual. Swap the marks below for your own (any square SVG/PNG in public/).
 */

const LINKEDIN = { src: '/icons/linkedin-color.svg', name: 'LinkedIn' }
const SHEETS = { src: '/icons/sheets.svg', name: 'Google Sheets' }
const CHATGPT = { src: '/icons/openai.svg', name: 'ChatGPT' }
const OUTLOOK = { src: '/icons/outlook.svg', name: 'Outlook' }
const CANVA = { src: '/icons/canva.svg', name: 'Canva' }
const GHL = { src: '/icons/gohighlevel.png', name: 'GoHighLevel' }
const GWS = { src: '/icons/googleworkspace.svg', name: 'Google Workspace' }
const ZOOM = { src: '/icons/zoom.svg', name: 'Zoom' }
const SLACK = { src: '/icons/ai/slack-color.svg', name: 'Slack' }
const LOOM = { src: '/icons/loom.svg', name: 'Loom' }
const CLAUDE = { src: '/icons/ai/claude-color.svg', name: 'Claude' }

type Capability = {
  index: string
  title: string
  marks: { src: string; name: string }[]
}

const CAPABILITIES: Capability[] = [
  {
    index: '01',
    title: 'Lead sourcing & research',
    marks: [LINKEDIN, SHEETS, CHATGPT],
  },
  {
    index: '02',
    title: 'LinkedIn & email outreach',
    marks: [LINKEDIN, OUTLOOK, CANVA],
  },
  {
    index: '03',
    title: 'CRM, trackers & reporting',
    marks: [GHL, SHEETS, GWS, CLAUDE],
  },
  {
    index: '04',
    title: 'Executive & admin support',
    marks: [OUTLOOK, ZOOM, SLACK, LOOM],
  },
]

export default function AboutGrid() {
  return (
    <section className="pgrid agrid" aria-labelledby="about-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">About</span>
        <h1 className="pgrid__title" id="about-title">
          {`Hi, I’m ${profile.firstName}.`}
        </h1>
        <p className="pgrid__lede">
          Lead generation and virtual assistant, based in the Philippines, working US hours.
        </p>
      </header>

      <div className="home__glass agrid__glass">
        <div className="agrid__copy">
          <p className="agrid__lead">
            More than a task list.
            <span> Reliable support for work that cannot afford to stall.</span>
          </p>

          <p className="agrid__note">
            <strong>Seven years in client-facing work</strong> across customer experience,
          financial operations, and remote support taught me to communicate clearly and stay
          dependable under pressure. Today I bring that to lead generation and executive support for
          founders and lean teams.
          </p>

          <ul className="agrid__caps" role="list">
            {CAPABILITIES.map((c) => (
              <li key={c.index} className="agrid__cap">
                <span className="agrid__cap-marks">
                  {c.marks.map((m, i) => (
                    <span
                      key={m.name}
                      className="agrid__mark"
                      style={{ '--i': c.marks.length - i } as CSSProperties}
                    >
                      <img src={m.src} alt={m.name} loading="lazy" decoding="async" />
                    </span>
                  ))}
                </span>
                <span className="agrid__cap-title">{c.title}</span>
                <span className="agrid__cap-index" aria-hidden="true">
                  {c.index}
                </span>
              </li>
            ))}
          </ul>

          {/* One plate, two cells sharing a mark / title / meta anatomy. */}
          <div className="agrid__bar">
            <span className="agrid__cell">
              <span className="agrid__cell-mark agrid__cell-mark--img">
                <img src="/badge-experience.svg" alt="" loading="lazy" decoding="async" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">7+ years experience</span>
                <span className="agrid__cell-meta">Sutherland, Verizon, TaskUs, Cognizant</span>
              </span>
            </span>

            <span className="agrid__cell">
              <span className="agrid__cell-mark">
                <MapPin size={16} weight="fill" aria-hidden="true" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">{profile.location}</span>
                <span className="agrid__cell-meta">GMT+8 · flexible for US hours</span>
              </span>
            </span>

            <a className="agrid__cell agrid__cell--wide" href="https://www.linkedin.com/in/ryan-golfeo-48a11a330" target="_blank" rel="noopener noreferrer">
              <span className="agrid__cell-mark agrid__cell-mark--plain">
                <img src="/icons/linkedin-color.svg" alt="" loading="lazy" decoding="async" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">Connect on LinkedIn</span>
                <span className="agrid__cell-meta">Open to part-time, contract, and project work</span>
              </span>
              <ArrowUpRight className="agrid__cell-go" size={15} weight="bold" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="agrid__portrait">
          <img
            src={profile.avatarSrc}
            alt="Ryan Golfeo"
            loading="eager"
            decoding="async"
            width={400}
            height={400}
          />
        </div>
      </div>
    </section>
  )
}
