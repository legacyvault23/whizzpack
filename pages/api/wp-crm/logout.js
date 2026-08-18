export default function handler(req, res) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  res.setHeader('Set-Cookie', `wp_crm_session=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0${secure}`);
  res.json({ ok: true });
}
