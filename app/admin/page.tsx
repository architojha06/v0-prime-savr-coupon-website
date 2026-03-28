"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

type Coupon = {
  id: string
  brand_name: string
  coupon_code: string
  discount_description: string
  category: string
  expiry_date: string
  affiliate_link: string
  condition: string
  upvotes: number
  status: string
  created_at: string
  user_id: string
}

type Profile = {
  id: string
  email: string
  is_admin: boolean
  created_at: string
}

type CashbackClaim = {
  id: string
  created_at: string
  brand: string
  order_id: string
  order_amount: number
  cashback: number
  upi_id: string
  status: string
}

type WithdrawalStatus = "pending" | "processing" | "paid" | "rejected"

type WithdrawalRequest = {
  id: string
  user_id: string
  user_email: string
  upi_id: string
  amount: number
  status: WithdrawalStatus
  admin_note: string | null
  created_at: string
  updated_at: string
}

type Tab = "dashboard" | "coupons" | "approvals" | "users" | "analytics" | "claims" | "withdrawals"

const CATEGORIES = ["Fashion", "Electronics", "Food", "Travel", "Beauty", "Sports", "Home", "Entertainment", "Other"]

const emptyForm = {
  brand_name: "", coupon_code: "", discount_description: "",
  category: "Fashion", expiry_date: "", affiliate_link: "", condition: ""
}

const WITHDRAWAL_STATUS_STYLES: Record<WithdrawalStatus, { bg: string; text: string }> = {
  pending:    { bg: "bg-yellow-500/20", text: "text-yellow-400" },
  processing: { bg: "bg-blue-500/20",   text: "text-blue-400"   },
  paid:       { bg: "bg-green-500/20",  text: "text-green-400"  },
  rejected:   { bg: "bg-red-500/20",    text: "text-red-400"    },
}

