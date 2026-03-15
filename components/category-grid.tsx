import {
  BookOpen,
  Heart,
  Laptop,
  Plane,
  Shirt,
  UtensilsCrossed,
} from "lucide-react"

const categories = [
  { name: "Food", icon: UtensilsCrossed },
  { name: "Fashion", icon: Shirt },
  { name: "Electronics", icon: Laptop },
  { name: "Travel", icon: Plane },
  { name: "Health", icon: Heart },
  { name: "Education", icon: BookOpen },
]

type CategoryGridProps = {
  onCategoryClick?: (category: string) => void
}

export function CategoryGrid({ onCategoryClick }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6 md:gap-4">
      {categories.map((category) => {
        const Icon = category.icon
        return (
          <button
            key={category.name}
            onClick={() => onCategoryClick?.(category.name)}
            className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md sm:p-6 w-full"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon className="h-6 w-6" />
            </div>
            <div className="text-center">
              <h3 className="font-medium text-foreground">{category.name}</h3>
            </div>
          </button>
        )
      })}
    </div>
  )
}