import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import PortalLayout, { StageBadge, ProductBadge } from '../../components/portal/PortalLayout';

const API = (path, opts) => fetch(`/api/wp-crm/proxy/${path}`, { headers: { 'Content-Type': 'application/json' }, ...opts });

function fmtDate(d) { return d ? new Date(d).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' }) : '—'; }

const STAGES = ['ALL','NEW','CONTACTED','INTERESTED','SAMPLE_REQUESTED','SAMPLE_SENT','QUOTED','NEGOTIATING','WON','LOST','NURTURE'];
const PRODUCTS = ['ALL','COTTON_BAGS','CORRUGATED_BOXES','BOTH','OTHER'];
const PRODUCT_LABELS = { ALL:'All Products', COTTON_BAGS:'Cotton Bags', CORRUGATED_BOXES:'Corrugated Boxes', BOTH:'Both', OTHER:'Other' };

export default function Leads() {
  const router = useRouter();
  const [leads, setLeads] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [stage, setStage] = useState('ALL');
  const [product, setProduct] = useState('ALL');
  const [searchInput, setSearchInput] = useState('');

  const fetchLeads = useCallback(async (s = search, st = stage, pr = product, pg = page) => {
    setLoading(true);
    const params = new URLSearchParams({ page: pg, limit: 30 });
    if (s) params.append('search', s);
    if (st !== 'ALL') params.append('stage', st);
    if (pr !== 'ALL') params.append('product', pr);
    try {
      const res = await API(`leads?${params}`);
      const d = await res.json();
      setLeads(d.leads || []);
      setTotal(d.total || 0);
      setPages(d.pages || 1);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchLeads(search, stage, product, page); }, [stage, product, page]);

  function handleSearch(e) {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
    fetchLeads(searchInput, stage, product, 1);
  }

  function changeStage(s) { setStage(s); setPage(1); }
  function changeProduct(p) { setProduct(p); setPage(1); }

  return (
    <PortalLayout title="Leads">
      <div className="portal-header anim">
        <div>
          <div className="portal-title">Leads</div>
          <div className="portal-subtitle">{total} total leads in your pipeline</div>
        </div>
      </div>

      <div className="card anim anim-1">
        <form onSubmit={handleSearch} className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search name, email, company, country…"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
          />
          <select className="filter-select" value={stage} onChange={e => changeStage(e.target.value)}>
            {STAGES.map(s => <option key={s} value={s}>{s === 'ALL' ? 'All Stages' : s.replace(/_/g,' ')}</option>)}
          </select>
          <select className="filter-select" value={product} onChange={e => changeProduct(e.target.value)}>
            {PRODUCTS.map(p => <option key={p} value={p}>{PRODUCT_LABELS[p]}</option>)}
          </select>
          <button type="submit" className="btn-primary">Search</button>
        </form>

        <table className="data-table">
          <thead>
            <tr>
              <th>Contact</th>
              <th>Product</th>
              <th>Country</th>
              <th>Stage</th>
              <th>Source</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {loading && [1,2,3,4,5,6].map(i => (
              <tr key={i} className="loading-row">
                <td>Loading name here</td><td>Product</td><td>Country</td><td>Stage</td><td>Source</td><td>Date</td>
              </tr>
            ))}
            {!loading && leads.map(lead => (
              <tr key={lead.id} onClick={() => router.push(`/portal/leads/${lead.id}`)}>
                <td>
                  <div className="td-name">{lead.contactName}</div>
                  <div className="td-sub">{lead.email}</div>
                  {lead.companyName && <div className="td-sub">{lead.companyName}</div>}
                </td>
                <td><ProductBadge product={lead.productInterest} /></td>
                <td style={{ fontSize: 13, color: '#374151' }}>{lead.country || '—'}</td>
                <td><StageBadge stage={lead.stage} /></td>
                <td style={{ fontSize: 12, color: '#9CA3AF', textTransform: 'capitalize' }}>{lead.source?.replace(/-/g,' ') || '—'}</td>
                <td style={{ fontSize: 12, color: '#9CA3AF', whiteSpace: 'nowrap' }}>{fmtDate(lead.createdAt)}</td>
              </tr>
            ))}
            {!loading && !leads.length && (
              <tr>
                <td colSpan={6}>
                  <div className="empty-state">
                    <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                    <h3>No leads found</h3>
                    <p>Try adjusting your search or filters</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {pages > 1 && (
          <div className="pagination">
            <button className="page-btn" onClick={() => setPage(p => p-1)} disabled={page === 1}>← Prev</button>
            {Array.from({ length: Math.min(pages, 7) }, (_, i) => {
              const p = i + 1;
              return <button key={p} className={`page-btn ${page === p ? 'active' : ''}`} onClick={() => setPage(p)}>{p}</button>;
            })}
            <button className="page-btn" onClick={() => setPage(p => p+1)} disabled={page === pages}>Next →</button>
          </div>
        )}
      </div>
    </PortalLayout>
  );
}
