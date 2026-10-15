import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, MapPin, Clock, ClipboardText, ShieldCheck, Lightning, Handshake, CalendarCheck, FilePdf, SealCheck } from '@/components/slab'
import type { Icon } from '@/components/slab'
import { callHref, callIsExternal } from '@/lib/booking'
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
    title: 'Lead generation & outreach',
    marks: [LINKEDIN, CHATGPT, OUTLOOK, CANVA],
  },
  {
    index: '02',
    title: 'CRM, trackers & reporting',
    marks: [GHL, SHEETS, GWS, CLAUDE],
  },
  {
    index: '03',
    title: 'Healthcare admin & credentialing',
    marks: [SHEETS, OUTLOOK, ZOOM],
  },
  {
    index: '04',
    title: 'Admin & customer support',
    marks: [GWS, ZOOM, SLACK, LOOM],
  },
]

/* Why a team gains from working with Ryan. Each point rests on something
   real in his background, not on a promise he cannot show. */
type Value = { title: string; body: string; Icon: Icon }

const VALUES: Value[] = [
  { title: 'Works your hours', body: 'Overlaps US Eastern to Pacific time and replies within one business day.', Icon: Clock },
  { title: 'You always know what moved', body: 'Start and end-of-shift updates: done, blocked, and next.', Icon: ClipboardText },
  { title: 'Careful with sensitive data', body: 'Seven years of compliance-driven work in finance, telecom, and healthcare.', Icon: ShieldCheck },
  { title: 'Learns your tools fast', body: 'Picks up your CRM, trackers, and SOPs quickly, and flags what is new.', Icon: Lightning },
  { title: 'Low-risk to start', body: 'Begin with a short trial task, then add hours as trust builds.', Icon: Handshake },
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
          Virtual assistant in Pasig City, Philippines, working US hours.
        </p>
      </header>

      <div className="home__glass agrid__glass">
        <div className="agrid__copy">
          <p className="agrid__lead">
            One assistant, many hats.
            <span> Steady support for the work that keeps a small team moving.</span>
          </p>

          <p className="agrid__note">
            <strong>Seven years of US client work</strong> at Sutherland, Verizon, TaskUs, and Cognizant
            taught me to communicate clearly, document carefully, and stay calm under pressure. In 2026 I went
            freelance: I run lead generation for a healthcare credentialing firm and now support its
            credentialing work too. I learn new tools fast, and I say so when something is new to me.
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

        {/* Right: who you would be working with, small, then why it pays off. */}
        <aside className="agrid__side" aria-label="Working with Ryan">
          <div className="agrid__card">
            <img
              className="agrid__photo"
              src="/portrait.webp"
              alt="Ryan Golfeo at his desk"
              width={420}
              height={534}
              loading="eager"
              decoding="async"
            />
            <div className="agrid__card-copy">
              <span className="agrid__card-name">
                {profile.name}
                <SealCheck size={16} weight="fill" aria-label={profile.verifiedLabel} />
              </span>
              <span className="agrid__card-role">Virtual assistant for lean US teams</span>
              <span className="agrid__card-status">
                <i aria-hidden="true" />
                Open to part-time and contract work
              </span>
              <div className="agrid__card-actions">
                <a
                  className="agrid__btn agrid__btn--primary"
                  href={callHref()}
                  {...(callIsExternal() ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <CalendarCheck size={15} weight="bold" aria-hidden="true" />
                  Book a call
                </a>
                <a className="agrid__btn" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  <FilePdf size={15} weight="bold" aria-hidden="true" />
                  Resume
                </a>
              </div>
            </div>
          </div>

          <div className="agrid__values">
            <h2 className="agrid__values-title">What you get working with me</h2>
            <ul role="list">
              {VALUES.map(({ title, body, Icon: ValueIcon }) => (
                <li key={title} className="agrid__value">
                  <span className="agrid__value-mark" aria-hidden="true">
                    <ValueIcon size={18} weight="duotone" />
                  </span>
                  <span className="agrid__value-copy">
                    <b>{title}</b>
                    <span>{body}</span>
                  </span>
                </li>
              ))}
            </ul>
            <Link className="agrid__more" to="/track-record">
              See where I have done the work
              <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
            </Link>
          </div>
        </aside>
      </div>
    </section>
  )
}
