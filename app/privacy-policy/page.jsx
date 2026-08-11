export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white py-24 overflow-hidden">
        {/* Decorative Glowing Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/3" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-orange-400 border border-orange-500/20">
            Legal Agreement
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6">Privacy Policy</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            How we collect, use, and protect your personal information
          </p>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Last Updated: April 19, 2024
            </div>
            
            <div className="prose prose-orange max-w-none">

            <h2>1. Introduction</h2>
            <p>
              EngineersParcel ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your information when you use our website, mobile
              application, and services.
            </p>
            <p>
              Please read this Privacy Policy carefully. By accessing or using our services, you acknowledge that you
              have read, understood, and agree to be bound by all the terms of this Privacy Policy.
            </p>

            <h2>2. Information We Collect</h2>
            <h3>2.1 Personal Information</h3>
            <p>We may collect personal information that you provide directly to us, including but not limited to:</p>
            <ul>
              <li>Name, email address, phone number, and postal address</li>
              <li>Billing information and payment details</li>
              <li>Pickup and delivery addresses</li>
              <li>Account login credentials</li>
              <li>Information about the parcels you send or receive</li>
              <li>Communications you send to us</li>
            </ul>

            <h3>2.2 Automatically Collected Information</h3>
            <p>When you access or use our services, we may automatically collect information about you, including:</p>
            <ul>
              <li>Log information (IP address, browser type, pages visited, etc.)</li>
              <li>Device information (hardware model, operating system, unique device identifiers)</li>
              <li>Location information (with your consent)</li>
              <li>Usage information (how you use our services)</li>
              <li>Cookies and similar technologies</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We may use the information we collect for various purposes, including to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process and complete transactions</li>
              <li>Send you technical notices, updates, security alerts, and support messages</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Communicate with you about products, services, offers, and events</li>
              <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
              <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
              <li>Personalize and improve your experience</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>4. Sharing of Information</h2>
            <p>We may share your personal information with:</p>
            <ul>
              <li>Service providers who perform services on our behalf</li>
              <li>Business partners with whom we jointly offer products or services</li>
              <li>Third parties in connection with a business transaction</li>
              <li>Law enforcement or other government officials, as required by law</li>
            </ul>

            <h2>5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect the security of your personal
              information. However, please be aware that no method of transmission over the internet or electronic
              storage is 100% secure.
            </p>

            <h2>6. Your Rights and Choices</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul>
              <li>Access to your personal information</li>
              <li>Correction of inaccurate or incomplete information</li>
              <li>Deletion of your personal information</li>
              <li>Restriction of processing of your personal information</li>
              <li>Data portability</li>
              <li>Objection to processing of your personal information</li>
            </ul>

            <h2>7. Children's Privacy</h2>
            <p>
              Our services are not directed to children under the age of 13. We do not knowingly collect personal
              information from children under 13. If you are a parent or guardian and believe that your child has
              provided us with personal information, please contact us.
            </p>

            <h2>8. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last Updated" date.
            </p>

            <h2>9. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <p>
              Email: engineersparcel@gmail.com
              <br />
              Phone: +91-9525801506
              <br />
              Address: 4th Floor, I2H Building, IIT (ISM), Dhanbad
            </p>
          </div>
          </div>
        </div>
      </section>
    </div>
  )
}
