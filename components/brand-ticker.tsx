"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BrandLogo from "@/components/BrandLogo";
import { useAuth } from "@/components/auth-provider";
import { buildAffiliateUrl } from "@/lib/affiliate";

const Brands = [
  { name: "Dot & Key",         slug: "dot-and-key",         cashback: "5.0%", category: "Beauty",      url: "https://track.vcommission.com/click?campaign_id=12957&pub_id=127049" },
  { name: "MuscleBlaze",       slug: "muscleblaze",         cashback: "5.0%", category: "Health",      url: "https://track.vcommission.com/click?campaign_id=10169&pub_id=127049" },
  { name: "HK Vitals",         slug: "hk-vitals",           cashback: "5.0%", category: "Health",      url: "https://track.vcommission.com/click?campaign_id=10111&pub_id=127049" },
  { name: "Healthkart",        slug: "healthkart",          cashback: "5.0%", category: "Health",      url: "https://track.vcommission.com/click?campaign_id=10109&pub_id=127049" },
  { name: "The Bear House",    slug: "the-bear-house",      cashback: "5.0%", category: "Fashion",     url: "https://track.vcommission.com/click?campaign_id=13030&pub_id=127049" },
  { name: "BeBodywise",        slug: "bebodywise",          cashback: "5.0%", category: "Beauty",      url: "https://track.vcommission.com/click?campaign_id=13044&pub_id=127049" },
  { name: "Manmatters",        slug: "manmatters",          cashback: "5.0%", category: "Health",      url: "https://track.vcommission.com/click?campaign_id=13046&pub_id=127049" },
  { name: "Milton",            slug: "milton",              cashback: "5.0%", category: "Home",        url: "https://track.vcommission.com/click?campaign_id=12749&pub_id=127049" },
  { name: "Snitch",            slug: "snitch",              cashback: "5.0%", category: "Fashion",     url: "https://track.vcommission.com/click?campaign_id=10803&pub_id=127049" },
  { name: "H&M",               slug: "h-and-m",             cashback: "5.0%", category: "Fashion",     url: "https://track.vcommission.com/click?campaign_id=12579&pub_id=127049" },
  { name: "Borosil",           slug: "borosil",             cashback: "5.0%", category: "Home",        url: "https://track.vcommission.com/click?campaign_id=12765&pub_id=127049" },
  { name: "The Natural Wash",  slug: "the-natural-wash",    cashback: "5.0%", category: "Beauty",      url: "https://track.vcommission.com/click?campaign_id=12839&pub_id=127049" },
  { name: "FirstCry",          slug: "firstcry",            cashback: "5.0%", category: "Baby & Kids", url: "https://track.vcommission.com/click?campaign_id=10081&pub_id=127049" },
  { name: "Go Noise",          slug: "go-noise",            cashback: "5.0%", category: "Electronics", url: "https://track.vcommission.com/click?campaign_id=10320&pub_id=127049" },
  { name: "The Man Company",   slug: "the-man-company",     cashback: "5.0%", category: "Beauty",      url: "https://track.vcommission.com/click?campaign_id=10248&pub_id=127049" },
  { name: "Neemans",           slug: "neemans",             cashback: "5.0%", category: "Fashion",     url: "https://track.vcommission.com/click?campaign_id=11043&pub_id=127049" },
  { name: "Forest Essentials", slug: "forest-essentials",   cashback: "5.0%", category: "Beauty",      url: "https://track.vcommission.com/click?campaign_id=11348&pub_id=127049" },
  { name: "Kindlife",          slug: "kindlife",            cashback: "5.0%", category: "Health",      url: "https://track.vcommission.com/click?campaign_id=10129&pub_id=127049" },
  { name: "Nilkamal",          slug: "nilkamal",            cashback: "5.0%", category: "Home",        url: "https://track.vcommission.com/click?campaign_id=11875&pub_id=127049" },
  { name: "Levi's",            slug: "levis",               cashback: "5.0%", category: "Fashion",     url: "https://track.vcommission.com/click?campaign_id=11501&pub_id=127049" },
  { name: "Clove Oral Care",   slug: "clove-oral-care",     cashback: "5.0%", category: "Health",      url: "https://track.vcommission.com/click?campaign_id=12131&pub_id=127049" },
  { name: "Myntra",            slug: "myntra",              cashback: "5.0%", category: "Fashion",     url: "https://track.vcommission.com/click?campaign_id=10882&pub_id=127049" },
];

const CATEGORIES = ["All", "Fashion", "Health", "Beauty", "Home", "Electronics", "Baby & Kids"];

export function BrandTicker() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);
  const { user } = useAuth();
  const router = useRouter();

  const filtered =
    activeCategory === "All"
      ? Brands
      : Brands.filter((b) => b.category === activeCategory);

  const tickerItems = [...filtered, ...filtered];

  const handleBrandClick = async (brand: typeof Brands[0]) => {
    if (!user) {
      // Not logged in → send to auth page
      router.push("/login?redirect=" + encodeURIComponent(window.location.pathname));
      return;
    }
    // Logged in → build tracked URL with sub1=userId, sub2=slug
    const trackedUrl = await buildAffiliateUrl(brand.url, brand.slug, user.id);
    
    window.open(trackedUrl, "_blank", "noopener,noreferrer");
  };

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
          onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
          onMouseLeave={(e) => {
            e.currentTarget.style.animationPlayState = "running";
            setHoveredBrand(null);
          }}
        >
          {tickerItems.map((brand, i) => (
            <button
              key={`${brand.name}-${i}`}
              onClick={() => handleBrandClick(brand)}
              className="relative flex items-center gap-3 rounded-2xl border border-orange-100 bg-orange-50/60 px-5 py-3.5 transition-all hover:border-orange-400 hover:shadow-lg hover:bg-orange-50 hover:-translate-y-1 flex-shrink-0 cursor-pointer"
              onMouseEnter={() => setHoveredBrand(`${brand.name}-${i}`)}
              onMouseLeave={() => setHoveredBrand(null)}
            >
              <BrandLogo name={brand.name} size={40} />
              <div className="text-left">
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
                  {user ? `Click to shop & earn ${brand.cashback} back` : "Sign in to earn cashback"}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                </div>
              )}
            </button>
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
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
