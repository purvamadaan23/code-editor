import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enables static export mode
  output: 'export',

  // Adds trailing slashes to all routes (required for static export)
  trailingSlash: true,

  // Disables image optimization since static export can't handle dynamic image optimization
  images: {
    unoptimized: true,
  },

  // Enables React's strict mode for highlighting potential issues
  reactStrictMode: true,

  // Environment variables (public variables accessible in the client-side)
  env: {
    NEXT_PUBLIC_API_URL: 'https://example.com/api', // Example variable
  },

  // Optional: Rewrite paths if you need custom route handling
  async rewrites() {
    return [
      {
        source: '/custom-route',
        destination: '/another-page',
      },
    ];
  },
};

export default nextConfig;