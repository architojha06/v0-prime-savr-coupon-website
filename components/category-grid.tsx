"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { buildAffiliateUrl, logAffiliateClick } from "@/lib/affiliate"

type CategoryGridProps = {
  onCategoryClick?: (category: string) => void
}

const brandDomains: Record<string, string> = {
  "Levi's":      "levi.com",
  "Myntra":      "myntra.com",
  "Noise":       "gonoise.com",
  "H&M":         "hm.com",
  "Snitch":      "snitch.co.in",
  "MuscleBlaze": "muscleblaze.com",
  "HK Vitals":   "hkvitals.com",
  "Dot & Key":   "dotandkey.com",
}

const brands = [
  { name: "Levi's",      slug: "levis",        url: "https://track.vcommission.com/click?campaign_id=11501&pub_id=127049" },
  { name: "Myntra",      slug: "myntra",        url: "https://track.vcommission.com/click?campaign_id=10882&pub_id=127049" },
  { name: "Noise",       slug: "go-noise",      url: "https://track.vcommission.com/click?campaign_id=10320&pub_id=127049" },
  { name: "H&M",         slug: "h-and-m",       url: "https://track.vcommission.com/click?campaign_id=12579&pub_id=127049" },
  { name: "Snitch",      slug: "snitch",        url: "https://track.vcommission.com/click?campaign_id=10803&pub_id=127049" },
  { name: "MuscleBlaze", slug: "muscleblaze",   url: "https://track.vcommission.com/click?campaign_id=10169&pub_id=127049" },
  { name: "HK Vitals",   slug: "hk-vitals",     url: "https://track.vcommission.com/click?campaign_id=10111&pub_id=127049" },
  { name: "Dot & Key",   slug: "dot-and-key",   url: "https://track.vcommission.com/click?campaign_id=12957&pub_id=127049" },
]

export function CategoryGrid({ onCategoryClick }: CategoryGridProps) {
  const { user } = useAuth()
  const router = useRouter()

  const handleBrandClick = (brand: typeof brands[0]) => {
    if (!user) {
      router.push("/login?redirect=" + encodeURIComponent(window.location.pathname))
      return
    }
    const trackedUrl = buildAffiliateUrl(brand.url, brand.slug, user.id)
    logAffiliateClick(user.id, brand.slug)
    window.open(trackedUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-4 sm:gap-4">
      {brands.map((brand) => (
        <button
          key={brand.name}
          onClick={() => handleBrandClick(brand)}
          className="group flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-4 transition-all duration-150 hover:-translate-y-1 hover:border-orange-200 hover:shadow-md w-full"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white border border-gray-100 shadow-sm mb-3 overflow-hidden">
            <img
              src={`https://www.google.com/s2/favicons?domain=${brandDomains[brand.name]}&sz=64`}
              alt={brand.name}
              className="h-10 w-10 object-contain"
              onError={(e) => {
                const t = e.target as HTMLImageElement
                t.style.display = "none"
                t.parentElement!.innerHTML = `<span class="text-sm font-bold text-gray-600">${brand.name.slice(0, 2).toUpperCase()}</span>`
              }}
            />
          </div>
          <span className="text-sm font-semibold text-gray-700 transition-colors duration-150 group-hover:text-orange-500 text-center">
            {brand.name}
          </span>
        </button>
      ))}
    </div>
  )
}
