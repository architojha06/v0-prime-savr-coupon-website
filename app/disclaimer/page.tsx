export default function Disclaimer() {
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
        .ps-notice-banner { background: #1A1A1A; color: #E0E0E0; border-radius: 10px; padding: 22px 28px; margin-bottom: 28px; font-size: 14px; font-weight: 300; line-height: 1.7; }
        .ps-notice-banner strong { color: white; }
        @media (max-width: 768px) {
          .ps-layout { grid-template-columns: 1fr; gap: 32px; }
          .ps-toc { position: static; }
          .ps-content section { padding: 24px 20px; }
        }
      `}</style>

      <div className="ps-page-hero">
        <div className="ps-page-tag">Legal</div>
        <h1>Disclaimer</h1>
        <p>Last updated: June 2025 &nbsp;·&nbsp; Please read this carefully before using PrimeSavr</p>
      </div>

      <div className="ps-layout">
        <aside className="ps-toc">
          <div className="ps-toc-title">On this page</div>
          <a href="#general">1. General Disclaimer</a>
          <a href="#affiliate">2. Affiliate Disclosure</a>
          <a href="#accuracy">3. Accuracy of Info</a>
          <a href="#merchant">4. Merchant Responsibility</a>
          <a href="#cashback-disclaimer">5. Cashback Disclaimer</a>
          <a href="#external">6. External Links</a>
          <a href="#investment">7. No Financial Advice</a>
          <a href="#errors">8. Errors &amp; Omissions</a>
        </aside>

        <div className="ps-content">
          <div className="ps-notice-banner">
            <strong>Important Notice:</strong> PrimeSavr is an independent affiliate and cashback aggregator. We are not affiliated with, endorsed by, or officially connected to any of the brands or merchants listed on our platform unless explicitly stated. All trademarks belong to their respective owners.
          </div>

          <section id="general">
            <div className="ps-section-num">Section 01</div>
            <h2>General Disclaimer</h2>
            <p>The information provided on PrimeSavr is for general informational and savings purposes only. While we strive to keep all deal, coupon, and cashback information up to date and accurate, we make no representations or warranties of any kind — express or implied — about the completeness, accuracy, reliability, or suitability of the information on the platform.</p>
            <p>Your use of PrimeSavr and any reliance you place on information provided is strictly at your own risk.</p>
          </section>

          <section id="affiliate">
            <div className="ps-section-num">Section 02</div>
            <h2>Affiliate Disclosure</h2>
            <p>PrimeSavr participates in affiliate marketing programs. This means we earn a commission when you click on certain links and make a purchase — at absolutely no additional cost to you.</p>
            <div className="ps-highlight-box">Our affiliate relationships do not influence our editorial decisions or the deals we feature. We only promote offers we believe are genuinely beneficial to our users.</div>
            <p>This disclosure is made in accordance with applicable advertising transparency guidelines and the Advertising Standards Council of India (ASCI) guidelines.</p>
          </section>

          <section id="accuracy">
            <div className="ps-section-num">Section 03</div>
            <h2>Accuracy of Information</h2>
            <p>Deal prices, cashback percentages, coupon codes, and offer terms are provided to us by merchants and affiliate networks and are subject to change without notice. PrimeSavr:</p>
            <ul>
              <li>Does not guarantee that any coupon code will work at the time of use</li>
              <li>Does not guarantee that advertised cashback rates are current or will be honoured</li>
              <li>Is not responsible for expired offers displayed due to processing delays</li>
              <li>Recommends verifying all offer terms directly on the merchant&apos;s website before purchase</li>
            </ul>
          </section>

          <section id="merchant">
            <div className="ps-section-num">Section 04</div>
            <h2>Merchant Responsibility</h2>
            <p>All purchases made through affiliate links on PrimeSavr are transactions between you and the respective merchant. PrimeSavr is not a party to those transactions and is not responsible for:</p>
            <ul>
              <li>Product quality, authenticity, or delivery</li>
              <li>Merchant customer service or after-sales support</li>
              <li>Pricing errors or discrepancies on merchant platforms</li>
              <li>Any losses arising from your purchases on third-party websites</li>
            </ul>
            <p>For any product or service issues, please contact the merchant directly.</p>
          </section>

          <section id="cashback-disclaimer">
            <div className="ps-section-num">Section 05</div>
            <h2>Cashback Disclaimer</h2>
            <p>Cashback is credited based on data received from affiliate networks and merchants. PrimeSavr has no control over merchant systems and cannot guarantee cashback in cases where:</p>
            <ul>
              <li>The merchant&apos;s affiliate tracking system fails</li>
              <li>Ad blockers or VPNs interfere with tracking cookies</li>
              <li>The order is cancelled, returned, or flagged as fraudulent</li>
              <li>The purchase was not made through our tracked affiliate link</li>
            </ul>
            <div className="ps-highlight-box">We strongly recommend disabling ad blockers when clicking affiliate links to ensure cashback is tracked correctly.</div>
          </section>

          <section id="external">
            <div className="ps-section-num">Section 06</div>
            <h2>External Links</h2>
            <p>PrimeSavr contains links to third-party websites and services. These links are provided for your convenience and do not constitute an endorsement of those websites or their content.</p>
            <p>We have no control over the content, privacy practices, or availability of external websites and accept no responsibility for them.</p>
          </section>

          <section id="investment">
            <div className="ps-section-num">Section 07</div>
            <h2>No Financial or Investment Advice</h2>
            <p>Nothing on PrimeSavr constitutes financial, investment, or tax advice. Cashback, rewards, and savings information is provided for general consumer benefit only.</p>
            <p>For financial decisions, please consult a qualified financial advisor registered with SEBI or another appropriate Indian regulatory body.</p>
          </section>

          <section id="errors">
            <div className="ps-section-num">Section 08</div>
            <h2>Errors &amp; Omissions</h2>
            <p>Despite our best efforts, information on PrimeSavr may occasionally contain errors, omissions, or inaccuracies. We reserve the right to correct errors at any time without prior notice.</p>
            <p>If you notice an error or outdated offer, please report it to us at support@primesavr.com and we will address it promptly.</p>
          </section>
        </div>
      </div>
    </>
  );
}
