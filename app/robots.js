export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://engineersparcel.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard/',
          '/reset-password/',
          '/forgot-password',
          '/login',
          '/register',
          '/service-down',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
