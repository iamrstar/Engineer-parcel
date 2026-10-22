export default function JsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://engineersparcel.in';

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${baseUrl}/#localbusiness`,
    name: 'Engineers Parcel',
    legalName: 'SRQ Engineers Parcel and Haul Private Limited',
    alternateName: 'EngineersParcel Courier & Logistics',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    image: `${baseUrl}/og-image.png`,
    description:
      'Engineers Parcel provides reliable courier and logistics solutions in Dhanbad and across India with affordable shipping and real-time live tracking.',
    telephone: ['+91-9708815717', '+91-9525801506'],
    email: 'info@engineersparcel.in',
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, Credit Card, UPI, Net Banking, Razorpay',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '4th Floor, I2H Building, IIT (ISM)',
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
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'DeliveryService',
    name: 'EngineersParcel Courier & Logistics Services',
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${baseUrl}/#localbusiness`,
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Courier & Logistics Solutions',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Doorstep Courier Pickup & Delivery',
            description: 'Doorstep parcel collection and delivery across India.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'City Parcel Delivery',
            description: 'Intra-city parcel service for packages and documents.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Campus Logistics & Student Luggage Shifting',
            description: 'Luggage, cycles, and book delivery built for university students.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Packers & Movers Shifting Services',
            description: 'Household and office relocation services.',
          },
        },
      ],
    },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
