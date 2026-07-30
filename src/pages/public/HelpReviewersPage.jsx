import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  FileEdit,
  LogIn,
  Search,
  Shield,
  Star,
  UserPlus,
} from 'lucide-react'
import { APP_NAME } from '../../utils/constants'

const topics = [
  {
    id: 'account',
    icon: UserPlus,
    title: 'Create a reviewer account',
    steps: [
      'Go to Sign up from the header or Help Center.',
      'Enter your full name, email, and password.',
      'Confirm your account details and submit.',
      'You can then browse businesses and leave reviews.',
    ],
    link: { to: '/register', label: 'Create account' },
  },
  {
    id: 'login',
    icon: LogIn,
    title: 'Log in to your account',
    steps: [
      'Open the Log in page from the header.',
      'Continue with email (or Google if configured).',
      'Enter your email and password, then continue.',
      'You will land on your customer dashboard.',
    ],
    link: { to: '/login', label: 'Log in' },
  },
  {
    id: 'find',
    icon: Search,
    title: 'Find a trustworthy business',
    steps: [
      'Use Search or Categories from the main menu.',
      'Open a business profile to see ratings, reviews, and company details.',
      'Read the AI review summary (when available) for a quick overview.',
      'Check recent customer reviews before you decide.',
    ],
    link: { to: '/search', label: 'Find businesses' },
  },
  {
    id: 'write',
    icon: Star,
    title: 'How to add a review',
    steps: [
      'Open the business profile you want to review.',
      'Click Write a review (you must be logged in as a customer).',
      'Choose a star rating, write a clear title, and describe your experience.',
      'Submit the review. It enters processing first, then may publish automatically or wait for checks.',
    ],
    link: { to: '/review-tips', label: 'Review writing tips' },
  },
  {
    id: 'edit',
    icon: FileEdit,
    title: 'How to edit a review',
    steps: [
      'Go to My reviews from your profile menu or dashboard.',
      'Open Edit review on the review you want to update.',
      'Change the rating, title, or content as needed.',
      'Save changes. Edited reviews go through processing again before staying live.',
    ],
    link: { to: '/users/reviews', label: 'Open my reviews' },
  },
  {
    id: 'processing',
    icon: Shield,
    title: 'What happens after you submit',
    steps: [
      'Your review is saved as Processing while checks run.',
      'We look for spam, policy issues, duplicates, and other risk signals.',
      'If checks pass, the review becomes Published and visible on the business page.',
      'If it is flagged, it stays pending for admin review. You can track status in My reviews.',
    ],
    link: { to: '/trust-centre', label: 'Learn about moderation' },
  },
]

export default function HelpReviewersPage() {
  return (
    <div>
      <section className="border-b border-border bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Link to="/help" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 hover:text-primary-800">
            <ArrowLeft className="h-4 w-4" />
            Back to Help Center
          </Link>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-primary-600">For reviewers</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Using {APP_NAME} as a reviewer
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Learn how to create an account, find companies, write and edit reviews, and understand what happens after you submit.
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-5">
          {topics.map((topic) => {
            const Icon = topic.icon
            return (
              <article
                key={topic.id}
                id={topic.id}
                className="scroll-mt-24 rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-7"
              >
                <div className="flex items-start gap-4">
                  <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-primary-700">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-xl font-semibold text-slate-900">{topic.title}</h2>
                    <ol className="mt-4 space-y-2">
                      {topic.steps.map((step, index) => (
                        <li key={step} className="flex gap-3 text-sm leading-relaxed text-slate-600">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-700">
                            {index + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                    {topic.link ? (
                      <Link
                        to={topic.link.to}
                        className="mt-5 inline-flex text-sm font-semibold text-primary-700 hover:text-primary-800"
                      >
                        {topic.link.label} →
                      </Link>
                    ) : null}
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-border bg-slate-950 px-6 py-6 text-center text-white">
          <p className="text-sm text-slate-300">Need more help with your reviewer account?</p>
          <Link
            to="/contact"
            className="mt-4 inline-flex rounded-full bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600"
          >
            Contact us
          </Link>
        </div>
      </section>
    </div>
  )
}
