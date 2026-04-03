export async function buildAffiliateUrl(
  baseAffiliateUrl: string,
  brandSlug: string,
  userId?: string
): Promise<string> {
  try {
    const res = await fetch('/api/track-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ brand_slug: brandSlug, user_id: userId }),
    })

    const data = await res.json()
    if (!data.redirect_url) throw new Error('No redirect_url returned')

    return data.redirect_url

  } catch (err) {
    console.error('affiliate click log failed:', err)
    return baseAffiliateUrl
  }
}