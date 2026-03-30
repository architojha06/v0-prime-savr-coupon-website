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
    if (!data.click_id) throw new Error('No click_id returned')

    const url = new URL(baseAffiliateUrl)
    url.searchParams.set('sub1', data.click_id)
    url.searchParams.set('sub2', 'primesavr')
    return url.toString()

  } catch (err) {
    console.error('affiliate click log failed:', err)
    return baseAffiliateUrl
  }
}