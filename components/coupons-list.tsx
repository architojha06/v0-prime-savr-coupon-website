"use client"

import useSWR, { mutate as globalMutate } from "swr"
import { createClient } from "@/lib/supabase/client"
import { CouponCard, type Coupon } from "./coupon-card"
import { Loader2, AlertCircle, Ticket } from "lucide-react"

const fetcher = async () => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("coupons")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as Coupon[]
}

interface CouponsListProps {
  selectedCategory?: string
}

export function CouponsList({ selectedCategory = "All" }: CouponsListProps) {
  const { data: coupons, error, isLoading, mutate } = useSWR("coupons", fetcher)
  
  console.log("[v0] selectedCategory:", selectedCategory)
  console.log("[v0] coupons:", coupons?.map(c => ({ brand: c.brand_name, category: c.category })))
  
  const filteredCoupons = coupons?.filter((coupon) => {
    if (selectedCategory === "All") return true
    const matches = coupon.category?.toLowerCase() === selectedCategory.toLowerCase()
    console.log("[v0] Comparing:", coupon.category?.toLowerCase(), "===", selectedCategory.toLowerCase(), "->", matches)
    return matches
  })
  
  console.log("[v0] filteredCoupons count:", filteredCoupons?.length)

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

  if (!filteredCoupons || filteredCoupons.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-secondary/30 py-12 text-center">
        <Ticket className="h-10 w-10 text-muted-foreground" />
        <p className="mt-2 font-medium text-foreground">No coupons in {selectedCategory}</p>
        <p className="text-sm text-muted-foreground">Try selecting a different category</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {filteredCoupons.map((coupon) => (
        <CouponCard key={coupon.id} coupon={coupon} />
      ))}
    </div>
  )
}

export function refreshCoupons() {
  return globalMutate("coupons")
}
