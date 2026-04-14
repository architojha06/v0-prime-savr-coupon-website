"use client";

import { useState, useRef } from "react";
import { Header } from "@/components/header";
import { SearchBar } from "@/components/search-bar";
import { CategoryFilter } from "@/components/category-filter";
import { CouponsList } from "@/components/coupons-list";
import { Footer } from "@/components/footer";
import { BrandTicker } from "@/components/brand-ticker";
import { CashbackClaimSection } from "@/components/cashback-claim-section";

// ─── Live cashback feed (marquee ticker) ──────────────────────────────────────
const LIVE_FEED = [
  { name: "Priya S.", brand: "Myntra", amount: "₹184", time: "2 min ago" },
  { name: "Arjun K.", brand: "Healthkart", amount: "₹97",  time: "11 min ago" },
  { name: "Sneha M.", brand: "Ajio",       amount: "₹200", time: "23 min ago" },
  { name: "Rohit V.", brand: "Levi's",     amount: "₹145", time: "34 min ago" },
  { name: "Divya R.", brand: "Mamaearth",  amount: "₹62",  time: "1 hr ago"  },
  { name: "Karan T.", brand: "H&M",        amount: "₹113", time: "1 hr ago"  },
  { name: "Ananya P.", brand: "Nykaa",     amount: "₹88",  time: "2 hrs ago" },
];

