"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { SearchBar } from "@/components/search-bar"
import { CategoryGrid } from "@/components/category-grid"
import { CategoryFilter } from "@/components/category-filter"
import { CouponsList } from "@/components/coupons-list"
import { SubmitCouponForm } from "@/components/submit-coupon-form"
import { StatsSection } from "@/components/stats-section"
import { Footer } from "@/components/footer"

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b border-border bg-secondary/30">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Save More on Every Purchase with{" "}
                <span className="text-primary">PrimeSavr</span>
              </h1>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
                Find the best coupons, promo codes, and exclusive deals from
                thousands of your favorite brands.
              </p>
              <div className="mt-8">
                <SearchBar />
              </div>
            </div>

            {/* Stats */}
            <StatsSection />
          </div>
        </section>

        {/* Categories */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Browse by Category
              </h2>
              <p className="mt-2 text-muted-foreground">
                Find deals in your favorite categories
              </p>
            </div>
            <CategoryGrid />
          </div>
        </section>

        {/* Latest Coupons */}
        <section>
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Latest Coupons
              </h2>
              <p className="mt-2 text-muted-foreground">
                Fresh deals added by the community
              </p>
            </div>
            <div className="mb-8">
              <CategoryFilter
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>
            <CouponsList selectedCategory={selectedCategory} />
          </div>
        </section>

        {/* Submit Coupon Form */}
        <section className="border-t border-border bg-secondary/20">
          <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
            <SubmitCouponForm />
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="border-t border-border bg-foreground">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-background sm:text-3xl">
                Never Miss a Deal
              </h2>
              <p className="mt-3 text-background/70">
                Subscribe to our newsletter and get the best deals delivered
                straight to your inbox.
              </p>
              <form className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 flex-1 rounded-lg border-0 bg-background px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="h-12 rounded-lg bg-primary px-6 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>PrimeSavr — Admin Dashboard</title>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
<style>
  :root {
    --orange: #FF6B2B;
    --orange-light: #FF8C57;
    --orange-glow: rgba(255,107,43,0.18);
    --bg: #0F0F0F;
    --bg2: #161616;
    --bg3: #1E1E1E;
    --border: rgba(255,255,255,0.07);
    --text: #F5F5F5;
    --muted: #888;
    --green: #22C55E;
    --red: #EF4444;
    --yellow: #F59E0B;
    --blue: #3B82F6;
  }
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family:'DM Sans',sans-serif; background:var(--bg); color:var(--text); min-height:100vh; display:flex; overflow-x:hidden; }

  /* SIDEBAR */
  .sidebar {
    width: 240px; min-height: 100vh; background: var(--bg2);
    border-right: 1px solid var(--border);
    display: flex; flex-direction: column;
    position: fixed; top:0; left:0; z-index:100;
    transition: transform 0.3s;
  }
  .sidebar-logo {
    padding: 24px 20px 20px;
    border-bottom: 1px solid var(--border);
    display: flex; align-items:center; gap:10px;
  }
  .logo-icon {
    width:36px; height:36px; background:var(--orange);
    border-radius:10px; display:flex; align-items:center; justify-content:center;
    font-family:'Syne',sans-serif; font-weight:800; font-size:14px; color:#fff;
  }
  .logo-text { font-family:'Syne',sans-serif; font-weight:800; font-size:16px; }
  .logo-text span { color:var(--orange); }
  .sidebar-badge { font-size:10px; background:var(--orange); color:#fff; padding:2px 6px; border-radius:4px; margin-left:auto; font-weight:600; }

  .nav-section { padding: 16px 12px 4px; }
  .nav-label { font-size:10px; text-transform:uppercase; letter-spacing:1.5px; color:var(--muted); padding: 0 8px 8px; font-weight:600; }
  .nav-item {
    display:flex; align-items:center; gap:10px;
    padding: 10px 12px; border-radius:10px; cursor:pointer;
    font-size:14px; font-weight:500; color:var(--muted);
    transition: all 0.2s; margin-bottom:2px;
    position:relative;
  }
  .nav-item:hover { background:var(--bg3); color:var(--text); }
  .nav-item.active { background:var(--orange-glow); color:var(--orange); }
  .nav-item.active::before {
    content:''; position:absolute; left:0; top:50%; transform:translateY(-50%);
    width:3px; height:60%; background:var(--orange); border-radius:0 3px 3px 0;
  }
  .nav-icon { font-size:16px; width:20px; text-align:center; }
  .nav-badge { margin-left:auto; background:var(--orange); color:#fff; font-size:10px; padding:2px 6px; border-radius:10px; font-weight:700; }
  .nav-badge.green { background:var(--green); }

  .sidebar-footer {
    margin-top:auto; padding:16px 12px;
    border-top:1px solid var(--border);
  }
  .admin-profile { display:flex; align-items:center; gap:10px; padding:10px 12px; border-radius:10px; cursor:pointer; }
  .admin-profile:hover { background:var(--bg3); }
  .admin-avatar { width:34px; height:34px; background:var(--orange); border-radius:10px; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:13px; flex-shrink:0; }
  .admin-name { font-size:13px; font-weight:600; }
  .admin-role { font-size:11px; color:var(--muted); }

  /* MAIN */
  .main { margin-left:240px; flex:1; min-height:100vh; }

  /* TOPBAR */
  .topbar {
    position:sticky; top:0; z-index:50;
    background:rgba(15,15,15,0.85); backdrop-filter:blur(16px);
    border-bottom:1px solid var(--border);
    padding:0 28px;
    display:flex; align-items:center; justify-content:space-between;
    height:62px;
  }
  .topbar-left { display:flex; flex-direction:column; }
  .topbar-title { font-family:'Syne',sans-serif; font-weight:700; font-size:18px; }
  .topbar-sub { font-size:12px; color:var(--muted); }
  .topbar-right { display:flex; align-items:center; gap:12px; }
  .topbar-search {
    background:var(--bg3); border:1px solid var(--border);
    border-radius:10px; padding:8px 14px; font-size:13px;
    color:var(--text); outline:none; width:220px;
    font-family:'DM Sans',sans-serif;
  }
  .topbar-search::placeholder { color:var(--muted); }
  .topbar-search:focus { border-color:var(--orange); }
  .icon-btn {
    width:38px; height:38px; border-radius:10px; border:1px solid var(--border);
    background:var(--bg3); cursor:pointer; display:flex; align-items:center; justify-content:center;
    font-size:16px; color:var(--muted); transition:all 0.2s; position:relative;
  }
  .icon-btn:hover { border-color:var(--orange); color:var(--orange); }
  .notif-dot { position:absolute; top:7px; right:7px; width:7px; height:7px; background:var(--orange); border-radius:50%; border:2px solid var(--bg); }

  /* CONTENT */
  .content { padding:28px; }

  /* STATS GRID */
  .stats-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin-bottom:24px; }
  .stat-card {
    background:var(--bg2); border:1px solid var(--border);
    border-radius:16px; padding:20px 22px;
    transition:all 0.25s; cursor:default;
    animation: fadeUp 0.5s ease both;
  }
  .stat-card:hover { border-color:var(--orange); transform:translateY(-2px); box-shadow:0 8px 30px var(--orange-glow); }
  .stat-card:nth-child(1) { animation-delay:0.05s; }
  .stat-card:nth-child(2) { animation-delay:0.1s; }
  .stat-card:nth-child(3) { animation-delay:0.15s; }
  .stat-card:nth-child(4) { animation-delay:0.2s; }
  @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }

  .stat-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:16px; }
  .stat-icon { width:40px; height:40px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:18px; }
  .stat-icon.orange { background:var(--orange-glow); }
  .stat-icon.green { background:rgba(34,197,94,0.15); }
  .stat-icon.blue { background:rgba(59,130,246,0.15); }
  .stat-icon.yellow { background:rgba(245,158,11,0.15); }
  .stat-change { font-size:12px; font-weight:600; padding:3px 8px; border-radius:6px; }
  .stat-change.up { background:rgba(34,197,94,0.15); color:var(--green); }
  .stat-change.down { background:rgba(239,68,68,0.15); color:var(--red); }
  .stat-value { font-family:'Syne',sans-serif; font-weight:800; font-size:28px; margin-bottom:4px; }
  .stat-label { font-size:13px; color:var(--muted); font-weight:500; }

  /* GRID 2 COL */
  .grid-2 { display:grid; grid-template-columns:1.5fr 1fr; gap:16px; margin-bottom:24px; }
  .grid-3 { display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px; margin-bottom:24px; }

  .card {
    background:var(--bg2); border:1px solid var(--border);
    border-radius:16px; overflow:hidden;
    animation: fadeUp 0.5s ease both;
  }
  .card-header {
    padding:18px 22px; border-bottom:1px solid var(--border);
    display:flex; align-items:center; justify-content:space-between;
  }
  .card-title { font-family:'Syne',sans-serif; font-weight:700; font-size:15px; }
  .card-sub { font-size:12px; color:var(--muted); margin-top:2px; }
  .card-action { font-size:12px; color:var(--orange); cursor:pointer; font-weight:600; }
  .card-action:hover { text-decoration:underline; }
  .card-body { padding:20px 22px; }

  /* USER TABLE */
  .table { width:100%; border-collapse:collapse; }
  .table th { font-size:11px; text-transform:uppercase; letter-spacing:1px; color:var(--muted); font-weight:600; padding:0 0 12px; text-align:left; border-bottom:1px solid var(--border); }
  .table td { padding:12px 0; border-bottom:1px solid var(--border); font-size:13px; vertical-align:middle; }
  .table tr:last-child td { border-bottom:none; }
  .table tr:hover td { background:rgba(255,255,255,0.02); }
  .user-cell { display:flex; align-items:center; gap:10px; }
  .user-av { width:32px; height:32px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:12px; flex-shrink:0; }
  .user-name-el { font-weight:600; font-size:13px; }
  .user-email-el { font-size:11px; color:var(--muted); }
  .badge { display:inline-flex; align-items:center; gap:4px; font-size:11px; font-weight:600; padding:3px 9px; border-radius:6px; }
  .badge.active { background:rgba(34,197,94,0.15); color:var(--green); }
  .badge.inactive { background:rgba(239,68,68,0.1); color:var(--red); }
  .badge.pending { background:rgba(245,158,11,0.15); color:var(--yellow); }
  .badge.approved { background:rgba(34,197,94,0.15); color:var(--green); }
  .badge.rejected { background:rgba(239,68,68,0.1); color:var(--red); }
  .badge.expired { background:rgba(100,100,100,0.2); color:var(--muted); }

  /* COUPON TABLE */
  .coupon-row { display:flex; align-items:center; justify-content:space-between; padding:12px 0; border-bottom:1px solid var(--border); }
  .coupon-row:last-child { border-bottom:none; }
  .coupon-brand { display:flex; align-items:center; gap:10px; }
  .coupon-logo { width:36px; height:36px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:13px; flex-shrink:0; }
  .coupon-name { font-weight:600; font-size:13px; }
  .coupon-cat { font-size:11px; color:var(--muted); }
  .coupon-code { font-family:monospace; font-size:12px; background:var(--bg3); padding:4px 10px; border-radius:6px; color:var(--orange); border:1px solid var(--border); }
  .coupon-actions { display:flex; gap:6px; }
  .btn-sm {
    font-size:11px; font-weight:600; padding:5px 11px; border-radius:7px;
    cursor:pointer; border:none; transition:all 0.2s; font-family:'DM Sans',sans-serif;
  }
  .btn-approve { background:rgba(34,197,94,0.15); color:var(--green); }
  .btn-approve:hover { background:var(--green); color:#fff; }
  .btn-reject { background:rgba(239,68,68,0.1); color:var(--red); }
  .btn-reject:hover { background:var(--red); color:#fff; }
  .btn-edit { background:var(--bg3); color:var(--muted); border:1px solid var(--border); }
  .btn-edit:hover { color:var(--text); border-color:var(--muted); }

  /* ACTIVITY FEED */
  .activity-item { display:flex; gap:12px; padding:12px 0; border-bottom:1px solid var(--border); }
  .activity-item:last-child { border-bottom:none; }
  .activity-dot { width:8px; height:8px; border-radius:50%; margin-top:5px; flex-shrink:0; }
  .activity-dot.green { background:var(--green); box-shadow:0 0 8px var(--green); }
  .activity-dot.orange { background:var(--orange); box-shadow:0 0 8px var(--orange); }
  .activity-dot.blue { background:var(--blue); box-shadow:0 0 8px var(--blue); }
  .activity-dot.red { background:var(--red); box-shadow:0 0 8px var(--red); }
  .activity-text { font-size:13px; line-height:1.5; }
  .activity-text strong { color:var(--text); }
  .activity-time { font-size:11px; color:var(--muted); margin-top:2px; }

  /* CHART BARS */
  .chart-wrap { display:flex; align-items:flex-end; gap:8px; height:100px; padding-top:8px; }
  .chart-col { flex:1; display:flex; flex-direction:column; align-items:center; gap:6px; }
  .chart-bar { width:100%; border-radius:6px 6px 0 0; transition:all 0.3s; cursor:pointer; position:relative; }
  .chart-bar:hover { filter:brightness(1.2); }
  .chart-bar.orange { background: linear-gradient(180deg, var(--orange) 0%, rgba(255,107,43,0.4) 100%); }
  .chart-bar.dim { background: var(--bg3); }
  .chart-label { font-size:10px; color:var(--muted); }

  /* CATEGORY BREAKDOWN */
  .cat-item { display:flex; align-items:center; gap:10px; margin-bottom:12px; }
  .cat-item:last-child { margin-bottom:0; }
  .cat-name { font-size:13px; font-weight:500; flex:1; }
  .cat-bar-wrap { flex:2; height:6px; background:var(--bg3); border-radius:3px; overflow:hidden; }
  .cat-bar-fill { height:100%; border-radius:3px; background:var(--orange); transition:width 1s ease; }
  .cat-count { font-size:12px; color:var(--muted); width:30px; text-align:right; }

  /* TOP BRANDS */
  .brand-item { display:flex; align-items:center; gap:12px; padding:10px 0; border-bottom:1px solid var(--border); }
  .brand-item:last-child { border-bottom:none; }
  .brand-rank { font-family:'Syne',sans-serif; font-weight:800; font-size:16px; color:var(--border); width:20px; }
  .brand-logo2 { width:34px; height:34px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:12px; }
  .brand-info { flex:1; }
  .brand-nm { font-size:13px; font-weight:600; }
  .brand-copies { font-size:11px; color:var(--muted); }
  .brand-pct { font-size:13px; font-weight:700; color:var(--orange); }

  /* SECTION TITLE */
  .section-title { font-family:'Syne',sans-serif; font-weight:700; font-size:18px; margin-bottom:16px; }

  /* TABS */
  .tabs { display:flex; gap:4px; padding:4px; background:var(--bg3); border-radius:10px; width:fit-content; margin-bottom:20px; }
  .tab { padding:7px 16px; border-radius:8px; font-size:13px; font-weight:500; cursor:pointer; color:var(--muted); transition:all 0.2s; }
  .tab.active { background:var(--bg2); color:var(--text); box-shadow:0 2px 8px rgba(0,0,0,0.3); }

  /* PENDING SUBMISSIONS */
  .pending-card {
    background:var(--bg2); border:1px solid var(--border);
    border-radius:14px; padding:16px 18px; margin-bottom:10px;
    display:flex; align-items:center; gap:14px;
    transition:all 0.2s;
  }
  .pending-card:hover { border-color:var(--orange-light); }
  .pending-logo { width:42px; height:42px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:14px; flex-shrink:0; }
  .pending-info { flex:1; }
  .pending-brand { font-weight:700; font-size:14px; }
  .pending-desc { font-size:12px; color:var(--muted); margin-top:2px; }
  .pending-meta { font-size:11px; color:var(--muted); margin-top:4px; }
  .pending-meta span { color:var(--orange); font-weight:600; }
  .pending-actions { display:flex; gap:8px; }

  /* NOTIFICATION PANEL */
  .notif-item { display:flex; gap:12px; padding:12px 0; border-bottom:1px solid var(--border); }
  .notif-item:last-child { border-bottom:none; }
  .notif-icon { width:36px; height:36px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:16px; flex-shrink:0; }
  .notif-body { flex:1; }
  .notif-title { font-size:13px; font-weight:600; }
  .notif-msg { font-size:12px; color:var(--muted); margin-top:2px; line-height:1.4; }
  .notif-time { font-size:11px; color:var(--muted); white-space:nowrap; }

  /* SCROLLBAR */
  ::-webkit-scrollbar { width:4px; }
  ::-webkit-scrollbar-track { background:transparent; }
  ::-webkit-scrollbar-thumb { background:var(--border); border-radius:2px; }

  /* RESPONSIVE */
  @media (max-width:1100px) { .stats-grid { grid-template-columns:repeat(2,1fr); } .grid-2 { grid-template-columns:1fr; } }
</style>
</head>
<body>

<!-- SIDEBAR -->
<aside class="sidebar">
  <div class="sidebar-logo">
    <div class="logo-icon">PS</div>
    <div class="logo-text">Prime<span>Savr</span></div>
    <div class="sidebar-badge">Admin</div>
  </div>

  <div class="nav-section">
    <div class="nav-label">Overview</div>
    <div class="nav-item active" onclick="setPage('dashboard', this)">
      <span class="nav-icon">📊</span> Dashboard
    </div>
    <div class="nav-item" onclick="setPage('analytics', this)">
      <span class="nav-icon">📈</span> Analytics
    </div>
  </div>

  <div class="nav-section">
    <div class="nav-label">Management</div>
    <div class="nav-item" onclick="setPage('users', this)">
      <span class="nav-icon">👥</span> Users
    </div>
    <div class="nav-item" onclick="setPage('coupons', this)">
      <span class="nav-icon">🎟️</span> Coupons
      <span class="nav-badge">12</span>
    </div>
    <div class="nav-item" onclick="setPage('pending', this)">
      <span class="nav-icon">⏳</span> Pending
      <span class="nav-badge">5</span>
    </div>
    <div class="nav-item" onclick="setPage('brands', this)">
      <span class="nav-icon">🏷️</span> Brands
    </div>
    <div class="nav-item" onclick="setPage('categories', this)">
      <span class="nav-icon">📂</span> Categories
    </div>
  </div>

  <div class="nav-section">
    <div class="nav-label">System</div>
    <div class="nav-item" onclick="setPage('newsletter', this)">
      <span class="nav-icon">📧</span> Newsletter
      <span class="nav-badge green">New</span>
    </div>
    <div class="nav-item" onclick="setPage('settings', this)">
      <span class="nav-icon">⚙️</span> Settings
    </div>
    <div class="nav-item" onclick="setPage('logs', this)">
      <span class="nav-icon">🗒️</span> Logs
    </div>
  </div>

  <div class="sidebar-footer">
    <div class="admin-profile">
      <div class="admin-avatar">A</div>
      <div>
        <div class="admin-name">Admin</div>
        <div class="admin-role">Super Admin</div>
      </div>
      <span style="margin-left:auto;font-size:14px;color:var(--muted)">⋯</span>
    </div>
  </div>
</aside>

<!-- MAIN -->
<main class="main">
  <!-- TOPBAR -->
  <div class="topbar">
    <div class="topbar-left">
      <div class="topbar-title" id="page-title">Dashboard</div>
      <div class="topbar-sub" id="page-sub">Welcome back — here's what's happening</div>
    </div>
    <div class="topbar-right">
      <input class="topbar-search" placeholder="🔍  Search users, coupons..." />
      <div class="icon-btn">🔔<div class="notif-dot"></div></div>
      <div class="icon-btn">🌙</div>
    </div>
  </div>

  <!-- CONTENT -->
  <div class="content" id="main-content">

    <!-- ===== DASHBOARD PAGE ===== -->
    <div id="page-dashboard">
      <!-- STATS -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-header">
            <div class="stat-icon orange">👥</div>
            <span class="stat-change up">↑ 12%</span>
          </div>
          <div class="stat-value">2,847</div>
          <div class="stat-label">Total Registered Users</div>
        </div>
        <div class="stat-card">
          <div class="stat-header">
            <div class="stat-icon green">🎟️</div>
            <span class="stat-change up">↑ 8%</span>
          </div>
          <div class="stat-value">1,203</div>
          <div class="stat-label">Active Coupons</div>
        </div>
        <div class="stat-card">
          <div class="stat-header">
            <div class="stat-icon blue">📋</div>
            <span class="stat-change down">↓ 3%</span>
          </div>
          <div class="stat-value">41,890</div>
          <div class="stat-label">Total Coupon Copies</div>
        </div>
        <div class="stat-card">
          <div class="stat-header">
            <div class="stat-icon yellow">⏳</div>
            <span class="stat-change up">↑ 2</span>
          </div>
          <div class="stat-value">5</div>
          <div class="stat-label">Pending Approvals</div>
        </div>
      </div>

      <div class="grid-2">
        <!-- USER TABLE -->
        <div class="card" style="animation-delay:0.25s">
          <div class="card-header">
            <div>
              <div class="card-title">Recent Users</div>
              <div class="card-sub">Latest registrations</div>
            </div>
            <span class="card-action" onclick="setPage('users', document.querySelector('.nav-item:nth-of-type(3)'))">View all →</span>
          </div>
          <div class="card-body" style="padding:0 22px">
            <table class="table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Joined</th>
                  <th>Status</th>
                  <th>Copies</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><div class="user-cell"><div class="user-av" style="background:#FF6B2B20;color:#FF6B2B">R</div><div><div class="user-name-el">Rahul Sharma</div><div class="user-email-el"><a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="ddafbcb5a8b19dbab0bcb4b1f3beb2b0">[email&#160;protected]</a></div></div></div></td>
                  <td style="color:var(--muted);font-size:12px">Mar 9, 2025</td>
                  <td><span class="badge active">● Active</span></td>
                  <td style="font-weight:600">23</td>
                </tr>
                <tr>
                  <td><div class="user-cell"><div class="user-av" style="background:#3B82F620;color:#3B82F6">P</div><div><div class="user-name-el">Priya Mehta</div><div class="user-email-el"><a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="b5c5c7dcccd4f5ccd4dddada9bd6dad8">[email&#160;protected]</a></div></div></div></td>
                  <td style="color:var(--muted);font-size:12px">Mar 8, 2025</td>
                  <td><span class="badge active">● Active</span></td>
                  <td style="font-weight:600">8</td>
                </tr>
                <tr>
                  <td><div class="user-cell"><div class="user-av" style="background:#22C55E20;color:#22C55E">A</div><div><div class="user-name-el">Arjun Singh</div><div class="user-email-el"><a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="99f8ebf3ecf7d9f6ecedf5f6f6f2b7faf6f4">[email&#160;protected]</a></div></div></div></td>
                  <td style="color:var(--muted);font-size:12px">Mar 7, 2025</td>
                  <td><span class="badge inactive">● Inactive</span></td>
                  <td style="font-weight:600">2</td>
                </tr>
                <tr>
                  <td><div class="user-cell"><div class="user-av" style="background:#F59E0B20;color:#F59E0B">N</div><div><div class="user-name-el">Neha Kapoor</div><div class="user-email-el"><a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="49272c21286722092e24282025672a2624">[email&#160;protected]</a></div></div></div></td>
                  <td style="color:var(--muted);font-size:12px">Mar 6, 2025</td>
                  <td><span class="badge active">● Active</span></td>
                  <td style="font-weight:600">41</td>
                </tr>
                <tr>
                  <td><div class="user-cell"><div class="user-av" style="background:#8B5CF620;color:#8B5CF6">V</div><div><div class="user-name-el">Vikas Patel</div><div class="user-email-el"><a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="8ff9e6e4eefccfe8e2eee6e3a1ece0e2">[email&#160;protected]</a></div></div></div></td>
                  <td style="color:var(--muted);font-size:12px">Mar 5, 2025</td>
                  <td><span class="badge pending">● Pending</span></td>
                  <td style="font-weight:600">0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- ACTIVITY -->
        <div class="card" style="animation-delay:0.3s">
          <div class="card-header">
            <div>
              <div class="card-title">Live Activity</div>
              <div class="card-sub">Real-time platform events</div>
            </div>
            <span style="font-size:11px;color:var(--green);font-weight:600">● Live</span>
          </div>
          <div class="card-body">
            <div class="activity-item">
              <div class="activity-dot green"></div>
              <div>
                <div class="activity-text"><strong>Rahul Sharma</strong> copied Myntra coupon</div>
                <div class="activity-time">2 minutes ago</div>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-dot orange"></div>
              <div>
                <div class="activity-text"><strong>New user</strong> registered — <a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="8efefcebebfae6e7cee9e3efe7e2a0ede1e3">[email&#160;protected]</a></div>
                <div class="activity-time">7 minutes ago</div>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-dot blue"></div>
              <div>
                <div class="activity-text"><strong>Zomato 30% OFF</strong> submitted for review</div>
                <div class="activity-time">15 minutes ago</div>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-dot red"></div>
              <div>
                <div class="activity-text"><strong>Myntra FLAT50</strong> coupon expired</div>
                <div class="activity-time">1 hour ago</div>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-dot green"></div>
              <div>
                <div class="activity-text"><strong>Nykaa coupon</strong> approved by Admin</div>
                <div class="activity-time">2 hours ago</div>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-dot orange"></div>
              <div>
                <div class="activity-text"><strong>Neha Kapoor</strong> subscribed to newsletter</div>
                <div class="activity-time">3 hours ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid-3">
        <!-- SIGNUPS CHART -->
        <div class="card" style="animation-delay:0.35s">
          <div class="card-header">
            <div>
              <div class="card-title">Weekly Signups</div>
              <div class="card-sub">New users this week</div>
            </div>
          </div>
          <div class="card-body">
            <div style="display:flex;align-items:baseline;gap:8px;margin-bottom:16px">
              <span style="font-family:'Syne',sans-serif;font-weight:800;font-size:28px">+184</span>
              <span style="font-size:12px;color:var(--green);font-weight:600">↑ 22% vs last week</span>
            </div>
            <div class="chart-wrap">
              <div class="chart-col"><div class="chart-bar dim" style="height:40px"></div><div class="chart-label">Mon</div></div>
              <div class="chart-col"><div class="chart-bar orange" style="height:65px"></div><div class="chart-label">Tue</div></div>
              <div class="chart-col"><div class="chart-bar dim" style="height:50px"></div><div class="chart-label">Wed</div></div>
              <div class="chart-col"><div class="chart-bar orange" style="height:80px"></div><div class="chart-label">Thu</div></div>
              <div class="chart-col"><div class="chart-bar dim" style="height:55px"></div><div class="chart-label">Fri</div></div>
              <div class="chart-col"><div class="chart-bar orange" style="height:95px"></div><div class="chart-label">Sat</div></div>
              <div class="chart-col"><div class="chart-bar dim" style="height:70px"></div><div class="chart-label">Sun</div></div>
            </div>
          </div>
        </div>

        <!-- CATEGORY BREAKDOWN -->
        <div class="card" style="animation-delay:0.4s">
          <div class="card-header">
            <div class="card-title">Top Categories</div>
          </div>
          <div class="card-body">
            <div class="cat-item"><span class="cat-name">🛍 Shopping</span><div class="cat-bar-wrap"><div class="cat-bar-fill" style="width:78%"></div></div><span class="cat-count">312</span></div>
            <div class="cat-item"><span class="cat-name">🍔 Food</span><div class="cat-bar-wrap"><div class="cat-bar-fill" style="width:65%"></div></div><span class="cat-count">261</span></div>
            <div class="cat-item"><span class="cat-name">👗 Fashion</span><div class="cat-bar-wrap"><div class="cat-bar-fill" style="width:55%"></div></div><span class="cat-count">220</span></div>
            <div class="cat-item"><span class="cat-name">📱 Electronics</span><div class="cat-bar-wrap"><div class="cat-bar-fill" style="width:42%"></div></div><span class="cat-count">169</span></div>
            <div class="cat-item"><span class="cat-name">✈️ Travel</span><div class="cat-bar-wrap"><div class="cat-bar-fill" style="width:30%"></div></div><span class="cat-count">120</span></div>
            <div class="cat-item"><span class="cat-name">💄 Beauty</span><div class="cat-bar-wrap"><div class="cat-bar-fill" style="width:22%"></div></div><span class="cat-count">89</span></div>
          </div>
        </div>

        <!-- TOP BRANDS -->
        <div class="card" style="animation-delay:0.45s">
          <div class="card-header">
            <div class="card-title">Top Brands</div>
            <span class="card-sub">By coupon copies</span>
          </div>
          <div class="card-body">
            <div class="brand-item">
              <div class="brand-rank">1</div>
              <div class="brand-logo2" style="background:#FF6B2B20;color:#FF6B2B">Z</div>
              <div class="brand-info"><div class="brand-nm">Zomato</div><div class="brand-copies">4,812 copies</div></div>
              <div class="brand-pct">18.4%</div>
            </div>
            <div class="brand-item">
              <div class="brand-rank">2</div>
              <div class="brand-logo2" style="background:#E91E6320;color:#E91E63">M</div>
              <div class="brand-info"><div class="brand-nm">Myntra</div><div class="brand-copies">3,981 copies</div></div>
              <div class="brand-pct">15.2%</div>
            </div>
            <div class="brand-item">
              <div class="brand-rank">3</div>
              <div class="brand-logo2" style="background:#22C55E20;color:#22C55E">A</div>
              <div class="brand-info"><div class="brand-nm">Amazon</div><div class="brand-copies">3,540 copies</div></div>
              <div class="brand-pct">13.5%</div>
            </div>
            <div class="brand-item">
              <div class="brand-rank">4</div>
              <div class="brand-logo2" style="background:#3B82F620;color:#3B82F6">N</div>
              <div class="brand-info"><div class="brand-nm">Nykaa</div><div class="brand-copies">2,230 copies</div></div>
              <div class="brand-pct">8.5%</div>
            </div>
            <div class="brand-item">
              <div class="brand-rank">5</div>
              <div class="brand-logo2" style="background:#F59E0B20;color:#F59E0B">F</div>
              <div class="brand-info"><div class="brand-nm">Flipkart</div><div class="brand-copies">2,011 copies</div></div>
              <div class="brand-pct">7.7%</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ===== USERS PAGE ===== -->
    <div id="page-users" style="display:none">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px">
        <div class="tabs">
          <div class="tab active">All (2,847)</div>
          <div class="tab">Active (2,241)</div>
          <div class="tab">Inactive (524)</div>
          <div class="tab">Pending (82)</div>
        </div>
        <button style="background:var(--orange);color:#fff;border:none;padding:9px 18px;border-radius:10px;font-family:'DM Sans',sans-serif;font-weight:600;font-size:13px;cursor:pointer">⬇ Export CSV</button>
      </div>
      <div class="card">
        <div class="card-body" style="padding:0 22px">
          <table class="table">
            <thead>
              <tr>
                <th>#</th><th>User</th><th>Email</th><th>Joined</th><th>Last Active</th><th>Status</th><th>Copies</th><th>Actions</th>
              </tr>
            </thead>
            <tbody id="users-tbody"></tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- ===== COUPONS PAGE ===== -->
    <div id="page-coupons" style="display:none">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
        <div class="tabs">
          <div class="tab active">All</div>
          <div class="tab">Active</div>
          <div class="tab">Expired</div>
          <div class="tab">Pending</div>
        </div>
        <button style="background:var(--orange);color:#fff;border:none;padding:9px 18px;border-radius:10px;font-family:'DM Sans',sans-serif;font-weight:600;font-size:13px;cursor:pointer">+ Add Coupon</button>
      </div>
      <div class="card">
        <div class="card-body" style="padding:0">
          <div style="padding:0 22px" id="coupons-list"></div>
        </div>
      </div>
    </div>

    <!-- ===== PENDING PAGE ===== -->
    <div id="page-pending" style="display:none">
      <div style="background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.2);border-radius:12px;padding:14px 18px;margin-bottom:20px;display:flex;align-items:center;gap:10px">
        <span style="font-size:18px">⚠️</span>
        <div><strong style="font-size:14px">5 coupons</strong> <span style="font-size:13px;color:var(--muted)">are waiting for your review and approval.</span></div>
      </div>
      <div id="pending-list"></div>
    </div>

    <!-- ===== NEWSLETTER PAGE ===== -->
    <div id="page-newsletter" style="display:none">
      <div class="stats-grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:24px">
        <div class="stat-card">
          <div class="stat-header"><div class="stat-icon orange">📧</div><span class="stat-change up">↑ 18%</span></div>
          <div class="stat-value">1,284</div>
          <div class="stat-label">Total Subscribers</div>
        </div>
        <div class="stat-card">
          <div class="stat-header"><div class="stat-icon green">✅</div></div>
          <div class="stat-value">94.2%</div>
          <div class="stat-label">Confirmed Emails</div>
        </div>
        <div class="stat-card">
          <div class="stat-header"><div class="stat-icon blue">📤</div></div>
          <div class="stat-value">42.8%</div>
          <div class="stat-label">Avg. Open Rate</div>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <div class="card-title">Subscriber Emails</div>
          <button style="background:var(--orange);color:#fff;border:none;padding:7px 16px;border-radius:8px;font-family:'DM Sans',sans-serif;font-weight:600;font-size:12px;cursor:pointer">⬇ Export All</button>
        </div>
        <div class="card-body" style="padding:0 22px">
          <table class="table">
            <thead><tr><th>#</th><th>Email</th><th>Subscribed On</th><th>Status</th></tr></thead>
            <tbody id="newsletter-tbody"></tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- ===== OTHER PAGES (placeholder) ===== -->
    <div id="page-analytics" style="display:none">
      <div style="text-align:center;padding:60px 20px;color:var(--muted)">
        <div style="font-size:48px;margin-bottom:16px">📈</div>
        <div style="font-family:'Syne',sans-serif;font-size:20px;font-weight:700;color:var(--text);margin-bottom:8px">Analytics Coming Soon</div>
        <div style="font-size:14px">Detailed charts, funnel analysis, and user behaviour tracking will be here.</div>
      </div>
    </div>
    <div id="page-brands" style="display:none">
      <div style="text-align:center;padding:60px 20px;color:var(--muted)">
        <div style="font-size:48px;margin-bottom:16px">🏷️</div>
        <div style="font-family:'Syne',sans-serif;font-size:20px;font-weight:700;color:var(--text);margin-bottom:8px">Brand Manager</div>
        <div style="font-size:14px">Add, edit and manage all brand partnerships from here.</div>
      </div>
    </div>
    <div id="page-categories" style="display:none">
      <div style="text-align:center;padding:60px 20px;color:var(--muted)">
        <div style="font-size:48px;margin-bottom:16px">📂</div>
        <div style="font-family:'Syne',sans-serif;font-size:20px;font-weight:700;color:var(--text);margin-bottom:8px">Category Manager</div>
        <div style="font-size:14px">Add, rename, or delete coupon categories.</div>
      </div>
    </div>
    <div id="page-settings" style="display:none">
      <div style="text-align:center;padding:60px 20px;color:var(--muted)">
        <div style="font-size:48px;margin-bottom:16px">⚙️</div>
        <div style="font-family:'Syne',sans-serif;font-size:20px;font-weight:700;color:var(--text);margin-bottom:8px">Settings</div>
        <div style="font-size:14px">Site configuration, admin roles, and API keys.</div>
      </div>
    </div>
    <div id="page-logs" style="display:none">
      <div style="text-align:center;padding:60px 20px;color:var(--muted)">
        <div style="font-size:48px;margin-bottom:16px">🗒️</div>
        <div style="font-family:'Syne',sans-serif;font-size:20px;font-weight:700;color:var(--text);margin-bottom:8px">System Logs</div>
        <div style="font-size:14px">Audit trail of all admin actions and system events.</div>
      </div>
    </div>

  </div>
</main>

<script>
  // ── Supabase Config ──
  const SUPABASE_URL = 'https://adpejjieppqtzmydtdxf.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkcGVqamllcHBxdHpteWR0ZHhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4OTIwMzAsImV4cCI6MjA4ODQ2ODAzMH0.gqsRTRXwbyO6F3BHEi7eheDRu99SpEvnq2Q3kAJEkkA';

  async function sb(table, options = {}) {
    let url = `${SUPABASE_URL}/rest/v1/${table}?`;
    if (options.select) url += `select=${options.select}&`;
    if (options.filter) url += `${options.filter}&`;
    if (options.order) url += `order=${options.order}&`;
    if (options.limit) url += `limit=${options.limit}&`;
    const res = await fetch(url, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    return res.json();
  }

  async function sbUpdate(table, id, data) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
      method: 'PATCH',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(data)
    });
    return res.json();
  }

  async function sbDelete(table, id) {
    await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
      method: 'DELETE',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    });
  }

  // ── Helpers ──
  const colors = ['#FF6B2B','#3B82F6','#22C55E','#F59E0B','#8B5CF6','#EC4899','#14B8A6','#F97316'];
  function colorFor(str) { let h=0; for(let c of (str||'')) h=c.charCodeAt(0)+((h<<5)-h); return colors[Math.abs(h)%colors.length]; }
  function fmtDate(d) { if(!d) return '—'; return new Date(d).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}); }
  function timeAgo(d) {
    if(!d) return 'Never';
    const s = Math.floor((Date.now() - new Date(d))/1000);
    if(s<60) return 'Just now';
    if(s<3600) return Math.floor(s/60)+' min ago';
    if(s<86400) return Math.floor(s/3600)+' hrs ago';
    return Math.floor(s/86400)+' days ago';
  }
  function loading(el) { if(el) el.innerHTML = `<tr><td colspan="10" style="text-align:center;padding:40px;color:var(--muted)">Loading...</td></tr>`; }
  function noData(el, msg='No data found') { if(el) el.innerHTML = `<tr><td colspan="10" style="text-align:center;padding:40px;color:var(--muted)">${msg}</td></tr>`; }

  // ── Navigation ──
  const pages = ['dashboard','users','coupons','pending','newsletter','analytics','brands','categories','settings','logs'];
  const pageTitles = {
    dashboard: ['Dashboard','Welcome back — here\'s what\'s happening'],
    users: ['Users','Manage all registered users'],
    coupons: ['Coupons','Manage all coupons on the platform'],
    pending: ['Pending Approvals','Review user-submitted coupons'],
    newsletter: ['Newsletter','Manage email subscribers'],
    analytics: ['Analytics','Platform performance overview'],
    brands: ['Brands','Manage brand partnerships'],
    categories: ['Categories','Manage coupon categories'],
    settings: ['Settings','Platform configuration'],
    logs: ['System Logs','Audit trail'],
  };

  function setPage(page, navEl) {
    pages.forEach(p => {
      const el = document.getElementById('page-' + p);
      if (el) el.style.display = p === page ? '' : 'none';
    });
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    if (navEl) navEl.classList.add('active');
    document.getElementById('page-title').textContent = pageTitles[page][0];
    document.getElementById('page-sub').textContent = pageTitles[page][1];
    if (page === 'dashboard') loadDashboard();
    if (page === 'users') renderUsers();
    if (page === 'coupons') renderCoupons();
    if (page === 'pending') renderPending();
    if (page === 'newsletter') renderNewsletter();
  }

  // ── DASHBOARD ──
  async function loadDashboard() {
    try {
      const [users, coupons, newsletter] = await Promise.all([
        sb('users', { select: 'count', filter: 'select=count' }),
        sb('coupons', { select: 'count', filter: 'select=count' }),
        sb('newsletter', { select: 'count', filter: 'select=count' }),
      ]);

      // Fetch actual counts via head request
      const countFetch = async (table, filter='') => {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=id${filter ? '&'+filter : ''}`, {
          headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Prefer': 'count=exact', 'Range': '0-0' }
        });
        return parseInt(res.headers.get('content-range')?.split('/')[1] || '0');
      };

      const [totalUsers, totalCoupons, pendingCount, subscriberCount] = await Promise.all([
        countFetch('users'),
        countFetch('coupons', 'status=eq.active'),
        countFetch('coupons', 'status=eq.pending'),
        countFetch('newsletter'),
      ]);

      document.querySelectorAll('.stat-value')[0].textContent = totalUsers.toLocaleString();
      document.querySelectorAll('.stat-value')[1].textContent = totalCoupons.toLocaleString();
      document.querySelectorAll('.stat-value')[3].textContent = pendingCount;

      // Update pending badge in sidebar
      document.querySelectorAll('.nav-badge')[1].textContent = pendingCount;

      // Load recent users for dashboard table
      const recentUsers = await sb('users', { select: '*', order: 'created_at.desc', limit: 5 });
      if (Array.isArray(recentUsers) && recentUsers.length > 0) {
        document.querySelector('.table tbody').innerHTML = recentUsers.map((u,i) => {
          const col = colorFor(u.name || u.email);
          const initial = (u.name || u.email || '?')[0].toUpperCase();
          return `<tr>
            <td><div class="user-cell"><div class="user-av" style="background:${col}20;color:${col}">${initial}</div>
            <div><div class="user-name-el">${u.name || 'Unknown'}</div><div class="user-email-el">${u.email}</div></div></div></td>
            <td style="color:var(--muted);font-size:12px">${fmtDate(u.created_at)}</td>
            <td><span class="badge ${u.status || 'active'}">● ${(u.status||'active').charAt(0).toUpperCase()+(u.status||'active').slice(1)}</span></td>
            <td style="font-weight:600">${u.coupon_copies || 0}</td>
          </tr>`;
        }).join('');
      }
    } catch(e) {
      console.warn('Dashboard load error:', e);
    }
  }

  // ── USERS ──
  async function renderUsers() {
    const tbody = document.getElementById('users-tbody');
    loading(tbody);
    try {
      const data = await sb('users', { select: '*', order: 'created_at.desc' });
      if (!Array.isArray(data) || data.length === 0) { noData(tbody, 'No users found. Make sure your table is named "users".'); return; }
      tbody.innerHTML = data.map((u,i) => {
        const col = colorFor(u.name || u.email);
        const initial = (u.name || u.email || '?')[0].toUpperCase();
        const status = u.status || 'active';
        return `<tr>
          <td style="color:var(--muted);font-size:12px">${i+1}</td>
          <td><div class="user-cell"><div class="user-av" style="background:${col}20;color:${col}">${initial}</div>
          <div><div class="user-name-el">${u.name || '—'}</div></div></div></td>
          <td style="font-size:12px;color:var(--muted)">${u.email || '—'}</td>
          <td style="font-size:12px;color:var(--muted)">${fmtDate(u.created_at)}</td>
          <td style="font-size:12px;color:var(--muted)">${timeAgo(u.last_active || u.updated_at)}</td>
          <td><span class="badge ${status}">● ${status.charAt(0).toUpperCase()+status.slice(1)}</span></td>
          <td style="font-weight:600">${u.coupon_copies || 0}</td>
          <td><div style="display:flex;gap:6px">
            <button class="btn-sm btn-edit">View</button>
            <button class="btn-sm btn-reject" onclick="blockUser('${u.id}', this)">Block</button>
          </div></td>
        </tr>`;
      }).join('');
    } catch(e) { noData(tbody, 'Error loading users: ' + e.message); }
  }

  async function blockUser(id, btn) {
    if (!confirm('Block this user?')) return;
    await sbUpdate('users', id, { status: 'blocked' });
    btn.closest('tr').querySelector('.badge').textContent = '● Blocked';
    btn.closest('tr').querySelector('.badge').className = 'badge inactive';
    btn.textContent = 'Blocked';
    btn.disabled = true;
  }

  // ── COUPONS ──
  async function renderCoupons() {
    const list = document.getElementById('coupons-list');
    list.innerHTML = '<div style="text-align:center;padding:40px;color:var(--muted)">Loading...</div>';
    try {
      const data = await sb('coupons', { select: '*', order: 'created_at.desc' });
      if (!Array.isArray(data) || data.length === 0) { list.innerHTML = '<div style="text-align:center;padding:40px;color:var(--muted)">No coupons found. Make sure your table is named "coupons".</div>'; return; }
      list.innerHTML = data.map(c => {
        const col = colorFor(c.brand);
        const initial = (c.brand || '?')[0].toUpperCase();
        const status = c.status || 'active';
        return `<div class="coupon-row">
          <div class="coupon-brand">
            <div class="coupon-logo" style="background:${col}20;color:${col}">${initial}</div>
            <div><div class="coupon-name">${c.brand || '—'}</div><div class="coupon-cat">${c.category || '—'} · Expires ${fmtDate(c.expires_at)}</div></div>
          </div>
          <div style="font-size:12px;color:var(--muted);max-width:200px">${c.description || '—'}</div>
          <div class="coupon-code">${c.code || '—'}</div>
          <div style="font-size:13px;color:var(--muted)">${(c.copies||0).toLocaleString()} copies</div>
          <span class="badge ${status === 'active' ? 'approved' : status === 'pending' ? 'pending' : 'expired'}">● ${status}</span>
          <div class="coupon-actions">
            <button class="btn-sm btn-edit">Edit</button>
            <button class="btn-sm btn-reject" onclick="deleteCoupon('${c.id}', this)">Delete</button>
          </div>
        </div>`;
      }).join('');
    } catch(e) { list.innerHTML = '<div style="text-align:center;padding:40px;color:var(--red)">Error: ' + e.message + '</div>'; }
  }

  async function deleteCoupon(id, btn) {
    if (!confirm('Delete this coupon permanently?')) return;
    await sbDelete('coupons', id);
    btn.closest('.coupon-row').style.opacity = '0';
    setTimeout(() => btn.closest('.coupon-row').remove(), 400);
  }

  // ── PENDING ──
  async function renderPending() {
    const list = document.getElementById('pending-list');
    list.innerHTML = '<div style="text-align:center;padding:40px;color:var(--muted)">Loading...</div>';
    try {
      const data = await sb('coupons', { select: '*', filter: 'status=eq.pending', order: 'created_at.desc' });
      if (!Array.isArray(data) || data.length === 0) {
        list.innerHTML = '<div style="text-align:center;padding:60px;color:var(--muted)"><div style="font-size:40px;margin-bottom:12px">✅</div><div style="font-size:16px;font-weight:600;color:var(--text)">All clear!</div><div style="font-size:13px;margin-top:4px">No pending coupons to review.</div></div>';
        return;
      }
      // Update warning count
      document.querySelector('#page-pending .pending-card-count, #page-pending strong')?.textContent = data.length + ' coupons';
      list.innerHTML = data.map(p => {
        const col = colorFor(p.brand);
        const initial = (p.brand || '?')[0].toUpperCase();
        return `<div class="pending-card" data-id="${p.id}">
          <div class="pending-logo" style="background:${col}20;color:${col}">${initial}</div>
          <div class="pending-info">
            <div class="pending-brand">${p.brand || '—'} <span style="font-size:11px;background:var(--bg3);padding:2px 8px;border-radius:5px;color:var(--muted);margin-left:6px;font-weight:400">${p.category || '—'}</span></div>
            <div class="pending-desc">${p.description || '—'}</div>
            <div class="pending-meta">Code: <span>${p.code || '—'}</span> &nbsp;·&nbsp; Submitted: <span>${fmtDate(p.created_at)}</span></div>
          </div>
          <div class="pending-actions">
            <button class="btn-sm btn-approve" onclick="approvePending('${p.id}', this)">✓ Approve</button>
            <button class="btn-sm btn-reject" onclick="rejectPending('${p.id}', this)">✗ Reject</button>
          </div>
        </div>`;
      }).join('');
    } catch(e) { list.innerHTML = '<div style="color:var(--red);padding:20px">Error: ' + e.message + '</div>'; }
  }

  async function approvePending(id, btn) {
    await sbUpdate('coupons', id, { status: 'active' });
    const card = btn.closest('.pending-card');
    card.style.borderColor = 'var(--green)'; card.style.opacity = '0.5';
    setTimeout(() => card.remove(), 500);
  }

  async function rejectPending(id, btn) {
    if (!confirm('Reject and delete this coupon?')) return;
    await sbDelete('coupons', id);
    const card = btn.closest('.pending-card');
    card.style.borderColor = 'var(--red)'; card.style.opacity = '0.5';
    setTimeout(() => card.remove(), 500);
  }

  // ── NEWSLETTER ──
  async function renderNewsletter() {
    const tbody = document.getElementById('newsletter-tbody');
    loading(tbody);
    try {
      const data = await sb('newsletter', { select: '*', order: 'subscribed_at.desc,created_at.desc' });
      if (!Array.isArray(data) || data.length === 0) { noData(tbody, 'No subscribers yet. Make sure your table is named "newsletter".'); return; }

      // Update subscriber count stat
      document.querySelectorAll('#page-newsletter .stat-value')[0].textContent = data.length.toLocaleString();
      const confirmed = data.filter(s => s.confirmed !== false).length;
      document.querySelectorAll('#page-newsletter .stat-value')[1].textContent = ((confirmed/data.length)*100).toFixed(1) + '%';

      tbody.innerHTML = data.map((s,i) => {
        const status = s.confirmed === false ? 'unconfirmed' : 'confirmed';
        return `<tr>
          <td style="color:var(--muted);font-size:12px">${i+1}</td>
          <td style="font-size:13px;font-weight:500">${s.email}</td>
          <td style="font-size:12px;color:var(--muted)">${fmtDate(s.subscribed_at || s.created_at)}</td>
          <td><span class="badge ${status === 'confirmed' ? 'approved' : 'pending'}">● ${status}</span></td>
        </tr>`;
      }).join('');
    } catch(e) { noData(tbody, 'Error: ' + e.message); }
  }

  // ── INIT ──
  window.addEventListener('DOMContentLoaded', () => loadDashboard());

</script>
</body>
</html>