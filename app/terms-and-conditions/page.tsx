export default function TermsAndConditions() {
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
        @media (max-width: 768px) {
          .ps-layout { grid-template-columns: 1fr; gap: 32px; }
          .ps-toc { position: static; }
          .ps-content section { padding: 24px 20px; }
        }
      `}</style>

      <div className="ps-page-hero">
        <div className="ps-page-tag">Legal</div>
        <h1>Terms &amp; Conditions</h1>
        <p>Last updated: June 2025 &nbsp;·&nbsp; Effective for all users in India</p>
      </div>

      <div className="ps-layout">
        <aside className="ps-toc">
          <div className="ps-toc-title">On this page</div>
          <a href="#acceptance">1. Acceptance</a>
          <a href="#platform">2. Platform Overview</a>
          <a href="#eligibility">3. Eligibility</a>
          <a href="#cashback">4. Cashback &amp; Rewards</a>
          <a href="#affiliate">5. Affiliate Links</a>
          <a href="#conduct">6. User Conduct</a>
          <a href="#ip">7. Intellectual Property</a>
          <a href="#liability">8. Liability</a>
          <a href="#termination">9. Termination</a>
          <a href="#governing">10. Governing Law</a>
          <a href="#contact">11. Contact</a>
        </aside>

        <div className="ps-content">
          <section id="acceptance">
            <div className="ps-section-num">Section 01</div>
            <h2>Acceptance of Terms</h2>
            <p>By accessing or using PrimeSavr (&quot;Platform&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;), you agree to be bound by these Terms &amp; Conditions. If you do not agree, please discontinue use of the Platform immediately.</p>
            <p>These Terms constitute a legally binding agreement between you and PrimeSavr, a platform operated in India and governed by applicable Indian laws.</p>
          </section>

          <section id="platform">
            <div className="ps-section-num">Section 02</div>
            <h2>Platform Overview</h2>
            <p>PrimeSavr is an affiliate and cashback platform that helps users in India discover deals, earn cashback rewards, and save money across a wide range of brands and categories including Food, Fashion, Electronics, Travel, Health, and Education.</p>
            <div className="ps-highlight-box">PrimeSavr earns a commission from partner brands when users make purchases through our affiliate links. A portion of this commission may be passed back to users as cashback.</div>
            <p>We do not sell products directly. All transactions occur on the respective merchant&apos;s platform.</p>
          </section>

          <section id="eligibility">
            <div className="ps-section-num">Section 03</div>
            <h2>Eligibility</h2>
            <p>To use PrimeSavr, you must:</p>
            <ul>
              <li>Be at least 18 years of age</li>
              <li>Be a resident of India or accessing the platform from India</li>
              <li>Provide accurate registration details</li>
              <li>Have a valid bank account or UPI ID for cashback withdrawals</li>
            </ul>
            <p>We reserve the right to refuse service to any user who does not meet these criteria or violates these Terms.</p>
          </section>

          <section id="cashback">
            <div className="ps-section-num">Section 04</div>
            <h2>Cashback &amp; Rewards</h2>
            <p>Cashback is credited to your PrimeSavr wallet after the merchant confirms a valid, non-cancelled, and non-returned transaction. Tracking periods may vary between 7–90 days depending on the merchant.</p>
            <ul>
              <li>Cashback amounts are subject to change without notice based on merchant offers</li>
              <li>Cashback is not applicable on cancelled, returned, or fraudulent orders</li>
              <li>Minimum withdrawal threshold may apply (as stated on the platform)</li>
              <li>Withdrawals are processed to your verified bank account or UPI ID within 5–7 business days</li>
              <li>PrimeSavr is not responsible for delays caused by banking systems or third-party payment processors</li>
            </ul>
            <div className="ps-highlight-box">Cashback rewards are non-transferable and have no cash equivalent outside the withdrawal process described above.</div>
          </section>

          <section id="affiliate">
            <div className="ps-section-num">Section 05</div>
            <h2>Affiliate Links Disclosure</h2>
            <p>PrimeSavr uses affiliate links to track purchases made through our platform. When you click a link on PrimeSavr and make a purchase, we may receive a commission from the retailer at no extra cost to you.</p>
            <p>All affiliate relationships are disclosed in accordance with applicable advertising standards. PrimeSavr does not endorse any specific product or merchant beyond what is reasonably presented on the platform.</p>
          </section>

          <section id="conduct">
            <div className="ps-section-num">Section 06</div>
            <h2>User Conduct</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the platform for fraudulent transactions or to manipulate cashback systems</li>
              <li>Create multiple accounts to exploit offers</li>
              <li>Use bots, scripts, or automated tools to interact with the platform</li>
              <li>Attempt to reverse-engineer, scrape, or copy platform content</li>
              <li>Violate any applicable Indian law, including the IT Act, 2000</li>
            </ul>
            <p>Violation of these terms may result in immediate account suspension and forfeiture of pending cashback balances.</p>
          </section>

          <section id="ip">
            <div className="ps-section-num">Section 07</div>
            <h2>Intellectual Property</h2>
            <p>All content on PrimeSavr — including logos, design, text, graphics, and code — is the exclusive property of PrimeSavr and is protected under Indian copyright law.</p>
            <p>You may not reproduce, distribute, or create derivative works from our content without prior written permission.</p>
          </section>

          <section id="liability">
            <div className="ps-section-num">Section 08</div>
            <h2>Limitation of Liability</h2>
            <p>PrimeSavr is an intermediary platform. We are not liable for:</p>
            <ul>
              <li>Product quality, delivery, or disputes with merchants</li>
              <li>Loss of cashback due to merchant system failures</li>
              <li>Unauthorized access to your account due to your own negligence</li>
              <li>Any indirect, incidental, or consequential damages arising from platform use</li>
            </ul>
            <p>Our total liability in any circumstance shall not exceed the cashback balance in your account at the time of the claim.</p>
          </section>

          <section id="termination">
            <div className="ps-section-num">Section 09</div>
            <h2>Termination</h2>
            <p>We reserve the right to suspend or terminate your account at any time, with or without notice, for violation of these Terms or for any other reason at our sole discretion.</p>
            <p>Upon termination, any pending cashback may be forfeited if the account was involved in fraudulent or abusive activity.</p>
          </section>

          <section id="governing">
            <div className="ps-section-num">Section 10</div>
            <h2>Governing Law &amp; Jurisdiction</h2>
            <p>These Terms are governed by and construed in accordance with the laws of India. Any disputes arising shall be subject to the exclusive jurisdiction of the courts of India.</p>
            <p>For consumer grievances, users may also approach the National Consumer Disputes Redressal Commission (NCDRC) as applicable.</p>
          </section>

          <section id="contact">
            <div className="ps-section-num">Section 11</div>
            <h2>Contact Us</h2>
            <p>For any questions regarding these Terms, please reach out to us:</p>
            <p>
              <strong>Email:</strong> legal@primesavr.com<br />
              <strong>Grievance Officer:</strong> As required under the IT (Intermediary Guidelines) Rules, 2021, our Grievance Officer can be reached at grievance@primesavr.com within 24 hours of receiving a complaint.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
