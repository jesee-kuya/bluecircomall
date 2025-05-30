/** @type {import('next').NextConfig} */
module.exports = {
    output: 'export',           // ← enable static HTML export
    trailingSlash: true,        // ← makes "/page/" folders
    basePath: '/bluecircomall', // ← ensures all URLs start with /bluecircomall
    assetPrefix: '/bluecircomall',
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    images: {
      unoptimized: true,
    },
  };
  