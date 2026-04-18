import { createClient } from '@/lib/supabase/client'

export const REFERRAL_BONUS_AMOUNT = 50 // ₹50 for both referrer and referred

/**
 * Get the referral link for the current user
 */
export function getReferralLink(referralCode: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.primesavr.com'
  return `${baseUrl}/signup?ref=${referralCode}`
}

/**
 * Get current user's referral code
 */
export async function getUserReferralCode(): Promise<string | null> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from('profiles')
    .select('referral_code')
    .eq('id', user.id)
    .single()

  return data?.referral_code ?? null
}

/**
 * Get referral stats for current user
 */
export async function getReferralStats(): Promise<{
  totalReferrals: number
  bonusCredited: number
  pendingReferrals: number
}> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { totalReferrals: 0, bonusCredited: 0, pendingReferrals: 0 }

  const { data } = await supabase
    .from('referrals')
    .select('status')
    .eq('referrer_id', user.id)

  const total = data?.length ?? 0
  const credited = data?.filter(r => r.status === 'bonus_credited').length ?? 0
  const pending = data?.filter(r => r.status === 'pending').length ?? 0

  return {
    totalReferrals: total,
    bonusCredited: credited * REFERRAL_BONUS_AMOUNT,
    pendingReferrals: pending,
  }
}

/**
 * Apply referral code during signup — call this right after user is created
 */
export async function applyReferralCode(
  newUserId: string,
  referralCode: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient()

  // Find the referrer
  const { data: referrer, error: referrerError } = await supabase
    .from('profiles')
    .select('id')
    .eq('referral_code', referralCode.toUpperCase())
    .single()

  if (referrerError || !referrer) {
    return { success: false, error: 'Invalid referral code' }
  }

  // Don't allow self-referral
  if (referrer.id === newUserId) {
    return { success: false, error: 'Cannot refer yourself' }
  }

  // Create referral record
  const { error: referralError } = await supabase
    .from('referrals')
    .insert({
      referrer_id: referrer.id,
      referred_id: newUserId,
      status: 'pending',
    })

  if (referralError) {
    // Already referred (unique constraint) — silently ignore
    return { success: false, error: 'Already referred' }
  }

  // Update referred user's profile with who referred them
  await supabase
    .from('profiles')
    .update({ referred_by: referrer.id })
    .eq('id', newUserId)

  return { success: true }
}

/**
 * Credit ₹50 bonus to both referrer and referred user
 * Call this when the referred user completes their FIRST cashback claim
 */
export async function creditReferralBonus(referredUserId: string): Promise<void> {
  const supabase = createClient()

  // Check if there's a pending referral for this user
  const { data: referral } = await supabase
    .from('referrals')
    .select('id, referrer_id, status')
    .eq('referred_id', referredUserId)
    .eq('status', 'pending')
    .single()

  if (!referral) return // No pending referral, nothing to do

  // Credit ₹50 to referrer
  await supabase.from('cashback_wallet').insert({
    user_id: referral.referrer_id,
    brand_slug: 'referral-bonus',
    cashback_amount: REFERRAL_BONUS_AMOUNT,
    status: 'approved',
    txn_id: `REF-REFERRER-${referral.id}`,
    order_amount: 0,
    cashback_rate: 0,
  })

  // Credit ₹50 to referred user
  await supabase.from('cashback_wallet').insert({
    user_id: referredUserId,
    brand_slug: 'referral-bonus',
    cashback_amount: REFERRAL_BONUS_AMOUNT,
    status: 'approved',
    txn_id: `REF-REFERRED-${referral.id}`,
    order_amount: 0,
    cashback_rate: 0,
  })

  // Mark referral as credited
  await supabase
    .from('referrals')
    .update({
      status: 'bonus_credited',
      bonus_credited_at: new Date().toISOString(),
    })
    .eq('id', referral.id)
}
