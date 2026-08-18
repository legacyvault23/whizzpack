import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import PortalLayout, { StageBadge, STAGE_COLORS } from '../../components/portal/PortalLayout';

const API = (path, opts) => fetch(`/api/wp-crm/proxy/${path}`, { headers: { 'Content-Type': 'application/json' }, ...opts });

function fmt(n) { return n?.toLocaleString() ?? '0'; }
function fmtDate(d) { return d ? new Date(d).toLocaleDateString('en-GB', { day:'numeric', month:'short' }) : '-'; }

const STAGE_ORDER = ['NEW','CONTACTED','INTERESTED','SAMPLE_REQUESTED','SAMPLE_SENT','QUOTED','NEGOTIATING','WON','LOST','NURTURE'];
const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const CHART_CDN = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';

export default function Dashboard() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const lineRef = useRef(null);
  const donutRef = useRef(null);
  const barRef = useRef(null);
  const chartsRef = useRef({});

  useEffect(() => {
    API('dashboard').then(r => r.ok ? r.json() : Promise.reject()).then(d => { setData(d); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!data) return;
    function initCharts() {
      const Chart = window.Chart;
      if (!Chart) return;
      Object.values(chartsRef.current).forEach(c => c?.destroy());

      const navy = '#0F1F4B', orange = '#F05A28', green = '#1A6B3A';
      const gridColor = 'rgba(0,0,0,0.05)';

      // Line chart — monthly leads
      if (lineRef.current) {
        chartsRef.current.line = new Chart(lineRef.current, {
          type: 'line',
          data: {
            labels: data.monthly.map(m => MONTH_NAMES[parseInt(m.month.slice(5)) - 1]),
            datasets: [{ label: 'Leads', data: data.monthly.map(m => m.count), borderColor: orange, backgroundColor: 'rgba(240,90,40,0.08)', tension: 0.4, pointBackgroundColor: orange, pointRadius: 5, pointHoverRadius: 7, fill: true }],
          },
          options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { backgroundColor: navy, padding: 10, cornerRadius: 8 } }, scales: { x: { grid: { color: gridColor }, ticks: { color: '#6B7280', font: { size: 12 } } }, y: { grid: { color: gridColor }, ticks: { color: '#6B7280', stepSize: 1, font: { size: 12 } }, beginAtZero: true } } },
        });
      }

      // Donut chart — product breakdown
      if (donutRef.current && data.byProduct.length) {
        const COLORS = ['#F05A28', '#0F1F4B', '#1A6B3A', '#6366F1'];
        const labels = { COTTON_BAGS: 'Cotton Bags', CORRUGATED_BOXES: 'Corrugated Boxes', BOTH: 'Both', OTHER: 'Other' };
        chartsRef.current.donut = new Chart(donutRef.current, {
          type: 'doughnut',
          data: {
            labels: data.byProduct.map(p => labels[p.productInterest] || p.productInterest),
            datasets: [{ data: data.byProduct.map(p => p._count.id), backgroundColor: COLORS, borderWidth: 0, hoverOffset: 6 }],
          },
          options: { responsive: true, maintainAspectRatio: false, cutout: '68%', plugins: { legend: { position: 'bottom', labels: { padding: 14, boxWidth: 12, color: '#374151', font: { size: 12 } } }, tooltip: { backgroundColor: navy, padding: 10, cornerRadius: 8 } } },
        });
      }

      // Bar chart — stage pipeline
      if (barRef.current && data.byStage.length) {
        const stageMap = Object.fromEntries(data.byStage.map(s => [s.stage, s._count.id]));
        const activeStages = STAGE_ORDER.filter(s => stageMap[s]);
        chartsRef.current.bar = new Chart(barRef.current, {
          type: 'bar',
          data: {
            labels: activeStages.map(s => s.replace(/_/g, ' ')),
            datasets: [{ data: activeStages.map(s => stageMap[s] || 0), backgroundColor: activeStages.map(s => STAGE_COLORS[s]?.dot || orange), borderRadius: 6, borderSkipped: false }],
          },
          options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { backgroundColor: navy, padding: 10, cornerRadius: 8 } }, scales: { x: { grid: { display: false }, ticks: { color: '#6B7280', font: { size: 11 }, maxRotation: 30 } }, y: { grid: { color: gridColor }, ticks: { stepSize: 1, color: '#6B7280' }, beginAtZero: true } } },
        });
      }
    }

    if (window.Chart) { initCharts(); return; }
    const script = document.createElement('script');
    script.src = CHART_CDN;
    script.onload = initCharts;
    document.head.appendChild(script);
    return () => { Object.values(chartsRef.current).forEach(c => c?.destroy()); };
  }, [data]);

  const stats = [
    { label: 'Total Leads', value: fmt(data?.total), icon: '👥', color: 'orange' },
    { label: 'New This Month', value: fmt(data?.newThisMonth), icon: '🆕', color: 'blue' },
    { label: 'Active Pipeline', value: fmt(data?.activeLeads), icon: '⚡', color: 'navy' },
    { label: 'Won', value: fmt(data?.wonTotal), icon: '🏆', color: 'green' },
  ];

  return (
    <PortalLayout title="Dashboard">
      <div className="portal-header anim">
        <div>
          <div className="portal-title">Dashboard</div>
          <div className="portal-subtitle">Overview of your Whizzpack leads pipeline</div>
        </div>
        <button className="btn-primary" onClick={() => router.push('/portal/leads')}>
          View all leads →
        </button>
      </div>

      <div className="stat-grid">
        {stats.map((s, i) => (
          <div key={s.label} className={`stat-card ${s.color} anim anim-${i+1}`}>
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-value">{loading ? '—' : s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="chart-grid anim anim-3">
        <div className="card">
          <div className="chart-title">Leads over last 6 months</div>
          <div style={{ height: 220, position: 'relative' }}>
            <canvas ref={lineRef} />
          </div>
        </div>
        <div className="card">
          <div className="chart-title">Product breakdown</div>
          <div style={{ height: 220, position: 'relative' }}>
            {data?.byProduct?.length ? <canvas ref={donutRef} /> : <div className="empty-state" style={{padding:40}}>No data yet</div>}
          </div>
        </div>
      </div>

      <div className="chart-grid anim anim-4" style={{ gridTemplateColumns: '1fr 1.4fr' }}>
        <div className="card">
          <div className="chart-title">Pipeline by stage</div>
          <div style={{ height: 220, position: 'relative' }}>
            {data?.byStage?.length ? <canvas ref={barRef} /> : <div className="empty-state" style={{padding:40}}>No data yet</div>}
          </div>
        </div>
        <div className="card">
          <div className="chart-title">Recent leads</div>
          <table className="data-table">
            <thead>
              <tr><th>Name</th><th>Product</th><th>Stage</th><th>Date</th></tr>
            </thead>
            <tbody>
              {loading && [1,2,3,4].map(i => (
                <tr key={i} className="loading-row"><td>Loading...</td><td>—</td><td>—</td><td>—</td></tr>
              ))}
              {data?.recentLeads?.map(lead => (
                <tr key={lead.id} onClick={() => router.push(`/portal/leads/${lead.id}`)}>
                  <td>
                    <div className="td-name">{lead.contactName}</div>
                    <div className="td-sub">{lead.companyName || lead.country || ''}</div>
                  </td>
                  <td style={{ fontSize: 12, color: '#6B7280' }}>{lead.productInterest?.replace(/_/g,' ') || '—'}</td>
                  <td><StageBadge stage={lead.stage} /></td>
                  <td style={{ fontSize: 12, color: '#9CA3AF' }}>{fmtDate(lead.createdAt)}</td>
                </tr>
              ))}
              {!loading && !data?.recentLeads?.length && (
                <tr><td colSpan={4} style={{ textAlign: 'center', color: '#9CA3AF', padding: 32 }}>No leads yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </PortalLayout>
  );
}
