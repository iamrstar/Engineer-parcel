
import Script from "next/script"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/WhatsAppButton"
import ExitIntentPopup from "@/components/ExitIntentPopup"



import JsonLd from "@/components/JsonLd"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://engineersparcel.in"

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "EngineersParcel | Best Pan-India Courier Service & Doorstep Parcel Delivery",
    template: "%s | EngineersParcel",
  },
  description:
    "Send courier & parcel anywhere in India across 19,000+ pincodes. EngineersParcel provides doorstep pickup, transparent prices, OneBox heavy luggage (₹799 up to 30kg), student campus parcel delivery, and live tracking.",
  keywords: [
    "pan india courier service",
    "best courier service in india",
    "courier service pan india",
    "parcel delivery in india",
    "doorstep courier pickup india",
    "courier pickup from home",
    "cheap courier service india",
    "cheapest courier service in india",
    "domestic courier service india",
    "student luggage courier india",
    "campus courier service",
    "hostel luggage shifting",
    "send luggage to hostel",
    "heavy parcel courier india",
    "OneBox courier service",
    "intercity parcel delivery india",
    "best courier service near me",
    "parcel service near me",
    "courier service near me",
    "doorstep parcel pickup",
    "track parcel online",
    "courier service in Dhanbad",
    "EngineersParcel",
  ],
  authors: [{ name: "EngineersParcel", url: baseUrl }],
  creator: "EngineersParcel",
  publisher: "EngineersParcel",
  alternates: {
    canonical: "/",
  },
  other: {
    "geo.region": "IN",
    "geo.placename": "India",
    "coverage": "India",
    "distribution": "Global",
    "target": "all",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "ADo0h2iLFotQchcWaDD_qbKBwyLvdMF5n4l81dqrVlY",
  },
  openGraph: {
    title: "EngineersParcel | Smart Courier & Logistics Platform",
    description:
      "India’s next-gen courier and logistics platform offering parcel delivery, campus logistics, shifting services, and real-time tracking across 19,000+ pincodes.",
    url: baseUrl,
    siteName: "EngineersParcel",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EngineersParcel Courier & Logistics Platform - Making Life Easy",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EngineersParcel | Smart Courier & Parcel Delivery",
    description:
      "Fast, secure & smart parcel delivery services across India. Doorstep pickup and live tracking.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/logo.jpeg",
    apple: "/logo.jpeg",
  },
}

import { AuthProvider } from "@/src/context/AuthContext"
import { Toaster } from "sonner"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-gray-50 text-gray-900">
        <Script 
          src="https://admin-api.engineersparcel.in/tracking.js" 
          strategy="lazyOnload" 
        />
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive" />
        <JsonLd />
        <Toaster richColors position="top-center" />
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
            <WhatsAppButton />
            <ExitIntentPopup />
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
