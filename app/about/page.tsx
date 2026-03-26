export default function AboutUs() {
  return (
    <>
      <style>{`
        .ps-page-hero { background: #FFFFFF; border-bottom: 1px solid #E8E8E8; padding: 56px 32px 48px; text-align: center; }
        .ps-page-tag { display: inline-block; background: #FFF0E8; color: #E8601C; font-size: 11px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; padding: 5px 14px; border-radius: 20px; margin-bottom: 18px; }
        .ps-page-hero h1 { font-family: 'Fraunces', serif; font-size: clamp(32px, 5vw, 48px); color: #1A1A1A; font-weight: 600; line-height: 1.15; margin-bottom: 14px; }
        .ps-page-hero p { color: #7A7A7A; font-size: 15px; font-weight: 300; max-width: 560px; margin: 0 auto; }
        .ps-about-layout { max-width: 900px; margin: 0 auto; padding: 64px 32px; }
        .ps-section-card { background: #FFFFFF; border: 1px solid #E8E8E8; border-radius: 12px; padding: 40px; margin-bottom: 24px; }
        .ps-section-num { font-size: 11px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; color: #E8601C; margin-bottom: 8px; }
        .ps-section-card h2 { font-family: 'Fraunces', serif; font-size: 24px; font-weight: 600; color: #1A1A1A; margin-bottom: 16px; padding-bottom: 14px; border-bottom: 1px solid #E8E8E8; }
        .ps-section-card p { font-size: 14.5px; color: #3D3D3D; font-weight: 300; line-height: 1.8; margin-bottom: 14px; }
        .ps-section-card p:last-child { margin-bottom: 0; }
        .ps-highlight-box { background: #FFF8F5; border-left: 3px solid #E8601C; border-radius: 0 8px 8px 0; padding: 16px 20px; margin: 18px 0; font-size: 14px; color: #3D3D3D; font-weight: 300; }
        .ps-stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 32px 0; }
        .ps-stat-card { background: #F7F6F3; border: 1px solid #E8E8E8; border-radius: 10px; padding: 28px 20px; text-align: center; }
        .ps-stat-num { font-family: 'Fraunces', serif; font-size: 36px; font-weight: 600; color: #E8601C; margin-bottom: 6px; }
        .ps-stat-label { font-size: 13px; color: #7A7A7A; font-weight: 300; }
        .ps-values-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 20px; }
        .ps-value-card { background: #F7F6F3; border: 1px solid #E8E8E8; border-radius: 10px; padding: 22px; }
        .ps-value-icon { font-size: 24px; margin-bottom: 10px; }
        .ps-value-card h4 { font-size: 15px; font-weight: 500; color: #1A1A1A; margin-bottom: 6px; }
        .ps-value-card p { font-size: 13.5px; color: #7A7A7A; font-weight: 300; margin-bottom: 0; }
        @media (max-width: 768px) {
          .ps-stats-grid { grid-template-columns: 1fr; }
          .ps-values-grid { grid-template-columns: 1fr; }
          .ps-section-card { padding: 24px 20px; }
        }
      `}</style>

      <div className="ps-page-hero">
        <div className="ps-page-tag">Our Story</div>
        <h1>About PrimeSavr</h1>
        <p>We&apos;re on a mission to help every Indian shopper save more, spend smarter, and earn cashback on every purchase.</p>
      </div>

      <div className="ps-about-layout">

       

        <div className="ps-section-card">
          <div className="ps-section-num">Who We Are</div>
          <h2>Built for Indian Shoppers</h2>
          <p>PrimeSavr is an affiliate and cashback platform designed specifically for India. We aggregate the best deals, discount codes, and cashback offers from hundreds of top brands — all in one place.</p>
          <p>Whether you&apos;re shopping for electronics, booking a trip, ordering food, or buying fashion, PrimeSavr ensures you never miss a saving opportunity. Every purchase through our platform earns you real cashback credited directly to your wallet.</p>
          <div className="ps-highlight-box">PrimeSavr is free to use. We earn a commission from brands when you shop through our links — and we pass a portion of that back to you as cashback.</div>
        </div>

        <div className="ps-section-card">
          <div className="ps-section-num">Our Mission</div>
          <h2>Making Every Rupee Count</h2>
          <p>India is one of the world&apos;s fastest-growing e-commerce markets, yet most shoppers leave money on the table every time they shop online. PrimeSavr was built to fix that.</p>
          <p>We believe savings shouldn&apos;t be complicated. Our platform is simple: find a deal, click the link, shop as usual, and earn cashback. No tricks, no hidden terms — just genuine savings on purchases you were already going to make.</p>
        </div>

        <div className="ps-section-card">
          <div className="ps-section-num">Our Values</div>
          <h2>What We Stand For</h2>
          <div className="ps-values-grid">
            <div className="ps-value-card">
              <div className="ps-value-icon">🤝</div>
              <h4>Transparency</h4>
              <p>We clearly disclose all affiliate relationships. No hidden agendas — ever.</p>
            </div>
            <div className="ps-value-card">
              <div className="ps-value-icon">🛡️</div>
              <h4>Trust</h4>
              <p>Your data stays yours. We&apos;re compliant with India&apos;s DPDP Act, 2023.</p>
            </div>
            <div className="ps-value-card">
              <div className="ps-value-icon">⚡</div>
              <h4>Simplicity</h4>
              <p>Finding deals and earning cashback should take seconds, not minutes.</p>
            </div>
            <div className="ps-value-card">
              <div className="ps-value-icon">🇮🇳</div>
              <h4>Made for India</h4>
              <p>Built around Indian brands, UPI payments, and the way Indians shop.</p>
            </div>
          </div>
        </div>

        <div className="ps-section-card">
          <div className="ps-section-num">Get in Touch</div>
          <h2>We&apos;d Love to Hear From You</h2>
          <p>Have feedback, a partnership proposal, or just want to say hello? Reach out to us at <strong>support@primesavr.com</strong> — we respond within 24–48 hours.</p>
          <p>For merchant or affiliate partnerships: <strong>partners@primesavr.com</strong></p>
        </div>

      </div>
    </>
  );
}
