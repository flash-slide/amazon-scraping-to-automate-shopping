/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000"],
    },
  },
  serverExternalPackages: ["mongoose"],
  images: {
    domains: ["m.media-amazon.com"],
  },
};

module.exports = nextConfig;
