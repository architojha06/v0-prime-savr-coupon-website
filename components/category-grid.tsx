type CategoryGridProps = {
  onCategoryClick?: (category: string) => void
}

const brandDomains: Record<string, string> = {
  "Levi's": "levi.com",
  "Myntra": "myntra.com",
  "Noise": "gonoise.com",
  "H&M": "hm.com",
  "Snitch": "snitch.co.in",
  "MuscleBlaze": "muscleblaze.com",
  "HK Vitals": "hkvitals.com",
  "Dot & Key": "dotandkey.com",
}

const brands = [
  { name: "Levi's", url: "https://www.levi.com/IN/en_IN/" },
  { name: "Myntra", url: "https://www.myntra.com" },
  { name: "Noise", url: "https://www.gonoise.com" },
  { name: "H&M", url: "https://www2.hm.com/en_in" },
  { name: "Snitch", url: "https://www.snitch.co.in" },
  { name: "MuscleBlaze", url: "https://www.muscleblaze.com" },
  { name: "HK Vitals", url: "https://www.hkvitals.com" },
  { name: "Dot & Key", url: "https://www.dotandkey.com" },
]

export function CategoryGrid({ onCategoryClick }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-4 sm:gap-4">
      {brands.map((brand) => (
        <button
          key={brand.name}
          onClick={() => window.open(brand.url, "_blank")}
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