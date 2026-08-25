import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Unsubscribe() {
  const router = useRouter();
  const { leadId } = router.query;

  const [state, setState] = useState('loading'); // loading | confirm | done | already | error
  const [name, setName] = useState('');

  useEffect(() => {
    if (!leadId) return;
    fetch(`/api/wp-unsubscribe/${leadId}`)
      .then(r => r.json())
      .then(data => {
        if (data.error) { setState('error'); return; }
        setName(data.name ? data.name.split(' ')[0] : '');
        setState(data.unsubscribed ? 'already' : 'confirm');
      })
      .catch(() => setState('error'));
  }, [leadId]);

  async function handleUnsubscribe() {
    setState('loading');
    try {
      const res = await fetch(`/api/wp-unsubscribe/${leadId}`, { method: 'POST' });
      const data = await res.json();
      setState(data.success ? 'done' : 'error');
    } catch {
      setState('error');
    }
  }

  return (
    <>
      <Head>
        <title>Unsubscribe · Whizzpack</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="unsub-root">
        <div className="unsub-card">
          <div className="unsub-logo">WHI<span>ZZ</span>PACK</div>

          {state === 'loading' && (
            <div className="unsub-body">
              <div className="unsub-spinner" />
            </div>
          )}

          {state === 'confirm' && (
            <div className="unsub-body">
              <div className="unsub-icon unsub-icon--warn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <h1 className="unsub-title">
                {name ? `${name}, unsubscribe from Whizzpack updates?` : 'Unsubscribe from Whizzpack updates?'}
              </h1>
              <p className="unsub-text">
                You will no longer receive packaging industry guides and updates from us. You can always reach us directly at <a href="mailto:contact@whizzpack.in">contact@whizzpack.in</a>.
              </p>
              <button className="unsub-btn unsub-btn--primary" onClick={handleUnsubscribe}>
                Yes, unsubscribe me
              </button>
              <a href="https://www.whizzpack.in" className="unsub-link">No, take me back to Whizzpack</a>
            </div>
          )}

          {state === 'done' && (
            <div className="unsub-body">
              <div className="unsub-icon unsub-icon--success">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              </div>
              <h1 className="unsub-title">You have been unsubscribed</h1>
              <p className="unsub-text">
                We have removed you from our mailing list. You will not receive any further emails from Whizzpack.
              </p>
              <p className="unsub-text unsub-text--small">
                Changed your mind? Email us at <a href="mailto:contact@whizzpack.in">contact@whizzpack.in</a> and we will add you back.
              </p>
              <a href="https://www.whizzpack.in" className="unsub-btn unsub-btn--outline">Back to Whizzpack</a>
            </div>
          )}

          {state === 'already' && (
            <div className="unsub-body">
              <div className="unsub-icon unsub-icon--success">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              </div>
              <h1 className="unsub-title">Already unsubscribed</h1>
              <p className="unsub-text">
                You are already off our mailing list. No further emails will be sent to you from Whizzpack.
              </p>
              <a href="https://www.whizzpack.in" className="unsub-btn unsub-btn--outline">Back to Whizzpack</a>
            </div>
          )}

          {state === 'error' && (
            <div className="unsub-body">
              <div className="unsub-icon unsub-icon--error">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <h1 className="unsub-title">Link not recognised</h1>
              <p className="unsub-text">
                This unsubscribe link may have expired or is invalid. Please email us directly at <a href="mailto:contact@whizzpack.in">contact@whizzpack.in</a> and we will remove you manually.
              </p>
              <a href="https://www.whizzpack.in" className="unsub-btn unsub-btn--outline">Back to Whizzpack</a>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .unsub-root {
          min-height: 100vh;
          background: #F2F3F5;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 16px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        .unsub-card {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 4px 32px rgba(15,31,75,0.10);
          max-width: 480px;
          width: 100%;
          overflow: hidden;
        }
        .unsub-logo {
          background: #0F1F4B;
          color: #fff;
          font-size: 20px;
          font-weight: 900;
          letter-spacing: 2px;
          padding: 20px 32px;
          text-align: center;
        }
        .unsub-logo span { color: #F05A28; }
        .unsub-body {
          padding: 40px 32px 36px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .unsub-icon {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }
        .unsub-icon svg { width: 30px; height: 30px; }
        .unsub-icon--warn { background: #FFF3ED; color: #F05A28; }
        .unsub-icon--success { background: #EDFAF3; color: #1A6B3A; }
        .unsub-icon--error { background: #FFF0F0; color: #CC3333; }
        .unsub-title {
          font-size: 20px;
          font-weight: 800;
          color: #0F1F4B;
          margin: 0 0 14px;
          line-height: 1.3;
        }
        .unsub-text {
          font-size: 14px;
          color: #555;
          line-height: 1.7;
          margin: 0 0 12px;
        }
        .unsub-text--small { font-size: 13px; color: #888; }
        .unsub-text a { color: #F05A28; text-decoration: none; }
        .unsub-text a:hover { text-decoration: underline; }
        .unsub-btn {
          display: inline-block;
          margin-top: 20px;
          padding: 13px 32px;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          text-decoration: none;
          border: none;
          transition: opacity 0.15s;
          width: 100%;
          text-align: center;
          box-sizing: border-box;
        }
        .unsub-btn:hover { opacity: 0.88; }
        .unsub-btn--primary { background: #F05A28; color: #fff; }
        .unsub-btn--outline { background: transparent; color: #0F1F4B; border: 2px solid #0F1F4B; }
        .unsub-link {
          display: block;
          margin-top: 14px;
          font-size: 13px;
          color: #888;
          text-decoration: none;
        }
        .unsub-link:hover { color: #0F1F4B; text-decoration: underline; }
        .unsub-spinner {
          width: 36px;
          height: 36px;
          border: 3px solid #e8e8e8;
          border-top-color: #F05A28;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          margin: 32px auto;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 520px) {
          .unsub-body { padding: 32px 20px 28px; }
          .unsub-logo { padding: 18px 20px; }
        }
      `}</style>
    </>
  );
}
