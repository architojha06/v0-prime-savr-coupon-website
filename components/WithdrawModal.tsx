"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  confirmedBalance: number;
  userId: string;
  onSuccess?: () => void;
}

const MIN_WITHDRAWAL = 50; // ₹50 minimum

export default function WithdrawModal({
  isOpen,
  onClose,
  confirmedBalance,
  userId,
  onSuccess,
}: WithdrawModalProps) {
  const [upiId, setUpiId] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const supabase = createClient();

  const validateUPI = (upi: string) => {
    // Basic UPI format: something@something
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/.test(upi);
  };

  const handleSubmit = async () => {
    setError("");

    if (!validateUPI(upiId)) {
      setError("Enter a valid UPI ID (e.g. name@upi, phone@paytm)");
      return;
    }

    const withdrawAmount = parseFloat(amount);
    if (isNaN(withdrawAmount) || withdrawAmount < MIN_WITHDRAWAL) {
      setError(`Minimum withdrawal is ₹${MIN_WITHDRAWAL}`);
      return;
    }

    if (withdrawAmount > confirmedBalance) {
      setError("Amount exceeds your confirmed balance");
      return;
    }

    setLoading(true);

    try {
      const { error: insertError } = await supabase
        .from("withdrawal_requests")
        .insert({
          user_id: userId,
          upi_id: upiId.trim(),
          amount: withdrawAmount,
          status: "pending",
        });

      if (insertError) throw insertError;

      setSuccess(true);
      onSuccess?.();
    } catch (err: any) {
      setError(err.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setUpiId("");
    setAmount("");
    setError("");
    setSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
    >
      <div
        className="w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl p-6"
        style={{
          background: "linear-gradient(145deg, #1a1a1a, #111)",
          border: "1px solid #2a2a2a",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-white text-lg font-bold">Withdraw Cashback</h2>
            <p className="text-xs mt-0.5" style={{ color: "#888" }}>
              Sent to your UPI within 2–3 business days
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-white transition-colors text-xl leading-none"
          >
            ✕
          </button>
        </div>

        {success ? (
          /* Success state */
          <div className="text-center py-6">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: "rgba(34,197,94,0.15)" }}
            >
              <span className="text-3xl">✓</span>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Request Submitted!</h3>
            <p className="text-sm mb-6" style={{ color: "#888" }}>
              Your withdrawal of{" "}
              <span style={{ color: "#f97316" }}>₹{parseFloat(amount).toFixed(2)}</span> to{" "}
              <span className="text-white">{upiId}</span> is being processed.
              <br />
              You'll receive it within 2–3 business days.
            </p>
            <button
              onClick={handleClose}
              className="w-full py-3 rounded-xl font-semibold text-sm transition-all"
              style={{ background: "#f97316", color: "#000" }}
            >
              Done
            </button>
          </div>
        ) : (
          <>
            {/* Balance chip */}
            <div
              className="flex items-center justify-between rounded-xl px-4 py-3 mb-5"
              style={{ background: "#1f1f1f", border: "1px solid #2a2a2a" }}
            >
              <span className="text-sm" style={{ color: "#888" }}>
                Available to withdraw
              </span>
              <span className="font-bold" style={{ color: "#22c55e" }}>
                ₹{confirmedBalance.toFixed(2)}
              </span>
            </div>

            {/* UPI ID field */}
            <div className="mb-4">
              <label className="block text-xs font-medium mb-2" style={{ color: "#aaa" }}>
                UPI ID
              </label>
              <input
                type="text"
                placeholder="yourname@upi / 9876543210@paytm"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none transition-all"
                style={{
                  background: "#1f1f1f",
                  border: "1px solid #333",
                  caretColor: "#f97316",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#f97316")}
                onBlur={(e) => (e.target.style.borderColor = "#333")}
              />
            </div>

            {/* Amount field */}
            <div className="mb-5">
              <label className="block text-xs font-medium mb-2" style={{ color: "#aaa" }}>
                Amount (min ₹{MIN_WITHDRAWAL})
              </label>
              <div className="relative">
                <span
                  className="absolute left-4 top-1/2 -translate-y-1/2 font-bold"
                  style={{ color: "#f97316" }}
                >
                  ₹
                </span>
                <input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full rounded-xl pl-8 pr-4 py-3 text-sm text-white outline-none transition-all"
                  style={{
                    background: "#1f1f1f",
                    border: "1px solid #333",
                    caretColor: "#f97316",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#f97316")}
                  onBlur={(e) => (e.target.style.borderColor = "#333")}
                  min={MIN_WITHDRAWAL}
                  max={confirmedBalance}
                />
              </div>
              {/* Quick amount buttons */}
              <div className="flex gap-2 mt-2">
                {[MIN_WITHDRAWAL, 100, 200].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setAmount(Math.min(amt, confirmedBalance).toString())}
                    disabled={confirmedBalance < amt}
                    className="text-xs px-3 py-1.5 rounded-lg transition-all disabled:opacity-30"
                    style={{
                      background: "#2a2a2a",
                      color: "#aaa",
                      border: "1px solid #333",
                    }}
                  >
                    ₹{amt}
                  </button>
                ))}
                <button
                  onClick={() => setAmount(confirmedBalance.toString())}
                  disabled={confirmedBalance === 0}
                  className="text-xs px-3 py-1.5 rounded-lg transition-all disabled:opacity-30"
                  style={{
                    background: "#2a2a2a",
                    color: "#f97316",
                    border: "1px solid #333",
                  }}
                >
                  Max
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                className="rounded-xl px-4 py-3 mb-4 text-sm"
                style={{ background: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}
              >
                {error}
              </div>
            )}

            {/* Info note */}
            <div
              className="rounded-xl px-4 py-3 mb-5 text-xs flex gap-2"
              style={{ background: "rgba(249,115,22,0.08)", color: "#aaa", border: "1px solid rgba(249,115,22,0.15)" }}
            >
              <span style={{ color: "#f97316" }}>⚡</span>
              <span>
                Withdrawals are processed manually within 2–3 business days. Make sure your UPI ID is correct.
              </span>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading || confirmedBalance < MIN_WITHDRAWAL}
              className="w-full py-3.5 rounded-xl font-bold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: loading ? "#333" : "linear-gradient(135deg, #f97316, #ea580c)",
                color: loading ? "#888" : "#000",
              }}
            >
              {loading ? "Submitting..." : "Request Withdrawal"}
            </button>

            {confirmedBalance < MIN_WITHDRAWAL && (
              <p className="text-center text-xs mt-3" style={{ color: "#666" }}>
                Earn ₹{(MIN_WITHDRAWAL - confirmedBalance).toFixed(2)} more to unlock withdrawals
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
