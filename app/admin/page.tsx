"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

// Types
type Coupon = {
  id: string
  brand_name: string
  coupon_code: string
  discount_description: string
  category: string
  expiry_date: string
  affiliate_link: string
  conditions: string
  upvotes: number
  status: string
}

type Profile = {
  id: string
  email: string
  is_admin: boolean
  created_at: string
}

type Tab = "coupons" | "approvals" | "users" | "analytics"

const CATEGORIES = [
  "Fashion", "Electronics", "Food", "Travel", "Beauty",
  "Sports", "Home", "Entertainment", "Other"
]

const emptyForm = {
  brand_name: "", coupon_code: "", discount_description: "",
  category: "Fashion", expiry_date: "", affiliate_link: "", conditions: ""
}

export default function AdminPage() {
  const supabase = createClient()
  const [activeTab, setActiveTab] = useState<Tab>("coupons")
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [users, setUsers] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  // Fetch all coupons (admin sees all statuses)
  const fetchCoupons = async () => {
    const { data } = await supabase
      .from("coupons")
      .select("*")
      .order("created_at", { ascending: false })
    setCoupons(data || [])
  }

  // Fetch all users
  const fetchUsers = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false })
    setUsers(data || [])
  }

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      await Promise.all([fetchCoupons(), fetchUsers()])
      setLoading(false)
    }
    load()
  }, [])

  // Open modal for adding
  const openAdd = () => {
    setEditingCoupon(null)
    setForm(emptyForm)
    setShowModal(true)
  }

  // Open modal for editing
  const openEdit = (coupon: Coupon) => {
    setEditingCoupon(coupon)
    setForm({
      brand_name: coupon.brand_name,
      coupon_code: coupon.coupon_code,
      discount_description: coupon.discount_description,
      category: coupon.category,
      expiry_date: coupon.expiry_date?.split("T")[0] || "",
      affiliate_link: coupon.affiliate_link || "",
      conditions: coupon.conditions || ""
    })
    setShowModal(true)
  }

  // Save (add or edit)
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

  // Delete coupon
  const deleteCoupon = async (id: string) => {
    if (!confirm("Delete this coupon?")) return
    await supabase.from("coupons").delete().eq("id", id)
    await fetchCoupons()
  }

  // Approve / Reject
  const updateStatus = async (id: string, status: string) => {
    await supabase.from("coupons").update({ status }).eq("id", id)
    await fetchCoupons()
  }

  // Toggle admin
  const toggleAdmin = async (userId: string, current: boolean) => {
    await supabase.from("profiles").update({ is_admin: !current }).eq("id", userId)
    await fetchUsers()
  }

  // Analytics data
  const totalCoupons = coupons.length
  const pendingCount = coupons.filter(c => c.status === "pending").length
  const totalUsers = users.length
  const topCoupon = [...coupons].sort((a, b) => b.upvotes - a.upvotes)[0]

  const categoryCounts = CATEGORIES.map(cat => ({
    name: cat,
    count: coupons.filter(c => c.category === cat).length
  })).filter(c => c.count > 0)

  const maxCount = Math.max(...categoryCounts.map(c => c.count), 1)

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground text-lg">Loading admin dashboard...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-secondary/30 px-6 py-4">
        <h1 className="text-2xl font-bold text-foreground">
          PrimeSavr <span className="text-primary">Admin</span>
        </h1>
        <p className="text-sm text-muted-foreground">Manage coupons, users, and approvals</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-border px-6">
        <div className="flex gap-1">
          {[
            { key: "coupons", label: "Coupons" },
            { key: "approvals", label: `Approvals ${pendingCount > 0 ? `(${pendingCount})` : ""}` },
            { key: "users", label: "Users" },
            { key: "analytics", label: "Analytics" },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as Tab)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.key
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">

        {/* TAB 1: COUPONS */}
        {activeTab === "coupons" && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">All Coupons ({totalCoupons})</h2>
              <button
                onClick={openAdd}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                + Add Coupon
              </button>
            </div>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead className="bg-secondary/50">
                  <tr>
                    {["Brand", "Code", "Category", "Description", "Expiry", "Status", "Upvotes", "Actions"].map(h => (
                      <th key={h} className="px-4 py-3 text-left font-medium text-muted-foreground">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {coupons.map(c => (
                    <tr key={c.id} className="border-t border-border hover:bg-secondary/20">
                      <td className="px-4 py-3 font-medium">{c.brand_name}</td>
                      <td className="px-4 py-3">
                        <code className="rounded bg-secondary px-2 py-1 text-xs">{c.coupon_code}</code>
                      </td>
                      <td className="px-4 py-3">{c.category}</td>
                      <td className="px-4 py-3 max-w-xs truncate">{c.discount_description}</td>
                      <td className="px-4 py-3">{c.expiry_date?.split("T")[0] || "—"}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                          c.status === "approved" ? "bg-green-500/20 text-green-400" :
                          c.status === "rejected" ? "bg-red-500/20 text-red-400" :
                          "bg-yellow-500/20 text-yellow-400"
                        }`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">{c.upvotes}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button onClick={() => openEdit(c)} className="rounded bg-secondary px-2 py-1 text-xs hover:bg-secondary/80">Edit</button>
                          <button onClick={() => deleteCoupon(c.id)} className="rounded bg-red-500/20 px-2 py-1 text-xs text-red-400 hover:bg-red-500/30">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {coupons.length === 0 && (
                <p className="py-8 text-center text-muted-foreground">No coupons yet.</p>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: APPROVALS */}
        {activeTab === "approvals" && (
          <div>
            <h2 className="mb-4 text-xl font-semibold">Pending Approvals ({pendingCount})</h2>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead className="bg-secondary/50">
                  <tr>
                    {["Brand", "Code", "Category", "Description", "Submitted", "Actions"].map(h => (
                      <th key={h} className="px-4 py-3 text-left font-medium text-muted-foreground">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {coupons.filter(c => c.status === "pending").map(c => (
                    <tr key={c.id} className="border-t border-border hover:bg-secondary/20">
                      <td className="px-4 py-3 font-medium">{c.brand_name}</td>
                      <td className="px-4 py-3">
                        <code className="rounded bg-secondary px-2 py-1 text-xs">{c.coupon_code}</code>
                      </td>
                      <td className="px-4 py-3">{c.category}</td>
                      <td className="px-4 py-3 max-w-xs truncate">{c.discount_description}</td>
                      <td className="px-4 py-3">{c.expiry_date?.split("T")[0] || "—"}</td>
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
              {pendingCount === 0 && (
                <p className="py-8 text-center text-muted-foreground">No pending approvals 🎉</p>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: USERS */}
        {activeTab === "users" && (
          <div>
            <h2 className="mb-4 text-xl font-semibold">All Users ({totalUsers})</h2>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead className="bg-secondary/50">
                  <tr>
                    {["Email", "Admin", "Joined", "Actions"].map(h => (
                      <th key={h} className="px-4 py-3 text-left font-medium text-muted-foreground">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id} className="border-t border-border hover:bg-secondary/20">
                      <td className="px-4 py-3">{u.email}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                          u.is_admin ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"
                        }`}>
                          {u.is_admin ? "Admin" : "User"}
                        </span>
                      </td>
                      <td className="px-4 py-3">{new Date(u.created_at).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => toggleAdmin(u.id, u.is_admin)}
                          className="rounded bg-secondary px-2 py-1 text-xs hover:bg-secondary/80"
                        >
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

        {/* TAB 4: ANALYTICS */}
        {activeTab === "analytics" && (
          <div>
            <h2 className="mb-6 text-xl font-semibold">Analytics</h2>

            {/* Stat Cards */}
            <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {[
                { label: "Total Coupons", value: totalCoupons, color: "text-primary" },
                { label: "Pending Approvals", value: pendingCount, color: "text-yellow-400" },
                { label: "Total Users", value: totalUsers, color: "text-blue-400" },
                { label: "Top Upvoted", value: topCoupon ? `${topCoupon.brand_name} (${topCoupon.upvotes})` : "—", color: "text-green-400" },
              ].map(stat => (
                <div key={stat.label} className="rounded-lg border border-border bg-secondary/30 p-4">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className={`mt-1 text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Category Bar Chart */}
            <div className="rounded-lg border border-border bg-secondary/30 p-6">
              <h3 className="mb-4 font-semibold">Coupons by Category</h3>
              {categoryCounts.length === 0 ? (
                <p className="text-muted-foreground">No data yet.</p>
              ) : (
                <div className="space-y-3">
                  {categoryCounts.map(cat => (
                    <div key={cat.name} className="flex items-center gap-3">
                      <span className="w-24 text-sm text-muted-foreground">{cat.name}</span>
                      <div className="flex-1 rounded-full bg-secondary h-4 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${(cat.count / maxCount) * 100}%` }}
                        />
                      </div>
                      <span className="w-6 text-right text-sm font-medium">{cat.count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-lg rounded-xl border border-border bg-background p-6 shadow-xl">
            <h3 className="mb-4 text-lg font-semibold">
              {editingCoupon ? "Edit Coupon" : "Add New Coupon"}
            </h3>
            <div className="space-y-3">
              {[
                { key: "brand_name", label: "Brand Name", type: "text" },
                { key: "coupon_code", label: "Coupon Code", type: "text" },
                { key: "discount_description", label: "Description", type: "text" },
                { key: "affiliate_link", label: "Affiliate Link", type: "text" },
                { key: "conditions", label: "Conditions", type: "text" },
                { key: "expiry_date", label: "Expiry Date", type: "date" },
              ].map(field => (
                <div key={field.key}>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">{field.label}</label>
                  <input
                    type={field.type}
                    value={form[field.key as keyof typeof form]}
                    onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                    className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              ))}
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Category</label>
                <select
                  value={form.category}
                  onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-secondary">
                Cancel
              </button>
              <button onClick={saveCoupon} disabled={saving} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
                {saving ? "Saving..." : "Save Coupon"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
```

---

**After pasting both files, go to your browser and visit:**
```
localhost:3000/admin