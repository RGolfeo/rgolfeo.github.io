import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Gauge, Robot, Code, ArrowUpRight, CalendarCheck, ArrowsOut } from '@/components/slab'
import type { Icon } from '@/components/slab'
import { callHref, callIsExternal } from '@/lib/booking'

/**
 * Track record (route /track-record, also /testimonials for old links).
 *
 * Ryan is new to freelancing, so this page does not pretend to have reviews.
 * It shows what can be checked instead: redrawn screens from current client
 * work (real structure and real totals, private names hidden), the places he
 * has done client work, and an open offer to start with a trial task.
 *
 * When a client review arrives, add it as a row in CLIENTS (a `quote` field
 * renders above the description) or restore a video on the stage.
 */

type Proof = {
  id: string
  label: string
  caption: string
  src: string
}

const PROOFS: Proof[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    caption: 'Lead-generation dashboard: stages, priorities, and outreach totals.',
    src: '/proof/dashboard.svg',
  },
  {
    id: 'linkedin',
    label: 'Outreach',
    caption: 'LinkedIn outreach tracker: every prospect with a status and next step.',
    src: '/proof/linkedin.svg',
  },
  {
    id: 'pipeline',
    label: 'Pipeline',
    caption: 'Master prospect pipeline: verified records, tiers, and sources.',
    src: '/proof/pipeline.svg',
  },
  {
    id: 'research',
    label: 'Research',
    caption: 'Sales Navigator research: filters set before any outreach starts.',
    src: '/proof/sales-navigator.svg',
  },
]

type Client = {
  index: string
  name: string
  role: string
  daily: string
  work: string[]
  /** A client's own words. Only ever a real, permitted quote. */
  quote?: { text: string; by: string }
  Icon: Icon
}

const CLIENTS: Client[] = [
  {
    index: '01',
    name: 'Healthcare credentialing firm',
    role: 'Lead generation VA, 2026 to now',
    daily:
      'Provider research and verification, LinkedIn and email outreach, tracker upkeep, daily reports, and now credentialing support.',
    work: ['Prospect research', 'Outreach', 'Credentialing'],
    Icon: Gauge,
  },
  {
    index: '02',
    name: 'Growth and outreach projects',
    role: 'Outreach specialist, 2026',
    daily: 'Lead generation, appointment setting, and CRM pipeline setup for small teams.',
    work: ['Lead generation', 'CRM', 'Follow-up'],
    Icon: Robot,
  },
  {
    index: '03',
    name: 'Cognizant, TaskUs, Verizon, Sutherland',
    role: 'US customer and financial operations, 2018 to 2025',
    daily:
      'High-volume US client work: billing, account and trade requests, refunds, fraud prevention, and careful documentation.',
    work: ['Client support', 'Financial ops', 'Documentation'],
    Icon: Code,
  },
]

export default function TestimonialsGrid() {
  const [active, setActive] = useState(0)
  const proof = PROOFS[active]

  return (
    <section className="pgrid tgrid trk" aria-labelledby="track-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Track record</span>
        <h1 className="pgrid__title" id="track-title">
          New to freelance, not to clients.
        </h1>
        <p className="pgrid__lede">
          Seven years of US client work before freelancing, and the work I do now, with private details hidden.
        </p>
      </header>

      <div className="home__glass tgrid__glass">
        {/* Left: the proof viewer. */}
        <div className="tgrid__reel">
          <figure className="trk__stage">
            <a
              className="trk__frame"
              href={proof.src}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open the ${proof.label.toLowerCase()} screen full size`}
            >
              <img key={proof.id} src={proof.src} alt={proof.caption} decoding="async" />
              <span className="trk__zoom" aria-hidden="true">
                <ArrowsOut size={15} weight="bold" />
              </span>
            </a>
            <figcaption className="trk__caption">
              <b>{proof.caption}</b>
              <span>Redrawn from the real tracker. Totals are real; names and details are hidden or simplified.</span>
            </figcaption>
          </figure>

          <div className="tgrid__picker trk__picker" role="group" aria-label="Choose a screen">
            {PROOFS.map((p, i) => (
              <button
                key={p.id}
                type="button"
                className={`tgrid__pick${i === active ? ' is-active' : ''}`}
                onClick={() => setActive(i)}
                aria-pressed={i === active}
              >
                <span className="tgrid__pick-thumb" aria-hidden="true">
                  <img src={p.src} alt="" loading="lazy" decoding="async" />
                </span>
                <span className="tgrid__pick-kicker">{p.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right: where the work happened, then the offer. */}
        <div className="tgrid__ledger">
          <div className="tgrid__ledger-head">
            <h2 className="tgrid__ledger-title">Where I have done the work.</h2>
            <p className="tgrid__ledger-sub">Client names kept private where required.</p>
          </div>

          <ul className="tgrid__clients" role="list">
            {CLIENTS.map((c) => {
              const ClientIcon = c.Icon
              return (
                <li key={c.index} className="tgrid__client">
                  <span className="tgrid__client-mark" aria-hidden="true">
                    <ClientIcon size={22} weight="duotone" />
                  </span>
                  <span className="tgrid__client-body">
                    <span className="tgrid__client-head">
                      <span className="tgrid__client-name">{c.name}</span>
                      <span className="tgrid__client-role">{c.role}</span>
                    </span>
                    {c.quote && (
                      <q className="trk__quote">
                        {c.quote.text} <cite>{c.quote.by}</cite>
                      </q>
                    )}
                    <span className="tgrid__client-daily">{c.daily}</span>
                    <ul className="tgrid__client-tags" role="list">
                      {c.work.map((w) => (
                        <li key={w} className="tgrid__client-tag">
                          {w}
                        </li>
                      ))}
                    </ul>
                  </span>
                </li>
              )
            })}
          </ul>

          <div className="trk__cta">
            <div className="trk__cta-copy">
              <h2 className="trk__cta-title">Try me on a real task.</h2>
              <p>Reviews take time to collect. Until then, start with a short trial task and judge the work yourself.</p>
            </div>
            <div className="trk__cta-actions">
              <Link className="trk__btn trk__btn--primary" to="/contact">
                Start a trial task
                <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
              </Link>
              <a
                className="trk__btn"
                href={callHref()}
                {...(callIsExternal() ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <CalendarCheck size={16} weight="duotone" aria-hidden="true" />
                Book a call
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
