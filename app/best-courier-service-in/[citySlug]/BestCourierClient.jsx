"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Box, Globe, Package, Truck, MapPin, Clock, Shield, Phone, Star, Award, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const CelebrationPopup = dynamic(() => import("@/app/CelebrationAnimation"), { ssr: false });

export default function BestCourierClient({ city }) {
  return (
    <>
      <CelebrationPopup />

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2">
              <div className="flex items-center gap-2 mb-4">
                <Star className="h-6 w-6 fill-yellow-300 text-yellow-300" />
                <Star className="h-6 w-6 fill-yellow-300 text-yellow-300" />
                <Star className="h-6 w-6 fill-yellow-300 text-yellow-300" />
                <Star className="h-6 w-6 fill-yellow-300 text-yellow-300" />
                <Star className="h-6 w-6 fill-yellow-300 text-yellow-300" />
                <span className="ml-2 font-semibold">4.8/5 Rating</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Best Courier Service in {city.city} – Trusted by Thousands
              </h1>
              <p className="text-lg mb-6">
                EngineersParcel is the <strong>top-rated courier service in {city.city}, {city.state}</strong>. 
                Experience reliable, fast, and affordable parcel delivery with 1000+ satisfied customers.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                  <Link href="/booking">Book Best Courier</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-orange-600">
                  <Link href="/get-quote">Get Free Quote</Link>
                </Button>
              </div>
            </div>

            <div className="md:w-1/2">
              <Image
                src="/Delivery-boy.png"
                alt={`Best Courier Service in ${city.city} - Top Rated Delivery`}
                width={500}
                height={400}
                className="rounded-lg shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <TrustBadge icon={<Users />} number="1000+" label="Happy Customers" />
            <TrustBadge icon={<Package />} number="50K+" label="Parcels Delivered" />
            <TrustBadge icon={<Award />} number="4.8/5" label="Customer Rating" />
            <TrustBadge icon={<MapPin />} number="100%" label="On-Time Delivery" />
          </div>
        </div>
      </section>

      {/* WHY WE'RE THE BEST */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why We're the Best Courier Service in {city.city}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <BestFeatureCard 
              icon={<Shield />}
              title="100% Safe & Secure"
              description="Full insurance coverage and tamper-proof packaging for all your parcels"
            />
            <BestFeatureCard 
              icon={<Clock />}
              title="Fastest Delivery"
              description="Same-day and 4-hour express delivery options available"
            />
            <BestFeatureCard 
              icon={<Star />}
              title="Top Rated Service"
              description="4.8/5 rating from 1000+ verified customer reviews"
            />
            <BestFeatureCard 
              icon={<Phone />}
              title="24/7 Support"
              description="Round-the-clock customer support via phone, chat, and email"
            />
            <BestFeatureCard 
              icon={<MapPin />}
              title="Real-Time Tracking"
              description="Track your parcel every step of the way with live GPS updates"
            />
            <BestFeatureCard 
              icon={<Package />}
              title="Affordable Rates"
              description="Best prices in {city.city} with no hidden charges"
            />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Premium Courier Services in {city.city}
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <ServiceCard 
              icon={<Package />} 
              title="Express Courier" 
              description="4-6 hour delivery within city"
            />
            <ServiceCard 
              icon={<Box />} 
              title="Same Day Delivery" 
              description="Delivered same day guaranteed"
            />
            <ServiceCard 
              icon={<Truck />} 
              title="Home Shifting" 
              description="Complete relocation services"
            />
            <ServiceCard 
              icon={<Globe />} 
              title="International" 
              description="Worldwide shipping to 200+ countries"
            />
          </div>
        </div>
      </section>

      {/* CUSTOMER TESTIMONIALS */}
      <section className="py-16 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Customers Say - {city.city}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard 
              name="Rajesh Kumar"
              location={city.city}
              rating={5}
              text="Best courier service I've used in years! Delivered my important documents within 4 hours. Highly recommended!"
            />
            <TestimonialCard 
              name="Priya Singh"
              location={city.city}
              rating={5}
              text="Very professional and reliable. The tracking system is excellent and customer support is always helpful."
            />
            <TestimonialCard 
              name="Amit Sharma"
              location={city.city}
              rating={5}
              text="Used them for my home shifting. Great service, affordable rates, and zero damage. Best in the business!"
            />
          </div>
        </div>
      </section>

      {/* AREAS SERVED */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">
            Serving All Areas in {city.city}, {city.state}
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            We provide the best courier service across all localities in {city.city}, including:
          </p>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
            <p className="text-gray-800 font-medium">{city.areas}</p>
          </div>
          <p className="mt-6 text-gray-600">
            Looking for courier service in other areas? <Link href="/contact" className="text-orange-600 font-semibold hover:underline">Contact us</Link> – we cover the entire {city.city} region!
          </p>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose EngineersParcel Over Others in {city.city}?
          </h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-orange-500 text-white">
                <tr>
                  <th className="py-4 px-6 text-left">Features</th>
                  <th className="py-4 px-6 text-center">EngineersParcel</th>
                  <th className="py-4 px-6 text-center">Others</th>
                </tr>
              </thead>
              <tbody>
                <ComparisonRow feature="Same Day Delivery" us={true} others={false} />
                <ComparisonRow feature="Real-Time GPS Tracking" us={true} others={false} />
                <ComparisonRow feature="24/7 Customer Support" us={true} others={false} />
                <ComparisonRow feature="100% Insurance Coverage" us={true} others={false} />
                <ComparisonRow feature="Affordable Pricing" us={true} others={false} />
                <ComparisonRow feature="Door-to-Door Pickup" us={true} others={true} />
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">
            FAQs - Best Courier Service in {city.city}
          </h2>
          <div className="space-y-6">
            <FAQItem 
              question={`Which is the best courier service in ${city.city}?`}
              answer={`EngineersParcel is rated as the best courier service in ${city.city} with 4.8/5 stars from 1000+ customers. We offer same-day delivery, real-time tracking, and 24/7 support.`}
            />
            <FAQItem 
              question={`What makes EngineersParcel the top choice in ${city.city}?`}
              answer={`We combine speed, reliability, and affordability. Our services include same-day delivery, full insurance, GPS tracking, and dedicated customer support – all at competitive prices.`}
            />
            <FAQItem 
              question={`How fast is your delivery in ${city.city}?`}
              answer={`We offer multiple delivery options: Express (4-6 hours), Same-Day (within 24 hours), and Standard (1-2 days). Choose the speed that fits your needs.`}
            />
            <FAQItem 
              question={`Do you cover all areas in ${city.city}?`}
              answer={`Yes! We provide door-to-door courier service across all major localities including ${city.areas} and more.`}
            />
            <FAQItem 
              question={`What are your courier charges in ${city.city}?`}
              answer="Our rates are the most competitive in the market. Pricing depends on weight, size, and delivery speed. Get an instant quote on our website or call us for custom requirements."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Experience the Best Courier Service in {city.city}!
          </h2>
          <p className="text-lg mb-8">
            Join 1000+ satisfied customers. Book now and get 10% off on your first delivery!
          </p>
          <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
            <Link href="/booking">Book Now & Save 10%</Link>
          </Button>
        </div>
      </section>
    </>
  );
}

function TrustBadge({ icon, number, label }) {
  return (
    <div className="text-center">
      <div className="h-12 w-12 text-orange-500 mx-auto mb-2">{icon}</div>
      <div className="text-2xl font-bold text-gray-900">{number}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}

function BestFeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
      <div className="h-12 w-12 text-orange-500 mb-4">{icon}</div>
      <h3 className="font-bold text-xl mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function ServiceCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center">
      <div className="h-12 w-12 text-orange-500 mx-auto mb-4">{icon}</div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

function TestimonialCard({ name, location, rating, text }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-1 mb-3">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-gray-700 mb-4 italic">"{text}"</p>
      <div className="font-semibold text-gray-900">{name}</div>
      <div className="text-sm text-gray-600">{location}</div>
    </div>
  );
}

function ComparisonRow({ feature, us, others }) {
  return (
    <tr className="border-b">
      <td className="py-4 px-6">{feature}</td>
      <td className="py-4 px-6 text-center">
        {us ? <CheckCircle className="h-6 w-6 text-green-500 mx-auto" /> : <span className="text-red-500">✗</span>}
      </td>
      <td className="py-4 px-6 text-center">
        {others ? <CheckCircle className="h-6 w-6 text-green-500 mx-auto" /> : <span className="text-red-500">✗</span>}
      </td>
    </tr>
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