export default function RefundPolicy() {
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
        .ps-step-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin: 20px 0; }
        .ps-step-card { background: #F7F6F3; border: 1px solid #E8E8E8; border-radius: 10px; padding: 20px; }
        .ps-step-num { font-family: 'Fraunces', serif; font-size: 28px; color: #E8601C; font-weight: 600; margin-bottom: 8px; }
        .ps-step-card h4 { font-size: 14px; font-weight: 500; color: #1A1A1A; margin-bottom: 6px; }
        .ps-step-card p { font-size: 13px; color: #7A7A7A; font-weight: 300; margin-bottom: 0; }
        @media (max-width: 768px) {
          .ps-layout { grid-template-columns: 1fr; gap: 32px; }
          .ps-toc { position: static; }
          .ps-content section { padding: 24px 20px; }
          .ps-step-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="ps-page-hero">
        <div className="ps-page-tag">Legal</div>
        <h1>Refund Policy</h1>
        <p>Last updated: June 2025 &nbsp;·&nbsp; For cashback &amp; wallet-related refunds</p>
      </div>

      <div className="ps-layout">
        <aside className="ps-toc">
          <div className="ps-toc-title">On this page</div>
          <a href="#scope">1. Scope</a>
          <a href="#cashback-refund">2. Cashback Disputes</a>
          <a href="#wallet">3. Wallet Credits</a>
          <a href="#withdrawal">4. Withdrawal Issues</a>
          <a href="#merchant-refunds">5. Merchant Refunds</a>
          <a href="#ineligible">6. Non-Refundable Cases</a>
          <a href="#process">7. Dispute Process</a>
          <a href="#timeline">8. Resolution Timeline</a>
          <a href="#contact">9. Contact</a>
        </aside>

        <div className="ps-content">
          <section id="scope">
            <div className="ps-section-num">Section 01</div>
            <h2>Scope of This Policy</h2>
            <p>This Refund Policy applies specifically to cashback credits, wallet balances, and withdrawal transactions on PrimeSavr. It does <strong>not</strong> cover refunds for products or services purchased on third-party merchant websites — those are governed by the respective merchant&apos;s return and refund policies.</p>
            <div className="ps-highlight-box">PrimeSavr is a cashback aggregator, not a retailer. For product refunds, please contact the merchant you purchased from directly.</div>
          </section>

          <section id="cashback-refund">
            <div className="ps-section-num">Section 02</div>
            <h2>Cashback Disputes</h2>
            <p>If cashback has not been credited to your PrimeSavr wallet after a confirmed purchase, you may raise a dispute. Common reasons for missing cashback include:</p>
            <ul>
              <li>Affiliate tracking cookie was blocked by an ad blocker or VPN</li>
              <li>Purchase was made without clicking through PrimeSavr&apos;s tracked link</li>
              <li>Merchant system tracking delay (can take up to 90 days for some merchants)</li>
              <li>Order was placed using a coupon code not listed on PrimeSavr</li>
            </ul>
            <p>To raise a cashback dispute, you must submit a claim within <strong>45 days</strong> of the purchase date, along with proof of purchase (order confirmation, invoice).</p>
          </section>

          <section id="wallet">
            <div className="ps-section-num">Section 03</div>
            <h2>Wallet Credits</h2>
            <p>Cashback credited to your PrimeSavr wallet is non-transferable and cannot be converted to cash outside of the standard withdrawal process.</p>
            <ul>
              <li>Wallet credits incorrectly applied due to a platform error will be investigated and corrected</li>
              <li>Credits applied as a result of fraudulent activity will be reversed without notice</li>
              <li>Expired promotional credits are non-refundable</li>
            </ul>
          </section>

          <section id="withdrawal">
            <div className="ps-section-num">Section 04</div>
            <h2>Withdrawal Issues</h2>
            <p>Once a withdrawal is initiated to your verified bank account or UPI ID, it is processed within 5–7 business days. If a withdrawal fails:</p>
            <ul>
              <li>The amount is automatically refunded to your PrimeSavr wallet within 3 business days</li>
              <li>You will be notified via email with the reason for failure (e.g., invalid bank details)</li>
              <li>You can then update your payment details and re-initiate the withdrawal</li>
            </ul>
            <p>PrimeSavr is not responsible for delays caused by bank processing times or RBI-mandated banking holds.</p>
          </section>

          <section id="merchant-refunds">
            <div className="ps-section-num">Section 05</div>
            <h2>Effect of Merchant Refunds on Cashback</h2>
            <p>If you return a product or cancel an order for which cashback was credited or is pending:</p>
            <ul>
              <li>Pending cashback will be cancelled immediately upon receiving confirmation from the merchant network</li>
              <li>If cashback has already been credited to your wallet, it will be reversed</li>
              <li>If cashback has already been withdrawn, the equivalent amount may be deducted from future cashback earnings</li>
            </ul>
          </section>

          <section id="ineligible">
            <div className="ps-section-num">Section 06</div>
            <h2>Non-Refundable &amp; Ineligible Cases</h2>
            <p>The following are not eligible for cashback refunds or disputes:</p>
            <ul>
              <li>Purchases where tracking could not be verified due to user-side technical issues</li>
              <li>Claims submitted after the 45-day dispute window</li>
              <li>Cashback from transactions flagged for fraud or Terms of Service violations</li>
              <li>Difference in cashback rates due to rate changes after your purchase</li>
              <li>Cashback on orders partially refunded by the merchant</li>
            </ul>
          </section>

          <section id="process">
            <div className="ps-section-num">Section 07</div>
            <h2>How to Raise a Dispute</h2>
            <div className="ps-step-grid">
              <div className="ps-step-card">
                <div className="ps-step-num">01</div>
                <h4>Submit a Claim</h4>
                <p>Email support@primesavr.com with your order details and proof of purchase</p>
              </div>
              <div className="ps-step-card">
                <div className="ps-step-num">02</div>
                <h4>We Investigate</h4>
                <p>We verify with the affiliate network and merchant within 7–21 business days</p>
              </div>
              <div className="ps-step-card">
                <div className="ps-step-num">03</div>
                <h4>Resolution</h4>
                <p>Cashback credited to your wallet or dispute rejected with a clear reason</p>
              </div>
            </div>
            <p>Please include in your claim: full name, registered email, order ID, merchant name, purchase date, and order value.</p>
          </section>

          <section id="timeline">
            <div className="ps-section-num">Section 08</div>
            <h2>Resolution Timeline</h2>
            <p>We aim to resolve all disputes within the following timeframes:</p>
            <ul>
              <li><strong>Acknowledgement:</strong> Within 24–48 hours of submission</li>
              <li><strong>Investigation:</strong> 7–21 business days (depends on merchant response time)</li>
              <li><strong>Final resolution:</strong> Maximum 30 business days from date of submission</li>
            </ul>
            <p>For escalated or complex disputes, we may require additional documentation. We will communicate this promptly via email.</p>
          </section>

          <section id="contact">
            <div className="ps-section-num">Section 09</div>
            <h2>Contact Us</h2>
            <p>For any refund or cashback dispute, reach out to our support team:</p>
            <p>
              <strong>Email:</strong> support@primesavr.com<br />
              <strong>Subject line:</strong> &quot;Cashback Dispute — [Your Order ID]&quot;<br />
              <strong>Response time:</strong> Within 24–48 business hours
            </p>
            <p>For escalated grievances, contact our Grievance Officer at grievance@primesavr.com as per IT Rules, 2021.</p>
          </section>
        </div>
      </div>
    </>
  );
}
