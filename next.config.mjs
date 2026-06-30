/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  images: { unoptimized: true },
  async rewrites() {
    return [
      { source: '/', destination: '/index.html' },
      { source: '/corrugated-boxes', destination: '/corrugated-boxes.html' },
      { source: '/cotton-seed-bags', destination: '/cotton-seed-bags.html' },
    ];
  },
};
export default nextConfig;