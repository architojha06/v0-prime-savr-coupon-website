'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BrandRedirectModal } from '@/components/BrandRedirectModal'

// Brands with apps that intercept tracking links on mobile.
// All of these get the interstitial modal, not a raw window.open.
const APP_INTERCEPT_BRANDS = new Set(['myntra', 'snitch', 'h-and-m', 'levis'])

interface VisitStoreButtonProps {
  brandSlug: string
  brandName: string
  className?: string
  variant?: 'default' | 'card'
}

export function VisitStoreButton({
  brandSlug,
  brandName,
  className = '',
  variant = 'default',
}: VisitStoreButtonProps) {
  const [state, setState] = useState<'idle' | 'tracking'>('idle')
  const [modalOpen, setModalOpen] = useState(false)
  const router = useRouter()

  async function handleClick() {
    setState('tracking')
    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login?redirect=' + encodeURIComponent(window.location.pathname))
        setState('idle')
        return
      }

      setState('idle')

      // Brands with apps get the interstitial modal warning
      if (APP_INTERCEPT_BRANDS.has(brandSlug)) {
        setModalOpen(true)
        return
      }

      // All other brands — direct tracked redirect
      const { trackAndRedirect } = await import('@/lib/affiliate')
      await trackAndRedirect(brandSlug)

    } catch (err) {
      console.error('VisitStoreButton error:', err)
      setState('idle')
    }
  }

  const isCard = variant === 'card'

  return (
    <>
      <button
        onClick={handleClick}
        disabled={state === 'tracking'}
        className={`
          inline-flex items-center gap-2 font-semibold rounded-lg
          transition-all duration-200 cursor-pointer
          ${isCard ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'}
          bg-orange-500 hover:bg-orange-600 text-white
          disabled:opacity-70 disabled:cursor-not-allowed
          ${className}
        `}
      >
        {state === 'tracking' && (
          <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
        )}
        🏪 Visit Store
      </button>

      <BrandRedirectModal
        isOpen={modalOpen}
        brandSlug={brandSlug}
        brandName={brandName}
        onClose={() => setModalOpen(false)}
      />
    </>
  )
}
