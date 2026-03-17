"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Box, Globe, MapPin, Package, Truck, Search, Shield, Zap, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Dynamically import CelebrationPopup (client-only)
const CelebrationPopup = dynamic(() => import("./CelebrationAnimation"), { ssr: false });

export default function Home() {
  const [trackingId, setTrackingId] = useState("");

  return (
    <div className="relative overflow-hidden bg-white">
      <CelebrationPopup />

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-100/50 rounded-full blur-[120px] -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[120px] translate-y-1/2"></div>
      </div>

      {/* ══════════ HERO SECTION ══════════ */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-48 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 text-orange-600 text-xs font-bold px-4 py-2 rounded-full mb-6">
                <Zap className="w-3 h-3 fill-current" />
                FASTEST DELIVERY IN INDIA
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-[1.1] mb-6">
                Logistics <span className="text-orange-600">Simplified.</span> <br />
                Excellence Delivered.
              </h1>
              <p className="text-xl text-gray-500 mb-10 max-w-xl leading-relaxed">
                Experience the next generation of logistics. From local parcels to international freight, we move your world with precision and care.
              </p>

              {/* Tracking Search Bar */}
              <div className="relative max-w-md group mb-10">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition duration-1000 group-focus-within:duration-200"></div>
                <div className="relative flex items-center bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden group-focus-within:border-orange-500 transition-colors">
                  <Search className="ml-4 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="ENTER TRACKING ID..."
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
                    className="flex-1 h-16 px-4 bg-transparent outline-none text-gray-900 font-black uppercase tracking-widest placeholder:text-gray-300 placeholder:font-bold"
                  />
                  <Button asChild className="mr-2 bg-orange-600 hover:bg-orange-700 h-12 px-6 rounded-lg text-xs font-black uppercase tracking-widest">
                    <Link href={`/track-order?id=${trackingId}`}>Track</Link>
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 items-center">
                <Button asChild className="bg-gray-900 hover:bg-black text-white px-8 h-16 rounded-xl text-lg font-bold transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-gray-200">
                  <Link href="/booking">Start Shipping <ArrowRight className="ml-2 w-5 h-5" /></Link>
                </Button>
                <div className="flex -space-x-3 items-center">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden ring-2 ring-orange-50">
                      <Image src={`https://i.pravatar.cc/100?u=${i}`} alt="user" width={40} height={40} />
                    </div>
                  ))}
                  <div className="pl-6 text-sm">
                    <div className="flex items-center gap-1 text-orange-500 mb-0.5">
                      {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-3 h-3 fill-current" />)}
                    </div>
                    <p className="text-gray-500 font-medium"><span className="text-gray-900 font-bold">10k+</span> Happy Shippers</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative"
            >
              {/* Floating Glass Stats */}
              <div className="absolute -top-10 -left-10 z-20 glass p-6 rounded-2xl shadow-2xl border border-white/50 animate-bounce-slow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Secure Shipping</p>
                    <p className="text-xl font-black text-gray-900">100% Insured</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-10 -right-10 z-20 glass p-6 rounded-2xl shadow-2xl border border-white/50 animate-float">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Fast Delivery</p>
                    <p className="text-xl font-black text-gray-900">2-5 Days</p>
                  </div>
                </div>
              </div>

              <div className="relative rounded-[40px] overflow-hidden shadow-2xl bg-gradient-to-br from-orange-400 to-orange-600 p-2 group">
                <Image
                  src="/Delivery-boy.png"
                  alt="Engineers Parcel Delivery"
                  width={600}
                  height={500}
                  className="rounded-[36px] grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-900/40 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════ SERVICES SECTION ══════════ */}
      <section className="py-32 relative bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Our Core Services</h2>
              <p className="text-lg text-gray-500 leading-relaxed">
                We've tailored our logistics platform to meet every unique shipping need, from individual parcels to complex commercial shifting.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ServiceCard
              icon={<Package className="w-8 h-8" />}
              title="Courier Service"
              desc="Fast and secure courier service for documents and high-value packages."
              link="/services#courier"
              delay={0.1}
            />
            <ServiceCard
              icon={<Truck className="w-8 h-8" />}
              title="Shifting & Moving"
              desc="Comprehensive relocation services for homes, offices, and large equipment."
              link="/services#shifting"
              delay={0.2}
            />
            <ServiceCard
              icon={<Box className="w-8 h-8" />}
              title="Local Parcel"
              desc="Lightning-fast same-day delivery for local parcels within major cities."
              link="/services#local"
              delay={0.3}
            />
            <ServiceCard
              icon={<Globe className="w-8 h-8" />}
              title="International"
              desc="Global logistics network spanning 200+ countries with full tracking."
              link="/services#international"
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* ══════════ CAMPUS PARCEL BANNER ══════════ */}
      <section className="py-20 relative overflow-hidden group">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative bg-gray-900 rounded-3xl overflow-hidden p-8 md:p-16"
          >
            {/* Animated Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute -top-1/2 -left-1/4 w-full h-full bg-orange-500/10 rounded-full blur-[120px] animate-pulse"></div>
              <div className="absolute -bottom-1/2 -right-1/4 w-full h-full bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-700"></div>
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="max-w-2xl text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-orange-400 text-xs font-bold px-4 py-2 rounded-full mb-6">
                  🎓 FOR IIT ISM DHANBAD STUDENTS
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                  Graduating? Moving Out? <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-200">
                    Let Us Handle Your Stuff.
                  </span>
                </h3>
                <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                  Fixed-price box packing and reliable delivery for hostel students. Books, clothes, or electronics — we ship it safe.
                </p>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white h-16 px-10 text-xl font-black rounded-2xl shadow-2xl shadow-orange-600/30 transition-all hover:scale-105 active:scale-95 group">
                    <Link href="/campus-parcel" className="flex items-center">
                      Book Campus Parcel
                      <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <div className="flex items-center gap-3 px-6 py-4 rounded-2xl border border-white/10 bg-white/5">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-white font-bold">1,200+ Students Served</span>
                  </div>
                </div>
              </div>
              <div className="relative w-full max-w-sm lg:max-w-md aspect-square">
                <div className="absolute inset-0 bg-orange-600/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
                <div className="relative h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-[60px] flex items-center justify-center p-12 overflow-hidden">
                  <Package className="w-full h-full text-orange-500/20 absolute -bottom-10 -right-10 rotate-12" />
                  <div className="text-center relative z-10">
                    <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">Starting From</p>
                    <p className="text-7xl font-black text-white leading-none mb-4">₹299</p>
                    <div className="bg-orange-500 text-white text-xs font-black py-1 px-3 rounded-full inline-block">PER BOX</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════ QUICK ACCESS SECTION ══════════ */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          <QuickAccessCard
            title="Check Area"
            desc="Enter your destination pincode to instantly check service availability."
            btnText="Check Pincode"
            link="/pincode-checker"
            icon={<MapPin className="w-5 h-5" />}
            gradient="from-orange-50 to-orange-100/30"
          />
          <QuickAccessCard
            title="Instant Quote"
            desc="Calculate estimated shipping costs based on weight and destination."
            btnText="Estimate Price"
            link="/price-estimator"
            icon={<Box className="w-5 h-5" />}
            gradient="from-blue-50 to-blue-100/30"
          />
        </div>
      </section>

      {/* ══════════ TESTIMONIALS SECTION ══════════ */}
      <TestimonialsSection />

      {/* ══════════ CTA SECTION ══════════ */}
      <section className="py-32 relative overflow-hidden text-center bg-gray-900 border-t border-white/5">
        <div className="absolute inset-0 pointer-events-none opacity-50">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8">Ready to move something?</h2>
            <p className="text-xl text-gray-400 mb-12 leading-relaxed">
              Join thousands of satisfied customers who trust Engineers Parcel for their logistics needs. Fast, secure, and hassle-free.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button asChild className="bg-white text-gray-900 hover:bg-gray-100 h-16 px-12 text-xl font-black rounded-2xl shadow-2xl transition-all hover:scale-105 active:scale-95">
                <Link href="/booking">Book a Pickup</Link>
              </Button>
              <Button asChild variant="ghost" className="text-white border-2 border-white/30 hover:border-white hover:bg-white/10 h-16 px-12 text-xl font-black rounded-2xl transition-all hover:scale-105 active:scale-95">
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

/* ══════════ REUSABLE COMPONENTS ══════════ */

function ServiceCard({ icon, title, desc, link, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="group relative bg-white p-8 rounded-[32px] shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-2"
    >
      <div className="w-16 h-16 bg-orange-50 rounded-2xl text-orange-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-500 mb-8 leading-relaxed line-clamp-3">{desc}</p>
      <Link href={link} className="inline-flex items-center font-bold text-orange-600 hover:text-orange-700 transition-colors">
        Explore Service <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
}

function QuickAccessCard({ title, desc, btnText, link, icon, gradient }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={`bg-gradient-to-br ${gradient} p-10 rounded-[40px] border border-gray-100 shadow-sm relative overflow-hidden group`}
    >
      <div className="relative z-10">
        <h3 className="text-3xl font-black text-gray-900 mb-4">{title}</h3>
        <p className="text-lg text-gray-500 mb-10 max-w-sm leading-relaxed">{desc}</p>
        <Link href={link}>
          <Button className="bg-gray-900 hover:bg-black text-white h-14 px-8 text-lg font-bold rounded-xl transition-all hover:scale-105 active:scale-95 group-hover:shadow-xl group-hover:shadow-gray-200">
            {btnText} <span className="ml-2 group-hover:translate-x-1 transition-transform">{icon}</span>
          </Button>
        </Link>
      </div>
      {/* Background design element */}
      <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
    </motion.div>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-32 bg-gray-50/50 relative">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Loved by Thousands</h2>
          <p className="text-xl text-gray-500 mb-20 max-w-3xl mx-auto">
            Don’t just take our word for it — hear from the people who trust us with their most valuable shipments every single day.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Rahul Kumar", place: "Dhanbad", text: "Team was professional and delivery was on time. The glassmorphism UI even made the booking process feel premium!", avatar: "https://i.pravatar.cc/100?u=12" },
            { name: "Sneha Patel", place: "Ranchi", text: "Great shifting service, everything safe! I used their campus parcel service for my IIT graduation moving.", avatar: "https://i.pravatar.cc/100?u=15" },
            { name: "Amit Mishra", place: "Kolkata", text: "Package reached the US in just 5 days! Their international tracking is real-time and very reliable.", avatar: "https://i.pravatar.cc/100?u=18" }
          ].map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 relative group hover:shadow-2xl transition-all duration-500"
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white shadow-xl">
                <Star className="w-6 h-6 fill-current" />
              </div>
              <div className="mt-4 flex flex-col items-center mb-8">
                <div className="w-20 h-20 rounded-3xl border-4 border-gray-50 overflow-hidden mb-4 ring-2 ring-orange-100">
                  <Image src={t.avatar} alt={t.name} width={80} height={80} className="grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <h4 className="text-xl font-black text-gray-900">{t.name}</h4>
                <p className="text-sm text-orange-600 font-bold uppercase tracking-widest">{t.place}</p>
              </div>
              <p className="text-gray-500 italic leading-relaxed">{`"${t.text}"`}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
