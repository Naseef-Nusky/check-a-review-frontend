import { Link } from 'react-router-dom'
import LegalPageHero from './LegalPageHero'

export default function LegalDocumentLayout({ title, kicker = 'Legal', description, children }) {
  return (
    <div>
      <LegalPageHero kicker={kicker} title={title} description={description} />
      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <nav className="text-sm text-slate-500">
            <Link to="/" className="hover:text-primary-700">
              Home
            </Link>
            <span className="px-2">/</span>
            <span className="text-slate-700">{title}</span>
          </nav>
          <article className="legal-copy mt-8 space-y-3 text-sm leading-relaxed text-slate-600">
            {children}
          </article>
        </div>
      </section>
    </div>
  )
}

export function LegalH2({ id, children }) {
  return (
    <h2 id={id} className="scroll-mt-28 pt-8 text-xl font-semibold tracking-tight text-slate-900">
      {children}
    </h2>
  )
}

export function LegalP({ children }) {
  return <p className="mt-3">{children}</p>
}

export function LegalUl({ children }) {
  return <ul className="mt-3 list-disc space-y-2 pl-5">{children}</ul>
}
