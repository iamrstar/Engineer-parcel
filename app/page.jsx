"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Box, Globe, MapPin, Package, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

// Dynamically import CelebrationPopup (client-only)
const CelebrationPopup = dynamic(() => import("./CelebrationAnimation"), { ssr: false });


export default function Home() {
  return (
    <>
     <CelebrationPopup />
    <div>
      {/* Celebration popup (client-only) */}
      <CelebrationPopup />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Revolutionising Logistics in India
              </h1>
              <p className="text-lg mb-8">
                We provide efficient courier and parcel delivery services across India and internationally.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="bg-white text-orange-600 hover:bg-gray-100">
                  <Link href="/booking">Book Now</Link>
                </Button>
                <Button className="text-orange-600 bg-white hover:bg-slate-50" asChild>
                  <Link href="/track-order">Track Order</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <Image
                src="/Delivery-boy.png"
                alt="Parcel Delivery"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
            <p className="mt-4 text-lg text-gray-600">
              We offer a wide range of delivery and logistics services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ServiceCard icon={<Package />} title="Courier Service" desc="Fast and secure courier service for documents and packages." link="/services#courier" />
            <ServiceCard icon={<Truck />} title="Shifting and Moving" desc="Complete relocation services for homes and offices." link="/services#shifting" />
            <ServiceCard icon={<Box />} title="Local Parcel Service" desc="Same-day delivery for local parcels within your city." link="/services#local" />
            <ServiceCard icon={<Globe />} title="International Courier" desc="Reliable international shipping to destinations worldwide." link="/services#international" />
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <QuickAccessCard
            title="Check Delivery Area"
            desc="Enter your pincode to check if we deliver to your area and get estimated delivery times."
            btnText="Check Pincode"
            link="/pincode-checker"
            icon={<MapPin className="ml-2 h-4 w-4" />}
          />
          <QuickAccessCard
            title="Book a Pickup"
            desc="Schedule a pickup for your parcel or request our shifting and moving services."
            btnText="Book Now"
            link="/booking"
            icon={<ArrowRight className="ml-2 h-4 w-4" />}
          />
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <section className="py-16 bg-orange-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Ship Your Parcel?</h2>
        <p className="text-lg mb-8 max-w-3xl mx-auto">
          Experience our fast, reliable, and affordable delivery services today.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild className="bg-white text-orange-600 hover:bg-gray-100">
            <Link href="/booking">Book a Pickup</Link>
          </Button>
          <Button asChild className="bg-white text-orange-600 hover:bg-gray-100">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
    </>
  );
}

/* Reusable components */
function ServiceCard({ icon, title, desc, link }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="h-12 w-12 text-orange-500 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{desc}</p>
      <Link href={link} className="text-orange-600 hover:text-orange-700 flex items-center">
        Learn More <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </div>
  );
}

function QuickAccessCard({ title, desc, btnText, link, icon }) {
  return (
    <div className="bg-orange-50 p-8 rounded-lg border border-orange-100">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 mb-6">{desc}</p>
      <Link href={link}>
        <Button className="bg-orange-600 hover:bg-orange-700 flex items-center">
          {btnText} {icon}
        </Button>
      </Link>
    </div>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
        <p className="text-lg text-gray-600 mb-12">
          Don't just take our word for it — hear from our satisfied customers
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Rahul Kumar", place: "Dhanbad", text: "Team was professional and delivery was on time." },
            { name: "Sneha Patel", place: "Ranchi", text: "Great shifting service, everything safe!" },
            { name: "Amit Mishra", place: "Kolkata", text: "Package reached the US in just 5 days!" }
          ].map((t, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <span className="text-orange-600 font-bold">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">{t.name}</h4>
                  <p className="text-sm text-gray-500">{t.place}</p>
                </div>
              </div>
              <p className="text-gray-600">{`"${t.text}"`}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
