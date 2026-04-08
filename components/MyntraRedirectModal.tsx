'use client'

import { useState } from 'react'
import { X, ShoppingBag, AlertCircle } from 'lucide-react'

interface Props {
  isOpen: boolean
  onClose: () => void
  onProceed: () => void
}

export function MyntraRedirectModal({ isOpen, onClose, onProceed }: Props) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center">
            <ShoppingBag className="text-pink-500" size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Opening Myntra</h3>
            <p className="text-sm text-gray-500">via PrimeSavr tracking link</p>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-5 flex gap-2">
          <AlertCircle size={16} className="text-amber-500 mt-0.5 shrink-0" />
          <p className="text-sm text-amber-800">
            You may be redirected to the <strong>Myntra app</strong> if installed.
            Cashback is still tracked — but <strong>save your Order ID</strong> just in case.
          </p>
        </div>

        <div className="space-y-2 mb-5">
          {[
            'Click "Go to Myntra" below',
            'Shop normally on Myntra',
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
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">
            Cancel
          </button>
          <button onClick={onProceed} className="flex-1 py-2.5 px-4 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-sm font-medium">
            Go to Myntra →
          </button>
        </div>
      </div>
    </div>
  )
}

export function useMyntraRedirect(brandSlug: string) {
  const [isOpen, setIsOpen] = useState(false)
  return {
    isOpen,
    openModal: () => setIsOpen(true),
    closeModal: () => setIsOpen(false),
    proceed: () => { setIsOpen(false); window.open(`/go/${brandSlug}`, '_blank') },
  }
}