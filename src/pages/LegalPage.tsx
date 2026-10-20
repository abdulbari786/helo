import { Seo } from '@/lib/seo'
import { site } from '@content/site'
import { PageHeader } from '@/components/PageHeader'

/**
 * Privacy Policy and Terms of Use: sensible TEMPLATES, flagged for review by qualified counsel
 * before launch (site.legal.reviewedByCounsel). The review notice shows in development only.
 */
export default function LegalPage({ kind }: { kind: 'privacy' | 'terms' }) {
  const isPrivacy = kind === 'privacy'
  const title = isPrivacy ? 'Privacy Policy' : 'Terms of Use'
  const path = `/${kind}`
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: title, path },
  ]
  const { name, contact, legal } = site
  const mail = (
    <a href={contact.emailHref}>
      {contact.email}
    </a>
  )
  return (
    <>
      <Seo title={title} description={`${title} for the ${name} website.`} path={path} breadcrumbs={crumbs} />
      <PageHeader crumbs={crumbs} title={title} lede={`Last updated ${legal.lastUpdated}`} />
      <div className="container py-16">
        {import.meta.env.DEV && !legal.reviewedByCounsel && (
          <p className="mb-8 rounded-xl border border-danger/40 bg-danger/5 p-4 text-fluid-sm text-danger">
            Development note: this is a template. Have it reviewed by qualified counsel and set <code>site.legal.reviewedByCounsel</code> to true.
          </p>
        )}
        <div className="prose-dx max-w-[72ch]">
          {isPrivacy ? (
            <>
              <p>
                This policy explains how {legal.entityName} (&quot;{site.shortName}&quot;, &quot;we&quot;, &quot;us&quot;) collects and uses personal
                information when you visit this website or contact us. If you have questions, email {mail}.
              </p>
              <h2>Information we collect</h2>
              <ul>
                <li>Details you send through our enquiry form: name, work email, company, role, your message, and any optional budget, timeline or referral information.</li>
                <li>Information you share when you call, message us on WhatsApp, email us or book a call through our scheduling provider.</li>
                <li>Basic technical and usage information, such as pages visited and device type, if analytics is enabled. We use privacy-friendly analytics and only set analytics cookies with your consent.</li>
              </ul>
              <h2>How we use it</h2>
              <ul>
                <li>To reply to your enquiry, arrange calls and prepare proposals you ask for.</li>
                <li>To understand which parts of the website are useful and improve it.</li>
                <li>To meet legal, tax and accounting obligations if we enter into a contract with you.</li>
              </ul>
              <p>We do not sell your personal information, and we do not use it for advertising profiles.</p>
              <h2>Service providers</h2>
              <p>
                We use trusted providers to run this website and handle communication, for example website hosting, email delivery for form submissions,
                calendar scheduling and analytics. They process information only on our instructions and under their own security and privacy terms.
              </p>
              <h2>How long we keep it</h2>
              <p>
                We keep enquiry information for as long as needed to respond and follow up, and for any longer period required by law or for an active
                business relationship. You can ask us to delete it at any time.
              </p>
              <h2>Your choices and rights</h2>
              <p>
                Depending on where you live, including under India&apos;s Digital Personal Data Protection Act, 2023 and the UK GDPR, you may have the
                right to access, correct or delete your personal information, to withdraw consent, and to complain to a regulator. To make a request,
                email {mail}.
              </p>
              <h2>Security</h2>
              <p>We use reasonable technical and organisational measures to protect personal information. No method of transmission over the internet is completely secure.</p>
              <h2>International transfers</h2>
              <p>Our service providers may process information in other countries. Where required, we rely on appropriate safeguards for those transfers.</p>
              <h2>Changes</h2>
              <p>We may update this policy from time to time. The &quot;last updated&quot; date above shows when it last changed.</p>
              <h2>Contact</h2>
              <p>
                {legal.entityName}
                {legal.registeredAddress && `, ${legal.registeredAddress}`}. Email {mail} or call <a href={contact.phoneHref}>{contact.phoneDisplay}</a>.
              </p>
            </>
          ) : (
            <>
              <p>
                These terms apply to your use of the {name} website. By using the site you agree to them. Engagements for services are governed by a
                separate written proposal or statement of work, which takes precedence over these terms.
              </p>
              <h2>Website content</h2>
              <p>
                Content on this site is for general information. Service descriptions, packages and timelines are indicative; scope, price and dates
                are confirmed only in a signed proposal after discovery. Case studies describe past work; outcomes depend on each client&apos;s data,
                systems and context, and are not a guarantee of future results.
              </p>
              <h2>Intellectual property</h2>
              <p>
                Unless stated otherwise, the content, design and branding on this site belong to {legal.entityName}. Third-party names and trademarks
                belong to their owners and are used with permission or for identification only.
              </p>
              <h2>Acceptable use</h2>
              <p>Please do not misuse the site, for example by attempting to disrupt it, gain unauthorised access, or submit spam or malicious content through our forms.</p>
              <h2>Links to other sites</h2>
              <p>We link to external sites (for example app stores and client websites). We are not responsible for their content or practices.</p>
              <h2>Limitation of liability</h2>
              <p>
                To the extent permitted by law, we are not liable for any loss arising from use of, or reliance on, information on this website. Nothing
                in these terms limits liability that cannot be limited by law.
              </p>
              <h2>Governing law</h2>
              <p>These terms are governed by the laws of {legal.governingLaw}, unless a written agreement with you says otherwise.</p>
              <h2>Contact</h2>
              <p>Questions about these terms: email {mail}.</p>
            </>
          )}
        </div>
      </div>
    </>
  )
}
