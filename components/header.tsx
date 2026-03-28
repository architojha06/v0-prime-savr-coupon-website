"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"

export function Header() {
  const router = useRouter()
  const { user, isLoading, signOut } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-15 max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-base font-bold text-white shadow-sm">
            P
          </div>
          <span className="text-lg font-bold text-gray-900">
            Prime<span className="text-orange-500">Savr</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {!isLoading && user ? (
  <div className="flex items-center gap-2">
    <Link
      href="/wallet"
      className="rounded-xl border border-orange-200 px-4 py-2 text-sm font-medium text-orange-600 transition-all hover:bg-orange-50"
    >
      💰 Wallet
    </Link>
    <button
      onClick={async () => { await signOut(); router.refresh() }}
      className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-gray-50 hover:text-gray-900"
    >
      Log out
    </button>
  </div>
) : (
            <>
              <Link
                href="/login"
                className="rounded-xl px-4 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-gray-50 hover:text-gray-900"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-orange-600 active:scale-95"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

      </div>
    </header>
  )
}