"use client"

import { useState } from "react"
import { createAuthedClient, createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, Loader2, Send } from "lucide-react"
import { refreshCoupons } from "./coupons-list"
import { useAuth } from "@/components/auth-provider"
import { AuthRequiredDialog } from "@/components/auth-required-dialog"

const categories = ["Food", "Fashion", "Electronics", "Travel", "Health", "Education","Beauty", "Jewellery", "Entertainment", "Books", "Sports",
  "Home & Kitchen", "Baby & Kids", "Automobiles"]

export function SubmitCouponForm({ onSuccess }: { onSuccess?: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [category, setCategory] = useState("")
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const { user } = useAuth()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!user) {
      setShowAuthDialog(true)
      return
    }

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
      user_id: user.id,
    }

    const supabase = createClient()
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession()

    if (sessionError || !sessionData.session?.access_token) {
      setIsSubmitting(false)
      setShowAuthDialog(true)
      return
    }

    const authedSupabase = createAuthedClient(sessionData.session.access_token)
    const { error: insertError } = await authedSupabase
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
    }, 3000)
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

          {isSuccess ? (
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 rounded-xl bg-green-50 py-3 text-sm font-semibold text-green-600">
                <Check className="h-4 w-4" />
                Coupon Submitted! Pending review.
              </div>
              <button
                type="button"
                onClick={() => setIsSuccess(false)}
                className="w-full text-center text-sm text-orange-500 hover:underline"
              >
                + Submit another coupon
              </button>
            </div>
             ) : (
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit Coupon
                </>
              )}
            </Button>
             )}
        </form>
        </CardContent>
      </Card>
    </>
  )
}
