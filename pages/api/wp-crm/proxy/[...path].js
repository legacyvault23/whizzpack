import crypto from 'crypto';

function verifySession(token) {
  if (!token) return false;
  try {
    const [payloadB64, sig] = token.split('.');
    if (!payloadB64 || !sig) return false;
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64').toString());
    if (payload.exp < Date.now()) return false;
    const expected = crypto.createHmac('sha256', process.env.WP_CRM_SECRET || 'dev').update(payloadB64).digest('base64');
    return sig === expected;
  } catch {
    return false;
  }
}

export default async function handler(req, res) {
  if (!verifySession(req.cookies.wp_crm_session)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const { path, ...queryParams } = req.query;
  const backendBase = process.env.WP_BACKEND_URL || 'https://whizzy-crm.onrender.com';
  const url = new URL(`${backendBase}/api/wp/${path.join('/')}`);
  Object.entries(queryParams).forEach(([k, v]) => url.searchParams.append(k, v));
  try {
    const upstream = await fetch(url.toString(), {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'x-wp-crm-secret': process.env.WP_CRM_SECRET || '',
      },
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
    });
    const data = await upstream.json();
    res.status(upstream.status).json(data);
  } catch (err) {
    console.error('[WP proxy]', err);
    res.status(502).json({ error: 'upstream_error' });
  }
}
