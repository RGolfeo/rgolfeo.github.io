import { Link } from 'react-router-dom'
import { SealCheck, CaretRight, Stack, Coffee } from '@/components/slab'
import { profile } from '@/data/profile'
import QuickMenu from './QuickMenu'

/**
 * Home on a phone, the parts the rail and the bento used to carry:
 *
 *   HomeProfile  avatar, name, verified mark, handle and the QuickMenu
 *                (theme + accessibility) - the rail's identity block, laid flat
 *   HomeStats    three proof facts (profile.stats), each named by a glyph so
 *                it reads at a glance
 *   HomeExplore  one shelf card per rail view in a snap row, then the first
 *                testimonial as a video stage
 */

export function HomeProfile() {
  return (
    <header className="hprofile">
      <img className="hprofile__avatar" src={profile.avatarSrc} alt="" width={56} height={56} />
      <div className="hprofile__who">
        <span className="hprofile__name">
          {profile.name}
          <SealCheck size={16} weight="fill" className="hprofile__verified" aria-label={profile.verifiedLabel} />
        </span>
        <span className="hprofile__handle">
          {profile.handle} · {profile.role}
        </span>
      </div>
      <QuickMenu className="hprofile__menu" />
    </header>
  )
}

export function HomeStats() {
  return (
    <ul className="hstats" role="list">
      {profile.stats.map(({ value, label, Icon }, i) => (
        <li key={i}>
          <Icon className="hstats__icon" size={18} weight="duotone" aria-hidden="true" />
          <b className="hstats__value">{value}</b>
          <span className="hstats__label">{label}</span>
        </li>
      ))}
    </ul>
  )
}

const TILES = [
  { n: '01', label: 'Projects', to: '/projects', title: 'Work you can inspect.', desc: 'Sanitized dashboards, pipelines, and sample documents.', img: '/placeholders/project-1.jpg' },
  { n: '02', label: 'Services', to: '/services', title: 'Five ways I can help.', desc: 'Lead sourcing, outreach, CRM, inbox, and operations.', Icon: Stack },
  { n: '03', label: 'Showcase', to: '/showcase', title: 'Spin through the work.', desc: 'A 3D reel of sanitized client screens.', Icon: Coffee, accent: true },
  { n: '04', label: 'Testimonials', to: '/testimonials', title: 'Proof, not promises.', desc: 'Who I have worked with and what I did.', img: '/placeholders/testimonial-1.jpg' },
  { n: '05', label: 'About', to: '/about', title: `Hi, I'm ${profile.firstName}.`, desc: 'BPO-trained, US-hours friendly, built on follow-through.', img: profile.avatarSrc },
] as const

export function HomeExplore() {
  return (
    <>
      <div className="hsec">
        <h2 className="hsec__title">Explore</h2>
      </div>
      <ul className="htiles" role="list">
        {TILES.map((t) => (
          <li key={t.to}>
            <Link to={t.to} className={`htile${'accent' in t && t.accent ? ' htile--accent' : ''}`}>
              {'img' in t ? (
                <span className="htile__media"><img className="htile__img" src={t.img} alt="" loading="lazy" /></span>
              ) : (
                <span className="htile__media htile__glyph"><t.Icon size={52} weight="duotone" aria-hidden="true" /></span>
              )}
              <span className="htile__body">
                <span className="htile__n">{t.n} {t.label}</span>
                <span className="htile__title">{t.title}</span>
                <span className="htile__desc">{t.desc}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* A header that links carries its chevron on the title itself. */}
      <div className="hsec">
        <h2 className="hsec__title">
          <Link to="/testimonials" className="hsec__link">
            Proof of work
            <CaretRight size={16} weight="bold" aria-hidden="true" />
          </Link>
        </h2>
      </div>
      <Link to="/testimonials" className="hproof" aria-label="Proof of work: healthcare outreach system">
        <span className="hproof__stage">
          <img src="/placeholders/testimonial-1.jpg" alt="" loading="lazy" />
          <span className="hproof__play" aria-hidden="true"><CaretRight size={20} weight="bold" /></span>
          <span className="hproof__dur" aria-hidden="true">View</span>
        </span>
        <span className="hproof__copy">
          <span className="hproof__title">287 leads tracked, 170 outreach-ready, 57 high-priority.</span>
          <span className="hproof__meta">Lead Generation VA · healthcare credentialing firm</span>
        </span>
      </Link>
    </>
  )
}
