/** @type {import('next').NextConfig} */
const nextConfig = {

  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  

  
  // 301 Permanent Redirects for URL canonicalization
  async redirects() {
    return [
      {
        source: '/courier-service-in-:city',
        destination: '/best-courier-service-in-:city',
        statusCode: 301,
      },
      {
        source: '/courier/:city',
        destination: '/best-courier-service-in-:city',
        statusCode: 301,
      },
      {
        source: '/best-courier-service-in/:city',
        destination: '/best-courier-service-in-:city',
        statusCode: 301,
      },
    ];
  },

  // Rewrites for clean hyphenated URLs
  async rewrites() {
    return [
      {
        source: '/best-courier-service-in-:city',
        destination: '/best-courier-service-in/:city',
      },
    ];
  },

  // HTTP Security Headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
