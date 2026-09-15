export default function JsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://engineersparcel.com';

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'EngineersParcel',
    legalName: 'Engineers Parcel Pvt. Ltd.',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    image: `${baseUrl}/og-image.png`,
    description:
      'Fast, secure, and affordable courier and parcel delivery services across India with 19,000+ serviceable pincodes, doorstep pickup, and real-time tracking.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '4th Floor, I2H Building, IIT (ISM)',
      addressLocality: 'Dhanbad',
      addressRegion: 'Jharkhand',
      postalCode: '826004',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-9525801506',
      contactType: 'customer support',
      email: 'info.engineersparcel@gmail.com',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi'],
    },
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
      name: 'Courier & Logistics Solutions',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Domestic Courier & Parcel Delivery',
            description: 'Fast pan-India doorstep parcel pickup and delivery across 19,000+ pincodes.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Same-Day City Parcel Service',
            description: 'Intra-city express courier service for urgent documents and parcels.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Campus Logistics & Student Luggage Shifting',
            description: 'Luggage and book shipment services designed specifically for university campuses.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Packers & Movers Shifting Services',
            description: 'Reliable, damage-free household goods and office relocation services.',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
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
