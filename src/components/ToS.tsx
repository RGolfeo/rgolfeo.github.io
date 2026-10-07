import { ArrowLeft } from '@/components/slab'
import { useNavigate } from 'react-router-dom'
import { profile } from '@/data/profile'

/**
 * Terms of Service for rgolfeo.github.io.
 */
export default function ToS() {
  const navigate = useNavigate()

  return (
    <main className="legal-page" aria-label="Terms of Service">
      <div className="legal-page__card">
        <button
          className="legal-page__back"
          onClick={() => navigate('/')}
          aria-label="Back to home"
        >
          <ArrowLeft weight="bold" size={15} aria-hidden="true" />
          Back to home
        </button>

        <h1 className="legal-page__title">Terms of Service</h1>
        <p className="legal-page__updated">Last updated: October 2026</p>

        <div className="legal-page__body">
          <h2>Using this site</h2>
          <p>This site is a personal portfolio for Ryan Golfeo. You are welcome to browse it and contact me about work. Screenshots shown here are sanitized samples, and numbers describe past results, not guarantees of future ones.</p>

          <h2>Work and payment</h2>
          <p>Scope, hours, rates, schedule, and payment terms for any engagement are agreed in writing before work starts. Nothing on this site is a binding offer.</p>

          <h2>Ownership</h2>
          <p>The content and samples on this site belong to Ryan Golfeo, except third-party logos, which belong to their owners. Client data I handle stays confidential. Ownership of work delivered to a client follows our written agreement. The site design is based on the open-source portfolio template by Kenneth Villar (brewed-ops).</p>

          <h2>Liability</h2>
          <p>This site is provided as is. I am not responsible for losses that come from relying on its content. Any responsibilities for client work are set in the written agreement for that work.</p>

          <h2>Contact</h2>
          <p>
            Questions about these terms: <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </p>
        </div>
      </div>
    </main>
  )
}
