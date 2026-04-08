import { createClient } from '@/lib/supabase/client'

/**
 * Tracks a brand click and returns the vCommission URL with sub1 set.
 * Always call this before redirecting — never link directly to affiliate_link.
 *
 * @param brandSlug  Canonical slug matching the brand_slug column in coupons table
 * @returns          The tracked vCommission URL to redirect to
 */
export async function trackAndRedirect(brandSlug: string): Promise<void> {
  // Get current user session (client-side)
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  try {
    const res = await fetch('/api/track-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        brand_slug: brandSlug,
        user_id: user?.id ?? null,
      }),
    })

    if (!res.ok) throw new Error(`track-click returned ${res.status}`)

    const data = await res.json()
    if (!data.redirect_url) throw new Error('No redirect_url returned')

    // For app-heavy brands on mobile: show interstitial warning before redirect
    if (data.requires_web_warning && isMobile()) {
      const confirmed = confirm(
        `⚠️ Important for cashback tracking\n\n` +
        `Complete your purchase on the ${data.brand_name} WEBSITE — not their app.\n\n` +
        `If the app opens, close it and use the browser. Purchases made in-app cannot be tracked for cashback.\n\n` +
        `Tap OK to proceed to ${data.brand_name}.`
      )
      if (!confirmed) return
    }

    // Open in new tab — required for affiliate tracking.
    // window.open must be called synchronously after user gesture.
    // This function should be called directly inside an onClick handler.
    window.open(data.redirect_url, '_blank', 'noopener,noreferrer')

  } catch (err) {
    console.error('affiliate tracking failed, falling back:', err)
    // Last resort: open without tracking so user still reaches the brand
    // This should never happen in production if the API is healthy
    window.open(`https://track.vcommission.com/click?pub_id=127049`, '_blank', 'noopener,noreferrer')
  }
}

/**
 * Returns the tracked redirect URL without navigating.
 * Use this if you need the URL for server-side logic or non-click contexts.
 */
export async function buildAffiliateUrl(brandSlug: string): Promise<string> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  try {
    const res = await fetch('/api/track-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        brand_slug: brandSlug,
        user_id: user?.id ?? null,
      }),
    })

    const data = await res.json()
    if (!data.redirect_url) throw new Error('No redirect_url returned')
    return data.redirect_url

  } catch (err) {
    console.error('buildAffiliateUrl failed:', err)
    // Return a safe fallback that at least hits vCommission with your pub_id
    return `https://track.vcommission.com/click?pub_id=127049`
  }
}

function isMobile(): boolean {
  return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent)
}
