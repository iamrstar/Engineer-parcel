import cities from "@/src/data/cities";

export default function sitemap() {
  const baseUrl = 'https://engineersparcel.com';
  
  // Static pages
  const staticPages = [
    '',
    '/about',
    '/services',
    '/booking',
    '/track-order',
    '/contact',
    '/franchise',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic city pages
  const cityPages = cities.map(city => ({
    url: `${baseUrl}/courier-service-in-${city.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // Best courier service pages
  const bestCourierPages = cities.map(city => ({
    url: `${baseUrl}/best-courier-service-in-${city.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [...staticPages, ...cityPages, ...bestCourierPages];
}