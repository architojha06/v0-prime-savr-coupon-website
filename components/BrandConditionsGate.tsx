'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { ExternalLink, XCircle, Info, ChevronLeft, ChevronRight, Clock, CheckCircle, Smartphone } from 'lucide-react'
import { getBrandLogoUrl } from '@/lib/brandLogos'

// ─── Types ────────────────────────────────────────────────────────────────────

interface CashbackRate {
  label: string
  value: string
}

interface CashbackConditions {
  rates: CashbackRate[]
  exclusions: string[]
  important?: string
  // Optional per-brand overrides — fall back to BRAND_DEFAULTS if absent
  tracks_in_hours?: number       // default 36
  confirms_in_days?: number      // default 75
  payout_in_days?: number        // default 45
  app_tracking?: boolean         // default true
  bonus_text?: string            // e.g. "Upto ₹75 bonus — ends in 6 days"
}

interface Coupon {
  brand_name: string
  brand_slug: string
  affiliate_link: string
  cashback_rate: string | null
  condition: string | null
  cashback_conditions: CashbackConditions | null
  discount_description: string | null
}

interface Props {
  coupon: Coupon
}

// ─── Slide config ─────────────────────────────────────────────────────────────

interface Slide {
  eyebrow: string
  headline: string
  sub: string
  cta: string
  bg: string
  accentColor: string
  badge: string
}

function buildSlides(coupon: Coupon, conditions: CashbackConditions | null): Slide[] {
  const isDealsOnly = coupon.cashback_rate === 'Deals only' || !coupon.cashback_rate
  const slides: Slide[] = []

  // Slide 1 — main cashback offer
  slides.push({
    eyebrow: isDealsOnly ? 'Exclusive deals' : 'Cashback offer',
    headline: isDealsOnly
      ? `Shop ${coupon.brand_name}\nand save big`
      : `Earn ${coupon.cashback_rate} cashback\non ${coupon.brand_name}`,
    sub: coupon.discount_description ?? 'Shop via PrimeSavr — no coupon codes needed',
    cta: 'Shop & earn now →',
    bg: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
    accentColor: '#fff',
    badge: isDealsOnly ? 'Deals' : coupon.cashback_rate ?? '',
  })

  // Slide 2 — bonus offer (only if brand has one)
  if (conditions?.bonus_text) {
    slides.push({
      eyebrow: 'Limited time',
      headline: conditions.bonus_text,
      sub: 'Once per user · Credited to your wallet',
      cta: 'Claim your bonus →',
      bg: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
      accentColor: '#fbbf24',
      badge: 'Bonus',
    })
  }

  // Slide 3 — how it works
  slides.push({
    eyebrow: 'Simple process',
    headline: 'Click → Shop → Submit\nGet paid to your UPI',
    sub: `Tracks in ${conditions?.tracks_in_hours ?? 36} hrs · Paid in ${conditions?.payout_in_days ?? 45} days`,
    cta: 'See all brands →',
    bg: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)',
    accentColor: '#34d399',
    badge: 'UPI',
  })

  // Slide 4 — top cashback category (if rates exist)
  const topRate = conditions?.rates?.find(r => r.value !== '0%' && r.value !== 'No cashback')
  if (topRate && !isDealsOnly) {
    slides.push({
      eyebrow: 'Best rate',
      headline: `${topRate.value} on\n${topRate.label}`,
      sub: 'Highest cashback category — shop smart',
      cta: 'View all rates below →',
      bg: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)',
      accentColor: '#6ee7b7',
      badge: topRate.value,
    })
  }

  return slides
}

// ─── Slideshow ────────────────────────────────────────────────────────────────

