'use client';

import { useState } from 'react';

const helpTopics = [
  {
    category: 'Cashback',
    icon: '💰',
    faqs: [
      { q: 'How do I earn cashback?', a: 'Click any deal or affiliate link on PrimeSavr, complete your purchase on the merchant\'s site, and cashback is automatically tracked and credited to your wallet within 7–90 days.' },
      { q: 'Why wasn\'t my cashback tracked?', a: 'Common reasons include ad blockers, VPNs, using a different browser, or not clicking directly from PrimeSavr. Always disable ad blockers before clicking our links.' },
      { q: 'How long does cashback take to appear?', a: 'It depends on the merchant — typically 7–90 days. Once the merchant confirms the transaction, cashback is credited to your wallet and you\'ll get an email notification.' },
      { q: 'Can I raise a dispute for missing cashback?', a: 'Yes. Email support@primesavr.com with your order ID, merchant name, purchase date, and order value within 45 days of purchase.' },
    ],
  },
  {
    category: 'Withdrawals',
    icon: '🏦',
    faqs: [
      { q: 'How do I withdraw my cashback?', a: 'Once your wallet balance reaches the minimum withdrawal threshold, go to your wallet, add your bank account or UPI ID, and initiate a withdrawal. It processes in 5–7 business days.' },
      { q: 'What is the minimum withdrawal amount?', a: 'The minimum withdrawal threshold is shown in your wallet dashboard. It may vary based on platform promotions.' },
      { q: 'My withdrawal failed. What happens?', a: 'If a withdrawal fails, the amount is automatically refunded to your PrimeSavr wallet within 3 business days. You\'ll be notified via email with the reason.' },
      { q: 'Which payment methods are supported?', a: 'We support withdrawals to Indian bank accounts and UPI IDs. International transfers are not currently supported.' },
    ],
  },
  {
    category: 'Account',
    icon: '👤',
    faqs: [
      { q: 'How do I create an account?', a: 'Sign up at primesavr.com with your email address. You\'ll need to verify your email before accessing your wallet and cashback features.' },
      { q: 'I forgot my password. What do I do?', a: 'Click "Forgot Password" on the login page. We\'ll send a password reset link to your registered email address.' },
      { q: 'How do I delete my account?', a: 'Email support@primesavr.com with your registered email and request for account deletion. We process this within 30 days under the DPDP Act, 2023.' },
      { q: 'Can I have multiple accounts?', a: 'No. Multiple accounts are against our Terms of Service and may result in suspension of all accounts and forfeiture of cashback balances.' },
    ],
  },
  {
    category: 'Coupons & Deals',
    icon: '🏷️',
    faqs: [
      { q: 'Why isn\'t a coupon code working?', a: 'Coupon codes can expire or be merchant-specific. Always check the expiry date shown on the deal card. If it\'s within the validity period, contact support@primesavr.com.' },
      { q: 'Can I use other coupon codes alongside PrimeSavr?', a: 'Using coupon codes from other sources can break cashback tracking. Stick to codes listed on PrimeSavr to ensure your cashback is credited.' },
      { q: 'How do I submit a deal I found?', a: 'Use the Submit a Deal page or email partners@primesavr.com with the deal details. We review all submissions within 2–3 business days.' },
    ],
  },
];

