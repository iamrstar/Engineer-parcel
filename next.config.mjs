/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  
  // Redirects for SEO-friendly URLs
  async redirects() {
    return [
      {
        source: '/courier-service-in-:city',
        destination: '/courier/:city',
        permanent: true, // 301 redirect for SEO
      },
    ];
  },
  
  // Rewrites for clean URLs
  async rewrites() {
    return [
      {
        source: '/courier-service-in-:city',
        destination: '/courier/:city',
      },
      {
        source: '/best-courier-service-in-:city',
        destination: '/best-courier-service-in/:city',
      },
    ];
  },
};

export default nextConfig;
