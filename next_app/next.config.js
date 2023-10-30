/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.dropmecode.ru',
        port: '',
        pathname: '/**',
      },
    ],
  },
  poweredByHeader: false,
  output: 'standalone',
}

module.exports = nextConfig
