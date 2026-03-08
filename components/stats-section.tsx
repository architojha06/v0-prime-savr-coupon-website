"use client"

import useSWR from "swr"
import { createClient } from "@/lib/supabase/client"
import { Sparkles, TrendingUp, Zap } from "lucide-react"

interface StatsData {
  totalCoupons: number
  uniqueBrands: number
  recentCoupons: number
}

const statsFetcher = async (): Promise<StatsData> => {
  const supabase = createClient()
  
  // Get total coupons count
  const { count: totalCoupons, error: totalError } = await supabase
    .from("coupons")
    .select("*", { count: "exact", head: true })
  
  if (totalError) throw totalError
  
  // Get unique brands count
  const { data: brandsData, error: brandsError } = await supabase
    .from("coupons")
    .select("brand_name")
  
  if (brandsError) throw brandsError
  
  const uniqueBrands = new Set(brandsData?.map(c => c.brand_name)).size
  
  // Get coupons added in the last 24 hours (for "Daily Updates")
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  
  const { count: recentCoupons, error: recentError } = await supabase
    .from("coupons")
    .select("*", { count: "exact", head: true })
    .gte("created_at", yesterday.toISOString())
  
  if (recentError) throw recentError
  
  return {
    totalCoupons: totalCoupons || 0,
    uniqueBrands: uniqueBrands || 0,
    recentCoupons: recentCoupons || 0,
  }
}

export function StatsSection() {
  const { data: stats, isLoading } = useSWR("coupon-stats", statsFetcher)

  const statsDisplay = [
    { 
      label: "Active Coupons", 
      value: isLoading ? "..." : stats?.totalCoupons.toLocaleString() || "0", 
      icon: Sparkles 
    },
    { 
      label: "Brands", 
      value: isLoading ? "..." : stats?.uniqueBrands.toLocaleString() || "0", 
      icon: TrendingUp 
    },
    { 
      label: "New Today", 
      value: isLoading ? "..." : stats?.recentCoupons.toLocaleString() || "0", 
      icon: Zap 
    },
  ]

  return (
    <div className="mt-12 grid grid-cols-3 gap-4 sm:mt-16">
      {statsDisplay.map((stat) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 text-center sm:p-6"
          >
            <Icon className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
            <span className="text-xl font-bold text-foreground sm:text-2xl lg:text-3xl">
              {stat.value}
            </span>
            <span className="text-xs text-muted-foreground sm:text-sm">
              {stat.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