export default function AdminPage() {
  const router = useRouter()
  const supabase = createClient()
  const [authorized, setAuthorized] = useState(false)
  const [checking, setChecking] = useState(true)
  const [activeTab, setActiveTab] = useState<Tab>("dashboard")
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [users, setUsers] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [claims, setClaims] = useState<CashbackClaim[]>([])

  // Withdrawals state
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>([])
  const [withdrawalFilter, setWithdrawalFilter] = useState<WithdrawalStatus | "all">("pending")
  const [withdrawalUpdating, setWithdrawalUpdating] = useState<string | null>(null)
  const [noteInputs, setNoteInputs] = useState<Record<string, string>>({})

  const fetchCoupons = async () => {
    const { data } = await supabase.from("coupons").select("*").order("created_at", { ascending: false })
    setCoupons(data || [])
  }

  const fetchUsers = async () => {
    const { data } = await supabase.from("profiles").select("*").order("created_at", { ascending: false })
    setUsers(data || [])
  }

  const fetchClaims = async () => {
    const { data } = await supabase.from("cashback_claims").select("*").order("created_at", { ascending: false })
    setClaims(data || [])
  }

  const fetchWithdrawals = async (filter: WithdrawalStatus | "all" = withdrawalFilter) => {
    let query = supabase
      .from("admin_withdrawal_requests")
      .select("*")
      .order("created_at", { ascending: false })
    if (filter !== "all") query = query.eq("status", filter)
    const { data } = await query
    setWithdrawals((data as WithdrawalRequest[]) || [])
  }

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push("/login"); return }
      const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()
      if (!profile?.is_admin) { router.push("/"); return }
      setAuthorized(true)
      setChecking(false)
      await Promise.all([fetchCoupons(), fetchUsers(), fetchClaims(), fetchWithdrawals("pending")])
      setLoading(false)
    }
    checkAdmin()
  }, [])

  // Refetch withdrawals when filter changes
  useEffect(() => {
    if (authorized) fetchWithdrawals(withdrawalFilter)
  }, [withdrawalFilter])

  const openAdd = () => { setEditingCoupon(null); setForm(emptyForm); setShowModal(true) }
  const openEdit = (coupon: Coupon) => {
    setEditingCoupon(coupon)
    setForm({ brand_name: coupon.brand_name, coupon_code: coupon.coupon_code, discount_description: coupon.discount_description, category: coupon.category, expiry_date: coupon.expiry_date?.split("T")[0] || "", affiliate_link: coupon.affiliate_link || "", condition: coupon.condition || "" })
    setShowModal(true)
  }

  const saveCoupon = async () => {
    setSaving(true)
    if (editingCoupon) {
      await supabase.from("coupons").update({ ...form, status: "approved" }).eq("id", editingCoupon.id)
    } else {
      await supabase.from("coupons").insert({ ...form, status: "approved", upvotes: 0 })
    }
    await fetchCoupons()
    setShowModal(false)
    setSaving(false)
  }

  const deleteCoupon = async (id: string) => {
    if (!confirm("Delete this coupon?")) return
    await supabase.from("coupons").delete().eq("id", id)
    await fetchCoupons()
  }

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("coupons").update({ status }).eq("id", id)
    await fetchCoupons()
  }

  const updateClaimStatus = async (id: string, status: string) => {
    await supabase.from("cashback_claims").update({ status }).eq("id", id)
    await fetchClaims()
  }

  const updateWithdrawalStatus = async (id: string, newStatus: WithdrawalStatus) => {
    setWithdrawalUpdating(id)
    await supabase
      .from("withdrawal_requests")
      .update({ status: newStatus, admin_note: noteInputs[id] || null })
      .eq("id", id)
    await fetchWithdrawals(withdrawalFilter)
    setWithdrawalUpdating(null)
  }

  const toggleAdmin = async (userId: string, current: boolean) => {
    await supabase.from("profiles").update({ is_admin: !current }).eq("id", userId)
    await fetchUsers()
  }

  // Analytics
  const totalCoupons = coupons.length
  const approvedCoupons = coupons.filter(c => c.status === "approved").length
  const pendingCount = coupons.filter(c => c.status === "pending").length
  const totalUsers = users.length
  const topCoupon = [...coupons].sort((a, b) => b.upvotes - a.upvotes)[0]
  const recentUsers = [...users].slice(0, 5)
  const recentCoupons = [...coupons].slice(0, 5)
  const pendingWithdrawalCount = withdrawals.filter(w => w.status === "pending").length
  const pendingWithdrawalTotal = withdrawals.filter(w => w.status === "pending").reduce((s, w) => s + w.amount, 0)

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const today = new Date()
  const weeklyData = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() - (6 - i))
    const count = users.filter(u => {
      const ud = new Date(u.created_at)
      return ud.toDateString() === d.toDateString()
    }).length
    return { day: days[d.getDay()], count }
  })
  const maxWeekly = Math.max(...weeklyData.map(d => d.count), 1)

  const categoryCounts = CATEGORIES.map(cat => ({
    name: cat,
    count: coupons.filter(c => c.category === cat).length
  })).filter(c => c.count > 0).sort((a, b) => b.count - a.count)
  const maxCat = Math.max(...categoryCounts.map(c => c.count), 1)

  const navItems: { key: Tab; label: string; icon: string }[] = [
    { key: "dashboard",   label: "Dashboard",   icon: "⊞" },
    { key: "coupons",     label: "Coupons",      icon: "🏷" },
    { key: "approvals",   label: "Approvals",    icon: "✓" },
    { key: "users",       label: "Users",        icon: "👥" },
    { key: "analytics",   label: "Analytics",    icon: "📊" },
    { key: "claims",      label: "Claims",       icon: "💸" },
    { key: "withdrawals", label: "Withdrawals",  icon: "💳" },
  ]

  if (checking || !authorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-orange-500 border-t-transparent"></div>
          <p className="text-gray-400">Checking access...</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-orange-500 border-t-transparent"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-950 text-gray-100">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-56" : "w-16"} flex flex-col border-r border-gray-800 bg-gray-900 transition-all duration-200`}>
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-800">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-orange-500 flex items-center justify-center text-white text-xs font-bold">PS</div>
              <span className="font-bold text-white">PrimeSavr</span>
              <span className="rounded bg-orange-500/20 px-1.5 py-0.5 text-xs text-orange-400">Admin</span>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white text-lg">
            {sidebarOpen ? "←" : "→"}
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(item => (
            <button key={item.key} onClick={() => setActiveTab(item.key)}
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${activeTab === item.key ? "bg-orange-500/20 text-orange-400" : "text-gray-400 hover:bg-gray-800 hover:text-white"}`}>
              <span className="text-base">{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
              {sidebarOpen && item.key === "approvals" && pendingCount > 0 && (
                <span className="ml-auto rounded-full bg-orange-500 px-2 py-0.5 text-xs text-white">{pendingCount}</span>
              )}
              {sidebarOpen && item.key === "withdrawals" && pendingWithdrawalCount > 0 && (
                <span className="ml-auto rounded-full bg-green-500 px-2 py-0.5 text-xs text-white">{pendingWithdrawalCount}</span>
              )}
            </button>
          ))}
        </nav>

        {sidebarOpen && (
          <div className="border-t border-gray-800 p-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold">A</div>
              <div>
                <p className="text-xs font-medium text-white">Admin</p>
                <p className="text-xs text-gray-400">Super Admin</p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="flex h-16 items-center justify-between border-b border-gray-800 bg-gray-900 px-6">
          <div>
            <h1 className="text-lg font-semibold text-white capitalize">{activeTab === "dashboard" ? "Dashboard" : activeTab}</h1>
            <p className="text-xs text-gray-400">Welcome back — here's what's happening</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input placeholder="Search coupons, users..." className="w-56 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-orange-500" />
            </div>
            <button onClick={() => router.push("/")} className="rounded-lg border border-gray-700 px-3 py-2 text-xs text-gray-400 hover:text-white">← Site</button>
          </div>
        </div>

        <div className="p-6">

          {/* DASHBOARD TAB */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {[
                  { label: "Total Users",    value: totalUsers,      sub: "registered accounts", color: "text-blue-400",   bg: "bg-blue-500/10",   icon: "👥" },
                  { label: "Active Coupons", value: approvedCoupons, sub: "approved & live",     color: "text-green-400",  bg: "bg-green-500/10",  icon: "🏷" },
                  { label: "Pending",        value: pendingCount,    sub: "awaiting review",     color: "text-yellow-400", bg: "bg-yellow-500/10", icon: "⏳" },
                  { label: "Total Coupons",  value: totalCoupons,    sub: "all time",             color: "text-orange-400", bg: "bg-orange-500/10", icon: "📦" },
                ].map(stat => (
                  <div key={stat.label} className="rounded-xl border border-gray-800 bg-gray-900 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">{stat.icon}</span>
                      <span className={`rounded-lg ${stat.bg} px-2 py-1 text-xs ${stat.color}`}>Live</span>
                    </div>
                    <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                    <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
                    <p className="text-xs text-gray-500">{stat.sub}</p>
                  </div>
                ))}
              </div>

              {/* Pending withdrawals alert on dashboard */}
              {pendingWithdrawalCount > 0 && (
                <div
                  className="rounded-xl border border-orange-500/20 bg-orange-500/5 px-5 py-4 flex items-center justify-between cursor-pointer hover:bg-orange-500/10 transition-colors"
                  onClick={() => setActiveTab("withdrawals")}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">💳</span>
                    <div>
                      <p className="text-sm font-semibold text-white">{pendingWithdrawalCount} withdrawal request{pendingWithdrawalCount > 1 ? "s" : ""} pending</p>
                      <p className="text-xs text-gray-400">₹{pendingWithdrawalTotal.toFixed(2)} total to be paid out</p>
                    </div>
                  </div>
                  <span className="text-xs text-orange-400">Review →</span>
                </div>
              )}

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
                  <h3 className="mb-1 font-semibold text-white">Weekly Signups</h3>
                  <p className="text-xs text-gray-400 mb-4">New users this week</p>
                  <div className="flex items-end gap-2 h-32">
                    {weeklyData.map((d, i) => (
                      <div key={i} className="flex flex-1 flex-col items-center gap-1">
                        <span className="text-xs text-gray-400">{d.count}</span>
                        <div className="w-full rounded-t-md bg-orange-500/30 transition-all" style={{ height: `${(d.count / maxWeekly) * 100}%`, minHeight: d.count > 0 ? "8px" : "2px" }}>
                          <div className="h-full w-full rounded-t-md bg-orange-500" style={{ opacity: 0.7 + (i / 7) * 0.3 }} />
                        </div>
                        <span className="text-xs text-gray-500">{d.day}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-white">Recent Users</h3>
                    <button onClick={() => setActiveTab("users")} className="text-xs text-orange-400 hover:underline">View all →</button>
                  </div>
                  <div className="space-y-3">
                    {recentUsers.length === 0 ? (
                      <p className="text-sm text-gray-500">No users yet</p>
                    ) : recentUsers.map(u => (
                      <div key={u.id} className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                          {u.email?.[0]?.toUpperCase() || "?"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white truncate">{u.email}</p>
                          <p className="text-xs text-gray-400">{new Date(u.created_at).toLocaleDateString()}</p>
                        </div>
                        <span className={`rounded-full px-2 py-0.5 text-xs ${u.is_admin ? "bg-orange-500/20 text-orange-400" : "bg-green-500/20 text-green-400"}`}>
                          {u.is_admin ? "Admin" : "Active"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white">Recent Coupons</h3>
                  <button onClick={() => setActiveTab("coupons")} className="text-xs text-orange-400 hover:underline">View all →</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-800">
                        {["Brand", "Code", "Category", "Status", "Upvotes"].map(h => (
                          <th key={h} className="pb-3 text-left text-xs font-medium text-gray-400">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {recentCoupons.map(c => (
                        <tr key={c.id} className="hover:bg-gray-800/50">
                          <td className="py-3 font-medium text-white">{c.brand_name}</td>
                          <td className="py-3"><code className="rounded bg-gray-800 px-2 py-0.5 text-xs text-orange-300">{c.coupon_code}</code></td>
                          <td className="py-3 text-gray-400">{c.category}</td>
                          <td className="py-3">
                            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${c.status === "approved" ? "bg-green-500/20 text-green-400" : c.status === "rejected" ? "bg-red-500/20 text-red-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                              {c.status}
                            </span>
                          </td>
                          <td className="py-3 text-gray-400">↑ {c.upvotes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* COUPONS TAB */}
          {activeTab === "coupons" && (
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">All Coupons <span className="text-gray-400 text-base">({totalCoupons})</span></h2>
                <button onClick={openAdd} className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600">+ Add Coupon</button>
              </div>
              <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900">
                <table className="w-full text-sm">
                  <thead className="border-b border-gray-800">
                    <tr>{["Brand", "Code", "Category", "Description", "Status", "Upvotes", "Actions"].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-400">{h}</th>)}</tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {coupons.map(c => (
                      <tr key={c.id} className="hover:bg-gray-800/50">
                        <td className="px-4 py-3 font-medium text-white">{c.brand_name}</td>
                        <td className="px-4 py-3"><code className="rounded bg-gray-800 px-2 py-0.5 text-xs text-orange-300">{c.coupon_code}</code></td>
                        <td className="px-4 py-3 text-gray-400">{c.category}</td>
                        <td className="px-4 py-3 max-w-xs truncate text-gray-400">{c.discount_description}</td>
                        <td className="px-4 py-3">
                          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${c.status === "approved" ? "bg-green-500/20 text-green-400" : c.status === "rejected" ? "bg-red-500/20 text-red-400" : "bg-yellow-500/20 text-yellow-400"}`}>{c.status}</span>
                        </td>
                        <td className="px-4 py-3 text-gray-400">↑ {c.upvotes}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button onClick={() => openEdit(c)} className="rounded bg-gray-800 px-2 py-1 text-xs text-gray-300 hover:bg-gray-700">Edit</button>
                            <button onClick={() => deleteCoupon(c.id)} className="rounded bg-red-500/20 px-2 py-1 text-xs text-red-400 hover:bg-red-500/30">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {coupons.length === 0 && <p className="py-8 text-center text-gray-500">No coupons yet.</p>}
              </div>
            </div>
          )}

          {/* APPROVALS TAB */}
          {activeTab === "approvals" && (
            <div>
              <h2 className="mb-4 text-xl font-semibold text-white">Pending Approvals <span className="text-gray-400 text-base">({pendingCount})</span></h2>
              <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900">
                <table className="w-full text-sm">
                  <thead className="border-b border-gray-800">
                    <tr>{["Brand", "Code", "Category", "Description", "Actions"].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-400">{h}</th>)}</tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {coupons.filter(c => c.status === "pending").map(c => (
                      <tr key={c.id} className="hover:bg-gray-800/50">
                        <td className="px-4 py-3 font-medium text-white">{c.brand_name}</td>
                        <td className="px-4 py-3"><code className="rounded bg-gray-800 px-2 py-0.5 text-xs text-orange-300">{c.coupon_code}</code></td>
                        <td className="px-4 py-3 text-gray-400">{c.category}</td>
                        <td className="px-4 py-3 max-w-xs truncate text-gray-400">{c.discount_description}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button onClick={() => updateStatus(c.id, "approved")} className="rounded bg-green-500/20 px-2 py-1 text-xs text-green-400 hover:bg-green-500/30">✓ Approve</button>
                            <button onClick={() => updateStatus(c.id, "rejected")} className="rounded bg-red-500/20 px-2 py-1 text-xs text-red-400 hover:bg-red-500/30">✗ Reject</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {pendingCount === 0 && <p className="py-8 text-center text-gray-500">No pending approvals 🎉</p>}
              </div>
            </div>
          )}

          {/* USERS TAB */}
          {activeTab === "users" && (
            <div>
              <h2 className="mb-4 text-xl font-semibold text-white">All Users <span className="text-gray-400 text-base">({totalUsers})</span></h2>
              <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900">
                <table className="w-full text-sm">
                  <thead className="border-b border-gray-800">
                    <tr>{["User", "Role", "Joined", "Actions"].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-400">{h}</th>)}</tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {users.map(u => (
                      <tr key={u.id} className="hover:bg-gray-800/50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                              {u.email?.[0]?.toUpperCase() || "?"}
                            </div>
                            <span className="text-white">{u.email}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${u.is_admin ? "bg-orange-500/20 text-orange-400" : "bg-gray-700 text-gray-400"}`}>
                            {u.is_admin ? "Admin" : "User"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-400">{new Date(u.created_at).toLocaleDateString()}</td>
                        <td className="px-4 py-3">
                          <button onClick={() => toggleAdmin(u.id, u.is_admin)} className="rounded bg-gray-800 px-2 py-1 text-xs text-gray-300 hover:bg-gray-700">
                            {u.is_admin ? "Revoke Admin" : "Make Admin"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ANALYTICS TAB */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {[
                  { label: "Total Coupons", value: totalCoupons,    color: "text-orange-400" },
                  { label: "Approved",      value: approvedCoupons, color: "text-green-400"  },
                  { label: "Pending",       value: pendingCount,    color: "text-yellow-400" },
                  { label: "Top Upvoted",   value: topCoupon ? `${topCoupon.brand_name}` : "—", color: "text-blue-400" },
                ].map(stat => (
                  <div key={stat.label} className="rounded-xl border border-gray-800 bg-gray-900 p-4">
                    <p className="text-xs text-gray-400">{stat.label}</p>
                    <p className={`mt-1 text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
                <h3 className="mb-4 font-semibold text-white">Coupons by Category</h3>
                {categoryCounts.length === 0 ? <p className="text-gray-500">No data yet.</p> : (
                  <div className="space-y-3">
                    {categoryCounts.map(cat => (
                      <div key={cat.name} className="flex items-center gap-3">
                        <span className="w-28 text-sm text-gray-400">{cat.name}</span>
                        <div className="flex-1 rounded-full bg-gray-800 h-3 overflow-hidden">
                          <div className="h-full rounded-full bg-orange-500 transition-all" style={{ width: `${(cat.count / maxCat) * 100}%` }} />
                        </div>
                        <span className="w-6 text-right text-sm font-medium text-white">{cat.count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* CLAIMS TAB */}
          {activeTab === "claims" && (
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">
                  Cashback Claims <span className="text-gray-400 text-base">({claims.length})</span>
                </h2>
                <div className="flex gap-2 text-xs">
                  <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-yellow-400">
                    {claims.filter(c => c.status === "pending").length} pending
                  </span>
                  <span className="rounded-full bg-green-500/20 px-3 py-1 text-green-400">
                    {claims.filter(c => c.status === "approved").length} approved
                  </span>
                </div>
              </div>
              <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900">
                <table className="w-full text-sm">
                  <thead className="border-b border-gray-800">
                    <tr>
                      {["Date", "Brand", "Order ID", "Amount", "Cashback", "UPI ID", "Status", "Actions"].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-400">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {claims.map(c => (
                      <tr key={c.id} className="hover:bg-gray-800/50">
                        <td className="px-4 py-3 text-gray-400 whitespace-nowrap">{new Date(c.created_at).toLocaleDateString()}</td>
                        <td className="px-4 py-3 font-medium text-white">{c.brand}</td>
                        <td className="px-4 py-3"><code className="rounded bg-gray-800 px-2 py-0.5 text-xs text-orange-300">{c.order_id}</code></td>
                        <td className="px-4 py-3 text-gray-400">₹{c.order_amount}</td>
                        <td className="px-4 py-3 font-semibold text-orange-400">₹{c.cashback}</td>
                        <td className="px-4 py-3 text-gray-400">{c.upi_id}</td>
                        <td className="px-4 py-3">
                          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${c.status === "approved" ? "bg-green-500/20 text-green-400" : c.status === "rejected" ? "bg-red-500/20 text-red-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                            {c.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {c.status === "pending" && (
                            <div className="flex gap-2">
                              <button onClick={() => updateClaimStatus(c.id, "approved")} className="rounded bg-green-500/20 px-2 py-1 text-xs text-green-400 hover:bg-green-500/30">✓ Approve</button>
                              <button onClick={() => updateClaimStatus(c.id, "rejected")} className="rounded bg-red-500/20 px-2 py-1 text-xs text-red-400 hover:bg-red-500/30">✗ Reject</button>
                            </div>
                          )}
                          {c.status !== "pending" && (
                            <button onClick={() => updateClaimStatus(c.id, "pending")} className="rounded bg-gray-700 px-2 py-1 text-xs text-gray-400 hover:bg-gray-600">Reset</button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {claims.length === 0 && <p className="py-8 text-center text-gray-500">No claims yet 🎉</p>}
              </div>
            </div>
          )}

          {/* WITHDRAWALS TAB */}
          {activeTab === "withdrawals" && (
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Withdrawal Requests</h2>
                {withdrawalFilter === "pending" && withdrawals.length > 0 && (
                  <div className="rounded-lg bg-orange-500/10 border border-orange-500/20 px-4 py-2 text-sm text-orange-400">
                    ₹{withdrawals.filter(w => w.status === "pending").reduce((s, w) => s + w.amount, 0).toFixed(2)} to pay out
                  </div>
                )}
              </div>

              {/* Filter tabs */}
              <div className="flex gap-2 mb-5 flex-wrap">
                {(["all", "pending", "processing", "paid", "rejected"] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setWithdrawalFilter(tab)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                      withdrawalFilter === tab
                        ? "bg-orange-500 text-black"
                        : "bg-gray-800 text-gray-400 border border-gray-700 hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {withdrawals.length === 0 ? (
                <div className="rounded-xl border border-gray-800 bg-gray-900 p-12 text-center">
                  <p className="text-2xl mb-2">🎉</p>
                  <p className="text-gray-500">No {withdrawalFilter !== "all" ? withdrawalFilter : ""} requests</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {withdrawals.map(req => {
                    const style = WITHDRAWAL_STATUS_STYLES[req.status]
                    return (
                      <div key={req.id} className="rounded-xl border border-gray-800 bg-gray-900 p-5">
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-white truncate">{req.user_email}</span>
                              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${style.bg} ${style.text}`}>
                                {req.status}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap">
                              <span>UPI: <span className="text-gray-300">{req.upi_id}</span></span>
                              <span>•</span>
                              <span>{new Date(req.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                            </div>
                            {req.admin_note && (
                              <p className="text-xs mt-1 text-orange-400">Note: {req.admin_note}</p>
                            )}
                          </div>
                          <p className="text-xl font-bold text-green-400 shrink-0">₹{req.amount.toFixed(2)}</p>
                        </div>

                        {(req.status === "pending" || req.status === "processing") && (
                          <div className="mt-4 pt-4 border-t border-gray-800 flex gap-3 flex-wrap items-center">
                            <input
                              type="text"
                              placeholder="UTR / note (optional)"
                              value={noteInputs[req.id] || ""}
                              onChange={e => setNoteInputs(prev => ({ ...prev, [req.id]: e.target.value }))}
                              className="flex-1 min-w-0 rounded-lg px-3 py-2 text-sm text-white bg-gray-800 border border-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-500"
                            />
                            <div className="flex gap-2">
                              {req.status === "pending" && (
                                <button
                                  onClick={() => updateWithdrawalStatus(req.id, "processing")}
                                  disabled={withdrawalUpdating === req.id}
                                  className="rounded-lg bg-blue-500/20 px-3 py-2 text-xs text-blue-400 hover:bg-blue-500/30 disabled:opacity-50"
                                >
                                  Mark Processing
                                </button>
                              )}
                              <button
                                onClick={() => updateWithdrawalStatus(req.id, "paid")}
                                disabled={withdrawalUpdating === req.id}
                                className="rounded-lg bg-green-500/20 px-3 py-2 text-xs text-green-400 hover:bg-green-500/30 disabled:opacity-50"
                              >
                                {withdrawalUpdating === req.id ? "..." : "✓ Mark Paid"}
                              </button>
                              <button
                                onClick={() => updateWithdrawalStatus(req.id, "rejected")}
                                disabled={withdrawalUpdating === req.id}
                                className="rounded-lg bg-red-500/20 px-3 py-2 text-xs text-red-400 hover:bg-red-500/30 disabled:opacity-50"
                              >
                                Reject
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      {/* Coupon Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-lg rounded-xl border border-gray-700 bg-gray-900 p-6 shadow-2xl">
            <h3 className="mb-4 text-lg font-semibold text-white">{editingCoupon ? "Edit Coupon" : "Add New Coupon"}</h3>
            <div className="space-y-3">
              {[
                { key: "brand_name", label: "Brand Name", type: "text" },
                { key: "coupon_code", label: "Coupon Code", type: "text" },
                { key: "discount_description", label: "Description", type: "text" },
                { key: "affiliate_link", label: "Affiliate Link", type: "text" },
                { key: "condition", label: "Conditions", type: "text" },
                { key: "expiry_date", label: "Expiry Date", type: "date" },
              ].map(field => (
                <div key={field.key}>
                  <label className="mb-1 block text-xs font-medium text-gray-400">{field.label}</label>
                  <input type={field.type} value={form[field.key as keyof typeof form]}
                    onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
              ))}
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-400">Category</label>
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500">
                  {CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">Cancel</button>
              <button onClick={saveCoupon} disabled={saving} className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-50">{saving ? "Saving..." : "Save Coupon"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
