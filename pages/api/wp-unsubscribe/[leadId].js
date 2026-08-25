export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { leadId } = req.query;
  if (!leadId) return res.status(400).json({ error: 'Missing leadId' });

  const backendBase = process.env.WP_BACKEND_URL || 'https://whizzy-crm.onrender.com';

  try {
    const upstream = await fetch(`${backendBase}/webhooks/wp-unsubscribe/${leadId}`, {
      method: req.method,
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await upstream.json();
    res.status(upstream.status).json(data);
  } catch (err) {
    console.error('[wp-unsubscribe api]', err);
    res.status(502).json({ error: 'upstream_error' });
  }
}
