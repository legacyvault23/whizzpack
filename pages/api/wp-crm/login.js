import crypto from 'crypto';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { password } = req.body;
  if (!password || password !== process.env.WP_CRM_PASSWORD) {
    return res.status(401).json({ error: 'Invalid password' });
  }
  const payload = { iat: Date.now(), exp: Date.now() + 7 * 24 * 60 * 60 * 1000 };
  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64');
  const sig = crypto.createHmac('sha256', process.env.WP_CRM_SECRET || 'dev').update(payloadB64).digest('base64');
  const token = `${payloadB64}.${sig}`;
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  res.setHeader('Set-Cookie', `wp_crm_session=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${7 * 24 * 60 * 60}${secure}`);
  res.json({ ok: true });
}
