'use client'

import { useState } from 'react'
import { X, ShoppingBag, AlertCircle } from 'lucide-react'

interface Props {
  isOpen: boolean
  brandSlug: string
  brandName: string
  onClose: () => void
}

// Brand-specific messaging
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
  const [proceeding, setProceeding] = useState(false)
  const config = BRAND_CONFIG[brandSlug] ?? DEFAULT_CONFIG

  if (!isOpen) return null

  async function handleProceed() {
    setProceeding(true)
    try {
      const { trackAndRedirect } = await import('@/lib/affiliate')
      await trackAndRedirect(brandSlug)
    } catch {
      // trackAndRedirect has its own fallback, nothing to do here
    } finally {
      setProceeding(false)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
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
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 text-xs flex items-center justify-center shrink-0 mt-0.5 font-medium">
                {i + 1}
              </span>
              {step}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50"
          >
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
