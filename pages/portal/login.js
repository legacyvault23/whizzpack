import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function PortalLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/wp-crm/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push('/portal/dashboard');
      } else {
        setError('Incorrect password. Please try again.');
        setLoading(false);
      }
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>CRM Access · Whizzpack</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="login-root">
        <div className="login-card">
          <div className="login-brand">
            <div className="login-logo">WHI<span>ZZ</span>PACK</div>
            <div className="login-tagline">CRM Portal</div>
          </div>
          <h1 className="login-title">Welcome back</h1>
          <p className="login-sub">Enter your password to access the dashboard</p>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-wrap">
              <label className="input-label">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                className={`login-input ${error ? 'error' : ''}`}
                placeholder="Enter your password"
                autoFocus
                required
              />
              {error && <p className="input-error">{error}</p>}
            </div>
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? (
                <span className="spinner" />
              ) : (
                <>Access CRM <span className="btn-arrow">→</span></>
              )}
            </button>
          </form>
        </div>
        <div className="login-bg">
          <div className="bg-circle c1" />
          <div className="bg-circle c2" />
          <div className="bg-circle c3" />
        </div>
      </div>
      <style jsx global>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
      `}</style>
      <style jsx>{`
        .login-root { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #0F1F4B; position: relative; overflow: hidden; }
        .login-card { background: #fff; border-radius: 20px; padding: 44px 40px; width: 100%; max-width: 400px; position: relative; z-index: 10; box-shadow: 0 24px 80px rgba(0,0,0,0.25); animation: slideUp 0.4s cubic-bezier(.34,1.56,.64,1) both; }
        @keyframes slideUp { from { opacity:0; transform:translateY(32px) scale(0.96); } to { opacity:1; transform:translateY(0) scale(1); } }
        .login-brand { margin-bottom: 28px; }
        .login-logo { font-size: 22px; font-weight: 900; color: #0F1F4B; letter-spacing: 0.5px; }
        .login-logo span { color: #F05A28; }
        .login-tagline { font-size: 11px; color: #9CA3AF; letter-spacing: 2.5px; text-transform: uppercase; margin-top: 3px; }
        .login-title { font-size: 24px; font-weight: 800; color: #0F1F4B; margin-bottom: 6px; }
        .login-sub { font-size: 14px; color: #6B7280; margin-bottom: 28px; }
        .login-form { display: flex; flex-direction: column; gap: 16px; }
        .input-wrap { display: flex; flex-direction: column; gap: 6px; }
        .input-label { font-size: 13px; font-weight: 600; color: #374151; }
        .login-input { padding: 13px 16px; border: 2px solid #E5E7EB; border-radius: 12px; font-size: 15px; outline: none; transition: border-color 0.15s; background: #FAFAFA; }
        .login-input:focus { border-color: #F05A28; background: #fff; }
        .login-input.error { border-color: #EF4444; }
        .input-error { font-size: 12px; color: #EF4444; font-weight: 500; }
        .login-btn { background: #F05A28; color: #fff; border: none; padding: 14px; border-radius: 12px; font-size: 15px; font-weight: 700; cursor: pointer; transition: background 0.15s, transform 0.1s; display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 4px; }
        .login-btn:hover:not(:disabled) { background: #d44d20; }
        .login-btn:active { transform: scale(0.98); }
        .login-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .btn-arrow { transition: transform 0.15s; }
        .login-btn:hover .btn-arrow { transform: translateX(3px); }
        .spinner { width: 18px; height: 18px; border: 2.5px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .bg-circle { position: absolute; border-radius: 50%; opacity: 0.07; background: #F05A28; }
        .c1 { width: 500px; height: 500px; top: -200px; right: -150px; }
        .c2 { width: 300px; height: 300px; bottom: -100px; left: -80px; background: #fff; }
        .c3 { width: 200px; height: 200px; top: 40%; left: 20%; }
      `}</style>
    </>
  );
}
