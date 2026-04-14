"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

const BRAND_SLUG_MAP: Record<string, string> = {
  "Clove Oral Care":    "clove-oral-care",
  "BeBodywise":         "be-bodywise",
  "Manmatters":         "manmatters",
  "Dot & Key":          "dot-and-key",
  "Healthkart":         "healthkart",
  "HK Vitals":          "hkvitals",
  "MuscleBlaze":        "muscleblaze",
  "Snitch":             "snitch",
  "The Bear House":     "the-bear-house",
  "Myntra":             "myntra",
  "The Natural Wash":   "the-natural-wash",
  "Forest Essentials":  "forest-essentials",
  "H&M":                "h-and-m",
  "Neemans":            "neemans",
  "Levi's":             "levis",
  "FirstCry":           "firstcry",
  "Nilkamal":           "nilkamal",
  "Go Noise":           "gonoise",
  "Milton":             "milton",
  "Borosil":            "myborosil",
  "The Man Company":    "the-man-company",
  "Kindlife":           "kindlife",
};

const PARTNER_BRANDS = Object.keys(BRAND_SLUG_MAP);

const FALLBACK_RATES: Record<string, number> = {
  "clove-oral-care":   0.05,
  "be-bodywise":       0.05,
  "manmatters":        0.05,
  "dot-and-key":       0.05,
  "healthkart":        0.028,
  "hkvitals":          0.05,
  "muscleblaze":       0.028,
  "snitch":            0.035,
  "the-bear-house":    0.05,
  "myntra":            0.021,
  "the-natural-wash":  0.05,
  "forest-essentials": 0.05,
  "h-and-m":           0.042,
  "neemans":           0.05,
  "levis":             0.05,
  "firstcry":          0.0,
  "nilkamal":          0.05,
  "gonoise":           0.05,
  "milton":            0.05,
  "myborosil":         0.05,
  "the-man-company":   0.05,
  "kindlife":          0.035,
};

function isValidUPI(upi: string) {
  return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/.test(upi.trim());
}

