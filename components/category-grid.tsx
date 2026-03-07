import {
  BookOpen,
  Heart,
  Laptop,
  Plane,
  Shirt,
  UtensilsCrossed,
} from "lucide-react"
import Link from "next/link"

const categories = [
  {
    name: "Food",
    icon: UtensilsCrossed,
    href: "/food",
    deals: 234,
  },
  {
    name: "Fashion",
    icon: Shirt,
    href: "/fashion",
    deals: 567,
  },
  {
    name: "Electronics",
    icon: Laptop,
    href: "/electronics",
    deals: 189,
  },
  {
    name: "Travel",
    icon: Plane,
    href: "/travel",
    deals: 145,
  },
  {
    name: "Health",
    icon: Heart,
    href: "/health",
    deals: 98,
  },
  {
    name: "Education",
    icon: BookOpen,
    href: "/education",
    deals: 76,
  },
]

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6 md:gap-4">
      {categories.map((category) => {
        const Icon = category.icon
        return (
          <Link
            key={category.name}
            href={category.href}
            className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md sm:p-6"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon className="h-6 w-6" />
            </div>
            <div className="text-center">
              <h3 className="font-medium text-foreground">{category.name}</h3>
              <p className="text-sm text-muted-foreground">
                {category.deals} deals
              </p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
