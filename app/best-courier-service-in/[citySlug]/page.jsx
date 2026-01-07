import { notFound } from "next/navigation";
import BestCourierClient from "./BestCourierClient";
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

  const title = `Best Courier Service in ${city.city} | Top Rated Delivery | EngineersParcel`;
  const description = `Looking for the best courier service in ${city.city}? EngineersParcel offers top-rated, fast, and affordable parcel delivery in ${city.city}, ${city.state}. Trusted by 1000+ customers. Book now!`;

  return {
    title,
    description,
    keywords: [
      `best courier service in ${city.city}`,
      `top courier service ${city.city}`,
      `best parcel delivery ${city.city}`,
      `reliable courier ${city.city}`,
      `trusted courier service ${city.city}`,
      `best delivery service ${city.city}`,
      `top rated courier ${city.city}`,
      `#1 courier ${city.city}`,
    ].join(', '),
    
    openGraph: {
      title,
      description,
      url: `https://engineersparcel.com/best-courier-service-in-${city.slug}`,
      siteName: 'EngineersParcel',
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: '/Delivery-boy.png',
          width: 1200,
          height: 630,
          alt: `Best Courier Service in ${city.city}`,
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
      canonical: `https://engineersparcel.com/best-courier-service-in-${city.slug}`,
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `EngineersParcel - Best Courier Service in ${city.city}`,
    description: `Top-rated courier service in ${city.city}, ${city.state}`,
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
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '1250',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BestCourierClient city={city} />
    </>
  );
}