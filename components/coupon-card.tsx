"use client"

import { useState } from "react"
import { Check, Clock, Copy, Tag, Info } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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

export function CouponCard({ coupon }: { coupon: Coupon }) {
  const [copied, setCopied] = useState(false)
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const { user } = useAuth()

  const handleCopy = async () => {
    if (!user) {
      setShowAuthDialog(true)
      return
    }
    await navigator.clipboard.writeText(coupon.coupon_code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const brandInitial = coupon.brand_name.charAt(0).toUpperCase()
  
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    } catch {
      return dateString
    }
  }

  return (
    <>
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
      <Card className="group overflow-hidden border-border transition-all hover:border-primary/50 hover:shadow-lg">
        <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          <div className="flex items-center justify-center bg-secondary p-6 sm:w-32">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary text-2xl font-bold text-primary-foreground">
              {brandInitial}
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-foreground">{coupon.brand_name}</h3>
                  <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-sm font-medium text-primary">
                    <Tag className="h-3.5 w-3.5" />
                    {coupon.discount_description}
                  </span>
                </div>
                <span className="shrink-0 rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                  {coupon.category}
                </span>
              </div>
              {coupon.condition && (
                <div className="flex items-start gap-1.5 text-sm text-muted-foreground">
                  <Info className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{coupon.condition}</span>
                </div>
              )}
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Expires {formatDate(coupon.expiry_date)}</span>
              </div>
              <Button
                onClick={handleCopy}
                variant={copied ? "secondary" : "default"}
                size="sm"
                className="min-w-[120px] gap-2"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy Code
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
        </CardContent>
      </Card>
    </>
  )
}
