import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  const { brand_slug, user_id } = await req.json()

  const { data, error } = await supabase
    .from('affiliate_clicks')
    .insert({ user_id: user_id ?? null, brand_slug })
    .select('id')
    .single()

  if (error || !data) {
    return NextResponse.json({ error: error?.message }, { status: 500 })
  }

  return NextResponse.json({ click_id: data.id })
}