/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['media.dropmecode.ru'],
  },
  poweredByHeader: false,
  output: 'standalone',
}

module.exports = nextConfig
