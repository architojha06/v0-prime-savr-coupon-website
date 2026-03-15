"use client"

import { useState, useRef } from "react"
import { Header } from "@/components/header"
import { SearchBar } from "@/components/search-bar"
import { CategoryGrid } from "@/components/category-grid"
import { CategoryFilter } from "@/components/category-filter"
import { CouponsList } from "@/components/coupons-list"
import { SubmitCouponForm } from "@/components/submit-coupon-form"
import { StatsSection } from "@/components/stats-section"
import { Footer } from "@/components/footer"
import { NewsletterSection } from "@/components/newsletter-section"

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const couponsSectionRef = useRef<HTMLDivElement>(null)

const handleCategoryClick = (category: string) => {
  setSelectedCategory(category)
  couponsSectionRef.current?.scrollIntoView({ behavior: "smooth" })
}
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-gray-100 bg-gradient-to-b from-orange-50/60 to-white">
         <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
          {/* Pill badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-sm font-medium text-orange-600">
         <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
         India's fastest growing coupon platform
         </div>

        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
         Save More on Every
         <span className="block text-orange-500">Purchase with PrimeSavr</span>
        </h1>
      <p className="mt-5 text-lg text-gray-500 leading-relaxed">
        Find the best coupons, promo codes, and exclusive deals from
        thousands of your favorite brands.
      </p>
      <div className="mt-8">
        <SearchBar />
      </div>
    </div>
    <StatsSection />
  </div>
</section>

        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Browse by Category
              </h2>
              <p className="mt-2 text-muted-foreground">
                Find deals in your favorite categories
              </p>
            </div>
            <CategoryGrid onCategoryClick={handleCategoryClick} />
          </div>
          </section>
        <section ref={couponsSectionRef}>
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Latest Coupons
              </h2>
              <p className="mt-2 text-muted-foreground">
                Fresh deals added by the community
              </p>
            </div>
            <div className="mb-8">
              <CategoryFilter
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>
            <CouponsList selectedCategory={selectedCategory} />
          </div>
        </section>

        <section className="border-t border-border bg-secondary/20">
          <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
            <SubmitCouponForm />
          </div>
        </section>

        <section className="border-t border-border bg-foreground">
         <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <NewsletterSection />
         </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}