import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Logs the click first, then builds the URL with click ID in sub1
export async function buildAffiliateUrl(
  baseAffiliateUrl: string,
  brandSlug: string,
  userId?: string
): Promise<string> {
  try {
    // 1. Log the click and get back the click record ID
    const { data, error } = await supabase
      .from('affiliate_clicks')
      .insert({ user_id: userId ?? null, brand_slug: brandSlug })
      .select('id')
      .single()

    if (error || !data) throw error

    // 2. Build the vCommission URL with our click ID in sub1
    const url = new URL(baseAffiliateUrl)
    url.searchParams.set('sub1', data.id)      // our click ID → comes back in postback
    url.searchParams.set('sub2', 'primesavr')  // source tag
    return url.toString()

  } catch (err) {
  console.error('affiliate click log failed:', err)
  const url = new URL(baseAffiliateUrl)
  url.searchParams.set('sub1', userId ?? 'anonymous')
  url.searchParams.set('sub2', 'primesavr')
  return url.toString()
}
}