function BrandSlideshow({ slides }: { slides: Slide[] }) {
  const [cur, setCur] = useState(0)

  const next = useCallback(() => setCur(c => (c + 1) % slides.length), [slides.length])
  const prev = useCallback(() => setCur(c => (c - 1 + slides.length) % slides.length), [slides.length])

  useEffect(() => {
    if (slides.length <= 1) return
    const t = setInterval(next, 4500)
    return () => clearInterval(t)
  }, [next, slides.length])

  const slide = slides[cur]

  return (
    <div
      className="relative rounded-2xl overflow-hidden h-[200px] md:h-[220px] mb-6 select-none transition-all duration-500"
      style={{ background: slide.bg }}
    >
      {/* Content */}
      <div className="absolute inset-0 flex items-center px-6 py-5 gap-4">
        <div className="flex-1 min-w-0">
          <div
            className="inline-flex items-center text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3"
            style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)' }}
          >
            {slide.eyebrow}
          </div>
          <h2
            className="text-[22px] md:text-[26px] font-bold text-white leading-tight mb-2 whitespace-pre-line"
          >
            {slide.headline}
          </h2>
          <p className="text-[13px] text-white/70 leading-snug">{slide.sub}</p>
        </div>

        {/* Badge circle */}
        <div
          className="shrink-0 w-[90px] h-[90px] rounded-full flex flex-col items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.12)', border: '1.5px solid rgba(255,255,255,0.2)' }}
        >
          <span className="text-[22px] font-extrabold leading-none" style={{ color: slide.accentColor }}>
            {slide.badge}
          </span>
          <span className="text-[10px] mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>cashback</span>
        </div>
      </div>

      {/* Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCur(i)}
              className="h-[5px] rounded-full transition-all duration-300"
              style={{
                width: i === cur ? 18 : 6,
                background: i === cur ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.35)',
              }}
            />
          ))}
        </div>
      )}

      {/* Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.15)' }}
          >
            <ChevronLeft size={14} color="white" />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.15)' }}
          >
            <ChevronRight size={14} color="white" />
          </button>
        </>
      )}
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function BrandConditionsGate({ coupon }: Props) {
  const router = useRouter()
  const [proceeding, setProceeding] = useState(false)

  const isDealsOnly = coupon.cashback_rate === 'Deals only' || !coupon.cashback_rate
  const conditions = coupon.cashback_conditions
  const logoUrl = getBrandLogoUrl(coupon.brand_name)

  const tracksIn = conditions?.tracks_in_hours ?? 36
  const confirmsIn = conditions?.confirms_in_days ?? 75
  const payoutIn = conditions?.payout_in_days ?? 45
  const appTracking = conditions?.app_tracking ?? true

  const slides = buildSlides(coupon, conditions)

  async function handleProceed() {
    setProceeding(true)
    try {
      const { trackAndRedirect } = await import('@/lib/affiliate')
      await trackAndRedirect(coupon.brand_slug)
    } catch {
      // trackAndRedirect handles its own fallback
    } finally {
      setProceeding(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Nav */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ChevronLeft size={16} />
          Back
        </button>
        <span className="text-gray-200">|</span>
        <span className="text-sm font-bold text-gray-900">PrimeSavr</span>
      </div>

      <div className="flex-1 py-6 px-4">
        <div className="w-full max-w-lg mx-auto space-y-4">

          {/* ── Slideshow ── */}
          <BrandSlideshow slides={slides} />

          {/* ── Brand card + CTA ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

            {/* Brand identity row */}
            <div className="flex items-center gap-4 px-5 py-5 border-b border-gray-50">
              <div className="w-14 h-14 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center shrink-0 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logoUrl}
                  alt={coupon.brand_name}
                  className="w-full h-full object-contain p-1"
                  onError={(e) => {
                    const t = e.currentTarget
                    t.style.display = 'none'
                    const parent = t.parentElement
                    if (parent) {
                      parent.innerHTML = `<span class="text-xl font-bold text-orange-400">${coupon.brand_name[0]}</span>`
                    }
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-lg font-bold text-gray-900">{coupon.brand_name}</h1>
                {coupon.discount_description && (
                  <p className="text-sm text-gray-500 truncate">{coupon.discount_description}</p>
                )}
              </div>
              {!isDealsOnly && coupon.cashback_rate && (
                <div className="shrink-0 text-right">
                  <div className="text-[11px] text-gray-400 font-medium">Cashback</div>
                  <div className="text-xl font-extrabold text-orange-500">{coupon.cashback_rate}</div>
                </div>
              )}
            </div>

            {/* Deals-only banner */}
            {isDealsOnly && (
              <div className="px-5 py-3.5 flex items-start gap-3 bg-red-50 border-b border-red-100">
                <XCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">
                  No cashback available for {coupon.brand_name} — you can still browse their deals.
                </p>
              </div>
            )}

            {/* CTA */}
            <div className="px-5 py-4">
              <button
                onClick={handleProceed}
                disabled={proceeding}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold text-[15px] rounded-xl transition-colors"
              >
                {proceeding ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Opening {coupon.brand_name}…
                  </>
                ) : (
                  <>
                    <ExternalLink size={15} />
                    {isDealsOnly ? `Visit ${coupon.brand_name}` : `Shop on ${coupon.brand_name} & Earn`}
                  </>
                )}
              </button>
              <p className="text-center text-xs text-gray-400 mt-2.5">
                Your cashback tracking activates the moment you click
              </p>
            </div>
          </div>

          {/* ── Timelines ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-5">
            <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-4">
              Important timelines
            </p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Clock, num: tracksIn, unit: 'Hours', label: 'Cashback tracks in' },
                { icon: CheckCircle, num: confirmsIn, unit: 'Days', label: 'Cashback confirms in' },
                { icon: ExternalLink, num: payoutIn, unit: 'Days', label: 'Payout to UPI' },
              ].map(({ icon: Icon, num, unit, label }) => (
                <div key={label} className="bg-gray-50 rounded-xl p-3 text-center">
                  <div className="text-[26px] font-extrabold text-orange-500 leading-none">{num}</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">{unit}</div>
                  <div className="text-[11px] text-gray-500 mt-2 leading-tight">{label}</div>
                </div>
              ))}
            </div>
            {appTracking && (
              <div className="mt-3 flex items-center gap-2.5 bg-emerald-50 border border-emerald-100 rounded-xl px-3.5 py-2.5">
                <Smartphone size={14} className="text-emerald-600 shrink-0" />
                <p className="text-[12px] text-emerald-700 font-medium">
                  App orders tracked — cashback works on {coupon.brand_name}&apos;s app too
                </p>
              </div>
            )}
          </div>

          {/* ── Rate breakdown ── */}
          {!isDealsOnly && conditions?.rates && conditions.rates.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 pt-5 pb-1">
                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                  Cashback rates by category
                </p>
                <p className="text-[12px] text-gray-400 mb-3">Rates vary — check before checkout</p>
              </div>
              <div className="divide-y divide-gray-50">
                {conditions.rates.map((rate, i) => {
                  const isZero = rate.value === '0%' || rate.value === 'No cashback'
                  return (
                    <div key={i} className="flex items-center gap-3 px-5 py-3.5">
                      <span
                        className="text-[16px] font-extrabold shrink-0 w-14"
                        style={{ color: isZero ? '#d1d5db' : '#f97316' }}
                      >
                        {rate.value}
                      </span>
                      <span className="text-[13px] text-gray-600 leading-snug flex-1">
                        {rate.label}
                        {i === 0 && !isZero && (
                          <span className="ml-2 inline-flex bg-orange-50 text-orange-500 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                            Best rate
                          </span>
                        )}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── Exclusions ── */}
          {conditions?.exclusions && conditions.exclusions.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-5">
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">
                Not eligible for cashback
              </p>
              <div className="space-y-2.5">
                {conditions.exclusions.map((ex, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <XCircle size={14} className="text-red-400 shrink-0 mt-0.5" />
                    <span className="text-[13px] text-gray-600 leading-snug">{ex}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Important note ── */}
          {conditions?.important && (
            <div className="bg-blue-50 border border-blue-100 rounded-2xl px-5 py-4 flex items-start gap-3">
              <Info size={15} className="text-blue-500 shrink-0 mt-0.5" />
              <p className="text-[13px] text-blue-700 leading-relaxed">{conditions.important}</p>
            </div>
          )}

          {/* ── Bottom CTA + back ── */}
          <div className="space-y-2.5 pt-1 pb-8">
            <button
              onClick={handleProceed}
              disabled={proceeding}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold text-[15px] rounded-xl transition-colors"
            >
              {proceeding ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Opening {coupon.brand_name}…
                </>
              ) : (
                <>
                  <ExternalLink size={15} />
                  {isDealsOnly ? `Visit ${coupon.brand_name}` : `Shop on ${coupon.brand_name} & Earn`}
                </>
              )}
            </button>
            <button
              onClick={() => router.back()}
              className="w-full py-3 border border-gray-200 text-gray-500 hover:bg-gray-50 font-medium text-sm rounded-xl transition-colors"
            >
              ← Go back
            </button>
            <p className="text-center text-xs text-gray-400 leading-relaxed">
              Cashback is credited to your PrimeSavr wallet after {coupon.brand_name} validates your order.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
