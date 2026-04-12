'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ExternalLink, XCircle, Info } from 'lucide-react'

interface CashbackRate {
  label: string
  value: string
}

interface CashbackConditions {
  rates: CashbackRate[]
  exclusions: string[]
  important?: string
}

interface Coupon {
  brand_name: string
  brand_slug: string
  affiliate_link: string
  cashback_rate: string | null
  condition: string | null
  cashback_conditions: CashbackConditions | null
  discount_description: string | null
}

interface Props {
  coupon: Coupon
}

export function BrandConditionsGate({ coupon }: Props) {
  const router = useRouter()
  const [proceeding, setProceeding] = useState(false)

  const isDealsOnly = coupon.cashback_rate === 'Deals only'
  const conditions = coupon.cashback_conditions

  async function handleProceed() {
    setProceeding(true)
    try {
      const { trackAndRedirect } = await import('@/lib/affiliate')
      await trackAndRedirect(coupon.brand_slug)
    } catch {
      // trackAndRedirect has its own fallback — nothing to do here
    } finally {
      setProceeding(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Top bar — matches site nav style */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <span className="text-gray-200">|</span>
        <span className="text-sm font-bold text-gray-900">PrimeSavr</span>
      </div>

      <div className="flex-1 flex items-start justify-center py-8 px-4">
        <div className="w-full max-w-md space-y-4">

          {/* Header */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-100 px-6 py-5">
              <div className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                ⚡ Before you shop
              </div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">
                Cashback terms for{' '}
                <span className="text-orange-500">{coupon.brand_name}</span>
              </h1>
              {coupon.discount_description && (
                <p className="mt-1 text-sm text-gray-500">{coupon.discount_description}</p>
              )}
            </div>

            {/* Cashback rate pill */}
            {!isDealsOnly && coupon.cashback_rate && (
              <div className="px-6 py-4 flex items-center justify-between border-b border-gray-50">
                <span className="text-sm text-gray-500 font-medium">Cashback rate</span>
                <span className="text-lg font-bold text-green-600">{coupon.cashback_rate}</span>
              </div>
            )}

            {/* Deals-only banner */}
            {isDealsOnly && (
              <div className="px-6 py-4 flex items-start gap-3 bg-red-50 border-b border-red-100">
                <XCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-red-700">No cashback available</p>
                  <p className="text-xs text-red-600 mt-0.5">
                    {coupon.brand_name} doesn&apos;t support cashback through PrimeSavr. You can still browse their deals.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Rate breakdown */}
          {!isDealsOnly && conditions && conditions.rates.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 pt-5 pb-4">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                  Rate breakdown
                </p>
                <div className="divide-y divide-gray-50">
                  {conditions.rates.map((rate, i) => (
                    <div key={i} className="flex items-center justify-between py-2.5">
                      <span className="text-sm text-gray-600 flex-1 pr-4 leading-snug">
                        {rate.label}
                      </span>
                      <span className={`text-sm font-bold shrink-0 ${
                        rate.value === '0%' ? 'text-red-500' : 'text-green-600'
                      }`}>
                        {rate.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Exclusions */}
          {conditions && conditions.exclusions.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-5">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                  Not eligible for cashback
                </p>
                <div className="space-y-2.5">
                  {conditions.exclusions.map((ex, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <XCircle size={15} className="text-red-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600 leading-snug">{ex}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Important note */}
          {conditions?.important && (
            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl px-5 py-4 flex items-start gap-3">
              <Info size={16} className="text-indigo-500 shrink-0 mt-0.5" />
              <p className="text-sm text-indigo-700 leading-relaxed">{conditions.important}</p>
            </div>
          )}

          {/* CTAs */}
          <div className="space-y-2.5 pt-1">
            <button
              onClick={handleProceed}
              disabled={proceeding}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-orange-500 hover:bg-orange-600 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl transition-colors"
            >
              {proceeding ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Opening {coupon.brand_name}…
                </>
              ) : (
                <>
                  <ExternalLink size={15} />
                  {isDealsOnly
                    ? `Visit ${coupon.brand_name}`
                    : `I understand — take me to ${coupon.brand_name}`}
                </>
              )}
            </button>

            <button
              onClick={() => router.back()}
              className="w-full py-3 px-6 border border-gray-200 text-gray-500 hover:bg-gray-50 font-medium text-sm rounded-xl transition-colors"
            >
              ← Go back
            </button>
          </div>

          <p className="text-center text-xs text-gray-400 leading-relaxed pb-6">
            Cashback is credited to your PrimeSavr wallet after the brand validates your order.
          </p>

        </div>
      </div>
    </div>
  )
}
