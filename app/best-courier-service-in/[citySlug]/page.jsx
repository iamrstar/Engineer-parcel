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

  const isDhanbad = city.slug === "dhanbad";

  // Titles: restore "Best Courier Service in {City}" as lead phrase. Max 60 chars.
  // Dhanbad: "Best Courier Service in Dhanbad | Doorstep Pickup" (49 chars)
  // Other 7 & partner cities: "Best Courier Service in {City} | Get a Quote Online" (<= 60 chars)
  let title = isDhanbad 
    ? "Best Courier Service in Dhanbad | Doorstep Pickup"
    : `Best Courier Service in ${city.city} | Get a Quote Online`;

  if (title.length > 60) {
    title = `Best Courier in ${city.city} | Get a Quote Online`;
  }

  // Meta descriptions: max 150 chars, no "Fast"/"Express" claims. Locality lists only for Dhanbad.
  const description = isDhanbad
    ? "Courier service in Dhanbad with doorstep pickup across Saraidhela, Bank More, Hirapur and Katras. Live WhatsApp tracking. Get a quote today."
    : `Courier from ${city.city} with pickup via our partner network, live WhatsApp tracking and all-India delivery. Get a quote today.`;

  return {
    title: {
      absolute: title,
    },
    description,
    keywords: [
      `courier service near me`,
      `courier service in ${city.city}`,
      `parcel delivery in ${city.city}`,
      `best courier service in ${city.city}`,
      `parcel pickup ${city.city}`,
      `courier booking ${city.city}`,
      `reliable courier ${city.city}`,
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

  const isDhanbad = city.slug === "dhanbad";
  const seoConfig = priorityCities.find((c) => c.slug === citySlug) || {
    freePickup: false,
    pickupModel: isDhanbad ? "own" : "partner",
    pickupPincodes: [],
    pickupTAT: "TODO",
    pickupTerms: "TODO",
    isReady: false,
  };

  const cityWithSeo = {
    ...city,
    seoConfig,
  };

  // Item 7: City pages: replace per-city LocalBusiness with a Service node referencing global LocalBusiness
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Courier Service in ${city.city}`,
    description: `Courier and parcel delivery service in ${city.city}, ${city.state}.`,
    provider: {
      '@type': 'LocalBusiness',
      '@id': 'https://engineersparcel.in/#localbusiness',
    },
    areaServed: {
      '@type': 'City',
      name: city.city,
    },
    serviceType: 'Courier and Parcel Delivery Service',
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

  // Item 8: FAQ schema text must match visible on-page FAQ text and not claim hostel pickup / free box for partner cities
  const faqList = isDhanbad
    ? [
        {
          q: `How do I book a courier pickup in Dhanbad?`,
          a: `Booking takes under 60 seconds online. Enter your pickup address in Dhanbad, select package type or OneBox, and our executive will arrive at your doorstep.`,
        },
        {
          q: `What are the courier charges for shipping from Dhanbad?`,
          a: `We offer transparent flat rates. OneBox Alpha starts at ₹799 flat (up to 30kg) and Nova at ₹1,599 flat (up to 60kg). Standard parcels and documents match standard courier rates.`,
        },
        {
          q: `Do you pick up from student hostels in IIT (ISM) Dhanbad?`,
          a: `Yes! We provide campus logistics and pick up directly from hostel rooms at IIT (ISM) Dhanbad so students do not need to carry luggage down stairs.`,
        },
        {
          q: `How can I track my shipment once picked up from Dhanbad?`,
          a: `You receive an instant confirmation with your tracking ID upon pickup. You can track your parcel journey 24/7 on engineersparcel.in/track-order.`,
        },
      ]
    : [
        {
          q: `How do I send a parcel from ${city.city}?`,
          a: `Booking takes under 60 seconds online. We coordinate parcel pickup via our partner network across serviceable pincodes in ${city.city}.`,
        },
        {
          q: `What are the courier charges for shipping from ${city.city}?`,
          a: `We offer competitive rates for parcels and interstate box shipments across India. Use our online price estimator to get an instant quote.`,
        },
        {
          q: `How do I check if my pincode in ${city.city} is serviceable?`,
          a: `Enter your 6-digit pincode in our online Pincode Checker at engineersparcel.in/pincode-checker to verify serviceability before booking.`,
        },
        {
          q: `How can I track my shipment from ${city.city}?`,
          a: `You receive a tracking ID with live journey updates on WhatsApp and 24/7 tracking at engineersparcel.in/track-order.`,
        },
      ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqList.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BestCourierClient city={cityWithSeo} faqList={faqList} />
    </>
  );
}