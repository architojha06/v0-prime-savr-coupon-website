import { Header } from "@/components/header"
import { SearchBar } from "@/components/search-bar"
import { CategoryGrid } from "@/components/category-grid"
import { DealCard, type Deal } from "@/components/deal-card"
import { Footer } from "@/components/footer"
import { Sparkles, TrendingUp, Zap } from "lucide-react"

const featuredDeals: Deal[] = [
  {
    id: "1",
    brand: "Domino's Pizza",
    brandInitial: "D",
    discount: "50% OFF",
    description:
      "Get half off on all large pizzas when you order online. Valid for carryout and delivery.",
    code: "PIZZA50",
    expiryDate: "Mar 15, 2026",
    category: "Food",
  },
  {
    id: "2",
    brand: "Nike",
    brandInitial: "N",
    discount: "30% OFF",
    description:
      "Save 30% on select footwear and apparel. Limited time offer on new arrivals.",
    code: "NIKE30SAVE",
    expiryDate: "Mar 20, 2026",
    category: "Fashion",
  },
  {
    id: "3",
    brand: "Amazon",
    brandInitial: "A",
    discount: "20% OFF",
    description:
      "Extra 20% off on electronics and tech gadgets. Prime members only.",
    code: "TECH20NOW",
    expiryDate: "Mar 18, 2026",
    category: "Electronics",
  },
  {
    id: "4",
    brand: "Expedia",
    brandInitial: "E",
    discount: "$100 OFF",
    description:
      "Save $100 on flight + hotel packages. Minimum booking value $500.",
    code: "TRAVEL100",
    expiryDate: "Apr 1, 2026",
    category: "Travel",
  },
  {
    id: "5",
    brand: "CVS Pharmacy",
    brandInitial: "C",
    discount: "40% OFF",
    description:
      "Get 40% off on vitamins and supplements. ExtraCare members exclusive.",
    code: "HEALTHY40",
    expiryDate: "Mar 25, 2026",
    category: "Health",
  },
  {
    id: "6",
    brand: "Coursera",
    brandInitial: "C",
    discount: "25% OFF",
    description:
      "Save 25% on annual subscriptions. Access unlimited courses and certifications.",
    code: "LEARN25",
    expiryDate: "Mar 31, 2026",
    category: "Education",
  },
]

const stats = [
  { label: "Active Coupons", value: "12,500+", icon: Sparkles },
  { label: "Brands", value: "2,800+", icon: TrendingUp },
  { label: "Daily Updates", value: "500+", icon: Zap },
]

export default function Home() {
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
            <div className="mt-12 grid grid-cols-3 gap-4 sm:mt-16">
              {stats.map((stat) => {
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

        {/* Featured Deals */}
        <section>
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  Featured Deals
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Today{"'"}s top coupons and promo codes
                </p>
              </div>
              <a
                href="/deals"
                className="hidden text-sm font-medium text-primary hover:underline sm:block"
              >
                View all deals
              </a>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featuredDeals.map((deal) => (
                <DealCard key={deal.id} deal={deal} />
              ))}
            </div>
            <div className="mt-6 text-center sm:hidden">
              <a
                href="/deals"
                className="text-sm font-medium text-primary hover:underline"
              >
                View all deals
              </a>
            </div>
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
