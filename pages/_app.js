import '../styles/globals.css';
import { useState, useEffect } from 'react';

function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try {
      if (!localStorage.getItem('wz_cookie_ok')) setShow(true);
    } catch (e) {}
  }, []);
  if (!show) return null;
  const accept = () => {
    try { localStorage.setItem('wz_cookie_ok', '1'); } catch (e) {}
    setShow(false);
  };
  return (
    <div role="dialog" aria-label="Cookie notice" style={{position:'fixed',bottom:0,left:0,right:0,zIndex:1500,background:'#0F1F4B',color:'rgba(255,255,255,.85)',padding:'14px 24px',boxShadow:'0 -6px 24px rgba(15,31,75,.3)',display:'flex',alignItems:'center',justifyContent:'center',gap:'18px',flexWrap:'wrap',fontFamily:"'Inter',system-ui,sans-serif"}}>
      <p style={{margin:0,fontSize:'.85rem',lineHeight:1.6,maxWidth:720}}>We use cookies to keep the site running smoothly and understand how visitors use it. See our <a href="/privacy-policy" style={{color:'#F05A28',fontWeight:600,textDecoration:'underline'}}>Privacy Policy</a> for details.</p>
      <button onClick={accept} style={{background:'#F05A28',color:'#fff',border:'none',borderRadius:8,padding:'10px 22px',fontSize:'.85rem',fontWeight:700,cursor:'pointer',fontFamily:'inherit',flexShrink:0}}>Got It</button>
    </div>
  );
}

function SamplePopup() {
  const [show, setShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem('wz_sample_shown')) return;
      if (localStorage.getItem('wz_sample_dismissed')) {
        const ts = parseInt(localStorage.getItem('wz_sample_dismissed'), 10);
        if (Date.now() - ts < 7 * 24 * 60 * 60 * 1000) return;
      }
    } catch (e) {}

    let triggered = false;

    const trigger = () => {
      if (triggered) return;
      triggered = true;
      setShow(true);
      try { sessionStorage.setItem('wz_sample_shown', '1'); } catch (e) {}
    };

    const onMouseLeave = (e) => {
      if (e.clientY <= 0) trigger();
    };

    document.addEventListener('mouseleave', onMouseLeave);

    // Mobile fallback: show after 40 seconds of page time
    const mobileTimer = typeof window !== 'undefined' && window.innerWidth < 768
      ? setTimeout(trigger, 40000)
      : null;

    return () => {
      document.removeEventListener('mouseleave', onMouseLeave);
      if (mobileTimer) clearTimeout(mobileTimer);
    };
  }, []);

  const close = () => {
    setShow(false);
    try { localStorage.setItem('wz_sample_dismissed', Date.now().toString()); } catch (e) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(false);
    const fd = new FormData(e.target);
    const payload = {
      _subject: 'Free Sample Request - ' + (fd.get('product') || '') + ' | Whizzpack',
      _cc: 'jash.bavishi1@gmail.com,info.whizzpack@yahoo.com',
      _captcha: 'false',
      _template: 'table',
      _replyto: fd.get('email') || '',
      Name: fd.get('name') || '',
      Email: fd.get('email') || '',
      'Product Interest': fd.get('product') || '',
      Source: 'Exit Intent Popup'
    };
    try {
      const res = await fetch('https://formsubmit.co/ajax/parthashara58@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success === 'true' || data.success === true) {
        setSubmitted(true);
        setTimeout(() => setShow(false), 3500);
      } else throw new Error('failed');
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  if (!show) return null;

  const overlay = {
    position: 'fixed', inset: 0,
    background: 'rgba(15,31,75,.78)',
    zIndex: 9998,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '20px',
    fontFamily: "'Inter',system-ui,sans-serif"
  };
  const card = {
    background: '#fff', borderRadius: '16px',
    maxWidth: '460px', width: '100%',
    padding: '36px', position: 'relative',
    boxSizing: 'border-box'
  };
  const inp = {
    width: '100%', padding: '12px 14px',
    border: '1.5px solid #E5E7EB', borderRadius: '8px',
    fontSize: '.9rem', fontFamily: 'inherit',
    outline: 'none', boxSizing: 'border-box',
    display: 'block', marginBottom: '12px'
  };

  return (
    <div style={overlay} onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
      <div style={card}>
        <button
          onClick={close}
          aria-label="Close"
          style={{position:'absolute',top:'14px',right:'16px',background:'none',border:'none',fontSize:'1.3rem',cursor:'pointer',color:'#9CA3AF',lineHeight:1,padding:'4px'}}
        >&#x2715;</button>

        {!submitted ? (
          <>
            <span style={{display:'inline-block',fontSize:'.65rem',fontWeight:700,letterSpacing:'.12em',textTransform:'uppercase',color:'#1A6B3A',background:'rgba(26,107,58,.08)',border:'1px solid rgba(26,107,58,.2)',padding:'4px 12px',borderRadius:'100px',marginBottom:'14px'}}>
              Before You Go
            </span>
            <h2 style={{fontSize:'1.45rem',fontWeight:800,color:'#0F1F4B',lineHeight:1.2,margin:'0 0 10px'}}>
              Get a Free Sample<br/>Before You Commit
            </h2>
            <p style={{fontSize:'.88rem',color:'#6B7280',lineHeight:1.65,margin:'0 0 22px'}}>
              We ship samples to the USA and UK so you can check the quality before placing your order. No obligation.
            </p>
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Your name" required style={inp} />
              <input type="email" name="email" placeholder="Work email" required style={inp} />
              <select name="product" style={{...inp, marginBottom:'20px', background:'#fff', color:'#1a1a2e', cursor:'pointer'}}>
                <option value="Cotton Seed Bags">Cotton Seed Bags</option>
                <option value="Corrugated Boxes">Corrugated Boxes</option>
                <option value="Both Products">Both Products</option>
              </select>
              <button
                type="submit"
                disabled={sending}
                style={{width:'100%',background:'#F05A28',color:'#fff',border:'none',borderRadius:'8px',padding:'14px',fontSize:'.95rem',fontWeight:700,cursor:sending?'not-allowed':'pointer',fontFamily:'inherit',opacity:sending?0.72:1,transition:'opacity .2s'}}
              >
                {sending ? 'Sending...' : 'Request Free Sample →'}
              </button>
              {error && (
                <p style={{color:'#F05A28',fontSize:'.8rem',margin:'10px 0 0',textAlign:'center'}}>
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </>
        ) : (
          <div style={{textAlign:'center',padding:'24px 0'}}>
            <div style={{width:'56px',height:'56px',background:'rgba(26,107,58,.1)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px',fontSize:'1.5rem',color:'#1A6B3A'}}>&#10003;</div>
            <h3 style={{color:'#0F1F4B',fontWeight:800,fontSize:'1.2rem',margin:'0 0 10px'}}>Sample request received!</h3>
            <p style={{color:'#6B7280',fontSize:'.9rem',margin:0,lineHeight:1.6}}>
              We'll be in touch within 24 hours to arrange your sample shipment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <CookieBanner />
      <SamplePopup />
    </>
  );
}
