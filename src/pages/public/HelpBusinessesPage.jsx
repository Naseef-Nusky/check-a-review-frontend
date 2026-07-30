import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  BarChart3,
  Building2,
  LogIn,
  Mail,
  MessageSquare,
  Settings,
} from 'lucide-react'
import { APP_NAME, BUSINESS_PORTAL_URL } from '../../utils/constants'

const topics = [
  {
    id: 'register',
    icon: Building2,
    title: 'How to create a business account',
    steps: [
      'Open the business portal and choose Set up / Sign up.',
      'Add business details: name, location, website, category, and logo.',
      'Complete additional details such as job title, revenue range, and team size.',
      'Enter your personal contact details, then create your login email and password.',
      'After setup, you can manage your company from the business dashboard.',
    ],
    href: `${BUSINESS_PORTAL_URL}/setup`,
    linkLabel: 'Register your business',
  },
  {
    id: 'login',
    icon: LogIn,
    title: 'How to log in as a business',
    steps: [
      'Go to the business portal Log in page.',
      'Sign in with your business account email and password.',
      'Only business-role accounts can access the portal.',
      'After login you land on the dashboard overview.',
    ],
    href: `${BUSINESS_PORTAL_URL}/login`,
    linkLabel: 'Business log in',
  },
  {
    id: 'profile',
    icon: Settings,
    title: 'Update your company profile',
    steps: [
      'Open Company profile in the business portal.',
      'Edit name, location, categories, website, email, phone, and address.',
      'Update job title, contact name, annual revenue, and employee range as needed.',
      'Upload or change your logo, then save. Changes appear on your public profile.',
    ],
    href: `${BUSINESS_PORTAL_URL}/profile`,
    linkLabel: 'Open company profile',
  },
  {
    id: 'reviews',
    icon: MessageSquare,
    title: 'How to check and reply to reviews',
    steps: [
      'Open Reviews in the business portal.',
      'Read published customer reviews and the AI review summary when available.',
      'Reply to a review to respond publicly to the customer.',
      'You can edit an existing reply later if needed.',
    ],
    href: `${BUSINESS_PORTAL_URL}/reviews`,
    linkLabel: 'Manage reviews',
  },
  {
    id: 'invites',
    icon: Mail,
    title: 'Invite customers to leave a review',
    steps: [
      'Open Invitations in the business portal.',
      'Enter a customer email and send a review invitation.',
      'The customer receives a link to log in or sign up, then write a review.',
      'Track invitation status from the invitations list.',
    ],
    href: `${BUSINESS_PORTAL_URL}/invitations`,
    linkLabel: 'Send invitations',
  },
  {
    id: 'insights',
    icon: BarChart3,
    title: 'Track performance and widgets',
    steps: [
      'Use Analytics to view rating breakdowns and trends.',
      'Check Notifications for new or updated reviews.',
      'Open Widget to embed your rating summary on your website.',
      'Keep your public profile up to date so customers trust what they see.',
    ],
    href: `${BUSINESS_PORTAL_URL}/analytics`,
    linkLabel: 'View analytics',
  },
]

export default function HelpBusinessPage() {
  return (
    <div>
      <section className="border-b border-border bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Link to="/help" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 hover:text-primary-800">
            <ArrowLeft className="h-4 w-4" />
            Back to Help Center
          </Link>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-primary-600">For businesses</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Using {APP_NAME} for your business
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Learn how to register, log in, update your company profile, check reviews, send invitations, and use portal tools.
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
                    {topic.href ? (
                      <a
                        href={topic.href}
                        className="mt-5 inline-flex text-sm font-semibold text-primary-700 hover:text-primary-800"
                      >
                        {topic.linkLabel} →
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-border bg-slate-950 px-6 py-6 text-center text-white">
          <p className="text-sm text-slate-300">Need help setting up or managing your business account?</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`${BUSINESS_PORTAL_URL}/setup`}
              className="inline-flex rounded-full bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600"
            >
              Start business setup
            </a>
            <Link
              to="/contact"
              className="inline-flex rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
