'use client'

import { useState, useEffect } from 'react'
import { X, AlertCircle, ChevronRight } from 'lucide-react'

interface CashbackConditions {
  rates?: { label: string; value: string }[]
  exclusions?: string[]
  important?: string
  no_cashback?: boolean
}

interface Props {
  isOpen: boolean
  brandSlug: string
  brandName: string
  onClose: () => void
}

const BRAND_CONFIG: Record<string, { emoji: string; appWarning: string }> = {
  myntra: {
    emoji: '👗',
    appWarning: 'You may be redirected to the Myntra app if installed. Cashback is still tracked — but save your Order ID just in case.',
  },
  snitch: {
    emoji: '👕',
    appWarning: 'You may be redirected to the Snitch app if installed. To ensure cashback tracks, complete your purchase in the browser — not the app.',
  },
  'h-and-m': {
    emoji: '🛍️',
    appWarning: 'You may be redirected to the H&M app if installed. For cashback to track, complete your purchase in the browser.',
  },
  levis: {
    emoji: '👖',
    appWarning: "You may be redirected to the Levi's app if installed. For cashback to track, complete your purchase in the browser.",
  },
}

const DEFAULT_CONFIG = {
  emoji: '🛒',
  appWarning: 'If the brand app opens, close it and complete your purchase in the browser for cashback to track.',
}

export function BrandRedirectModal({ isOpen, brandSlug, brandName, onClose }: Props) {
  const [step, setStep] = useState<'conditions' | 'proceed'>('conditions')
  const [proceeding, setProceeding] = useState(false)
  const [conditions, setConditions] = useState<CashbackConditions | null>(null)
  const [loadingConditions, setLoadingConditions] = useState(false)

  const config = BRAND_CONFIG[brandSlug] ?? DEFAULT_CONFIG

  useEffect(() => {
    if (!isOpen) return
    setStep('conditions')
    setConditions(null)
    setLoadingConditions(true)

    async function fetchConditions() {
      try {
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()
        const { data } = await supabase
          .from('coupons')
          .select('cashback_conditions')
          .eq('brand_slug', brandSlug)
          .single()

        if (data?.cashback_conditions) {
          setConditions(data.cashback_conditions as CashbackConditions)
        } else {
          // No conditions in DB — skip straight to proceed step
          setStep('proceed')
        }
      } catch {
        setStep('proceed')
      } finally {
        setLoadingConditions(false)
      }
    }

    fetchConditions()
  }, [isOpen, brandSlug])

  if (!isOpen) return null

  async function handleProceed() {
    setProceeding(true)
    try {
      const { trackAndRedirect } = await import('@/lib/affiliate')
      await trackAndRedirect(brandSlug)
    } catch {
      // trackAndRedirect has its own fallback
    } finally {
      setProceeding(false)
      onClose()
    }
  }

  // ── Step 1: Conditions ──────────────────────────────────────────────
  if (step === 'conditions') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 relative max-h-[90vh] overflow-y-auto">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-2xl">
              {config.emoji}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{brandName} Cashback Rules</h3>
              <p className="text-sm text-gray-500">Read before you shop</p>
            </div>
          </div>

          {loadingConditions ? (
            <div className="flex items-center justify-center py-8">
              <span className="w-5 h-5 border-2 border-orange-400 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : conditions ? (
            <div className="space-y-4">

              {conditions.no_cashback && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                  <p className="text-sm font-semibold text-red-700">⚠️ No cashback available for {brandName}</p>
                  <p className="text-xs text-red-600 mt-1">This brand does not support cashback. You can still use their coupons.</p>
                </div>
              )}

              {conditions.rates && conditions.rates.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Cashback Rates</p>
                  <div className="rounded-xl border border-gray-100 overflow-hidden">
                    {conditions.rates.map((row, i) => (
                      <div key={i} className={`flex justify-between px-3 py-2 text-sm ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                        <span className="text-gray-600">{row.label}</span>
                        <span className={`font-semibold ${row.value === '0%' || row.value === 'No cashback' ? 'text-red-500' : 'text-green-600'}`}>
                          {row.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {conditions.exclusions && conditions.exclusions.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Not Eligible for Cashback</p>
                  <ul className="space-y-1">
                    {conditions.exclusions.map((ex, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-red-600">
                        <span className="mt-0.5 shrink-0">✕</span>
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {conditions.important && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex gap-2">
                  <AlertCircle size={15} className="text-blue-500 mt-0.5 shrink-0" />
                  <p className="text-sm text-blue-800">{conditions.important}</p>
                </div>
              )}

            </div>
          ) : null}

          <div className="flex gap-2 mt-5">
            <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">
              Cancel
            </button>
            <button
              onClick={() => setStep('proceed')}
              disabled={loadingConditions}
              className="flex-1 py-2.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white text-sm font-medium flex items-center justify-center gap-1"
            >
              I understand <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Step 2: Proceed (original modal, untouched) ─────────────────────
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-2xl">
            {config.emoji}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Opening {brandName}</h3>
            <p className="text-sm text-gray-500">via PrimeSavr tracking link</p>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-5 flex gap-2">
          <AlertCircle size={16} className="text-amber-500 mt-0.5 shrink-0" />
          <p className="text-sm text-amber-800">{config.appWarning}</p>
        </div>

        <div className="space-y-2 mb-5">
          {[
            `Click "Go to ${brandName}" below`,
            `Shop normally on ${brandName}`,
            'Cashback appears within 48–72 hours',
            "Didn't get it? Submit your Order ID on our site",
          ].map((s, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 text-xs flex items-center justify-center shrink-0 mt-0.5 font-medium">
                {i + 1}
              </span>
              {s}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">
            Cancel
          </button>
          <button
            onClick={handleProceed}
            disabled={proceeding}
            className="flex-1 py-2.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-70 text-white text-sm font-medium"
          >
            {proceeding ? 'Opening...' : `Go to ${brandName} →`}
          </button>
        </div>
      </div>
    </div>
  )
}