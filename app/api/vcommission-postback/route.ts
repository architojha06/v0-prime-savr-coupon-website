import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

// Uses service role key — never expose this on the client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: NextRequest) {
  const p = new URL(req.url).searchParams

  const user_id    = p.get('sub1')           // your user's UUID
  const brand_slug = p.get('sub2')           // e.g. "myntra"
  const order_amt  = parseFloat(p.get('sale_amount') || '0')
  const txn_id     = p.get('transaction_id') // vCommission's unique txn ID
  const status = p.get('conversion_status')        // "approved" | "pending" | "rejected"

  // Reject incomplete postbacks
  if (!user_id || !txn_id || !order_amt) {
    return NextResponse.json({ error: 'Missing required params' }, { status: 400 })
  }

  // Reject cancelled/returned orders
  if (status === 'rejected') {
    await supabase
      .from('cashback_wallet')
      .update({ status: 'rejected' })
      .eq('txn_id', txn_id)
    return NextResponse.json({ success: true, action: 'rejected' })
  }

  const cashback_amount = Math.min(order_amt * 0.05, 200) // 5%, max ₹200

  // Upsert prevents duplicate credits if vCommission fires twice
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
