/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost', //local
        port: '3000',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
