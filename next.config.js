/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },

  images: {
    domains: ['avatars.akamai.steamstatic.com'],
  },
}

module.exports = nextConfig
