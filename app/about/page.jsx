"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Award, Clock, Shield, Truck, Users, MessageCircle,
  IndianRupee, BrainCircuit, ChartCandlestick, Cpu,
  QrCode, Cog, ArrowRight, Star, Zap, Globe, Package, User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background Decorative Elements */}
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
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 text-orange-600 text-xs font-bold px-4 py-2 rounded-full mb-8">
              <Zap className="w-3 h-3 fill-current" />
              ESTABLISHED BY IIT(ISM) & CSIR
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight mb-8">
              We’re Building the <br />
              <span className="text-orange-600">Future of Logistics.</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed mb-12">
              EngineersParcel is transforming India's logistics landscape with cutting-edge AI and IoT technology. We're creating a smarter, safer, and more transparent delivery ecosystem.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white shadow-xl shadow-gray-200/50 border border-gray-100">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
                  <Package className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">Total Volume</p>
                  <p className="text-xl font-black text-gray-900">7,000kg+</p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white shadow-xl shadow-gray-200/50 border border-gray-100">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                  <Users className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">Pincodes</p>
                  <p className="text-xl font-black text-gray-900">19,000+</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════ OUR STORY ══════════ */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8">
                A Tech-First <br />
                <span className="text-orange-600">Origin Story.</span>
              </h2>
              <div className="space-y-6">
                <p className="text-lg text-gray-600 leading-relaxed">
                  Engineers Parcel was born in the middle of the pandemic at <span className="font-bold text-gray-900">IIT(ISM) Dhanbad</span>. We saw the critical need for secure, hygienic, and highly-trackable logistics during a global crisis.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  What started as a campus solution has rapidly scaled into a national mission. We identified massive gaps in Tier-2 and Tier-3 cities and filled them with technical excellence and customer-centric design.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Today, we're not just moving boxes; we're moving the needle on how India perceives delivery quality.
                </p>
              </div>

              <div className="mt-12 flex items-center gap-6">
                <div className="h-1 bg-gray-100 flex-1 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-600 w-3/4"></div>
                </div>
                <p className="text-gray-900 font-black text-lg italic">"Innovation at speed."</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <div className="absolute -inset-4 bg-orange-600/20 rounded-[4rem] blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
              <div className="relative rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
                <Image
                  src="/our-story.jpg"
                  alt="EngineersParcel Team"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════ CORE VALUES ══════════ */}
      <section className="py-32 relative bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Our DNA</h2>
              <p className="text-lg text-gray-500 leading-relaxed">
                The principles that guide every AI algorithm we write and every package we deliver.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard
              icon={<Shield className="w-8 h-8" />}
              title="Unshakeable Trust"
              desc="We treat every parcel like our own. Safety isn't just a feature; it's our foundational promise."
              delay={0.1}
            />
            <ValueCard
              icon={<Users className="w-8 h-8" />}
              title="Human-Centric AI"
              desc="Technology is our tool, but people are our purpose. We build systems that solve real human problems."
              delay={0.2}
            />
            <ValueCard
              icon={<Award className="w-8 h-8" />}
              title="Engineered Excellence"
              desc="Good enough isn't enough. We strive for mathematical precision in every delivery route."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* ══════════ UNIQUE SELLING POINTS ══════════ */}
      <section className="py-32 relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="glass p-12 lg:p-20 rounded-[60px] border border-gray-100 shadow-2xl"
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 underline decoration-orange-600 decoration-8 underline-offset-8">
                Why We’re Different
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-orange-600/20">
                  <Cpu className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-gray-900">AI-IoT Core</h3>
                <p className="text-gray-500 leading-relaxed italic">
                  "India’s First AI-IoT Logistics Platform. We don't just track; we predict and optimize."
                </p>
              </div>

              <div className="space-y-6">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-600/20">
                  <ChartCandlestick className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-gray-900">Dynamic Pricing</h3>
                <p className="text-gray-500 leading-relaxed italic">
                  "Algorithmically adapted pricing. No hidden costs, just fair value calculated in real-time."
                </p>
              </div>

              <div className="space-y-6">
                <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-purple-600/20">
                  <QrCode className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-gray-900">Instant Updates</h3>
                <p className="text-gray-500 leading-relaxed italic">
                  "Automated hub scan notifications via WhatsApp. You're never in the dark about your parcel."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════ PACKERS & MOVERS ══════════ */}
      <section className="py-24 relative bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative order-2 lg:order-1"
            >
              <div className="absolute -inset-4 bg-blue-600/10 rounded-[4rem] blur-3xl transition-transform duration-700"></div>
              <div className="relative rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
                <Image
                  src="/ai-packer-mover.jpg"
                  alt="AI Packers and Movers"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-6 bottom-6 glass p-6 rounded-3xl border-white/40">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                      <BrainCircuit className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-gray-900">AI Surveyor</p>
                      <p className="text-xs text-gray-500">Auto Space Estimation</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8">
                AI-Powered <br />
                <span className="text-blue-600">Packers & Movers.</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Traditional moving is broken. We fixed it with AI and IoT. Our systems ensure safety, transparency, and efficiency at every step of your journey.
              </p>

              <ul className="space-y-4">
                <ServiceFeature icon={<Zap className="w-4 h-4" />} text="App-based Video Survey for auto-estimation." />
                <ServiceFeature icon={<Zap className="w-4 h-4" />} text="Smart Load Balancing Algorithms." />
                <ServiceFeature icon={<Zap className="w-4 h-4" />} text="IoT Barcode Labels for box-level tracking." />
                <ServiceFeature icon={<Zap className="w-4 h-4" />} text="Auto Damage Reporting via app photos." />
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════ HYPERLOCAL SECTION ══════════ */}
      <section className="py-24 relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8">
                Hyperlocal <br />
                <span className="text-orange-600">Pick & Drop.</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-12">
                Seamless same-city delivery designed for the fast-paced lifestyle. From hostels to homes, we pick up instantly.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100 hover:border-orange-200 transition-colors">
                  <Clock className="w-8 h-8 text-orange-600 mb-4" />
                  <h4 className="font-black text-gray-900 mb-2">Instant Pickup</h4>
                  <p className="text-sm text-gray-500 italic">QR scan collection from your doorstep.</p>
                </div>
                <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100 hover:border-blue-200 transition-colors">
                  <MessageCircle className="w-8 h-8 text-blue-600 mb-4" />
                  <h4 className="font-black text-gray-900 mb-2">WhatsApp Booking</h4>
                  <p className="text-sm text-gray-500 italic">Book on the go with our smart chatbot.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-orange-600/5 rounded-[4rem] border-2 border-dashed border-orange-600/20"></div>
              <div className="relative p-12 lg:p-20 text-center">
                <div className="w-24 h-24 bg-orange-100 rounded-3xl flex items-center justify-center text-orange-600 mx-auto mb-8 animate-bounce-slow">
                  <Truck className="w-12 h-12" />
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-4">Same-Area Clustering</h3>
                <p className="text-gray-500 italic">"Our algorithms group pickups in real-time, reducing carbon footprint and increasing speed."</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════ OUR TEAM ══════════ */}
      <section className="py-32 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-orange-600 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[150px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-24">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-white mb-6"
            >
              The Minds Behind the Mission
            </motion.h2>
            <p className="text-lg text-gray-400">Meet the engineers and visionaries redefining Indian logistics.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <TeamMember name="Subham Sawarnkar" role="Founder & CEO" delay={0.1} />
            <TeamMember name="Sabir" role="Operations Director" delay={0.2} />
            <TeamMember name="Raj Chatterjee" role="Technology Head" delay={0.3} />
            <TeamMember name="Suraj" role="Customer Relations" delay={0.4} />
          </div>
        </div>
      </section>

      {/* ══════════ FINAL CTA ══════════ */}
      <section className="py-32 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-orange-600 rounded-[50px] p-12 md:p-20 text-white shadow-2xl shadow-orange-600/20"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-8">Ready to ship smarter?</h2>
            <p className="text-xl text-orange-100 mb-12 leading-relaxed">
              Join the revolution and experience logistics as it should be—fast, transparent, and built by engineers.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button asChild className="bg-white text-orange-600 hover:bg-orange-50 h-16 px-12 text-xl font-black rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-xl">
                <Link href="/booking">Book Now</Link>
              </Button>
              <Button asChild variant="ghost" className="text-white border-2 border-white/30 hover:border-white hover:bg-white/10 h-16 px-12 text-xl font-black rounded-2xl transition-all hover:scale-105 active:scale-95">
                <Link href="/services">Our Services</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function ServiceFeature({ icon, text }) {
  return (
    <li className="flex items-center gap-4 text-gray-600">
      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-orange-600 group-hover:text-white transition-all">
        {icon}
      </div>
      <span className="font-semibold">{text}</span>
    </li>
  );
}

/* ══════════ REUSABLE COMPONENTS ══════════ */

function ValueCard({ icon, title, desc, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="group glass p-10 rounded-[40px] border border-white hover:border-orange-200 shadow-sm hover:shadow-2xl transition-all duration-500"
    >
      <div className="w-16 h-16 bg-orange-50 rounded-2xl text-orange-600 flex items-center justify-center mb-8 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500">
        {icon}
      </div>
      <h3 className="text-2xl font-black text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-500 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function TeamMember({ name, role, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="group"
    >
      <div className="relative aspect-square rounded-[40px] overflow-hidden mb-6 bg-[#0B2434] border border-white/5 flex items-center justify-center transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-blue-900/20">
        <Users className="w-1/2 h-1/2 text-[#38BDF8] drop-shadow-[0_0_15px_rgba(56,189,248,0.4)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2434] to-transparent opacity-40"></div>
      </div>
      <h3 className="text-xl font-black text-white mb-1">{name}</h3>
      <p className="text-orange-500 font-bold uppercase tracking-widest text-xs">{role}</p>
    </motion.div>
  );
}
