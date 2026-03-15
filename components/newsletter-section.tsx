"use client"

import { useState } from "react"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = () => {
    if (!email || !email.includes("@")) return
    setSubscribed(true)
  }

  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-2xl font-bold tracking-tight text-background sm:text-3xl">
        Never Miss a Deal
      </h2>
      <p className="mt-3 text-background/70">
        Subscribe to our newsletter and get the best deals delivered straight to your inbox.
      </p>

      {subscribed ? (
        <div className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-green-500/20 px-6 py-4">
          <span className="text-lg">🎉</span>
          <p className="font-semibold text-green-400">You're subscribed! We'll be in touch.</p>
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-2">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSubscribe()}
            placeholder="Enter your email"
            className="h-12 flex-1 rounded-lg border-0 bg-background px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleSubscribe}
            className="h-12 rounded-lg bg-primary px-6 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Subscribe
          </button>
        </div>
      )}
    </div>
  )
}