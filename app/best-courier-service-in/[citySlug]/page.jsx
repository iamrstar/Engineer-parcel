import { notFound } from "next/navigation";
import BestCourierClient from "./BestCourierClient";
import cities from "@/src/data/cities";
import { priorityCities } from "@/src/data/seoPages";

export async function generateStaticParams() {
  return cities.map((city) => ({
    citySlug: city.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { citySlug } = await params;
  const city = cities.find((c) => c.slug === citySlug);
  
  if (!city) return {};

  const seoConfig = priorityCities.find((c) => c.slug === citySlug);
  const freePickup = seoConfig?.freePickup || false;
  const pickupClaim = freePickup ? "Free Doorstep Pickup" : "Doorstep Pickup Booking";

  let title = `Courier Service in ${city.city} | ${pickupClaim}`;
  if (title.length > 60) {
    title = `Courier in ${city.city} | ${pickupClaim}`;
  }

  // City-tailored meta description strictly under 155 chars with real local neighborhoods and CTA
  let description;
  if (city.slug === "dhanbad") {
    description = `Book courier service in Dhanbad with ${freePickup ? "free doorstep pickup" : "doorstep pickup"}. Express delivery across Saraidhela, Bank More & Katras. Fast tracking. Book now!`;
  } else if (city.slug === "bokaro") {
    description = `Reliable courier service in Bokaro. Fast doorstep pickup across Sector 4, Sector 9, Chas & City Centre. Real-time parcel tracking. Book today!`;
  } else if (city.slug === "giridih") {
    description = `Trusted courier service in Giridih. Doorstep pickup across Bada Chowk, Makatpur, Pachamba & Station Road with live tracking. Book your delivery today!`;
  } else if (city.slug === "hazaribagh") {
    description = `Fast courier service in Hazaribagh. Doorstep parcel pickup across Korrah, Matwari, Babu Gaon & Canary Hill Road. Safe intercity shipping. Book now!`;
  } else if (city.slug === "ranchi") {
    description = `Best courier service in Ranchi. Doorstep pickup across Lalpur, Doranda, Harmu, Kanke & Morabadi with live tracking. Safe all-India delivery. Book now!`;
  } else if (city.slug === "jamshedpur") {
    description = `Express courier service in Jamshedpur. Doorstep parcel pickup across Bistupur, Sakchi, Telco, Kadma & NIT campus. Reliable live tracking. Book now!`;
  } else if (city.slug === "asansol") {
    description = `Top courier service in Asansol. Doorstep pickup across Burnpur, Ushagram, Court Area & Sen Raleigh Road. Fast intercity delivery with live tracking!`;
  } else if (city.slug === "durgapur") {
    description = `Express courier service in Durgapur. Doorstep pickup across City Centre, Benachity, Bidhannagar & NIT campus with 24/7 tracking. Book your parcel now!`;
  } else {
    description = `Reliable courier service in ${city.city}, ${city.state}. Fast doorstep pickup, express delivery across India, and real-time tracking. Book now!`;
  }

  return {
    title: {
      absolute: title,
    },
    description,
    keywords: [
      `courier service near me`,
      `courier service in ${city.city}`,
      `parcel delivery in ${city.city}`,
      `doorstep courier pickup ${city.city}`,
      `same day courier ${city.city}`,
      `top courier service ${city.city}`,
      `best parcel delivery ${city.city}`,
      `reliable courier near me`,
      `trusted courier service ${city.city}`,
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

  const seoConfig = priorityCities.find((c) => c.slug === citySlug) || {
    freePickup: false,
    pickupModel: "partner",
    pickupPincodes: [],
    pickupTAT: "TODO",
    pickupTerms: "TODO",
    isReady: false,
  };

  const cityWithSeo = {
    ...city,
    seoConfig,
  };


  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `EngineersParcel - Best Courier Service in ${city.city}`,
    description: `Top-rated courier service in ${city.city}, ${city.state}. Doorstep pickup across ${city.areas}.`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '4th Floor, I2H Building, IIT (ISM)',
      addressLocality: 'Dhanbad',
      addressRegion: 'Jharkhand',
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
      <BestCourierClient city={cityWithSeo} />
    </>
  );
}