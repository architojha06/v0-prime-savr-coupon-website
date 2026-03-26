export default function Careers() {
  return (
    <>
      <style>{`
        .ps-page-hero { background: #FFFFFF; border-bottom: 1px solid #E8E8E8; padding: 56px 32px 48px; text-align: center; }
        .ps-page-tag { display: inline-block; background: #FFF0E8; color: #E8601C; font-size: 11px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; padding: 5px 14px; border-radius: 20px; margin-bottom: 18px; }
        .ps-page-hero h1 { font-family: 'Fraunces', serif; font-size: clamp(32px, 5vw, 48px); color: #1A1A1A; font-weight: 600; line-height: 1.15; margin-bottom: 14px; }
        .ps-page-hero p { color: #7A7A7A; font-size: 15px; font-weight: 300; max-width: 540px; margin: 0 auto; }
        .ps-careers-layout { max-width: 900px; margin: 0 auto; padding: 64px 32px; }
        .ps-section-card { background: #FFFFFF; border: 1px solid #E8E8E8; border-radius: 12px; padding: 40px; margin-bottom: 24px; }
        .ps-section-num { font-size: 11px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; color: #E8601C; margin-bottom: 8px; }
        .ps-section-card h2 { font-family: 'Fraunces', serif; font-size: 24px; font-weight: 600; color: #1A1A1A; margin-bottom: 16px; padding-bottom: 14px; border-bottom: 1px solid #E8E8E8; }
        .ps-section-card p { font-size: 14.5px; color: #3D3D3D; font-weight: 300; line-height: 1.8; margin-bottom: 14px; }
        .ps-section-card p:last-child { margin-bottom: 0; }
        .ps-highlight-box { background: #FFF8F5; border-left: 3px solid #E8601C; border-radius: 0 8px 8px 0; padding: 16px 20px; margin: 18px 0; font-size: 14px; color: #3D3D3D; font-weight: 300; }
        .ps-perks-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 20px; }
        .ps-perk-card { background: #F7F6F3; border: 1px solid #E8E8E8; border-radius: 10px; padding: 22px; }
        .ps-perk-icon { font-size: 24px; margin-bottom: 10px; }
        .ps-perk-card h4 { font-size: 14px; font-weight: 500; color: #1A1A1A; margin-bottom: 6px; }
        .ps-perk-card p { font-size: 13px; color: #7A7A7A; font-weight: 300; margin: 0; }
        .ps-open-roles { margin-top: 8px; }
        .ps-role-card { background: #F7F6F3; border: 1px solid #E8E8E8; border-radius: 10px; padding: 22px 24px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; }
        .ps-role-info h4 { font-size: 15px; font-weight: 500; color: #1A1A1A; margin-bottom: 4px; }
        .ps-role-info span { font-size: 12.5px; color: #7A7A7A; font-weight: 300; }
        .ps-role-badge { background: #FFF0E8; color: #E8601C; font-size: 11px; font-weight: 500; padding: 4px 12px; border-radius: 20px; white-space: nowrap; }
        .ps-no-roles { text-align: center; padding: 40px 20px; color: #7A7A7A; font-size: 14.5px; font-weight: 300; }
        .ps-no-roles span { font-size: 32px; display: block; margin-bottom: 12px; }
        @media (max-width: 768px) {
          .ps-section-card { padding: 24px 20px; }
          .ps-perks-grid { grid-template-columns: 1fr; }
          .ps-role-card { flex-direction: column; align-items: flex-start; gap: 12px; }
        }
      `}</style>

      <div className="ps-page-hero">
        <div className="ps-page-tag">Join the Team</div>
        <h1>Careers at PrimeSavr</h1>
        <p>Help us build the platform that makes every Indian shopper smarter. We&apos;re a small team with big ambitions.</p>
      </div>

      <div className="ps-careers-layout">

        <div className="ps-section-card">
          <div className="ps-section-num">Why Join Us</div>
          <h2>Work on Something That Matters</h2>
          <p>PrimeSavr is an early-stage platform at the intersection of e-commerce, affiliate marketing, and consumer savings. If you want to build a product from the ground up, work directly with founders, and have real ownership over what you build — this is the place.</p>
          <p>We move fast, operate lean, and value people who take initiative and think like owners.</p>
          <div className="ps-highlight-box">We&apos;re currently a small team. Every hire has a massive impact on the product and the company direction.</div>
          <div className="ps-perks-grid">
            <div className="ps-perk-card">
              <div className="ps-perk-icon">🚀</div>
              <h4>Ownership</h4>
              <p>Real responsibility from day one — not internship busywork.</p>
            </div>
            <div className="ps-perk-card">
              <div className="ps-perk-icon">🏠</div>
              <h4>Remote First</h4>
              <p>Work from anywhere in India. Results matter, not hours logged.</p>
            </div>
            <div className="ps-perk-card">
              <div className="ps-perk-icon">📈</div>
              <h4>Grow With Us</h4>
              <p>Early team members grow fastest as the company scales.</p>
            </div>
          </div>
        </div>

        <div className="ps-section-card">
          <div className="ps-section-num">Open Roles</div>
          <h2>Current Openings</h2>
          <div className="ps-open-roles">
            <div className="ps-role-card">
              <div className="ps-role-info">
                <h4>Growth & Partnerships Intern</h4>
                <span>Remote &nbsp;·&nbsp; Part-time / Full-time</span>
              </div>
              <span className="ps-role-badge">Open</span>
            </div>
            <div className="ps-role-card">
              <div className="ps-role-info">
                <h4>Frontend Developer (Next.js)</h4>
                <span>Remote &nbsp;·&nbsp; Contract / Full-time</span>
              </div>
              <span className="ps-role-badge">Open</span>
            </div>
            <div className="ps-role-card">
              <div className="ps-role-info">
                <h4>Content & SEO Writer</h4>
                <span>Remote &nbsp;·&nbsp; Freelance / Part-time</span>
              </div>
              <span className="ps-role-badge">Open</span>
            </div>
          </div>
        </div>

        <div className="ps-section-card">
          <div className="ps-section-num">Apply</div>
          <h2>Don&apos;t See Your Role?</h2>
          <p>We&apos;re always open to hearing from talented people — even if there&apos;s no listed opening that fits. If you believe you can add value to PrimeSavr, reach out.</p>
          <p>Send your resume and a short note about what you&apos;d like to work on to <strong>careers@primesavr.com</strong>. We respond to every application.</p>
        </div>

      </div>
    </>
  );
}
