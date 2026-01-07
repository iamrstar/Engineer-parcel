import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: {
    default:
      "EngineersParcel | Courier & Parcel Delivery Services in India",
    template: "%s | EngineersParcel",
  },
  description:
    "EngineersParcel provides fast, secure, and affordable courier and parcel delivery services across India, with dedicated same-day courier and parcel delivery services in Dhanbad. B2B logistics, shifting & real-time parcel tracking.",
  keywords: [
    "courier service",
    "parcel delivery",
    "logistics company",
    "same day courier",
    "parcel service near me",
    "courier service in Dhanbad",
    "parcel delivery in Dhanbad",
    "B2B courier service",
    "EngineersParcel",
  ],
  authors: [{ name: "EngineersParcel" }],
  creator: "EngineersParcel",
  metadataBase: new URL("https://engineersparcel.com"),

  openGraph: {
    title: "EngineersParcel | Smart Courier & Logistics Platform",
    description:
      "India’s next-gen courier and logistics platform offering parcel delivery, shifting services, and real-time tracking.",
    url: "https://engineersparcel.com",
    siteName: "EngineersParcel",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EngineersParcel Courier Service",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "EngineersParcel | Courier & Parcel Delivery",
    description:
      "Fast, secure & smart parcel delivery services across India.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/logo.png",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
