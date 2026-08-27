import { Link } from 'react-router-dom'
import { APP_NAME, BUSINESS_PORTAL_URL, CONTACT_EMAIL } from '../../utils/constants'
import LegalPageHero from '../../components/common/LegalPageHero'

const lastUpdated = 'August 2026'
const version = '1.0'

const sections = [
  {
    id: 'introduction',
    title: 'Introduction',
    body: [
      `${APP_NAME}’s review platform helps businesses engage with customers, collect feedback, and showcase trust. These Terms of Use and Sale for Businesses (“Terms”) explain what you can expect from us and what we expect from you.`,
      'Whether you use our Free plan or a paid subscription (Starter, Plus, or Premium), access to the business portal and related services is conditional on accepting these Terms. If you do not agree, you must not use the business services.',
      'You accept these Terms by doing one or more of the following: (a) creating or claiming a business account; (b) clicking to agree during setup or checkout; (c) paying for a subscription; or (d) accessing or using any business portal features.',
    ],
  },
  {
    id: 'definitions',
    title: '1. You, us, and the services',
    body: [
      `When we say “you” or “your”, we mean the business entity you represent. When we say “${APP_NAME}”, “we”, “our”, or “us”, we mean the operator of checkareview.com and the business portal.`,
      '“Platform” means our consumer review website, business portal, widgets, APIs, and related apps or pages we operate.',
      '“Services” means the business account, review invitation tools, widgets, analytics, team features, domains tools, subscription billing, and any other business features we provide now or later, including Free plan features.',
      'You must be at least 18 years old (or the age of majority where you live) and authorized to bind the business you register.',
    ],
  },
  {
    id: 'joining',
    title: '2. Joining and using the business portal',
    body: [
      'To use the services you must create a business account and complete business profile setup. Reviewer (customer) accounts and business accounts are separate, even if they use the same email address.',
      'Free plan: after setup and any required approval steps, you may use Free plan features until you upgrade, cancel, or we suspend/terminate access under these Terms.',
      'Paid plans: Starter, Plus, and Premium unlock higher limits and features (for example invitations, seats, domains, widgets, and analytics) as shown in the portal and pricing pages. Checkout and renewals are processed through our payment provider (currently Square) where enabled.',
      'You promise that you (or an affiliate you control) own or are authorized to operate the website domain(s) you register for widgets and related features.',
    ],
  },
  {
    id: 'invitations',
    title: '3. Review invitations',
    body: [
      'If you use review invitation tools, you are treated as the sender of each invitation. You alone are responsible for ensuring invitations comply with applicable privacy, anti-spam, and marketing laws.',
      'You confirm you have a lawful basis and all required rights, permissions, and consents to provide recipient contact details to us and to have invitations sent. Do not upload or invite contacts without that authority.',
      'Invitation content must be accurate, non-misleading, and consistent with our guidelines. Do not use invitations to solicit fake, biased, or incentivized reviews that violate platform rules.',
    ],
  },
  {
    id: 'account-control',
    title: '4. Business account control and team access',
    body: [
      'You control who can access your business account (“authorized users”), their roles, and permissions. You are responsible for all activity under your account and for each authorized user’s compliance with these Terms.',
      'Keep account information accurate and current. Protect usernames and passwords. Notify us promptly at the contact below if you suspect unauthorized access.',
      'If you allow affiliates or agencies to use your account, you remain responsible for their acts and omissions as if they were your own.',
    ],
  },
  {
    id: 'responsibilities',
    title: '5. Your key responsibilities',
    body: [
      'Use the services only for lawful business purposes, only for domains/profiles claimed by you, and only within your plan limits.',
      'Follow our Trust Centre guidance and help materials for businesses and reviewers. We may update those guidelines; continued use means you accept the current version.',
      'Do not market our relationship as an endorsement or partnership. Using the platform does not mean we approve your products or services.',
    ],
  },
  {
    id: 'ownership',
    title: '6. What we each own',
    body: [
      `We and our licensors own the platform, software, design, branding, and related intellectual property, except content owned by others (such as reviews owned by reviewers, and customer invitation lists you provide).`,
      'You must not copy, modify, reverse engineer, or commercially exploit the platform except as expressly allowed through the services.',
      'You own your logo, brand name, and trademarks (“Customer IP”). You grant us a license to use Customer IP as needed to operate the services (for example displaying your business profile and widgets).',
      'Reviews, replies, images, and other user-generated content you create may be hosted, displayed, distributed, and moderated by us worldwide. Public content may remain visible even after a subscription ends, unless removed for policy reasons or by the author where the product allows.',
      'We may collect and use aggregated or anonymized platform activity data (metrics, analytics, usage patterns) to improve and operate the services.',
    ],
  },
  {
    id: 'display',
    title: '7. Display of names, logos, reviews, and widgets',
    body: [
      'You allow us to display your business name, logo, and profile details on the platform so customers can identify the business being reviewed.',
      'You may display ratings and reviews on your claimed domains using the widgets and assets we provide, within your plan limits and without misleading alteration of scores or review content.',
      'Any other use of our brand marks requires our prior permission. We may revoke brand or widget use that violates these Terms or misleads consumers.',
    ],
  },
  {
    id: 'donts',
    title: '8. Don’ts',
    body: [
      'You must not:',
    ],
    bullets: [
      'Undermine security or integrity of the platform, or interfere with other users.',
      'Access systems without permission, or introduce malware.',
      'Write, submit, buy, or procure fake reviews, or manipulate ratings.',
      'Mislead consumers, violate law, or infringe others’ rights.',
      'Reverse engineer, scrape, or data-mine the platform for competing products or AI training without our written consent.',
      'Resell or sublicense the services except as we expressly allow.',
      'Abuse staff, reviewers, or other customers.',
      'Use free-form fields to store sensitive personal data unless a field explicitly requests that data.',
    ],
  },
  {
    id: 'third-party',
    title: '9. Third-party products',
    body: [
      'Integrations (for example e-commerce or payment tools) may be offered by independent providers. Their terms and privacy notices apply to those products. We do not guarantee ongoing interoperability and are not liable for third-party products.',
      'Payment processing for subscriptions is handled by providers such as Square. Card data is processed by the provider under their terms.',
    ],
  },
  {
    id: 'pricing',
    title: '10. Pricing, trials, and payments',
    body: [
      'Plan prices, limits, and billing cadence are shown in the business portal and pricing pages and in checkout. Prices are generally exclusive of applicable taxes, which you are responsible for where required.',
      'Trials (for example Plus trial periods where offered) may be limited in time and withdrawn or modified. After a trial, continued paid access requires an active subscription.',
      'Unless stated otherwise at checkout, paid subscriptions renew automatically each billing period until cancelled in the portal or otherwise ended under these Terms.',
      'Except where required by law or expressly stated by us, fees are non-refundable. Late or failed payments may result in suspension or termination of paid features.',
      'Mid-term upgrades or added domains/seats may change fees according to the then-current plan rules. Domain consolidations or reorganizations do not automatically reduce fees already owed for a billing period.',
    ],
  },
  {
    id: 'privacy',
    title: '11. Privacy and invitation data',
    body: [
      'Each party will comply with applicable privacy and data protection laws.',
      'When you provide consumer contact details for invitations, you are the controller of that invitation data and we process it to deliver invitations and operate the service. You must not send us special-category/sensitive data or health information unless we have expressly agreed in writing to process it.',
      'Personal data about your authorized users and account administrators is handled as described in our Privacy Policy.',
    ],
    links: [
      { to: '/privacy', label: 'Privacy Policy' },
    ],
  },
  {
    id: 'security',
    title: '12. Security',
    body: [
      'We use reasonable technical and organizational measures to protect the services. You must keep credentials secure, use strong account security on your side, and tell us promptly about suspected breaches involving your account.',
    ],
  },
  {
    id: 'confidentiality',
    title: '13. Confidential information',
    body: [
      'Each party will take reasonable steps to protect the other party’s non-public confidential information and use it only as needed to perform under these Terms, except where disclosure is required by law. Public reviews, published profile content, and aggregated platform activity data are not your confidential information.',
    ],
  },
  {
    id: 'termination',
    title: '14. Termination and suspension',
    body: [
      'Your rights: you may cancel auto-renewal or paid plans using portal controls where available, or by contacting support. After a paid period ends you may retain Free plan access unless the account is deleted or terminated. You remain responsible for fees owed for the current period already started.',
      'Our rights: we may suspend or terminate access immediately for material breach, guideline violations, non-payment, security risk, unlawful use, fake-review activity, or abusive conduct. We may also end Free plan access for legitimate operational or policy reasons.',
      'Sections that by nature should survive (including ownership licenses already granted, payment obligations incurred, disclaimers, liability limits, and indemnities) continue after termination.',
    ],
  },
  {
    id: 'liability',
    title: '15. Disclaimers, liability, and indemnity',
    body: [
      'To the fullest extent permitted by law, the services and platform are provided “as is” and “as available,” without warranties of uninterrupted or error-free operation.',
      'Except for liabilities that cannot be limited under applicable law, neither party is liable for indirect, incidental, special, consequential, or lost-profit damages. Our total aggregate liability arising from the business services is limited to the fees you paid us for those services in the 12 months before the claim.',
      'You will indemnify us against losses arising from your invitations, fake or unlawful content you submit or procure, misuse of the services, or your breach of privacy laws related to invitation data.',
      'We will indemnify you against third-party claims that our unmodified platform brand marks (excluding user-generated content) infringe that third party’s IP, subject to prompt notice and reasonable cooperation.',
    ],
  },
  {
    id: 'housekeeping',
    title: '16. Important housekeeping',
    body: [
      'We do not provide legal, tax, or financial advice. Help articles and templates are informational only.',
      'We may update these Terms by posting a new version on this page. Material changes may also be notified by email or in-product notice where practical. Continued use after the effective date constitutes acceptance, except where law requires otherwise.',
      'We may change or discontinue features. We are not liable for delays caused by events beyond reasonable control.',
      `Notices to us: ${CONTACT_EMAIL} or the Contact page. Notices to you: the email on your business account.`,
      'We may assign these Terms to an affiliate or successor. You may not assign without our prior written consent.',
      'If any provision is unenforceable, the rest remains in effect. Failure to enforce a provision is not a waiver.',
      'These Terms (plus any order/checkout details for your current plan) are the entire agreement for the business services and supersede prior discussions on that subject.',
      'Governing law and venue will be the laws and courts of the jurisdiction where Check A Review primarily operates its business, unless mandatory local consumer/business protections require otherwise.',
    ],
  },
  {
    id: 'contact',
    title: '17. Contact and related pages',
    body: [
      `Questions about these Business Terms: ${CONTACT_EMAIL}`,
    ],
    links: [
      { to: '/privacy', label: 'Privacy Policy' },
      { to: '/terms', label: 'Terms of Use for reviewers' },
      { to: '/help/businesses', label: 'Help for businesses' },
      { to: '/trust-centre', label: 'Trust Centre' },
      { href: `${BUSINESS_PORTAL_URL}/pricing`, label: 'Plans & pricing' },
      { href: `${BUSINESS_PORTAL_URL}/setup`, label: 'Create business account' },
      { to: '/contact', label: 'Contact us' },
    ],
  },
]

export default function TermsBusinessPage() {
  return (
    <div>
      <LegalPageHero
        title="Terms of Use and Sale for Businesses"
        description={`Legal terms for Free and paid business plans on ${APP_NAME}, including invitations, widgets, team access, and subscriptions.`}
        meta={`Last updated: ${lastUpdated} · Version ${version}`}
      />

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
          <nav className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">On this page</p>
            <ul className="mt-4 max-h-[70vh] space-y-2 overflow-y-auto pr-2">
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
