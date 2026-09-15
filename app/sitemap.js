import cities from "@/src/data/cities";

export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://engineersparcel.in';
  const now = new Date();

  // Core static pages with tailored priorities and frequencies
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
    lastModified: now,
    changeFrequency,
    priority,
  }));

  // Dynamic city courier service pages
  const cityPages = (cities || []).map(city => ({
    url: `${baseUrl}/courier-service-in-${city.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // Best courier service in city pages
  const bestCourierPages = (cities || []).map(city => ({
    url: `${baseUrl}/best-courier-service-in-${city.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  return [...staticPages, ...cityPages, ...bestCourierPages];
}