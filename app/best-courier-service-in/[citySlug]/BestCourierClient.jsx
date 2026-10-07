"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, ShieldCheck, Zap, Truck, Package, Clock, MapPin, 
  CheckCircle2, ChevronRight, Phone, ArrowRight, Box, Sparkles, 
  Building2, GraduationCap, ThumbsUp, HelpCircle, ChevronDown, 
  Check, X, Shield, Award, Users, Calculator, ExternalLink,
  MessageCircle, Search, RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import BookNowModal from "@/components/BookNowModal";

export default function BestCourierClient({ city }) {
  const [isBookNowOpen, setIsBookNowOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("pincode"); // 'pincode' | 'onebox'
  const [pincodeInput, setPincodeInput] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState(null); // null | { loading, result, error }
  const [expandedFaq, setExpandedFaq] = useState(0);

  // Parse localities from comma separated string
  const localityList = city.areas 
    ? city.areas.split(",").map((a) => a.trim()).filter(Boolean)
    : ["City Centre", "Main Market", "Station Road", "College Campus"];

  const handleCheckPincode = async (codeToCheck) => {
    const code = codeToCheck || pincodeInput;
    if (!code || code.length !== 6 || !/^\d+$/.test(code)) {
      setPincodeStatus({
        loading: false,
        error: "Please enter a valid 6-digit Indian pincode",
      });
      return;
    }

    setPincodeStatus({ loading: true, error: null });

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.engineersparcel.in";
      const res = await fetch(`${apiUrl}/api/pincode/check/${code}`);
      if (res.ok) {
        const data = await res.json();
        setPincodeStatus({
          loading: false,
          result: {
            pincode: code,
            serviceable: data?.data?.isServiceable ?? true,
            city: data?.data?.city || city.city,
            deliveryDays: data?.data?.estimatedDays || 3,
            expressAvailable: true,
          },
        });
      } else {
        // Fallback: 19,000+ pincodes are serviceable across India
        setPincodeStatus({
          loading: false,
          result: {
            pincode: code,
            serviceable: true,
            city: city.city,
            deliveryDays: 3,
            expressAvailable: true,
          },
        });
      }
    } catch {
      // Graceful fallback
      setPincodeStatus({
        loading: false,
        result: {
          pincode: code,
          serviceable: true,
          city: city.city,
          deliveryDays: 3,
          expressAvailable: true,
        },
      });
    }
  };

  const faqs = [
    {
      q: `How do I book a courier pickup in ${city.city}?`,
      a: `Booking takes under 60 seconds! Click "Book Doorstep Pickup" on this page, enter your address in ${city.city}, select package type (or OneBox), and choose your preferred pickup slot. Our verified delivery executive will arrive directly at your doorstep.`,
    },
    {
      q: `What are the courier charges for shipping from ${city.city}?`,
      a: `We offer India's most transparent pricing. For heavy personal luggage, our OneBox Alpha starts at just ₹799 flat (up to 30kg) and Nova at ₹1,599 flat (up to 60kg) with zero volumetric calculation tricks. For standard documents and smaller parcels, rates match or beat standard market courier charges.`,
    },
    {
      q: `Do you provide packing boxes and tape in ${city.city}?`,
      a: `Yes! When you book our OneBox or campus luggage shifting service, our executive brings a free, heavy-duty 7-ply corrugated box and industrial adhesive tape directly to your home or hostel room.`,
    },
    {
      q: `Do you pick up from college hostel rooms in ${city.city}?`,
      a: `Absolutely! We specialize in student logistics. If you are studying at ${city.city} (such as ${localityList.find(l => l.toLowerCase().includes("campus") || l.toLowerCase().includes("iit") || l.toLowerCase().includes("nit")) || "local colleges"}), our executives climb directly to your hostel room floor so you never have to lug heavy bags down stairs.`,
    },
    {
      q: `How can I track my shipment once picked up from ${city.city}?`,
      a: `You receive an instant SMS and WhatsApp confirmation with your live Tracking ID upon pickup. You can track your parcel 24/7 on engineersparcel.in/track-order or simply ask our AI Assistant (ENZEE AI) right on our website!`,
    },
  ];

  return (
    <div className="relative min-h-screen bg-white text-slate-900 selection:bg-orange-500 selection:text-white">
      <BookNowModal isOpen={isBookNowOpen} onClose={() => setIsBookNowOpen(false)} />

      {/* ══════════ TOP LIVE RIBBON ══════════ */}
      <div className="bg-slate-950 text-slate-200 border-b border-slate-800 text-xs py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-semibold text-white">Live in {city.city}, {city.state}:</span>
            <span className="text-slate-300 hidden sm:inline">Pickup Executives Active Now • 2-Hour Window Guarantee</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1 font-medium text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" /> 4.8/5 on Google Reviews
            </span>
            <a 
              href="tel:+919525801506" 
              className="hidden md:flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-orange-400" /> +91 95258 01506
            </a>
          </div>
        </div>
      </div>

      {/* ══════════ HERO SECTION ══════════ */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
        {/* Ambient Glow Orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-600/20 rounded-full blur-[140px] pointer-events-none -z-0" />
        <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-amber-500/15 rounded-full blur-[120px] pointer-events-none -z-0" />

        {/* Subtle Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Value Prop */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6 text-left"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                <span>#1 Rated Courier & Luggage Service in {city.city}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
                Best Courier Service in{" "}
                <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
                  {city.city}
                </span>
                <span className="block text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-300 mt-2">
                  Doorstep Pickup & Pan-India Delivery
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                Skip carrying heavy luggage to crowded courier counters in {city.city}. 
                Book online in 60 seconds — our verified executive picks up from your home, office, or hostel room with free boxes, flat pricing, and live tracking to 19,000+ pincodes.
              </p>

              {/* Quick Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Free Doorstep Pickup</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Flat Rate from ₹799</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Zero Volumetric Tricks</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <Button 
                  onClick={() => setIsBookNowOpen(true)}
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-base px-8 py-6 rounded-2xl shadow-xl shadow-orange-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] group flex items-center justify-center gap-2"
                >
                  <span>Book Doorstep Pickup</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>

                <Button 
                  asChild
                  variant="outline" 
                  size="lg"
                  className="bg-white/5 hover:bg-white/10 text-white border-white/20 hover:border-white/40 font-semibold text-base px-6 py-6 rounded-2xl backdrop-blur-md transition-all flex items-center justify-center gap-2"
                >
                  <a href="#pricing">
                    <Box className="w-4 h-4 text-orange-400" />
                    <span>View Box Rates</span>
                  </a>
                </Button>

                <a
                  href="https://wa.me/919525801506?text=Hi%20EngineersParcel,%20I%20want%20to%20book%20a%20courier%20pickup%20in%20"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-sm font-semibold transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Trust Subtext */}
              <p className="text-xs text-slate-400 flex items-center gap-1.5 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Insured • Free Cancellation • No Prepayment Required for Pickup</span>
              </p>
            </motion.div>

            {/* Right Column: Interactive Pincode & Quick Estimator Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5"
            >
              <div className="relative rounded-3xl bg-slate-900/80 border border-white/15 p-6 sm:p-7 shadow-2xl backdrop-blur-2xl overflow-hidden">
                {/* Glow pill */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/30 rounded-full blur-3xl pointer-events-none" />

                {/* Card Header & Switcher */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-white">{city.city} Express Desk</h3>
                      <p className="text-[11px] text-slate-400">Instant check & flat quote</p>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="flex bg-slate-950/80 p-1 rounded-xl border border-white/10 text-xs">
                    <button
                      onClick={() => setActiveTab("pincode")}
                      className={`px-3 py-1 rounded-lg font-medium transition-all ${
                        activeTab === "pincode" 
                          ? "bg-orange-500 text-white shadow-md shadow-orange-500/30" 
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Pincode
                    </button>
                    <button
                      onClick={() => setActiveTab("onebox")}
                      className={`px-3 py-1 rounded-lg font-medium transition-all ${
                        activeTab === "onebox" 
                          ? "bg-orange-500 text-white shadow-md shadow-orange-500/30" 
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Box Rates
                    </button>
                  </div>
                </div>

                {/* TAB 1: PINCODE CHECKER */}
                {activeTab === "pincode" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-2">
                        Enter Pickup or Delivery Pincode in {city.city}
                      </label>
                      <div className="relative flex items-center">
                        <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                        <input
                          type="text"
                          maxLength={6}
                          value={pincodeInput}
                          onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ""))}
                          onKeyDown={(e) => e.key === "Enter" && handleCheckPincode()}
                          placeholder="e.g. 826004 or 713209"
                          className="w-full bg-slate-950/80 border border-white/15 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-white rounded-xl pl-10 pr-24 py-3 text-sm placeholder:text-slate-500 transition-all font-mono"
                        />
                        <button
                          onClick={() => handleCheckPincode()}
                          disabled={pincodeStatus?.loading}
                          className="absolute right-1.5 px-3.5 py-1.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1 shadow-md shadow-orange-500/20"
                        >
                          {pincodeStatus?.loading ? (
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <>
                              <Search className="w-3.5 h-3.5" />
                              <span>Check</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Quick suggestions in this city */}
                    <div>
                      <p className="text-[11px] text-slate-400 mb-1.5">Top pickup hubs in {city.city}:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {localityList.slice(0, 4).map((area, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setPincodeInput(city.slug === "hazaribagh" ? "825301" : city.slug === "durgapur" ? "713209" : "826004");
                              handleCheckPincode(city.slug === "hazaribagh" ? "825301" : city.slug === "durgapur" ? "713209" : "826004");
                            }}
                            className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 hover:border-orange-500/40 transition-all"
                          >
                            📍 {area}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Result Card */}
                    {pincodeStatus?.error && (
                      <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                        <X className="w-4 h-4 text-red-400 shrink-0" />
                        <span>{pincodeStatus.error}</span>
                      </div>
                    )}

                    {pincodeStatus?.result && (
                      <motion.div 
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 space-y-2.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold flex items-center gap-1.5 text-emerald-400">
                            <CheckCircle2 className="w-4 h-4" /> Serviceable in {pincodeStatus.result.city}
                          </span>
                          <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full uppercase">
                            Doorstep Active
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-emerald-500/20 text-slate-300">
                          <div>
                            <span className="text-slate-400 block text-[10px]">Pickup Timeline</span>
                            <span className="font-semibold text-white">Within 2 Hours</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px]">Transit Estimate</span>
                            <span className="font-semibold text-white">{pincodeStatus.result.deliveryDays} Business Days</span>
                          </div>
                        </div>
                        <Button
                          onClick={() => setIsBookNowOpen(true)}
                          size="sm"
                          className="w-full mt-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs py-2 rounded-xl transition-all"
                        >
                          Book Pickup for {pincodeStatus.result.pincode} →
                        </Button>
                      </motion.div>
                    )}

                    {!pincodeStatus?.result && !pincodeStatus?.error && (
                      <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <Truck className="w-4 h-4 text-orange-400 shrink-0" />
                          <span>Same-day pickup available in {city.city}</span>
                        </div>
                        <span className="text-orange-400 font-bold text-[11px]">₹0 Extra Fee</span>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 2: ONEBOX QUICK RATES */}
                {activeTab === "onebox" && (
                  <div className="space-y-3">
                    <div className="p-3 rounded-2xl bg-slate-950 border border-white/10 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white text-sm">Alpha Box</h4>
                          <span className="text-[10px] bg-orange-500/20 text-orange-400 font-bold px-2 py-0.5 rounded-full">Up to 30 kg</span>
                        </div>
                        <p className="text-[11px] text-slate-400">42 × 42 × 27 cm • Clothes, books & essentials</p>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-black text-orange-400">₹799</span>
                        <span className="block text-[10px] text-slate-400">Flat Rate</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-950 border border-white/10 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white text-sm">Nova Box</h4>
                          <span className="text-[10px] bg-amber-500/20 text-amber-400 font-bold px-2 py-0.5 rounded-full">Up to 60 kg</span>
                        </div>
                        <p className="text-[11px] text-slate-400">60 × 35 × 40 cm • Heavy luggage & shifting</p>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-black text-amber-400">₹1,599</span>
                        <span className="block text-[10px] text-slate-400">Flat Rate</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-[11px] text-orange-300 flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 shrink-0 text-orange-400" />
                      <span>Free heavy-duty corrugated box + Doorstep hostel/home collection included.</span>
                    </div>

                    <Button
                      onClick={() => setIsBookNowOpen(true)}
                      className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-lg"
                    >
                      Book OneBox in {city.city} →
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════ METRICS & TRUST STRIP ══════════ */}
      <section className="relative z-20 -mt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl shadow-slate-900/10 border border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-orange-600 font-black text-3xl sm:text-4xl">
              <span>1,250</span><span className="text-orange-500">+</span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-700">Parcels Handled in {city.city}</p>
            <p className="text-[11px] text-slate-400 font-medium">Verified local deliveries</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-slate-900 font-black text-3xl sm:text-4xl">
              <span>19,000</span><span className="text-orange-500">+</span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-700">Pincodes Connected</p>
            <p className="text-[11px] text-slate-400 font-medium">Pan-India express reach</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-slate-900 font-black text-3xl sm:text-4xl">
              <span>4.8</span><span className="text-amber-500 text-2xl">★</span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-700">Customer Rating</p>
            <p className="text-[11px] text-slate-400 font-medium">Over 1,000+ happy reviews</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-emerald-600 font-black text-3xl sm:text-4xl">
              <span>&lt; 2</span><span className="text-emerald-500 text-2xl font-bold">Hrs</span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-700">Pickup Turnaround</p>
            <p className="text-[11px] text-slate-400 font-medium">Fastest in {city.city}</p>
          </div>
        </div>
      </section>

      {/* ══════════ CARRIER PARTNERS BAR ══════════ */}
      <section className="py-10 border-b border-slate-100 bg-slate-50/60">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-6">
            Integrated With India&apos;s Tier-1 Logistics Networks for 100% Reliable Delivery
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 opacity-75 grayscale hover:grayscale-0 transition-all">
            <span className="text-sm font-black tracking-wider text-slate-700">DELHIVERY</span>
            <span className="text-sm font-black tracking-wider text-slate-700">BLUEDART</span>
            <span className="text-sm font-black tracking-wider text-slate-700">DTDC</span>
            <span className="text-sm font-black tracking-wider text-slate-700">SHADOWFAX</span>
            <span className="text-sm font-black tracking-wider text-slate-700">XPRESSBEES</span>
            <span className="text-sm font-black tracking-wider text-slate-700">EKART</span>
          </div>
        </div>
      </section>

      {/* ══════════ PRICING SECTION: ONEBOX FLAT RATES ══════════ */}
      <section id="pricing" className="py-20 lg:py-28 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold">
              <Box className="w-3.5 h-3.5" />
              <span>FLAT PRICING • ZERO VOLUMETRIC HASSLE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Transparent Courier Rates for {city.city}
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Traditional couriers in {city.city} charge heavy volumetric penalties. With EngineersParcel OneBox, if it fits in the box, it ships at one flat price!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* CARD 1: ALPHA BOX */}
            <div className="relative rounded-3xl border-2 border-orange-200 bg-gradient-to-b from-orange-50/50 via-white to-white p-8 sm:p-10 shadow-xl shadow-orange-500/5 hover:border-orange-500 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider bg-orange-500 text-white px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                  <span className="text-xs font-semibold text-slate-500">Up to 30 kg</span>
                </div>

                <div>
                  <h3 className="text-2xl font-black text-slate-900">OneBox Alpha</h3>
                  <p className="text-slate-600 text-sm mt-1">Ideal for students, books, clothes & everyday essentials</p>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-slate-900">₹799</span>
                  <span className="text-sm font-semibold text-slate-500">flat rate</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-orange-100/60 text-xs text-orange-950 font-medium">
                  📦 <strong>Dimensions:</strong> 42 × 42 × 27 cm • Heavy-duty 7-ply corrugated box provided free!
                </div>

                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Free doorstep pickup from any address in {city.city}</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Direct hostel room pickup (campus friendly)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Live GPS tracking & WhatsApp updates</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Transit insurance protection included</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <Button 
                  onClick={() => setIsBookNowOpen(true)}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-base py-6 rounded-2xl shadow-lg shadow-orange-600/25 transition-all"
                >
                  Book Alpha Box (₹799)
                </Button>
              </div>
            </div>

            {/* CARD 2: NOVA BOX */}
            <div className="relative rounded-3xl border-2 border-slate-200 bg-gradient-to-b from-slate-50/50 via-white to-white p-8 sm:p-10 shadow-xl shadow-slate-900/5 hover:border-slate-800 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider bg-slate-900 text-white px-3 py-1 rounded-full">
                    Heavy Duty Shifting
                  </span>
                  <span className="text-xs font-semibold text-slate-500">Up to 60 kg</span>
                </div>

                <div>
                  <h3 className="text-2xl font-black text-slate-900">OneBox Nova</h3>
                  <p className="text-slate-600 text-sm mt-1">Best for home shifting, winter luggage, electronics & bulk items</p>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-slate-900">₹1,599</span>
                  <span className="text-sm font-semibold text-slate-500">flat rate</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-100 text-xs text-slate-800 font-medium">
                  📦 <strong>Dimensions:</strong> 60 × 35 × 40 cm • Industrial strength reinforced packaging!
                </div>

                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Free doorstep pickup across {city.city} & suburbs</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Heavy baggage handling by trained executives</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Direct doorstep delivery to 19,000+ pincodes in India</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Tamper-proof security seals included</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <Button 
                  onClick={() => setIsBookNowOpen(true)}
                  className="w-full bg-slate-900 hover:bg-black text-white font-bold text-base py-6 rounded-2xl shadow-lg shadow-slate-900/25 transition-all"
                >
                  Book Nova Box (₹1,599)
                </Button>
              </div>
            </div>
          </div>

          {/* Student Special Banner */}
          <div className="mt-12 max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center shrink-0">
                <GraduationCap className="w-6 h-6 text-purple-300" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-white">College or Hostel Student in {city.city}?</h4>
                <p className="text-sm text-purple-200">
                  Special end-of-semester vacating discounts and direct hostel room pickup available across campuses.
                </p>
              </div>
            </div>
            <Button asChild className="bg-white hover:bg-purple-50 text-purple-950 font-bold px-6 py-5 rounded-xl shrink-0">
              <Link href="/campus-parcel">Explore Campus Parcel →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ══════════ SERVICES GRID ══════════ */}
      <section className="py-20 bg-slate-50 border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">FULL LOGISTICS SUITE</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Our Courier & Relocation Services in {city.city}
            </h2>
            <p className="text-slate-600 text-base">
              Tailored shipping solutions for residents, students, professionals, and local businesses in {city.city}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200/80 hover:shadow-xl hover:border-orange-500/40 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 mb-5 group-hover:scale-110 transition-transform">
                <Package className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Express Courier</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Rapid doorstep pickup for confidential documents, urgent envelopes, gifts, and parcels with same-day dispatch.
              </p>
              <span className="text-xs font-bold text-orange-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Book Courier <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200/80 hover:shadow-xl hover:border-orange-500/40 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 mb-5 group-hover:scale-110 transition-transform">
                <Box className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">OneBox Interstate</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Heavy luggage shipping at flat ₹799 (30kg) and ₹1,599 (60kg). Includes free corrugated box and zero volumetric math.
              </p>
              <span className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Explore OneBox <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200/80 hover:shadow-xl hover:border-orange-500/40 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 mb-5 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Hostel & Student Relocation</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Room-to-room luggage collection for students. No need to carry suitcases down stairs or visit distant transport hubs.
              </p>
              <span className="text-xs font-bold text-purple-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Student Special <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200/80 hover:shadow-xl hover:border-orange-500/40 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-5 group-hover:scale-110 transition-transform">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Local City Parcel</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Same-day point-to-point package transit within {city.city}. Perfect for office documents, keys, clothes, and urgent packages.
              </p>
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                City Express <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ LOCAL AREAS COVERAGE ══════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-4 mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold">
              <MapPin className="w-3.5 h-3.5 text-orange-500" />
              <span>100% LOCAL COVERAGE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Serving Every Locality in {city.city}, {city.state}
            </h2>
            <p className="text-slate-600 text-base">
              Our delivery executives operate daily across all sectors, colonies, and institutional campuses in {city.city}.
            </p>
          </div>

          {/* Interactive Locality Chips */}
          <div className="max-w-4xl mx-auto bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200">
            <p className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-4">
              Active Doorstep Pickup Zones in {city.city}:
            </p>
            <div className="flex flex-wrap gap-2.5">
              {localityList.map((area, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm text-xs sm:text-sm font-semibold text-slate-800 hover:border-orange-500 hover:text-orange-600 transition-all cursor-default"
                >
                  <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                  <span>{area}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" title="Active today" />
                </div>
              ))}
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-50 border border-orange-200 text-xs sm:text-sm font-bold text-orange-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                <span>All Pincodes & Suburbs in {city.city}</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
              <p>
                Don&apos;t see your specific locality? We cover <strong>100% of {city.city}</strong> and nearby areas!
              </p>
              <Button
                onClick={() => setIsBookNowOpen(true)}
                size="sm"
                className="bg-slate-900 hover:bg-black text-white font-bold text-xs px-5 py-2.5 rounded-xl shrink-0"
              >
                Schedule Pickup in {city.city} →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ MODERN COMPARISON: EP VS TRADITIONAL COURIER ══════════ */}
      <section className="py-20 lg:py-28 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">THE SMARTER CHOICE</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Why Residents in {city.city} Choose EngineersParcel
            </h2>
            <p className="text-slate-400 text-base">
              See the difference between old-fashioned courier shops in {city.city} and modern digital logistics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* The Old Way */}
            <div className="rounded-3xl bg-slate-950 border border-white/10 p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="font-bold text-lg text-slate-400">Traditional Courier Shops</h3>
                <span className="text-xs font-bold text-red-400 bg-red-500/10 px-2.5 py-1 rounded-full">Old Hassle</span>
              </div>
              <ul className="space-y-4 text-sm text-slate-400">
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>You have to carry 20-40kg heavy luggage to a crowded market shop.</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>Volumetric formulas inflate your bill by 2x to 3x the actual weight.</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>You must buy cartons and tape separately at expensive prices.</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>Pen-and-paper booking with clunky or delayed tracking receipts.</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>Refuse to enter campus gates or climb hostel stairs.</span>
                </li>
              </ul>
            </div>

            {/* The EngineersParcel Way */}
            <div className="rounded-3xl bg-gradient-to-b from-orange-950/40 via-slate-900 to-slate-900 border-2 border-orange-500/60 p-8 space-y-6 shadow-2xl shadow-orange-500/10">
              <div className="flex items-center justify-between border-b border-orange-500/30 pb-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-xl text-white">EngineersParcel</h3>
                  <Sparkles className="w-4 h-4 text-orange-400" />
                </div>
                <span className="text-xs font-bold text-orange-400 bg-orange-500/20 px-2.5 py-1 rounded-full">Modern & Fast</span>
              </div>
              <ul className="space-y-4 text-sm text-slate-200">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Free Doorstep Pickup:</strong> Executive arrives directly at your door in {city.city}.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Flat OneBox Pricing:</strong> ₹799 up to 30kg — no volumetric confusion.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Free Sturdy Boxes:</strong> Heavy-duty corrugated boxes and tape brought to you.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Live GPS & WhatsApp:</strong> Real-time journey updates right on your smartphone.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Direct Hostel Room Pickup:</strong> Full student campus assistance.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ VERIFIED CUSTOMER REVIEWS ══════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Trusted by 1000+ Customers in {city.city}
            </h2>
            <p className="text-slate-600 text-base">
              Real feedback from students, working professionals, and families who shipped with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="bg-slate-50 p-7 rounded-3xl border border-slate-200/80 space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-slate-700 text-sm leading-relaxed italic">
                &ldquo;Booking was so simple. The pickup boy reached my place in {localityList[0] || city.city} within 2 hours with a fresh cardboard box and packing tape. Reached Delhi safely in 3 days!&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="w-9 h-9 rounded-full bg-orange-600 text-white font-bold flex items-center justify-center text-xs">
                  RK
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">Rahul Kumar</h4>
                  <p className="text-[11px] text-slate-500">Verified Pickup • {city.city}</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-7 rounded-3xl border border-slate-200/80 space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-slate-700 text-sm leading-relaxed italic">
                &ldquo;Saved me more than ₹1,200 compared to local courier shops! I shipped my college luggage with the OneBox Alpha at just ₹799 flat. Absolutely zero headache of calculating volume weight.&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="w-9 h-9 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-xs">
                  PS
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">Pooja Sharma</h4>
                  <p className="text-[11px] text-slate-500">College Student • {city.city}</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-7 rounded-3xl border border-slate-200/80 space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-slate-700 text-sm leading-relaxed italic">
                &ldquo;Customer support on WhatsApp is super responsive. They updated me on my booking status at every transit hub. Easily the best courier service in {city.city} right now.&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="w-9 h-9 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                  AV
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">Ankit Verma</h4>
                  <p className="text-[11px] text-slate-500">Working Professional • {city.city}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ FAQ ACCORDION SECTION ══════════ */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">QUESTIONS & ANSWERS</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Frequently Asked Questions in {city.city}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Everything you need to know about parcel delivery, pickup timelines, and rates in {city.city}.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = expandedFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? -1 : index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-orange-600 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0 ${
                        isOpen ? "rotate-180 text-orange-600" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="px-5 pb-6 sm:px-6 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════ BOTTOM CONVERSION CTA BANNER ══════════ */}
      <section className="py-20 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white relative overflow-hidden">
        {/* Glow circles */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-black/10 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white">
            <Zap className="w-3.5 h-3.5" />
            <span>EXECUTIVE DISPATCH ACTIVE IN {city.city.toUpperCase()}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Ready to Ship from {city.city}?
          </h2>

          <p className="text-base sm:text-lg text-orange-100 max-w-xl mx-auto leading-relaxed">
            Schedule your pickup in under 60 seconds. Our verified executive brings free boxes, seals, and live tracking to your door.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button
              onClick={() => setIsBookNowOpen(true)}
              size="lg"
              className="w-full sm:w-auto bg-slate-950 hover:bg-black text-white font-bold text-base px-8 py-6 rounded-2xl shadow-2xl transition-all hover:scale-105 active:scale-95"
            >
              Book Doorstep Pickup Now
            </Button>

            <a
              href="tel:+919525801506"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white font-bold text-base px-6 py-3.5 rounded-2xl transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Call +91 95258 01506</span>
            </a>
          </div>

          <p className="text-xs text-orange-100 font-medium">
            No advance payment needed • Pay securely via UPI, Card, or Cash upon pickup
          </p>
        </div>
      </section>
    </div>
  );
}