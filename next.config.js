/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['about.utdnebula.com', 'utdallas-cdn.presence.io', `github.com`],
  },
};

module.exports = nextConfig;
