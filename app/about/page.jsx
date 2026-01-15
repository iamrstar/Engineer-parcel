import Image from "next/image";
import { Award, Clock, Shield, Truck, Users,MessageCircle,IndianRupee,BrainCircuit,ChartCandlestick,Cpu,QrCode,Cog} from "lucide-react";

export default function AboutPage() {
  return ( 
    <div> 
      {/* Hero Section */}
      <section className="bg-orange-600 text-white py-16">  
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">About EngineersParcel</h1>
          <p className="text-lg max-w-3xl mx-auto">
         We are set to transform India’s logistics landscape by leveraging a powerful combination of next-generation technologies—AI, Blockchain, and IoT.
            Our vision is to build a smarter, more transparent, and highly efficient courier and logistics platform designed for the future, 
            while providing safe, secure, and assured logistics support to diverse industries with critical delivery needs.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-gray-600 mb-4">
                Engineers parcel start-up was started by IIT(ISM) Dhanbad and
                CSIR students in the middle of the pandemic (Covid-19) due to
                the strong demand for a secure, safe, and hygienic courier
                service. Engineers Parcel has served students and efficiently
                distributed over 7000kg parcels around the country, positioning
                the firm to become one of the country's leading technologies on
                demand super-local delivery services providers.
              </p>
              <p className="text-gray-600 mb-4">
                We identified significant gaps in the existing parcel delivery
                services, particularly in tier-2 and tier-3 cities. Our founders
                combined their technical expertise and business acumen to create
                a logistics solution that is reliable, transparent, and
                customer-centric.
              </p>
              <p className="text-gray-600">
                Today, EngineersParcel has grown to serve thousands of customers
                across India and internationally, with a strong focus on
                leveraging technology to enhance the delivery experience.
              </p>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/our-story.jpg?height=400&width=600"
                alt="EngineersParcel Team"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Our Core Values
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 text-orange-600 mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Reliability</h3>
              <p className="text-gray-600">
                We deliver on our promises. Your parcels arrive safely and on
                time, every time.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 text-orange-600 mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Customer First</h3>
              <p className="text-gray-600">
                Our customers are at the heart of everything we do. We go the
                extra mile to ensure satisfaction.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 text-orange-600 mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in every aspect of our service, from
                pickup to delivery.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* usp */}

     
      {/* Why Choose Us */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Why Choose EngineersParcel
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              What sets us apart from other delivery services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-600 text-white">
                  <Clock className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Fast Delivery
                </h3>
                <p className="mt-2 text-gray-600">
                  We offer same-day delivery for local parcels and express
                  options for long-distance shipments.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-600 text-white">
                  <Shield className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Secure Handling
                </h3>
                <p className="mt-2 text-gray-600">
                  Your parcels are handled with utmost care and are fully
                  insured against damage or loss.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-600 text-white">
                  <Truck className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Wide Coverage
                </h3>
                <p className="mt-2 text-gray-600">
                  We deliver to over 19,000 pin codes across India and have
                  international shipping options.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-600 text-white">
                  <Users className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  24/7 Customer Support
                </h3>
                <p className="mt-2 text-gray-600">
                  Our dedicated customer service team is available round the
                  clock to assist you with any queries.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-600 text-white">
                  <BrainCircuit className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  AI-IoT Courier & Logistics Platform
                </h3>
                <p className="mt-2 text-gray-600">
                  This ensures a level of service unmatched by traditional
                  providers.{" "}
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-600 text-white">
                  <Cog className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Continuosly enhancement
                </h3>
                <p className="mt-2 text-gray-600">
                  We are constantly working on enhancing our services to provide
                  you with the best possible experience.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

       <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Our Unique Selling Proposition
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              The thing which sets us apart
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 text-orange-600 mb-4">
                <Cpu className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                India’s First AI-IoT Courier & Logistics Platform
              </h3>
              <p className="text-gray-600">
                We are pioneering the integration of Artificial Intelligence and
                the Internet of Things into every aspect of parcel delivery.
                This ensures a level of service unmatched by traditional
                providers.{" "}
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 text-orange-600 mb-4">
                <ChartCandlestick className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Real-Time Accuracy & Dynamic Pricing
              </h3>
              <p className="text-gray-600">
                Gain unparalleled visibility with live location tracking and
                flexible pricing that adapts to your specific needs, offering
                transparency and cost-efficiency.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 text-orange-600 mb-4">
                <QrCode className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Automated Hub Scan Updates
              </h3>
              <p className="text-gray-600">
                Receive instant, automated updates via WhatsApp/SMS at every
                stage of your parcel's journey, keeping you informed without
                manual checks.{" "}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                AI-Powered Packers & Movers
              </h2>
              <p className="text-gray-600 mb-4">
                The traditional moving experience is fraught with uncertainty,
                lack of tracking, hidden costs, and potential damage. Engineers
                Parcel is revolutionizing this sector with an AI and IoT-driven
                solution designed for safety, transparency, and efficiency.
              </p>
              <p className="text-gray-600 mb-4">
                App-based Video Survey: Auto-estimates space, vehicle size, and
                cost.
              </p>
              <p className="text-gray-600">
                Smart Load Balancing Algorithm: Suggests optimal packaging and
                routes. a strong focus on leveraging technology to enhance the
                delivery experience.
              </p>
              <p className="text-gray-600">
                IoT Barcode Labels: Each box scanned, tracked, and time-stamped.
              </p>
              <p className="text-gray-600">
                Auto Damage Reporting: Sends pickup & delivery photos via app.
              </p>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/ai-packer-mover.jpg?height=400&width=600"
                alt="EngineersParcel Team"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Hyperlocal Pick & Drop: Campus & City
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              What sets us apart from other delivery services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-600 text-white">
                  <Clock className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Instant Pickup
                </h3>
                <p className="mt-2 text-gray-600">
                  Effortless parcel collection via QR scan directly from
                  hostels, homes, and shops.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-600 text-white">
                  <MessageCircle className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  WhatsApp Chatbot Booking{" "}
                </h3>
                <p className="mt-2 text-gray-600">
                  Seamless booking experience directly through a user-friendly
                  WhatsApp chatbot.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-600 text-white">
                  <IndianRupee className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Dynamic Micro-Pricing
                </h3>
                <p className="mt-2 text-gray-600">
                  Flexible pricing based on real-time factors like distance,
                  time, and weight.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-600 text-white">
                  <Users className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Auto-Scheduling & Clustering
                </h3>
                <p className="mt-2 text-gray-600">
                  Optimised scheduling and vehicle grouping for efficient
                  same-area pickups.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Meet Our Team</h2>
            <p className="mt-4 text-lg text-gray-600">
              The dedicated professionals behind EngineersParcel
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Team Member"
                width={300}
                height={300}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">Subham Sawarnkar</h3>
                <p className="text-gray-500">Founder & CEO</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Team Member"
                width={300}
                height={300}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">Sabir</h3>
                <p className="text-gray-500">Operations Director</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Team Member"
                width={300}
                height={300}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">Raj Chatterjee</h3>
                <p className="text-gray-500">Technology Head</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Team Member"
                width={300}
                height={300}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">Suraj</h3>
                <p className="text-gray-500">Customer Relations</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
