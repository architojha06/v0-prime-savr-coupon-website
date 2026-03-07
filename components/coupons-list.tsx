"use client"

import useSWR, { mutate } from "swr"
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

export function CouponsList() {
  const { data: coupons, error, isLoading, mutate } = useSWR("coupons", fetcher)

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

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {coupons.map((coupon) => (
        <CouponCard key={coupon.id} coupon={coupon} />
      ))}
    </div>
  )
}

export function useCouponsMutate() {
  const { mutate } = useSWR("coupons", fetcher)
  return mutate
}
