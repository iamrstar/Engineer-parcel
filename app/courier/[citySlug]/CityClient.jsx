"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Box, Globe, Package, Truck, MapPin, Clock, Shield, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const CelebrationPopup = dynamic(() => import("@/app/CelebrationAnimation"), { ssr: false });

export default function CityClient({ city }) {
  return (
    <>
      <CelebrationPopup />

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Courier Service in {city.city} – Fast & Reliable Delivery
              </h1>
              <p className="text-lg mb-6">
                EngineersParcel provides fast, secure, and affordable courier and
                parcel delivery services in <strong>{city.city}, {city.state}</strong>.
                Same-day pickup with real-time tracking.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                  <Link href="/booking">Book Courier Now</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-orange-600">
                  <Link href="/track-order">Track Your Parcel</Link>
                </Button>
              </div>
            </div>

            <div className="md:w-1/2">
              <Image
                src="/Delivery-boy.png"
                alt={`Fast Courier Service in ${city.city} - EngineersParcel`}
                width={500}
                height={400}
                className="rounded-lg shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Courier Services in {city.city}
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <ServiceCard 
              icon={<Package />} 
              title="Courier Service" 
              description="Door-to-door parcel delivery"
            />
            <ServiceCard 
              icon={<Box />} 
              title="Same Day Delivery" 
              description="Express delivery within hours"
            />
            <ServiceCard 
              icon={<Truck />} 
              title="Shifting & Moving" 
              description="Home and office relocation"
            />
            <ServiceCard 
              icon={<Globe />} 
              title="International Courier" 
              description="Worldwide shipping services"
            />
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose EngineersParcel in {city.city}?
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<Clock />} 
              title="Fast Delivery" 
              description="Same-day and next-day options"
            />
            <FeatureCard 
              icon={<Shield />} 
              title="Secure & Insured" 
              description="Your parcels are protected"
            />
            <FeatureCard 
              icon={<MapPin />} 
              title="Real-time Tracking" 
              description="Track your parcel anytime"
            />
            <FeatureCard 
              icon={<Phone />} 
              title="24/7 Support" 
              description="Always here to help you"
            />
          </div>
        </div>
      </section>

      {/* AREAS SERVED */}
      <section className="py-16 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">
            Areas We Serve in {city.city}, {city.state}
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            We provide door-to-door courier and parcel delivery services across all major localities in {city.city}, including:
          </p>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-800 font-medium">{city.areas}</p>
          </div>
          <p className="mt-6 text-gray-600">
            Can't find your area? <Link href="/contact" className="text-orange-600 font-semibold hover:underline">Contact us</Link> – we're constantly expanding our service coverage!
          </p>
        </div>
      </section>

      {/* FAQ SECTION FOR SEO */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">
            Frequently Asked Questions - Courier Service in {city.city}
          </h2>
          <div className="space-y-6">
            <FAQItem 
              question={`How fast is courier delivery in ${city.city}?`}
              answer={`We offer same-day delivery for local shipments within ${city.city}. For express service, we can deliver within 4-6 hours depending on the pickup and delivery locations.`}
            />
            <FAQItem 
              question={`What areas do you cover in ${city.city}?`}
              answer={`We provide courier services across all major areas in ${city.city} including ${city.areas}. We're constantly expanding to cover more localities.`}
            />
            <FAQItem 
              question={`How can I track my parcel in ${city.city}?`}
              answer="You can track your parcel in real-time using our online tracking system. Simply enter your tracking number on our Track Order page or use our mobile app."
            />
            <FAQItem 
              question={`What are the courier charges in ${city.city}?`}
              answer="Our rates are competitive and depend on parcel weight, dimensions, and delivery speed. Get an instant quote by using our booking form or contact our customer support."
            />
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Ship Your Parcel in {city.city}?
          </h2>
          <p className="text-lg mb-8">
            Book your courier service now and experience fast, reliable delivery!
          </p>
          <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
            <Link href="/booking">Book Courier Service</Link>
          </Button>
        </div>
      </section>
    </>
  );
}

function ServiceCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
      <div className="h-12 w-12 text-orange-500 mb-4">{icon}</div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="text-center p-6">
      <div className="h-12 w-12 text-orange-500 mx-auto mb-4">{icon}</div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

function FAQItem({ question, answer }) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="font-bold text-lg mb-3 text-gray-900">{question}</h3>
      <p className="text-gray-700">{answer}</p>
    </div>
  );
}