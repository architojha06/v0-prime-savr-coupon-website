"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, Loader2, Send } from "lucide-react"
import { refreshCoupons } from "./coupons-list"

const categories = ["Food", "Fashion", "Electronics", "Travel", "Health", "Education"]

export function SubmitCouponForm({ onSuccess }: { onSuccess?: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [category, setCategory] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    if (!category) {
      setError("Please select a category")
      setIsSubmitting(false)
      return
    }

    const formData = new FormData(e.currentTarget)
    const couponData = {
      brand_name: formData.get("brand_name") as string,
      coupon_code: formData.get("coupon_code") as string,
      discount_description: formData.get("discount_description") as string,
      category: category,
      expiry_date: formData.get("expiry_date") as string,
      affiliate_link: (formData.get("affiliate_link") as string) || null,
      condition: (formData.get("condition") as string) || null,
    }

    const supabase = createClient()
    const { error: insertError } = await supabase
      .from("coupons")
      .insert([couponData])

    setIsSubmitting(false)

    if (insertError) {
      setError(insertError.message)
      return
    }

    setIsSuccess(true)
    e.currentTarget.reset()
    setCategory("")
    refreshCoupons()
    
    setTimeout(() => {
      setIsSuccess(false)
      onSuccess?.()
    }, 2000)
  }

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Send className="h-5 w-5 text-primary" />
          Submit a Coupon
        </CardTitle>
        <CardDescription>
          Share a deal you found with the community
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="brand_name">Brand Name *</Label>
              <Input
                id="brand_name"
                name="brand_name"
                placeholder="e.g., Nike, Amazon"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coupon_code">Coupon Code *</Label>
              <Input
                id="coupon_code"
                name="coupon_code"
                placeholder="e.g., SAVE20"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="discount_description">Discount Description *</Label>
            <Input
              id="discount_description"
              name="discount_description"
              placeholder="e.g., 20% OFF, $10 OFF, Free Shipping"
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category" className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiry_date">Expiry Date *</Label>
              <Input
                id="expiry_date"
                name="expiry_date"
                type="date"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="affiliate_link">Affiliate/Product Link (optional)</Label>
            <Input
              id="affiliate_link"
              name="affiliate_link"
              type="url"
              placeholder="https://..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="condition">Terms & Conditions (optional)</Label>
            <Textarea
              id="condition"
              name="condition"
              placeholder="e.g., Minimum order $50, Valid for new customers only"
              rows={2}
            />
          </div>

          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting || isSuccess}
            className="w-full gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : isSuccess ? (
              <>
                <Check className="h-4 w-4" />
                Coupon Submitted!
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Submit Coupon
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
