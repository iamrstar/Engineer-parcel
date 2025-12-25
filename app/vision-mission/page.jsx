import { Target, Eye, Heart, Users, Award, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VisionMission() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our Vision & Mission
          </h1>
          <p className="text-lg max-w-3xl mx-auto">
            Driving India&apos;s logistics revolution with innovation, reliability, and excellence
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6">
                <Eye className="h-8 w-8 text-orange-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-lg text-gray-600 mb-4">
                To become India&apos;s most trusted and innovative logistics partner, connecting every corner of the nation with seamless, technology-driven delivery solutions.
              </p>
              <p className="text-gray-600">
                We envision a future where distance is no barrier to commerce, communication, or connection. Through continuous innovation and unwavering commitment to service excellence, we aim to redefine what&apos;s possible in the logistics industry.
              </p>
            </div>
            <div className="md:w-1/2 bg-orange-50 p-8 rounded-lg border border-orange-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Vision Pillars</h3>
              <div className="space-y-4">
                <VisionPillar icon={<Zap className="h-5 w-5" />} title="Innovation First" desc="Leveraging cutting-edge technology for superior service" />
                <VisionPillar icon={<Users className="h-5 w-5" />} title="Customer Centric" desc="Building lasting relationships through exceptional experiences" />
                <VisionPillar icon={<Award className="h-5 w-5" />} title="Market Leadership" desc="Setting industry standards for reliability and speed" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="md:w-1/2">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6">
                <Target className="h-8 w-8 text-orange-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-4">
                To deliver exceptional courier and logistics services that exceed customer expectations through reliability, speed, and care for every parcel we handle.
              </p>
              <p className="text-gray-600">
                We are committed to building a sustainable logistics ecosystem that empowers businesses, connects communities, and creates opportunities across India and beyond.
              </p>
            </div>
            <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <MissionCard icon={<Heart className="h-8 w-8" />} title="Customer First" desc="Every decision guided by customer needs and satisfaction" />
              <MissionCard icon={<Target className="h-8 w-8" />} title="On-Time Delivery" desc="Meeting commitments with precision and reliability" />
              <MissionCard icon={<Users className="h-8 w-8" />} title="Team Excellence" desc="Empowering our people to deliver their best" />
              <MissionCard icon={<Zap className="h-8 w-8" />} title="Innovation" desc="Continuously improving through technology and processes" />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide every decision we make and every service we deliver
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard 
              title="Integrity" 
              desc="We operate with honesty, transparency, and ethical practices in all our dealings. Trust is the foundation of our relationships with customers and partners."
            />
            <ValueCard 
              title="Excellence" 
              desc="We strive for the highest standards in service delivery, continuously improving our processes and capabilities to exceed expectations."
            />
            <ValueCard 
              title="Innovation" 
              desc="We embrace new technologies and creative solutions to solve logistics challenges and deliver better value to our customers."
            />
            <ValueCard 
              title="Reliability" 
              desc="We honor our commitments and deliver on our promises, ensuring every parcel reaches its destination safely and on time."
            />
            <ValueCard 
              title="Sustainability" 
              desc="We are committed to environmentally responsible practices that minimize our ecological footprint while serving our communities."
            />
            <ValueCard 
              title="Empowerment" 
              desc="We invest in our people, fostering a culture of growth, collaboration, and shared success across our organization."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-600 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Join Us on Our Journey</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Be part of India&apos;s logistics revolution. Experience the difference of working with a team that truly cares.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="bg-white text-orange-600 hover:bg-gray-100">
              <a href="/booking">Get Started</a>
            </Button>
            <Button asChild className="bg-white text-orange-600 hover:bg-gray-100">
              <a href="/contact">Contact Us</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function VisionPillar({ icon, title, desc }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-10 h-10 bg-orange-200 rounded-lg flex items-center justify-center">
        <div className="text-orange-600">{icon}</div>
      </div>
      <div>
        <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
        <p className="text-sm text-gray-600">{desc}</p>
      </div>
    </div>
  );
}

function MissionCard({ icon, title, desc }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="text-orange-500 mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  );
}

function ValueCard({ title, desc }) {
  return (
    <div className="bg-orange-50 p-6 rounded-lg border border-orange-100 hover:border-orange-300 transition-colors">
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}
