import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const CASHBACK_RATES: Record<string, number> = {
  'dotandkey':         0.0784,
  'muscleblaze':       0.0196,
  'hkvitals':          0.098,
  'healthkart':        0.0196,
  'thebearhouse':      0.0833,
  'bebodywise':        0.294,
  'manmatters':        0.196,
  'milton':            0.0713,
  'snitch':            0.0245,
  'hm':                0.0294,
  'myborosil':         0.0735,
  'thenaturalwash':    0.0735,
  'firstcry':          0.0,
  'gonoise':           0.0392,
  'themancompany':     0.098,
  'neemans':           0.06125,
  'forestessentials':  0.07,
  'kindlife':          0.0245,
  'nilkamalfurniture': 0.0595,
  'levi':              0.0735,
  'cloveoralcare':     0.406,
  'myntra':            0.0245,
}

const DEFAULT_CASHBACK_RATE = 0.05

export async function GET(req: NextRequest) {
  const p = new URL(req.url).searchParams

  const sub1          = p.get('sub1')           // your internal click UUID
  const vcm_click_id  = p.get('click_id')       // vCommission's click ID
  const sale_amount   = parseFloat(p.get('sale_amount') ?? '0')
  const txn_id        = p.get('transaction_id')
  const status        = p.get('conversion_status')
  const campaign_id   = p.get('campaign_id') ?? ''

  console.log('📬 Postback received:', { sub1, vcm_click_id, sale_amount, txn_id, status, campaign_id })

  if (!sub1) {
    console.error('❌ No sub1 in postback')
    return NextResponse.json({ error: 'Missing sub1' }, { status: 400 })
  }

  if (!txn_id) {
    return NextResponse.json({ error: 'Missing transaction_id' }, { status: 400 })
  }

  // Look up click by internal UUID (sub1)
  const { data: click, error: clickError } = await supabase
    .from('affiliate_clicks')
    .select('user_id, brand_slug')
    .eq('id', sub1)
    .single()

  if (clickError || !click) {
    console.error('❌ Click record not found for sub1:', sub1)
    return NextResponse.json({ error: 'Click not found' }, { status: 404 })
  }

  const { user_id, brand_slug } = click

  // Optionally store vcm_click_id back on the click record
  if (vcm_click_id) {
    await supabase
      .from('affiliate_clicks')
      .update({ vcm_click_id })
      .eq('id', sub1)
  }

  if (!user_id) {
    console.warn('⚠️ Anonymous click — no user to credit')
    return NextResponse.json({ success: true, action: 'skipped_anonymous' })
  }

  // Handle rejection
  if (status === 'rejected') {
    await supabase
      .from('cashback_wallet')
      .update({ status: 'rejected' })
      .eq('txn_id', txn_id)
    console.log(`🚫 Cashback rejected for txn: ${txn_id}`)
    return NextResponse.json({ success: true, action: 'rejected' })
  }

  // Calculate cashback
  const rate = CASHBACK_RATES[brand_slug?.toLowerCase()] ?? DEFAULT_CASHBACK_RATE
  const cashback_amount = Math.min(sale_amount * rate, 500)

  // Upsert into cashback_wallet
  const { error: walletError } = await supabase
    .from('cashback_wallet')
    .upsert(
      {
        user_id,
        brand_slug,
        order_amount: sale_amount,
        cashback_amount,
        txn_id,
        status: status === 'approved' ? 'confirmed' : 'pending',
      },
      { onConflict: 'txn_id' }
    )

  if (walletError) {
    console.error('❌ Wallet upsert error:', walletError)
    return NextResponse.json({ error: walletError.message }, { status: 500 })
  }

  console.log(`✅ Cashback credited: user=${user_id}, brand=${brand_slug}, ₹${cashback_amount}, txn=${txn_id}`)
  return NextResponse.json({ success: true })
}