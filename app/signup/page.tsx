'use client'

import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { applyReferralCode } from '@/lib/referral'

// ── Inner component uses useSearchParams safely inside Suspense ──
function SignupForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const refCode = searchParams.get('ref')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()

    const { data, error: signupError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (signupError || !data.user) {
      setError(signupError?.message || 'Signup failed')
      setLoading(false)
      return
    }

    if (refCode) {
      await applyReferralCode(data.user.id, refCode)
    }

    router.push('/wallet')
  }

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Create account</h1>

      {refCode ? (
        <div className="bg-violet-50 border border-violet-200 rounded-xl px-4 py-3 mb-4 flex items-center gap-2">
          <span className="text-xl">🎁</span>
          <div>
            <p className="text-sm font-semibold text-violet-800">You were referred!</p>
            <p className="text-xs text-violet-600">
              Sign up and make your first purchase to get <strong>₹50 cashback</strong>
            </p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-sm mb-4">
          Join PrimeSavr and earn cashback on every order.
        </p>
      )}

      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Min 8 characters"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleSignup}
          disabled={loading || !email || !password}
          className="w-full bg-violet-600 text-white font-bold py-3 rounded-xl text-sm hover:bg-violet-700 transition disabled:opacity-50"
        >
          {loading ? 'Creating account...' : 'Create Account →'}
        </button>
      </div>

      <p className="text-center text-xs text-gray-400 mt-4">
        Already have an account?{' '}
        <a href="/login" className="text-violet-600 font-medium">Log in</a>
      </p>
    </div>
  )
}

// ── Page wraps the form in Suspense — required by Next.js for useSearchParams ──
export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Suspense fallback={
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm p-6 flex items-center justify-center h-64">
          <span className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <SignupForm />
      </Suspense>
    </div>
  )
}
