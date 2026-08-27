import { Link } from 'react-router-dom'
import { APP_NAME, CONTACT_EMAIL } from '../../utils/constants'
import LegalPageHero from '../../components/common/LegalPageHero'

const lastUpdated = 'August 2026'

const sections = [
  {
    id: 'agreement',
    title: 'Agreement',
    body: [
      `These Terms of Use (“Terms”) govern your access to and use of ${APP_NAME} as a reviewer or visitor. By creating an account, writing a review, or using the consumer site, you agree to these Terms and our Privacy Policy.`,
    ],
  },
  {
    id: 'eligibility',
    title: 'Eligibility',
    body: [
      'You must be at least 18 years old and able to form a binding contract to use reviewer account features. You are responsible for keeping your login credentials secure.',
    ],
  },
  {
    id: 'accounts',
    title: 'Accounts and sign-in',
    body: [
      'You may register with email and password or continue with Google where available. You must provide accurate information and keep it up to date. We may suspend or terminate accounts that are abusive, fraudulent, or in breach of these Terms.',
    ],
  },
  {
    id: 'reviews',
    title: 'Reviews and content',
    body: [
      'You may submit ratings and reviews about businesses based on genuine experiences. You retain ownership of your content, and you grant us a worldwide, non-exclusive, royalty-free license to host, display, distribute, and moderate that content on and in connection with the platform.',
      'You agree that reviews should be honest, relevant, and free of unlawful, defamatory, harassing, discriminatory, or spam content. Do not include private personal data about others, malware links, or promotional material unrelated to your experience.',
    ],
  },
  {
    id: 'moderation',
    title: 'Moderation',
    body: [
      `${APP_NAME} may use automated tools (including AI) and human review to screen content. We may delay publication, edit for formatting where necessary, reject, remove, or restrict content that violates guidelines or creates risk. Moderation decisions aim to protect platform integrity and are not a guarantee that every review is independently verified.`,
    ],
  },
  {
    id: 'prohibited',
    title: 'Prohibited uses',
    body: [
      'You must not attempt to manipulate ratings, create fake accounts, scrape the service in an abusive way, interfere with security, reverse engineer protected systems, or use the platform for any unlawful purpose.',
    ],
  },
  {
    id: 'availability',
    title: 'Service availability',
    body: [
      'We provide the consumer platform on an “as available” basis and may update, suspend, or discontinue features. We do not guarantee uninterrupted access.',
    ],
  },
  {
    id: 'disclaimers',
    title: 'Disclaimers and liability',
    body: [
      'Reviews reflect the opinions of users, not necessarily the views of Check A Review. To the fullest extent permitted by law, we disclaim warranties not expressly stated in these Terms, and our total liability arising from your use of the consumer services is limited to the greater of (a) the fees you paid us for consumer services in the 12 months before the claim (if any) or (b) USD 50.',
    ],
  },
  {
    id: 'termination',
    title: 'Termination',
    body: [
      'You may stop using the service at any time and may request account deletion through settings or by contacting support. We may suspend or end access for breach of these Terms or to protect users and the platform.',
    ],
  },
  {
    id: 'changes',
    title: 'Changes',
    body: [
      'We may update these Terms by posting a revised version on this page. Continued use after the update means you accept the revised Terms, except where applicable law requires additional notice or consent.',
    ],
  },
  {
    id: 'contact',
    title: 'Contact',
    body: [
      `Questions about these Terms: ${CONTACT_EMAIL}`,
    ],
    links: [
      { to: '/privacy', label: 'Privacy Policy' },
      { to: '/terms/business', label: 'Business Terms' },
      { to: '/help/reviewers', label: 'Help for reviewers' },
      { to: '/trust-centre', label: 'Trust Centre' },
    ],
  },
]

export default function TermsConsumersPage() {
  return (
    <div>
      <LegalPageHero
        title="Terms of Use for reviewers"
        description={`Rules for using ${APP_NAME} when you browse, create an account, or write reviews.`}
        meta={`Last updated: ${lastUpdated}`}
      />

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-10">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-28">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{section.title}</h2>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {section.links ? (
                <ul className="mt-4 space-y-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.to} className="text-sm font-medium text-primary-700 hover:text-primary-800">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </section>
    </div>
  )
}
