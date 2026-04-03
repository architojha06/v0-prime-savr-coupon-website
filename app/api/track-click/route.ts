import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  const { brand_slug, user_id } = await req.json()

  // 1. Get affiliate_link from coupons (use brand_name match)
  const { data: coupon, error: couponError } = await supabase
    .from('coupons')
    .select('affiliate_link')
    .eq('brand_name', brand_slug)
    .not('affiliate_link', 'is', null)
    .limit(1)
    .single()

  if (couponError || !coupon?.affiliate_link) {
    return NextResponse.json({ error: 'No affiliate link found for brand' }, { status: 404 })
  }

  // 2. Build vCommission URL with sub1 = user_id
  const vcmUrl = new URL(coupon.affiliate_link)
  if (user_id) vcmUrl.searchParams.set('sub1', user_id)
  
  // Extract campaign_id from the URL for storage
  const campaign_id = vcmUrl.searchParams.get('campaign_id')

  // 3. Ping vCommission to register click, capture vcm_click_id
  let vcm_click_id: string | null = null
  try {
    const vcmRes = await fetch(vcmUrl.toString(), {
      method: 'GET',
      redirect: 'manual',
    })
    const location = vcmRes.headers.get('location') ?? ''
    if (location) {
      const loc = new URL(location.startsWith('http') ? location : `https://x.com${location}`)
      vcm_click_id = loc.searchParams.get('vcm_click_id') 
        ?? loc.searchParams.get('click_id') 
        ?? null
    }
  } catch (e) {
    console.error('vCommission ping failed:', e)
  }

  // 4. Log click to Supabase
  const { data, error } = await supabase
    .from('affiliate_clicks')
    .insert({
      user_id: user_id ?? null,
      brand_slug,
      campaign_id,
      vcm_click_id,
    })
    .select('id')
    .single()

  if (error || !data) {
    return NextResponse.json({ error: error?.message }, { status: 500 })
  }

  // 5. Return redirect_url so frontend sends user through vCommission
  return NextResponse.json({
    click_id: data.id,
    redirect_url: vcmUrl.toString(),
  })
}