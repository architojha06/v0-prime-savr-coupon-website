import { CashbackWallet } from '@/components/cashback-wallet'

export const metadata = {
  title: 'My Cashback Wallet | PrimeSavr',
}

export default function WalletPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-lg mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-white">
            My <span className="text-orange-400">Wallet</span>
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Shop through PrimeSavr, then come back to claim your cashback.
          </p>
        </div>
        <CashbackWallet />
      </div>
    </main>
  )
}
