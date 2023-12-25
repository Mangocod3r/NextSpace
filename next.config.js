// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: '/api/auth/[...nextauth]',
      },
    ];
  },
  // Your existing configuration goes here
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
      },
    ],
  },
};
