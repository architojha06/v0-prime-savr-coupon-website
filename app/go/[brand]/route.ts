import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

const supabase_admin = () => {
  const { createClient: createAdmin } = require('@supabase/supabase-js')
  return createAdmin(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function GET(
  request: NextRequest,
  { params }: { params: { brand: string } }
) {
  const brand = params.brand.toLowerCase()
  const admin = supabase_admin()

  // Look up affiliate link from DB (single source of truth)
  const { data: coupon } = await admin
    .from('coupons')
    .select('affiliate_link, brand_name, campaign_id')
    .eq('brand_slug', brand)
    .not('affiliate_link', 'is', null)
    .eq('status', 'approved')
    .limit(1)
    .maybeSingle()

  if (!coupon?.affiliate_link) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Extract campaign_id from URL if not in DB
    let campaignId = coupon.campaign_id ?? null
    if (!campaignId) {
      try {
        const parsed = new URL(coupon.affiliate_link)
        campaignId = parsed.searchParams.get('campaign_id')
      } catch {}
    }

    // Insert click first to get the DB-generated UUID
    const { data: clickRecord } = await admin
      .from('affiliate_clicks')
      .insert({
        user_id: user?.id ?? null,
        brand_slug: brand,
        campaign_id: campaignId,
        vcm_click_id: null,
      })
      .select('id')
      .single()

    // Build vCommission URL with sub1 = our click UUID
    const affiliateUrl = new URL(coupon.affiliate_link)
    if (clickRecord?.id) {
      affiliateUrl.searchParams.set('sub1', clickRecord.id)
    }

    return NextResponse.redirect(affiliateUrl.toString())
  } catch (error) {
    console.error('[/go] error:', error)
    return NextResponse.redirect(coupon.affiliate_link)
  }
}