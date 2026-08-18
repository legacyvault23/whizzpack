import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PortalLayout, { StageBadge, ProductBadge, STAGE_COLORS, PRODUCT_LABELS } from '../../../components/portal/PortalLayout';

const API = (path, opts) => fetch(`/api/wp-crm/proxy/${path}`, { headers: { 'Content-Type': 'application/json' }, ...opts });

function fmtDate(d) { return d ? new Date(d).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' }) : '—'; }
function fmtDateShort(d) { return d ? new Date(d).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' }) : '—'; }

const STAGES = ['NEW','CONTACTED','INTERESTED','SAMPLE_REQUESTED','SAMPLE_SENT','QUOTED','NEGOTIATING','WON','LOST','NURTURE'];
const STAGE_ORDER_IDX = Object.fromEntries(STAGES.map((s,i) => [s,i]));

export default function LeadDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notes, setNotes] = useState('');
  const [notesDirty, setNotesDirty] = useState(false);
  const [newActivity, setNewActivity] = useState('');
  const [addingNote, setAddingNote] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (!id) return;
    API(`leads/${id}`).then(r => r.json()).then(d => { setLead(d); setNotes(d.notes || ''); setLoading(false); }).catch(() => setLoading(false));
  }, [id]);

  async function updateStage(stage) {
    setSaving(true);
    const res = await API(`leads/${id}`, { method: 'PATCH', body: JSON.stringify({ stage }) });
    const updated = await res.json();
    setLead(updated);
    showMsg('Stage updated');
    setSaving(false);
  }

  async function saveNotes() {
    setSaving(true);
    await API(`leads/${id}`, { method: 'PATCH', body: JSON.stringify({ notes }) });
    setNotesDirty(false);
    showMsg('Notes saved');
    setSaving(false);
  }

  async function addActivity() {
    if (!newActivity.trim()) return;
    setAddingNote(true);
    const res = await API(`leads/${id}/activity`, { method: 'POST', body: JSON.stringify({ type: 'note', description: newActivity }) });
    const act = await res.json();
    setLead(l => ({ ...l, activities: [act, ...(l.activities || [])] }));
    setNewActivity('');
    setAddingNote(false);
    showMsg('Note added');
  }

  async function updateQuote(val) {
    await API(`leads/${id}`, { method: 'PATCH', body: JSON.stringify({ quoteValueUsd: parseFloat(val) || null }) });
    setLead(l => ({ ...l, quoteValueUsd: parseFloat(val) || null }));
    showMsg('Quote value updated');
  }

  function showMsg(text) { setMsg(text); setTimeout(() => setMsg(''), 2500); }

  const stageIdx = lead ? STAGE_ORDER_IDX[lead.stage] ?? 0 : 0;

  if (loading) return (
    <PortalLayout title="Lead">
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:300, color:'#9CA3AF' }}>Loading lead…</div>
    </PortalLayout>
  );

  if (!lead) return (
    <PortalLayout title="Not found">
      <div className="empty-state"><h3>Lead not found</h3></div>
    </PortalLayout>
  );

  return (
    <PortalLayout title={lead.contactName}>
      {msg && (
        <div style={{ position:'fixed', bottom:24, right:24, background:'#0F1F4B', color:'#fff', padding:'12px 20px', borderRadius:10, fontSize:14, fontWeight:600, zIndex:999, boxShadow:'0 8px 24px rgba(0,0,0,0.2)', animation:'slideIn 0.3s ease' }}>
          ✓ {msg}
        </div>
      )}
      <div className="portal-header anim">
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <button onClick={() => router.back()} style={{ background:'#F3F4F6', border:'none', borderRadius:8, padding:'8px 12px', cursor:'pointer', color:'#374151', fontSize:14 }}>← Back</button>
          <div>
            <div className="portal-title">{lead.contactName}</div>
            <div className="portal-subtitle">{lead.companyName}{lead.country ? ` · ${lead.country}` : ''}</div>
          </div>
        </div>
        <div style={{ display:'flex', gap:10, alignItems:'center' }}>
          <StageBadge stage={lead.stage} />
          {saving && <span style={{ fontSize:12, color:'#9CA3AF' }}>Saving…</span>}
        </div>
      </div>

      {/* Stage pipeline progress */}
      <div className="card anim anim-1" style={{ marginBottom:20 }}>
        <div style={{ fontSize:12, color:'#9CA3AF', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.6px', marginBottom:12 }}>Stage Pipeline</div>
        <div className="pipeline-bar">
          {STAGES.filter(s => !['LOST','NURTURE'].includes(s)).map((s,i) => {
            const active = STAGE_ORDER_IDX[lead.stage] >= STAGE_ORDER_IDX[s] && !['LOST','NURTURE'].includes(lead.stage);
            return <div key={s} style={{ flex:1, background: active ? (STAGE_COLORS[s]?.dot || '#F05A28') : '#F3F4F6', transition:'background 0.3s', borderRadius:6 }} />;
          })}
        </div>
        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          {STAGES.map(s => (
            <button key={s} onClick={() => updateStage(s)} style={{ padding:'6px 12px', borderRadius:8, border:`1.5px solid ${lead.stage===s ? (STAGE_COLORS[s]?.dot||'#F05A28') : '#E5E7EB'}`, background: lead.stage===s ? (STAGE_COLORS[s]?.bg||'#FFF7ED') : '#fff', color: lead.stage===s ? (STAGE_COLORS[s]?.text||'#9A3412') : '#6B7280', fontSize:12, fontWeight:600, cursor:'pointer', transition:'all 0.15s' }}>
              {s.replace(/_/g,' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="detail-grid anim anim-2">
        {/* Left column */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          <div className="card">
            <div style={{ fontSize:14, fontWeight:700, color:'#0F1F4B', marginBottom:16 }}>Contact Information</div>
            {[
              ['Name', lead.contactName],
              ['Email', lead.email ? <a href={`mailto:${lead.email}`} style={{color:'#F05A28'}}>{lead.email}</a> : '—'],
              ['Phone', lead.phone || '—'],
              ['Company', lead.companyName || '—'],
              ['Country', lead.country || '—'],
              ['Product', <ProductBadge product={lead.productInterest} />],
              ['Source', lead.source?.replace(/-/g,' ') || '—'],
              ['Created', fmtDate(lead.createdAt)],
              ['Last contacted', fmtDate(lead.lastContactedAt)],
            ].map(([label, value]) => (
              <div key={label} className="info-row" style={{ display:'flex', borderBottom:'1px solid #F3F4F6', padding:'10px 0' }}>
                <div style={{ fontSize:12, color:'#9CA3AF', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.5px', minWidth:140 }}>{label}</div>
                <div style={{ fontSize:14, color:'#1A1A2E', flex:1 }}>{value}</div>
              </div>
            ))}
          </div>

          <div className="card">
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
              <div style={{ fontSize:14, fontWeight:700, color:'#0F1F4B' }}>Inquiry Message</div>
            </div>
            <div style={{ fontSize:14, color:'#374151', lineHeight:1.7, whiteSpace:'pre-wrap', background:'#F9FAFB', padding:14, borderRadius:8 }}>
              {lead.inquiryMessage || <span style={{color:'#9CA3AF'}}>No message provided</span>}
            </div>
          </div>

          <div className="card">
            <div style={{ fontSize:14, fontWeight:700, color:'#0F1F4B', marginBottom:12 }}>Internal Notes</div>
            <textarea
              className="textarea-notes"
              value={notes}
              onChange={e => { setNotes(e.target.value); setNotesDirty(true); }}
              placeholder="Add internal notes about this lead…"
            />
            {notesDirty && (
              <button className="btn-primary" style={{ marginTop:10 }} onClick={saveNotes} disabled={saving}>
                {saving ? 'Saving…' : 'Save notes'}
              </button>
            )}
          </div>
        </div>

        {/* Right column */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          <div className="card">
            <div style={{ fontSize:14, fontWeight:700, color:'#0F1F4B', marginBottom:14 }}>Deal Details</div>
            <div style={{ marginBottom:12 }}>
              <label style={{ fontSize:12, color:'#9CA3AF', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.5px', display:'block', marginBottom:6 }}>Quote Value (USD)</label>
              <input type="number" defaultValue={lead.quoteValueUsd || ''} onBlur={e => updateQuote(e.target.value)} style={{ width:'100%', padding:'10px 12px', border:'1.5px solid #E5E7EB', borderRadius:10, fontSize:14, outline:'none' }} placeholder="Enter quote amount" />
            </div>
            <div style={{ marginBottom:12 }}>
              <label style={{ fontSize:12, color:'#9CA3AF', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.5px', display:'block', marginBottom:6 }}>Change Stage</label>
              <select className="stage-select" value={lead.stage} onChange={e => updateStage(e.target.value)}>
                {STAGES.map(s => <option key={s} value={s}>{s.replace(/_/g,' ')}</option>)}
              </select>
            </div>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginTop:4 }}>
              {lead.email && (
                <a href={`mailto:${lead.email}`} className="btn-primary" style={{ textDecoration:'none', fontSize:13 }}>✉ Email lead</a>
              )}
              {lead.phone && (
                <a href={`https://wa.me/${lead.phone.replace(/\D/g,'')}`} target="_blank" rel="noopener" className="btn-secondary" style={{ fontSize:13 }}>💬 WhatsApp</a>
              )}
            </div>
          </div>

          <div className="card" style={{ flex:1 }}>
            <div style={{ fontSize:14, fontWeight:700, color:'#0F1F4B', marginBottom:14 }}>Activity Timeline</div>
            <div style={{ marginBottom:14 }}>
              <textarea value={newActivity} onChange={e => setNewActivity(e.target.value)} placeholder="Log a call, email, note…" style={{ width:'100%', padding:'10px 12px', border:'1.5px solid #E5E7EB', borderRadius:10, fontSize:13, fontFamily:'inherit', resize:'none', height:72, outline:'none' }} />
              <button className="btn-primary" style={{ marginTop:8, fontSize:13 }} onClick={addActivity} disabled={addingNote || !newActivity.trim()}>
                {addingNote ? 'Adding…' : '+ Log activity'}
              </button>
            </div>
            <div style={{ maxHeight:380, overflowY:'auto' }}>
              {(!lead.activities || lead.activities.length === 0) && (
                <div style={{ fontSize:13, color:'#9CA3AF', textAlign:'center', padding:'24px 0' }}>No activity yet</div>
              )}
              {lead.activities?.map(act => (
                <div key={act.id} className="activity-item">
                  <div className="activity-dot" style={{ background: act.type === 'stage_change' ? '#F05A28' : '#3B82F6' }} />
                  <div>
                    <div className="activity-text">{act.description}</div>
                    <div className="activity-time">{fmtDate(act.createdAt)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes slideIn { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
      `}</style>
    </PortalLayout>
  );
}
