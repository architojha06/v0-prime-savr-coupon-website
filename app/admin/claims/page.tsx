"use client";

// app/admin/claims/page.tsx
// Place this file at: src/app/admin/claims/page.tsx

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { creditReferralBonus } from '@/lib/referral'


type Claim = {
  id: string;
  created_at: string;
  brand: string;
  order_id: string;
  order_amount: number;
  cashback: number; // what user requested
  upi_id: string;
  status: string;
  user_id: string | null;
  db_cashback_rate: string | null; // actual rate from coupons table
};

export default function AdminClaimsPage() {
  const supabase = createClient();
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchClaims();
  }, [filter]);

  async function fetchClaims() {
    setLoading(true);

    let query = supabase
      .from("cashback_claims")
      .select(`
        id, created_at, brand, order_id, order_amount, cashback, upi_id, status, user_id
      `)
      .order("created_at", { ascending: false });

    if (filter !== "all") {
      query = query.eq("status", filter);
    }

    const { data: claimsData, error } = await query;

    if (error) {
      console.error("Error fetching claims:", error);
      setLoading(false);
      return;
    }

    // Fetch cashback rates from coupons for each unique brand
    const brands = [...new Set((claimsData || []).map((c) => c.brand))];
    const { data: couponsData } = await supabase
      .from("coupons")
      .select("brand_name, cashback_rate")
      .in("brand_name", brands);

    const rateMap: Record<string, string> = {};
    (couponsData || []).forEach((c) => {
      rateMap[c.brand_name?.toLowerCase()] = c.cashback_rate;
    });

    const enriched = (claimsData || []).map((claim) => ({
      ...claim,
      db_cashback_rate: rateMap[claim.brand?.toLowerCase()] ?? null,
    }));

    setClaims(enriched);
    setLoading(false);
  }

  async function updateStatus(claimId: string, newStatus: "approved" | "rejected", claim: Claim) {
    setActionLoading(claimId);

    const { error } = await supabase
      .from("cashback_claims")
      .update({ status: newStatus })
      .eq("id", claimId);

    if (error) {
      alert("Failed to update status: " + error.message);
      setActionLoading(null);
      return;
    }

    // If approved and user_id exists, credit the wallet
    if (newStatus === "approved" && claim.user_id) {
      const { error: walletError } = await supabase.from("cashback_wallet").upsert(
        {
          user_id: claim.user_id,
          brand_slug: claim.brand?.toLowerCase().replace(/\s+/g, "-"),
          order_amount: claim.order_amount,
          cashback_amount: claim.cashback,
          txn_id: `MANUAL-${claim.id}`,
          status: "confirmed",
          order_id: claim.order_id,
        },
        { onConflict: "txn_id" }
      );

      if (walletError) {
        console.error("Wallet credit error:", walletError.message);
        alert("Claim approved but wallet credit failed: " + walletError.message);
      }
    }

    // If approved but user_id is null, just log it (anonymous claim)
    if (newStatus === "approved" && !claim.user_id) {
      console.warn("Claim approved but user_id is null — cannot auto-credit wallet. Pay manually via UPI.");
    }

    setClaims((prev) =>
      prev.map((c) => (c.id === claimId ? { ...c, status: newStatus } : c))
    );
    setActionLoading(null);
  }

  function validateClaim(claim: Claim): { valid: boolean; warning: string | null } {
    // Basic validation: cashback requested should not exceed what the rate implies
    // db_cashback_rate is like "Up to 5%" — extract the number
    if (!claim.db_cashback_rate || !claim.order_amount) return { valid: true, warning: null };

    const match = claim.db_cashback_rate.match(/(\d+(\.\d+)?)/);
    if (!match) return { valid: true, warning: null };

    const maxRate = parseFloat(match[1]) / 100;
    const maxCashback = claim.order_amount * maxRate;

    if (claim.cashback > maxCashback * 1.1) {
      // allow 10% buffer for rounding
      return {
        valid: false,
        warning: `User claimed ₹${claim.cashback} but max cashback at ${claim.db_cashback_rate} on ₹${claim.order_amount} is ₹${maxCashback.toFixed(0)}`,
      };
    }
    return { valid: true, warning: null };
  }

  const statusColor = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Cashback Claims</h1>
          <p className="text-sm text-gray-500 mt-1">
            Review each claim → cross-check Order ID on vCommission → Approve or Reject
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6">
          {(["pending", "all", "approved", "rejected"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${
                filter === f
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
              }`}
            >
              {f}
            </button>
          ))}
          <button
            onClick={fetchClaims}
            className="ml-auto px-4 py-1.5 rounded-full text-sm font-medium bg-white border border-gray-200 hover:bg-gray-100"
          >
            ↻ Refresh
          </button>
        </div>

        {/* Claims table */}
        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading claims...</div>
        ) : claims.length === 0 ? (
          <div className="text-center py-20 text-gray-400">No {filter} claims found.</div>
        ) : (
          <div className="space-y-4">
            {claims.map((claim) => {
              const { valid, warning } = validateClaim(claim);
              return (
                <div
                  key={claim.id}
                  className={`bg-white rounded-xl border p-5 shadow-sm ${
                    !valid ? "border-red-300" : "border-gray-200"
                  }`}
                >
                  {/* Top row: brand + date + status */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="font-semibold text-gray-900 text-lg">{claim.brand}</span>
                      <span className="ml-3 text-xs text-gray-400">
                        {new Date(claim.created_at).toLocaleString("en-IN")}
                      </span>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        statusColor[claim.status as keyof typeof statusColor] ||
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {claim.status}
                    </span>
                  </div>

                  {/* Warning banner if cashback amount looks inflated */}
                  {!valid && warning && (
                    <div className="mb-3 bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-2 rounded-lg">
                      ⚠️ Suspicious claim — {warning}
                    </div>
                  )}

                  {/* Details grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-gray-400 text-xs mb-0.5">Order ID</p>
                      <p className="font-mono font-medium text-gray-800 break-all">{claim.order_id}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs mb-0.5">Order Amount</p>
                      <p className="font-semibold text-gray-800">₹{claim.order_amount}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs mb-0.5">Cashback Requested</p>
                      <p className={`font-semibold ${!valid ? "text-red-600" : "text-green-700"}`}>
                        ₹{claim.cashback}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs mb-0.5">Actual Rate (DB)</p>
                      <p className="font-medium text-gray-700">{claim.db_cashback_rate ?? "—"}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs mb-0.5">UPI ID</p>
                      <p className="font-mono text-gray-800 break-all">{claim.upi_id}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs mb-0.5">User ID</p>
                      <p className="font-mono text-gray-500 text-xs break-all">
                        {claim.user_id ?? (
                          <span className="text-orange-500">anonymous</span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* vCommission cross-check reminder */}
                  <div className="bg-blue-50 text-blue-700 text-xs px-3 py-2 rounded-lg mb-4">
                    🔍 Cross-check Order ID <span className="font-mono font-semibold">{claim.order_id.trim()}</span> on{" "}
                    <a
                      href="https://www.vcommission.com/publisher/conversions"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline font-medium"
                    >
                      vCommission → Conversions
                    </a>{" "}
                    before approving.
                  </div>

                  {/* Action buttons — only show if still pending */}
                  {claim.status === "pending" && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => updateStatus(claim.id, "approved", claim)}
                        disabled={actionLoading === claim.id}
                        className="flex-1 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-medium disabled:opacity-50 transition-colors"
                      >
                        {actionLoading === claim.id ? "Updating..." : "✓ Approve"}
                      </button>
                      <button
                        onClick={() => updateStatus(claim.id, "rejected", claim)}
                        disabled={actionLoading === claim.id}
                        className="flex-1 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium disabled:opacity-50 transition-colors"
                      >
                        {actionLoading === claim.id ? "Updating..." : "✗ Reject"}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