export function CashbackClaimSection() {
  const [form, setForm] = useState({
    brand: "",
    orderId: "",
    orderAmount: "",
    upiId: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [brandSuggestions, setBrandSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [brandRate, setBrandRate] = useState<number | null>(null);
  const [rateLabel, setRateLabel] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  // ── HOOK 1: auth check — must be before any early return ──
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setIsLoggedIn(!!data.user);
      setAuthChecked(true);
    });
  }, []);

  // ── HOOK 2: fetch cashback rate when brand changes — must be before any early return ──
  useEffect(() => {
    const slug = BRAND_SLUG_MAP[form.brand];
    if (!slug) {
      setBrandRate(null);
      setRateLabel("");
      return;
    }

    const fetchRate = async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from("coupons")
          .select("cashback_conditions, cashback_rate")
          .eq("brand_slug", slug)
          .maybeSingle();

        const rates = data?.cashback_conditions?.rates ?? [];
        if (rates.length > 0) {
          const numericRates = rates
            .map((r: any) => parseFloat(r.value))
            .filter((v: number) => !isNaN(v) && v > 0);

          if (numericRates.length > 0) {
            const minRate = Math.min(...numericRates) / 100;
            const maxRate = Math.max(...numericRates) / 100;
            setBrandRate(minRate);
            if (minRate !== maxRate) {
              setRateLabel(`${(minRate * 100).toFixed(1)}%–${(maxRate * 100).toFixed(1)}%`);
            } else {
              setRateLabel(`${(minRate * 100).toFixed(1)}%`);
            }
            return;
          }
        }
        const fallback = FALLBACK_RATES[slug] ?? 0.035;
        setBrandRate(fallback);
        setRateLabel(`${(fallback * 100).toFixed(1)}%`);
      } catch {
        const fallback = FALLBACK_RATES[slug] ?? 0.035;
        setBrandRate(fallback);
        setRateLabel(`${(fallback * 100).toFixed(1)}%`);
      }
    };

    fetchRate();
  }, [form.brand]);

  // ── Early returns AFTER all hooks ──
  if (!authChecked) return null;
  if (!isLoggedIn) return (
    <section className="bg-gray-900 py-16 px-4 text-center">
      <div className="mx-auto max-w-md">
        <p className="text-white text-xl font-bold mb-2">Login to Claim Cashback</p>
        <p className="text-gray-400 text-sm mb-6">You need to be logged in to submit a cashback claim.</p>
        <a href="/login" className="inline-block rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white hover:bg-orange-400">
          Log In →
        </a>
      </div>
    </section>
  );

  const cashbackAmount =
    form.orderAmount && Number(form.orderAmount) > 0 && brandRate !== null
      ? Math.min(Math.round(Number(form.orderAmount) * brandRate * 100) / 100, 200)
      : 0;

  const isValidForm =
    form.brand.trim() &&
    BRAND_SLUG_MAP[form.brand] &&
    form.orderId.trim() &&
    Number(form.orderAmount) > 0 &&
    isValidUPI(form.upiId);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "brand") {
      const matches = PARTNER_BRANDS.filter((b) =>
        b.toLowerCase().includes(value.toLowerCase())
      );
      setBrandSuggestions(matches.slice(0, 5));
      setShowSuggestions(value.length > 0 && matches.length > 0);
    }
  };

  const handleBlur = (field: string) => {
    setTouched((t) => ({ ...t, [field]: true }));
    if (field === "brand") setTimeout(() => setShowSuggestions(false), 150);
  };

  const handleSubmit = async () => {
    if (!isValidForm) return;
    setLoading(true);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      const { error } = await supabase.from("cashback_claims").insert({
        brand: form.brand,
        order_id: form.orderId,
        order_amount: Number(form.orderAmount),
        cashback: cashbackAmount,
        upi_id: form.upiId,
        status: "pending",
        user_id: user?.id ?? null,
      });
      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      console.error("Submission error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fieldClass = (field: string, extra = "") =>
    `w-full rounded-xl border px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition
     focus:ring-1 focus:ring-orange-500
     ${
       touched[field] && !form[field as keyof typeof form]
         ? "border-red-500/60 bg-red-500/5"
         : "border-white/10 bg-white/5 focus:border-orange-500"
     } ${extra}`;

  return (
    <section id="cashback-claim" className="bg-gray-900 py-16 px-4">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-orange-500/40 bg-orange-500/10 px-4 py-1.5 text-sm font-medium text-orange-400">
          <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
          Cashback Programme
        </div>

        <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          💸 Claim Your <span className="text-orange-500">Cashback</span>
        </h2>
        <p className="mt-3 text-gray-400 leading-relaxed">
          Bought through a PrimeSavr link? Submit your order details and get
          cashback straight to your UPI within 45 days.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {["1. Click our link", "2. Buy normally", "3. Submit below", "4. Get UPI transfer"].map((step) => (
            <span key={step} className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-gray-300">
              {step}
            </span>
          ))}
        </div>

        {submitted ? (
          <div className="mt-10 rounded-2xl border border-orange-500/30 bg-orange-500/10 p-10">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-white mb-2">Claim Submitted!</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              We'll verify your order and transfer{" "}
              <span className="text-orange-400 font-bold">₹{cashbackAmount}</span> cashback to{" "}
              <span className="text-orange-400 font-medium">{form.upiId}</span>{" "}
              within 45 days.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 text-left">
              {[
                { label: "Brand", value: form.brand },
                { label: "Order ID", value: form.orderId },
                { label: "Order Amount", value: `₹${form.orderAmount}` },
                { label: "Cashback", value: `₹${cashbackAmount}` },
              ].map((item) => (
                <div key={item.label} className="rounded-xl bg-white/5 px-4 py-3">
                  <p className="text-xs text-gray-500 mb-0.5">{item.label}</p>
                  <p className="text-sm font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                setForm({ brand: "", orderId: "", orderAmount: "", upiId: "" });
                setTouched({});
                setBrandRate(null);
              }}
              className="mt-6 text-sm text-orange-400 underline underline-offset-2 hover:text-orange-300"
            >
              Submit another claim →
            </button>
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 text-left">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              {/* Brand */}
              <div className="relative sm:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Brand Name *
                </label>
                <input
                  name="brand"
                  value={form.brand}
                  onChange={handleChange}
                  onBlur={() => handleBlur("brand")}
                  placeholder="e.g. Myntra, Healthkart"
                  autoComplete="off"
                  className={fieldClass("brand")}
                />
                {showSuggestions && (
                  <ul className="absolute top-full mt-1 w-full rounded-xl border border-white/10 bg-gray-800 z-20 overflow-hidden shadow-2xl">
                    {brandSuggestions.map((s) => (
                      <li
                        key={s}
                        onMouseDown={() => {
                          setForm({ ...form, brand: s });
                          setShowSuggestions(false);
                        }}
                        className="px-4 py-2.5 text-sm text-gray-200 hover:bg-orange-500/20 cursor-pointer transition"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                )}
                {form.brand && BRAND_SLUG_MAP[form.brand] && rateLabel && (
                  <p className="mt-1.5 text-xs text-orange-400">
                    💰 Cashback rate for {form.brand}: <span className="font-bold">{rateLabel}</span>
                  </p>
                )}
                {touched.brand && !form.brand && (
                  <p className="mt-1 text-xs text-red-400">Please select a brand</p>
                )}
              </div>

              {/* Order ID */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Order ID *
                </label>
                <input
                  name="orderId"
                  value={form.orderId}
                  onChange={handleChange}
                  onBlur={() => handleBlur("orderId")}
                  placeholder="e.g. OD123456789"
                  className={fieldClass("orderId")}
                />
                <p className="mt-1 text-[11px] text-gray-600">
                  📋 Find this in your order confirmation email
                </p>
              </div>

              {/* Amount */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Order Amount (₹) *
                </label>
                <input
                  name="orderAmount"
                  value={form.orderAmount}
                  onChange={handleChange}
                  onBlur={() => handleBlur("orderAmount")}
                  type="number"
                  min="1"
                  placeholder="e.g. 1500"
                  className={fieldClass("orderAmount")}
                />
              </div>

              {/* UPI */}
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Your UPI ID *
                </label>
                <input
                  name="upiId"
                  value={form.upiId}
                  onChange={handleChange}
                  onBlur={() => handleBlur("upiId")}
                  placeholder="e.g. name@okaxis"
                  className={fieldClass("upiId")}
                />
                {touched.upiId && form.upiId && !isValidUPI(form.upiId) && (
                  <p className="mt-1 text-xs text-red-400">Enter a valid UPI ID (e.g. name@okaxis)</p>
                )}
                <p className="mt-1 text-[11px] text-gray-600">
                  🔒 Your UPI ID is only used to transfer cashback — never shared
                </p>
              </div>
            </div>

            {/* Live cashback calculator */}
            {cashbackAmount > 0 && brandRate !== null && (
              <div className="mt-5 rounded-xl border border-orange-500/20 bg-orange-500/5 px-5 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Your cashback estimate</p>
                    <p className="text-[11px] text-gray-600">
                      {(brandRate * 100).toFixed(1)}% of ₹{form.orderAmount}
                      {cashbackAmount >= 200 ? " (capped at ₹200)" : ""}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-orange-400">₹{cashbackAmount}</span>
                    <p className="text-[11px] text-gray-600">to your UPI</p>
                  </div>
                </div>
                <div className="mt-3 h-1.5 w-full rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-orange-500 transition-all duration-300"
                    style={{ width: `${Math.min((cashbackAmount / 200) * 100, 100)}%` }}
                  />
                </div>
                <p className="mt-1 text-right text-[10px] text-gray-600">
                  {cashbackAmount >= 200 ? "🎯 Max cashback reached!" : `₹${200 - cashbackAmount} away from max`}
                </p>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading || !isValidForm}
              className="mt-5 w-full rounded-xl bg-orange-500 py-3.5 text-sm font-bold text-white transition hover:bg-orange-400 active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Submitting…
                </span>
              ) : (
                "Submit Cashback Claim →"
              )}
            </button>

            <p className="mt-3 text-center text-xs text-gray-600">
              ⏱ Processed within 45 days · Max ₹200/order · Cancelled or returned orders not eligible
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
