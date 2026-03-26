export default function HowItWorks() {
  return (
    <>
      <style>{`
        .ps-page-hero { background: #FFFFFF; border-bottom: 1px solid #E8E8E8; padding: 56px 32px 48px; text-align: center; }
        .ps-page-tag { display: inline-block; background: #FFF0E8; color: #E8601C; font-size: 11px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; padding: 5px 14px; border-radius: 20px; margin-bottom: 18px; }
        .ps-page-hero h1 { font-family: 'Fraunces', serif; font-size: clamp(32px, 5vw, 48px); color: #1A1A1A; font-weight: 600; line-height: 1.15; margin-bottom: 14px; }
        .ps-page-hero p { color: #7A7A7A; font-size: 15px; font-weight: 300; max-width: 540px; margin: 0 auto; }
        .ps-hiw-layout { max-width: 900px; margin: 0 auto; padding: 64px 32px; }
        .ps-section-card { background: #FFFFFF; border: 1px solid #E8E8E8; border-radius: 12px; padding: 40px; margin-bottom: 24px; }
        .ps-section-num { font-size: 11px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; color: #E8601C; margin-bottom: 8px; }
        .ps-section-card h2 { font-family: 'Fraunces', serif; font-size: 24px; font-weight: 600; color: #1A1A1A; margin-bottom: 20px; padding-bottom: 14px; border-bottom: 1px solid #E8E8E8; }
        .ps-section-card p { font-size: 14.5px; color: #3D3D3D; font-weight: 300; line-height: 1.8; margin-bottom: 14px; }
        .ps-section-card p:last-child { margin-bottom: 0; }
        .ps-highlight-box { background: #FFF8F5; border-left: 3px solid #E8601C; border-radius: 0 8px 8px 0; padding: 16px 20px; margin: 18px 0; font-size: 14px; color: #3D3D3D; font-weight: 300; }
        .ps-steps { display: flex; flex-direction: column; gap: 20px; }
        .ps-step { display: flex; gap: 24px; align-items: flex-start; }
        .ps-step-badge { min-width: 48px; height: 48px; background: #E8601C; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-family: 'Fraunces', serif; font-size: 20px; font-weight: 600; color: white; }
        .ps-step-body h4 { font-size: 16px; font-weight: 500; color: #1A1A1A; margin-bottom: 6px; }
        .ps-step-body p { font-size: 14px; color: #7A7A7A; font-weight: 300; margin: 0; line-height: 1.7; }
        .ps-faq-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 8px; }
        .ps-faq-card { background: #F7F6F3; border: 1px solid #E8E8E8; border-radius: 10px; padding: 20px; }
        .ps-faq-card h4 { font-size: 14px; font-weight: 500; color: #1A1A1A; margin-bottom: 8px; }
        .ps-faq-card p { font-size: 13.5px; color: #7A7A7A; font-weight: 300; margin: 0; line-height: 1.6; }
        @media (max-width: 768px) {
          .ps-section-card { padding: 24px 20px; }
          .ps-faq-grid { grid-template-columns: 1fr; }
          .ps-step { flex-direction: column; gap: 12px; }
        }
      `}</style>

      <div className="ps-page-hero">
        <div className="ps-page-tag">Simple & Free</div>
        <h1>How It Works</h1>
        <p>Earn real cashback on every online purchase in 3 simple steps — no complicated sign-ups, no hidden charges.</p>
      </div>

      <div className="ps-hiw-layout">

        <div className="ps-section-card">
          <div className="ps-section-num">The Process</div>
          <h2>3 Steps to Earn Cashback</h2>
          <div className="ps-steps">
            <div className="ps-step">
              <div className="ps-step-badge">1</div>
              <div className="ps-step-body">
                <h4>Find a Deal on PrimeSavr</h4>
                <p>Browse hundreds of deals, coupons, and cashback offers across categories like Food, Fashion, Electronics, Travel, and more. Search for your favourite brand or explore what&apos;s trending.</p>
              </div>
            </div>
            <div className="ps-step">
              <div className="ps-step-badge">2</div>
              <div className="ps-step-body">
                <h4>Click the Affiliate Link</h4>
                <p>Click the &quot;Get Deal&quot; or &quot;Shop Now&quot; button. This takes you to the merchant&apos;s website through our tracked affiliate link. Make sure cookies are enabled and your ad blocker is off — this is how we track your purchase.</p>
              </div>
            </div>
            <div className="ps-step">
              <div className="ps-step-badge">3</div>
              <div className="ps-step-body">
                <h4>Shop & Earn Cashback</h4>
                <p>Complete your purchase on the merchant&apos;s site as usual. Cashback is automatically tracked and credited to your PrimeSavr wallet within 7–90 days, depending on the merchant. Once credited, withdraw to your bank account or UPI ID.</p>
              </div>
            </div>
          </div>
          <div className="ps-highlight-box">💡 Tip: Always start your shopping journey from PrimeSavr and avoid using coupon codes from other sources — it can break cashback tracking.</div>
        </div>

        <div className="ps-section-card">
          <div className="ps-section-num">Good to Know</div>
          <h2>Common Questions</h2>
          <div className="ps-faq-grid">
            <div className="ps-faq-card">
              <h4>Is PrimeSavr free?</h4>
              <p>Yes, completely free. We earn a commission from merchants and share part of it back with you as cashback.</p>
            </div>
            <div className="ps-faq-card">
              <h4>How long does cashback take?</h4>
              <p>Typically 7–90 days depending on the merchant&apos;s confirmation period. You&apos;ll be notified by email.</p>
            </div>
            <div className="ps-faq-card">
              <h4>How do I withdraw?</h4>
              <p>Once your wallet reaches the minimum threshold, withdraw to your verified bank account or UPI ID within 5–7 business days.</p>
            </div>
            <div className="ps-faq-card">
              <h4>What if cashback is missing?</h4>
              <p>Raise a dispute at support@primesavr.com within 45 days of purchase with your order details.</p>
            </div>
          </div>
        </div>

        <div className="ps-section-card">
          <div className="ps-section-num">Why PrimeSavr</div>
          <h2>What Makes Us Different</h2>
          <p>Unlike generic coupon sites, PrimeSavr gives you <strong>real money back</strong> — not just discount codes that may or may not work. Every deal on our platform is verified and comes with a clear cashback percentage so you know exactly what you&apos;re earning before you click.</p>
          <p>We partner directly with affiliate networks like Cuelinks and VCommission, ensuring cashback is tracked reliably across hundreds of Indian and international brands.</p>
        </div>

      </div>
    </>
  );
}
