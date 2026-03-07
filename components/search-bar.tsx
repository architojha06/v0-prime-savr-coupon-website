"use client"

import { Search } from "lucide-react"
import { useState } from "react"

export function SearchBar() {
  const [query, setQuery] = useState("")

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search for deals, stores, or products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-14 w-full rounded-xl border border-border bg-background pl-12 pr-32 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:h-16 sm:text-lg"
        />
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:px-6 sm:py-2.5 sm:text-base"
        >
          Search
        </button>
      </div>
    </div>
  )
}
