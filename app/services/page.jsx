"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Box, Clock, Globe, MapPin, Package, Truck,
  ArrowRight, CheckCircle2, Zap, Shield, Sparkles,
  ZapIcon as Flash, IndianRupee, Map
} from "lucide-react";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function ServicesPage() {
  return (
    <div className="relative overflow-hidden bg-white min-h-screen">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-orange-100/50 rounded-full blur-[120px] -translate-y-1/2"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[120px]"></div>
      </div>

      {/* ══════════ HERO SECTION ══════════ */}
      <section className="relative pt-24 pb-32 lg:pt-32 lg:pb-48">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 text-orange-600 text-xs font-black px-4 py-2 rounded-full mb-8 tracking-widest uppercase">
              <Flash className="w-3 h-3 fill-current" />
              Engineered Logistics Solutions
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight mb-8">
              Precision Shipping. <br />
              <span className="text-orange-600">Universal Coverage.</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
              From hyperlocal parcel drops to global supply chain management, we combine AI technology with physical precision to move your world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════ MAIN SERVICES ══════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32 pb-32">

        {/* 1. Courier Service */}
        <ServiceSection
          id="courier"
          icon={<Package className="w-8 h-8" />}
          title="National Courier"
          subtitle="Fast, Safe, and Smarter."
          desc="Our AI-driven courier network ensures your documents and packages are delivered across 19,000+ pin codes with unshakeable reliability."
          features={[
            "Express transit for critical shipments",
            "End-to-end automated hub tracking",
            "Smart routing via neural networks"
          ]}
          imgSrc="/main-service.jpg"
          imgAlt="Professional Courier Service"
          ctaLink="/booking"
          ctaText="Book Courier Service"
        />

        {/* 2. Shifting & Moving */}
        <ServiceSection
          id="shifting"
          icon={<Truck className="w-8 h-8" />}
          title="Packers & Movers"
          subtitle="Relocating with IQ."
          desc="Moving your home or office? Our AI Packers & Movers handle everything from automated space estimation to IoT-tracked transport."
          features={[
            "App-based furniture volume survey",
            "High-security IoT barcode tracking",
            "Specialized fragile item handling"
          ]}
          imgSrc="/shifing.jpg"
          imgAlt="Shifting and Moving Service"
          ctaLink="/get-quote"
          ctaText="Get a Moving Quote"
          reverse
        />

        {/* 3. Local Parcel Service */}
        <ServiceSection
          id="local"
          icon={<Box className="w-8 h-8" />}
          title="Hyperlocal Delivery"
          subtitle="City speed, redefined."
          desc="The fastest way to move items within your city. Perfect for gift drops, document exchanges, and business deliveries."
          features={[
            "Instant pickup via hostel/doorstep scans",
            "Same-day delivery within 4 hours",
            "Optimal grouping for low-carbon delivery"
          ]}
          imgSrc="/local-delivery.jpg"
          imgAlt="Local Parcel Service"
          ctaLink="/booking"
          ctaText="Book Local Pickup"
        />

        {/* 4. International Service */}
        <ServiceSection
          id="international"
          icon={<Globe className="w-8 h-8" />}
          title="Global Shipping"
          subtitle="Borders are just lines."
          desc="Connect to 200+ countries with our cost-effective international shipping solutions. We handle the complexity, you ship the parcel."
          features={[
            "Pre-filled customs documentation",
            "Specialized handling for exports",
            "International door-to-door transit"
          ]}
          imgSrc="/service.jpg"
          imgAlt="International Courier"
          ctaLink="/booking"
          ctaText="Ship Internationally"
          reverse
        />
      </div>

      {/* ══════════ PRICE RATES SECTION ══════════ */}
      <section className="py-32 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-600 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-blue-600 rounded-full blur-[150px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Transparency First</h2>
              <p className="text-lg text-gray-400">Competitive, algorithmic pricing with zero hidden surprises.</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <PricingCard
              title="Local Pickup"
              price="50"
              features={["Within city limits", "Up to 5kg weight", "4-hour delivery", "Real-time tracking"]}
              color="orange"
              delay={0.1}
            />
            <PricingCard
              title="Domestic Express"
              price="100"
              features={["Pan-India delivery", "Up to 10kg weight", "2-3 days transit", "Insurance included"]}
              color="blue"
              delay={0.2}
            />
            <PricingCard
              title="Home Shifting"
              price="4,999"
              features={["Full packing/unpacking", "Loading/Unloading", "Transit insurance", "Dedicated manager"]}
              color="purple"
              delay={0.3}
            />
            <PricingCard
              title="International"
              price="1,499"
              features={["Worldwide coverage", "Customs support", "Door-to-door shipping", "Global tracking"]}
              color="teal"
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* ══════════ FINAL CTA ══════════ */}
      <section className="py-32 bg-white text-center">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-orange-600 rounded-[60px] p-12 md:p-24 text-white shadow-2xl shadow-orange-600/20 relative overflow-hidden"
          >
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-orange-400/20 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Need a customized <br /> enterprise solution?</h2>
              <p className="text-xl text-orange-50 mb-12 max-w-2xl mx-auto leading-relaxed">
                Our engineers work with businesses to design custom logistics pipelines. Let’s talk about your requirements.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Button asChild className="bg-white text-orange-600 hover:bg-orange-50 h-16 px-12 text-xl font-black rounded-2xl transition-all shadow-xl hover:scale-105 active:scale-95">
                  <Link href="/contact">Consult an Engineer</Link>
                </Button>
                <Button asChild variant="ghost" className="text-white border-2 border-white/30 hover:border-white hover:bg-white/10 h-16 px-12 text-xl font-black rounded-2xl transition-all hover:scale-105 active:scale-95">
                  <Link href="/price-estimator">Get Custom Quote</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

/* ══════════ REUSABLE COMPONENTS ══════════ */

function ServiceSection({ id, icon, title, subtitle, desc, features, imgSrc, imgAlt, ctaLink, ctaText, reverse = false }) {
  return (
    <section id={id} className="relative">
      <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16 lg:gap-24`}>
        <motion.div
          initial={{ opacity: 0, x: reverse ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1 space-y-8"
        >
          <div className="inline-flex items-center gap-3">
            <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 shadow-lg shadow-orange-100/50">
              {icon}
            </div>
            <div>
              <p className="text-orange-600 font-black text-xs tracking-widest uppercase">{subtitle}</p>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900">{title}</h2>
            </div>
          </div>

          <p className="text-lg text-gray-500 leading-relaxed italic border-l-4 border-gray-100 pl-6">
            "{desc}"
          </p>

          <ul className="space-y-4">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-3 text-gray-700 font-bold group">
                <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div className="pt-4">
            <Button asChild className="bg-orange-600 hover:bg-orange-700 h-14 px-10 text-lg font-black rounded-xl transition-all shadow-xl shadow-orange-600/20 active:scale-95">
              <Link href={ctaLink} className="flex items-center gap-2">
                {ctaText} <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1 relative group"
        >
          <div className="absolute -inset-4 bg-orange-600/10 rounded-[4rem] blur-3xl group-hover:bg-orange-600/20 transition-all duration-700"></div>
          <div className="relative rounded-[40px] overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
            <Image
              src={imgSrc}
              alt={imgAlt}
              fill
              className="object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PricingCard({ title, price, features, color, delay }) {
  const colorClasses = {
    orange: "text-orange-500 bg-orange-500 shadow-orange-500/20",
    blue: "text-blue-500 bg-blue-500 shadow-blue-500/20",
    purple: "text-purple-500 bg-purple-500 shadow-purple-500/20",
    teal: "text-teal-500 bg-teal-500 shadow-teal-500/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="glass-dark border border-white/5 p-8 rounded-[40px] hover:border-white/10 transition-all group"
    >
      <h3 className="text-xl font-black text-white mb-4 group-hover:text-orange-500 transition-colors">{title}</h3>
      <div className="flex items-baseline gap-1 mb-8">
        <span className="text-white font-black text-4xl leading-none">₹{price}</span>
        <span className="text-gray-500 text-sm italic">onwards</span>
      </div>

      <ul className="space-y-4 mb-8">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-3 text-gray-400 text-sm">
            <div className={`w-1.5 h-1.5 rounded-full ${colorClasses[color].split(' ')[1]}`}></div>
            {f}
          </li>
        ))}
      </ul>

      <Button asChild className={`w-full h-12 rounded-2xl font-black text-white ${colorClasses[color].split(' ')[1]} hover:scale-105 active:scale-95 transition-all shadow-xl`}>
        <Link href="/booking">Select Plan</Link>
      </Button>
    </motion.div>
  );
}
