'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

// ---- Types ----
interface WalletEntry {
  id: string
  brand_slug: string
  order_amount: number
  cashback_amount: number
  txn_id: string
  status: 'pending' | 'confirmed' | 'paid' | 'rejected'
  created_at: string
}

interface WalletSummary {
  pending: number
  confirmed: number
  paid: number
}

// ---- Status badge ----
function StatusBadge({ status }: { status: WalletEntry['status'] }) {
  const styles = {
    pending:   'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    confirmed: 'bg-green-500/10  text-green-400  border-green-500/20',
    paid:      'bg-blue-500/10   text-blue-400   border-blue-500/20',
    rejected:  'bg-red-500/10    text-red-400    border-red-500/20',
  }
  const labels = {
    pending:   'Pending',
    confirmed: 'Confirmed',
    paid:      'Paid',
    rejected:  'Rejected',
  }
  return (
    <span className={`
      text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5
      rounded-full border ${styles[status]}
    `}>
      {labels[status]}
    </span>
  )
}

// ---- Single wallet row ----
function WalletRow({ entry }: { entry: WalletEntry }) {
  const brandName = entry.brand_slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

  const date = new Date(entry.created_at).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric'
  })

  return (
    <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/5 hover:bg-white/[0.02] transition-colors">
      {/* Brand initial */}
      <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 font-bold text-xs flex-shrink-0">
        {brandName.slice(0, 2).toUpperCase()}
      </div>

      {/* Brand + date */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white truncate">{brandName}</p>
        <p className="text-xs text-zinc-500 mt-0.5">
          Order ₹{entry.order_amount.toLocaleString('en-IN')} · {date}
        </p>
      </div>

      {/* Status */}
      <StatusBadge status={entry.status} />

      {/* Cashback */}
      <div className={`text-sm font-bold min-w-[52px] text-right ${
        entry.status === 'rejected' ? 'text-zinc-600 line-through' : 'text-orange-400'
      }`}>
        +₹{entry.cashback_amount.toFixed(0)}
      </div>
    </div>
  )
}

// ---- Summary card ----
function SummaryCard({
  label, amount, color
}: { label: string; amount: number; color: string }) {
  return (
    <div className="flex-1 bg-white/[0.03] border border-white/5 rounded-xl p-3">
      <p className="text-[11px] text-zinc-500 font-semibold uppercase tracking-wider">{label}</p>
      <p className={`text-lg font-bold mt-1 ${color}`}>
        ₹{amount.toFixed(0)}
      </p>
    </div>
  )
}

// ---- Main Wallet Component ----
export function CashbackWallet() {
  const [entries, setEntries] = useState<WalletEntry[]>([])
  const [summary, setSummary] = useState<WalletSummary>({ pending: 0, confirmed: 0, paid: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchWallet() {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('cashback_wallet')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error

        setEntries(data ?? [])

        // Calculate summary
        const s = { pending: 0, confirmed: 0, paid: 0 }
        for (const e of (data ?? [])) {
          if (e.status === 'pending')   s.pending   += e.cashback_amount
          if (e.status === 'confirmed') s.confirmed += e.cashback_amount
          if (e.status === 'paid')      s.paid      += e.cashback_amount
        }
        setSummary(s)
      } catch (err: any) {
        setError(err.message ?? 'Failed to load wallet')
      } finally {
        setLoading(false)
      }
    }

    fetchWallet()
  }, [])

  const total = summary.pending + summary.confirmed + summary.paid

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-400 text-sm">{error}</p>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto space-y-4">

      {/* Total banner */}
      <div className="bg-gradient-to-br from-orange-950/60 to-zinc-900 border border-orange-500/20 rounded-2xl p-5">
        <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">
          Total Cashback Earned
        </p>
        <p className="text-4xl font-black text-orange-400 mt-1">
          ₹{total.toFixed(0)}
        </p>
        <p className="text-xs text-zinc-600 mt-2">
          ⚡ Auto-tracked · No forms needed
        </p>

        {/* Summary row */}
        <div className="flex gap-2 mt-4">
          <SummaryCard label="Pending"   amount={summary.pending}   color="text-yellow-400" />
          <SummaryCard label="Confirmed" amount={summary.confirmed} color="text-green-400"  />
          <SummaryCard label="Paid Out"  amount={summary.paid}      color="text-blue-400"   />
        </div>
      </div>

      {/* How it works notice */}
      <div className="bg-green-950/30 border border-green-500/10 rounded-xl px-4 py-3 flex gap-3">
        <span className="text-base">⚡</span>
        <p className="text-xs text-green-600 leading-relaxed">
          Cashback appears here automatically after your purchase. No order ID needed — just click Visit Store and buy normally.
        </p>
      </div>

      {/* Transaction list */}
      <div className="bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
          <h3 className="text-sm font-semibold text-white">Cashback History</h3>
          <span className="text-xs text-zinc-500">{entries.length} transactions</span>
        </div>

        {entries.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-3xl mb-3">🛒</p>
            <p className="text-sm font-semibold text-zinc-400">No cashback yet</p>
            <p className="text-xs text-zinc-600 mt-1">
              Visit a store through PrimeSavr to start earning
            </p>
          </div>
        ) : (
          entries.map(entry => <WalletRow key={entry.id} entry={entry} />)
        )}

        {/* Missing cashback fallback */}
        <div className="px-4 py-3 border-t border-white/5 flex items-center justify-between">
          <p className="text-xs text-zinc-600">Cashback not showing?</p>
          <a
            href="/contact"
            className="text-xs text-orange-500 hover:text-orange-400 font-medium transition-colors"
          >
            Report missing →
          </a>
        </div>
      </div>

    </div>
  )
}
