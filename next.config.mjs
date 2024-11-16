/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  distDir: 'docs',
  basePath: '/finance-app',
  assetPrefix: '/finance-app',
};

export default nextConfig;
