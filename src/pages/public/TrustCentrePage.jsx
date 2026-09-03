import { Link } from 'react-router-dom'
import {
  Bot,
  Building2,
  FileText,
  Scale,
  Shield,
  Users,
} from 'lucide-react'
import { APP_NAME, BUSINESS_PORTAL_URL } from '../../utils/constants'
import { REVIEW_SCREENING_COPY } from '../../components/common/ReviewScreeningNote'

const sections = [
  {
    title: 'How Check A Review works',
    links: [
      { to: '/review-tips', label: 'Tips for writing great reviews' },
      { to: '/about', label: 'About Check A Review' },
      { to: '/search', label: 'Find businesses' },
    ],
  },
  {
    title: 'Integrity & AI',
    links: [
      { to: '/trust-centre#ai', label: 'How we use AI moderation' },
      { to: '/trust-centre#checks', label: 'Automated review checks' },
      { to: '/trust-centre#guidelines', label: 'Community guidelines' },
    ],
  },
  {
    title: 'For reviewers',
    links: [
      { to: '/register', label: 'Create a customer account' },
      { to: '/privacy', label: 'Privacy Policy' },
      { to: '/terms', label: 'Terms & Conditions' },
      { to: '/posting-guidelines', label: 'Posting Guidelines' },
      { to: '/contact', label: 'Get support' },
    ],
  },
  {
    title: 'For businesses',
    links: [
      { href: `${BUSINESS_PORTAL_URL}/setup`, label: 'Register your business' },
      { to: '/terms/business', label: 'Terms & Conditions' },
      { to: '/cookies', label: 'Cookie Policy' },
      { href: `${BUSINESS_PORTAL_URL}/pricing`, label: 'Plans & pricing' },
    ],
  },
]

const pillars = [
  {
    id: 'ai',
    icon: Bot,
    title: 'How we use AI',
    body: `${APP_NAME} uses AI-assisted moderation to screen reviews for spam, abusive language, promotional content, and suspicious patterns. AI helps prioritize risk — it does not replace clear guidelines or human oversight when a review needs extra attention.`,
  },
  {
    id: 'checks',
    icon: Shield,
    title: 'Automated checks',
    body: REVIEW_SCREENING_COPY,
  },
  {
    id: 'guidelines',
    icon: Scale,
    title: 'Guidelines for everyone',
    body: 'Reviews should be honest, specific, and free of personal information or promotional links. Businesses should engage respectfully. These shared rules keep the platform useful for customers and fair for companies.',
  },
]

export default function TrustCentrePage() {
  return (
    <div>
      <section className="bg-slate-950 px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-300">Trust Centre</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            How we protect trust on {APP_NAME}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300">
            {REVIEW_SCREENING_COPY}
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-900">{section.title}</h2>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.href ? (
                      <a href={link.href} className="text-sm text-slate-600 transition hover:text-primary-700">
                        {link.label}
                      </a>
                    ) : (
                      <Link to={link.to} className="text-sm text-slate-600 transition hover:text-primary-700">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon
            return (
              <article
                key={pillar.id}
                id={pillar.id}
                className="scroll-mt-24 rounded-3xl border border-border bg-white p-7 shadow-sm"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-50 text-primary-700">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">{pillar.title}</h2>
                <p className="mt-3 text-base leading-relaxed text-slate-600">{pillar.body}</p>
              </article>
            )
          })}
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
          <Link
            to="/about"
            className="rounded-2xl border border-border bg-slate-50 px-5 py-5 transition hover:border-primary-200 hover:bg-primary-50/40"
          >
            <Users className="h-5 w-5 text-primary-600" />
            <p className="mt-3 font-semibold text-slate-900">About {APP_NAME}</p>
            <p className="mt-1 text-sm text-slate-600">Our mission, values, and community.</p>
          </Link>
          <Link
            to="/contact"
            className="rounded-2xl border border-border bg-slate-50 px-5 py-5 transition hover:border-primary-200 hover:bg-primary-50/40"
          >
            <FileText className="h-5 w-5 text-primary-600" />
            <p className="mt-3 font-semibold text-slate-900">Contact us</p>
            <p className="mt-1 text-sm text-slate-600">Questions about trust, reviews, or policy.</p>
          </Link>
          <a
            href={`${BUSINESS_PORTAL_URL}/setup`}
            className="rounded-2xl border border-border bg-slate-50 px-5 py-5 transition hover:border-primary-200 hover:bg-primary-50/40 sm:col-span-2"
          >
            <Building2 className="h-5 w-5 text-primary-600" />
            <p className="mt-3 font-semibold text-slate-900">For businesses</p>
            <p className="mt-1 text-sm text-slate-600">Claim your profile, invite reviews, and respond with confidence.</p>
          </a>
        </div>
      </section>
    </div>
  )
}
