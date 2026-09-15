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

  const title = `Best Courier Service in ${city.city} Near Me | Top Rated Delivery`;
  const description = `Looking for the best courier service near you in ${city.city}? EngineersParcel provides fast doorstep pickup, affordable parcel delivery, and shifting across ${city.areas}, ${city.state}. Rated 4.8/5. Book now!`;

  return {
    title,
    description,
    keywords: [
      `best courier service near me`,
      `courier service near me in ${city.city}`,
      `best courier service in ${city.city}`,
      `parcel delivery near me ${city.city}`,
      `doorstep courier pickup near me`,
      `same day courier near me in ${city.city}`,
      `top courier service ${city.city}`,
      `best parcel delivery ${city.city}`,
      `reliable courier near me`,
      `trusted courier service ${city.city}`,
      `#1 courier service ${city.city}`,
    ].join(', '),
    
    openGraph: {
      title,
      description,
      url: `https://engineersparcel.in/best-courier-service-in-${city.slug}`,
      siteName: 'EngineersParcel',
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: '/Delivery-boy.png',
          width: 1200,
          height: 630,
          alt: `Best Courier Service in ${city.city} Near Me`,
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
      canonical: `https://engineersparcel.in/best-courier-service-in-${city.slug}`,
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

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `EngineersParcel - Best Courier Service in ${city.city}`,
    description: `Top-rated courier service in ${city.city}, ${city.state}. Doorstep pickup across ${city.areas}.`,
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
    serviceType: 'Courier and Parcel Delivery Service',
    priceRange: '₹₹',
    telephone: '+91-9525801506',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '1250',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Which is the best courier service near me in ${city.city}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `EngineersParcel is rated the best courier service in ${city.city}, offering quick doorstep parcel pickup across ${city.areas}, affordable rates, and express delivery to 19,000+ pincodes in India.`,
        },
      },
      {
        '@type': 'Question',
        name: `How do I book a doorstep courier pickup in ${city.city}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `You can book online at EngineersParcel. Enter your pickup address in ${city.city}, select package weight, and an executive will arrive at your door for instant parcel collection.`,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BestCourierClient city={city} />
    </>
  );
}