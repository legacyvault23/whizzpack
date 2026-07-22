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

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <CookieBanner />
    </>
  );
}