export default function HelpCenter() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <style>{`
        .ps-page-hero { background: #FFFFFF; border-bottom: 1px solid #E8E8E8; padding: 56px 32px 48px; text-align: center; }
        .ps-page-tag { display: inline-block; background: #FFF0E8; color: #E8601C; font-size: 11px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; padding: 5px 14px; border-radius: 20px; margin-bottom: 18px; }
        .ps-page-hero h1 { font-family: 'Fraunces', serif; font-size: clamp(32px, 5vw, 48px); color: #1A1A1A; font-weight: 600; line-height: 1.15; margin-bottom: 14px; }
        .ps-page-hero p { color: #7A7A7A; font-size: 15px; font-weight: 300; max-width: 500px; margin: 0 auto; }
        .ps-help-layout { max-width: 1000px; margin: 0 auto; padding: 64px 32px; display: grid; grid-template-columns: 220px 1fr; gap: 40px; align-items: start; }
        .ps-category-nav { position: sticky; top: 80px; background: #FFFFFF; border: 1px solid #E8E8E8; border-radius: 12px; padding: 16px; }
        .ps-cat-btn { display: flex; align-items: center; gap: 10px; width: 100%; padding: 12px 14px; border: none; background: transparent; border-radius: 8px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 400; color: #3D3D3D; cursor: pointer; text-align: left; transition: background 0.15s, color 0.15s; margin-bottom: 4px; }
        .ps-cat-btn:last-child { margin-bottom: 0; }
        .ps-cat-btn:hover { background: #F7F6F3; }
        .ps-cat-btn.active { background: #FFF0E8; color: #E8601C; font-weight: 500; }
        .ps-cat-icon { font-size: 18px; }
        .ps-faq-section h2 { font-family: 'Fraunces', serif; font-size: 26px; font-weight: 600; color: #1A1A1A; margin-bottom: 6px; }
        .ps-faq-section .ps-subtitle { font-size: 14px; color: #7A7A7A; font-weight: 300; margin-bottom: 24px; }
        .ps-faq-item { background: #FFFFFF; border: 1px solid #E8E8E8; border-radius: 10px; margin-bottom: 10px; overflow: hidden; }
        .ps-faq-q { padding: 18px 24px; font-size: 14.5px; font-weight: 500; color: #1A1A1A; cursor: pointer; display: flex; justify-content: space-between; align-items: center; user-select: none; }
        .ps-faq-q:hover { background: #FAFAF9; }
        .ps-faq-arrow { font-size: 18px; color: #E8601C; transition: transform 0.25s; flex-shrink: 0; }
        .ps-faq-arrow.open { transform: rotate(45deg); }
        .ps-faq-a { font-size: 14px; font-weight: 300; color: #7A7A7A; line-height: 1.7; padding: 0 24px 18px; }
        .ps-still-stuck { background: #FFFFFF; border: 1px solid #E8E8E8; border-radius: 12px; padding: 32px; text-align: center; margin-top: 24px; }
        .ps-still-stuck h3 { font-family: 'Fraunces', serif; font-size: 20px; font-weight: 600; color: #1A1A1A; margin-bottom: 8px; }
        .ps-still-stuck p { font-size: 14px; color: #7A7A7A; font-weight: 300; margin-bottom: 18px; }
        .ps-contact-btn { display: inline-block; background: #E8601C; color: white; padding: 12px 28px; border-radius: 8px; font-size: 14px; font-weight: 500; text-decoration: none; transition: opacity 0.2s; }
        .ps-contact-btn:hover { opacity: 0.9; }
        @media (max-width: 768px) {
          .ps-help-layout { grid-template-columns: 1fr; }
          .ps-category-nav { position: static; display: flex; gap: 8px; overflow-x: auto; padding: 12px; }
          .ps-cat-btn { white-space: nowrap; margin-bottom: 0; }
        }
      `}</style>

      <div className="ps-page-hero">
        <div className="ps-page-tag">Support</div>
        <h1>Help Center</h1>
        <p>Find answers to the most common questions about cashback, withdrawals, and your account.</p>
      </div>

      <div className="ps-help-layout">
        <aside className="ps-category-nav">
          {helpTopics.map((topic, i) => (
            <button
              key={i}
              className={`ps-cat-btn ${activeCategory === i ? 'active' : ''}`}
              onClick={() => { setActiveCategory(i); setOpenFaq(null); }}
            >
              <span className="ps-cat-icon">{topic.icon}</span>
              {topic.category}
            </button>
          ))}
        </aside>

        <div className="ps-faq-section">
          <h2>{helpTopics[activeCategory].icon} {helpTopics[activeCategory].category}</h2>
          <p className="ps-subtitle">{helpTopics[activeCategory].faqs.length} articles in this section</p>

          {helpTopics[activeCategory].faqs.map((faq, i) => (
            <div key={i} className="ps-faq-item">
              <div className="ps-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {faq.q}
                <span className={`ps-faq-arrow ${openFaq === i ? 'open' : ''}`}>+</span>
              </div>
              {openFaq === i && <div className="ps-faq-a">{faq.a}</div>}
            </div>
          ))}

          <div className="ps-still-stuck">
            <h3>Still need help?</h3>
            <p>Can&apos;t find what you&apos;re looking for? Our support team is here to help.</p>
            <a href="/contact" className="ps-contact-btn">Contact Support →</a>
          </div>
        </div>
      </div>
    </>
  );
}
