import LegalDocumentLayout, { LegalH2, LegalP, LegalUl } from '../../components/common/LegalDocumentLayout'

export default function CookiePolicyPage() {
  return (
    <LegalDocumentLayout title="Cookie Policy">
      <p className="font-medium text-slate-800">Cookie Policy for CheckAReview</p>
      <LegalP>Version 1.0</LegalP>
      <LegalP>
        At CheckAReview, we are committed to transparency about how we collect and use data related to you. This Cookie Policy forms part of our broader Privacy Policy and explains how we use cookies and similar technologies when you interact with our website.
      </LegalP>
      <LegalP>
        When we refer to “CheckAReview”, “we”, “our”, or “us”, we mean CheckAReview, 125 Deansgate, Greater Manchester, M3 2BY. The terms “website” or “platform” encompass all websites and applications operated by CheckAReview.
      </LegalP>

      <LegalH2 id="what-is-a-cookie">What is a Cookie?</LegalH2>
      <LegalP>
        A cookie is a small text file stored on your device by your web browser when you visit a website or use an application. Cookies help us remember your preferences and settings, ensuring a consistent and tailored experience. They also allow us to test new features and track their effectiveness.
      </LegalP>
      <LegalP>
        Some cookies are temporary (“session cookies”) and are deleted once you leave our website. Others (“persistent cookies”) remain on your device until they expire or you delete them, enabling us to recognise you on future visits.
      </LegalP>
      <LegalP>
        In addition to cookies, we may use similar technologies such as tags, tracking pixels, local storage, scripts, and device identifiers. These technologies work alongside cookies to store or transmit information about your interactions with our platform.
      </LegalP>
      <LegalP>
        For simplicity, this policy refers to all these technologies collectively as “cookies”. For more details, see the section below titled Types of Cookies and How We Use Them.
      </LegalP>
      <LegalP>
        We may update the cookies we use and revise this policy accordingly. Significant changes will be communicated to you when you next access our services or through other appropriate channels.
      </LegalP>

      <LegalH2 id="first-third-party">First-Party vs. Third-Party Cookies</LegalH2>
      <LegalUl>
        <li>First-party cookies are set by our website and can only be accessed by us.</li>
        <li>
          Third-party cookies are set by external parties, such as advertisers or analytics providers, and may track your activity across other websites that use the same services.
        </li>
      </LegalUl>
      <LegalP>Our website may use cookies set by us, our partners, or independent third parties.</LegalP>

      <LegalH2 id="types">Types of Cookies and How We Use Them</LegalH2>
      <p className="mt-4 font-medium text-slate-800">Strictly Necessary Cookies</p>
      <LegalP>
        These cookies are essential for the basic functionality of our website and cannot be disabled. They enable features such as login processes, language preferences, and geographic location settings. They also help us remember your cookie preferences and track your acceptance of our Privacy Policy and Terms & Conditions.
      </LegalP>
      <p className="mt-4 font-medium text-slate-800">Performance Cookies</p>
      <LegalP>
        Performance cookies collect anonymous data about how visitors use our website. This information helps us identify issues, improve user experience, and make informed decisions about enhancements. You can opt out of these cookies (see How to Manage Cookies below).
      </LegalP>
      <p className="mt-4 font-medium text-slate-800">Functionality Cookies</p>
      <LegalP>
        These cookies remember your preferences (e.g., username, language, or browser settings) to provide a personalised experience. They enhance the usability of our website by retaining your configured settings.
      </LegalP>
      <p className="mt-4 font-medium text-slate-800">Marketing Cookies</p>
      <LegalP>
        Marketing cookies help us deliver relevant advertisements based on your interests and browsing behaviour. Third-party advertisers may use these cookies to show you targeted ads across different devices. To opt out, refer to the instructions in How to Manage Cookies.
      </LegalP>

      <LegalH2 id="manage">How to Manage Cookies</LegalH2>
      <LegalP>
        You can decline non-essential cookies by clicking Cookie Preferences in the footer of our website.
      </LegalP>
      <LegalP>
        If you have an account with us, you can adjust your cookie settings by selecting Cookie Preferences from the drop-down menu under your profile icon
      </LegalP>
    </LegalDocumentLayout>
  )
}
