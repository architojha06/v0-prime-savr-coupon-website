type CategoryGridProps = {
  onCategoryClick?: (category: string) => void
}

const brands = [
  { name: "Levi's", logo: "https://logo.clearbit.com/levi.com", url: "https://www.levi.com/IN/en_IN/" },
  { name: "Myntra", logo: "https://logo.clearbit.com/myntra.com", url: "https://www.myntra.com" },
  { name: "Noise", logo: "https://logo.clearbit.com/gonoise.com", url: "https://www.gonoise.com" },
  { name: "H&M", logo: "https://logo.clearbit.com/hm.com", url: "https://www2.hm.com/en_in" },
  { name: "Snitch", logo: "https://logo.clearbit.com/snitch.co.in", url: "https://www.snitch.co.in" },
  { name: "MuscleBlaze", logo: "https://logo.clearbit.com/muscleblaze.com", url: "https://www.muscleblaze.com" },
  { name: "HK Vitals", logo: "https://logo.clearbit.com/hkvitals.com", url: "https://www.hkvitals.com" },
  { name: "Dot & Key", logo: "https://logo.clearbit.com/dotandkey.com", url: "https://www.dotandkey.com" },
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
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 mb-3 overflow-hidden">
            <img
              src={brand.logo}
              alt={brand.name}
              className="h-10 w-10 object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = "none"
                target.parentElement!.innerHTML = `<span class="text-sm font-bold text-gray-600">${brand.name.slice(0, 2).toUpperCase()}</span>`
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