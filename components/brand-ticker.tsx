"use client";

import { useState } from "react";
import BrandLogo from "@/components/BrandLogo";

const Brands = [
  { name: "Dot & Key",         cashback: "9.8%",   category: "Beauty",      url: "https://track.vcommission.com/click?campaign_id=12957&pub_id=127049" },
  { name: "MuscleBlaze",       cashback: "4.9%",   category: "Health",      url: "https://track.vcommission.com/click?campaign_id=10169&pub_id=127049" },
  { name: "HK Vitals",         cashback: "14%",    category: "Health",      url: "https://track.vcommission.com/click?campaign_id=10111&pub_id=127049" },
  { name: "Healthkart",        cashback: "4.9%",   category: "Health",      url: "https://track.vcommission.com/click?campaign_id=10109&pub_id=127049" },
  { name: "The Bear House",    cashback: "11.9%",  category: "Fashion",     url: "https://track.vcommission.com/click?campaign_id=13030&pub_id=127049" },
  { name: "BeBodywise",        cashback: "42%",    category: "Beauty",      url: "https://track.vcommission.com/click?campaign_id=13044&pub_id=127049" },
  { name: "Manmatters",        cashback: "28%",    category: "Health",      url: "https://track.vcommission.com/click?campaign_id=13046&pub_id=127049" },
  { name: "Milton",            cashback: "10.18%", category: "Home",        url: "https://track.vcommission.com/click?campaign_id=12749&pub_id=127049" },
  { name: "Snitch",            cashback: "5.6%",   category: "Fashion",     url: "https://track.vcommission.com/click?campaign_id=10803&pub_id=127049" },
  { name: "H&M",               cashback: "5.6%",   category: "Fashion",     url: "https://track.vcommission.com/click?campaign_id=12579&pub_id=127049" },
  { name: "Borosil",           cashback: "14%",    category: "Home",        url: "https://track.vcommission.com/click?campaign_id=12765&pub_id=127049" },
  { name: "The Natural Wash",  cashback: "10.5%",  category: "Beauty",      url: "https://track.vcommission.com/click?campaign_id=12839&pub_id=127049" },
  { name: "FirstCry",          cashback: "₹35",    category: "Baby & Kids", url: "https://track.vcommission.com/click?campaign_id=10081&pub_id=127049" },
  { name: "Go Noise",          cashback: "5.6%",   category: "Electronics", url: "https://track.vcommission.com/click?campaign_id=10320&pub_id=127049" },
  { name: "The Man Company",   cashback: "14%",    category: "Beauty",      url: "https://track.vcommission.com/click?campaign_id=10248&pub_id=127049" },
  { name: "Neemans",           cashback: "8.75%",  category: "Fashion",     url: "https://track.vcommission.com/click?campaign_id=11043&pub_id=127049" },
  { name: "Forest Essentials", cashback: "5%",     category: "Beauty",      url: "https://track.vcommission.com/click?campaign_id=11348&pub_id=127049" },
  { name: "Kindlife",          cashback: "3.5%",   category: "Health",      url: "https://track.vcommission.com/click?campaign_id=10129&pub_id=127049" },
  { name: "Nilkamal",          cashback: "8.5%",   category: "Home",        url: "https://track.vcommission.com/click?campaign_id=11875&pub_id=127049" },
  { name: "Levi's",            cashback: "10.5%",  category: "Fashion",     url: "https://track.vcommission.com/click?campaign_id=11501&pub_id=127049" },
  { name: "Clove Oral Care",   cashback: "58%",    category: "Health",      url: "https://track.vcommission.com/click?campaign_id=12131&pub_id=127049" },
  { name: "Myntra",            cashback: "7%",     category: "Fashion",     url: "https://track.vcommission.com/click?campaign_id=10882&pub_id=127049" },
];

const CATEGORIES = ["All", "Fashion", "Health", "Beauty", "Home", "Electronics", "Baby & Kids"];

export function BrandTicker() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);

  const filtered =
    activeCategory === "All"
      ? Brands
      : Brands.filter((b) => b.category === activeCategory);

  const tickerItems = [...filtered, ...filtered];

  return (
    <section className="py-14 overflow-hidden bg-white border-y border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Shop from <span className="text-orange-500">22+ Brands</span> &amp; Earn Cashback
        </h2>
        <p className="mt-2 text-gray-500 text-sm">
          Every purchase through PrimeSavr earns you real cashback
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
          onMouseEnter={(e) =>
            (e.currentTarget.style.animationPlayState = "paused")
          }
          onMouseLeave={(e) => {
            e.currentTarget.style.animationPlayState = "running";
            setHoveredBrand(null);
          }}
        >
          {tickerItems.map((brand, i) => (
            <a
              key={`${brand.name}-${i}`}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center gap-3 rounded-2xl border border-orange-100 bg-orange-50/60 px-5 py-3.5 transition-all hover:border-orange-400 hover:shadow-lg hover:bg-orange-50 hover:-translate-y-1 flex-shrink-0 no-underline"
              onMouseEnter={() => setHoveredBrand(`${brand.name}-${i}`)}
              onMouseLeave={() => setHoveredBrand(null)}
            >
              <BrandLogo name={brand.name} size={40} />
              <div>
                <p className="text-sm font-semibold text-gray-800 whitespace-nowrap">
                  {brand.name}
                </p>
                <p className="text-xs font-bold text-orange-500">
                  {brand.cashback} Cashback
                </p>
              </div>

              {/* Hover tooltip */}
              {hoveredBrand === `${brand.name}-${i}` && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white shadow-xl z-20">
                  Click to shop &amp; earn {brand.cashback} back
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                </div>
              )}
            </a>
          ))}
        </div>
      </div>

      {/* Count badge */}
      <div className="mt-8 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-5 py-2 text-sm text-orange-700 font-medium">
          <span className="font-bold">{filtered.length} brands</span>
          <span className="text-orange-400">·</span>
          click any brand to earn cashback
        </div>
      </div>

      <style jsx>{`
        @keyframes brandTicker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}