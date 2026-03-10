'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Coupon = {
  id: string
  brand: string
  code: string
  description: string
  category: string
  expires_at: string
  status: string
  copies: number
  created_at: string
}

type Subscriber = {
  id: string
  email: string
  subscribed_at: string
  created_at: string
  confirmed: boolean
}

function fmtDate(d: string) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

function colorFor(str: string) {
  const colors = ['#FF6B2B','#3B82F6','#22C55E','#F59E0B','#8B5CF6','#EC4899','#14B8A6','#F97316']
  let h = 0
  for (const c of (str || '')) h = c.charCodeAt(0) + ((h << 5) - h)
  return colors[Math.abs(h) % colors.length]
}

export default function AdminPage() {
  const [tab, setTab] = useState<'coupons' | 'pending' | 'newsletter'>('pending')
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [pending, setPending] = useState<Coupon[]>([])
  const [newsletter, setNewsletter] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ total: 0, active: 0, pending: 0, subscribers: 0 })

  useEffect(() => { loadAll() }, [])

  async function loadAll() {
    setLoading(true)
    const [{ data: allCoupons }, { data: subs }] = await Promise.all([
      supabase.from('coupons').select('*').order('created_at', { ascending: false }),
      supabase.from('newsletter').select('*').order('created_at', { ascending: false }),
    ])
    const all = allCoupons || []
    const activeCoupons = all.filter(c => c.status === 'active')
    const pendingCoupons = all.filter(c => c.status === 'pending')
    setCoupons(activeCoupons)
    setPending(pendingCoupons)
    setNewsletter(subs || [])
    setStats({ total: all.length, active: activeCoupons.length, pending: pendingCoupons.length, subscribers: (subs || []).length })
    setLoading(false)
  }

  async function approveCoupon(id: string) {
    await supabase.from('coupons').update({ status: 'active' }).eq('id', id)
    const approved = pending.find(c => c.id === id)
    if (approved) setCoupons(prev => [{ ...approved, status: 'active' }, ...prev])
    setPending(prev => prev.filter(c => c.id !== id))
    setStats(s => ({ ...s, pending: s.pending - 1, active: s.active + 1 }))
  }

  async function rejectCoupon(id: string) {
    if (!confirm('Reject and delete this coupon?')) return
    await supabase.from('coupons').delete().eq('id', id)
    setPending(prev => prev.filter(c => c.id !== id))
    setStats(s => ({ ...s, pending: s.pending - 1 }))
  }

  async function deleteCoupon(id: string) {
    if (!confirm('Delete this coupon permanently?')) return
    await supabase.from('coupons').delete().eq('id', id)
    setCoupons(prev => prev.filter(c => c.id !== id))
    setStats(s => ({ ...s, active: s.active - 1 }))
  }

  async function exportCSV() {
    const rows = newsletter.map(s => `${s.email},${fmtDate(s.subscribed_at || s.created_at)},${s.confirmed ? 'confirmed' : 'unconfirmed'}`)
    const csv = ['Email,Subscribed On,Status', ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'primesavr-subscribers.csv'; a.click()
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#0F0F0F', minHeight: '100vh', color: '#F5F5F5' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }
        .stat { background: #161616; border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; padding: 20px 24px; transition: all 0.2s; }
        .stat:hover { border-color: #FF6B2B; transform: translateY(-2px); }
        .tab-btn { padding: 8px 18px; border-radius: 8px; border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; font-weight: 500; font-size: 14px; transition: all 0.2s; }
        .tab-active { background: #FF6B2B; color: #fff; }
        .tab-inactive { background: #1E1E1E; color: #888; }
        .tab-inactive:hover { color: #F5F5F5; }
        .card { background: #161616; border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; overflow: hidden; }
        .badge { display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 600; padding: 3px 9px; border-radius: 6px; }
        .badge-active { background: rgba(34,197,94,0.15); color: #22C55E; }
        .badge-pending { background: rgba(245,158,11,0.15); color: #F59E0B; }
        .badge-expired { background: rgba(100,100,100,0.2); color: #888; }
        .btn { border: none; border-radius: 8px; padding: 6px 14px; font-size: 12px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
        .btn-approve { background: rgba(34,197,94,0.15); color: #22C55E; }
        .btn-approve:hover { background: #22C55E; color: #fff; }
        .btn-reject { background: rgba(239,68,68,0.1); color: #EF4444; }
        .btn-reject:hover { background: #EF4444; color: #fff; }
        .btn-edit { background: #1E1E1E; color: #888; border: 1px solid rgba(255,255,255,0.07); }
        .btn-edit:hover { color: #F5F5F5; }
        .row { border-bottom: 1px solid rgba(255,255,255,0.07); padding: 14px 24px; display: flex; align-items: center; gap: 14px; transition: background 0.15s; }
        .row:hover { background: rgba(255,255,255,0.02); }
        .row:last-child { border-bottom: none; }
        .logo { width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 15px; flex-shrink: 0; }
        th { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #888; font-weight: 600; padding: 12px 24px; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.07); }
        td { padding: 12px 24px; font-size: 13px; border-bottom: 1px solid rgba(255,255,255,0.07); }
        tr:last-child td { border-bottom: none; }
        tr:hover td { background: rgba(255,255,255,0.02); }
        code { font-family: monospace; background: #1E1E1E; padding: 3px 8px; border-radius: 5px; color: #FF6B2B; font-size: 12px; border: 1px solid rgba(255,255,255,0.07); }
      `}</style>

      {/* HEADER */}
      <div style={{ background: '#161616', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '0 32px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, background: '#FF6B2B', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne', fontWeight: 800, fontSize: 13, color: '#fff' }}>PS</div>
          <span style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 18 }}>Prime<span style={{ color: '#FF6B2B' }}>Savr</span> <span style={{ fontSize: 12, background: '#FF6B2B', color: '#fff', padding: '2px 8px', borderRadius: 6, marginLeft: 4, fontFamily: 'DM Sans', fontWeight: 600 }}>Admin</span></span>
        </div>
        <a href="/" style={{ fontSize: 13, color: '#888', textDecoration: 'none' }}>← Back to site</a>
      </div>

      <div style={{ padding: '32px', maxWidth: 1200, margin: '0 auto' }}>

        {/* STATS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
          {[
            { label: 'Total Coupons', value: stats.total, icon: '🎟️', color: '#FF6B2B' },
            { label: 'Active Coupons', value: stats.active, icon: '✅', color: '#22C55E' },
            { label: 'Pending Review', value: stats.pending, icon: '⏳', color: '#F59E0B' },
            { label: 'Subscribers', value: stats.subscribers, icon: '📧', color: '#3B82F6' },
          ].map(s => (
            <div key={s.label} className="stat">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ width: 40, height: 40, background: s.color + '20', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{s.icon}</div>
              </div>
              <div style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 30 }}>{loading ? '...' : s.value}</div>
              <div style={{ fontSize: 13, color: '#888', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* TABS */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {[
            { key: 'pending', label: `⏳ Pending (${stats.pending})` },
            { key: 'coupons', label: `🎟️ Active Coupons (${stats.active})` },
            { key: 'newsletter', label: `📧 Newsletter (${stats.subscribers})` },
          ].map(t => (
            <button key={t.key} className={`tab-btn ${tab === t.key ? 'tab-active' : 'tab-inactive'}`} onClick={() => setTab(t.key as any)}>{t.label}</button>
          ))}
        </div>

        {loading && <div style={{ textAlign: 'center', padding: 60, color: '#888' }}>Loading from Supabase...</div>}

        {/* PENDING TAB */}
        {!loading && tab === 'pending' && (
          <div>
            {pending.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 60, color: '#888' }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: '#F5F5F5' }}>All clear!</div>
                <div style={{ fontSize: 13, marginTop: 4 }}>No pending coupons to review.</div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {pending.map(p => {
                  const col = colorFor(p.brand)
                  return (
                    <div key={p.id} className="card" style={{ padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 16 }}>
                      <div className="logo" style={{ background: col + '20', color: col }}>{(p.brand || '?')[0].toUpperCase()}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: 15 }}>{p.brand} <span style={{ fontSize: 11, background: '#1E1E1E', padding: '2px 8px', borderRadius: 5, color: '#888', marginLeft: 6, fontWeight: 400 }}>{p.category}</span></div>
                        <div style={{ fontSize: 13, color: '#aaa', marginTop: 3 }}>{p.description}</div>
                        <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>Code: <span style={{ color: '#FF6B2B', fontWeight: 600 }}>{p.code}</span> · Submitted: {fmtDate(p.created_at)}</div>
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button className="btn btn-approve" onClick={() => approveCoupon(p.id)}>✓ Approve</button>
                        <button className="btn btn-reject" onClick={() => rejectCoupon(p.id)}>✗ Reject</button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* COUPONS TAB */}
        {!loading && tab === 'coupons' && (
          <div className="card">
            {coupons.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 60, color: '#888' }}>No active coupons yet.</div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr><th>Brand</th><th>Code</th><th>Category</th><th>Description</th><th>Expires</th><th>Copies</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {coupons.map(c => {
                    const col = colorFor(c.brand)
                    return (
                      <tr key={c.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div className="logo" style={{ width: 34, height: 34, background: col + '20', color: col, fontSize: 13 }}>{(c.brand || '?')[0].toUpperCase()}</div>
                            <span style={{ fontWeight: 600 }}>{c.brand}</span>
                          </div>
                        </td>
                        <td><code>{c.code}</code></td>
                        <td style={{ color: '#888' }}>{c.category}</td>
                        <td style={{ color: '#aaa', maxWidth: 200, fontSize: 12 }}>{c.description}</td>
                        <td style={{ color: '#888', fontSize: 12 }}>{fmtDate(c.expires_at)}</td>
                        <td style={{ fontWeight: 600 }}>{c.copies || 0}</td>
                        <td>
                          <div style={{ display: 'flex', gap: 6 }}>
                            <button className="btn btn-edit">Edit</button>
                            <button className="btn btn-reject" onClick={() => deleteCoupon(c.id)}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* NEWSLETTER TAB */}
        {!loading && tab === 'newsletter' && (
          <div className="card">
            <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 15 }}>{newsletter.length} Subscribers</span>
              <button className="btn btn-approve" onClick={exportCSV}>⬇ Export CSV</button>
            </div>
            {newsletter.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 60, color: '#888' }}>No subscribers yet.</div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr><th>#</th><th>Email</th><th>Subscribed On</th><th>Status</th></tr></thead>
                <tbody>
                  {newsletter.map((s, i) => (
                    <tr key={s.id}>
                      <td style={{ color: '#888', fontSize: 12 }}>{i + 1}</td>
                      <td style={{ fontWeight: 500 }}>{s.email}</td>
                      <td style={{ color: '#888', fontSize: 12 }}>{fmtDate(s.subscribed_at || s.created_at)}</td>
                      <td><span className={`badge ${s.confirmed !== false ? 'badge-active' : 'badge-pending'}`}>● {s.confirmed !== false ? 'Confirmed' : 'Unconfirmed'}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
