export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const r = await fetch('https://whizzy-crm.onrender.com/webhooks/whizzpack-inquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });
    const data = await r.json();
    return res.status(r.status).json(data);
  } catch (err) {
    console.error('[wp-inquiry proxy]', err);
    return res.status(502).json({ error: 'upstream_error' });
  }
}
