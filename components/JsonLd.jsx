export default function JsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://engineersparcel.in';

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${baseUrl}/#localbusiness`,
    name: 'Engineers Parcel',
    legalName: 'Engineers Parcel Pvt. Ltd.',
    alternateName: 'EngineersParcel Courier & Logistics',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    image: `${baseUrl}/og-image.png`,
    description:
      'Engineers Parcel is the best rated courier service in Dhanbad and across India with free doorstep parcel pickup, affordable shipping across 19,000+ pincodes, and real-time live tracking.',
    telephone: '+91-9525801506',
    email: 'info.engineersparcel@gmail.com',
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, Credit Card, UPI, Net Banking, Razorpay',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Police Line Rd, IIT (ISM), Sardar Patel Nagar',
      addressLocality: 'Dhanbad',
      addressRegion: 'Jharkhand',
      postalCode: '826004',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '23.8143',
      longitude: '86.4412',
    },
    hasMap: 'https://maps.google.com/?q=Engineers+Parcel+Dhanbad',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      reviewCount: '111',
      bestRating: '5',
      worstRating: '1',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '09:00',
        closes: '20:00',
      },
    ],
    areaServed: [
      {
        '@type': 'Country',
        name: 'India',
      },
      {
        '@type': 'City',
        name: 'Dhanbad',
      },
      {
        '@type': 'City',
        name: 'Ranchi',
      },
      {
        '@type': 'City',
        name: 'Bokaro',
      },
      {
        '@type': 'City',
        name: 'Kolkata',
      },
      {
        '@type': 'City',
        name: 'Patna',
      },
      {
        '@type': 'City',
        name: 'Delhi',
      },
    ],
    founders: [
      {
        '@type': 'Person',
        name: 'Raj Chatterjee',
        jobTitle: 'Technology Head',
      },
      {
        '@type': 'Person',
        name: 'Subham Sawarnkar',
        jobTitle: 'Co-Founder & Strategy Head',
      },
    ],
    sameAs: [
      'https://www.linkedin.com/company/engineersparcel',
      'https://www.instagram.com/engineersparcel',
      'https://twitter.com/engineersparcel',
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'DeliveryService',
    name: 'EngineersParcel Courier & Logistics Services',
    provider: {
      '@type': 'Organization',
      name: 'EngineersParcel',
      url: baseUrl,
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Courier & Logistics Solutions Near You',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Doorstep Courier Pickup & Delivery Near Me',
            description: 'Free doorstep parcel collection and fast delivery across 19,000+ pincodes in India.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Same-Day City Parcel Service Near Me',
            description: 'Intra-city express courier service for urgent parcels, food, and documents.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Campus Logistics & Student Luggage Shifting',
            description: 'Hostel-to-home luggage, cycles, and book delivery built specifically for university students.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Packers & Movers Shifting Services Near Me',
            description: 'Affordable, secure household and office relocation with verified moving specialists.',
          },
        },
      ],
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Which is the best courier service near me with doorstep pickup?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'EngineersParcel is recognized as one of the best courier services near you, offering free doorstep parcel pickup, affordable per-kg rates, and coverage across 19,000+ Indian pincodes with live tracking.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I send a parcel from home near me?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Simply visit engineersparcel.in/booking, enter your pickup address and destination pincode, select the package weight, and an EngineersParcel pickup executive will collect the package from your doorstep.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does EngineersParcel provide same-day courier service near me?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! We provide same-day local city delivery in Dhanbad and select cities, alongside express 1-3 day intercity courier service across India.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can college students ship luggage from their hostel room?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, EngineersParcel specializes in campus logistics, picking up luggage, cartons, and bicycles directly from college hostel rooms and delivering them safely to home addresses across India.',
        },
      },
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'EngineersParcel',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/track-order?awb={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
