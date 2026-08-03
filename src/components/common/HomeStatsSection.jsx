import { useEffect, useRef, useState } from 'react'

function formatStatValue(target, progress, suffix, decimals) {
  const value = target * progress
  if (decimals > 0) return `${value.toFixed(decimals)}${suffix}`
  return `${Math.round(value)}${suffix}`
}

function useInView() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || inView) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [inView])

  return [ref, inView]
}

function AnimatedNumber({ target, suffix = '', decimals = 0, active, duration = 1400 }) {
  const [display, setDisplay] = useState(() => formatStatValue(0, 0, suffix, decimals))
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (!active) return undefined

    if (reducedMotion) {
      setDisplay(formatStatValue(target, 1, suffix, decimals))
      return undefined
    }

    let frameId = 0
    const start = performance.now()

    const tick = (now) => {
      const elapsed = now - start
      const progress = Math.min(1, elapsed / duration)
      // easeOutCubic
      const eased = 1 - (1 - progress) ** 3
      setDisplay(formatStatValue(target, eased, suffix, decimals))
      if (progress < 1) frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [active, decimals, duration, reducedMotion, suffix, target])

  return <span>{display}</span>
}

export default function HomeStatsSection({ stats }) {
  const [sectionRef, inView] = useInView()

  return (
    <section ref={sectionRef} className="home-stats-section border-b border-white/10">
      <div className="home-stats-bg" aria-hidden="true" />
      <div className="home-stats-overlay" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-3 sm:gap-0">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`home-stat-item text-center sm:px-8 ${
                index > 0 ? 'sm:border-l sm:border-white/15' : ''
              } ${inView ? 'is-visible' : ''}`}
              style={{ '--stat-delay': `${index * 120}ms` }}
            >
              <p className="text-4xl font-semibold tracking-tight text-primary-400 tabular-nums sm:text-5xl">
                <AnimatedNumber
                  target={stat.numeric}
                  suffix={stat.suffix}
                  decimals={stat.decimals || 0}
                  active={inView}
                  duration={1500 + index * 150}
                />
              </p>
              <p className="mt-3 text-sm font-semibold text-white">{stat.label}</p>
              <p className="mt-1 text-sm text-slate-300">{stat.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
