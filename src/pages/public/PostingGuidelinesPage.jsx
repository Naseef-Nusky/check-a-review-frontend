import LegalDocumentLayout, { LegalH2, LegalP, LegalUl } from '../../components/common/LegalDocumentLayout'

export default function PostingGuidelinesPage() {
  return (
    <LegalDocumentLayout title="Posting Guidelines">
      <h2 className="text-xl font-semibold tracking-tight text-slate-900">CheckAReview Posting Guidelines</h2>

      <LegalH2 id="purpose">Our purpose</LegalH2>
      <LegalP>
        CheckAReview helps consumers and businesses build trust through transparent feedback. Our platform is open, independent, and impartial. By participating, you agree to these Guidelines, our Terms of Use, and all policies on CheckAReview.com
      </LegalP>

      <LegalH2 id="key-takeaways">Key takeaways</LegalH2>
      <LegalUl>
        <li>Read vs. Write: Anyone can read reviews; an account is required to write one.</li>
        <li>Genuine experiences: Base reviews on firsthand interactions with businesses/products.</li>
        <li>No incentives: Don’t accept payments, discounts, or gifts for reviews.</li>
        <li>Be respectful: Avoid harmful, illegal, or promotional content.</li>
        <li>Edit/delete: Modify or remove your reviews anytime.</li>
        <li>No fakes: Fraudulent reviews will be deleted.</li>
        <li>Flagging: Report suspicious content via platform tools.</li>
      </LegalUl>

      <LegalH2 id="reviewers">Guidelines for Reviewers</LegalH2>
      <p className="mt-4 font-medium text-slate-800">Authentic Reviews</p>
      <LegalUl>
        <li>Must reflect your direct experience with a business/service.</li>
        <li>No reviews for:</li>
      </LegalUl>
      <LegalUl>
        <li>Businesses you own/compete with</li>
        <li>Transactions older than 24 months</li>
      </LegalUl>

      <p className="mt-4 font-medium text-slate-800">Prohibited Content</p>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="py-2 pr-4 font-semibold text-slate-900">Original</th>
              <th className="py-2 font-semibold text-slate-900">Adapted</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100">
              <td className="py-2 pr-4">“Incentivized reviews”</td>
              <td className="py-2">“Reviews tied to compensation”</td>
            </tr>
            <tr>
              <td className="py-2 pr-4">“Harmful content”</td>
              <td className="py-2">“Defamatory/abusive language”</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-4 font-medium text-slate-800">Enforcement</p>
      <LegalUl>
        <li>CheckAReview may remove violating content without notice.</li>
        <li>Repeat offenders face account suspension.</li>
      </LegalUl>
    </LegalDocumentLayout>
  )
}
