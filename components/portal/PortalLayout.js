import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const NAV = [
  { href: '/portal/dashboard', label: 'Dashboard', icon: (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
  )},
  { href: '/portal/leads', label: 'Leads', icon: (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/><path d="M21 21v-2a4 4 0 0 0-3-3.87"/></svg>
  )},
];

export const STAGE_COLORS = {
  NEW: { bg: '#EFF6FF', text: '#1D4ED8', dot: '#3B82F6' },
  CONTACTED: { bg: '#FFFBEB', text: '#92400E', dot: '#F59E0B' },
  INTERESTED: { bg: '#F0FDF4', text: '#166534', dot: '#22C55E' },
  SAMPLE_REQUESTED: { bg: '#F5F3FF', text: '#5B21B6', dot: '#8B5CF6' },
  SAMPLE_SENT: { bg: '#EEF2FF', text: '#3730A3', dot: '#6366F1' },
  QUOTED: { bg: '#FDF4FF', text: '#86198F', dot: '#D946EF' },
  NEGOTIATING: { bg: '#FFF7ED', text: '#9A3412', dot: '#F05A28' },
  WON: { bg: '#ECFDF5', text: '#065F46', dot: '#10B981' },
  LOST: { bg: '#FEF2F2', text: '#991B1B', dot: '#EF4444' },
  NURTURE: { bg: '#F8FAFC', text: '#475569', dot: '#94A3B8' },
};

export const PRODUCT_LABELS = {
  COTTON_BAGS: 'Cotton Bags',
  CORRUGATED_BOXES: 'Corrugated Boxes',
  BOTH: 'Both',
  OTHER: 'Other',
};

export function StageBadge({ stage }) {
  const s = STAGE_COLORS[stage] || STAGE_COLORS.NEW;
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:5, background:s.bg, color:s.text, padding:'3px 10px', borderRadius:20, fontSize:11, fontWeight:700, letterSpacing:'0.4px', textTransform:'uppercase' }}>
      <span style={{ width:6, height:6, borderRadius:'50%', background:s.dot, flexShrink:0 }} />
      {stage?.replace(/_/g,' ')}
    </span>
  );
}

export function ProductBadge({ product }) {
  return (
    <span style={{ display:'inline-flex', alignItems:'center', background:'#FFF7ED', color:'#9A3412', padding:'3px 10px', borderRadius:20, fontSize:11, fontWeight:700, letterSpacing:'0.4px' }}>
      {PRODUCT_LABELS[product] || product}
    </span>
  );
}

