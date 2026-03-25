"use client";

import { useState } from "react";

const BRANDS = [
  { name: "Clove Oral Care",   emoji: "🦷", cashback: "5%", category: "Health" },
  { name: "BeBodywise",        emoji: "💆‍♀️", cashback: "5%", category: "Beauty" },
  { name: "Manmatters",        emoji: "💪", cashback: "5%", category: "Health" },
  { name: "Dot & Key",         emoji: "🌿", cashback: "5%", category: "Beauty" },
  { name: "Healthkart",        emoji: "🧴", cashback: "5%", category: "Health" },
  { name: "HK Vitals",         emoji: "💊", cashback: "5%", category: "Health" },
  { name: "MuscleBlaze",       emoji: "🏋️", cashback: "5%", category: "Health" },
  { name: "Snitch",            emoji: "👕", cashback: "5%", category: "Fashion" },
  { name: "The Bear House",    emoji: "👔", cashback: "5%", category: "Fashion" },
  { name: "Myntra",            emoji: "🛍️", cashback: "5%", category: "Fashion" },
  { name: "The Natural Wash",  emoji: "🌱", cashback: "5%", category: "Beauty" },
  { name: "Forest Essentials", emoji: "🌳", cashback: "5%", category: "Beauty" },
  { name: "H&M",               emoji: "👗", cashback: "5%", category: "Fashion" },
  { name: "Neemans",           emoji: "👟", cashback: "5%", category: "Fashion" },
  { name: "Levi's",            emoji: "👖", cashback: "5%", category: "Fashion" },
  { name: "FirstCry",          emoji: "🍼", cashback: "5%", category: "Baby & Kids" },
  { name: "Nilkamal",          emoji: "🏠", cashback: "5%", category: "Home" },
  { name: "Go Noise",          emoji: "🔊", cashback: "5%", category: "Electronics" },
  { name: "Milton",            emoji: "🫙", cashback: "5%", category: "Home" },
  { name: "Borosil",           emoji: "🥃", cashback: "5%", category: "Home" },
  { name: "The Man Company",   emoji: "🧔", cashback: "5%", category: "Beauty" },
  { name: "Kindlife",          emoji: "💚", cashback: "5%", category: "Health" },
];

const CATEGORIES = ["All", "Fashion", "Health", "Beauty", "Home", "Electronics", "Baby & Kids"];

// Duplicate for seamless infinite scroll
const TICKER_ITEMS = [...BRANDS, ...BRANDS];

export function BrandTicker() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);

  const filtered = activeCategory === "All"
    ? BRANDS
    : BRANDS.filter((b) => b.category === activeCategory);
  const tickerItems = [...filtered, ...filtered];

  return (
    <section className="py-14 overflow-hidden bg-white border-y border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Shop from <span className="text-orange-500">22+ Brands</span> &amp; Earn Cashback
        </h2>
        <p className="mt-2 text-gray-500 text-sm">
          Every purchase through PrimeSavr earns you <span className="font-semibold text-orange-500">5% cashback</span> (up to ₹200)
        </p>

        {/* Category filter pills */}
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-orange-500 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Ticker */}
      <div className="relative">
        {/* fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-white to-transparent" />

        <div
          className="flex gap-4 w-max"
          style={{ animation: "brandTicker 35s linear infinite" }}
          onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
          onMouseLeave={(e) => {
            e.currentTarget.style.animationPlayState = "running";
            setHoveredBrand(null);
          }}
        >
          {tickerItems.map((brand, i) => (
            <div
              key={`${brand.name}-${i}`}
              className="relative flex items-center gap-3 rounded-2xl border border-orange-100 bg-orange-50/60 px-5 py-3.5 cursor-pointer transition-all hover:border-orange-400 hover:shadow-lg hover:bg-orange-50 hover:-translate-y-1 flex-shrink-0"
              onMouseEnter={() => setHoveredBrand(`${brand.name}-${i}`)}
              onMouseLeave={() => setHoveredBrand(null)}
            >
              <span className="text-2xl">{brand.emoji}</span>
              <div>
                <p className="text-sm font-semibold text-gray-800 whitespace-nowrap">{brand.name}</p>
                <p className="text-xs font-bold text-orange-500">{brand.cashback} Cashback</p>
              </div>

              {/* Hover tooltip */}
              {hoveredBrand === `${brand.name}-${i}` && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white shadow-xl z-20">
                  Shop {brand.name} → get ₹{Math.min(200, 50)} back
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Count badge */}
      <div className="mt-8 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-5 py-2 text-sm text-orange-700 font-medium">
          <span className="font-bold">{filtered.length} brands</span>
          <span className="text-orange-400">·</span>
          all offering 5% cashback up to ₹200
        </div>
      </div>

      {/* CSS animation — scoped, no globals.css change needed */}
      <style jsx>{`
        @keyframes brandTicker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
