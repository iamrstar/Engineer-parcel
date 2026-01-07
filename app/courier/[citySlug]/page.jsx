import { notFound } from "next/navigation";
import CityClient from "./CityClient";
import cities from "@/src/data/cities";

export async function generateStaticParams() {
  return cities.map((city) => ({
    citySlug: city.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { citySlug } = await params;
  const city = cities.find((c) => c.slug === citySlug);
  
  if (!city) return {};

  const title = `Courier Service in ${city.city} | Fast & Reliable Delivery | EngineersParcel`;
  const description = `Best courier and parcel delivery service in ${city.city}, ${city.state}. Same-day pickup, real-time tracking, and affordable rates. Serving ${city.areas}. Book now!`;

  return {
    title,
    description,
    keywords: [
      `courier service in ${city.city}`,
      `parcel delivery ${city.city}`,
      `courier ${city.city}`,
      `delivery service ${city.city}`,
      `same day delivery ${city.city}`,
      `courier service ${city.state}`,
      `${city.city} courier`,
      `${city.city} parcel service`,
    ].join(', '),
    
    openGraph: {
      title,
      description,
      url: `https://engineersparcel.com/courier-service-in-${city.slug}`,
      siteName: 'EngineersParcel',
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: '/Delivery-boy.png',
          width: 1200,
          height: 630,
          alt: `Courier Service in ${city.city}`,
        },
      ],
    },
    
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/Delivery-boy.png'],
    },
    
    alternates: {
      canonical: `https://engineersparcel.com/courier-service-in-${city.slug}`,
    },
    
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function Page({ params }) {
  const { citySlug } = await params;
  const city = cities.find((c) => c.slug === citySlug);

  if (!city) {
    notFound();
  }

  // Add JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `EngineersParcel - Courier Service in ${city.city}`,
    description: `Fast and reliable courier service in ${city.city}, ${city.state}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: city.city,
      addressRegion: city.state,
      addressCountry: 'IN',
    },
    areaServed: {
      '@type': 'City',
      name: city.city,
    },
    serviceType: 'Courier Service',
    priceRange: '$$',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CityClient city={city} />
    </>
  );
}