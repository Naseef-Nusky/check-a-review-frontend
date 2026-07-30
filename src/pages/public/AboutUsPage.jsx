import { Link } from 'react-router-dom'
import {
  Building2,
  Globe2,
  Handshake,
  Heart,
  MessageCircle,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from 'lucide-react'
import { APP_NAME, BUSINESS_PORTAL_URL } from '../../utils/constants'

const stats = [
  { icon: Globe2, value: '100+', label: 'Countries where people discover and leave reviews' },
  { icon: MessageCircle, value: '50K+', label: 'Verified reviews shared on Check A Review' },
  { icon: Building2, value: '10K+', label: 'Businesses building reputation with us' },
  { icon: Users, value: 'Everyday', label: 'New feedback from real customers worldwide' },
]

const values = [
  {
    icon: Star,
    title: 'We start with people',
    body: 'We focus on real customer and business problems, using trust as our compass.',
    tone: 'bg-primary-50 text-primary-700',
  },
  {
    icon: ShieldCheck,
    title: 'We act with integrity',
    body: 'We choose the fair path — even when the easy path looks tempting.',
    tone: 'bg-slate-100 text-slate-800',
  },
  {
    icon: Heart,
    title: 'We stay human',
    body: 'We care about each other, welcome different perspectives, and keep empathy in the work.',
    tone: 'bg-rose-50 text-rose-700',
  },
  {
    icon: Rocket,
    title: 'We make it happen',
    body: 'We deliver on our promises and measure success by the impact we create.',
    tone: 'bg-amber-50 text-amber-800',
  },
  {
    icon: Handshake,
    title: 'We win together',
    body: 'We compete as one team — collaborative inside, ambitious outside.',
    tone: 'bg-emerald-50 text-emerald-800',
  },
]

const stories = [
  {
    title: 'A clear way to collect customer feedback',
    quote:
      'We started using Check A Review to manage our online reputation, and the experience has been practical from day one. Collecting and showcasing customer feedback helps us build credibility, and the dashboard makes responding simple.',
    author: 'Nova Soft Labs',
    date: 'February 2025',
  },
  {
    title: 'Honest reviews before every decision',
    quote:
      'Check A Review helps people share genuine experiences. I check reviews here before trying a new service, and it has helped me avoid several poor choices.',
    author: 'City Travel Group',
    date: 'May 2025',
  },
]

export default function AboutUsPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-primary-950 px-4 py-20 text-white sm:px-6 lg:px-8">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse at 15% 20%, rgb(255 64 129 / 0.35), transparent 45%), radial-gradient(ellipse at 85% 80%, rgb(255 255 255 / 0.08), transparent 40%)',
          }}
        />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-200">About {APP_NAME}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            {APP_NAME} gives every experience a voice
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            An independent customer feedback platform that helps people choose with confidence and helps businesses earn loyalty through honest reviews.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/review-tips"
              className="inline-flex rounded-full bg-primary-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-600"
            >
              See how reviews work
            </Link>
            <Link
              to="/search"
              className="inline-flex rounded-full border border-white/25 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Explore the platform
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="section-kicker">Our vision</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              To become a clear symbol of trust online
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600">
              {APP_NAME} started with a simple idea: connect customers and businesses through open, impartial reviews.
              As an independent platform, we help people make better choices and help companies earn trust at every step.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Today, thousands of verified reviews and growing business listings help shoppers decide with more clarity —
              while businesses learn from feedback and improve in public.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Our team builds tools for review collection, moderation, replies, and insights — so trust is visible wherever people need it.
            </p>
          </div>
          <div className="overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary-50 via-white to-slate-100 p-8 shadow-sm">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-500 text-white">
              <Sparkles className="h-6 w-6" strokeWidth={1.75} />
            </div>
            <p className="mt-5 text-lg font-semibold text-slate-900">Trust in action</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Real experiences. Clear ratings. Transparent moderation. That combination is how we keep the platform useful for both sides.
            </p>
            <Link to="/trust-centre" className="mt-6 inline-flex text-sm font-semibold text-primary-700 hover:text-primary-800">
              Visit the Trust Centre →
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-slate-50 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <p className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 tabular-nums">{value}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-border bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="section-kicker">What we do</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            Built for customers and businesses
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-600">
            <p>
              Anyone can leave a review when it is based on a real experience. Those reviews help millions of people find
              trustworthy companies and buy with more confidence.
            </p>
            <p>
              Reviews also help businesses earn trust — by listening, responding, understanding feedback, and improving
              where it matters most.
            </p>
            <p>
              Our mission is to strengthen trust between people and companies by making honest reviews easy to find and
              hard to ignore.
            </p>
            <p>
              We protect the integrity of the platform with automated checks, AI-assisted moderation, community guidelines,
              and human review when needed. Learn more in our{' '}
              <Link to="/trust-centre" className="font-semibold text-primary-700 hover:text-primary-800">
                Trust Centre
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="section-kicker">Our values</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-slate-900">
            Ambition only works when we live our principles
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
            Becoming a symbol of trust means practicing openness every day. These shared values guide how we decide,
            build, and support our community.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon
              return (
                <div key={value.title} className="rounded-2xl border border-border bg-slate-50/80 p-6">
                  <div className={`inline-flex h-11 w-11 items-center justify-center rounded-full ${value.tone}`}>
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{value.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="section-kicker">Community voices</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            Don’t just take it from us
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {stories.map((story) => (
              <article key={story.title} className="rounded-3xl border border-border bg-white p-7 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">{story.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">“{story.quote}”</p>
                <p className="mt-5 text-sm font-medium text-slate-900">{story.author}</p>
                <p className="mt-1 text-xs text-slate-500">Experience shared: {story.date}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-slate-950 px-7 py-8 text-white">
            <h2 className="text-2xl font-semibold tracking-tight">Want to understand how reviews are collected?</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Read our review tips and Trust Centre guidance to see how we keep feedback fair, useful, and transparent.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/review-tips"
                className="inline-flex rounded-full bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600"
              >
                Take me there
              </Link>
              <Link
                to="/trust-centre"
                className="inline-flex rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
              >
                Trust Centre
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-border bg-white px-7 py-8 shadow-sm">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Have a question for our team?</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Whether you are a reviewer or a business, we are here to help you get the most from {APP_NAME}.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Contact us
              </Link>
              <a
                href={`${BUSINESS_PORTAL_URL}/setup`}
                className="inline-flex rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                For businesses
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
