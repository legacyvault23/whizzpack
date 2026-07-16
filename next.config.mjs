/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: 'X-Frame-Options',        value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy',        value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy',     value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://cdn.jsdelivr.net https://cdnjs.cloudflare.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https://images.unsplash.com https://pngimg.com https://www.google-analytics.com",
      "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://formsubmit.co",
      "form-action 'self' https://formsubmit.co",
      "frame-ancestors 'none'",
    ].join('; '),
  },
];

const nextConfig = {
  trailingSlash: false,
  images: { unoptimized: true },
  async headers() {
    return [
      { source: '/(.*)', headers: securityHeaders },
      {
        source: '/(|corrugated-boxes|cotton-seed-bags|privacy-policy)',
        headers: [{ key: 'Cache-Control', value: 's-maxage=86400, stale-while-revalidate=604800' }],
      },
    ];
  },
  async redirects() {
    return [
      { source: '/blog', destination: '/blogs', permanent: true },
      { source: '/blog/:slug*', destination: '/blogs/:slug*', permanent: true },
    ];
  },
  async rewrites() {
    return [
      { source: '/', destination: '/index.html' },
      { source: '/corrugated-boxes', destination: '/corrugated-boxes.html' },
      { source: '/cotton-seed-bags', destination: '/cotton-seed-bags.html' },
      { source: '/privacy-policy', destination: '/privacy-policy.html' },
      { source: '/thank-you', destination: '/thank-you.html' },
    ];
  },
};
export default nextConfig;