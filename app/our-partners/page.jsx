import Image from "next/image";
import { Handshake, TrendingUp, Shield, Globe, Building2, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

// Corrected paths (directly in public/)
const featuredPartners = [
  { name: "Partner 1", logo: "/partner1.png" },
  { name: "Partner 2", logo: "/partner2.png" },
  { name: "Partner 3", logo: "/partner3.png" },
  { name: "Partner 4", logo: "/partner4.png" },
  { name: "Partner 5", logo: "/partner5.png" },
  { name: "Partner 6", logo: "/partner6.png" }, // placeholder if not available
  { name: "Partner 7", logo: "/partner7.png" },
  { name: "Partner 8", logo: "/partner8.png" },
];

export default function OurPartners() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Partners</h1>
          <p className="text-lg max-w-3xl mx-auto">
            Building success together through trusted partnerships and collaborative growth
          </p>
        </div>
      </section>

      {/* Partnership Philosophy */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6">
                <Handshake className="h-8 w-8 text-orange-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Partnership Philosophy</h2>
              <p className="text-lg text-gray-600 mb-4">
                We believe in creating meaningful partnerships that drive mutual growth and deliver exceptional value to our customers. Our partner ecosystem spans logistics providers, technology platforms, and industry leaders.
              </p>
              <p className="text-gray-600">
                Together, we&apos;re building a connected logistics network that serves businesses and individuals across India and beyond.
              </p>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-6">
              <PartnershipBenefit icon={<TrendingUp className="h-6 w-6" />} title="Growth" desc="Expand reach and capabilities" />
              <PartnershipBenefit icon={<Shield className="h-6 w-6" />} title="Trust" desc="Reliable and secure collaboration" />
              <PartnershipBenefit icon={<Globe className="h-6 w-6" />} title="Network" desc="Access to wider markets" />
              <PartnershipBenefit icon={<Award className="h-6 w-6" />} title="Excellence" desc="Shared commitment to quality" />
            </div>
          </div>
        </div>
      </section>

      {/* Partner Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Partner Categories</h2>
            <p className="text-lg text-gray-600">
              Collaborating across multiple sectors to deliver comprehensive logistics solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CategoryCard 
              title="Logistics Partners"
              desc="We collaborate with leading logistics providers to ensure seamless delivery across India and internationally. Our network includes regional carriers, last-mile delivery specialists, and international shipping partners."
              partners={["Regional Carriers", "Last-Mile Delivery", "International Shipping", "Warehouse Networks"]}
            />
            <CategoryCard 
              title="Technology Partners"
              desc="Partnering with innovative technology companies to provide real-time tracking, automated systems, and enhanced customer experiences through digital solutions."
              partners={["Tracking Platforms", "Payment Gateways", "Route Optimization", "CRM Systems"]}
            />
            <CategoryCard 
              title="Industry Partners"
              desc="Working with e-commerce platforms, retail chains, and corporate clients to provide customized logistics solutions that meet specific business needs."
              partners={["E-commerce Platforms", "Retail Chains", "Corporate Clients", "SME Solutions"]}
            />
          </div>
        </div>
      </section>

      {/* Featured Partners */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Partners</h2>
            <p className="text-lg text-gray-600">
              Trusted collaborations that power our service excellence
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {featuredPartners.map((partner, i) => (
              <PartnerLogo key={i} name={partner.name} logo={partner.logo} />
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Partnership Success Stories</h2>
            <p className="text-lg text-gray-600">
              Real results from our collaborative partnerships
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SuccessStory 
              partner="E-Commerce Giant"
              metric="2M+ Deliveries"
              desc="Partnered to handle peak season deliveries with 99.5% on-time performance, enabling our partner to scale their operations seamlessly during festive sales."
            />
            <SuccessStory 
              partner="Tech Startup"
              metric="50% Cost Savings"
              desc="Integrated our API solutions to automate shipping processes, reducing operational costs and improving delivery tracking for their customer base."
            />
            <SuccessStory 
              partner="Retail Chain"
              metric="500+ Locations"
              desc="Established nationwide distribution network covering urban and rural areas, ensuring consistent product availability across all store locations."
            />
          </div>
        </div>
      </section>

      {/* Become a Partner */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-orange-50 p-8 md:p-12 rounded-lg border border-orange-100 text-center">
            <Building2 className="h-16 w-16 text-orange-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Become Our Partner</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join our growing network of partners and unlock new opportunities for growth. Whether you&apos;re a logistics provider, technology company, or business looking for reliable shipping solutions, we&apos;d love to explore partnership opportunities.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild className="bg-orange-600 hover:bg-orange-700">
                <a href="/contact">Partner With Us</a>
              </Button>
              <Button asChild variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50">
                <a href="/contact">Download Partnership Brochure</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-600 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Let&apos;s Grow Together</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Explore partnership opportunities and discover how we can create value together
          </p>
          <Button asChild className="bg-white text-orange-600 hover:bg-gray-100">
            <a href="/contact">Contact Us</a>
          </Button>
        </div>
      </section>
    </div>
  );
}

// Components

function PartnershipBenefit({ icon, title, desc }) {
  return (
    <div className="bg-orange-50 p-6 rounded-lg border border-orange-100 text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-200 rounded-full mb-4">
        <div className="text-orange-600">{icon}</div>
      </div>
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  );
}

function CategoryCard({ title, desc, partners }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 mb-6">{desc}</p>
      <div className="space-y-2">
        {partners.map((partner, idx) => (
          <div key={idx} className="flex items-center text-sm text-gray-600">
            <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
            {partner}
          </div>
        ))}
      </div>
    </div>
  );
}

function PartnerLogo({ name, logo }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center justify-center border border-gray-100">
      <div className="relative w-32 h-32 mb-3"> {/* bigger container */}
        <Image src={logo} alt={name} fill className="object-contain" />
      </div>
     
    </div>
  );
}


function SuccessStory({ partner, metric, desc }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{partner}</h3>
        <div className="text-2xl font-bold text-orange-600">{metric}</div>
      </div>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}
