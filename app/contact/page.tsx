'use client';

import { useState } from 'react';
import { CashbackClaimSection } from '@/components/cashback-claim-section';

export default function Contact() {
  
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  

  const faqs = [
    {
      q: 'How long does cashback take to reflect in my wallet?',
      a: 'Cashback is typically credited within 7–90 days after purchase, depending on the merchant\'s confirmation period. You\'ll be notified via email once it\'s credited.',
    },
    {
      q: 'My cashback wasn\'t tracked. What should I do?',
      a: 'Make sure you clicked the PrimeSavr link with cookies enabled and no ad blocker. If the purchase is confirmed and cashback is missing after 7 days, raise a dispute at support@primesavr.com within 45 days.',
    },
    {
      q: 'When can I withdraw my cashback?',
      a: 'You can withdraw once your wallet balance reaches the minimum withdrawal threshold. Withdrawals are processed to your verified bank account or UPI ID within 5–7 business days.',
    },
    {
      q: 'Can I use PrimeSavr with any coupon code?',
      a: 'Cashback is only tracked on purchases made through our affiliate links. Using coupon codes from other sources may interfere with tracking and result in cashback not being credited.',
    },
    {
      q: 'How do I delete my PrimeSavr account?',
      a: 'Email support@primesavr.com with your registered email address and request for account deletion. Under the DPDP Act, 2023, we will process this within 30 days.',
    },
  ];

  return (
    <>
      <style>{`
        .ps-page-hero { background: #FFFFFF; border-bottom: 1px solid #E8E8E8; padding: 60px 32px 52px; text-align: center; }
        .ps-page-tag { display: inline-block; background: #FFF0E8; color: #E8601C; font-size: 11px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; padding: 5px 14px; border-radius: 20px; margin-bottom: 18px; }
        .ps-page-hero h1 { font-family: 'Fraunces', serif; font-size: clamp(32px, 5vw, 48px); color: #1A1A1A; font-weight: 600; line-height: 1.15; margin-bottom: 14px; }
        .ps-page-hero p { color: #7A7A7A; font-size: 15px; font-weight: 300; max-width: 500px; margin: 0 auto; }
        .ps-contact-layout { max-width: 1000px; margin: 0 auto; padding: 64px 32px; }
        .ps-channels { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 56px; }
        .ps-channel-card { background: #FFFFFF; border: 1px solid #E8E8E8; border-radius: 12px; padding: 28px 24px; transition: box-shadow 0.2s; }
        .ps-channel-card:hover { box-shadow: 0 4px 24px rgba(0,0,0,0.07); }
        .ps-channel-icon { width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; font-size: 20px; }
        .ps-icon-support { background: #FFF0E8; }
        .ps-icon-deals { background: #E8F4FF; }
        .ps-icon-grievance { background: #F0FBF0; }
        .ps-channel-card h3 { font-family: 'Fraunces', serif; font-size: 17px; font-weight: 600; color: #1A1A1A; margin-bottom: 6px; }
        .ps-channel-card p { font-size: 13.5px; color: #7A7A7A; font-weight: 300; margin-bottom: 14px; line-height: 1.5; }
        .ps-channel-email { font-size: 14px; font-weight: 500; color: #E8601C; text-decoration: none; display: block; }
        .ps-response-tag { display: inline-block; background: #F7F6F3; border: 1px solid #E8E8E8; font-size: 11px; color: #7A7A7A; padding: 3px 10px; border-radius: 20px; margin-top: 10px; }
        .ps-form-wrap { background: #FFFFFF; border: 1px solid #E8E8E8; border-radius: 14px; padding: 44px 48px; }
        .ps-form-header { margin-bottom: 32px; }
        .ps-form-header h2 { font-family: 'Fraunces', serif; font-size: 26px; font-weight: 600; color: #1A1A1A; margin-bottom: 8px; }
        .ps-form-header p { color: #7A7A7A; font-size: 14.5px; font-weight: 300; }
        .ps-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .ps-form-group { display: flex; flex-direction: column; gap: 7px; }
        .ps-form-group.full { grid-column: 1 / -1; }
        .ps-form-group label { font-size: 12.5px; font-weight: 500; color: #1A1A1A; letter-spacing: 0.3px; }
        .ps-form-group input, .ps-form-group select, .ps-form-group textarea {
          width: 100%; padding: 12px 16px;
          border: 1px solid #E8E8E8; border-radius: 8px;
          font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 300;
          color: #1A1A1A; background: #F7F6F3;
          outline: none; transition: border-color 0.2s, background 0.2s;
          appearance: none;
        }
        .ps-form-group input:focus, .ps-form-group select:focus, .ps-form-group textarea:focus {
          border-color: #E8601C; background: #FFFFFF;
        }
        .ps-form-group textarea { resize: vertical; min-height: 130px; }
        .ps-submit-btn {
          margin-top: 8px;
          background: #E8601C; color: white;
          border: none; border-radius: 8px;
          padding: 14px 36px;
          font-family: 'DM Sans', sans-serif; font-size: 14.5px; font-weight: 500;
          cursor: pointer; transition: opacity 0.2s, transform 0.15s;
        }
        .ps-submit-btn:hover { opacity: 0.9; transform: translateY(-1px); }
        .ps-success-msg { background: #F0FBF0; border: 1px solid #B8E0B8; border-radius: 8px; padding: 16px 20px; font-size: 14px; color: #2D6A2D; margin-top: 16px; }
        .ps-faq-section { margin-top: 56px; }
        .ps-faq-section h2 { font-family: 'Fraunces', serif; font-size: 26px; font-weight: 600; color: #1A1A1A; margin-bottom: 24px; }
        .ps-faq-item { background: #FFFFFF; border: 1px solid #E8E8E8; border-radius: 10px; margin-bottom: 10px; overflow: hidden; }
        .ps-faq-q { padding: 18px 24px; font-size: 14.5px; font-weight: 500; color: #1A1A1A; cursor: pointer; display: flex; justify-content: space-between; align-items: center; user-select: none; }
        .ps-faq-q:hover { background: #FAFAF9; }
        .ps-faq-arrow { font-size: 18px; color: #E8601C; transition: transform 0.25s; }
        .ps-faq-arrow.open { transform: rotate(45deg); }
        .ps-faq-a { font-size: 14px; font-weight: 300; color: #7A7A7A; line-height: 1.7; padding: 0 24px 18px; }
        @media (max-width: 768px) {
          .ps-channels { grid-template-columns: 1fr; }
          .ps-form-grid { grid-template-columns: 1fr; }
          .ps-form-wrap { padding: 28px 20px; }
        }
      `}</style>

      <div className="ps-page-hero">
        <div className="ps-page-tag">Get in Touch</div>
        <h1>Contact Us</h1>
        <p>Have a question about cashback, deals, or your account? We&apos;re here to help.</p>
      </div>

      <div className="ps-contact-layout">
        {/* Channel Cards */}
        <div className="ps-channels">
          <div className="ps-channel-card">
            <div className="ps-channel-icon ps-icon-support">🎧</div>
            <h3>User Support</h3>
            <p>Missing cashback, account issues, or withdrawal help</p>
            <a href="mailto:support@primesavr.com" className="ps-channel-email">support@primesavr.com</a>
            <span className="ps-response-tag">Replies within 24–48 hrs</span>
          </div>
          <div className="ps-channel-card">
            <div className="ps-channel-icon ps-icon-deals">🤝</div>
            <h3>Partner / Deals</h3>
            <p>Submit a deal, merchant partnership, or affiliate enquiry</p>
            <a href="mailto:partners@primesavr.com" className="ps-channel-email">partners@primesavr.com</a>
            <span className="ps-response-tag">Replies within 2–3 business days</span>
          </div>
          <div className="ps-channel-card">
            <div className="ps-channel-icon ps-icon-grievance">⚖️</div>
            <h3>Grievance Officer</h3>
            <p>Legal complaints &amp; escalations as per IT Rules, 2021</p>
            <a href="mailto:grievance@primesavr.com" className="ps-channel-email">grievance@primesavr.com</a>
            <span className="ps-response-tag">Resolved within 15 days by law</span>
          </div>
        </div>

        {/* Contact Form */}
        {/* Cashback Claim Form */}
        <CashbackClaimSection />

        {/* FAQ */}
        <div className="ps-faq-section">
          <h2>Frequently Asked Questions</h2>
          {faqs.map((faq, i) => (
            <div key={i} className="ps-faq-item">
              <div className="ps-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {faq.q}
                <span className={`ps-faq-arrow ${openFaq === i ? 'open' : ''}`}>+</span>
              </div>
              {openFaq === i && <div className="ps-faq-a">{faq.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
