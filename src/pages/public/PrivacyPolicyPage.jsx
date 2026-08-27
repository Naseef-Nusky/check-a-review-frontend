import { Link } from 'react-router-dom'
import { APP_NAME, BUSINESS_PORTAL_URL, CONTACT_EMAIL } from '../../utils/constants'
import LegalPageHero from '../../components/common/LegalPageHero'

const lastUpdated = 'August 2026'

const sections = [
  {
    id: 'summary',
    title: 'Summary',
    body: [
      `This Privacy Policy explains how ${APP_NAME} (“we”, “our”, or “us”) collects, uses, shares, and protects personal data when you use our websites and services, including the consumer site and the business portal.`,
      `It applies to reviewers (customers), business users, and visitors. It does not apply to third-party websites linked from our platform.`,
    ],
  },
  {
    id: 'controller',
    title: 'Who is responsible',
    body: [
      `${APP_NAME} operates checkareview.com and related business portal pages. For questions about this policy or your personal data, contact us at ${CONTACT_EMAIL}.`,
      'When a business sends you a review invitation through our tools, that business is typically the controller of the invitation contact details they provide. We process that data to send the invitation and operate the service on their behalf.',
    ],
  },
  {
    id: 'data-we-collect',
    title: 'Personal data we collect',
    body: [
      'We may collect the following categories of personal data, depending on how you use the platform:',
    ],
    bullets: [
      'Account data: name, email address, password (stored as a secure hash), role (customer, business, or admin), and profile details you choose to add (such as avatar).',
      'Google sign-in data: if you continue with Google, we receive a verified email, name, and Google account identifier so we can create or link your customer account. We do not receive your Google password.',
      'Review content: star rating, review text, related business, timestamps, edits, and any media you attach where supported.',
      'Business profile data: company name, website/domain, category, description, logo, and other details you publish on your business profile.',
      'Business replies and team data: replies to reviews, team member emails/roles, and invitation records.',
      'Review invitations: recipient name/email and reference details supplied by a business so we can send invitation emails.',
      'Usage and device data: IP address, browser type, approximate location derived from IP, pages visited, and basic diagnostics needed for security and performance.',
      'Billing data for businesses: subscription plan, payment status, and payment provider references (for example Square). Card details are processed by the payment provider, not stored as full card numbers on our servers.',
      'Support communications: messages you send via contact forms or email.',
    ],
  },
  {
    id: 'public-data',
    title: 'What is public on the platform',
    body: [
      `${APP_NAME} is an open review platform. Content you publish can be visible to other visitors, search engines, and anyone who can access a public business page.`,
      'Public information typically includes your display name or username, review text and rating, business profile information, and business replies. Do not include sensitive personal information (health data, government IDs, financial account numbers, etc.) in reviews or replies.',
    ],
  },
  {
    id: 'how-we-collect',
    title: 'How we collect data',
    body: [
      'We collect data directly from you (registration, profile updates, reviews, contact forms), automatically from your device when you use the site, and from third parties when you choose them (for example Google sign-in) or when a business uploads invitation details.',
    ],
  },
  {
    id: 'how-we-use',
    title: 'How we use personal data',
    body: [
      'We use personal data to:',
    ],
    bullets: [
      'Provide and operate the platform (accounts, reviews, business profiles, widgets, invitations).',
      'Authenticate users (email/password or Google) and keep sessions secure.',
      'Moderate content, including AI-assisted screening for spam, abuse, and policy risks, with human review when needed.',
      'Send transactional emails such as verification codes, password resets, review invitations, and subscription notices.',
      'Process business subscriptions and related billing events.',
      'Respond to support requests and improve product quality and reliability.',
      'Detect fraud, abuse, and security incidents, and comply with legal obligations.',
    ],
  },
  {
    id: 'legal-bases',
    title: 'Why we process data (legal bases)',
    body: [
      'Where applicable privacy laws require a legal basis, we rely on one or more of the following: performance of a contract with you; our legitimate interests in operating a safe review platform; compliance with legal obligations; and consent where we ask for it (for example certain marketing preferences). You may withdraw consent where processing is based on consent.',
    ],
  },
  {
    id: 'sharing',
    title: 'Who may access your data',
    body: [
      'We share data only as needed to run the service:',
    ],
    bullets: [
      'Public visitors see published reviews, ratings, and business profile content.',
      'Businesses can see reviews about them, invitation delivery status related to invitations they sent, and team/account data for their portal.',
      'Service providers that help us operate the platform (for example hosting, email delivery, payment processing, and AI moderation providers) under appropriate agreements.',
      'Authorities or other parties when required by law, or to protect rights, safety, and the integrity of the platform.',
      'A successor entity if we are involved in a merger, acquisition, or asset transfer, subject to this policy’s protections.',
    ],
  },
  {
    id: 'retention',
    title: 'How long we keep data',
    body: [
      'We keep personal data only as long as needed for the purposes described above, including providing the service, resolving disputes, enforcing agreements, and meeting legal or accounting requirements.',
      'If you delete your account, we remove or anonymize personal data that is no longer required, except information we must retain for security, fraud prevention, legal compliance, or legitimate business records (for example published review history that remains necessary for platform integrity).',
    ],
  },
  {
    id: 'security',
    title: 'How we protect data',
    body: [
      'We use technical and organizational measures appropriate to the risk, including encrypted transport (HTTPS), hashed passwords, access controls, and monitoring. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.',
    ],
  },
  {
    id: 'cookies',
    title: 'Cookies and similar technologies',
    body: [
      'We use essential cookies and local storage needed for login sessions and core site functionality. We may also use analytics or preference technologies to understand usage and improve the product. You can control cookies through your browser settings; disabling essential storage may break sign-in or other features.',
    ],
  },
  {
    id: 'rights',
    title: 'Your rights',
    body: [
      'Depending on where you live, you may have rights to access, correct, delete, or export personal data, object to or restrict certain processing, and lodge a complaint with a supervisory authority.',
      `You can update many account details in your profile settings. For other requests, email ${CONTACT_EMAIL}. We may need to verify your identity before fulfilling a request.`,
    ],
  },
  {
    id: 'children',
    title: 'Children',
    body: [
      `Our services are not directed to children under 18, and we do not knowingly collect personal data from children under 18. If you believe a child has provided personal data, contact ${CONTACT_EMAIL} so we can take appropriate action.`,
    ],
  },
  {
    id: 'international',
    title: 'International processing',
    body: [
      'We may process and store data on servers or with providers located in different countries. Where required, we use appropriate safeguards for cross-border transfers.',
    ],
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    body: [
      'We may update this Privacy Policy from time to time. We will post the updated version on this page and change the “Last updated” date. If changes are material, we may provide additional notice through the site or by email.',
    ],
  },
  {
    id: 'contact',
    title: 'Contact us',
    body: [
      `Privacy requests and questions: ${CONTACT_EMAIL}`,
      'Related pages:',
    ],
    links: [
      { to: '/terms', label: 'Terms of Use for reviewers' },
      { to: '/terms/business', label: 'Terms of Use for businesses' },
      { to: '/trust-centre', label: 'Trust Centre' },
      { to: '/contact', label: 'Contact' },
      { href: `${BUSINESS_PORTAL_URL}/setup`, label: 'Business portal setup' },
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <div>
      <LegalPageHero
        title="Privacy Policy"
        description={`How ${APP_NAME} collects, uses, and protects personal data for reviewers and businesses.`}
        meta={`Last updated: ${lastUpdated}`}
      />

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
          <nav className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">On this page</p>
            <ul className="mt-4 space-y-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="text-sm text-slate-600 transition hover:text-primary-700">
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <article className="space-y-10">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{section.title}</h2>
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {section.bullets ? (
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-600">
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                {section.links ? (
                  <ul className="mt-4 space-y-2">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        {link.href ? (
                          <a href={link.href} className="text-sm font-medium text-primary-700 hover:text-primary-800">
                            {link.label}
                          </a>
                        ) : (
                          <Link to={link.to} className="text-sm font-medium text-primary-700 hover:text-primary-800">
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </article>
        </div>
      </section>
    </div>
  )
}
