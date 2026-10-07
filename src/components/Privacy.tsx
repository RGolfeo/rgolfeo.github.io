import { ArrowLeft } from '@/components/slab'
import { useNavigate } from 'react-router-dom'
import { profile } from '@/data/profile'

/**
 * Privacy Policy for rgolfeo.github.io.
 */
export default function Privacy() {
  const navigate = useNavigate()

  return (
    <main className="legal-page" aria-label="Privacy Policy">
      <div className="legal-page__card">
        <button
          className="legal-page__back"
          onClick={() => navigate('/')}
          aria-label="Back to home"
        >
          <ArrowLeft weight="bold" size={15} aria-hidden="true" />
          Back to home
        </button>

        <h1 className="legal-page__title">Privacy Policy</h1>
        <p className="legal-page__updated">Last updated: October 2026</p>

        <div className="legal-page__body">
          <h2>Who this covers</h2>
          <p>This site is run by Ryan Golfeo, a freelance lead generation specialist and virtual assistant based in Pasig City, Philippines. This policy covers rgolfeo.github.io.</p>

          <h2>What is collected</h2>
          <p>This site does not use analytics, advertising trackers, or accounts. The contact form opens your own email app, so nothing you type is stored by this site. If you email me, I receive your name, email address, and whatever you choose to share. The site is hosted on GitHub Pages, which may keep standard server logs such as IP addresses. Your light or dark theme choice may be saved in your own browser.</p>

          <h2>How it is used</h2>
          <p>I use your message only to reply to you and to discuss possible work together. I do not sell, rent, or share your details with anyone else.</p>

          <h2>How long it is kept</h2>
          <p>Emails stay in my inbox only as long as they are useful for our conversation or work together. You can ask me to delete your messages at any time by writing to the address below.</p>

          <h2>Contact</h2>
          <p>
            Questions about this policy: <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </p>
        </div>
      </div>
    </main>
  )
}
