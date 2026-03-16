"use client"

import { cn } from "@/lib/utils"

const categories = [
  "All", "Food", "Fashion", "Electronics", "Travel", "Health",
  "Education", "Beauty", "Jewellery", "Entertainment", "Books",
  "Sports", "Home & Kitchen", "Baby & Kids", "Automobiles",
]

interface CategoryFilterProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium transition-colors",
            selectedCategory === category
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-foreground hover:bg-secondary/80"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

export { categories }