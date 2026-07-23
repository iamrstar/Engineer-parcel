"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Box, Globe, MapPin, Package, Truck, Search, Shield, Zap, Clock, Star, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

// Dynamically import CelebrationPopup (client-only)
const CelebrationPopup = dynamic(() => import("./CelebrationAnimation"), { ssr: false });
// const PromoPopup = dynamic(() => import("@/components/PromoPopup"), { ssr: false });
const BookNowModal = dynamic(() => import("@/components/BookNowModal"), { ssr: false });

export default function Home() {
  const [trackingId, setTrackingId] = useState("");
  const [quoteData, setQuoteData] = useState({ fromCity: "", toCity: "", weight: "", phone: "" });
  const [isQuoting, setIsQuoting] = useState(false);
  const [quoteSuccess, setQuoteSuccess] = useState(false);
  const [isBookNowOpen, setIsBookNowOpen] = useState(false);

  const handleInstantQuote = async (e) => {
    e.preventDefault();
    if (!quoteData.phone || quoteData.phone.length < 10) return;
    
    setIsQuoting(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      await axios.post(`${API_URL}/api/leads`, {
        phone: quoteData.phone,
        source: "Instant Quote Home",
        details: { 
          fromCity: quoteData.fromCity,
          toCity: quoteData.toCity,
          weight: quoteData.weight
        }
      });
      setQuoteSuccess(true);
      setTimeout(() => {
        setQuoteSuccess(false);
        setQuoteData({ fromCity: "", toCity: "", weight: "", phone: "" });
      }, 5000);
    } catch (error) {
      console.error("Error submitting quote request:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsQuoting(false);
    }
  };

  return (
    <div className="relative overflow-hidden bg-white">
      {/* <CelebrationPopup /> */}
      {/* <PromoPopup /> */}
      <BookNowModal isOpen={isBookNowOpen} onClose={() => setIsBookNowOpen(false)} />

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} 
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute w-[800px] h-[800px] bg-gradient-to-tr from-orange-100/60 to-blue-50/60 rounded-full blur-[120px] -z-10" 
        />
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
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="inline-flex items-center gap-2 bg-gray-900 border border-gray-800 text-white shadow-[0_0_15px_rgba(234,88,12,0.3)] text-xs font-bold px-4 py-2 rounded-full relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Zap className="w-3 h-3 text-orange-500 fill-current" />
                  FASTEST DELIVERY IN INDIA
                </div>
                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-gray-200 text-gray-900 text-xs font-bold px-4 py-2 rounded-full shadow-sm">
                  🎓 IIT ISM INCUBATED
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-[1.1] mb-6 tracking-tight">
                Shipping <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-400">made simple.</span>
              </h1>
              <p className="text-xl text-gray-500 mb-10 max-w-xl leading-relaxed">
                Ship anything, anywhere.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-center mb-10">
                <Button 
                  onClick={() => setIsBookNowOpen(true)}
                  className="flex flex-col items-center justify-center h-auto py-3 px-8 bg-gray-900 hover:bg-black text-white rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-gray-900/20 group relative overflow-hidden w-full sm:w-auto"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
                  <div className="flex items-center text-xl font-black">
                    Book Anything <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <span className="text-xs font-medium text-gray-400 mt-1">Courier, shifting, documents & more</span>
                </Button>
                
                <Button asChild variant="outline" className="flex flex-col items-center justify-center h-auto py-3 px-8 bg-white/30 backdrop-blur-md border border-white/50 hover:bg-white/50 text-gray-900 rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-xl w-full sm:w-auto">
                  <Link href="/city-parcel">
                    <div className="flex items-center text-xl font-black">
                      <Package className="mr-2 w-5 h-5 text-orange-600" /> Book OneBox
                    </div>
                    <span className="text-xs font-bold text-orange-700 mt-1">Up to 30kg. No questions asked.</span>
                  </Link>
                </Button>
              </div>
              <a 
                href="#compare" 
                onClick={(e) => { e.preventDefault(); document.getElementById('compare')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                className="text-sm text-gray-400 hover:text-orange-600 font-medium transition-colors cursor-pointer flex items-center gap-1 mb-10"
              >
                Not sure which to pick? See the difference ↓
              </a>

              <div className="flex items-center gap-6">
                <div className="flex -space-x-3 items-center">
                  {['/avatars/hero_avatar_1.png', '/avatars/hero_avatar_2.png', '/avatars/hero_avatar_3.png', '/avatars/hero_avatar_4.png'].map((src, i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-white bg-gray-200 overflow-hidden ring-2 ring-orange-50 relative">
                      <Image src={src} alt="user" fill className="object-cover" />
                    </div>
                  ))}
                </div>
                <div className="text-sm border-l-2 border-gray-100 pl-6">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex items-center gap-1 text-orange-500 bg-orange-50 px-2 py-1 rounded text-xs font-bold">
                      <Star className="w-4 h-4 fill-current" /> 4.7
                    </div>
                    <span className="text-gray-500 font-medium text-sm">Rating on Google</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-gray-500 font-medium flex items-center gap-1"><span className="text-gray-900 font-black text-lg"><AnimatedCounter end={10} suffix="k+" /></span> Shippers</p>
                    <p className="text-gray-500 font-medium flex items-center gap-1"><span className="text-gray-900 font-black text-lg"><AnimatedCounter end={50} suffix="k+" /></span> Shipments</p>
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

              <motion.div 
                animate={{ y: [-10, 10, -10] }} 
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 w-full aspect-[4/3] md:aspect-auto flex items-center justify-center group"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/30 to-transparent blur-3xl -z-10 rounded-full scale-125 group-hover:scale-150 transition-transform duration-1000"></div>
                <Image
                  src="/Delivery-boy.png"
                  alt="Engineers Parcel Delivery"
                  width={600}
                  height={500}
                  className="object-contain drop-shadow-2xl grayscale-[10%] group-hover:grayscale-0 transition-all duration-700 hover:scale-105"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════ WHICH ONE IS RIGHT FOR YOU? ══════════ */}
      <section id="compare" className="py-24 bg-white relative overflow-hidden scroll-mt-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-orange-50 to-blue-50 rounded-full blur-[120px] -z-10 opacity-60" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Which one is right for you?</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">Two simple paths. Pick the one that fits your need — no confusion, no hassle.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Book Anything Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative group bg-gray-950 text-white p-8 md:p-10 rounded-[32px] border border-gray-800 shadow-2xl hover:shadow-gray-900/30 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Truck className="w-7 h-7 text-orange-400" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black mb-2">Book Anything</h3>
                <p className="text-sm text-gray-400 font-medium mb-6">Full-service logistics for all your needs</p>
                
                <ul className="space-y-3 mb-8">
                  {[
                    "Documents & small parcels",
                    "Medicines & fragile items",
                    "Home & office shifting",
                    "Multi-item courier",
                    "International shipping",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                      <span className="text-sm font-medium">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 mb-8">
                  <Zap className="w-4 h-4 text-orange-400" />
                  <span className="text-xs text-gray-400">Price varies by weight, distance & service type</span>
                </div>

                <Button 
                  onClick={() => setIsBookNowOpen(true)}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white h-14 text-lg font-black rounded-xl shadow-lg shadow-orange-600/20 transition-all hover:scale-[1.02] active:scale-95 group/btn"
                >
                  Book Anything <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>

            {/* Book OneBox Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative group bg-gradient-to-br from-orange-50 to-white p-8 md:p-10 rounded-[32px] border-2 border-orange-200 shadow-xl hover:shadow-orange-200/50 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute top-4 right-4 bg-orange-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-orange-200/30 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Package className="w-7 h-7 text-orange-600" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">Book OneBox</h3>
                <p className="text-sm text-gray-500 font-medium mb-6">Pack it. Ship it. Done. No questions asked.</p>
                
                <ul className="space-y-3 mb-8">
                  {[
                    "One box — up to 30kg",
                    "Fixed price, no surprises",
                    "We provide the box & packing",
                    "Ideal for students & hostellers",
                    "Simplest way to ship your stuff",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700">
                      <CheckCircle className="w-4 h-4 text-orange-600 flex-shrink-0" />
                      <span className="text-sm font-medium">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-3 bg-orange-100/60 border border-orange-200 rounded-xl px-4 py-3 mb-8">
                  <span className="text-2xl font-black text-gray-900">₹299</span>
                  <span className="text-xs text-gray-500 font-bold">starting price per box</span>
                </div>

                <Button asChild className="w-full bg-gray-900 hover:bg-black text-white h-14 text-lg font-black rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-95 group/btn">
                  <Link href="/city-parcel">
                    Book OneBox <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Not sure hint */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center text-sm text-gray-400 mt-8"
          >
            Still not sure? <a href="https://wa.me/919693245615" target="_blank" rel="noopener noreferrer" className="text-orange-600 font-bold hover:underline">WhatsApp us</a> and we'll guide you in 30 seconds.
          </motion.p>
        </div>
      </section>

      {/* ══════════ TRUST LOGOS SECTION ══════════ */}
      <section className="py-10 border-y border-gray-100 bg-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest mb-8">Trusted by industry leaders & institutions</p>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {['/partner1.png', '/partner2.png', '/partner3.png', '/partner4.png', '/partner5.png', '/partner6.png', '/partner7.png', '/partner8.png'].map((src, idx) => (
              <div key={idx} className="relative w-24 h-24 sm:w-32 sm:h-32">
                <Image src={src} alt={`Partner ${idx + 1}`} fill className="object-contain" />
              </div>
            ))}
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
              icon={<Globe className="w-8 h-8" />}
              title="International"
              desc="Global logistics network spanning 200+ countries with full tracking."
              link="/services#international"
              delay={0.4}
            />
            <ServiceCard
              icon={<Zap className="w-8 h-8" />}
              title="Campus Logistics"
              desc="Specialized moving and parcel services tailored for university students."
              link="/campus-parcel"
              delay={0.5}
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
                <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start w-full">
                  <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white w-full sm:w-auto h-14 sm:h-16 px-4 sm:px-10 text-lg sm:text-xl font-black rounded-2xl shadow-2xl shadow-orange-600/30 transition-all hover:scale-105 active:scale-95 group">
                    <Link href="/campus-parcel" className="flex items-center justify-center whitespace-nowrap">
                      Book Campus Parcel
                      <ArrowRight className="ml-2 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <div className="flex items-center justify-center gap-3 w-full sm:w-auto px-6 py-3 sm:py-4 rounded-2xl border border-white/10 bg-white/5">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-white font-bold text-sm sm:text-base">1,200+ Students Served</span>
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

      {/* ══════════ INSTANT QUOTE SECTION ══════════ */}
      <section className="py-20 relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full group bg-white p-10 md:p-16 rounded-[40px] shadow-2xl border border-gray-100 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100/50 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl -z-10 -translate-x-1/3 translate-y-1/3"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/3">
              <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 flex items-center">
                <Zap className="w-8 h-8 text-orange-500 mr-3" />
                Quick Quote
              </h3>
              <p className="text-gray-500 text-lg leading-relaxed">Get an instant estimate for your shipment and a callback from our team within minutes.</p>
            </div>
            
            <div className="md:w-2/3 w-full">
            {!quoteSuccess ? (
              <form onSubmit={handleInstantQuote} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  placeholder="From City"
                  value={quoteData.fromCity}
                  onChange={(e) => setQuoteData({...quoteData, fromCity: e.target.value})}
                  className="h-14 bg-gray-50 border-gray-200 focus-visible:ring-orange-500 font-medium text-base rounded-xl"
                  required
                />
                <Input
                  placeholder="To City"
                  value={quoteData.toCity}
                  onChange={(e) => setQuoteData({...quoteData, toCity: e.target.value})}
                  className="h-14 bg-gray-50 border-gray-200 focus-visible:ring-orange-500 font-medium text-base rounded-xl"
                  required
                />
                <Input
                  placeholder="Weight (e.g. 50kg, 1BHK)"
                  value={quoteData.weight}
                  onChange={(e) => setQuoteData({...quoteData, weight: e.target.value})}
                  className="h-14 bg-gray-50 border-gray-200 focus-visible:ring-orange-500 font-medium text-base rounded-xl"
                  required
                />
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={quoteData.phone}
                  onChange={(e) => setQuoteData({...quoteData, phone: e.target.value})}
                  className="h-14 bg-gray-50 border-gray-200 focus-visible:ring-orange-500 font-medium text-base rounded-xl"
                  required
                />
                <Button 
                  type="submit" 
                  disabled={isQuoting}
                  className="col-span-1 sm:col-span-2 h-14 mt-4 bg-orange-600 hover:bg-orange-700 text-xl font-black rounded-xl shadow-lg shadow-orange-600/20"
                >
                  {isQuoting ? <Loader2 className="w-6 h-6 animate-spin" /> : "Get Estimate & Callback"}
                </Button>
              </form>
            ) : (
              <div className="py-10 text-center animate-in fade-in zoom-in bg-gray-50 rounded-2xl">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h4 className="text-2xl font-black text-gray-900">Request Sent Successfully!</h4>
                <p className="text-gray-500 font-medium mt-2 text-lg">Sushank will call you within 30 minutes.</p>
              </div>
            )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ CTA SECTION ══════════ */}
      <section className="py-32 relative overflow-hidden text-center bg-gray-950 border-t border-white/5">
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
            { name: "Rahul Kumar", place: "Dhanbad", text: "Team was professional and delivery was on time. The glassmorphism UI even made the booking process feel premium!", avatar: "/avatars/rahul_avatar.png" },
            { name: "Sneha Patel", place: "Ranchi", text: "Great shifting service, everything safe! I used their campus parcel service for my IIT graduation moving.", avatar: "/avatars/sneha_avatar.png" },
            { name: "Amit Mishra", place: "Kolkata", text: "Package reached the US in just 5 days! Their international tracking is real-time and very reliable.", avatar: "/avatars/amit_avatar.png" }
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

function AnimatedCounter({ end, suffix = "", prefix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end]);

  return <span>{prefix}{count}{suffix}</span>;
}
