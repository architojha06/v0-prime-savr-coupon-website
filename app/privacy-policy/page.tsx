export default function PrivacyPolicy() {
  return (
    <>
      <style>{`
        .ps-page-hero { background: #FFFFFF; border-bottom: 1px solid #E8E8E8; padding: 56px 32px 48px; text-align: center; }
        .ps-page-tag { display: inline-block; background: #FFF0E8; color: #E8601C; font-size: 11px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; padding: 5px 14px; border-radius: 20px; margin-bottom: 18px; }
        .ps-page-hero h1 { font-family: 'Fraunces', serif; font-size: clamp(32px, 5vw, 48px); color: #1A1A1A; font-weight: 600; line-height: 1.15; margin-bottom: 14px; }
        .ps-page-hero p { color: #7A7A7A; font-size: 15px; font-weight: 300; }
        .ps-layout { max-width: 1100px; margin: 0 auto; padding: 60px 32px; display: grid; grid-template-columns: 220px 1fr; gap: 56px; align-items: start; }
        .ps-toc { position: sticky; top: 80px; background: #FFFFFF; border: 1px solid #E8E8E8; border-radius: 12px; padding: 24px; }
        .ps-toc-title { font-size: 11px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; color: #7A7A7A; margin-bottom: 16px; }
        .ps-toc a { display: block; font-size: 13.5px; color: #3D3D3D; text-decoration: none; padding: 6px 0; border-bottom: 1px solid #E8E8E8; transition: color 0.2s; }
        .ps-toc a:last-child { border-bottom: none; }
        .ps-toc a:hover { color: #E8601C; }
        .ps-content section { background: #FFFFFF; border: 1px solid #E8E8E8; border-radius: 12px; padding: 36px 40px; margin-bottom: 24px; }
        .ps-section-num { font-size: 11px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; color: #E8601C; margin-bottom: 8px; }
        .ps-content h2 { font-family: 'Fraunces', serif; font-size: 22px; font-weight: 600; color: #1A1A1A; margin-bottom: 18px; padding-bottom: 14px; border-bottom: 1px solid #E8E8E8; }
        .ps-content p { font-size: 14.5px; color: #3D3D3D; margin-bottom: 14px; font-weight: 300; }
        .ps-content p:last-child { margin-bottom: 0; }
        .ps-content ul { padding-left: 20px; margin-bottom: 14px; }
        .ps-content ul li { font-size: 14.5px; color: #3D3D3D; margin-bottom: 8px; font-weight: 300; }
        .ps-highlight-box { background: #FFF8F5; border-left: 3px solid #E8601C; border-radius: 0 8px 8px 0; padding: 16px 20px; margin: 18px 0; font-size: 14px; color: #3D3D3D; font-weight: 300; }
        .ps-data-table { width: 100%; border-collapse: collapse; margin: 18px 0; font-size: 14px; }
        .ps-data-table th { background: #F7F6F3; font-weight: 500; text-align: left; padding: 12px 16px; border: 1px solid #E8E8E8; color: #1A1A1A; }
        .ps-data-table td { padding: 11px 16px; border: 1px solid #E8E8E8; color: #3D3D3D; font-weight: 300; vertical-align: top; }
        .ps-data-table tr:nth-child(even) td { background: #FAFAF9; }
        @media (max-width: 768px) {
          .ps-layout { grid-template-columns: 1fr; gap: 32px; }
          .ps-toc { position: static; }
          .ps-content section { padding: 24px 20px; }
        }
      `}</style>

      <div className="ps-page-hero">
        <div className="ps-page-tag">Legal</div>
        <h1>Privacy Policy</h1>
        <p>Last updated: June 2025 &nbsp;·&nbsp; Compliant with Indian IT Laws &amp; DPDP Act, 2023</p>
      </div>

      <div className="ps-layout">
        <aside className="ps-toc">
          <div className="ps-toc-title">On this page</div>
          <a href="#overview">1. Overview</a>
          <a href="#collection">2. Data We Collect</a>
          <a href="#usage">3. How We Use It</a>
          <a href="#sharing">4. Sharing Your Data</a>
          <a href="#cookies">5. Cookies &amp; Tracking</a>
          <a href="#storage">6. Data Storage</a>
          <a href="#rights">7. Your Rights</a>
          <a href="#children">8. Children&apos;s Privacy</a>
          <a href="#changes">9. Policy Changes</a>
          <a href="#contact">10. Contact / DPO</a>
        </aside>

        <div className="ps-content">
          <section id="overview">
            <div className="ps-section-num">Section 01</div>
            <h2>Overview</h2>
            <p>PrimeSavr (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) values the privacy of our users. This Privacy Policy explains how we collect, use, store, and protect your personal data when you use our affiliate and cashback platform.</p>
            <p>This policy is compliant with the <strong>Information Technology Act, 2000</strong>, the <strong>IT (Reasonable Security Practices) Rules, 2011</strong>, and the <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong> of India.</p>
            <div className="ps-highlight-box">By using PrimeSavr, you consent to the collection and use of your data as described in this policy.</div>
          </section>

          <section id="collection">
            <div className="ps-section-num">Section 02</div>
            <h2>Data We Collect</h2>
            <p>We collect the following categories of personal data:</p>
            <table className="ps-data-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Data Points</th>
                  <th>Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Identity</td><td>Name, email address, phone number</td><td>Account creation &amp; verification</td></tr>
                <tr><td>Financial</td><td>Bank account / UPI ID</td><td>Cashback withdrawals</td></tr>
                <tr><td>Usage Data</td><td>Click data, affiliate link tracking, pages visited</td><td>Cashback tracking &amp; analytics</td></tr>
                <tr><td>Device Data</td><td>IP address, browser type, OS</td><td>Security &amp; fraud prevention</td></tr>
                <tr><td>Transaction Data</td><td>Merchant name, order value, cashback earned</td><td>Reward calculations</td></tr>
              </tbody>
            </table>
          </section>

          <section id="usage">
            <div className="ps-section-num">Section 03</div>
            <h2>How We Use Your Data</h2>
            <p>Your data is used strictly for the following purposes:</p>
            <ul>
              <li>Creating and managing your PrimeSavr account</li>
              <li>Tracking affiliate clicks and crediting cashback rewards accurately</li>
              <li>Processing cashback withdrawals to your verified payment method</li>
              <li>Sending transactional emails (cashback confirmations, withdrawal updates)</li>
              <li>Fraud detection and platform security</li>
              <li>Improving platform performance through anonymised analytics</li>
              <li>Complying with legal obligations under Indian law</li>
            </ul>
            <p>We do <strong>not</strong> use your data for unsolicited marketing without your explicit consent.</p>
          </section>

          <section id="sharing">
            <div className="ps-section-num">Section 04</div>
            <h2>Sharing Your Data</h2>
            <p>We do not sell your personal data. We may share it with:</p>
            <ul>
              <li><strong>Affiliate Networks &amp; Merchants:</strong> Only transaction identifiers (no personal details) to track and validate cashback</li>
              <li><strong>Payment Processors:</strong> Bank/UPI details shared securely with RBI-regulated payment gateways for withdrawals</li>
              <li><strong>Analytics Providers:</strong> Anonymised usage data only</li>
              <li><strong>Legal Authorities:</strong> When required by law, court order, or government directive under Indian law</li>
            </ul>
            <div className="ps-highlight-box">We ensure all third-party service providers are bound by data processing agreements that uphold standards equivalent to this policy.</div>
          </section>

          <section id="cookies">
            <div className="ps-section-num">Section 05</div>
            <h2>Cookies &amp; Tracking</h2>
            <p>PrimeSavr uses cookies and similar tracking technologies to:</p>
            <ul>
              <li>Track affiliate link clicks for cashback attribution</li>
              <li>Maintain your login session</li>
              <li>Understand how users navigate the platform</li>
            </ul>
            <p>You can manage cookie preferences through your browser settings. However, disabling cookies may affect cashback tracking functionality.</p>
          </section>

          <section id="storage">
            <div className="ps-section-num">Section 06</div>
            <h2>Data Storage &amp; Security</h2>
            <p>Your data is stored on secure servers located in India. We implement industry-standard security measures including:</p>
            <ul>
              <li>SSL/TLS encryption for all data transmissions</li>
              <li>Encrypted storage for sensitive financial data</li>
              <li>Access controls — only authorised personnel can access personal data</li>
              <li>Regular security audits</li>
            </ul>
            <p>We retain your data for as long as your account is active, or as required by applicable Indian law. Inactive accounts may be purged after 24 months of inactivity.</p>
          </section>

          <section id="rights">
            <div className="ps-section-num">Section 07</div>
            <h2>Your Rights (DPDP Act, 2023)</h2>
            <p>As a user, you have the following rights under the Digital Personal Data Protection Act, 2023:</p>
            <ul>
              <li><strong>Right to Access:</strong> Request a copy of personal data we hold about you</li>
              <li><strong>Right to Correction:</strong> Request correction of inaccurate data</li>
              <li><strong>Right to Erasure:</strong> Request deletion of your account and associated data</li>
              <li><strong>Right to Grievance Redressal:</strong> Lodge a complaint with our Grievance Officer</li>
              <li><strong>Right to Withdraw Consent:</strong> Withdraw consent for data processing (this may affect your ability to use the platform)</li>
            </ul>
            <p>To exercise any of these rights, email us at privacy@primesavr.com.</p>
          </section>

          <section id="children">
            <div className="ps-section-num">Section 08</div>
            <h2>Children&apos;s Privacy</h2>
            <p>PrimeSavr is not intended for users under the age of 18. We do not knowingly collect personal data from minors. If we become aware that a minor has created an account, we will delete the account and associated data immediately.</p>
          </section>

          <section id="changes">
            <div className="ps-section-num">Section 09</div>
            <h2>Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. When we do, we will update the &quot;last updated&quot; date at the top of this page and notify registered users via email if changes are material.</p>
            <p>Continued use of the platform after changes constitutes acceptance of the updated policy.</p>
          </section>

          <section id="contact">
            <div className="ps-section-num">Section 10</div>
            <h2>Contact &amp; Grievance Officer</h2>
            <p>As required under the IT (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, we have appointed a Grievance Officer:</p>
            <p>
              <strong>Email:</strong> grievance@primesavr.com<br />
              <strong>Response time:</strong> We acknowledge complaints within 24 hours and resolve within 15 days, as mandated by law.
            </p>
            <p>For general privacy queries: privacy@primesavr.com</p>
          </section>
        </div>
      </div>
    </>
  );
}
