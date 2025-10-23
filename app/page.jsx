import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Box, Globe, MapPin, Package, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Revolutionsing Logistics in India</h1>
              <p className="text-lg mb-8"> 
                We provide efficient courier and parcel delivery services across India and internationally.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="bg-white text-orange-600 hover:bg-gray-100">
                  <Link href="/booking">Book Now</Link>
                </Button>
                <Button  className="text-orange-600 bg-white hover:bg-slate-50">
                  <Link href="/track-order">Track Order</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <Image
                src="/Delivery-boy.png?height=400&width=500"
                alt="Parcel Delivery"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
            <p className="mt-4 text-lg text-gray-600">We offer a wide range of delivery and logistics services</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Package className="h-12 w-12 text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Courier Service</h3>
              <p className="text-gray-600 mb-4">Fast and secure courier service for documents and packages.</p>
              <Link href="/services#courier" className="text-orange-600 hover:text-orange-700 flex items-center">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Truck className="h-12 w-12 text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Shifting and Moving</h3>
              <p className="text-gray-600 mb-4">Complete relocation services for homes and offices.</p>
              <Link href="/services#shifting" className="text-orange-600 hover:text-orange-700 flex items-center">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Box className="h-12 w-12 text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Local Parcel Service</h3>
              <p className="text-gray-600 mb-4">Same-day delivery for local parcels within your city.</p>
              <Link href="/services#local" className="text-orange-600 hover:text-orange-700 flex items-center">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Globe className="h-12 w-12 text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">International Courier</h3>
              <p className="text-gray-600 mb-4">Reliable international shipping to destinations worldwide.</p>
              <Link href="/services#international" className="text-orange-600 hover:text-orange-700 flex items-center">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-orange-50 p-8 rounded-lg border border-orange-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Check Delivery Area</h3>
              <p className="text-gray-600 mb-6">
                Enter your pincode to check if we deliver to your area and get estimated delivery times.
              </p>
              <Link href="/pincode-checker">
                <Button className="bg-orange-600 hover:bg-orange-700">
                  Check Pincode <MapPin className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="bg-orange-50 p-8 rounded-lg border border-orange-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Book a Pickup</h3>
              <p className="text-gray-600 mb-6">
                Schedule a pickup for your parcel or request our shifting and moving services.
              </p>
              <Link href="/booking">
                <Button className="bg-orange-600 hover:bg-orange-700">
                  Book Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">What Our Customers Say</h2>
            <p className="mt-4 text-lg text-gray-600">
              Don't just take our word for it, hear from our satisfied customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <span className="text-orange-600 font-bold">RK</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Rahul Kumar</h4>
                  <p className="text-sm text-gray-500">Dhanbad</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The team was very professional and handled my fragile items with care. Delivery was on time as
                promised."
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <span className="text-orange-600 font-bold">SP</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Sneha Patel</h4>
                  <p className="text-sm text-gray-500">Ranchi</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Used their shifting services for my house move. Everything was packed properly and nothing was
                damaged."
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <span className="text-orange-600 font-bold">AM</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Amit Mishra</h4>
                  <p className="text-sm text-gray-500">Kolkata</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Their international courier service is reliable and affordable. My package reached the US in just 5
                days."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Ship Your Parcel?</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Experience our fast, reliable, and affordable delivery services today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="bg-white text-orange-600 hover:bg-gray-100">
              <Link href="/booking">Book a Pickup</Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-orange-700">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
