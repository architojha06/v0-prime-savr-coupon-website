import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// User-facing cashback rates (what you pay users, ~70% of what you earn)
// Keys must match brand_slug in affiliate_clicks exactly (with hyphens)
const CASHBACK_RATES: Record<string, number> = {
  'dot-and-key':         0.05,
  'muscleblaze':         0.028,
  'hkvitals':            0.05,
  'healthkart':          0.028,
  'the-bear-house':      0.05,
  'be-bodywise':         0.05,
  'manmatters':          0.05,
  'milton':              0.05,
  'snitch':              0.035,
  'h-and-m':             0.042,
  'myborosil':           0.05,
  'the-natural-wash':    0.05,
  'firstcry':            0.0,
  'gonoise':             0.05,
  'the-man-company':     0.05,
  'neemans':             0.05,
  'forest-essentials':   0.05,
  'kindlife':            0.035,
  'nilkamal':            0.05,
  'levis':               0.05,
  'clove-oral-care':     0.05,
  'myntra':              0.021, // apparel base rate — lowest safe floor
}

const DEFAULT_CASHBACK_RATE = 0.035
const MAX_CASHBACK = 500

export async function GET(req: NextRequest) {
  const p = new URL(req.url).searchParams

  const sub1         = p.get('sub1')
  const vcm_click_id = p.get('click_id')
  const sale_amount  = parseFloat(p.get('sale_amount') ?? '0')
  const txn_id       = p.get('transaction_id') ?? p.get('txn_id')
  const status       = p.get('conversion_status') ?? p.get('status')
  const campaign_id  = p.get('campaign_id') ?? ''

  console.log('📬 Postback received:', { sub1, vcm_click_id, sale_amount, txn_id, status, campaign_id })

  if (!sub1) {
    console.error('❌ No sub1 in postback — postback URL not configured correctly on vCommission')
    return NextResponse.json({ error: 'Missing sub1' }, { status: 400 })
  }

  if (!txn_id) {
    console.error('❌ No txn_id in postback')
    return NextResponse.json({ error: 'Missing transaction_id' }, { status: 400 })
  }

  // Find the click record using sub1 (our internal click UUID)
  const { data: click, error: clickError } = await supabase
    .from('affiliate_clicks')
    .select('user_id, brand_slug')
    .eq('id', sub1)
    .maybeSingle()

  if (clickError || !click) {
    console.error('❌ Click not found for sub1:', sub1)
    return NextResponse.json({ error: 'Click not found' }, { status: 404 })
  }

  const { user_id, brand_slug } = click
  const slug = brand_slug?.toLowerCase() ?? ''

  // Store vCommission's own click ID back on the record
  if (vcm_click_id) {
    await supabase.from('affiliate_clicks').update({ vcm_click_id }).eq('id', sub1)
  }

  if (!user_id) {
    console.warn('⚠️ Anonymous click — no user to credit, skipping wallet update')
    return NextResponse.json({ success: true, action: 'skipped_anonymous' })
  }

  // Handle rejection — mark existing wallet entry as rejected
  if (status === 'rejected') {
    await supabase.from('cashback_wallet').update({ status: 'rejected' }).eq('txn_id', txn_id)
    console.log(`🚫 Cashback rejected for txn: ${txn_id}`)
    return NextResponse.json({ success: true, action: 'rejected' })
  }

  // Calculate cashback using user-facing rate
  const rate = CASHBACK_RATES[slug] ?? DEFAULT_CASHBACK_RATE
  const cashback_amount = Math.min(Math.round(sale_amount * rate * 100) / 100, MAX_CASHBACK)

  // Upsert into wallet — idempotent on txn_id
  const { error: walletError } = await supabase
    .from('cashback_wallet')
    .upsert(
      {
        user_id,
        brand_slug: slug,
        order_amount: sale_amount,
        cashback_amount,
        cashback_rate: rate,
        txn_id,
        order_id: txn_id,
        status: status === 'approved' ? 'confirmed' : 'pending',
      },
      { onConflict: 'txn_id' }
    )

  if (walletError) {
    console.error('❌ Wallet upsert error:', walletError.message)
    return NextResponse.json({ error: walletError.message }, { status: 500 })
  }

  console.log(`✅ Cashback credited: user=${user_id}, brand=${slug}, rate=${rate}, ₹${cashback_amount}, txn=${txn_id}`)
  return NextResponse.json({ success: true })
}