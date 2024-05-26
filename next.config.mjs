/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/pokemons',
          destination: '/src/app/api/crud/pokemons/route.ts'
        }
      ]
    }
  };
  
  export default nextConfig;