"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type WithdrawalStatus = "pending" | "processing" | "paid" | "rejected";

interface WithdrawalRequest {
  id: string;
  user_id: string;
  user_email: string;
  upi_id: string;
  amount: number;
  status: WithdrawalStatus;
  admin_note: string | null;
  created_at: string;
  updated_at: string;
}

const STATUS_COLORS: Record<WithdrawalStatus, { bg: string; text: string; dot: string }> = {
  pending:    { bg: "rgba(234,179,8,0.1)",   text: "#eab308", dot: "#eab308" },
  processing: { bg: "rgba(59,130,246,0.1)",  text: "#60a5fa", dot: "#3b82f6" },
  paid:       { bg: "rgba(34,197,94,0.1)",   text: "#22c55e", dot: "#22c55e" },
  rejected:   { bg: "rgba(239,68,68,0.1)",   text: "#f87171", dot: "#ef4444" },
};

export default function AdminWithdrawalsPage() {
  const [requests, setRequests] = useState<WithdrawalRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<WithdrawalStatus | "all">("pending");
  const [updating, setUpdating] = useState<string | null>(null);
  const [noteInputs, setNoteInputs] = useState<Record<string, string>>({});

  const supabase = createClient();

  const fetchRequests = async () => {
    setLoading(true);
    // Use the admin view which joins user email
    const query = supabase
      .from("admin_withdrawal_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (filter !== "all") query.eq("status", filter);

    const { data, error } = await query;
    if (!error && data) setRequests(data as WithdrawalRequest[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
  }, [filter]);

  const updateStatus = async (id: string, newStatus: WithdrawalStatus) => {
    setUpdating(id);
    const { error } = await supabase
      .from("withdrawal_requests")
      .update({
        status: newStatus,
        admin_note: noteInputs[id] || null,
      })
      .eq("id", id);

    if (!error) {
      setRequests((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, status: newStatus, admin_note: noteInputs[id] || r.admin_note } : r
        )
      );
    }
    setUpdating(null);
  };

  const totalPending = requests.filter((r) => r.status === "pending").reduce((s, r) => s + r.amount, 0);

  return (
    <div className="min-h-screen p-6" style={{ background: "#0a0a0a", color: "#fff" }}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Withdrawal Requests</h1>
            <p className="text-sm mt-1" style={{ color: "#666" }}>
              Manage user cashback payouts
            </p>
          </div>
          {filter === "pending" && requests.length > 0 && (
            <div
              className="rounded-xl px-4 py-2 text-sm"
              style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.2)", color: "#f97316" }}
            >
              ₹{totalPending.toFixed(2)} pending payout
            </div>
          )}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(["all", "pending", "processing", "paid", "rejected"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className="px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all"
              style={{
                background: filter === tab ? "#f97316" : "#1a1a1a",
                color: filter === tab ? "#000" : "#888",
                border: filter === tab ? "none" : "1px solid #2a2a2a",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-20" style={{ color: "#444" }}>
            Loading...
          </div>
        ) : requests.length === 0 ? (
          <div
            className="rounded-2xl p-12 text-center"
            style={{ background: "#111", border: "1px solid #1f1f1f" }}
          >
            <p className="text-2xl mb-2">🎉</p>
            <p style={{ color: "#555" }}>No {filter !== "all" ? filter : ""} requests</p>
          </div>
        ) : (
          <div className="space-y-3">
            {requests.map((req) => {
              const statusStyle = STATUS_COLORS[req.status];
              return (
                <div
                  key={req.id}
                  className="rounded-2xl p-5"
                  style={{ background: "#111", border: "1px solid #1f1f1f" }}
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-white truncate">{req.user_email}</span>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0"
                          style={{ background: statusStyle.bg, color: statusStyle.text }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full inline-block"
                            style={{ background: statusStyle.dot }}
                          />
                          {req.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm flex-wrap" style={{ color: "#666" }}>
                        <span>UPI: <span className="text-white">{req.upi_id}</span></span>
                        <span>•</span>
                        <span>{new Date(req.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                      </div>
                      {req.admin_note && (
                        <p className="text-xs mt-1" style={{ color: "#f97316" }}>
                          Note: {req.admin_note}
                        </p>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xl font-bold" style={{ color: "#22c55e" }}>
                        ₹{req.amount.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Action row — only for pending/processing */}
                  {(req.status === "pending" || req.status === "processing") && (
                    <div className="mt-4 pt-4 flex gap-3 flex-wrap items-center" style={{ borderTop: "1px solid #1f1f1f" }}>
                      <input
                        type="text"
                        placeholder="UTR / note (optional)"
                        value={noteInputs[req.id] || ""}
                        onChange={(e) =>
                          setNoteInputs((prev) => ({ ...prev, [req.id]: e.target.value }))
                        }
                        className="flex-1 min-w-0 rounded-xl px-3 py-2 text-sm text-white outline-none"
                        style={{
                          background: "#1a1a1a",
                          border: "1px solid #2a2a2a",
                          caretColor: "#f97316",
                        }}
                      />
                      <div className="flex gap-2">
                        {req.status === "pending" && (
                          <button
                            onClick={() => updateStatus(req.id, "processing")}
                            disabled={updating === req.id}
                            className="px-3 py-2 rounded-xl text-xs font-medium transition-all disabled:opacity-50"
                            style={{ background: "rgba(59,130,246,0.15)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.2)" }}
                          >
                            Mark Processing
                          </button>
                        )}
                        <button
                          onClick={() => updateStatus(req.id, "paid")}
                          disabled={updating === req.id}
                          className="px-3 py-2 rounded-xl text-xs font-medium transition-all disabled:opacity-50"
                          style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.2)" }}
                        >
                          {updating === req.id ? "..." : "✓ Mark Paid"}
                        </button>
                        <button
                          onClick={() => updateStatus(req.id, "rejected")}
                          disabled={updating === req.id}
                          className="px-3 py-2 rounded-xl text-xs font-medium transition-all disabled:opacity-50"
                          style={{ background: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}
                        >
                          Reject
                        </button>
                      </div>
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
