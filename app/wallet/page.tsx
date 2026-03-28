import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { CashbackWallet } from '@/components/cashback-wallet'

export const metadata = {
  title: 'My Cashback Wallet | PrimeSavr',
  description: 'Track your cashback earnings from all your purchases.',
}

export default async function WalletPage() {
  // Protect route — redirect to login if not authenticated
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?next=/wallet')
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-lg mx-auto px-4 py-10">

        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-2xl font-black text-white">
            My <span className="text-orange-400">Wallet</span>
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Your cashback is tracked automatically on every purchase.
          </p>
        </div>

        <CashbackWallet />

      </div>
    </main>
  )
}
