import { Box, Clock, Globe, MapPin, Package, Truck } from "lucide-react"
import { Button } from "../components/ui/Button"

function ServicesPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-lg max-w-3xl mx-auto">
            Comprehensive logistics solutions tailored to meet your shipping and moving needs
          </p>
        </div>
      </section>

      {/* Courier Service */}
      <section id="courier" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 text-orange-600 mb-4">
                <Package className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Courier Service</h2>
              <p className="text-gray-600 mb-4">
                Our courier service offers reliable and timely delivery of documents, packages, and parcels across
                India. Whether it's important business documents or personal items, we ensure your shipments reach their
                destination safely.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <Clock className="h-5 w-5 text-orange-500 mr-2 mt-0.5" />
                  <span className="text-gray-600">Express delivery options available</span>
                </li>
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-orange-500 mr-2 mt-0.5" />
                  <span className="text-gray-600">Coverage across 19,000+ pin codes in India</span>
                </li>
                <li className="flex items-start">
                  <Package className="h-5 w-5 text-orange-500 mr-2 mt-0.5" />
                  <span className="text-gray-600">Secure packaging and handling</span>
                </li>
              </ul>
              <Button as="a" href="/booking" className="bg-orange-600 hover:bg-orange-700">
                Book Courier Service
              </Button>
            </div>
            <div className="md:w-1/2">
              <img
                src="/placeholder.jpg"
                alt="Courier Service"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Shifting and Moving */}
      <section id="shifting" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="md:w-1/2">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 text-orange-600 mb-4">
                <Truck className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Shifting and Moving</h2>
              <p className="text-gray-600 mb-4">
                Our comprehensive shifting and moving services make relocation hassle-free. We handle everything from
                packing your belongings to safely transporting them to your new location, whether you're moving your
                home or office.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <Package className="h-5 w-5 text-orange-500 mr-2 mt-0.5" />
                  <span className="text-gray-600">Professional packing and unpacking services</span>
                </li>
                <li className="flex items-start">
                  <Truck className="h-5 w-5 text-orange-500 mr-2 mt-0.5" />
                  <span className="text-gray-600">Safe transportation with specialized vehicles</span>
                </li>
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-orange-500 mr-2 mt-0.5" />
                  <span className="text-gray-600">Local and long-distance moving services</span>
                </li>
              </ul>
              <Button as="a" href="/booking" className="bg-orange-600 hover:bg-orange-700">
                Book Shifting Service
              </Button>
            </div>
            <div className="md:w-1/2">
              <img
                src="/placeholder.jpg"
                alt="Shifting and Moving"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Local Parcel Service */}
      <section id="local" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 text-orange-600 mb-4">
                <Box className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Local Parcel Service</h2>
              <p className="text-gray-600 mb-4">
                Our local parcel service provides quick and efficient delivery within your city. Perfect for businesses
                that need same-day deliveries or individuals sending gifts or documents locally.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <Clock className="h-5 w-5 text-orange-500 mr-2 mt-0.5" />
                  <span className="text-gray-600">Same-day and next-day delivery options</span>
                </li>
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-orange-500 mr-2 mt-0.5" />
                  <span className="text-gray-600">Available in major cities across India</span>
                </li>
                <li className="flex items-start">
                  <Package className="h-5 w-5 text-orange-500 mr-2 mt-0.5" />
                  <span className="text-gray-600">Real-time tracking of your parcels</span>
                </li>
              </ul>
              <Button as="a" href="/booking" className="bg-orange-600 hover:bg-orange-700">
                Book Local Delivery
              </Button>
            </div>
            <div className="md:w-1/2">
              <img
                src="/placeholder.jpg"
                alt="Local Parcel Service"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* International Courier */}
      <section id="international" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="md:w-1/2">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 text-orange-600 mb-4">
                <Globe className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">International Courier Service</h2>
              <p className="text-gray-600 mb-4">
                Our international courier service connects you to the world. We offer reliable and cost-effective
                shipping solutions to destinations worldwide, with customs clearance assistance and package tracking.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <Globe className="h-5 w-5 text-orange-500 mr-2 mt-0.5" />
                  <span className="text-gray-600">Delivery to 200+ countries and territories</span>
                </li>
                <li className="flex items-start">
                  <Package className="h-5 w-5 text-orange-500 mr-2 mt-0.5" />
                  <span className="text-gray-600">Customs documentation assistance</span>
                </li>
                <li className="flex items-start">
                  <Clock className="h-5 w-5 text-orange-500 mr-2 mt-0.5" />
                  <span className="text-gray-600">Express and economy shipping options</span>
                </li>
              </ul>
              <Button as="a" href="/booking" className="bg-orange-600 hover:bg-orange-700">
                Book International Shipping
              </Button>
            </div>
            <div className="md:w-1/2">
              <img
                src="/placeholder.jpg"
                alt="International Courier"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Rates */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Service Rates</h2>
            <p className="mt-4 text-lg text-gray-600">Competitive pricing for all your shipping and moving needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Local Delivery</h3>
              <p className="text-3xl font-bold text-orange-600 mb-4">
                ₹50<span className="text-sm text-gray-500 font-normal"> onwards</span>
              </p>
              <ul className="space-y-2 mb-6 text-gray-600">
                <li>Within city limits</li>
                <li>Up to 5kg weight</li>
                <li>Same-day delivery</li>
                <li>Real-time tracking</li>
              </ul>
              <Button as="a" href="/booking" variant="outline" className="w-full">
                Book Now
              </Button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Domestic Courier</h3>
              <p className="text-3xl font-bold text-orange-600 mb-4">
                ₹100<span className="text-sm text-gray-500 font-normal"> onwards</span>
              </p>
              <ul className="space-y-2 mb-6 text-gray-600">
                <li>Pan-India delivery</li>
                <li>Up to 10kg weight</li>
                <li>2-3 days delivery</li>
                <li>Insurance included</li>
              </ul>
              <Button as="a" href="/booking" variant="outline" className="w-full">
                Book Now
              </Button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Home Shifting</h3>
              <p className="text-3xl font-bold text-orange-600 mb-4">
                ₹5,000<span className="text-sm text-gray-500 font-normal"> onwards</span>
              </p>
              <ul className="space-y-2 mb-6 text-gray-600">
                <li>Professional packing</li>
                <li>Loading & unloading</li>
                <li>Transportation</li>
                <li>Insurance coverage</li>
              </ul>
              <Button as="a" href="/booking" variant="outline" className="w-full">
                Get Quote
              </Button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">International</h3>
              <p className="text-3xl font-bold text-orange-600 mb-4">
                ₹1,500<span className="text-sm text-gray-500 font-normal"> onwards</span>
              </p>
              <ul className="space-y-2 mb-6 text-gray-600">
                <li>Worldwide shipping</li>
                <li>Customs clearance</li>
                <li>5-7 days delivery</li>
                <li>Package tracking</li>
              </ul>
              <Button as="a" href="/booking" variant="outline" className="w-full">
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Contact our team for personalized logistics solutions tailored to your specific requirements.
          </p>
          <Button as="a" href="/contact" className="bg-white text-orange-600 hover:bg-gray-100">
            Contact Us
          </Button>
        </div>
      </section>
    </div>
  )
}

export default ServicesPage
