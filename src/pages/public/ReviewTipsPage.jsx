import { Link } from 'react-router-dom'
import {
  CheckCircle2,
  FileEdit,
  Handshake,
  ListChecks,
  MessageSquareText,
  SearchCheck,
  Shield,
  Sparkles,
} from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'

const tips = [
  {
    icon: MessageSquareText,
    title: 'Be useful and constructive',
    body: 'Share enough detail for others to understand what happened. Say what went well and what could improve — keep it friendly.',
  },
  {
    icon: ListChecks,
    title: 'Cover more than one thing',
    body: 'Mention the overall experience: product or service quality, delivery, value, and customer service — not just one detail.',
  },
  {
    icon: Sparkles,
    title: 'Be detailed, specific, and honest',
    body: 'Short praise like “Great!” helps little. Write from your own experience, stick to facts, and help readers stand in your shoes.',
  },
  {
    icon: Shield,
    title: 'Leave out links and personal info',
    body: 'Don’t include names, phone numbers, addresses, or links to other companies. Praise or complain about staff privately to the business.',
  },
  {
    icon: Handshake,
    title: 'Keep it civil',
    body: 'A calm, factual tone is more credible. Explain what happened and let readers draw their own conclusions.',
  },
  {
    icon: FileEdit,
    title: 'Update your review if needed',
    body: 'You can edit a review if the situation changes, a problem is fixed, or you have a new experience with the same business.',
  },
  {
    icon: SearchCheck,
    title: 'Confirm the right business',
    body: 'Double-check the company name, website, and location before posting so your feedback reaches the right profile.',
  },
  {
    icon: CheckCircle2,
    title: 'Proofread before you submit',
    body: 'Quickly check that your review is readable, makes sense, and has no obvious typos.',
  },
]

const examples = [
  {
    rating: 4,
    title: 'Quick and easy to deal with',
    body: 'I’m happy with the product and the deal. Support helped me choose what I needed. Only downside: a cash-back offer wasn’t automatic, and that wasn’t clear upfront.',
    tone: 'good',
  },
  {
    rating: 1,
    title: 'Huge let down in service',
    body: 'My order didn’t arrive on time despite the delivery schedule. It took several contacts to get answers, then a long wait for a refund. Stock status and refund timing need to improve.',
    tone: 'good',
  },
  {
    rating: 5,
    title: 'Great',
    body: 'Great no probs at all',
    tone: 'weak',
  },
]

export default function ReviewTipsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader
        kicker="Help Center"
        title="8 tips for writing great reviews"
        description="Detailed, constructive, and polite feedback helps other customers and the businesses you review."
      />

      <div className="mb-10 rounded-2xl border border-border bg-gradient-to-br from-primary-50/80 via-white to-slate-50 p-5 sm:p-6">
        <p className="text-sm leading-relaxed text-ink">
          Good reviews give people a feel for what happened. Bad ones are vague, personal, or unkind.
          Use the tips below before you hit submit.
        </p>
        <Link
          to="/search"
          className="mt-4 inline-flex text-sm font-semibold text-primary-600 hover:text-primary-700"
        >
          Find a business to review →
        </Link>
      </div>

      <ol className="space-y-5">
        {tips.map((tip, index) => {
          const Icon = tip.icon
          return (
            <li
              key={tip.title}
              id={`tip-${index + 1}`}
              className="flex gap-4 rounded-2xl border border-border bg-white p-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                  Tip {index + 1}
                </p>
                <h2 className="mt-1 text-base font-semibold text-ink">{tip.title}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{tip.body}</p>
              </div>
            </li>
          )
        })}
      </ol>

      <section className="mt-12">
        <h2 className="text-lg font-semibold text-ink">Quick examples</h2>
        <p className="mt-1 text-sm text-ink-muted">
          Useful reviews explain what happened. Weak ones are too short to help anyone.
        </p>
        <div className="mt-5 space-y-4">
          {examples.map((ex) => (
            <div
              key={ex.title + ex.body}
              className={`rounded-2xl border p-4 ${
                ex.tone === 'weak'
                  ? 'border-amber-200 bg-amber-50/60'
                  : 'border-border bg-white'
              }`}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-ink">
                  {ex.rating} / 5
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    ex.tone === 'weak'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-50 text-emerald-700'
                  }`}
                >
                  {ex.tone === 'weak' ? 'Too brief' : 'Helpful'}
                </span>
              </div>
              <p className="mt-2 font-medium text-ink">{ex.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">{ex.body}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-12 rounded-2xl border border-border bg-slate-900 px-5 py-6 text-center sm:px-8">
        <p className="text-sm text-slate-300">
          Ready to share your experience? Search for the company and write an honest review.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/search"
            className="inline-flex rounded-full bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-600"
          >
            Search businesses
          </Link>
          <Link
            to="/contact"
            className="inline-flex rounded-full border border-slate-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Contact support
          </Link>
        </div>
      </div>
    </div>
  )
}
