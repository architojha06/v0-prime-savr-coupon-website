"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { SearchBar } from "@/components/search-bar"
import { CategoryGrid } from "@/components/category-grid"
import { CategoryFilter } from "@/components/category-filter"
import { CouponsList } from "@/components/coupons-list"
import { SubmitCouponForm } from "@/components/submit-coupon-form"
import { StatsSection } from "@/components/stats-section"
import { Footer } from "@/components/footer"

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b border-border bg-secondary/30">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Save More on Every Purchase with{" "}
                <span className="text-primary">PrimeSavr</span>
              </h1>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
                Find the best coupons, promo codes, and exclusive deals from
                thousands of your favorite brands.
              </p>
              <div className="mt-8">
                <SearchBar />
              </div>
            </div>

            {/* Stats */}
            <StatsSection />
          </div>
        </section>

        {/* Categories */}
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
            <CategoryGrid />
          </div>
        </section>

        {/* Latest Coupons */}
        <section>
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

        {/* Submit Coupon Form */}
        <section className="border-t border-border bg-secondary/20">
          <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
            <SubmitCouponForm />
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="border-t border-border bg-foreground">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-background sm:text-3xl">
                Never Miss a Deal
              </h2>
              <p className="mt-3 text-background/70">
                Subscribe to our newsletter and get the best deals delivered
                straight to your inbox.
              </p>
              <form className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 flex-1 rounded-lg border-0 bg-background px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="h-12 rounded-lg bg-primary px-6 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}