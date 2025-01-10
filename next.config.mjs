/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true, // Enable SWC minification
  output: 'export',
  images: {
    unoptimized: true, // Disables image optimization for static export
  },
};

export default nextConfig;

