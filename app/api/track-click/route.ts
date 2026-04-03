import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  const { brand_slug, user_id } = await req.json()

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

  // Insert click record first to get internal UUID
  const { data: clickRecord, error: insertError } = await supabase
    .from('affiliate_clicks')
    .insert({
      user_id: user_id ?? null,
      brand_slug,
      vcm_click_id: null,
    })
    .select('id')
    .single()

  if (insertError || !clickRecord) {
    return NextResponse.json({ error: insertError?.message }, { status: 500 })
  }

  // Set sub1 = internal click UUID so postback can look it up
  const vcmUrl = new URL(coupon.affiliate_link)
  vcmUrl.searchParams.set('sub1', clickRecord.id)
  vcmUrl.searchParams.set('sub2', 'primesavr')

  return NextResponse.json({
    click_id: clickRecord.id,
    redirect_url: vcmUrl.toString(),
  })
}