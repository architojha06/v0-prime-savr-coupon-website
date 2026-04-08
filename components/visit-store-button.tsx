'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MyntraRedirectModal, useMyntraRedirect } from '@/components/MyntraRedirectModal'

interface VisitStoreButtonProps {
  brandSlug: string
  affiliateUrl: string
  className?: string
  variant?: 'default' | 'card'
}

export function VisitStoreButton({
  brandSlug,
  affiliateUrl,
  className = '',
  variant = 'default',
}: VisitStoreButtonProps) {
  const [state, setState] = useState<'idle' | 'tracking'>('idle')
  const router = useRouter()
  const { isOpen, openModal, closeModal, proceed } = useMyntraRedirect(brandSlug)

  async function handleClick() {
    // Check login first
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

      // Myntra uses the /go/ route with modal
      if (brandSlug === 'myntra') {
        openModal()
        return
      }

      // All other brands — direct tracked redirect
      const { buildAffiliateUrl } = await import('@/lib/affiliate')
      const trackedUrl = await buildAffiliateUrl(affiliateUrl, brandSlug, user.id)
      window.open(trackedUrl, '_blank', 'noopener,noreferrer')
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

      {/* Myntra-specific modal */}
      {brandSlug === 'myntra' && (
        <MyntraRedirectModal
          isOpen={isOpen}
          onClose={closeModal}
          onProceed={proceed}
        />
      )}
    </>
  )
}