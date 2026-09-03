import { CONTACT_EMAIL } from '../../utils/constants'
import LegalDocumentLayout, { LegalH2, LegalP, LegalUl } from '../../components/common/LegalDocumentLayout'

export default function PrivacyPolicyPage() {
  return (
    <LegalDocumentLayout title="Privacy Policy">
      <h2 className="text-xl font-semibold tracking-tight text-slate-900">CheckAReview Privacy Policy</h2>

      <LegalH2 id="introduction">Introduction</LegalH2>
      <LegalP>
        CheckAReview (“we”, “our”) operates an open review platform. This policy explains how we collect, use, and protect your personal data when you use CheckAReview.com and related services (“our platform”).
      </LegalP>

      <LegalH2 id="terms-we-use">Terms We Use</LegalH2>
      <LegalUl>
        <li>“CheckAReview”: CheckAReview.com, the data controller</li>
        <li>“Platform”: All CheckAReview websites, apps, and services</li>
        <li>“Public personal data”: Information visible to all platform visitors</li>
        <li>“Private personal data”: Non-public information we process</li>
      </LegalUl>

      <LegalH2 id="third-party">Third-Party Websites</LegalH2>
      <LegalP>
        Our platform may link to external sites. We don’t control their privacy practices. Always review their policies separately.
      </LegalP>

      <LegalH2 id="open-platform">We’re an Open Platform</LegalH2>
      <LegalP>When you participate:</LegalP>
      <LegalUl>
        <li>Reviews/profile details are publicly visible</li>
        <li>Businesses may publicly reply to reviews</li>
        <li>You control profile information visibility</li>
      </LegalUl>

      <LegalH2 id="personal-data">Personal Data We Collect</LegalH2>
      <p className="mt-4 font-medium text-slate-800">Public Personal Data</p>
      <LegalUl>
        <li>Profile identifiers (username, photo)</li>
        <li>Country location</li>
        <li>Review content (text, ratings, media)</li>
        <li>Business/product names reviewed</li>
        <li>Dates of experiences/reviews</li>
        <li>Social connections (if linked)</li>
      </LegalUl>
      <p className="mt-4 font-medium text-slate-800">Private Personal Data</p>
      <LegalUl>
        <li>Contact details (email, name)</li>
        <li>Account credentials</li>
        <li>Device/IP information</li>
        <li>Usage analytics</li>
        <li>Verification documents</li>
        <li>Communication records</li>
      </LegalUl>
      <p className="mt-4 font-medium text-slate-800">Business-Specific Data</p>
      <LegalUl>
        <li>Company registration details</li>
        <li>Employee contact information</li>
        <li>Payment/banking data (paid services)</li>
      </LegalUl>

      <LegalH2 id="how-we-collect">How We Collect Personal Data</LegalH2>
      <p className="mt-4 font-medium text-slate-800">Directly From You:</p>
      <LegalUl>
        <li>Account registration</li>
        <li>Review submissions</li>
        <li>Customer support inquiries</li>
      </LegalUl>
      <p className="mt-4 font-medium text-slate-800">From Third Parties:</p>
      <LegalUl>
        <li>Business partners (review invitations)</li>
        <li>Social media platforms</li>
        <li>Fraud detection services</li>
      </LegalUl>
      <p className="mt-4 font-medium text-slate-800">Automatically:</p>
      <LegalUl>
        <li>Cookies and tracking technologies</li>
        <li>Server logs</li>
        <li>Device/browser data</li>
      </LegalUl>

      <LegalH2 id="controllers">Data Controllers & Processors</LegalH2>
      <LegalUl>
        <li>Primary Controller: CheckAReview.com for platform operations</li>
        <li>Joint Controllers: Businesses for invitation data</li>
        <li>Processors: Vendors with strict contractual obligations</li>
      </LegalUl>

      <LegalH2 id="why-we-process">Why We Process Your Data</LegalH2>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="py-2 pr-4 font-semibold text-slate-900">Purpose</th>
              <th className="py-2 font-semibold text-slate-900">Legal Basis</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100">
              <td className="py-2 pr-4">Account management</td>
              <td className="py-2">Contract fulfilment</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-2 pr-4">Review publication</td>
              <td className="py-2">Legitimate interest</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-2 pr-4">Fraud prevention</td>
              <td className="py-2">Legal obligation</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-2 pr-4">Service improvements</td>
              <td className="py-2">Legitimate interest</td>
            </tr>
            <tr>
              <td className="py-2 pr-4">Marketing*</td>
              <td className="py-2">Consent</td>
            </tr>
          </tbody>
        </table>
      </div>
      <LegalP>*Where required by law</LegalP>

      <LegalH2 id="data-sharing">Data Sharing</LegalH2>
      <p className="mt-4 font-medium text-slate-800">Public Data Recipients:</p>
      <LegalUl>
        <li>Search engines</li>
        <li>Business partners</li>
        <li>Licensed third parties</li>
      </LegalUl>
      <p className="mt-4 font-medium text-slate-800">Private Data Recipients:</p>
      <LegalUl>
        <li>Payment processors</li>
        <li>Cloud service providers</li>
        <li>Legal authorities (when required)</li>
      </LegalUl>

      <LegalH2 id="transfers">International Transfers</LegalH2>
      <LegalP>
        We use EU SCCs, UK IDTAs, and equivalent safeguards for cross-border data transfers.
      </LegalP>

      <LegalH2 id="retention">Data Retention</LegalH2>
      <LegalUl>
        <li>Active accounts: Until deletion request</li>
        <li>Legal requirements: Per applicable laws</li>
        <li>Financial records: 7 years</li>
      </LegalUl>

      <LegalH2 id="rights">Your Rights</LegalH2>
      <LegalP>You may:</LegalP>
      <LegalUl>
        <li>Access your data</li>
        <li>Request corrections</li>
        <li>Delete your account*</li>
        <li>Restrict processing</li>
        <li>Object to processing</li>
        <li>Data portability</li>
      </LegalUl>
      <LegalP>*Subject to legal retention requirements</LegalP>

      <LegalH2 id="security">Security Measures</LegalH2>
      <LegalP>We implement:</LegalP>
      <LegalUl>
        <li>Encryption</li>
        <li>Access controls</li>
        <li>Regular security audits</li>
        <li>Staff training programs</li>
      </LegalUl>

      <LegalH2 id="cookies">Cookies & Tracking</LegalH2>
      <LegalP>We use:</LegalP>
      <LegalUl>
        <li>Essential cookies (non-optional)</li>
        <li>Analytics cookies (opt-out available)</li>
        <li>Marketing cookies (consent-based)</li>
      </LegalUl>

      <LegalH2 id="children">Children’s Privacy</LegalH2>
      <LegalP>
        Our platform is not designed for users under 18. We do not knowingly collect their data.
      </LegalP>

      <LegalH2 id="changes">Policy Changes</LegalH2>
      <LegalP>Material updates will be communicated via:</LegalP>
      <LegalUl>
        <li>Platform notifications</li>
        <li>Email (for account holders)</li>
        <li>Revised effective dates</li>
      </LegalUl>

      <LegalH2 id="contact">Contact Us</LegalH2>
      <LegalP>Data Protection Officer</LegalP>
      <LegalP>CheckAReview.</LegalP>
      <LegalP>125 Deansgate, Greater Manchester, M3 2BY</LegalP>
      <LegalP>Email: {CONTACT_EMAIL}</LegalP>
    </LegalDocumentLayout>
  )
}
