import {
  BookOpen,
  Heart,
  Laptop,
  Plane,
  Shirt,
  UtensilsCrossed,
} from "lucide-react"

const categories = [
  { name: "Food", icon: UtensilsCrossed, bg: "bg-orange-50", text: "text-orange-500", hover: "group-hover:text-orange-600" },
  { name: "Fashion", icon: Shirt, bg: "bg-pink-50", text: "text-pink-500", hover: "group-hover:text-pink-600" },
  { name: "Electronics", icon: Laptop, bg: "bg-blue-50", text: "text-blue-500", hover: "group-hover:text-blue-600" },
  { name: "Travel", icon: Plane, bg: "bg-teal-50", text: "text-teal-500", hover: "group-hover:text-teal-600" },
  { name: "Health", icon: Heart, bg: "bg-green-50", text: "text-green-500", hover: "group-hover:text-green-600" },
  { name: "Education", icon: BookOpen, bg: "bg-purple-50", text: "text-purple-500", hover: "group-hover:text-purple-600" },
]

type CategoryGridProps = {
  onCategoryClick?: (category: string) => void
}

export function CategoryGrid({ onCategoryClick }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6 sm:gap-4">
      {categories.map((category) => {
        const Icon = category.icon
        return (
          <button
            key={category.name}
            onClick={() => onCategoryClick?.(category.name)}
            className="group flex flex-col items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 transition-all duration-150 hover:-translate-y-1 hover:border-orange-200 hover:shadow-md sm:p-5 w-full"
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${category.bg} ${category.text} transition-all duration-150`}>
              <Icon className="h-6 w-6" />
            </div>
            <span className={`text-xs font-600 text-gray-600 transition-colors duration-150 ${category.hover}`}>
              {category.name}
            </span>
          </button>
        )
      })}
    </div>
  )
}