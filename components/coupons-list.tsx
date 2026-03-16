"use client"
import { useState, useEffect } from "react"

import useSWR, { mutate as globalMutate } from "swr"
import { createClient } from "@/lib/supabase/client"
import { CouponCard, type Coupon } from "./coupon-card"
import { Loader2, AlertCircle, Ticket, ChevronLeft, ChevronRight } from "lucide-react"

const COUPONS_PER_PAGE = 6

const fetcher = async () => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("coupons")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false })
  if (error) throw error
  return data as Coupon[]
}

interface CouponsListProps {
  selectedCategory?: string
}

export function CouponsList({ selectedCategory = "All" }: CouponsListProps) {
  const [page, setPage] = useState(1)
  const { data: coupons, error, isLoading } = useSWR("coupons", fetcher)
  
  // Reset to page 1 when category changes
 useEffect(() => {
  setPage(1)
}, [selectedCategory]) 
  const filteredCoupons = coupons?.filter((coupon) =>
    selectedCategory === "All" ||
    coupon.category?.toLowerCase() === selectedCategory.toLowerCase()
  ) ?? []

  const totalPages = Math.ceil(filteredCoupons.length / COUPONS_PER_PAGE)
  const paginated = filteredCoupons.slice(
    (page - 1) * COUPONS_PER_PAGE,
    page * COUPONS_PER_PAGE
  )

  
  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="mt-2">Loading coupons...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-destructive/50 bg-destructive/10 py-12 text-center">
        <AlertCircle className="h-8 w-8 text-destructive" />
        <p className="mt-2 font-medium text-destructive">Failed to load coupons</p>
        <p className="text-sm text-muted-foreground">{error.message}</p>
      </div>
    )
  }

  if (!coupons || coupons.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-secondary/30 py-12 text-center">
        <Ticket className="h-10 w-10 text-muted-foreground" />
        <p className="mt-2 font-medium text-foreground">No coupons yet</p>
        <p className="text-sm text-muted-foreground">Be the first to submit a coupon!</p>
      </div>
    )
  }

  if (filteredCoupons.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-secondary/30 py-12 text-center">
        <Ticket className="h-10 w-10 text-muted-foreground" />
        <p className="mt-2 font-medium text-foreground">No coupons in {selectedCategory}</p>
        <p className="text-sm text-muted-foreground">Try selecting a different category</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {paginated.map((coupon) => (
          <CouponCard key={coupon.id} coupon={coupon} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-600 transition-all hover:border-orange-300 hover:text-orange-500 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => handlePageChange(p)}
              className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-medium transition-all ${
                p === page
                  ? "bg-orange-500 text-white shadow-sm"
                  : "border border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-500"
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-600 transition-all hover:border-orange-300 hover:text-orange-500 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  )
}

export function refreshCoupons() {
  return globalMutate("coupons")
}