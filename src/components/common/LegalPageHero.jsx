import HeroBackground from './HeroBackground'

export default function LegalPageHero({ kicker = 'Legal', title, description, meta }) {
  return (
    <section className="relative overflow-hidden px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8">
      <HeroBackground />
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-16 top-8 h-40 w-40 rounded-full bg-primary-500/15 blur-3xl" />
        <div className="absolute -right-10 bottom-0 h-48 w-48 rounded-full bg-sky-400/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.55) 1px, transparent 0)',
            backgroundSize: '22px 22px',
          }}
        />
      </div>
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-200">{kicker}</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
        {description ? (
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300">{description}</p>
        ) : null}
        {meta ? <p className="mt-4 text-sm text-slate-400">{meta}</p> : null}
      </div>
    </section>
  )
}
