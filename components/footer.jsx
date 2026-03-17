"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Mail, MapPin, Phone, Facebook, Twitter,
  Instagram, Linkedin, ArrowRight, ShieldCheck,
  Sparkles, Youtube, MessageCircle, PhoneCall,
  Share2, Download, Smartphone, Truck
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16 pb-32">
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

      {/* ══════════ DECORATIVE LOGISTICS ANIMATION ══════════ */}
      <div className="absolute bottom-0 left-0 w-full h-24 overflow-hidden pointer-events-none opacity-40">
        {/* Road */}
        <div className="absolute bottom-0 w-full h-8 bg-black/20 border-t border-dashed border-white/10"></div>

        {/* Truck Animation */}
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="absolute bottom-4 z-20"
        >
          <div className="relative">
            <Truck className="w-12 h-12 text-blue-500" />
            <div className="absolute -top-2 left-6 w-16 h-8 bg-blue-600 rounded-sm skew-x-12 opacity-80"></div>
          </div>
        </motion.div>

        {/* Cityscape Background (Simplified) */}
        <div className="absolute bottom-8 w-full h-16 flex items-end justify-around opacity-20">
          {[3, 5, 4, 6, 3, 5, 4, 6].map((h, i) => (
            <div key={i} className={`w-8 bg-white/20 mx-1 rounded-t-sm`} style={{ height: `${h * 4}px` }}></div>
          ))}
        </div>

        {/* Airplane */}
        <motion.div
          animate={{
            x: [0, 1500],
            y: [0, -40]
          }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          className="absolute bottom-20 left-10 text-blue-400/30"
        >
          <Sparkles className="w-6 h-6 rotate-45" />
        </motion.div>
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
