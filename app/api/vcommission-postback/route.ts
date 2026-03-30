import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

// MUST use service role key — bypasses RLS for server-side writes
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Cashback rates per brand (70% pass-through of vCommission PO rate)
const CASHBACK_RATES: Record<string, number> = {
  'dotandkey':         0.0784,  // PO 11.2% → you give 7.84%
  'muscleblaze':       0.0196,  // PO 2.8%  → you give 1.96%
  'hkvitals':          0.098,   // PO 14%   → you give 9.8%
  'healthkart':        0.0196,  // PO 2.8%  → you give 1.96%
  'thebearhouse':      0.0833,  // PO 11.9% → you give 8.33%
  'bebodywise':        0.294,   // PO 42%   → you give 29.4%
  'manmatters':        0.196,   // PO 28%   → you give 19.6%
  'milton':            0.0713,  // PO 10.18%→ you give 7.13%
  'snitch':            0.0245,  // PO 3.5%  → you give 2.45%
  'hm':                0.0294,  // PO 4.2%  → you give 2.94%
  'myborosil':         0.0735,  // PO 10.5% → you give 7.35%
  'thenaturalwash':    0.0735,  // PO 10.5% → you give 7.35%
  'firstcry':          0.0,     // Fixed INR payout — handle manually
  'gonoise':           0.0392,  // PO 5.6%  → you give 3.92%
  'themancompany':     0.098,   // PO 14%   → you give 9.8%
  'neemans':           0.06125, // PO 8.75% → you give 6.125%
  'forestessentials':  0.07,    // PO ~10%  → you give 7%
  'kindlife':          0.0245,  // PO 3.5%  → you give 2.45%
  'nilkamalfurniture': 0.0595,  // PO 8.5%  → you give 5.95%
  'levi':              0.0735,  // PO 10.5% → you give 7.35%
  'cloveoralcare':     0.406,   // PO 58%   → you give 40.6%
  'myntra':            0.0245,  // PO 3.5%  → you give 2.45%
}

const DEFAULT_CASHBACK_RATE = 0.05

export async function GET(req: NextRequest) {
  const p = new URL(req.url).searchParams

  // Match EXACTLY what vCommission sends based on your registered postback URL:
  // ?sub1={sub1}&sale_amount={sale_amount}&transaction_id={txn_id}&conversion_status={conversion_status}&click_id={click_id}
  const click_uuid  = p.get('sub1')                // your affiliate_clicks record UUID
  const sale_amount = parseFloat(p.get('sale_amount') ?? '0')
  const txn_id      = p.get('transaction_id')      // vCommission uses {txn_id} token → param name is transaction_id
  const status      = p.get('conversion_status')   // vCommission uses {conversion_status} token
  const vcm_click   = p.get('click_id')            // vCommission's own click ID (for audit)
  const campaign_id = p.get('campaign_id') ?? ''

  console.log('📬 Postback received:', { click_uuid, sale_amount, txn_id, status, vcm_click, campaign_id })

  // --- Validate required params ---
  if (!click_uuid) {
    console.error('❌ No sub1 in postback — click UUID missing')
    return NextResponse.json({ error: 'Missing sub1' }, { status: 400 })
  }
  if (!txn_id) {
    return NextResponse.json({ error: 'Missing transaction_id' }, { status: 400 })
  }

  // --- Look up click record to get user_id and brand_slug ---
  const { data: click, error: clickError } = await supabase
    .from('affiliate_clicks')
    .select('user_id, brand_slug')
    .eq('id', click_uuid)
    .single()

  if (clickError || !click) {
    console.error('❌ Click record not found for UUID:', click_uuid)
    return NextResponse.json({ error: 'Click not found' }, { status: 404 })
  }

  const { user_id, brand_slug } = click

  // --- Update click record with vCommission's click ID for audit ---
  if (vcm_click) {
    await supabase
      .from('affiliate_clicks')
      .update({ vcm_click_id: vcm_click })
      .eq('id', click_uuid)
  }

  if (!user_id) {
    console.warn('⚠️ Anonymous click — no user to credit cashback to')
    return NextResponse.json({ success: true, action: 'skipped_anonymous' })
  }

  // --- Handle rejection ---
  if (status === 'rejected') {
    await supabase
      .from('cashback_wallet')
      .update({ status: 'rejected' })
      .eq('txn_id', txn_id)
    console.log(`🚫 Cashback rejected for txn: ${txn_id}`)
    return NextResponse.json({ success: true, action: 'rejected' })
  }

  // --- Calculate cashback ---
  const rate = CASHBACK_RATES[brand_slug] ?? DEFAULT_CASHBACK_RATE
  const cashback_amount = Math.min(sale_amount * rate, 500) // cap at ₹500

  // --- Upsert into cashback_wallet ---
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
