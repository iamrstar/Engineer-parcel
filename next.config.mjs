/** @type {import('next').NextConfig} */
const nextConfig = {

  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
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
