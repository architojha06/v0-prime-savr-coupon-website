"use client";

import { useState, useRef, useEffect } from "react";
import { Header } from "@/components/header";
import { SearchBar } from "@/components/search-bar";
import { CategoryGrid } from "@/components/category-grid";
import { CategoryFilter } from "@/components/category-filter";
import { CouponsList } from "@/components/coupons-list";
import { Footer } from "@/components/footer";
import { BrandTicker } from "@/components/brand-ticker";
import { CashbackClaimSection } from "@/components/cashback-claim-section";
import BrandLogo from "@/components/BrandLogo";

// Floating cashback pill that sticks at top after hero scrolls past
function FloatingClaimBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-5 left-1/2 z-50 -translate-x-1/2 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      <button
        onClick={() => document.getElementById("cashback-claim")?.scrollIntoView({ behavior: "smooth" })}
        className="flex items-center gap-2.5 rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-xl shadow-orange-500/30 hover:bg-orange-400 transition-colors"
      >
        <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
        💸 Claim Your 5% Cashback
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  );
}

// Trust badges row
function TrustBadges() {
  const badges = [
    { icon: "🔒", label: "Verified Coupons" },
    { icon: "⚡", label: "Instant Codes" },
    { icon: "💸", label: "Real UPI Cashback" },
    { icon: "🤝", label: "22+ Brand Partners" },
    { icon: "🇮🇳", label: "Made for India" },
  ];
  return (
    <div className="border-b border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-6 py-3 flex-wrap">
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

// How cashback works — compact inline strip
function HowItWorksStrip() {
  const steps = [
    { num: "1", text: "Click a brand link on PrimeSavr" },
    { num: "2", text: "Complete your purchase normally" },
    { num: "3", text: "Submit claim with Order ID + UPI" },
    { num: "4", text: "Cashback hits your UPI in 45 days" },
  ];
  return (
    <section className="bg-orange-500 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-white/70 mb-6">
          How 5% Cashback Works
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {steps.map((s, i) => (
            <div key={i} className="relative flex flex-col items-center text-center">
              {/* connector line */}
              {i < steps.length - 1 && (
                <div className="hidden sm:block absolute top-4 left-[calc(50%+20px)] right-[-calc(50%-20px)] h-px bg-white/30 w-full" />
              )}
              <div className="relative z-10 mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-black text-orange-500">
                {s.num}
              </div>
              <p className="text-sm font-medium text-white leading-snug">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Top cashback brands highlight grid
function Mostpurchased() {
  const brands = [
  { name: "Clove Oral Care", hot: true, url: "https://track.vcommission.com/click?campaign_id=12131&pub_id=127049" },
  { name: "BeBodywise", hot: true, url: "https://track.vcommission.com/click?campaign_id=13044&pub_id=127049" },
  { name: "Manmatters", hot: false, url: "https://track.vcommission.com/click?campaign_id=13046&pub_id=127049" },
  { name: "Dot & Key", hot: false, url: "https://track.vcommission.com/click?campaign_id=12957&pub_id=127049" },
  { name: "Myntra", hot: false, url: "https://track.vcommission.com/click?campaign_id=10882&pub_id=127049" },
  { name: "Healthkart", hot: false, url: "https://track.vcommission.com/click?campaign_id=10109&pub_id=127049" },
]
  return (
    <section className="bg-gray-50 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Most <span className="text-orange-500">Purchased</span> Brands
          </h2>
          <p className="mt-2 text-sm text-gray-500">These brands earn you the most — shop smart</p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {brands.map((b) => (
  <a key={b.name} href={b.url} target="_blank" rel="noopener noreferrer"
            className="group relative flex flex-col items-center gap-2 rounded-2xl border border-orange-100 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-md cursor-pointer"
         >
            {b.hot && (
                   <span className="absolute -top-2 right-3 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
                    🔥 HOT
                   </span>
            )}
            <BrandLogo name={b.name} size={56} />
            <p className="text-xs font-semibold text-gray-700 leading-tight">{b.name}</p>
            <p className="text-sm font-black text-orange-500">5% back</p>
         </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const couponsSectionRef = useRef<HTMLDivElement>(null);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    couponsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      {/* Trust badges — right under nav */}
      <TrustBadges />

      <main className="flex-1">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden border-b border-gray-100 bg-gradient-to-b from-orange-50/80 via-orange-50/30 to-white">
          {/* decorative blobs */}
          <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-20 h-56 w-56 rounded-full bg-orange-100/40 blur-2xl" />

          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 relative z-10">
            <div className="mx-auto max-w-2xl text-center">
              {/* Pill badge */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-sm font-medium text-orange-600">
                <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                India&apos;s fastest growing coupon platform
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Save More on Every
                <span className="block text-orange-500">Purchase with PrimeSavr</span>
              </h1>

              <p className="mt-5 text-lg text-gray-500 leading-relaxed">
                Find the best coupons, promo codes, and exclusive deals — plus get{" "}
                <span className="font-semibold text-orange-500">5% cashback</span> (up to ₹200)
                on every order through our links.
              </p>

              <div className="mt-8">
                <SearchBar />
              </div>

              {/* Cashback + social proof pills row */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-green-50 border border-green-200 px-4 py-2 text-sm font-medium text-green-700">
                  💸 5% cashback → straight to UPI in 45 days
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-4 py-2 text-sm font-medium text-blue-700">
                  🎟️ Community-verified deals
                </div>
              </div>

              {/* scroll cue */}
              <div className="mt-10 flex justify-center">
                <div className="flex flex-col items-center gap-1 text-gray-400">
                  <span className="text-xs">Scroll to explore</span>
                  <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        

        {/* ── How cashback works strip ── */}
        <HowItWorksStrip />

        {/* ── Brand Ticker ── */}
        <BrandTicker />

        {/* ── Top cashback brands ── */}
        <Mostpurchased />

        {/* ── Category grid ── */}
        <CategoryGrid onCategoryClick={handleCategoryClick} />

        {/* ── Deals / Coupons ── */}
        <div ref={couponsSectionRef}>
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          <CouponsList selectedCategory={selectedCategory} />
        </div>

        {/* ── Submit a coupon ── */}
        

        {/* ── Cashback Claim ── */}
        <CashbackClaimSection />
      </main>

      <Footer />

      {/* ── Floating sticky claim CTA ── */}
      <FloatingClaimBar />
    </div>
  );
}
