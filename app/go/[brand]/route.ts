import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

const BRAND_AFFILIATE_LINKS: Record<string, { url: string; campaign_id: string }> = {
  myntra: {
    url: 'https://track.vcommission.com/click?campaign_id=10882&pub_id=127049&deeplink=https%3A%2F%2Fwww.myntra.com%2F',
    campaign_id: '10882',
  },
}

export async function GET(
  request: NextRequest,
  { params }: { params: { brand: string } }
) {
  const brand = params.brand.toLowerCase()
  const brandConfig = BRAND_AFFILIATE_LINKS[brand]

  if (!brandConfig) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const clickId = crypto.randomUUID()

    await supabase.from('affiliate_clicks').insert({
      id: clickId,
      user_id: user?.id ?? null,
      brand_slug: brand,
      campaign_id: brandConfig.campaign_id,
      clicked_at: new Date().toISOString(),
    })

    const affiliateUrl = new URL(brandConfig.url)
    affiliateUrl.searchParams.set('sub1', clickId)
    if (user?.id) {
      affiliateUrl.searchParams.set('sub2', user.id)
    }

    return NextResponse.redirect(affiliateUrl.toString())
  } catch (error) {
    console.error('[/go] tracking error:', error)
    return NextResponse.redirect(new URL(brandConfig.url))
  }
}