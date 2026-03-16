"use client"

import { useState } from "react"
import { Check, Clock, Copy, Tag, Info } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { AuthRequiredDialog } from "@/components/auth-required-dialog"

export interface Coupon {
  id: string
  brand_name: string
  discount_description: string
  category: string
  coupon_code: string
  expiry_date: string
  condition: string | null
  affiliate_link: string | null
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  Food: { bg: "bg-orange-50", text: "text-orange-600" },
  Fashion: { bg: "bg-pink-50", text: "text-pink-600" },
  Electronics: { bg: "bg-blue-50", text: "text-blue-600" },
  Travel: { bg: "bg-teal-50", text: "text-teal-600" },
  Health: { bg: "bg-green-50", text: "text-green-600" },
  Education: { bg: "bg-purple-50", text: "text-purple-600" },
  Beauty: { bg: "bg-rose-50", text: "text-rose-600" },
  Sports: { bg: "bg-yellow-50", text: "text-yellow-600" },
  default: { bg: "bg-gray-50", text: "text-gray-600" },
}

const brandColors = [
  "bg-orange-500", "bg-pink-500", "bg-blue-500",
  "bg-teal-500", "bg-purple-500", "bg-rose-500",
]

function getBrandColor(name: string) {
  const index = name.charCodeAt(0) % brandColors.length
  return brandColors[index]
}

function getBrandLogoUrl(brandName: string): string {
  const domain = brandName
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9]/g, "")
  return `https://logo.clearbit.com/${domain}.com`
}

export function CouponCard({ coupon }: { coupon: Coupon }) {
  const [copied, setCopied] = useState(false)
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const { user } = useAuth()
  const [logoError, setLogoError] = useState(false)
  const handleCopy = async () => {
    if (!user) { setShowAuthDialog(true); return }
    await navigator.clipboard.writeText(coupon.coupon_code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-IN", {
        month: "short", day: "numeric", year: "numeric",
      })
    } catch { return dateString }
  }

  const colorScheme = categoryColors[coupon.category] ?? categoryColors.default
  const brandColor = getBrandColor(coupon.brand_name)
  const brandInitial = coupon.brand_name.charAt(0).toUpperCase()

  return (
    <>
      <AuthRequiredDialog
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        nextPath={typeof window !== "undefined" ? `${window.location.pathname}${window.location.search}` : "/"}
        message="Please login or signup to access this feature"
      />
      <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-200 hover:shadow-lg">
        {/* Top accent strip */}
        <div className={`h-1 w-full ${brandColor}`} />

        <div className="p-5">
          {/* Header row */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl overflow-hidden ${logoError ? `${brandColor} text-lg font-bold text-white shadow-sm` : "bg-white border border-gray-100 shadow-sm"}`}>
               {!logoError ? (
                <img
                src={getBrandLogoUrl(coupon.brand_name)}
                  alt={coupon.brand_name}
                  className="h-9 w-9 object-contain"
                   onError={() => setLogoError(true)}
                    />
                     ) : (
                    brandInitial
                       )}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 leading-tight">{coupon.brand_name}</h3>
                <span className={`inline-flex items-center gap-1 text-xs font-medium mt-0.5 ${colorScheme.text}`}>
                  <Tag className="h-3 w-3" />
                  {coupon.category}
                </span>
              </div>
            </div>
          </div>

          {/* Discount description */}
          <div className={`mt-3 rounded-xl px-3 py-2 ${colorScheme.bg}`}>
            <p className={`text-sm font-semibold ${colorScheme.text}`}>{coupon.discount_description}</p>
          </div>

          {/* Condition */}
          {coupon.condition && (
            <div className="mt-2.5 flex items-start gap-1.5">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-400" />
              <p className="text-xs text-gray-400 leading-relaxed">{coupon.condition}</p>
            </div>
          )}

          {/* Footer */}
          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Clock className="h-3.5 w-3.5" />
              <span>Expires {formatDate(coupon.expiry_date)}</span>
            </div>

            <button
              onClick={handleCopy}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                copied
                  ? "bg-green-50 text-green-600"
                  : "bg-orange-500 text-white hover:bg-orange-600 active:scale-95"
              }`}
            >
              {copied ? (
                <><Check className="h-4 w-4" />Copied!</>
              ) : (
                <><Copy className="h-4 w-4" />Copy Code</>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}