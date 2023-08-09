/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },

  images: {
    domains: [
      "cdn.discordapp.com",
      "avatars.akamai.steamstatic.com",
      "avatars.steamstatic.com",
      "i.imgur.com",
      "gyazo.com",
    ],
  },
}

module.exports = nextConfig
