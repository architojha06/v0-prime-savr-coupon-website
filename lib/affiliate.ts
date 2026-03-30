import { createBrowserClient } from '@supabase/ssr'

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

/**
 * HOW TRACKING WORKS:
 *
 * vCommission overwrites sub1 with Order ID on the ADVERTISER pixel side.
 * But on the PUBLISHER postback (registered in your vCommission publisher account),
 * vCommission echoes back sub1 exactly as you set it.
 *
 * So the flow is:
 *  1. Insert click record (user_id + brand_slug) → get click UUID
 *  2. Set sub1 = click UUID in the tracking URL
 *  3. User purchases → vCommission postback fires to your endpoint
 *  4. Postback contains sub1 = click UUID → look up user_id → credit cashback
 *
 * Register this in vCommission → Publisher Settings → Global Postback URL:
 * https://primesavr.com/api/vcommission-postback?sub1={sub1}&sale_amount={sale_amount}&transaction_id={transaction_id}&status={status}&campaign_id={campaign_id}
 */
export async function buildAffiliateUrl(
  baseAffiliateUrl: string,
  brandSlug: string,
  userId?: string
): Promise<string> {
  try {
    // 1. Store the click BEFORE redirecting
    const { data, error } = await supabase
      .from('affiliate_clicks')
      .insert({
        user_id: userId ?? null,
        brand_slug: brandSlug,
      })
      .select('id')
      .single()

    if (error || !data) throw error

    // 2. Inject our click UUID into sub1
    const url = new URL(baseAffiliateUrl)
    url.searchParams.set('sub1', data.id)      // echoed back in publisher postback
    url.searchParams.set('sub2', 'primesavr')  // source tag
    return url.toString()

  } catch (err) {
    console.error('affiliate click log failed:', err)
    // Still redirect user even if logging fails
    return baseAffiliateUrl
  }
}
