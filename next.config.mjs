/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      resolveAlias: {
        canvas: { browser: './empty.js' },
      },
    },
  },
};

export default nextConfig;