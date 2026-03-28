import { createClient } from '@/lib/supabase/client'

// Builds a vCommission affiliate URL with SubIDs injected
// sub1 = user ID (for postback matching)
// sub2 = brand slug (for wallet display)
// sub3 = source tag

export function buildAffiliateUrl(
  baseAffiliateUrl: string,
  brandSlug: string,
  userId?: string
): string {
  try {
    const url = new URL(baseAffiliateUrl)
    url.searchParams.set('sub1', userId ?? 'guest')
    url.searchParams.set('sub2', brandSlug)
    url.searchParams.set('sub3', 'primesavr')
    return url.toString()
  } catch {
    return baseAffiliateUrl // fallback to original if URL is malformed
  }
}

// Call this when user clicks Visit Store to log the click in Supabase
export async function logAffiliateClick(
  userId: string,
  brandSlug: string
): Promise<void> {
  try {
    const supabase = createClient()
    await supabase
      .from('affiliate_clicks')
      .insert({ user_id: userId, brand_slug: brandSlug })
  } catch (err) {
    console.error('Failed to log affiliate click:', err)
    // Non-blocking — don't throw, user should still get redirected
  }
}
