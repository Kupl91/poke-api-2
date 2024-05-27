// C:\Users\pavel.kuplensky\Documents\GitHub\poke-api-2\next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
        {
          source: '/api/pokemon/:path*',
          destination: '/src/app/api/pokemon/:path*'
        }
    ];
  },
};

export default nextConfig;