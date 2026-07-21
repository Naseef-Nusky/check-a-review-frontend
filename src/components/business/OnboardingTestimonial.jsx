const testimonials = [
  {
    quote: 'Check A Review helped us turn real customer feedback into trust we can show on every page.',
    name: 'Aisha Rahman',
    title: 'Head of Customer Experience',
    company: 'Green Cafe',
    initial: 'G',
  },
  {
    quote: 'An intangible USP like trust is hard to prove. This platform made our reputation measurable.',
    name: 'Marcus Chen',
    title: 'Brand Director',
    company: 'Tech Solutions',
    initial: 'T',
  },
  {
    quote: 'Without verified reviews, we had no way to show why people trust us. Setup took minutes.',
    name: 'Elena Vargas',
    title: 'Co-Founder',
    company: 'FitLife Gym',
    initial: 'F',
  },
  {
    quote: 'Collecting reviews used to feel messy. Now invitations, replies, and trust scores live in one place.',
    name: 'James Okonkwo',
    title: 'Operations Lead',
    company: 'Cloud Services',
    initial: 'C',
  },
]

export default function OnboardingTestimonial({ step = 1 }) {
  const item = testimonials[(step - 1) % testimonials.length]

  return (
    <aside className="relative hidden lg:block">
      <div className="absolute inset-x-4 top-6 h-full rounded-3xl border border-slate-200/80 bg-white/60" aria-hidden="true" />
      <div className="absolute inset-x-2 top-3 h-full rounded-3xl border border-slate-200 bg-white/80" aria-hidden="true" />
      <div className="relative rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_20px_50px_rgb(15_23_42/0.08)]">
        <div className="mb-6 flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
        </div>
        <p className="font-serif text-5xl leading-none text-primary-400" aria-hidden="true">
          “
        </p>
        <blockquote className="mt-2 text-xl font-medium leading-relaxed tracking-tight text-slate-900">
          {item.quote}
        </blockquote>
        <div className="mt-10 flex items-center gap-3 border-t border-slate-100 pt-6">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white">
            {item.initial}
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-900">{item.name}</p>
            <p className="text-sm text-slate-500">
              {item.title}, {item.company}
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
