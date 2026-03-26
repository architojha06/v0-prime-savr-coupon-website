"use client"

import { useState, useRef, useEffect } from "react"
import { Search, X, Tag, ExternalLink } from "lucide-react"
import useSWR from "swr"
import { createClient } from "@/lib/supabase/client"
import type { Coupon } from "./coupon-card"
import { useAuth } from "@/components/auth-provider"
import { AuthRequiredDialog } from "@/components/auth-required-dialog"

const fetcher = async () => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("coupons")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as Coupon[]
}

export function SearchBar() {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { data: coupons } = useSWR("coupons", fetcher)
  const { user } = useAuth()

  const filteredCoupons = coupons?.filter((coupon) => {
    const searchQuery = query.toLowerCase().trim()
    if (!searchQuery) return false
    return (
      coupon.brand_name?.toLowerCase().includes(searchQuery)
    )
  }).slice(0, 6) // Limit to 6 results

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleCopyCode = async (code: string) => {
    if (!user) {
      setShowAuthDialog(true)
      return
    }
    await navigator.clipboard.writeText(code)
  }

  return (
    <div ref={wrapperRef} className="relative w-full">
      <AuthRequiredDialog
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        nextPath={
          typeof window !== "undefined"
            ? `${window.location.pathname}${window.location.search}`
            : "/"
        }
        message="Please login or signup to access this feature"
      />
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by brand, description, or category..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          className="h-14 w-full rounded-xl border border-border bg-background pl-12 pr-12 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:h-16 sm:text-lg"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("")
              setIsOpen(false)
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

{/* Search Results Dropdown - directly below search bar */}
      {isOpen && query.trim() && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-96 overflow-auto rounded-xl border border-border bg-card shadow-lg">
          {filteredCoupons && filteredCoupons.length > 0 ? (
            <ul className="divide-y divide-border">
              {filteredCoupons.map((coupon) => (
                <li
                  key={coupon.id}
                  className="flex items-center justify-between gap-4 p-4 transition-colors hover:bg-secondary/50"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <span className="text-sm font-bold">
                        {coupon.brand_name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-foreground">
                        {coupon.brand_name}
                      </p>
                      <p className="truncate text-sm text-muted-foreground">
                        {coupon.discount_description}
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground">
                      {coupon.category}
                    </span>
                    <button
                      onClick={() => handleCopyCode(coupon.coupon_code)}
                      className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      <Tag className="h-3 w-3" />
                      Copy
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Search className="h-8 w-8 text-muted-foreground/50" />
              <p className="mt-2 font-medium text-foreground">No results found</p>
              <p className="text-sm text-muted-foreground">
                Try searching for a different brand or category
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
