/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // needed for static export
  basePath: '/bluecircomall', // GitHub Pages serves from /<repo-name>
  images: {
    unoptimized: true, // required for static exports
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
