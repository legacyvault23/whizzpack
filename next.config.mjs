/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  images: { unoptimized: true },
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
    ];
  },
};
export default nextConfig;