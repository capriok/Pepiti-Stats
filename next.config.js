/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },

  images: {
    domains: ['avatars.akamai.steamstatic.com', 'i.imgur.com'],
  },
}

module.exports = nextConfig
