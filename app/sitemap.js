import cities from "@/src/data/cities";

export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://engineersparcel.in';

  // Core indexable public pages (no noindex or auth routes)
  const staticPages = [
    { route: '', priority: 1.0, changeFrequency: 'daily' },
    { route: '/services', priority: 0.9, changeFrequency: 'weekly' },
    { route: '/booking', priority: 0.9, changeFrequency: 'weekly' },
    { route: '/track-order', priority: 0.9, changeFrequency: 'daily' },
    { route: '/city-parcel', priority: 0.85, changeFrequency: 'weekly' },
    { route: '/campus-parcel', priority: 0.85, changeFrequency: 'weekly' },
    { route: '/price-estimator', priority: 0.8, changeFrequency: 'weekly' },
    { route: '/get-quote', priority: 0.8, changeFrequency: 'weekly' },
    { route: '/pincode-checker', priority: 0.8, changeFrequency: 'weekly' },
    { route: '/about', priority: 0.8, changeFrequency: 'monthly' },
    { route: '/our-partners', priority: 0.7, changeFrequency: 'monthly' },
    { route: '/activities', priority: 0.7, changeFrequency: 'monthly' },
    { route: '/contact', priority: 0.7, changeFrequency: 'monthly' },
    { route: '/terms', priority: 0.4, changeFrequency: 'yearly' },
    { route: '/privacy-policy', priority: 0.4, changeFrequency: 'yearly' },
  ].map(({ route, priority, changeFrequency }) => ({
    url: `${baseUrl}${route}`,
    changeFrequency,
    priority,
  }));

  // Canonical city landing pages (clean hyphenated URLs only; no /courier/ or /courier-service-in- URLs)
  const bestCourierPages = (cities || []).map((city) => ({
    url: `${baseUrl}/best-courier-service-in-${city.slug}`,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  return [...staticPages, ...bestCourierPages];
}