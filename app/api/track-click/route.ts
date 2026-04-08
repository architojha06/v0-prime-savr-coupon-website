import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Brands with native apps that intercept tracking links on mobile.
// Users must be warned to stay on mobile web, not switch to the app.
const APP_INTERCEPT_BRANDS = new Set(['myntra', 'snitch', 'h-and-m', 'levis'])

export async function POST(req: NextRequest) {
  const { brand_slug, user_id } = await req.json()

  if (!brand_slug) {
    return NextResponse.json({ error: 'brand_slug is required' }, { status: 400 })
  }

  // Look up by brand_slug column — canonical slugs set in DB migration.
  // Falls back to case-insensitive brand_name match for any un-slugged rows.
  const { data: coupon, error: couponError } = await supabase
    .from('coupons')
    .select('affiliate_link, brand_name, brand_slug')
    .eq('brand_slug', brand_slug)
    .not('affiliate_link', 'is', null)
    .eq('status', 'approved')
    .limit(1)
    .maybeSingle()

  if (couponError || !coupon?.affiliate_link) {
    // Secondary fallback: case-insensitive brand_name match
    const { data: fallback, error: fallbackError } = await supabase
      .from('coupons')
      .select('affiliate_link, brand_name, brand_slug')
      .ilike('brand_name', brand_slug.replace(/-/g, ' '))
      .not('affiliate_link', 'is', null)
      .eq('status', 'approved')
      .limit(1)
      .maybeSingle()

    if (fallbackError || !fallback?.affiliate_link) {
      return NextResponse.json({ error: 'No affiliate link found for brand' }, { status: 404 })
    }

    return buildResponse(fallback.affiliate_link, fallback.brand_name, brand_slug, user_id)
  }

  return buildResponse(coupon.affiliate_link, coupon.brand_name, brand_slug, user_id)
}

async function buildResponse(
  affiliateLink: string,
  brandName: string,
  brandSlug: string,
  userId: string | null
) {
  // Extract campaign_id from the affiliate link URL
  let campaignId: string | null = null
  try {
    const parsed = new URL(affiliateLink)
    campaignId = parsed.searchParams.get('campaign_id')
  } catch {
    // malformed URL — continue without campaign_id
  }

  // Insert click record to get internal UUID
  const { data: clickRecord, error: insertError } = await supabase
    .from('affiliate_clicks')
    .insert({
      user_id: userId ?? null,
      brand_slug: brandSlug,
      campaign_id: campaignId,
      vcm_click_id: null, // filled in by postback
    })
    .select('id')
    .single()

  if (insertError || !clickRecord) {
    console.error('affiliate_clicks insert failed:', insertError?.message)
    // Don't block the redirect — return the raw link so user still gets through
    return NextResponse.json({
      click_id: null,
      redirect_url: affiliateLink,
      brand_name: brandName,
      requires_web_warning: APP_INTERCEPT_BRANDS.has(brandSlug),
    })
  }

  // Append sub1 = internal click UUID so postback can match it back
  const vcmUrl = new URL(affiliateLink)
  vcmUrl.searchParams.set('sub1', clickRecord.id)
  vcmUrl.searchParams.set('sub2', 'primesavr')

  return NextResponse.json({
    click_id: clickRecord.id,
    redirect_url: vcmUrl.toString(),
    brand_name: brandName,
    // Tells the frontend to show an interstitial warning on mobile
    requires_web_warning: APP_INTERCEPT_BRANDS.has(brandSlug),
  })
}
