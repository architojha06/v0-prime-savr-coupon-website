import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: NextRequest) {
  const p = new URL(req.url).searchParams

  const click_id   = p.get('sub1')            // our affiliate_clicks record ID
  const order_amt  = parseFloat(p.get('sale_amount') || '0')
  const txn_id     = p.get('transaction_id')
  const status     = p.get('conversion_status')
  const vcm_click_id = p.get('click_id')      // vCommission's own click ID

  if (!click_id || !txn_id || !order_amt) {
    return NextResponse.json({ error: 'Missing required params' }, { status: 400 })
  }

  // 1. Look up the click to find user_id and brand_slug
  const { data: click, error: clickError } = await supabase
    .from('affiliate_clicks')
    .select('user_id, brand_slug')
    .eq('id', click_id)
    .single()

  if (clickError || !click) {
    return NextResponse.json({ error: 'Click not found' }, { status: 404 })
  }

  // 2. Update the click record with vCommission's click ID for reference
  await supabase
    .from('affiliate_clicks')
    .update({ vcm_click_id })
    .eq('id', click_id)

  const { user_id, brand_slug } = click

  // 3. Handle rejection
  if (status === 'rejected') {
    await supabase
      .from('cashback_wallet')
      .update({ status: 'rejected' })
      .eq('txn_id', txn_id)
    return NextResponse.json({ success: true, action: 'rejected' })
  }

  // 4. Credit cashback
  const cashback_amount = Math.min(order_amt * 0.05, 200)

  const { error } = await supabase
    .from('cashback_wallet')
    .upsert(
      {
        user_id,
        brand_slug,
        order_amount: order_amt,
        cashback_amount,
        txn_id,
        status: status === 'approved' ? 'confirmed' : 'pending',
      },
      { onConflict: 'txn_id' }
    )

  if (error) {
    console.error('Supabase error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}