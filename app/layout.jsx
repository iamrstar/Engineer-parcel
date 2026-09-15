
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
    default: "EngineersParcel | Fast Courier & Parcel Delivery Services in India",
    template: "%s | EngineersParcel",
  },
  description:
    "EngineersParcel provides fast, secure, and affordable courier and parcel delivery across 19,000+ pincodes in India. Doorstep pickup, same-day city courier in Dhanbad, campus logistics, and real-time tracking.",
  keywords: [
    "best courier service near me",
    "courier service near me",
    "parcel delivery near me",
    "parcel service near me",
    "doorstep parcel pickup near me",
    "same day courier near me",
    "courier pickup from home",
    "courier service",
    "parcel delivery",
    "courier service in Dhanbad",
    "parcel delivery in Dhanbad",
    "same day courier service",
    "doorstep parcel pickup",
    "logistics company India",
    "campus courier service",
    "student luggage shifting",
    "packers and movers",
    "B2B courier service",
    "cheap courier service India",
    "track parcel online",
    "EngineersParcel",
  ],
  authors: [{ name: "EngineersParcel", url: baseUrl }],
  creator: "EngineersParcel",
  publisher: "EngineersParcel",
  alternates: {
    canonical: "/",
  },
  other: {
    "geo.region": "IN-JH",
    "geo.placename": "Dhanbad, Jharkhand, India",
    "geo.position": "23.8143;86.4412",
    "ICBM": "23.8143, 86.4412",
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
