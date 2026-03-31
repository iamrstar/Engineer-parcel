"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Mail, MapPin, Phone, Facebook, Twitter,
  Instagram, Linkedin, ArrowRight, ShieldCheck,
  Youtube, MessageCircle, PhoneCall,
  Share2, Download, Smartphone
} from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#001529] text-white overflow-hidden font-sans">
      {/* ══════════ TOP UTILITY BAR ══════════ */}
      <div className="bg-[#003a8c] border-b border-white/10 py-3 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6">
            <a href="tel:+919525801506" className="flex items-center gap-2 hover:text-orange-400 transition-colors">
              <PhoneCall className="w-4 h-4" />
              <span>+91 9525-801-506</span>
            </a>
            <a href="mailto:engineersparcel@gmail.com" className="flex items-center gap-2 hover:text-orange-400 transition-colors">
              <Mail className="w-4 h-4" />
              <span>engineersparcel@gmail.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-orange-400 transition-colors"><Facebook className="w-4 h-4" /></a>
            <a href="#" className="hover:text-orange-400 transition-colors"><MessageCircle className="w-4 h-4" /></a>
            <a href="#" className="hover:text-orange-400 transition-colors"><Linkedin className="w-4 h-4" /></a>
            <a href="#" className="hover:text-orange-400 transition-colors"><Twitter className="w-4 h-4" /></a>
            <a href="#" className="hover:text-orange-400 transition-colors"><Instagram className="w-4 h-4" /></a>
            <a href="#" className="hover:text-orange-400 transition-colors"><Youtube className="w-4 h-4" /></a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16 pb-40">
        {/* ══════════ MAIN CONTENT ══════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">

          {/* Brand Section */}
          <div className="lg:col-span-3 space-y-6">
            <Link href="/" className="inline-block transition-transform hover:scale-105">
              <Image
                src="/logo.png"
                alt="EngineersParcel Logo"
                width={180}
                height={60}
                className="h-auto w-auto"
              />
            </Link>
            <h4 className="text-orange-500 font-bold uppercase tracking-widest text-xs border-l-2 border-orange-500 pl-3">
              Simplifying Your Business
            </h4>
            <p className="text-gray-300 text-sm leading-relaxed font-bold">
              Engineers Parcel Pvt. Ltd.
            </p>
            <p className="text-gray-400 text-xs leading-relaxed">
              4th Floor, I2H Building, <br />
              IIT (ISM), Dhanbad 826004, <br />
              Jharkhand, India
            </p>

            {/* Certification Badges Placeholder */}
            <div className="flex gap-3 pt-2">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-[8px] font-black text-center leading-none text-gray-400 p-1 opacity-70 hover:opacity-100 transition-opacity">
                ISO 9001:2015
              </div>
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-[8px] font-black text-center leading-none text-gray-400 p-1 opacity-70 hover:opacity-100 transition-opacity">
                ISO 14001
              </div>
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-[8px] font-black text-center leading-none text-gray-400 p-1 opacity-70 hover:opacity-100 transition-opacity">
                SAFETY FIRST
              </div>
            </div>
          </div>

          {/* Columns */}
          <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <FooterCol title="About Engineers Parcel">
              <FooterLink href="/about">Core Team</FooterLink>
              <FooterLink href="/vision-mission">Vision & Mission</FooterLink>
              <FooterLink href="/price-estimator">Price Estimator</FooterLink>
              <FooterLink href="/pincode-checker">Pincode Checker</FooterLink>
              <FooterLink href="/contact">Contact Us</FooterLink>
            </FooterCol>

            <FooterCol title="Primary Services">
              <FooterLink href="/services#courier">Express - Full Truck Load</FooterLink>
              <FooterLink href="/services#shifting">Express - Part Truck Load</FooterLink>
              <FooterLink href="/services#local">Speed Trucking</FooterLink>
              <FooterLink href="/activities">Air & Rail Services</FooterLink>
              <FooterLink href="/services#shifting">Warehousing Services</FooterLink>
            </FooterCol>

            <FooterCol title="Policy & Support">
              <FooterLink href="/terms">Terms & Conditions</FooterLink>
              <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
              <FooterLink href="/faqs">Help Center</FooterLink>
              <FooterLink href="/our-partners">Network Partners</FooterLink>
              <FooterLink href="/dashboard">Logistics Dashboard</FooterLink>
            </FooterCol>
          </div>
        </div>

        {/* ══════════ BOTTOM LEGAL BAR ══════════ */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-8 text-xs font-bold text-gray-400 uppercase tracking-widest">
            <Link href="/terms" className="hover:text-white transition-colors">Terms and Conditions</Link>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
          <p className="text-xs text-gray-500 font-medium">
            © {currentYear} Engineers Parcel Pvt. Ltd. – All Rights Reserved
          </p>
        </div>
      </div>

      {/* ══════════ DETAILED FOOTER ANIMATION ══════════ */}
      <div className="absolute bottom-0 left-0 w-full h-36 overflow-hidden pointer-events-none">

        {/* Twinkling stars */}
        {[6, 14, 25, 38, 52, 65, 78, 88, 95].map((left, i) => (
          <motion.div
            key={`star-${i}`}
            animate={{ opacity: [0.03, 0.18, 0.03] }}
            transition={{ repeat: Infinity, duration: 2 + i * 0.4, delay: i * 0.3 }}
            className="absolute w-[2px] h-[2px] bg-white rounded-full"
            style={{ left: `${left}%`, top: `${6 + (i % 4) * 8}px` }}
          />
        ))}

        {/* Cityscape - Back layer (tall buildings) */}
        <div className="absolute bottom-6 w-full flex items-end justify-around opacity-[0.05]">
          {[30, 50, 38, 58, 26, 54, 32, 46, 62, 30, 52, 36, 44, 28, 60, 34, 48, 26, 56, 40].map((h, i) => (
            <div key={`b1-${i}`} className="relative mx-px rounded-t-sm bg-white" style={{ height: `${h}px`, width: "14px" }}>
              {h > 30 && (
                <div className="absolute inset-x-[2px] top-2 flex flex-col gap-[2px]">
                  {Array.from({ length: Math.floor((h - 10) / 6) }).map((_, j) => (
                    <div key={j} className="flex gap-[1px]">
                      <div className="flex-1 h-[2px] rounded-[0.5px]"
                        style={{ backgroundColor: (i + j) % 3 === 0 ? "rgba(251,191,36,0.5)" : "rgba(255,255,255,0.1)" }}
                      />
                      <div className="flex-1 h-[2px] rounded-[0.5px]"
                        style={{ backgroundColor: (i + j) % 2 === 0 ? "rgba(251,191,36,0.4)" : "rgba(255,255,255,0.08)" }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Cityscape - Front layer (shorter buildings) */}
        <div className="absolute bottom-6 w-full flex items-end opacity-[0.07]" style={{ paddingLeft: "3%", paddingRight: "3%" }}>
          {[16, 26, 20, 12, 30, 18, 24, 14, 28, 22, 16, 32, 20, 26, 14, 24].map((h, i) => (
            <div key={`b2-${i}`} className="bg-white mx-1 rounded-t-sm flex-1" style={{ height: `${h}px` }} />
          ))}
        </div>

        {/* Street lamps with glow */}
        {[10, 28, 46, 64, 82].map((left, i) => (
          <div key={`lamp-${i}`} className="absolute bottom-6" style={{ left: `${left}%` }}>
            <div className="w-[1px] h-12 bg-white/10 mx-auto" />
            <div className="w-4 h-[2px] bg-white/20 rounded-full mx-auto" />
            <motion.div
              animate={{ opacity: [0.06, 0.14, 0.06] }}
              transition={{ repeat: Infinity, duration: 3, delay: i * 0.7 }}
              className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-10 rounded-full"
              style={{ background: "radial-gradient(ellipse, rgba(251,191,36,0.12) 0%, transparent 70%)" }}
            />
          </div>
        ))}

        {/* Trees */}
        {[5, 19, 37, 55, 73, 91].map((left, i) => (
          <div key={`tree-${i}`} className="absolute bottom-6" style={{ left: `${left}%` }}>
            <div className="w-4 h-5 bg-green-800/8 rounded-full mx-auto" />
            <div className="w-[2px] h-2.5 bg-green-900/8 mx-auto" />
          </div>
        ))}

        {/* Road surface */}
        <div className="absolute bottom-0 w-full h-6 bg-white/[0.04] border-t border-white/[0.06]" />

        {/* Road edge markings */}
        <div className="absolute bottom-[2px] w-full h-[1px] bg-white/[0.05]" />
        <div className="absolute bottom-[18px] w-full h-[1px] bg-white/[0.05]" />

        {/* Road center dashes (animated) */}
        <div className="absolute bottom-[9px] w-full overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
            className="flex w-[200%]"
          >
            {Array.from({ length: 80 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 w-6 h-[2px] bg-yellow-500/15 mx-3 rounded-full" />
            ))}
          </motion.div>
        </div>

        {/* Main EP delivery truck (left → right) */}
        <motion.div
          animate={{ x: ["-160px", "calc(100vw + 160px)"] }}
          transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
          className="absolute bottom-[3px] z-10"
        >
          <svg width="70" height="36" viewBox="0 0 70 36" fill="none" className="drop-shadow-lg" style={{ transform: "scaleX(-1)" }}>
            {/* Container - Orange */}
            <rect x="22" y="2" width="48" height="24" rx="2" fill="#ea580c" opacity="0.45" />
            <line x1="36" y1="2" x2="36" y2="26" stroke="#c2410c" strokeWidth="0.5" opacity="0.25" />
            <line x1="50" y1="2" x2="50" y2="26" stroke="#c2410c" strokeWidth="0.5" opacity="0.25" />
            {/* EP logo */}
            <text x="43" y="16" fill="#fed7aa" fontSize="7" fontWeight="bold" opacity="0.6" textAnchor="middle" style={{ transform: "scaleX(-1)", transformOrigin: "43px 16px" }}>EP</text>
            {/* Cabin - Blue */}
            <rect x="0" y="8" width="24" height="18" rx="3" fill="#2563eb" opacity="0.55" />
            <rect x="2" y="10" width="12" height="9" rx="2" fill="#60a5fa" opacity="0.35" />
            {/* Headlight glow */}
            <rect x="0" y="20" width="2" height="3" rx="1" fill="#fbbf24" opacity="0.6" />
            <circle cx="-2" cy="21.5" r="6" fill="#fbbf24" opacity="0.05" />
            {/* Mud flap */}
            <rect x="21" y="26" width="3" height="4" rx="0.5" fill="#1e3a5f" opacity="0.3" />
            {/* Front wheels */}
            <circle cx="14" cy="30" r="5.5" fill="#0f172a" opacity="0.7" />
            <circle cx="14" cy="30" r="3" fill="#1e293b" opacity="0.5" />
            <circle cx="14" cy="30" r="1" fill="#475569" opacity="0.3" />
            {/* Rear wheels (doubles) */}
            <circle cx="54" cy="30" r="5.5" fill="#0f172a" opacity="0.7" />
            <circle cx="54" cy="30" r="3" fill="#1e293b" opacity="0.5" />
            <circle cx="54" cy="30" r="1" fill="#475569" opacity="0.3" />
            <circle cx="62" cy="30" r="5.5" fill="#0f172a" opacity="0.7" />
            <circle cx="62" cy="30" r="3" fill="#1e293b" opacity="0.5" />
            <circle cx="62" cy="30" r="1" fill="#475569" opacity="0.3" />
          </svg>
        </motion.div>

        {/* Small orange van (right → left) */}
        <motion.div
          animate={{ x: ["calc(100vw + 100px)", "-100px"] }}
          transition={{ repeat: Infinity, duration: 24, ease: "linear", delay: 5 }}
          className="absolute bottom-[3px] z-10"
        >
          <svg width="40" height="24" viewBox="0 0 40 24" fill="none" style={{ transform: "scaleX(-1)" }}>
            <rect x="8" y="2" width="32" height="14" rx="3" fill="#f97316" opacity="0.25" />
            <rect x="0" y="5" width="12" height="11" rx="2" fill="#fb923c" opacity="0.35" />
            <rect x="1" y="7" width="6" height="4" rx="1" fill="#fdba74" opacity="0.25" />
            <circle cx="10" cy="19" r="4" fill="#0f172a" opacity="0.6" />
            <circle cx="10" cy="19" r="2" fill="#1e293b" opacity="0.4" />
            <circle cx="32" cy="19" r="4" fill="#0f172a" opacity="0.6" />
            <circle cx="32" cy="19" r="2" fill="#1e293b" opacity="0.4" />
          </svg>
        </motion.div>

        {/* Delivery Boy on Bike (left → right) */}
        <motion.div
          animate={{ 
            x: ["-100px", "calc(100vw + 100px)"],
            y: [0, -1.5, 0] // Subtle bouncing road effect
          }}
          transition={{ 
            x: { repeat: Infinity, duration: 14, ease: "linear", delay: 1 },
            y: { repeat: Infinity, duration: 0.35, ease: "easeInOut" }
          }}
          className="absolute bottom-2 z-20"
        >
          <svg width="42" height="42" viewBox="0 0 32 32" fill="none" className="drop-shadow-md">
            {/* Bike Body - Blue and Metal */}
            <path d="M8 24L14 24M14 24L20 24M20 24L26 24" stroke="#4b5563" strokeWidth="2" strokeLinecap="round"/>
            <path d="M12 24L16 16L22 16" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round"/>
            
            {/* Wheels */}
            <circle cx="8" cy="24" r="4.5" stroke="#0f172a" strokeWidth="2" opacity="0.8"/>
            <circle cx="26" cy="24" r="4.5" stroke="#0f172a" strokeWidth="2" opacity="0.8"/>
            {/* Spokes (moving effect) */}
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }}
              style={{ originX: "8px", originY: "24px" }}
            >
              <line x1="8" y1="20" x2="8" y2="28" stroke="#1e293b" strokeWidth="1" opacity="0.4"/>
              <line x1="4" y1="24" x2="12" y2="24" stroke="#1e293b" strokeWidth="1" opacity="0.4"/>
            </motion.g>
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }}
              style={{ originX: "26px", originY: "24px" }}
            >
              <line x1="26" y1="20" x2="26" y2="28" stroke="#1e293b" strokeWidth="1" opacity="0.4"/>
              <line x1="22" y1="24" x2="30" y2="24" stroke="#1e293b" strokeWidth="1" opacity="0.4"/>
            </motion.g>

            {/* Delivery Boy */}
            {/* Body - Blue Shirt */}
            <rect x="15" y="8" width="6" height="11" rx="2" fill="#1e40af" opacity="0.9"/>
            {/* Delivery Box - Orange */}
            <rect x="8" y="10" width="7" height="7" rx="1.5" fill="#ea580c" opacity="0.95"/>
            <rect x="9" y="11" width="5" height="1" fill="#c2410c" opacity="0.4"/>
            {/* Head & Helmet */}
            <circle cx="18" cy="6" r="3.5" fill="#374151" opacity="0.9"/>
            <rect x="16" y="5" width="6" height="2" rx="0.5" fill="#f97316" opacity="0.8"/>
            {/* Arms reaching for handles */}
            <path d="M18 11L24 16" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" opacity="0.9"/>
          </svg>
        </motion.div>

        {/* Floating packages */}
        {[8, 25, 42, 60, 78, 92].map((left, i) => (
          <motion.div
            key={`pkg-${i}`}
            animate={{
              y: [0, -35 - i * 4],
              opacity: [0.12, 0],
              rotate: [0, i % 2 === 0 ? 12 : -12],
            }}
            transition={{ repeat: Infinity, duration: 5 + i * 0.8, delay: i * 1.8, ease: "easeOut" }}
            className="absolute bottom-10 text-xs"
            style={{ left: `${left}%` }}
          >
            📦
          </motion.div>
        ))}
      </div>
    </footer>
  );
}

/* ══════════ REUSABLE COMPONENTS ══════════ */

function FooterCol({ title, children }) {
  return (
    <div className="space-y-6">
      <h3 className="text-white font-black text-sm uppercase tracking-tighter border-b border-orange-500/30 pb-2 inline-block">
        {title}
      </h3>
      <ul className="space-y-3">
        {children}
      </ul>
    </div>
  );
}

function FooterLink({ href, children }) {
  return (
    <li>
      <Link
        href={href}
        className="text-gray-400 hover:text-white transition-all text-sm font-medium hover:translate-x-1 flex items-center gap-2 group"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-blue-500/20 group-hover:bg-orange-500 transition-colors"></div>
        {children}
      </Link>
    </li>
  );
}
