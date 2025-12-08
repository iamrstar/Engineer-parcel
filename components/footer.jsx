import Link from "next/link"

import { Mail, MapPin, Phone } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div>
             <Image
      src="/logo.png" // Make sure logo.png is inside the /public folder
      alt="EngineersParcel Logo"
      width={120}      // Adjust width as needed
      height={40}
      className="mb-4"
    />
            <p className="text-gray-300 text-sm">
              Engineers Parcel is not just another logistics company; we are reimagining the entire Indian logistics ecosystem through the powerful synergy of AI and IoT. 
            </p>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services#courier" className="text-gray-300 hover:text-orange-500 text-sm">
                  Courier Service
                </Link>
              </li>
              <li>
                <Link href="/services#shifting" className="text-gray-300 hover:text-orange-500 text-sm">
                  Shifting and Moving
                </Link>
              </li>
              <li>
                <Link href="/services#local" className="text-gray-300 hover:text-orange-500 text-sm">
                  Local Parcel Service
                </Link>
              </li>
              <li>
                <Link href="/services#international" className="text-gray-300 hover:text-orange-500 text-sm">
                  International Courier Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/booking" className="text-gray-300 hover:text-orange-500 text-sm">
                  Booking
                </Link>
              </li>
              <li>
                <Link href="/pincode-checker" className="text-gray-300 hover:text-orange-500 text-sm">
                  Pincode Checker
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-300 hover:text-orange-500 text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/activities" className="text-gray-300 hover:text-orange-500 text-sm">
                  Activites & Moments
                </Link>
              </li>
              <li>
                <Link href="/vision-mission" className="text-gray-300 hover:text-orange-500 text-sm">
                  Vision & Mission
                </Link>
              </li>
              <li>
                <Link href="/our-partners" className="text-gray-300 hover:text-orange-500 text-sm">
                Our Partners
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-orange-500 text-sm">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-orange-500 mr-2 mt-0.5" />
                <span className="text-gray-300 text-sm">
                  4th Floor, I2H Building, IIT (ISM), Dhanbad 24 x 7 Available at your Service
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-orange-500 mr-2" />
                <a href="tel:+919525801506" className="text-gray-300 hover:text-orange-500 text-sm">
                  +91-9525801506
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-orange-500 mr-2" />
                <a href="mailto:engineersparcel@gmail.com" className="text-gray-300 hover:text-orange-500 text-sm">
                  engineersparcel@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-10 pt-6 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              Copyright © 2025 Engineers Parcel. Designed and Developed by Engineers Parcel Team
            </p>
            <div className="flex space-x-4">
              <Link href="/settings" className="text-sm text-gray-400 hover:text-orange-500">
                Settings & Privacy
              </Link>
              <Link href="/faqs" className="text-sm text-gray-400 hover:text-orange-500">
                FAQs
              </Link>
              <Link href="/contact" className="text-sm text-gray-400 hover:text-orange-500">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
