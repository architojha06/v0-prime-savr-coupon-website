const brands = [
  { name: "Levi's", bg: "bg-red-50", text: "text-red-600", initial: "L" },
  { name: "Myntra", bg: "bg-pink-50", text: "text-pink-600", initial: "M" },
  { name: "Noise", bg: "bg-blue-50", text: "text-blue-600", initial: "N" },
  { name: "H&M", bg: "bg-red-50", text: "text-red-700", initial: "H" },
  { name: "Snitch", bg: "bg-gray-50", text: "text-gray-800", initial: "S" },
  { name: "MuscleBlaze", bg: "bg-orange-50", text: "text-orange-600", initial: "MB" },
  { name: "HK Vitals", bg: "bg-green-50", text: "text-green-600", initial: "HK" },
  { name: "Dot & Key", bg: "bg-purple-50", text: "text-purple-600", initial: "D" },
]

type CategoryGridProps = {
  onCategoryClick?: (category: string) => void
}

export function CategoryGrid({ onCategoryClick }: CategoryGridProps) {
  return (
  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-4 sm:gap-4">
    {brands.map((brand) => (
      <button
        key={brand.name}
        onClick={() => onCategoryClick?.(brand.name)}
        className="group flex-col items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 transition-all duration-150 hover:-translate-y-1 hover:border-orange-200 hover:shadow-md w-full text-left"
      >
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${brand.bg} ${brand.text} font-bold text-sm mb-3`}>
          {brand.initial}
        </div>
        <span className={`text-sm font-semibold text-gray-700 transition-colors duration-150 group-hover:text-orange-500`}>
          {brand.name}
        </span>
      </button>
    ))}
  </div>
)
}