function LiveCashbackTicker() {
  const items = [...LIVE_FEED, ...LIVE_FEED]; // duplicate for seamless loop
  return (
    <div className="bg-gray-950 border-b border-gray-800 py-2.5 overflow-hidden">
      <div
        className="flex gap-10 whitespace-nowrap"
        style={{ animation: "marquee 30s linear infinite" }}
      >
        {items.map((f, i) => (
          <div key={i} className="inline-flex items-center gap-2 text-sm shrink-0">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse shrink-0" />
            <span className="font-semibold text-white">{f.name}</span>
            <span className="text-gray-400">received</span>
            <span className="font-bold text-green-400">{f.amount}</span>
            <span className="text-gray-400">cashback from</span>
            <span className="text-orange-400 font-medium">{f.brand}</span>
            <span className="text-gray-600 ml-1">· {f.time}</span>
            <span className="text-gray-700 mx-3">|</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Trust strip ──────────────────────────────────────────────────────────────
function TrustStrip() {
  const badges = [
    { icon: "🔒", label: "100% Verified Links" },
    { icon: "💸", label: "Real UPI Cashback" },
    { icon: "⚡", label: "No App Download" },
    { icon: "🤝", label: "22+ Brand Partners" },
    { icon: "🇮🇳", label: "Made for India" },
  ];
  return (
    <div className="border-b border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-6 py-2.5 flex-wrap">
          {badges.map((b) => (
            <div key={b.label} className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
              <span>{b.icon}</span>
              <span>{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ onBrowseClick }: { onBrowseClick: () => void }) {
  return (
    <section className="relative overflow-hidden border-b border-gray-100 bg-gradient-to-b from-orange-50/90 via-orange-50/40 to-white">
      {/* decorative blobs */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-orange-200/35 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 -left-16 h-64 w-64 rounded-full bg-orange-100/50 blur-2xl" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl text-center">

          {/* social proof pill — most recent cashback */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-1.5 text-sm font-medium text-green-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            Priya S. just got <span className="font-bold text-green-800">₹184 cashback</span> on Myntra ✨
          </div>

          {/* headline — crystal clear value prop */}
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-[3.6rem] lg:leading-tight">
            Shop Myntra, Ajio & 20+ brands —<br />
            <span className="text-orange-500">get real ₹ back in your UPI.</span>
          </h1>

          {/* one-line mechanic explanation */}
          <p className="mt-5 text-lg text-gray-600 leading-relaxed">
            Click any brand on PrimeSavr → shop as usual → we send{" "}
            <span className="font-bold text-orange-500">5% cashback (up to ₹200)</span>{" "}
            straight to your UPI within 45 days. Zero codes. Zero apps.
          </p>

          {/* search */}
          <div className="mt-8">
            <SearchBar />
          </div>

          {/* CTA buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onBrowseClick}
              className="rounded-full bg-orange-500 hover:bg-orange-600 active:scale-95 transition-all px-7 py-3 text-sm font-bold text-white shadow-lg shadow-orange-200"
            >
              Browse Brands & Start Saving →
            </button>
            <a
              href="#how-it-works"
              className="rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-all px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm"
            >
              How does it work?
            </a>
          </div>

          {/* micro-trust row */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400 font-medium">
            <span>✅ Free to use</span>
            <span className="text-gray-200">|</span>
            <span>✅ No login needed to browse</span>
            <span className="text-gray-200">|</span>
            <span>✅ Cashback via UPI — no wallet lock-in</span>
          </div>

          {/* scroll nudge */}
          <div className="mt-10 flex justify-center">
            <div className="flex flex-col items-center gap-1 text-gray-300">
              <span className="text-xs tracking-wide">scroll to explore</span>
              <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    {
      num: "1",
      emoji: "🔗",
      title: "Click a brand link",
      desc: "Find any brand on PrimeSavr and click \"Shop Now\". This activates your cashback tracking.",
    },
    {
      num: "2",
      emoji: "🛒",
      title: "Buy as you normally would",
      desc: "No coupon codes needed. Just add to cart and checkout on the brand's own website.",
    },
    {
      num: "3",
      emoji: "📋",
      title: "Claim with your Order ID",
      desc: "After purchase, come back and submit your Order ID. Takes 30 seconds.",
    },
    {
      num: "4",
      emoji: "💸",
      title: "₹ hits your UPI in 45 days",
      desc: "Once the brand confirms your order, we transfer your cashback directly to your UPI ID.",
    },
  ];

  return (
    <section id="how-it-works" className="bg-orange-500 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-2">
            Stupidly Simple
          </p>
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
            How cashback actually works
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={i} className="relative rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-5 text-white">
              <div className="mb-3 flex items-center gap-3">
                <span className="text-2xl">{s.emoji}</span>
                <span className="text-xs font-bold uppercase tracking-widest text-white/50">Step {s.num}</span>
              </div>
              <h3 className="font-bold text-base mb-1.5">{s.title}</h3>
              <p className="text-sm text-white/80 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Important note — sets correct expectations */}
        <div className="mt-8 mx-auto max-w-xl rounded-xl bg-white/10 border border-white/20 px-5 py-4 text-center text-sm text-white/80">
          <span className="font-semibold text-white">⏱ Heads up:</span> Cashback takes up to 45 days because brands
          verify orders before approving them. This is normal — your money is safe.
        </div>
      </div>
    </section>
  );
}

// ─── Why PrimeSavr — 3-card value prop ────────────────────────────────────────
function WhyUs() {
  const cards = [
    {
      emoji: "💸",
      title: "Real money, not points",
      desc: "We pay cashback directly to your UPI ID — not app credits, not gift cards. Actual rupees.",
      highlight: "UPI Transfer",
    },
    {
      emoji: "🛍️",
      title: "Your favourite brands",
      desc: "Myntra, Ajio, H&M, Levi's, Healthkart, Mamaearth and 16 more — brands you already shop at.",
      highlight: "22+ Brands",
    },
    {
      emoji: "🚫",
      title: "No hidden catches",
      desc: "No minimum order. No app download. No referral requirement. Just shop and earn.",
      highlight: "Zero Conditions",
    },
  ];

  return (
    <section className="bg-white py-16 border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            Why shoppers use <span className="text-orange-500">PrimeSavr</span>
          </h2>
          <p className="mt-2 text-sm text-gray-500">We built the thing we always wished existed.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {cards.map((c) => (
            <div key={c.title} className="rounded-2xl border border-gray-100 bg-gray-50 p-6 hover:shadow-md transition-shadow">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-3xl">{c.emoji}</span>
                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-600">{c.highlight}</span>
              </div>
              <h3 className="mb-2 font-bold text-gray-900 text-lg">{c.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Savings calculator — makes it personal ───────────────────────────────────
function SavingsCalculator() {
  const [spend, setSpend] = useState(2000);
  const cashback = Math.min(Math.round(spend * 0.05), 200);
  const yearly = cashback * 12;

  return (
    <section className="bg-gray-950 py-14">
      <div className="mx-auto max-w-xl px-4 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-2">
          See your savings
        </p>
        <h2 className="text-2xl font-extrabold text-white mb-8">
          How much could you earn?
        </h2>

        <div className="rounded-2xl bg-gray-900 border border-gray-800 p-8">
          <label className="block text-sm text-gray-400 mb-3">
            Monthly online shopping spend
          </label>
          <div className="text-4xl font-extrabold text-white mb-4">
            ₹{spend.toLocaleString("en-IN")}
          </div>
          <input
            type="range"
            min={500}
            max={10000}
            step={500}
            value={spend}
            onChange={(e) => setSpend(Number(e.target.value))}
            className="w-full accent-orange-500 mb-6"
          />
          <div className="flex gap-4">
            <div className="flex-1 rounded-xl bg-gray-800 p-4 text-center">
              <div className="text-2xl font-extrabold text-green-400">₹{cashback}</div>
              <div className="text-xs text-gray-500 mt-1">per order cashback</div>
            </div>
            <div className="flex-1 rounded-xl bg-orange-500/10 border border-orange-500/30 p-4 text-center">
              <div className="text-2xl font-extrabold text-orange-400">₹{yearly.toLocaleString("en-IN")}</div>
              <div className="text-xs text-gray-500 mt-1">saved per year</div>
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-600">
            Cashback is 5% per order, capped at ₹200. Most users save ₹80–₹200 per order.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Brand grid + coupons ─────────────────────────────────────────────────────
function BrandsSection({ sectionRef }: { sectionRef: React.RefObject<HTMLDivElement | null> }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  return (
    <section ref={sectionRef} className="py-14 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            Browse <span className="text-orange-500">All Brands</span>
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Every link gives you 5% cashback. Just click, shop, and claim.
          </p>
        </div>
        <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
        <CouponsList selectedCategory={selectedCategory} />
      </div>
    </section>
  );
}

// ─── FAQ — pre-empts common drop-off objections ───────────────────────────────
function FAQ() {
  const faqs = [
    {
      q: "Do I need to create an account?",
      a: "You need an account only to claim your cashback (so we know where to send the money). Browsing is completely open.",
    },
    {
      q: "Why does it take 45 days?",
      a: "Brands wait to confirm orders aren't returned before approving cashback. Once confirmed, we transfer it to your UPI immediately.",
    },
    {
      q: "What if I return my order?",
      a: "Cashback is only paid on non-returned orders. If you return, the cashback for that order is cancelled.",
    },
    {
      q: "Is there a minimum order amount?",
      a: "No minimum! Even a ₹200 order earns ₹10 cashback. Every purchase counts.",
    },
    {
      q: "How do I get my cashback?",
      a: "After shopping, come back to PrimeSavr, click 'Claim Cashback', and enter your Order ID. We handle the rest.",
    },
  ];

  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-white py-16 border-t border-gray-100">
      <div className="mx-auto max-w-2xl px-4">
        <h2 className="text-2xl font-extrabold text-center text-gray-900 mb-8">
          Got questions?
        </h2>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
              >
                <span>{f.q}</span>
                <span className={`text-orange-500 transition-transform ${open === i ? "rotate-45" : ""}`}>+</span>
              </button>
              {open === i && (
                <div className="px-5 pb-4 text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-3 bg-gray-50">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA banner ─────────────────────────────────────────────────────────
function FinalCTA({ onBrowseClick }: { onBrowseClick: () => void }) {
  return (
    <section className="bg-orange-500 py-14">
      <div className="mx-auto max-w-xl px-4 text-center">
        <div className="mb-4 text-4xl">💸</div>
        <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
          Your next order could earn you ₹200 back.
        </h2>
        <p className="mt-3 text-white/80 text-sm">
          Just click a brand, shop normally, and claim. That&apos;s it.
        </p>
        <button
          onClick={onBrowseClick}
          className="mt-7 rounded-full bg-white text-orange-600 hover:bg-orange-50 active:scale-95 transition-all px-8 py-3.5 text-sm font-extrabold shadow-lg"
        >
          Browse Brands Now →
        </button>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const brandsRef = useRef<HTMLDivElement>(null);

  const scrollToBrands = () => {
    brandsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* marquee keyframe — injected once */}
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <TrustStrip />

        <main className="flex-1">
          {/* 1. Hero — crystal-clear value prop */}
          <Hero onBrowseClick={scrollToBrands} />

          {/* 2. Live cashback feed — social proof + FOMO */}
          <LiveCashbackTicker />

          {/* 3. Brand ticker */}
          <BrandTicker />

          {/* 4. How it works — answers "but how?" immediately */}
          <HowItWorks />

          {/* 5. Why us — differentiation */}
          <WhyUs />

          {/* 6. Savings calculator — makes it personal */}
          <SavingsCalculator />

          {/* 7. Brands + coupons — the actual product */}
          <BrandsSection sectionRef={brandsRef} />

          {/* 8. Claim cashback section */}
          <CashbackClaimSection />

          {/* 9. FAQ — kills last objections */}
          <FAQ />

          {/* 10. Final CTA */}
          <FinalCTA onBrowseClick={scrollToBrands} />
        </main>

        <Footer />
      </div>
    </>
  );
}
