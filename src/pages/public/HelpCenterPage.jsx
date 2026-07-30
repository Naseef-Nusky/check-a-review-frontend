import { Link } from 'react-router-dom'
import { ArrowRight, Building2, Users } from 'lucide-react'
import { APP_NAME } from '../../utils/constants'

const audiences = [
  {
    to: '/help/reviewers',
    icon: Users,
    title: 'For reviewers',
    body: `Everything you need to know about using ${APP_NAME} as a reviewer is here. Learn how to write reviews, edit them, find trustworthy businesses, and more.`,
    cta: 'Explore reviewer help',
  },
  {
    to: '/help/businesses',
    icon: Building2,
    title: 'For businesses',
    body: `Using ${APP_NAME} for your business? Explore tools and guides designed to help you register, log in, manage reviews, and grow at every stage.`,
    cta: 'Explore business help',
  },
]

export default function HelpCenterPage() {
  return (
    <div>
      <section className="bg-slate-950 px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-300">Help Center</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            How can we help you today?
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300">
            Choose your path below — whether you leave reviews as a customer or manage reputation as a business.
          </p>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          {audiences.map(({ to, icon: Icon, title, body, cta }) => (
            <Link
              key={to}
              to={to}
              className="group rounded-3xl border border-border bg-white p-8 shadow-sm transition hover:border-primary-200 hover:shadow-md"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 transition group-hover:bg-primary-100">
                <Icon className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <h2 className="mt-5 text-2xl font-semibold tracking-tight text-slate-900">{title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{body}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-700">
                {cta}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-5xl rounded-2xl border border-border bg-slate-50 px-6 py-5 text-center">
          <p className="text-sm text-slate-600">
            Still stuck?{' '}
            <Link to="/contact" className="font-semibold text-primary-700 hover:text-primary-800">
              Contact support
            </Link>{' '}
            or visit the{' '}
            <Link to="/trust-centre" className="font-semibold text-primary-700 hover:text-primary-800">
              Trust Centre
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  )
}
