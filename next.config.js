/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      // appDir: true,
    },
    images: {
      domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'avatars.githubusercontent.com',
          port: '',
          pathname: '/u/**',
        }
      ]
    }
  }
  
  module.exports = nextConfig