export default function PortalLayout({ children, title = 'CRM' }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/wp-crm/logout', { method: 'POST' });
    router.push('/portal/login');
  }

  return (
    <>
      <Head>
        <title>{title} · Whizzpack CRM</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="portal-root">
        <aside className="sidebar">
          <div className="sidebar-logo">
            <div className="logo-text">WHI<span className="logo-zz">ZZ</span>PACK</div>
            <div className="logo-crm">CRM</div>
          </div>
          <nav className="sidebar-nav">
            {NAV.map(item => (
              <Link key={item.href} href={item.href} className={`nav-item ${router.pathname.startsWith(item.href) ? 'active' : ''}`}>
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="sidebar-footer">
            <button onClick={handleLogout} className="logout-btn">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Sign out
            </button>
          </div>
        </aside>
        <main className="portal-main">{children}</main>
      </div>
      <style jsx global>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #F1F4FB; color: #1A1A2E; }
        a { text-decoration: none; color: inherit; }

        .portal-root { display: flex; min-height: 100vh; }

        /* ── Sidebar ── */
        .sidebar { width: 240px; min-height: 100vh; background: #0F1F4B; display: flex; flex-direction: column; position: fixed; top: 0; left: 0; z-index: 100; }
        .sidebar-logo { padding: 24px 20px 20px; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .logo-text { font-size: 18px; font-weight: 900; color: #fff; letter-spacing: 0.5px; line-height: 1; }
        .logo-zz { color: #F05A28; }
        .logo-crm { font-size: 10px; color: rgba(255,255,255,0.4); letter-spacing: 3px; text-transform: uppercase; margin-top: 4px; }
        .sidebar-nav { flex: 1; padding: 12px 0; }
        .nav-item { display: flex; align-items: center; gap: 10px; padding: 11px 20px; color: rgba(255,255,255,0.55); font-size: 14px; font-weight: 500; transition: all 0.15s ease; border-left: 3px solid transparent; cursor: pointer; }
        .nav-item:hover { color: #fff; background: rgba(255,255,255,0.06); border-left-color: rgba(240,90,40,0.4); }
        .nav-item.active { color: #fff; background: rgba(240,90,40,0.13); border-left-color: #F05A28; }
        .nav-icon { display: flex; align-items: center; opacity: 0.85; }
        .nav-item.active .nav-icon, .nav-item:hover .nav-icon { opacity: 1; }
        .sidebar-footer { padding: 16px 20px; border-top: 1px solid rgba(255,255,255,0.08); }
        .logout-btn { display: flex; align-items: center; gap: 8px; color: rgba(255,255,255,0.45); font-size: 13px; font-weight: 500; background: none; border: none; cursor: pointer; transition: color 0.15s; padding: 0; }
        .logout-btn:hover { color: #F05A28; }

        /* ── Main ── */
        .portal-main { margin-left: 240px; flex: 1; padding: 32px 36px; max-width: 100%; }
        .portal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; animation: fadeUp 0.3s ease both; }
        .portal-title { font-size: 22px; font-weight: 800; color: #0F1F4B; }
        .portal-subtitle { font-size: 13px; color: #6B7280; margin-top: 3px; }

        /* ── Cards ── */
        .card { background: #fff; border-radius: 14px; padding: 24px; box-shadow: 0 1px 3px rgba(15,31,75,0.07), 0 4px 16px rgba(15,31,75,0.04); }

        /* ── Stat cards ── */
        .stat-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; margin-bottom: 20px; }
        .stat-card { background: #fff; border-radius: 14px; padding: 20px 22px; box-shadow: 0 1px 3px rgba(15,31,75,0.07); border-top: 3px solid; transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .stat-card:hover { transform: translateY(-2px); box-shadow: 0 4px 16px rgba(15,31,75,0.1); }
        .stat-card.orange { border-top-color: #F05A28; }
        .stat-card.navy { border-top-color: #0F1F4B; }
        .stat-card.green { border-top-color: #1A6B3A; }
        .stat-card.blue { border-top-color: #3B82F6; }
        .stat-icon { font-size: 20px; margin-bottom: 12px; }
        .stat-value { font-size: 34px; font-weight: 800; color: #0F1F4B; line-height: 1; }
        .stat-label { font-size: 12px; color: #6B7280; margin-top: 6px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.6px; }

        /* ── Charts ── */
        .chart-grid { display: grid; grid-template-columns: 1.7fr 1fr; gap: 16px; margin-bottom: 20px; }
        .chart-title { font-size: 14px; font-weight: 700; color: #0F1F4B; margin-bottom: 18px; }

        /* ── Table ── */
        .data-table { width: 100%; border-collapse: collapse; }
        .data-table th { font-size: 11px; font-weight: 700; color: #9CA3AF; text-transform: uppercase; letter-spacing: 0.8px; padding: 0 16px 12px; text-align: left; border-bottom: 1px solid #F3F4F6; }
        .data-table td { padding: 13px 16px; border-bottom: 1px solid #F9FAFB; font-size: 13.5px; color: #374151; vertical-align: middle; }
        .data-table tr:last-child td { border-bottom: none; }
        .data-table tbody tr { transition: background 0.1s; cursor: pointer; }
        .data-table tbody tr:hover td { background: #F9FAFB; }
        .td-name { font-weight: 600; color: #0F1F4B; }
        .td-sub { font-size: 12px; color: #9CA3AF; margin-top: 2px; }

        /* ── Search & filters ── */
        .search-bar { display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; }
        .search-input { flex: 1; min-width: 200px; padding: 10px 14px; border: 1.5px solid #E5E7EB; border-radius: 10px; font-size: 14px; outline: none; transition: border-color 0.15s; background: #fff; }
        .search-input:focus { border-color: #F05A28; }
        .filter-select { padding: 10px 14px; border: 1.5px solid #E5E7EB; border-radius: 10px; font-size: 13px; outline: none; background: #fff; cursor: pointer; color: #374151; }
        .filter-select:focus { border-color: #F05A28; }

        /* ── Buttons ── */
        .btn-primary { background: #F05A28; color: #fff; border: none; padding: 10px 20px; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; transition: background 0.15s, transform 0.1s; display: inline-flex; align-items: center; gap: 6px; }
        .btn-primary:hover { background: #d44d20; }
        .btn-primary:active { transform: scale(0.98); }
        .btn-secondary { background: #fff; color: #0F1F4B; border: 1.5px solid #E5E7EB; padding: 9px 18px; border-radius: 10px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.15s; }
        .btn-secondary:hover { border-color: #0F1F4B; }

        /* ── Lead detail ── */
        .detail-grid { display: grid; grid-template-columns: 1fr 340px; gap: 20px; }
        .info-row { display: flex; gap: 0; margin-bottom: 0; }
        .info-label { font-size: 12px; color: #9CA3AF; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; min-width: 130px; padding: 12px 0; }
        .info-value { font-size: 14px; color: #1A1A2E; padding: 12px 0; border-bottom: 1px solid #F3F4F6; flex: 1; }
        .info-row:last-child .info-value { border-bottom: none; }
        .textarea-notes { width: 100%; min-height: 120px; padding: 12px; border: 1.5px solid #E5E7EB; border-radius: 10px; font-size: 14px; font-family: inherit; outline: none; resize: vertical; transition: border-color 0.15s; color: #1A1A2E; }
        .textarea-notes:focus { border-color: #F05A28; }
        .stage-select { width: 100%; padding: 11px 14px; border: 1.5px solid #E5E7EB; border-radius: 10px; font-size: 14px; font-weight: 600; outline: none; background: #fff; cursor: pointer; color: #0F1F4B; transition: border-color 0.15s; }
        .stage-select:focus { border-color: #F05A28; }
        .activity-item { display: flex; gap: 12px; padding: 12px 0; border-bottom: 1px solid #F3F4F6; }
        .activity-item:last-child { border-bottom: none; }
        .activity-dot { width: 8px; height: 8px; border-radius: 50%; background: #F05A28; flex-shrink: 0; margin-top: 5px; }
        .activity-text { font-size: 13px; color: #374151; }
        .activity-time { font-size: 11px; color: #9CA3AF; margin-top: 3px; }

        /* ── Pipeline bar ── */
        .pipeline-bar { display: flex; height: 8px; border-radius: 6px; overflow: hidden; gap: 2px; margin: 10px 0 16px; }

        /* ── Animations ── */
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        .anim { animation: fadeUp 0.35s ease both; }
        .anim-1 { animation-delay: 0.05s; }
        .anim-2 { animation-delay: 0.1s; }
        .anim-3 { animation-delay: 0.15s; }
        .anim-4 { animation-delay: 0.2s; }
        .anim-5 { animation-delay: 0.25s; }

        /* ── Pagination ── */
        .pagination { display: flex; align-items: center; gap: 8px; margin-top: 20px; justify-content: flex-end; }
        .page-btn { padding: 7px 13px; border: 1.5px solid #E5E7EB; border-radius: 8px; font-size: 13px; font-weight: 600; background: #fff; color: #374151; cursor: pointer; transition: all 0.1s; }
        .page-btn:hover { border-color: #F05A28; color: #F05A28; }
        .page-btn.active { background: #F05A28; color: #fff; border-color: #F05A28; }
        .page-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        /* ── Empty state ── */
        .empty-state { text-align: center; padding: 60px 20px; color: #9CA3AF; }
        .empty-state svg { margin: 0 auto 16px; opacity: 0.3; }
        .empty-state h3 { font-size: 15px; font-weight: 600; color: #6B7280; margin-bottom: 6px; }

        /* ── Loading ── */
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .loading-row td { animation: pulse 1.4s ease infinite; background: #F3F4F6; color: transparent; border-radius: 4px; }

        /* ── Cursor (override globals.css cursor:none) ── */
        .portal-root * { cursor: auto; }
        .portal-root button, .portal-root a, .portal-root select, .portal-root .data-table tbody tr, .portal-root .page-btn, .portal-root .nav-item, .portal-root .logout-btn, .portal-root .stat-card { cursor: pointer; }
        .portal-root input, .portal-root textarea { cursor: text; }
        .portal-root input[type="number"] { cursor: text; }

        /* ── Responsive ── */
        @media (max-width: 1100px) { .stat-grid { grid-template-columns: repeat(2,1fr); } .chart-grid { grid-template-columns: 1fr; } }
        @media (max-width: 900px) { .detail-grid { grid-template-columns: 1fr; } }
      `}</style>
    </>
  );
}
