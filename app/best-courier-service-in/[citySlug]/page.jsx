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
      streetAddress: '4th Floor, I2H Building, IIT (ISM)',
      addressLocality: city.city,
      addressRegion: city.state,
      postalCode: '826004',
      addressCountry: 'IN',
    },
    areaServed: {
      '@type': 'City',
      name: city.city,
    },
    serviceType: 'Courier and Parcel Delivery Service',
    priceRange: '₹₹',
    telephone: ['+91-9708815717', '+91-9525801506'],
    email: 'info@engineersparcel.in',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://engineersparcel.in',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: `Courier Service in ${city.city}`,
        item: `https://engineersparcel.in/best-courier-service-in-${city.slug}`,
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `How do I book a courier pickup in ${city.city}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Booking takes under 60 seconds! Click Book Doorstep Pickup, enter your address in ${city.city}, select package type (or OneBox), and an executive will arrive directly at your doorstep.`,
        },
      },
      {
        '@type': 'Question',
        name: `What are the courier charges for shipping from ${city.city}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `OneBox Alpha starts at ₹799 flat (up to 30kg) and Nova at ₹1,599 flat (up to 60kg) with zero volumetric calculation tricks. Standard envelopes match or beat market courier rates.`,
        },
      },
      {
        '@type': 'Question',
        name: `Do you provide packing boxes and tape in ${city.city}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes! When you book our OneBox or campus luggage shifting service, our executive brings a free, heavy-duty 7-ply corrugated box and tape directly to your home or hostel room.`,
        },
      },
      {
        '@type': 'Question',
        name: `Do you pick up from college hostel rooms in ${city.city}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Absolutely! We specialize in student logistics and pick up directly from your hostel room floor so you never have to lug heavy bags down stairs.`,
        },
      },
      {
        '@type': 'Question',
        name: `How can I track my shipment once picked up from ${city.city}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `You receive an instant SMS and WhatsApp confirmation with your live Tracking ID upon pickup. You can track your parcel 24/7 on engineersparcel.in/track-order.`,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BestCourierClient city={city} />
    </>
  );
}