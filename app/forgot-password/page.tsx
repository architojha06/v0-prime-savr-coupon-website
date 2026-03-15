"use client"

import { useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

export default function ForgotPasswordPage() {
  const supabase = createClient()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async () => {
    setLoading(true)
    setError("")
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        {sent ? (
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
              <span className="text-3xl">📧</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Check your email</h2>
            <p className="mt-2 text-sm text-gray-500">
              We sent a password reset link to <strong>{email}</strong>
            </p>
            <p className="mt-1 text-xs text-gray-400">Didn't get it? Check your spam folder.</p>
            <Link href="/login" className="mt-6 block text-sm font-medium text-orange-500 hover:underline">
              ← Back to login
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-xs font-bold text-white">P</div>
                <span className="text-lg font-bold"><span className="text-black">Prime</span><span className="text-orange-500">Savr</span></span>
              </Link>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Forgot password?</h2>
            <p className="mt-1 text-sm text-gray-500">Enter your email and we'll send you a reset link.</p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSubmit()}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                />
              </div>

              {error && (
                <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">{error}</p>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading || !email}
                className="w-full rounded-lg bg-orange-500 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-50 transition-colors"
              >
                {loading ? "Sending..." : "Send reset link"}
              </button>
            </div>

            <p className="mt-4 text-center text-sm text-gray-500">
              Remember it?{" "}
              <Link href="/login" className="font-medium text-orange-500 hover:underline">Log in</Link>
            </p>
          </>
        )}
      </div>
    </div>
  )
}