'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { buildAffiliateUrl, logAffiliateClick } from '@/lib/affiliate'

interface VisitStoreButtonProps {
  brandSlug: string
  affiliateUrl: string         // base vCommission URL without SubIDs
  className?: string
  variant?: 'default' | 'card' // card = smaller, for brand grid
}

export function VisitStoreButton({
  brandSlug,
  affiliateUrl,
  className = '',
  variant = 'default',
}: VisitStoreButtonProps) {
  const [state, setState] = useState<'idle' | 'tracking' | 'done'>('idle')
  const router = useRouter()

  async function handleClick() {
  setState('tracking')
  
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // If not logged in, redirect to login first
    if (!user) {
      router.push('/login?redirect=' + encodeURIComponent(window.location.pathname))
      setState('idle')
      return
    }

    const trackedUrl = buildAffiliateUrl(affiliateUrl, brandSlug, user.id)
    

      // Log click to Supabase (non-blocking)
      if (user?.id) {
        logAffiliateClick(user.id, brandSlug)
      }

      setState('done')

      // Small delay so user sees "Tracking active!" before redirect
      setTimeout(() => {
        window.open(trackedUrl, '_blank', 'noopener,noreferrer')
        setState('idle')
      }, 600)

    } catch (err) {
      console.error('VisitStoreButton error:', err)
      // Fallback — still open the link even if tracking fails
      window.open(affiliateUrl, '_blank', 'noopener,noreferrer')
      setState('idle')
    }
  }

  const isCard = variant === 'card'

  return (
    <button
      onClick={handleClick}
      disabled={state === 'tracking'}
      className={`
        inline-flex items-center gap-2 font-semibold rounded-lg
        transition-all duration-200 cursor-pointer
        ${isCard
          ? 'px-3 py-1.5 text-xs'
          : 'px-4 py-2 text-sm'
        }
        ${state === 'done'
          ? 'bg-green-600 text-white'
          : 'bg-orange-500 hover:bg-orange-600 text-white'
        }
        disabled:opacity-70 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {state === 'tracking' && (
        <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
      )}
      {state === 'done' ? '✓ Cashback Tracked!' : '🏪 Visit Store'}
    </button>
  )
}
